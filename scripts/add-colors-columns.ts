/**
 * Script to add colors and imageUrl columns to attribute_values table
 * This script safely adds the columns if they don't exist
 */

import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from root .env file
const envPath = path.resolve(__dirname, "..", ".env");
dotenv.config({ path: envPath });
dotenv.config(); // Also try default location

// Verify DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error("❌ Error: DATABASE_URL is not set in environment variables!");
  console.error(`   Checked path: ${envPath}`);
  console.error("   Please make sure .env file exists in the root directory with DATABASE_URL");
  process.exit(1);
}

import { db } from "../packages/db";

async function addColorsColumns() {
  try {
    console.log("🔄 Starting migration: Adding colors and imageUrl columns...\n");

    // Step 1: Add colors column
    console.log("📝 Step 1: Adding 'colors' column...");
    await db.$executeRawUnsafe(`
      DO $$ 
      BEGIN
          IF NOT EXISTS (
              SELECT 1 
              FROM information_schema.columns 
              WHERE table_schema = 'public'
              AND table_name = 'attribute_values' 
              AND column_name = 'colors'
          ) THEN
              ALTER TABLE "attribute_values" ADD COLUMN "colors" JSONB DEFAULT '[]'::jsonb;
              RAISE NOTICE '✅ Column "colors" added to attribute_values table';
          ELSE
              RAISE NOTICE 'ℹ️ Column "colors" already exists in attribute_values table';
          END IF;
      END $$;
    `);
    console.log("✅ Step 1 completed\n");

    // Step 2: Add imageUrl column
    console.log("📝 Step 2: Adding 'imageUrl' column...");
    await db.$executeRawUnsafe(`
      DO $$ 
      BEGIN
          IF NOT EXISTS (
              SELECT 1 
              FROM information_schema.columns 
              WHERE table_schema = 'public'
              AND table_name = 'attribute_values' 
              AND column_name = 'imageUrl'
          ) THEN
              ALTER TABLE "attribute_values" ADD COLUMN "imageUrl" TEXT;
              RAISE NOTICE '✅ Column "imageUrl" added to attribute_values table';
          ELSE
              RAISE NOTICE 'ℹ️ Column "imageUrl" already exists in attribute_values table';
          END IF;
      END $$;
    `);
    console.log("✅ Step 2 completed\n");

    // Step 3: Create index
    console.log("📝 Step 3: Creating index on colors column...");
    await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "attribute_values_colors_idx" 
      ON "attribute_values" USING GIN ("colors");
    `);
    console.log("✅ Step 3 completed\n");

    // Step 4: Verify columns
    console.log("📝 Step 4: Verifying columns...");
    const columns = await db.$queryRawUnsafe<Array<{
      column_name: string;
      data_type: string;
      is_nullable: string;
      column_default: string | null;
    }>>(`
      SELECT 
          column_name, 
          data_type,
          is_nullable,
          column_default
      FROM information_schema.columns 
      WHERE table_schema = 'public'
      AND table_name = 'attribute_values'
      AND column_name IN ('colors', 'imageUrl')
      ORDER BY column_name;
    `);

    console.log("📊 Verification results:");
    if (columns.length === 0) {
      console.log("⚠️  No columns found! Something went wrong.");
    } else {
      columns.forEach((col) => {
        console.log(`   ✅ ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
      });
    }

    console.log("\n✅ Migration completed successfully!");
    console.log("\n📋 Next steps:");
    console.log("   1. Run: cd packages/db && npx prisma generate");
    console.log("   2. Restart your Next.js development server\n");

  } catch (error: any) {
    console.error("\n❌ Migration failed:", error);
    console.error("\nError details:", error.message);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

// Run migration
addColorsColumns();

