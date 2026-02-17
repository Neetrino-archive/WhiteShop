import { db } from "@white-shop/db";
import { logger } from "./logger";

/**
 * Generate all possible combinations of AttributeValues
 * @param attributeValueGroups Array of arrays, where each inner array contains AttributeValue IDs for one attribute
 * @returns Array of arrays, where each inner array is a combination of AttributeValue IDs
 * 
 * Example:
 * Input: [[value1, value2], [value3, value4]]
 * Output: [[value1, value3], [value1, value4], [value2, value3], [value2, value4]]
 */
export function generateAttributeCombinations(
  attributeValueGroups: string[][]
): string[][] {
  if (attributeValueGroups.length === 0) {
    return [[]];
  }

  if (attributeValueGroups.length === 1) {
    return attributeValueGroups[0].map((value) => [value]);
  }

  const [firstGroup, ...restGroups] = attributeValueGroups;
  const restCombinations = generateAttributeCombinations(restGroups);

  const result: string[][] = [];
  for (const value of firstGroup) {
    for (const combination of restCombinations) {
      result.push([value, ...combination]);
    }
  }

  return result;
}

/**
 * Get AttributeValue IDs for a product's attributes
 * @param productId Product ID
 * @returns Map of attribute keys to arrays of AttributeValue IDs
 */
export async function getProductAttributeValues(
  productId: string
): Promise<Map<string, string[]>> {
  logger.debug('Getting attribute values for product', { productId });

  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      productAttributes: {
        include: {
          attribute: {
            include: {
              values: {
                orderBy: { position: 'asc' },
              },
            },
          },
        },
      },
    },
  });

  if (!product) {
    logger.warn('Product not found', { productId });
    return new Map();
  }

  const attributeValueMap = new Map<string, string[]>();

  for (const productAttribute of product.productAttributes) {
    const attributeKey = productAttribute.attribute.key;
    const valueIds = productAttribute.attribute.values.map((v: { id: string }) => v.id);
    attributeValueMap.set(attributeKey, valueIds);
    logger.debug(`Attribute "${attributeKey}" has ${valueIds.length} values`, { attributeKey, valueCount: valueIds.length });
  }

  return attributeValueMap;
}

/**
 * Find or create AttributeValue by attribute key and value string
 * @param attributeKey Attribute key (e.g., "color", "size")
 * @param valueString Value string (e.g., "Red", "Large")
 * @param locale Locale for creating translation if needed
 * @returns AttributeValue ID or null if not found
 */
export async function findOrCreateAttributeValue(
  attributeKey: string,
  valueString: string,
  locale: string = "en"
): Promise<string | null> {
  logger.debug('Finding/Creating AttributeValue', { attributeKey, valueString });

  // Find attribute by key
  const attribute = await db.attribute.findUnique({
    where: { key: attributeKey },
    include: {
      values: {
        where: {
          value: valueString,
        },
      },
    },
  });

  if (!attribute) {
    logger.warn('Attribute not found', { attributeKey });
    return null;
  }

  // If value exists, return its ID
  if (attribute.values.length > 0) {
    logger.debug('Found existing AttributeValue', { attributeValueId: attribute.values[0].id });
    return attribute.values[0].id;
  }

  // Create new AttributeValue
  const newValue = await db.attributeValue.create({
    data: {
      attributeId: attribute.id,
      value: valueString,
      translations: {
        create: {
          locale,
          label: valueString,
        },
      },
    },
  });

  logger.info('Created new AttributeValue', { attributeValueId: newValue.id });
  return newValue.id;
}

/**
 * Generate variants for a product based on its attributes
 * @param productId Product ID
 * @param variantData Base variant data (price, stock, etc.)
 * @returns Array of variant data objects ready for creation
 */
export async function generateVariantsFromAttributes(
  productId: string,
  variantData: {
    price: number;
    compareAtPrice?: number;
    stock?: number;
    sku?: string;
    imageUrl?: string;
    published?: boolean;
  }
): Promise<Array<{
  price: number;
  compareAtPrice?: number;
  stock: number;
  sku?: string;
  imageUrl?: string;
  published: boolean;
  options: Array<{ valueId: string }>;
}>> {
  logger.debug('Generating variants for product', { productId });

  const attributeValueMap = await getProductAttributeValues(productId);

  if (attributeValueMap.size === 0) {
    logger.warn('No attributes found, creating single variant', { productId });
    return [
      {
        ...variantData,
        stock: variantData.stock || 0,
        published: variantData.published !== false,
        options: [],
      },
    ];
  }

  // Convert map to array of arrays
  const attributeValueGroups = Array.from(attributeValueMap.values());

  // Generate all combinations
  const combinations = generateAttributeCombinations(attributeValueGroups);

  logger.info('Generated variant combinations', { productId, combinationCount: combinations.length });

  // Create variant data for each combination
  const variants = combinations.map((combination, index) => {
    const options = combination.map((valueId) => ({ valueId }));

    // Generate SKU if not provided
    let sku = variantData.sku;
    if (!sku && combinations.length > 1) {
      const baseSku = `VAR-${productId.slice(-6)}-${index + 1}`;
      sku = baseSku;
    }

    return {
      price: variantData.price,
      compareAtPrice: variantData.compareAtPrice,
      stock: variantData.stock || 0,
      sku,
      imageUrl: variantData.imageUrl,
      published: variantData.published !== false,
      options,
    };
  });

  return variants;
}

