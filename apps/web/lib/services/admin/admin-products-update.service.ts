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

class AdminProductsUpdateService {
  /**
   * Update product
   */
  async updateProduct(
    productId: string,
    data: {
      title?: string;
      slug?: string;
      subtitle?: string;
      descriptionHtml?: string;
      brandId?: string;
      primaryCategoryId?: string;
      categoryIds?: string[];
      published?: boolean;
      featured?: boolean;
      locale?: string;
      media?: any[];
      labels?: Array<{
        id?: string;
        type: string;
        value: string;
        position: string;
        color?: string | null;
      }>;
      attributeIds?: string[];
      variants?: Array<{
        id?: string;
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
    }
  ) {
    try {
      console.log('🔄 [ADMIN PRODUCTS UPDATE SERVICE] Updating product:', productId);
      
      // Check if product exists
      const existing = await db.product.findUnique({
        where: { id: productId },
        include: {
          translations: true,
        }
      });

      if (!existing) {
        throw {
          status: 404,
          type: "https://api.shop.am/problems/not-found",
          title: "Product not found",
          detail: `Product with id '${productId}' does not exist`,
        };
      }

      // Execute everything in a transaction for atomicity and speed
      const result = await db.$transaction(async (tx: any) => {
        // Collect all variant images to exclude from main media (if media is being updated)
        let allVariantImages: any[] = [];
        if (data.variants !== undefined) {
          data.variants.forEach((variant: any) => {
            if (variant.imageUrl) {
              const urls = smartSplitUrls(variant.imageUrl);
              allVariantImages.push(...urls);
            }
          });
        } else {
          // If variants not being updated, get existing variant images
          const existingVariants = await tx.productVariant.findMany({
            where: { productId },
            select: { imageUrl: true },
          });
          existingVariants.forEach((variant: any) => {
            if (variant.imageUrl) {
              const urls = smartSplitUrls(variant.imageUrl);
              allVariantImages.push(...urls);
            }
          });
        }

        // 1. Update product base data
        const updateData: any = {};
        if (data.brandId !== undefined) updateData.brandId = data.brandId || null;
        if (data.primaryCategoryId !== undefined) updateData.primaryCategoryId = data.primaryCategoryId || null;
        if (data.categoryIds !== undefined) updateData.categoryIds = data.categoryIds || [];
        if (data.media !== undefined) {
          // Separate main images from variant images and clean them
          const { main } = separateMainAndVariantImages(data.media, allVariantImages);
          updateData.media = cleanImageUrls(main);
          console.log('📸 [ADMIN PRODUCTS UPDATE SERVICE] Updated main media count:', updateData.media.length);
          console.log('📸 [ADMIN PRODUCTS UPDATE SERVICE] Variant images excluded:', allVariantImages.length);
        }
        if (data.published !== undefined) {
          updateData.published = data.published;
          if (data.published && !existing.publishedAt) {
            updateData.publishedAt = new Date();
          }
        }
        if (data.featured !== undefined) updateData.featured = data.featured;

        // 2. Update translation
        if (data.title || data.slug || data.subtitle !== undefined || data.descriptionHtml !== undefined) {
          const locale = data.locale || "en";
          await tx.productTranslation.upsert({
            where: {
              productId_locale: {
                productId,
                locale,
              },
            },
            update: {
              ...(data.title && { title: data.title }),
              ...(data.slug && { slug: data.slug }),
              ...(data.subtitle !== undefined && { subtitle: data.subtitle || null }),
              ...(data.descriptionHtml !== undefined && { descriptionHtml: data.descriptionHtml || null }),
            },
            create: {
              productId,
              locale,
              title: data.title || "",
              slug: data.slug || "",
              subtitle: data.subtitle || null,
              descriptionHtml: data.descriptionHtml || null,
            },
          });
        }

        // 3. Update labels
        if (data.labels !== undefined) {
          await tx.productLabel.deleteMany({ where: { productId } });
          if (data.labels.length > 0) {
            await tx.productLabel.createMany({
              data: data.labels.map((label) => ({
                productId,
                type: label.type,
                value: label.value,
                position: label.position,
                color: label.color || undefined,
              })),
            });
          }
        }

        // 3.5. Update ProductAttribute relations
        if (data.attributeIds !== undefined) {
          // Ensure table exists (for Vercel deployments where migrations might not run)
          await ensureProductAttributesTable();
          
          await tx.productAttribute.deleteMany({ where: { productId } });
          if (data.attributeIds.length > 0) {
            await tx.productAttribute.createMany({
              data: data.attributeIds.map((attributeId) => ({
                productId,
                attributeId,
              })),
              skipDuplicates: true,
            });
            console.log('✅ [ADMIN PRODUCTS UPDATE SERVICE] Updated ProductAttribute relations:', data.attributeIds);
          }
        }

        // 4. Update variants
        if (data.variants !== undefined) {
          // Get existing variants with their IDs and SKUs for matching
          const existingVariants = await tx.productVariant.findMany({
            where: { productId },
            select: { id: true, sku: true },
          });
          const existingVariantIds = new Set<string>(existingVariants.map((v: { id: string }) => v.id));
          // Create a map of SKU -> variant ID for quick lookup
          const existingSkuMap = new Map<string, string>();
          existingVariants.forEach((v: { id: string; sku: string | null }) => {
            if (v.sku) {
              existingSkuMap.set(v.sku.trim().toLowerCase(), v.id);
            }
          });
          const incomingVariantIds = new Set<string>();
          
          const locale = data.locale || "en";
          
          // Process each variant: update if exists, create if new
          if (data.variants.length > 0) {
            for (const variant of data.variants) {
              const options: any[] = [];
              const attributesMap: Record<string, Array<{ valueId: string; value: string; attributeKey: string }>> = {};
              
              // Support both old format (color/size) and new format (options array)
              if (variant.options && Array.isArray(variant.options) && variant.options.length > 0) {
                // New format: use options array
                for (const opt of variant.options) {
                  let valueId: string | null = null;
                  let attributeKey: string | null = null;
                  let value: string | null = null;

                  if (opt.valueId) {
                    valueId = opt.valueId;
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
                    const foundValueId = await findOrCreateAttributeValue(opt.attributeKey, opt.value, locale);
                    if (foundValueId) {
                      valueId = foundValueId;
                      attributeKey = opt.attributeKey;
                      value = opt.value;
                      options.push({ valueId: foundValueId });
                    } else {
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
                  const colorValueId = await findOrCreateAttributeValue("color", variant.color, locale);
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
                  const sizeValueId = await findOrCreateAttributeValue("size", variant.size, locale);
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

              if (isNaN(price) || price < 0) {
                throw new Error(`Invalid price value: ${variant.price}`);
              }

              // Convert attributesMap to JSONB format
              const attributesJson = Object.keys(attributesMap).length > 0 ? attributesMap : null;

              // Check if variant should be updated or created
              // First check by ID if provided
              let variantToUpdate = null;
              let variantIdToUse: string | null = null;
              
              if (variant.id && existingVariantIds.has(variant.id)) {
                variantToUpdate = await tx.productVariant.findUnique({
                  where: { id: variant.id },
                });
                variantIdToUse = variant.id;
                console.log(`🔍 [ADMIN PRODUCTS UPDATE SERVICE] Variant lookup by ID ${variant.id}:`, variantToUpdate ? 'found' : 'not found');
              }
              
              // If not found by ID, try to find by SKU using the SKU map (faster than DB query)
              if (!variantToUpdate && variant.sku) {
                const skuValue = variant.sku.trim();
                const skuKey = skuValue.toLowerCase();
                const matchedVariantId = existingSkuMap.get(skuKey);
                
                if (matchedVariantId) {
                  variantToUpdate = await tx.productVariant.findUnique({
                    where: { id: matchedVariantId },
                  });
                  variantIdToUse = matchedVariantId;
                  console.log(`🔍 [ADMIN PRODUCTS UPDATE SERVICE] Variant lookup by SKU "${skuValue}": found variant ID ${matchedVariantId}`);
                } else {
                  // Check if SKU exists globally (might be from another product)
                  const existingSkuVariant = await tx.productVariant.findFirst({
                    where: {
                      sku: skuValue,
                    },
                  });
                  
                  if (existingSkuVariant) {
                    console.warn(`⚠️ [ADMIN PRODUCTS UPDATE SERVICE] SKU "${skuValue}" already exists in product ${existingSkuVariant.productId}, but not in current product ${productId}`);
                    // Don't use this variant, as it belongs to another product
                    throw new Error(`SKU "${skuValue}" already exists in another product. Please use a unique SKU.`);
                  }
                  
                  console.log(`🔍 [ADMIN PRODUCTS UPDATE SERVICE] Variant lookup by SKU "${skuValue}": not found in current product`);
                }
              }
              
              if (variantToUpdate && variantIdToUse) {
                // Update existing variant
                incomingVariantIds.add(variantIdToUse);
                
                // Delete old options and create new ones
                await tx.productVariantOption.deleteMany({
                  where: { variantId: variantToUpdate.id },
                });
                
                // Process and validate variant imageUrl
                let processedVariantImageUrl: string | undefined = undefined;
                if (variant.imageUrl) {
                  const urls = smartSplitUrls(variant.imageUrl);
                  const processedUrls = urls.map(url => processImageUrl(url)).filter((url): url is string => url !== null);
                  if (processedUrls.length > 0) {
                    processedVariantImageUrl = processedUrls.join(',');
                  }
                }

                await tx.productVariant.update({
                  where: { id: variantIdToUse },
                  data: {
                    sku: variant.sku ? variant.sku.trim() : undefined,
                    price,
                    compareAtPrice,
                    stock: isNaN(stock) ? 0 : stock,
                    imageUrl: processedVariantImageUrl,
                    published: variant.published !== false,
                    attributes: attributesJson,
                    options: {
                      create: options,
                    },
                  },
                });
                
                console.log(`✅ [ADMIN PRODUCTS UPDATE SERVICE] Updated variant: ${variantIdToUse} (found by ${variant.id ? 'ID' : 'SKU'})`);
              } else {
                // Create new variant
                // Double-check that SKU doesn't already exist (safety check)
                if (variant.sku) {
                  const skuValue = variant.sku.trim();
                  const existingSkuCheck = await tx.productVariant.findFirst({
                    where: {
                      sku: skuValue,
                    },
                  });
                  
                  if (existingSkuCheck) {
                    console.error(`❌ [ADMIN PRODUCTS UPDATE SERVICE] SKU "${skuValue}" already exists! Variant ID: ${existingSkuCheck.id}, Product ID: ${existingSkuCheck.productId}`);
                    throw new Error(`SKU "${skuValue}" already exists. Cannot create duplicate variant.`);
                  }
                }
                
                // Process and validate variant imageUrl
                let processedVariantImageUrl: string | undefined = undefined;
                if (variant.imageUrl) {
                  const urls = smartSplitUrls(variant.imageUrl);
                  const processedUrls = urls.map(url => processImageUrl(url)).filter((url): url is string => url !== null);
                  if (processedUrls.length > 0) {
                    processedVariantImageUrl = processedUrls.join(',');
                  }
                }

                console.log(`🆕 [ADMIN PRODUCTS UPDATE SERVICE] Creating new variant with SKU: ${variant.sku || 'none'}`);
                const newVariant = await tx.productVariant.create({
                  data: {
                    productId,
                    sku: variant.sku ? variant.sku.trim() : undefined,
                    price,
                    compareAtPrice,
                    stock: isNaN(stock) ? 0 : stock,
                    imageUrl: processedVariantImageUrl,
                    published: variant.published !== false,
                    attributes: attributesJson,
                    options: {
                      create: options,
                    },
                  },
                });
                
                if (newVariant.id) {
                  incomingVariantIds.add(newVariant.id);
                }
                
                console.log(`✅ [ADMIN PRODUCTS UPDATE SERVICE] Created new variant: ${newVariant.id}`);
              }
            }
          }
          
          // Delete variants that are no longer in the list
          const variantsToDelete = Array.from(existingVariantIds).filter(id => !incomingVariantIds.has(id));
          if (variantsToDelete.length > 0) {
            await tx.productVariant.deleteMany({
              where: {
                id: { in: variantsToDelete },
                productId,
              },
            });
            console.log(`🗑️ [ADMIN PRODUCTS UPDATE SERVICE] Deleted ${variantsToDelete.length} variant(s):`, variantsToDelete);
          }
        }

        // Update attribute value imageUrls from variant images
        // If a variant has an imageUrl, update the corresponding attribute value's imageUrl
        try {
          console.log('🖼️ [ADMIN PRODUCTS UPDATE SERVICE] Updating attribute value imageUrls from variant images...');
          const allVariants = await tx.productVariant.findMany({
            where: { productId },
            include: {
              options: {
                include: {
                  attributeValue: true,
                },
              },
            },
          });

          for (const variant of allVariants) {
            if (!variant.imageUrl) continue;

            // Use smartSplitUrls to properly handle comma-separated URLs and base64 images
            const variantImageUrls = smartSplitUrls(variant.imageUrl);
            if (variantImageUrls.length === 0) continue;

            // Process and validate first image URL
            const firstVariantImageUrl = processImageUrl(variantImageUrls[0]);
            if (!firstVariantImageUrl) {
              console.log(`⚠️ [ADMIN PRODUCTS UPDATE SERVICE] Variant ${variant.id} has invalid imageUrl, skipping attribute value update`);
              continue;
            }

            // Get all attribute value IDs from this variant's options
            const attributeValueIds = new Set<string>();
            variant.options.forEach((opt: any) => {
              if (opt.valueId && opt.attributeValue) {
                attributeValueIds.add(opt.valueId);
              }
            });

            // Update each attribute value's imageUrl if it doesn't already have one
            // or if the variant image is more specific (e.g., base64 or full URL)
            // BUT skip updating if:
            // - Attribute is "color" and attribute value doesn't have an imageUrl
            // - Attribute value only has colors but no imageUrl
            for (const valueId of attributeValueIds) {
              const attrValue = await tx.attributeValue.findUnique({
                where: { id: valueId },
                include: {
                  attribute: true,
                },
              });

              if (attrValue) {
                // Check if attribute is "color"
                const isColorAttribute = attrValue.attribute?.key === "color";
                
                // Check if attribute value only has colors but no imageUrl
                const hasColors = attrValue.colors && 
                  (Array.isArray(attrValue.colors) ? attrValue.colors.length > 0 : 
                   typeof attrValue.colors === 'string' ? attrValue.colors.trim() !== '' && attrValue.colors !== '[]' : 
                   Object.keys(attrValue.colors || {}).length > 0);
                const hasNoImageUrl = !attrValue.imageUrl || attrValue.imageUrl.trim() === '';
                const isColorOnly = hasColors && hasNoImageUrl;

                // Skip updating if:
                // 1. It's a color attribute AND doesn't have an imageUrl, OR
                // 2. It only has colors but no imageUrl
                if ((isColorAttribute && hasNoImageUrl) || isColorOnly) {
                  console.log(`⏭️ [ADMIN PRODUCTS UPDATE SERVICE] Skipping attribute value ${valueId} - color attribute or color-only value without imageUrl`);
                  continue;
                }

                // Only update if:
                // 1. Attribute value doesn't have an imageUrl, OR
                // 2. Variant image is a base64 (more specific) and attribute value has a URL
                const shouldUpdate = !attrValue.imageUrl || 
                  (firstVariantImageUrl.startsWith('data:image/') && attrValue.imageUrl && !attrValue.imageUrl.startsWith('data:image/'));

                if (shouldUpdate) {
                  console.log(`📸 [ADMIN PRODUCTS UPDATE SERVICE] Updating attribute value ${valueId} imageUrl from variant ${variant.id}:`, firstVariantImageUrl.substring(0, 50) + '...');
                  await tx.attributeValue.update({
                    where: { id: valueId },
                    data: { imageUrl: firstVariantImageUrl },
                  });
                } else {
                  console.log(`⏭️ [ADMIN PRODUCTS UPDATE SERVICE] Skipping attribute value ${valueId} - already has imageUrl`);
                }
              }
            }
          }
          console.log('✅ [ADMIN PRODUCTS UPDATE SERVICE] Finished updating attribute value imageUrls from variant images');
        } catch (error: any) {
          // Don't fail the transaction if this fails - it's a nice-to-have feature
          console.warn('⚠️ [ADMIN PRODUCTS UPDATE SERVICE] Failed to update attribute value imageUrls from variant images:', error);
        }

        // 5. Finally update the product record itself
        return await tx.product.update({
          where: { id: productId },
          data: updateData,
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

      // 6. Revalidate cache for this product and related pages
      try {
        console.log('🧹 [ADMIN PRODUCTS UPDATE SERVICE] Revalidating paths for product:', productId);
        revalidatePath(`/products/${result.translations[0]?.slug}`);
        revalidatePath('/');
        revalidatePath('/products');
        // @ts-expect-error - revalidateTag type issue in Next.js
        revalidateTag('products');
        // @ts-expect-error - revalidateTag type issue in Next.js
        revalidateTag(`product-${productId}`);
      } catch (e) {
        console.warn('⚠️ [ADMIN PRODUCTS UPDATE SERVICE] Revalidation failed (expected in some environments):', e);
      }

      return result;
    } catch (error: any) {
      console.error("❌ [ADMIN PRODUCTS UPDATE SERVICE] updateProduct error:", error);
      throw error;
    }
  }
}

export const adminProductsUpdateService = new AdminProductsUpdateService();

