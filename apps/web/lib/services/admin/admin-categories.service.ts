import { db } from "@white-shop/db";

class AdminCategoriesService {
  /**
   * Get categories for admin
   */
  async getCategories() {
    const categories = await db.category.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        translations: {
          where: { locale: "en" },
          take: 1,
        },
      },
      orderBy: {
        position: "asc",
      },
    });

    return {
      data: categories.map((category: { id: string; parentId: string | null; requiresSizes: boolean | null; translations?: Array<{ title: string; slug: string }> }) => {
        const translations = Array.isArray(category.translations) ? category.translations : [];
        const translation = translations[0] || null;
        return {
          id: category.id,
          title: translation?.title || "",
          slug: translation?.slug || "",
          parentId: category.parentId,
          requiresSizes: category.requiresSizes || false,
        };
      }),
    };
  }

  /**
   * Create category
   */
  async createCategory(data: {
    title: string;
    locale?: string;
    parentId?: string;
    requiresSizes?: boolean;
  }) {
    const locale = data.locale || "en";
    
    // Validate parent category exists if parentId is provided
    if (data.parentId) {
      const parentCategory = await db.category.findUnique({
        where: { id: data.parentId },
      });

      if (!parentCategory) {
        throw {
          status: 404,
          type: "https://api.shop.am/problems/not-found",
          title: "Parent category not found",
          detail: `Parent category with id '${data.parentId}' does not exist`,
        };
      }
    }
    
    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const category = await db.category.create({
      data: {
        parentId: data.parentId || undefined,
        requiresSizes: data.requiresSizes || false,
        published: true,
        translations: {
          create: {
            locale,
            title: data.title,
            slug,
            fullPath: slug, // Can be enhanced to build full path
          },
        },
      },
      include: {
        translations: true,
      },
    });

    // Безопасное получение translation с проверкой на существование массива
    const categoryTranslations = Array.isArray(category.translations) ? category.translations : [];
    const translation = categoryTranslations.find((t: { locale: string }) => t.locale === locale) || categoryTranslations[0] || null;

    return {
      data: {
        id: category.id,
        title: translation?.title || "",
        slug: translation?.slug || "",
        parentId: category.parentId,
        requiresSizes: category.requiresSizes || false,
      },
    };
  }

  /**
   * Get category by ID with children
   */
  async getCategoryById(categoryId: string) {
    const category = await db.category.findUnique({
      where: { id: categoryId },
      include: {
        translations: {
          where: { locale: "en" },
          take: 1,
        },
        children: {
          include: {
            translations: {
              where: { locale: "en" },
              take: 1,
            },
          },
        },
      },
    });

    if (!category) {
      return null;
    }

    const translations = Array.isArray(category.translations) ? category.translations : [];
    const translation = translations[0] || null;

    return {
      id: category.id,
      title: translation?.title || "",
      slug: translation?.slug || "",
      parentId: category.parentId,
      requiresSizes: category.requiresSizes || false,
      children: category.children.map((child: { id: string; parentId: string | null; requiresSizes: boolean | null; translations?: Array<{ title: string; slug: string }> }) => {
        const childTranslations = Array.isArray(child.translations) ? child.translations : [];
        const childTranslation = childTranslations[0] || null;
        return {
          id: child.id,
          title: childTranslation?.title || "",
          slug: childTranslation?.slug || "",
          parentId: child.parentId,
          requiresSizes: child.requiresSizes || false,
        };
      }),
    };
  }

  /**
   * Update category
   */
  async updateCategory(categoryId: string, data: {
    title?: string;
    locale?: string;
    parentId?: string | null;
    requiresSizes?: boolean;
    subcategoryIds?: string[];
  }) {
    const locale = data.locale || "en";
    
    const category = await db.category.findUnique({
      where: { id: categoryId },
      include: {
        translations: true,
      },
    });

    if (!category) {
      throw {
        status: 404,
        type: "https://api.shop.am/problems/not-found",
        title: "Category not found",
        detail: `Category with id '${categoryId}' does not exist`,
      };
    }

    // Prevent circular reference (category cannot be its own parent)
    if (data.parentId === categoryId) {
      throw {
        status: 400,
        type: "https://api.shop.am/problems/bad-request",
        title: "Invalid parent",
        detail: "Category cannot be its own parent",
      };
    }

    // Prevent setting parent to a child category (would create circular reference)
    if (data.parentId) {
      const potentialParent = await db.category.findUnique({
        where: { id: data.parentId },
        include: {
          children: {
            where: {
              deletedAt: null,
            },
          },
        },
      });

      if (!potentialParent) {
        throw {
          status: 404,
          type: "https://api.shop.am/problems/not-found",
          title: "Parent category not found",
          detail: `Parent category with id '${data.parentId}' does not exist`,
        };
      }

      // Check if the category to update is in the children of the potential parent
      const isChild = await this.isCategoryDescendant(potentialParent.id, categoryId);
      if (isChild) {
        throw {
          status: 400,
          type: "https://api.shop.am/problems/bad-request",
          title: "Circular reference",
          detail: "Cannot set parent to a category that is a descendant of this category",
        };
      }
    }

    // Update subcategories if provided
    if (data.subcategoryIds !== undefined) {
      // First, remove all existing children relationships
      await db.category.updateMany({
        where: { parentId: categoryId },
        data: { parentId: null },
      });

      // Then, set new children relationships (prevent circular references)
      if (data.subcategoryIds.length > 0) {
        // Filter out the category itself and its descendants
        const validSubcategoryIds = data.subcategoryIds.filter(id => id !== categoryId);
        
        // Check for circular references
        for (const subId of validSubcategoryIds) {
          const isDescendant = await this.isCategoryDescendant(categoryId, subId);
          if (isDescendant) {
            throw {
              status: 400,
              type: "https://api.shop.am/problems/bad-request",
              title: "Circular reference",
              detail: "Cannot set a descendant category as subcategory",
            };
          }
        }

        if (validSubcategoryIds.length > 0) {
          await db.category.updateMany({
            where: { 
              id: { in: validSubcategoryIds },
            },
            data: { parentId: categoryId },
          });
        }
      }
    }

    const updateData: any = {};
    
    if (data.parentId !== undefined) {
      updateData.parentId = data.parentId || null;
    }
    
    if (data.requiresSizes !== undefined) {
      updateData.requiresSizes = data.requiresSizes;
    }

    // Update translation if title is provided
    if (data.title) {
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const categoryTranslations = Array.isArray(category.translations) ? category.translations : [];
      const existingTranslation = categoryTranslations.find((t: { locale: string }) => t.locale === locale);

      if (existingTranslation) {
        // Update existing translation
        await db.categoryTranslation.update({
          where: { id: existingTranslation.id },
          data: {
            title: data.title,
            slug,
          },
        });
      } else {
        // Create new translation
        await db.categoryTranslation.create({
          data: {
            categoryId: category.id,
            locale,
            title: data.title,
            slug,
            fullPath: slug,
          },
        });
      }
    }

    // Update category base data
    const updatedCategory = await db.category.update({
      where: { id: categoryId },
      data: updateData,
      include: {
        translations: true,
      },
    });

    const categoryTranslations = Array.isArray(updatedCategory.translations) ? updatedCategory.translations : [];
    const translation = categoryTranslations.find((t: { locale: string }) => t.locale === locale) || categoryTranslations[0] || null;

    return {
      data: {
        id: updatedCategory.id,
        title: translation?.title || "",
        slug: translation?.slug || "",
        parentId: updatedCategory.parentId,
        requiresSizes: updatedCategory.requiresSizes || false,
      },
    };
  }

  /**
   * Helper function to check if a category is a descendant of another category
   */
  private async isCategoryDescendant(ancestorId: string, descendantId: string, visited: Set<string> = new Set()): Promise<boolean> {
    if (visited.has(descendantId)) {
      // Circular reference detected
      return false;
    }
    visited.add(descendantId);

    const category = await db.category.findUnique({
      where: { id: descendantId },
      include: {
        parent: true,
      },
    });

    if (!category || !category.parent) {
      return false;
    }

    if (category.parent.id === ancestorId) {
      return true;
    }

    return this.isCategoryDescendant(ancestorId, category.parent.id, visited);
  }

  /**
   * Delete category (soft delete)
   */
  async deleteCategory(categoryId: string) {
    console.log('🗑️ [ADMIN SERVICE] deleteCategory called:', categoryId);
    
    const category = await db.category.findUnique({
      where: { id: categoryId },
      include: {
        children: {
          where: {
            deletedAt: null,
          },
        },
      },
    });

    if (!category) {
      throw {
        status: 404,
        type: "https://api.shop.am/problems/not-found",
        title: "Category not found",
        detail: `Category with id '${categoryId}' does not exist`,
      };
    }

    // Check if category has children
    const childrenCount = category.children ? category.children.length : 0;
    if (childrenCount > 0) {
      throw {
        status: 400,
        type: "https://api.shop.am/problems/bad-request",
        title: "Cannot delete category",
        detail: `This category has ${childrenCount} child categor${childrenCount > 1 ? 'ies' : 'y'}. Please delete or move child categories first.`,
        childrenCount,
      };
    }

    // Check if category has products (using count for better performance)
    const productsCount = await db.product.count({
      where: {
        OR: [
          { primaryCategoryId: categoryId },
          { categoryIds: { has: categoryId } },
        ],
        deletedAt: null,
      },
    });

    if (productsCount > 0) {
      throw {
        status: 400,
        type: "https://api.shop.am/problems/bad-request",
        title: "Cannot delete category",
        detail: `This category has ${productsCount} associated product${productsCount > 1 ? 's' : ''}. Please remove products from this category first.`,
        productsCount,
      };
    }

    await db.category.update({
      where: { id: categoryId },
      data: {
        deletedAt: new Date(),
        published: false,
      },
    });

    console.log('✅ [ADMIN SERVICE] Category deleted:', categoryId);
    return { success: true };
  }
}

export const adminCategoriesService = new AdminCategoriesService();



