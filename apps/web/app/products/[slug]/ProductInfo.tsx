'use client';

import { formatPrice } from '../../../lib/currency';
import type { CurrencyCode } from '../../../lib/currency';
import { getProductText } from '../../../lib/i18n';
import type { LanguageCode } from '../../../lib/language';
import type { Product } from './types';

interface ProductInfoProps {
  product: Product;
  price: number;
  originalPrice: number | null | undefined;
  compareAtPrice: number | undefined;
  discountPercent: number | null;
  currency: CurrencyCode;
  language: LanguageCode;
  averageRating: number;
  reviewsCount: number;
  scrollToReviews: () => void;
  t: (lang: LanguageCode, key: string) => string;
}

export function ProductInfo({
  product,
  price,
  originalPrice,
  compareAtPrice,
  discountPercent,
  currency,
  language,
  averageRating,
  reviewsCount,
  scrollToReviews,
  t,
}: ProductInfoProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {product.brand && <p className="text-sm text-gray-500 mb-2">{product.brand.name}</p>}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {getProductText(language, product.id, 'title') || product.title}
        </h1>
        <div className="mb-6">
          <div className="flex flex-col gap-1">
            {/* Discounted price with discount percentage */}
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-gray-900">{formatPrice(price, currency)}</p>
              {discountPercent && discountPercent > 0 && (
                <span className="text-lg font-semibold text-blue-600">
                  -{discountPercent}%
                </span>
              )}
            </div>
            {/* Original price below discounted price - full width, not inline */}
            {(originalPrice || (compareAtPrice && compareAtPrice > price)) && (
              <p className="text-xl text-gray-500 line-through decoration-gray-400 mt-1">
                {formatPrice(originalPrice || compareAtPrice || 0, currency)}
              </p>
            )}
          </div>
        </div>
        <div className="text-gray-600 mb-8 prose prose-sm" dangerouslySetInnerHTML={{ __html: getProductText(language, product.id, 'longDescription') || product.description || '' }} />

        <div className="mt-8 p-4 bg-white border border-gray-200 rounded-2xl space-y-4">
          {/* Rating Section */}
          <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {averageRating > 0 ? averageRating.toFixed(1) : '0.0'}
              </span>
            </div>
            <span 
              onClick={scrollToReviews}
              className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 hover:underline transition-colors"
            >
              ({reviewsCount} {reviewsCount === 1 ? t(language, 'common.reviews.review') : t(language, 'common.reviews.reviews')})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}



