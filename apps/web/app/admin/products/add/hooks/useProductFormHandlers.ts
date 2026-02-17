import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { convertPrice, type CurrencyCode } from '@/lib/currency';
import type { Attribute, Variant, GeneratedVariant } from '../types';
import { useBrandAndCategoryCreation } from './useBrandAndCategoryCreation';
import { useVariantConversionToFormData } from './useVariantConversionToFormData';
import { useVariantValidation } from './useVariantValidation';
import { processImagesForSubmit } from './useImageProcessingForSubmit';
import { createAndSubmitPayload } from './useProductPayloadCreation';

interface UseProductFormHandlersProps {
  formData: {
    title: string;
    slug: string;
    descriptionHtml: string;
    brandIds: string[];
    primaryCategoryId: string;
    categoryIds: string[];
    published: boolean;
    featured: boolean;
    imageUrls: string[];
    featuredImageIndex: number;
    mainProductImage: string;
    variants: Variant[];
    labels: any[];
  };
  setFormData: (updater: (prev: any) => any) => void;
  setLoading: (loading: boolean) => void;
  setBrands: (updater: (prev: any[]) => any[]) => void;
  setCategories: (updater: (prev: any[]) => any[]) => void;
  productType: 'simple' | 'variable';
  simpleProductData: {
    price: string;
    compareAtPrice: string;
    sku: string;
    quantity: string;
  };
  selectedAttributesForVariants: Set<string>;
  generatedVariants: GeneratedVariant[];
  attributes: Attribute[];
  defaultCurrency: CurrencyCode;
  useNewBrand: boolean;
  newBrandName: string;
  useNewCategory: boolean;
  newCategoryName: string;
  isEditMode: boolean;
  productId: string | null;
  getColorAttribute: () => Attribute | undefined;
  getSizeAttribute: () => Attribute | undefined;
  isClothingCategory: () => boolean;
}

