'use client';

import { Button } from '@shop/ui';
import { useTranslation } from '../../../../../lib/i18n-client';
import { getColorHex } from '../../../../../lib/colorMap';
import type { Attribute, GeneratedVariant } from '../types';

interface ValueSelectionModalProps {
  openValueModal: { variantId: string; attributeId: string } | null;
  variant: GeneratedVariant | undefined;
  attribute: Attribute | undefined;
  onClose: () => void;
  onVariantUpdate: (updater: (prev: GeneratedVariant[]) => GeneratedVariant[]) => void;
  onAttributeValueIdsUpdate: (updater: (prev: Record<string, string[]>) => Record<string, string[]>) => void;
  selectedAttributeValueIds: Record<string, string[]>;
}

export function ValueSelectionModal({
  openValueModal,
  variant,
  attribute,
  onClose,
  onVariantUpdate,
  onAttributeValueIdsUpdate,
  selectedAttributeValueIds,
}: ValueSelectionModalProps) {
  const { t } = useTranslation();

  if (!openValueModal || !variant || !attribute) return null;

  const isColor = attribute.key === 'color';
  const selectedValueIds = variant.selectedValueIds.filter((id) => {
    return attribute.values.some((v) => v.id === id);
  });

  const handleSelectAll = (checked: boolean) => {
    const isAutoVariant = variant.id === 'variant-all';

    if (checked) {
      // Select all values
      const allValueIds = attribute.values.map((v) => v.id);
      // Add to variant's selectedValueIds (merge with existing)
      const currentIds = variant.selectedValueIds;
      const newIds = [...new Set([...currentIds, ...allValueIds])];

      // Update variant - merge with existing selectedValueIds
      onVariantUpdate((prev) => prev.map((v) => (v.id === variant.id ? { ...v, selectedValueIds: newIds } : v)));

      // Only update selectedAttributeValueIds for auto-generated variant
      if (isAutoVariant) {
        onAttributeValueIdsUpdate((prev) => ({
          ...prev,
          [openValueModal.attributeId]: allValueIds,
        }));
      }
    } else {
      // Deselect all values for this attribute
      const valueIdsToRemove = attribute.values.map((v) => v.id);
      const newIds = variant.selectedValueIds.filter((id) => !valueIdsToRemove.includes(id));

      onVariantUpdate((prev) => prev.map((v) => (v.id === variant.id ? { ...v, selectedValueIds: newIds } : v)));

      // Only update selectedAttributeValueIds for auto-generated variant
      if (isAutoVariant) {
        onAttributeValueIdsUpdate((prev) => ({
          ...prev,
          [openValueModal.attributeId]: [],
        }));
      }
    }
  };

  const handleValueToggle = (valueId: string, checked: boolean) => {
    const isAutoVariant = variant.id === 'variant-all';
    const currentIds = variant.selectedValueIds;
    let newIds: string[];

    if (checked) {
      // Add value if not already selected
      newIds = [...currentIds, valueId];
    } else {
      // Remove value
      newIds = currentIds.filter((id) => id !== valueId);
    }

    // Update variant first (to preserve dropdown state)
    onVariantUpdate((prev) => {
      const updated = prev.map((v) => (v.id === variant.id ? { ...v, selectedValueIds: newIds } : v));
      console.log('✅ [VARIANT BUILDER] Value selection updated:', {
        variantId: variant.id,
        isAutoVariant,
        valueId,
        action: checked ? 'added' : 'removed',
        newSelectedIds: newIds.length,
        totalVariants: updated.length,
      });
      return updated;
    });

    // Only update selectedAttributeValueIds for auto-generated variant
    if (isAutoVariant) {
      const currentAttrIds = selectedAttributeValueIds[openValueModal.attributeId] || [];
      let newAttrIds: string[];
      if (checked) {
        newAttrIds = [...currentAttrIds, valueId];
      } else {
        newAttrIds = currentAttrIds.filter((id) => id !== valueId);
      }

      onAttributeValueIdsUpdate((prev) => ({
        ...prev,
        [openValueModal.attributeId]: newAttrIds,
      }));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-semibold text-gray-900">
            {t('admin.products.add.selectValues')} {attribute.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* "All" option */}
          <label className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-50 mb-3 border border-gray-200">
            <input
              type="checkbox"
              checked={attribute.values.length > 0 && selectedValueIds.length === attribute.values.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-900">All</span>
          </label>

          <div className="border-t border-gray-200 my-3"></div>

          {/* Individual value checkboxes - grid layout */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {attribute.values.map((value) => {
              const isSelected = variant.selectedValueIds.includes(value.id);
              const valueColorHex =
                isColor && value.colors && value.colors.length > 0
                  ? value.colors[0]
                  : isColor
                    ? getColorHex(value.label)
                    : null;

              return (
                <label
                  key={value.id}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-lg cursor-pointer transition-all border-2 ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600'
                      : 'bg-gray-50 border-transparent hover:bg-gray-100 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleValueToggle(value.id, e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                  />
                  {/* Display image, color, or nothing */}
                  {value.imageUrl ? (
                    <img
                      src={value.imageUrl}
                      alt={value.label}
                      className="w-8 h-8 object-cover rounded border border-gray-300 flex-shrink-0"
                    />
                  ) : isColor && valueColorHex ? (
                    <span
                      className="inline-block w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm flex-shrink-0"
                      style={{ backgroundColor: valueColorHex }}
                    />
                  ) : null}
                  <span className="text-xs font-medium text-gray-900 text-center">{value.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
          <Button type="button" variant="outline" onClick={onClose}>
            {t('admin.common.close')}
          </Button>
        </div>
      </div>
    </div>
  );
}


