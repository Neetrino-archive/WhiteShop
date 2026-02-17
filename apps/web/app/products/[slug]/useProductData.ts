import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import type { LanguageCode } from '../../../lib/language';
import { getStoredLanguage } from '../../../lib/language';
import { apiClient } from '../../../lib/api-client';
import { getStoredCurrency, type CurrencyCode } from '../../../lib/currency';
import type { Product } from './types';
import { RESERVED_ROUTES, WISHLIST_KEY, COMPARE_KEY } from './constants';
import {
  processImageUrl,
  smartSplitUrls,
  normalizeUrlForComparison,
  cleanImageUrls,
} from '../../../lib/utils/image-utils';

interface UseProductDataProps {
  params: Promise<{ slug?: string }>;
}

interface UseProductDataReturn {
  product: Product | null;
  loading: boolean;
  images: string[];
  reviews: Array<{ rating: number }>;
  currency: CurrencyCode;
  language: LanguageCode;
  isInWishlist: boolean;
  isInCompare: boolean;
  slug: string;
  variantIdFromUrl: string | null;
  setProduct: (product: Product | null) => void;
  setCurrentImageIndex: (index: number) => void;
  setThumbnailStartIndex: (index: number) => void;
  setCurrency: Dispatch<SetStateAction<CurrencyCode>>;
  setLanguage: Dispatch<SetStateAction<LanguageCode>>;
  setIsInWishlist: (value: boolean) => void;
  setIsInCompare: (value: boolean) => void;
  fetchProduct: () => Promise<void>;
}

