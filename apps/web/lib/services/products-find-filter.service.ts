import { ProductFilters, ProductWithRelations } from "./products-find-query.service";

/**
 * Normalize comma-separated filter values and drop placeholders like "undefined" or "null".
 */
const normalizeFilterList = (
  value?: string,
  transform?: (v: string) => string
): string[] => {
  if (!value || typeof value !== "string") return [];

  const invalidTokens = new Set(["undefined", "null", ""]);
  const items = value
    .split(",")
    .map((v) => v.trim())
    .filter((v) => !invalidTokens.has(v.toLowerCase()));

  if (transform) {
    return items.map(transform);
  }

  return items;
};

class ProductsFindFilterService {
  /**
   * Filter products by price, colors, sizes, brand in memory
   */
  filterProducts(
    products: ProductWithRelations[],
    filters: ProductFilters,
    bestsellerProductIds: string[]
  ): ProductWithRelations[] {
    const { minPrice, maxPrice, colors, sizes, brand } = filters;

    // Filter by price
    if (minPrice || maxPrice) {
      const min = minPrice || 0;
      const max = maxPrice || Infinity;
      products = products.filter((product: ProductWithRelations) => {
        const variants = Array.isArray(product.variants) ? product.variants : [];
        if (variants.length === 0) return false;
        const prices = variants.map((v: { price: number }) => v.price).filter((p: number | undefined) => p !== undefined);
        if (prices.length === 0) return false;
        const minPrice = Math.min(...prices);
        return minPrice >= min && minPrice <= max;
      });
    }

    // Filter by brand(s) - support multiple brands (comma-separated)
    const brandList = normalizeFilterList(brand);
    if (brandList.length > 0) {
      products = products.filter(
        (product: ProductWithRelations) => 
          product.brandId && brandList.includes(product.brandId)
      );
      console.log('🔍 [PRODUCTS FIND FILTER SERVICE] Filtering by brands:', {
        brands: brandList,
        productsAfter: products.length
      });
    }

    // Filter by colors and sizes together if both are provided.
    // Skip filtering when only placeholder values (e.g., "undefined") are passed.
    const colorList = normalizeFilterList(colors, (v) => v.toLowerCase());
    const sizeList = normalizeFilterList(sizes, (v) => v.toUpperCase());

    if (colorList.length > 0 || sizeList.length > 0) {
      products = products.filter((product: ProductWithRelations) => {
        const variants = Array.isArray(product.variants) ? product.variants : [];
        
        if (variants.length === 0) {
          console.log('⚠️ [PRODUCTS FIND FILTER SERVICE] Product has no variants:', product.id);
          return false;
        }
        
        // Find variants that match ALL specified filters
        const matchingVariants = variants.filter((variant: any) => {
          const options = Array.isArray(variant.options) ? variant.options : [];
          
          if (options.length === 0) {
            return false;
          }
          
          // Helper function to get color value from option (support all formats)
          const getColorValue = (opt: any, lang: string = 'en'): string | null => {
            // New format: Use AttributeValue if available
            if (opt.attributeValue && opt.attributeValue.attribute?.key === "color") {
              const translation = opt.attributeValue.translations?.find((t: { locale: string }) => t.locale === lang) || opt.attributeValue.translations?.[0];
              return (translation?.label || opt.attributeValue.value || "").trim().toLowerCase();
            }
            // Old format: check attributeKey, key, or attribute
            if (opt.attributeKey === "color" || opt.key === "color" || opt.attribute === "color") {
              return (opt.value || opt.label || "").trim().toLowerCase();
            }
            return null;
          };
          
          // Helper function to get size value from option (support all formats)
          const getSizeValue = (opt: any, lang: string = 'en'): string | null => {
            // New format: Use AttributeValue if available
            if (opt.attributeValue && opt.attributeValue.attribute?.key === "size") {
              const translation = opt.attributeValue.translations?.find((t: { locale: string }) => t.locale === lang) || opt.attributeValue.translations?.[0];
              return (translation?.label || opt.attributeValue.value || "").trim().toUpperCase();
            }
            // Old format: check attributeKey, key, or attribute
            if (opt.attributeKey === "size" || opt.key === "size" || opt.attribute === "size") {
              return (opt.value || opt.label || "").trim().toUpperCase();
            }
            return null;
          };
          
          // Check color match if colors filter is provided
          if (colorList.length > 0) {
            let colorMatched = false;
            for (const opt of options) {
              const variantColorValue = getColorValue(opt, filters.lang || 'en');
              if (variantColorValue && colorList.includes(variantColorValue)) {
                colorMatched = true;
                break;
              }
            }
            if (!colorMatched) {
              return false;
            }
          }
          
          // Check size match if sizes filter is provided
          if (sizeList.length > 0) {
            let sizeMatched = false;
            for (const opt of options) {
              const variantSizeValue = getSizeValue(opt, filters.lang || 'en');
              if (variantSizeValue && sizeList.includes(variantSizeValue)) {
                sizeMatched = true;
                break;
              }
            }
            if (!sizeMatched) {
              return false;
            }
          }
          
          return true;
        });
        
        const hasMatch = matchingVariants.length > 0;
        return hasMatch;
      });
    }

    // Sort
    const { filter, sort = "createdAt" } = filters;
    if (filter === "bestseller" && bestsellerProductIds.length > 0) {
      const rank = new Map<string, number>();
      bestsellerProductIds.forEach((id, index) => rank.set(id, index));
      products.sort((a: ProductWithRelations, b: ProductWithRelations) => {
        const aRank = rank.get(a.id) ?? Number.MAX_SAFE_INTEGER;
        const bRank = rank.get(b.id) ?? Number.MAX_SAFE_INTEGER;
        return aRank - bRank;
      });
    } else if (sort === "price") {
      products.sort((a: ProductWithRelations, b: ProductWithRelations) => {
        const aVariants = Array.isArray(a.variants) ? a.variants : [];
        const bVariants = Array.isArray(b.variants) ? b.variants : [];
        const aPrice = aVariants.length > 0 ? Math.min(...aVariants.map((v: { price: number }) => v.price)) : 0;
        const bPrice = bVariants.length > 0 ? Math.min(...bVariants.map((v: { price: number }) => v.price)) : 0;
        return bPrice - aPrice;
      });
    } else {
      products.sort((a: ProductWithRelations, b: ProductWithRelations) => {
        const aValue = a[sort as keyof typeof a] as Date;
        const bValue = b[sort as keyof typeof b] as Date;
        return new Date(bValue).getTime() - new Date(aValue).getTime();
      });
    }

    return products;
  }
}

export const productsFindFilterService = new ProductsFindFilterService();

