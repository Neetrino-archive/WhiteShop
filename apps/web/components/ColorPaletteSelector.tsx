'use client';

import { useState, useRef } from 'react';
import { useTranslation } from '../lib/i18n-client';

interface ColorPaletteSelectorProps {
  colors: string[];
  onColorsChange: (colors: string[]) => void;
}

/**
 * Color Palette Selector Component
 * Allows selecting colors via custom color picker
 */
export function ColorPaletteSelector({ colors, onColorsChange }: ColorPaletteSelectorProps) {
  const { t } = useTranslation();
  const [customColor, setCustomColor] = useState('#000000');
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only update the swatch color preview, don't add to list yet
    const newColor = e.target.value;
    setCustomColor(newColor);
  };

  const handleAddColor = () => {
    // Add color when user clicks the add button
    if (customColor && customColor !== '#000000' && !colors.includes(customColor)) {
      onColorsChange([...colors, customColor]);
      setCustomColor('#000000');
    }
  };

  const handleRemoveColor = (index: number) => {
    onColorsChange(colors.filter((_, i) => i !== index));
  };

  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    onColorsChange(newColors);
  };

  return (
    <div className="space-y-4">
      {/* Selected Colors */}
      {colors.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t('admin.attributes.valueModal.selectedColors')} ({colors.length})
          </label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 shadow-sm cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="w-24 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="#000000"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveColor(index)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  title={t('admin.attributes.valueModal.removeColor')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Color Swatch */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('admin.attributes.valueModal.addColor')}
        </label>
        <div className="flex items-center gap-3">
          <div className="relative inline-block">
            <div
              className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm cursor-pointer hover:border-gray-500 transition-colors"
              style={{ backgroundColor: customColor }}
              onClick={() => colorInputRef.current?.click()}
              title={t('admin.attributes.valueModal.addColor')}
            />
            <input
              ref={colorInputRef}
              type="color"
              value={customColor}
              onChange={handleColorPickerChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <button
            type="button"
            onClick={handleAddColor}
            disabled={!customColor || customColor === '#000000' || colors.includes(customColor)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {t('admin.attributes.valueModal.add')}
          </button>
        </div>
      </div>
    </div>
  );
}

