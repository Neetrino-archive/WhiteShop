'use client';

import { Card, Button, Input } from '@shop/ui';
import { useRouter } from 'next/navigation';
import { useTranslation } from '../../../lib/i18n-client';
import { AdminMenuDrawer } from '../../../components/AdminMenuDrawer';
import { getAdminMenuTABS } from '../admin-menu.config';

interface AdminCategory {
  id: string;
  title: string;
  parentId: string | null;
}

interface AdminBrand {
  id: string;
  name: string;
  logoUrl?: string;
}

interface QuickSettingsContentProps {
  currentPath: string;
  router: ReturnType<typeof useRouter>;
  t: ReturnType<typeof useTranslation>['t'];
  globalDiscount: number;
  setGlobalDiscount: (value: number) => void;
  discountLoading: boolean;
  discountSaving: boolean;
  handleDiscountSave: () => void;
  categories: AdminCategory[];
  categoriesLoading: boolean;
  categoryDiscounts: Record<string, number>;
  updateCategoryDiscountValue: (categoryId: string, value: string) => void;
  clearCategoryDiscount: (categoryId: string) => void;
  handleCategoryDiscountSave: () => void;
  categorySaving: boolean;
  brands: AdminBrand[];
  brandsLoading: boolean;
  brandDiscounts: Record<string, number>;
  updateBrandDiscountValue: (brandId: string, value: string) => void;
  clearBrandDiscount: (brandId: string) => void;
  handleBrandDiscountSave: () => void;
  brandSaving: boolean;
  products: any[];
  productsLoading: boolean;
  productDiscounts: Record<string, number>;
  setProductDiscounts: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  handleProductDiscountSave: (productId: string) => void;
  savingProductId: string | null;
}

