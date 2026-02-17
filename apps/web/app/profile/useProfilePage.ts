import { useState, useEffect, useCallback } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../lib/auth/AuthContext';
import { apiClient } from '../../lib/api-client';
import { getStoredCurrency, type CurrencyCode } from '../../lib/currency';
import { useTranslation } from '../../lib/i18n-client';
import type { Address, UserProfile, OrderDetails, DashboardData, OrderListItem, ProfileTab } from './types';

export function useProfilePage() {
  const router = useRouter();
  const { isLoggedIn, isLoading: authLoading, user: authUser } = useAuth();
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as ProfileTab) || 'dashboard';
  
  // Profile state
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);

  // Personal info form
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [savingPersonal, setSavingPersonal] = useState(false);

  // Address form
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState<Address>({
    firstName: '',
    lastName: '',
    company: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    countryCode: 'AM',
    phone: '',
    isDefault: false,
  });
  const [savingAddress, setSavingAddress] = useState(false);

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [savingPassword, setSavingPassword] = useState(false);

  // Dashboard
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);

  // Orders
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersMeta, setOrdersMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);

  // Order Details Modal
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [orderDetailsLoading, setOrderDetailsLoading] = useState(false);
  const [orderDetailsError, setOrderDetailsError] = useState<string | null>(null);
  const [isReordering, setIsReordering] = useState(false);

  // Currency state
  const [currency, setCurrency] = useState<CurrencyCode>(() => getStoredCurrency());

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push('/login?redirect=/profile');
    }
  }, [isLoggedIn, authLoading, router]);

  // Update tab from URL query parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['dashboard', 'personal', 'addresses', 'password', 'orders'].includes(tab)) {
      setActiveTab(tab as ProfileTab);
    }
  }, [searchParams]);

  // Load profile data
  useEffect(() => {
    if (isLoggedIn && !authLoading) {
      loadProfile();
    }
  }, [isLoggedIn, authLoading]);

  // Initialize currency and listen for currency changes
  useEffect(() => {
    const updateCurrency = () => {
      const newCurrency = getStoredCurrency();
      console.log('💱 [PROFILE] Currency updated to:', newCurrency);
      setCurrency(newCurrency);
    };
    
    updateCurrency();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('currency-updated', updateCurrency);
      const handleCurrencyRatesUpdate = () => {
        console.log('💱 [PROFILE] Currency rates updated, refreshing currency...');
        updateCurrency();
      };
      window.addEventListener('currency-rates-updated', handleCurrencyRatesUpdate);
      
      return () => {
        window.removeEventListener('currency-updated', updateCurrency);
        window.removeEventListener('currency-rates-updated', handleCurrencyRatesUpdate);
      };
    }
  }, []);

  // Lock body scroll when order modal is open
  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedOrder]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.get<UserProfile>('/api/v1/users/profile');
      setProfile(data);
      setPersonalInfo({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
      });
    } catch (err: any) {
      console.error('Error loading profile:', err);
      setError(err.message || t('profile.personal.failedToLoad'));
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = useCallback(async () => {
    try {
      setOrdersLoading(true);
      setError(null);
      const response = await apiClient.get<{
        data: OrderListItem[];
        meta: typeof ordersMeta;
      }>('/api/v1/orders', {
        params: {
          page: ordersPage.toString(),
          limit: '20',
        },
      });
      setOrders(response.data || []);
      setOrdersMeta(response.meta || null);
    } catch (err: any) {
      console.error('Error loading orders:', err);
      setError(err.message || t('profile.orders.failedToLoad'));
    } finally {
      setOrdersLoading(false);
    }
  }, [ordersPage, t]);

  // Load orders when orders tab is active
  useEffect(() => {
    if (isLoggedIn && !authLoading && activeTab === 'orders') {
      loadOrders();
    }
  }, [isLoggedIn, authLoading, activeTab, loadOrders]);

  const loadDashboard = useCallback(async () => {
    try {
      console.log('📊 [PROFILE] Loading dashboard data...');
      setDashboardLoading(true);
      setError(null);
      const data = await apiClient.get<DashboardData>('/api/v1/users/dashboard');
      console.log('✅ [PROFILE] Dashboard data loaded:', data);
      setDashboardData(data);
    } catch (err: any) {
      console.error('❌ [PROFILE] Error loading dashboard:', err);
      setError(err.message || t('profile.dashboard.failedToLoad'));
    } finally {
      setDashboardLoading(false);
    }
  }, [t]);

  // Load dashboard when dashboard tab is active
  useEffect(() => {
    if (isLoggedIn && !authLoading && activeTab === 'dashboard') {
      loadDashboard();
    }
  }, [isLoggedIn, authLoading, activeTab, loadDashboard]);

  const handleSavePersonalInfo = async (e: FormEvent) => {
    e.preventDefault();
    setSavingPersonal(true);
    setError(null);
    setSuccess(null);

    try {
      const updated = await apiClient.put<UserProfile>('/api/v1/users/profile', personalInfo);
      setProfile(updated);
      setSuccess(t('profile.personal.updatedSuccess'));
      
      if (authUser) {
        window.dispatchEvent(new Event('auth-updated'));
      }
    } catch (err: any) {
      setError(err.message || t('profile.personal.failedToUpdate'));
    } finally {
      setSavingPersonal(false);
    }
  };

  const handleSaveAddress = async (e: FormEvent) => {
    e.preventDefault();
    setSavingAddress(true);
    setError(null);
    setSuccess(null);

    try {
      const addressId = editingAddress?.id || editingAddress?._id;
      if (addressId) {
        await apiClient.put(`/api/v1/users/addresses/${addressId}`, addressForm);
        setSuccess(t('profile.addresses.updatedSuccess'));
      } else {
        await apiClient.post('/api/v1/users/addresses', addressForm);
        setSuccess(t('profile.addresses.addedSuccess'));
      }
      
      await loadProfile();
      setShowAddressForm(false);
      setEditingAddress(null);
      resetAddressForm();
    } catch (err: any) {
      setError(err.message || t('profile.addresses.failedToSave'));
    } finally {
      setSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm(t('profile.addresses.deleteConfirm'))) {
      return;
    }

    try {
      await apiClient.delete(`/api/v1/users/addresses/${addressId}`);
      setSuccess(t('profile.addresses.deletedSuccess'));
      await loadProfile();
    } catch (err: any) {
      setError(err.message || t('profile.addresses.failedToDelete'));
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      await apiClient.patch(`/api/v1/users/addresses/${addressId}/default`);
      setSuccess(t('profile.addresses.defaultUpdatedSuccess'));
      await loadProfile();
    } catch (err: any) {
      setError(err.message || t('profile.addresses.failedToSetDefault'));
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressForm({
      firstName: address.firstName || '',
      lastName: address.lastName || '',
      company: address.company || '',
      addressLine1: address.addressLine1 || '',
      addressLine2: address.addressLine2 || '',
      city: address.city || '',
      state: address.state || '',
      postalCode: address.postalCode || '',
      countryCode: address.countryCode || 'AM',
      phone: address.phone || '',
      isDefault: address.isDefault || false,
    });
    setShowAddressForm(true);
  };

  const resetAddressForm = () => {
    setAddressForm({
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      company: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      countryCode: 'AM',
      phone: profile?.phone || '',
      isDefault: false,
    });
    setEditingAddress(null);
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setSavingPassword(true);
    setError(null);
    setSuccess(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError(t('profile.password.passwordsDoNotMatch'));
      setSavingPassword(false);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError(t('profile.password.passwordMinLength'));
      setSavingPassword(false);
      return;
    }

    try {
      await apiClient.put('/api/v1/users/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setSuccess(t('profile.password.changedSuccess'));
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err: any) {
      setError(err.message || t('profile.password.failedToChange'));
    } finally {
      setSavingPassword(false);
    }
  };

  const loadOrderDetails = async (orderNumber: string) => {
    try {
      setOrderDetailsLoading(true);
      setOrderDetailsError(null);
      const data = await apiClient.get<OrderDetails>(`/api/v1/orders/${orderNumber}`);
      setSelectedOrder(data);
    } catch (err: any) {
      console.error('Error loading order details:', err);
      setOrderDetailsError(err.message || t('profile.orderDetails.failedToLoad'));
    } finally {
      setOrderDetailsLoading(false);
    }
  };

  const handleOrderClick = (orderNumber: string, e: MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth >= 1024) {
      e.preventDefault();
      loadOrderDetails(orderNumber);
    }
  };

  const handleReOrder = async () => {
    if (!selectedOrder || !isLoggedIn) {
      router.push('/login?redirect=/profile?tab=orders');
      return;
    }

    setIsReordering(true);
    try {
      console.log('[Profile][ReOrder] Starting re-order for order:', selectedOrder.number);
      
      let addedCount = 0;
      let skippedCount = 0;

      for (const item of selectedOrder.items) {
        try {
          interface VariantDetails {
            id: string;
            productId: string;
            stock: number;
            available: boolean;
          }

          const variantDetails = await apiClient.get<VariantDetails>(`/api/v1/products/variants/${item.variantId}`);
          
          if (!variantDetails.available || variantDetails.stock < item.quantity) {
            console.warn(`[Profile][ReOrder] Item ${item.productTitle} is not available or insufficient stock`);
            skippedCount++;
            continue;
          }

          await apiClient.post('/api/v1/cart/items', {
            productId: variantDetails.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          });
          addedCount++;
          console.log('[Profile][ReOrder] Added item to cart:', item.productTitle);
        } catch (error: any) {
          console.error('[Profile][ReOrder] Error adding item to cart:', error);
          skippedCount++;
        }
      }

      window.dispatchEvent(new Event('cart-updated'));
      
      if (addedCount > 0) {
        const skippedText = skippedCount > 0 ? `, ${skippedCount} ${t('profile.orderDetails.skipped')}` : '';
        setSuccess(`${addedCount} ${t('profile.orderDetails.itemsAdded')}${skippedText}`);
        setTimeout(() => {
          router.push('/cart');
        }, 1500);
      } else {
        setError(t('profile.orderDetails.failedToAdd'));
      }
    } catch (error: any) {
      console.error('[Profile][ReOrder] Error during re-order:', error);
      setError(t('profile.orderDetails.failedToAdd'));
    } finally {
      setIsReordering(false);
    }
  };

  const handleTabChange = (tab: ProfileTab) => {
    setActiveTab(tab);
    setError(null);
    setSuccess(null);
    router.push(`/profile?tab=${tab}`, { scroll: false });
    if (tab !== 'addresses') {
      setShowAddressForm(false);
      setEditingAddress(null);
    }
  };

  return {
    // Auth & loading
    isLoggedIn,
    authLoading,
    loading,
    error,
    success,
    setError,
    setSuccess,
    
    // Profile
    profile,
    
    // Tabs
    activeTab,
    handleTabChange,
    
    // Personal info
    personalInfo,
    setPersonalInfo,
    savingPersonal,
    handleSavePersonalInfo,
    
    // Addresses
    showAddressForm,
    setShowAddressForm,
    editingAddress,
    addressForm,
    setAddressForm,
    savingAddress,
    handleSaveAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,
    handleEditAddress,
    resetAddressForm,
    
    // Password
    passwordForm,
    setPasswordForm,
    savingPassword,
    handleChangePassword,
    
    // Dashboard
    dashboardData,
    dashboardLoading,
    
    // Orders
    orders,
    ordersLoading,
    ordersPage,
    setOrdersPage,
    ordersMeta,
    
    // Order details
    selectedOrder,
    setSelectedOrder,
    orderDetailsLoading,
    orderDetailsError,
    isReordering,
    handleOrderClick,
    handleReOrder,
    
    // Currency
    currency,
    
    // Translation
    t,
  };
}



