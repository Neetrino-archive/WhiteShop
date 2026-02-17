'use client';

import { Input } from '@shop/ui';
import { useTranslation } from '../../../../../lib/i18n-client';
import type { Category, Brand } from '../types';

interface CategoriesBrandsProps {
  categories: Category[];
  brands: Brand[];
  categoryIds: string[];
  brandIds: string[];
  categoriesExpanded: boolean;
  brandsExpanded: boolean;
  useNewCategory: boolean;
  useNewBrand: boolean;
  newCategoryName: string;
  newBrandName: string;
  onCategoriesExpandedChange: (expanded: boolean) => void;
  onBrandsExpandedChange: (expanded: boolean) => void;
  onUseNewCategoryChange: (useNew: boolean) => void;
  onUseNewBrandChange: (useNew: boolean) => void;
  onNewCategoryNameChange: (name: string) => void;
  onNewBrandNameChange: (name: string) => void;
  onCategoryIdsChange: (ids: string[]) => void;
  onBrandIdsChange: (ids: string[]) => void;
  onPrimaryCategoryIdChange: (id: string) => void;
  isClothingCategory: () => boolean;
  onVariantsUpdate?: (updater: (prev: any[]) => any[]) => void;
}

export function CategoriesBrands({
  categories,
  brands,
  categoryIds,
  brandIds,
  categoriesExpanded,
  brandsExpanded,
  useNewCategory,
  useNewBrand,
  newCategoryName,
  newBrandName,
  onCategoriesExpandedChange,
  onBrandsExpandedChange,
  onUseNewCategoryChange,
  onUseNewBrandChange,
  onNewCategoryNameChange,
  onNewBrandNameChange,
  onCategoryIdsChange,
  onBrandIdsChange,
  onPrimaryCategoryIdChange,
  isClothingCategory,
  onVariantsUpdate,
}: CategoriesBrandsProps) {
  const { t } = useTranslation();

  // Build category tree structure
  const buildCategoryTree = () => {
    const categoryMap = new Map<string, Category & { children: Category[] }>();
    const rootCategories: (Category & { children: Category[] })[] = [];

    // First pass: create map and identify root categories
    categories.forEach((category) => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    // Second pass: build tree structure
    categories.forEach((category) => {
      if (category.parentId && categoryMap.has(category.parentId)) {
        const parent = categoryMap.get(category.parentId)!;
        const child = categoryMap.get(category.id)!;
        parent.children.push(child);
      } else {
        rootCategories.push(categoryMap.get(category.id)!);
      }
    });

    // Flatten tree for display (parent first, then children)
    const flattenTree = (
      nodes: (Category & { children: Category[] })[],
      result: (Category & { isSubcategory: boolean })[] = []
    ): (Category & { isSubcategory: boolean })[] => {
      nodes.forEach((node) => {
        result.push({ ...node, isSubcategory: false });
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            result.push({ ...child, isSubcategory: true });
          });
        }
      });
      return result;
    };

    return flattenTree(rootCategories);
  };

  const displayCategories = buildCategoryTree();

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategoryIds = checked
      ? [...categoryIds, categoryId]
      : categoryIds.filter((id) => id !== categoryId);

    // Set primary category if it's the first one
    const newPrimaryCategoryId = newCategoryIds.length > 0 ? newCategoryIds[0] : '';

    const selectedCategory = categories.find((cat) => cat.id === categoryId);
    const newIsSizeRequired = selectedCategory?.requiresSizes ?? false;

    onCategoryIdsChange(newCategoryIds);
    onPrimaryCategoryIdChange(newPrimaryCategoryId);

    // If size requirement changed and variants need to be cleared
    if (onVariantsUpdate) {
      const wasSizeRequired = isClothingCategory();
      if (wasSizeRequired && !newIsSizeRequired && newCategoryIds.length === 0) {
        onVariantsUpdate((prev) =>
          prev.map((v) => ({
            ...v,
            sizes: [],
            sizeStocks: {},
            size: '',
          }))
        );
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('admin.products.add.categoriesAndBrands')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Categories - Multi-select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('admin.products.add.categories')} <span className="text-gray-500 font-normal">{t('admin.products.add.selectMultiple')}</span>
          </label>
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                id="select-category"
                name="category-mode"
                checked={!useNewCategory}
                onChange={() => {
                  onUseNewCategoryChange(false);
                  onNewCategoryNameChange('');
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="select-category" className="text-sm text-gray-700">
                {t('admin.products.add.selectExistingCategories')}
              </label>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                id="new-category"
                name="category-mode"
                checked={useNewCategory}
                onChange={() => {
                  onUseNewCategoryChange(true);
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="new-category" className="text-sm text-gray-700">
                {t('admin.products.add.addNewCategory')}
              </label>
            </div>
            {!useNewCategory ? (
              <div className="relative" data-category-dropdown>
                <button
                  type="button"
                  onClick={() => onCategoriesExpandedChange(!categoriesExpanded)}
                  className="w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm flex items-center justify-between"
                >
                  <span className="text-gray-700">
                    {categoryIds.length === 0
                      ? t('admin.products.add.selectCategories')
                      : categoryIds.length === 1
                        ? t('admin.products.add.categorySelected').replace('{count}', categoryIds.length.toString())
                        : t('admin.products.add.categoriesSelected').replace('{count}', categoryIds.length.toString())}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      categoriesExpanded ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {categoriesExpanded && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-2">
                      <div className="space-y-1">
                        {displayCategories.map((category) => (
                          <label
                            key={category.id}
                            className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded ${
                              category.isSubcategory ? 'pl-6' : ''
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={categoryIds.includes(category.id)}
                              onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span
                              className={`text-gray-700 ${
                                category.isSubcategory ? 'text-xs' : 'text-sm font-semibold'
                              }`}
                            >
                              {category.title}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <Input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => onNewCategoryNameChange(e.target.value)}
                  placeholder={t('admin.products.add.enterNewCategoryName')}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* Brands - Multi-select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('admin.products.add.brands')} <span className="text-gray-500 font-normal">{t('admin.products.add.selectMultiple')}</span>
          </label>
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                id="select-brand"
                name="brand-mode"
                checked={!useNewBrand}
                onChange={() => {
                  onUseNewBrandChange(false);
                  onNewBrandNameChange('');
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="select-brand" className="text-sm text-gray-700">
                {t('admin.products.add.selectExistingBrands')}
              </label>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                id="new-brand"
                name="brand-mode"
                checked={useNewBrand}
                onChange={() => {
                  onUseNewBrandChange(true);
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="new-brand" className="text-sm text-gray-700">
                {t('admin.products.add.addNewBrand')}
              </label>
            </div>
            {!useNewBrand ? (
              <div className="relative" data-brand-dropdown>
                <button
                  type="button"
                  onClick={() => onBrandsExpandedChange(!brandsExpanded)}
                  className="w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm flex items-center justify-between"
                >
                  <span className="text-gray-700">
                    {brandIds.length === 0
                      ? t('admin.products.add.selectBrands')
                      : brandIds.length === 1
                        ? t('admin.products.add.brandSelected').replace('{count}', brandIds.length.toString())
                        : t('admin.products.add.brandsSelected').replace('{count}', brandIds.length.toString())}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      brandsExpanded ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {brandsExpanded && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-2">
                      <div className="space-y-1">
                        {brands.map((brand) => (
                          <label
                            key={brand.id}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={brandIds.includes(brand.id)}
                              onChange={(e) => {
                                const newBrandIds = e.target.checked
                                  ? [...brandIds, brand.id]
                                  : brandIds.filter((id) => id !== brand.id);
                                onBrandIdsChange(newBrandIds);
                              }}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{brand.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Input
                type="text"
                value={newBrandName}
                onChange={(e) => onNewBrandNameChange(e.target.value)}
                placeholder={t('admin.products.add.enterNewBrandName')}
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


