import type { FormEvent } from 'react';
import { Button, Input, Card } from '@shop/ui';

interface ProfilePasswordProps {
  passwordForm: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  setPasswordForm: (form: ProfilePasswordProps['passwordForm']) => void;
  savingPassword: boolean;
  onSave: (e: FormEvent) => void;
  t: (key: string) => string;
}

export function ProfilePassword({
  passwordForm,
  setPasswordForm,
  savingPassword,
  onSave,
  t,
}: ProfilePasswordProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('profile.password.title')}</h2>
      <form onSubmit={onSave} className="space-y-4 max-w-2xl">
        <Input
          label={t('profile.password.currentPassword')}
          type="password"
          value={passwordForm.currentPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
          placeholder={t('profile.password.currentPasswordPlaceholder')}
          required
        />
        <Input
          label={t('profile.password.newPassword')}
          type="password"
          value={passwordForm.newPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
          placeholder={t('profile.password.newPasswordPlaceholder')}
          required
        />
        <Input
          label={t('profile.password.confirmPassword')}
          type="password"
          value={passwordForm.confirmPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
          placeholder={t('profile.password.confirmPasswordPlaceholder')}
          required
        />
        <div className="pt-4">
          <Button type="submit" variant="primary" disabled={savingPassword}>
            {savingPassword ? t('profile.password.changing') : t('profile.password.change')}
          </Button>
        </div>
      </form>
    </Card>
  );
}



