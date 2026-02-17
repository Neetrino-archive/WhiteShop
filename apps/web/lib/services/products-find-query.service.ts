import { db } from "@white-shop/db";
import { Prisma } from "@prisma/client";
import { ensureProductVariantAttributesColumn } from "../utils/db-ensure";

interface ProductFilters {
  category?: string;
  search?: string;
  filter?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string;
  sizes?: string;
  brand?: string;
  sort?: string;
  page?: number;
  limit?: number;
  lang?: string;
}

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    translations: true;
    brand: {
      include: {
        translations: true;
      };
    };
    variants: {
      include: {
        options: true;
      };
    };
    labels: true;
    categories: {
      include: {
        translations: true;
      };
    };
  };
}>;

class ProductsFindQueryService {
  /**
   * Get all child category IDs recursively
   */
  private async getAllChildCategoryIds(parentId: string): Promise<string[]> {
    const children = await db.category.findMany({
      where: {
        parentId: parentId,
        published: true,
        deletedAt: null,
      },
      select: { id: true },
    });
    
    let allChildIds = children.map((c: { id: string }) => c.id);
    
    // Recursively get children of children
    for (const child of children) {
      const grandChildren = await this.getAllChildCategoryIds(child.id);
      allChildIds = [...allChildIds, ...grandChildren];
    }
    
    return allChildIds;
  }

