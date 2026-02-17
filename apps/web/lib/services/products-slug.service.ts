import { db } from "@white-shop/db";
import { ensureProductVariantAttributesColumn } from "../utils/db-ensure";
import {
  processImageUrl,
  smartSplitUrls,
  cleanImageUrls,
  separateMainAndVariantImages,
} from "../utils/image-utils";
import { translations } from "../translations";

/**
 * Get "Out of Stock" translation for a given language
 */
const getOutOfStockLabel = (lang: string = "en"): string => {
  const langKey = lang as keyof typeof translations;
  const translation = translations[langKey] || translations.en;
  return translation.stock.outOfStock;
};

class ProductsSlugService {
  /**
   * Get product by slug
   */
  async findBySlug(slug: string, lang: string = "en") {
    // Base include without productAttributes (for backward compatibility)
    const baseInclude = {
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
    };

    // Try to include productAttributes, but fallback if table doesn't exist
    // Also handle case when attribute_values.colors column doesn't exist
    let product;
    try {
      product = await db.product.findFirst({
        where: {
          translations: {
            some: {
              slug,
              locale: lang,
            },
          },
          published: true,
          deletedAt: null,
        },
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
      });
      console.log('✅ [PRODUCTS SLUG SERVICE] Successfully fetched product with productAttributes');
      console.log('✅ [PRODUCTS SLUG SERVICE] productAttributes count:', (product as any).productAttributes?.length || 0);
    } catch (error: any) {
      // If productAttributes table doesn't exist, retry without it
      if (error?.code === 'P2021' || error?.message?.includes('product_attributes') || error?.message?.includes('does not exist')) {
        console.warn('⚠️ [PRODUCTS SLUG SERVICE] product_attributes table not found, fetching without it:', error.message);
        try {
          product = await db.product.findFirst({
            where: {
              translations: {
                some: {
                  slug,
                  locale: lang,
                },
              },
              published: true,
              deletedAt: null,
            },
            include: baseInclude,
          });
          console.log('⚠️ [PRODUCTS SLUG SERVICE] Fallback query (without productAttributes) - productAttributes count:', (product as any).productAttributes?.length || 0);
        } catch (retryError: any) {
          // If product_variants.attributes column doesn't exist, try to create it and retry
          if (retryError?.message?.includes('product_variants.attributes') || 
              (retryError?.message?.includes('attributes') && retryError?.message?.includes('does not exist'))) {
            console.warn('⚠️ [PRODUCTS SLUG SERVICE] product_variants.attributes column not found, attempting to create it...');
            try {
              await ensureProductVariantAttributesColumn();
              // Retry the query after creating the column
              product = await db.product.findFirst({
                where: {
                  translations: {
                    some: {
                      slug,
                      locale: lang,
                    },
                  },
                  published: true,
                  deletedAt: null,
                },
                include: baseInclude,
              });
            } catch (attributesError: any) {
              // If still fails, try without attributeValue include
              if (attributesError?.code === 'P2022' || attributesError?.message?.includes('attribute_values.colors') || attributesError?.message?.includes('does not exist')) {
                console.warn('⚠️ [PRODUCTS SLUG SERVICE] attribute_values.colors column not found, fetching without attributeValue:', attributesError.message);
                const baseIncludeWithoutAttributeValue = {
                  ...baseInclude,
                  variants: {
                    ...baseInclude.variants,
                    include: {
                      options: true, // Include options without attributeValue relation
                    },
                  },
                };
                // Try to include productAttributes even in fallback
                try {
                  product = await db.product.findFirst({
                    where: {
                      translations: {
                        some: {
                          slug,
                          locale: lang,
                        },
                      },
                      published: true,
                      deletedAt: null,
                    },
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
                  });
                } catch (productAttrError: any) {
                  // If productAttributes also fails, retry without it
                  if (productAttrError?.code === 'P2021' || productAttrError?.message?.includes('product_attributes')) {
                    product = await db.product.findFirst({
                      where: {
                        translations: {
                          some: {
                            slug,
                            locale: lang,
                          },
                        },
                        published: true,
                        deletedAt: null,
                      },
                      include: baseIncludeWithoutAttributeValue,
                    });
                  } else {
                    throw productAttrError;
                  }
                }
              } else {
                throw attributesError;
              }
            }
          } else if (retryError?.code === 'P2022' || retryError?.message?.includes('attribute_values.colors') || retryError?.message?.includes('does not exist')) {
            // If attribute_values.colors column doesn't exist, retry without attributeValue include
            console.warn('⚠️ [PRODUCTS SLUG SERVICE] attribute_values.colors column not found, fetching without attributeValue:', retryError.message);
            const baseIncludeWithoutAttributeValue = {
              ...baseInclude,
              variants: {
                ...baseInclude.variants,
                include: {
                  options: true, // Include options without attributeValue relation
                },
              },
            };
            // Try to include productAttributes even in fallback
            try {
              product = await db.product.findFirst({
                where: {
                  translations: {
                    some: {
                      slug,
                      locale: lang,
                    },
                  },
                  published: true,
                  deletedAt: null,
                },
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
              });
            } catch (productAttrError: any) {
              // If productAttributes also fails, retry without it
              if (productAttrError?.code === 'P2021' || productAttrError?.message?.includes('product_attributes')) {
                product = await db.product.findFirst({
                  where: {
                    translations: {
                      some: {
                        slug,
                        locale: lang,
                      },
                    },
                    published: true,
                    deletedAt: null,
                  },
                  include: baseIncludeWithoutAttributeValue,
                });
              } else {
                throw productAttrError;
              }
            }
          } else {
            throw retryError;
          }
        }
      } else if (error?.message?.includes('product_variants.attributes') || 
                 (error?.message?.includes('attributes') && error?.message?.includes('does not exist'))) {
        // If product_variants.attributes column doesn't exist, try to create it and retry
        console.warn('⚠️ [PRODUCTS SLUG SERVICE] product_variants.attributes column not found, attempting to create it...');
        try {
          await ensureProductVariantAttributesColumn();
          // Retry the query after creating the column
          product = await db.product.findFirst({
            where: {
              translations: {
                some: {
                  slug,
                  locale: lang,
                },
              },
              published: true,
              deletedAt: null,
            },
            include: baseInclude,
          });
        } catch (attributesError: any) {
          // If still fails, try without attributeValue include
          if (attributesError?.code === 'P2022' || attributesError?.message?.includes('attribute_values.colors') || attributesError?.message?.includes('does not exist')) {
            console.warn('⚠️ [PRODUCTS SLUG SERVICE] attribute_values.colors column not found, fetching without attributeValue:', attributesError.message);
            const baseIncludeWithoutAttributeValue = {
              ...baseInclude,
              variants: {
                ...baseInclude.variants,
                include: {
                  options: true, // Include options without attributeValue relation
                },
              },
            };
            // Try to include productAttributes even in fallback
            try {
              product = await db.product.findFirst({
                where: {
                  translations: {
                    some: {
                      slug,
                      locale: lang,
                    },
                  },
                  published: true,
                  deletedAt: null,
                },
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
              });
            } catch (productAttrError: any) {
              // If productAttributes also fails, retry without it
              if (productAttrError?.code === 'P2021' || productAttrError?.message?.includes('product_attributes')) {
                product = await db.product.findFirst({
                  where: {
                    translations: {
                      some: {
                        slug,
                        locale: lang,
                      },
                    },
                    published: true,
                    deletedAt: null,
                  },
                  include: baseIncludeWithoutAttributeValue,
                });
              } else {
                throw productAttrError;
              }
            }
          } else {
            throw attributesError;
          }
        }
      } else if (error?.code === 'P2022' || error?.message?.includes('attribute_values.colors') || error?.message?.includes('does not exist')) {
        // If attribute_values.colors column doesn't exist, retry without attributeValue include
        console.warn('⚠️ [PRODUCTS SLUG SERVICE] attribute_values.colors column not found, fetching without attributeValue:', error.message);
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
          product = await db.product.findFirst({
            where: {
              translations: {
                some: {
                  slug,
                  locale: lang,
                },
              },
              published: true,
              deletedAt: null,
            },
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
          });
        } catch (retryError: any) {
          // If productAttributes also fails, try without it
          if (retryError?.code === 'P2021' || retryError?.message?.includes('product_attributes')) {
            product = await db.product.findFirst({
              where: {
                translations: {
                  some: {
                    slug,
                    locale: lang,
                  },
                },
                published: true,
                deletedAt: null,
              },
              include: baseIncludeWithoutAttributeValue,
            });
          } else {
            throw retryError;
          }
        }
      } else {
        // Re-throw if it's a different error
        throw error;
      }
    }

