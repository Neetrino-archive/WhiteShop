'use client';

import type { FormEvent } from 'react';
import { Button } from '@shop/ui';
import { useTranslation } from '../../../../lib/i18n-client';
import type { Category } from '../types';

interface ProductFiltersProps {
  search: string;
  setSearch: (search: string) => void;
  skuSearch: string;
  setSkuSearch: (sku: string) => void;
  selectedCategories: Set<string>;
  setSelectedCategories: (categories: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
  categories: Category[];
  categoriesLoading: boolean;
  categoriesExpanded: boolean;
  setCategoriesExpanded: (expanded: boolean) => void;
  stockFilter: 'all' | 'inStock' | 'outOfStock';
  setStockFilter: (filter: 'all' | 'inStock' | 'outOfStock') => void;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  selectedIds: Set<string>;
  handleSearch: (e: FormEvent) => void;
  handleBulkDelete: () => void;
  handleClearFilters: () => void;
  bulkDeleting: boolean;
  setPage: (page: number | ((prev: number) => number)) => void;
}

export function ProductFilters({
  search,
  setSearch,
  skuSearch,
  setSkuSearch,
  selectedCategories,
  setSelectedCategories,
  categories,
  categoriesLoading,
  categoriesExpanded,
  setCategoriesExpanded,
  stockFilter,
  setStockFilter,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedIds,
  handleSearch,
  handleBulkDelete,
  handleClearFilters,
  bulkDeleting,
  setPage,
}: ProductFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 mb-6">
      {/* Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('admin.products.searchByTitleOrSlug')}
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(e as any);
              }
            }}
            placeholder={t('admin.products.searchPlaceholder')}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('admin.products.searchBySku')}
          </label>
          <input
            type="text"
            value={skuSearch}
            onChange={(e) => {
              setSkuSearch(e.target.value);
              setPage(1);
            }}
            placeholder={t('admin.products.skuPlaceholder')}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('admin.products.filterByCategory')}
          </label>
          <div className="relative" data-category-dropdown>
            <button
              type="button"
              onClick={() => setCategoriesExpanded(!categoriesExpanded)}
              className="w-full px-4 py-2.5 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm flex items-center justify-between"
            >
              <span className="text-gray-700">
                {selectedCategories.size === 0
                  ? t('admin.products.allCategories')
                  : selectedCategories.size === 1
                  ? categories.find(c => selectedCategories.has(c.id))?.title || '1 category'
                  : `${selectedCategories.size} categories`}
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
                {categoriesLoading ? (
                  <div className="p-3 text-sm text-gray-500 text-center">{t('admin.products.loadingCategories')}</div>
                ) : categories.length === 0 ? (
                  <div className="p-3 text-sm text-gray-500 text-center">{t('admin.products.noCategoriesAvailable')}</div>
                ) : (
                  <div className="p-2">
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <label
                          key={category.id}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.has(category.id)}
                            onChange={(e) => {
                              const newSelected = new Set(selectedCategories);
                              if (e.target.checked) {
                                newSelected.add(category.id);
                              } else {
                                newSelected.delete(category.id);
                              }
                              setSelectedCategories(newSelected);
                              setPage(1);
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{category.title}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Stock Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('admin.products.filterByStock')}
          </label>
          <select
            value={stockFilter}
            onChange={(e) => {
              setStockFilter(e.target.value as 'all' | 'inStock' | 'outOfStock');
              setPage(1);
            }}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
          >
            <option value="all">{t('admin.products.allProducts')}</option>
            <option value="inStock">{t('admin.products.inStock')}</option>
            <option value="outOfStock">{t('admin.products.outOfStock')}</option>
          </select>
        </div>
      </div>

      {/* Selected Products and Delete */}
      {selectedIds.size > 0 && (
        <div className="px-4 py-3 flex items-center justify-between border border-gray-200 rounded-md bg-white">
          <div className="text-sm text-gray-700">
            {t('admin.products.selectedProducts').replace('{count}', selectedIds.size.toString())}
          </div>
          <Button
            variant="outline"
            onClick={handleBulkDelete}
            disabled={bulkDeleting}
            className="text-sm"
          >
            {bulkDeleting ? t('admin.products.deleting') : t('admin.products.deleteSelected')}
          </Button>
        </div>
      )}
    </div>
  );
}

