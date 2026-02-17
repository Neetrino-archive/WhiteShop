import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { convertPrice, type CurrencyCode } from '@/lib/currency';
import { smartSplitUrls, cleanImageUrls, separateMainAndVariantImages } from '@/lib/utils/image-utils';
import type { ProductData, ColorData, Variant } from '../types';
import { useTranslation } from '@/lib/i18n-client';

interface UseProductEditModeProps {
  productId: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  attributes: any[];
  defaultCurrency: CurrencyCode;
  setLoadingProduct: (loading: boolean) => void;
  setFormData: (updater: (prev: any) => any) => void;
  setUseNewBrand: (use: boolean) => void;
  setUseNewCategory: (use: boolean) => void;
  setNewBrandName: (name: string) => void;
  setNewCategoryName: (name: string) => void;
  setHasVariantsToLoad: (has: boolean) => void;
  setProductType: (type: 'simple' | 'variable') => void;
  setSimpleProductData: (data: any) => void;
}

export function useProductEditMode({
  productId,
  isLoggedIn,
  isAdmin,
  attributes,
  defaultCurrency,
  setLoadingProduct,
  setFormData,
  setUseNewBrand,
  setUseNewCategory,
  setNewBrandName,
  setNewCategoryName,
  setHasVariantsToLoad,
  setProductType,
  setSimpleProductData,
}: UseProductEditModeProps) {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (productId && isLoggedIn && isAdmin) {
      const loadProduct = async () => {
        try {
          setLoadingProduct(true);
          console.log('📥 [ADMIN] Loading product for edit:', productId);
          const product = await apiClient.get<ProductData>(`/api/v1/admin/products/${productId}`);
          
          const colorDataMap = new Map<string, ColorData>();
          let firstPrice = '';
          let firstCompareAtPrice = '';
          let firstSku = '';
          
          (product.variants || []).forEach((variant: any, index: number) => {
            console.log(`🔍 [ADMIN] Processing variant ${index}:`, {
              id: variant.id,
              sku: variant.sku,
              price: variant.price,
              stock: variant.stock,
              color: variant.color,
              size: variant.size,
              options: variant.options,
              imageUrl: variant.imageUrl,
            });
            
            let color = variant.color || '';
            let size = variant.size || '';
            
            if (!color && variant.options && Array.isArray(variant.options)) {
              console.log(`🔍 [ADMIN] Searching for color in options:`, variant.options);
              const colorOption = variant.options.find((opt: any) => {
                const matches = opt.attributeKey === 'color' || opt.key === 'color' || opt.attribute === 'color';
                if (matches) {
                  console.log(`✅ [ADMIN] Found color option:`, opt);
                }
                return matches;
              });
              if (colorOption) {
                color = colorOption.value || '';
                console.log(`✅ [ADMIN] Found color from options:`, color);
              } else {
                const colorOptionByValue = variant.options.find((opt: any) => {
                  if (opt.attributeValue) {
                    const attrValue = opt.attributeValue;
                    return attrValue.attribute?.key === 'color' || attrValue.attributeKey === 'color';
                  }
                  return false;
                });
                if (colorOptionByValue && colorOptionByValue.attributeValue) {
                  color = colorOptionByValue.attributeValue.value || '';
                  console.log(`✅ [ADMIN] Found color from attributeValue:`, color);
                }
              }
            }
            
            if (!size && variant.options && Array.isArray(variant.options)) {
              console.log(`🔍 [ADMIN] Searching for size in options:`, variant.options);
              const sizeOption = variant.options.find((opt: any) => {
                const matches = opt.attributeKey === 'size' || opt.key === 'size' || opt.attribute === 'size';
                if (matches) {
                  console.log(`✅ [ADMIN] Found size option:`, opt);
                }
                return matches;
              });
              if (sizeOption) {
                size = sizeOption.value || '';
                console.log(`✅ [ADMIN] Found size from options:`, size);
              } else {
                const sizeOptionByValue = variant.options.find((opt: any) => {
                  if (opt.attributeValue) {
                    const attrValue = opt.attributeValue;
                    return attrValue.attribute?.key === 'size' || attrValue.attributeKey === 'size';
                  }
                  return false;
                });
                if (sizeOptionByValue && sizeOptionByValue.attributeValue) {
                  size = sizeOptionByValue.attributeValue.value || '';
                  console.log(`✅ [ADMIN] Found size from attributeValue:`, size);
                }
              }
            }
            
            if (!color && variant.sku) {
              const skuParts = variant.sku.split('-');
              if (skuParts.length >= 2) {
                const possibleColor = skuParts[1];
                if (possibleColor && possibleColor.length > 0 && !/^\d+$/.test(possibleColor)) {
                  color = possibleColor;
                  console.log(`✅ [ADMIN] Extracted color from SKU:`, color);
                }
              }
            }
            
            if (!size && variant.sku) {
              const skuParts = variant.sku.split('-');
              if (skuParts.length >= 3) {
                const possibleSize = skuParts[2];
                if (possibleSize) {
                  size = possibleSize;
                  console.log(`✅ [ADMIN] Extracted size from SKU:`, size);
                }
              }
            }
            
            console.log(`📊 [ADMIN] Extracted from variant ${index}:`, { color, size });
            
            const stockValue = variant.stock !== undefined && variant.stock !== null 
              ? String(variant.stock) 
              : '';
            
            if (!color) {
              const defaultColor = 'default';
              const defaultColorLabel = t('admin.products.add.defaultColor');
              
              if (!colorDataMap.has(defaultColor)) {
                const priceInDefaultCurrency = variant.price !== undefined && variant.price !== null 
                  ? convertPrice(typeof variant.price === 'number' ? variant.price : parseFloat(String(variant.price || '0')), 'USD', defaultCurrency) 
                  : 0;
                const compareAtPriceInDefaultCurrency = variant.compareAtPrice !== undefined && variant.compareAtPrice !== null 
                  ? convertPrice(typeof variant.compareAtPrice === 'number' ? variant.compareAtPrice : parseFloat(String(variant.compareAtPrice || '0')), 'USD', defaultCurrency) 
                  : 0;
                
                const colorData: ColorData = {
                  colorValue: defaultColor,
                  colorLabel: defaultColorLabel,
                  images: smartSplitUrls(variant.imageUrl),
                  stock: size ? '' : stockValue,
                  price: variant.price !== undefined && variant.price !== null ? String(priceInDefaultCurrency) : '',
                  compareAtPrice: variant.compareAtPrice !== undefined && variant.compareAtPrice !== null ? String(compareAtPriceInDefaultCurrency) : '',
                  sizes: [],
                  sizeStocks: {},
                  sizePrices: {},
                  sizeCompareAtPrices: {},
                  sizeLabels: {},
                  isFeatured: !!variant.isFeatured,
                };
                
                if (size) {
                  colorData.sizes = [size];
                  colorData.sizeStocks = { [size]: stockValue };
                  if (variant.price !== undefined && variant.price !== null) {
                    colorData.sizePrices![size] = String(priceInDefaultCurrency);
                  }
                  if (variant.compareAtPrice !== undefined && variant.compareAtPrice !== null) {
                    colorData.sizeCompareAtPrices![size] = String(compareAtPriceInDefaultCurrency);
                  }
                }
                
                colorDataMap.set(defaultColor, colorData);
              } else {
                const existingColorData = colorDataMap.get(defaultColor)!;
                if (variant.imageUrl) {
                  const imageUrls = smartSplitUrls(variant.imageUrl);
                  imageUrls.forEach((url: string) => {
                    const exists = existingColorData.images.some(existingUrl => {
                      if (url.startsWith('data:') || existingUrl.startsWith('data:')) {
                        return url === existingUrl;
                      }
                      const n1 = existingUrl.startsWith('/') ? existingUrl : `/${existingUrl}`;
                      const n2 = url.startsWith('/') ? url : `/${url}`;
                      return n1 === n2 || existingUrl === url;
                    });
                    if (url && !exists) {
                      existingColorData.images.push(url);
                    }
                  });
                }
                
                if (size) {
                  if (!existingColorData.sizes.includes(size)) {
                    existingColorData.sizes.push(size);
                  }
                  existingColorData.sizeStocks[size] = stockValue;
                  if (!existingColorData.sizePrices) existingColorData.sizePrices = {};
                  if (variant.price !== undefined && variant.price !== null) {
                    const priceInDefaultCurrency = convertPrice(typeof variant.price === 'number' ? variant.price : parseFloat(String(variant.price || '0')), 'USD', defaultCurrency);
                    existingColorData.sizePrices[size] = String(priceInDefaultCurrency);
                  }
                  if (!existingColorData.sizeCompareAtPrices) existingColorData.sizeCompareAtPrices = {};
                  if (variant.compareAtPrice !== undefined && variant.compareAtPrice !== null) {
                    const compareAtPriceInDefaultCurrency = convertPrice(typeof variant.compareAtPrice === 'number' ? variant.compareAtPrice : parseFloat(String(variant.compareAtPrice || '0')), 'USD', defaultCurrency);
                    existingColorData.sizeCompareAtPrices[size] = String(compareAtPriceInDefaultCurrency);
                  }
                } else {
                  const currentStockNum = parseInt(existingColorData.stock) || 0;
                  const variantStockNum = parseInt(stockValue) || 0;
                  existingColorData.stock = String(currentStockNum + variantStockNum);
                }
              }
            } else if (color) {
              if (!colorDataMap.has(color)) {
                const colorAttribute = attributes.find((attr) => attr.key === 'color');
                const colorValueObj = colorAttribute?.values.find((v: { id: string; value: string; label: string }) => v.value === color);
                const colorLabel = colorValueObj?.label || 
                  (color.charAt(0).toUpperCase() + color.slice(1).replace(/-/g, ' '));
                
                const priceInDefaultCurrency = variant.price !== undefined && variant.price !== null 
                  ? convertPrice(typeof variant.price === 'number' ? variant.price : parseFloat(String(variant.price || '0')), 'USD', defaultCurrency) 
                  : 0;
                const compareAtPriceInDefaultCurrency = variant.compareAtPrice !== undefined && variant.compareAtPrice !== null 
                  ? convertPrice(typeof variant.compareAtPrice === 'number' ? variant.compareAtPrice : parseFloat(String(variant.compareAtPrice || '0')), 'USD', defaultCurrency) 
                  : 0;
                
                const colorData: ColorData = {
                  colorValue: color,
                  colorLabel: colorLabel,
                  images: smartSplitUrls(variant.imageUrl),
                  stock: size ? '' : stockValue,
                  price: variant.price !== undefined && variant.price !== null ? String(priceInDefaultCurrency) : '',
                  compareAtPrice: variant.compareAtPrice !== undefined && variant.compareAtPrice !== null ? String(compareAtPriceInDefaultCurrency) : '',
                  sizes: [],
                  sizeStocks: {},
                  sizePrices: {},
                  sizeCompareAtPrices: {},
                  sizeLabels: {},
                  isFeatured: !!variant.isFeatured,
                };
                
                if (size) {
                  colorData.sizes = [size];
                  colorData.sizeStocks = { [size]: stockValue };
                  if (variant.price !== undefined && variant.price !== null) {
                    colorData.sizePrices![size] = String(priceInDefaultCurrency);
                  }
                  if (variant.compareAtPrice !== undefined && variant.compareAtPrice !== null) {
                    colorData.sizeCompareAtPrices![size] = String(compareAtPriceInDefaultCurrency);
                  }
                  if (variant.sizeLabel) {
                    colorData.sizeLabels = { [size]: variant.sizeLabel };
                  }
                }
                
                colorDataMap.set(color, colorData);
              } else {
                const existingColorData = colorDataMap.get(color)!;
                
                if (variant.imageUrl) {
                  const imageUrls = smartSplitUrls(variant.imageUrl);
                  imageUrls.forEach((url: string) => {
                    const exists = existingColorData.images.some(existingUrl => {
                      if (url.startsWith('data:') || existingUrl.startsWith('data:')) {
                        return url === existingUrl;
                      }
                      const n1 = existingUrl.startsWith('/') ? existingUrl : `/${existingUrl}`;
                      const n2 = url.startsWith('/') ? url : `/${url}`;
                      return n1 === n2 || existingUrl === url;
                    });
                    
                    if (url && !exists) {
                      existingColorData.images.push(url);
                    }
                  });
                }
                
                if (size) {
                  if (!existingColorData.sizes.includes(size)) {
                    existingColorData.sizes.push(size);
                  }
                  existingColorData.sizeStocks[size] = stockValue;
                  if (!existingColorData.sizePrices) existingColorData.sizePrices = {};
                  if (variant.price !== undefined && variant.price !== null) {
                    const priceInDefaultCurrency = convertPrice(typeof variant.price === 'number' ? variant.price : parseFloat(String(variant.price || '0')), 'USD', defaultCurrency);
                    existingColorData.sizePrices[size] = String(priceInDefaultCurrency);
                  }
                  if (!existingColorData.sizeCompareAtPrices) existingColorData.sizeCompareAtPrices = {};
                  if (variant.compareAtPrice !== undefined && variant.compareAtPrice !== null) {
                    const compareAtPriceInDefaultCurrency = convertPrice(typeof variant.compareAtPrice === 'number' ? variant.compareAtPrice : parseFloat(String(variant.compareAtPrice || '0')), 'USD', defaultCurrency);
                    existingColorData.sizeCompareAtPrices[size] = String(compareAtPriceInDefaultCurrency);
                  }
                  if (variant.sizeLabel) {
                    if (!existingColorData.sizeLabels) existingColorData.sizeLabels = {};
                    existingColorData.sizeLabels[size] = variant.sizeLabel;
                  }
                } else {
                  const currentStockNum = parseInt(existingColorData.stock) || 0;
                  const variantStockNum = parseInt(stockValue) || 0;
                  existingColorData.stock = String(currentStockNum + variantStockNum);
                }

                if (variant.isFeatured) {
                  existingColorData.isFeatured = true;
                }
              }
            }
            
            if (index === 0) {
              const firstPriceUSD = variant.price !== undefined && variant.price !== null ? variant.price : 0;
              const firstCompareAtPriceUSD = variant.compareAtPrice !== undefined && variant.compareAtPrice !== null ? variant.compareAtPrice : 0;
              firstPrice = firstPriceUSD > 0 ? String(convertPrice(firstPriceUSD, 'USD', defaultCurrency)) : '';
              firstCompareAtPrice = firstCompareAtPriceUSD > 0 ? String(convertPrice(firstCompareAtPriceUSD, 'USD', defaultCurrency)) : '';
              firstSku = variant.sku || '';
            }
          });
          
          const mergedVariant: Variant = {
            id: `variant-${Date.now()}-${Math.random()}`,
            price: firstPrice,
            compareAtPrice: firstCompareAtPrice,
            sku: firstSku,
            colors: Array.from(colorDataMap.values()),
          };
          
          const variantImages = new Set<string>();
          
          mergedVariant.colors.forEach(c => {
            c.images.forEach(img => {
              if (img) {
                variantImages.add(img);
                const normalized = img.startsWith('/') ? img : `/${img}`;
                variantImages.add(normalized);
              }
            });
          });
          
          console.log('🖼️ [ADMIN] Collecting variant images from product.variants...');
          (product.variants || []).forEach((variant: any, idx: number) => {
            if (variant.imageUrl) {
              if (typeof variant.imageUrl === 'string' && variant.imageUrl.startsWith('data:')) {
                variantImages.add(variant.imageUrl);
                console.log(`  ✅ Added variant base64 image (length: ${variant.imageUrl.length})`);
              } else {
                const imageUrls = typeof variant.imageUrl === 'string' 
                  ? variant.imageUrl.split(',').map((url: string) => url.trim()).filter(Boolean)
                  : [];
                imageUrls.forEach((url: string) => {
                  if (url) {
                    variantImages.add(url);
                    const normalizedWithSlash = url.startsWith('/') ? url : `/${url}`;
                    const normalizedWithoutSlash = url.startsWith('/') ? url.substring(1) : url;
                    variantImages.add(normalizedWithSlash);
                    variantImages.add(normalizedWithoutSlash);
                    const urlWithoutQuery = url.split('?')[0];
                    if (urlWithoutQuery !== url) {
                      variantImages.add(urlWithoutQuery);
                      const normalizedWithoutQuery = urlWithoutQuery.startsWith('/') ? urlWithoutQuery : `/${urlWithoutQuery}`;
                      variantImages.add(normalizedWithoutQuery);
                    }
                    console.log(`  ✅ Added variant URL: ${url.substring(0, 50)}...`);
                  }
                });
              }
            } else {
              console.log(`🖼️ [ADMIN] Variant ${idx} has no imageUrl`);
            }
          });
          console.log(`🖼️ [ADMIN] Total variant images collected: ${variantImages.size}`);

          const mediaList = product.media || [];
          console.log('🖼️ [ADMIN] Loading main media images. Total media:', mediaList.length);
          
          const { main } = separateMainAndVariantImages(
            Array.isArray(mediaList) ? mediaList : [],
            variantImages.size > 0 ? Array.from(variantImages) : []
          );
          
          const normalizedMedia = cleanImageUrls(main);
          console.log(`🖼️ [ADMIN] Main media loaded: ${normalizedMedia.length} images (after separation from ${variantImages.size} variant images)`);
          
          const featuredIndexFromApi = Array.isArray(mediaList)
            ? mediaList.findIndex((item: any) => {
                const url = typeof item === 'string' ? item : item?.url || '';
                if (!url) return false;
                return typeof item === 'object' && item?.isFeatured === true;
              })
            : -1;

          const mainProductImage = (product as any).mainProductImage 
            || (normalizedMedia.length > 0 ? normalizedMedia[0] : '');

          const brandIds = product.brandId ? [product.brandId] : [];

          setFormData((prev: any) => ({
            ...prev,
            title: product.title || '',
            slug: product.slug || '',
            descriptionHtml: product.descriptionHtml || '',
            brandIds: brandIds,
            primaryCategoryId: product.primaryCategoryId || '',
            categoryIds: product.categoryIds || [],
            published: product.published || false,
            featured: product.featured || false,
            imageUrls: normalizedMedia,
            featuredImageIndex:
              featuredIndexFromApi >= 0 && featuredIndexFromApi < normalizedMedia.length
                ? featuredIndexFromApi
                : 0,
            mainProductImage: normalizedMedia.length > 0 && normalizedMedia[featuredIndexFromApi >= 0 && featuredIndexFromApi < normalizedMedia.length ? featuredIndexFromApi : 0]
              ? normalizedMedia[featuredIndexFromApi >= 0 && featuredIndexFromApi < normalizedMedia.length ? featuredIndexFromApi : 0]
              : mainProductImage || '',
            variants: [mergedVariant],
            labels: (product.labels || []).map((label: any) => ({
              id: label.id || '',
              type: label.type || 'text',
              value: label.value || '',
              position: label.position || 'top-left',
              color: label.color || null,
            })),
          }));
          
          setUseNewBrand(false);
          setUseNewCategory(false);
          setNewBrandName('');
          setNewCategoryName('');
          
          if (product.variants && product.variants.length > 0) {
            (window as any).__productVariantsToConvert = product.variants;
            setHasVariantsToLoad(true);
          }
          
          if (product.attributeIds && product.attributeIds.length > 0) {
            (window as any).__productAttributeIds = product.attributeIds;
            console.log('📋 [ADMIN] Product attributeIds loaded:', product.attributeIds);
          }
          
          const variants = product.variants || [];
          const hasVariants = variants.length > 0;
          const hasVariantsWithAttributes = hasVariants && 
            variants.some((variant: any) => {
              if (variant.attributes && typeof variant.attributes === 'object' && Object.keys(variant.attributes).length > 0) {
                return true;
              }
              if (variant.options && Array.isArray(variant.options) && variant.options.length > 0) {
                return true;
              }
              return false;
            });
          
          console.log('📦 [ADMIN] Product type check:', {
            hasVariants,
            variantsCount: variants.length,
            hasVariantsWithAttributes,
            firstVariant: hasVariants && variants.length > 0 ? {
              hasAttributes: !!(variants[0] && (variants[0] as any).attributes && typeof (variants[0] as any).attributes === 'object' && Object.keys((variants[0] as any).attributes).length > 0),
              hasOptions: !!((variants[0] as any).options && Array.isArray((variants[0] as any).options) && (variants[0] as any).options.length > 0),
              attributes: (variants[0] as any).attributes,
              optionsCount: ((variants[0] as any).options?.length || 0),
            } : null,
          });
          
          if (!hasVariantsWithAttributes) {
            console.log('📦 [ADMIN] Product variants have no attributes, setting productType to "simple"');
            setProductType('simple');
            
            if (hasVariants && variants.length > 0) {
              const firstVariant = variants[0] as any;
              setSimpleProductData({
                price: firstVariant.price ? String(convertPrice(typeof firstVariant.price === 'number' ? firstVariant.price : parseFloat(String(firstVariant.price || '0')), 'USD', defaultCurrency)) : '',
                compareAtPrice: firstVariant.compareAtPrice ? String(convertPrice(typeof firstVariant.compareAtPrice === 'number' ? firstVariant.compareAtPrice : parseFloat(String(firstVariant.compareAtPrice || '0')), 'USD', defaultCurrency)) : '',
                sku: firstVariant.sku || '',
                quantity: String(firstVariant.stock || 0),
              });
            } else {
              setSimpleProductData({
                price: '',
                compareAtPrice: '',
                sku: '',
                quantity: '0',
              });
            }
          } else {
            console.log('📦 [ADMIN] Product variants have attributes, keeping productType as "variable"');
            setProductType('variable');
          }
          
          console.log('✅ [ADMIN] Product loaded for edit');
        } catch (err: any) {
          console.error('❌ [ADMIN] Error loading product:', err);
          router.push('/admin/products');
        } finally {
          setLoadingProduct(false);
        }
      };
      
      loadProduct();
    }
  }, [productId, isLoggedIn, isAdmin, router, attributes, defaultCurrency, setLoadingProduct, setFormData, setUseNewBrand, setUseNewCategory, setNewBrandName, setNewCategoryName, setHasVariantsToLoad, setProductType, setSimpleProductData, t]);
}