    if (!product) {
      throw {
        status: 404,
        type: "https://api.shop.am/problems/not-found",
        title: "Product not found",
        detail: `Product with slug '${slug}' does not exist or is not published`,
      };
    }

    // Безопасное получение translation с проверкой на существование массива
    const translations = Array.isArray(product.translations) ? product.translations : [];
    const translation = translations.find((t: { locale: string }) => t.locale === lang) || translations[0] || null;
    
    // Безопасное получение brand translation
    const brandTranslations = product.brand && Array.isArray(product.brand.translations)
      ? product.brand.translations
      : [];
    const brandTranslation = brandTranslations.length > 0
      ? brandTranslations.find((t: { locale: string }) => t.locale === lang) || brandTranslations[0]
      : null;

    // Get all discount settings
    const discountSettings = await db.settings.findMany({
      where: {
        key: {
          in: ["globalDiscount", "categoryDiscounts", "brandDiscounts"],
        },
      },
    });

    const globalDiscountSetting = discountSettings.find((s: { key: string; value: unknown }) => s.key === "globalDiscount");
    const globalDiscount = Number(globalDiscountSetting?.value) || 0;
    
    const categoryDiscountsSetting = discountSettings.find((s: { key: string; value: unknown }) => s.key === "categoryDiscounts");
    const categoryDiscounts = categoryDiscountsSetting ? (categoryDiscountsSetting.value as Record<string, number>) || {} : {};
    
