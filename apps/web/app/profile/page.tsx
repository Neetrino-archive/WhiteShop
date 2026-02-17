'use client';

import { Suspense } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import { useTranslation } from '../../lib/i18n-client';
import { useProfilePage } from './useProfilePage';
import { ProfileHeader } from './ProfileHeader';
import { ProfileDashboard } from './ProfileDashboard';
import { ProfilePersonalInfo } from './ProfilePersonalInfo';
import { ProfileAddresses } from './ProfileAddresses';
import { ProfileOrders } from './ProfileOrders';
import { ProfilePassword } from './ProfilePassword';
import { OrderDetailsModal } from './OrderDetailsModal';
import type { ProfileTab, ProfileTabConfig } from './types';

function ProfilePageContent() {
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const { t } = useTranslation();
  
  const {
    loading,
    error,
    success,
    setError,
    setSuccess,
    profile,
    activeTab,
    handleTabChange,
    personalInfo,
    setPersonalInfo,
    savingPersonal,
    handleSavePersonalInfo,
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
    passwordForm,
    setPasswordForm,
    savingPassword,
    handleChangePassword,
    dashboardData,
    dashboardLoading,
    orders,
    ordersLoading,
    ordersPage,
    setOrdersPage,
    ordersMeta,
    selectedOrder,
    setSelectedOrder,
    orderDetailsLoading,
    orderDetailsError,
    isReordering,
    handleOrderClick,
    handleReOrder,
    currency,
  } = useProfilePage();

  if (authLoading || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-600">{t('profile.common.loadingProfile')}</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  // Tab configuration with icons
  const tabs: ProfileTabConfig[] = [
    {
      id: 'dashboard',
      label: t('profile.tabs.dashboard'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'orders',
      label: t('profile.tabs.orders'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      id: 'personal',
      label: t('profile.tabs.personal'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: 'addresses',
      label: t('profile.tabs.addresses'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 'password',
      label: t('profile.tabs.password'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProfileHeader
          profile={profile}
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          t={t}
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Alert messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <ProfileDashboard
              dashboardData={dashboardData}
              dashboardLoading={dashboardLoading}
              currency={currency}
              onTabChange={handleTabChange}
              onOrderClick={handleOrderClick}
              t={t}
            />
          )}

          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <ProfilePersonalInfo
              personalInfo={personalInfo}
              setPersonalInfo={setPersonalInfo}
              savingPersonal={savingPersonal}
              onSave={handleSavePersonalInfo}
              profile={profile}
              t={t}
            />
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <ProfileAddresses
              profile={profile}
              showAddressForm={showAddressForm}
              setShowAddressForm={setShowAddressForm}
              editingAddress={editingAddress}
              addressForm={addressForm}
              setAddressForm={setAddressForm}
              savingAddress={savingAddress}
              onSave={handleSaveAddress}
              onDelete={handleDeleteAddress}
              onSetDefault={handleSetDefaultAddress}
              onEdit={handleEditAddress}
              onResetForm={resetAddressForm}
              t={t}
            />
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <ProfileOrders
              orders={orders}
              ordersLoading={ordersLoading}
              ordersPage={ordersPage}
              setOrdersPage={setOrdersPage}
              ordersMeta={ordersMeta}
              currency={currency}
              onOrderClick={handleOrderClick}
              t={t}
            />
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <ProfilePassword
              passwordForm={passwordForm}
              setPasswordForm={setPasswordForm}
              savingPassword={savingPassword}
              onSave={handleChangePassword}
              t={t}
            />
          )}

          {/* Order Details Modal */}
          {selectedOrder && (
            <OrderDetailsModal
              selectedOrder={selectedOrder}
              orderDetailsLoading={orderDetailsLoading}
              orderDetailsError={orderDetailsError}
              isReordering={isReordering}
              currency={currency}
              onClose={() => setSelectedOrder(null)}
              onReOrder={handleReOrder}
              t={t}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    }>
      <ProfilePageContent />
    </Suspense>
  );
}
