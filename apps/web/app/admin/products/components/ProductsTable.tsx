'use client';

import { useRouter } from 'next/navigation';
import { Card, Button } from '@shop/ui';
import { useTranslation } from '../../../../lib/i18n-client';
import { formatPrice, type CurrencyCode } from '../../../../lib/currency';
import type { Product, ProductsResponse } from '../types';

interface ProductsTableProps {
  loading: boolean;
  sortedProducts: Product[];
  products: Product[];
  selectedIds: Set<string>;
  toggleSelect: (id: string) => void;
  toggleSelectAll: () => void;
  sortBy: string;
  handleHeaderSort: (field: 'price' | 'createdAt' | 'title' | 'stock') => void;
  currency: CurrencyCode;
  handleDeleteProduct: (productId: string, productTitle: string) => void;
  handleTogglePublished: (productId: string, currentStatus: boolean, productTitle: string) => void;
  handleToggleFeatured: (productId: string, currentStatus: boolean, productTitle: string) => void;
  meta: ProductsResponse['meta'] | null;
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
}

/**
 * Helper function to process image URLs
 * Handles relative paths, absolute URLs and base64
 */
const processImageUrl = (url: string | null) => {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // For relative paths, ensure they start with a slash
  return url.startsWith('/') ? url : `/${url}`;
};

export function ProductsTable({
  loading,
  sortedProducts,
  products,
  selectedIds,
  toggleSelect,
  toggleSelectAll,
  sortBy,
  handleHeaderSort,
  currency,
  handleDeleteProduct,
  handleTogglePublished,
  handleToggleFeatured,
  meta,
  page,
  setPage,
}: ProductsTableProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Card className="overflow-hidden">
      {loading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('admin.products.loadingProducts')}</p>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-600">{t('admin.products.noProducts')}</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      aria-label={t('admin.products.selectAll')}
                      checked={products.length > 0 && products.every(p => selectedIds.has(p.id))}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      type="button"
                      onClick={() => handleHeaderSort('title')}
                      className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-800"
                    >
                      <span>{t('admin.products.product')}</span>
                      <span className="flex flex-col gap-0.5">
                        <svg
                          className={`w-2.5 h-2.5 ${
                            sortBy === 'title-asc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <svg
                          className={`w-2.5 h-2.5 ${
                            sortBy === 'title-desc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button> 
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      type="button"
                      onClick={() => handleHeaderSort('stock')}
                      className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-800"
                    >
                      <span>{t('admin.products.stock')}</span>
                      <span className="flex flex-col gap-0.5">
                        <svg
                          className={`w-2.5 h-2.5 ${
                            sortBy === 'stock-asc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <svg
                          className={`w-2.5 h-2.5 ${
                            sortBy === 'stock-desc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      type="button"
                      onClick={() => handleHeaderSort('price')}
                      className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-800"
                    >
                      <span>{t('admin.products.price')}</span>
                      <span className="flex flex-col gap-0.5">
                        <svg
                          className={`w-2.5 h-2.5 ${
                            sortBy === 'price-asc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <svg
                          className={`w-2.5 h-2.5 ${
                            sortBy === 'price-desc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      type="button"
                      onClick={() => handleHeaderSort('createdAt')}
                      className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-800"
                    >
                      <span>{t('admin.products.created')}</span>
                      <span className="flex flex-col gap-0.5">
                        <svg
                          className={`w-2.5 h-2.5 ${
                            sortBy === 'createdAt-asc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <svg
                          className={`w-2.5 h-2.5 ${
                            sortBy === 'createdAt-desc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.products.featured')}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider pl-6">
                    {t('admin.products.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        aria-label={t('admin.products.selectProduct').replace('{title}', product.title)}
                        checked={selectedIds.has(product.id)}
                        onChange={() => toggleSelect(product.id)}
                      />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.image && (
                          <img
                            src={processImageUrl(product.image)}
                            alt={product.title}
                            className="h-12 w-12 rounded object-cover mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          <div className="text-sm text-gray-500">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      {product.colorStocks && product.colorStocks.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {product.colorStocks.map((colorStock) => (
                            <div
                              key={colorStock.color}
                              className="px-3 py-1 bg-gray-100 rounded-lg text-sm"
                            >
                              <span className="font-medium text-gray-900">{colorStock.color}:</span>
                              <span className="ml-1 text-gray-600">{colorStock.stock} {t('admin.products.pcs')}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">
                          {product.stock > 0 ? `${product.stock} ${t('admin.products.pcs')}` : `0 ${t('admin.products.pcs')}`}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(product.price, currency)}
                        </div>
                        {(product.compareAtPrice && product.compareAtPrice > product.price) || 
                         (product.discountPercent && product.discountPercent > 0) ? (
                          <div className="text-xs text-gray-500 line-through mt-0.5">
                            {formatPrice(
                              product.compareAtPrice && product.compareAtPrice > product.price
                                ? product.compareAtPrice
                                : product.price / (1 - (product.discountPercent || 0) / 100),
                              currency
                            )}
                          </div>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString('hy-AM')}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleToggleFeatured(product.id, product.featured || false, product.title)}
                        className="inline-flex items-center justify-center w-8 h-8 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                        title={product.featured ? t('admin.products.clickToRemoveFeatured') : t('admin.products.clickToMarkFeatured')}
                      >
                        <svg
                          className={`w-6 h-6 transition-all duration-200 ${
                            product.featured
                              ? 'fill-blue-500 text-blue-500 drop-shadow-sm'
                              : 'fill-none stroke-blue-400 text-blue-400 opacity-50 hover:opacity-75'
                          }`}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </button>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-1 flex-wrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/admin/products/add?id=${product.id}`)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          {t('admin.products.edit')}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id, product.title)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          {t('admin.products.delete')}
                        </Button>
                        <button
                          type="button"
                          onClick={() => handleTogglePublished(product.id, product.published, product.title)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            product.published
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                          }`}
                          title={product.published ? t('admin.products.clickToDraft') : t('admin.products.clickToPublished')}
                          aria-label={product.published ? `${t('admin.products.published')} - ${t('admin.products.clickToDraft')}` : `${t('admin.products.draft')} - ${t('admin.products.clickToPublished')}`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200 ${
                              product.published ? 'translate-x-[18px]' : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                {t('admin.products.showingPage').replace('{page}', meta.page.toString()).replace('{totalPages}', meta.totalPages.toString()).replace('{total}', meta.total.toString())}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  {t('admin.products.previous')}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                  disabled={page === meta.totalPages}
                >
                  {t('admin.products.next')}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
}

