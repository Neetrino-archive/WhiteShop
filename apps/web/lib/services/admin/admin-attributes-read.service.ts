import { db } from "@white-shop/db";

class AdminAttributesReadService {
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

      console.log('📝 [ADMIN ATTRIBUTES READ SERVICE] Adding missing colors/imageUrl columns...');

      // Add colors column if it doesn't exist
      if (!colorsExists) {
        await db.$executeRawUnsafe(`
          ALTER TABLE "attribute_values" ADD COLUMN IF NOT EXISTS "colors" JSONB DEFAULT '[]'::jsonb;
        `);
        console.log('✅ [ADMIN ATTRIBUTES READ SERVICE] Added "colors" column');
      }

      // Add imageUrl column if it doesn't exist
      if (!imageUrlExists) {
        await db.$executeRawUnsafe(`
          ALTER TABLE "attribute_values" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;
        `);
        console.log('✅ [ADMIN ATTRIBUTES READ SERVICE] Added "imageUrl" column');
      }

      // Create index if it doesn't exist
      await db.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "attribute_values_colors_idx" 
        ON "attribute_values" USING GIN ("colors");
      `);

      console.log('✅ [ADMIN ATTRIBUTES READ SERVICE] Migration completed successfully!');
    } catch (error: any) {
      console.error('❌ [ADMIN ATTRIBUTES READ SERVICE] Migration error:', error.message);
      throw error; // Re-throw to handle in calling code
    }
  }

  /**
   * Get attributes
   */
  async getAttributes() {
    // Ensure colors and imageUrl columns exist (runtime migration)
    try {
      await this.ensureColorsColumnsExist();
    } catch (migrationError: any) {
      console.warn('⚠️ [ADMIN ATTRIBUTES READ SERVICE] Migration check failed:', migrationError.message);
      // Continue anyway - might already exist
    }

    let attributes;
    try {
      attributes = await db.attribute.findMany({
        include: {
          translations: {
            where: { locale: "en" },
            take: 1,
          },
          values: {
            include: {
              translations: {
                where: { locale: "en" },
                take: 1,
              },
            },
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    } catch (error: any) {
      // If attribute_values.colors column doesn't exist, fetch without it
      if (error?.code === 'P2022' || error?.message?.includes('attribute_values.colors') || error?.message?.includes('does not exist')) {
        console.warn('⚠️ [ADMIN ATTRIBUTES READ SERVICE] attribute_values.colors column not found, fetching without it:', error.message);
        // Fetch attributes first
        const attributesList = await db.attribute.findMany({
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

        // Fetch values separately without colors and imageUrl using Prisma
        // Try with select first, if it fails (because Prisma tries to select colors), use raw query
        let allValues: any[];
        try {
          allValues = await db.attributeValue.findMany({
            select: {
              id: true,
              attributeId: true,
              value: true,
              position: true,
              translations: {
                where: { locale: "en" },
                take: 1,
              },
            },
            orderBy: {
              position: "asc",
            },
          });
        } catch (selectError: any) {
          // If select also fails, use raw query with correct column name
          // Try with quoted name first, then without quotes
          console.warn('⚠️ [ADMIN ATTRIBUTES READ SERVICE] Using raw query for attribute values:', selectError.message);
          try {
            allValues = await db.$queryRaw`
              SELECT 
                av.id,
                av."attributeId",
                av.value,
                av.position
              FROM attribute_values av
              ORDER BY av.position ASC
            ` as any[];
          } catch (rawError: any) {
            // If quoted name doesn't work, try without quotes (snake_case)
            console.warn('⚠️ [ADMIN ATTRIBUTES READ SERVICE] Trying with snake_case column name:', rawError.message);
            allValues = await db.$queryRaw`
              SELECT 
                av.id,
                av.attribute_id as "attributeId",
                av.value,
                av.position
              FROM attribute_values av
              ORDER BY av.position ASC
            ` as any[];
          }
          
          // Fetch translations separately
          const valueIds = allValues.map((v: any) => v.id);
          const valueTranslations = valueIds.length > 0 
            ? await db.attributeValueTranslation.findMany({
                where: {
                  attributeValueId: { in: valueIds },
                  locale: "en",
                },
              })
            : [];
          
          // Add translations to values
          allValues = allValues.map((val: any) => ({
            ...val,
            translations: valueTranslations.filter((t: any) => t.attributeValueId === val.id),
          }));
        }

        // Combine attributes with their values
        attributes = attributesList.map((attr: any) => {
          const attrValues = allValues
            .filter((val: any) => val.attributeId === attr.id)
            .map((val: any) => {
              return {
                id: val.id,
                attributeId: val.attributeId,
                value: val.value,
                position: val.position,
                colors: null, // Add null for compatibility
                imageUrl: null, // Add null for compatibility
                translations: Array.isArray(val.translations) ? val.translations : [],
              };
            });
          
          return {
            ...attr,
            values: attrValues,
          };
        });
      } else {
        throw error;
      }
    }

    return {
      data: attributes.map((attribute: { id: string; key: string; type: string; filterable: boolean; translations?: Array<{ name: string }>; values?: Array<{ id: string; value: string; translations?: Array<{ label: string }>; colors?: any; imageUrl?: string | null }> }) => {
        const translations = Array.isArray(attribute.translations) ? attribute.translations : [];
        const translation = translations[0] || null;
        const values = Array.isArray(attribute.values) ? attribute.values : [];
        return {
          id: attribute.id,
          key: attribute.key,
          name: translation?.name || attribute.key,
          type: attribute.type,
          filterable: attribute.filterable,
          values: values.map((value: any) => {
            const valueTranslations = Array.isArray(value.translations) ? value.translations : [];
            const valueTranslation = valueTranslations[0] || null;
            const colorsData = value.colors;
            let colorsArray: string[] = [];
            
            if (colorsData) {
              if (Array.isArray(colorsData)) {
                colorsArray = colorsData;
              } else if (typeof colorsData === 'string') {
                try {
                  colorsArray = JSON.parse(colorsData);
                } catch (e) {
                  console.warn('⚠️ [ADMIN ATTRIBUTES READ SERVICE] Failed to parse colors JSON:', e);
                  colorsArray = [];
                }
              } else if (typeof colorsData === 'object') {
                // If it's already an object (from Prisma JSONB), use it directly
                colorsArray = Array.isArray(colorsData) ? colorsData : [];
              }
            }
            
            // Ensure colorsArray is always an array of strings
            if (!Array.isArray(colorsArray)) {
              colorsArray = [];
            }
            
            console.log('🎨 [ADMIN ATTRIBUTES READ SERVICE] Parsed colors for value:', {
              valueId: value.id,
              valueLabel: valueTranslation?.label || value.value,
              colorsData,
              colorsDataType: typeof colorsData,
              colorsArray,
              colorsArrayLength: colorsArray.length
            });
            
            return {
              id: value.id,
              value: value.value,
              label: valueTranslation?.label || value.value,
              colors: colorsArray,
              imageUrl: value.imageUrl || null,
            };
          }),
        };
      }),
    };
  }
}

export const adminAttributesReadService = new AdminAttributesReadService();

