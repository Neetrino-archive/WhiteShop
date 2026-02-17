'use client';

import { useEffect } from 'react';
import { convertPrice, type CurrencyCode } from '@/lib/currency';
import type { GeneratedVariant } from '../types';

interface UseProductVariantConversionProps {
  productId: string | null;
  attributes: any[];
  defaultCurrency: CurrencyCode;
  setSelectedAttributesForVariants: (attrs: Set<string>) => void;
  setSelectedAttributeValueIds: (ids: Record<string, string[]>) => void;
  setGeneratedVariants: (variants: GeneratedVariant[]) => void;
  setHasVariantsToLoad: (has: boolean) => void;
}

export function useProductVariantConversion({
  productId,
  attributes,
  defaultCurrency,
  setSelectedAttributesForVariants,
  setSelectedAttributeValueIds,
  setGeneratedVariants,
  setHasVariantsToLoad,
}: UseProductVariantConversionProps) {
  useEffect(() => {
    if (productId && attributes.length > 0 && (window as any).__productVariantsToConvert) {
      const productVariants = (window as any).__productVariantsToConvert;
      console.log('🔄 [ADMIN] Converting product variants to generatedVariants format:', {
        variantsCount: productVariants.length,
        attributesCount: attributes.length,
        firstVariant: productVariants[0],
      });
      
      const attributeIdsSet = new Set<string>();
      const attributeValueIdsMap: Record<string, string[]> = {};
      
      productVariants.forEach((variant: any) => {
        if (variant.options && Array.isArray(variant.options)) {
          variant.options.forEach((opt: any) => {
            let attributeId = opt.attributeId;
            let valueId = opt.valueId;
            
            if (!attributeId && opt.attributeValue) {
              attributeId = opt.attributeValue.attributeId || opt.attributeValue.attribute?.id;
            }
            if (!valueId && opt.attributeValue) {
              valueId = opt.attributeValue.id;
            }
            
            if (attributeId && valueId) {
              attributeIdsSet.add(attributeId);
              
              if (!attributeValueIdsMap[attributeId]) {
                attributeValueIdsMap[attributeId] = [];
              }
              if (!attributeValueIdsMap[attributeId].includes(valueId)) {
                attributeValueIdsMap[attributeId].push(valueId);
              }
            }
          });
        }
      });
      
      const productAttributeIds = (window as any).__productAttributeIds || [];
      if (productAttributeIds.length > 0) {
        console.log('📋 [ADMIN] Adding product attributeIds to selected attributes:', productAttributeIds);
        productAttributeIds.forEach((attrId: string) => {
          attributeIdsSet.add(attrId);
        });
      }
      
      if (attributeIdsSet.size > 0) {
        console.log('📋 [ADMIN] Setting selectedAttributesForVariants with all attributes:', Array.from(attributeIdsSet));
        setSelectedAttributesForVariants(attributeIdsSet);
      }
      
      if (Object.keys(attributeValueIdsMap).length > 0) {
        setSelectedAttributeValueIds(attributeValueIdsMap);
      }
      
      interface VariantData {
        id: string;
        selectedValueIds: string[];
        price: number;
        compareAtPrice: number | null;
        stock: number;
        sku: string;
        image: string | null;
        originalVariantIds: string[];
      }
      
      const variantDataList: VariantData[] = [];
      
      productVariants.forEach((variant: any, variantIndex: number) => {
        const selectedValueIds: string[] = [];
        
        if (variant.attributes && typeof variant.attributes === 'object') {
          console.log(`🔍 [ADMIN] Variant ${variantIndex} has attributes JSONB:`, variant.attributes);
          
          Object.keys(variant.attributes).forEach((attributeKey) => {
            const attribute = attributes.find(a => a.key === attributeKey);
            if (!attribute) {
              console.warn(`⚠️ [ADMIN] Attribute not found for key: ${attributeKey}`);
              return;
            }
            
            const attributeValues = variant.attributes[attributeKey];
            if (Array.isArray(attributeValues)) {
              attributeValues.forEach((attrValue: any) => {
                const valueId = attrValue.valueId || attrValue.id;
                const value = attrValue.value || attrValue;
                
                if (valueId) {
                  if (!selectedValueIds.includes(valueId)) {
                    selectedValueIds.push(valueId);
                  }
                } else if (value) {
                  const foundValue = attribute.values.find((v: { id: string; value: string; label: string }) => 
                    v.value === value || v.label === value
                  );
                  if (foundValue && !selectedValueIds.includes(foundValue.id)) {
                    selectedValueIds.push(foundValue.id);
                  }
                }
              });
            }
          });
        }
        
        if (selectedValueIds.length === 0 && variant.options && Array.isArray(variant.options)) {
          console.log(`🔍 [ADMIN] Variant ${variantIndex} using options fallback:`, variant.options);
          
          const attributeValueMap: Record<string, Set<string>> = {};
          
          variant.options.forEach((opt: any) => {
            let attributeId = opt.attributeId;
            let valueId = opt.valueId;
            let attributeKey = opt.attributeKey;
            
            if (!attributeId && opt.attributeValue) {
              attributeId = opt.attributeValue.attributeId || opt.attributeValue.attribute?.id || opt.attributeValue.attributeId;
              attributeKey = opt.attributeValue.attribute?.key || opt.attributeValue.attributeKey;
            }
            if (!valueId && opt.attributeValue) {
              valueId = opt.attributeValue.id || opt.attributeValue.valueId;
            }
            
            if (!attributeId && opt.attributeKey) {
              const foundAttr = attributes.find(a => a.key === opt.attributeKey);
              if (foundAttr) {
                attributeId = foundAttr.id;
                attributeKey = foundAttr.key;
              }
            }
            
            if (attributeId && !valueId && opt.value) {
              const foundAttr = attributes.find(a => a.id === attributeId);
              if (foundAttr) {
                const foundValue = foundAttr.values.find((v: { id: string; value: string; label: string }) => v.value === opt.value || v.label === opt.value);
                if (foundValue) {
                  valueId = foundValue.id;
                }
              }
            }
            
            if (attributeKey && valueId) {
              if (!attributeValueMap[attributeKey]) {
                attributeValueMap[attributeKey] = new Set();
              }
              attributeValueMap[attributeKey].add(valueId);
            }
          });
          
          Object.values(attributeValueMap).forEach((valueIdSet) => {
            valueIdSet.forEach((valueId) => {
              if (!selectedValueIds.includes(valueId)) {
                selectedValueIds.push(valueId);
              }
            });
          });
        }
        
        let variantImage: string | null = null;
        if (variant.imageUrl) {
          if (typeof variant.imageUrl === 'string' && variant.imageUrl.startsWith('data:')) {
            variantImage = variant.imageUrl;
            console.log(`🖼️ [ADMIN] Variant ${variantIndex} base64 image length:`, variantImage?.length || 0);
          } else {
            const imageUrls = typeof variant.imageUrl === 'string' 
              ? variant.imageUrl.split(',').map((url: string) => url.trim()).filter(Boolean)
              : [];
            variantImage = imageUrls.length > 0 ? imageUrls[0] : null;
            console.log(`🖼️ [ADMIN] Variant ${variantIndex} imageUrl length:`, variant.imageUrl?.length || 0, '→ extracted image length:', variantImage?.length || 0);
          }
        } else {
          console.log(`🖼️ [ADMIN] Variant ${variantIndex} has no imageUrl`);
        }
        
        const priceInDefaultCurrency = variant.price !== undefined && variant.price !== null 
          ? convertPrice(variant.price, 'USD', defaultCurrency)
          : 0;
        const compareAtPriceInDefaultCurrency = variant.compareAtPrice !== undefined && variant.compareAtPrice !== null 
          ? convertPrice(variant.compareAtPrice, 'USD', defaultCurrency)
          : null;
        
        variantDataList.push({
          id: variant.id || `variant-${Date.now()}-${variantIndex}-${Math.random()}`,
          selectedValueIds: selectedValueIds.sort(),
          price: priceInDefaultCurrency,
          compareAtPrice: compareAtPriceInDefaultCurrency,
          stock: variant.stock !== undefined && variant.stock !== null ? variant.stock : 0,
          sku: variant.sku || '',
          image: variantImage,
          originalVariantIds: [variant.id || `variant-${variantIndex}`],
        });
      });
      
      const variantGroups = new Map<string, VariantData[]>();
      
      variantDataList.forEach((variantData) => {
        const valueIdsKey = variantData.selectedValueIds.join(',');
        const priceKey = variantData.price.toString();
        const compareAtPriceKey = variantData.compareAtPrice !== null ? variantData.compareAtPrice.toString() : 'null';
        
        const groupKey = `${valueIdsKey}|${priceKey}|${compareAtPriceKey}`;
        
        if (!variantGroups.has(groupKey)) {
          variantGroups.set(groupKey, []);
        }
        variantGroups.get(groupKey)!.push(variantData);
      });
      
      const convertedVariants: Array<{
        id: string;
        selectedValueIds: string[];
        price: string;
        compareAtPrice: string;
        stock: string;
        sku: string;
        image: string | null;
      }> = [];
      
      variantGroups.forEach((group, groupKey) => {
        const allValueIds = new Set<string>();
        group.forEach(variantData => {
          variantData.selectedValueIds.forEach(valueId => {
            allValueIds.add(valueId);
          });
        });
        
        const firstVariant = group[0];
        const allStocksSame = group.every(v => v.stock === firstVariant.stock);
        const stockValue = allStocksSame ? firstVariant.stock : firstVariant.stock;
        
        const combinedSku = group.length === 1 
          ? firstVariant.sku 
          : group.map(v => v.sku).filter(Boolean).join(', ');
        
        const combinedImage = firstVariant.image;
        
        convertedVariants.push({
          id: `variant-group-${Date.now()}-${Math.random()}`,
          selectedValueIds: Array.from(allValueIds).sort(),
          price: firstVariant.price.toString(),
          compareAtPrice: firstVariant.compareAtPrice !== null ? firstVariant.compareAtPrice.toString() : '',
          stock: stockValue.toString(),
          sku: combinedSku,
          image: combinedImage,
        });
        
        console.log(`✅ [ADMIN] Grouped ${group.length} variants into 1 row:`, {
          groupKey,
          valueIds: Array.from(allValueIds),
          price: firstVariant.price,
          stock: stockValue,
          originalVariantIds: group.flatMap(v => v.originalVariantIds),
        });
      });
      
      if (convertedVariants.length > 0) {
        setGeneratedVariants(convertedVariants);
        console.log('✅ [ADMIN] Converted product variants to generatedVariants:', {
          totalVariants: convertedVariants.length,
          totalOriginalVariants: productVariants.length,
          attributeValueIdsMap,
          convertedVariants: convertedVariants.map(v => ({
            id: v.id,
            valueIdsCount: v.selectedValueIds.length,
            price: v.price,
            stock: v.stock,
            sku: v.sku,
          })),
        });
        delete (window as any).__productVariantsToConvert;
        setHasVariantsToLoad(false);
      } else {
        console.warn('⚠️ [ADMIN] No variants converted. Check variant options structure:', {
          variantsCount: productVariants.length,
          firstVariantOptions: productVariants[0]?.options,
        });
        setHasVariantsToLoad(false);
      }
    } else if (productId && attributes.length > 0) {
      console.log('ℹ️ [ADMIN] Waiting for variants to convert. Attributes loaded:', attributes.length);
    }
  }, [productId, attributes, defaultCurrency, setSelectedAttributesForVariants, setSelectedAttributeValueIds, setGeneratedVariants, setHasVariantsToLoad]);
}

