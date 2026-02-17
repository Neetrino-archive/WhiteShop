import { db } from "@white-shop/db";

class AdminAttributesWriteService {
  /**
   * Ensure colors and imageUrl columns exist in attribute_values table
   * This is a runtime migration that runs automatically when needed
   */
  private async ensureColorsColumnsExist() {
    try {
      // Check if colors column exists
      const colorsCheck = await db.$queryRawUnsafe(`
        SELECT EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_schema = 'public'
          AND table_name = 'attribute_values' 
          AND column_name = 'colors'
        ) as exists;
      `) as Array<{ exists: boolean }>;

      const colorsExists = colorsCheck[0]?.exists || false;

      // Check if imageUrl column exists
      const imageUrlCheck = await db.$queryRawUnsafe(`
        SELECT EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_schema = 'public'
          AND table_name = 'attribute_values' 
          AND column_name = 'imageUrl'
        ) as exists;
      `) as Array<{ exists: boolean }>;

      const imageUrlExists = imageUrlCheck[0]?.exists || false;

      if (colorsExists && imageUrlExists) {
        return; // Columns already exist
      }

      console.log('📝 [ADMIN ATTRIBUTES WRITE SERVICE] Adding missing colors/imageUrl columns...');

      // Add colors column if it doesn't exist
      if (!colorsExists) {
        await db.$executeRawUnsafe(`
          ALTER TABLE "attribute_values" ADD COLUMN IF NOT EXISTS "colors" JSONB DEFAULT '[]'::jsonb;
        `);
        console.log('✅ [ADMIN ATTRIBUTES WRITE SERVICE] Added "colors" column');
      }

      // Add imageUrl column if it doesn't exist
      if (!imageUrlExists) {
        await db.$executeRawUnsafe(`
          ALTER TABLE "attribute_values" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;
        `);
        console.log('✅ [ADMIN ATTRIBUTES WRITE SERVICE] Added "imageUrl" column');
      }

      // Create index if it doesn't exist
      await db.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "attribute_values_colors_idx" 
        ON "attribute_values" USING GIN ("colors");
      `);

      console.log('✅ [ADMIN ATTRIBUTES WRITE SERVICE] Migration completed successfully!');
    } catch (error: any) {
      console.error('❌ [ADMIN ATTRIBUTES WRITE SERVICE] Migration error:', error.message);
      throw error; // Re-throw to handle in calling code
    }
  }

  /**
   * Create attribute
   */
  async createAttribute(data: {
    name: string;
    key: string;
    type?: string;
    filterable?: boolean;
    locale?: string;
  }) {
    console.log('🆕 [ADMIN ATTRIBUTES WRITE SERVICE] Creating attribute:', data.key);

    // Check if attribute with this key already exists
    const existing = await db.attribute.findUnique({
      where: { key: data.key },
    });

    if (existing) {
      throw {
        status: 400,
        type: "https://api.shop.am/problems/validation-error",
        title: "Attribute already exists",
        detail: `Attribute with key '${data.key}' already exists`,
      };
    }

    const attribute = await db.attribute.create({
      data: {
        key: data.key,
        type: data.type || "select",
        filterable: data.filterable !== false,
        translations: {
          create: {
            locale: data.locale || "en",
            name: data.name,
          },
        },
      },
      include: {
        translations: {
          where: { locale: data.locale || "en" },
        },
        values: {
          include: {
            translations: {
              where: { locale: data.locale || "en" },
            },
          },
        },
      },
    });

    const translation = attribute.translations[0];
    const values = attribute.values || [];

    return {
      id: attribute.id,
      key: attribute.key,
      name: translation?.name || attribute.key,
      type: attribute.type,
      filterable: attribute.filterable,
      values: values.map((val: any) => {
        const valTranslation = val.translations?.[0];
        return {
          id: val.id,
          value: val.value,
          label: valTranslation?.label || val.value,
        };
      }),
    };
  }

  /**
   * Update attribute translation (name)
   */
  async updateAttributeTranslation(
    attributeId: string,
    data: {
      name: string;
      locale?: string;
    }
  ) {
    console.log('✏️ [ADMIN ATTRIBUTES WRITE SERVICE] Updating attribute translation:', { attributeId, name: data.name });

    const attribute = await db.attribute.findUnique({
      where: { id: attributeId },
      include: {
        translations: {
          where: { locale: data.locale || "en" },
        },
      },
    });

    if (!attribute) {
      throw {
        status: 404,
        type: "https://api.shop.am/problems/not-found",
        title: "Attribute not found",
        detail: `Attribute with id '${attributeId}' does not exist`,
      };
    }

    const locale = data.locale || "en";

    // Use upsert to handle both create and update cases
    await db.attributeTranslation.upsert({
      where: {
        attributeId_locale: {
          attributeId,
          locale,
        },
      },
      update: {
        name: data.name.trim(),
      },
      create: {
        attributeId,
        locale,
        name: data.name.trim(),
      },
    });

    // Return updated attribute with all values
    const updatedAttribute = await db.attribute.findUnique({
      where: { id: attributeId },
      include: {
        translations: {
          where: { locale },
        },
        values: {
          include: {
            translations: {
              where: { locale },
            },
          },
          orderBy: { position: "asc" },
        },
      },
    });

    if (!updatedAttribute) {
      throw {
        status: 500,
        type: "https://api.shop.am/problems/internal-error",
        title: "Internal Server Error",
        detail: "Failed to retrieve updated attribute",
      };
    }

    const translation = updatedAttribute.translations[0];
    const values = updatedAttribute.values || [];

    return {
      id: updatedAttribute.id,
      key: updatedAttribute.key,
      name: translation?.name || updatedAttribute.key,
      type: updatedAttribute.type,
      filterable: updatedAttribute.filterable,
      values: values.map((val: any) => {
        const valTranslation = val.translations?.[0];
        return {
          id: val.id,
          value: val.value,
          label: valTranslation?.label || val.value,
          colors: Array.isArray(val.colors) ? val.colors : (val.colors ? JSON.parse(val.colors as string) : []),
          imageUrl: val.imageUrl || null,
        };
      }),
    };
  }

  /**
   * Add attribute value
   */
  async addAttributeValue(attributeId: string, data: { label: string; locale?: string }) {
    console.log('➕ [ADMIN ATTRIBUTES WRITE SERVICE] Adding attribute value:', { attributeId, label: data.label });

    const attribute = await db.attribute.findUnique({
      where: { id: attributeId },
    });

    if (!attribute) {
      throw {
        status: 404,
        type: "https://api.shop.am/problems/not-found",
        title: "Attribute not found",
        detail: `Attribute with id '${attributeId}' does not exist`,
      };
    }

    // Use label as value (normalized)
    const value = data.label.trim().toLowerCase().replace(/\s+/g, '-');

    // Check if value already exists
    const existing = await db.attributeValue.findFirst({
      where: {
        attributeId,
        value,
      },
    });

    if (existing) {
      throw {
        status: 400,
        type: "https://api.shop.am/problems/validation-error",
        title: "Value already exists",
        detail: `Value '${data.label}' already exists for this attribute`,
      };
    }

    const attributeValue = await db.attributeValue.create({
      data: {
        attributeId,
        value,
        translations: {
          create: {
            locale: data.locale || "en",
            label: data.label.trim(),
          },
        },
      },
    });

    // Return updated attribute with all values
    const updatedAttribute = await db.attribute.findUnique({
      where: { id: attributeId },
      include: {
        translations: {
          where: { locale: data.locale || "en" },
        },
        values: {
          include: {
            translations: {
              where: { locale: data.locale || "en" },
            },
          },
          orderBy: { position: "asc" },
        },
      },
    });

    if (!updatedAttribute) {
      throw {
        status: 500,
        type: "https://api.shop.am/problems/internal-error",
        title: "Internal Server Error",
        detail: "Failed to retrieve updated attribute",
      };
    }

    const translation = updatedAttribute.translations[0];
    const values = updatedAttribute.values || [];

    return {
      id: updatedAttribute.id,
      key: updatedAttribute.key,
      name: translation?.name || updatedAttribute.key,
      type: updatedAttribute.type,
      filterable: updatedAttribute.filterable,
      values: values.map((val: any) => {
        const valTranslation = val.translations?.[0];
        return {
          id: val.id,
          value: val.value,
          label: valTranslation?.label || val.value,
          colors: Array.isArray(val.colors) ? val.colors : (val.colors ? JSON.parse(val.colors as string) : []),
          imageUrl: val.imageUrl || null,
        };
      }),
    };
  }

  /**
   * Update attribute value
   */
  async updateAttributeValue(
    attributeId: string,
    valueId: string,
    data: {
      label?: string;
      colors?: string[];
      imageUrl?: string | null;
      locale?: string;
    }
  ) {
    console.log('✏️ [ADMIN ATTRIBUTES WRITE SERVICE] Updating attribute value:', { attributeId, valueId, data });

    // Ensure colors and imageUrl columns exist (runtime migration)
    try {
      await this.ensureColorsColumnsExist();
    } catch (migrationError: any) {
      console.warn('⚠️ [ADMIN ATTRIBUTES WRITE SERVICE] Migration check failed:', migrationError.message);
      // Continue anyway - might already exist
    }

    const attributeValue = await db.attributeValue.findUnique({
      where: { id: valueId },
      include: {
        attribute: true,
        translations: true,
      },
    });

    if (!attributeValue) {
      throw {
        status: 404,
        type: "https://api.shop.am/problems/not-found",
        title: "Attribute value not found",
        detail: `Attribute value with id '${valueId}' does not exist`,
      };
    }

    if (attributeValue.attributeId !== attributeId) {
      throw {
        status: 400,
        type: "https://api.shop.am/problems/validation-error",
        title: "Validation Error",
        detail: "Attribute value does not belong to the specified attribute",
      };
    }

    const locale = data.locale || "en";
    const updateData: any = {};

    // Update colors if provided
    if (data.colors !== undefined) {
      // Ensure colors is always an array (even if empty)
      // Prisma JSONB field expects an array format
      updateData.colors = Array.isArray(data.colors) ? data.colors : [];
      console.log('🎨 [ADMIN ATTRIBUTES WRITE SERVICE] Setting colors:', { 
        valueId, 
        colors: updateData.colors, 
        colorsType: typeof updateData.colors,
        isArray: Array.isArray(updateData.colors)
      });
    }

    // Update imageUrl if provided
    if (data.imageUrl !== undefined) {
      updateData.imageUrl = data.imageUrl || null;
    }

    // Update translation label if provided
    if (data.label !== undefined) {
      const existingTranslation = attributeValue.translations.find(
        (t: any) => t.locale === locale
      );

      if (existingTranslation) {
        await db.attributeValueTranslation.update({
          where: { id: existingTranslation.id },
          data: { label: data.label.trim() },
        });
      } else {
        await db.attributeValueTranslation.create({
          data: {
            attributeValueId: valueId,
            locale,
            label: data.label.trim(),
          },
        });
      }
    }

    // Update attribute value if colors or imageUrl changed
    if (Object.keys(updateData).length > 0) {
      console.log('💾 [ADMIN ATTRIBUTES WRITE SERVICE] Updating attribute value in database:', { 
        valueId, 
        updateData,
        updateDataKeys: Object.keys(updateData)
      });
      const updatedValue = await db.attributeValue.update({
        where: { id: valueId },
        data: updateData,
      });
      console.log('✅ [ADMIN ATTRIBUTES WRITE SERVICE] Attribute value updated:', { 
        valueId, 
        savedColors: updatedValue.colors,
        savedColorsType: typeof updatedValue.colors
      });
    }

    // Return updated attribute with all values
    const updatedAttribute = await db.attribute.findUnique({
      where: { id: attributeId },
      include: {
        translations: {
          where: { locale },
        },
        values: {
          include: {
            translations: {
              where: { locale },
            },
          },
          orderBy: { position: "asc" },
        },
      },
    });

    if (!updatedAttribute) {
      throw {
        status: 500,
        type: "https://api.shop.am/problems/internal-error",
        title: "Internal Server Error",
        detail: "Failed to retrieve updated attribute",
      };
    }

    const translation = updatedAttribute.translations[0];
    const values = updatedAttribute.values || [];

    return {
      id: updatedAttribute.id,
      key: updatedAttribute.key,
      name: translation?.name || updatedAttribute.key,
      type: updatedAttribute.type,
      filterable: updatedAttribute.filterable,
      values: values.map((val: any) => {
        const valTranslation = val.translations?.[0];
        const colorsData = val.colors;
        let colorsArray: string[] = [];
        
        if (colorsData) {
          if (Array.isArray(colorsData)) {
            colorsArray = colorsData;
          } else if (typeof colorsData === 'string') {
            try {
              colorsArray = JSON.parse(colorsData);
            } catch (e) {
              console.warn('⚠️ [ADMIN ATTRIBUTES WRITE SERVICE] Failed to parse colors JSON in updateAttributeValue:', e);
              colorsArray = [];
            }
          } else if (typeof colorsData === 'object') {
            colorsArray = Array.isArray(colorsData) ? colorsData : [];
          }
        }
        
        // Ensure colorsArray is always an array of strings
        if (!Array.isArray(colorsArray)) {
          colorsArray = [];
        }
        
        return {
          id: val.id,
          value: val.value,
          label: valTranslation?.label || val.value,
          colors: colorsArray,
          imageUrl: val.imageUrl || null,
        };
      }),
    };
  }
}

export const adminAttributesWriteService = new AdminAttributesWriteService();