    const brandDiscountsSetting = discountSettings.find((s: { key: string; value: unknown }) => s.key === "brandDiscounts");
    const brandDiscounts = brandDiscountsSetting ? (brandDiscountsSetting.value as Record<string, number>) || {} : {};
    
    const productDiscount = product.discountPercent || 0;
    
    // Calculate actual discount with priority: productDiscount > categoryDiscount > brandDiscount > globalDiscount
    let actualDiscount = 0;
    if (productDiscount > 0) {
      actualDiscount = productDiscount;
    } else {
      // Check category discounts
      const primaryCategoryId = product.primaryCategoryId;
      if (primaryCategoryId && categoryDiscounts[primaryCategoryId]) {
        actualDiscount = categoryDiscounts[primaryCategoryId];
      } else {
        // Check brand discounts
        const brandId = product.brandId;
        if (brandId && brandDiscounts[brandId]) {
          actualDiscount = brandDiscounts[brandId];
        } else if (globalDiscount > 0) {
          actualDiscount = globalDiscount;
        }
      }
    }

    return {
      id: product.id,
      slug: translation?.slug || "",
      title: translation?.title || "",
      subtitle: translation?.subtitle || null,
      description: translation?.descriptionHtml || null,
      brand: product.brand
        ? {
            id: product.brand.id,
            slug: product.brand.slug,
            name: brandTranslation?.name || "",
            logo: product.brand.logoUrl,
          }
        : null,
      categories: Array.isArray(product.categories) ? product.categories.map((cat: { id: string; translations?: Array<{ locale: string; slug: string; title: string }> }) => {
        const catTranslations = Array.isArray(cat.translations) ? cat.translations : [];
        const catTranslation = catTranslations.find((t: { locale: string }) => t.locale === lang) || catTranslations[0] || null;
        return {
          id: cat.id,
          slug: catTranslation?.slug || "",
          title: catTranslation?.title || "",
        };
      }) : [],
      media: (() => {
        // Use unified image utilities for consistent processing
        if (!Array.isArray(product.media)) {
          console.log('📸 [PRODUCTS SLUG SERVICE] Product media is not an array, returning empty array');
          return [];
        }
        
        // Collect all variant images for separation
        const variantImages: any[] = [];
        if (Array.isArray(product.variants) && product.variants.length > 0) {
          product.variants.forEach((variant: any) => {
            if (variant.imageUrl) {
              // Use smartSplitUrls to handle comma-separated and base64 images
              const urls = smartSplitUrls(variant.imageUrl);
              variantImages.push(...urls);
            }
          });
        }
        
        // Separate main images from variant images using unified utility
        const { main } = separateMainAndVariantImages(product.media, variantImages);
        
        // Clean and validate final main images
        const cleanedMain = cleanImageUrls(main);
        
        console.log('📸 [PRODUCTS SLUG SERVICE] Main media images count (after cleanup):', cleanedMain.length);
        console.log('📸 [PRODUCTS SLUG SERVICE] Variant images excluded:', variantImages.length);
        if (cleanedMain.length > 0) {
          console.log('📸 [PRODUCTS SLUG SERVICE] Main media (first 3):', cleanedMain.slice(0, 3).map((img: string) => img.substring(0, 50)));
        }
        
        return cleanedMain;
      })(),
      labels: (() => {
        // Map existing labels
        const existingLabels = Array.isArray(product.labels) ? product.labels.map((label: { id: string; type: string; value: string; position: string; color: string | null }) => ({
          id: label.id,
          type: label.type,
          value: label.value,
          position: label.position,
          color: label.color,
        })) : [];
        
        // Check if all variants are out of stock
        const variants = Array.isArray(product.variants) ? product.variants : [];
        const isOutOfStock = variants.length === 0 || variants.every((v: { stock: number }) => (v.stock || 0) <= 0);
        
        // If out of stock, add "Out of Stock" label
        if (isOutOfStock) {
          // Check if "Out of Stock" label already exists
          const outOfStockText = getOutOfStockLabel(lang);
          const hasOutOfStockLabel = existingLabels.some(
            (label: { value: string }) => label.value.toLowerCase() === outOfStockText.toLowerCase() ||
                       label.value.toLowerCase().includes('out of stock') ||
                       label.value.toLowerCase().includes('արտադրված') ||
                       label.value.toLowerCase().includes('нет в наличии') ||
                       label.value.toLowerCase().includes('არ არის მარაგში')
          );
          
          if (!hasOutOfStockLabel) {
            // Check if top-left position is available, otherwise use top-right
            const topLeftOccupied = existingLabels.some((l: { position: string }) => l.position === 'top-left');
            const position = topLeftOccupied ? 'top-right' : 'top-left';
            
            existingLabels.push({
              id: `out-of-stock-${product.id}`,
              type: 'text',
              value: outOfStockText,
              position: position as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
              color: '#6B7280', // Gray color for out of stock
            });
            
            console.log(`🏷️ [PRODUCTS SLUG SERVICE] Added "Out of Stock" label to product ${product.id} (${lang})`);
          }
        }
        
        return existingLabels;
      })(),
      variants: Array.isArray(product.variants) ? product.variants
        .sort((a: { price: number }, b: { price: number }) => a.price - b.price)
        .map((variant: { id: string; sku: string | null; price: number; compareAtPrice: number | null; stock: number; imageUrl?: string | null; options?: Array<{ attributeKey?: string | null; value?: string | null }> }) => {
          const originalPrice = variant.price;
          let finalPrice = originalPrice;
          let discountPrice = null;

          if (actualDiscount > 0 && originalPrice > 0) {
            discountPrice = originalPrice;
            finalPrice = originalPrice * (1 - actualDiscount / 100);
          }

          // Process and clean variant imageUrl
          let variantImageUrl: string | null = null;
          if (variant.imageUrl) {
            // Use smartSplitUrls to handle comma-separated URLs
            const urls = smartSplitUrls(variant.imageUrl);
            // Process and validate each URL
            const processedUrls = urls.map(url => processImageUrl(url)).filter((url): url is string => url !== null);
            // Use first valid URL, or join if multiple (comma-separated)
            variantImageUrl = processedUrls.length > 0 ? processedUrls.join(',') : null;
          }
          
          // Log variant image for verification
          if (variantImageUrl) {
            console.log(`📸 [PRODUCTS SLUG SERVICE] Variant ${variant.id} (SKU: ${variant.sku}) has imageUrl:`, variantImageUrl.substring(0, 50) + (variantImageUrl.length > 50 ? '...' : ''));
          }
          
          return {
            id: variant.id,
            sku: variant.sku || "",
            price: finalPrice,
            originalPrice: discountPrice || variant.compareAtPrice || null,
            compareAtPrice: variant.compareAtPrice || null,
            globalDiscount: globalDiscount > 0 ? globalDiscount : null,
            productDiscount: productDiscount > 0 ? productDiscount : null,
            stock: variant.stock,
            imageUrl: variantImageUrl,
            options: Array.isArray(variant.options) ? variant.options.map((opt: any) => {
              // Support both new format (AttributeValue) and old format (attributeKey/value)
              if (opt.attributeValue) {
                // New format: use AttributeValue
                const attrValue = opt.attributeValue;
                const attr = attrValue.attribute;
                const translation = attrValue.translations?.find((t: { locale: string }) => t.locale === lang) || attrValue.translations?.[0];
                return {
                  attribute: attr?.key || "",
                  value: translation?.label || attrValue.value || "",
                  key: attr?.key || "",
                  valueId: attrValue.id,
                  attributeId: attr?.id,
                };
              } else {
                // Old format: use attributeKey/value
                return {
                  attribute: opt.attributeKey || "",
                  value: opt.value || "",
                  key: opt.attributeKey || "",
                };
              }
            }) : [],
            available: variant.stock > 0,
          };
        }) : [],
      globalDiscount: globalDiscount > 0 ? globalDiscount : null,
      productDiscount: productDiscount > 0 ? productDiscount : null,
      seo: {
        title: translation?.seoTitle || translation?.title,
        description: translation?.seoDescription || null,
      },
      published: product.published,
      publishedAt: product.publishedAt,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      productAttributes: (() => {
        const productAttrs = (product as any).productAttributes;
        console.log('📋 [PRODUCTS SLUG SERVICE] Raw productAttributes from DB:', productAttrs);
        console.log('📋 [PRODUCTS SLUG SERVICE] productAttributes is array?', Array.isArray(productAttrs));
        console.log('📋 [PRODUCTS SLUG SERVICE] productAttributes length:', productAttrs?.length || 0);
        
        if (Array.isArray(productAttrs) && productAttrs.length > 0) {
          const mapped = productAttrs.map((pa: any) => {
            const attr = pa.attribute;
            const attrTranslation = attr.translations?.find((t: { locale: string }) => t.locale === lang) || attr.translations?.[0];
            
            return {
              id: pa.id,
              attribute: {
                id: attr.id,
                key: attr.key,
                name: attrTranslation?.name || attr.key,
                values: Array.isArray(attr.values) ? attr.values.map((val: any) => {
                  const valTranslation = val.translations?.find((t: { locale: string }) => t.locale === lang) || val.translations?.[0];
                  return {
                    id: val.id,
                    value: val.value,
                    label: valTranslation?.label || val.value,
                    imageUrl: val.imageUrl || null,
                    colors: val.colors || null,
                  };
                }) : [],
              },
            };
          });
          console.log('📋 [PRODUCTS SLUG SERVICE] Mapped productAttributes:', mapped.length, 'attributes');
          return mapped;
        }
        console.log('📋 [PRODUCTS SLUG SERVICE] No productAttributes, returning empty array');
        return [];
      })(),
    };
  }
}

export const productsSlugService = new ProductsSlugService();

