'use client';

import { processImageUrl } from '../../../lib/utils/image-utils';
import { t, getAttributeLabel } from '../../../lib/i18n';
import type { LanguageCode } from '../../../lib/language';
import type { Product, ProductVariant } from './types';

interface AttributeGroupValue {
  valueId?: string;
  value: string;
  label: string;
  stock: number;
  variants: ProductVariant[];
  imageUrl?: string | null;
  colors?: string[] | null;
}

interface ProductAttributesSelectorProps {
  product: Product;
  attributeGroups: Map<string, AttributeGroupValue[]>;
  selectedColor: string | null;
  selectedSize: string | null;
  selectedAttributeValues: Map<string, string>;
  unavailableAttributes: Map<string, boolean>;
  colorGroups: Array<{ color: string; stock: number; variants: ProductVariant[] }>;
  sizeGroups: Array<{ size: string; stock: number; variants: ProductVariant[] }>;
  language: LanguageCode;
  quantity: number;
  maxQuantity: number;
  isOutOfStock: boolean;
  isVariationRequired: boolean;
  hasUnavailableAttributes: boolean;
  canAddToCart: boolean;
  isAddingToCart: boolean;
  showMessage: string | null;
  onColorSelect: (color: string) => void;
  onSizeSelect: (size: string) => void;
  onAttributeValueSelect: (attrKey: string, value: string) => void;
  onQuantityAdjust: (delta: number) => void;
  onAddToCart: () => Promise<void>;
  getOptionValue: (options: any[] | undefined, key: string) => string | null;
  getRequiredAttributesMessage: () => string;
}

// Helper function to get color hex/rgb from color name
const getColorValue = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    'beige': '#F5F5DC', 'black': '#000000', 'blue': '#0000FF', 'brown': '#A52A2A',
    'gray': '#808080', 'grey': '#808080', 'green': '#008000', 'red': '#FF0000',
    'white': '#FFFFFF', 'yellow': '#FFFF00', 'orange': '#FFA500', 'pink': '#FFC0CB',
    'purple': '#800080', 'navy': '#000080', 'maroon': '#800000', 'olive': '#808000',
    'teal': '#008080', 'cyan': '#00FFFF', 'magenta': '#FF00FF', 'lime': '#00FF00',
    'silver': '#C0C0C0', 'gold': '#FFD700',
  };
  const normalizedName = colorName.toLowerCase().trim();
  return colorMap[normalizedName] || '#CCCCCC';
};

