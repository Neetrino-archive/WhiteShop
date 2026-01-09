'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../../lib/auth/AuthContext';
import { Card, Button, Input } from '@shop/ui';
import { apiClient } from '../../../lib/api-client';
import { AdminMenuDrawer } from '../../../components/AdminMenuDrawer';
import { getAdminMenuTABS } from '../admin-menu.config';
import { useTranslation } from '../../../lib/i18n-client';

interface Category {
  id: string;
  slug: string;
  title: string;
  parentId: string | null;
  requiresSizes?: boolean;
}

function CategoriesSection() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    parentId: '',
    requiresSizes: false,
  });
  const [saving, setSaving] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      console.log('📂 [ADMIN] Fetching categories...');
      const response = await apiClient.get<{ data: Category[] }>('/api/v1/admin/categories');
      setCategories(response.data || []);
      console.log('✅ [ADMIN] Categories loaded:', response.data?.length || 0);
    } catch (err) {
      console.error('❌ [ADMIN] Error fetching categories:', err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Build category tree for hierarchy display
  const buildCategoryTree = (categories: Category[]): Array<Category & { level: number; children?: Category[] }> => {
    const categoryMap = new Map<string, Category & { level: number; children?: Category[] }>();
    const rootCategories: Array<Category & { level: number; children?: Category[] }> = [];

    // First pass: create map
    categories.forEach(cat => {
      categoryMap.set(cat.id, { ...cat, level: 0 });
    });

    // Second pass: build tree
    categories.forEach(cat => {
      const categoryNode = categoryMap.get(cat.id)!;
      if (cat.parentId && categoryMap.has(cat.parentId)) {
        const parent = categoryMap.get(cat.parentId)!;
        if (!parent.children) {
          parent.children = [];
        }
        categoryNode.level = (parent.level || 0) + 1;
        parent.children.push(categoryNode);
      } else {
        rootCategories.push(categoryNode);
      }
    });

    // Flatten tree for display
    const flattenTree = (nodes: Array<Category & { level: number; children?: Category[] }>, result: Array<Category & { level: number }> = []): Array<Category & { level: number }> => {
      nodes.forEach(node => {
        result.push({ ...node, level: node.level });
        if (node.children) {
          flattenTree(node.children, result);
        }
      });
      return result;
    };

    return flattenTree(rootCategories);
  };

  const categoryTree = buildCategoryTree(categories);

  const handleAddCategory = async () => {
    if (!formData.title.trim()) {
      alert(t('admin.categories.titleRequired'));
      return;
    }

    setSaving(true);
    try {
      await apiClient.post('/api/v1/admin/categories', {
        title: formData.title.trim(),
        parentId: formData.parentId || undefined,
        requiresSizes: formData.requiresSizes,
        locale: 'en',
      });
      setShowAddModal(false);
      setFormData({ title: '', parentId: '', requiresSizes: false });
      fetchCategories();
      alert(t('admin.categories.createdSuccess'));
    } catch (err: any) {
      console.error('❌ [ADMIN] Error creating category:', err);
      alert(err?.data?.detail || err?.message || t('admin.categories.errorCreating'));
    } finally {
      setSaving(false);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      title: category.title,
      parentId: category.parentId || '',
      requiresSizes: category.requiresSizes || false,
    });
    setShowEditModal(true);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !formData.title.trim()) {
      alert(t('admin.categories.titleRequired'));
      return;
    }

    setSaving(true);
    try {
      await apiClient.put(`/api/v1/admin/categories/${editingCategory.id}`, {
        title: formData.title.trim(),
        parentId: formData.parentId || null,
        requiresSizes: formData.requiresSizes,
        locale: 'en',
      });
      setShowEditModal(false);
      setEditingCategory(null);
      setFormData({ title: '', parentId: '', requiresSizes: false });
      fetchCategories();
      alert(t('admin.categories.updatedSuccess'));
    } catch (err: any) {
      console.error('❌ [ADMIN] Error updating category:', err);
      alert(err?.data?.detail || err?.message || t('admin.categories.errorUpdating'));
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string, categoryTitle: string) => {
    if (!confirm(t('admin.categories.deleteConfirm').replace('{name}', categoryTitle))) {
      return;
    }

    try {
      console.log(`🗑️ [ADMIN] Deleting category: ${categoryTitle} (${categoryId})`);
      await apiClient.delete(`/api/v1/admin/categories/${categoryId}`);
      console.log('✅ [ADMIN] Category deleted successfully');
      fetchCategories();
      alert(t('admin.categories.deletedSuccess'));
    } catch (err: any) {
      console.error('❌ [ADMIN] Error deleting category:', err);
      let errorMessage = 'Unknown error occurred';
      if (err.data?.detail) {
        errorMessage = err.data.detail;
      } else if (err.detail) {
        errorMessage = err.detail;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      }
      alert(t('admin.categories.errorDeleting').replace('{message}', errorMessage));
    }
  };

  if (loading) {
    return (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">{t('admin.categories.loadingCategories')}</p>
        </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Add Category Button */}
      <div className="flex justify-end">
        <Button
          variant="primary"
          onClick={() => {
            setFormData({ title: '', parentId: '', requiresSizes: false });
            setShowAddModal(true);
          }}
          className="flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('admin.categories.addCategory')}
        </Button>
      </div>

      {/* Categories List */}
      {categoryTree.length === 0 ? (
        <p className="text-sm text-gray-500 py-2">{t('admin.categories.noCategories')}</p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {categoryTree.map((category) => {
            const parentCategory = category.parentId 
              ? categories.find(c => c.id === category.parentId)
              : null;
            
            return (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                style={{ paddingLeft: `${16 + category.level * 24}px` }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-900">{category.title}</div>
                    {category.requiresSizes && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        Sizes
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {category.slug}
                    {parentCategory && (
                      <span className="ml-2 text-gray-400">
                        → Parent: {parentCategory.title}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditCategory(category)}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {t('admin.common.edit')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id, category.title)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {t('admin.common.delete')}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.categories.addCategory')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.categories.categoryTitle')} *
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={t('admin.categories.categoryTitlePlaceholder')}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.categories.parentCategory')}
                </label>
                <select
                  value={formData.parentId}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t('admin.categories.rootCategory')}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requiresSizes}
                    onChange={(e) => setFormData({ ...formData, requiresSizes: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {t('admin.categories.requiresSizes')}
                  </span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="primary"
                onClick={handleAddCategory}
                disabled={saving || !formData.title.trim()}
                className="flex-1"
              >
                {saving ? t('admin.categories.creating') : t('admin.categories.createCategory')}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({ title: '', parentId: '', requiresSizes: false });
                }}
                disabled={saving}
              >
                {t('admin.common.cancel')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.categories.editCategory')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.categories.categoryTitle')} *
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={t('admin.categories.categoryTitlePlaceholder')}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.categories.parentCategory')}
                </label>
                <select
                  value={formData.parentId}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t('admin.categories.rootCategory')}</option>
                  {categories
                    .filter((cat) => cat.id !== editingCategory.id) // Exclude current category
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requiresSizes}
                    onChange={(e) => setFormData({ ...formData, requiresSizes: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {t('admin.categories.requiresSizes')}
                  </span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="primary"
                onClick={handleUpdateCategory}
                disabled={saving || !formData.title.trim()}
                className="flex-1"
              >
                {saving ? t('admin.categories.updating') : t('admin.categories.updateCategory')}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCategory(null);
                  setFormData({ title: '', parentId: '', requiresSizes: false });
                }}
                disabled={saving}
              >
                {t('admin.common.cancel')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CategoriesPage() {
  const { t } = useTranslation();
  const { isLoggedIn, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname || '/admin/categories');

  useEffect(() => {
    if (pathname) {
      setCurrentPath(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn || !isAdmin) {
        router.push('/admin');
        return;
      }
    }
  }, [isLoggedIn, isAdmin, isLoading, router]);

  const adminTabs = getAdminMenuTABS(t);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('admin.common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin')}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('admin.categories.backToAdmin')}
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.categories.title')}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden mb-6">
            <AdminMenuDrawer tabs={adminTabs} currentPath={currentPath} />
          </div>
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <nav className="bg-white border border-gray-200 rounded-lg p-2 space-y-1">
              {adminTabs.map((tab) => {
                const isActive = currentPath === tab.path || 
                  (tab.path === '/admin' && currentPath === '/admin') ||
                  (tab.path !== '/admin' && currentPath.startsWith(tab.path));
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      router.push(tab.path);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                      tab.isSubCategory ? 'pl-12' : ''
                    } ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                      {tab.icon}
                    </span>
                    <span className="text-left">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('admin.categories.title')}</h2>
              <CategoriesSection />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

