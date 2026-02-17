// Product page types and interfaces

export interface ProductPageProps {
  params: Promise<{ slug?: string }>;
}

export interface ProductMedia {
  url?: string;
  type?: string;
}

export interface VariantOption {
  attribute: string;
  value: string;
  key: string;
  valueId?: string; // New format: AttributeValue ID
  attributeId?: string; // New format: Attribute ID
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  originalPrice?: number | null;
  compareAtPrice?: number;
  stock: number;
  available: boolean;
  options: VariantOption[];
  productDiscount?: number | null;
  globalDiscount?: number | null;
  imageUrl?: string;
}

export interface ProductLabel {
  id: string;
  type: 'text' | 'percentage';
  value: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color: string | null;
}

export interface ProductAttribute {
  id: string;
  attribute: {
    id: string;
    key: string;
    name: string;
    values: Array<{
      id: string;
      value: string;
      label: string;
      imageUrl?: string | null;
      colors?: string[] | null;
    }>;
  };
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  media: ProductMedia[] | string[];
  variants: ProductVariant[];
  labels?: ProductLabel[];
  brand?: {
    id: string;
    name: string;
  };
  categories?: Array<{
    id: string;
    slug: string;
    title: string;
  }>;
  productAttributes?: ProductAttribute[];
  productDiscount?: number | null;
  globalDiscount?: number | null;
}

// Reserved routes that should not be treated as product slugs
export const RESERVED_ROUTES = ['admin', 'login', 'register', 'cart', 'checkout', 'profile', 'orders', 'wishlist', 'compare', 'categories', 'products', 'about', 'contact', 'delivery', 'shipping', 'returns', 'faq', 'support', 'stores', 'privacy', 'terms', 'cookies'];

export const WISHLIST_KEY = 'shop_wishlist';
export const COMPARE_KEY = 'shop_compare';



