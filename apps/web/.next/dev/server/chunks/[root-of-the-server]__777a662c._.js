module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/packages/db/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
// Ensure UTF-8 encoding for PostgreSQL connection
// This fixes encoding issues with Armenian and other UTF-8 characters
const databaseUrl = process.env.DATABASE_URL || '';
let urlWithEncoding = databaseUrl;
if (!databaseUrl.includes('client_encoding')) {
    urlWithEncoding = databaseUrl.includes('?') ? `${databaseUrl}&client_encoding=UTF8` : `${databaseUrl}?client_encoding=UTF8`;
    // Temporarily override DATABASE_URL for Prisma Client
    process.env.DATABASE_URL = urlWithEncoding;
}
const db = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        "query",
        "error",
        "warn"
    ] : "TURBOPACK unreachable",
    errorFormat: "pretty"
});
// Prisma Client connects automatically on first query (lazy connection)
// No need to call $connect() explicitly as it can cause issues in Next.js API routes
// Connection will be established automatically when the first database query is made
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = db;
}),
"[project]/packages/db/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
}),
"[project]/apps/web/lib/utils/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Logger utility for consistent logging across the application
 * Replaces console.log with structured logging
 */ __turbopack_context__.s([
    "logger",
    ()=>logger
]);
class Logger {
    isDevelopment() {
        return ("TURBOPACK compile-time value", "development") === 'development';
    }
    formatMessage(level, message, context) {
        const timestamp = new Date().toISOString();
        const contextStr = context ? ` ${JSON.stringify(context)}` : '';
        return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
    }
    debug(message, context) {
        if (this.isDevelopment()) {
            console.debug(this.formatMessage('debug', message, context));
        }
    }
    info(message, context) {
        if (this.isDevelopment()) {
            console.info(this.formatMessage('info', message, context));
        }
    }
    warn(message, context) {
        console.warn(this.formatMessage('warn', message, context));
    }
    error(message, context) {
        console.error(this.formatMessage('error', message, context));
    }
    log(message, context) {
        // Alias for info in development
        this.info(message, context);
    }
}
const logger = new Logger();
}),
"[project]/apps/web/lib/utils/db-ensure.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensureProductAttributesTable",
    ()=>ensureProductAttributesTable,
    "ensureProductReviewsTable",
    ()=>ensureProductReviewsTable,
    "ensureProductVariantAttributesColumn",
    ()=>ensureProductVariantAttributesColumn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/logger.ts [app-route] (ecmascript)");
