import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '../../../../lib/api-client';
import { useTranslation } from '../../../../lib/i18n-client';
import type { Product, ProductsResponse } from '../types';

interface UseProductHandlersProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  selectedIds: Set<string>;
  setSelectedIds: (ids: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
  setPage: (page: number | ((prev: number) => number)) => void;
  setBulkDeleting: (deleting: boolean) => void;
  setTogglingAllFeatured: (toggling: boolean) => void;
}

export function useProductHandlers({
  products,
  setProducts,
  fetchProducts,
  selectedIds,
  setSelectedIds,
  setPage,
  setBulkDeleting,
  setTogglingAllFeatured,
}: UseProductHandlersProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (products.length === 0) return;
    setSelectedIds(prev => {
      const allIds = products.map(p => p.id);
      const hasAll = allIds.every(id => prev.has(id));
      return hasAll ? new Set() : new Set(allIds);
    });
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(t('admin.products.bulkDeleteConfirm').replace('{count}', selectedIds.size.toString()))) return;
    setBulkDeleting(true);
    try {
      const ids = Array.from(selectedIds);
      const results = await Promise.allSettled(
        ids.map(id => apiClient.delete(`/api/v1/admin/products/${id}`))
      );
      const failed = results.filter(r => r.status === 'rejected');
      setSelectedIds(new Set());
      await fetchProducts();
      alert(t('admin.products.bulkDeleteFinished').replace('{success}', (ids.length - failed.length).toString()).replace('{total}', ids.length.toString()));
    } catch (err) {
      console.error('❌ [ADMIN] Bulk delete products error:', err);
      alert(t('admin.products.failedToDelete'));
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleDeleteProduct = async (productId: string, productTitle: string) => {
    if (!confirm(t('admin.products.deleteConfirm').replace('{title}', productTitle))) {
      return;
    }

    try {
      await apiClient.delete(`/api/v1/admin/products/${productId}`);
      console.log('✅ [ADMIN] Product deleted successfully');
      
      // Refresh products list
      fetchProducts();
      
      alert(t('admin.products.deletedSuccess'));
    } catch (err: any) {
      console.error('❌ [ADMIN] Error deleting product:', err);
      alert(t('admin.products.errorDeleting').replace('{message}', err.message || t('admin.common.unknownErrorFallback')));
    }
  };

  const handleTogglePublished = async (productId: string, currentStatus: boolean, productTitle: string) => {
    try {
      const newStatus = !currentStatus;
      
      // При изменении только статуса published, отправляем только статус
      // Это позволяет избежать проблем с валидацией вариантов (например, требование размеров)
      // Варианты и другие данные останутся без изменений на сервере
      const updateData = {
        published: newStatus,
      };
      
      console.log(`🔄 [ADMIN] Updating product status to ${newStatus ? 'published' : 'draft'}`);
      
      await apiClient.put(`/api/v1/admin/products/${productId}`, updateData);
      
      console.log(`✅ [ADMIN] Product ${newStatus ? 'published' : 'unpublished'} successfully`);
      
      // Refresh products list
      fetchProducts();
      
      if (newStatus) {
        alert(t('admin.products.productPublished').replace('{title}', productTitle));
      } else {
        alert(t('admin.products.productDraft').replace('{title}', productTitle));
      }
    } catch (err: any) {
      console.error('❌ [ADMIN] Error updating product status:', err);
      alert(t('admin.products.errorUpdatingStatus').replace('{message}', err.message || t('admin.common.unknownErrorFallback')));
    }
  };

  const handleToggleFeatured = async (productId: string, currentStatus: boolean, productTitle: string) => {
    try {
      const newStatus = !currentStatus;
      
      const updateData = {
        featured: newStatus,
      };
      
      console.log(`⭐ [ADMIN] Updating product featured status to ${newStatus ? 'featured' : 'not featured'}`);
      
      await apiClient.put(`/api/v1/admin/products/${productId}`, updateData);
      
      console.log(`✅ [ADMIN] Product ${newStatus ? 'marked as featured' : 'removed from featured'} successfully`);
      
      // Refresh products list
      fetchProducts();
    } catch (err: any) {
      console.error('❌ [ADMIN] Error updating product featured status:', err);
      alert(t('admin.products.errorUpdatingFeatured').replace('{message}', err.message || t('admin.common.unknownErrorFallback')));
    }
  };

  const handleToggleAllFeatured = async () => {
    if (products.length === 0) return;

    // Check if all products are featured
    const allFeatured = products.every(p => p.featured);
    const newStatus = !allFeatured;

    setTogglingAllFeatured(true);
    try {
      const results = await Promise.allSettled(
        products.map(product => 
          apiClient.put(`/api/v1/admin/products/${product.id}`, { featured: newStatus })
        )
      );
      
      const failed = results.filter(r => r.status === 'rejected');
      const successCount = products.length - failed.length;
      
      console.log(`✅ [ADMIN] Toggle all featured completed: ${successCount}/${products.length} successful`);
      
      // Refresh products list
      await fetchProducts();
      
      if (failed.length > 0) {
        alert(t('admin.products.featuredToggleFinished').replace('{success}', successCount.toString()).replace('{total}', products.length.toString()));
      }
    } catch (err) {
      console.error('❌ [ADMIN] Toggle all featured error:', err);
      alert(t('admin.products.failedToUpdateFeatured'));
    } finally {
      setTogglingAllFeatured(false);
    }
  };

  return {
    handleSearch,
    toggleSelect,
    toggleSelectAll,
    handleBulkDelete,
    handleDeleteProduct,
    handleTogglePublished,
    handleToggleFeatured,
    handleToggleAllFeatured,
  };
}

