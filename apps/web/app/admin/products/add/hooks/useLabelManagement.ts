'use client';

import type { ProductLabel } from '../types';

interface UseLabelManagementReturn {
  addLabel: () => void;
  removeLabel: (index: number) => void;
  updateLabel: (index: number, field: keyof ProductLabel, value: any) => void;
}

export function useLabelManagement(
  labels: ProductLabel[],
  setLabels: (updater: (prev: ProductLabel[]) => ProductLabel[]) => void
): UseLabelManagementReturn {
  const addLabel = () => {
    const newLabel: ProductLabel = {
      type: 'text',
      value: '',
      position: 'top-left',
      color: null,
    };
    setLabels((prev) => [...prev, newLabel]);
  };

  const removeLabel = (index: number) => {
    setLabels((prev) => prev.filter((_, i) => i !== index));
  };

  const updateLabel = (index: number, field: keyof ProductLabel, value: any) => {
    setLabels((prev) => {
      const newLabels = [...prev];
      newLabels[index] = { ...newLabels[index], [field]: value };
      return newLabels;
    });
  };

  return {
    addLabel,
    removeLabel,
    updateLabel,
  };
}


