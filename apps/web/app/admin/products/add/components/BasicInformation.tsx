'use client';

import type { ChangeEvent } from 'react';
import { Input } from '@shop/ui';
import { useTranslation } from '../../../../../lib/i18n-client';

interface BasicInformationProps {
  productType: 'simple' | 'variable';
  setProductType: (type: 'simple' | 'variable') => void;
  title: string;
  slug: string;
  descriptionHtml: string;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSlugChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function BasicInformation({
  productType,
  setProductType,
  title,
  slug,
  descriptionHtml,
  onTitleChange,
  onSlugChange,
  onDescriptionChange,
}: BasicInformationProps) {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('admin.products.add.basicInformation')}</h2>
      <div className="space-y-4">
        {/* Product Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('admin.products.add.productType')} *
          </label>
          <p className="text-xs text-gray-500 mb-3">
            {t('admin.products.add.productTypeDescription')}
          </p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="productType"
                value="simple"
                checked={productType === 'simple'}
                onChange={(e) => setProductType(e.target.value as 'simple' | 'variable')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{t('admin.products.add.productTypeSimple')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="productType"
                value="variable"
                checked={productType === 'variable'}
                onChange={(e) => setProductType(e.target.value as 'simple' | 'variable')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{t('admin.products.add.productTypeVariable')}</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.products.add.title')} *
          </label>
          <Input
            type="text"
            value={title}
            onChange={onTitleChange}
            required
            placeholder={t('admin.products.add.productTitlePlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.products.add.slug')} *
          </label>
          <Input
            type="text"
            value={slug}
            onChange={onSlugChange}
            required
            placeholder={t('admin.products.add.productSlugPlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.products.add.description')}
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
            value={descriptionHtml}
            onChange={onDescriptionChange}
            placeholder={t('admin.products.add.productDescriptionPlaceholder')}
          />
        </div>
      </div>
    </div>
  );
}


