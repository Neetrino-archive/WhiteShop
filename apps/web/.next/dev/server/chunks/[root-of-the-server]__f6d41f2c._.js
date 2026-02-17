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
"[project]/apps/web/lib/services/categories.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categoriesService",
    ()=>categoriesService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
class CategoriesService {
    /**
   * Get category tree
   */ async getTree(lang = "en") {
        const categories = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findMany({
            where: {
                published: true,
                deletedAt: null
            },
            include: {
                translations: true,
                children: {
                    include: {
                        translations: true
                    }
                }
            },
            orderBy: {
                position: "asc"
            }
        });
        // Build tree structure
        const categoryMap = new Map();
        const rootCategories = [];
        categories.forEach((category)=>{
            const translation = category.translations.find((t)=>t.locale === lang) || category.translations[0];
            if (!translation) return;
            const categoryData = {
                id: category.id,
                slug: translation.slug,
                title: translation.title,
                fullPath: translation.fullPath,
                children: []
            };
            categoryMap.set(category.id, categoryData);
            if (!category.parentId) {
                rootCategories.push(categoryData);
            }
        });
        // Build parent-child relationships
        categories.forEach((category)=>{
            if (category.parentId) {
                const parent = categoryMap.get(category.parentId);
                const child = categoryMap.get(category.id);
                if (parent && child) {
                    parent.children.push(child);
                }
            }
        });
        return {
            data: rootCategories
        };
    }
    /**
   * Get category by slug
   */ async findBySlug(slug, lang = "en") {
        const category = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findFirst({
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
                translations: true,
                parent: {
                    include: {
                        translations: true
                    }
                }
            }
        });
        if (!category) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Category not found",
                detail: `Category with slug '${slug}' does not exist or is not published`
            };
        }
        const translation = category.translations.find((t)=>t.locale === lang) || category.translations[0];
        const parentTranslation = category.parent ? category.parent.translations.find((t)=>t.locale === lang) || category.parent.translations[0] : null;
        return {
            id: category.id,
            slug: translation?.slug || "",
            title: translation?.title || "",
            description: translation?.description || null,
            fullPath: translation?.fullPath || "",
            seo: {
                title: translation?.seoTitle || translation?.title,
                description: translation?.seoDescription || null
            },
            parent: category.parent ? {
                id: category.parent.id,
                slug: parentTranslation?.slug || "",
                title: parentTranslation?.title || ""
            } : null
        };
    }
}
const categoriesService = new CategoriesService();
}),
"[project]/apps/web/app/api/v1/categories/tree/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$categories$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/categories.service.ts [app-route] (ecmascript)");
;
;
async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const lang = searchParams.get("lang") || "en";
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$categories$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["categoriesService"].getTree(lang);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        console.error("❌ [CATEGORIES] Error:", error);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__f6d41f2c._.js.map