'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '../../../../../lib/i18n-client';

interface PageHeaderProps {
  isEditMode: boolean;
}

export function PageHeader({ isEditMode }: PageHeaderProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push('/admin')}
          className="text-gray-600 hover:text-gray-900 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('admin.products.add.backToAdmin')}
        </button>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">
        {isEditMode ? t('admin.products.add.editProduct') : t('admin.products.add.addNewProduct')}
      </h1>
    </div>
  );
}


