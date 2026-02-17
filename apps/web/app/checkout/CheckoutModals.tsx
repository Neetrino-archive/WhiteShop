'use client';

import { Button, Input } from '@shop/ui';
import { UseFormRegister, UseFormSetValue, UseFormHandleSubmit, FieldErrors } from 'react-hook-form';
import { useTranslation } from '../../lib/i18n-client';
import { formatPriceInCurrency } from '../../lib/currency';

type CheckoutFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingMethod: 'pickup' | 'delivery';
  paymentMethod: 'idram' | 'arca' | 'cash_on_delivery';
  shippingAddress?: string;
  shippingCity?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  cardHolderName?: string;
};

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

interface CheckoutModalsProps {
  showShippingModal: boolean;
  setShowShippingModal: (show: boolean) => void;
  showCardModal: boolean;
  setShowCardModal: (show: boolean) => void;
  register: UseFormRegister<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
  handleSubmit: UseFormHandleSubmit<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  isSubmitting: boolean;
  shippingMethod: 'pickup' | 'delivery';
  paymentMethod: 'idram' | 'arca' | 'cash_on_delivery';
  shippingCity: string | undefined;
  cart: Cart | null;
  orderSummary: {
    subtotalDisplay: number;
    taxDisplay: number;
    shippingDisplay: number;
    totalDisplay: number;
  };
  currency: 'USD' | 'AMD' | 'EUR' | 'RUB' | 'GEL';
  loadingDeliveryPrice: boolean;
  deliveryPrice: number | null;
  logoErrors: Record<string, boolean>;
  setLogoErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  isLoggedIn: boolean;
  onSubmit: (data: CheckoutFormData) => void;
}

