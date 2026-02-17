'use client';

import type { ChangeEvent, RefObject } from 'react';
import { Button, Input } from '@shop/ui';
import { useTranslation } from '../../../../../lib/i18n-client';
import { getColorHex } from '../../../../../lib/colorMap';
import { CURRENCIES, type CurrencyCode } from '../../../../../lib/currency';
import type { Attribute, GeneratedVariant } from '../types';

interface VariantBuilderProps {
  generatedVariants: GeneratedVariant[];
  attributes: Attribute[];
  selectedAttributesForVariants: Set<string>;
  isEditMode: boolean;
  hasVariantsToLoad: boolean;
  defaultCurrency: CurrencyCode;
  imageUploadLoading: boolean;
  slug: string;
  title: string;
  variantImageInputRefs: RefObject<Record<string, HTMLInputElement | null>>;
  onVariantUpdate: (updater: (prev: GeneratedVariant[]) => GeneratedVariant[]) => void;
  onVariantDelete: (variantId: string) => void;
  onVariantAdd: () => void;
  onApplyToAll: (field: 'price' | 'compareAtPrice' | 'stock' | 'sku', value: string) => void;
  onVariantImageUpload: (variantId: string, event: ChangeEvent<HTMLInputElement>) => void;
  onOpenValueModal: (modal: { variantId: string; attributeId: string } | null) => void;
  generateSlug: (title: string) => string;
}