export function QuickSettingsContent({
  currentPath,
  router,
  t,
  globalDiscount,
  setGlobalDiscount,
  discountLoading,
  discountSaving,
  handleDiscountSave,
  categories,
  categoriesLoading,
  categoryDiscounts,
  updateCategoryDiscountValue,
  clearCategoryDiscount,
  handleCategoryDiscountSave,
  categorySaving,
  brands,
  brandsLoading,
  brandDiscounts,
  updateBrandDiscountValue,
  clearBrandDiscount,
  handleBrandDiscountSave,
  brandSaving,
  products,
  productsLoading,
  productDiscounts,
  setProductDiscounts,
  handleProductDiscountSave,
  savingProductId,
}: QuickSettingsContentProps) {
  const adminTabs = getAdminMenuTABS(t);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.quickSettings.title')}</h1>
          <p className="text-gray-600 mt-2">{t('admin.quickSettings.subtitle')}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden mb-6">
            <AdminMenuDrawer tabs={adminTabs} currentPath={currentPath} />
          </div>
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <nav className="bg-white border border-gray-200 rounded-lg p-2 space-y-1">
              {adminTabs.map((tab) => {
                const isActive = currentPath === tab.path || 
                  (tab.path === '/admin' && currentPath === '/admin') ||
                  (tab.path !== '/admin' && currentPath.startsWith(tab.path));
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      router.push(tab.path);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                      tab.isSubCategory ? 'pl-12' : ''
                    } ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                      {tab.icon}
                    </span>
                    <span className="text-left">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Quick Settings - Discount Management */}
            <Card className="p-6 mb-8 bg-white border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{t('admin.quickSettings.quickSettingsTitle')}</h2>
                  <p className="text-sm text-gray-600 mt-1">{t('admin.quickSettings.quickSettingsSubtitle')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Global Discount */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{t('admin.quickSettings.globalDiscount')}</h3>
                      <p className="text-xs text-gray-500">{t('admin.quickSettings.forAllProducts')}</p>
                    </div>
                  </div>
                  
                  {discountLoading ? (
                    <div className="animate-pulse">
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={globalDiscount}
                          onChange={(e) => {
                            const value = e.target.value;
                            setGlobalDiscount(value === '' ? 0 : parseFloat(value) || 0);
                          }}
                          className="flex-1"
                          placeholder="0"
                        />
                        <span className="text-sm font-medium text-gray-700 w-8">%</span>
                        <Button
                          variant="primary"
                          onClick={handleDiscountSave}
                          disabled={discountSaving}
                          className="px-6"
                        >
                          {discountSaving ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>{t('admin.quickSettings.saving')}</span>
                            </div>
                          ) : (
                            t('admin.quickSettings.save')
                          )}
                        </Button>
                      </div>
                      
                      {globalDiscount > 0 ? (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                          <p className="text-sm text-green-800">
                            <strong>{t('admin.quickSettings.active')}</strong> {t('admin.quickSettings.discountApplied').replace('{percent}', globalDiscount.toString())}
                          </p>
                        </div>
                      ) : (
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                          <p className="text-sm text-gray-600">
                            {t('admin.quickSettings.noGlobalDiscount')}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGlobalDiscount(10)}
                          className="flex-1"
                        >
                          10%
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGlobalDiscount(20)}
                          className="flex-1"
                        >
                          20%
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGlobalDiscount(30)}
                          className="flex-1"
                        >
                          30%
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGlobalDiscount(50)}
                          className="flex-1"
                        >
                          50%
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setGlobalDiscount(0)}
                          className="px-3"
                        >
                          {t('admin.quickSettings.cancel')}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Info */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{t('admin.quickSettings.usefulInformation')}</h3>
                      <p className="text-xs text-gray-500">{t('admin.quickSettings.aboutDiscounts')}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <p>{t('admin.quickSettings.discountApplies')}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <p>{t('admin.quickSettings.discountExample')}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <p>{t('admin.quickSettings.noDiscount')}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <p>{t('admin.quickSettings.changesApplied')}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push('/admin/settings')}
                      className="w-full"
                    >
                      {t('admin.quickSettings.moreSettings')}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Category Discounts */}
            <Card className="p-6 mb-8 bg-white border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{t('admin.quickSettings.categoryDiscounts')}</h2>
                  <p className="text-sm text-gray-600">{t('admin.quickSettings.categoryDiscountsSubtitle')}</p>
                </div>
                <Button
                  variant="primary"
                  onClick={handleCategoryDiscountSave}
                  disabled={categorySaving || categories.length === 0}
                >
                  {categorySaving ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{t('admin.quickSettings.saving')}</span>
                    </div>
                  ) : (
                    t('admin.quickSettings.save')
                  )}
                </Button>
              </div>

              {categoriesLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                  <p className="text-gray-600">{t('admin.quickSettings.loadingCategories')}</p>
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-6 text-gray-600 border border-dashed border-gray-200 rounded">
                  {t('admin.quickSettings.noCategories')}
                </div>
              ) : (
                <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-100 border border-gray-100 rounded-lg">
                  {categories.map((category) => {
                    const currentValue = categoryDiscounts[category.id];
                    return (
                      <div
                        key={category.id}
                        className="flex items-center gap-4 px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {category.title || t('admin.quickSettings.untitledCategory')}
                          </p>
                          {category.parentId ? (
                            <p className="text-xs text-gray-500">{t('admin.quickSettings.parentCategoryId').replace('{id}', category.parentId)}</p>
                          ) : (
                            <p className="text-xs text-gray-500">{t('admin.quickSettings.rootCategory')}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            value={currentValue === undefined ? '' : currentValue}
                            onChange={(e) => updateCategoryDiscountValue(category.id, e.target.value)}
                            className="w-24"
                            placeholder="0"
                          />
                          <span className="text-sm font-medium text-gray-700">%</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => clearCategoryDiscount(category.id)}
                            disabled={currentValue === undefined}
                          >
                            {t('admin.quickSettings.clear')}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Brand Discounts */}
            <Card className="p-6 mb-8 bg-white border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{t('admin.quickSettings.brandDiscounts')}</h2>
                  <p className="text-sm text-gray-600">{t('admin.quickSettings.brandDiscountsSubtitle')}</p>
                </div>
                <Button
                  variant="primary"
                  onClick={handleBrandDiscountSave}
                  disabled={brandSaving || brands.length === 0}
                >
                  {brandSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{t('admin.quickSettings.saving')}</span>
                    </div>
                  ) : (
                    t('admin.quickSettings.save')
                  )}
                </Button>
              </div>

              {brandsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                  <p className="text-gray-600">{t('admin.quickSettings.loadingBrands')}</p>
                </div>
              ) : brands.length === 0 ? (
                <div className="text-center py-6 text-gray-600 border border-dashed border-gray-200 rounded">
                  {t('admin.quickSettings.noBrands')}
                </div>
              ) : (
                <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-100 border border-gray-100 rounded-lg">
                  {brands.map((brand) => {
                    const currentValue = brandDiscounts[brand.id];
                    return (
                      <div
                        key={brand.id}
                        className="flex items-center gap-4 px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {brand.name || t('admin.quickSettings.untitledBrand')}
                          </p>
                          <p className="text-xs text-gray-500">
                            {t('admin.quickSettings.brandId').replace('{id}', brand.id)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            value={currentValue === undefined ? '' : currentValue}
                            onChange={(e) => updateBrandDiscountValue(brand.id, e.target.value)}
                            className="w-24"
                            placeholder="0"
                          />
                          <span className="text-sm font-medium text-gray-700">%</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => clearBrandDiscount(brand.id)}
                            disabled={currentValue === undefined}
                          >
                            {t('admin.quickSettings.clear')}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Products List with Individual Discounts */}
            <Card className="p-6 bg-white border-gray-200">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('admin.quickSettings.productDiscounts')}</h2>
                <p className="text-sm text-gray-600">{t('admin.quickSettings.productDiscountsSubtitle')}</p>
              </div>

              {productsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                  <p className="text-gray-600">{t('admin.quickSettings.loadingProducts')}</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">{t('admin.quickSettings.noProducts')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-4 border-2 border-blue-300 rounded-lg hover:bg-blue-50 transition-colors bg-blue-50/30"
                    >
                      {product.image && (
                        <div className="flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{product.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {(() => {
                            const currentDiscount = Number(productDiscounts[product.id] ?? product.discountPercent ?? 0);
                            const originalPrice = product.price || 0;
                            const discountedPrice = currentDiscount > 0 && originalPrice > 0
                              ? Math.round(originalPrice * (1 - currentDiscount / 100))
                              : originalPrice;
                            return (
                              <>
                                {currentDiscount > 0 && originalPrice > 0 ? (
                                  <>
                                    <span className="text-xs font-semibold text-blue-600 select-none">
                                      {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                      }).format(discountedPrice)}
                                    </span>
                                    <span className="text-xs text-gray-400 line-through select-none">
                                      {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                      }).format(originalPrice)}
                                    </span>
                                    <span className="text-xs text-red-600 font-medium">
                                      -{currentDiscount}%
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-xs text-gray-500 select-none">
                                    {originalPrice > 0 ? new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                      minimumFractionDigits: 0,
                                    }).format(originalPrice) : 'N/A'}
                                  </span>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={productDiscounts[product.id] ?? product.discountPercent ?? 0}
                          onChange={(e) => {
                            const value = e.target.value;
                            const discountValue = value === '' ? 0 : parseFloat(value) || 0;
                            console.log(`🔄 [QUICK SETTINGS] Updating discount for product ${product.id}: ${discountValue}%`);
                            setProductDiscounts((prev) => {
                              const updated = {
                                ...prev,
                                [product.id]: discountValue,
                              };
                              console.log(`✅ [QUICK SETTINGS] Updated productDiscounts:`, updated);
                              return updated;
                            });
                          }}
                          className="w-20"
                          placeholder="0"
                        />
                        <span className="text-sm font-medium text-gray-700 w-6">%</span>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleProductDiscountSave(product.id)}
                          disabled={savingProductId === product.id}
                          className="px-4"
                        >
                          {savingProductId === product.id ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                            </div>
                          ) : (
                            t('admin.quickSettings.save')
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

