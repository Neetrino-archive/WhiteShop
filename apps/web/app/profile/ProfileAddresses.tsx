import type { FormEvent } from 'react';
import { Button, Input, Card } from '@shop/ui';
import type { Address, UserProfile } from './types';

interface ProfileAddressesProps {
  profile: UserProfile | null;
  showAddressForm: boolean;
  setShowAddressForm: (show: boolean) => void;
  editingAddress: Address | null;
  addressForm: Address;
  setAddressForm: (address: Address) => void;
  savingAddress: boolean;
  onSave: (e: FormEvent) => void;
  onDelete: (addressId: string) => void;
  onSetDefault: (addressId: string) => void;
  onEdit: (address: Address) => void;
  onResetForm: () => void;
  t: (key: string) => string;
}

export function ProfileAddresses({
  profile,
  showAddressForm,
  setShowAddressForm,
  editingAddress,
  addressForm,
  setAddressForm,
  savingAddress,
  onSave,
  onDelete,
  onSetDefault,
  onEdit,
  onResetForm,
  t,
}: ProfileAddressesProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{t('profile.addresses.title')}</h2>
          <Button
            variant="primary"
            onClick={() => {
              onResetForm();
              setShowAddressForm(!showAddressForm);
            }}
          >
            {showAddressForm ? t('profile.addresses.form.cancel') : `+ ${t('profile.addresses.addNew')}`}
          </Button>
        </div>

        {/* Address Form */}
        {showAddressForm && (
          <form onSubmit={onSave} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
            <h3 className="font-semibold text-gray-900">
              {editingAddress ? t('profile.addresses.form.editTitle') : t('profile.addresses.form.addTitle')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t('profile.addresses.form.addressLine1')}
                value={addressForm.addressLine1}
                onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                required
              />
              <Input
                label={t('profile.addresses.form.city')}
                value={addressForm.city}
                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                required
              />
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={addressForm.isDefault || false}
                onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="ml-2 text-sm text-gray-700">{t('profile.addresses.form.isDefault')}</span>
            </label>
            <div className="flex gap-2">
              <Button type="submit" variant="primary" disabled={savingAddress}>
                {savingAddress ? t('profile.addresses.form.saving') : editingAddress ? t('profile.addresses.form.update') : t('profile.addresses.form.add')}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddressForm(false);
                  onResetForm();
                }}
              >
                {t('profile.addresses.form.cancel')}
              </Button>
            </div>
          </form>
        )}

        {/* Addresses List */}
        <div className="space-y-4">
          {profile?.addresses && profile.addresses.length > 0 ? (
            profile.addresses.map((address, index) => (
              <div
                key={address.id || address._id || index}
                className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {address.isDefault && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                          {t('profile.addresses.default')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">
                      {address.addressLine1}
                    </p>
                    <p className="text-sm text-gray-700">
                      {address.city}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!address.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSetDefault((address.id || address._id)!)}
                      >
                        {t('profile.addresses.setDefault')}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(address)}
                    >
                      {t('profile.addresses.edit')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete((address.id || address._id)!)}
                      className="text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      {t('profile.addresses.delete')}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">{t('profile.addresses.noAddresses')}</p>
          )}
        </div>
      </Card>
    </div>
  );
}



