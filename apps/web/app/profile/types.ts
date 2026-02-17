export interface Address {
  id?: string;
  _id?: string; // For backward compatibility
  firstName?: string;
  lastName?: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
  phone?: string;
  isDefault?: boolean;
}

export interface UserProfile {
  id: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  locale?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  addresses?: Address[];
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  variantId: string;
  productTitle: string;
  variantTitle: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
  imageUrl?: string;
  variantOptions?: Array<{
    attributeKey?: string;
    value?: string;
    label?: string;
    imageUrl?: string;
    colors?: string[] | any;
  }>;
}

export interface OrderDetails {
  id: string;
  number: string;
  status: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  items: OrderItem[];
  totals: {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
    currency: string;
  };
  customer?: {
    email?: string;
    phone?: string;
  };
  shippingAddress?: any;
  shippingMethod: string;
  trackingNumber?: string;
  timeline?: Array<{
    status: string;
    timestamp: string;
    note?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  stats: {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalSpent: number;
    addressesCount: number;
    ordersByStatus: Record<string, number>;
  };
  recentOrders: Array<{
    id: string;
    number: string;
    status: string;
    paymentStatus: string;
    fulfillmentStatus: string;
    total: number;
    subtotal?: number;
    discountAmount?: number;
    shippingAmount?: number;
    taxAmount?: number;
    currency: string;
    itemsCount: number;
    createdAt: string;
  }>;
}

export interface OrderListItem {
  id: string;
  number: string;
  status: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  total: number;
  subtotal?: number;
  discountAmount?: number;
  shippingAmount?: number;
  taxAmount?: number;
  currency: string;
  itemsCount: number;
  createdAt: string;
}

export type ProfileTab = 'dashboard' | 'personal' | 'addresses' | 'password' | 'orders';

export interface ProfileTabConfig {
  id: ProfileTab;
  label: string;
  icon: React.ReactNode;
}



