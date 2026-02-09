'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../lib/auth/AuthContext';
import { Card, Button } from '@shop/ui';
import { apiClient } from '../../../lib/api-client';
import { useTranslation } from '../../../lib/i18n-client';
import { formatPriceInCurrency, convertPrice, CurrencyCode } from '../../../lib/currency';

interface Order {
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
  customerEmail: string;
  customerPhone: string;
  customerFirstName?: string;
  customerLastName?: string;
  customerId?: string | null;
  itemsCount: number;
  createdAt: string;
}

interface OrdersResponse {
  data: Order[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface OrderDetails {
  id: string;
  number: string;
  status: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  total: number;
  currency: string;
  totals?: {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
    currency: string;
  };
  customerEmail?: string;
  customerPhone?: string;
  customer?: {
    id: string;
    email: string | null;
    phone: string | null;
    firstName: string | null;
    lastName: string | null;
  } | null;
  billingAddress?: any | null;
  shippingAddress?: any | null;
  shippingMethod?: string | null;
  notes?: string | null;
  adminNotes?: string | null;
  payment?: {
    id: string;
    provider: string;
    method?: string | null;
    amount: number;
    currency: string;
    status: string;
    cardLast4?: string | null;
    cardBrand?: string | null;
  } | null;
  items: Array<{
    id: string;
    productTitle: string;
    sku: string;
    quantity: number;
    unitPrice: number;
    total: number;
    variantOptions?: Array<{
      attributeKey?: string;
      value?: string;
      label?: string;
      imageUrl?: string;
      colors?: string[] | any;
    }>;
  }>;
  createdAt: string;
  updatedAt?: string;
}

export default function OrdersPage() {
  const { t } = useTranslation();
  const { isLoggedIn, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<OrdersResponse['meta'] | null>(null);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [updatingStatuses, setUpdatingStatuses] = useState<Set<string>>(new Set());
  const [updatingPaymentStatuses, setUpdatingPaymentStatuses] = useState<Set<string>>(new Set());
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(false);

  // Initialize filters from URL params on mount and when URL changes
  useEffect(() => {
    if (searchParams) {
      const status = searchParams.get('status') || '';
      const paymentStatus = searchParams.get('paymentStatus') || '';
      const search = searchParams.get('search') || '';
      setStatusFilter(status);
      setPaymentStatusFilter(paymentStatus);
      setSearchQuery(search);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn || !isAdmin) {
        router.push('/admin');
        return;
      }
    }
  }, [isLoggedIn, isAdmin, isLoading, router]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      console.log('📦 [ADMIN] Fetching orders...', { page, statusFilter, paymentStatusFilter, searchQuery, sortBy, sortOrder });
      
      const response = await apiClient.get<OrdersResponse>('/api/v1/admin/orders', {
        params: {
          page: page.toString(),
          limit: '20',
          status: statusFilter || '',
          paymentStatus: paymentStatusFilter || '',
          search: searchQuery || '',
          sortBy: sortBy || '',
          sortOrder: sortOrder || '',
        },
      });

      console.log('✅ [ADMIN] Orders fetched:', response);
      setOrders(response.data || []);
      setMeta(response.meta || null);
    } catch (err) {
      console.error('❌ [ADMIN] Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, paymentStatusFilter, searchQuery, sortBy, sortOrder]);

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isAdmin, page, statusFilter, paymentStatusFilter, searchQuery, sortBy, sortOrder]);

  const formatCurrency = (amount: number, currency: string = 'AMD', fromCurrency: CurrencyCode = 'USD') => {
    // Order subtotal and tax are stored in USD, but shipping and total are in AMD
    // We need to handle conversion based on the source currency
    const currencyCode = (currency || 'AMD') as CurrencyCode;
    
    // If currency is AMD and fromCurrency is USD, convert USD to AMD
    // If currency is AMD and fromCurrency is AMD, use formatPriceInCurrency (no conversion)
    // Otherwise, convert from fromCurrency to target currency
    if (currencyCode === 'AMD') {
      if (fromCurrency === 'USD') {
        // Convert USD to AMD
        const convertedAmount = convertPrice(amount, 'USD', 'AMD');
        return formatPriceInCurrency(convertedAmount, 'AMD');
      } else {
        // Already in AMD, no conversion needed
        return formatPriceInCurrency(amount, 'AMD');
      }
    } else {
      // Convert from fromCurrency to target currency
      const convertedAmount = convertPrice(amount, fromCurrency, currencyCode);
      return formatPriceInCurrency(convertedAmount, currencyCode);
    }
  };

  // Helper function to get color hex/rgb from color name
  const getColorValue = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      'beige': '#F5F5DC', 'black': '#000000', 'blue': '#0000FF', 'brown': '#A52A2A',
      'gray': '#808080', 'grey': '#808080', 'green': '#008000', 'red': '#FF0000',
      'white': '#FFFFFF', 'yellow': '#FFFF00', 'orange': '#FFA500', 'pink': '#FFC0CB',
      'purple': '#800080', 'navy': '#000080', 'maroon': '#800000', 'olive': '#808000',
      'teal': '#008080', 'cyan': '#00FFFF', 'magenta': '#FF00FF', 'lime': '#00FF00',
      'silver': '#C0C0C0', 'gold': '#FFD700',
    };
    const normalizedName = colorName.toLowerCase().trim();
    return colorMap[normalizedName] || '#CCCCCC';
  };