  /**
   * Build where clause and fetch products from database
   */
  async buildQueryAndFetch(filters: ProductFilters): Promise<{
    products: ProductWithRelations[];
    bestsellerProductIds: string[];
  }> {
    const {
      category,
      search,
      filter,
      lang = "en",
      limit = 24,
    } = filters;

    const bestsellerProductIds: string[] = [];

    // Build where clause
    const where: Prisma.ProductWhereInput = {
      published: true,
      deletedAt: null,
    };

    // Add search filter
    if (search && search.trim()) {
      where.OR = [
        {
          translations: {
            some: {
              title: {
                contains: search.trim(),
                mode: "insensitive",
              },
            },
          },
        },
        {
          translations: {
            some: {
              subtitle: {
                contains: search.trim(),
                mode: "insensitive",
              },
            },
          },
        },
        {
          variants: {
            some: {
              sku: {
                contains: search.trim(),
                mode: "insensitive",
              },
            },
          },
        },
      ];
    }

    // Add category filter
    if (category) {
      console.log('🔍 [PRODUCTS FIND QUERY SERVICE] Looking for category:', { category, lang });
      let categoryDoc = await db.category.findFirst({
        where: {
          translations: {
            some: {
              slug: category,
              locale: lang,
            },
          },
          published: true,
          deletedAt: null,
        },
      });

      // If category not found in current language, try to find it in other languages (fallback)
      if (!categoryDoc) {
        console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] Category not found in language:', { category, lang });
        console.log('🔄 [PRODUCTS FIND QUERY SERVICE] Trying to find category in other languages...');
        categoryDoc = await db.category.findFirst({
          where: {
            translations: {
              some: {
                slug: category,
              },
            },
            published: true,
            deletedAt: null,
          },
        });
        
        if (categoryDoc) {
          console.log('✅ [PRODUCTS FIND QUERY SERVICE] Category found in different language:', { 
            id: categoryDoc.id, 
            slug: category,
            foundIn: categoryDoc.translations?.find((t: { slug: string; locale: string }) => t.slug === category)?.locale || 'unknown'
          });
        }
      }

      if (categoryDoc) {
        console.log('✅ [PRODUCTS FIND QUERY SERVICE] Category found:', { id: categoryDoc.id, slug: category });
        
        // Get all child categories (subcategories) recursively
        const childCategoryIds = await this.getAllChildCategoryIds(categoryDoc.id);
        const allCategoryIds = [categoryDoc.id, ...childCategoryIds];
        
        console.log('📂 [PRODUCTS FIND QUERY SERVICE] Category IDs to include:', {
          parent: categoryDoc.id,
          children: childCategoryIds,
          total: allCategoryIds.length
        });
        
        // Build OR conditions for all categories (parent + children)
        const categoryConditions = allCategoryIds.flatMap((catId: string) => [
          { primaryCategoryId: catId },
          { categoryIds: { has: catId } },
        ]);
        
        if (where.OR) {
          where.AND = [
            { OR: where.OR },
            {
              OR: categoryConditions,
            },
          ];
          delete where.OR;
        } else {
          where.OR = categoryConditions;
        }
      } else {
        console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] Category not found in any language:', { category, lang });
        // Return empty result if category not found
        return {
          products: [],
          bestsellerProductIds: [],
        };
      }
    }

    // Add filter for new, featured, bestseller
    if (filter === "new") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      where.createdAt = { gte: thirtyDaysAgo };
    } else if (filter === "featured") {
      where.featured = true;
    } else if (filter === "bestseller") {
      type BestsellerVariant = { variantId: string | null; _sum: { quantity: number | null } };
      const bestsellerVariants: BestsellerVariant[] = await db.orderItem.groupBy({
        by: ["variantId"],
        _sum: { quantity: true },
        where: {
          variantId: {
            not: null,
          },
        },
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
        take: 200,
      });

      const variantIds = bestsellerVariants
        .map((item) => item.variantId)
        .filter((id): id is string => Boolean(id));

      if (variantIds.length > 0) {
        const variantProductMap = await db.productVariant.findMany({
          where: { id: { in: variantIds } },
          select: { id: true, productId: true },
        });

        const variantToProduct = new Map<string, string>();
        variantProductMap.forEach(({ id, productId }: { id: string; productId: string }) => {
          variantToProduct.set(id, productId);
        });

        const productSales = new Map<string, number>();
        bestsellerVariants.forEach((item: BestsellerVariant) => {
          const variantId = item.variantId;
          if (!variantId) return;
          const productId = variantToProduct.get(variantId);
          if (!productId) return;
          const qty = item._sum?.quantity || 0;
          productSales.set(productId, (productSales.get(productId) || 0) + qty);
        });

        bestsellerProductIds.push(
          ...Array.from(productSales.entries())
            .sort((a, b) => (b[1] || 0) - (a[1] || 0))
            .map(([productId]) => productId)
        );

        if (bestsellerProductIds.length > 0) {
          where.id = {
            in: bestsellerProductIds,
          };
        }
      }
    }

    // Get products
    console.log('🔍 [PRODUCTS FIND QUERY SERVICE] Fetching products with where clause:', JSON.stringify(where, null, 2));
    
    // Base include without productAttributes (for backward compatibility)
    const baseInclude = {
      translations: true,
      brand: {
        include: {
          translations: true,
        },
      },
      variants: {
        where: {
          published: true,
        },
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
      },
      labels: true,
      categories: {
        include: {
          translations: true,
        },
      },
    };

    // Try to include productAttributes, but fallback if table doesn't exist
    // Also handle case when attribute_values.colors column doesn't exist
    let products;
    try {
      products = await db.product.findMany({
        where,
        include: {
          ...baseInclude,
          productAttributes: {
            include: {
              attribute: {
                include: {
                  translations: true,
                  values: {
                    include: {
                      translations: true,
                    },
                  },
                },
              },
            },
          },
        },
        skip: 0,
        take: limit * 10, // Get more to filter in memory
      });
      console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (with productAttributes)`);
    } catch (error: any) {
      // If productAttributes table doesn't exist, retry without it
      if (error?.code === 'P2021' || error?.message?.includes('product_attributes') || error?.message?.includes('does not exist')) {
        console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] product_attributes table not found, fetching without it:', error.message);
        try {
          products = await db.product.findMany({
            where,
            include: baseInclude,
            skip: 0,
            take: limit * 10,
          });
          console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (without productAttributes)`);
        } catch (retryError: any) {
          // If product_variants.attributes column doesn't exist, try to create it and retry
          if (retryError?.message?.includes('product_variants.attributes') || 
              (retryError?.message?.includes('attributes') && retryError?.message?.includes('does not exist'))) {
            console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] product_variants.attributes column not found, attempting to create it...');
            try {
              await ensureProductVariantAttributesColumn();
              // Retry the query after creating the column
              products = await db.product.findMany({
                where,
                include: baseInclude,
                skip: 0,
                take: limit * 10,
              });
              console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (after creating attributes column)`);
            } catch (attributesError: any) {
              // If still fails, try without attributeValue include
              if (attributesError?.code === 'P2022' || attributesError?.message?.includes('attribute_values.colors') || attributesError?.message?.includes('does not exist')) {
                console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] attribute_values.colors column not found, fetching without attributeValue:', attributesError.message);
                const baseIncludeWithoutAttributeValue = {
                  ...baseInclude,
                  variants: {
                    ...baseInclude.variants,
                    include: {
                      options: true, // Include options without attributeValue relation
                    },
                  },
                };
                products = await db.product.findMany({
                  where,
                  include: baseIncludeWithoutAttributeValue,
                  skip: 0,
                  take: limit * 10,
                });
                console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (without attributeValue relation)`);
              } else {
                throw attributesError;
              }
            }
          } else if (retryError?.code === 'P2022' || retryError?.message?.includes('attribute_values.colors') || retryError?.message?.includes('does not exist')) {
            // If attribute_values.colors column doesn't exist, retry without attributeValue include
            console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] attribute_values.colors column not found, fetching without attributeValue:', retryError.message);
            const baseIncludeWithoutAttributeValue = {
              ...baseInclude,
              variants: {
                ...baseInclude.variants,
                include: {
                  options: true, // Include options without attributeValue relation
                },
              },
            };
            products = await db.product.findMany({
              where,
              include: baseIncludeWithoutAttributeValue,
              skip: 0,
              take: limit * 10,
            });
            console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (without attributeValue relation)`);
          } else {
            throw retryError;
          }
        }
      } else if (error?.code === 'P2022' || error?.message?.includes('attribute_values.colors') || error?.message?.includes('does not exist')) {
        // If attribute_values.colors column doesn't exist, retry without attributeValue include
        console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] attribute_values.colors column not found, fetching without attributeValue:', error.message);
        const baseIncludeWithoutAttributeValue = {
          ...baseInclude,
          variants: {
            ...baseInclude.variants,
            include: {
              options: true, // Include options without attributeValue relation
            },
          },
        };
        try {
          products = await db.product.findMany({
            where,
            include: {
              ...baseIncludeWithoutAttributeValue,
              productAttributes: {
                include: {
                  attribute: {
                    include: {
                      translations: true,
                      values: {
                        include: {
                          translations: true,
                        },
                      },
                    },
                  },
                },
              },
            },
            skip: 0,
            take: limit * 10,
          });
          console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (without attributeValue, with productAttributes)`);
        } catch (retryError: any) {
          // If productAttributes also fails, try without it
          if (retryError?.code === 'P2021' || retryError?.message?.includes('product_attributes')) {
            products = await db.product.findMany({
              where,
              include: baseIncludeWithoutAttributeValue,
              skip: 0,
              take: limit * 10,
            });
            console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (without attributeValue and productAttributes)`);
          } else {
            throw retryError;
          }
        }
      } else {
        // Re-throw if it's a different error
        throw error;
      }
    }

    return {
      products: products as ProductWithRelations[],
      bestsellerProductIds,
    };
  }
}

export const productsFindQueryService = new ProductsFindQueryService();
export type { ProductFilters, ProductWithRelations };

