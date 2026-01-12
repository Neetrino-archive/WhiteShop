'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useTranslation } from '../lib/i18n-client';
import { ColorPaletteSelector } from './ColorPaletteSelector';

interface AttributeValueEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: {
    id: string;
    label: string;
    colors?: string[];
    imageUrl?: string | null;
  };
  attributeId: string;
  onSave: (data: {
    label?: string;
    colors?: string[];
    imageUrl?: string | null;
  }) => Promise<void>;
}

export function AttributeValueEditModal({
  isOpen,
  onClose,
  value,
  attributeId,
  onSave,
}: AttributeValueEditModalProps) {
  const { t } = useTranslation();
  const [label, setLabel] = useState(value.label);
  const [colors, setColors] = useState<string[]>(value.colors || []);
  const [imageUrl, setImageUrl] = useState<string | null>(value.imageUrl || null);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update state when value changes
  useEffect(() => {
    if (isOpen) {
      setLabel(value.label);
      setColors(value.colors || []);
      setImageUrl(value.imageUrl || null);
    }
  }, [value, isOpen]);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });


  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const imageFile = files.find((file) => file.type.startsWith('image/'));
    if (!imageFile) {
      alert(t('admin.attributes.valueModal.selectImageFile'));
      if (event.target) {
        event.target.value = '';
      }
      return;
    }

    try {
      setImageUploading(true);
      const base64 = await fileToBase64(imageFile);
      setImageUrl(base64);
    } catch (error: any) {
      console.error('❌ [ADMIN] Error uploading image:', error);
      alert(error?.message || t('admin.attributes.valueModal.failedToProcessImage'));
    } finally {
      setImageUploading(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await onSave({
        label: label.trim() !== value.label ? label.trim() : undefined,
        colors: colors.length > 0 ? colors : undefined,
        imageUrl: imageUrl,
      });
      onClose();
    } catch (error: any) {
      console.error('❌ [ADMIN] Error saving value:', error);
      alert(error?.message || t('admin.attributes.valueModal.failedToSave'));
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            {t('admin.attributes.valueModal.editValue')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={t('admin.attributes.valueModal.close')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('admin.attributes.valueModal.label')}
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder={t('admin.attributes.valueModal.labelPlaceholder')}
            />
          </div>

          {/* Colors and Image Section - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colors Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('admin.attributes.valueModal.colors')}
              </label>
              <ColorPaletteSelector colors={colors} onColorsChange={setColors} />
            </div>

            {/* Image Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('admin.attributes.valueModal.image')}
              </label>
              {imageUrl ? (
                <div className="space-y-3">
                  <div className="relative inline-block">
                    <img
                      src={imageUrl}
                      alt={t('admin.attributes.valueModal.imagePreview')}
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
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
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('admin.attributes.valueModal.cancel')}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !label.trim()}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
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
    </div>
  );
}

