'use client';

import { useTranslation } from '../../../../../lib/i18n-client';

interface PublishingProps {
  featured: boolean;
  onFeaturedChange: (featured: boolean) => void;
}

export function Publishing({ featured, onFeaturedChange }: PublishingProps) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => onFeaturedChange(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <span aria-hidden="true">⭐</span>
            {t('admin.products.add.markAsFeatured')}
          </span>
        </label>
      </div>
    </div>
  );
}


