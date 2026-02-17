import { db } from "@white-shop/db";
import { Prisma } from "@prisma/client";
import { adminService } from "./admin.service";
import { ProductWithRelations } from "./products-find-query.service";

class ProductsFiltersService {
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
   * Get available filters (colors and sizes)
   */
  async getFilters(filters: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    lang?: string;
  }) {
    try {
      const where: Prisma.ProductWhereInput = {
        published: true,
        deletedAt: null,
      };

      // Add search filter
      if (filters.search && filters.search.trim()) {
        where.OR = [
          {
            translations: {
              some: {
                title: {
                  contains: filters.search.trim(),
                  mode: "insensitive",
                },
              },
            },
          },
          {
            translations: {
              some: {
                subtitle: {
                  contains: filters.search.trim(),
                  mode: "insensitive",
                },
              },
            },
          },
          {
            variants: {
              some: {
                sku: {
                  contains: filters.search.trim(),
                  mode: "insensitive",
                },
              },
            },
          },
        ];
      }

      // Add category filter
      if (filters.category) {
        try {
          const categoryDoc = await db.category.findFirst({
            where: {
              translations: {
                some: {
                  slug: filters.category,
                  locale: filters.lang || "en",
                },
              },
              published: true,
              deletedAt: null,
            },
          });

          if (categoryDoc && categoryDoc.id) {
            // Get all child categories (subcategories) recursively
            const childCategoryIds = await this.getAllChildCategoryIds(categoryDoc.id);
            const allCategoryIds = [categoryDoc.id, ...childCategoryIds];
            
            console.log('📂 [PRODUCTS FILTERS SERVICE] Category IDs to include in filters:', {
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
          }
        } catch (categoryError) {
          console.error('❌ [PRODUCTS FILTERS SERVICE] Error fetching category:', categoryError);
          // Continue without category filter if there's an error
        }
      }

      // Get products with variants
      let products;
      try {
        products = await db.product.findMany({
          where,
          include: {
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
            productAttributes: {
              include: {
                attribute: {
                  include: {
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
        });
      } catch (dbError) {
        console.error('❌ [PRODUCTS FILTERS SERVICE] Error fetching products in getFilters:', dbError);
        throw dbError;
      }

      // Ensure products is an array
      if (!products || !Array.isArray(products)) {
        products = [];
      }

    // Filter by price in memory
    if (filters.minPrice || filters.maxPrice) {
      const min = filters.minPrice || 0;
      const max = filters.maxPrice || Infinity;
      products = products.filter((product: ProductWithRelations) => {
        if (!product || !product.variants || !Array.isArray(product.variants)) {
          return false;
        }
        const prices = product.variants.map((v: { price?: number }) => v?.price).filter((p: number | undefined): p is number => p !== undefined);
        if (prices.length === 0) return false;
        const minPrice = Math.min(...prices);
        return minPrice >= min && minPrice <= max;
      });
    }

    // Collect colors and sizes from variants
    // Use Map with lowercase key to merge colors with different cases
    // Store both count, canonical label, imageUrl and colors hex
    const lang = filters.lang || 'en';
    const colorMap = new Map<string, { 
      count: number; 
      label: string; 
      imageUrl?: string | null; 
      colors?: string[] | null;
    }>();
    const sizeMap = new Map<string, number>();

    products.forEach((product: ProductWithRelations) => {
      if (!product || !product.variants || !Array.isArray(product.variants)) {
        return;
      }
      product.variants.forEach((variant: any) => {
        if (!variant || !variant.options || !Array.isArray(variant.options)) {
          return;
        }
        variant.options.forEach((option: any) => {
          if (!option) return;
          
          // Check if it's a color option (support multiple formats)
          const isColor = option.attributeKey === "color" || 
                         option.key === "color" ||
                         option.attribute === "color" ||
                         (option.attributeValue && option.attributeValue.attribute?.key === "color");
          
          if (isColor) {
            let colorValue = "";
            let imageUrl: string | null | undefined = null;
            let colorsHex: string[] | null | undefined = null;
            
            // New format: Use AttributeValue if available
            if (option.attributeValue) {
              const translation = option.attributeValue.translations?.find((t: { locale: string }) => t.locale === lang) || option.attributeValue.translations?.[0];
              colorValue = translation?.label || option.attributeValue.value || "";
              imageUrl = option.attributeValue.imageUrl || null;
              colorsHex = option.attributeValue.colors || null;
            } else if (option.value) {
              // Old format: use value directly
              colorValue = option.value.trim();
            } else if (option.key === "color" || option.attribute === "color") {
              // Fallback: try to get from option itself
              colorValue = option.value || option.label || "";
            }
            
            if (colorValue) {
              const colorKey = colorValue.toLowerCase();
              const existing = colorMap.get(colorKey);
              
              // Prefer capitalized version for label (e.g., "Black" over "black")
              // If both exist, keep the one that starts with uppercase
              const preferredLabel = existing 
                ? (colorValue[0] === colorValue[0].toUpperCase() ? colorValue : existing.label)
                : colorValue;
              
              // Prefer imageUrl and colors from AttributeValue if available
              const finalImageUrl = imageUrl || existing?.imageUrl || null;
              const finalColors = colorsHex || existing?.colors || null;
              
              colorMap.set(colorKey, {
                count: (existing?.count || 0) + 1,
                label: preferredLabel,
                imageUrl: finalImageUrl,
                colors: finalColors,
              });
            }
          } else {
            // Check if it's a size option (support multiple formats)
            const isSize = option.attributeKey === "size" || 
                          option.key === "size" ||
                          option.attribute === "size" ||
                          (option.attributeValue && option.attributeValue.attribute?.key === "size");
            
            if (isSize) {
              let sizeValue = "";
              
              // New format: Use AttributeValue if available
              if (option.attributeValue) {
                const translation = option.attributeValue.translations?.find((t: { locale: string }) => t.locale === lang) || option.attributeValue.translations?.[0];
                sizeValue = translation?.label || option.attributeValue.value || "";
              } else if (option.value) {
                // Old format: use value directly
                sizeValue = option.value.trim();
              } else if (option.key === "size" || option.attribute === "size") {
                // Fallback: try to get from option itself
                sizeValue = option.value || option.label || "";
              }
              
              if (sizeValue) {
                const normalizedSize = sizeValue.trim().toUpperCase();
                sizeMap.set(normalizedSize, (sizeMap.get(normalizedSize) || 0) + 1);
              }
            }
          }
        });
      });
      
      // Also check productAttributes for color attribute values with imageUrl and colors
      if ((product as any).productAttributes && Array.isArray((product as any).productAttributes)) {
        (product as any).productAttributes.forEach((productAttr: any) => {
          if (productAttr.attribute?.key === 'color' && productAttr.attribute?.values) {
            productAttr.attribute.values.forEach((attrValue: any) => {
              const translation = attrValue.translations?.find((t: { locale: string }) => t.locale === lang) || attrValue.translations?.[0];
              const colorValue = translation?.label || attrValue.value || "";
              if (colorValue) {
                const colorKey = colorValue.toLowerCase();
                const existing = colorMap.get(colorKey);
                // Update if we have imageUrl or colors hex and they're not already set
                if (attrValue.imageUrl || attrValue.colors) {
                  colorMap.set(colorKey, {
                    count: existing?.count || 0,
                    label: existing?.label || colorValue,
                    imageUrl: attrValue.imageUrl || existing?.imageUrl || null,
                    colors: attrValue.colors || existing?.colors || null,
                  });
                }
              }
            });
          }
        });
      }
    });

    // Convert maps to arrays
    const colors: Array<{ value: string; label: string; count: number; imageUrl?: string | null; colors?: string[] | null }> = Array.from(
      colorMap.entries()
    ).map(([key, data]) => ({
      value: key, // lowercase for filtering
      label: data.label, // canonical label (prefer capitalized)
      count: data.count, // merged count
      imageUrl: data.imageUrl || null,
      colors: data.colors || null,
    }));

    const sizes: Array<{ value: string; count: number }> = Array.from(
      sizeMap.entries()
    ).map(([value, count]: [string, number]) => ({
      value,
      count,
    }));

    // Sort sizes by predefined order
    const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    sizes.sort((a: { value: string }, b: { value: string }) => {
      const aIndex = SIZE_ORDER.indexOf(a.value);
      const bIndex = SIZE_ORDER.indexOf(b.value);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.value.localeCompare(b.value);
    });

      // Sort colors alphabetically
      colors.sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label));

      return {
        colors,
        sizes,
      };
    } catch (error) {
      console.error('❌ [PRODUCTS FILTERS SERVICE] Error in getFilters:', error);
      // Return empty arrays on error
      return {
        colors: [],
        sizes: [],
      };
    }
  }

  /**
   * Get price range
   */
  async getPriceRange(filters: { category?: string; lang?: string }) {
    const where: Prisma.ProductWhereInput = {
      published: true,
      deletedAt: null,
    };

    if (filters.category) {
      const categoryDoc = await db.category.findFirst({
        where: {
          translations: {
            some: {
              slug: filters.category,
              locale: filters.lang || "en",
            },
          },
        },
      });

      if (categoryDoc) {
        where.OR = [
          { primaryCategoryId: categoryDoc.id },
          { categoryIds: { has: categoryDoc.id } },
        ];
      }
    }

    const products = await db.product.findMany({
      where,
      include: {
        variants: {
          where: {
            published: true,
          },
        },
      },
    });

    let minPrice = Infinity;
    let maxPrice = 0;

    products.forEach((product: { variants: Array<{ price: number }> }) => {
      if (product.variants.length > 0) {
        const prices = product.variants.map((v: { price: number }) => v.price);
        const productMin = Math.min(...prices);
        const productMax = Math.max(...prices);
        if (productMin < minPrice) minPrice = productMin;
        if (productMax > maxPrice) maxPrice = productMax;
      }
    });

    minPrice = minPrice === Infinity ? 0 : Math.floor(minPrice / 1000) * 1000;
    maxPrice = maxPrice === 0 ? 100000 : Math.ceil(maxPrice / 1000) * 1000;

    // Load price filter settings to provide optional step sizes per currency
    let stepSize: number | null = null;
    let stepSizePerCurrency: {
      USD?: number;
      AMD?: number;
      RUB?: number;
      GEL?: number;
    } | null = null;

    try {
      const settings = await adminService.getPriceFilterSettings();
      stepSize = settings.stepSize ?? null;

      if (settings.stepSizePerCurrency) {
        // stepSizePerCurrency in settings is stored in display currency units.
        // Here we pass them through to the frontend as-is; the slider logic
        // will choose the appropriate value for the active currency.
        stepSizePerCurrency = {
          USD: settings.stepSizePerCurrency.USD ?? undefined,
          AMD: settings.stepSizePerCurrency.AMD ?? undefined,
          RUB: settings.stepSizePerCurrency.RUB ?? undefined,
          GEL: settings.stepSizePerCurrency.GEL ?? undefined,
        };
      }
    } catch (error) {
      console.error('❌ [PRODUCTS FILTERS SERVICE] Error loading price filter settings for price range:', error);
    }

    return {
      min: minPrice,
      max: maxPrice,
      stepSize,
      stepSizePerCurrency,
    };
  }
}

export const productsFiltersService = new ProductsFiltersService();

