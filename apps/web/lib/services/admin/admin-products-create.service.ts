import { db } from "@white-shop/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { findOrCreateAttributeValue } from "../../utils/variant-generator";
import { ensureProductAttributesTable } from "../../utils/db-ensure";
import {
  processImageUrl,
  smartSplitUrls,
  cleanImageUrls,
  separateMainAndVariantImages,
} from "../../utils/image-utils";

class AdminProductsCreateService {
  /**
   * Generate unique SKU for product variant
   * Checks database to ensure uniqueness
   */
  private async generateUniqueSku(
    tx: any,
    baseSku: string | undefined,
    productSlug: string,
    variantIndex: number,
    usedSkus: Set<string>
  ): Promise<string> {
    // If base SKU is provided and unique, use it
    if (baseSku && baseSku.trim() !== '') {
      const trimmedSku = baseSku.trim();
      
      // Check if already used in this transaction
      if (!usedSkus.has(trimmedSku)) {
        // Check if exists in database
        const existing = await tx.productVariant.findUnique({
          where: { sku: trimmedSku },
        });
        
        if (!existing) {
          usedSkus.add(trimmedSku);
          console.log(`✅ [ADMIN PRODUCTS CREATE SERVICE] Using provided SKU: ${trimmedSku}`);
          return trimmedSku;
        } else {
          console.log(`⚠️ [ADMIN PRODUCTS CREATE SERVICE] SKU already exists in DB: ${trimmedSku}, generating new one`);
        }
      } else {
        console.log(`⚠️ [ADMIN PRODUCTS CREATE SERVICE] SKU already used in transaction: ${trimmedSku}, generating new one`);
      }
    }

    // Generate new unique SKU
    const baseSlug = productSlug || 'PROD';
    let attempt = 0;
    let newSku: string;
    
    do {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      const suffix = attempt > 0 ? `-${attempt}` : '';
      newSku = `${baseSlug.toUpperCase()}-${timestamp}-${variantIndex + 1}${suffix}-${random}`;
      attempt++;
      
      // Check if already used in this transaction
      if (usedSkus.has(newSku)) {
        continue;
      }
      
      // Check if exists in database
      const existing = await tx.productVariant.findUnique({
        where: { sku: newSku },
      });
      
      if (!existing) {
        usedSkus.add(newSku);
        console.log(`✅ [ADMIN PRODUCTS CREATE SERVICE] Generated unique SKU: ${newSku}`);
        return newSku;
      }
      
      console.log(`⚠️ [ADMIN PRODUCTS CREATE SERVICE] Generated SKU exists in DB: ${newSku}, trying again...`);
    } while (attempt < 100); // Safety limit
    
    // Fallback: use timestamp + random if all attempts failed
    const finalSku = `${baseSlug.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    usedSkus.add(finalSku);
    console.log(`✅ [ADMIN PRODUCTS CREATE SERVICE] Using fallback SKU: ${finalSku}`);
    return finalSku;
  }

  /**
   * Create product
   */
  async createProduct(data: {
    title: string;
    slug: string;
    subtitle?: string;
    descriptionHtml?: string;
    brandId?: string;
    primaryCategoryId?: string;
    categoryIds?: string[];
    published: boolean;
    featured?: boolean;
    locale: string;
    media?: any[];
    mainProductImage?: string;
    labels?: Array<{
      type: string;
      value: string;
      position: string;
      color?: string | null;
    }>;
    attributeIds?: string[];
    variants: Array<{
      price: string | number;
      compareAtPrice?: string | number;
      stock: string | number;
      sku?: string;
      color?: string;
      size?: string;
      imageUrl?: string;
      published?: boolean;
      options?: Array<{
        attributeKey: string;
        value: string;
        valueId?: string;
      }>;
    }>;
  }) {
    try {
      console.log('🆕 [ADMIN PRODUCTS CREATE SERVICE] Creating product:', data.title);

      const result = await db.$transaction(async (tx: any) => {
        // Track used SKUs within this transaction to ensure uniqueness
        const usedSkus = new Set<string>();
        
        // Generate variants with options
        // Support both old format (color/size strings) and new format (AttributeValue IDs)
        // Also support generic options array for any attribute type
        const variantsData = await Promise.all(
          data.variants.map(async (variant: any, variantIndex: number) => {
            const options: any[] = [];
            const attributesMap: Record<string, Array<{ valueId: string; value: string; attributeKey: string }>> = {};
            
            // If variant has explicit options array, use it (new format)
            if (variant.options && Array.isArray(variant.options) && variant.options.length > 0) {
              for (const opt of variant.options) {
                let valueId: string | null = null;
                let attributeKey: string | null = null;
                let value: string | null = null;

                if (opt.valueId) {
                  // New format: use valueId
                  valueId = opt.valueId;
                  // Fetch AttributeValue to get value and attributeKey
                  const attrValue = await tx.attributeValue.findUnique({
                    where: { id: opt.valueId },
                    include: { attribute: true },
                  });
                  if (attrValue) {
                    attributeKey = attrValue.attribute.key;
                    value = attrValue.value;
                  }
                  options.push({ valueId: opt.valueId });
                } else if (opt.attributeKey && opt.value) {
                  // Try to find or create AttributeValue
                  const foundValueId = await findOrCreateAttributeValue(opt.attributeKey, opt.value, data.locale);
                  if (foundValueId) {
                    valueId = foundValueId;
                    attributeKey = opt.attributeKey;
                    value = opt.value;
                    options.push({ valueId: foundValueId });
                  } else {
                    // Fallback to old format if AttributeValue not found
                    attributeKey = opt.attributeKey;
                    value = opt.value;
                    options.push({ attributeKey: opt.attributeKey, value: opt.value });
                  }
                }

                // Build attributes JSONB structure
                if (attributeKey && valueId && value) {
                  if (!attributesMap[attributeKey]) {
                    attributesMap[attributeKey] = [];
                  }
                  // Check if this valueId is already added for this attribute
                  if (!attributesMap[attributeKey].some(item => item.valueId === valueId)) {
                    attributesMap[attributeKey].push({
                      valueId,
                      value,
                      attributeKey,
                    });
                  }
                }
              }
            } else {
              // Old format: Try to find or create AttributeValues for color and size
              if (variant.color) {
                const colorValueId = await findOrCreateAttributeValue("color", variant.color, data.locale);
                if (colorValueId) {
                  options.push({ valueId: colorValueId });
                  if (!attributesMap["color"]) {
                    attributesMap["color"] = [];
                  }
                  attributesMap["color"].push({
                    valueId: colorValueId,
                    value: variant.color,
                    attributeKey: "color",
                  });
                } else {
                  // Fallback to old format if AttributeValue not found
                  options.push({ attributeKey: "color", value: variant.color });
                }
              }
              
              if (variant.size) {
                const sizeValueId = await findOrCreateAttributeValue("size", variant.size, data.locale);
                if (sizeValueId) {
                  options.push({ valueId: sizeValueId });
                  if (!attributesMap["size"]) {
                    attributesMap["size"] = [];
                  }
                  attributesMap["size"].push({
                    valueId: sizeValueId,
                    value: variant.size,
                    attributeKey: "size",
                  });
                } else {
                  // Fallback to old format if AttributeValue not found
                  options.push({ attributeKey: "size", value: variant.size });
                }
              }
            }

            const price = typeof variant.price === 'number' ? variant.price : parseFloat(String(variant.price));
            const stock = typeof variant.stock === 'number' ? variant.stock : parseInt(String(variant.stock), 10);
            const compareAtPrice = variant.compareAtPrice !== undefined && variant.compareAtPrice !== null && variant.compareAtPrice !== ''
              ? (typeof variant.compareAtPrice === 'number' ? variant.compareAtPrice : parseFloat(String(variant.compareAtPrice)))
              : undefined;

            // Generate unique SKU for this variant
            const uniqueSku = await this.generateUniqueSku(
              tx,
              variant.sku,
              data.slug,
              variantIndex,
              usedSkus
            );

            // Convert attributesMap to JSONB format
            const attributesJson = Object.keys(attributesMap).length > 0 ? attributesMap : null;

            console.log(`📦 [ADMIN PRODUCTS CREATE SERVICE] Variant ${variantIndex + 1} attributes:`, JSON.stringify(attributesJson, null, 2));

            // Process and validate variant imageUrl
            let processedVariantImageUrl: string | undefined = undefined;
            if (variant.imageUrl) {
              const urls = smartSplitUrls(variant.imageUrl);
              const processedUrls = urls.map(url => processImageUrl(url)).filter((url): url is string => url !== null);
              if (processedUrls.length > 0) {
                processedVariantImageUrl = processedUrls.join(',');
              }
            }

            return {
              sku: uniqueSku,
              price,
              compareAtPrice,
              stock: isNaN(stock) ? 0 : stock,
              imageUrl: processedVariantImageUrl,
              published: variant.published !== false,
              attributes: attributesJson, // JSONB column
              options: {
                create: options,
              },
            };
          })
        );

        // Final validation: log all SKUs to ensure uniqueness
        const allSkus = variantsData.map(v => v.sku).filter(Boolean);
        const uniqueSkus = new Set(allSkus);
        console.log(`📋 [ADMIN PRODUCTS CREATE SERVICE] Generated ${variantsData.length} variants with SKUs:`, allSkus);
        
        if (allSkus.length !== uniqueSkus.size) {
          console.error('❌ [ADMIN PRODUCTS CREATE SERVICE] Duplicate SKUs detected!', {
            total: allSkus.length,
            unique: uniqueSkus.size,
            duplicates: allSkus.filter((sku, index) => allSkus.indexOf(sku) !== index)
          });
          throw new Error('Duplicate SKUs detected in variants. This should not happen.');
        }
        
        console.log('✅ [ADMIN PRODUCTS CREATE SERVICE] All variant SKUs are unique');

        // Collect all variant images to exclude from main media
        const allVariantImages: any[] = [];
        variantsData.forEach((variant: any) => {
          if (variant.imageUrl) {
            const urls = smartSplitUrls(variant.imageUrl);
            allVariantImages.push(...urls);
          }
        });

        // Prepare media array - use mainProductImage if provided and media is empty
        let rawMedia = data.media || [];
        if (data.mainProductImage && rawMedia.length === 0) {
          // If mainProductImage is provided but media is empty, use mainProductImage as first media item
          rawMedia = [data.mainProductImage];
          console.log('📸 [ADMIN PRODUCTS CREATE SERVICE] Using mainProductImage as media:', data.mainProductImage.substring(0, 50) + '...');
        } else if (data.mainProductImage && rawMedia.length > 0) {
          // If both are provided, ensure mainProductImage is first in media array
          const mainImageIndex = rawMedia.findIndex((m: any) => {
            const url = typeof m === 'string' ? m : m.url;
            return url === data.mainProductImage;
          });
          if (mainImageIndex === -1) {
            // mainProductImage not in media array, add it as first
            rawMedia = [data.mainProductImage, ...rawMedia];
            console.log('📸 [ADMIN PRODUCTS CREATE SERVICE] Added mainProductImage as first media item');
          } else if (mainImageIndex > 0) {
            // mainProductImage is in media but not first, move it to first
            const mainImage = rawMedia[mainImageIndex];
            rawMedia.splice(mainImageIndex, 1);
            rawMedia.unshift(mainImage);
            console.log('📸 [ADMIN PRODUCTS CREATE SERVICE] Moved mainProductImage to first position in media');
          }
        }

        // Separate main images from variant images and clean them
        const { main } = separateMainAndVariantImages(rawMedia, allVariantImages);
        const finalMedia = cleanImageUrls(main);
        
        console.log('📸 [ADMIN PRODUCTS CREATE SERVICE] Final main media count:', finalMedia.length);
        console.log('📸 [ADMIN PRODUCTS CREATE SERVICE] Variant images excluded:', allVariantImages.length);

        const product = await tx.product.create({
          data: {
            brandId: data.brandId || undefined,
            primaryCategoryId: data.primaryCategoryId || undefined,
            categoryIds: data.categoryIds || [],
            media: finalMedia,
            published: data.published,
            featured: data.featured ?? false,
            publishedAt: data.published ? new Date() : undefined,
            translations: {
              create: {
                locale: data.locale || "en",
                title: data.title,
                slug: data.slug,
                subtitle: data.subtitle || undefined,
                descriptionHtml: data.descriptionHtml || undefined,
              },
            },
            variants: {
              create: variantsData,
            },
            labels: data.labels && data.labels.length > 0
              ? {
                  create: data.labels.map((label) => ({
                    type: label.type,
                    value: label.value,
                    position: label.position,
                    color: label.color || undefined,
                  })),
                }
              : undefined,
          },
        });

        // Create ProductAttribute relations if attributeIds provided
        if (data.attributeIds && data.attributeIds.length > 0) {
          try {
            // Ensure table exists (for Vercel deployments where migrations might not run)
            await ensureProductAttributesTable();
            
            console.log('🔗 [ADMIN PRODUCTS CREATE SERVICE] Creating ProductAttribute relations for product:', product.id, 'attributes:', data.attributeIds);
            await tx.productAttribute.createMany({
              data: data.attributeIds.map((attributeId) => ({
                productId: product.id,
                attributeId,
              })),
              skipDuplicates: true,
            });
            console.log('✅ [ADMIN PRODUCTS CREATE SERVICE] Created ProductAttribute relations:', data.attributeIds);
          } catch (error: any) {
            console.error('❌ [ADMIN PRODUCTS CREATE SERVICE] Failed to create ProductAttribute relations:', error);
            console.error('   Product ID:', product.id);
            console.error('   Attribute IDs:', data.attributeIds);
            console.error('   Error code:', error.code);
            console.error('   Error message:', error.message);
            // Re-throw to fail the transaction
            throw error;
          }
        }

        return await tx.product.findUnique({
          where: { id: product.id },
          include: {
            translations: true,
            variants: {
              include: {
                options: true,
              },
            },
            labels: true,
          },
        });
      });

      // Revalidate cache
      try {
        console.log('🧹 [ADMIN PRODUCTS CREATE SERVICE] Revalidating paths for new product');
        revalidatePath('/');
        revalidatePath('/products');
        // @ts-expect-error - revalidateTag type issue in Next.js
        revalidateTag('products');
      } catch (e) {
        console.warn('⚠️ [ADMIN PRODUCTS CREATE SERVICE] Revalidation failed:', e);
      }

      return result;
    } catch (error: any) {
      console.error("❌ [ADMIN PRODUCTS CREATE SERVICE] createProduct error:", error);
      throw error;
    }
  }
}

export const adminProductsCreateService = new AdminProductsCreateService();