;
;
// Cache to track if table check has been performed
let tableChecked = false;
let tableExists = false;
// Cache for product_reviews table
let reviewsTableChecked = false;
let reviewsTableExists = false;
// Cache for product_variants.attributes column
let attributesColumnChecked = false;
let attributesColumnExists = false;
async function ensureProductAttributesTable() {
    // If already checked and exists, return immediately
    if (tableChecked && tableExists) {
        return true;
    }
    try {
        // Try to query the table to check if it exists
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`SELECT 1 FROM "product_attributes" LIMIT 1`;
        tableChecked = true;
        tableExists = true;
        return true;
    } catch (error) {
        // If table doesn't exist, create it
        const prismaError = error;
        if (prismaError?.code === 'P2021' || prismaError?.message?.includes('does not exist') || prismaError?.message?.includes('product_attributes')) {
            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info('product_attributes table not found, creating...');
            try {
                // Create table if it doesn't exist
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
          CREATE TABLE IF NOT EXISTS "product_attributes" (
            "id" TEXT NOT NULL,
            "productId" TEXT NOT NULL,
            "attributeId" TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT "product_attributes_pkey" PRIMARY KEY ("id")
          )
        `;
                // Create unique index if it doesn't exist
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
          CREATE UNIQUE INDEX IF NOT EXISTS "product_attributes_productId_attributeId_key" 
          ON "product_attributes"("productId", "attributeId")
        `;
                // Create indexes if they don't exist
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
          CREATE INDEX IF NOT EXISTS "product_attributes_productId_idx" 
          ON "product_attributes"("productId")
        `;
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
          CREATE INDEX IF NOT EXISTS "product_attributes_attributeId_idx" 
          ON "product_attributes"("attributeId")
        `;
                // Add foreign key constraints if they don't exist
                // Check and add productId foreign key
                const productFkExists = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`
          SELECT EXISTS (
            SELECT 1 FROM pg_constraint 
            WHERE conname = 'product_attributes_productId_fkey'
          ) as exists
        `;
                if (!productFkExists[0]?.exists) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
            ALTER TABLE "product_attributes" 
            ADD CONSTRAINT "product_attributes_productId_fkey" 
            FOREIGN KEY ("productId") 
            REFERENCES "products"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
          `;
                }
                // Check and add attributeId foreign key
                const attributeFkExists = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`
          SELECT EXISTS (
            SELECT 1 FROM pg_constraint 
            WHERE conname = 'product_attributes_attributeId_fkey'
          ) as exists
        `;
                if (!attributeFkExists[0]?.exists) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
            ALTER TABLE "product_attributes" 
            ADD CONSTRAINT "product_attributes_attributeId_fkey" 
            FOREIGN KEY ("attributeId") 
            REFERENCES "attributes"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
          `;
                }
                // Create trigger for updatedAt (if it doesn't exist)
                const triggerExists = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`
          SELECT EXISTS (
            SELECT 1 FROM pg_trigger 
            WHERE tgname = 'product_attributes_updated_at'
          ) as exists
        `;
                if (!triggerExists[0]?.exists) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
              NEW."updatedAt" = CURRENT_TIMESTAMP;
              RETURN NEW;
            END;
            $$ language 'plpgsql';

            CREATE TRIGGER product_attributes_updated_at
            BEFORE UPDATE ON "product_attributes"
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
          `;
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info('product_attributes table created successfully');
                tableChecked = true;
                tableExists = true;
                return true;
            } catch (createError) {
                const prismaCreateError = createError;
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Failed to create product_attributes table', {
                    message: prismaCreateError?.message,
                    code: prismaCreateError?.code
                });
                tableChecked = true;
                tableExists = false;
                return false;
            }
        }
        // Other errors - log and return false
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Unexpected error checking product_attributes table', {
            message: prismaError?.message,
            code: prismaError?.code
        });
        tableChecked = true;
        tableExists = false;
        return false;
    }
}
async function ensureProductReviewsTable() {
    // If already checked and exists, return immediately
    if (reviewsTableChecked && reviewsTableExists) {
        return true;
    }
    try {
        // Try to query the table to check if it exists
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`SELECT 1 FROM "product_reviews" LIMIT 1`;
        reviewsTableChecked = true;
        reviewsTableExists = true;
        return true;
    } catch (error) {
        // If table doesn't exist, create it
        const prismaError = error;
        if (prismaError?.code === 'P2021' || prismaError?.message?.includes('does not exist') || prismaError?.message?.includes('product_reviews')) {
            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info('product_reviews table not found, creating...');
            try {
                // Create table if it doesn't exist
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
          CREATE TABLE IF NOT EXISTS "product_reviews" (
            "id" TEXT NOT NULL,
            "productId" TEXT NOT NULL,
            "userId" TEXT NOT NULL,
            "rating" INTEGER NOT NULL,
            "comment" TEXT,
            "published" BOOLEAN NOT NULL DEFAULT true,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL,
            CONSTRAINT "product_reviews_pkey" PRIMARY KEY ("id")
          )
        `;
                // Create indexes if they don't exist
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
          CREATE INDEX IF NOT EXISTS "product_reviews_productId_idx" 
          ON "product_reviews"("productId")
        `;
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
          CREATE INDEX IF NOT EXISTS "product_reviews_userId_idx" 
          ON "product_reviews"("userId")
        `;
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
          CREATE INDEX IF NOT EXISTS "product_reviews_published_createdAt_idx" 
          ON "product_reviews"("published", "createdAt" DESC)
        `;
                // Create unique constraint (one review per user per product)
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
          CREATE UNIQUE INDEX IF NOT EXISTS "product_reviews_productId_userId_key" 
          ON "product_reviews"("productId", "userId")
        `;
                // Add foreign key constraints if they don't exist
                // Check and add productId foreign key
                const productFkExists = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`
          SELECT EXISTS (
            SELECT 1 FROM pg_constraint 
            WHERE conname = 'product_reviews_productId_fkey'
          ) as exists
        `;
                if (!productFkExists[0]?.exists) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
            ALTER TABLE "product_reviews" 
            ADD CONSTRAINT "product_reviews_productId_fkey" 
            FOREIGN KEY ("productId") 
            REFERENCES "products"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
          `;
                }
                // Check and add userId foreign key
                const userFkExists = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`
          SELECT EXISTS (
            SELECT 1 FROM pg_constraint 
            WHERE conname = 'product_reviews_userId_fkey'
          ) as exists
        `;
                if (!userFkExists[0]?.exists) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
            ALTER TABLE "product_reviews" 
            ADD CONSTRAINT "product_reviews_userId_fkey" 
            FOREIGN KEY ("userId") 
            REFERENCES "users"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
          `;
                }
                // Create trigger for updatedAt (if it doesn't exist)
                const triggerExists = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`
          SELECT EXISTS (
            SELECT 1 FROM pg_trigger 
            WHERE tgname = 'product_reviews_updated_at'
          ) as exists
        `;
                if (!triggerExists[0]?.exists) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
              NEW."updatedAt" = CURRENT_TIMESTAMP;
              RETURN NEW;
            END;
            $$ language 'plpgsql';

            CREATE TRIGGER product_reviews_updated_at
            BEFORE UPDATE ON "product_reviews"
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
          `;
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info('product_reviews table created successfully');
                reviewsTableChecked = true;
                reviewsTableExists = true;
                return true;
            } catch (createError) {
                const prismaCreateError = createError;
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Failed to create product_reviews table', {
                    message: prismaCreateError?.message,
                    code: prismaCreateError?.code
                });
                reviewsTableChecked = true;
                reviewsTableExists = false;
                return false;
            }
        }
        // Other errors - log and return false
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Unexpected error checking product_reviews table', {
            message: prismaError?.message,
            code: prismaError?.code
        });
        reviewsTableChecked = true;
        reviewsTableExists = false;
        return false;
    }
}
async function ensureProductVariantAttributesColumn() {
    // If already checked and exists, return immediately
    if (attributesColumnChecked && attributesColumnExists) {
        return true;
    }
    try {
        // Try to query the column to check if it exists
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`SELECT "attributes" FROM "product_variants" LIMIT 1`;
        attributesColumnChecked = true;
        attributesColumnExists = true;
        return true;
    } catch (error) {
        // If column doesn't exist, create it
        const prismaError = error;
        if (prismaError?.code === 'P2022' || prismaError?.message?.includes('does not exist') || prismaError?.message?.includes('product_variants.attributes') || prismaError?.message?.includes('column') && prismaError?.message?.includes('attributes')) {
            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info('product_variants.attributes column not found, creating...');
            try {
                // Add the attributes JSONB column if it doesn't exist
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRaw`
          ALTER TABLE "product_variants" 
          ADD COLUMN IF NOT EXISTS "attributes" JSONB
        `;
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info('product_variants.attributes column created successfully');
                attributesColumnChecked = true;
                attributesColumnExists = true;
                return true;
            } catch (createError) {
                const prismaCreateError = createError;
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Failed to create product_variants.attributes column', {
                    message: prismaCreateError?.message,
                    code: prismaCreateError?.code
                });
                attributesColumnChecked = true;
                attributesColumnExists = false;
                return false;
            }
        }
        // Other errors - log and return false
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Unexpected error checking product_variants.attributes column', {
            message: prismaError?.message,
            code: prismaError?.code
        });
        attributesColumnChecked = true;
        attributesColumnExists = false;
        return false;
    }
}
}),
"[project]/apps/web/lib/services/products-find-query.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productsFindQueryService",
    ()=>productsFindQueryService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$db$2d$ensure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/db-ensure.ts [app-route] (ecmascript)");
;
;
class ProductsFindQueryService {
    /**
   * Get all child category IDs recursively
   */ async getAllChildCategoryIds(parentId) {
        const children = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findMany({
            where: {
                parentId: parentId,
                published: true,
                deletedAt: null
            },
            select: {
                id: true
            }
        });
        let allChildIds = children.map((c)=>c.id);
        // Recursively get children of children
        for (const child of children){
            const grandChildren = await this.getAllChildCategoryIds(child.id);
            allChildIds = [
                ...allChildIds,
                ...grandChildren
            ];
        }
        return allChildIds;
    }
    /**
   * Build where clause and fetch products from database
   */ async buildQueryAndFetch(filters) {
        const { category, search, filter, lang = "en", limit = 24 } = filters;
        const bestsellerProductIds = [];
        // Build where clause
        const where = {
            published: true,
            deletedAt: null
        };
        // Add search filter
        if (search && search.trim()) {
            where.OR = [
                {
                    translations: {
                        some: {
                            title: {
                                contains: search.trim(),
                                mode: "insensitive"
                            }
                        }
                    }
                },
                {
                    translations: {
                        some: {
                            subtitle: {
                                contains: search.trim(),
                                mode: "insensitive"
                            }
                        }
                    }
                },
                {
                    variants: {
                        some: {
                            sku: {
                                contains: search.trim(),
                                mode: "insensitive"
                            }
                        }
                    }
                }
            ];
        }
        // Add category filter
        if (category) {
            console.log('🔍 [PRODUCTS FIND QUERY SERVICE] Looking for category:', {
                category,
                lang
            });
            let categoryDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findFirst({
                where: {
                    translations: {
                        some: {
                            slug: category,
                            locale: lang
                        }
                    },
                    published: true,
                    deletedAt: null
                }
            });
            // If category not found in current language, try to find it in other languages (fallback)
            if (!categoryDoc) {
                console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] Category not found in language:', {
                    category,
                    lang
                });
                console.log('🔄 [PRODUCTS FIND QUERY SERVICE] Trying to find category in other languages...');
                categoryDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findFirst({
                    where: {
                        translations: {
                            some: {
                                slug: category
                            }
                        },
                        published: true,
                        deletedAt: null
                    }
                });
                if (categoryDoc) {
                    console.log('✅ [PRODUCTS FIND QUERY SERVICE] Category found in different language:', {
                        id: categoryDoc.id,
                        slug: category,
                        foundIn: categoryDoc.translations?.find((t)=>t.slug === category)?.locale || 'unknown'
                    });
                }
            }
            if (categoryDoc) {
                console.log('✅ [PRODUCTS FIND QUERY SERVICE] Category found:', {
                    id: categoryDoc.id,
                    slug: category
                });
                // Get all child categories (subcategories) recursively
                const childCategoryIds = await this.getAllChildCategoryIds(categoryDoc.id);
                const allCategoryIds = [
                    categoryDoc.id,
                    ...childCategoryIds
                ];
                console.log('📂 [PRODUCTS FIND QUERY SERVICE] Category IDs to include:', {
                    parent: categoryDoc.id,
                    children: childCategoryIds,
                    total: allCategoryIds.length
                });
                // Build OR conditions for all categories (parent + children)
                const categoryConditions = allCategoryIds.flatMap((catId)=>[
                        {
                            primaryCategoryId: catId
                        },
                        {
                            categoryIds: {
                                has: catId
                            }
                        }
                    ]);
                if (where.OR) {
                    where.AND = [
                        {
                            OR: where.OR
                        },
                        {
                            OR: categoryConditions
                        }
                    ];
                    delete where.OR;
                } else {
                    where.OR = categoryConditions;
                }
            } else {
                console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] Category not found in any language:', {
                    category,
                    lang
                });
                // Return empty result if category not found
                return {
                    products: [],
                    bestsellerProductIds: []
                };
            }
        }
        // Add filter for new, featured, bestseller
        if (filter === "new") {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            where.createdAt = {
                gte: thirtyDaysAgo
            };
        } else if (filter === "featured") {
            where.featured = true;
        } else if (filter === "bestseller") {
            const bestsellerVariants = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].orderItem.groupBy({
                by: [
                    "variantId"
                ],
                _sum: {
                    quantity: true
                },
                where: {
                    variantId: {
                        not: null
                    }
                },
                orderBy: {
                    _sum: {
                        quantity: "desc"
                    }
                },
                take: 200
            });
            const variantIds = bestsellerVariants.map((item)=>item.variantId).filter((id)=>Boolean(id));
            if (variantIds.length > 0) {
                const variantProductMap = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].productVariant.findMany({
                    where: {
                        id: {
                            in: variantIds
                        }
                    },
                    select: {
                        id: true,
                        productId: true
                    }
                });
                const variantToProduct = new Map();
                variantProductMap.forEach(({ id, productId })=>{
                    variantToProduct.set(id, productId);
                });
                const productSales = new Map();
                bestsellerVariants.forEach((item)=>{
                    const variantId = item.variantId;
                    if (!variantId) return;
                    const productId = variantToProduct.get(variantId);
                    if (!productId) return;
                    const qty = item._sum?.quantity || 0;
                    productSales.set(productId, (productSales.get(productId) || 0) + qty);
                });
                bestsellerProductIds.push(...Array.from(productSales.entries()).sort((a, b)=>(b[1] || 0) - (a[1] || 0)).map(([productId])=>productId));
                if (bestsellerProductIds.length > 0) {
                    where.id = {
                        in: bestsellerProductIds
                    };
                }
            }
        }
        // Get products
        console.log('🔍 [PRODUCTS FIND QUERY SERVICE] Fetching products with where clause:', JSON.stringify(where, null, 2));
        // Base include without productAttributes (for backward compatibility)
        const baseInclude = {
            translations: true,
            brand: {
                include: {
                    translations: true
                }
            },
            variants: {
                where: {
                    published: true
                },
                include: {
                    options: {
                        include: {
                            attributeValue: {
                                include: {
                                    attribute: true,
                                    translations: true
                                }
                            }
                        }
                    }
                }
            },
            labels: true,
            categories: {
                include: {
                    translations: true
                }
            }
        };
        // Try to include productAttributes, but fallback if table doesn't exist
        // Also handle case when attribute_values.colors column doesn't exist
        let products;
        try {
            products = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
                where,
                include: {
                    ...baseInclude,
                    productAttributes: {
                        include: {
                            attribute: {
                                include: {
                                    translations: true,
                                    values: {
                                        include: {
                                            translations: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                skip: 0,
                take: limit * 10
            });
            console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (with productAttributes)`);
        } catch (error) {
            // If productAttributes table doesn't exist, retry without it
            if (error?.code === 'P2021' || error?.message?.includes('product_attributes') || error?.message?.includes('does not exist')) {
                console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] product_attributes table not found, fetching without it:', error.message);
                try {
                    products = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
                        where,
                        include: baseInclude,
                        skip: 0,
                        take: limit * 10
                    });
                    console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (without productAttributes)`);
                } catch (retryError) {
                    // If product_variants.attributes column doesn't exist, try to create it and retry
                    if (retryError?.message?.includes('product_variants.attributes') || retryError?.message?.includes('attributes') && retryError?.message?.includes('does not exist')) {
                        console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] product_variants.attributes column not found, attempting to create it...');
                        try {
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$db$2d$ensure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureProductVariantAttributesColumn"])();
                            // Retry the query after creating the column
                            products = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
                                where,
                                include: baseInclude,
                                skip: 0,
                                take: limit * 10
                            });
                            console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (after creating attributes column)`);
                        } catch (attributesError) {
                            // If still fails, try without attributeValue include
                            if (attributesError?.code === 'P2022' || attributesError?.message?.includes('attribute_values.colors') || attributesError?.message?.includes('does not exist')) {
                                console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] attribute_values.colors column not found, fetching without attributeValue:', attributesError.message);
                                const baseIncludeWithoutAttributeValue = {
                                    ...baseInclude,
                                    variants: {
                                        ...baseInclude.variants,
                                        include: {
                                            options: true
                                        }
                                    }
                                };
                                products = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
                                    where,
                                    include: baseIncludeWithoutAttributeValue,
                                    skip: 0,
                                    take: limit * 10
                                });
                                console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (without attributeValue relation)`);
                            } else {
                                throw attributesError;
                            }
                        }
                    } else if (retryError?.code === 'P2022' || retryError?.message?.includes('attribute_values.colors') || retryError?.message?.includes('does not exist')) {
                        // If attribute_values.colors column doesn't exist, retry without attributeValue include
                        console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] attribute_values.colors column not found, fetching without attributeValue:', retryError.message);
                        const baseIncludeWithoutAttributeValue = {
                            ...baseInclude,
                            variants: {
                                ...baseInclude.variants,
                                include: {
                                    options: true
                                }
                            }
                        };
                        products = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
                            where,
                            include: baseIncludeWithoutAttributeValue,
                            skip: 0,
                            take: limit * 10
                        });
                        console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (without attributeValue relation)`);
                    } else {
                        throw retryError;
                    }
                }
            } else if (error?.code === 'P2022' || error?.message?.includes('attribute_values.colors') || error?.message?.includes('does not exist')) {
                // If attribute_values.colors column doesn't exist, retry without attributeValue include
                console.warn('⚠️ [PRODUCTS FIND QUERY SERVICE] attribute_values.colors column not found, fetching without attributeValue:', error.message);
                const baseIncludeWithoutAttributeValue = {
                    ...baseInclude,
                    variants: {
                        ...baseInclude.variants,
                        include: {
                            options: true
                        }
                    }
                };
                try {
                    products = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
                        where,
                        include: {
                            ...baseIncludeWithoutAttributeValue,
                            productAttributes: {
                                include: {
                                    attribute: {
                                        include: {
                                            translations: true,
                                            values: {
                                                include: {
                                                    translations: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        skip: 0,
                        take: limit * 10
                    });
                    console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (without attributeValue, with productAttributes)`);
                } catch (retryError) {
                    // If productAttributes also fails, try without it
                    if (retryError?.code === 'P2021' || retryError?.message?.includes('product_attributes')) {
                        products = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
                            where,
                            include: baseIncludeWithoutAttributeValue,
                            skip: 0,
                            take: limit * 10
                        });
                        console.log(`✅ [PRODUCTS FIND QUERY SERVICE] Found ${products.length} products from database (without attributeValue and productAttributes)`);
                    } else {
                        throw retryError;
                    }
                }
            } else {
                // Re-throw if it's a different error
                throw error;
            }
        }
        return {
            products: products,
            bestsellerProductIds
        };
    }
}
const productsFindQueryService = new ProductsFindQueryService();
}),
"[project]/apps/web/lib/services/products-find-filter.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productsFindFilterService",
    ()=>productsFindFilterService
]);
/**
 * Normalize comma-separated filter values and drop placeholders like "undefined" or "null".
 */ const normalizeFilterList = (value, transform)=>{
    if (!value || typeof value !== "string") return [];
    const invalidTokens = new Set([
        "undefined",
        "null",
        ""
    ]);
    const items = value.split(",").map((v)=>v.trim()).filter((v)=>!invalidTokens.has(v.toLowerCase()));
    if (transform) {
        return items.map(transform);
    }
    return items;
};
class ProductsFindFilterService {
    /**
   * Filter products by price, colors, sizes, brand in memory
   */ filterProducts(products, filters, bestsellerProductIds) {
        const { minPrice, maxPrice, colors, sizes, brand } = filters;
        // Filter by price
        if (minPrice || maxPrice) {
            const min = minPrice || 0;
            const max = maxPrice || Infinity;
            products = products.filter((product)=>{
                const variants = Array.isArray(product.variants) ? product.variants : [];
                if (variants.length === 0) return false;
                const prices = variants.map((v)=>v.price).filter((p)=>p !== undefined);
                if (prices.length === 0) return false;
                const minPrice = Math.min(...prices);
                return minPrice >= min && minPrice <= max;
            });
        }
        // Filter by brand(s) - support multiple brands (comma-separated)
        const brandList = normalizeFilterList(brand);
        if (brandList.length > 0) {
            products = products.filter((product)=>product.brandId && brandList.includes(product.brandId));
            console.log('🔍 [PRODUCTS FIND FILTER SERVICE] Filtering by brands:', {
                brands: brandList,
                productsAfter: products.length
            });
        }
        // Filter by colors and sizes together if both are provided.
        // Skip filtering when only placeholder values (e.g., "undefined") are passed.
        const colorList = normalizeFilterList(colors, (v)=>v.toLowerCase());
        const sizeList = normalizeFilterList(sizes, (v)=>v.toUpperCase());
        if (colorList.length > 0 || sizeList.length > 0) {
            products = products.filter((product)=>{
                const variants = Array.isArray(product.variants) ? product.variants : [];
                if (variants.length === 0) {
                    console.log('⚠️ [PRODUCTS FIND FILTER SERVICE] Product has no variants:', product.id);
                    return false;
                }
                // Find variants that match ALL specified filters
                const matchingVariants = variants.filter((variant)=>{
                    const options = Array.isArray(variant.options) ? variant.options : [];
                    if (options.length === 0) {
                        return false;
                    }
                    // Helper function to get color value from option (support all formats)
                    const getColorValue = (opt, lang = 'en')=>{
                        // New format: Use AttributeValue if available
                        if (opt.attributeValue && opt.attributeValue.attribute?.key === "color") {
                            const translation = opt.attributeValue.translations?.find((t)=>t.locale === lang) || opt.attributeValue.translations?.[0];
                            return (translation?.label || opt.attributeValue.value || "").trim().toLowerCase();
                        }
                        // Old format: check attributeKey, key, or attribute
                        if (opt.attributeKey === "color" || opt.key === "color" || opt.attribute === "color") {
                            return (opt.value || opt.label || "").trim().toLowerCase();
                        }
                        return null;
                    };
                    // Helper function to get size value from option (support all formats)
                    const getSizeValue = (opt, lang = 'en')=>{
                        // New format: Use AttributeValue if available
                        if (opt.attributeValue && opt.attributeValue.attribute?.key === "size") {
                            const translation = opt.attributeValue.translations?.find((t)=>t.locale === lang) || opt.attributeValue.translations?.[0];
                            return (translation?.label || opt.attributeValue.value || "").trim().toUpperCase();
                        }
                        // Old format: check attributeKey, key, or attribute
                        if (opt.attributeKey === "size" || opt.key === "size" || opt.attribute === "size") {
                            return (opt.value || opt.label || "").trim().toUpperCase();
                        }
                        return null;
                    };
                    // Check color match if colors filter is provided
                    if (colorList.length > 0) {
                        let colorMatched = false;
                        for (const opt of options){
                            const variantColorValue = getColorValue(opt, filters.lang || 'en');
                            if (variantColorValue && colorList.includes(variantColorValue)) {
                                colorMatched = true;
                                break;
                            }
                        }
                        if (!colorMatched) {
                            return false;
                        }
                    }
                    // Check size match if sizes filter is provided
                    if (sizeList.length > 0) {
                        let sizeMatched = false;
                        for (const opt of options){
                            const variantSizeValue = getSizeValue(opt, filters.lang || 'en');
                            if (variantSizeValue && sizeList.includes(variantSizeValue)) {
                                sizeMatched = true;
                                break;
                            }
                        }
                        if (!sizeMatched) {
                            return false;
                        }
                    }
                    return true;
                });
                const hasMatch = matchingVariants.length > 0;
                return hasMatch;
            });
        }
        // Sort
        const { filter, sort = "createdAt" } = filters;
        if (filter === "bestseller" && bestsellerProductIds.length > 0) {
            const rank = new Map();
            bestsellerProductIds.forEach((id, index)=>rank.set(id, index));
            products.sort((a, b)=>{
                const aRank = rank.get(a.id) ?? Number.MAX_SAFE_INTEGER;
                const bRank = rank.get(b.id) ?? Number.MAX_SAFE_INTEGER;
                return aRank - bRank;
            });
        } else if (sort === "price") {
            products.sort((a, b)=>{
                const aVariants = Array.isArray(a.variants) ? a.variants : [];
                const bVariants = Array.isArray(b.variants) ? b.variants : [];
                const aPrice = aVariants.length > 0 ? Math.min(...aVariants.map((v)=>v.price)) : 0;
                const bPrice = bVariants.length > 0 ? Math.min(...bVariants.map((v)=>v.price)) : 0;
                return bPrice - aPrice;
            });
        } else {
            products.sort((a, b)=>{
                const aValue = a[sort];
                const bValue = b[sort];
                return new Date(bValue).getTime() - new Date(aValue).getTime();
            });
        }
        return products;
    }
}
const productsFindFilterService = new ProductsFindFilterService();
}),
"[project]/apps/web/lib/utils/image-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Unified image URL utilities for consistent handling across the application
 */ __turbopack_context__.s([
    "cleanImageUrls",
    ()=>cleanImageUrls,
    "getUrlVariations",
    ()=>getUrlVariations,
    "isValidImageUrl",
    ()=>isValidImageUrl,
    "normalizeUrlForComparison",
    ()=>normalizeUrlForComparison,
    "processImageFile",
    ()=>processImageFile,
    "processImageUrl",
    ()=>processImageUrl,
    "separateMainAndVariantImages",
    ()=>separateMainAndVariantImages,
    "smartSplitUrls",
    ()=>smartSplitUrls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$browser$2d$image$2d$compression$2f$dist$2f$browser$2d$image$2d$compression$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/browser-image-compression/dist/browser-image-compression.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/logger.ts [app-route] (ecmascript)");
;
;
function isValidImageUrl(url) {
    if (!url) return false;
    const urlStr = typeof url === 'string' ? url.trim() : '';
    if (!urlStr) return false;
    // Base64 images are valid
    if (urlStr.startsWith('data:image/')) return true;
    // HTTP/HTTPS URLs are valid
    if (urlStr.startsWith('http://') || urlStr.startsWith('https://')) return true;
    // Relative paths starting with / are valid
    if (urlStr.startsWith('/')) return true;
    return false;
}
function processImageUrl(url) {
    if (!url) return null;
    let finalUrl = '';
    if (typeof url === 'string') {
        finalUrl = url.trim();
    } else if (typeof url === 'object' && url !== null) {
        finalUrl = (url.url || url.src || url.value || '').trim();
    }
    if (!finalUrl) return null;
    // Validate
    if (!isValidImageUrl(finalUrl)) {
        return null;
    }
    // For base64 or full URLs, return as-is
    if (finalUrl.startsWith('data:') || finalUrl.startsWith('http://') || finalUrl.startsWith('https://')) {
        return finalUrl;
    }
    // For relative paths, ensure they start with /
    if (finalUrl.startsWith('/')) {
        return finalUrl;
    }
    return `/${finalUrl}`;
}
function smartSplitUrls(str) {
    if (!str) return [];
    // If no base64, simple split
    if (!str.includes('data:image/')) {
        return str.split(',').map((s)=>s.trim()).filter(Boolean);
    }
    // Handle base64 - split carefully
    // Base64 format: data:image/type;base64,<base64data>
    // The comma after base64, is the separator, but base64 data itself can contain commas
    // We need to find the comma that separates base64 header from data, then find the next URL separator
    const results = [];
    let i = 0;
    while(i < str.length){
        if (str.substring(i).startsWith('data:image/')) {
            // Found start of base64 image
            // Find the comma after base64, (this is the separator between header and data)
            const headerEnd = str.indexOf(',', i);
            if (headerEnd === -1) {
                // No comma found, treat entire rest as base64
                results.push(str.substring(i).trim());
                break;
            }
            // Find the next comma that's likely a URL separator (followed by whitespace and another URL pattern)
            // Or find end of string
            let nextSeparator = str.length;
            for(let j = headerEnd + 1; j < str.length; j++){
                if (str[j] === ',') {
                    // Check if this comma is followed by a URL pattern (not part of base64)
                    const afterComma = str.substring(j + 1).trim();
                    if (afterComma.startsWith('data:image/') || afterComma.startsWith('http://') || afterComma.startsWith('https://') || afterComma.startsWith('/')) {
                        nextSeparator = j;
                        break;
                    }
                }
            }
            // Extract base64 image (from start to separator)
            const base64Image = str.substring(i, nextSeparator).trim();
            if (base64Image) {
                results.push(base64Image);
            }
            i = nextSeparator + 1;
        } else {
            // Regular URL - find next comma or end
            const nextComma = str.indexOf(',', i);
            if (nextComma === -1) {
                // No more commas, add rest as single URL
                const url = str.substring(i).trim();
                if (url) {
                    results.push(url);
                }
                break;
            } else {
                // Add URL up to comma
                const url = str.substring(i, nextComma).trim();
                if (url) {
                    results.push(url);
                }
                i = nextComma + 1;
            }
        }
    }
    return results.filter(Boolean);
}
function normalizeUrlForComparison(url) {
    if (!url) return '';
    // Base64 images - return as-is (exact match required)
    if (url.startsWith('data:')) {
        return url;
    }
    // HTTP/HTTPS URLs - return as-is (exact match)
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    // Relative paths - normalize to start with /
    const trimmed = url.trim();
    if (trimmed.startsWith('/')) {
        return trimmed;
    }
    return `/${trimmed}`;
}
function getUrlVariations(url) {
    if (!url) return [];
    const normalized = normalizeUrlForComparison(url);
    const variations = new Set([
        normalized
    ]);
    // For relative paths, add variations with/without leading slash
    if (!normalized.startsWith('data:') && !normalized.startsWith('http')) {
        if (normalized.startsWith('/')) {
            variations.add(normalized.substring(1));
            variations.add(normalized);
        } else {
            variations.add(normalized);
            variations.add(`/${normalized}`);
        }
        // Also add without query params
        const withoutQuery = normalized.split('?')[0];
        if (withoutQuery !== normalized) {
            variations.add(withoutQuery);
            if (withoutQuery.startsWith('/')) {
                variations.add(withoutQuery.substring(1));
            } else {
                variations.add(`/${withoutQuery}`);
            }
        }
    }
    return Array.from(variations);
}
function cleanImageUrls(urls) {
    if (!Array.isArray(urls)) return [];
    const seen = new Set();
    const cleaned = [];
    for (const url of urls){
        const processed = processImageUrl(url);
        if (!processed) continue;
        const normalized = normalizeUrlForComparison(processed);
        if (seen.has(normalized)) continue;
        seen.add(normalized);
        cleaned.push(processed);
    }
    return cleaned;
}
function separateMainAndVariantImages(mainImages, variantImages) {
    // Process and normalize all variant images
    const variantUrlSet = new Set();
    const variantVariationsMap = new Map();
    for (const variantImg of variantImages){
        const processed = processImageUrl(variantImg);
        if (!processed) continue;
        const normalized = normalizeUrlForComparison(processed);
        variantUrlSet.add(normalized);
        // Store all variations for this URL
        const variations = getUrlVariations(processed);
        variations.forEach((v)=>variantVariationsMap.set(v, variations));
    }
    // Process main images and filter out those that match variants
    const mainProcessed = [];
    const seenMain = new Set();
    for (const mainImg of mainImages){
        const processed = processImageUrl(mainImg);
        if (!processed) continue;
        const normalized = normalizeUrlForComparison(processed);
        // Check if this main image matches any variant image
        const isVariantImage = variantUrlSet.has(normalized) || variantVariationsMap.has(normalized) || Array.from(variantVariationsMap.values()).some((variations)=>variations.some((v)=>{
                const mainVariations = getUrlVariations(processed);
                return mainVariations.includes(v);
            }));
        if (isVariantImage) {
            continue; // Skip - this is a variant image
        }
        // Check for duplicates in main images
        if (seenMain.has(normalized)) {
            continue;
        }
        seenMain.add(normalized);
        mainProcessed.push(processed);
    }
    // Process variant images (already validated above)
    const variantProcessed = [];
    const seenVariant = new Set();
    for (const variantImg of variantImages){
        const processed = processImageUrl(variantImg);
        if (!processed) continue;
        const normalized = normalizeUrlForComparison(processed);
        if (seenVariant.has(normalized)) continue;
        seenVariant.add(normalized);
        variantProcessed.push(processed);
    }
    return {
        main: mainProcessed,
        variants: variantProcessed
    };
}
async function processImageFile(file, options) {
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug('Starting image processing', {
            fileName: file.name,
            originalSize: `${Math.round(file.size / 1024)}KB`,
            type: file.type
        });
        const { maxSizeMB = 2, maxWidthOrHeight = 1920, useWebWorker = true, fileType = 'image/jpeg', initialQuality = 0.8 } = options || {};
        // Process image with compression and EXIF orientation correction
        // browser-image-compression automatically handles EXIF orientation
        const compressedFile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$browser$2d$image$2d$compression$2f$dist$2f$browser$2d$image$2d$compression$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(file, {
            maxSizeMB,
            maxWidthOrHeight,
            useWebWorker,
            fileType,
            initialQuality
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info('Image processed successfully', {
            originalSize: `${Math.round(file.size / 1024)}KB`,
            compressedSize: `${Math.round(compressedFile.size / 1024)}KB`,
            reduction: `${Math.round((1 - compressedFile.size / file.size) * 100)}%`
        });
        // Convert to base64
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onload = ()=>{
                const result = reader.result;
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug('Image converted to base64', {
                    length: result.length
                });
                resolve(result);
            };
            reader.onerror = (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Error converting to base64', {
                    error
                });
                reject(new Error('Failed to convert image to base64'));
            };
            reader.readAsDataURL(compressedFile);
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to process image';
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Error processing image', {
            error
        });
        throw new Error(errorMessage);
    }
}
}),
"[project]/apps/web/lib/language.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Language utilities
__turbopack_context__.s([
    "LANGUAGES",
    ()=>LANGUAGES,
    "getStoredLanguage",
    ()=>getStoredLanguage,
    "setStoredLanguage",
    ()=>setStoredLanguage
]);
const LANGUAGES = {
    en: {
        code: 'en',
        name: 'English',
        nativeName: 'English'
    },
    hy: {
        code: 'hy',
        name: 'Armenian',
        nativeName: 'Հայերեն'
    },
    ru: {
        code: 'ru',
        name: 'Russian',
        nativeName: 'Русский'
    },
    ka: {
        code: 'ka',
        name: 'Georgian',
        nativeName: 'ქართული'
    }
};
const LANGUAGE_STORAGE_KEY = 'shop_language';
function getStoredLanguage() {
    if ("TURBOPACK compile-time truthy", 1) return 'en';
    //TURBOPACK unreachable
    ;
}
function setStoredLanguage(language, options) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/apps/web/lib/translations.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Translation utilities
__turbopack_context__.s([
    "getTranslation",
    ()=>getTranslation,
    "translations",
    ()=>translations,
    "useTranslation",
    ()=>useTranslation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/language.ts [app-route] (ecmascript)");
;
const translations = {
    en: {
        stock: {
            inStock: 'In Stock',
            outOfStock: 'Out of Stock'
        },
        cart: {
            title: 'Shopping Cart',
            empty: 'Your cart is empty',
            orderSummary: 'Order Summary',
            subtotal: 'Subtotal',
            shipping: 'Shipping',
            tax: 'Tax',
            total: 'Total',
            free: 'Free',
            proceedToCheckout: 'Proceed to Checkout',
            remove: 'Remove',
            items: 'items',
            item: 'item'
        },
        wishlist: {
            title: 'My Wishlist',
            empty: 'Your wishlist is empty',
            emptyDescription: 'Start adding products to your wishlist to save them for later.',
            browseProducts: 'Browse Products',
            remove: 'Remove',
            items: 'items',
            item: 'item',
            totalCount: 'Total items in wishlist'
        },
        compare: {
            title: 'Compare Products',
            empty: 'No products to compare',
            emptyDescription: 'Add up to 4 products to compare their features and prices.',
            browseProducts: 'Browse Products',
            remove: 'Remove',
            products: 'products',
            product: 'product'
        },
        product: {
            addToCart: 'Add to Cart',
            addToWishlist: 'Add to Wishlist',
            viewProduct: 'View Product',
            viewDetails: 'View Details',
            productInformation: 'Product Information',
            browseProducts: 'Browse Products'
        },
        breadcrumb: {
            home: 'Home',
            products: 'Products',
            categories: 'Categories',
            cart: 'Cart',
            wishlist: 'Wishlist',
            compare: 'Compare',
            checkout: 'Checkout',
            profile: 'Profile',
            orders: 'Orders',
            login: 'Login',
            register: 'Register',
            about: 'About',
            contact: 'Contact',
            admin: 'Admin',
            faq: 'FAQ',
            shipping: 'Shipping',
            returns: 'Returns',
            support: 'Support',
            privacy: 'Privacy',
            terms: 'Terms',
            cookies: 'Cookies',
            delivery: 'Delivery',
            stores: 'Stores'
        },
        reviews: {
            title: 'Reviews',
            writeReview: 'Write a Review',
            rating: 'Rating',
            comment: 'Your Review',
            commentPlaceholder: 'Share your thoughts about this product...',
            submit: 'Submit Review',
            submitting: 'Submitting...',
            cancel: 'Cancel',
            loginRequired: 'Please login to write a review',
            ratingRequired: 'Please select a rating',
            commentRequired: 'Please write a comment',
            submitError: 'Failed to submit review',
            noReviews: 'No reviews yet. Be the first to review this product!',
            review: 'review',
            reviews: 'reviews'
        }
    },
    hy: {
        stock: {
            inStock: 'Պահեստում',
            outOfStock: 'Արտադրված'
        },
        cart: {
            title: 'Գնումների զամբյուղ',
            empty: 'Ձեր զամբյուղը դատարկ է',
            orderSummary: 'Պատվերի ամփոփում',
            subtotal: 'Ենթագումար',
            shipping: 'Առաքում',
            tax: 'Հարկ',
            total: 'Ընդամենը',
            free: 'Անվճար',
            proceedToCheckout: 'Անցնել վճարման',
            remove: 'Հեռացնել',
            items: 'ապրանք',
            item: 'ապրանք'
        },
        wishlist: {
            title: 'Իմ ցանկությունների ցուցակ',
            empty: 'Ձեր ցանկությունների ցուցակը դատարկ է',
            emptyDescription: 'Սկսեք ավելացնել ապրանքներ ձեր ցանկությունների ցուցակին՝ հետագա օգտագործման համար:',
            browseProducts: 'Դիտել ապրանքները',
            remove: 'Հեռացնել',
            items: 'ապրանք',
            item: 'ապրանք',
            totalCount: 'Ընդհանուր ապրանքներ ցանկությունների ցուցակում'
        },
        compare: {
            title: 'Համեմատել ապրանքները',
            empty: 'Համեմատելու ապրանքներ չկան',
            emptyDescription: 'Ավելացրեք մինչև 4 ապրանք՝ դրանց հատկանիշներն ու գները համեմատելու համար:',
            browseProducts: 'Դիտել ապրանքները',
            remove: 'Հեռացնել',
            products: 'ապրանք',
            product: 'ապրանք'
        },
        product: {
            addToCart: 'Ավելացնել զամբյուղ',
            addToWishlist: 'Ավելացնել ցանկությունների ցուցակ',
            viewProduct: 'Դիտել ապրանքը',
            viewDetails: 'Դիտել մանրամասները',
            productInformation: 'Ապրանքի տեղեկություն',
            browseProducts: 'Դիտել ապրանքները'
        },
        breadcrumb: {
            home: 'Գլխավոր',
            products: 'Ապրանքներ',
            categories: 'Կատեգորիաներ',
            cart: 'Զամբյուղ',
            wishlist: 'Ցանկությունների ցուցակ',
            compare: 'Համեմատել',
            checkout: 'Վճարում',
            profile: 'Պրոֆիլ',
            orders: 'Պատվերներ',
            login: 'Մուտք',
            register: 'Գրանցում',
            about: 'Մեր մասին',
            contact: 'Կապ',
            admin: 'Ադմին',
            faq: 'Հաճախակի հարցեր',
            shipping: 'Առաքում',
            returns: 'Վերադարձ',
            support: 'Աջակցություն',
            privacy: 'Գաղտնիություն',
            terms: 'Պայմաններ',
            cookies: 'Cookie-ներ',
            delivery: 'Առաքում',
            stores: 'Խանութներ'
        },
        reviews: {
            title: 'Կարծիքներ',
            writeReview: 'Գրել կարծիք',
            rating: 'Գնահատական',
            comment: 'Ձեր կարծիքը',
            commentPlaceholder: 'Կիսվեք ձեր մտքերով այս ապրանքի մասին...',
            submit: 'Ուղարկել կարծիք',
            submitting: 'Ուղարկվում է...',
            cancel: 'Չեղարկել',
            loginRequired: 'Խնդրում ենք մուտք գործել կարծիք գրելու համար',
            ratingRequired: 'Խնդրում ենք ընտրել գնահատական',
            commentRequired: 'Խնդրում ենք գրել կարծիք',
            submitError: 'Չհաջողվեց ուղարկել կարծիքը',
            noReviews: 'Կարծիքներ դեռ չկան: Դարձեք առաջինը, ով կգրի կարծիք:',
            review: 'կարծիք',
            reviews: 'կարծիք'
        }
    },
    ru: {
        stock: {
            inStock: 'В наличии',
            outOfStock: 'Нет в наличии'
        },
        cart: {
            title: 'Корзина покупок',
            empty: 'Ваша корзина пуста',
            orderSummary: 'Сводка заказа',
            subtotal: 'Промежуточный итог',
            shipping: 'Доставка',
            tax: 'Налог',
            total: 'Итого',
            free: 'Бесплатно',
            proceedToCheckout: 'Перейти к оплате',
            remove: 'Удалить',
            items: 'товаров',
            item: 'товар'
        },
        wishlist: {
            title: 'Мой список желаний',
            empty: 'Ваш список желаний пуст',
            emptyDescription: 'Начните добавлять товары в список желаний, чтобы сохранить их на потом.',
            browseProducts: 'Просмотреть товары',
            remove: 'Удалить',
            items: 'товаров',
            item: 'товар',
            totalCount: 'Всего товаров в списке желаний'
        },
        compare: {
            title: 'Сравнить товары',
            empty: 'Нет товаров для сравнения',
            emptyDescription: 'Добавьте до 4 товаров, чтобы сравнить их характеристики и цены.',
            browseProducts: 'Просмотреть товары',
            remove: 'Удалить',
            products: 'товаров',
            product: 'товар'
        },
        product: {
            addToCart: 'Добавить в корзину',
            addToWishlist: 'Добавить в список желаний',
            viewProduct: 'Просмотреть товар',
            viewDetails: 'Просмотреть детали',
            productInformation: 'Информация о товаре',
            browseProducts: 'Просмотреть товары'
        },
        breadcrumb: {
            home: 'Главная',
            products: 'Товары',
            categories: 'Категории',
            cart: 'Корзина',
            wishlist: 'Список желаний',
            compare: 'Сравнить',
            checkout: 'Оформление',
            profile: 'Профиль',
            orders: 'Заказы',
            login: 'Вход',
            register: 'Регистрация',
            about: 'О нас',
            contact: 'Контакты',
            admin: 'Админ',
            faq: 'FAQ',
            shipping: 'Доставка',
            returns: 'Возврат',
            support: 'Поддержка',
            privacy: 'Конфиденциальность',
            terms: 'Условия',
            cookies: 'Cookie',
            delivery: 'Доставка',
            stores: 'Магазины'
        },
        reviews: {
            title: 'Отзывы',
            writeReview: 'Написать отзыв',
            rating: 'Оценка',
            comment: 'Ваш отзыв',
            commentPlaceholder: 'Поделитесь своими мыслями об этом товаре...',
            submit: 'Отправить отзыв',
            submitting: 'Отправка...',
            cancel: 'Отмена',
            loginRequired: 'Пожалуйста, войдите, чтобы написать отзыв',
            ratingRequired: 'Пожалуйста, выберите оценку',
            commentRequired: 'Пожалуйста, напишите отзыв',
            submitError: 'Не удалось отправить отзыв',
            noReviews: 'Отзывов пока нет. Будьте первым, кто оставит отзыв!',
            review: 'отзыв',
            reviews: 'отзывов'
        }
    },
    ka: {
        stock: {
            inStock: 'მარაგშია',
            outOfStock: 'არ არის მარაგში'
        },
        cart: {
            title: 'საყიდლების კალათა',
            empty: 'თქვენი კალათა ცარიელია',
            orderSummary: 'შეკვეთის შეჯამება',
            subtotal: 'ქვეჯამი',
            shipping: 'მიწოდება',
            tax: 'გადასახადი',
            total: 'სულ',
            free: 'უფასო',
            proceedToCheckout: 'გადახდაზე გადასვლა',
            remove: 'წაშლა',
            items: 'ნივთი',
            item: 'ნივთი'
        },
        wishlist: {
            title: 'ჩემი სურვილების სია',
            empty: 'თქვენი სურვილების სია ცარიელია',
            emptyDescription: 'დაიწყეთ პროდუქტების დამატება თქვენს სურვილების სიაში, რომ შემდეგ გამოიყენოთ.',
            browseProducts: 'პროდუქტების ნახვა',
            remove: 'წაშლა',
            items: 'ნივთი',
            item: 'ნივთი',
            totalCount: 'სულ პროდუქტი სურვილების სიაში'
        },
        compare: {
            title: 'პროდუქტების შედარება',
            empty: 'შედარების პროდუქტები არ არის',
            emptyDescription: 'დაამატეთ 4 პროდუქტამდე მათი მახასიათებლებისა და ფასების შესადარებლად.',
            browseProducts: 'პროდუქტების ნახვა',
            remove: 'წაშლა',
            products: 'პროდუქტი',
            product: 'პროდუქტი'
        },
        product: {
            addToCart: 'კალათაში დამატება',
            addToWishlist: 'სურვილების სიაში დამატება',
            viewProduct: 'პროდუქტის ნახვა',
            viewDetails: 'დეტალების ნახვა',
            productInformation: 'პროდუქტის ინფორმაცია',
            browseProducts: 'პროდუქტების ნახვა'
        },
        breadcrumb: {
            home: 'მთავარი',
            products: 'პროდუქტები',
            categories: 'კატეგორიები',
            cart: 'კალათა',
            wishlist: 'სურვილების სია',
            compare: 'შედარება',
            checkout: 'გადახდა',
            profile: 'პროფილი',
            orders: 'შეკვეთები',
            login: 'შესვლა',
            register: 'რეგისტრაცია',
            about: 'ჩვენს შესახებ',
            contact: 'კონტაქტი',
            admin: 'ადმინი',
            faq: 'FAQ',
            shipping: 'მიწოდება',
            returns: 'დაბრუნება',
            support: 'მხარდაჭერა',
            privacy: 'კონფიდენციალურობა',
            terms: 'პირობები',
            cookies: 'Cookie-ები',
            delivery: 'მიწოდება',
            stores: 'მაღაზიები'
        },
        reviews: {
            title: 'მიმოხილვები',
            writeReview: 'მიმოხილვის დაწერა',
            rating: 'შეფასება',
            comment: 'თქვენი მიმოხილვა',
            commentPlaceholder: 'გაუზიარეთ თქვენი აზრები ამ პროდუქტის შესახებ...',
            submit: 'მიმოხილვის გაგზავნა',
            submitting: 'იგზავნება...',
            cancel: 'გაუქმება',
            loginRequired: 'გთხოვთ შეხვიდეთ მიმოხილვის დასაწერად',
            ratingRequired: 'გთხოვთ აირჩიოთ შეფასება',
            commentRequired: 'გთხოვთ დაწეროთ მიმოხილვა',
            submitError: 'ვერ მოხერხდა მიმოხილვის გაგზავნა',
            noReviews: 'მიმოხილვები ჯერ არ არის. იყავით პირველი, ვინც დაწერს მიმოხილვას!',
            review: 'მიმოხილვა',
            reviews: 'მიმოხილვა'
        }
    }
};
function getTranslation(key, language) {
    const lang = language || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getStoredLanguage"])();
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys){
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            // Fallback to English if translation not found
            value = translations.en;
            for (const k2 of keys){
                if (value && typeof value === 'object' && k2 in value) {
                    value = value[k2];
                } else {
                    return key;
                }
            }
            break;
        }
    }
    return typeof value === 'string' ? value : key;
}
function useTranslation() {
    // This will be implemented in client components using useState/useEffect
    // For now, just return a function that uses current language
    return {
        t: (key)=>getTranslation(key)
    };
}
}),
"[project]/apps/web/lib/services/products-find-transform.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productsFindTransformService",
    ()=>productsFindTransformService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/image-utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$translations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/translations.ts [app-route] (ecmascript)");
;
;
;
/**
 * Get "Out of Stock" translation for a given language
 */ const getOutOfStockLabel = (lang = "en")=>{
    const langKey = lang;
    const translation = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$translations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["translations"][langKey] || __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$translations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["translations"].en;
    return translation.stock.outOfStock;
};
class ProductsFindTransformService {
    /**
   * Transform products to response format
   */ async transformProducts(products, lang = "en") {
        // Get discount settings
        const discountSettings = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].settings.findMany({
            where: {
                key: {
                    in: [
                        "globalDiscount",
                        "categoryDiscounts",
                        "brandDiscounts"
                    ]
                }
            }
        });
        const globalDiscount = Number(discountSettings.find((s)=>s.key === "globalDiscount")?.value) || 0;
        const categoryDiscountsSetting = discountSettings.find((s)=>s.key === "categoryDiscounts");
        const categoryDiscounts = categoryDiscountsSetting ? categoryDiscountsSetting.value || {} : {};
        const brandDiscountsSetting = discountSettings.find((s)=>s.key === "brandDiscounts");
        const brandDiscounts = brandDiscountsSetting ? brandDiscountsSetting.value || {} : {};
        // Format response
        const data = products.map((product)=>{
            // Безопасное получение translation с проверкой на существование массива
            const translations = Array.isArray(product.translations) ? product.translations : [];
            const translation = translations.find((t)=>t.locale === lang) || translations[0] || null;
            // Безопасное получение brand translation
            const brandTranslations = product.brand && Array.isArray(product.brand.translations) ? product.brand.translations : [];
            const brandTranslation = brandTranslations.length > 0 ? brandTranslations.find((t)=>t.locale === lang) || brandTranslations[0] : null;
            // Безопасное получение variant
            const variants = Array.isArray(product.variants) ? product.variants : [];
            const variant = variants.length > 0 ? variants.sort((a, b)=>a.price - b.price)[0] : null;
            // Get all unique colors from ALL variants with imageUrl and colors hex (support both new and old format)
            // IMPORTANT: Only collect colors that actually exist in variants
            // IMPORTANT: Process ALL variants to get ALL colors, not just the first variant
            const colorMap = new Map();
            console.log(`🎨 [PRODUCTS FIND TRANSFORM SERVICE] Processing ${variants.length} variants for product ${product.id} to collect colors`);
            // Process all variants to collect all unique colors
            variants.forEach((v)=>{
                // First, try to get ALL color options from variant.options (not just the first one)
                const options = Array.isArray(v.options) ? v.options : [];
                const colorOptions = options.filter((opt)=>{
                    // Support both new format (AttributeValue) and old format (attributeKey/value)
                    if (opt.attributeValue) {
                        return opt.attributeValue.attribute?.key === "color";
                    }
                    return opt.attributeKey === "color";
                });
                // Process all color options from this variant
                colorOptions.forEach((colorOption)=>{
                    let colorValue = "";
                    let imageUrl = null;
                    let colorsHex = null;
                    if (colorOption.attributeValue) {
                        // New format: get from translation or value
                        const translation = colorOption.attributeValue.translations?.find((t)=>t.locale === lang) || colorOption.attributeValue.translations?.[0];
                        colorValue = translation?.label || colorOption.attributeValue.value || "";
                        // Get imageUrl and colors from AttributeValue
                        imageUrl = colorOption.attributeValue.imageUrl || null;
                        colorsHex = colorOption.attributeValue.colors || null;
                    } else {
                        // Old format: use value directly
                        colorValue = colorOption.value || "";
                    }
                    if (colorValue) {
                        const normalizedValue = colorValue.trim().toLowerCase();
                        // Store color with imageUrl and colors hex if not already stored or if we have better data
                        if (!colorMap.has(normalizedValue) || imageUrl && !colorMap.get(normalizedValue)?.imageUrl) {
                            colorMap.set(normalizedValue, {
                                value: colorValue.trim(),
                                imageUrl: imageUrl || null,
                                colors: colorsHex || null
                            });
                        }
                    }
                });
                // Fallback: check variant.attributes JSONB column if options don't have color
                // This handles cases where colors are stored in JSONB but not in options
                if (colorOptions.length === 0 && v.attributes && typeof v.attributes === 'object' && v.attributes.color) {
                    const colorAttributes = Array.isArray(v.attributes.color) ? v.attributes.color : [
                        v.attributes.color
                    ];
                    colorAttributes.forEach((colorAttr)=>{
                        const colorValue = colorAttr?.value || colorAttr;
                        if (colorValue && typeof colorValue === 'string') {
                            const normalizedValue = colorValue.trim().toLowerCase();
                            // Only add if not already in colorMap
                            if (!colorMap.has(normalizedValue)) {
                                colorMap.set(normalizedValue, {
                                    value: colorValue.trim(),
                                    imageUrl: null,
                                    colors: null
                                });
                            }
                        }
                    });
                }
            });
            console.log(`🎨 [PRODUCTS FIND TRANSFORM SERVICE] Collected ${colorMap.size} unique colors from ${variants.length} variants for product ${product.id}`);
            // Also check productAttributes for color attribute values with imageUrl and colors
            // IMPORTANT: Only update colors that already exist in variants (already in colorMap)
            // Do not add new colors that don't exist in variants
            if (product.productAttributes && Array.isArray(product.productAttributes)) {
                product.productAttributes.forEach((productAttr)=>{
                    if (productAttr.attribute?.key === 'color' && productAttr.attribute?.values) {
                        productAttr.attribute.values.forEach((attrValue)=>{
                            const translation = attrValue.translations?.find((t)=>t.locale === lang) || attrValue.translations?.[0];
                            const colorValue = translation?.label || attrValue.value || "";
                            if (colorValue) {
                                const normalizedValue = colorValue.trim().toLowerCase();
                                // Only update if color already exists in colorMap (i.e., exists in variants)
                                // This ensures we only show colors that actually exist in product variants
                                if (colorMap.has(normalizedValue)) {
                                    const existing = colorMap.get(normalizedValue);
                                    // Update with imageUrl and colors hex from productAttributes if available
                                    if (attrValue.imageUrl || attrValue.colors) {
                                        colorMap.set(normalizedValue, {
                                            value: colorValue.trim(),
                                            imageUrl: attrValue.imageUrl || existing?.imageUrl || null,
                                            colors: attrValue.colors || existing?.colors || null
                                        });
                                    }
                                }
                            }
                        });
                    }
                });
            }
            const availableColors = Array.from(colorMap.values());
            const originalPrice = variant?.price || 0;
            let finalPrice = originalPrice;
            const productDiscount = product.discountPercent || 0;
            // Calculate applied discount with priority: productDiscount > categoryDiscount > brandDiscount > globalDiscount
            let appliedDiscount = 0;
            if (productDiscount > 0) {
                appliedDiscount = productDiscount;
            } else {
                // Check category discounts
                const primaryCategoryId = product.primaryCategoryId;
                if (primaryCategoryId && categoryDiscounts[primaryCategoryId]) {
                    appliedDiscount = categoryDiscounts[primaryCategoryId];
                } else {
                    // Check brand discounts
                    const brandId = product.brandId;
                    if (brandId && brandDiscounts[brandId]) {
                        appliedDiscount = brandDiscounts[brandId];
                    } else if (globalDiscount > 0) {
                        appliedDiscount = globalDiscount;
                    }
                }
            }
            if (appliedDiscount > 0 && originalPrice > 0) {
                finalPrice = originalPrice * (1 - appliedDiscount / 100);
            }
            // Get categories with translations
            const categories = Array.isArray(product.categories) ? product.categories.map((cat)=>{
                const catTranslations = Array.isArray(cat.translations) ? cat.translations : [];
                const catTranslation = catTranslations.find((t)=>t.locale === lang) || catTranslations[0] || null;
                return {
                    id: cat.id,
                    slug: catTranslation?.slug || "",
                    title: catTranslation?.title || ""
                };
            }) : [];
            return {
                id: product.id,
                slug: translation?.slug || "",
                title: translation?.title || "",
                brand: product.brand ? {
                    id: product.brand.id,
                    name: brandTranslation?.name || ""
                } : null,
                categories,
                price: finalPrice,
                originalPrice: appliedDiscount > 0 ? originalPrice : variant?.compareAtPrice || null,
                compareAtPrice: variant?.compareAtPrice || null,
                discountPercent: appliedDiscount > 0 ? appliedDiscount : null,
                image: (()=>{
                    // Use unified image utilities to get first valid main image
                    if (!Array.isArray(product.media) || product.media.length === 0) {
                        return null;
                    }
                    // Process first image - cast JsonValue to ImageUrlInput
                    const firstImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processImageUrl"])(product.media[0]);
                    return firstImage || null;
                })(),
                inStock: (variant?.stock || 0) > 0,
                labels: (()=>{
                    // Map existing labels
                    const existingLabels = Array.isArray(product.labels) ? product.labels.map((label)=>({
                            id: label.id,
                            type: label.type,
                            value: label.value,
                            position: label.position,
                            color: label.color
                        })) : [];
                    // Check if product is out of stock
                    const isOutOfStock = (variant?.stock || 0) <= 0;
                    // If out of stock, add "Out of Stock" label
                    if (isOutOfStock) {
                        // Check if "Out of Stock" label already exists
                        const outOfStockText = getOutOfStockLabel(lang);
                        const hasOutOfStockLabel = existingLabels.some((label)=>label.value.toLowerCase() === outOfStockText.toLowerCase() || label.value.toLowerCase().includes('out of stock') || label.value.toLowerCase().includes('արտադրված') || label.value.toLowerCase().includes('нет в наличии') || label.value.toLowerCase().includes('არ არის მარაგში'));
                        if (!hasOutOfStockLabel) {
                            // Check if top-left position is available, otherwise use top-right
                            const topLeftOccupied = existingLabels.some((l)=>l.position === 'top-left');
                            const position = topLeftOccupied ? 'top-right' : 'top-left';
                            existingLabels.push({
                                id: `out-of-stock-${product.id}`,
                                type: 'text',
                                value: outOfStockText,
                                position: position,
                                color: '#6B7280'
                            });
                            console.log(`🏷️ [PRODUCTS FIND TRANSFORM SERVICE] Added "Out of Stock" label to product ${product.id} (${lang})`);
                        }
                    }
                    return existingLabels;
                })(),
                colors: availableColors
            };
        });
        return data;
    }
}
const productsFindTransformService = new ProductsFindTransformService();
}),
"[project]/apps/web/lib/services/products-find.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productsFindService",
    ()=>productsFindService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$find$2d$query$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/products-find-query.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$find$2d$filter$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/products-find-filter.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$find$2d$transform$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/products-find-transform.service.ts [app-route] (ecmascript)");
;
;
;
class ProductsFindService {
    /**
   * Get all products with filters
   */ async findAll(filters) {
        const { page = 1, limit = 24, lang = "en" } = filters;
        // Step 1: Build query and fetch products from database
        const { products, bestsellerProductIds } = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$find$2d$query$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productsFindQueryService"].buildQueryAndFetch(filters);
        // Step 2: Filter products in memory (price, colors, sizes, brand) and sort
        const filteredProducts = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$find$2d$filter$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productsFindFilterService"].filterProducts(products, filters, bestsellerProductIds);
        // Step 3: Apply pagination
        const total = filteredProducts.length;
        const paginatedProducts = filteredProducts.slice(0, limit);
        // Step 4: Transform products to response format
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$find$2d$transform$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productsFindTransformService"].transformProducts(paginatedProducts, lang);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
}
const productsFindService = new ProductsFindService();
}),
"[project]/apps/web/lib/services/admin/admin-stats.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminStatsService",
    ()=>adminStatsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
class AdminStatsService {
    /**
   * Get dashboard stats
   */ async getStats() {
        // Count users
        const totalUsers = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.count({
            where: {
                deletedAt: null
            }
        });
        // Count products
        const totalProducts = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.count({
            where: {
                deletedAt: null
            }
        });
        // Count products with low stock (stock < 10)
        const lowStockProducts = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].productVariant.count({
            where: {
                stock: {
                    lt: 10
                },
                published: true
            }
        });
        // Count orders
        const totalOrders = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.count();
        // Count recent orders (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentOrders = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.count({
            where: {
                createdAt: {
                    gte: sevenDaysAgo
                }
            }
        });
        // Count pending orders
        const pendingOrders = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.count({
            where: {
                status: "pending"
            }
        });
        // Calculate total revenue from completed/paid orders
        const completedOrders = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.findMany({
            where: {
                OR: [
                    {
                        status: "completed"
                    },
                    {
                        paymentStatus: "paid"
                    }
                ]
            },
            select: {
                total: true,
                currency: true
            }
        });
        const totalRevenue = completedOrders.reduce((sum, order)=>sum + order.total, 0);
        const currency = completedOrders[0]?.currency || "AMD";
        return {
            users: {
                total: totalUsers
            },
            products: {
                total: totalProducts,
                lowStock: lowStockProducts
            },
            orders: {
                total: totalOrders,
                recent: recentOrders,
                pending: pendingOrders
            },
            revenue: {
                total: totalRevenue,
                currency
            }
        };
    }
    /**
   * Get user activity (recent registrations and active users)
   */ async getUserActivity(limit = 10) {
        // Get recent registrations
        const recentUsers = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findMany({
            where: {
                deletedAt: null
            },
            take: limit,
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                email: true,
                phone: true,
                firstName: true,
                lastName: true,
                createdAt: true
            }
        });
        const recentRegistrations = recentUsers.map((user)=>({
                id: user.id,
                email: user.email || undefined,
                phone: user.phone || undefined,
                name: [
                    user.firstName,
                    user.lastName
                ].filter(Boolean).join(" ") || user.email || user.phone || "Unknown",
                registeredAt: user.createdAt.toISOString(),
                lastLoginAt: undefined
            }));
        // Get active users (users with orders)
        const usersWithOrders = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findMany({
            where: {
                deletedAt: null,
                orders: {
                    some: {}
                }
            },
            select: {
                id: true,
                email: true,
                phone: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                orders: {
                    select: {
                        id: true,
                        total: true,
                        createdAt: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            },
            take: limit
        });
        const activeUsers = usersWithOrders.map((user)=>{
            const orders = Array.isArray(user.orders) ? user.orders : [];
            const orderCount = orders.length;
            const totalSpent = orders.reduce((sum, order)=>sum + order.total, 0);
            const lastOrder = orders[0] || null;
            return {
                id: user.id,
                email: user.email || undefined,
                phone: user.phone || undefined,
                name: [
                    user.firstName,
                    user.lastName
                ].filter(Boolean).join(" ") || user.email || user.phone || "Unknown",
                orderCount,
                totalSpent,
                lastOrderDate: lastOrder ? lastOrder.createdAt.toISOString() : user.createdAt.toISOString(),
                lastLoginAt: undefined
            };
        });
        return {
            recentRegistrations,
            activeUsers
        };
    }
    /**
   * Get recent orders for dashboard
   */ async getRecentOrders(limit = 5) {
        const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.findMany({
            take: limit,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                items: true
            }
        });
        return orders.map((order)=>({
                id: order.id,
                number: order.number,
                status: order.status,
                paymentStatus: order.paymentStatus,
                total: order.total,
                currency: order.currency,
                customerEmail: order.customerEmail || undefined,
                customerPhone: order.customerPhone || undefined,
                itemsCount: order.items.length,
                createdAt: order.createdAt.toISOString()
            }));
    }
    /**
   * Get top products for dashboard
   */ async getTopProducts(limit = 5) {
        // Get all order items with their variants
        const orderItems = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].orderItem.findMany({
            include: {
                variant: {
                    include: {
                        product: {
                            include: {
                                translations: {
                                    where: {
                                        locale: "en"
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });
        // Group by variant and calculate stats
        const productStats = new Map();
        orderItems.forEach((item)=>{
            if (!item.variant) return;
            const variantId = item.variantId || item.variant.id;
            const productId = item.variant.productId;
            const product = item.variant.product;
            const translations = product?.translations || [];
            const translation = translations[0];
            const title = translation?.title || "Unknown Product";
            const sku = item.variant.sku || item.sku || "N/A";
            const image = product && Array.isArray(product.media) && product.media.length > 0 ? product.media[0]?.url || null : null;
            if (!productStats.has(variantId)) {
                productStats.set(variantId, {
                    variantId,
                    productId,
                    title,
                    sku,
                    totalQuantity: 0,
                    totalRevenue: 0,
                    orderCount: 0,
                    image
                });
            }
            const stats = productStats.get(variantId);
            stats.totalQuantity += item.quantity;
            stats.totalRevenue += item.total;
            stats.orderCount += 1;
        });
        // Convert to array and sort by revenue
        const topProducts = Array.from(productStats.values()).sort((a, b)=>b.totalRevenue - a.totalRevenue).slice(0, limit);
        return topProducts;
    }
    /**
   * Get recent activity for dashboard
   */ async getActivity(limit = 10) {
        const activities = [];
        // Get recent orders
        const recentOrders = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.findMany({
            take: limit,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                items: true
            }
        });
        recentOrders.forEach((order)=>{
            activities.push({
                type: "order",
                title: `New Order #${order.number}`,
                description: `${order.items.length} items • ${order.total} ${order.currency}`,
                timestamp: order.createdAt.toISOString()
            });
        });
        // Get recent user registrations
        const recentUsers = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findMany({
            take: Math.floor(limit / 2),
            orderBy: {
                createdAt: "desc"
            },
            where: {
                deletedAt: null
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                createdAt: true
            }
        });
        recentUsers.forEach((user)=>{
            const name = [
                user.firstName,
                user.lastName
            ].filter(Boolean).join(" ") || user.email || user.phone || "New User";
            activities.push({
                type: "user",
                title: "New User Registration",
                description: name,
                timestamp: user.createdAt.toISOString()
            });
        });
        // Sort by timestamp (most recent first) and limit
        return activities.sort((a, b)=>new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit);
    }
    /**
   * Get analytics data
   */ async getAnalytics(period = 'week', startDate, endDate) {
        // Calculate date range based on period
        let start;
        let end = new Date();
        end.setHours(23, 59, 59, 999);
        switch(period){
            case 'day':
                start = new Date();
                start.setHours(0, 0, 0, 0);
                break;
            case 'week':
                start = new Date();
                start.setDate(start.getDate() - 7);
                start.setHours(0, 0, 0, 0);
                break;
            case 'month':
                start = new Date();
                start.setDate(start.getDate() - 30);
                start.setHours(0, 0, 0, 0);
                break;
            case 'year':
                start = new Date();
                start.setFullYear(start.getFullYear() - 1);
                start.setHours(0, 0, 0, 0);
                break;
            case 'custom':
                if (startDate && endDate) {
                    start = new Date(startDate);
                    start.setHours(0, 0, 0, 0);
                    end = new Date(endDate);
                    end.setHours(23, 59, 59, 999);
                } else {
                    start = new Date();
                    start.setDate(start.getDate() - 7);
                    start.setHours(0, 0, 0, 0);
                }
                break;
            default:
                start = new Date();
                start.setDate(start.getDate() - 7);
                start.setHours(0, 0, 0, 0);
        }
        // Get orders in date range
        const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.findMany({
            where: {
                createdAt: {
                    gte: start,
                    lte: end
                }
            },
            include: {
                items: {
                    include: {
                        variant: {
                            include: {
                                product: {
                                    include: {
                                        translations: {
                                            where: {
                                                locale: 'en'
                                            },
                                            take: 1
                                        },
                                        categories: {
                                            include: {
                                                translations: {
                                                    where: {
                                                        locale: 'en'
                                                    },
                                                    take: 1
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        // Calculate order statistics
        const totalOrders = orders.length;
        const paidOrders = orders.filter((o)=>o.paymentStatus === 'paid').length;
        const pendingOrders = orders.filter((o)=>o.status === 'pending').length;
        const completedOrders = orders.filter((o)=>o.status === 'completed').length;
        const totalRevenue = orders.filter((o)=>o.paymentStatus === 'paid').reduce((sum, o)=>sum + o.total, 0);
        // Calculate top products
        const productMap = new Map();
        orders.forEach((order)=>{
            order.items.forEach((item)=>{
                if (item.variantId) {
                    const key = item.variantId;
                    const existing = productMap.get(key) || {
                        variantId: item.variantId,
                        productId: item.variant?.product?.id || '',
                        title: item.productTitle || 'Unknown Product',
                        sku: item.sku || 'N/A',
                        totalQuantity: 0,
                        totalRevenue: 0,
                        orderCount: 0,
                        image: null
                    };
                    existing.totalQuantity += item.quantity;
                    existing.totalRevenue += item.total;
                    existing.orderCount += 1;
                    productMap.set(key, existing);
                }
            });
        });
        const topProducts = Array.from(productMap.values()).sort((a, b)=>b.totalRevenue - a.totalRevenue).slice(0, 10);
        // Calculate top categories
        const categoryMap = new Map();
        orders.forEach((order)=>{
            order.items.forEach((item)=>{
                if (item.variant?.product) {
                    item.variant.product.categories.forEach((category)=>{
                        const categoryId = category.id;
                        const translations = category.translations || [];
                        const categoryName = translations[0]?.title || category.id;
                        const existing = categoryMap.get(categoryId) || {
                            categoryId,
                            categoryName,
                            totalQuantity: 0,
                            totalRevenue: 0,
                            orderCount: 0
                        };
                        existing.totalQuantity += item.quantity;
                        existing.totalRevenue += item.total;
                        existing.orderCount += 1;
                        categoryMap.set(categoryId, existing);
                    });
                }
            });
        });
        const topCategories = Array.from(categoryMap.values()).sort((a, b)=>b.totalRevenue - a.totalRevenue).slice(0, 10);
        // Calculate orders by day
        const ordersByDayMap = new Map();
        orders.forEach((order)=>{
            const dateKey = order.createdAt.toISOString().split('T')[0];
            const existing = ordersByDayMap.get(dateKey) || {
                count: 0,
                revenue: 0
            };
            existing.count += 1;
            if (order.paymentStatus === 'paid') {
                existing.revenue += order.total;
            }
            ordersByDayMap.set(dateKey, existing);
        });
        const ordersByDay = Array.from(ordersByDayMap.entries()).map(([date, data])=>({
                _id: date,
                count: data.count,
                revenue: data.revenue
            })).sort((a, b)=>a._id.localeCompare(b._id));
        return {
            period,
            dateRange: {
                start: start.toISOString(),
                end: end.toISOString()
            },
            orders: {
                totalOrders,
                totalRevenue,
                paidOrders,
                pendingOrders,
                completedOrders
            },
            topProducts,
            topCategories,
            ordersByDay
        };
    }
}
const adminStatsService = new AdminStatsService();
}),
"[project]/apps/web/lib/services/admin/admin-users.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminUsersService",
    ()=>adminUsersService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
class AdminUsersService {
    /**
   * Get users
   */ async getUsers(_filters) {
        const users = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findMany({
            where: {
                deletedAt: null
            },
            take: 100,
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                email: true,
                phone: true,
                firstName: true,
                lastName: true,
                roles: true,
                blocked: true,
                createdAt: true,
                _count: {
                    select: {
                        orders: true
                    }
                }
            }
        });
        return {
            data: users.map((user)=>({
                    id: user.id,
                    email: user.email,
                    phone: user.phone,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    roles: user.roles,
                    blocked: user.blocked,
                    createdAt: user.createdAt,
                    ordersCount: user._count?.orders ?? 0
                }))
        };
    }
    /**
   * Update user
   */ async updateUser(userId, data) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.update({
            where: {
                id: userId
            },
            data: {
                blocked: data.blocked,
                roles: data.roles
            },
            select: {
                id: true,
                email: true,
                phone: true,
                firstName: true,
                lastName: true,
                roles: true,
                blocked: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }
    /**
   * Delete user (soft delete)
   */ async deleteUser(userId) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true
            }
        });
        if (!user) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "User not found",
                detail: `User with id '${userId}' does not exist`
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.update({
            where: {
                id: userId
            },
            data: {
                deletedAt: new Date(),
                blocked: true
            },
            select: {
                id: true
            }
        });
        return {
            success: true
        };
    }
}
const adminUsersService = new AdminUsersService();
}),
"[project]/apps/web/lib/services/admin/admin-orders.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminOrdersService",
    ()=>adminOrdersService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
class AdminOrdersService {
    /**
   * Get orders with filters and pagination
   */ async getOrders(filters = {}) {
        const page = filters.page || 1;
        const limit = filters.limit || 20;
        const skip = (page - 1) * limit;
        const where = {};
        // Build AND conditions array
        const andConditions = [];
        // Apply status filter
        if (filters.status) {
            andConditions.push({
                status: filters.status
            });
        }
        // Apply payment status filter
        if (filters.paymentStatus) {
            andConditions.push({
                paymentStatus: filters.paymentStatus
            });
        }
        // Apply search filter
        if (filters.search && filters.search.trim()) {
            const searchTerm = filters.search.trim();
            andConditions.push({
                OR: [
                    {
                        number: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        customerEmail: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        customerPhone: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        user: {
                            OR: [
                                {
                                    firstName: {
                                        contains: searchTerm,
                                        mode: 'insensitive'
                                    }
                                },
                                {
                                    lastName: {
                                        contains: searchTerm,
                                        mode: 'insensitive'
                                    }
                                },
                                {
                                    email: {
                                        contains: searchTerm,
                                        mode: 'insensitive'
                                    }
                                },
                                {
                                    phone: {
                                        contains: searchTerm,
                                        mode: 'insensitive'
                                    }
                                }
                            ]
                        }
                    }
                ]
            });
        }
        // Apply AND conditions if any exist
        if (andConditions.length > 0) {
            where.AND = andConditions;
        }
        // Determine sort field and order
        const sortBy = filters.sortBy || 'createdAt';
        const sortOrder = filters.sortOrder || 'desc';
        // Map frontend sort fields to database fields
        const sortFieldMap = {
            'total': 'total',
            'createdAt': 'createdAt'
        };
        const dbSortField = sortFieldMap[sortBy] || 'createdAt';
        const orderBy = {
            [dbSortField]: sortOrder
        };
        console.log('📦 [ADMIN SERVICE] getOrders with filters:', {
            where,
            page,
            limit,
            skip,
            orderBy
        });
        // Get orders with pagination, including related user for basic customer info
        const [orders, total] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: {
                    items: true,
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true
                        }
                    }
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.count({
                where
            })
        ]);
        // Format orders for response
        const formattedOrders = orders.map((order)=>{
            const customer = order.user || null;
            const firstName = customer?.firstName || '';
            const lastName = customer?.lastName || '';
            return {
                id: order.id,
                number: order.number,
                status: order.status,
                paymentStatus: order.paymentStatus,
                fulfillmentStatus: order.fulfillmentStatus,
                total: order.total,
                subtotal: order.subtotal,
                discountAmount: order.discountAmount,
                shippingAmount: order.shippingAmount,
                taxAmount: order.taxAmount,
                currency: order.currency || 'AMD',
                customerEmail: customer?.email || order.customerEmail || '',
                customerPhone: customer?.phone || order.customerPhone || '',
                customerFirstName: firstName,
                customerLastName: lastName,
                customerId: customer?.id || null,
                itemsCount: order.items.length,
                createdAt: order.createdAt.toISOString()
            };
        });
        return {
            data: formattedOrders,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    /**
   * Get single order by ID with full details for admin
   */ async getOrderById(orderId) {
        // Fetch order with related user and items/variants/products
        const order = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.findUnique({
            where: {
                id: orderId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        phone: true,
                        firstName: true,
                        lastName: true
                    }
                },
                items: {
                    include: {
                        variant: {
                            include: {
                                product: {
                                    include: {
                                        translations: {
                                            where: {
                                                locale: "en"
                                            },
                                            take: 1
                                        }
                                    }
                                },
                                options: {
                                    include: {
                                        attributeValue: {
                                            include: {
                                                attribute: true,
                                                translations: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                payments: true
            }
        });
        if (!order) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Order not found",
                detail: `Order with id '${orderId}' does not exist`
            };
        }
        const user = order.user;
        const items = Array.isArray(order.items) ? order.items : [];
        const formattedItems = items.map((item)=>{
            const variant = item.variant;
            const product = variant?.product;
            const translations = Array.isArray(product?.translations) ? product.translations : [];
            const translation = translations[0] || null;
            const quantity = item.quantity ?? 0;
            const total = item.total ?? 0;
            const unitPrice = quantity > 0 ? Number((total / quantity).toFixed(2)) : total;
            // Extract variant options (color, size, etc.)
            // Support both new format (AttributeValue) and old format (attributeKey/value)
            const variantOptions = variant?.options?.map((opt)=>{
                // Debug logging for each option
                console.log(`🔍 [ADMIN SERVICE] Processing option:`, {
                    attributeKey: opt.attributeKey,
                    value: opt.value,
                    valueId: opt.valueId,
                    hasAttributeValue: !!opt.attributeValue,
                    attributeValueData: opt.attributeValue ? {
                        value: opt.attributeValue.value,
                        attributeKey: opt.attributeValue.attribute.key,
                        imageUrl: opt.attributeValue.imageUrl,
                        hasTranslations: opt.attributeValue.translations?.length > 0
                    } : null
                });
                // New format: Use AttributeValue if available
                if (opt.attributeValue) {
                    // Get label from translations (prefer current locale, fallback to first available)
                    const translations = opt.attributeValue.translations || [];
                    const label = translations.length > 0 ? translations[0].label : opt.attributeValue.value;
                    return {
                        attributeKey: opt.attributeValue.attribute.key || undefined,
                        value: opt.attributeValue.value || undefined,
                        label: label || undefined,
                        imageUrl: opt.attributeValue.imageUrl || undefined,
                        colors: opt.attributeValue.colors || undefined
                    };
                }
                // Old format: Use attributeKey and value directly
                return {
                    attributeKey: opt.attributeKey || undefined,
                    value: opt.value || undefined
                };
            }) || [];
            console.log(`🔍 [ADMIN SERVICE] Item mapping:`, {
                productTitle: item.productTitle,
                variantId: item.variantId,
                hasVariant: !!variant,
                optionsCount: variant?.options?.length || 0,
                variantOptions
            });
            return {
                id: item.id,
                variantId: item.variantId || variant?.id || null,
                productId: product?.id || null,
                productTitle: translation?.title || item.productTitle || "Unknown Product",
                sku: variant?.sku || item.sku || "N/A",
                quantity,
                total,
                unitPrice,
                variantOptions
            };
        });
        const payments = Array.isArray(order.payments) ? order.payments : [];
        const primaryPayment = payments[0] || null;
        return {
            id: order.id,
            number: order.number,
            status: order.status,
            paymentStatus: order.paymentStatus,
            fulfillmentStatus: order.fulfillmentStatus,
            total: order.total,
            currency: order.currency || "AMD",
            totals: {
                subtotal: Number(order.subtotal || 0),
                discount: Number(order.discountAmount || 0),
                shipping: Number(order.shippingAmount || 0),
                tax: Number(order.taxAmount || 0),
                total: Number(order.total || 0),
                currency: order.currency || "AMD"
            },
            customerEmail: order.customerEmail || user?.email || undefined,
            customerPhone: order.customerPhone || user?.phone || undefined,
            billingAddress: order.billingAddress || null,
            shippingAddress: order.shippingAddress || null,
            shippingMethod: order.shippingMethod || null,
            notes: order.notes || null,
            adminNotes: order.adminNotes || null,
            ipAddress: order.ipAddress || null,
            userAgent: order.userAgent || null,
            payment: primaryPayment ? {
                id: primaryPayment.id,
                provider: primaryPayment.provider,
                method: primaryPayment.method,
                amount: primaryPayment.amount,
                currency: primaryPayment.currency,
                status: primaryPayment.status,
                cardLast4: primaryPayment.cardLast4,
                cardBrand: primaryPayment.cardBrand
            } : null,
            customer: user ? {
                id: user.id,
                email: user.email,
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName
            } : null,
            createdAt: order.createdAt.toISOString(),
            updatedAt: order.updatedAt?.toISOString?.() ?? undefined,
            items: formattedItems
        };
    }
    /**
   * Delete order
   * Հեռացնում է պատվերը և բոլոր կապված գրառումները (cascade)
   */ async deleteOrder(orderId) {
        try {
            console.log('🗑️ [ADMIN] Սկսվում է պատվերի հեռացում:', {
                orderId,
                timestamp: new Date().toISOString()
            });
            // Ստուգում ենք, արդյոք պատվերը գոյություն ունի
            console.log('🔍 [ADMIN] Ստուգվում է պատվերի գոյությունը...');
            const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.findUnique({
                where: {
                    id: orderId
                },
                select: {
                    id: true,
                    number: true,
                    status: true,
                    total: true,
                    _count: {
                        select: {
                            items: true,
                            payments: true,
                            events: true
                        }
                    }
                }
            });
            if (!existing) {
                console.log('❌ [ADMIN] Պատվերը չի գտնվել:', orderId);
                throw {
                    status: 404,
                    type: "https://api.shop.am/problems/not-found",
                    title: "Order not found",
                    detail: `Order with id '${orderId}' does not exist`
                };
            }
            console.log('✅ [ADMIN] Պատվերը գտնվել է:', {
                id: existing.id,
                number: existing.number,
                status: existing.status,
                total: existing.total,
                itemsCount: existing._count.items,
                paymentsCount: existing._count.payments,
                eventsCount: existing._count.events
            });
            // Հեռացնում ենք պատվերը (cascade-ը ավտոմատ կհեռացնի կապված items, payments, events)
            console.log('🗑️ [ADMIN] Հեռացվում է պատվերը և կապված գրառումները...');
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.delete({
                    where: {
                        id: orderId
                    }
                });
                console.log('✅ [ADMIN] Prisma delete հարցումը հաջողությամբ ավարտված');
            } catch (deleteError) {
                console.error('❌ [ADMIN] Prisma delete սխալ:', {
                    code: deleteError?.code,
                    meta: deleteError?.meta,
                    message: deleteError?.message,
                    name: deleteError?.name
                });
                throw deleteError;
            }
            console.log('✅ [ADMIN] Պատվերը հաջողությամբ հեռացվել է:', {
                orderId,
                orderNumber: existing.number,
                timestamp: new Date().toISOString()
            });
            return {
                success: true
            };
        } catch (error) {
            // Եթե սա մեր ստեղծած սխալ է, ապա վերադարձնում ենք այն
            if (error.status && error.type) {
                console.error('❌ [ADMIN] Ստանդարտ սխալ:', {
                    status: error.status,
                    type: error.type,
                    title: error.title,
                    detail: error.detail
                });
                throw error;
            }
            // Մանրամասն լոգավորում Prisma սխալների համար
            console.error('❌ [ADMIN] Պատվերի հեռացման սխալ:', {
                orderId,
                error: {
                    name: error?.name,
                    message: error?.message,
                    code: error?.code,
                    meta: error?.meta,
                    stack: error?.stack?.substring(0, 500)
                },
                timestamp: new Date().toISOString()
            });
            // Prisma սխալների մշակում
            if (error?.code === 'P2025') {
                // Record not found
                console.log('⚠️ [ADMIN] Prisma P2025: Գրառումը չի գտնվել');
                throw {
                    status: 404,
                    type: "https://api.shop.am/problems/not-found",
                    title: "Order not found",
                    detail: `Order with id '${orderId}' does not exist`
                };
            }
            if (error?.code === 'P2003') {
                // Foreign key constraint failed
                console.log('⚠️ [ADMIN] Prisma P2003: Foreign key սահմանափակում');
                throw {
                    status: 409,
                    type: "https://api.shop.am/problems/conflict",
                    title: "Cannot delete order",
                    detail: "Order has related records that cannot be deleted"
                };
            }
            // Գեներիկ սխալ
            throw {
                status: 500,
                type: "https://api.shop.am/problems/internal-error",
                title: "Internal Server Error",
                detail: error?.message || "Failed to delete order"
            };
        }
    }
    /**
   * Update order
   */ async updateOrder(orderId, data) {
        try {
            // Check if order exists
            const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.findUnique({
                where: {
                    id: orderId
                }
            });
            if (!existing) {
                throw {
                    status: 404,
                    type: "https://api.shop.am/problems/not-found",
                    title: "Order not found",
                    detail: `Order with id '${orderId}' does not exist`
                };
            }
            // Validate status values
            const validStatuses = [
                'pending',
                'processing',
                'completed',
                'cancelled'
            ];
            const validPaymentStatuses = [
                'pending',
                'paid',
                'failed',
                'refunded'
            ];
            const validFulfillmentStatuses = [
                'unfulfilled',
                'fulfilled',
                'shipped',
                'delivered'
            ];
            if (data.status !== undefined && !validStatuses.includes(data.status)) {
                throw {
                    status: 400,
                    type: "https://api.shop.am/problems/validation-error",
                    title: "Validation Error",
                    detail: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
                };
            }
            if (data.paymentStatus !== undefined && !validPaymentStatuses.includes(data.paymentStatus)) {
                throw {
                    status: 400,
                    type: "https://api.shop.am/problems/validation-error",
                    title: "Validation Error",
                    detail: `Invalid paymentStatus. Must be one of: ${validPaymentStatuses.join(', ')}`
                };
            }
            if (data.fulfillmentStatus !== undefined && !validFulfillmentStatuses.includes(data.fulfillmentStatus)) {
                throw {
                    status: 400,
                    type: "https://api.shop.am/problems/validation-error",
                    title: "Validation Error",
                    detail: `Invalid fulfillmentStatus. Must be one of: ${validFulfillmentStatuses.join(', ')}`
                };
            }
            // Prepare update data
            const updateData = {};
            if (data.status !== undefined) updateData.status = data.status;
            if (data.paymentStatus !== undefined) updateData.paymentStatus = data.paymentStatus;
            if (data.fulfillmentStatus !== undefined) updateData.fulfillmentStatus = data.fulfillmentStatus;
            // Update timestamps based on status changes
            if (data.status === 'completed' && existing.status !== 'completed') {
                updateData.fulfilledAt = new Date();
            }
            if (data.status === 'cancelled' && existing.status !== 'cancelled') {
                updateData.cancelledAt = new Date();
            }
            if (data.paymentStatus === 'paid' && existing.paymentStatus !== 'paid') {
                updateData.paidAt = new Date();
            }
            const order = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.update({
                where: {
                    id: orderId
                },
                data: updateData,
                include: {
                    items: true,
                    payments: true
                }
            });
            // Create order event
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].orderEvent.create({
                data: {
                    orderId: order.id,
                    type: 'order_updated',
                    data: {
                        updatedFields: Object.keys(updateData),
                        previousStatus: existing.status,
                        newStatus: data.status || existing.status
                    }
                }
            });
            return order;
        } catch (error) {
            // If it's already our custom error, re-throw it
            if (error.status && error.type) {
                throw error;
            }
            // Log Prisma/database errors
            console.error("❌ [ADMIN SERVICE] updateOrder error:", {
                orderId,
                error: {
                    name: error?.name,
                    message: error?.message,
                    code: error?.code,
                    meta: error?.meta,
                    stack: error?.stack?.substring(0, 500)
                }
            });
            // Handle specific Prisma errors
            if (error?.code === 'P2025') {
                // Record not found
                throw {
                    status: 404,
                    type: "https://api.shop.am/problems/not-found",
                    title: "Not Found",
                    detail: error?.meta?.cause || "The requested order was not found"
                };
            }
            // Generic database error
            throw {
                status: 500,
                type: "https://api.shop.am/problems/internal-error",
                title: "Database Error",
                detail: error?.message || "An error occurred while updating the order"
            };
        }
    }
}
const adminOrdersService = new AdminOrdersService();
}),
"[project]/apps/web/lib/services/admin/admin-settings.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminSettingsService",
    ()=>adminSettingsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
class AdminSettingsService {
    /**
   * Get settings
   */ async getSettings() {
        const settings = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].settings.findMany({
            where: {
                key: {
                    in: [
                        'globalDiscount',
                        'categoryDiscounts',
                        'brandDiscounts',
                        'defaultCurrency',
                        'currencyRates'
                    ]
                }
            }
        });
        const globalDiscountSetting = settings.find((s)=>s.key === 'globalDiscount');
        const categoryDiscountsSetting = settings.find((s)=>s.key === 'categoryDiscounts');
        const brandDiscountsSetting = settings.find((s)=>s.key === 'brandDiscounts');
        const defaultCurrencySetting = settings.find((s)=>s.key === 'defaultCurrency');
        const currencyRatesSetting = settings.find((s)=>s.key === 'currencyRates');
        // Default currency rates (fallback)
        const defaultCurrencyRates = {
            USD: 1,
            AMD: 400,
            EUR: 0.92,
            RUB: 90,
            GEL: 2.7
        };
        return {
            globalDiscount: globalDiscountSetting ? Number(globalDiscountSetting.value) : 0,
            categoryDiscounts: categoryDiscountsSetting ? categoryDiscountsSetting.value : {},
            brandDiscounts: brandDiscountsSetting ? brandDiscountsSetting.value : {},
            defaultCurrency: defaultCurrencySetting ? defaultCurrencySetting.value : 'AMD',
            currencyRates: currencyRatesSetting ? currencyRatesSetting.value : defaultCurrencyRates
        };
    }
    /**
   * Update settings
   */ async updateSettings(data) {
        console.log('⚙️ [ADMIN SERVICE] Updating settings...', data);
        // Update global discount
        if (data.globalDiscount !== undefined) {
            const globalDiscountValue = Number(data.globalDiscount) || 0;
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].settings.upsert({
                where: {
                    key: 'globalDiscount'
                },
                update: {
                    value: globalDiscountValue,
                    updatedAt: new Date()
                },
                create: {
                    key: 'globalDiscount',
                    value: globalDiscountValue,
                    description: 'Global discount percentage for all products'
                }
            });
            console.log('✅ [ADMIN SERVICE] Global discount updated:', globalDiscountValue);
        }
        // Update category discounts
        if (data.categoryDiscounts !== undefined) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].settings.upsert({
                where: {
                    key: 'categoryDiscounts'
                },
                update: {
                    value: data.categoryDiscounts,
                    updatedAt: new Date()
                },
                create: {
                    key: 'categoryDiscounts',
                    value: data.categoryDiscounts,
                    description: 'Discount percentages by category ID'
                }
            });
            console.log('✅ [ADMIN SERVICE] Category discounts updated:', data.categoryDiscounts);
        }
        // Update brand discounts
        if (data.brandDiscounts !== undefined) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].settings.upsert({
                where: {
                    key: 'brandDiscounts'
                },
                update: {
                    value: data.brandDiscounts,
                    updatedAt: new Date()
                },
                create: {
                    key: 'brandDiscounts',
                    value: data.brandDiscounts,
                    description: 'Discount percentages by brand ID'
                }
            });
            console.log('✅ [ADMIN SERVICE] Brand discounts updated:', data.brandDiscounts);
        }
        // Update default currency
        if (data.defaultCurrency !== undefined) {
            const currencyValue = String(data.defaultCurrency);
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].settings.upsert({
                where: {
                    key: 'defaultCurrency'
                },
                update: {
                    value: currencyValue,
                    updatedAt: new Date()
                },
                create: {
                    key: 'defaultCurrency',
                    value: currencyValue,
                    description: 'Default currency for admin product pricing (USD, AMD, EUR)'
                }
            });
            console.log('✅ [ADMIN SERVICE] Default currency updated:', currencyValue);
        }
        // Update currency rates
        if (data.currencyRates !== undefined) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].settings.upsert({
                where: {
                    key: 'currencyRates'
                },
                update: {
                    value: data.currencyRates,
                    updatedAt: new Date()
                },
                create: {
                    key: 'currencyRates',
                    value: data.currencyRates,
                    description: 'Currency exchange rates relative to USD (USD, AMD, EUR, RUB, GEL)'
                }
            });
            console.log('✅ [ADMIN SERVICE] Currency rates updated:', data.currencyRates);
        }
        return {
            success: true
        };
    }
    /**
   * Get price filter settings
   */ async getPriceFilterSettings() {
        console.log('⚙️ [ADMIN SERVICE] Fetching price filter settings...');
        const setting = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].settings.findUnique({
            where: {
                key: 'price-filter'
            }
        });
        if (!setting) {
            console.log('✅ [ADMIN SERVICE] Price filter settings not found, returning defaults');
            return {
                minPrice: null,
                maxPrice: null,
                stepSize: null,
                stepSizePerCurrency: null
            };
        }
        const value = setting.value;
        console.log('✅ [ADMIN SERVICE] Price filter settings loaded:', value);
        return {
            minPrice: value.minPrice ?? null,
            maxPrice: value.maxPrice ?? null,
            stepSize: value.stepSize ?? null,
            stepSizePerCurrency: value.stepSizePerCurrency ?? null
        };
    }
    /**
   * Update price filter settings
   */ async updatePriceFilterSettings(data) {
        console.log('⚙️ [ADMIN SERVICE] Updating price filter settings...', data);
        const value = {};
        if (data.minPrice !== null && data.minPrice !== undefined) {
            value.minPrice = data.minPrice;
        }
        if (data.maxPrice !== null && data.maxPrice !== undefined) {
            value.maxPrice = data.maxPrice;
        }
        if (data.stepSize !== null && data.stepSize !== undefined) {
            value.stepSize = data.stepSize;
        }
        if (data.stepSizePerCurrency) {
            const cleaned = {};
            if (data.stepSizePerCurrency.USD !== null && data.stepSizePerCurrency.USD !== undefined) {
                cleaned.USD = data.stepSizePerCurrency.USD;
            }
            if (data.stepSizePerCurrency.AMD !== null && data.stepSizePerCurrency.AMD !== undefined) {
                cleaned.AMD = data.stepSizePerCurrency.AMD;
            }
            if (data.stepSizePerCurrency.RUB !== null && data.stepSizePerCurrency.RUB !== undefined) {
                cleaned.RUB = data.stepSizePerCurrency.RUB;
            }
            if (data.stepSizePerCurrency.GEL !== null && data.stepSizePerCurrency.GEL !== undefined) {
                cleaned.GEL = data.stepSizePerCurrency.GEL;
            }
            if (Object.keys(cleaned).length > 0) {
                value.stepSizePerCurrency = cleaned;
            }
        }
        const setting = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].settings.upsert({
            where: {
                key: 'price-filter'
            },
            update: {
                value: value,
                updatedAt: new Date()
            },
            create: {
                key: 'price-filter',
                value: value,
                description: 'Price filter default range and step size settings'
            }
        });
        console.log('✅ [ADMIN SERVICE] Price filter settings updated:', setting);
        const stored = setting.value;
        return {
            success: true,
            minPrice: stored.minPrice ?? null,
            maxPrice: stored.maxPrice ?? null,
            stepSize: stored.stepSize ?? null,
            stepSizePerCurrency: stored.stepSizePerCurrency ?? null
        };
    }
}
const adminSettingsService = new AdminSettingsService();
}),
"[project]/apps/web/lib/services/admin/admin-delivery.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminDeliveryService",
    ()=>adminDeliveryService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
