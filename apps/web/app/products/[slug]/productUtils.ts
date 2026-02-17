import { useCallback } from 'react';
import type { ProductVariant, VariantOption, Product } from './types';
import {
  processImageUrl,
  smartSplitUrls,
} from '../../../lib/utils/image-utils';

/**
 * Helper function to get color hex/rgb from color name
 */
export const getColorValue = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    'beige': '#F5F5DC',
    'black': '#000000',
    'blue': '#0000FF',
    'brown': '#A52A2A',
    'gray': '#808080',
    'grey': '#808080',
    'green': '#008000',
    'red': '#FF0000',
    'white': '#FFFFFF',
    'yellow': '#FFFF00',
    'orange': '#FFA500',
    'pink': '#FFC0CB',
    'purple': '#800080',
    'navy': '#000080',
    'maroon': '#800000',
    'olive': '#808000',
    'teal': '#008080',
    'cyan': '#00FFFF',
    'magenta': '#FF00FF',
    'lime': '#00FF00',
    'silver': '#C0C0C0',
    'gold': '#FFD700',
  };
  const normalizedName = colorName.toLowerCase().trim();
  return colorMap[normalizedName] || '#CCCCCC';
};

/**
 * Helper function to get option value (supports both new and old format)
 */
export const getOptionValue = (
  options: VariantOption[] | undefined,
  key: string
): string | null => {
  if (!options) return null;
  const opt = options.find((o) => o.key === key || o.attribute === key);
  return opt?.value?.toLowerCase().trim() || null;
};

/**
 * Helper function to check if variant has a specific color value (checks ALL color options)
 * A variant can have multiple color values (e.g., color: ["red", "blue"])
 */
export const variantHasColor = (
  variant: ProductVariant,
  color: string
): boolean => {
  if (!variant.options || !color) return false;
  const normalizedColor = color.toLowerCase().trim();

  // Check ALL options for color attribute
  const colorOptions = variant.options.filter(
    (opt) => opt.key === 'color' || opt.attribute === 'color'
  );

  // Check if any color option matches
  return colorOptions.some((opt) => {
    const optValue = opt.value?.toLowerCase().trim();
    return optValue === normalizedColor;
  });
};

/**
 * Find variant by color and size
 */
export const findVariantByColorAndSize = (
  product: Product | null,
  color: string | null,
  size: string | null,
  variantHasColorFn: (variant: ProductVariant, color: string) => boolean,
  getOptionValueFn: (options: VariantOption[] | undefined, key: string) => string | null
): ProductVariant | null => {
  if (!product?.variants || product.variants.length === 0) return null;

  const normalizedColor = color?.toLowerCase().trim();
  const normalizedSize = size?.toLowerCase().trim();

  // 1. Try exact match (Case-insensitive)
  // IMPORTANT: Use variantHasColor to check ALL color options, not just the first one
  if (normalizedColor && normalizedSize) {
    const variant = product.variants.find((v) => {
      const hasColor = variantHasColorFn(v, normalizedColor);
      const vSize = getOptionValueFn(v.options, 'size');
      return hasColor && vSize === normalizedSize;
    });
    if (variant) return variant;
  }

  // 2. If color selected but no exact match with size, find any variant of this color
  if (normalizedColor) {
    // Prefer in-stock variant of this color
    // IMPORTANT: Use variantHasColor to check ALL color options
    const colorVariants = product.variants.filter((v) =>
      variantHasColorFn(v, normalizedColor)
    );

    if (colorVariants.length > 0) {
      return colorVariants.find((v) => v.stock > 0) || colorVariants[0];
    }
  }

  // 3. If only size selected or fallback for size
  if (normalizedSize) {
    const sizeVariants = product.variants.filter((v) => {
      const vSize = getOptionValueFn(v.options, 'size');
      return vSize === normalizedSize;
    });

    if (sizeVariants.length > 0) {
      return sizeVariants.find((v) => v.stock > 0) || sizeVariants[0];
    }
  }

  // 4. Ultimate fallback
  return product.variants.find((v) => v.stock > 0) || product.variants[0] || null;
};

/**
 * Find variant by all selected attributes (color, size, and other attributes)
 * This function considers all selected attribute values to find the best matching variant
 */
