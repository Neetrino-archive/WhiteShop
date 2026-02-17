import { useState } from 'react';
import { apiClient } from '../../../../../lib/api-client';
import { useTranslation } from '../../../../../lib/i18n-client';
import type { Attribute } from '../types';

interface UseProductAttributeHandlersProps {
  attributes: Attribute[];
  setAttributes: (updater: (prev: Attribute[]) => Attribute[]) => void;
  getColorAttribute: () => Attribute | undefined;
  getSizeAttribute: () => Attribute | undefined;
}

export function useProductAttributeHandlers({
  attributes,
  setAttributes,
  getColorAttribute,
  getSizeAttribute,
}: UseProductAttributeHandlersProps) {
  const { t } = useTranslation();
  const [newColorName, setNewColorName] = useState('');
  const [newSizeName, setNewSizeName] = useState('');
  const [addingColor, setAddingColor] = useState(false);
  const [addingSize, setAddingSize] = useState(false);
  const [colorMessage, setColorMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [sizeMessage, setSizeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleAddColor = async () => {
    setColorMessage(null);
    const colorAttribute = getColorAttribute();
    if (!colorAttribute) {
      setColorMessage({ type: 'error', text: t('admin.products.add.colorAttributeNotFound') });
      return;
    }

    if (!newColorName.trim()) {
      setColorMessage({ type: 'error', text: t('admin.products.add.colorNameRequired') });
      return;
    }

    try {
      setAddingColor(true);
      const response = await apiClient.post<{ data: Attribute }>(`/api/v1/admin/attributes/${colorAttribute.id}/values`, {
        label: newColorName.trim(),
        locale: 'en',
      });
      
      if (response.data) {
        setAttributes((prev) => 
          prev.map((attr) => 
            attr.id === colorAttribute.id ? response.data : attr
          )
        );
        setColorMessage({ type: 'success', text: t('admin.products.add.colorAddedSuccess').replace('{name}', newColorName.trim()) });
        setNewColorName('');
        setTimeout(() => setColorMessage(null), 3000);
      }
    } catch (err: any) {
      setColorMessage({ type: 'error', text: err.message || t('admin.products.add.failedToAddColor') });
    } finally {
      setAddingColor(false);
    }
  };

  const handleAddSize = async () => {
    setSizeMessage(null);
    const sizeAttribute = getSizeAttribute();
    if (!sizeAttribute) {
      setSizeMessage({ type: 'error', text: t('admin.products.add.sizeAttributeNotFound') });
      return;
    }

    if (!newSizeName.trim()) {
      setSizeMessage({ type: 'error', text: t('admin.products.add.sizeNameRequired') });
      return;
    }

    try {
      setAddingSize(true);
      const response = await apiClient.post<{ data: Attribute }>(`/api/v1/admin/attributes/${sizeAttribute.id}/values`, {
        label: newSizeName.trim(),
        locale: 'en',
      });
      
      if (response.data) {
        setAttributes((prev) => 
          prev.map((attr) => 
            attr.id === sizeAttribute.id ? response.data : attr
          )
        );
        setSizeMessage({ type: 'success', text: t('admin.products.add.sizeAddedSuccess').replace('{name}', newSizeName.trim()) });
        setNewSizeName('');
        setTimeout(() => setSizeMessage(null), 3000);
      }
    } catch (err: any) {
      setSizeMessage({ type: 'error', text: err.message || t('admin.products.add.failedToAddSize') });
    } finally {
      setAddingSize(false);
    }
  };

  return {
    newColorName,
    setNewColorName,
    newSizeName,
    setNewSizeName,
    addingColor,
    addingSize,
    colorMessage,
    sizeMessage,
    handleAddColor,
    handleAddSize,
  };
}

