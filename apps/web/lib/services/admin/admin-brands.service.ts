import { db } from "@white-shop/db";

class AdminBrandsService {
  /**
   * Get brands for admin
   */
  async getBrands() {
    const brands = await db.brand.findMany({
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
        createdAt: "desc",
      },
    });

    return {
      data: brands.map((brand: { id: string; slug: string; translations?: Array<{ name: string }> }) => {
        const translations = Array.isArray(brand.translations) ? brand.translations : [];
        const translation = translations[0] || null;
        return {
          id: brand.id,
          name: translation?.name || "",
          slug: brand.slug,
        };
      }),
    };
  }

  /**
   * Create brand
   */
  async createBrand(data: {
    name: string;
    locale?: string;
    logoUrl?: string;
  }) {
    const locale = data.locale || "en";
    
    // Generate base slug from name
    const baseSlug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Generate unique slug by appending number if needed
    let slug = baseSlug;
    let counter = 1;
    let existing = await db.brand.findUnique({
      where: { slug },
    });

    while (existing) {
      slug = `${baseSlug}-${counter}`;
      counter++;
      existing = await db.brand.findUnique({
        where: { slug },
      });
      
      // Safety check to prevent infinite loop
      if (counter > 1000) {
        throw {
          status: 500,
          type: "https://api.shop.am/problems/internal-error",
          title: "Unable to generate unique slug",
          detail: "Could not generate a unique slug for the brand after many attempts",
        };
      }
    }

    const brand = await db.brand.create({
      data: {
        slug,
        logoUrl: data.logoUrl || undefined,
        published: true,
        translations: {
          create: {
            locale,
            name: data.name,
          },
        },
      },
      include: {
        translations: true,
      },
    });

    // Безопасное получение translation с проверкой на существование массива
    const brandTranslations = Array.isArray(brand.translations) ? brand.translations : [];
    const translation = brandTranslations.find((t: { locale: string }) => t.locale === locale) || brandTranslations[0] || null;

    return {
      data: {
        id: brand.id,
        name: translation?.name || "",
        slug: brand.slug,
      },
    };
  }

  /**
   * Update brand
   */
  async updateBrand(
    brandId: string,
    data: {
      name?: string;
      locale?: string;
      logoUrl?: string;
    }
  ) {
    console.log('🔄 [ADMIN SERVICE] updateBrand called:', brandId, data);
    
    const brand = await db.brand.findUnique({
      where: { id: brandId },
      include: {
        translations: true,
      },
    });

    if (!brand) {
      throw {
        status: 404,
        type: "https://api.shop.am/problems/not-found",
        title: "Brand not found",
        detail: `Brand with id '${brandId}' does not exist`,
      };
    }

    const locale = data.locale || "en";
    const updateData: any = {};

    // Update logo URL if provided
    if (data.logoUrl !== undefined) {
      updateData.logoUrl = data.logoUrl || null;
    }

    // Update translation if name is provided
    if (data.name !== undefined) {
      const brandTranslations = Array.isArray(brand.translations) ? brand.translations : [];
      const existingTranslation = brandTranslations.find(
        (t: { locale: string }) => t.locale === locale
      );

      if (existingTranslation) {
        // Update existing translation
        await db.brandTranslation.update({
          where: { id: existingTranslation.id },
          data: { name: data.name },
        });
      } else {
        // Create new translation
        await db.brandTranslation.create({
          data: {
            brandId: brand.id,
            locale,
            name: data.name,
          },
        });
      }
    }

    // Update brand base data if needed
    if (Object.keys(updateData).length > 0) {
      await db.brand.update({
        where: { id: brandId },
        data: updateData,
      });
    }

    // Fetch updated brand with translations
    const updatedBrand = await db.brand.findUnique({
      where: { id: brandId },
      include: {
        translations: {
          where: { locale },
          take: 1,
        },
      },
    });

    const brandTranslations = Array.isArray(updatedBrand?.translations) 
      ? updatedBrand.translations 
      : [];
    const translation = brandTranslations[0] || null;

    return {
      data: {
        id: updatedBrand!.id,
        name: translation?.name || "",
        slug: updatedBrand!.slug,
      },
    };
  }

  /**
   * Delete brand (soft delete)
   */
  async deleteBrand(brandId: string) {
    console.log('🗑️ [ADMIN SERVICE] deleteBrand called:', brandId);
    
    const brand = await db.brand.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      throw {
        status: 404,
        type: "https://api.shop.am/problems/not-found",
        title: "Brand not found",
        detail: `Brand with id '${brandId}' does not exist`,
      };
    }

    // Check if brand has products (using count for better performance)
    const productsCount = await db.product.count({
      where: {
        brandId: brandId,
        deletedAt: null,
      },
    });

    if (productsCount > 0) {
      throw {
        status: 400,
        type: "https://api.shop.am/problems/bad-request",
        title: "Cannot delete brand",
        detail: `This brand has ${productsCount} associated product${productsCount > 1 ? 's' : ''}. Please remove or change brand for these products first.`,
        productsCount,
      };
    }

    await db.brand.update({
      where: { id: brandId },
      data: {
        deletedAt: new Date(),
        published: false,
      },
    });

    console.log('✅ [ADMIN SERVICE] Brand deleted:', brandId);
    return { success: true };
  }
}

export const adminBrandsService = new AdminBrandsService();



