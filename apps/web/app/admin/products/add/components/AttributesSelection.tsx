'use client';

import type { RefObject } from 'react';
import { useTranslation } from '../../../../../lib/i18n-client';
import { getColorHex } from '../../../../../lib/colorMap';
import type { Attribute } from '../types';

interface AttributesSelectionProps {
  attributes: Attribute[];
  selectedAttributesForVariants: Set<string>;
  selectedAttributeValueIds: Record<string, string[]>;
  attributesDropdownOpen: boolean;
  attributesDropdownRef: RefObject<HTMLDivElement>;
  onAttributesDropdownToggle: () => void;
  onAttributeToggle: (attributeId: string, checked: boolean) => void;
  onAttributeRemove: (attributeId: string) => void;
}

export function AttributesSelection({
  attributes,
  selectedAttributesForVariants,
  selectedAttributeValueIds,
  attributesDropdownOpen,
  attributesDropdownRef,
  onAttributesDropdownToggle,
  onAttributeToggle,
  onAttributeRemove,
}: AttributesSelectionProps) {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('admin.products.add.selectAttributesForVariants')}</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('admin.products.add.attributes')} <span className="text-gray-500 font-normal">{t('admin.products.add.selectMultiple')}</span>
        </label>
        <div className="relative" ref={attributesDropdownRef}>
          <button
            type="button"
            onClick={onAttributesDropdownToggle}
            className="w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm flex items-center justify-between"
          >
            <span className="text-gray-700">
              {selectedAttributesForVariants.size === 0
                ? t('admin.products.add.selectAttributes')
                : selectedAttributesForVariants.size === 1
                  ? t('admin.products.add.attributeSelected').replace('{count}', '1')
                  : t('admin.products.add.attributesSelected').replace('{count}', selectedAttributesForVariants.size.toString())}
            </span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                attributesDropdownOpen ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {attributesDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-y-auto">
              <div className="p-4">
                <div className="mb-3 pb-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {t('admin.products.add.selectAttributes')}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('admin.products.add.selectAttributesDescription')}
                  </p>
                </div>
                {attributes.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    {t('admin.products.add.noAttributesAvailable')}
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {attributes.map((attribute) => (
                      <label
                        key={attribute.id}
                        className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-3 rounded-lg border transition-colors ${
                          selectedAttributesForVariants.has(attribute.id)
                            ? 'bg-blue-50 border-blue-300'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedAttributesForVariants.has(attribute.id)}
                          onChange={(e) => onAttributeToggle(attribute.id, e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-900">{attribute.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {selectedAttributesForVariants.size > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedAttributesForVariants).map((attributeId) => {
                const attribute = attributes.find(a => a.id === attributeId);
                if (!attribute) return null;
                
                // Get selected values for this attribute to show preview
                const selectedValueIds = selectedAttributeValueIds[attributeId] || [];
                const selectedValues = selectedValueIds
                  .map(id => attribute.values.find(v => v.id === id))
                  .filter((v): v is NonNullable<typeof v> => v !== null);
                
                // Get first selected value's image if available
                const previewImage = selectedValues.find(v => v.imageUrl)?.imageUrl;
                const isColor = attribute.key === 'color';
                const previewColor = isColor && selectedValues.length > 0 
                  ? (selectedValues[0].colors?.[0] || getColorHex(selectedValues[0].label))
                  : null;
                
                return (
                  <span
                    key={attributeId}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt={attribute.name}
                        className="w-4 h-4 object-cover rounded border border-gray-300"
                      />
                    ) : previewColor ? (
                      <span
                        className="inline-block w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: previewColor }}
                      />
                    ) : null}
                    {attribute.name}
                    {selectedValues.length > 0 && (
                      <span className="text-xs text-blue-600">
                        ({selectedValues.length})
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onAttributeRemove(attributeId)}
                      className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