class AdminDeliveryService {
    /**
   * Get delivery settings
   */ async getDeliverySettings() {
        console.log('🚚 [ADMIN SERVICE] getDeliverySettings called');
        const setting = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].settings.findUnique({
            where: {
                key: 'delivery-locations'
            }
        });
        if (!setting) {
            console.log('✅ [ADMIN SERVICE] Delivery settings not found, returning defaults');
            return {
                locations: []
            };
        }
        const value = setting.value;
        console.log('✅ [ADMIN SERVICE] Delivery settings loaded:', value);
        return {
            locations: value.locations || []
        };
    }
    /**
   * Get delivery price for a specific city
   * Returns the configured price if city has shipping, otherwise returns 0
   */ async getDeliveryPrice(city, country = 'Armenia') {
        console.log('🚚 [ADMIN SERVICE] getDeliveryPrice called:', {
            city,
            country
        });
        const setting = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].settings.findUnique({
            where: {
                key: 'delivery-locations'
            }
        });
        if (!setting) {
            console.log('✅ [ADMIN SERVICE] Delivery settings not found, returning 0 (no shipping for this city)');
            return 0; // No shipping configured for this city
        }
        const value = setting.value;
        const locations = value.locations || [];
        // Find matching location (case-insensitive)
        const location = locations.find((loc)=>loc.city.toLowerCase().trim() === city.toLowerCase().trim() && loc.country.toLowerCase().trim() === country.toLowerCase().trim());
        if (location) {
            console.log('✅ [ADMIN SERVICE] Delivery price found:', location.price);
            return location.price;
        }
        // If no exact match, try to find by city only (case-insensitive)
        const cityMatch = locations.find((loc)=>loc.city.toLowerCase().trim() === city.toLowerCase().trim());
        if (cityMatch) {
            console.log('✅ [ADMIN SERVICE] Delivery price found by city:', cityMatch.price);
            return cityMatch.price;
        }
        // Return 0 if no match found (city doesn't have shipping configured)
        console.log('✅ [ADMIN SERVICE] No delivery price found for city, returning 0');
        return 0; // No shipping for this city
    }
    /**
   * Update delivery settings
   */ async updateDeliverySettings(data) {
        console.log('🚚 [ADMIN SERVICE] updateDeliverySettings called:', data);
        // Validate locations
        if (!Array.isArray(data.locations)) {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/validation-error",
                title: "Validation Error",
                detail: "Locations must be an array"
            };
        }
        // Validate each location
        for (const location of data.locations){
            if (!location.country || !location.city) {
                throw {
                    status: 400,
                    type: "https://api.shop.am/problems/validation-error",
                    title: "Validation Error",
                    detail: "Each location must have country and city"
                };
            }
            if (typeof location.price !== 'number' || location.price < 0) {
                throw {
                    status: 400,
                    type: "https://api.shop.am/problems/validation-error",
                    title: "Validation Error",
                    detail: "Price must be a non-negative number"
                };
            }
        }
        // Generate IDs for new locations
        const locationsWithIds = data.locations.map((location, index)=>({
                ...location,
                id: location.id || `location-${Date.now()}-${index}`
            }));
        const setting = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].settings.upsert({
            where: {
                key: 'delivery-locations'
            },
            update: {
                value: {
                    locations: locationsWithIds
                },
                updatedAt: new Date()
            },
            create: {
                key: 'delivery-locations',
                value: {
                    locations: locationsWithIds
                },
                description: 'Delivery prices by country and city'
            }
        });
        console.log('✅ [ADMIN SERVICE] Delivery settings updated:', setting);
        return {
            locations: locationsWithIds
        };
    }
}
const adminDeliveryService = new AdminDeliveryService();
}),
"[project]/apps/web/lib/services/admin/admin-brands.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminBrandsService",
    ()=>adminBrandsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
