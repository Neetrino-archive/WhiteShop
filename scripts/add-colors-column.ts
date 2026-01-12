/**
 * Script to add colors and imageUrl columns to attribute_values table
 * This fixes the error: "The column 'attribute_values.colors' does not exist"
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { db } from "../packages/db/client";

async function addColumns() {
  try {
    console.log("🔧 Adding colors and imageUrl columns to attribute_values table...");

    // Add colors column
    await db.$executeRaw`
      ALTER TABLE "attribute_values" 
      ADD COLUMN IF NOT EXISTS "colors" JSONB DEFAULT '[]'::jsonb;
    `;
    console.log("✅ Added 'colors' column");

    // Add imageUrl column
    await db.$executeRaw`
      ALTER TABLE "attribute_values" 
      ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;
    `;
    console.log("✅ Added 'imageUrl' column");

    // Create index for better performance
    await db.$executeRaw`
      CREATE INDEX IF NOT EXISTS "attribute_values_colors_idx" 
      ON "attribute_values" USING GIN ("colors");
    `;
    console.log("✅ Created index on 'colors' column");

    // Verify columns were added
    const result = await db.$queryRaw<Array<{ column_name: string; data_type: string }>>`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'attribute_values' 
      AND column_name IN ('colors', 'imageUrl')
      ORDER BY column_name;
    `;

    console.log("📊 Verification:");
    result.forEach((row) => {
      console.log(`   - ${row.column_name}: ${row.data_type}`);
    });

    console.log("\n✅ Migration completed successfully!");
    console.log("🔄 Please restart your Next.js development server.");
  } catch (error) {
    console.error("❌ Error adding columns:", error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

addColumns();