export const findVariantByAllAttributes = (
  product: Product | null,
  color: string | null,
  size: string | null,
  otherAttributes: Map<string, string>,
  variantHasColorFn: (variant: ProductVariant, color: string) => boolean,
  getOptionValueFn: (options: VariantOption[] | undefined, key: string) => string | null,
  findVariantByColorAndSizeFn: (
    product: Product | null,
    color: string | null,
    size: string | null,
    variantHasColorFn: (variant: ProductVariant, color: string) => boolean,
    getOptionValueFn: (options: VariantOption[] | undefined, key: string) => string | null
  ) => ProductVariant | null
): ProductVariant | null => {
  if (!product?.variants || product.variants.length === 0) return null;

  const normalizedColor = color?.toLowerCase().trim();
  const normalizedSize = size?.toLowerCase().trim();

  // Build a map of all selected attributes (including color and size)
  const allSelectedAttributes = new Map<string, string>();
  if (normalizedColor) allSelectedAttributes.set('color', normalizedColor);
  if (normalizedSize) allSelectedAttributes.set('size', normalizedSize);
  otherAttributes.forEach((value, key) => {
    if (key !== 'color' && key !== 'size') {
      allSelectedAttributes.set(key, value.toLowerCase().trim());
    }
  });

  // Helper to check if a variant matches all selected attributes
  const variantMatches = (variant: ProductVariant): boolean => {
    // Check color - IMPORTANT: Use variantHasColor to check ALL color options
    if (normalizedColor) {
      if (!variantHasColorFn(variant, normalizedColor)) return false;
    }

    // Check size
    if (normalizedSize) {
      const vSize = getOptionValueFn(variant.options, 'size');
      if (vSize !== normalizedSize) return false;
    }

    // Check other attributes
    for (const [attrKey, attrValue] of otherAttributes.entries()) {
      if (attrKey === 'color' || attrKey === 'size') continue;

      const variantValue = getOptionValueFn(variant.options, attrKey);
      const normalizedAttrValue = attrValue.toLowerCase().trim();

      // Try matching by valueId first (if available)
      const option = variant.options?.find(
        (opt) => opt.key === attrKey || opt.attribute === attrKey
      );

      if (option) {
        // Check by valueId if both have it
        if (option.valueId && attrValue) {
          // If the selected value is an ID, match by ID
          if (option.valueId === attrValue) {
            continue;
          }
        }

        // Fallback to value matching
        if (variantValue !== normalizedAttrValue) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  };

  // 1. Try to find exact match with all attributes
  const exactMatch = product.variants.find(
    (v) => variantMatches(v) && v.imageUrl
  );
  if (exactMatch) {
    return exactMatch;
  }

  // 2. Try to find any match (even without image) with all attributes
  const anyMatch = product.variants.find((v) => variantMatches(v));
  if (anyMatch) {
    return anyMatch;
  }

  // 3. Fallback: find by color and size only
  if (normalizedColor || normalizedSize) {
    return findVariantByColorAndSizeFn(
      product,
      normalizedColor || null,
      normalizedSize || null,
      variantHasColorFn,
      getOptionValueFn
    );
  }

  // 4. Ultimate fallback
  return product.variants.find((v) => v.stock > 0) || product.variants[0] || null;
};

/**
 * Switch to variant's image if it exists
 * This function finds the variant's image in the images array and switches to it
 * Note: If variant image matches an attribute value image, it won't be in the gallery,
 * so we won't switch to it (attribute value images are excluded from gallery)
 */
export const switchToVariantImage = (
  variant: ProductVariant | null,
  product: Product | null,
  images: string[],
  setCurrentImageIndex: (index: number) => void,
  variantHasColorFn: (variant: ProductVariant, color: string) => boolean,
  getOptionValueFn: (options: VariantOption[] | undefined, key: string) => string | null
): void => {
  if (!variant || !variant.imageUrl || !product) {
    return;
  }

  const splitUrls = smartSplitUrls(variant.imageUrl);
  if (splitUrls.length === 0) {
    return;
  }

  // Helper function to normalize URLs for comparison
  const normalizeUrl = (url: string): string => {
    let normalized = url.trim();
    // Remove leading/trailing slashes for comparison
    if (normalized.startsWith('/')) normalized = normalized.substring(1);
    if (normalized.endsWith('/'))
      normalized = normalized.substring(0, normalized.length - 1);
    return normalized.toLowerCase();
  };

  // Check if variant image is an attribute value image (these are excluded from gallery)
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
              if (normalizedAttr === normalizedVariant) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  };

  // Try to find the first variant image in the images array
  for (const url of splitUrls) {
    if (!url || url.trim() === '') continue;

    const processedUrl = processImageUrl(url);
    if (!processedUrl) {
      console.log(
        `⚠️ [VARIANT IMAGE] Failed to process URL: ${url.substring(0, 50)}...`
      );
      continue;
    }

    // If this variant image is an attribute value image, skip it
    // (attribute value images are not in the gallery, so we can't switch to them)
    if (isAttributeValueImage(processedUrl)) {
      console.log(
        `⏭️ [VARIANT IMAGE] Skipping attribute value image: ${processedUrl.substring(0, 50)}...`
      );
      continue;
    }

    // Try multiple matching strategies with better normalization
    const imageIndex = images.findIndex((img) => {
      if (!img) return false;

      // Process both URLs for consistent comparison
      const processedImg = processImageUrl(img);
      if (!processedImg) return false;

      const normalizedImg = normalizeUrl(processedImg);
      const normalizedProcessed = normalizeUrl(processedUrl);

      // Exact match after normalization
      if (normalizedImg === normalizedProcessed) {
        console.log(
          `✅ [VARIANT IMAGE] Found exact match: ${processedUrl.substring(0, 50)}...`
        );
        return true;
      }

      // Match with/without leading slash (handle both processed URLs)
      const imgWithSlash = processedImg.startsWith('/')
        ? processedImg
        : `/${processedImg}`;
      const imgWithoutSlash = processedImg.startsWith('/')
        ? processedImg.substring(1)
        : processedImg;
      const processedWithSlash = processedUrl.startsWith('/')
        ? processedUrl
        : `/${processedUrl}`;
      const processedWithoutSlash = processedUrl.startsWith('/')
        ? processedUrl.substring(1)
        : processedUrl;

      if (
        imgWithSlash === processedWithSlash ||
        imgWithoutSlash === processedWithoutSlash ||
        imgWithSlash === processedWithoutSlash ||
        imgWithoutSlash === processedWithSlash
      ) {
        console.log(
          `✅ [VARIANT IMAGE] Found match with slash normalization: ${processedUrl.substring(0, 50)}...`
        );
        return true;
      }

      // Match by filename (for cases where paths differ but filename is same)
      // Only for non-base64 URLs
      if (!processedImg.startsWith('data:') && !processedUrl.startsWith('data:')) {
        const imgFilename = processedImg.split('/').pop()?.toLowerCase().split('?')[0];
        const processedFilename = processedUrl.split('/').pop()?.toLowerCase().split('?')[0];
        if (imgFilename && processedFilename && imgFilename === processedFilename) {
          console.log(
            `✅ [VARIANT IMAGE] Found match by filename: ${imgFilename}`
          );
          return true;
        }
      }

      // For base64 images, compare directly
      if (processedImg.startsWith('data:') && processedUrl.startsWith('data:')) {
        if (processedImg === processedUrl) {
          console.log(`✅ [VARIANT IMAGE] Found base64 match`);
          return true;
        }
      }

      return false;
    });

    if (imageIndex !== -1) {
      console.log(
        `🖼️ [VARIANT IMAGE] Switching to image index ${imageIndex}: ${processedUrl.substring(0, 50)}...`
      );
      setCurrentImageIndex(imageIndex);
      return;
    } else {
      console.log(
        `❌ [VARIANT IMAGE] Image not found in gallery: ${processedUrl.substring(0, 50)}...`
      );
      console.log(`   Available images: ${images.length} total`);
      console.log(
        `   First few images:`,
        images.slice(0, 3).map((img) => img?.substring(0, 50))
      );
    }
  }

  // Fallback: If variant image not found, try to find any variant with the same color
  // and use its image if available in the gallery
  // IMPORTANT: Use variantHasColor to check ALL color options
  if (product?.variants) {
    // Get the first color value from variant to find matching variants
    const variantColor = getOptionValueFn(variant.options, 'color');
    if (variantColor) {
      const colorVariants = product.variants.filter((v) => {
        return variantHasColorFn(v, variantColor) && v.imageUrl;
      });

      // Try to find image from any variant with the same color
      for (const colorVariant of colorVariants) {
        if (!colorVariant.imageUrl) continue;

        const colorSplitUrls = smartSplitUrls(colorVariant.imageUrl);
        for (const colorUrl of colorSplitUrls) {
          if (!colorUrl || colorUrl.trim() === '') continue;

          const processedColorUrl = processImageUrl(colorUrl);
          if (!processedColorUrl) continue;

          // Skip attribute value images
          if (isAttributeValueImage(processedColorUrl)) continue;

          const colorImageIndex = images.findIndex((img) => {
            if (!img) return false;
            const processedImg = processImageUrl(img);
            if (!processedImg) return false;

            const normalizedImg = normalizeUrl(processedImg);
            const normalizedColor = normalizeUrl(processedColorUrl);

            if (normalizedImg === normalizedColor) {
              return true;
            }

            // Try with/without slash
            const imgWithSlash = processedImg.startsWith('/')
              ? processedImg
              : `/${processedImg}`;
            const imgWithoutSlash = processedImg.startsWith('/')
              ? processedImg.substring(1)
              : processedImg;
            const colorWithSlash = processedColorUrl.startsWith('/')
              ? processedColorUrl
              : `/${processedColorUrl}`;
            const colorWithoutSlash = processedColorUrl.startsWith('/')
              ? processedColorUrl.substring(1)
              : processedColorUrl;

            return (
              imgWithSlash === colorWithSlash ||
              imgWithoutSlash === colorWithoutSlash ||
              imgWithSlash === colorWithoutSlash ||
              imgWithoutSlash === colorWithSlash
            );
          });

          if (colorImageIndex !== -1) {
            console.log(
              `🖼️ [VARIANT IMAGE] Found fallback image from same color variant at index ${colorImageIndex}`
            );
            setCurrentImageIndex(colorImageIndex);
            return;
          }
        }
      }
    }
  }

  console.log(
    `⚠️ [VARIANT IMAGE] No variant image found in gallery for variant ${variant.id}`
  );
};

/**
 * Handle color selection and switch to variant image
 */
export const handleColorSelect = (
  color: string,
  product: Product | null,
  images: string[],
  selectedColor: string | null,
  setSelectedColor: (color: string | null) => void,
  setCurrentImageIndex: (index: number) => void,
  variantHasColorFn: (variant: ProductVariant, color: string) => boolean
): void => {
  if (!color || !product) return;
  const normalizedColor = color.toLowerCase().trim();
  if (selectedColor === normalizedColor) {
    setSelectedColor(null);
  } else {
    setSelectedColor(normalizedColor);

    // Immediately try to find and switch to a variant image with this color
    // IMPORTANT: Use variantHasColor to check ALL color options, not just the first one
    const colorVariants =
      product.variants?.filter(
        (v) => variantHasColorFn(v, normalizedColor) && v.imageUrl
      ) || [];

    // Try to find image from variants with this color
    for (const variant of colorVariants) {
      if (!variant.imageUrl) continue;

      const splitUrls = smartSplitUrls(variant.imageUrl);
      for (const url of splitUrls) {
        if (!url || url.trim() === '') continue;

        const processedUrl = processImageUrl(url);
        if (!processedUrl) continue;

        // Try to find this image in the images array
        const imageIndex = images.findIndex((img) => {
          if (!img) return false;
          const processedImg = processImageUrl(img);
          if (!processedImg) return false;

          // Normalize both URLs for comparison
          const normalizeUrl = (u: string): string => {
            let n = u.trim().toLowerCase();
            if (n.startsWith('/')) n = n.substring(1);
            if (n.endsWith('/')) n = n.substring(0, n.length - 1);
            return n;
          };

          const normalizedImg = normalizeUrl(processedImg);
          const normalizedUrl = normalizeUrl(processedUrl);

          if (normalizedImg === normalizedUrl) return true;

          // Try with/without leading slash
          const imgWithSlash = processedImg.startsWith('/')
            ? processedImg
            : `/${processedImg}`;
          const imgWithoutSlash = processedImg.startsWith('/')
            ? processedImg.substring(1)
            : processedImg;
          const urlWithSlash = processedUrl.startsWith('/')
            ? processedUrl
            : `/${processedUrl}`;
          const urlWithoutSlash = processedUrl.startsWith('/')
            ? processedUrl.substring(1)
            : processedUrl;

          return (
            imgWithSlash === urlWithSlash ||
            imgWithoutSlash === urlWithoutSlash ||
            imgWithSlash === urlWithoutSlash ||
            imgWithoutSlash === urlWithSlash
          );
        });

        if (imageIndex !== -1) {
          console.log(
            `🎨 [COLOR SELECT] Switching to image index ${imageIndex} for color ${normalizedColor}`
          );
          setCurrentImageIndex(imageIndex);
          return; // Found and switched, exit early
        }
      }
    }

    console.log(
      `⚠️ [COLOR SELECT] No image found for color ${normalizedColor}`
    );
  }
};



