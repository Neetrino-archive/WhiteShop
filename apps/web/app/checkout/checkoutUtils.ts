import { apiClient } from '../../lib/api-client';
import { Cart, CartItem } from './useCheckout';

const CART_KEY = 'shop_cart_guest';

export async function fetchCartForGuest(): Promise<Cart | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = localStorage.getItem(CART_KEY);
  const guestCart: Array<{ productId: string; productSlug?: string; variantId: string; quantity: number }> = stored ? JSON.parse(stored) : [];

  if (guestCart.length === 0) {
    return null;
  }

  const itemsWithDetails: Array<{ item: CartItem | null; shouldRemove: boolean }> = await Promise.all(
    guestCart.map(async (item, index) => {
      try {
        if (!item.productSlug) {
          return { item: null, shouldRemove: true };
        }

        const productData = await apiClient.get<{
          id: string;
          slug: string;
          translations?: Array<{ title: string; locale: string }>;
          media?: Array<{ url?: string; src?: string } | string>;
          variants?: Array<{
            _id: string;
            id: string;
            sku: string;
            price: number;
          }>;
        }>(`/api/v1/products/${item.productSlug}`);

        const variant = productData.variants?.find(v => 
          (v._id?.toString() || v.id) === item.variantId
        ) || productData.variants?.[0];

        if (!variant) {
          return { item: null, shouldRemove: true };
        }

        const translation = productData.translations?.[0];
        const imageUrl = productData.media?.[0] 
          ? (typeof productData.media[0] === 'string' 
              ? productData.media[0] 
              : productData.media[0].url || productData.media[0].src)
          : null;

        return {
          item: {
            id: `${item.productId}-${item.variantId}-${index}`,
            variant: {
              id: variant._id?.toString() || variant.id,
              sku: variant.sku || '',
              product: {
                id: productData.id,
                title: translation?.title || 'Product',
                slug: productData.slug,
                image: imageUrl,
              },
            },
            quantity: item.quantity,
            price: variant.price,
            total: variant.price * item.quantity,
          },
          shouldRemove: false,
        };
      } catch (error: unknown) {
        const err = error as { status?: number; statusCode?: number };
        if (err?.status === 404 || err?.statusCode === 404) {
          return { item: null, shouldRemove: true };
        }
        console.error(`Error fetching product ${item.productId}:`, error);
        return { item: null, shouldRemove: false };
      }
    })
  );

  const itemsToRemove = itemsWithDetails
    .map((result, index) => result.shouldRemove ? index : -1)
    .filter(index => index !== -1);
  
  if (itemsToRemove.length > 0) {
    const updatedCart = guestCart.filter((_, index) => !itemsToRemove.includes(index));
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  }

  const validItems = itemsWithDetails
    .map(result => result.item)
    .filter((item): item is CartItem => item !== null);
  
  if (validItems.length === 0) {
    return null;
  }

  const subtotal = validItems.reduce((sum, item) => sum + item.total, 0);
  const itemsCount = validItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    id: 'guest-cart',
    items: validItems,
    totals: {
      subtotal,
      discount: 0,
      shipping: 0,
      tax: 0,
      total: subtotal,
      currency: 'AMD',
    },
    itemsCount,
  };
}

export function clearGuestCart(): void {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event('cart-updated'));
}