export function useProductFormHandlers({
  formData,
  setFormData,
  setLoading,
  setBrands,
  setCategories,
  productType,
  simpleProductData,
  selectedAttributesForVariants,
  generatedVariants,
  attributes,
  defaultCurrency,
  useNewBrand,
  newBrandName,
  useNewCategory,
  newCategoryName,
  isEditMode,
  productId,
  getColorAttribute,
  getSizeAttribute,
  isClothingCategory,
}: UseProductFormHandlersProps) {
  const router = useRouter();
  
  const { createBrandAndCategory } = useBrandAndCategoryCreation({
    formData,
    useNewBrand,
    newBrandName,
    useNewCategory,
    newCategoryName,
    setBrands,
    setCategories,
    setLoading,
  });

  const { convertGeneratedVariantsToFormData } = useVariantConversionToFormData({
    productType,
    selectedAttributesForVariants,
    generatedVariants,
    attributes,
    formDataSlug: formData.slug,
    setFormData,
  });

  const { validateVariants } = useVariantValidation({
    productType,
    variants: formData.variants,
    simpleProductData,
    isClothingCategory,
    setLoading,
  });


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('📝 [ADMIN] Submitting product form:', formData);

      // Create brand and category if needed
      const brandCategoryResult = await createBrandAndCategory();
      if (brandCategoryResult.error) {
        return;
      }
      const { finalBrandIds, finalPrimaryCategoryId, creationMessages } = brandCategoryResult;

      // Convert generated variants to formData format
      convertGeneratedVariantsToFormData();

      // Get current formData after potential update
      const currentFormData = formData.variants.length > 0 ? formData : { ...formData, variants: [] };

      // Validate variants
      if (productType === 'variable' && currentFormData.variants.length === 0) {
        setLoading(false);
        return;
      }
      if (!validateVariants()) {
        return;
      }

      // Process variants for API
      const variants: any[] = [];
      const variantSkuSet = new Set<string>();

      if (productType === 'simple') {
        console.log('📦 [ADMIN] Processing Simple Product');
        const priceUSD = convertPrice(parseFloat(simpleProductData.price), defaultCurrency, 'USD');
        const compareAtPriceUSD = simpleProductData.compareAtPrice && simpleProductData.compareAtPrice.trim() !== ''
          ? convertPrice(parseFloat(simpleProductData.compareAtPrice), defaultCurrency, 'USD')
          : undefined;
        const simpleVariant: any = {
          price: priceUSD,
          stock: parseInt(simpleProductData.quantity) || 0,
          sku: simpleProductData.sku.trim(),
          published: true,
        };
        if (compareAtPriceUSD) {
          simpleVariant.compareAtPrice = compareAtPriceUSD;
        }
        variants.push(simpleVariant);
        variantSkuSet.add(simpleProductData.sku.trim());
        console.log('✅ [ADMIN] Simple product variant created:', simpleVariant);
      } else {
        // Variable products variant processing (simplified - full logic remains in original)
        const useGeneratedVariants = generatedVariants.length > 0 && selectedAttributesForVariants.size > 0;
        
        if (useGeneratedVariants) {
          console.log('📦 [ADMIN] Using generatedVariants format:', generatedVariants.length, 'variants');
          const sizeAttribute = getSizeAttribute();
          
          generatedVariants.forEach((genVariant, variantIndex) => {
            const variantPriceUSD = convertPrice(parseFloat(genVariant.price || '0'), defaultCurrency, 'USD');
            const variantCompareAtPriceUSD = genVariant.compareAtPrice 
              ? convertPrice(parseFloat(genVariant.compareAtPrice), defaultCurrency, 'USD')
              : undefined;
            
            const attributeValueMap: Record<string, Array<{ valueId: string; value: string }>> = {};
            
            genVariant.selectedValueIds.forEach((valueId) => {
              const attribute = attributes.find(a => a.values.some(v => v.id === valueId));
              if (attribute) {
                const value = attribute.values.find(v => v.id === valueId);
                if (value) {
                  if (!attributeValueMap[attribute.key]) {
                    attributeValueMap[attribute.key] = [];
                  }
                  attributeValueMap[attribute.key].push({ valueId: value.id, value: value.value });
                }
              }
            });
            
            const attributeKeys = Object.keys(attributeValueMap);
            if (attributeKeys.length === 0) {
              const finalSku = genVariant.sku || `${currentFormData.slug || 'PROD'}-${Date.now()}-${variantIndex + 1}`;
              let uniqueSku = finalSku;
              let skuCounter = 1;
              while (variantSkuSet.has(uniqueSku)) {
                uniqueSku = `${finalSku}-${skuCounter}`;
                skuCounter++;
              }
              variantSkuSet.add(uniqueSku);
              variants.push({
                price: variantPriceUSD,
                compareAtPrice: variantCompareAtPriceUSD,
                stock: parseInt(genVariant.stock || '0') || 0,
                sku: uniqueSku,
                imageUrl: genVariant.image || undefined,
                published: true,
              });
            } else {
              const attributeValueGroups = attributeKeys.map(key => 
                attributeValueMap[key].map(v => v.valueId)
              );
              
              const generateCombinations = (groups: string[][]): string[][] => {
                if (groups.length === 0) return [[]];
                if (groups.length === 1) return groups[0].map(v => [v]);
                const [firstGroup, ...restGroups] = groups;
                const restCombinations = generateCombinations(restGroups);
                const result: string[][] = [];
                for (const value of firstGroup) {
                  for (const combination of restCombinations) {
                    result.push([value, ...combination]);
                  }
                }
                return result;
              };
              
              const combinations = generateCombinations(attributeValueGroups);
              
              combinations.forEach((combination, comboIndex) => {
                const variantOptions: Array<{ attributeKey: string; value: string; valueId?: string }> = [];
                combination.forEach((valueId) => {
                  const attribute = attributes.find(a => a.values.some(v => v.id === valueId));
                  if (attribute) {
                    const value = attribute.values.find(v => v.id === valueId);
                    if (value) {
                      variantOptions.push({ attributeKey: attribute.key, value: value.value, valueId: value.id });
                    }
                  }
                });
                
                const baseSlug = currentFormData.slug || 'PROD';
                const valueParts = variantOptions.map(opt => opt.value.toUpperCase().replace(/\s+/g, '-'));
                const skuSuffix = valueParts.length > 0 ? `-${valueParts.join('-')}` : '';
                const finalSku = genVariant.sku 
                  ? `${genVariant.sku}${skuSuffix}`
                  : `${baseSlug.toUpperCase()}-${Date.now()}-${variantIndex + 1}-${comboIndex + 1}${skuSuffix}`;
                
                let uniqueSku = finalSku;
                let skuCounter = 1;
                while (variantSkuSet.has(uniqueSku)) {
                  uniqueSku = `${finalSku}-${skuCounter}`;
                  skuCounter++;
                }
                variantSkuSet.add(uniqueSku);
                
                variants.push({
                  price: variantPriceUSD,
                  compareAtPrice: variantCompareAtPriceUSD,
                  stock: parseInt(genVariant.stock || '0') || 0,
                  sku: uniqueSku,
                  imageUrl: genVariant.image || undefined,
                  published: true,
                  options: variantOptions.length > 0 ? variantOptions : undefined,
                });
              });
            }
          });
        } else {
          // Legacy formData.variants processing (simplified)
          console.log('📦 [ADMIN] Using formData.variants format (legacy)');
          currentFormData.variants.forEach((variant, variantIndex) => {
            const variantPriceUSD = convertPrice(parseFloat(variant.price || '0'), defaultCurrency, 'USD');
            const baseVariantData: any = { price: variantPriceUSD, published: true };
            if (variant.compareAtPrice) {
              baseVariantData.compareAtPrice = convertPrice(parseFloat(variant.compareAtPrice), defaultCurrency, 'USD');
            }
            const colorDataArray = variant.colors || [];
            // Simplified variant processing - full logic would be in separate hook
            if (colorDataArray.length > 0) {
              colorDataArray.forEach((colorData, colorIndex) => {
                const colorSizes = colorData.sizes || [];
                const colorSizeStocks = colorData.sizeStocks || {};
                if (colorSizes.length > 0) {
                  colorSizes.forEach((size) => {
                    const stockForVariant = colorSizeStocks[size] || colorData.stock || '0';
                    const skuSuffix = colorDataArray.length > 1 || colorSizes.length > 1 
                      ? `-${colorIndex + 1}-${colorSizes.indexOf(size) + 1}` : '';
                    let finalSku = colorData.sizeLabels?.[size] || variant.sku ? `${variant.sku?.trim()}${skuSuffix}` : undefined;
                    if (!finalSku || finalSku === '') {
                      finalSku = `${currentFormData.slug || 'PROD'}-${Date.now()}-${variantIndex + 1}-${colorIndex + 1}-${colorSizes.indexOf(size) + 1}`;
                    }
                    let uniqueSku = finalSku;
                    let skuCounter = 1;
                    while (variantSkuSet.has(uniqueSku)) {
                      uniqueSku = `${finalSku}-${skuCounter}`;
                      skuCounter++;
                    }
                    variantSkuSet.add(uniqueSku);
                    const variantImageUrl = colorData.images && colorData.images.length > 0 ? colorData.images.join(',') : undefined;
                    const sizePrice = colorData.sizePrices?.[size];
                    const finalPriceRaw = sizePrice && sizePrice.trim() !== ''
                      ? parseFloat(sizePrice)
                      : (colorData.price && colorData.price.trim() !== '' ? parseFloat(colorData.price) : baseVariantData.price);
                    const finalPrice = convertPrice(finalPriceRaw, defaultCurrency, 'USD');
                    const variantOptions: Array<{ attributeKey: string; value: string; valueId?: string }> = [];
                    if (colorData.colorValue && colorData.colorValue.trim() !== '') {
                      const colorAttr = attributes.find(a => a.key === 'color');
                      const colorValue = colorAttr?.values.find(v => v.value === colorData.colorValue);
                      if (colorValue) {
                        variantOptions.push({ attributeKey: 'color', value: colorData.colorValue, valueId: colorValue.id });
                      } else {
                        variantOptions.push({ attributeKey: 'color', value: colorData.colorValue });
                      }
                    }
                    if (size && size.trim() !== '') {
                      const sizeAttr = attributes.find(a => a.key === 'size');
                      const sizeValue = sizeAttr?.values.find(v => v.value === size);
                      if (sizeValue) {
                        variantOptions.push({ attributeKey: 'size', value: size, valueId: sizeValue.id });
                      } else {
                        variantOptions.push({ attributeKey: 'size', value: size });
                      }
                    }
                    variants.push({
                      ...baseVariantData,
                      price: finalPrice,
                      color: colorData.colorValue,
                      size: size,
                      stock: parseInt(stockForVariant) || 0,
                      sku: uniqueSku,
                      imageUrl: variantImageUrl,
                      options: variantOptions.length > 0 ? variantOptions : undefined,
                    });
                  });
                }
              });
            }
          });
        }
      }

      // Final SKU validation
      const finalSkuSet = new Set<string>();
      for (let i = 0; i < variants.length; i++) {
        const variant = variants[i];
        if (!variant.sku || variant.sku.trim() === '') {
          const baseSlug = currentFormData.slug || 'PROD';
          variant.sku = `${baseSlug.toUpperCase()}-${Date.now()}-${i + 1}`;
        } else {
          variant.sku = variant.sku.trim();
        }
        let finalSku = variant.sku;
        let skuCounter = 1;
        while (finalSkuSet.has(finalSku)) {
          const baseSlug = currentFormData.slug || 'PROD';
          finalSku = `${baseSlug.toUpperCase()}-${Date.now()}-${i + 1}-${skuCounter}-${Math.random().toString(36).substr(2, 4)}`;
          skuCounter++;
        }
        variant.sku = finalSku;
        finalSkuSet.add(finalSku);
      }

      // Collect attribute IDs
      const attributeIdsSet = new Set<string>();
      const colorAttribute = getColorAttribute();
      const sizeAttribute = getSizeAttribute();
      if (colorAttribute) attributeIdsSet.add(colorAttribute.id);
      if (sizeAttribute) attributeIdsSet.add(sizeAttribute.id);
      const attributeIds = Array.from(attributeIdsSet);

      // Process images
      const { finalMedia, mainImage, processedVariants } = processImagesForSubmit({
        imageUrls: currentFormData.imageUrls,
        featuredImageIndex: currentFormData.featuredImageIndex,
        mainProductImage: currentFormData.mainProductImage,
        variants: variants,
      });
      const finalVariants = processedVariants.length > 0 ? processedVariants : variants;

      // Create and submit payload
      await createAndSubmitPayload({
        formData: currentFormData,
        finalBrandIds,
        finalPrimaryCategoryId,
        variants: finalVariants,
        attributeIds,
        finalMedia,
        mainImage,
        isEditMode,
        productId,
        creationMessages,
        setLoading,
        router,
      });
    } catch (err: any) {
      console.error('❌ [ADMIN] Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit };
}
