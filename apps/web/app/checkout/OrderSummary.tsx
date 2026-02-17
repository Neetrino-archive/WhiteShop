'use client';

import { Card, Button } from '@shop/ui';
import { useTranslation } from '../../lib/i18n-client';
import { formatPriceInCurrency } from '../../lib/currency';

interface Cart {
  id: string;
  items: any[];
  totals: {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
    currency: string;
  };
  itemsCount: number;
}

interface OrderSummaryProps {
  cart: Cart | null;
  orderSummary: {
    subtotalDisplay: number;
    taxDisplay: number;
    shippingDisplay: number;
    totalDisplay: number;
  };
  currency: 'USD' | 'AMD' | 'EUR' | 'RUB' | 'GEL';
  shippingMethod: 'pickup' | 'delivery';
  shippingCity: string | undefined;
  loadingDeliveryPrice: boolean;
  deliveryPrice: number | null;
  error: string | null;
  isSubmitting: boolean;
  onPlaceOrder: (e?: React.FormEvent) => void;
}

export function OrderSummary({
  cart,
  orderSummary,
  currency,
  shippingMethod,
  shippingCity,
  loadingDeliveryPrice,
  deliveryPrice,
  error,
  isSubmitting,
  onPlaceOrder,
}: OrderSummaryProps) {
  const { t } = useTranslation();

  return (
    <div>
      <Card className="p-6 sticky top-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('checkout.orderSummary')}</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>{t('checkout.summary.subtotal')}</span>
            <span>{formatPriceInCurrency(orderSummary.subtotalDisplay, currency)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>{t('checkout.summary.shipping')}</span>
            <span>
              {shippingMethod === 'pickup' 
                ? t('checkout.shipping.freePickup')
                : loadingDeliveryPrice
                  ? t('checkout.shipping.loading')
                  : deliveryPrice !== null
                    ? formatPriceInCurrency(orderSummary.shippingDisplay, currency) + (shippingCity ? ` (${shippingCity})` : ` (${t('checkout.shipping.delivery')})`)
                    : t('checkout.shipping.enterCity')}
            </span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>{t('checkout.summary.tax')}</span>
            <span>{formatPriceInCurrency(orderSummary.taxDisplay, currency)}</span>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>{t('checkout.summary.total')}</span>
              <span>
                {formatPriceInCurrency(orderSummary.totalDisplay, currency)}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
          onClick={onPlaceOrder}
        >
          {isSubmitting ? t('checkout.buttons.processing') : t('checkout.buttons.placeOrder')}
        </Button>
      </Card>
    </div>
  );
}

