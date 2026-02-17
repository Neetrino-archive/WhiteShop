import { useState, useEffect, useMemo } from 'react';
import type { Product, ProductVariant } from './types';
import type { AttributeGroupValue } from './types';
import type { LanguageCode } from '../../../lib/language';
import { t } from '../../../lib/i18n';

interface UseProductStockProps {
  currentVariant: ProductVariant | null;
  product: Product | null;
  attributeGroups: Map<string, AttributeGroupValue[]>;
  colorGroups: Array<{ color: string; stock: number; variants: ProductVariant[] }>;
  sizeGroups: Array<{ size: string; stock: number; variants: ProductVariant[] }>;
  selectedColor: string | null;
  selectedSize: string | null;
  language: LanguageCode;
}

interface UseProductStockReturn {
  quantity: number;
  setQuantity: (quantity: number | ((prev: number) => number)) => void;
  maxQuantity: number;
  isOutOfStock: boolean;
  unavailableAttributes: Map<string, boolean>;
  hasUnavailableAttributes: boolean;
  canAddToCart: boolean;
  adjustQuantity: (delta: number) => void;
  getRequiredAttributesMessage: () => string;
  isVariationRequired: boolean;
}

/**
 * Hook for managing product stock, quantity, and cart availability
 */
export function useProductStock({
  currentVariant,
  product,
  attributeGroups,
  colorGroups,
  sizeGroups,
  selectedColor,
  selectedSize,
  language,
}: UseProductStockProps): UseProductStockReturn {
  const [quantity, setQuantity] = useState(1);

  // Calculate max quantity based on current variant stock
  const maxQuantity = useMemo(() => {
    return currentVariant?.stock && currentVariant.stock > 0 ? currentVariant.stock : 0;
  }, [currentVariant?.stock]);

  // Check if current variant is out of stock
  const isOutOfStock = useMemo(() => {
    return !currentVariant || currentVariant.stock <= 0;
  }, [currentVariant]);

  // Check which attributes are available and required
  const hasColorAttribute = useMemo(() => {
    return colorGroups.length > 0 && colorGroups.some((g) => g.stock > 0);
  }, [colorGroups]);

  const hasSizeAttribute = useMemo(() => {
    return sizeGroups.length > 0 && sizeGroups.some((g) => g.stock > 0);
  }, [sizeGroups]);

  const needsColor = hasColorAttribute && !selectedColor;
  const needsSize = hasSizeAttribute && !selectedSize;
  const isVariationRequired = needsColor || needsSize;

  // Generate user-friendly message for required attributes
  const getRequiredAttributesMessage = (): string => {
    if (needsColor && needsSize) {
      return t(language, 'product.selectColorAndSize');
    } else if (needsColor) {
      return t(language, 'product.selectColor');
    } else if (needsSize) {
      return t(language, 'product.selectSize');
    }
    return t(language, 'product.selectOptions');
  };

  // Check if selected variant's attribute values have stock
  // Returns a map of attribute keys to whether they're unavailable (stock = 0)
  const unavailableAttributes = useMemo(() => {
    const unavailable = new Map<string, boolean>();

    if (!currentVariant || !product) return unavailable;

    // Check each attribute in the selected variant
    currentVariant.options?.forEach((option) => {
      const attrKey = option.key || option.attribute;
      if (!attrKey) return;

      // Get the attribute group for this attribute
      const attrGroup = attributeGroups.get(attrKey);
      if (!attrGroup) return;

      // Find the attribute value in the group that matches the variant's option
      const attrValue = attrGroup.find((g) => {
        if (option.valueId && g.valueId) {
          return g.valueId === option.valueId;
        }
        return g.value?.toLowerCase().trim() === option.value?.toLowerCase().trim();
      });

      // If attribute value found and has no stock, mark as unavailable
      if (attrValue && attrValue.stock <= 0) {
        unavailable.set(attrKey, true);
      }
    });

    return unavailable;
  }, [currentVariant, attributeGroups, product]);

  // Check if any attribute is unavailable
  const hasUnavailableAttributes = useMemo(() => {
    return unavailableAttributes.size > 0;
  }, [unavailableAttributes]);

  // Check if product can be added to cart
  const canAddToCart = useMemo(() => {
    return !isOutOfStock && !isVariationRequired && !hasUnavailableAttributes;
  }, [isOutOfStock, isVariationRequired, hasUnavailableAttributes]);

  // Update quantity when variant changes
  useEffect(() => {
    if (!currentVariant || currentVariant.stock <= 0) {
      setQuantity(0);
      return;
    }
    setQuantity((prev) => {
      const currentStock = currentVariant.stock;
      if (prev > currentStock) return currentStock;
      if (prev <= 0 && currentStock > 0) return 1;
      return prev;
    });
  }, [currentVariant?.id, currentVariant?.stock]);

  // Adjust quantity with validation
  const adjustQuantity = (delta: number) => {
    if (isOutOfStock || isVariationRequired) return;
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return currentVariant && currentVariant.stock > 0 ? 1 : 0;
      return next > maxQuantity ? maxQuantity : next;
    });
  };

  return {
    quantity,
    setQuantity,
    maxQuantity,
    isOutOfStock,
    unavailableAttributes,
    hasUnavailableAttributes,
    canAddToCart,
    adjustQuantity,
    getRequiredAttributesMessage,
    isVariationRequired,
  };
}