class AdminBrandsService {
    /**
   * Get brands for admin
   */ async getBrands() {
        const brands = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brand.findMany({
            where: {
                deletedAt: null
            },
            include: {
                translations: {
                    where: {
                        locale: "en"
                    },
                    take: 1
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return {
            data: brands.map((brand)=>{
                const translations = Array.isArray(brand.translations) ? brand.translations : [];
                const translation = translations[0] || null;
                return {
                    id: brand.id,
                    name: translation?.name || "",
                    slug: brand.slug
                };
            })
        };
    }
    /**
   * Create brand
   */ async createBrand(data) {
        const locale = data.locale || "en";
        // Generate base slug from name
        const baseSlug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        // Generate unique slug by appending number if needed
        let slug = baseSlug;
        let counter = 1;
        let existing = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brand.findUnique({
            where: {
                slug
            }
        });
        while(existing){
            slug = `${baseSlug}-${counter}`;
            counter++;
            existing = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brand.findUnique({
                where: {
                    slug
                }
            });
            // Safety check to prevent infinite loop
            if (counter > 1000) {
                throw {
                    status: 500,
                    type: "https://api.shop.am/problems/internal-error",
                    title: "Unable to generate unique slug",
                    detail: "Could not generate a unique slug for the brand after many attempts"
                };
            }
        }
        const brand = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brand.create({
            data: {
                slug,
                logoUrl: data.logoUrl || undefined,
                published: true,
                translations: {
                    create: {
                        locale,
                        name: data.name
                    }
                }
            },
            include: {
                translations: true
            }
        });
        // Безопасное получение translation с проверкой на существование массива
        const brandTranslations = Array.isArray(brand.translations) ? brand.translations : [];
        const translation = brandTranslations.find((t)=>t.locale === locale) || brandTranslations[0] || null;
        return {
            data: {
                id: brand.id,
                name: translation?.name || "",
                slug: brand.slug
            }
        };
    }
    /**
   * Update brand
   */ async updateBrand(brandId, data) {
        console.log('🔄 [ADMIN SERVICE] updateBrand called:', brandId, data);
        const brand = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brand.findUnique({
            where: {
                id: brandId
            },
            include: {
                translations: true
            }
        });
        if (!brand) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Brand not found",
                detail: `Brand with id '${brandId}' does not exist`
            };
        }
        const locale = data.locale || "en";
        const updateData = {};
        // Update logo URL if provided
        if (data.logoUrl !== undefined) {
            updateData.logoUrl = data.logoUrl || null;
        }
        // Update translation if name is provided
        if (data.name !== undefined) {
            const brandTranslations = Array.isArray(brand.translations) ? brand.translations : [];
            const existingTranslation = brandTranslations.find((t)=>t.locale === locale);
            if (existingTranslation) {
                // Update existing translation
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brandTranslation.update({
                    where: {
                        id: existingTranslation.id
                    },
                    data: {
                        name: data.name
                    }
                });
            } else {
                // Create new translation
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brandTranslation.create({
                    data: {
                        brandId: brand.id,
                        locale,
                        name: data.name
                    }
                });
            }
        }
        // Update brand base data if needed
        if (Object.keys(updateData).length > 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brand.update({
                where: {
                    id: brandId
                },
                data: updateData
            });
        }
        // Fetch updated brand with translations
        const updatedBrand = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brand.findUnique({
            where: {
                id: brandId
            },
            include: {
                translations: {
                    where: {
                        locale
                    },
                    take: 1
                }
            }
        });
        const brandTranslations = Array.isArray(updatedBrand?.translations) ? updatedBrand.translations : [];
        const translation = brandTranslations[0] || null;
        return {
            data: {
                id: updatedBrand.id,
                name: translation?.name || "",
                slug: updatedBrand.slug
            }
        };
    }
    /**
   * Delete brand (soft delete)
   */ async deleteBrand(brandId) {
        console.log('🗑️ [ADMIN SERVICE] deleteBrand called:', brandId);
        const brand = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brand.findUnique({
            where: {
                id: brandId
            }
        });
        if (!brand) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Brand not found",
                detail: `Brand with id '${brandId}' does not exist`
            };
        }
        // Check if brand has products (using count for better performance)
        const productsCount = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.count({
            where: {
                brandId: brandId,
                deletedAt: null
            }
        });
        if (productsCount > 0) {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/bad-request",
                title: "Cannot delete brand",
                detail: `This brand has ${productsCount} associated product${productsCount > 1 ? 's' : ''}. Please remove or change brand for these products first.`,
                productsCount
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brand.update({
            where: {
                id: brandId
            },
            data: {
                deletedAt: new Date(),
                published: false
            }
        });
        console.log('✅ [ADMIN SERVICE] Brand deleted:', brandId);
        return {
            success: true
        };
    }
}
const adminBrandsService = new AdminBrandsService();
}),
"[project]/apps/web/lib/services/admin/admin-categories.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminCategoriesService",
    ()=>adminCategoriesService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
class AdminCategoriesService {
    /**
   * Get categories for admin
   */ async getCategories() {
        const categories = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findMany({
            where: {
                deletedAt: null
            },
            include: {
                translations: {
                    where: {
                        locale: "en"
                    },
                    take: 1
                }
            },
            orderBy: {
                position: "asc"
            }
        });
        return {
            data: categories.map((category)=>{
                const translations = Array.isArray(category.translations) ? category.translations : [];
                const translation = translations[0] || null;
                return {
                    id: category.id,
                    title: translation?.title || "",
                    slug: translation?.slug || "",
                    parentId: category.parentId,
                    requiresSizes: category.requiresSizes || false
                };
            })
        };
    }
    /**
   * Create category
   */ async createCategory(data) {
        const locale = data.locale || "en";
        // Validate parent category exists if parentId is provided
        if (data.parentId) {
            const parentCategory = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findUnique({
                where: {
                    id: data.parentId
                }
            });
            if (!parentCategory) {
                throw {
                    status: 404,
                    type: "https://api.shop.am/problems/not-found",
                    title: "Parent category not found",
                    detail: `Parent category with id '${data.parentId}' does not exist`
                };
            }
        }
        // Generate slug from title
        const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        const category = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.create({
            data: {
                parentId: data.parentId || undefined,
                requiresSizes: data.requiresSizes || false,
                published: true,
                translations: {
                    create: {
                        locale,
                        title: data.title,
                        slug,
                        fullPath: slug
                    }
                }
            },
            include: {
                translations: true
            }
        });
        // Безопасное получение translation с проверкой на существование массива
        const categoryTranslations = Array.isArray(category.translations) ? category.translations : [];
        const translation = categoryTranslations.find((t)=>t.locale === locale) || categoryTranslations[0] || null;
        return {
            data: {
                id: category.id,
                title: translation?.title || "",
                slug: translation?.slug || "",
                parentId: category.parentId,
                requiresSizes: category.requiresSizes || false
            }
        };
    }
    /**
   * Get category by ID with children
   */ async getCategoryById(categoryId) {
        const category = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findUnique({
            where: {
                id: categoryId
            },
            include: {
                translations: {
                    where: {
                        locale: "en"
                    },
                    take: 1
                },
                children: {
                    include: {
                        translations: {
                            where: {
                                locale: "en"
                            },
                            take: 1
                        }
                    }
                }
            }
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
            children: category.children.map((child)=>{
                const childTranslations = Array.isArray(child.translations) ? child.translations : [];
                const childTranslation = childTranslations[0] || null;
                return {
                    id: child.id,
                    title: childTranslation?.title || "",
                    slug: childTranslation?.slug || "",
                    parentId: child.parentId,
                    requiresSizes: child.requiresSizes || false
                };
            })
        };
    }
    /**
   * Update category
   */ async updateCategory(categoryId, data) {
        const locale = data.locale || "en";
        const category = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findUnique({
            where: {
                id: categoryId
            },
            include: {
                translations: true
            }
        });
        if (!category) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Category not found",
                detail: `Category with id '${categoryId}' does not exist`
            };
        }
        // Prevent circular reference (category cannot be its own parent)
        if (data.parentId === categoryId) {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/bad-request",
                title: "Invalid parent",
                detail: "Category cannot be its own parent"
            };
        }
        // Prevent setting parent to a child category (would create circular reference)
        if (data.parentId) {
            const potentialParent = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findUnique({
                where: {
                    id: data.parentId
                },
                include: {
                    children: {
                        where: {
                            deletedAt: null
                        }
                    }
                }
            });
            if (!potentialParent) {
                throw {
                    status: 404,
                    type: "https://api.shop.am/problems/not-found",
                    title: "Parent category not found",
                    detail: `Parent category with id '${data.parentId}' does not exist`
                };
            }
            // Check if the category to update is in the children of the potential parent
            const isChild = await this.isCategoryDescendant(potentialParent.id, categoryId);
            if (isChild) {
                throw {
                    status: 400,
                    type: "https://api.shop.am/problems/bad-request",
                    title: "Circular reference",
                    detail: "Cannot set parent to a category that is a descendant of this category"
                };
            }
        }
        // Update subcategories if provided
        if (data.subcategoryIds !== undefined) {
            // First, remove all existing children relationships
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.updateMany({
                where: {
                    parentId: categoryId
                },
                data: {
                    parentId: null
                }
            });
            // Then, set new children relationships (prevent circular references)
            if (data.subcategoryIds.length > 0) {
                // Filter out the category itself and its descendants
                const validSubcategoryIds = data.subcategoryIds.filter((id)=>id !== categoryId);
                // Check for circular references
                for (const subId of validSubcategoryIds){
                    const isDescendant = await this.isCategoryDescendant(categoryId, subId);
                    if (isDescendant) {
                        throw {
                            status: 400,
                            type: "https://api.shop.am/problems/bad-request",
                            title: "Circular reference",
                            detail: "Cannot set a descendant category as subcategory"
                        };
                    }
                }
                if (validSubcategoryIds.length > 0) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.updateMany({
                        where: {
                            id: {
                                in: validSubcategoryIds
                            }
                        },
                        data: {
                            parentId: categoryId
                        }
                    });
                }
            }
        }
        const updateData = {};
        if (data.parentId !== undefined) {
            updateData.parentId = data.parentId || null;
        }
        if (data.requiresSizes !== undefined) {
            updateData.requiresSizes = data.requiresSizes;
        }
        // Update translation if title is provided
        if (data.title) {
            const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
            const categoryTranslations = Array.isArray(category.translations) ? category.translations : [];
            const existingTranslation = categoryTranslations.find((t)=>t.locale === locale);
            if (existingTranslation) {
                // Update existing translation
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].categoryTranslation.update({
                    where: {
                        id: existingTranslation.id
                    },
                    data: {
                        title: data.title,
                        slug
                    }
                });
            } else {
                // Create new translation
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].categoryTranslation.create({
                    data: {
                        categoryId: category.id,
                        locale,
                        title: data.title,
                        slug,
                        fullPath: slug
                    }
                });
            }
        }
        // Update category base data
        const updatedCategory = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.update({
            where: {
                id: categoryId
            },
            data: updateData,
            include: {
                translations: true
            }
        });
        const categoryTranslations = Array.isArray(updatedCategory.translations) ? updatedCategory.translations : [];
        const translation = categoryTranslations.find((t)=>t.locale === locale) || categoryTranslations[0] || null;
        return {
            data: {
                id: updatedCategory.id,
                title: translation?.title || "",
                slug: translation?.slug || "",
                parentId: updatedCategory.parentId,
                requiresSizes: updatedCategory.requiresSizes || false
            }
        };
    }
    /**
   * Helper function to check if a category is a descendant of another category
   */ async isCategoryDescendant(ancestorId, descendantId, visited = new Set()) {
        if (visited.has(descendantId)) {
            // Circular reference detected
            return false;
        }
        visited.add(descendantId);
        const category = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findUnique({
            where: {
                id: descendantId
            },
            include: {
                parent: true
            }
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
   */ async deleteCategory(categoryId) {
        console.log('🗑️ [ADMIN SERVICE] deleteCategory called:', categoryId);
        const category = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findUnique({
            where: {
                id: categoryId
            },
            include: {
                children: {
                    where: {
                        deletedAt: null
                    }
                }
            }
        });
        if (!category) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Category not found",
                detail: `Category with id '${categoryId}' does not exist`
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
                childrenCount
            };
        }
        // Check if category has products (using count for better performance)
        const productsCount = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.count({
            where: {
                OR: [
                    {
                        primaryCategoryId: categoryId
                    },
                    {
                        categoryIds: {
                            has: categoryId
                        }
                    }
                ],
                deletedAt: null
            }
        });
        if (productsCount > 0) {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/bad-request",
                title: "Cannot delete category",
                detail: `This category has ${productsCount} associated product${productsCount > 1 ? 's' : ''}. Please remove products from this category first.`,
                productsCount
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.update({
            where: {
                id: categoryId
            },
            data: {
                deletedAt: new Date(),
                published: false
            }
        });
        console.log('✅ [ADMIN SERVICE] Category deleted:', categoryId);
        return {
            success: true
        };
    }
}
const adminCategoriesService = new AdminCategoriesService();
}),
"[project]/apps/web/lib/services/admin/admin-products-read.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminProductsReadService",
    ()=>adminProductsReadService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$db$2d$ensure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/db-ensure.ts [app-route] (ecmascript)");
