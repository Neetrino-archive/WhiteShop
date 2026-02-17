import Link from 'next/link';
import { Button, Card } from '@shop/ui';
import { formatPriceInCurrency, convertPrice, type CurrencyCode } from '../../lib/currency';
import { getStatusColor, getPaymentStatusColor } from './utils';
import type { DashboardData, ProfileTab } from './types';

interface ProfileDashboardProps {
  dashboardData: DashboardData | null;
  dashboardLoading: boolean;
  currency: CurrencyCode;
  onTabChange: (tab: ProfileTab) => void;
  onOrderClick: (orderNumber: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
  t: (key: string) => string;
}

export function ProfileDashboard({
  dashboardData,
  dashboardLoading,
  currency,
  onTabChange,
  onOrderClick,
  t,
}: ProfileDashboardProps) {
  if (dashboardLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">{t('profile.dashboard.loading')}</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <Card className="p-6">
        <p className="text-gray-600 text-center py-8">{t('profile.dashboard.failedToLoad')}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('profile.dashboard.totalOrders')}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {dashboardData.stats.totalOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-sm font-medium text-gray-600">{t('profile.dashboard.totalSpent')}</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 break-words overflow-wrap-anywhere">
                {formatPriceInCurrency(dashboardData.stats.totalSpent, currency)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('profile.dashboard.pendingOrders')}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {dashboardData.stats.pendingOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('profile.dashboard.savedAddresses')}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {dashboardData.stats.addressesCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{t('profile.dashboard.recentOrders')}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTabChange('orders')}
          >
            {t('profile.dashboard.viewAll')}
          </Button>
        </div>
        {dashboardData.recentOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">{t('profile.dashboard.noOrders')}</p>
            <Link href="/products">
              <Button variant="primary">{t('profile.dashboard.startShopping')}</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {dashboardData.recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.number}`}
                onClick={(e) => onOrderClick(order.number, e)}
                className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-6 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{t('profile.orders.orderNumber')}{order.number}</h3>
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-0.5">{t('profile.dashboard.orderStatus')}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-0.5">{t('profile.dashboard.paymentStatus')}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.itemsCount} {order.itemsCount !== 1 ? t('profile.orders.items') : t('profile.orders.item')} • {t('profile.dashboard.placedOn')} {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-lg font-bold text-gray-900">
                      {(() => {
                        if (order.subtotal !== undefined && order.discountAmount !== undefined && order.taxAmount !== undefined) {
                          const subtotalAMD = convertPrice(order.subtotal, 'USD', 'AMD');
                          const discountAMD = convertPrice(order.discountAmount, 'USD', 'AMD');
                          const taxAMD = convertPrice(order.taxAmount, 'USD', 'AMD');
                          const totalWithoutShippingAMD = subtotalAMD - discountAMD + taxAMD;
                          const totalDisplay = currency === 'AMD' ? totalWithoutShippingAMD : convertPrice(totalWithoutShippingAMD, 'AMD', currency);
                          return formatPriceInCurrency(totalDisplay, currency);
                        } else {
                          const totalAMD = convertPrice(order.total, 'USD', 'AMD');
                          const shippingAMD = order.shippingAmount || 0;
                          const totalWithoutShippingAMD = totalAMD - shippingAMD;
                          const totalDisplay = currency === 'AMD' ? totalWithoutShippingAMD : convertPrice(totalWithoutShippingAMD, 'AMD', currency);
                          return formatPriceInCurrency(totalDisplay, currency);
                        }
                      })()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{t('profile.dashboard.viewDetails')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('profile.dashboard.quickActions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            onClick={() => onTabChange('orders')}
            className="justify-start"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {t('profile.dashboard.viewAllOrders')}
          </Button>
          <Button
            variant="outline"
            onClick={() => onTabChange('addresses')}
            className="justify-start"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t('profile.dashboard.manageAddresses')}
          </Button>
          <Link href="/products">
            <Button
              variant="outline"
              className="w-full justify-start"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {t('profile.dashboard.continueShopping')}
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}