export function ProductAttributesSelector({
  product,
  attributeGroups,
  selectedColor,
  selectedSize,
  selectedAttributeValues,
  unavailableAttributes,
  colorGroups,
  sizeGroups,
  language,
  onColorSelect,
  onSizeSelect,
  onAttributeValueSelect,
  getOptionValue,
}: ProductAttributesSelectorProps) {
  const attributeGroupsEntries = Array.from(attributeGroups.entries());
  console.log('🎨 [PRODUCT ATTRIBUTES SELECTOR] attributeGroups entries:', attributeGroupsEntries.length);
  console.log('🎨 [PRODUCT ATTRIBUTES SELECTOR] attributeGroups keys:', Array.from(attributeGroups.keys()));
  console.log('🎨 [PRODUCT ATTRIBUTES SELECTOR] product.productAttributes:', product?.productAttributes);
  
  return (
    <div className="mt-8 p-4 bg-white border border-gray-200 rounded-2xl space-y-4">
      {/* Attribute Selectors - Support both new (productAttributes) and old (colorGroups) format */}
      {/* Display all attributes from attributeGroups, not just from productAttributes */}
      {attributeGroupsEntries.length > 0 ? (
        // Use attributeGroups which contains all attributes (from productAttributes and variants)
        Array.from(attributeGroups.entries()).map(([attrKey, attrGroups]) => {
          // Try to get attribute name from productAttributes if available
          const productAttr = product?.productAttributes?.find((pa: any) => pa.attribute?.key === attrKey);
          const attributeName = productAttr?.attribute?.name || attrKey.charAt(0).toUpperCase() + attrKey.slice(1);
          const isColor = attrKey === 'color';
          const isSize = attrKey === 'size';

          if (attrGroups.length === 0) return null;

          // Check if this attribute is unavailable for the selected variant
          const isUnavailable = unavailableAttributes.get(attrKey) || false;
          
          return (
            <div key={attrKey} className="space-y-1.5">
              <label className={`text-xs font-bold uppercase ${isUnavailable ? 'text-red-600' : ''}`}>
                {attrKey === 'color' ? t(language, 'product.color') : 
                 attrKey === 'size' ? t(language, 'product.size') : 
                 attributeName}:
              </label>
              {isColor ? (
                <div className="flex flex-wrap gap-1.5 items-center">
                  {attrGroups.map((g) => {
                    const isSelected = selectedColor === g.value?.toLowerCase().trim();
                    // IMPORTANT: Don't disable based on stock - show all colors, even if stock is 0
                    // Stock is just informational, not a reason to hide the option
                    const isDisabled = false; // Always show all colors
                    // Process imageUrl to ensure it's in the correct format
                    const processedImageUrl = g.imageUrl ? processImageUrl(g.imageUrl) : null;
                    const hasImage = processedImageUrl && processedImageUrl.trim() !== '';
                    const colorHex = g.colors && Array.isArray(g.colors) && g.colors.length > 0 
                      ? g.colors[0] 
                      : getColorValue(g.value);
                    
                    // Dynamic sizing based on number of values
                    // Keep size consistent for 2 values, reduce for more
                    const totalValues = attrGroups.length;
                    const sizeClass = totalValues > 6 
                      ? 'w-8 h-8' 
                      : totalValues > 3 
                      ? 'w-9 h-9' 
                      : 'w-10 h-10';
                    
                    return (
                      <div key={g.valueId || g.value} className="flex flex-col items-center gap-0.5">
                        <button 
                          onClick={() => onColorSelect(g.value)}
                          className={`${sizeClass} rounded-full transition-all overflow-hidden ${
                            isSelected 
                              ? 'border-[3px] border-green-500 scale-110' 
                              : g.stock <= 0
                                ? 'border-2 border-gray-200 opacity-60 hover:opacity-80' 
                                : 'border-2 border-gray-300 hover:scale-105'
                          }`}
                          style={hasImage ? {} : { backgroundColor: colorHex }}
                          title={`${getAttributeLabel(language, attrKey, g.value)}${g.stock > 0 ? ` (${g.stock} ${t(language, 'product.pcs')})` : ` (${t(language, 'product.outOfStock')})`}`} 
                        >
                          {hasImage && processedImageUrl ? (
                            <img 
                              src={processedImageUrl} 
                              alt={g.label}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                console.error(`❌ [COLOR IMAGE] Failed to load image for color "${g.value}":`, processedImageUrl);
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                              onLoad={() => {
                                console.log(`✅ [COLOR IMAGE] Successfully loaded image for color "${g.value}":`, processedImageUrl);
                              }}
                            />
                          ) : null}
                        </button>
                        {g.stock > 0 && (
                          <span className={`${totalValues > 8 ? 'text-[10px]' : 'text-xs'} text-gray-500`}>{g.stock}</span>
                        )}
                        {g.stock <= 0 && (
                          <span className={`${totalValues > 8 ? 'text-[10px]' : 'text-xs'} text-gray-400`}>0</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : isSize ? (
                <div className="flex flex-wrap gap-1.5">
                  {attrGroups.map((g) => {
                    // Use stock from groups (already calculated with compatibility)
                    const displayStock = g.stock;
                    const isSelected = selectedSize === g.value.toLowerCase().trim();
                    // IMPORTANT: Don't disable based on stock - show all sizes, even if stock is 0
                    // Stock is just informational, not a reason to hide the option
                    const isDisabled = false; // Always show all sizes
                    
                    // Process imageUrl to ensure it's in the correct format
                    const processedImageUrl = g.imageUrl ? processImageUrl(g.imageUrl) : null;
                    const hasImage = processedImageUrl && processedImageUrl.trim() !== '';
                    
                    // Dynamic sizing based on number of values
                    // Keep size consistent for 2 values, reduce for more
                    const totalValues = attrGroups.length;
                    const paddingClass = totalValues > 6 
                      ? 'px-2 py-1' 
                      : totalValues > 3 
                      ? 'px-2.5 py-1.5' 
                      : 'px-3 py-2';
                    const textSizeClass = totalValues > 6 
                      ? 'text-xs' 
                      : 'text-sm';
                    const imageSizeClass = totalValues > 6 
                      ? 'w-4 h-4' 
                      : 'w-5 h-5';
                    const minWidthClass = totalValues > 6 
                      ? 'min-w-[40px]' 
                      : 'min-w-[50px]';

                    return (
                      <button 
                        key={g.valueId || g.value}
                        onClick={() => onSizeSelect(g.value)}
                        className={`${minWidthClass} ${paddingClass} rounded-lg border-2 transition-all flex items-center gap-1.5 ${
                          isSelected 
                            ? 'border-green-500 bg-gray-50' 
                            : displayStock <= 0
                              ? 'border-gray-200 opacity-60 hover:opacity-80' 
                              : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {hasImage && processedImageUrl && (
                          <img 
                            src={processedImageUrl} 
                            alt={g.label}
                            className={`${imageSizeClass} object-cover rounded border border-gray-300 flex-shrink-0`}
                            onError={(e) => {
                              console.error(`❌ [SIZE IMAGE] Failed to load image for size "${g.value}":`, processedImageUrl);
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                            onLoad={() => {
                              console.log(`✅ [SIZE IMAGE] Successfully loaded image for size "${g.value}":`, processedImageUrl);
                            }}
                          />
                        )}
                        <div className="flex flex-col text-center">
                          <span className={`${textSizeClass} font-medium`}>{getAttributeLabel(language, attrKey, g.value)}</span>
                          <span className={`${totalValues > 10 ? 'text-[10px]' : 'text-xs'} ${displayStock > 0 ? 'text-gray-500' : 'text-gray-400'}`}>({displayStock})</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                // Generic attribute selector
                <div className="flex flex-wrap gap-1.5">
                  {attrGroups.map((g) => {
                    const selectedValueId = selectedAttributeValues.get(attrKey);
                    const isSelected = selectedValueId === g.valueId || (!g.valueId && selectedColor === g.value);
                    // IMPORTANT: Don't disable based on stock - show all attribute values, even if stock is 0
                    // Stock is just informational, not a reason to hide the option
                    const isDisabled = false; // Always show all attribute values
                    
                    // Process imageUrl to ensure it's in the correct format
                    const processedImageUrl = g.imageUrl ? processImageUrl(g.imageUrl) : null;
                    const hasImage = processedImageUrl && processedImageUrl.trim() !== '';
                    const hasColors = g.colors && Array.isArray(g.colors) && g.colors.length > 0;
                    const colorHex = hasColors && g.colors 
                      ? g.colors[0] 
                      : null;
                    
                    // Debug logging for image issues
                    if (g.imageUrl && !hasImage) {
                      console.warn(`⚠️ [ATTRIBUTE IMAGE] Failed to process imageUrl for attribute "${attrKey}" value "${g.value}":`, g.imageUrl);
                    }
                    
                    // Dynamic sizing based on number of values
                    // Keep size consistent for 2 values, reduce for more
                    const totalValues = attrGroups.length;
                    const paddingClass = totalValues > 6 
                      ? 'px-2 py-1' 
                      : totalValues > 3 
                      ? 'px-3 py-1.5' 
                      : 'px-4 py-2';
                    const textSizeClass = totalValues > 6 
                      ? 'text-xs' 
                      : 'text-sm';
                    const imageSizeClass = totalValues > 6 
                      ? 'w-4 h-4' 
                      : totalValues > 3 
                      ? 'w-5 h-5' 
                      : 'w-6 h-6';
                    const gapClass = totalValues > 6 
                      ? 'gap-1' 
                      : 'gap-2';

                    return (
                      <button
                        key={g.valueId || g.value}
                        onClick={() => {
                          if (!isDisabled) {
                            onAttributeValueSelect(attrKey, g.valueId || g.value);
                          }
                        }}
                        className={`${paddingClass} rounded-lg border-2 transition-all flex items-center ${gapClass} ${
                          isSelected
                            ? 'border-green-500 bg-gray-50'
                            : g.stock <= 0
                              ? 'border-gray-200 opacity-60 hover:opacity-80'
                              : 'border-gray-200 hover:border-gray-400'
                        }`}
                        style={!hasImage && colorHex ? { backgroundColor: colorHex } : {}}
                      >
                        {hasImage && processedImageUrl ? (
                          <img 
                            src={processedImageUrl} 
                            alt={g.label}
                            className={`${imageSizeClass} object-cover rounded border border-gray-300 flex-shrink-0`}
                            onError={(e) => {
                              console.error(`❌ [ATTRIBUTE IMAGE] Failed to load image for attribute "${attrKey}" value "${g.value}":`, processedImageUrl);
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                            onLoad={() => {
                              console.log(`✅ [ATTRIBUTE IMAGE] Successfully loaded image for attribute "${attrKey}" value "${g.value}":`, processedImageUrl);
                            }}
                          />
                        ) : hasColors && colorHex ? (
                          <div 
                            className={`${imageSizeClass} rounded border border-gray-300 flex-shrink-0`}
                            style={{ backgroundColor: colorHex }}
                          />
                        ) : null}
                        <div className="flex flex-col text-center">
                          <span className={textSizeClass}>{getAttributeLabel(language, attrKey, g.value)}</span>
                          <span className={`${totalValues > 10 ? 'text-[10px]' : 'text-xs'} ${g.stock > 0 ? 'text-gray-500' : 'text-gray-400'}`}>({g.stock})</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      ) : (
        // Old format: Use colorGroups and sizeGroups
        <>
          {colorGroups.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">{t(language, 'product.color')}:</label>
              <div className="flex flex-wrap gap-2 items-center">
                {colorGroups.map((g) => {
                  const isSelected = selectedColor === g.color?.toLowerCase().trim();
                  const isDisabled = g.stock <= 0;
                  
                  return (
                    <div key={g.color} className="flex flex-col items-center gap-1">
                      <button 
                        onClick={() => !isDisabled && onColorSelect(g.color)}
                        disabled={isDisabled}
                        className={`w-10 h-10 rounded-full transition-all ${
                          isSelected 
                            ? 'border-[3px] border-green-500 scale-110' 
                            : isDisabled 
                              ? 'border-2 border-gray-100 opacity-30 grayscale cursor-not-allowed' 
                              : 'border-2 border-gray-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: getColorValue(g.color) }} 
                        title={isDisabled ? `${getAttributeLabel(language, 'color', g.color)} (${t(language, 'product.outOfStock')})` : `${getAttributeLabel(language, 'color', g.color)}${g.stock > 0 ? ` (${g.stock} ${t(language, 'product.pcs')})` : ''}`} 
                      />
                      {g.stock > 0 && (
                        <span className="text-xs text-gray-500">{g.stock}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Size Groups - Show only if not using new format */}
      {!product?.productAttributes && sizeGroups.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase">{t(language, 'product.size')}</label>
          <div className="flex flex-wrap gap-2">
            {sizeGroups.map((g) => {
              let displayStock = g.stock;
              if (selectedColor) {
                const v = g.variants.find(v => {
                  const colorOpt = getOptionValue(v.options, 'color');
                  return colorOpt === selectedColor.toLowerCase().trim();
                });
                displayStock = v ? v.stock : 0;
              }
              const isSelected = selectedSize === g.size;
              const isDisabled = displayStock <= 0;

              return (
                <button 
                  key={g.size} 
                  onClick={() => !isDisabled && onSizeSelect(g.size)}
                  disabled={isDisabled}
                  className={`min-w-[50px] px-3 py-2 rounded-lg border-2 transition-all ${
                    isSelected 
                      ? 'border-green-500 bg-gray-50' 
                      : isDisabled 
                        ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed' 
                        : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex flex-col text-center">
                    <span className={`text-sm font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-900'}`}>{getAttributeLabel(language, 'size', g.size)}</span>
                    {displayStock > 0 && (
                      <span className={`text-xs ${isDisabled ? 'text-gray-300' : 'text-gray-500'}`}>{displayStock} {t(language, 'product.pcs')}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}



