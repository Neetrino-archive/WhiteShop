import type { Variant } from '../types';

interface UseVariantValidationProps {
  productType: 'simple' | 'variable';
  variants: Variant[];
  simpleProductData: {
    price: string;
    sku: string;
    quantity: string;
  };
  isClothingCategory: () => boolean;
  setLoading: (loading: boolean) => void;
}

export function useVariantValidation({
  productType,
  variants,
  simpleProductData,
  isClothingCategory,
  setLoading,
}: UseVariantValidationProps) {
  const validateVariants = (): boolean => {
    // Skip variant validation for Simple products - they create variants later in the process
    if (productType === 'variable' && variants.length === 0) {
      setLoading(false);
      return false;
    }

    // Validate all variants (skip for simple products - validation is done in variant creation)
    if (productType === 'variable') {
      const skuSet = new Set<string>();
      for (const variant of variants) {
        const variantSku = variant.sku ? variant.sku.trim() : '';
        if (!variantSku || variantSku === '') {
          setLoading(false);
          return false;
        }
        
        if (skuSet.has(variantSku)) {
          setLoading(false);
          return false;
        }
        skuSet.add(variantSku);
        
        const categoryRequiresSizes = isClothingCategory();
        const colorData = variant.colors && variant.colors.length > 0 ? variant.colors : [];
        
        if (colorData.length > 0) {
          for (const colorDataItem of colorData) {
            const colorSizes = colorDataItem.sizes || [];
            const colorSizeStocks = colorDataItem.sizeStocks || {};
            
            const hasColor = colorDataItem.colorValue && colorDataItem.colorValue.trim() !== '';
            
            if (hasColor) {
              const colorPriceValue = parseFloat(colorDataItem.price || '0');
              if (!colorDataItem.price || isNaN(colorPriceValue) || colorPriceValue <= 0) {
                setLoading(false);
                return false;
              }
            } else {
              if (colorData.indexOf(colorDataItem) === 0) {
                const variantPriceValue = parseFloat(variant.price || '0');
                if (!variant.price || isNaN(variantPriceValue) || variantPriceValue <= 0) {
                  setLoading(false);
                  return false;
                }
              }
            }

            if (colorSizes.length > 0) {
              for (const size of colorSizes) {
                const stock = colorSizeStocks[size];
                if (!stock || stock.trim() === '' || parseInt(stock) < 0) {
                  setLoading(false);
                  return false;
                }
              }
            } else {
              if (!colorDataItem.stock || colorDataItem.stock.trim() === '' || parseInt(colorDataItem.stock) < 0) {
                setLoading(false);
                return false;
              }
            }
          }
        }
      }
    }

    // Validate simple product fields
    if (productType === 'simple') {
      if (!simpleProductData.price || simpleProductData.price.trim() === '') {
        setLoading(false);
        return false;
      }
      if (!simpleProductData.sku || simpleProductData.sku.trim() === '') {
        setLoading(false);
        return false;
      }
      if (!simpleProductData.quantity || simpleProductData.quantity.trim() === '') {
        setLoading(false);
        return false;
      }
    }

    return true;
  };

  return { validateVariants };
}

