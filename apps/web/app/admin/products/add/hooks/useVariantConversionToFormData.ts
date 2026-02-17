import type { Attribute, ColorData, Variant, GeneratedVariant } from '../types';

interface UseVariantConversionToFormDataProps {
  productType: 'simple' | 'variable';
  selectedAttributesForVariants: Set<string>;
  generatedVariants: GeneratedVariant[];
  attributes: Attribute[];
  formDataSlug: string;
  setFormData: (updater: (prev: any) => any) => void;
}

export function useVariantConversionToFormData({
  productType,
  selectedAttributesForVariants,
  generatedVariants,
  attributes,
  formDataSlug,
  setFormData,
}: UseVariantConversionToFormDataProps) {
  const convertGeneratedVariantsToFormData = (): void => {
    // Skip this for simple products
    if (productType === 'variable' && selectedAttributesForVariants.size > 0 && generatedVariants.length > 0) {
      console.log('🔄 [ADMIN] Converting new variant builder variants to formData format...');
      console.log('📊 [ADMIN] Total generated variants to convert:', generatedVariants.length);
      
      const allNewVariants: Variant[] = [];
      const skuSetForConversion = new Set<string>();
      
      generatedVariants.forEach((variant, variantIndex) => {
        const colorAttribute = attributes.find(a => a.key === 'color');
        const sizeAttribute = attributes.find(a => a.key === 'size');
        
        const selectedColorValueIds = colorAttribute 
          ? variant.selectedValueIds.filter(id => colorAttribute.values.some(v => v.id === id))
          : [];
        const selectedSizeValueIds = sizeAttribute 
          ? variant.selectedValueIds.filter(id => sizeAttribute.values.some(v => v.id === id))
          : [];
        
        const colors: ColorData[] = [];
        
        if (colorAttribute && selectedColorValueIds.length > 0) {
          selectedColorValueIds.forEach((valueId) => {
            const value = colorAttribute.values.find(v => v.id === valueId);
            if (value) {
              const colorData: ColorData = {
                colorValue: value.value,
                colorLabel: value.label,
                images: [],
                stock: variant.stock || '0',
                sizes: [],
                sizeStocks: {},
              };
              
              if (value.imageUrl) {
                colorData.images.push(value.imageUrl);
                console.log('✅ [ADMIN] Added attribute value imageUrl to color:', value.imageUrl);
              }
              
              if (variant.price) {
                colorData.price = variant.price;
              }
              if (variant.compareAtPrice) {
                colorData.compareAtPrice = variant.compareAtPrice;
              }
              
              if (sizeAttribute && selectedSizeValueIds.length > 0) {
                selectedSizeValueIds.forEach((sizeValueId) => {
                  const sizeValue = sizeAttribute.values.find(v => v.id === sizeValueId);
                  if (sizeValue) {
                    colorData.sizes.push(sizeValue.value);
                    colorData.sizeStocks[sizeValue.value] = variant.stock || '0';
                    if (!colorData.sizePrices) colorData.sizePrices = {};
                    colorData.sizePrices[sizeValue.value] = variant.price || '0';
                  }
                });
              }
              
              colors.push(colorData);
            }
          });
        } else if (sizeAttribute && selectedSizeValueIds.length > 0) {
          const colorData: ColorData = {
            colorValue: '',
            colorLabel: '',
            images: [],
            stock: variant.stock || '0',
            sizes: [],
            sizeStocks: {},
          };
          
          selectedSizeValueIds.forEach((sizeValueId) => {
            const sizeValue = sizeAttribute.values.find(v => v.id === sizeValueId);
            if (sizeValue) {
              colorData.sizes.push(sizeValue.value);
              colorData.sizeStocks[sizeValue.value] = variant.stock || '0';
              if (!colorData.sizePrices) colorData.sizePrices = {};
              colorData.sizePrices[sizeValue.value] = variant.price || '0';
              
              if (sizeValue.imageUrl) {
                colorData.images.push(sizeValue.imageUrl);
                console.log('✅ [ADMIN] Added size attribute value imageUrl:', sizeValue.imageUrl);
              }
            }
          });
          
          if (variant.image) {
            colorData.images.push(variant.image);
          }
          
          colors.push(colorData);
        } else {
          const otherAttributeIds = Array.from(selectedAttributesForVariants).filter(
            attrId => attrId !== colorAttribute?.id && attrId !== sizeAttribute?.id
          );
          
          if (otherAttributeIds.length > 0) {
            const colorData: ColorData = {
              colorValue: '',
              colorLabel: '',
              images: [],
              stock: variant.stock || '0',
              sizes: [],
              sizeStocks: {},
            };
            
            otherAttributeIds.forEach((attributeId) => {
              const attribute = attributes.find(a => a.id === attributeId);
              if (!attribute) return;
              
              const selectedValueIds = variant.selectedValueIds.filter(id => 
                attribute.values.some(v => v.id === id)
              );
              
              selectedValueIds.forEach((valueId) => {
                const value = attribute.values.find(v => v.id === valueId);
                if (value && value.imageUrl) {
                  colorData.images.push(value.imageUrl);
                  console.log('✅ [ADMIN] Added attribute value imageUrl from', attribute.key, ':', value.imageUrl);
                }
              });
            });
            
            if (variant.image) {
              colorData.images.push(variant.image);
            }
            
            if (colorData.images.length > 0 || variant.stock) {
              colors.push(colorData);
            }
          }
        }
        
        if (variant.image && colors.length > 0) {
          const firstColor = colors[0];
          if (!firstColor.images.includes(variant.image)) {
            firstColor.images.push(variant.image);
          }
        }
        
        let variantSku = variant.sku ? variant.sku.trim() : '';
        if (!variantSku || variantSku === '') {
          const baseSlug = formDataSlug || 'PROD';
          variantSku = `${baseSlug.toUpperCase()}-${Date.now()}-${variantIndex + 1}`;
        }
        
        let finalSku = variantSku;
        let skuCounter = 1;
        while (skuSetForConversion.has(finalSku)) {
          finalSku = `${variantSku}-${skuCounter}`;
          skuCounter++;
        }
        skuSetForConversion.add(finalSku);
        
        allNewVariants.push({
          id: variant.id || `variant-${Date.now()}-${variantIndex}-${Math.random()}`,
          price: variant.price || '0',
          compareAtPrice: variant.compareAtPrice || '',
          sku: finalSku,
          colors: colors.length > 0 ? colors : [],
        });
      });
      
      setFormData((prev) => ({ ...prev, variants: allNewVariants }));
      console.log('✅ [ADMIN] Converted variants:', allNewVariants.length, 'with unique SKUs');
    }
  };

  return { convertGeneratedVariantsToFormData };
}