  const handleViewOrderDetails = async (orderId: string) => {
    setSelectedOrderId(orderId);
    setLoadingOrderDetails(true);
    try {
      const response = await apiClient.get<OrderDetails>(`/api/v1/admin/orders/${orderId}`);
      setOrderDetails(response);
    } catch (err: any) {
      console.error('❌ [ADMIN] Failed to load order details:', err);
      alert(err?.message || t('admin.orders.orderDetails.failedToLoad'));
      setSelectedOrderId(null);
    } finally {
      setLoadingOrderDetails(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
    setOrderDetails(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (paymentStatus: string) => {
    switch (paymentStatus.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (orders.length === 0) return;
    setSelectedIds(prev => {
      const allIds = orders.map(o => o.id);
      const hasAll = allIds.every(id => prev.has(id));
      return hasAll ? new Set() : new Set(allIds);
    });
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      // Toggle sort order if same column
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to descending
      setSortBy(column);
      setSortOrder('desc');
    }
    setPage(1); // Reset to first page when sorting changes
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(t('admin.orders.deleteConfirm').replace('{count}', selectedIds.size.toString()))) return;
    setBulkDeleting(true);
    try {
      const ids = Array.from(selectedIds);
      console.log('🗑️ [ADMIN] Starting bulk delete for orders:', ids);
      
      const results = await Promise.allSettled(
        ids.map(async (id) => {
          try {
            const response = await apiClient.delete(`/api/v1/admin/orders/${id}`);
            console.log('✅ [ADMIN] Order deleted successfully:', id, response);
            return { id, success: true };
          } catch (error: any) {
            console.error('❌ [ADMIN] Failed to delete order:', id, error);
            return { id, success: false, error: error.message || t('admin.common.unknownErrorFallback') };
          }
        })
      );
      
      const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
      const failed = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success));
      
      console.log('📊 [ADMIN] Bulk delete results:', {
        total: ids.length,
        successful: successful.length,
        failed: failed.length,
      });
      
      setSelectedIds(new Set());
      await fetchOrders();
      
      if (failed.length > 0) {
        const failedIds = failed.map(r => 
          r.status === 'fulfilled' ? r.value.id : 'unknown'
        );
        alert(t('admin.orders.bulkDeleteFailed').replace('{success}', successful.length.toString()).replace('{total}', ids.length.toString()).replace('{failed}', failedIds.join(', ')));
      } else {
        alert(t('admin.orders.bulkDeleteFinished').replace('{success}', successful.length.toString()).replace('{total}', ids.length.toString()));
      }
    } catch (err) {
      console.error('❌ [ADMIN] Bulk delete orders error:', err);
      alert(t('admin.orders.failedToDelete'));
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      console.log('📝 [ADMIN] Changing order status:', { orderId, newStatus });
      
      // Add to updating set
      setUpdatingStatuses((prev) => new Set(prev).add(orderId));
      setUpdateMessage(null);

      // Update order status via API
      await apiClient.put(`/api/v1/admin/orders/${orderId}`, {
        status: newStatus,
      });

      console.log('✅ [ADMIN] Order status updated successfully');

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      // Show success message
      setUpdateMessage({ type: 'success', text: t('admin.orders.statusUpdated') });
      setTimeout(() => setUpdateMessage(null), 3000);
    } catch (err) {
      console.error('❌ [ADMIN] Error updating order status:', err);
      setUpdateMessage({ 
        type: 'error', 
        text: t('admin.orders.failedToUpdateStatus')
      });
      setTimeout(() => setUpdateMessage(null), 5000);
    } finally {
      // Remove from updating set
      setUpdatingStatuses((prev) => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  const handlePaymentStatusChange = async (orderId: string, newPaymentStatus: string) => {
    try {
      console.log('📝 [ADMIN] Changing order payment status:', { orderId, newPaymentStatus });
      
      // Add to updating set
      setUpdatingPaymentStatuses((prev) => new Set(prev).add(orderId));
      setUpdateMessage(null);

      // Update order payment status via API
      await apiClient.put(`/api/v1/admin/orders/${orderId}`, {
        paymentStatus: newPaymentStatus,
      });

      console.log('✅ [ADMIN] Order payment status updated successfully');

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order
        )
      );

      // Show success message
      setUpdateMessage({ type: 'success', text: t('admin.orders.paymentStatusUpdated') });
      setTimeout(() => setUpdateMessage(null), 3000);
    } catch (err) {
      console.error('❌ [ADMIN] Error updating order payment status:', err);
      setUpdateMessage({ 
        type: 'error', 
        text: t('admin.orders.failedToUpdatePaymentStatus')
      });
      setTimeout(() => setUpdateMessage(null), 5000);
    } finally {
      // Remove from updating set
      setUpdatingPaymentStatuses((prev) => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('admin.orders.loading')}</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin')}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('admin.orders.backToAdmin')}
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.orders.title')}</h1>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex gap-4 items-center flex-wrap">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => {
                const newStatus = e.target.value;
                setStatusFilter(newStatus);
                setPage(1);
                // Update URL without causing navigation
                const params = new URLSearchParams(searchParams?.toString() || '');
                if (newStatus) {
                  params.set('status', newStatus);
                } else {
                  params.delete('status');
                }
                const newUrl = params.toString() ? `/admin/orders?${params.toString()}` : '/admin/orders';
                router.push(newUrl, { scroll: false });
              }}
            >
              <option value="">{t('admin.orders.allStatuses')}</option>
              <option value="pending">{t('admin.orders.pending')}</option>
              <option value="processing">{t('admin.orders.processing')}</option>
              <option value="completed">{t('admin.orders.completed')}</option>
              <option value="cancelled">{t('admin.orders.cancelled')}</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentStatusFilter}
              onChange={(e) => {
                const newPaymentStatus = e.target.value;
                setPaymentStatusFilter(newPaymentStatus);
                setPage(1);
                // Update URL without causing navigation
                const params = new URLSearchParams(searchParams?.toString() || '');
                if (newPaymentStatus) {
                  params.set('paymentStatus', newPaymentStatus);
                } else {
                  params.delete('paymentStatus');
                }
                const newUrl = params.toString() ? `/admin/orders?${params.toString()}` : '/admin/orders';
                router.push(newUrl, { scroll: false });
              }}
            >
              <option value="">{t('admin.orders.allPaymentStatuses')}</option>
              <option value="paid">{t('admin.orders.paid')}</option>
              <option value="pending">{t('admin.orders.pendingPayment')}</option>
              <option value="failed">{t('admin.orders.failed')}</option>
            </select>
            <input
              type="text"
              placeholder={t('admin.orders.searchPlaceholder')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 min-w-[200px]"
              value={searchQuery}
              onChange={(e) => {
                const newSearch = e.target.value;
                setSearchQuery(newSearch);
                setPage(1);
                // Update URL without causing navigation
                const params = new URLSearchParams(searchParams?.toString() || '');
                if (newSearch.trim()) {
                  params.set('search', newSearch.trim());
                } else {
                  params.delete('search');
                }
                const newUrl = params.toString() ? `/admin/orders?${params.toString()}` : '/admin/orders';
                router.push(newUrl, { scroll: false });
              }}
            />
            {updateMessage && (
              <div
                className={`px-4 py-2 rounded-md text-sm ${
                  updateMessage.type === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {updateMessage.text}
              </div>
            )}
          </div>
        </Card>

        {/* Selection Controls */}
        {selectedIds.size > 0 && (
          <Card className="p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                {t('admin.orders.selectedOrders').replace('{count}', selectedIds.size.toString())}
              </div>
              <Button
                variant="outline"
                onClick={handleBulkDelete}
                disabled={bulkDeleting}
              >
                {bulkDeleting ? t('admin.orders.deleting') : t('admin.orders.deleteSelected')}
              </Button>
            </div>
          </Card>
        )}

        {/* Orders Table */}
        <Card className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">{t('admin.orders.loadingOrders')}</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">{t('admin.orders.noOrders')}</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3">
                        <input
                          type="checkbox"
                          aria-label={t('admin.orders.selectAllOrders')}
                          checked={orders.length > 0 && orders.every(o => selectedIds.has(o.id))}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.orders.orderNumber')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.orders.customer')}
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                        onClick={() => handleSort('total')}
                      >
                        <div className="flex items-center gap-1">
                          {t('admin.orders.total')}
                          <div className="flex flex-col">
                            <svg 
                              className={`w-3 h-3 ${sortBy === 'total' && sortOrder === 'asc' ? 'text-blue-600' : 'text-gray-400'}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <svg 
                              className={`w-3 h-3 -mt-1 ${sortBy === 'total' && sortOrder === 'desc' ? 'text-blue-600' : 'text-gray-400'}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.orders.items')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.orders.status')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.orders.payment')}
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                        onClick={() => handleSort('createdAt')}
                      >
                        <div className="flex items-center gap-1">
                          {t('admin.orders.date')}
                          <div className="flex flex-col">
                            <svg 
                              className={`w-3 h-3 ${sortBy === 'createdAt' && sortOrder === 'asc' ? 'text-blue-600' : 'text-gray-400'}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <svg 
                              className={`w-3 h-3 -mt-1 ${sortBy === 'createdAt' && sortOrder === 'desc' ? 'text-blue-600' : 'text-gray-400'}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            aria-label={t('admin.orders.selectOrder').replace('{number}', order.number)}
                            checked={selectedIds.has(order.id)}
                            onChange={() => toggleSelect(order.id)}
                          />
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap cursor-pointer hover:bg-gray-50"
                          onClick={() => handleViewOrderDetails(order.id)}
                        >
                          <div className="text-sm font-medium text-gray-900">{order.number}</div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap cursor-pointer hover:bg-gray-50"
                          onClick={() => handleViewOrderDetails(order.id)}
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {[order.customerFirstName, order.customerLastName].filter(Boolean).join(' ') || t('admin.orders.unknownCustomer')}
                          </div>
                          {order.customerPhone && (
                            <div className="text-sm text-gray-500">{order.customerPhone}</div>
                          )}
                          <div className="mt-1 text-xs text-blue-600">{t('admin.orders.viewOrderDetails')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {(() => {
                            // Calculate total without shipping: subtotal - discount + tax
                            // If we have subtotal, discountAmount, taxAmount, use them
                            // Otherwise, use order.total and subtract shippingAmount if available
                            if (order.subtotal !== undefined && order.discountAmount !== undefined && order.taxAmount !== undefined) {
                              // Calculate total without shipping
                              const subtotalAMD = convertPrice(order.subtotal, 'USD', 'AMD');
                              const discountAMD = convertPrice(order.discountAmount, 'USD', 'AMD');
                              const taxAMD = convertPrice(order.taxAmount, 'USD', 'AMD');
                              const totalWithoutShippingAMD = subtotalAMD - discountAMD + taxAMD;
                              return formatCurrency(totalWithoutShippingAMD, order.currency, 'AMD');
                            } else {
                              // Fallback: use order.total and subtract shippingAmount if available
                              const totalAMD = convertPrice(order.total, 'USD', 'AMD');
                              const shippingAMD = order.shippingAmount || 0;
                              const totalWithoutShippingAMD = totalAMD - shippingAMD;
                              return formatCurrency(totalWithoutShippingAMD, order.currency, 'AMD');
                            }
                          })()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.itemsCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {updatingStatuses.has(order.id) ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                                <span className="text-xs text-gray-500">{t('admin.orders.updating')}</span>
                              </div>
                            ) : (
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className={`px-2 py-1 text-xs font-medium rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${getStatusColor(order.status)}`}
                              >
                                <option value="pending">{t('admin.orders.pending')}</option>
                                <option value="processing">{t('admin.orders.processing')}</option>
                                <option value="completed">{t('admin.orders.completed')}</option>
                                <option value="cancelled">{t('admin.orders.cancelled')}</option>
                              </select>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {updatingPaymentStatuses.has(order.id) ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                                <span className="text-xs text-gray-500">{t('admin.orders.updating')}</span>
                              </div>
                            ) : (
                              <select
                                value={order.paymentStatus}
                                onChange={(e) => handlePaymentStatusChange(order.id, e.target.value)}
                                className={`px-2 py-1 text-xs font-medium rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${getPaymentStatusColor(order.paymentStatus)}`}
                              >
                                <option value="paid">{t('admin.orders.paid')}</option>
                                <option value="pending">{t('admin.orders.pendingPayment')}</option>
                                <option value="failed">{t('admin.orders.failed')}</option>
                              </select>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {meta && meta.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    {t('admin.orders.showingPage').replace('{page}', meta.page.toString()).replace('{totalPages}', meta.totalPages.toString()).replace('{total}', meta.total.toString())}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      {t('admin.orders.previous')}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                      disabled={page === meta.totalPages}
                    >
                      {t('admin.orders.next')}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>

        {/* Order Details Modal */}
        {selectedOrderId && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('admin.orders.orderDetails.title')} {orderDetails ? `#${orderDetails.number}` : ''}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={t('admin.common.close')}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {loadingOrderDetails ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">{t('admin.orders.orderDetails.loadingOrderDetails')}</p>
                  </div>
                ) : orderDetails ? (
                  <div className="space-y-6">
                    {/* Summary */}
                    <Card className="p-4 md:p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-2">{t('admin.orders.orderDetails.summary')}</h3>
                          <div className="text-sm text-gray-700 space-y-1">
                            <div>
                              <span className="font-medium">{t('admin.orders.orderDetails.orderNumber')}</span> {orderDetails.number}
                            </div>
                            <div>
                              <span className="font-medium">{t('admin.orders.orderDetails.total')}</span>{' '}
                              {orderDetails.totals ? (() => {
                                // Total is stored as USD + AMD (mixed), so we need to recalculate it properly
                                const subtotalAMD = convertPrice(orderDetails.totals.subtotal, 'USD', 'AMD');
                                const discountAMD = convertPrice(orderDetails.totals.discount, 'USD', 'AMD');
                                const shippingAMD = orderDetails.totals.shipping; // Already in AMD
                                const taxAMD = convertPrice(orderDetails.totals.tax, 'USD', 'AMD');
                                const totalAMD = subtotalAMD - discountAMD + shippingAMD + taxAMD;
                                return formatPriceInCurrency(totalAMD, (orderDetails.currency || 'AMD') as CurrencyCode);
                              })() : formatCurrency(orderDetails.total, orderDetails.currency || 'AMD', 'USD')}
                            </div>
                            <div>
                              <span className="font-medium">{t('admin.orders.orderDetails.status')}</span> {orderDetails.status}
                            </div>
                            <div>
                              <span className="font-medium">{t('admin.orders.orderDetails.payment')}</span> {orderDetails.paymentStatus}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-2">{t('admin.orders.orderDetails.customer')}</h3>
                          <div className="text-sm text-gray-700 space-y-1">
                            <div>
                              {(orderDetails.customer?.firstName || '') +
                                (orderDetails.customer?.lastName ? ' ' + orderDetails.customer.lastName : '') ||
                                t('admin.orders.unknownCustomer')}
                            </div>
                            {orderDetails.customerPhone && <div>{orderDetails.customerPhone}</div>}
                            {orderDetails.customerEmail && <div>{orderDetails.customerEmail}</div>}
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Addresses & Payment */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-4 md:p-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">{t('admin.orders.orderDetails.shippingAddress')}</h3>
                        {orderDetails.shippingMethod === 'pickup' ? (
                          <div className="text-sm text-gray-700 space-y-1">
                            <div>
                              <span className="font-medium">{t('admin.orders.orderDetails.shippingMethod')}</span>{' '}
                              {t('admin.orders.orderDetails.pickup')}
                            </div>
                          </div>
                        ) : orderDetails.shippingMethod === 'delivery' && orderDetails.shippingAddress ? (
                          <div className="text-sm text-gray-700 space-y-1">
                            <div className="mb-2">
                              <span className="font-medium">{t('admin.orders.orderDetails.shippingMethod')}</span>{' '}
                              {t('checkout.shipping.delivery')}
                            </div>
                            {(orderDetails.shippingAddress.address || orderDetails.shippingAddress.addressLine1) && (
                              <div>
                                <span className="font-medium">{t('checkout.form.address')}:</span>{' '}
                                {orderDetails.shippingAddress.address || orderDetails.shippingAddress.addressLine1}
                                {orderDetails.shippingAddress.addressLine2 && `, ${orderDetails.shippingAddress.addressLine2}`}
                              </div>
                            )}
                            {orderDetails.shippingAddress.city && (
                              <div>
                                <span className="font-medium">{t('checkout.form.city')}:</span> {orderDetails.shippingAddress.city}
                              </div>
                            )}
                            {orderDetails.shippingAddress.postalCode && (
                              <div>
                                <span className="font-medium">{t('checkout.form.postalCode')}:</span> {orderDetails.shippingAddress.postalCode}
                              </div>
                            )}
                            {(orderDetails.shippingAddress.phone || orderDetails.shippingAddress.shippingPhone) && (
                              <div className="mt-2">
                                <span className="font-medium">{t('checkout.form.phoneNumber')}:</span>{' '}
                                {orderDetails.shippingAddress.phone || orderDetails.shippingAddress.shippingPhone}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">
                            <p>{t('admin.orders.orderDetails.noShippingAddress')}</p>
                            {orderDetails.shippingMethod && (
                              <p>
                                {t('admin.orders.orderDetails.shippingMethod')}{' '}
                                {orderDetails.shippingMethod === 'pickup' 
                                  ? t('admin.orders.orderDetails.pickup')
                                  : orderDetails.shippingMethod === 'delivery'
                                  ? t('checkout.shipping.delivery')
                                  : orderDetails.shippingMethod}
                              </p>
                            )}
                          </div>
                        )}
                      </Card>

                      <Card className="p-4 md:p-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">{t('admin.orders.orderDetails.paymentInfo')}</h3>
                        {orderDetails.payment ? (
                          <div className="text-sm text-gray-700 space-y-1">
                            {orderDetails.payment.method && <div>{t('admin.orders.orderDetails.method')} {orderDetails.payment.method}</div>}
                            <div>
                              {t('admin.orders.orderDetails.amount')}{' '}
                              {formatCurrency(orderDetails.payment.amount, orderDetails.payment.currency || 'AMD')}
                            </div>
                            <div>{t('admin.orders.orderDetails.status')} {orderDetails.payment.status}</div>
                            {orderDetails.payment.cardBrand && orderDetails.payment.cardLast4 && (
                              <div>
                                {t('admin.orders.orderDetails.card')} {orderDetails.payment.cardBrand} ••••{orderDetails.payment.cardLast4}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">{t('admin.orders.orderDetails.noPaymentInfo')}</div>
                        )}
                      </Card>
                    </div>

                    {/* Order Summary */}
                    {orderDetails.totals && (
                      <Card className="p-4 md:p-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('orders.orderSummary.title')}</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm text-gray-700">
                            <span>{t('orders.orderSummary.subtotal')}</span>
                            <span>{formatCurrency(orderDetails.totals.subtotal, orderDetails.totals.currency || 'AMD', 'USD')}</span>
                          </div>
                          {orderDetails.totals.discount > 0 && (
                            <div className="flex justify-between text-sm text-gray-700">
                              <span>{t('orders.orderSummary.discount')}</span>
                              <span>-{formatCurrency(orderDetails.totals.discount, orderDetails.totals.currency || 'AMD', 'USD')}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm text-gray-700">
                            <span>{t('orders.orderSummary.shipping')}</span>
                            <span>
                              {orderDetails.shippingMethod === 'pickup' 
                                ? t('checkout.shipping.freePickup')
                                : formatCurrency(orderDetails.totals.shipping, orderDetails.totals.currency || 'AMD', 'AMD') + (orderDetails.shippingAddress?.city ? ` (${orderDetails.shippingAddress.city})` : '')}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-700">
                            <span>{t('orders.orderSummary.tax')}</span>
                            <span>{formatCurrency(orderDetails.totals.tax, orderDetails.totals.currency || 'AMD', 'USD')}</span>
                          </div>
                          <div className="border-t border-gray-200 pt-3 mt-3">
                            <div className="flex justify-between text-base font-bold text-gray-900">
                              <span>{t('orders.orderSummary.total')}</span>
                              <span>
                                {(() => {
                                  // Total is stored as USD + AMD (mixed), so we need to recalculate it properly
                                  // Subtotal and tax are in USD, shipping is in AMD
                                  const subtotalAMD = convertPrice(orderDetails.totals.subtotal, 'USD', 'AMD');
                                  const discountAMD = convertPrice(orderDetails.totals.discount, 'USD', 'AMD');
                                  const shippingAMD = orderDetails.totals.shipping; // Already in AMD
                                  const taxAMD = convertPrice(orderDetails.totals.tax, 'USD', 'AMD');
                                  const totalAMD = subtotalAMD - discountAMD + shippingAMD + taxAMD;
                                  return formatPriceInCurrency(totalAMD, (orderDetails.totals.currency || 'AMD') as CurrencyCode);
                                })()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    {/* Items */}
                    <Card className="p-4 md:p-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">{t('admin.orders.orderDetails.items')}</h3>
                      {Array.isArray(orderDetails.items) && orderDetails.items.length > 0 ? (
                        <div className="overflow-x-auto border border-gray-200 rounded-md">
                          <table className="min-w-full text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-3 py-2 text-left font-medium text-gray-500">{t('admin.orders.orderDetails.product')}</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500">{t('admin.orders.orderDetails.sku')}</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-500">{t('admin.orders.orderDetails.colorSize')}</th>
                                <th className="px-3 py-2 text-right font-medium text-gray-500">{t('admin.orders.orderDetails.qty')}</th>
                                <th className="px-3 py-2 text-right font-medium text-gray-500">{t('admin.orders.orderDetails.price')}</th>
                                <th className="px-3 py-2 text-right font-medium text-gray-500">{t('admin.orders.orderDetails.totalCol')}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                              {orderDetails.items.map((item) => {
                                // Get all variant options (not just color and size)
                                const allOptions = item.variantOptions || [];
                                
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
                                  <tr key={item.id}>
                                    <td className="px-3 py-2">{item.productTitle}</td>
                                    <td className="px-3 py-2 text-gray-500">{item.sku}</td>
                                    <td className="px-3 py-2">
                                      {allOptions.length > 0 ? (
                                        <div className="flex flex-wrap gap-2 items-center">
                                          {allOptions.map((opt, optIndex) => {
                                            if (!opt.attributeKey || !opt.value) return null;
                                            
                                            const attributeKey = opt.attributeKey.toLowerCase().trim();
                                            const isColor = attributeKey === 'color' || attributeKey === 'colour';
                                            const displayLabel = opt.label || opt.value;
                                            const hasImage = opt.imageUrl && opt.imageUrl.trim() !== '';
                                            const colors = getColorsArray(opt.colors);
                                            const colorHex = colors.length > 0 ? colors[0] : (isColor ? getColorValue(opt.value) : null);
                                            
                                            return (
                                              <div key={optIndex} className="flex items-center gap-1.5">
                                                {/* Show image if available */}
                                                {hasImage ? (
                                                  <img 
                                                    src={opt.imageUrl!} 
                                                    alt={displayLabel}
                                                    className="w-4 h-4 rounded border border-gray-300 object-cover flex-shrink-0"
                                                    onError={(e) => {
                                                      // Fallback to color circle if image fails to load
                                                      (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                  />
                                                ) : isColor && colorHex ? (
                                                  <div 
                                                    className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                                                    style={{ backgroundColor: colorHex }}
                                                    title={displayLabel}
                                                  />
                                                ) : null}
                                                <span className="text-xs text-gray-700 capitalize">
                                                  {displayLabel}
                                                </span>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      ) : (
                                        <span className="text-xs text-gray-400">—</span>
                                      )}
                                    </td>
                                    <td className="px-3 py-2 text-right">{item.quantity}</td>
                                    <td className="px-3 py-2 text-right">
                                      {formatCurrency(item.unitPrice, orderDetails.currency || 'AMD')}
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                      {formatCurrency(item.total, orderDetails.currency || 'AMD')}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">{t('admin.orders.orderDetails.noItemsFound')}</div>
                      )}
                    </Card>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">{t('admin.orders.orderDetails.failedToLoad')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

