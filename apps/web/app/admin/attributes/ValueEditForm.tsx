'use client';

import { useTranslation } from '../../../lib/i18n-client';
import { ColorPaletteSelector } from '../../../components/ColorPaletteSelector';
import { type AttributeValue } from './useAttributes';

interface ValueEditFormProps {
  attributeId: string;
  value: AttributeValue;
  editingLabel: string;
  editingColors: string[];
  editingImageUrl: string | null;
  savingValue: boolean;
  imageUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onLabelChange: (label: string) => void;
  onColorsChange: (colors: string[]) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function ValueEditForm({
  attributeId,
  value,
  editingLabel,
  editingColors,
  editingImageUrl,
  savingValue,
  imageUploading,
  fileInputRef,
  onLabelChange,
  onColorsChange,
  onImageUpload,
  onRemoveImage,
  onSave,
  onCancel,
}: ValueEditFormProps) {
  const { t } = useTranslation();

  return (
    <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
      {/* Label */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('admin.attributes.valueModal.label')}
        </label>
        <input
          type="text"
          value={editingLabel}
          onChange={(e) => onLabelChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder={t('admin.attributes.valueModal.labelPlaceholder')}
        />
      </div>

      {/* Colors and Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Colors Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('admin.attributes.valueModal.colors')}
          </label>
          <ColorPaletteSelector colors={editingColors} onColorsChange={onColorsChange} />
        </div>

        {/* Image Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('admin.attributes.valueModal.image')}
          </label>
          {editingImageUrl ? (
            <div className="space-y-3">
              <div className="relative inline-block">
                <img
                  src={editingImageUrl}
                  alt={t('admin.attributes.valueModal.imagePreview')}
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors flex items-center justify-center"
                  title={t('admin.attributes.valueModal.removeImage')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={imageUploading}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {imageUploading ? t('admin.attributes.valueModal.uploading') : t('admin.attributes.valueModal.changeImage')}
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={imageUploading}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {imageUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                    {t('admin.attributes.valueModal.uploading')}
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {t('admin.attributes.valueModal.uploadImage')}
                  </>
                )}
              </button>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={savingValue}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('admin.attributes.valueModal.cancel')}
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={savingValue || !editingLabel.trim()}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {savingValue ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {t('admin.attributes.valueModal.saving')}
            </>
          ) : (
            t('admin.attributes.valueModal.save')
          )}
        </button>
      </div>
    </div>
  );
}