;
;
class AdminProductsReadService {
    /**
   * Get products for admin
   */ async getProducts(filters) {
        console.log("📦 [ADMIN PRODUCTS READ SERVICE] getProducts called with filters:", filters);
        const startTime = Date.now();
        const page = filters.page || 1;
        const limit = filters.limit || 20;
        const skip = (page - 1) * limit;
        const where = {
            deletedAt: null
        };
        const orConditions = [];
        // Search filter
        if (filters.search) {
            orConditions.push({
                translations: {
                    some: {
                        title: {
                            contains: filters.search,
                            mode: "insensitive"
                        }
                    }
                }
            }, {
                variants: {
                    some: {
                        sku: {
                            contains: filters.search,
                            mode: "insensitive"
                        }
                    }
                }
            });
        }
        // Category filter - support both single category and multiple categories
        const categoryIds = filters.categories && filters.categories.length > 0 ? filters.categories : filters.category ? [
            filters.category
        ] : [];
        if (categoryIds.length > 0) {
            const categoryConditions = [];
            categoryIds.forEach((categoryId)=>{
                categoryConditions.push({
                    primaryCategoryId: categoryId
                }, {
                    categoryIds: {
                        has: categoryId
                    }
                });
            });
            orConditions.push(...categoryConditions);
        }
        if (orConditions.length > 0) {
            where.OR = orConditions;
        }
        // SKU filter
        if (filters.sku) {
            where.variants = {
                some: {
                    sku: {
                        contains: filters.sku,
                        mode: "insensitive"
                    }
                }
            };
        }
        // Sort
        let orderBy = {
            createdAt: "desc"
        };
        if (filters.sort) {
            const [field, direction] = filters.sort.split("-");
            orderBy = {
                [field]: direction || "desc"
            };
        }
        console.log("📦 [ADMIN PRODUCTS READ SERVICE] Executing database queries...");
        console.log("📦 [ADMIN PRODUCTS READ SERVICE] Where clause:", JSON.stringify(where, null, 2));
        const queryStartTime = Date.now();
        let products = [];
        let total = 0;
        try {
            // Test database connection first
            console.log("📦 [ADMIN PRODUCTS READ SERVICE] Testing database connection...");
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`SELECT 1`;
            console.log("✅ [ADMIN PRODUCTS READ SERVICE] Database connection OK");
            // First, try to get products with a simpler query
            console.log("📦 [ADMIN PRODUCTS READ SERVICE] Fetching products...");
            products = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: {
                    translations: {
                        where: {
                            locale: "en"
                        },
                        take: 1
                    },
                    variants: {
                        where: {
                            published: true
                        },
                        take: 1,
                        orderBy: {
                            price: "asc"
                        }
                    },
                    labels: true
                }
            });
            const productsTime = Date.now() - queryStartTime;
            console.log(`✅ [ADMIN PRODUCTS READ SERVICE] Products fetched in ${productsTime}ms. Found ${products.length} products`);
            // Then get count - use a simpler approach if count is slow
            console.log("📦 [ADMIN PRODUCTS READ SERVICE] Counting total products...");
            const countStartTime = Date.now();
            // Use a timeout for count query
            const countPromise = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.count({
                where
            });
            const timeoutPromise = new Promise((_, reject)=>setTimeout(()=>reject(new Error("Count query timeout")), 10000));
            total = await Promise.race([
                countPromise,
                timeoutPromise
            ]);
            const countTime = Date.now() - countStartTime;
            console.log(`✅ [ADMIN PRODUCTS READ SERVICE] Count completed in ${countTime}ms. Total: ${total}`);
            const queryTime = Date.now() - queryStartTime;
            console.log(`✅ [ADMIN PRODUCTS READ SERVICE] All database queries completed in ${queryTime}ms`);
        } catch (error) {
            // If product_variants.attributes column doesn't exist, try to create it and retry
            if (error?.message?.includes('product_variants.attributes') || error?.message?.includes('attributes') && error?.message?.includes('does not exist')) {
                console.warn('⚠️ [ADMIN PRODUCTS READ SERVICE] product_variants.attributes column not found, attempting to create it...');
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$db$2d$ensure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureProductVariantAttributesColumn"])();
                    // Retry the query after creating the column
                    products = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
                        where,
                        skip,
                        take: limit,
                        orderBy,
                        include: {
                            translations: {
                                where: {
                                    locale: "en"
                                },
                                take: 1
                            },
                            variants: {
                                where: {
                                    published: true
                                },
                                take: 1,
                                orderBy: {
                                    price: "asc"
                                }
                            },
                            labels: true
                        }
                    });
                    const productsTime = Date.now() - queryStartTime;
                    console.log(`✅ [ADMIN PRODUCTS READ SERVICE] Products fetched in ${productsTime}ms. Found ${products.length} products (after creating attributes column)`);
                    // Get count
                    const countStartTime = Date.now();
                    const countPromise = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.count({
                        where
                    });
                    const timeoutPromise = new Promise((_, reject)=>setTimeout(()=>reject(new Error("Count query timeout")), 10000));
                    total = await Promise.race([
                        countPromise,
                        timeoutPromise
                    ]);
                    const countTime = Date.now() - countStartTime;
                    console.log(`✅ [ADMIN PRODUCTS READ SERVICE] Count completed in ${countTime}ms. Total: ${total}`);
                    const queryTime = Date.now() - queryStartTime;
                    console.log(`✅ [ADMIN PRODUCTS READ SERVICE] All database queries completed in ${queryTime}ms`);
                } catch (retryError) {
                    const queryTime = Date.now() - queryStartTime;
                    console.error(`❌ [ADMIN PRODUCTS READ SERVICE] Database query error after ${queryTime}ms (after retry):`, retryError);
                    throw retryError;
                }
            } else {
                const queryTime = Date.now() - queryStartTime;
                console.error(`❌ [ADMIN PRODUCTS READ SERVICE] Database query error after ${queryTime}ms:`, error);
                console.error(`❌ [ADMIN PRODUCTS READ SERVICE] Error details:`, {
                    message: error.message,
                    code: error.code,
                    meta: error.meta,
                    stack: error.stack?.substring(0, 500)
                });
                // If count fails, try to get products without count
                if (error.message === "Count query timeout" || error.message?.includes("count")) {
                    console.warn("⚠️ [ADMIN PRODUCTS READ SERVICE] Count query failed, using estimated total");
                    total = products?.length || limit; // Use current page size as fallback
                } else {
                    // If products query also failed, rethrow
                    if (!products) {
                        throw error;
                    }
                    // If only count failed, use estimated total
                    console.warn("⚠️ [ADMIN PRODUCTS READ SERVICE] Count query failed, using estimated total");
                    total = products.length || limit;
                }
            }
        }
        const data = products.map((product)=>{
            // Безопасное получение translation с проверкой на существование массива
            const translation = Array.isArray(product.translations) && product.translations.length > 0 ? product.translations[0] : null;
            // Безопасное получение variant с проверкой на существование массива
            const variant = Array.isArray(product.variants) && product.variants.length > 0 ? product.variants[0] : null;
            const image = Array.isArray(product.media) && product.media.length > 0 ? typeof product.media[0] === "string" ? product.media[0] : product.media[0]?.url : null;
            return {
                id: product.id,
                slug: translation?.slug || "",
                title: translation?.title || "",
                published: product.published,
                featured: product.featured || false,
                price: variant?.price || 0,
                stock: variant?.stock || 0,
                discountPercent: product.discountPercent || 0,
                compareAtPrice: variant?.compareAtPrice || null,
                colorStocks: [],
                image,
                createdAt: product.createdAt.toISOString()
            };
        });
        const totalTime = Date.now() - startTime;
        console.log(`✅ [ADMIN PRODUCTS READ SERVICE] getProducts completed in ${totalTime}ms. Returning ${data.length} products`);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    /**
   * Get product by ID
   */ async getProductById(productId) {
        // Try to include productAttributes, but handle case where table might not exist
        let product;
        try {
            product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findUnique({
                where: {
                    id: productId
                },
                include: {
                    translations: true,
                    brand: {
                        include: {
                            translations: true
                        }
                    },
                    categories: {
                        include: {
                            translations: true
                        }
                    },
                    variants: {
                        include: {
                            options: {
                                include: {
                                    attributeValue: {
                                        include: {
                                            attribute: true,
                                            translations: true
                                        }
                                    }
                                }
                            }
                        },
                        orderBy: {
                            position: 'asc'
                        }
                    },
                    labels: true,
                    productAttributes: {
                        include: {
                            attribute: true
                        }
                    }
                }
            });
        } catch (error) {
            // If productAttributes table doesn't exist, retry without it
            if (error?.code === 'P2021' || error?.message?.includes('productAttributes') || error?.message?.includes('does not exist')) {
                console.warn('⚠️ [ADMIN PRODUCTS READ SERVICE] productAttributes table not found, fetching without it:', error.message);
                product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findUnique({
                    where: {
                        id: productId
                    },
                    include: {
                        translations: true,
                        brand: {
                            include: {
                                translations: true
                            }
                        },
                        categories: {
                            include: {
                                translations: true
                            }
                        },
                        variants: {
                            include: {
                                options: {
                                    include: {
                                        attributeValue: {
                                            include: {
                                                attribute: true,
                                                translations: true
                                            }
                                        }
                                    }
                                }
                            },
                            orderBy: {
                                position: 'asc'
                            }
                        },
                        labels: true
                    }
                });
            } else {
                throw error;
            }
        }
        if (!product) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Product not found",
                detail: `Product with id '${productId}' does not exist`
            };
        }
        // Безопасное получение translation с проверкой на существование массива
        const translations = Array.isArray(product.translations) ? product.translations : [];
        const translation = translations.find((t)=>t.locale === "en") || translations[0] || null;
        // Безопасное получение labels с проверкой на существование массива
        const labels = Array.isArray(product.labels) ? product.labels : [];
        // Безопасное получение variants с проверкой на существование массива
        const variants = Array.isArray(product.variants) ? product.variants : [];
        // Get all attribute IDs from productAttributes relation
        const productAttributes = Array.isArray(product.productAttributes) ? product.productAttributes : [];
        const attributeIds = productAttributes.map((pa)=>pa.attributeId || pa.attribute?.id).filter((id)=>!!id);
        // Also include attributeIds from product.attributeIds if available (backward compatibility)
        const legacyAttributeIds = Array.isArray(product.attributeIds) ? product.attributeIds : [];
        // Merge both sources and remove duplicates
        const allAttributeIds = Array.from(new Set([
            ...attributeIds,
            ...legacyAttributeIds
        ]));
        return {
            id: product.id,
            title: translation?.title || "",
            slug: translation?.slug || "",
            subtitle: translation?.subtitle || null,
            descriptionHtml: translation?.descriptionHtml || null,
            brandId: product.brandId || null,
            primaryCategoryId: product.primaryCategoryId || null,
            categoryIds: product.categoryIds || [],
            attributeIds: allAttributeIds,
            published: product.published,
            media: Array.isArray(product.media) ? product.media : [],
            labels: labels.map((label)=>({
                    id: label.id,
                    type: label.type,
                    value: label.value,
                    position: label.position,
                    color: label.color
                })),
            variants: variants.map((variant)=>{
                // Безопасное получение options с проверкой на существование массива
                const options = Array.isArray(variant.options) ? variant.options : [];
                // Get attributes from JSONB column if available
                let attributes = null;
                let colorValues = [];
                let sizeValues = [];
                if (variant.attributes) {
                    // attributes is already in JSONB format: { "color": [...], "size": [...] }
                    attributes = variant.attributes;
                    // Extract color and size values from JSONB attributes
                    if (attributes.color && Array.isArray(attributes.color)) {
                        colorValues = attributes.color.map((item)=>item.value || item).filter(Boolean);
                    }
                    if (attributes.size && Array.isArray(attributes.size)) {
                        sizeValues = attributes.size.map((item)=>item.value || item).filter(Boolean);
                    }
                } else if (options.length > 0) {
                    // Fallback: build attributes from options if JSONB column is empty
                    const attributesMap = {};
                    options.forEach((opt)=>{
                        const attrKey = opt.attributeKey || opt.attributeValue?.attribute?.key;
                        const value = opt.value || opt.attributeValue?.value;
                        const valueId = opt.valueId || opt.attributeValue?.id;
                        if (attrKey && value && valueId) {
                            if (!attributesMap[attrKey]) {
                                attributesMap[attrKey] = [];
                            }
                            if (!attributesMap[attrKey].some((item)=>item.valueId === valueId)) {
                                attributesMap[attrKey].push({
                                    valueId,
                                    value,
                                    attributeKey: attrKey
                                });
                            }
                            // Extract color and size for backward compatibility
                            if (attrKey === "color") {
                                colorValues.push(value);
                            } else if (attrKey === "size") {
                                sizeValues.push(value);
                            }
                        }
                    });
                    attributes = Object.keys(attributesMap).length > 0 ? attributesMap : null;
                }
                // For backward compatibility: use first color/size if multiple values exist
                const colorOption = options.find((opt)=>opt.attributeKey === "color");
                const sizeOption = options.find((opt)=>opt.attributeKey === "size");
                // Use first value from arrays or fallback to single option value
                const color = colorValues.length > 0 ? colorValues[0] : colorOption?.value || "";
                const size = sizeValues.length > 0 ? sizeValues[0] : sizeOption?.value || "";
                return {
                    id: variant.id,
                    price: variant.price.toString(),
                    compareAtPrice: variant.compareAtPrice?.toString() || "",
                    stock: variant.stock.toString(),
                    sku: variant.sku || "",
                    color: color,
                    size: size,
                    imageUrl: variant.imageUrl || "",
                    published: variant.published || false,
                    attributes: attributes,
                    options: options,
                    // Additional fields for new format support
                    colorValues: colorValues,
                    sizeValues: sizeValues
                };
            })
        };
    }
}
const adminProductsReadService = new AdminProductsReadService();
}),
"[project]/apps/web/lib/utils/variant-generator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findOrCreateAttributeValue",
    ()=>findOrCreateAttributeValue,
    "generateAttributeCombinations",
    ()=>generateAttributeCombinations,
    "generateVariantsFromAttributes",
    ()=>generateVariantsFromAttributes,
    "getProductAttributeValues",
    ()=>getProductAttributeValues
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/logger.ts [app-route] (ecmascript)");
;
;
function generateAttributeCombinations(attributeValueGroups) {
    if (attributeValueGroups.length === 0) {
        return [
            []
        ];
    }
    if (attributeValueGroups.length === 1) {
        return attributeValueGroups[0].map((value)=>[
                value
            ]);
    }
    const [firstGroup, ...restGroups] = attributeValueGroups;
    const restCombinations = generateAttributeCombinations(restGroups);
    const result = [];
    for (const value of firstGroup){
        for (const combination of restCombinations){
            result.push([
                value,
                ...combination
            ]);
        }
    }
    return result;
}
async function getProductAttributeValues(productId) {
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug('Getting attribute values for product', {
        productId
    });
    const product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findUnique({
        where: {
            id: productId
        },
        include: {
            productAttributes: {
                include: {
                    attribute: {
                        include: {
                            values: {
                                orderBy: {
                                    position: 'asc'
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    if (!product) {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn('Product not found', {
            productId
        });
        return new Map();
    }
    const attributeValueMap = new Map();
    for (const productAttribute of product.productAttributes){
        const attributeKey = productAttribute.attribute.key;
        const valueIds = productAttribute.attribute.values.map((v)=>v.id);
        attributeValueMap.set(attributeKey, valueIds);
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(`Attribute "${attributeKey}" has ${valueIds.length} values`, {
            attributeKey,
            valueCount: valueIds.length
        });
    }
    return attributeValueMap;
}
async function findOrCreateAttributeValue(attributeKey, valueString, locale = "en") {
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug('Finding/Creating AttributeValue', {
        attributeKey,
        valueString
    });
    // Find attribute by key
    const attribute = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attribute.findUnique({
        where: {
            key: attributeKey
        },
        include: {
            values: {
                where: {
                    value: valueString
                }
            }
        }
    });
    if (!attribute) {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn('Attribute not found', {
            attributeKey
        });
        return null;
    }
    // If value exists, return its ID
    if (attribute.values.length > 0) {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug('Found existing AttributeValue', {
            attributeValueId: attribute.values[0].id
        });
        return attribute.values[0].id;
    }
    // Create new AttributeValue
    const newValue = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attributeValue.create({
        data: {
            attributeId: attribute.id,
            value: valueString,
            translations: {
                create: {
                    locale,
                    label: valueString
                }
            }
        }
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info('Created new AttributeValue', {
        attributeValueId: newValue.id
    });
    return newValue.id;
}
async function generateVariantsFromAttributes(productId, variantData) {
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug('Generating variants for product', {
        productId
    });
    const attributeValueMap = await getProductAttributeValues(productId);
    if (attributeValueMap.size === 0) {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn('No attributes found, creating single variant', {
            productId
        });
        return [
            {
                ...variantData,
                stock: variantData.stock || 0,
                published: variantData.published !== false,
                options: []
            }
        ];
    }
    // Convert map to array of arrays
    const attributeValueGroups = Array.from(attributeValueMap.values());
    // Generate all combinations
    const combinations = generateAttributeCombinations(attributeValueGroups);
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info('Generated variant combinations', {
        productId,
        combinationCount: combinations.length
    });
    // Create variant data for each combination
    const variants = combinations.map((combination, index)=>{
        const options = combination.map((valueId)=>({
                valueId
            }));
        // Generate SKU if not provided
        let sku = variantData.sku;
        if (!sku && combinations.length > 1) {
            const baseSku = `VAR-${productId.slice(-6)}-${index + 1}`;
            sku = baseSku;
        }
        return {
            price: variantData.price,
            compareAtPrice: variantData.compareAtPrice,
            stock: variantData.stock || 0,
            sku,
            imageUrl: variantData.imageUrl,
            published: variantData.published !== false,
            options
        };
    });
    return variants;
}
}),
"[project]/apps/web/lib/services/admin/admin-products-create.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminProductsCreateService",
    ()=>adminProductsCreateService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$variant$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/variant-generator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$db$2d$ensure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/db-ensure.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/image-utils.ts [app-route] (ecmascript)");
;
;
;
;
;
class AdminProductsCreateService {
    /**
   * Generate unique SKU for product variant
   * Checks database to ensure uniqueness
   */ async generateUniqueSku(tx, baseSku, productSlug, variantIndex, usedSkus) {
        // If base SKU is provided and unique, use it
        if (baseSku && baseSku.trim() !== '') {
            const trimmedSku = baseSku.trim();
            // Check if already used in this transaction
            if (!usedSkus.has(trimmedSku)) {
                // Check if exists in database
                const existing = await tx.productVariant.findUnique({
                    where: {
                        sku: trimmedSku
                    }
                });
                if (!existing) {
                    usedSkus.add(trimmedSku);
                    console.log(`✅ [ADMIN PRODUCTS CREATE SERVICE] Using provided SKU: ${trimmedSku}`);
                    return trimmedSku;
                } else {
                    console.log(`⚠️ [ADMIN PRODUCTS CREATE SERVICE] SKU already exists in DB: ${trimmedSku}, generating new one`);
                }
            } else {
                console.log(`⚠️ [ADMIN PRODUCTS CREATE SERVICE] SKU already used in transaction: ${trimmedSku}, generating new one`);
            }
        }
        // Generate new unique SKU
        const baseSlug = productSlug || 'PROD';
        let attempt = 0;
        let newSku;
        do {
            const timestamp = Date.now();
            const random = Math.random().toString(36).substring(2, 6).toUpperCase();
            const suffix = attempt > 0 ? `-${attempt}` : '';
            newSku = `${baseSlug.toUpperCase()}-${timestamp}-${variantIndex + 1}${suffix}-${random}`;
            attempt++;
            // Check if already used in this transaction
            if (usedSkus.has(newSku)) {
                continue;
            }
            // Check if exists in database
            const existing = await tx.productVariant.findUnique({
                where: {
                    sku: newSku
                }
            });
            if (!existing) {
                usedSkus.add(newSku);
                console.log(`✅ [ADMIN PRODUCTS CREATE SERVICE] Generated unique SKU: ${newSku}`);
                return newSku;
            }
            console.log(`⚠️ [ADMIN PRODUCTS CREATE SERVICE] Generated SKU exists in DB: ${newSku}, trying again...`);
        }while (attempt < 100) // Safety limit
        // Fallback: use timestamp + random if all attempts failed
        const finalSku = `${baseSlug.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        usedSkus.add(finalSku);
        console.log(`✅ [ADMIN PRODUCTS CREATE SERVICE] Using fallback SKU: ${finalSku}`);
        return finalSku;
    }
    /**
   * Create product
   */ async createProduct(data) {
        try {
            console.log('🆕 [ADMIN PRODUCTS CREATE SERVICE] Creating product:', data.title);
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$transaction(async (tx)=>{
                // Track used SKUs within this transaction to ensure uniqueness
                const usedSkus = new Set();
                // Generate variants with options
                // Support both old format (color/size strings) and new format (AttributeValue IDs)
                // Also support generic options array for any attribute type
                const variantsData = await Promise.all(data.variants.map(async (variant, variantIndex)=>{
                    const options = [];
                    const attributesMap = {};
                    // If variant has explicit options array, use it (new format)
                    if (variant.options && Array.isArray(variant.options) && variant.options.length > 0) {
                        for (const opt of variant.options){
                            let valueId = null;
                            let attributeKey = null;
                            let value = null;
                            if (opt.valueId) {
                                // New format: use valueId
                                valueId = opt.valueId;
                                // Fetch AttributeValue to get value and attributeKey
                                const attrValue = await tx.attributeValue.findUnique({
                                    where: {
                                        id: opt.valueId
                                    },
                                    include: {
                                        attribute: true
                                    }
                                });
                                if (attrValue) {
                                    attributeKey = attrValue.attribute.key;
                                    value = attrValue.value;
                                }
                                options.push({
                                    valueId: opt.valueId
                                });
                            } else if (opt.attributeKey && opt.value) {
                                // Try to find or create AttributeValue
                                const foundValueId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$variant$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findOrCreateAttributeValue"])(opt.attributeKey, opt.value, data.locale);
                                if (foundValueId) {
                                    valueId = foundValueId;
                                    attributeKey = opt.attributeKey;
                                    value = opt.value;
                                    options.push({
                                        valueId: foundValueId
                                    });
                                } else {
                                    // Fallback to old format if AttributeValue not found
                                    attributeKey = opt.attributeKey;
                                    value = opt.value;
                                    options.push({
                                        attributeKey: opt.attributeKey,
                                        value: opt.value
                                    });
                                }
                            }
                            // Build attributes JSONB structure
                            if (attributeKey && valueId && value) {
                                if (!attributesMap[attributeKey]) {
                                    attributesMap[attributeKey] = [];
                                }
                                // Check if this valueId is already added for this attribute
                                if (!attributesMap[attributeKey].some((item)=>item.valueId === valueId)) {
                                    attributesMap[attributeKey].push({
                                        valueId,
                                        value,
                                        attributeKey
                                    });
                                }
                            }
                        }
                    } else {
                        // Old format: Try to find or create AttributeValues for color and size
                        if (variant.color) {
                            const colorValueId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$variant$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findOrCreateAttributeValue"])("color", variant.color, data.locale);
                            if (colorValueId) {
                                options.push({
                                    valueId: colorValueId
                                });
                                if (!attributesMap["color"]) {
                                    attributesMap["color"] = [];
                                }
                                attributesMap["color"].push({
                                    valueId: colorValueId,
                                    value: variant.color,
                                    attributeKey: "color"
                                });
                            } else {
                                // Fallback to old format if AttributeValue not found
                                options.push({
                                    attributeKey: "color",
                                    value: variant.color
                                });
                            }
                        }
                        if (variant.size) {
                            const sizeValueId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$variant$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findOrCreateAttributeValue"])("size", variant.size, data.locale);
                            if (sizeValueId) {
                                options.push({
                                    valueId: sizeValueId
                                });
                                if (!attributesMap["size"]) {
                                    attributesMap["size"] = [];
                                }
                                attributesMap["size"].push({
                                    valueId: sizeValueId,
                                    value: variant.size,
                                    attributeKey: "size"
                                });
                            } else {
                                // Fallback to old format if AttributeValue not found
                                options.push({
                                    attributeKey: "size",
                                    value: variant.size
                                });
                            }
                        }
                    }
                    const price = typeof variant.price === 'number' ? variant.price : parseFloat(String(variant.price));
                    const stock = typeof variant.stock === 'number' ? variant.stock : parseInt(String(variant.stock), 10);
                    const compareAtPrice = variant.compareAtPrice !== undefined && variant.compareAtPrice !== null && variant.compareAtPrice !== '' ? typeof variant.compareAtPrice === 'number' ? variant.compareAtPrice : parseFloat(String(variant.compareAtPrice)) : undefined;
                    // Generate unique SKU for this variant
                    const uniqueSku = await this.generateUniqueSku(tx, variant.sku, data.slug, variantIndex, usedSkus);
                    // Convert attributesMap to JSONB format
                    const attributesJson = Object.keys(attributesMap).length > 0 ? attributesMap : null;
                    console.log(`📦 [ADMIN PRODUCTS CREATE SERVICE] Variant ${variantIndex + 1} attributes:`, JSON.stringify(attributesJson, null, 2));
                    // Process and validate variant imageUrl
                    let processedVariantImageUrl = undefined;
                    if (variant.imageUrl) {
                        const urls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["smartSplitUrls"])(variant.imageUrl);
                        const processedUrls = urls.map((url)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processImageUrl"])(url)).filter((url)=>url !== null);
                        if (processedUrls.length > 0) {
                            processedVariantImageUrl = processedUrls.join(',');
                        }
                    }
                    return {
                        sku: uniqueSku,
                        price,
                        compareAtPrice,
                        stock: isNaN(stock) ? 0 : stock,
                        imageUrl: processedVariantImageUrl,
                        published: variant.published !== false,
                        attributes: attributesJson,
                        options: {
                            create: options
                        }
                    };
                }));
                // Final validation: log all SKUs to ensure uniqueness
                const allSkus = variantsData.map((v)=>v.sku).filter(Boolean);
                const uniqueSkus = new Set(allSkus);
                console.log(`📋 [ADMIN PRODUCTS CREATE SERVICE] Generated ${variantsData.length} variants with SKUs:`, allSkus);
                if (allSkus.length !== uniqueSkus.size) {
                    console.error('❌ [ADMIN PRODUCTS CREATE SERVICE] Duplicate SKUs detected!', {
                        total: allSkus.length,
                        unique: uniqueSkus.size,
                        duplicates: allSkus.filter((sku, index)=>allSkus.indexOf(sku) !== index)
                    });
                    throw new Error('Duplicate SKUs detected in variants. This should not happen.');
                }
                console.log('✅ [ADMIN PRODUCTS CREATE SERVICE] All variant SKUs are unique');
                // Collect all variant images to exclude from main media
                const allVariantImages = [];
                variantsData.forEach((variant)=>{
                    if (variant.imageUrl) {
                        const urls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["smartSplitUrls"])(variant.imageUrl);
                        allVariantImages.push(...urls);
                    }
                });
                // Prepare media array - use mainProductImage if provided and media is empty
                let rawMedia = data.media || [];
                if (data.mainProductImage && rawMedia.length === 0) {
                    // If mainProductImage is provided but media is empty, use mainProductImage as first media item
                    rawMedia = [
                        data.mainProductImage
                    ];
                    console.log('📸 [ADMIN PRODUCTS CREATE SERVICE] Using mainProductImage as media:', data.mainProductImage.substring(0, 50) + '...');
                } else if (data.mainProductImage && rawMedia.length > 0) {
                    // If both are provided, ensure mainProductImage is first in media array
                    const mainImageIndex = rawMedia.findIndex((m)=>{
                        const url = typeof m === 'string' ? m : m.url;
                        return url === data.mainProductImage;
                    });
                    if (mainImageIndex === -1) {
                        // mainProductImage not in media array, add it as first
                        rawMedia = [
                            data.mainProductImage,
                            ...rawMedia
                        ];
                        console.log('📸 [ADMIN PRODUCTS CREATE SERVICE] Added mainProductImage as first media item');
                    } else if (mainImageIndex > 0) {
                        // mainProductImage is in media but not first, move it to first
                        const mainImage = rawMedia[mainImageIndex];
                        rawMedia.splice(mainImageIndex, 1);
                        rawMedia.unshift(mainImage);
                        console.log('📸 [ADMIN PRODUCTS CREATE SERVICE] Moved mainProductImage to first position in media');
                    }
                }
                // Separate main images from variant images and clean them
                const { main } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["separateMainAndVariantImages"])(rawMedia, allVariantImages);
                const finalMedia = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cleanImageUrls"])(main);
                console.log('📸 [ADMIN PRODUCTS CREATE SERVICE] Final main media count:', finalMedia.length);
                console.log('📸 [ADMIN PRODUCTS CREATE SERVICE] Variant images excluded:', allVariantImages.length);
                const product = await tx.product.create({
                    data: {
                        brandId: data.brandId || undefined,
                        primaryCategoryId: data.primaryCategoryId || undefined,
                        categoryIds: data.categoryIds || [],
                        media: finalMedia,
                        published: data.published,
                        featured: data.featured ?? false,
                        publishedAt: data.published ? new Date() : undefined,
                        translations: {
                            create: {
                                locale: data.locale || "en",
                                title: data.title,
                                slug: data.slug,
                                subtitle: data.subtitle || undefined,
                                descriptionHtml: data.descriptionHtml || undefined
                            }
                        },
                        variants: {
                            create: variantsData
                        },
                        labels: data.labels && data.labels.length > 0 ? {
                            create: data.labels.map((label)=>({
                                    type: label.type,
                                    value: label.value,
                                    position: label.position,
                                    color: label.color || undefined
                                }))
                        } : undefined
                    }
                });
                // Create ProductAttribute relations if attributeIds provided
                if (data.attributeIds && data.attributeIds.length > 0) {
                    try {
                        // Ensure table exists (for Vercel deployments where migrations might not run)
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$db$2d$ensure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureProductAttributesTable"])();
                        console.log('🔗 [ADMIN PRODUCTS CREATE SERVICE] Creating ProductAttribute relations for product:', product.id, 'attributes:', data.attributeIds);
                        await tx.productAttribute.createMany({
                            data: data.attributeIds.map((attributeId)=>({
                                    productId: product.id,
                                    attributeId
                                })),
                            skipDuplicates: true
                        });
                        console.log('✅ [ADMIN PRODUCTS CREATE SERVICE] Created ProductAttribute relations:', data.attributeIds);
                    } catch (error) {
                        console.error('❌ [ADMIN PRODUCTS CREATE SERVICE] Failed to create ProductAttribute relations:', error);
                        console.error('   Product ID:', product.id);
                        console.error('   Attribute IDs:', data.attributeIds);
                        console.error('   Error code:', error.code);
                        console.error('   Error message:', error.message);
                        // Re-throw to fail the transaction
                        throw error;
                    }
                }
                return await tx.product.findUnique({
                    where: {
                        id: product.id
                    },
                    include: {
                        translations: true,
                        variants: {
                            include: {
                                options: true
                            }
                        },
                        labels: true
                    }
                });
            });
            // Revalidate cache
            try {
                console.log('🧹 [ADMIN PRODUCTS CREATE SERVICE] Revalidating paths for new product');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])('/products');
                // @ts-expect-error - revalidateTag type issue in Next.js
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidateTag"])('products');
            } catch (e) {
                console.warn('⚠️ [ADMIN PRODUCTS CREATE SERVICE] Revalidation failed:', e);
            }
            return result;
        } catch (error) {
            console.error("❌ [ADMIN PRODUCTS CREATE SERVICE] createProduct error:", error);
            throw error;
        }
    }
}
const adminProductsCreateService = new AdminProductsCreateService();
}),
"[project]/apps/web/lib/services/admin/admin-products-update.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminProductsUpdateService",
    ()=>adminProductsUpdateService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$variant$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/variant-generator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$db$2d$ensure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/db-ensure.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/image-utils.ts [app-route] (ecmascript)");
;
;
;
;
;
class AdminProductsUpdateService {
    /**
   * Update product
   */ async updateProduct(productId, data) {
        try {
            console.log('🔄 [ADMIN PRODUCTS UPDATE SERVICE] Updating product:', productId);
            // Check if product exists
            const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findUnique({
                where: {
                    id: productId
                },
                include: {
                    translations: true
                }
            });
            if (!existing) {
                throw {
                    status: 404,
                    type: "https://api.shop.am/problems/not-found",
                    title: "Product not found",
                    detail: `Product with id '${productId}' does not exist`
                };
            }
            // Execute everything in a transaction for atomicity and speed
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$transaction(async (tx)=>{
                // Collect all variant images to exclude from main media (if media is being updated)
                let allVariantImages = [];
                if (data.variants !== undefined) {
                    data.variants.forEach((variant)=>{
                        if (variant.imageUrl) {
                            const urls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["smartSplitUrls"])(variant.imageUrl);
                            allVariantImages.push(...urls);
                        }
                    });
                } else {
                    // If variants not being updated, get existing variant images
                    const existingVariants = await tx.productVariant.findMany({
                        where: {
                            productId
                        },
                        select: {
                            imageUrl: true
                        }
                    });
                    existingVariants.forEach((variant)=>{
                        if (variant.imageUrl) {
                            const urls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["smartSplitUrls"])(variant.imageUrl);
                            allVariantImages.push(...urls);
                        }
                    });
                }
                // 1. Update product base data
                const updateData = {};
                if (data.brandId !== undefined) updateData.brandId = data.brandId || null;
                if (data.primaryCategoryId !== undefined) updateData.primaryCategoryId = data.primaryCategoryId || null;
                if (data.categoryIds !== undefined) updateData.categoryIds = data.categoryIds || [];
                if (data.media !== undefined) {
                    // Separate main images from variant images and clean them
                    const { main } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["separateMainAndVariantImages"])(data.media, allVariantImages);
                    updateData.media = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cleanImageUrls"])(main);
                    console.log('📸 [ADMIN PRODUCTS UPDATE SERVICE] Updated main media count:', updateData.media.length);
                    console.log('📸 [ADMIN PRODUCTS UPDATE SERVICE] Variant images excluded:', allVariantImages.length);
                }
                if (data.published !== undefined) {
                    updateData.published = data.published;
                    if (data.published && !existing.publishedAt) {
                        updateData.publishedAt = new Date();
                    }
                }
                if (data.featured !== undefined) updateData.featured = data.featured;
                // 2. Update translation
                if (data.title || data.slug || data.subtitle !== undefined || data.descriptionHtml !== undefined) {
                    const locale = data.locale || "en";
                    await tx.productTranslation.upsert({
                        where: {
                            productId_locale: {
                                productId,
                                locale
                            }
                        },
                        update: {
                            ...data.title && {
                                title: data.title
                            },
                            ...data.slug && {
                                slug: data.slug
                            },
                            ...data.subtitle !== undefined && {
                                subtitle: data.subtitle || null
                            },
                            ...data.descriptionHtml !== undefined && {
                                descriptionHtml: data.descriptionHtml || null
                            }
                        },
                        create: {
                            productId,
                            locale,
                            title: data.title || "",
                            slug: data.slug || "",
                            subtitle: data.subtitle || null,
                            descriptionHtml: data.descriptionHtml || null
                        }
                    });
                }
                // 3. Update labels
                if (data.labels !== undefined) {
                    await tx.productLabel.deleteMany({
                        where: {
                            productId
                        }
                    });
                    if (data.labels.length > 0) {
                        await tx.productLabel.createMany({
                            data: data.labels.map((label)=>({
                                    productId,
                                    type: label.type,
                                    value: label.value,
                                    position: label.position,
                                    color: label.color || undefined
                                }))
                        });
                    }
                }
                // 3.5. Update ProductAttribute relations
                if (data.attributeIds !== undefined) {
                    // Ensure table exists (for Vercel deployments where migrations might not run)
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$db$2d$ensure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureProductAttributesTable"])();
                    await tx.productAttribute.deleteMany({
                        where: {
                            productId
                        }
                    });
                    if (data.attributeIds.length > 0) {
                        await tx.productAttribute.createMany({
                            data: data.attributeIds.map((attributeId)=>({
                                    productId,
                                    attributeId
                                })),
                            skipDuplicates: true
                        });
                        console.log('✅ [ADMIN PRODUCTS UPDATE SERVICE] Updated ProductAttribute relations:', data.attributeIds);
                    }
                }
                // 4. Update variants
                if (data.variants !== undefined) {
                    // Get existing variants with their IDs and SKUs for matching
                    const existingVariants = await tx.productVariant.findMany({
                        where: {
                            productId
                        },
                        select: {
                            id: true,
                            sku: true
                        }
                    });
                    const existingVariantIds = new Set(existingVariants.map((v)=>v.id));
                    // Create a map of SKU -> variant ID for quick lookup
                    const existingSkuMap = new Map();
                    existingVariants.forEach((v)=>{
                        if (v.sku) {
                            existingSkuMap.set(v.sku.trim().toLowerCase(), v.id);
                        }
                    });
                    const incomingVariantIds = new Set();
                    const locale = data.locale || "en";
                    // Process each variant: update if exists, create if new
                    if (data.variants.length > 0) {
                        for (const variant of data.variants){
                            const options = [];
                            const attributesMap = {};
                            // Support both old format (color/size) and new format (options array)
                            if (variant.options && Array.isArray(variant.options) && variant.options.length > 0) {
                                // New format: use options array
                                for (const opt of variant.options){
                                    let valueId = null;
                                    let attributeKey = null;
                                    let value = null;
                                    if (opt.valueId) {
                                        valueId = opt.valueId;
                                        const attrValue = await tx.attributeValue.findUnique({
                                            where: {
                                                id: opt.valueId
                                            },
                                            include: {
                                                attribute: true
                                            }
                                        });
                                        if (attrValue) {
                                            attributeKey = attrValue.attribute.key;
                                            value = attrValue.value;
                                        }
                                        options.push({
                                            valueId: opt.valueId
                                        });
                                    } else if (opt.attributeKey && opt.value) {
                                        const foundValueId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$variant$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findOrCreateAttributeValue"])(opt.attributeKey, opt.value, locale);
                                        if (foundValueId) {
                                            valueId = foundValueId;
                                            attributeKey = opt.attributeKey;
                                            value = opt.value;
                                            options.push({
                                                valueId: foundValueId
                                            });
                                        } else {
                                            attributeKey = opt.attributeKey;
                                            value = opt.value;
                                            options.push({
                                                attributeKey: opt.attributeKey,
                                                value: opt.value
                                            });
                                        }
                                    }
                                    // Build attributes JSONB structure
                                    if (attributeKey && valueId && value) {
                                        if (!attributesMap[attributeKey]) {
                                            attributesMap[attributeKey] = [];
                                        }
                                        if (!attributesMap[attributeKey].some((item)=>item.valueId === valueId)) {
                                            attributesMap[attributeKey].push({
                                                valueId,
                                                value,
                                                attributeKey
                                            });
                                        }
                                    }
                                }
                            } else {
                                // Old format: Try to find or create AttributeValues for color and size
                                if (variant.color) {
                                    const colorValueId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$variant$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findOrCreateAttributeValue"])("color", variant.color, locale);
                                    if (colorValueId) {
                                        options.push({
                                            valueId: colorValueId
                                        });
                                        if (!attributesMap["color"]) {
                                            attributesMap["color"] = [];
                                        }
                                        attributesMap["color"].push({
                                            valueId: colorValueId,
                                            value: variant.color,
                                            attributeKey: "color"
                                        });
                                    } else {
                                        // Fallback to old format if AttributeValue not found
                                        options.push({
                                            attributeKey: "color",
                                            value: variant.color
                                        });
                                    }
                                }
                                if (variant.size) {
                                    const sizeValueId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$variant$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findOrCreateAttributeValue"])("size", variant.size, locale);
                                    if (sizeValueId) {
                                        options.push({
                                            valueId: sizeValueId
                                        });
                                        if (!attributesMap["size"]) {
                                            attributesMap["size"] = [];
                                        }
                                        attributesMap["size"].push({
                                            valueId: sizeValueId,
                                            value: variant.size,
                                            attributeKey: "size"
                                        });
                                    } else {
                                        // Fallback to old format if AttributeValue not found
                                        options.push({
                                            attributeKey: "size",
                                            value: variant.size
                                        });
                                    }
                                }
                            }
                            const price = typeof variant.price === 'number' ? variant.price : parseFloat(String(variant.price));
                            const stock = typeof variant.stock === 'number' ? variant.stock : parseInt(String(variant.stock), 10);
                            const compareAtPrice = variant.compareAtPrice !== undefined && variant.compareAtPrice !== null && variant.compareAtPrice !== '' ? typeof variant.compareAtPrice === 'number' ? variant.compareAtPrice : parseFloat(String(variant.compareAtPrice)) : undefined;
                            if (isNaN(price) || price < 0) {
                                throw new Error(`Invalid price value: ${variant.price}`);
                            }
                            // Convert attributesMap to JSONB format
                            const attributesJson = Object.keys(attributesMap).length > 0 ? attributesMap : null;
                            // Check if variant should be updated or created
                            // First check by ID if provided
                            let variantToUpdate = null;
                            let variantIdToUse = null;
                            if (variant.id && existingVariantIds.has(variant.id)) {
                                variantToUpdate = await tx.productVariant.findUnique({
                                    where: {
                                        id: variant.id
                                    }
                                });
                                variantIdToUse = variant.id;
                                console.log(`🔍 [ADMIN PRODUCTS UPDATE SERVICE] Variant lookup by ID ${variant.id}:`, variantToUpdate ? 'found' : 'not found');
                            }
                            // If not found by ID, try to find by SKU using the SKU map (faster than DB query)
                            if (!variantToUpdate && variant.sku) {
                                const skuValue = variant.sku.trim();
                                const skuKey = skuValue.toLowerCase();
                                const matchedVariantId = existingSkuMap.get(skuKey);
                                if (matchedVariantId) {
                                    variantToUpdate = await tx.productVariant.findUnique({
                                        where: {
                                            id: matchedVariantId
                                        }
                                    });
                                    variantIdToUse = matchedVariantId;
                                    console.log(`🔍 [ADMIN PRODUCTS UPDATE SERVICE] Variant lookup by SKU "${skuValue}": found variant ID ${matchedVariantId}`);
                                } else {
                                    // Check if SKU exists globally (might be from another product)
                                    const existingSkuVariant = await tx.productVariant.findFirst({
                                        where: {
                                            sku: skuValue
                                        }
                                    });
                                    if (existingSkuVariant) {
                                        console.warn(`⚠️ [ADMIN PRODUCTS UPDATE SERVICE] SKU "${skuValue}" already exists in product ${existingSkuVariant.productId}, but not in current product ${productId}`);
                                        // Don't use this variant, as it belongs to another product
                                        throw new Error(`SKU "${skuValue}" already exists in another product. Please use a unique SKU.`);
                                    }
                                    console.log(`🔍 [ADMIN PRODUCTS UPDATE SERVICE] Variant lookup by SKU "${skuValue}": not found in current product`);
                                }
                            }
                            if (variantToUpdate && variantIdToUse) {
                                // Update existing variant
                                incomingVariantIds.add(variantIdToUse);
                                // Delete old options and create new ones
                                await tx.productVariantOption.deleteMany({
                                    where: {
                                        variantId: variantToUpdate.id
                                    }
                                });
                                // Process and validate variant imageUrl
                                let processedVariantImageUrl = undefined;
                                if (variant.imageUrl) {
                                    const urls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["smartSplitUrls"])(variant.imageUrl);
                                    const processedUrls = urls.map((url)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processImageUrl"])(url)).filter((url)=>url !== null);
                                    if (processedUrls.length > 0) {
                                        processedVariantImageUrl = processedUrls.join(',');
                                    }
                                }
                                await tx.productVariant.update({
                                    where: {
                                        id: variantIdToUse
                                    },
                                    data: {
                                        sku: variant.sku ? variant.sku.trim() : undefined,
                                        price,
                                        compareAtPrice,
                                        stock: isNaN(stock) ? 0 : stock,
                                        imageUrl: processedVariantImageUrl,
                                        published: variant.published !== false,
                                        attributes: attributesJson,
                                        options: {
                                            create: options
                                        }
                                    }
                                });
                                console.log(`✅ [ADMIN PRODUCTS UPDATE SERVICE] Updated variant: ${variantIdToUse} (found by ${variant.id ? 'ID' : 'SKU'})`);
                            } else {
                                // Create new variant
                                // Double-check that SKU doesn't already exist (safety check)
                                if (variant.sku) {
                                    const skuValue = variant.sku.trim();
                                    const existingSkuCheck = await tx.productVariant.findFirst({
                                        where: {
                                            sku: skuValue
                                        }
                                    });
                                    if (existingSkuCheck) {
                                        console.error(`❌ [ADMIN PRODUCTS UPDATE SERVICE] SKU "${skuValue}" already exists! Variant ID: ${existingSkuCheck.id}, Product ID: ${existingSkuCheck.productId}`);
                                        throw new Error(`SKU "${skuValue}" already exists. Cannot create duplicate variant.`);
                                    }
                                }
                                // Process and validate variant imageUrl
                                let processedVariantImageUrl = undefined;
                                if (variant.imageUrl) {
                                    const urls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["smartSplitUrls"])(variant.imageUrl);
                                    const processedUrls = urls.map((url)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processImageUrl"])(url)).filter((url)=>url !== null);
                                    if (processedUrls.length > 0) {
                                        processedVariantImageUrl = processedUrls.join(',');
                                    }
                                }
                                console.log(`🆕 [ADMIN PRODUCTS UPDATE SERVICE] Creating new variant with SKU: ${variant.sku || 'none'}`);
                                const newVariant = await tx.productVariant.create({
                                    data: {
                                        productId,
                                        sku: variant.sku ? variant.sku.trim() : undefined,
                                        price,
                                        compareAtPrice,
                                        stock: isNaN(stock) ? 0 : stock,
                                        imageUrl: processedVariantImageUrl,
                                        published: variant.published !== false,
                                        attributes: attributesJson,
                                        options: {
                                            create: options
                                        }
                                    }
                                });
                                if (newVariant.id) {
                                    incomingVariantIds.add(newVariant.id);
                                }
                                console.log(`✅ [ADMIN PRODUCTS UPDATE SERVICE] Created new variant: ${newVariant.id}`);
                            }
                        }
                    }
                    // Delete variants that are no longer in the list
                    const variantsToDelete = Array.from(existingVariantIds).filter((id)=>!incomingVariantIds.has(id));
                    if (variantsToDelete.length > 0) {
                        await tx.productVariant.deleteMany({
                            where: {
                                id: {
                                    in: variantsToDelete
                                },
                                productId
                            }
                        });
                        console.log(`🗑️ [ADMIN PRODUCTS UPDATE SERVICE] Deleted ${variantsToDelete.length} variant(s):`, variantsToDelete);
                    }
                }
                // Update attribute value imageUrls from variant images
                // If a variant has an imageUrl, update the corresponding attribute value's imageUrl
                try {
                    console.log('🖼️ [ADMIN PRODUCTS UPDATE SERVICE] Updating attribute value imageUrls from variant images...');
                    const allVariants = await tx.productVariant.findMany({
                        where: {
                            productId
                        },
                        include: {
                            options: {
                                include: {
                                    attributeValue: true
                                }
                            }
                        }
                    });
                    for (const variant of allVariants){
                        if (!variant.imageUrl) continue;
                        // Use smartSplitUrls to properly handle comma-separated URLs and base64 images
                        const variantImageUrls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["smartSplitUrls"])(variant.imageUrl);
                        if (variantImageUrls.length === 0) continue;
                        // Process and validate first image URL
                        const firstVariantImageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processImageUrl"])(variantImageUrls[0]);
                        if (!firstVariantImageUrl) {
                            console.log(`⚠️ [ADMIN PRODUCTS UPDATE SERVICE] Variant ${variant.id} has invalid imageUrl, skipping attribute value update`);
                            continue;
                        }
                        // Get all attribute value IDs from this variant's options
                        const attributeValueIds = new Set();
                        variant.options.forEach((opt)=>{
                            if (opt.valueId && opt.attributeValue) {
                                attributeValueIds.add(opt.valueId);
                            }
                        });
                        // Update each attribute value's imageUrl if it doesn't already have one
                        // or if the variant image is more specific (e.g., base64 or full URL)
                        // BUT skip updating if:
                        // - Attribute is "color" and attribute value doesn't have an imageUrl
                        // - Attribute value only has colors but no imageUrl
                        for (const valueId of attributeValueIds){
                            const attrValue = await tx.attributeValue.findUnique({
                                where: {
                                    id: valueId
                                },
                                include: {
                                    attribute: true
                                }
                            });
                            if (attrValue) {
                                // Check if attribute is "color"
                                const isColorAttribute = attrValue.attribute?.key === "color";
                                // Check if attribute value only has colors but no imageUrl
                                const hasColors = attrValue.colors && (Array.isArray(attrValue.colors) ? attrValue.colors.length > 0 : typeof attrValue.colors === 'string' ? attrValue.colors.trim() !== '' && attrValue.colors !== '[]' : Object.keys(attrValue.colors || {}).length > 0);
                                const hasNoImageUrl = !attrValue.imageUrl || attrValue.imageUrl.trim() === '';
                                const isColorOnly = hasColors && hasNoImageUrl;
                                // Skip updating if:
                                // 1. It's a color attribute AND doesn't have an imageUrl, OR
                                // 2. It only has colors but no imageUrl
                                if (isColorAttribute && hasNoImageUrl || isColorOnly) {
                                    console.log(`⏭️ [ADMIN PRODUCTS UPDATE SERVICE] Skipping attribute value ${valueId} - color attribute or color-only value without imageUrl`);
                                    continue;
                                }
                                // Only update if:
                                // 1. Attribute value doesn't have an imageUrl, OR
                                // 2. Variant image is a base64 (more specific) and attribute value has a URL
                                const shouldUpdate = !attrValue.imageUrl || firstVariantImageUrl.startsWith('data:image/') && attrValue.imageUrl && !attrValue.imageUrl.startsWith('data:image/');
                                if (shouldUpdate) {
                                    console.log(`📸 [ADMIN PRODUCTS UPDATE SERVICE] Updating attribute value ${valueId} imageUrl from variant ${variant.id}:`, firstVariantImageUrl.substring(0, 50) + '...');
                                    await tx.attributeValue.update({
                                        where: {
                                            id: valueId
                                        },
                                        data: {
                                            imageUrl: firstVariantImageUrl
                                        }
                                    });
                                } else {
                                    console.log(`⏭️ [ADMIN PRODUCTS UPDATE SERVICE] Skipping attribute value ${valueId} - already has imageUrl`);
                                }
                            }
                        }
                    }
                    console.log('✅ [ADMIN PRODUCTS UPDATE SERVICE] Finished updating attribute value imageUrls from variant images');
                } catch (error) {
                    // Don't fail the transaction if this fails - it's a nice-to-have feature
                    console.warn('⚠️ [ADMIN PRODUCTS UPDATE SERVICE] Failed to update attribute value imageUrls from variant images:', error);
                }
                // 5. Finally update the product record itself
                return await tx.product.update({
                    where: {
                        id: productId
                    },
                    data: updateData,
                    include: {
                        translations: true,
                        variants: {
                            include: {
                                options: true
                            }
                        },
                        labels: true
                    }
                });
            });
            // 6. Revalidate cache for this product and related pages
            try {
                console.log('🧹 [ADMIN PRODUCTS UPDATE SERVICE] Revalidating paths for product:', productId);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])(`/products/${result.translations[0]?.slug}`);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])('/products');
                // @ts-expect-error - revalidateTag type issue in Next.js
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidateTag"])('products');
                // @ts-expect-error - revalidateTag type issue in Next.js
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidateTag"])(`product-${productId}`);
            } catch (e) {
                console.warn('⚠️ [ADMIN PRODUCTS UPDATE SERVICE] Revalidation failed (expected in some environments):', e);
            }
            return result;
        } catch (error) {
            console.error("❌ [ADMIN PRODUCTS UPDATE SERVICE] updateProduct error:", error);
            throw error;
        }
    }
}
const adminProductsUpdateService = new AdminProductsUpdateService();
}),
"[project]/apps/web/lib/services/admin/admin-products-delete.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminProductsDeleteService",
    ()=>adminProductsDeleteService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
class AdminProductsDeleteService {
    /**
   * Delete product (soft delete)
   */ async deleteProduct(productId) {
        const product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findUnique({
            where: {
                id: productId
            }
        });
        if (!product) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Product not found",
                detail: `Product with id '${productId}' does not exist`
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.update({
            where: {
                id: productId
            },
            data: {
                deletedAt: new Date(),
                published: false
            }
        });
        return {
            success: true
        };
    }
    /**
   * Update product discount
   */ async updateProductDiscount(productId, discountPercent) {
        console.log('💰 [ADMIN PRODUCTS DELETE SERVICE] updateProductDiscount called:', {
            productId,
            discountPercent
        });
        const product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findUnique({
            where: {
                id: productId
            }
        });
        if (!product) {
            console.error('❌ [ADMIN PRODUCTS DELETE SERVICE] Product not found:', productId);
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Product not found",
                detail: `Product with id '${productId}' does not exist`
            };
        }
        const clampedDiscount = Math.max(0, Math.min(100, discountPercent));
        console.log('💰 [ADMIN PRODUCTS DELETE SERVICE] Updating product discount:', {
            productId,
            oldDiscount: product.discountPercent,
            newDiscount: clampedDiscount
        });
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.update({
            where: {
                id: productId
            },
            data: {
                discountPercent: clampedDiscount
            }
        });
        console.log('✅ [ADMIN PRODUCTS DELETE SERVICE] Product discount updated successfully:', {
            productId,
            discountPercent: updated.discountPercent
        });
        return {
            success: true,
            discountPercent: updated.discountPercent
        };
    }
}
const adminProductsDeleteService = new AdminProductsDeleteService();
}),
"[project]/apps/web/lib/services/admin/admin-products.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Admin Products Service - Combined service that delegates to specialized services
 * This file combines all product-related services for backward compatibility
 */ __turbopack_context__.s([
    "adminProductsService",
    ()=>adminProductsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$read$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-products-read.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$create$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-products-create.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$update$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-products-update.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$delete$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-products-delete.service.ts [app-route] (ecmascript)");
;
;
;
;
class AdminProductsService {
    // Delegate to specialized services
    // Read methods
    getProducts = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$read$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsReadService"].getProducts.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$read$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsReadService"]);
    getProductById = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$read$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsReadService"].getProductById.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$read$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsReadService"]);
    // Create methods
    createProduct = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$create$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsCreateService"].createProduct.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$create$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsCreateService"]);
    // Update methods
    updateProduct = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$update$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsUpdateService"].updateProduct.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$update$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsUpdateService"]);
    // Delete/Discount methods
    deleteProduct = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$delete$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsDeleteService"].deleteProduct.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$delete$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsDeleteService"]);
    updateProductDiscount = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$delete$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsDeleteService"].updateProductDiscount.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2d$delete$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsDeleteService"]);
}
const adminProductsService = new AdminProductsService();
}),
"[project]/apps/web/lib/services/admin/admin-attributes-read.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminAttributesReadService",
    ()=>adminAttributesReadService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
class AdminAttributesReadService {
    /**
   * Ensure colors and imageUrl columns exist in attribute_values table
   * This is a runtime migration that runs automatically when needed
   */ async ensureColorsColumnsExist() {
        try {
            // Check if colors column exists
            const colorsCheck = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRawUnsafe(`
        SELECT EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_schema = 'public'
          AND table_name = 'attribute_values' 
          AND column_name = 'colors'
        ) as exists;
      `);
            const colorsExists = colorsCheck[0]?.exists || false;
            // Check if imageUrl column exists
            const imageUrlCheck = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRawUnsafe(`
        SELECT EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_schema = 'public'
          AND table_name = 'attribute_values' 
          AND column_name = 'imageUrl'
        ) as exists;
      `);
            const imageUrlExists = imageUrlCheck[0]?.exists || false;
            if (colorsExists && imageUrlExists) {
                return; // Columns already exist
            }
            console.log('📝 [ADMIN ATTRIBUTES READ SERVICE] Adding missing colors/imageUrl columns...');
            // Add colors column if it doesn't exist
            if (!colorsExists) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRawUnsafe(`
          ALTER TABLE "attribute_values" ADD COLUMN IF NOT EXISTS "colors" JSONB DEFAULT '[]'::jsonb;
        `);
                console.log('✅ [ADMIN ATTRIBUTES READ SERVICE] Added "colors" column');
            }
            // Add imageUrl column if it doesn't exist
            if (!imageUrlExists) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRawUnsafe(`
          ALTER TABLE "attribute_values" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;
        `);
                console.log('✅ [ADMIN ATTRIBUTES READ SERVICE] Added "imageUrl" column');
            }
            // Create index if it doesn't exist
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "attribute_values_colors_idx" 
        ON "attribute_values" USING GIN ("colors");
      `);
            console.log('✅ [ADMIN ATTRIBUTES READ SERVICE] Migration completed successfully!');
        } catch (error) {
            console.error('❌ [ADMIN ATTRIBUTES READ SERVICE] Migration error:', error.message);
            throw error; // Re-throw to handle in calling code
        }
    }
    /**
   * Get attributes
   */ async getAttributes() {
        // Ensure colors and imageUrl columns exist (runtime migration)
        try {
            await this.ensureColorsColumnsExist();
        } catch (migrationError) {
            console.warn('⚠️ [ADMIN ATTRIBUTES READ SERVICE] Migration check failed:', migrationError.message);
        // Continue anyway - might already exist
        }
        let attributes;
        try {
            attributes = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attribute.findMany({
                include: {
                    translations: {
                        where: {
                            locale: "en"
                        },
                        take: 1
                    },
                    values: {
                        include: {
                            translations: {
                                where: {
                                    locale: "en"
                                },
                                take: 1
                            }
                        },
                        orderBy: {
                            position: "asc"
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                }
            });
        } catch (error) {
            // If attribute_values.colors column doesn't exist, fetch without it
            if (error?.code === 'P2022' || error?.message?.includes('attribute_values.colors') || error?.message?.includes('does not exist')) {
                console.warn('⚠️ [ADMIN ATTRIBUTES READ SERVICE] attribute_values.colors column not found, fetching without it:', error.message);
                // Fetch attributes first
                const attributesList = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attribute.findMany({
                    include: {
                        translations: {
                            where: {
                                locale: "en"
                            },
                            take: 1
                        }
                    },
                    orderBy: {
                        position: "asc"
                    }
                });
                // Fetch values separately without colors and imageUrl using Prisma
                // Try with select first, if it fails (because Prisma tries to select colors), use raw query
                let allValues;
                try {
                    allValues = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attributeValue.findMany({
                        select: {
                            id: true,
                            attributeId: true,
                            value: true,
                            position: true,
                            translations: {
                                where: {
                                    locale: "en"
                                },
                                take: 1
                            }
                        },
                        orderBy: {
                            position: "asc"
                        }
                    });
                } catch (selectError) {
                    // If select also fails, use raw query with correct column name
                    // Try with quoted name first, then without quotes
                    console.warn('⚠️ [ADMIN ATTRIBUTES READ SERVICE] Using raw query for attribute values:', selectError.message);
                    try {
                        allValues = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`
              SELECT 
                av.id,
                av."attributeId",
                av.value,
                av.position
              FROM attribute_values av
              ORDER BY av.position ASC
            `;
                    } catch (rawError) {
                        // If quoted name doesn't work, try without quotes (snake_case)
                        console.warn('⚠️ [ADMIN ATTRIBUTES READ SERVICE] Trying with snake_case column name:', rawError.message);
                        allValues = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`
              SELECT 
                av.id,
                av.attribute_id as "attributeId",
                av.value,
                av.position
              FROM attribute_values av
              ORDER BY av.position ASC
            `;
                    }
                    // Fetch translations separately
                    const valueIds = allValues.map((v)=>v.id);
                    const valueTranslations = valueIds.length > 0 ? await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attributeValueTranslation.findMany({
                        where: {
                            attributeValueId: {
                                in: valueIds
                            },
                            locale: "en"
                        }
                    }) : [];
                    // Add translations to values
                    allValues = allValues.map((val)=>({
                            ...val,
                            translations: valueTranslations.filter((t)=>t.attributeValueId === val.id)
                        }));
                }
                // Combine attributes with their values
                attributes = attributesList.map((attr)=>{
                    const attrValues = allValues.filter((val)=>val.attributeId === attr.id).map((val)=>{
                        return {
                            id: val.id,
                            attributeId: val.attributeId,
                            value: val.value,
                            position: val.position,
                            colors: null,
                            imageUrl: null,
                            translations: Array.isArray(val.translations) ? val.translations : []
                        };
                    });
                    return {
                        ...attr,
                        values: attrValues
                    };
                });
            } else {
                throw error;
            }
        }
        return {
            data: attributes.map((attribute)=>{
                const translations = Array.isArray(attribute.translations) ? attribute.translations : [];
                const translation = translations[0] || null;
                const values = Array.isArray(attribute.values) ? attribute.values : [];
                return {
                    id: attribute.id,
                    key: attribute.key,
                    name: translation?.name || attribute.key,
                    type: attribute.type,
                    filterable: attribute.filterable,
                    values: values.map((value)=>{
                        const valueTranslations = Array.isArray(value.translations) ? value.translations : [];
                        const valueTranslation = valueTranslations[0] || null;
                        const colorsData = value.colors;
                        let colorsArray = [];
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
                            imageUrl: value.imageUrl || null
                        };
                    })
                };
            })
        };
    }
}
const adminAttributesReadService = new AdminAttributesReadService();
}),
"[project]/apps/web/lib/services/admin/admin-attributes-write.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminAttributesWriteService",
    ()=>adminAttributesWriteService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
class AdminAttributesWriteService {
    /**
   * Ensure colors and imageUrl columns exist in attribute_values table
   * This is a runtime migration that runs automatically when needed
   */ async ensureColorsColumnsExist() {
        try {
            // Check if colors column exists
            const colorsCheck = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRawUnsafe(`
        SELECT EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_schema = 'public'
          AND table_name = 'attribute_values' 
          AND column_name = 'colors'
        ) as exists;
      `);
            const colorsExists = colorsCheck[0]?.exists || false;
            // Check if imageUrl column exists
            const imageUrlCheck = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRawUnsafe(`
        SELECT EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_schema = 'public'
          AND table_name = 'attribute_values' 
          AND column_name = 'imageUrl'
        ) as exists;
      `);
            const imageUrlExists = imageUrlCheck[0]?.exists || false;
            if (colorsExists && imageUrlExists) {
                return; // Columns already exist
            }
            console.log('📝 [ADMIN ATTRIBUTES WRITE SERVICE] Adding missing colors/imageUrl columns...');
            // Add colors column if it doesn't exist
            if (!colorsExists) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRawUnsafe(`
          ALTER TABLE "attribute_values" ADD COLUMN IF NOT EXISTS "colors" JSONB DEFAULT '[]'::jsonb;
        `);
                console.log('✅ [ADMIN ATTRIBUTES WRITE SERVICE] Added "colors" column');
            }
            // Add imageUrl column if it doesn't exist
            if (!imageUrlExists) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRawUnsafe(`
          ALTER TABLE "attribute_values" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;
        `);
                console.log('✅ [ADMIN ATTRIBUTES WRITE SERVICE] Added "imageUrl" column');
            }
            // Create index if it doesn't exist
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "attribute_values_colors_idx" 
        ON "attribute_values" USING GIN ("colors");
      `);
            console.log('✅ [ADMIN ATTRIBUTES WRITE SERVICE] Migration completed successfully!');
        } catch (error) {
            console.error('❌ [ADMIN ATTRIBUTES WRITE SERVICE] Migration error:', error.message);
            throw error; // Re-throw to handle in calling code
        }
    }
    /**
   * Create attribute
   */ async createAttribute(data) {
        console.log('🆕 [ADMIN ATTRIBUTES WRITE SERVICE] Creating attribute:', data.key);
        // Check if attribute with this key already exists
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attribute.findUnique({
            where: {
                key: data.key
            }
        });
        if (existing) {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/validation-error",
                title: "Attribute already exists",
                detail: `Attribute with key '${data.key}' already exists`
            };
        }
        const attribute = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attribute.create({
            data: {
                key: data.key,
                type: data.type || "select",
                filterable: data.filterable !== false,
                translations: {
                    create: {
                        locale: data.locale || "en",
                        name: data.name
                    }
                }
            },
            include: {
                translations: {
                    where: {
                        locale: data.locale || "en"
                    }
                },
                values: {
                    include: {
                        translations: {
                            where: {
                                locale: data.locale || "en"
                            }
                        }
                    }
                }
            }
        });
        const translation = attribute.translations[0];
        const values = attribute.values || [];
        return {
            id: attribute.id,
            key: attribute.key,
            name: translation?.name || attribute.key,
            type: attribute.type,
            filterable: attribute.filterable,
            values: values.map((val)=>{
                const valTranslation = val.translations?.[0];
                return {
                    id: val.id,
                    value: val.value,
                    label: valTranslation?.label || val.value
                };
            })
        };
    }
    /**
   * Update attribute translation (name)
   */ async updateAttributeTranslation(attributeId, data) {
        console.log('✏️ [ADMIN ATTRIBUTES WRITE SERVICE] Updating attribute translation:', {
            attributeId,
            name: data.name
        });
        const attribute = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attribute.findUnique({
            where: {
                id: attributeId
            },
            include: {
                translations: {
                    where: {
                        locale: data.locale || "en"
                    }
                }
            }
        });
        if (!attribute) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Attribute not found",
                detail: `Attribute with id '${attributeId}' does not exist`
            };
        }
        const locale = data.locale || "en";
        // Use upsert to handle both create and update cases
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attributeTranslation.upsert({
            where: {
                attributeId_locale: {
                    attributeId,
                    locale
                }
            },
            update: {
                name: data.name.trim()
            },
            create: {
                attributeId,
                locale,
                name: data.name.trim()
            }
        });
        // Return updated attribute with all values
        const updatedAttribute = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attribute.findUnique({
            where: {
                id: attributeId
            },
            include: {
                translations: {
                    where: {
                        locale
                    }
                },
                values: {
                    include: {
                        translations: {
                            where: {
                                locale
                            }
                        }
                    },
                    orderBy: {
                        position: "asc"
                    }
                }
            }
        });
        if (!updatedAttribute) {
            throw {
                status: 500,
                type: "https://api.shop.am/problems/internal-error",
                title: "Internal Server Error",
                detail: "Failed to retrieve updated attribute"
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
            values: values.map((val)=>{
                const valTranslation = val.translations?.[0];
                return {
                    id: val.id,
                    value: val.value,
                    label: valTranslation?.label || val.value,
                    colors: Array.isArray(val.colors) ? val.colors : val.colors ? JSON.parse(val.colors) : [],
                    imageUrl: val.imageUrl || null
                };
            })
        };
    }
    /**
   * Add attribute value
   */ async addAttributeValue(attributeId, data) {
        console.log('➕ [ADMIN ATTRIBUTES WRITE SERVICE] Adding attribute value:', {
            attributeId,
            label: data.label
        });
        const attribute = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attribute.findUnique({
            where: {
                id: attributeId
            }
        });
        if (!attribute) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Attribute not found",
                detail: `Attribute with id '${attributeId}' does not exist`
            };
        }
        // Use label as value (normalized)
        const value = data.label.trim().toLowerCase().replace(/\s+/g, '-');
        // Check if value already exists
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attributeValue.findFirst({
            where: {
                attributeId,
                value
            }
        });
        if (existing) {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/validation-error",
                title: "Value already exists",
                detail: `Value '${data.label}' already exists for this attribute`
            };
        }
        const attributeValue = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attributeValue.create({
            data: {
                attributeId,
                value,
                translations: {
                    create: {
                        locale: data.locale || "en",
                        label: data.label.trim()
                    }
                }
            }
        });
        // Return updated attribute with all values
        const updatedAttribute = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attribute.findUnique({
            where: {
                id: attributeId
            },
            include: {
                translations: {
                    where: {
                        locale: data.locale || "en"
                    }
                },
                values: {
                    include: {
                        translations: {
                            where: {
                                locale: data.locale || "en"
                            }
                        }
                    },
                    orderBy: {
                        position: "asc"
                    }
                }
            }
        });
        if (!updatedAttribute) {
            throw {
                status: 500,
                type: "https://api.shop.am/problems/internal-error",
                title: "Internal Server Error",
                detail: "Failed to retrieve updated attribute"
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
            values: values.map((val)=>{
                const valTranslation = val.translations?.[0];
                return {
                    id: val.id,
                    value: val.value,
                    label: valTranslation?.label || val.value,
                    colors: Array.isArray(val.colors) ? val.colors : val.colors ? JSON.parse(val.colors) : [],
                    imageUrl: val.imageUrl || null
                };
            })
        };
    }
    /**
   * Update attribute value
   */ async updateAttributeValue(attributeId, valueId, data) {
        console.log('✏️ [ADMIN ATTRIBUTES WRITE SERVICE] Updating attribute value:', {
            attributeId,
            valueId,
            data
        });
        // Ensure colors and imageUrl columns exist (runtime migration)
        try {
            await this.ensureColorsColumnsExist();
        } catch (migrationError) {
            console.warn('⚠️ [ADMIN ATTRIBUTES WRITE SERVICE] Migration check failed:', migrationError.message);
        // Continue anyway - might already exist
        }
        const attributeValue = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attributeValue.findUnique({
            where: {
                id: valueId
            },
            include: {
                attribute: true,
                translations: true
            }
        });
        if (!attributeValue) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Attribute value not found",
                detail: `Attribute value with id '${valueId}' does not exist`
            };
        }
        if (attributeValue.attributeId !== attributeId) {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/validation-error",
                title: "Validation Error",
                detail: "Attribute value does not belong to the specified attribute"
            };
        }
        const locale = data.locale || "en";
        const updateData = {};
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
            const existingTranslation = attributeValue.translations.find((t)=>t.locale === locale);
            if (existingTranslation) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attributeValueTranslation.update({
                    where: {
                        id: existingTranslation.id
                    },
                    data: {
                        label: data.label.trim()
                    }
                });
            } else {
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attributeValueTranslation.create({
                    data: {
                        attributeValueId: valueId,
                        locale,
                        label: data.label.trim()
                    }
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
            const updatedValue = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attributeValue.update({
                where: {
                    id: valueId
                },
                data: updateData
            });
            console.log('✅ [ADMIN ATTRIBUTES WRITE SERVICE] Attribute value updated:', {
                valueId,
                savedColors: updatedValue.colors,
                savedColorsType: typeof updatedValue.colors
            });
        }
        // Return updated attribute with all values
        const updatedAttribute = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attribute.findUnique({
            where: {
                id: attributeId
            },
            include: {
                translations: {
                    where: {
                        locale
                    }
                },
                values: {
                    include: {
                        translations: {
                            where: {
                                locale
                            }
                        }
                    },
                    orderBy: {
                        position: "asc"
                    }
                }
            }
        });
        if (!updatedAttribute) {
            throw {
                status: 500,
                type: "https://api.shop.am/problems/internal-error",
                title: "Internal Server Error",
                detail: "Failed to retrieve updated attribute"
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
            values: values.map((val)=>{
                const valTranslation = val.translations?.[0];
                const colorsData = val.colors;
                let colorsArray = [];
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
                    imageUrl: val.imageUrl || null
                };
            })
        };
    }
}
const adminAttributesWriteService = new AdminAttributesWriteService();
}),
"[project]/apps/web/lib/services/admin/admin-attributes-delete.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminAttributesDeleteService",
    ()=>adminAttributesDeleteService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
class AdminAttributesDeleteService {
    /**
   * Delete attribute
   */ async deleteAttribute(attributeId) {
        try {
            console.log('🗑️ [ADMIN ATTRIBUTES DELETE SERVICE] Սկսվում է attribute-ի հեռացում:', {
                attributeId,
                timestamp: new Date().toISOString()
            });
            // Ստուգում ենք, արդյոք attribute-ը գոյություն ունի
            console.log('🔍 [ADMIN ATTRIBUTES DELETE SERVICE] Ստուգվում է attribute-ի գոյությունը...');
            const attribute = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attribute.findUnique({
                where: {
                    id: attributeId
                },
                select: {
                    id: true,
                    key: true
                }
            });
            if (!attribute) {
                console.log('❌ [ADMIN ATTRIBUTES DELETE SERVICE] Attribute-ը չի գտնվել:', attributeId);
                throw {
                    status: 404,
                    type: "https://api.shop.am/problems/not-found",
                    title: "Attribute not found",
                    detail: `Attribute with id '${attributeId}' does not exist`
                };
            }
            console.log('✅ [ADMIN ATTRIBUTES DELETE SERVICE] Attribute-ը գտնվել է:', {
                id: attribute.id,
                key: attribute.key
            });
            // Ստուգում ենք, արդյոք attribute-ը օգտագործվում է արտադրանքներում
            console.log('🔍 [ADMIN ATTRIBUTES DELETE SERVICE] Ստուգվում է, արդյոք attribute-ը օգտագործվում է արտադրանքներում...');
            let productAttributesCount = 0;
            // Ստուգում ենք, արդյոք db.productAttribute գոյություն ունի
            if (__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].productAttribute) {
                try {
                    productAttributesCount = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].productAttribute.count({
                        where: {
                            attributeId
                        }
                    });
                    console.log('📊 [ADMIN ATTRIBUTES DELETE SERVICE] Product attributes count:', productAttributesCount);
                } catch (countError) {
                    console.error('❌ [ADMIN ATTRIBUTES DELETE SERVICE] Product attributes count սխալ:', {
                        error: countError,
                        message: countError?.message,
                        code: countError?.code
                    });
                    // Եթե count-ը չի աշխատում, փորձում ենք findMany-ով
                    try {
                        const productAttributes = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].productAttribute.findMany({
                            where: {
                                attributeId
                            },
                            select: {
                                id: true
                            }
                        });
                        productAttributesCount = productAttributes.length;
                        console.log('📊 [ADMIN ATTRIBUTES DELETE SERVICE] Product attributes count (via findMany):', productAttributesCount);
                    } catch (findError) {
                        console.warn('⚠️ [ADMIN ATTRIBUTES DELETE SERVICE] Product attributes findMany-ը նույնպես չի աշխատում, skip անում ենք ստուգումը');
                        productAttributesCount = 0;
                    }
                }
            } else {
                console.warn('⚠️ [ADMIN ATTRIBUTES DELETE SERVICE] db.productAttribute-ը undefined է, skip անում ենք product attributes ստուգումը');
            }
            if (productAttributesCount > 0) {
                console.log('⚠️ [ADMIN ATTRIBUTES DELETE SERVICE] Attribute-ը օգտագործվում է արտադրանքներում:', productAttributesCount);
                throw {
                    status: 400,
                    type: "https://api.shop.am/problems/validation-error",
                    title: "Cannot delete attribute",
                    detail: `Attribute is used in ${productAttributesCount} product(s). Please remove it from products first.`
                };
            }
            // Ստուգում ենք, արդյոք attribute values-ները օգտագործվում են variants-ներում
            console.log('🔍 [ADMIN ATTRIBUTES DELETE SERVICE] Ստուգվում է, արդյոք attribute values-ները օգտագործվում են variants-ներում...');
            const attributeValues = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attributeValue.findMany({
                where: {
                    attributeId
                },
                select: {
                    id: true
                }
            });
            console.log('📊 [ADMIN ATTRIBUTES DELETE SERVICE] Attribute values count:', attributeValues.length);
            if (attributeValues.length > 0) {
                const valueIds = attributeValues.map((v)=>v.id);
                console.log('🔍 [ADMIN ATTRIBUTES DELETE SERVICE] Ստուգվում է variant options...');
                let variantOptionsCount = 0;
                try {
                    variantOptionsCount = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].productVariantOption.count({
                        where: {
                            valueId: {
                                in: valueIds
                            }
                        }
                    });
                    console.log('📊 [ADMIN ATTRIBUTES DELETE SERVICE] Variant options count:', variantOptionsCount);
                } catch (countError) {
                    console.error('❌ [ADMIN ATTRIBUTES DELETE SERVICE] Variant options count սխալ:', {
                        error: countError,
                        message: countError?.message,
                        code: countError?.code
                    });
                    // Եթե count-ը չի աշխատում, փորձում ենք findMany-ով
                    const variantOptions = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].productVariantOption.findMany({
                        where: {
                            valueId: {
                                in: valueIds
                            }
                        },
                        select: {
                            id: true
                        }
                    });
                    variantOptionsCount = variantOptions.length;
                    console.log('📊 [ADMIN ATTRIBUTES DELETE SERVICE] Variant options count (via findMany):', variantOptionsCount);
                }
                if (variantOptionsCount > 0) {
                    console.log('⚠️ [ADMIN ATTRIBUTES DELETE SERVICE] Attribute values-ները օգտագործվում են variants-ներում:', variantOptionsCount);
                    throw {
                        status: 400,
                        type: "https://api.shop.am/problems/validation-error",
                        title: "Cannot delete attribute",
                        detail: `Some attribute values are used in ${variantOptionsCount} variant(s). Please remove them from variants first.`
                    };
                }
            }
            // Հեռացնում ենք attribute-ը (values-ները կհեռացվեն cascade-ով)
            console.log('🗑️ [ADMIN ATTRIBUTES DELETE SERVICE] Հեռացվում է attribute-ը...');
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attribute.delete({
                where: {
                    id: attributeId
                }
            });
            console.log('✅ [ADMIN ATTRIBUTES DELETE SERVICE] Attribute-ը հաջողությամբ հեռացվել է:', {
                attributeId,
                timestamp: new Date().toISOString()
            });
            return {
                success: true
            };
        } catch (error) {
            // Եթե սա մեր ստեղծած սխալ է, ապա վերադարձնում ենք այն
            if (error.status && error.type) {
                console.error('❌ [ADMIN ATTRIBUTES DELETE SERVICE] Ստանդարտ սխալ:', {
                    status: error.status,
                    type: error.type,
                    title: error.title,
                    detail: error.detail
                });
                throw error;
            }
            // Մանրամասն լոգավորում
            console.error('❌ [ADMIN ATTRIBUTES DELETE SERVICE] Attribute հեռացման սխալ:', {
                attributeId,
                error: {
                    name: error?.name,
                    message: error?.message,
                    code: error?.code,
                    meta: error?.meta,
                    stack: error?.stack?.substring(0, 1000)
                },
                timestamp: new Date().toISOString()
            });
            // Prisma սխալների մշակում
            if (error?.code === 'P2025') {
                console.log('⚠️ [ADMIN ATTRIBUTES DELETE SERVICE] Prisma P2025: Գրառումը չի գտնվել');
                throw {
                    status: 404,
                    type: "https://api.shop.am/problems/not-found",
                    title: "Attribute not found",
                    detail: `Attribute with id '${attributeId}' does not exist`
                };
            }
            // Գեներիկ սխալ
            throw {
                status: 500,
                type: "https://api.shop.am/problems/internal-error",
                title: "Internal Server Error",
                detail: error?.message || "Failed to delete attribute"
            };
        }
    }
    /**
   * Delete attribute value
   */ async deleteAttributeValue(attributeValueId) {
        try {
            console.log('🗑️ [ADMIN ATTRIBUTES DELETE SERVICE] Deleting attribute value:', attributeValueId);
            // First check if attribute value exists
            const attributeValue = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attributeValue.findUnique({
                where: {
                    id: attributeValueId
                },
                select: {
                    id: true,
                    attributeId: true
                }
            });
            if (!attributeValue) {
                throw {
                    status: 404,
                    type: "https://api.shop.am/problems/not-found",
                    title: "Attribute value not found",
                    detail: `Attribute value with id '${attributeValueId}' does not exist`
                };
            }
            // Check if value is used in any variants
            const variantOptionsCount = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].productVariantOption.count({
                where: {
                    valueId: attributeValueId
                }
            });
            if (variantOptionsCount > 0) {
                throw {
                    status: 400,
                    type: "https://api.shop.am/problems/validation-error",
                    title: "Cannot delete attribute value",
                    detail: `Attribute value is used in ${variantOptionsCount} variant(s). Please remove it from variants first.`
                };
            }
            // Delete attribute value
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attributeValue.delete({
                where: {
                    id: attributeValueId
                }
            });
            // Return updated attribute
            const attribute = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attribute.findUnique({
                where: {
                    id: attributeValue.attributeId
                },
                include: {
                    translations: {
                        where: {
                            locale: "en"
                        },
                        take: 1
                    },
                    values: {
                        include: {
                            translations: {
                                where: {
                                    locale: "en"
                                },
                                take: 1
                            }
                        },
                        orderBy: {
                            position: "asc"
                        }
                    }
                }
            });
            if (!attribute) {
                throw {
                    status: 500,
                    type: "https://api.shop.am/problems/internal-error",
                    title: "Internal Server Error",
                    detail: "Failed to retrieve updated attribute"
                };
            }
            const translation = attribute.translations[0];
            const values = attribute.values || [];
            return {
                id: attribute.id,
                key: attribute.key,
                name: translation?.name || attribute.key,
                type: attribute.type,
                filterable: attribute.filterable,
                values: values.map((val)=>{
                    const valTranslation = val.translations?.[0];
                    return {
                        id: val.id,
                        value: val.value,
                        label: valTranslation?.label || val.value
                    };
                })
            };
        } catch (error) {
            console.error('❌ [ADMIN ATTRIBUTES DELETE SERVICE] Error deleting attribute value:', error);
            if (error.status) {
                throw error;
            }
            throw {
                status: 500,
                type: "https://api.shop.am/problems/internal-error",
                title: "Internal Server Error",
                detail: error.message || "Failed to delete attribute value"
            };
        }
    }
}
const adminAttributesDeleteService = new AdminAttributesDeleteService();
}),
"[project]/apps/web/lib/services/admin/admin-attributes.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Admin Attributes Service - Combined service that delegates to specialized services
 * This file combines all attribute-related services for backward compatibility
 */ __turbopack_context__.s([
    "adminAttributesService",
    ()=>adminAttributesService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$read$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-attributes-read.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$write$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-attributes-write.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$delete$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-attributes-delete.service.ts [app-route] (ecmascript)");
;
;
;
class AdminAttributesService {
    // Delegate to specialized services
    // Read methods
    getAttributes = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$read$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesReadService"].getAttributes.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$read$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesReadService"]);
    // Write methods
    createAttribute = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$write$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesWriteService"].createAttribute.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$write$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesWriteService"]);
    updateAttributeTranslation = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$write$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesWriteService"].updateAttributeTranslation.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$write$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesWriteService"]);
    addAttributeValue = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$write$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesWriteService"].addAttributeValue.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$write$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesWriteService"]);
    updateAttributeValue = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$write$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesWriteService"].updateAttributeValue.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$write$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesWriteService"]);
    // Delete methods
    deleteAttribute = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$delete$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesDeleteService"].deleteAttribute.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$delete$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesDeleteService"]);
    deleteAttributeValue = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$delete$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesDeleteService"].deleteAttributeValue.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2d$delete$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesDeleteService"]);
}
const adminAttributesService = new AdminAttributesService();
}),
"[project]/apps/web/lib/services/admin.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Admin Service - Combined service that delegates to specialized services
 * This file combines all admin-related services for backward compatibility
 */ __turbopack_context__.s([
    "adminService",
    ()=>adminService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$stats$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-stats.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$users$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-users.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$orders$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-orders.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$settings$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-settings.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$delivery$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-delivery.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$brands$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-brands.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$categories$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-categories.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-products.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin/admin-attributes.service.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
class AdminService {
    // Delegate to specialized services
    // Stats methods
    getStats = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$stats$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminStatsService"].getStats.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$stats$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminStatsService"]);
    getUserActivity = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$stats$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminStatsService"].getUserActivity.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$stats$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminStatsService"]);
    getRecentOrders = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$stats$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminStatsService"].getRecentOrders.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$stats$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminStatsService"]);
    getTopProducts = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$stats$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminStatsService"].getTopProducts.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$stats$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminStatsService"]);
    getActivity = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$stats$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminStatsService"].getActivity.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$stats$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminStatsService"]);
    getAnalytics = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$stats$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminStatsService"].getAnalytics.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$stats$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminStatsService"]);
    // Users methods
    getUsers = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$users$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminUsersService"].getUsers.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$users$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminUsersService"]);
    updateUser = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$users$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminUsersService"].updateUser.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$users$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminUsersService"]);
    deleteUser = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$users$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminUsersService"].deleteUser.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$users$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminUsersService"]);
    // Orders methods
    getOrders = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$orders$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminOrdersService"].getOrders.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$orders$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminOrdersService"]);
    getOrderById = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$orders$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminOrdersService"].getOrderById.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$orders$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminOrdersService"]);
    deleteOrder = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$orders$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminOrdersService"].deleteOrder.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$orders$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminOrdersService"]);
    updateOrder = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$orders$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminOrdersService"].updateOrder.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$orders$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminOrdersService"]);
    // Settings methods
    getSettings = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$settings$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminSettingsService"].getSettings.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$settings$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminSettingsService"]);
    updateSettings = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$settings$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminSettingsService"].updateSettings.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$settings$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminSettingsService"]);
    getPriceFilterSettings = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$settings$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminSettingsService"].getPriceFilterSettings.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$settings$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminSettingsService"]);
    updatePriceFilterSettings = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$settings$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminSettingsService"].updatePriceFilterSettings.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$settings$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminSettingsService"]);
    // Delivery methods
    getDeliverySettings = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$delivery$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminDeliveryService"].getDeliverySettings.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$delivery$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminDeliveryService"]);
    getDeliveryPrice = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$delivery$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminDeliveryService"].getDeliveryPrice.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$delivery$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminDeliveryService"]);
    updateDeliverySettings = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$delivery$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminDeliveryService"].updateDeliverySettings.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$delivery$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminDeliveryService"]);
    // Brands methods
    getBrands = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$brands$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminBrandsService"].getBrands.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$brands$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminBrandsService"]);
    createBrand = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$brands$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminBrandsService"].createBrand.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$brands$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminBrandsService"]);
    updateBrand = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$brands$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminBrandsService"].updateBrand.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$brands$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminBrandsService"]);
    deleteBrand = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$brands$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminBrandsService"].deleteBrand.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$brands$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminBrandsService"]);
    // Categories methods
    getCategories = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$categories$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminCategoriesService"].getCategories.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$categories$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminCategoriesService"]);
    createCategory = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$categories$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminCategoriesService"].createCategory.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$categories$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminCategoriesService"]);
    getCategoryById = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$categories$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminCategoriesService"].getCategoryById.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$categories$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminCategoriesService"]);
    updateCategory = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$categories$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminCategoriesService"].updateCategory.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$categories$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminCategoriesService"]);
    deleteCategory = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$categories$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminCategoriesService"].deleteCategory.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$categories$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminCategoriesService"]);
    // Products methods
    getProducts = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsService"].getProducts.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsService"]);
    getProductById = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsService"].getProductById.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsService"]);
    createProduct = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsService"].createProduct.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsService"]);
    updateProduct = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsService"].updateProduct.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsService"]);
    deleteProduct = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsService"].deleteProduct.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsService"]);
    updateProductDiscount = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsService"].updateProductDiscount.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminProductsService"]);
    // Attributes methods
    getAttributes = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"].getAttributes.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"]);
    createAttribute = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"].createAttribute.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"]);
    updateAttributeTranslation = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"].updateAttributeTranslation.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"]);
    addAttributeValue = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"].addAttributeValue.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"]);
    updateAttributeValue = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"].updateAttributeValue.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"]);
    deleteAttribute = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"].deleteAttribute.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"]);
    deleteAttributeValue = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"].deleteAttributeValue.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2f$admin$2d$attributes$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAttributesService"]);
}
const adminService = new AdminService();
}),
"[project]/apps/web/lib/services/products-filters.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productsFiltersService",
    ()=>productsFiltersService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/admin.service.ts [app-route] (ecmascript)");
;
;
class ProductsFiltersService {
    /**
   * Get all child category IDs recursively
   */ async getAllChildCategoryIds(parentId) {
        const children = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findMany({
            where: {
                parentId: parentId,
                published: true,
                deletedAt: null
            },
            select: {
                id: true
            }
        });
        let allChildIds = children.map((c)=>c.id);
        // Recursively get children of children
        for (const child of children){
            const grandChildren = await this.getAllChildCategoryIds(child.id);
            allChildIds = [
                ...allChildIds,
                ...grandChildren
            ];
        }
        return allChildIds;
    }
    /**
   * Get available filters (colors and sizes)
   */ async getFilters(filters) {
        try {
            const where = {
                published: true,
                deletedAt: null
            };
            // Add search filter
            if (filters.search && filters.search.trim()) {
                where.OR = [
                    {
                        translations: {
                            some: {
                                title: {
                                    contains: filters.search.trim(),
                                    mode: "insensitive"
                                }
                            }
                        }
                    },
                    {
                        translations: {
                            some: {
                                subtitle: {
                                    contains: filters.search.trim(),
                                    mode: "insensitive"
                                }
                            }
                        }
                    },
                    {
                        variants: {
                            some: {
                                sku: {
                                    contains: filters.search.trim(),
                                    mode: "insensitive"
                                }
                            }
                        }
                    }
                ];
            }
            // Add category filter
            if (filters.category) {
                try {
                    const categoryDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findFirst({
                        where: {
                            translations: {
                                some: {
                                    slug: filters.category,
                                    locale: filters.lang || "en"
                                }
                            },
                            published: true,
                            deletedAt: null
                        }
                    });
                    if (categoryDoc && categoryDoc.id) {
                        // Get all child categories (subcategories) recursively
                        const childCategoryIds = await this.getAllChildCategoryIds(categoryDoc.id);
                        const allCategoryIds = [
                            categoryDoc.id,
                            ...childCategoryIds
                        ];
                        console.log('📂 [PRODUCTS FILTERS SERVICE] Category IDs to include in filters:', {
                            parent: categoryDoc.id,
                            children: childCategoryIds,
                            total: allCategoryIds.length
                        });
                        // Build OR conditions for all categories (parent + children)
                        const categoryConditions = allCategoryIds.flatMap((catId)=>[
                                {
                                    primaryCategoryId: catId
                                },
                                {
                                    categoryIds: {
                                        has: catId
                                    }
                                }
                            ]);
                        if (where.OR) {
                            where.AND = [
                                {
                                    OR: where.OR
                                },
                                {
                                    OR: categoryConditions
                                }
                            ];
                            delete where.OR;
                        } else {
                            where.OR = categoryConditions;
                        }
                    }
                } catch (categoryError) {
                    console.error('❌ [PRODUCTS FILTERS SERVICE] Error fetching category:', categoryError);
                // Continue without category filter if there's an error
                }
            }
            // Get products with variants
            let products;
            try {
                products = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
                    where,
                    include: {
                        variants: {
                            where: {
                                published: true
                            },
                            include: {
                                options: {
                                    include: {
                                        attributeValue: {
                                            include: {
                                                attribute: true,
                                                translations: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        productAttributes: {
                            include: {
                                attribute: {
                                    include: {
                                        values: {
                                            include: {
                                                translations: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            } catch (dbError) {
                console.error('❌ [PRODUCTS FILTERS SERVICE] Error fetching products in getFilters:', dbError);
                throw dbError;
            }
            // Ensure products is an array
            if (!products || !Array.isArray(products)) {
                products = [];
            }
            // Filter by price in memory
            if (filters.minPrice || filters.maxPrice) {
                const min = filters.minPrice || 0;
                const max = filters.maxPrice || Infinity;
                products = products.filter((product)=>{
                    if (!product || !product.variants || !Array.isArray(product.variants)) {
                        return false;
                    }
                    const prices = product.variants.map((v)=>v?.price).filter((p)=>p !== undefined);
                    if (prices.length === 0) return false;
                    const minPrice = Math.min(...prices);
                    return minPrice >= min && minPrice <= max;
                });
            }
            // Collect colors and sizes from variants
            // Use Map with lowercase key to merge colors with different cases
            // Store both count, canonical label, imageUrl and colors hex
            const lang = filters.lang || 'en';
            const colorMap = new Map();
            const sizeMap = new Map();
            products.forEach((product)=>{
                if (!product || !product.variants || !Array.isArray(product.variants)) {
                    return;
                }
                product.variants.forEach((variant)=>{
                    if (!variant || !variant.options || !Array.isArray(variant.options)) {
                        return;
                    }
                    variant.options.forEach((option)=>{
                        if (!option) return;
                        // Check if it's a color option (support multiple formats)
                        const isColor = option.attributeKey === "color" || option.key === "color" || option.attribute === "color" || option.attributeValue && option.attributeValue.attribute?.key === "color";
                        if (isColor) {
                            let colorValue = "";
                            let imageUrl = null;
                            let colorsHex = null;
                            // New format: Use AttributeValue if available
                            if (option.attributeValue) {
                                const translation = option.attributeValue.translations?.find((t)=>t.locale === lang) || option.attributeValue.translations?.[0];
                                colorValue = translation?.label || option.attributeValue.value || "";
                                imageUrl = option.attributeValue.imageUrl || null;
                                colorsHex = option.attributeValue.colors || null;
                            } else if (option.value) {
                                // Old format: use value directly
                                colorValue = option.value.trim();
                            } else if (option.key === "color" || option.attribute === "color") {
                                // Fallback: try to get from option itself
                                colorValue = option.value || option.label || "";
                            }
                            if (colorValue) {
                                const colorKey = colorValue.toLowerCase();
                                const existing = colorMap.get(colorKey);
                                // Prefer capitalized version for label (e.g., "Black" over "black")
                                // If both exist, keep the one that starts with uppercase
                                const preferredLabel = existing ? colorValue[0] === colorValue[0].toUpperCase() ? colorValue : existing.label : colorValue;
                                // Prefer imageUrl and colors from AttributeValue if available
                                const finalImageUrl = imageUrl || existing?.imageUrl || null;
                                const finalColors = colorsHex || existing?.colors || null;
                                colorMap.set(colorKey, {
                                    count: (existing?.count || 0) + 1,
                                    label: preferredLabel,
                                    imageUrl: finalImageUrl,
                                    colors: finalColors
                                });
                            }
                        } else {
                            // Check if it's a size option (support multiple formats)
                            const isSize = option.attributeKey === "size" || option.key === "size" || option.attribute === "size" || option.attributeValue && option.attributeValue.attribute?.key === "size";
                            if (isSize) {
                                let sizeValue = "";
                                // New format: Use AttributeValue if available
                                if (option.attributeValue) {
                                    const translation = option.attributeValue.translations?.find((t)=>t.locale === lang) || option.attributeValue.translations?.[0];
                                    sizeValue = translation?.label || option.attributeValue.value || "";
                                } else if (option.value) {
                                    // Old format: use value directly
                                    sizeValue = option.value.trim();
                                } else if (option.key === "size" || option.attribute === "size") {
                                    // Fallback: try to get from option itself
                                    sizeValue = option.value || option.label || "";
                                }
                                if (sizeValue) {
                                    const normalizedSize = sizeValue.trim().toUpperCase();
                                    sizeMap.set(normalizedSize, (sizeMap.get(normalizedSize) || 0) + 1);
                                }
                            }
                        }
                    });
                });
                // Also check productAttributes for color attribute values with imageUrl and colors
                if (product.productAttributes && Array.isArray(product.productAttributes)) {
                    product.productAttributes.forEach((productAttr)=>{
                        if (productAttr.attribute?.key === 'color' && productAttr.attribute?.values) {
                            productAttr.attribute.values.forEach((attrValue)=>{
                                const translation = attrValue.translations?.find((t)=>t.locale === lang) || attrValue.translations?.[0];
                                const colorValue = translation?.label || attrValue.value || "";
                                if (colorValue) {
                                    const colorKey = colorValue.toLowerCase();
                                    const existing = colorMap.get(colorKey);
                                    // Update if we have imageUrl or colors hex and they're not already set
                                    if (attrValue.imageUrl || attrValue.colors) {
                                        colorMap.set(colorKey, {
                                            count: existing?.count || 0,
                                            label: existing?.label || colorValue,
                                            imageUrl: attrValue.imageUrl || existing?.imageUrl || null,
                                            colors: attrValue.colors || existing?.colors || null
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });
            // Convert maps to arrays
            const colors = Array.from(colorMap.entries()).map(([key, data])=>({
                    value: key,
                    label: data.label,
                    count: data.count,
                    imageUrl: data.imageUrl || null,
                    colors: data.colors || null
                }));
            const sizes = Array.from(sizeMap.entries()).map(([value, count])=>({
                    value,
                    count
                }));
            // Sort sizes by predefined order
            const SIZE_ORDER = [
                'XS',
                'S',
                'M',
                'L',
                'XL',
                'XXL',
                'XXXL'
            ];
            sizes.sort((a, b)=>{
                const aIndex = SIZE_ORDER.indexOf(a.value);
                const bIndex = SIZE_ORDER.indexOf(b.value);
                if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
                if (aIndex !== -1) return -1;
                if (bIndex !== -1) return 1;
                return a.value.localeCompare(b.value);
            });
            // Sort colors alphabetically
            colors.sort((a, b)=>a.label.localeCompare(b.label));
            return {
                colors,
                sizes
            };
        } catch (error) {
            console.error('❌ [PRODUCTS FILTERS SERVICE] Error in getFilters:', error);
            // Return empty arrays on error
            return {
                colors: [],
                sizes: []
            };
        }
    }
    /**
   * Get price range
   */ async getPriceRange(filters) {
        const where = {
            published: true,
            deletedAt: null
        };
        if (filters.category) {
            const categoryDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findFirst({
                where: {
                    translations: {
                        some: {
                            slug: filters.category,
                            locale: filters.lang || "en"
                        }
                    }
                }
            });
            if (categoryDoc) {
                where.OR = [
                    {
                        primaryCategoryId: categoryDoc.id
                    },
                    {
                        categoryIds: {
                            has: categoryDoc.id
                        }
                    }
                ];
            }
        }
        const products = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
            where,
            include: {
                variants: {
                    where: {
                        published: true
                    }
                }
            }
        });
        let minPrice = Infinity;
        let maxPrice = 0;
        products.forEach((product)=>{
            if (product.variants.length > 0) {
                const prices = product.variants.map((v)=>v.price);
                const productMin = Math.min(...prices);
                const productMax = Math.max(...prices);
                if (productMin < minPrice) minPrice = productMin;
                if (productMax > maxPrice) maxPrice = productMax;
            }
        });
        minPrice = minPrice === Infinity ? 0 : Math.floor(minPrice / 1000) * 1000;
        maxPrice = maxPrice === 0 ? 100000 : Math.ceil(maxPrice / 1000) * 1000;
        // Load price filter settings to provide optional step sizes per currency
        let stepSize = null;
        let stepSizePerCurrency = null;
        try {
            const settings = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$admin$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminService"].getPriceFilterSettings();
            stepSize = settings.stepSize ?? null;
            if (settings.stepSizePerCurrency) {
                // stepSizePerCurrency in settings is stored in display currency units.
                // Here we pass them through to the frontend as-is; the slider logic
                // will choose the appropriate value for the active currency.
                stepSizePerCurrency = {
                    USD: settings.stepSizePerCurrency.USD ?? undefined,
                    AMD: settings.stepSizePerCurrency.AMD ?? undefined,
                    RUB: settings.stepSizePerCurrency.RUB ?? undefined,
                    GEL: settings.stepSizePerCurrency.GEL ?? undefined
                };
            }
        } catch (error) {
            console.error('❌ [PRODUCTS FILTERS SERVICE] Error loading price filter settings for price range:', error);
        }
        return {
            min: minPrice,
            max: maxPrice,
            stepSize,
            stepSizePerCurrency
        };
    }
}
const productsFiltersService = new ProductsFiltersService();
}),
"[project]/apps/web/lib/services/products-slug.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productsSlugService",
    ()=>productsSlugService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$db$2d$ensure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/db-ensure.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/image-utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$translations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/translations.ts [app-route] (ecmascript)");
;
;
;
;
/**
 * Get "Out of Stock" translation for a given language
 */ const getOutOfStockLabel = (lang = "en")=>{
    const langKey = lang;
    const translation = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$translations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["translations"][langKey] || __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$translations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["translations"].en;
    return translation.stock.outOfStock;
};
class ProductsSlugService {
    /**
   * Get product by slug
   */ async findBySlug(slug, lang = "en") {
        // Base include without productAttributes (for backward compatibility)
        const baseInclude = {
            translations: true,
            brand: {
                include: {
                    translations: true
                }
            },
            categories: {
                include: {
                    translations: true
                }
            },
            variants: {
                where: {
                    published: true
                },
                include: {
                    options: {
                        include: {
                            attributeValue: {
                                include: {
                                    attribute: true,
                                    translations: true
                                }
                            }
                        }
                    }
                }
            },
            labels: true
        };
        // Try to include productAttributes, but fallback if table doesn't exist
        // Also handle case when attribute_values.colors column doesn't exist
        let product;
        try {
            product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findFirst({
                where: {
                    translations: {
                        some: {
                            slug,
                            locale: lang
                        }
                    },
                    published: true,
                    deletedAt: null
                },
                include: {
                    ...baseInclude,
                    productAttributes: {
                        include: {
                            attribute: {
                                include: {
                                    translations: true,
                                    values: {
                                        include: {
                                            translations: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            console.log('✅ [PRODUCTS SLUG SERVICE] Successfully fetched product with productAttributes');
            console.log('✅ [PRODUCTS SLUG SERVICE] productAttributes count:', product.productAttributes?.length || 0);
        } catch (error) {
            // If productAttributes table doesn't exist, retry without it
            if (error?.code === 'P2021' || error?.message?.includes('product_attributes') || error?.message?.includes('does not exist')) {
                console.warn('⚠️ [PRODUCTS SLUG SERVICE] product_attributes table not found, fetching without it:', error.message);
                try {
                    product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findFirst({
                        where: {
                            translations: {
                                some: {
                                    slug,
                                    locale: lang
                                }
                            },
                            published: true,
                            deletedAt: null
                        },
                        include: baseInclude
                    });
                    console.log('⚠️ [PRODUCTS SLUG SERVICE] Fallback query (without productAttributes) - productAttributes count:', product.productAttributes?.length || 0);
                } catch (retryError) {
                    // If product_variants.attributes column doesn't exist, try to create it and retry
                    if (retryError?.message?.includes('product_variants.attributes') || retryError?.message?.includes('attributes') && retryError?.message?.includes('does not exist')) {
                        console.warn('⚠️ [PRODUCTS SLUG SERVICE] product_variants.attributes column not found, attempting to create it...');
                        try {
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$db$2d$ensure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureProductVariantAttributesColumn"])();
                            // Retry the query after creating the column
                            product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findFirst({
                                where: {
                                    translations: {
                                        some: {
                                            slug,
                                            locale: lang
                                        }
                                    },
                                    published: true,
                                    deletedAt: null
                                },
                                include: baseInclude
                            });
                        } catch (attributesError) {
                            // If still fails, try without attributeValue include
                            if (attributesError?.code === 'P2022' || attributesError?.message?.includes('attribute_values.colors') || attributesError?.message?.includes('does not exist')) {
                                console.warn('⚠️ [PRODUCTS SLUG SERVICE] attribute_values.colors column not found, fetching without attributeValue:', attributesError.message);
                                const baseIncludeWithoutAttributeValue = {
                                    ...baseInclude,
                                    variants: {
                                        ...baseInclude.variants,
                                        include: {
                                            options: true
                                        }
                                    }
                                };
                                // Try to include productAttributes even in fallback
                                try {
                                    product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findFirst({
                                        where: {
                                            translations: {
                                                some: {
                                                    slug,
                                                    locale: lang
                                                }
                                            },
                                            published: true,
                                            deletedAt: null
                                        },
                                        include: {
                                            ...baseIncludeWithoutAttributeValue,
                                            productAttributes: {
                                                include: {
                                                    attribute: {
                                                        include: {
                                                            translations: true,
                                                            values: {
                                                                include: {
                                                                    translations: true
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    });
                                } catch (productAttrError) {
                                    // If productAttributes also fails, retry without it
                                    if (productAttrError?.code === 'P2021' || productAttrError?.message?.includes('product_attributes')) {
                                        product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findFirst({
                                            where: {
                                                translations: {
                                                    some: {
                                                        slug,
                                                        locale: lang
                                                    }
                                                },
                                                published: true,
                                                deletedAt: null
                                            },
                                            include: baseIncludeWithoutAttributeValue
                                        });
                                    } else {
                                        throw productAttrError;
                                    }
                                }
                            } else {
                                throw attributesError;
                            }
                        }
                    } else if (retryError?.code === 'P2022' || retryError?.message?.includes('attribute_values.colors') || retryError?.message?.includes('does not exist')) {
                        // If attribute_values.colors column doesn't exist, retry without attributeValue include
                        console.warn('⚠️ [PRODUCTS SLUG SERVICE] attribute_values.colors column not found, fetching without attributeValue:', retryError.message);
                        const baseIncludeWithoutAttributeValue = {
                            ...baseInclude,
                            variants: {
                                ...baseInclude.variants,
                                include: {
                                    options: true
                                }
                            }
                        };
                        // Try to include productAttributes even in fallback
                        try {
                            product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findFirst({
                                where: {
                                    translations: {
                                        some: {
                                            slug,
                                            locale: lang
                                        }
                                    },
                                    published: true,
                                    deletedAt: null
                                },
                                include: {
                                    ...baseIncludeWithoutAttributeValue,
                                    productAttributes: {
                                        include: {
                                            attribute: {
                                                include: {
                                                    translations: true,
                                                    values: {
                                                        include: {
                                                            translations: true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        } catch (productAttrError) {
                            // If productAttributes also fails, retry without it
                            if (productAttrError?.code === 'P2021' || productAttrError?.message?.includes('product_attributes')) {
                                product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findFirst({
                                    where: {
                                        translations: {
                                            some: {
                                                slug,
                                                locale: lang
                                            }
                                        },
                                        published: true,
                                        deletedAt: null
                                    },
                                    include: baseIncludeWithoutAttributeValue
                                });
                            } else {
                                throw productAttrError;
                            }
                        }
                    } else {
                        throw retryError;
                    }
                }
            } else if (error?.message?.includes('product_variants.attributes') || error?.message?.includes('attributes') && error?.message?.includes('does not exist')) {
                // If product_variants.attributes column doesn't exist, try to create it and retry
                console.warn('⚠️ [PRODUCTS SLUG SERVICE] product_variants.attributes column not found, attempting to create it...');
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$db$2d$ensure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureProductVariantAttributesColumn"])();
                    // Retry the query after creating the column
                    product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findFirst({
                        where: {
                            translations: {
                                some: {
                                    slug,
                                    locale: lang
                                }
                            },
                            published: true,
                            deletedAt: null
                        },
                        include: baseInclude
                    });
                } catch (attributesError) {
                    // If still fails, try without attributeValue include
                    if (attributesError?.code === 'P2022' || attributesError?.message?.includes('attribute_values.colors') || attributesError?.message?.includes('does not exist')) {
                        console.warn('⚠️ [PRODUCTS SLUG SERVICE] attribute_values.colors column not found, fetching without attributeValue:', attributesError.message);
                        const baseIncludeWithoutAttributeValue = {
                            ...baseInclude,
                            variants: {
                                ...baseInclude.variants,
                                include: {
                                    options: true
                                }
                            }
                        };
                        // Try to include productAttributes even in fallback
                        try {
                            product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findFirst({
                                where: {
                                    translations: {
                                        some: {
                                            slug,
                                            locale: lang
                                        }
                                    },
                                    published: true,
                                    deletedAt: null
                                },
                                include: {
                                    ...baseIncludeWithoutAttributeValue,
                                    productAttributes: {
                                        include: {
                                            attribute: {
                                                include: {
                                                    translations: true,
                                                    values: {
                                                        include: {
                                                            translations: true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        } catch (productAttrError) {
                            // If productAttributes also fails, retry without it
                            if (productAttrError?.code === 'P2021' || productAttrError?.message?.includes('product_attributes')) {
                                product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findFirst({
                                    where: {
                                        translations: {
                                            some: {
                                                slug,
                                                locale: lang
                                            }
                                        },
                                        published: true,
                                        deletedAt: null
                                    },
                                    include: baseIncludeWithoutAttributeValue
                                });
                            } else {
                                throw productAttrError;
                            }
                        }
                    } else {
                        throw attributesError;
                    }
                }
            } else if (error?.code === 'P2022' || error?.message?.includes('attribute_values.colors') || error?.message?.includes('does not exist')) {
                // If attribute_values.colors column doesn't exist, retry without attributeValue include
                console.warn('⚠️ [PRODUCTS SLUG SERVICE] attribute_values.colors column not found, fetching without attributeValue:', error.message);
                const baseIncludeWithoutAttributeValue = {
                    ...baseInclude,
                    variants: {
                        ...baseInclude.variants,
                        include: {
                            options: true
                        }
                    }
                };
                try {
                    product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findFirst({
                        where: {
                            translations: {
                                some: {
                                    slug,
                                    locale: lang
                                }
                            },
                            published: true,
                            deletedAt: null
                        },
                        include: {
                            ...baseIncludeWithoutAttributeValue,
                            productAttributes: {
                                include: {
                                    attribute: {
                                        include: {
                                            translations: true,
                                            values: {
                                                include: {
                                                    translations: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                } catch (retryError) {
                    // If productAttributes also fails, try without it
                    if (retryError?.code === 'P2021' || retryError?.message?.includes('product_attributes')) {
                        product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findFirst({
                            where: {
                                translations: {
                                    some: {
                                        slug,
                                        locale: lang
                                    }
                                },
                                published: true,
                                deletedAt: null
                            },
                            include: baseIncludeWithoutAttributeValue
                        });
                    } else {
                        throw retryError;
                    }
                }
            } else {
                // Re-throw if it's a different error
                throw error;
            }
        }
        if (!product) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Product not found",
                detail: `Product with slug '${slug}' does not exist or is not published`
            };
        }
        // Безопасное получение translation с проверкой на существование массива
        const translations = Array.isArray(product.translations) ? product.translations : [];
        const translation = translations.find((t)=>t.locale === lang) || translations[0] || null;
        // Безопасное получение brand translation
        const brandTranslations = product.brand && Array.isArray(product.brand.translations) ? product.brand.translations : [];
        const brandTranslation = brandTranslations.length > 0 ? brandTranslations.find((t)=>t.locale === lang) || brandTranslations[0] : null;
        // Get all discount settings
        const discountSettings = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].settings.findMany({
            where: {
                key: {
                    in: [
                        "globalDiscount",
                        "categoryDiscounts",
                        "brandDiscounts"
                    ]
                }
            }
        });
        const globalDiscountSetting = discountSettings.find((s)=>s.key === "globalDiscount");
        const globalDiscount = Number(globalDiscountSetting?.value) || 0;
        const categoryDiscountsSetting = discountSettings.find((s)=>s.key === "categoryDiscounts");
        const categoryDiscounts = categoryDiscountsSetting ? categoryDiscountsSetting.value || {} : {};
        const brandDiscountsSetting = discountSettings.find((s)=>s.key === "brandDiscounts");
        const brandDiscounts = brandDiscountsSetting ? brandDiscountsSetting.value || {} : {};
        const productDiscount = product.discountPercent || 0;
        // Calculate actual discount with priority: productDiscount > categoryDiscount > brandDiscount > globalDiscount
        let actualDiscount = 0;
        if (productDiscount > 0) {
            actualDiscount = productDiscount;
        } else {
            // Check category discounts
            const primaryCategoryId = product.primaryCategoryId;
            if (primaryCategoryId && categoryDiscounts[primaryCategoryId]) {
                actualDiscount = categoryDiscounts[primaryCategoryId];
            } else {
                // Check brand discounts
                const brandId = product.brandId;
                if (brandId && brandDiscounts[brandId]) {
                    actualDiscount = brandDiscounts[brandId];
                } else if (globalDiscount > 0) {
                    actualDiscount = globalDiscount;
                }
            }
        }
        return {
            id: product.id,
            slug: translation?.slug || "",
            title: translation?.title || "",
            subtitle: translation?.subtitle || null,
            description: translation?.descriptionHtml || null,
            brand: product.brand ? {
                id: product.brand.id,
                slug: product.brand.slug,
                name: brandTranslation?.name || "",
                logo: product.brand.logoUrl
            } : null,
            categories: Array.isArray(product.categories) ? product.categories.map((cat)=>{
                const catTranslations = Array.isArray(cat.translations) ? cat.translations : [];
                const catTranslation = catTranslations.find((t)=>t.locale === lang) || catTranslations[0] || null;
                return {
                    id: cat.id,
                    slug: catTranslation?.slug || "",
                    title: catTranslation?.title || ""
                };
            }) : [],
            media: (()=>{
                // Use unified image utilities for consistent processing
                if (!Array.isArray(product.media)) {
                    console.log('📸 [PRODUCTS SLUG SERVICE] Product media is not an array, returning empty array');
                    return [];
                }
                // Collect all variant images for separation
                const variantImages = [];
                if (Array.isArray(product.variants) && product.variants.length > 0) {
                    product.variants.forEach((variant)=>{
                        if (variant.imageUrl) {
                            // Use smartSplitUrls to handle comma-separated and base64 images
                            const urls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["smartSplitUrls"])(variant.imageUrl);
                            variantImages.push(...urls);
                        }
                    });
                }
                // Separate main images from variant images using unified utility
                const { main } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["separateMainAndVariantImages"])(product.media, variantImages);
                // Clean and validate final main images
                const cleanedMain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cleanImageUrls"])(main);
                console.log('📸 [PRODUCTS SLUG SERVICE] Main media images count (after cleanup):', cleanedMain.length);
                console.log('📸 [PRODUCTS SLUG SERVICE] Variant images excluded:', variantImages.length);
                if (cleanedMain.length > 0) {
                    console.log('📸 [PRODUCTS SLUG SERVICE] Main media (first 3):', cleanedMain.slice(0, 3).map((img)=>img.substring(0, 50)));
                }
                return cleanedMain;
            })(),
            labels: (()=>{
                // Map existing labels
                const existingLabels = Array.isArray(product.labels) ? product.labels.map((label)=>({
                        id: label.id,
                        type: label.type,
                        value: label.value,
                        position: label.position,
                        color: label.color
                    })) : [];
                // Check if all variants are out of stock
                const variants = Array.isArray(product.variants) ? product.variants : [];
                const isOutOfStock = variants.length === 0 || variants.every((v)=>(v.stock || 0) <= 0);
                // If out of stock, add "Out of Stock" label
                if (isOutOfStock) {
                    // Check if "Out of Stock" label already exists
                    const outOfStockText = getOutOfStockLabel(lang);
                    const hasOutOfStockLabel = existingLabels.some((label)=>label.value.toLowerCase() === outOfStockText.toLowerCase() || label.value.toLowerCase().includes('out of stock') || label.value.toLowerCase().includes('արտադրված') || label.value.toLowerCase().includes('нет в наличии') || label.value.toLowerCase().includes('არ არის მარაგში'));
                    if (!hasOutOfStockLabel) {
                        // Check if top-left position is available, otherwise use top-right
                        const topLeftOccupied = existingLabels.some((l)=>l.position === 'top-left');
                        const position = topLeftOccupied ? 'top-right' : 'top-left';
                        existingLabels.push({
                            id: `out-of-stock-${product.id}`,
                            type: 'text',
                            value: outOfStockText,
                            position: position,
                            color: '#6B7280'
                        });
                        console.log(`🏷️ [PRODUCTS SLUG SERVICE] Added "Out of Stock" label to product ${product.id} (${lang})`);
                    }
                }
                return existingLabels;
            })(),
            variants: Array.isArray(product.variants) ? product.variants.sort((a, b)=>a.price - b.price).map((variant)=>{
                const originalPrice = variant.price;
                let finalPrice = originalPrice;
                let discountPrice = null;
                if (actualDiscount > 0 && originalPrice > 0) {
                    discountPrice = originalPrice;
                    finalPrice = originalPrice * (1 - actualDiscount / 100);
                }
                // Process and clean variant imageUrl
                let variantImageUrl = null;
                if (variant.imageUrl) {
                    // Use smartSplitUrls to handle comma-separated URLs
                    const urls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["smartSplitUrls"])(variant.imageUrl);
                    // Process and validate each URL
                    const processedUrls = urls.map((url)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processImageUrl"])(url)).filter((url)=>url !== null);
                    // Use first valid URL, or join if multiple (comma-separated)
                    variantImageUrl = processedUrls.length > 0 ? processedUrls.join(',') : null;
                }
                // Log variant image for verification
                if (variantImageUrl) {
                    console.log(`📸 [PRODUCTS SLUG SERVICE] Variant ${variant.id} (SKU: ${variant.sku}) has imageUrl:`, variantImageUrl.substring(0, 50) + (variantImageUrl.length > 50 ? '...' : ''));
                }
                return {
                    id: variant.id,
                    sku: variant.sku || "",
                    price: finalPrice,
                    originalPrice: discountPrice || variant.compareAtPrice || null,
                    compareAtPrice: variant.compareAtPrice || null,
                    globalDiscount: globalDiscount > 0 ? globalDiscount : null,
                    productDiscount: productDiscount > 0 ? productDiscount : null,
                    stock: variant.stock,
                    imageUrl: variantImageUrl,
                    options: Array.isArray(variant.options) ? variant.options.map((opt)=>{
                        // Support both new format (AttributeValue) and old format (attributeKey/value)
                        if (opt.attributeValue) {
                            // New format: use AttributeValue
                            const attrValue = opt.attributeValue;
                            const attr = attrValue.attribute;
                            const translation = attrValue.translations?.find((t)=>t.locale === lang) || attrValue.translations?.[0];
                            return {
                                attribute: attr?.key || "",
                                value: translation?.label || attrValue.value || "",
                                key: attr?.key || "",
                                valueId: attrValue.id,
                                attributeId: attr?.id
                            };
                        } else {
                            // Old format: use attributeKey/value
                            return {
                                attribute: opt.attributeKey || "",
                                value: opt.value || "",
                                key: opt.attributeKey || ""
                            };
                        }
                    }) : [],
                    available: variant.stock > 0
                };
            }) : [],
            globalDiscount: globalDiscount > 0 ? globalDiscount : null,
            productDiscount: productDiscount > 0 ? productDiscount : null,
            seo: {
                title: translation?.seoTitle || translation?.title,
                description: translation?.seoDescription || null
            },
            published: product.published,
            publishedAt: product.publishedAt,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            productAttributes: (()=>{
                const productAttrs = product.productAttributes;
                console.log('📋 [PRODUCTS SLUG SERVICE] Raw productAttributes from DB:', productAttrs);
                console.log('📋 [PRODUCTS SLUG SERVICE] productAttributes is array?', Array.isArray(productAttrs));
                console.log('📋 [PRODUCTS SLUG SERVICE] productAttributes length:', productAttrs?.length || 0);
                if (Array.isArray(productAttrs) && productAttrs.length > 0) {
                    const mapped = productAttrs.map((pa)=>{
                        const attr = pa.attribute;
                        const attrTranslation = attr.translations?.find((t)=>t.locale === lang) || attr.translations?.[0];
                        return {
                            id: pa.id,
                            attribute: {
                                id: attr.id,
                                key: attr.key,
                                name: attrTranslation?.name || attr.key,
                                values: Array.isArray(attr.values) ? attr.values.map((val)=>{
                                    const valTranslation = val.translations?.find((t)=>t.locale === lang) || val.translations?.[0];
                                    return {
                                        id: val.id,
                                        value: val.value,
                                        label: valTranslation?.label || val.value,
                                        imageUrl: val.imageUrl || null,
                                        colors: val.colors || null
                                    };
                                }) : []
                            }
                        };
                    });
                    console.log('📋 [PRODUCTS SLUG SERVICE] Mapped productAttributes:', mapped.length, 'attributes');
                    return mapped;
                }
                console.log('📋 [PRODUCTS SLUG SERVICE] No productAttributes, returning empty array');
                return [];
            })()
        };
    }
}
const productsSlugService = new ProductsSlugService();
}),
"[project]/apps/web/lib/services/products.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Products Service - Combined service that delegates to specialized services
 * This file combines all product-related services for backward compatibility
 */ __turbopack_context__.s([
    "productsService",
    ()=>productsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$find$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/products-find.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$filters$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/products-filters.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$slug$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/products-slug.service.ts [app-route] (ecmascript)");
;
;
;
class ProductsService {
    // Delegate to specialized services
    // Find methods
    findAll = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$find$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productsFindService"].findAll.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$find$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productsFindService"]);
    // Filters methods
    getFilters = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$filters$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productsFiltersService"].getFilters.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$filters$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productsFiltersService"]);
    getPriceRange = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$filters$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productsFiltersService"].getPriceRange.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$filters$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productsFiltersService"]);
    // Slug methods
    findBySlug = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$slug$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productsSlugService"].findBySlug.bind(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2d$slug$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productsSlugService"]);
}
const productsService = new ProductsService();
}),
"[project]/apps/web/app/api/v1/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/products.service.ts [app-route] (ecmascript)");
;
;
async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const filters = {
            category: searchParams.get("category") || undefined,
            search: searchParams.get("search") || undefined,
            filter: searchParams.get("filter") || searchParams.get("filters") || undefined,
            minPrice: searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")) : undefined,
            maxPrice: searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")) : undefined,
            colors: searchParams.get("colors") || undefined,
            sizes: searchParams.get("sizes") || undefined,
            brand: searchParams.get("brand") || undefined,
            sort: searchParams.get("sort") || "createdAt",
            page: searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
            limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")) : 24,
            lang: searchParams.get("lang") || "en"
        };
        console.log('🔍 [PRODUCTS API] Filters received:', filters);
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$products$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productsService"].findAll(filters);
        console.log('✅ [PRODUCTS API] Result:', {
            dataLength: result.data?.length || 0,
            total: result.meta?.total || 0,
            page: result.meta?.page || 0,
            totalPages: result.meta?.totalPages || 0
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        console.error("❌ [PRODUCTS] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            type: error.type || "https://api.shop.am/problems/internal-error",
            title: error.title || "Internal Server Error",
            status: error.status || 500,
            detail: error.detail || error.message || "An error occurred",
            instance: req.url
        }, {
            status: error.status || 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__777a662c._.js.map