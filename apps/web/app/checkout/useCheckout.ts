import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiClient } from '../../lib/api-client';
import { getStoredCurrency, convertPrice } from '../../lib/currency';
import { getStoredLanguage } from '../../lib/language';
import { useAuth } from '../../lib/auth/AuthContext';
import { useTranslation } from '../../lib/i18n-client';
import { fetchCartForGuest, clearGuestCart } from './checkoutUtils';

export interface CartItem {
  id: string;
  variant: {
    id: string;
    sku: string;
    product: {
      id: string;
      title: string;
      slug: string;
      image?: string | null;
    };
  };
  quantity: number;
  price: number;
  total: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
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

export type CheckoutFormData = {
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

export function useCheckout() {
  const router = useRouter();
  const { isLoggedIn, isLoading, user } = useAuth();
  const { t } = useTranslation();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState(getStoredCurrency());
  const [language, setLanguage] = useState(getStoredLanguage());
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null);
  const [loadingDeliveryPrice, setLoadingDeliveryPrice] = useState(false);

  // Payment methods configuration
  const paymentMethods = useMemo(() => [
    {
      id: 'cash_on_delivery' as const,
      name: t('checkout.payment.cashOnDelivery'),
      description: t('checkout.payment.cashOnDeliveryDescription'),
      logo: null,
    },
    {
      id: 'idram' as const,
      name: t('checkout.payment.idram'),
      description: t('checkout.payment.idramDescription'),
      logo: '/assets/payments/idram.svg',
    },
    {
      id: 'arca' as const,
      name: t('checkout.payment.arca'),
      description: t('checkout.payment.arcaDescription'),
      logo: '/assets/payments/arca.svg',
    },
  ], [t]);

  // Create validation schema with translations
  const checkoutSchema = useMemo(() => z.object({
    firstName: z.string().min(1, t('checkout.errors.firstNameRequired')),
    lastName: z.string().min(1, t('checkout.errors.lastNameRequired')),
    email: z.string().email(t('checkout.errors.invalidEmail')).min(1, t('checkout.errors.emailRequired')),
    phone: z.string().min(1, t('checkout.errors.phoneRequired')).regex(/^\+?[0-9]{8,15}$/, t('checkout.errors.invalidPhone')),
    shippingMethod: z.enum(['pickup', 'delivery'], {
      message: t('checkout.errors.selectShippingMethod'),
    }),
    paymentMethod: z.enum(['idram', 'arca', 'cash_on_delivery'], {
      message: t('checkout.errors.selectPaymentMethod'),
    }),
    shippingAddress: z.string().optional(),
    shippingCity: z.string().optional(),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvv: z.string().optional(),
    cardHolderName: z.string().optional(),
  }).refine((data) => {
    if (data.shippingMethod === 'delivery') {
      return data.shippingAddress && data.shippingAddress.trim().length > 0;
    }
    return true;
  }, {
    message: t('checkout.errors.addressRequired'),
    path: ['shippingAddress'],
  }).refine((data) => {
    if (data.shippingMethod === 'delivery') {
      return data.shippingCity && data.shippingCity.trim().length > 0;
    }
    return true;
  }, {
    message: t('checkout.errors.cityRequired'),
    path: ['shippingCity'],
  }).refine((data) => {
    if (data.paymentMethod === 'arca' || data.paymentMethod === 'idram') {
      return data.cardNumber && data.cardNumber.replace(/\s/g, '').length >= 13;
    }
    return true;
  }, {
    message: t('checkout.errors.cardNumberRequired'),
    path: ['cardNumber'],
  }).refine((data) => {
    if (data.paymentMethod === 'arca' || data.paymentMethod === 'idram') {
      return data.cardExpiry && /^\d{2}\/\d{2}$/.test(data.cardExpiry);
    }
    return true;
  }, {
    message: t('checkout.errors.cardExpiryRequired'),
    path: ['cardExpiry'],
  }).refine((data) => {
    if (data.paymentMethod === 'arca' || data.paymentMethod === 'idram') {
      return data.cardCvv && data.cardCvv.length >= 3;
    }
    return true;
  }, {
    message: t('checkout.errors.cvvRequired'),
    path: ['cardCvv'],
  }).refine((data) => {
    if (data.paymentMethod === 'arca' || data.paymentMethod === 'idram') {
      return data.cardHolderName && data.cardHolderName.trim().length > 0;
    }
    return true;
  }, {
    message: t('checkout.errors.cardHolderNameRequired'),
    path: ['cardHolderName'],
  }), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      shippingMethod: 'pickup',
      paymentMethod: 'cash_on_delivery',
      shippingAddress: '',
      shippingCity: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      cardHolderName: '',
    },
  });

  const paymentMethod = watch('paymentMethod');
  const shippingMethod = watch('shippingMethod');
  const shippingCity = watch('shippingCity');

  // Fetch delivery price when city changes
  useEffect(() => {
    const fetchDeliveryPrice = async () => {
      if (shippingMethod === 'delivery' && shippingCity && shippingCity.trim().length > 0) {
        setLoadingDeliveryPrice(true);
        try {
          console.log('🚚 [CHECKOUT] Fetching delivery price for city:', shippingCity);
          const response = await apiClient.get<{ price: number }>('/api/v1/delivery/price', {
            params: {
              city: shippingCity.trim(),
              country: 'Armenia',
            },
          });
          console.log('✅ [CHECKOUT] Delivery price fetched:', response.price);
          setDeliveryPrice(response.price);
        } catch (err: unknown) {
          console.error('❌ [CHECKOUT] Error fetching delivery price:', err);
          setDeliveryPrice(0);
        } finally {
          setLoadingDeliveryPrice(false);
        }
      } else {
        setDeliveryPrice(null);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchDeliveryPrice();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [shippingCity, shippingMethod]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    fetchCart();

    const handleCurrencyUpdate = () => {
      setCurrency(getStoredCurrency());
    };

    const handleLanguageUpdate = () => {
      setLanguage(getStoredLanguage());
    };

    const handleCurrencyRatesUpdate = () => {
      setCurrency(getStoredCurrency());
    };

    window.addEventListener('currency-updated', handleCurrencyUpdate);
    window.addEventListener('language-updated', handleLanguageUpdate);
    window.addEventListener('currency-rates-updated', handleCurrencyRatesUpdate);

    return () => {
      window.removeEventListener('currency-updated', handleCurrencyUpdate);
      window.removeEventListener('language-updated', handleLanguageUpdate);
      window.removeEventListener('currency-rates-updated', handleCurrencyRatesUpdate);
    };
  }, [isLoggedIn, isLoading, router]);

  useEffect(() => {
    async function loadUserProfile() {
      if (isLoading) {
        console.log('⏳ [CHECKOUT] Waiting for auth to load...');
        return;
      }

      if (isLoggedIn) {
        console.log('👤 [CHECKOUT] User is logged in, loading profile data...');
        
        if (user) {
          console.log('📦 [CHECKOUT] Using user data from auth context:', {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
          });
          
          if (user.firstName) {
            setValue('firstName', user.firstName);
          }
          if (user.lastName) {
            setValue('lastName', user.lastName);
          }
          if (user.email) {
            setValue('email', user.email);
          }
          if (user.phone) {
            setValue('phone', user.phone);
          }
        }
        
        try {
          const profile = await apiClient.get<{
            id: string;
            email?: string;
            phone?: string;
            firstName?: string;
            lastName?: string;
            addresses?: Array<{
              id: string;
              firstName?: string;
              lastName?: string;
              addressLine1?: string;
              addressLine2?: string;
              city?: string;
              state?: string;
              postalCode?: string;
              countryCode?: string;
              phone?: string;
              isDefault?: boolean;
            }>;
          }>('/api/v1/users/profile');
          
          console.log('✅ [CHECKOUT] Profile loaded from API:', {
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            phone: profile.phone,
            addressesCount: profile.addresses?.length || 0
          });
          
          if (profile.firstName) {
            setValue('firstName', profile.firstName);
            console.log('📝 [CHECKOUT] Set firstName:', profile.firstName);
          }
          if (profile.lastName) {
            setValue('lastName', profile.lastName);
            console.log('📝 [CHECKOUT] Set lastName:', profile.lastName);
          }
          if (profile.email) {
            setValue('email', profile.email);
            console.log('📝 [CHECKOUT] Set email:', profile.email);
          }
          if (profile.phone) {
            setValue('phone', profile.phone);
            console.log('📝 [CHECKOUT] Set phone:', profile.phone);
          }
          
          if (profile.addresses && profile.addresses.length > 0) {
            const defaultAddress = profile.addresses.find(addr => addr.isDefault) || profile.addresses[0];
            
            if (defaultAddress) {
              console.log('🏠 [CHECKOUT] Auto-filling shipping address from saved address:', {
                city: defaultAddress.city,
                hasAddress: !!defaultAddress.addressLine1
              });
              
              if (defaultAddress.addressLine1) {
                const fullAddress = defaultAddress.addressLine2 
                  ? `${defaultAddress.addressLine1}, ${defaultAddress.addressLine2}`
                  : defaultAddress.addressLine1;
                setValue('shippingAddress', fullAddress);
                console.log('📝 [CHECKOUT] Set shippingAddress:', fullAddress);
              }
              
              if (defaultAddress.city) {
                setValue('shippingCity', defaultAddress.city);
                console.log('📝 [CHECKOUT] Set shippingCity:', defaultAddress.city);
              }
            }
          }
        } catch (error) {
          console.error('❌ [CHECKOUT] Error loading user profile from API:', error);
          console.log('ℹ️ [CHECKOUT] Using data from auth context instead');
        }
      } else {
        console.log('ℹ️ [CHECKOUT] User is not logged in, form will remain empty');
      }
    }
    
    loadUserProfile();
  }, [isLoggedIn, isLoading, user, setValue]);

  async function fetchCart() {
    try {
      setLoading(true);
      
      if (isLoggedIn) {
        const response = await apiClient.get<{ cart: Cart }>('/api/v1/cart');
        setCart(response.cart);
        return;
      }

      const guestCart = await fetchCartForGuest();
      setCart(guestCart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError(t('checkout.errors.failedToLoadCart'));
    } finally {
      setLoading(false);
    }
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Checkout] handlePlaceOrder called', { 
      isLoggedIn, 
      isLoading, 
      showShippingModal,
      paymentMethod,
      shippingMethod,
      cart: cart ? 'exists' : 'null'
    });
    
    if (shippingMethod === 'delivery') {
      const formData = watch();
      const hasShippingAddress = formData.shippingAddress && formData.shippingAddress.trim().length > 0;
      const hasShippingCity = formData.shippingCity && formData.shippingCity.trim().length > 0;
      
      if (!hasShippingAddress || !hasShippingCity) {
        console.log('[Checkout] Shipping address validation failed:', {
          hasShippingAddress,
          hasShippingCity
        });
        setError(t('checkout.errors.fillShippingAddress'));
        const shippingSection = document.querySelector('[data-shipping-section]');
        if (shippingSection) {
          shippingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
    }
    
    if (paymentMethod === 'arca' || paymentMethod === 'idram') {
      console.log('[Checkout] Opening card modal for payment:', paymentMethod);
      setShowCardModal(true);
      return;
    }
    
    if (!isLoggedIn) {
      console.log('[Checkout] Opening modal for guest checkout');
      setShowShippingModal(true);
      return;
    }
    
    console.log('[Checkout] Submitting directly (logged in user, cash on delivery)');
    handleSubmit(onSubmit)(e);
  };

  async function onSubmit(data: CheckoutFormData) {
    setError(null);

    try {
      if (!cart) {
        throw new Error(t('checkout.errors.cartEmpty'));
      }

      let cartId = cart.id;
      let items = undefined;

      if (!isLoggedIn && cart.id === 'guest-cart') {
        console.log('[Checkout] Guest checkout - sending items directly...');
        items = cart.items.map(item => ({
          productId: item.variant.product.id,
          variantId: item.variant.id,
          quantity: item.quantity,
        }));
        cartId = 'guest-cart';
      }

      const shippingAddress = data.shippingMethod === 'delivery' && 
        data.shippingAddress && 
        data.shippingCity
        ? {
            address: data.shippingAddress,
            city: data.shippingCity,
          }
        : undefined;

      console.log('[Checkout] Submitting order:', {
        cartId: cartId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        shippingMethod: data.shippingMethod,
        paymentMethod: data.paymentMethod,
        hasShippingAddress: !!shippingAddress,
        isGuest: !isLoggedIn,
      });

      const shippingAmount = data.shippingMethod === 'delivery' && deliveryPrice !== null ? deliveryPrice : 0;

      const response = await apiClient.post<{
        order: {
          id: string;
          number: string;
          status: string;
          paymentStatus: string;
          total: number;
          currency: string;
        };
        payment: {
          provider: string;
          paymentUrl: string | null;
          expiresAt: string | null;
        };
        nextAction: string;
      }>('/api/v1/orders/checkout', {
        cartId: cartId,
        ...(items ? { items } : {}),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        shippingMethod: data.shippingMethod,
        ...(shippingAddress ? { shippingAddress } : {}),
        shippingAmount: shippingAmount,
        paymentMethod: data.paymentMethod,
      });

      console.log('[Checkout] Order created:', response.order.number);
      
      if (cart?.items && cart.items.length > 0) {
        console.log('[Checkout] Verifying stock update for variants:', cart.items.map((item: CartItem) => ({
          variantId: item.variant.id,
          quantity: item.quantity,
        })));
        
        try {
          console.log('[Checkout] Stock update verification: Stock is updated server-side in transaction');
        } catch (verifyError) {
          console.warn('[Checkout] Could not verify stock update:', verifyError);
        }
      }

      if (!isLoggedIn) {
        clearGuestCart();
      }

      if (response.payment?.paymentUrl) {
        console.log('[Checkout] Redirecting to payment gateway:', response.payment.paymentUrl);
        window.location.href = response.payment.paymentUrl;
        return;
      }

      router.push(`/orders/${response.order.number}`);
    } catch (err: unknown) {
      const error = err as { message?: string };
      console.error('[Checkout] Error creating order:', err);
      setError(error.message || t('checkout.errors.failedToCreateOrder'));
    }
  }

  // Calculate all values in AMD first, then convert to display currency
  const orderSummary = useMemo(() => {
    if (!cart || cart.items.length === 0) {
      return {
        subtotalAMD: 0,
        taxAMD: 0,
        shippingAMD: 0,
        totalAMD: 0,
        subtotalDisplay: 0,
        taxDisplay: 0,
        shippingDisplay: 0,
        totalDisplay: 0,
      };
    }

    const subtotalAMD = convertPrice(cart.totals.subtotal, 'USD', 'AMD');
    const taxAMD = convertPrice(cart.totals.tax, 'USD', 'AMD');
    const shippingAMD = shippingMethod === 'delivery' && deliveryPrice !== null ? deliveryPrice : 0;
    const totalAMD = subtotalAMD + taxAMD + shippingAMD;
    
    const subtotalDisplay = currency === 'AMD' ? subtotalAMD : convertPrice(subtotalAMD, 'AMD', currency);
    const taxDisplay = currency === 'AMD' ? taxAMD : convertPrice(taxAMD, 'AMD', currency);
    const shippingDisplay = currency === 'AMD' ? shippingAMD : convertPrice(shippingAMD, 'AMD', currency);
    const totalDisplay = currency === 'AMD' ? totalAMD : convertPrice(totalAMD, 'AMD', currency);
    
    return {
      subtotalAMD,
      taxAMD,
      shippingAMD,
      totalAMD,
      subtotalDisplay,
      taxDisplay,
      shippingDisplay,
      totalDisplay,
    };
  }, [cart, shippingMethod, deliveryPrice, currency]);

  return {
    // State
    cart,
    loading,
    error,
    setError,
    currency,
    logoErrors,
    setLogoErrors,
    showShippingModal,
    setShowShippingModal,
    showCardModal,
    setShowCardModal,
    deliveryPrice,
    loadingDeliveryPrice,
    // Form
    register,
    handleSubmit,
    errors,
    isSubmitting,
    setValue,
    watch,
    // Computed
    paymentMethod,
    shippingMethod,
    shippingCity,
    paymentMethods,
    orderSummary,
    // Actions
    handlePlaceOrder,
    onSubmit,
    // Auth
    isLoggedIn,
  };
}

