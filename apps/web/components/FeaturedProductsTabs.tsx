'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';
import { getStoredLanguage, type LanguageCode } from '../lib/language';
import { ProductCard } from './ProductCard';
import { t } from '../lib/i18n';

interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  compareAtPrice?: number | null;
  image: string | null;
  inStock: boolean;
  brand: {
    id: string;
    name: string;
  } | null;
  colors?: Array<{ value: string; imageUrl?: string | null; colors?: string[] | null }>; // Available colors from variants with imageUrl and colors hex
  originalPrice?: number | null;
  discountPercent?: number | null;
  labels?: Array<{
    type: string;
    value: string;
    position: string;
    color?: string | null;
  }>;
}

interface ProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

type FilterType = 'new' | 'featured' | 'bestseller';

interface Tab {
  id: FilterType;
  label: string;
  filter: string | null;
}

// Tabs will be generated dynamically with translations

const PRODUCTS_PER_PAGE = 10;
const MOBILE_GRID_LAYOUT =
  'grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';

/**
 * FeaturedProductsTabs Component
 * Displays products with tabs for filtering (NEW OFFERS, NEW, FEATURED, TOP SELLERS)
 * Similar to the reference design with underlined active tab
 */
export function FeaturedProductsTabs() {
  // Use state for language to prevent hydration mismatch
  // Start with 'en' on server, update on client mount
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<FilterType>('new');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update language on mount and when language changes
  useEffect(() => {
    const updateLanguage = () => {
      const storedLang = getStoredLanguage();
      setLanguage(storedLang);
    };

    // Update immediately on mount
    updateLanguage();

    // Listen to language-updated events
    const handleLanguageUpdate = () => {
      updateLanguage();
    };

    window.addEventListener('language-updated', handleLanguageUpdate);
    return () => {
      window.removeEventListener('language-updated', handleLanguageUpdate);
    };
  }, []);

  // Generate tabs with translations (memoized based on language)
  const tabs: Tab[] = [
    { id: 'new', label: t(language, 'home.featured_products.tab_new'), filter: 'new' },
    { id: 'bestseller', label: t(language, 'home.featured_products.tab_bestseller'), filter: 'bestseller' },
    { id: 'featured', label: t(language, 'home.featured_products.tab_featured'), filter: 'featured' },
  ];

  /**
   * Fetch products based on active filter
   */
  const fetchProducts = async (filter: string | null) => {
    try {
      setLoading(true);
      setError(null);
      console.log('📦 [FeaturedProductsTabs] Fetching products with filter:', filter);

      // Use current language from state (always up-to-date)
      const currentLang = language;
      const params: Record<string, string> = {
        page: '1',
        limit: PRODUCTS_PER_PAGE.toString(),
        lang: currentLang,
      };

      // Add filter if provided
      if (filter) {
        params.filter = filter;
      }

      const response = await apiClient.get<ProductsResponse>('/api/v1/products', {
        params,
      });

      console.log(`✅ [FeaturedProductsTabs] Loaded ${response.data.length} products`);
      // Ограничиваем до 10 продуктов максимум
      setProducts((response.data || []).slice(0, PRODUCTS_PER_PAGE));
    } catch (err: any) {
      console.error('❌ [FeaturedProductsTabs] Error fetching products:', err);
      // Use current language from state for error message
      setError(t(language, 'home.featured_products.errorLoading'));
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle tab change
   */
  const handleTabChange = (tabId: FilterType) => {
    setActiveTab(tabId);
    const tab = tabs.find((t) => t.id === tabId);
    fetchProducts(tab?.filter || null);
  };

  // Load products on mount (default "NEW")
  useEffect(() => {
    fetchProducts('new');
    console.log('🧱 [FeaturedProductsTabs] Mobile grid locked to 2 columns on phones');
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          {t(language, 'home.featured_products.title')}
        </h2>
        <p className="mt-3 mb-8 text-base text-gray-600 text-center">
          {t(language, 'home.featured_products.subtitle')}
        </p>

        {/* Tabs Navigation */}
        <div className="flex justify-center items-center gap-6 md:gap-8 mb-8 flex-wrap">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-colors duration-200
                  ${isActive 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
                aria-label={t(language, 'home.featured_products.ariaShowProducts').replace('{label}', tab.label)}
                aria-pressed={isActive}
              >
                {tab.label}
                {/* Active indicator - underline */}
                {isActive && (
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className={MOBILE_GRID_LAYOUT}>
            {[...Array(PRODUCTS_PER_PAGE)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => {
                const tab = tabs.find((t) => t.id === activeTab);
                fetchProducts(tab?.filter || null);
              }}
              className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
            >
              {t(language, 'home.featured_products.tryAgain')}
            </button>
          </div>
        ) : products.length > 0 ? (
          <div className={MOBILE_GRID_LAYOUT}>
            {products.slice(0, PRODUCTS_PER_PAGE).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">{t(language, 'home.featured_products.noProducts')}</p>
          </div>
        )}
      </div>
    </section>
  );
}

