import { useMemo } from 'react';
import type { Product, ProductVariant, VariantOption, AttributeGroupValue } from './types';
import { getOptionValue } from './productUtils';

interface UseAttributeGroupsProps {
  product: Product | null;
  selectedColor: string | null;
  selectedSize: string | null;
  selectedAttributeValues: Map<string, string>;
}

/**
 * Build attribute groups from productAttributes (new format) or from variants (old format)
 * This useMemo ensures attribute groups are recalculated when product or selectedVariant changes
 */
export function useAttributeGroups({
  product,
  selectedColor,
  selectedSize,
  selectedAttributeValues,
}: UseAttributeGroupsProps): Map<string, AttributeGroupValue[]> {
  return useMemo(() => {
    const groups = new Map<string, AttributeGroupValue[]>();

    if (!product) {
      console.log('🔄 [ATTRIBUTE GROUPS] No product, returning empty groups');
      return groups;
    }

    console.log('🔄 [ATTRIBUTE GROUPS] Building attribute groups for product:', product.id);
    console.log('🔄 [ATTRIBUTE GROUPS] Selected color:', selectedColor);
    console.log('🔄 [ATTRIBUTE GROUPS] Selected size:', selectedSize);
    console.log('🔄 [ATTRIBUTE GROUPS] Selected attributes:', Array.from(selectedAttributeValues.entries()));

    // Helper function to check if a variant is compatible with currently selected attributes
    // This is used to filter which attribute values to show based on current selections
    // IMPORTANT: A variant can have multiple values for the same attribute (e.g., color: [red, blue, yellow])
    // So we need to check ALL options, not just the first one
    const isVariantCompatible = (
      variant: ProductVariant,
      currentSelections: Map<string, string>,
      excludeAttrKey?: string
    ): boolean => {
      // If no selections, all variants are compatible
      if (currentSelections.size === 0) return true;

      // Check each selected attribute (excluding the one we're building)
      for (const [attrKey, selectedValue] of currentSelections.entries()) {
        // Skip the attribute we're currently building
        if (excludeAttrKey && attrKey === excludeAttrKey) {
          continue;
        }

        // IMPORTANT: Check ALL options for this attribute, not just the first one
        // A variant can have multiple values for the same attribute
        const normalizedSelectedValue = selectedValue.toLowerCase().trim();
        let hasMatchingValue = false;

        // Check all options for this attribute
        const matchingOptions =
          variant.options?.filter((opt) => {
            const optKey = opt.key || opt.attribute;
            return optKey === attrKey;
          }) || [];

        if (matchingOptions.length === 0) {
          // Variant doesn't have this attribute, so it's not compatible
          return false;
        }

        // Check if any of the options match the selected value
        for (const option of matchingOptions) {
          const optValue = option.value?.toLowerCase().trim();
          const optValueId = option.valueId;

          // Match by value (case-insensitive)
          if (optValue === normalizedSelectedValue) {
            hasMatchingValue = true;
            break;
          }

          // Match by valueId
          if (optValueId && optValueId === selectedValue) {
            hasMatchingValue = true;
            break;
          }
        }

        // If no matching value found, variant is not compatible
        if (!hasMatchingValue) {
          return false;
        }
      }
      return true; // All selected attributes match
    };

    // Get currently selected attributes (excluding the attribute we're building)
    const getCurrentSelections = (excludeAttrKey: string): Map<string, string> => {
      const selections = new Map<string, string>();
      if (selectedColor && excludeAttrKey !== 'color') {
        selections.set('color', selectedColor);
      }
      if (selectedSize && excludeAttrKey !== 'size') {
        selections.set('size', selectedSize);
      }
      selectedAttributeValues.forEach((value, key) => {
        if (key !== excludeAttrKey) {
          selections.set(key, value);
        }
      });
      return selections;
    };

    if (product.productAttributes && product.productAttributes.length > 0) {
      // New format: Use productAttributes
      product.productAttributes.forEach((productAttr) => {
        const attrKey = productAttr.attribute.key;
        const valueMap = new Map<
          string,
          { valueId?: string; value: string; label: string; variants: ProductVariant[] }
        >();

        // IMPORTANT: Show ALL attribute values, regardless of other selections
        // We don't filter variants here - we show all values that exist in any variant
        // Stock will be calculated separately based on current selections

        product.variants?.forEach((variant) => {
          // Include ALL variants - don't filter by compatibility
          // This ensures all attribute values are shown
          // IMPORTANT: Use filter() instead of find() to get ALL options for this attribute
          // A variant can have multiple values for the same attribute (e.g., color: [red, blue])

          const options =
            variant.options?.filter((opt) => {
              if (opt.valueId && opt.attributeId === productAttr.attribute.id) {
                return true;
              }
              return opt.key === attrKey || opt.attribute === attrKey;
            }) || [];

          // Process ALL options for this attribute (not just the first one)
          options.forEach((option) => {
            const valueId = option.valueId || '';
            const value = option.value || '';
            // Get label from AttributeValue if available, otherwise use value
            let label = option.value || '';
            if (valueId && productAttr.attribute.values) {
              const attrValue = productAttr.attribute.values.find((v: any) => v.id === valueId);
              if (attrValue) {
                label = attrValue.label || attrValue.value || value;
              }
            }

            const mapKey = valueId || value;
            if (!valueMap.has(mapKey)) {
              valueMap.set(mapKey, {
                valueId: valueId || undefined,
                value,
                label,
                variants: [],
              });
            }
            // Add variant to this value's variants list (avoid duplicates)
            if (!valueMap.get(mapKey)!.variants.some((v) => v.id === variant.id)) {
              valueMap.get(mapKey)!.variants.push(variant);
            }
          });
        });

        // Get current selections for stock calculation (excluding this attribute)
        const currentSelections = getCurrentSelections(attrKey);

        const groupsArray = Array.from(valueMap.values()).map((item) => {
          // Find the attribute value to get imageUrl and colors
          // Try multiple matching strategies to ensure we find the correct attribute value
          let attrValue = null;
          if (item.valueId && productAttr.attribute.values) {
            // First try by valueId (most reliable)
            attrValue = productAttr.attribute.values.find((v: any) => v.id === item.valueId);
          }
          if (!attrValue && productAttr.attribute.values) {
            // Fallback: try by value (case-insensitive)
            attrValue = productAttr.attribute.values.find(
              (v: any) =>
                v.value?.toLowerCase() === item.value?.toLowerCase() || v.value === item.value
            );
          }
          if (!attrValue && productAttr.attribute.values) {
            // Last resort: try by label (case-insensitive)
            attrValue = productAttr.attribute.values.find(
              (v: any) =>
                v.label?.toLowerCase() === item.label?.toLowerCase() || v.label === item.label
            );
          }

          // Calculate stock: if other attributes are selected, show stock only for compatible variants
          // Otherwise, show total stock for all variants with this value
          let stock = 0;
          if (currentSelections.size > 0) {
            // Filter variants by compatibility and sum their stock
            const compatibleVariants = item.variants.filter((v) => {
              const compatible = isVariantCompatible(v, currentSelections, attrKey);
              console.log(
                `🔄 [STOCK] Checking variant ${v.id} for attribute "${attrKey}" value "${item.value}":`,
                {
                  compatible,
                  currentSelections: Array.from(currentSelections.entries()),
                  variantOptions: v.options,
                }
              );
              return compatible;
            });
            stock = compatibleVariants.reduce((sum, v) => sum + v.stock, 0);
            console.log(
              `🔄 [STOCK] Attribute "${attrKey}" value "${item.value}": ${compatibleVariants.length} compatible variants, stock: ${stock}`
            );
          } else {
            // No selections, show total stock
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

        console.log(
          `🔄 [ATTRIBUTE GROUPS] Built ${groupsArray.length} values for attribute "${attrKey}" from productAttributes`
        );
        groups.set(attrKey, groupsArray);
      });

      // Also extract any additional attributes from variant options that might not be in productAttributes
      // This handles cases where attributes were added to variants but not yet synced to productAttributes
      if (product?.variants) {
        const allAttributeKeys = new Set<string>();

        // Collect all attribute keys from variant options
        product.variants.forEach((variant) => {
          variant.options?.forEach((opt) => {
            const attrKey = opt.key || opt.attribute || '';
            if (attrKey && attrKey !== 'color' && attrKey !== 'size') {
              allAttributeKeys.add(attrKey);
            }
          });
        });

        // For each attribute key not already in groups, create attribute group from variants
        allAttributeKeys.forEach((attrKey) => {
          if (!groups.has(attrKey)) {
            const valueMap = new Map<
              string,
              { valueId?: string; value: string; label: string; variants: ProductVariant[] }
            >();

            // IMPORTANT: Show ALL attribute values, regardless of other selections
            // We don't filter variants here - we show all values that exist in any variant
            // Stock will be calculated separately based on current selections

            product.variants?.forEach((variant) => {
              // Include ALL variants - don't filter by compatibility
              // This ensures all attribute values are shown
              // IMPORTANT: Use filter() instead of find() to get ALL options for this attribute
              // A variant can have multiple values for the same attribute (e.g., color: [red, blue])

              const options =
                variant.options?.filter((opt) => opt.key === attrKey || opt.attribute === attrKey) ||
                [];

              // Process ALL options for this attribute (not just the first one)
              options.forEach((option) => {
                const valueId = option.valueId || '';
                const value = option.value || '';
                const label = option.value || '';

                const mapKey = valueId || value;
                if (!valueMap.has(mapKey)) {
                  valueMap.set(mapKey, {
                    valueId: valueId || undefined,
                    value,
                    label,
                    variants: [],
                  });
                }
                // Add variant to this value's variants list (avoid duplicates)
                if (!valueMap.get(mapKey)!.variants.some((v) => v.id === variant.id)) {
                  valueMap.get(mapKey)!.variants.push(variant);
                }
              });
            });

            if (valueMap.size > 0) {
              // Try to find attribute values from productAttributes to get imageUrl
              const productAttr = product.productAttributes?.find(
                (pa: any) => pa.attribute?.key === attrKey
              );

              // Get current selections for stock calculation (excluding this attribute)
              const currentSelections = getCurrentSelections(attrKey);

              const groupsArray = Array.from(valueMap.values()).map((item) => {
                // Try to find attribute value to get imageUrl and colors
                let attrValue = null;
                if (productAttr?.attribute?.values) {
                  if (item.valueId) {
                    attrValue = productAttr.attribute.values.find((v: any) => v.id === item.valueId);
                  }
                  if (!attrValue) {
                    attrValue = productAttr.attribute.values.find(
                      (v: any) =>
                        v.value?.toLowerCase() === item.value?.toLowerCase() ||
                        v.value === item.value
                    );
                  }
                  if (!attrValue) {
                    attrValue = productAttr.attribute.values.find(
                      (v: any) =>
                        v.label?.toLowerCase() === item.label?.toLowerCase() ||
                        v.label === item.label
                    );
                  }
                }

                // Calculate stock: if other attributes are selected, show stock only for compatible variants
                // Otherwise, show total stock for all variants with this value
                let stock = 0;
                if (currentSelections.size > 0) {
                  // Filter variants by compatibility and sum their stock
                  const compatibleVariants = item.variants.filter((v) =>
                    isVariantCompatible(v, currentSelections, attrKey)
                  );
                  stock = compatibleVariants.reduce((sum, v) => sum + v.stock, 0);
                } else {
                  // No selections, show total stock
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

              console.log(
                `🔄 [ATTRIBUTE GROUPS] Built ${groupsArray.length} values for additional attribute "${attrKey}" from variants`
              );
              groups.set(attrKey, groupsArray);
            }
          }
        });
      }
    } else {
      // Old format: Extract from variants
      if (product?.variants) {
        const colorMap = new Map<string, ProductVariant[]>();
        const sizeMap = new Map<string, ProductVariant[]>();
        const otherAttributesMap = new Map<string, Map<string, ProductVariant[]>>();

        // IMPORTANT: Show ALL attribute values, regardless of other selections
        // We don't filter variants here - we show all values that exist in any variant
        // Stock will be calculated separately based on current selections

        product.variants.forEach((variant) => {
          // For old format, show all variants (no filtering by compatibility)
          // This ensures all attribute values are shown
          // IMPORTANT: Process ALL options for each attribute, not just the first one
          // A variant can have multiple values for the same attribute (e.g., color: [red, blue])

          // Extract ALL color values (not just the first one)
          variant.options?.forEach((opt) => {
            const attrKey = opt.key || opt.attribute || '';
            const value = opt.value || '';

            if (!value) return;

            if (attrKey === 'color') {
              const normalizedColor = value.toLowerCase().trim();
              if (!colorMap.has(normalizedColor)) {
                colorMap.set(normalizedColor, []);
              }
              // Add variant to this color's variants list (avoid duplicates)
              if (!colorMap.get(normalizedColor)!.some((v) => v.id === variant.id)) {
                colorMap.get(normalizedColor)!.push(variant);
              }
            } else if (attrKey === 'size') {
              const normalizedSize = value.toLowerCase().trim();
              if (!sizeMap.has(normalizedSize)) {
                sizeMap.set(normalizedSize, []);
              }
              // Add variant to this size's variants list (avoid duplicates)
              if (!sizeMap.get(normalizedSize)!.some((v) => v.id === variant.id)) {
                sizeMap.get(normalizedSize)!.push(variant);
              }
            } else if (attrKey) {
              // Extract other attributes
              if (!otherAttributesMap.has(attrKey)) {
                otherAttributesMap.set(attrKey, new Map());
              }
              const valueMap = otherAttributesMap.get(attrKey)!;
              const normalizedValue = value.toLowerCase().trim();
              if (!valueMap.has(normalizedValue)) {
                valueMap.set(normalizedValue, []);
              }
              // Add variant to this value's variants list (avoid duplicates)
              if (!valueMap.get(normalizedValue)!.some((v) => v.id === variant.id)) {
                valueMap.get(normalizedValue)!.push(variant);
              }
            }
          });
        });

        // Get current selections for stock calculation
        const colorSelections = getCurrentSelections('color');
        const sizeSelections = getCurrentSelections('size');

        if (colorMap.size > 0) {
          groups.set(
            'color',
            Array.from(colorMap.entries()).map(([value, variants]) => {
              // Calculate stock: if other attributes are selected, show stock only for compatible variants
              let stock = 0;
              if (colorSelections.size > 0) {
                const compatibleVariants = variants.filter((v) =>
                  isVariantCompatible(v, colorSelections, 'color')
                );
                stock = compatibleVariants.reduce((sum, v) => sum + v.stock, 0);
              } else {
                stock = variants.reduce((sum, v) => sum + v.stock, 0);
              }

              return {
                value,
                label: value,
                stock: stock,
                variants,
              };
            })
          );
        }

        if (sizeMap.size > 0) {
          groups.set(
            'size',
            Array.from(sizeMap.entries()).map(([value, variants]) => {
              // Calculate stock: if other attributes are selected, show stock only for compatible variants
              let stock = 0;
              if (sizeSelections.size > 0) {
                const compatibleVariants = variants.filter((v) =>
                  isVariantCompatible(v, sizeSelections, 'size')
                );
                stock = compatibleVariants.reduce((sum, v) => sum + v.stock, 0);
              } else {
                stock = variants.reduce((sum, v) => sum + v.stock, 0);
              }

              return {
                value,
                label: value,
                stock: stock,
                variants,
              };
            })
          );
        }

        // Add other attributes
        otherAttributesMap.forEach((valueMap, attrKey) => {
          const attrSelections = getCurrentSelections(attrKey);

          groups.set(
            attrKey,
            Array.from(valueMap.entries()).map(([value, variants]) => {
              // Calculate stock: if other attributes are selected, show stock only for compatible variants
              let stock = 0;
              if (attrSelections.size > 0) {
                const compatibleVariants = variants.filter((v) =>
                  isVariantCompatible(v, attrSelections, attrKey)
                );
                stock = compatibleVariants.reduce((sum, v) => sum + v.stock, 0);
              } else {
                stock = variants.reduce((sum, v) => sum + v.stock, 0);
              }

              return {
                value,
                label: value,
                stock: stock,
                variants,
                imageUrl: null,
                colors: null,
              };
            })
          );
        });
      }
    }

    console.log(
      '🔄 [ATTRIBUTE GROUPS] Final groups:',
      Array.from(groups.keys()),
      'total attributes:',
      groups.size
    );
    groups.forEach((values, key) => {
      console.log(
        `🔄 [ATTRIBUTE GROUPS] "${key}": ${values.length} values`,
        values.map((v) => v.value)
      );
    });

    return groups;
  }, [product, selectedColor, selectedSize, selectedAttributeValues]);
}



