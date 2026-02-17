'use client';

import { Button } from '@shop/ui';
import { useTranslation } from '../../../../../lib/i18n-client';
import { useRouter } from 'next/navigation';

interface FormActionsProps {
  loading: boolean;
  isEditMode: boolean;
}

export function FormActions({ loading, isEditMode }: FormActionsProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="sticky bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg -mx-6 -mb-6 px-6 py-4 mt-8 backdrop-blur-sm bg-white/95">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-full">
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="flex-1 w-full sm:w-auto order-2 sm:order-1"
        >
          {loading
            ? isEditMode
              ? t('admin.products.add.updating')
              : t('admin.products.add.creating')
            : isEditMode
              ? t('admin.products.add.updateProduct')
              : t('admin.products.add.createProduct')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/products')}
          className="w-full sm:w-auto order-1 sm:order-2"
        >
          {t('admin.common.cancel')}
        </Button>
      </div>
    </div>
  );
}