export function VariantBuilder({
  generatedVariants,
  attributes,
  selectedAttributesForVariants,
  isEditMode,
  hasVariantsToLoad,
  defaultCurrency,
  imageUploadLoading,
  slug,
  title,
  variantImageInputRefs,
  onVariantUpdate,
  onVariantDelete,
  onVariantAdd,
  onApplyToAll,
  onVariantImageUpload,
  onOpenValueModal,
  generateSlug,
}: VariantBuilderProps) {
  const { t } = useTranslation();

  // Get attributes to show in table header
  const getAttributesToShow = (variant?: GeneratedVariant) => {
    if (selectedAttributesForVariants.size > 0) {
      return Array.from(selectedAttributesForVariants);
    }
    if (isEditMode && variant) {
      // Extract unique attribute IDs from this variant's values
      const attrIds = new Set<string>();
      variant.selectedValueIds.forEach((valueId) => {
        const attr = attributes.find((a) => a.values.some((v) => v.id === valueId));
        if (attr) attrIds.add(attr.id);
      });
      return Array.from(attrIds);
    }
    return [];
  };

  const attributesToShow = generatedVariants.length > 0 ? getAttributesToShow(generatedVariants[0]) : [];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('admin.products.add.variantBuilder')}</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        {/* Generated Variants Table */}
        {generatedVariants.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('admin.products.add.generatedVariants')} ({generatedVariants.length.toString()})
              </h3>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const price = prompt(t('admin.products.add.enterDefaultPrice'));
                    if (price !== null) {
                      onApplyToAll('price', price);
                    }
                  }}
                >
                  {t('admin.products.add.applyPriceToAll')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const stock = prompt(t('admin.products.add.enterDefaultStock'));
                    if (stock !== null) {
                      onApplyToAll('stock', stock);
                    }
                  }}
                >
                  {t('admin.products.add.applyStockToAll')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const skuPrefix = prompt(t('admin.products.add.enterSkuPrefix'));
                    if (skuPrefix !== null) {
                      const baseSlug = skuPrefix || slug || generateSlug(title) || 'PROD';
                      onVariantUpdate((prev) =>
                        prev.map((variant) => {
                          const valueParts: string[] = [];
                          Array.from(selectedAttributesForVariants).forEach((attributeId) => {
                            const attribute = attributes.find((a) => a.id === attributeId);
                            if (!attribute) return;

                            const selectedIds = variant.selectedValueIds.filter((id) =>
                              attribute.values.some((v) => v.id === id)
                            );

                            selectedIds.forEach((valueId) => {
                              const value = attribute.values.find((v) => v.id === valueId);
                              if (value) {
                                valueParts.push(value.value.toUpperCase().replace(/\s+/g, '-'));
                              }
                            });
                          });

                          const sku =
                            valueParts.length > 0
                              ? `${baseSlug.toUpperCase()}-${valueParts.join('-')}`
                              : `${baseSlug.toUpperCase()}`;

                          return { ...variant, sku };
                        })
                      );
                    }
                  }}
                >
                  {t('admin.products.add.applySkuToAll')}
                </Button>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
              <table className="w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    {attributesToShow.map((attributeId) => {
                      const attribute = attributes.find((a) => a.id === attributeId);
                      return attribute ? (
                        <th
                          key={attributeId}
                          className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {attribute.name}
                        </th>
                      ) : null;
                    })}
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.products.add.price')}
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.products.add.compareAtPrice')}
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.products.add.stock')}
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.products.add.sku')}
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.products.add.image')}
                    </th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                      {t('admin.products.add.actions') || 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {generatedVariants.map((variant) => {
                    const variantAttributesToShow = getAttributesToShow(variant);

                    return (
                      <tr key={variant.id} className="hover:bg-gray-50">
                        {variantAttributesToShow.map((attributeId) => {
                          const attribute = attributes.find((a) => a.id === attributeId);
                          if (!attribute) return null;

                          const isColor = attribute.key === 'color';
                          const selectedValueIds = variant.selectedValueIds.filter((id) => {
                            return attribute.values.some((v) => v.id === id);
                          });
                          const selectedValues = selectedValueIds
                            .map((valueId) => {
                              const value = attribute.values.find((v) => v.id === valueId);
                              return value
                                ? {
                                    id: value.id,
                                    label: value.label,
                                    value: value.value,
                                    colorHex: isColor ? (value.colors?.[0] || getColorHex(value.label)) : null,
                                    imageUrl: value.imageUrl || null,
                                  }
                                : null;
                            })
                            .filter((v): v is NonNullable<typeof v> => v !== null);

                          return (
                            <td key={attributeId} className="px-2 py-2 whitespace-nowrap">
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() => {
                                    onOpenValueModal({ variantId: variant.id, attributeId });
                                  }}
                                  className="w-full text-left flex items-center gap-1 p-1.5 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <div className="flex-1 flex flex-wrap items-center gap-1 min-w-0">
                                    {selectedValues.length > 0 ? (
                                      selectedValues.map((val) => (
                                        <span
                                          key={val.id}
                                          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-xs"
                                        >
                                          {val.imageUrl ? (
                                            <img
                                              src={val.imageUrl}
                                              alt={val.label}
                                              className="w-3 h-3 object-cover rounded border border-gray-300"
                                            />
                                          ) : isColor && val.colorHex ? (
                                            <span
                                              className="inline-block w-3 h-3 rounded-full border border-gray-300"
                                              style={{ backgroundColor: val.colorHex }}
                                            />
                                          ) : null}
                                          {val.label}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-xs text-gray-500">{t('admin.products.add.valuesPlaceholder')}</span>
                                    )}
                                  </div>
                                  <svg
                                    className="w-3 h-3 text-gray-400 transition-transform flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          );
                        })}
                        <td className="px-2 py-2 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              value={variant.price}
                              onChange={(e) => {
                                onVariantUpdate((prev) =>
                                  prev.map((v) => (v.id === variant.id ? { ...v, price: e.target.value } : v))
                                );
                              }}
                              placeholder={t('admin.products.add.pricePlaceholder')}
                              className="w-20 text-xs"
                              min="0"
                              step="0.01"
                            />
                            <span className="text-xs text-gray-500">{CURRENCIES[defaultCurrency].symbol}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              value={variant.compareAtPrice}
                              onChange={(e) => {
                                onVariantUpdate((prev) =>
                                  prev.map((v) => (v.id === variant.id ? { ...v, compareAtPrice: e.target.value } : v))
                                );
                              }}
                              placeholder={t('admin.products.add.pricePlaceholder')}
                              className="w-20 text-xs"
                              min="0"
                              step="0.01"
                            />
                            <span className="text-xs text-gray-500">{CURRENCIES[defaultCurrency].symbol}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <Input
                            type="number"
                            value={variant.stock}
                            onChange={(e) => {
                              onVariantUpdate((prev) =>
                                prev.map((v) => (v.id === variant.id ? { ...v, stock: e.target.value } : v))
                              );
                            }}
                            placeholder={t('admin.products.add.quantityPlaceholder')}
                            className="w-16 text-xs"
                            min="0"
                          />
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <Input
                            type="text"
                            value={variant.sku}
                            onChange={(e) => {
                              onVariantUpdate((prev) =>
                                prev.map((v) => (v.id === variant.id ? { ...v, sku: e.target.value } : v))
                              );
                            }}
                            placeholder={t('admin.products.add.autoGenerated')}
                            className="w-24 text-xs"
                          />
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {variant.image ? (
                              <div className="relative inline-block">
                                <img
                                  src={variant.image}
                                  alt="Variant image"
                                  className="w-12 h-12 object-cover border border-gray-300 rounded-md"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    onVariantUpdate((prev) =>
                                      prev.map((v) => (v.id === variant.id ? { ...v, image: null } : v))
                                    );
                                    if (variantImageInputRefs.current?.[variant.id]) {
                                      variantImageInputRefs.current[variant.id]!.value = '';
                                    }
                                  }}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                                  title={t('admin.products.add.removeImage')}
                                >
                                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => variantImageInputRefs.current?.[variant.id]?.click()}
                                disabled={imageUploadLoading}
                                className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="hidden sm:inline">
                                  {imageUploadLoading ? t('admin.products.add.uploading') : t('admin.products.add.uploadImage')}
                                </span>
                                <span className="sm:hidden">+</span>
                              </button>
                            )}
                            <input
                              ref={(el) => {
                                if (variantImageInputRefs.current) {
                                  variantImageInputRefs.current[variant.id] = el;
                                }
                              }}
                              type="file"
                              accept="image/*"
                              onChange={(e) => onVariantImageUpload(variant.id, e)}
                              className="hidden"
                            />
                          </div>
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => onVariantDelete(variant.id)}
                            className="px-2 py-1 text-xs font-medium text-red-700 bg-red-50 border border-red-300 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors flex items-center gap-1"
                            title={t('admin.products.add.deleteVariant') || 'Delete variant'}
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            {t('admin.products.add.delete') || 'Delete'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onVariantAdd}>
                {t('admin.products.add.addVariant') || 'Add'}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  console.log('✅ [VARIANT BUILDER] Variants ready for submission:', generatedVariants);
                }}
              >
                {t('admin.products.add.variantsReady') || 'Variants Ready'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