export function CheckoutModals({
  showShippingModal,
  setShowShippingModal,
  showCardModal,
  setShowCardModal,
  register,
  setValue,
  handleSubmit,
  errors,
  isSubmitting,
  shippingMethod,
  paymentMethod,
  shippingCity,
  cart,
  orderSummary,
  currency,
  loadingDeliveryPrice,
  deliveryPrice,
  logoErrors,
  setLogoErrors,
  isLoggedIn,
  onSubmit,
}: CheckoutModalsProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Shipping Address Modal for Guest Checkout */}
      {showShippingModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => {
            console.log('[Checkout] Modal backdrop clicked, closing modal');
            setShowShippingModal(false);
          }}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => {
              e.stopPropagation();
              console.log('[Checkout] Modal content clicked');
            }}
            style={{ zIndex: 10000 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {shippingMethod === 'delivery' ? t('checkout.modals.completeOrder') : t('checkout.modals.confirmOrder')}
              </h2>
              <button
                onClick={() => setShowShippingModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={t('checkout.modals.closeModal')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900">{t('checkout.contactInformation')}</h3>
              <div>
                <Input
                  label={t('checkout.form.email')}
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Input
                  label={t('checkout.form.phone')}
                  type="tel"
                  placeholder={t('checkout.placeholders.phone')}
                  {...register('phone')}
                  error={errors.phone?.message}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Error messages for contact info */}
            {(errors.email || errors.phone) && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">
                  {errors.email?.message || errors.phone?.message}
                </p>
              </div>
            )}

            {shippingMethod === 'delivery' ? (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('checkout.shippingAddress')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        label={t('checkout.form.address')}
                        type="text"
                        placeholder={t('checkout.placeholders.address')}
                        {...register('shippingAddress')}
                        error={errors.shippingAddress?.message}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Input
                        label={t('checkout.form.city')}
                        type="text"
                        placeholder={t('checkout.placeholders.city')}
                        {...register('shippingCity')}
                        error={errors.shippingCity?.message}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                {(errors.shippingAddress || errors.shippingCity) && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">
                      {errors.shippingAddress?.message || 
                       errors.shippingCity?.message}
                    </p>
                  </div>
                )}

                {/* Payment Details - Only show for card payments */}
                {(paymentMethod === 'arca' || paymentMethod === 'idram') && (
                  <div className="space-y-4 mb-6 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('checkout.payment.paymentDetails')} ({paymentMethod === 'idram' ? t('checkout.payment.idram') : t('checkout.payment.arca')})
                    </h3>
                    <div>
                    <Input
                      label={t('checkout.form.cardNumber')}
                      type="text"
                      placeholder={t('checkout.placeholders.cardNumber')}
                      maxLength={19}
                      {...register('cardNumber')}
                      error={errors.cardNumber?.message}
                      disabled={isSubmitting}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\s/g, '');
                        value = value.replace(/(.{4})/g, '$1 ').trim();
                        setValue('cardNumber', value);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        label={t('checkout.form.expiryDate')}
                        type="text"
                        placeholder={t('checkout.placeholders.expiryDate')}
                        maxLength={5}
                        {...register('cardExpiry')}
                        error={errors.cardExpiry?.message}
                        disabled={isSubmitting}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.substring(0, 2) + '/' + value.substring(2, 4);
                          }
                          setValue('cardExpiry', value);
                        }}
                      />
                    </div>
                    <div>
                      <Input
                        label={t('checkout.form.cvv')}
                        type="text"
                        placeholder={t('checkout.placeholders.cvv')}
                        maxLength={4}
                        {...register('cardCvv')}
                        error={errors.cardCvv?.message}
                        disabled={isSubmitting}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setValue('cardCvv', value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      label={t('checkout.form.cardHolderName')}
                      type="text"
                      placeholder={t('checkout.placeholders.cardHolderName')}
                      {...register('cardHolderName')}
                      error={errors.cardHolderName?.message}
                      disabled={isSubmitting}
                    />
                  </div>
                  </div>
                )}

                {/* Cash on Delivery Info */}
                {paymentMethod === 'cash_on_delivery' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 mt-6">
                    <p className="text-sm text-green-800">
                      <strong>{t('checkout.payment.cashOnDelivery')}:</strong> {t('checkout.messages.cashOnDeliveryInfo')}
                    </p>
                  </div>
                )}

                {cart && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t('checkout.summary.items')}:</span>
                      <span className="font-medium">{cart.itemsCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t('checkout.summary.subtotal')}:</span>
                      <span className="font-medium">{formatPriceInCurrency(orderSummary.subtotalDisplay, currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t('checkout.summary.shipping')}:</span>
                      <span className="font-medium">
                        {loadingDeliveryPrice
                          ? t('checkout.shipping.loading')
                          : deliveryPrice !== null
                            ? formatPriceInCurrency(orderSummary.shippingDisplay, currency) + (shippingCity ? ` (${shippingCity})` : ` (${t('checkout.shipping.delivery')})`)
                            : shippingMethod === 'delivery' ? t('checkout.shipping.enterCity') : t('checkout.shipping.freePickup')}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">{t('checkout.summary.total')}:</span>
                        <span className="font-bold text-gray-900">
                          {formatPriceInCurrency(orderSummary.totalDisplay, currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>{t('checkout.shipping.storePickup')}:</strong> {t('checkout.messages.storePickupInfo')}
                  </p>
                </div>

                {/* Payment Details for Pickup - Only show for card payments */}
                {(paymentMethod === 'arca' || paymentMethod === 'idram') && (
                  <div className="space-y-4 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('checkout.payment.paymentDetails')} ({paymentMethod === 'idram' ? t('checkout.payment.idram') : t('checkout.payment.arca')})
                    </h3>
                    <div>
                      <Input
                        label={t('checkout.form.cardNumber')}
                        type="text"
                        placeholder={t('checkout.placeholders.cardNumber')}
                        maxLength={19}
                        {...register('cardNumber')}
                        error={errors.cardNumber?.message}
                        disabled={isSubmitting}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\s/g, '');
                          value = value.replace(/(.{4})/g, '$1 ').trim();
                          setValue('cardNumber', value);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          label={t('checkout.form.expiryDate')}
                          type="text"
                          placeholder={t('checkout.placeholders.expiryDate')}
                          maxLength={5}
                          {...register('cardExpiry')}
                          error={errors.cardExpiry?.message}
                          disabled={isSubmitting}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.substring(0, 2) + '/' + value.substring(2, 4);
                            }
                            setValue('cardExpiry', value);
                          }}
                        />
                      </div>
                      <div>
                        <Input
                          label={t('checkout.form.cvv')}
                          type="text"
                          placeholder={t('checkout.placeholders.cvv')}
                          maxLength={4}
                          {...register('cardCvv')}
                          error={errors.cardCvv?.message}
                          disabled={isSubmitting}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setValue('cardCvv', value);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Input
                        label={t('checkout.form.cardHolderName')}
                        type="text"
                        placeholder={t('checkout.placeholders.cardHolderName')}
                        {...register('cardHolderName')}
                        error={errors.cardHolderName?.message}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                )}

                {/* Cash on Delivery Info for Pickup */}
                {paymentMethod === 'cash_on_delivery' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-green-800">
                      <strong>{t('checkout.payment.cashOnDelivery')}:</strong> {t('checkout.messages.cashOnDeliveryPickup')}
                    </p>
                  </div>
                )}

                {cart && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t('checkout.summary.items')}:</span>
                      <span className="font-medium">{cart.itemsCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t('checkout.summary.subtotal')}:</span>
                      <span className="font-medium">{formatPriceInCurrency(orderSummary.subtotalDisplay, currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t('checkout.summary.shipping')}:</span>
                      <span className="font-medium">{t('checkout.shipping.freePickup')}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">{t('checkout.summary.total')}:</span>
                        <span className="font-bold text-gray-900">
                          {formatPriceInCurrency(orderSummary.totalDisplay, currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowShippingModal(false)}
                disabled={isSubmitting}
              >
                {t('checkout.buttons.cancel')}
              </Button>
              <Button
                type="button"
                variant="primary"
                className="flex-1"
                onClick={handleSubmit(
                  (data) => {
                    setShowShippingModal(false);
                    onSubmit(data);
                  },
                  (errors) => {
                    console.log('[Checkout Modal] Validation errors:', errors);
                    // Keep modal open if there are errors - scroll to first error
                    const firstErrorField = Object.keys(errors)[0];
                    if (firstErrorField) {
                      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
                      if (errorElement) {
                        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }
                  }
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('checkout.buttons.processing') : t('checkout.buttons.placeOrder')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ArCa Card Details Modal */}
      {showCardModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => {
            console.log('[Checkout] Card modal backdrop clicked, closing modal');
            setShowCardModal(false);
          }}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => {
              e.stopPropagation();
              console.log('[Checkout] Card modal content clicked');
            }}
            style={{ zIndex: 10000 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('checkout.modals.cardDetails').replace('{method}', paymentMethod === 'arca' ? t('checkout.payment.arca') : t('checkout.payment.idram'))}
              </h2>
              <button
                onClick={() => setShowCardModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={t('checkout.modals.closeModal')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Payment Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-16 h-10 flex-shrink-0 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                  {logoErrors[paymentMethod] ? (
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  ) : (
                    <img
                      src={paymentMethod === 'arca' ? '/assets/payments/arca.svg' : '/assets/payments/idram.svg'}
                      alt={paymentMethod === 'arca' ? 'ArCa' : 'Idram'}
                      className="w-full h-full object-contain p-1"
                      loading="lazy"
                      onError={() => {
                        setLogoErrors((prev) => ({ ...prev, [paymentMethod]: true }));
                      }}
                    />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {paymentMethod === 'arca' ? t('checkout.payment.arca') : t('checkout.payment.idram')} {t('checkout.payment.paymentDetails')}
                  </div>
                  <div className="text-sm text-gray-600">{t('checkout.payment.enterCardDetails')}</div>
                </div>
              </div>

              <div>
                <Input
                  label={t('checkout.form.cardNumber')}
                  type="text"
                  placeholder={t('checkout.placeholders.cardNumber')}
                  maxLength={19}
                  {...register('cardNumber')}
                  error={errors.cardNumber?.message}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\s/g, '');
                    value = value.replace(/(.{4})/g, '$1 ').trim();
                    setValue('cardNumber', value);
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    label={t('checkout.form.expiryDate')}
                    type="text"
                    placeholder={t('checkout.placeholders.expiryDate')}
                    maxLength={5}
                    {...register('cardExpiry')}
                    error={errors.cardExpiry?.message}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4);
                      }
                      setValue('cardExpiry', value);
                    }}
                  />
                </div>
                <div>
                  <Input
                    label={t('checkout.form.cvv')}
                    type="text"
                    placeholder={t('checkout.placeholders.cvv')}
                    maxLength={4}
                    {...register('cardCvv')}
                    error={errors.cardCvv?.message}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setValue('cardCvv', value);
                    }}
                  />
                </div>
              </div>
              <div>
                <Input
                  label={t('checkout.form.cardHolderName')}
                  type="text"
                  placeholder={t('checkout.placeholders.cardHolderName')}
                  {...register('cardHolderName')}
                  error={errors.cardHolderName?.message}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Error messages for card details */}
            {(errors.cardNumber || errors.cardExpiry || errors.cardCvv || errors.cardHolderName) && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">
                  {errors.cardNumber?.message || 
                   errors.cardExpiry?.message || 
                   errors.cardCvv?.message || 
                   errors.cardHolderName?.message}
                </p>
              </div>
            )}

            {/* Order Summary */}
            {cart && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">{t('checkout.orderSummary')}</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('checkout.summary.items')}:</span>
                  <span className="font-medium">{cart.itemsCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('checkout.summary.subtotal')}:</span>
                  <span className="font-medium">{formatPriceInCurrency(orderSummary.subtotalDisplay, currency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('checkout.summary.shipping')}:</span>
                  <span className="font-medium">
                    {shippingMethod === 'pickup' 
                      ? t('checkout.shipping.freePickup')
                      : loadingDeliveryPrice
                        ? t('checkout.shipping.loading')
                        : deliveryPrice !== null
                          ? formatPriceInCurrency(orderSummary.shippingDisplay, currency) + (shippingCity ? ` (${shippingCity})` : ` (${t('checkout.shipping.delivery')})`)
                          : t('checkout.shipping.enterCity')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('checkout.summary.tax')}:</span>
                  <span className="font-medium">{formatPriceInCurrency(orderSummary.taxDisplay, currency)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">{t('checkout.summary.total')}:</span>
                    <span className="font-bold text-gray-900">
                      {formatPriceInCurrency(orderSummary.totalDisplay, currency)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowCardModal(false)}
                disabled={isSubmitting}
              >
                {t('checkout.buttons.cancel')}
              </Button>
              <Button
                type="button"
                variant="primary"
                className="flex-1"
                onClick={handleSubmit(
                  (data) => {
                    setShowCardModal(false);
                    // If guest checkout, show shipping modal first, otherwise submit
                    if (!isLoggedIn) {
                      setShowShippingModal(true);
                    } else {
                      onSubmit(data);
                    }
                  },
                  (errors) => {
                    console.log('[Checkout Card Modal] Validation errors:', errors);
                    // Keep modal open if there are errors - scroll to first error
                    const firstErrorField = Object.keys(errors)[0];
                    if (firstErrorField) {
                      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
                      if (errorElement) {
                        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }
                  }
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('checkout.buttons.processing') : t('checkout.buttons.continueToPayment')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

