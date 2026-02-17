import { db } from "@white-shop/db";
import { ensureProductVariantAttributesColumn } from "../../utils/db-ensure";

class AdminProductsReadService {
  /**
   * Get products for admin
   */
  async getProducts(filters: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    categories?: string[];
    sku?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }) {
    console.log("📦 [ADMIN PRODUCTS READ SERVICE] getProducts called with filters:", filters);
    const startTime = Date.now();
    
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    const orConditions: any[] = [];

    // Search filter
    if (filters.search) {
      orConditions.push(
        {
          translations: {
            some: {
              title: {
                contains: filters.search,
                mode: "insensitive",
              },
            },
          },
        },
        {
          variants: {
            some: {
              sku: {
                contains: filters.search,
                mode: "insensitive",
              },
            },
          },
        }
      );
    }

    // Category filter - support both single category and multiple categories
    const categoryIds = filters.categories && filters.categories.length > 0 
      ? filters.categories 
      : filters.category 
        ? [filters.category] 
        : [];
    
    if (categoryIds.length > 0) {
      const categoryConditions: any[] = [];
      categoryIds.forEach((categoryId) => {
        categoryConditions.push(
          {
            primaryCategoryId: categoryId,
          },
          {
            categoryIds: {
              has: categoryId,
            },
          }
        );
      });
      orConditions.push(...categoryConditions);
    }

    if (orConditions.length > 0) {
      where.OR = orConditions;
    }

    // SKU filter
    if (filters.sku) {
      where.variants = {
        some: {
          sku: {
            contains: filters.sku,
            mode: "insensitive",
          },
        },
      };
    }

    // Sort
    let orderBy: any = { createdAt: "desc" };
    if (filters.sort) {
      const [field, direction] = filters.sort.split("-");
      orderBy = { [field]: direction || "desc" };
    }

    console.log("📦 [ADMIN PRODUCTS READ SERVICE] Executing database queries...");
    console.log("📦 [ADMIN PRODUCTS READ SERVICE] Where clause:", JSON.stringify(where, null, 2));
    const queryStartTime = Date.now();

    let products: any[] = [];
    let total: number = 0;

    try {
      // Test database connection first
      console.log("📦 [ADMIN PRODUCTS READ SERVICE] Testing database connection...");
      await db.$queryRaw`SELECT 1`;
      console.log("✅ [ADMIN PRODUCTS READ SERVICE] Database connection OK");

      // First, try to get products with a simpler query
      console.log("📦 [ADMIN PRODUCTS READ SERVICE] Fetching products...");
      products = await db.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          translations: {
            where: { locale: "en" },
            take: 1,
          },
          variants: {
            where: { published: true },
            take: 1,
            orderBy: { price: "asc" },
          },
          labels: true,
        },
      });
      
      const productsTime = Date.now() - queryStartTime;
      console.log(`✅ [ADMIN PRODUCTS READ SERVICE] Products fetched in ${productsTime}ms. Found ${products.length} products`);

      // Then get count - use a simpler approach if count is slow
      console.log("📦 [ADMIN PRODUCTS READ SERVICE] Counting total products...");
      const countStartTime = Date.now();
      
      // Use a timeout for count query
      const countPromise = db.product.count({ where });
      const timeoutPromise = new Promise<number>((_, reject) => 
        setTimeout(() => reject(new Error("Count query timeout")), 10000)
      );
      
      total = await Promise.race([countPromise, timeoutPromise]) as number;
      const countTime = Date.now() - countStartTime;
      console.log(`✅ [ADMIN PRODUCTS READ SERVICE] Count completed in ${countTime}ms. Total: ${total}`);
      
      const queryTime = Date.now() - queryStartTime;
      console.log(`✅ [ADMIN PRODUCTS READ SERVICE] All database queries completed in ${queryTime}ms`);
    } catch (error: any) {
      // If product_variants.attributes column doesn't exist, try to create it and retry
      if (error?.message?.includes('product_variants.attributes') || 
          (error?.message?.includes('attributes') && error?.message?.includes('does not exist'))) {
        console.warn('⚠️ [ADMIN PRODUCTS READ SERVICE] product_variants.attributes column not found, attempting to create it...');
        try {
          await ensureProductVariantAttributesColumn();
          // Retry the query after creating the column
          products = await db.product.findMany({
            where,
            skip,
            take: limit,
            orderBy,
            include: {
              translations: {
                where: { locale: "en" },
                take: 1,
              },
              variants: {
                where: { published: true },
                take: 1,
                orderBy: { price: "asc" },
              },
              labels: true,
            },
          });
          
          const productsTime = Date.now() - queryStartTime;
          console.log(`✅ [ADMIN PRODUCTS READ SERVICE] Products fetched in ${productsTime}ms. Found ${products.length} products (after creating attributes column)`);
          
          // Get count
          const countStartTime = Date.now();
          const countPromise = db.product.count({ where });
          const timeoutPromise = new Promise<number>((_, reject) => 
            setTimeout(() => reject(new Error("Count query timeout")), 10000)
          );
          
          total = await Promise.race([countPromise, timeoutPromise]) as number;
          const countTime = Date.now() - countStartTime;
          console.log(`✅ [ADMIN PRODUCTS READ SERVICE] Count completed in ${countTime}ms. Total: ${total}`);
          
          const queryTime = Date.now() - queryStartTime;
          console.log(`✅ [ADMIN PRODUCTS READ SERVICE] All database queries completed in ${queryTime}ms`);
        } catch (retryError: any) {
          const queryTime = Date.now() - queryStartTime;
          console.error(`❌ [ADMIN PRODUCTS READ SERVICE] Database query error after ${queryTime}ms (after retry):`, retryError);
          throw retryError;
        }
      } else {
        const queryTime = Date.now() - queryStartTime;
        console.error(`❌ [ADMIN PRODUCTS READ SERVICE] Database query error after ${queryTime}ms:`, error);
        console.error(`❌ [ADMIN PRODUCTS READ SERVICE] Error details:`, {
          message: error.message,
          code: error.code,
          meta: error.meta,
          stack: error.stack?.substring(0, 500),
        });
        
        // If count fails, try to get products without count
        if (error.message === "Count query timeout" || error.message?.includes("count")) {
          console.warn("⚠️ [ADMIN PRODUCTS READ SERVICE] Count query failed, using estimated total");
          total = products?.length || limit; // Use current page size as fallback
        } else {
          // If products query also failed, rethrow
          if (!products) {
            throw error;
          }
          // If only count failed, use estimated total
          console.warn("⚠️ [ADMIN PRODUCTS READ SERVICE] Count query failed, using estimated total");
          total = products.length || limit;
        }
      }
    }

    const data = products.map((product) => {
      // Безопасное получение translation с проверкой на существование массива
      const translation = Array.isArray(product.translations) && product.translations.length > 0
        ? product.translations[0]
        : null;
      
      // Безопасное получение variant с проверкой на существование массива
      const variant = Array.isArray(product.variants) && product.variants.length > 0
        ? product.variants[0]
        : null;
      
      const image =
        Array.isArray(product.media) && product.media.length > 0
          ? typeof product.media[0] === "string"
            ? product.media[0]
            : (product.media[0] as any)?.url
          : null;

      return {
        id: product.id,
        slug: translation?.slug || "",
        title: translation?.title || "",
        published: product.published,
        featured: product.featured || false,
        price: variant?.price || 0,
        stock: variant?.stock || 0,
        discountPercent: product.discountPercent || 0, // Include discountPercent
        compareAtPrice: variant?.compareAtPrice || null, // Include compareAtPrice for showing original price
        colorStocks: [], // Can be enhanced later
        image,
        createdAt: product.createdAt.toISOString(),
      };
    });

    const totalTime = Date.now() - startTime;
    console.log(`✅ [ADMIN PRODUCTS READ SERVICE] getProducts completed in ${totalTime}ms. Returning ${data.length} products`);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get product by ID
   */
  async getProductById(productId: string) {
    // Try to include productAttributes, but handle case where table might not exist
    let product;
    try {
      product = await db.product.findUnique({
        where: { id: productId },
        include: {
          translations: true,
          brand: {
            include: {
              translations: true,
            },
          },
          categories: {
            include: {
              translations: true,
            },
          },
          variants: {
            include: {
              options: {
                include: {
                  attributeValue: {
                    include: {
                      attribute: true,
                      translations: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              position: 'asc',
            },
          },
          labels: true,
          productAttributes: {
            include: {
              attribute: true,
            },
          },
        },
      });
    } catch (error: any) {
      // If productAttributes table doesn't exist, retry without it
      if (error?.code === 'P2021' || error?.message?.includes('productAttributes') || error?.message?.includes('does not exist')) {
        console.warn('⚠️ [ADMIN PRODUCTS READ SERVICE] productAttributes table not found, fetching without it:', error.message);
        product = await db.product.findUnique({
          where: { id: productId },
          include: {
            translations: true,
            brand: {
              include: {
                translations: true,
              },
            },
            categories: {
              include: {
                translations: true,
              },
            },
            variants: {
              include: {
                options: {
                  include: {
                    attributeValue: {
                      include: {
                        attribute: true,
                        translations: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                position: 'asc',
              },
            },
            labels: true,
          },
        });
      } else {
        throw error;
      }
    }

    if (!product) {
      throw {
        status: 404,
        type: "https://api.shop.am/problems/not-found",
        title: "Product not found",
        detail: `Product with id '${productId}' does not exist`,
      };
    }

    // Безопасное получение translation с проверкой на существование массива
    const translations = Array.isArray(product.translations) ? product.translations : [];
    const translation = translations.find((t: { locale: string }) => t.locale === "en") || translations[0] || null;

    // Безопасное получение labels с проверкой на существование массива
    const labels = Array.isArray(product.labels) ? product.labels : [];
    
    // Безопасное получение variants с проверкой на существование массива
    const variants = Array.isArray(product.variants) ? product.variants : [];
    
    // Get all attribute IDs from productAttributes relation
    const productAttributes = Array.isArray((product as any).productAttributes) 
      ? (product as any).productAttributes 
      : [];
    const attributeIds = productAttributes
      .map((pa: any) => pa.attributeId || pa.attribute?.id)
      .filter((id: string | undefined): id is string => !!id);
    
    // Also include attributeIds from product.attributeIds if available (backward compatibility)
    const legacyAttributeIds = Array.isArray((product as any).attributeIds) 
      ? (product as any).attributeIds 
      : [];
    
    // Merge both sources and remove duplicates
    const allAttributeIds = Array.from(new Set([...attributeIds, ...legacyAttributeIds]));

    return {
      id: product.id,
      title: translation?.title || "",
      slug: translation?.slug || "",
      subtitle: translation?.subtitle || null,
      descriptionHtml: translation?.descriptionHtml || null,
      brandId: product.brandId || null,
      primaryCategoryId: product.primaryCategoryId || null,
      categoryIds: product.categoryIds || [],
      attributeIds: allAttributeIds, // All attribute IDs that this product has
      published: product.published,
      media: Array.isArray(product.media) ? product.media : [],
      labels: labels.map((label: { id: string; type: string; value: string; position: string; color: string | null }) => ({
        id: label.id,
        type: label.type,
        value: label.value,
        position: label.position,
        color: label.color,
      })),
      variants: variants.map((variant: any) => {
        // Безопасное получение options с проверкой на существование массива
        const options = Array.isArray(variant.options) ? variant.options : [];
        
        // Get attributes from JSONB column if available
        let attributes = null;
        let colorValues: string[] = [];
        let sizeValues: string[] = [];
        
        if (variant.attributes) {
          // attributes is already in JSONB format: { "color": [...], "size": [...] }
          attributes = variant.attributes;
          
          // Extract color and size values from JSONB attributes
          if (attributes.color && Array.isArray(attributes.color)) {
            colorValues = attributes.color.map((item: any) => item.value || item).filter(Boolean);
          }
          if (attributes.size && Array.isArray(attributes.size)) {
            sizeValues = attributes.size.map((item: any) => item.value || item).filter(Boolean);
          }
        } else if (options.length > 0) {
          // Fallback: build attributes from options if JSONB column is empty
          const attributesMap: Record<string, Array<{ valueId: string; value: string; attributeKey: string }>> = {};
          options.forEach((opt: any) => {
            const attrKey = opt.attributeKey || opt.attributeValue?.attribute?.key;
            const value = opt.value || opt.attributeValue?.value;
            const valueId = opt.valueId || opt.attributeValue?.id;
            
            if (attrKey && value && valueId) {
              if (!attributesMap[attrKey]) {
                attributesMap[attrKey] = [];
              }
              if (!attributesMap[attrKey].some((item: any) => item.valueId === valueId)) {
                attributesMap[attrKey].push({
                  valueId,
                  value,
                  attributeKey: attrKey,
                });
              }
              
              // Extract color and size for backward compatibility
              if (attrKey === "color") {
                colorValues.push(value);
              } else if (attrKey === "size") {
                sizeValues.push(value);
              }
            }
          });
          attributes = Object.keys(attributesMap).length > 0 ? attributesMap : null;
        }
        
        // For backward compatibility: use first color/size if multiple values exist
        const colorOption = options.find((opt: { attributeKey: string }) => opt.attributeKey === "color");
        const sizeOption = options.find((opt: { attributeKey: string }) => opt.attributeKey === "size");
        
        // Use first value from arrays or fallback to single option value
        const color = colorValues.length > 0 ? colorValues[0] : (colorOption?.value || "");
        const size = sizeValues.length > 0 ? sizeValues[0] : (sizeOption?.value || "");

        return {
          id: variant.id,
          price: variant.price.toString(),
          compareAtPrice: variant.compareAtPrice?.toString() || "",
          stock: variant.stock.toString(),
          sku: variant.sku || "",
          color: color, // First color for backward compatibility
          size: size, // First size for backward compatibility
          imageUrl: variant.imageUrl || "",
          published: variant.published || false,
          attributes: attributes, // JSONB attributes with all values - IMPORTANT: This is the main field
          options: options, // Keep options for backward compatibility
          // Additional fields for new format support
          colorValues: colorValues, // All color values
          sizeValues: sizeValues, // All size values
        };
      }),
    };
  }
}

export const adminProductsReadService = new AdminProductsReadService();

