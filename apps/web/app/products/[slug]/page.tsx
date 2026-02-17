'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '../../../lib/api-client';
import { getStoredCurrency } from '../../../lib/currency';
import { t } from '../../../lib/i18n';
import { useAuth } from '../../../lib/auth/AuthContext';
import { RelatedProducts } from '../../../components/RelatedProducts';
import { ProductReviews } from '../../../components/ProductReviews';
import { ProductImageGallery } from './ProductImageGallery';
import { ProductInfoAndActions } from './ProductInfoAndActions';
import { useProductPage } from './useProductPage';
import type { ProductPageProps } from './types';

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  
  const {
    product,
    loading,
    images,
    currentImageIndex,
    setCurrentImageIndex,
    thumbnailStartIndex,
    setThumbnailStartIndex,
    currency,
    language,
    selectedColor,
    selectedSize,
    selectedAttributeValues,
    isAddingToCart,
    setIsAddingToCart,
    showMessage,
    setShowMessage,
    isInWishlist,
    isInCompare,
    quantity,
    reviews,
    averageRating,
    slug,
    attributeGroups,
    colorGroups,
    sizeGroups,
    currentVariant,
    price,
    originalPrice,
    compareAtPrice,
    discountPercent,
    maxQuantity,
    isOutOfStock,
    isVariationRequired,
    hasUnavailableAttributes,
    unavailableAttributes,
    canAddToCart,
    scrollToReviews,
    getOptionValue,
    adjustQuantity,
    handleColorSelect,
    handleSizeSelect,
    handleAttributeValueSelect,
    handleAddToWishlist,
    handleCompareToggle,
    getRequiredAttributesMessage,
  } = useProductPage(params);

  const handleAddToCart = async () => {
    if (!canAddToCart || !product || !currentVariant) return;
    setIsAddingToCart(true);
    try {
      if (!isLoggedIn) {
        const stored = localStorage.getItem('shop_cart_guest');
        const cart = stored ? JSON.parse(stored) : [];
        const existing = cart.find((i: any) => i.variantId === currentVariant.id);
        if (existing) existing.quantity += quantity;
        else cart.push({ productId: product.id, productSlug: product.slug, variantId: currentVariant.id, quantity });
        localStorage.setItem('shop_cart_guest', JSON.stringify(cart));
      } else {
        await apiClient.post('/api/v1/cart/items', { productId: product.id, variantId: currentVariant.id, quantity });
      }
      setShowMessage(`${t(language, 'product.addedToCart')} ${quantity} ${t(language, 'product.pcs')}`);
      window.dispatchEvent(new Event('cart-updated'));
    } catch (err) { 
      setShowMessage(t(language, 'product.errorAddingToCart')); 
    } finally { 
      setIsAddingToCart(false); 
      setTimeout(() => setShowMessage(null), 2000); 
    }
  };

  if (loading || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        {t(language, 'common.messages.loading')}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-start">
        <ProductImageGallery
          images={images}
          product={product}
          discountPercent={discountPercent}
          language={language}
          currentImageIndex={currentImageIndex}
          onImageIndexChange={setCurrentImageIndex}
          thumbnailStartIndex={thumbnailStartIndex}
          onThumbnailStartIndexChange={setThumbnailStartIndex}
        />

          <ProductInfoAndActions
            product={product}
            price={price}
            originalPrice={originalPrice}
            compareAtPrice={compareAtPrice}
            discountPercent={discountPercent}
            currency={currency}
            language={language}
            averageRating={averageRating}
            reviewsCount={reviews.length}
            quantity={quantity}
            maxQuantity={maxQuantity}
            isOutOfStock={isOutOfStock}
            isVariationRequired={isVariationRequired}
            hasUnavailableAttributes={hasUnavailableAttributes}
            unavailableAttributes={unavailableAttributes}
            canAddToCart={canAddToCart}
            isAddingToCart={isAddingToCart}
            isInWishlist={isInWishlist}
            isInCompare={isInCompare}
            showMessage={showMessage}
            isLoggedIn={isLoggedIn}
            currentVariant={currentVariant}
            attributeGroups={attributeGroups}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            selectedAttributeValues={selectedAttributeValues}
            colorGroups={colorGroups}
            sizeGroups={sizeGroups}
            onQuantityAdjust={adjustQuantity}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            onCompareToggle={handleCompareToggle}
            onScrollToReviews={scrollToReviews}
            onColorSelect={handleColorSelect}
            onSizeSelect={handleSizeSelect}
            onAttributeValueSelect={handleAttributeValueSelect}
            getOptionValue={getOptionValue}
            getRequiredAttributesMessage={getRequiredAttributesMessage}
          />
      </div>

      <div id="product-reviews" className="mt-24 scroll-mt-24">
        <ProductReviews productSlug={slug} productId={product.id} />
      </div>
      <div className="mt-16">
        <RelatedProducts categorySlug={product.categories?.[0]?.slug} currentProductId={product.id} />
      </div>
    </div>
  );
}
