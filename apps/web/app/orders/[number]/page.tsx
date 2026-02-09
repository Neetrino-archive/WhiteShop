'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Button } from '@shop/ui';
import { apiClient } from '../../../lib/api-client';
import { formatPrice, formatPriceInCurrency, getStoredCurrency, convertPrice } from '../../../lib/currency';
import { useAuth } from '../../../lib/auth/AuthContext';
import { useTranslation } from '../../../lib/i18n-client';

// Helper function to get color hex/rgb from color name
const getColorValue = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    'beige': '#F5F5DC',
    'black': '#000000',
    'blue': '#0000FF',
    'brown': '#A52A2A',
    'gray': '#808080',
    'grey': '#808080',
    'green': '#008000',
    'red': '#FF0000',
    'white': '#FFFFFF',
    'yellow': '#FFFF00',
    'orange': '#FFA500',
    'pink': '#FFC0CB',
    'purple': '#800080',
    'navy': '#000080',
    'maroon': '#800000',
    'olive': '#808000',
    'teal': '#008080',
    'cyan': '#00FFFF',
    'magenta': '#FF00FF',
    'lime': '#00FF00',
    'silver': '#C0C0C0',
    'gold': '#FFD700',
  };
  
  const normalizedName = colorName.toLowerCase().trim();
  return colorMap[normalizedName] || '#CCCCCC'; // Default gray if color not found
};

interface OrderItem {
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

interface Order {
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

export default function OrderPage() {
  const params = useParams();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState(getStoredCurrency());
  const [calculatedShipping, setCalculatedShipping] = useState<number | null>(null);
  const [loadingShipping, setLoadingShipping] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    fetchOrder();

    const handleCurrencyUpdate = () => {
      setCurrency(getStoredCurrency());
    };

    window.addEventListener('currency-updated', handleCurrencyUpdate);

    return () => {
      window.removeEventListener('currency-updated', handleCurrencyUpdate);
    };
  }, [isLoggedIn, params.number, router]);

  async function fetchOrder() {
    try {
      setLoading(true);
      const response = await apiClient.get<Order>(`/api/v1/orders/${params.number}`);
      console.log('📦 [ORDER PAGE] Order data received:', {
        orderNumber: response.number,
        itemsCount: response.items.length,
        items: response.items.map(item => ({
          productTitle: item.productTitle,
          variantId: item.variantId,
          variantOptions: item.variantOptions,
          variantOptionsCount: item.variantOptions?.length || 0,
        })),
      });
      setOrder(response);
      
      // Calculate shipping based on city if delivery method
      if (response.shippingMethod === 'delivery' && response.shippingAddress?.city) {
        fetchShippingPrice(response.shippingAddress.city);
      } else {
        setCalculatedShipping(null);
      }
    } catch (error: any) {
      console.error('Error fetching order:', error);
      setError(error.message || t('orders.notFound.description'));
    } finally {
      setLoading(false);
    }
  }

