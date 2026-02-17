'use client';

import { useState, useEffect, use, useCallback, useMemo } from 'react';
import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '../../../lib/api-client';
import { getStoredCurrency } from '../../../lib/currency';
import { getStoredLanguage, type LanguageCode } from '../../../lib/language';
import { t } from '../../../lib/i18n';
import { WISHLIST_KEY, COMPARE_KEY, RESERVED_ROUTES } from './types';
import {
  processImageUrl,
  smartSplitUrls,
  normalizeUrlForComparison,
  cleanImageUrls,
} from '../../../lib/utils/image-utils';
import type { Product, ProductVariant, VariantOption } from './types';

interface AttributeGroupValue {
  valueId?: string;
  value: string;
  label: string;
  stock: number;
  variants: ProductVariant[];
  imageUrl?: string | null;
  colors?: string[] | null;
}

export function useProductPage(params: Promise<{ slug?: string }>) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currency, setCurrency] = useState(getStoredCurrency());
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedAttributeValues, setSelectedAttributeValues] = useState<Map<string, string>>(new Map());
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Array<{ rating: number }>>([]);

  const resolvedParams = use(params);
  const rawSlug = resolvedParams?.slug ?? '';
  const slugParts = rawSlug.includes(':') ? rawSlug.split(':') : [rawSlug];
  const slug = slugParts[0];
  const variantIdFromUrl = slugParts.length > 1 ? slugParts[1] : null;

  // Get images array from product
  const images = useMemo(() => {
    if (!product) return [];
    const mainImages = Array.isArray(product.media) ? product.media : [];
    const cleanedMain = cleanImageUrls(mainImages);
    const variantImages: any[] = [];
    if (product.variants && Array.isArray(product.variants)) {
      const sortedVariants = [...product.variants].sort((a, b) => {
        const aPos = (a as any).position ?? 0;
        const bPos = (b as any).position ?? 0;
        return aPos - bPos;
      });
      sortedVariants.forEach((v) => {
        if (v.imageUrl) {
          const urls = smartSplitUrls(v.imageUrl);
          variantImages.push(...urls);
        }
      });
    }
    const cleanedVariantImages = cleanImageUrls(variantImages);
    const allImages: string[] = [];
    const seenNormalized = new Set<string>();
    cleanedMain.forEach((img) => {
      const processed = processImageUrl(img) || img;
      const normalized = normalizeUrlForComparison(processed);
      if (!seenNormalized.has(normalized)) {
        allImages.push(img);
        seenNormalized.add(normalized);
      }
    });
    cleanedVariantImages.forEach((img) => {
      const processed = processImageUrl(img) || img;
      const normalized = normalizeUrlForComparison(processed);
      if (!seenNormalized.has(normalized)) {
        allImages.push(img);
        seenNormalized.add(normalized);
      }
    });
    return allImages;
  }, [product]);

  // Fetch product
  const fetchProduct = useCallback(async () => {
    if (!slug || RESERVED_ROUTES.includes(slug.toLowerCase())) return;
    try {
      setLoading(true);
      const currentLang = getStoredLanguage();
      let data: Product;
      try {
        data = await apiClient.get<Product>(`/api/v1/products/${slug}`, {
          params: { lang: currentLang }
        });
      } catch (error: any) {
        if (error?.status === 404 && currentLang !== 'en') {
          try {
            data = await apiClient.get<Product>(`/api/v1/products/${slug}`, {
              params: { lang: 'en' }
            });
          } catch (fallbackError) {
            throw error;
          }
        } else {
          throw error;
        }
      }
      console.log('📦 [USE PRODUCT PAGE] Fetched product:', data.id);
      console.log('📦 [USE PRODUCT PAGE] productAttributes:', data.productAttributes);
      console.log('📦 [USE PRODUCT PAGE] productAttributes length:', data.productAttributes?.length || 0);
      console.log('📦 [USE PRODUCT PAGE] variants count:', data.variants?.length || 0);
      if (data.variants && data.variants.length > 0) {
        console.log('📦 [USE PRODUCT PAGE] First variant options:', data.variants[0]?.options);
        data.variants.forEach((v: any, idx: number) => {
          console.log(`📦 [USE PRODUCT PAGE] Variant ${idx} (${v.id}) options:`, v.options);
        });
      }
      setProduct(data);
      setCurrentImageIndex(0);
      setThumbnailStartIndex(0);
      if (data.variants && data.variants.length > 0) {
        let initialVariant = data.variants[0];
        if (variantIdFromUrl) {
          const variantById = data.variants.find(v => v.id === variantIdFromUrl || v.id.endsWith(variantIdFromUrl));
          const variantByIndex = data.variants[parseInt(variantIdFromUrl) - 1];
          initialVariant = variantById || variantByIndex || data.variants[0];
        }
        setSelectedVariant(initialVariant);
        const colorOption = initialVariant.options?.find(opt => opt.key === 'color');
        if (colorOption) setSelectedColor(colorOption.value?.toLowerCase().trim() || null);
        const sizeOption = initialVariant.options?.find(opt => opt.key === 'size');
        if (sizeOption) setSelectedSize(sizeOption.value?.toLowerCase().trim() || null);
      }
    } catch (error: any) {
      if (error?.status === 404) {
        setProduct(null);
      }
    } finally {
      setLoading(false);
    }
  }, [slug, variantIdFromUrl]);

  useEffect(() => {
    if (!slug) return;
    if (RESERVED_ROUTES.includes(slug.toLowerCase())) {
      router.replace(`/${slug}`);
    }
  }, [slug, router]);

  useEffect(() => {
    setLanguage(getStoredLanguage());
  }, []);

  useEffect(() => {
    if (!slug || RESERVED_ROUTES.includes(slug.toLowerCase())) return;
    fetchProduct();
    const handleCurrencyUpdate = () => setCurrency(getStoredCurrency());
    const handleLanguageUpdate = () => {
      setLanguage(getStoredLanguage());
      fetchProduct();
    };
    const handleCurrencyRatesUpdate = () => setCurrency(getStoredCurrency());
    window.addEventListener('currency-updated', handleCurrencyUpdate);
    window.addEventListener('language-updated', handleLanguageUpdate);
    window.addEventListener('currency-rates-updated', handleCurrencyRatesUpdate);
    return () => {
      window.removeEventListener('currency-updated', handleCurrencyUpdate);
      window.removeEventListener('language-updated', handleLanguageUpdate);
      window.removeEventListener('currency-rates-updated', handleCurrencyRatesUpdate);
    };
  }, [slug, variantIdFromUrl, router, fetchProduct]);

  useEffect(() => {
    if (!product) return;
    const checkWishlist = () => {
      if (typeof window === 'undefined') return;
      try {
        const stored = localStorage.getItem(WISHLIST_KEY);
        const wishlist = stored ? JSON.parse(stored) : [];
        setIsInWishlist(wishlist.includes(product.id));
      } catch { setIsInWishlist(false); }
    };
    checkWishlist();
    window.addEventListener('wishlist-updated', checkWishlist);
    return () => window.removeEventListener('wishlist-updated', checkWishlist);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const checkCompare = () => {
      if (typeof window === 'undefined') return;
      try {
        const stored = localStorage.getItem(COMPARE_KEY);
        const compare = stored ? JSON.parse(stored) : [];
        setIsInCompare(compare.includes(product.id));
      } catch { setIsInCompare(false); }
    };
    checkCompare();
    window.addEventListener('compare-updated', checkCompare);
    return () => window.removeEventListener('compare-updated', checkCompare);
  }, [product?.id]);

  useEffect(() => {
    if (images.length > 0 && currentImageIndex >= images.length) {
      setCurrentImageIndex(0);
    }
  }, [images.length, currentImageIndex]);

  useEffect(() => {
    if (!product || !slug) return;
    const loadReviews = async () => {
      try {
        const data = await apiClient.get<Array<{ rating: number }>>(`/api/v1/products/${slug}/reviews`);
        setReviews(data || []);
      } catch (error: any) {
        setReviews([]);
      }
    };
    loadReviews();
    const handleReviewUpdate = () => loadReviews();
    if (typeof window !== 'undefined') {
      window.addEventListener('review-updated', handleReviewUpdate);
      return () => window.removeEventListener('review-updated', handleReviewUpdate);
    }
  }, [product?.id, slug]);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const scrollToReviews = useCallback(() => {
    const reviewsElement = document.getElementById('product-reviews');
    if (reviewsElement) {
      reviewsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const getOptionValue = useCallback((options: VariantOption[] | undefined, key: string): string | null => {
    if (!options) return null;
    const opt = options.find(o => o.key === key || o.attribute === key);
    return opt?.value?.toLowerCase().trim() || null;
  }, []);

  const variantHasColor = useCallback((variant: ProductVariant, color: string): boolean => {
    if (!variant.options || !color) return false;
    const normalizedColor = color.toLowerCase().trim();
    const colorOptions = variant.options.filter(opt => 
      (opt.key === 'color' || opt.attribute === 'color')
    );
    return colorOptions.some(opt => {
      const optValue = opt.value?.toLowerCase().trim();
      return optValue === normalizedColor;
    });
  }, []);

  const findVariantByColorAndSize = useCallback((color: string | null, size: string | null): ProductVariant | null => {
    if (!product?.variants || product.variants.length === 0) return null;
    const normalizedColor = color?.toLowerCase().trim();
    const normalizedSize = size?.toLowerCase().trim();
    if (normalizedColor && normalizedSize) {
      const variant = product.variants.find(v => {
        const hasColor = variantHasColor(v, normalizedColor);
        const vSize = getOptionValue(v.options, 'size');
        return hasColor && vSize === normalizedSize;
      });
      if (variant) return variant;
    }
    if (normalizedColor) {
      const colorVariants = product.variants.filter(v => variantHasColor(v, normalizedColor));
      if (colorVariants.length > 0) {
        return colorVariants.find(v => v.stock > 0) || colorVariants[0];
      }
    }
    if (normalizedSize) {
      const sizeVariants = product.variants.filter(v => {
        const vSize = getOptionValue(v.options, 'size');
        return vSize === normalizedSize;
      });
      if (sizeVariants.length > 0) {
        return sizeVariants.find(v => v.stock > 0) || sizeVariants[0];
      }
    }
    return product.variants.find(v => v.stock > 0) || product.variants[0] || null;
  }, [product?.variants, getOptionValue, variantHasColor]);

  const findVariantByAllAttributes = useCallback((
    color: string | null,
    size: string | null,
    otherAttributes: Map<string, string>
  ): ProductVariant | null => {
    if (!product?.variants || product.variants.length === 0) return null;
    const normalizedColor = color?.toLowerCase().trim();
    const normalizedSize = size?.toLowerCase().trim();
    const allSelectedAttributes = new Map<string, string>();
    if (normalizedColor) allSelectedAttributes.set('color', normalizedColor);
    if (normalizedSize) allSelectedAttributes.set('size', normalizedSize);
    otherAttributes.forEach((value, key) => {
      if (key !== 'color' && key !== 'size') {
        allSelectedAttributes.set(key, value.toLowerCase().trim());
      }
    });
    const variantMatches = (variant: ProductVariant): boolean => {
      if (normalizedColor) {
        if (!variantHasColor(variant, normalizedColor)) return false;
      }
      if (normalizedSize) {
        const vSize = getOptionValue(variant.options, 'size');
        if (vSize !== normalizedSize) return false;
      }
      for (const [attrKey, attrValue] of otherAttributes.entries()) {
        if (attrKey === 'color' || attrKey === 'size') continue;
        const variantValue = getOptionValue(variant.options, attrKey);
        const normalizedAttrValue = attrValue.toLowerCase().trim();
        const option = variant.options?.find(opt => 
          opt.key === attrKey || opt.attribute === attrKey
        );
        if (option) {
          if (option.valueId && attrValue && option.valueId === attrValue) {
            continue;
          }
          if (variantValue !== normalizedAttrValue) {
            return false;
          }
        } else {
          return false;
        }
      }
      return true;
    };
    const exactMatch = product.variants.find(v => variantMatches(v) && v.imageUrl);
    if (exactMatch) return exactMatch;
    const anyMatch = product.variants.find(v => variantMatches(v));
    if (anyMatch) return anyMatch;
    if (normalizedColor || normalizedSize) {
      return findVariantByColorAndSize(normalizedColor || null, normalizedSize || null);
    }
    return product.variants.find(v => v.stock > 0) || product.variants[0] || null;
  }, [product?.variants, getOptionValue, findVariantByColorAndSize, variantHasColor]);

  // Build attribute groups - simplified version
  const attributeGroups = useMemo(() => {
    const groups = new Map<string, AttributeGroupValue[]>();
    if (!product) {
      console.log('🔄 [ATTRIBUTE GROUPS] No product, returning empty groups');
      return groups;
    }
    console.log('🔄 [ATTRIBUTE GROUPS] Building attribute groups for product:', product.id);
    console.log('🔄 [ATTRIBUTE GROUPS] product.productAttributes:', product.productAttributes);
    console.log('🔄 [ATTRIBUTE GROUPS] product.productAttributes length:', product.productAttributes?.length || 0);
    const isVariantCompatible = (variant: ProductVariant, currentSelections: Map<string, string>, excludeAttrKey?: string): boolean => {
      if (currentSelections.size === 0) return true;
      for (const [attrKey, selectedValue] of currentSelections.entries()) {
        if (excludeAttrKey && attrKey === excludeAttrKey) continue;
        const normalizedSelectedValue = selectedValue.toLowerCase().trim();
        let hasMatchingValue = false;
        const matchingOptions = variant.options?.filter(opt => {
          const optKey = opt.key || opt.attribute;
          return optKey === attrKey;
        }) || [];
        if (matchingOptions.length === 0) return false;
        for (const option of matchingOptions) {
          const optValue = option.value?.toLowerCase().trim();
          const optValueId = option.valueId;
          if (optValue === normalizedSelectedValue || (optValueId && optValueId === selectedValue)) {
            hasMatchingValue = true;
            break;
          }
        }
        if (!hasMatchingValue) return false;
      }
      return true;
    };
    const getCurrentSelections = (excludeAttrKey: string): Map<string, string> => {
      const selections = new Map<string, string>();
      if (selectedColor && excludeAttrKey !== 'color') selections.set('color', selectedColor);
      if (selectedSize && excludeAttrKey !== 'size') selections.set('size', selectedSize);
      selectedAttributeValues.forEach((value, key) => {
        if (key !== excludeAttrKey) selections.set(key, value);
      });
      return selections;
    };
    if (product.productAttributes && product.productAttributes.length > 0) {
      console.log('🔄 [ATTRIBUTE GROUPS] Using productAttributes format, processing', product.productAttributes.length, 'attributes');
      product.productAttributes.forEach((productAttr) => {
        const attrKey = productAttr.attribute.key;
        console.log('🔄 [ATTRIBUTE GROUPS] Processing attribute:', attrKey, 'with', productAttr.attribute.values?.length || 0, 'values');
        const valueMap = new Map<string, { valueId?: string; value: string; label: string; variants: ProductVariant[] }>();
        product.variants?.forEach((variant) => {
          const options = variant.options?.filter((opt) => {
            if (opt.valueId && opt.attributeId === productAttr.attribute.id) return true;
            return opt.key === attrKey || opt.attribute === attrKey;
          }) || [];
          options.forEach((option) => {
            const valueId = option.valueId || '';
            const value = option.value || '';
            let label = option.value || '';
            if (valueId && productAttr.attribute.values) {
              const attrValue = productAttr.attribute.values.find((v: any) => v.id === valueId);
              if (attrValue) label = attrValue.label || attrValue.value || value;
            }
            const mapKey = valueId || value;
            if (!valueMap.has(mapKey)) {
              valueMap.set(mapKey, { valueId: valueId || undefined, value, label, variants: [] });
            }
            if (!valueMap.get(mapKey)!.variants.some(v => v.id === variant.id)) {
              valueMap.get(mapKey)!.variants.push(variant);
            }
          });
        });
        const currentSelections = getCurrentSelections(attrKey);
        const groupsArray = Array.from(valueMap.values()).map((item) => {
          let attrValue = null;
          if (item.valueId && productAttr.attribute.values) {
            attrValue = productAttr.attribute.values.find((v: any) => v.id === item.valueId);
          }
          if (!attrValue && productAttr.attribute.values) {
            attrValue = productAttr.attribute.values.find((v: any) => 
              v.value?.toLowerCase() === item.value?.toLowerCase() || v.value === item.value
            );
          }
          let stock = 0;
          if (currentSelections.size > 0) {
            const compatibleVariants = item.variants.filter(v => isVariantCompatible(v, currentSelections, attrKey));
            stock = compatibleVariants.reduce((sum, v) => sum + v.stock, 0);
          } else {
            stock = item.variants.reduce((sum, v) => sum + v.stock, 0);
          }
          return {
            valueId: item.valueId,
            value: item.value,
            label: item.label,
            stock: stock,
            variants: item.variants,
            imageUrl: attrValue?.imageUrl || null,
            colors: attrValue?.colors || null,
          };
        });
        console.log('🔄 [ATTRIBUTE GROUPS] Built', groupsArray.length, 'values for attribute', attrKey);
        groups.set(attrKey, groupsArray);
      });
      console.log('🔄 [ATTRIBUTE GROUPS] Final groups size:', groups.size);
    } else {
      console.log('🔄 [ATTRIBUTE GROUPS] No productAttributes, falling back to old format (color/size only)');
      console.log('🔄 [ATTRIBUTE GROUPS] Product variants count:', product?.variants?.length || 0);
      if (product?.variants) {
        const colorMap = new Map<string, ProductVariant[]>();
        const sizeMap = new Map<string, ProductVariant[]>();
        product.variants.forEach((variant) => {
          console.log('🔄 [ATTRIBUTE GROUPS] Variant', variant.id, 'options:', variant.options);
          variant.options?.forEach((opt) => {
            const attrKey = opt.key || opt.attribute || '';
            const value = opt.value || '';
            console.log('🔄 [ATTRIBUTE GROUPS] Option:', { attrKey, value });
            if (!value) return;
            if (attrKey === 'color') {
              const normalizedColor = value.toLowerCase().trim();
              if (!colorMap.has(normalizedColor)) colorMap.set(normalizedColor, []);
              if (!colorMap.get(normalizedColor)!.some(v => v.id === variant.id)) {
                colorMap.get(normalizedColor)!.push(variant);
              }
            } else if (attrKey === 'size') {
              const normalizedSize = value.toLowerCase().trim();
              if (!sizeMap.has(normalizedSize)) sizeMap.set(normalizedSize, []);
              if (!sizeMap.get(normalizedSize)!.some(v => v.id === variant.id)) {
                sizeMap.get(normalizedSize)!.push(variant);
              }
            } else {
              // Also collect other attributes, not just color and size
              console.log('🔄 [ATTRIBUTE GROUPS] Found other attribute:', attrKey, '=', value);
            }
          });
        });
        console.log('🔄 [ATTRIBUTE GROUPS] Color map size:', colorMap.size);
        console.log('🔄 [ATTRIBUTE GROUPS] Size map size:', sizeMap.size);
        if (colorMap.size > 0) {
          const colorGroups = Array.from(colorMap.entries()).map(([value, variants]) => ({
            value, label: value, stock: variants.reduce((sum, v) => sum + v.stock, 0), variants,
          }));
          console.log('🔄 [ATTRIBUTE GROUPS] Setting color groups:', colorGroups.length);
          groups.set('color', colorGroups);
        }
        if (sizeMap.size > 0) {
          const sizeGroups = Array.from(sizeMap.entries()).map(([value, variants]) => ({
            value, label: value, stock: variants.reduce((sum, v) => sum + v.stock, 0), variants,
          }));
          console.log('🔄 [ATTRIBUTE GROUPS] Setting size groups:', sizeGroups.length);
          groups.set('size', sizeGroups);
        }
        
        // Also collect ALL other attributes from variants (not just color/size)
        const otherAttributesMap = new Map<string, Map<string, ProductVariant[]>>();
        product.variants.forEach((variant) => {
          variant.options?.forEach((opt) => {
            const attrKey = opt.key || opt.attribute || '';
            const value = opt.value || '';
            if (!value || attrKey === 'color' || attrKey === 'size') return;
            
            if (!otherAttributesMap.has(attrKey)) {
              otherAttributesMap.set(attrKey, new Map<string, ProductVariant[]>());
            }
            const valueMap = otherAttributesMap.get(attrKey)!;
            const normalizedValue = value.toLowerCase().trim();
            if (!valueMap.has(normalizedValue)) {
              valueMap.set(normalizedValue, []);
            }
            if (!valueMap.get(normalizedValue)!.some(v => v.id === variant.id)) {
              valueMap.get(normalizedValue)!.push(variant);
            }
          });
        });
        
        // Add all other attributes to groups
        otherAttributesMap.forEach((valueMap, attrKey) => {
          const attrGroups = Array.from(valueMap.entries()).map(([value, variants]) => ({
            value, label: value, stock: variants.reduce((sum, v) => sum + v.stock, 0), variants,
          }));
          console.log('🔄 [ATTRIBUTE GROUPS] Setting attribute', attrKey, 'with', attrGroups.length, 'values');
          groups.set(attrKey, attrGroups);
        });
      }
    }
    console.log('🔄 [ATTRIBUTE GROUPS] Returning groups with', groups.size, 'attributes:', Array.from(groups.keys()));
    return groups;
  }, [product, selectedColor, selectedSize, selectedAttributeValues, getOptionValue]);

  const colorGroups: Array<{ color: string; stock: number; variants: ProductVariant[] }> = [];
  const colorAttrGroup = attributeGroups.get('color');
  if (colorAttrGroup) {
    colorGroups.push(...colorAttrGroup.map((g) => ({
      color: g.value, stock: g.stock, variants: g.variants,
    })));
  }

  const sizeGroups: Array<{ size: string; stock: number; variants: ProductVariant[] }> = [];
  const sizeAttrGroup = attributeGroups.get('size');
  if (sizeAttrGroup) {
    sizeGroups.push(...sizeAttrGroup.map((g) => ({
      size: g.value, stock: g.stock, variants: g.variants,
    })));
  }

  const currentVariant = selectedVariant || findVariantByColorAndSize(selectedColor, selectedSize) || product?.variants?.[0] || null;
  const price = currentVariant?.price || 0;
  const originalPrice = currentVariant?.originalPrice;
  const compareAtPrice = currentVariant?.compareAtPrice;
  const discountPercent = currentVariant?.productDiscount || product?.productDiscount || null;
  const maxQuantity = currentVariant?.stock && currentVariant.stock > 0 ? currentVariant.stock : 0;
  const isOutOfStock = !currentVariant || currentVariant.stock <= 0;
  
  const hasColorAttribute = colorGroups.length > 0 && colorGroups.some(g => g.stock > 0);
  const hasSizeAttribute = sizeGroups.length > 0 && sizeGroups.some(g => g.stock > 0);
  const needsColor = hasColorAttribute && !selectedColor;
  const needsSize = hasSizeAttribute && !selectedSize;
  const isVariationRequired = needsColor || needsSize;
  
  const getRequiredAttributesMessage = (): string => {
    if (needsColor && needsSize) return t(language, 'product.selectColorAndSize');
    if (needsColor) return t(language, 'product.selectColor');
    if (needsSize) return t(language, 'product.selectSize');
    return t(language, 'product.selectOptions');
  };
  
  const unavailableAttributes = useMemo(() => {
    const unavailable = new Map<string, boolean>();
    if (!currentVariant || !product) return unavailable;
    currentVariant.options?.forEach((option) => {
      const attrKey = option.key || option.attribute;
      if (!attrKey) return;
      const attrGroup = attributeGroups.get(attrKey);
      if (!attrGroup) return;
      const attrValue = attrGroup.find((g) => {
        if (option.valueId && g.valueId) return g.valueId === option.valueId;
        return g.value?.toLowerCase().trim() === option.value?.toLowerCase().trim();
      });
      if (attrValue && attrValue.stock <= 0) unavailable.set(attrKey, true);
    });
    return unavailable;
  }, [currentVariant, attributeGroups, product]);
  
  const hasUnavailableAttributes = unavailableAttributes.size > 0;
  const canAddToCart = !isOutOfStock && !isVariationRequired && !hasUnavailableAttributes;

  useEffect(() => {
    if (!currentVariant || currentVariant.stock <= 0) { setQuantity(0); return; }
    setQuantity(prev => {
      const currentStock = currentVariant.stock;
      if (prev > currentStock) return currentStock;
      if (prev <= 0 && currentStock > 0) return 1;
      return prev;
    });
  }, [currentVariant?.id, currentVariant?.stock]);

  const adjustQuantity = (delta: number) => {
    if (isOutOfStock || isVariationRequired) return;
    setQuantity(prev => {
      const next = prev + delta;
      if (next < 1) return currentVariant && currentVariant.stock > 0 ? 1 : 0;
      return next > maxQuantity ? maxQuantity : next;
    });
  };

  // Switch to variant's image if it exists
  const switchToVariantImage = useCallback((variant: ProductVariant | null) => {
    if (!variant || !variant.imageUrl || !product) return;
    const splitUrls = smartSplitUrls(variant.imageUrl);
    if (splitUrls.length === 0) return;
    const normalizeUrl = (url: string): string => {
      let normalized = url.trim();
      if (normalized.startsWith('/')) normalized = normalized.substring(1);
      if (normalized.endsWith('/')) normalized = normalized.substring(0, normalized.length - 1);
      return normalized.toLowerCase();
    };
    const isAttributeValueImage = (url: string): boolean => {
      if (!product.productAttributes) return false;
      for (const productAttr of product.productAttributes) {
        if (productAttr.attribute?.values) {
          for (const val of productAttr.attribute.values) {
            if (val.imageUrl) {
              const attrProcessed = processImageUrl(val.imageUrl);
              if (attrProcessed) {
                const normalizedAttr = normalizeUrl(attrProcessed);
                const normalizedVariant = normalizeUrl(url);
                if (normalizedAttr === normalizedVariant) return true;
              }
            }
          }
        }
      }
      return false;
    };
    for (const url of splitUrls) {
      if (!url || url.trim() === '') continue;
      const processedUrl = processImageUrl(url);
      if (!processedUrl || isAttributeValueImage(processedUrl)) continue;
      const imageIndex = images.findIndex(img => {
        if (!img) return false;
        const processedImg = processImageUrl(img);
        if (!processedImg) return false;
        const normalizedImg = normalizeUrl(processedImg);
        const normalizedProcessed = normalizeUrl(processedUrl);
        if (normalizedImg === normalizedProcessed) return true;
        const imgWithSlash = processedImg.startsWith('/') ? processedImg : `/${processedImg}`;
        const imgWithoutSlash = processedImg.startsWith('/') ? processedImg.substring(1) : processedImg;
        const processedWithSlash = processedUrl.startsWith('/') ? processedUrl : `/${processedUrl}`;
        const processedWithoutSlash = processedUrl.startsWith('/') ? processedUrl.substring(1) : processedUrl;
        return imgWithSlash === processedWithSlash || 
               imgWithoutSlash === processedWithoutSlash ||
               imgWithSlash === processedWithoutSlash ||
               imgWithoutSlash === processedWithSlash;
      });
      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex);
        return;
      }
    }
  }, [images, product, setCurrentImageIndex]);

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      const newVariant = findVariantByAllAttributes(selectedColor, selectedSize, selectedAttributeValues);
      if (newVariant && newVariant.id !== selectedVariant?.id) {
        setSelectedVariant(newVariant);
        switchToVariantImage(newVariant);
        const colorValue = getOptionValue(newVariant.options, 'color');
        const sizeValue = getOptionValue(newVariant.options, 'size');
        if (colorValue && colorValue !== selectedColor?.toLowerCase().trim()) {
          setSelectedColor(colorValue);
        }
        if (sizeValue && sizeValue !== selectedSize?.toLowerCase().trim()) {
          setSelectedSize(sizeValue);
        }
      } else if (newVariant && newVariant.imageUrl) {
        switchToVariantImage(newVariant);
      }
    }
  }, [selectedColor, selectedSize, selectedAttributeValues, findVariantByAllAttributes, selectedVariant?.id, product, getOptionValue, switchToVariantImage]);

  const handleColorSelect = (color: string) => {
    if (!color || !product) return;
    const normalizedColor = color.toLowerCase().trim();
    if (selectedColor === normalizedColor) {
      setSelectedColor(null);
    } else {
      setSelectedColor(normalizedColor);
      // Try to find and switch to a variant image with this color
      const colorVariants = product.variants?.filter(v => {
        return variantHasColor(v, normalizedColor) && v.imageUrl;
      }) || [];
      for (const variant of colorVariants) {
        if (!variant.imageUrl) continue;
        const splitUrls = smartSplitUrls(variant.imageUrl);
        for (const url of splitUrls) {
          if (!url || url.trim() === '') continue;
          const processedUrl = processImageUrl(url);
          if (!processedUrl) continue;
          const normalizeUrl = (u: string): string => {
            let n = u.trim().toLowerCase();
            if (n.startsWith('/')) n = n.substring(1);
            if (n.endsWith('/')) n = n.substring(0, n.length - 1);
            return n;
          };
          const imageIndex = images.findIndex(img => {
            if (!img) return false;
            const processedImg = processImageUrl(img);
            if (!processedImg) return false;
            const normalizedImg = normalizeUrl(processedImg);
            const normalizedUrl = normalizeUrl(processedUrl);
            if (normalizedImg === normalizedUrl) return true;
            const imgWithSlash = processedImg.startsWith('/') ? processedImg : `/${processedImg}`;
            const imgWithoutSlash = processedImg.startsWith('/') ? processedImg.substring(1) : processedImg;
            const urlWithSlash = processedUrl.startsWith('/') ? processedUrl : `/${processedUrl}`;
            const urlWithoutSlash = processedUrl.startsWith('/') ? processedUrl.substring(1) : processedUrl;
            return imgWithSlash === urlWithSlash || 
                   imgWithoutSlash === urlWithoutSlash ||
                   imgWithSlash === urlWithoutSlash ||
                   imgWithoutSlash === urlWithSlash;
          });
          if (imageIndex !== -1) {
            setCurrentImageIndex(imageIndex);
            return;
          }
        }
      }
    }
  };

  const handleSizeSelect = (size: string) => {
    if (selectedSize === size) setSelectedSize(null);
    else setSelectedSize(size);
  };

  const handleAttributeValueSelect = (attrKey: string, value: string) => {
    const newMap = new Map(selectedAttributeValues);
    const currentValue = selectedAttributeValues.get(attrKey);
    if (currentValue === value) {
      newMap.delete(attrKey);
    } else {
      newMap.set(attrKey, value);
    }
    setSelectedAttributeValues(newMap);
  };

  const handleAddToWishlist = (e: MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!product || typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      const wishlist: string[] = stored ? JSON.parse(stored) : [];
      if (isInWishlist) {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist.filter(id => id !== product.id)));
        setIsInWishlist(false);
        setShowMessage(t(language, 'product.removedFromWishlist'));
      } else {
        wishlist.push(product.id);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
        setIsInWishlist(true);
        setShowMessage(t(language, 'product.addedToWishlist'));
      }
      setTimeout(() => setShowMessage(null), 2000);
      window.dispatchEvent(new Event('wishlist-updated'));
    } catch (err) { }
  };

  const handleCompareToggle = (e: MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!product || typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(COMPARE_KEY);
      const compare: string[] = stored ? JSON.parse(stored) : [];
      if (isInCompare) {
        localStorage.setItem(COMPARE_KEY, JSON.stringify(compare.filter(id => id !== product.id)));
        setIsInCompare(false);
        setShowMessage(t(language, 'product.removedFromCompare'));
      } else {
        if (compare.length >= 4) { setShowMessage(t(language, 'product.compareListFull')); }
        else {
          compare.push(product.id);
          localStorage.setItem(COMPARE_KEY, JSON.stringify(compare));
          setIsInCompare(true);
          setShowMessage(t(language, 'product.addedToCompare'));
        }
      }
      setTimeout(() => setShowMessage(null), 2000);
      window.dispatchEvent(new Event('compare-updated'));
    } catch (err) { }
  };

  return {
    product,
    loading,
    images,
    currentImageIndex,
    setCurrentImageIndex,
    thumbnailStartIndex,
    setThumbnailStartIndex,
    currency,
    language,
    selectedVariant,
    selectedColor,
    selectedSize,
    selectedAttributeValues,
    isAddingToCart,
    setIsAddingToCart,
    showMessage,
    setShowMessage,
    isInWishlist,
    isInCompare,
    quantity,
    reviews,
    averageRating,
    slug,
    attributeGroups,
    colorGroups,
    sizeGroups,
    currentVariant,
    price,
    originalPrice: originalPrice ?? null,
    compareAtPrice: compareAtPrice ?? null,
    discountPercent,
    maxQuantity,
    isOutOfStock,
    isVariationRequired,
    hasUnavailableAttributes,
    unavailableAttributes,
    canAddToCart,
    scrollToReviews,
    getOptionValue,
    adjustQuantity,
    handleColorSelect,
    handleSizeSelect,
    handleAttributeValueSelect,
    handleAddToWishlist,
    handleCompareToggle,
    getRequiredAttributesMessage,
  };
}



