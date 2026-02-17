/**
 * Utility functions for product management
 */

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-|]/g, '') // Allow pipe character (|) in slug
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Generate all combinations of selected attribute values
 */
export const generateAttributeCombinations = (attributeValueGroups: string[][]): string[][] => {
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
};

/**
 * Check if a category requires sizes
 */
export const isClothingCategory = (primaryCategoryId: string, categories: Array<{ id: string; requiresSizes?: boolean }>): boolean => {
  if (!primaryCategoryId) {
    return false;
  }
  
  const selectedCategory = categories.find((cat) => cat.id === primaryCategoryId);
  if (!selectedCategory) {
    return false;
  }
  
  return selectedCategory.requiresSizes === true;
};