  async function fetchShippingPrice(city: string) {
    if (!city || city.trim().length === 0) {
      setCalculatedShipping(0);
      return;
    }

    setLoadingShipping(true);
    try {
      console.log('🚚 [ORDER PAGE] Fetching delivery price for city:', city);
      const response = await apiClient.get<{ price: number }>('/api/v1/delivery/price', {
        params: {
          city: city.trim(),
          country: 'Armenia',
        },
      });
      console.log('✅ [ORDER PAGE] Delivery price fetched:', response.price);
      setCalculatedShipping(response.price);
    } catch (err: any) {
      console.error('❌ [ORDER PAGE] Error fetching delivery price:', err);
      // Set to 0 if error (no shipping for this city)
      setCalculatedShipping(0);
    } finally {
      setLoadingShipping(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('orders.notFound.title')}</h1>
          <p className="text-gray-600 mb-6">{error || t('orders.notFound.description')}</p>
          <Link href="/products">
            <Button variant="primary">{t('orders.buttons.continueShopping')}</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('orders.title').replace('{number}', order.number)}</h1>
        <p className="text-gray-600">
          {t('orders.placedOn').replace('{date}', new Date(order.createdAt).toLocaleDateString())}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('orders.orderStatus.title')}</h2>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.paymentStatus)}`}>
                {t('orders.orderStatus.payment').replace('{status}', order.paymentStatus)}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.fulfillmentStatus)}`}>
                {t('orders.orderStatus.fulfillment').replace('{status}', order.fulfillmentStatus)}
              </span>
            </div>
          </Card>

          {/* Order Items */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('orders.orderItems.title')}</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => {
                // Debug logging
                console.log(`🔍 [ORDER PAGE] Item ${index}:`, {
                  productTitle: item.productTitle,
                  variantId: item.variantId,
                  variantOptions: item.variantOptions,
                  variantOptionsCount: item.variantOptions?.length || 0,
                });

                // Get all variant options (not just color and size)
                const allOptions = item.variantOptions || [];
                
                // Helper to get attribute label (capitalize first letter)
                const getAttributeLabel = (key: string): string => {
                  if (key === 'color' || key === 'colour') return t('orders.itemDetails.color');
                  if (key === 'size') return t('orders.itemDetails.size');
                  // Capitalize first letter for other attributes
                  return key.charAt(0).toUpperCase() + key.slice(1);
                };

                // Helper to check if colors array is valid
                const getColorsArray = (colors: any): string[] => {
                  if (!colors) return [];
                  if (Array.isArray(colors)) return colors;
                  if (typeof colors === 'string') {
                    try {
                      const parsed = JSON.parse(colors);
                      return Array.isArray(parsed) ? parsed : [];
                    } catch {
                      return [];
                    }
                  }
                  return [];
                };
                
                return (
                  <div key={index} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                    {item.imageUrl && (
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img 
                          src={item.imageUrl} 
                          alt={item.productTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.productTitle}</h3>
                      
                      {/* Display all variation options */}
                      {allOptions.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-2 mb-2">
                          {allOptions.map((opt, optIndex) => {
                            if (!opt.attributeKey || !opt.value) return null;
                            
                            const attributeKey = opt.attributeKey.toLowerCase().trim();
                            const isColor = attributeKey === 'color' || attributeKey === 'colour';
                            const displayLabel = opt.label || opt.value;
                            const hasImage = opt.imageUrl && opt.imageUrl.trim() !== '';
                            const colors = getColorsArray(opt.colors);
                            const colorHex = colors.length > 0 ? colors[0] : (isColor ? getColorValue(opt.value) : null);
                            
                            return (
                              <div key={optIndex} className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">
                                  {getAttributeLabel(opt.attributeKey)}:
                                </span>
                                <div className="flex items-center gap-2">
                                  {/* Show image if available */}
                                  {hasImage ? (
                                    <img 
                                      src={opt.imageUrl!} 
                                      alt={displayLabel}
                                      className="w-6 h-6 rounded border border-gray-300 object-cover"
                                      onError={(e) => {
                                        // Fallback to color circle if image fails to load
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                  ) : isColor && colorHex ? (
                                    <div 
                                      className="w-5 h-5 rounded-full border border-gray-300"
                                      style={{ backgroundColor: colorHex }}
                                      title={displayLabel}
                                    />
                                  ) : null}
                                  <span className="text-sm text-gray-900 capitalize">
                                    {displayLabel}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-600">{t('orders.itemDetails.sku').replace('{sku}', item.sku)}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        {t('orders.itemDetails.quantity')
                          .replace('{qty}', item.quantity.toString())
                          .replace('{price}', (() => {
                            // Item price is stored in USD, convert to display currency
                            const priceAMD = convertPrice(item.price, 'USD', 'AMD');
                            const priceDisplay = currency === 'AMD' ? priceAMD : convertPrice(priceAMD, 'AMD', currency);
                            return formatPriceInCurrency(priceDisplay, currency);
                          })())
                          .replace('{total}', (() => {
                            // Item total is stored in USD, convert to display currency
                            const totalAMD = convertPrice(item.total, 'USD', 'AMD');
                            const totalDisplay = currency === 'AMD' ? totalAMD : convertPrice(totalAMD, 'AMD', currency);
                            return formatPriceInCurrency(totalDisplay, currency);
                          })())}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('orders.shippingAddress.title')}</h2>
              <div className="text-gray-600">
                {order.shippingAddress.firstName && order.shippingAddress.lastName && (
                  <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                )}
                {order.shippingAddress.addressLine1 && <p>{order.shippingAddress.addressLine1}</p>}
                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                {order.shippingAddress.city && (
                  <p>
                    {order.shippingAddress.city}
                    {order.shippingAddress.postalCode && `, ${order.shippingAddress.postalCode}`}
                  </p>
                )}
                {order.shippingAddress.countryCode && <p>{order.shippingAddress.countryCode}</p>}
                {order.shippingAddress.phone && <p className="mt-2">{t('orders.shippingAddress.phone').replace('{phone}', order.shippingAddress.phone)}</p>}
              </div>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('orders.orderSummary.title')}</h2>
            <div className="space-y-4 mb-6">
              {order.totals ? (
                <>
                  <div className="flex justify-between text-gray-600">
                    <span>{t('orders.orderSummary.subtotal')}</span>
                    <span>
                      {(() => {
                        // Subtotal is stored in USD, convert to display currency
                        const subtotalAMD = convertPrice(order.totals.subtotal, 'USD', 'AMD');
                        const subtotalDisplay = currency === 'AMD' ? subtotalAMD : convertPrice(subtotalAMD, 'AMD', currency);
                        return formatPriceInCurrency(subtotalDisplay, currency);
                      })()}
                    </span>
                  </div>
                  {order.totals.discount > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>{t('orders.orderSummary.discount')}</span>
                      <span>
                        -{(() => {
                          // Discount is stored in USD, convert to display currency
                          const discountAMD = convertPrice(order.totals.discount, 'USD', 'AMD');
                          const discountDisplay = currency === 'AMD' ? discountAMD : convertPrice(discountAMD, 'AMD', currency);
                          return formatPriceInCurrency(discountDisplay, currency);
                        })()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>{t('orders.orderSummary.shipping')}</span>
                    <span>
                      {order.shippingMethod === 'pickup' 
                        ? t('checkout.shipping.freePickup')
                        : loadingShipping
                          ? t('checkout.shipping.loading')
                          : (() => {
                              // Shipping is always stored in AMD, so we need to handle conversion properly
                              const shippingAMD = calculatedShipping !== null ? calculatedShipping : order.totals.shipping;
                              
                              // Convert AMD to display currency if needed
                              const shippingDisplay = currency === 'AMD' 
                                ? shippingAMD 
                                : convertPrice(shippingAMD, 'AMD', currency);
                              
                              return formatPriceInCurrency(shippingDisplay, currency) + (order.shippingAddress?.city ? ` (${order.shippingAddress.city})` : '');
                            })()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{t('orders.orderSummary.tax')}</span>
                    <span>
                      {(() => {
                        // Tax is stored in USD, convert to display currency
                        const taxAMD = convertPrice(order.totals.tax, 'USD', 'AMD');
                        const taxDisplay = currency === 'AMD' ? taxAMD : convertPrice(taxAMD, 'AMD', currency);
                        return formatPriceInCurrency(taxDisplay, currency);
                      })()}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>{t('orders.orderSummary.total')}</span>
                      <span>
                        {(() => {
                          // Total is stored as USD + AMD (mixed), so we need to recalculate it properly
                          // Subtotal and tax are in USD, shipping is in AMD
                          const subtotalAMD = convertPrice(order.totals.subtotal, 'USD', 'AMD');
                          const discountAMD = convertPrice(order.totals.discount, 'USD', 'AMD');
                          const shippingAMD = calculatedShipping !== null ? calculatedShipping : order.totals.shipping; // Already in AMD
                          const taxAMD = convertPrice(order.totals.tax, 'USD', 'AMD');
                          const totalAMD = subtotalAMD - discountAMD + shippingAMD + taxAMD;
                          
                          // Convert AMD to display currency if needed
                          const totalDisplay = currency === 'AMD' ? totalAMD : convertPrice(totalAMD, 'AMD', currency);
                          return formatPriceInCurrency(totalDisplay, currency);
                        })()}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-gray-600">{t('orders.orderSummary.loadingTotals')}</div>
              )}
            </div>

            <div className="space-y-3">
              <Link href="/products">
                <Button variant="primary" className="w-full">
                  {t('orders.buttons.continueShopping')}
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" className="w-full">
                  {t('orders.buttons.viewCart')}
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

