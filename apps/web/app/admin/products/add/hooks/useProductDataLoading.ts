import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { apiClient } from '@/lib/api-client';
import { CURRENCIES, type CurrencyCode } from '@/lib/currency';
import type { Brand, Category, Attribute } from '../types';

interface UseProductDataLoadingProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  setBrands: (brands: Brand[]) => void;
  setCategories: (categories: Category[]) => void;
  setAttributes: (attributes: Attribute[]) => void;
  setDefaultCurrency: (currency: CurrencyCode) => void;
  attributesDropdownOpen: boolean;
  setAttributesDropdownOpen: (open: boolean) => void;
  attributesDropdownRef: React.RefObject<HTMLDivElement>;
  categoriesExpanded: boolean;
  setCategoriesExpanded: (expanded: boolean) => void;
  brandsExpanded: boolean;
  setBrandsExpanded: (expanded: boolean) => void;
}

export function useProductDataLoading({
  isLoggedIn,
  isAdmin,
  isLoading,
  setBrands,
  setCategories,
  setAttributes,
  setDefaultCurrency,
  attributesDropdownOpen,
  setAttributesDropdownOpen,
  attributesDropdownRef,
  categoriesExpanded,
  setCategoriesExpanded,
  brandsExpanded,
  setBrandsExpanded,
}: UseProductDataLoadingProps) {
  const router = useRouter();

  // Auth check
  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn || !isAdmin) {
        router.push('/admin');
        return;
      }
    }
  }, [isLoggedIn, isAdmin, isLoading, router]);

  // Close attributes dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (attributesDropdownRef.current && !attributesDropdownRef.current.contains(event.target as Node)) {
        setAttributesDropdownOpen(false);
      }
    };

    if (attributesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [attributesDropdownOpen, attributesDropdownRef, setAttributesDropdownOpen]);

  // Load default currency from settings
  useEffect(() => {
    const loadDefaultCurrency = async () => {
      try {
        const settingsRes = await apiClient.get<{ defaultCurrency?: string }>('/api/v1/admin/settings');
        const currency = (settingsRes.defaultCurrency || 'AMD') as CurrencyCode;
        if (currency in CURRENCIES) {
          setDefaultCurrency(currency);
          console.log('✅ [ADMIN] Default currency loaded:', currency);
        }
      } catch (err) {
        console.error('❌ [ADMIN] Error loading default currency:', err);
        setDefaultCurrency('AMD');
      }
    };
    
    if (isLoggedIn && isAdmin) {
      loadDefaultCurrency();
    }
  }, [isLoggedIn, isAdmin, setDefaultCurrency]);

  // Fetch brands, categories, and attributes
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('📥 [ADMIN] Fetching brands, categories, and attributes...');
        const [brandsRes, categoriesRes, attributesRes] = await Promise.all([
          apiClient.get<{ data: Brand[] }>('/api/v1/admin/brands'),
          apiClient.get<{ data: Category[] }>('/api/v1/admin/categories'),
          apiClient.get<{ data: Attribute[] }>('/api/v1/admin/attributes'),
        ]);
        setBrands(brandsRes.data || []);
        setCategories(categoriesRes.data || []);
        setAttributes(attributesRes.data || []);
        console.log('✅ [ADMIN] Data fetched:', {
          brands: brandsRes.data?.length || 0,
          categories: categoriesRes.data?.length || 0,
          attributes: attributesRes.data?.length || 0,
        });
        // Debug: Log attributes details
        if (attributesRes.data && attributesRes.data.length > 0) {
          console.log('📋 [ADMIN] Attributes loaded:', attributesRes.data.map(attr => ({
            id: attr.id,
            key: attr.key,
            name: attr.name,
            valuesCount: attr.values?.length || 0,
            values: attr.values?.map(v => ({ 
              value: v.value, 
              label: v.label,
              colors: v.colors,
              colorsType: typeof v.colors,
              colorsIsArray: Array.isArray(v.colors),
              colorsLength: v.colors?.length,
              imageUrl: v.imageUrl 
            })) || []
          })));
          const colorAttr = attributesRes.data.find(a => a.key === 'color');
          const sizeAttr = attributesRes.data.find(a => a.key === 'size');
          if (!colorAttr) {
            console.warn('⚠️ [ADMIN] Color attribute not found in loaded attributes!');
          } else {
            console.log('✅ [ADMIN] Color attribute found:', { id: colorAttr.id, valuesCount: colorAttr.values?.length || 0 });
          }
          if (!sizeAttr) {
            console.warn('⚠️ [ADMIN] Size attribute not found in loaded attributes!');
          } else {
            console.log('✅ [ADMIN] Size attribute found:', { id: sizeAttr.id, valuesCount: sizeAttr.values?.length || 0 });
          }
        } else {
          console.warn('⚠️ [ADMIN] No attributes loaded! This may cause issues with variant builder.');
        }
        // Debug: Log categories with requiresSizes
        if (categoriesRes.data) {
          console.log('📋 [ADMIN] Categories with requiresSizes:', 
            categoriesRes.data.map(cat => ({ 
              id: cat.id, 
              title: cat.title, 
              requiresSizes: cat.requiresSizes 
            }))
          );
        }
      } catch (err: any) {
        console.error('❌ [ADMIN] Error fetching data:', err);
      }
    };
    fetchData();
  }, [setBrands, setCategories, setAttributes]);

  // Close category dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (categoriesExpanded && !target.closest('[data-category-dropdown]')) {
        setCategoriesExpanded(false);
      }
    };

    if (categoriesExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [categoriesExpanded, setCategoriesExpanded]);

  // Close brand dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (brandsExpanded && !target.closest('[data-brand-dropdown]')) {
        setBrandsExpanded(false);
      }
    };

    if (brandsExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [brandsExpanded, setBrandsExpanded]);
}