export function useProductData({
  params,
}: UseProductDataProps): UseProductDataReturn {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState(getStoredCurrency());
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);
  const [reviews, setReviews] = useState<Array<{ rating: number }>>([]);

  const resolvedParams = use(params);
  const rawSlug = resolvedParams?.slug ?? '';
  const slugParts = rawSlug.includes(':') ? rawSlug.split(':') : [rawSlug];
  const slug = slugParts[0];
  const variantIdFromUrl = slugParts.length > 1 ? slugParts[1] : null;

  // Get images array from product - using unified utilities
  // Note: product.media is already cleaned and separated from variant images by findBySlug
  const images = useMemo(() => {
    if (!product) return [];

    console.log('🖼️ [PRODUCT IMAGES] Building images array for product:', product.id);

    // Collect all main images (product.media is already cleaned in findBySlug)
    const mainImages = Array.isArray(product.media) ? product.media : [];
    const cleanedMain = cleanImageUrls(mainImages);
    console.log('🖼️ [PRODUCT IMAGES] Main images from product.media:', cleanedMain.length);

    // Collect all variant images
    const variantImages: any[] = [];
    if (product.variants && Array.isArray(product.variants)) {
      // Sort variants by position for consistent order
      const sortedVariants = [...product.variants].sort((a, b) => {
        const aPos = (a as any).position ?? 0;
        const bPos = (b as any).position ?? 0;
        return aPos - bPos;
      });

      sortedVariants.forEach((v) => {
        if (v.imageUrl) {
          const urls = smartSplitUrls(v.imageUrl);
          variantImages.push(...urls);
        }
      });
    }

    const cleanedVariantImages = cleanImageUrls(variantImages);
    console.log('🖼️ [PRODUCT IMAGES] Variant images:', cleanedVariantImages.length);

    // Combine all images: main first, then variant images
    // Use array to preserve order, Set to track duplicates
    const allImages: string[] = [];
    const seenNormalized = new Set<string>();

    // Add main images first (preserve order)
    cleanedMain.forEach((img) => {
      const processed = processImageUrl(img) || img;
      const normalized = normalizeUrlForComparison(processed);
      if (!seenNormalized.has(normalized)) {
        allImages.push(img);
        seenNormalized.add(normalized);
      }
    });

    // Add variant images that are not already in main images
    cleanedVariantImages.forEach((img) => {
      const processed = processImageUrl(img) || img;
      const normalized = normalizeUrlForComparison(processed);
      if (!seenNormalized.has(normalized)) {
        allImages.push(img);
        seenNormalized.add(normalized);
      }
    });

    console.log('🖼️ [PRODUCT IMAGES] Final images count:', allImages.length);
    console.log('🖼️ [PRODUCT IMAGES] Main images:', cleanedMain.length);
    console.log('🖼️ [PRODUCT IMAGES] Variant images:', cleanedVariantImages.length);
    console.log(
      '🖼️ [PRODUCT IMAGES] Unique images after deduplication:',
      allImages.length
    );

    return allImages;
  }, [product]);

  // Fetch product function - defined outside useEffect to be accessible
  const fetchProduct = useCallback(async () => {
    if (!slug || RESERVED_ROUTES.includes(slug.toLowerCase())) return;

    try {
      setLoading(true);
      const currentLang = getStoredLanguage();

      // Try to fetch with current language first
      let data: Product;
      try {
        data = await apiClient.get<Product>(`/api/v1/products/${slug}`, {
          params: { lang: currentLang },
        });
      } catch (error: any) {
        // If 404 and not English, try fallback to English
        if (error?.status === 404 && currentLang !== 'en') {
          try {
            data = await apiClient.get<Product>(`/api/v1/products/${slug}`, {
              params: { lang: 'en' },
            });
          } catch (fallbackError) {
            // If English also fails, throw the original error
            throw error;
          }
        } else {
          // Re-throw if it's not a 404 or if we're already trying English
          throw error;
        }
      }

      setProduct(data);
      // Don't reset image index here - let the component handle it

      // Don't set initial variant here - let the component handle it
    } catch (error: any) {
      // If product not found (404), clear product state and show error
      if (error?.status === 404) {
        setProduct(null);
        // Optionally redirect to 404 page or show error message
        // router.push('/404');
      }
      // Don't clear existing product on other errors - keep showing the last successfully loaded product
      // This prevents losing the product when switching languages if translation doesn't exist
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // Initialize language from localStorage after mount to prevent hydration mismatch
  useEffect(() => {
    setLanguage(getStoredLanguage());
  }, []);

  useEffect(() => {
    if (!slug || RESERVED_ROUTES.includes(slug.toLowerCase())) return;
    if (RESERVED_ROUTES.includes(slug.toLowerCase())) {
      router.replace(`/${slug}`);
    }
  }, [slug, router]);

  useEffect(() => {
    if (!slug || RESERVED_ROUTES.includes(slug.toLowerCase())) return;

    fetchProduct();

    const handleCurrencyUpdate = () => setCurrency(getStoredCurrency());
    const handleLanguageUpdate = () => {
      setLanguage(getStoredLanguage());
      // Refetch product when language changes to update labels
      fetchProduct();
    };
    // Listen for currency rates updates to force re-render
    const handleCurrencyRatesUpdate = () => {
      // Force re-render by updating currency state
      setCurrency(getStoredCurrency());
    };
    window.addEventListener('currency-updated', handleCurrencyUpdate);
    window.addEventListener('language-updated', handleLanguageUpdate);
    window.addEventListener('currency-rates-updated', handleCurrencyRatesUpdate);
    return () => {
      window.removeEventListener('currency-updated', handleCurrencyUpdate);
      window.removeEventListener('language-updated', handleLanguageUpdate);
      window.removeEventListener(
        'currency-rates-updated',
        handleCurrencyRatesUpdate
      );
    };
  }, [slug, router, fetchProduct]);

  useEffect(() => {
    if (!product) return;
    const checkWishlist = () => {
      if (typeof window === 'undefined') return;
      try {
        const stored = localStorage.getItem(WISHLIST_KEY);
        const wishlist = stored ? JSON.parse(stored) : [];
        setIsInWishlist(wishlist.includes(product.id));
      } catch {
        setIsInWishlist(false);
      }
    };
    checkWishlist();
    window.addEventListener('wishlist-updated', checkWishlist);
    return () => window.removeEventListener('wishlist-updated', checkWishlist);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const checkCompare = () => {
      if (typeof window === 'undefined') return;
      try {
        const stored = localStorage.getItem(COMPARE_KEY);
        const compare = stored ? JSON.parse(stored) : [];
        setIsInCompare(compare.includes(product.id));
      } catch {
        setIsInCompare(false);
      }
    };
    checkCompare();
    window.addEventListener('compare-updated', checkCompare);
    return () => window.removeEventListener('compare-updated', checkCompare);
  }, [product?.id]);

  useEffect(() => {
    if (!product || !slug) return;

    const loadReviews = async () => {
      try {
        const data = await apiClient.get<Array<{ rating: number }>>(
          `/api/v1/products/${slug}/reviews`
        );
        setReviews(data || []);
      } catch (error: any) {
        // If 404, product might not have reviews yet - that's okay
        setReviews([]);
      }
    };

    loadReviews();

    // Listen for review updates
    const handleReviewUpdate = () => {
      loadReviews();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('review-updated', handleReviewUpdate);
      return () => window.removeEventListener('review-updated', handleReviewUpdate);
    }
  }, [product?.id, slug]);

  // Placeholder setters for image index and thumbnail start index
  // These will be provided by the component
  const setCurrentImageIndex = useCallback((index: number) => {
    // This will be overridden by the component
  }, []);

  const setThumbnailStartIndex = useCallback((index: number) => {
    // This will be overridden by the component
  }, []);

  return {
    product,
    loading,
    images,
    reviews,
    currency,
    language,
    isInWishlist,
    isInCompare,
    slug,
    variantIdFromUrl,
    setProduct,
    setCurrentImageIndex,
    setThumbnailStartIndex,
    setCurrency,
    setLanguage,
    setIsInWishlist,
    setIsInCompare,
    fetchProduct,
  };
}

