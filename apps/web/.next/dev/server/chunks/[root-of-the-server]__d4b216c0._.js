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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

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
"[project]/apps/web/lib/services/auth.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authService",
    ()=>authService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
;
;
class AuthService {
    /**
   * Register new user
   */ async register(data) {
        console.log("🔐 [AUTH] Registration attempt:", {
            email: data.email || "not provided",
            phone: data.phone || "not provided",
            hasFirstName: !!data.firstName,
            hasLastName: !!data.lastName
        });
        if (!data.email && !data.phone) {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/validation-error",
                title: "Validation failed",
                detail: "Either email or phone is required"
            };
        }
        if (!data.password || data.password.length < 6) {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/validation-error",
                title: "Validation failed",
                detail: "Password must be at least 6 characters"
            };
        }
        // Check if user already exists
        const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findFirst({
            where: {
                OR: [
                    ...data.email ? [
                        {
                            email: data.email
                        }
                    ] : [],
                    ...data.phone ? [
                        {
                            phone: data.phone
                        }
                    ] : []
                ],
                deletedAt: null
            },
            select: {
                id: true
            }
        });
        if (existingUser) {
            console.log("❌ [AUTH] User already exists:", existingUser.email || existingUser.phone);
            throw {
                status: 409,
                type: "https://api.shop.am/problems/conflict",
                title: "User already exists",
                detail: "User with this email or phone already exists"
            };
        }
        // Hash password
        console.log("🔒 [AUTH] Hashing password...");
        const passwordHash = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hash"](data.password, 10);
        console.log("✅ [AUTH] Password hashed successfully");
        // Create user
        console.log("💾 [AUTH] Creating user in database...");
        let user;
        try {
            user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.create({
                data: {
                    email: data.email || null,
                    phone: data.phone || null,
                    passwordHash,
                    firstName: data.firstName || null,
                    lastName: data.lastName || null,
                    locale: "en",
                    roles: [
                        "customer"
                    ]
                },
                select: {
                    id: true,
                    email: true,
                    phone: true,
                    firstName: true,
                    lastName: true,
                    roles: true
                }
            });
            console.log("✅ [AUTH] User created successfully");
        } catch (error) {
            console.error("❌ [AUTH] User creation failed:", error);
            if (error.code === "P2002") {
                // Prisma unique constraint error
                throw {
                    status: 409,
                    type: "https://api.shop.am/problems/conflict",
                    title: "User already exists",
                    detail: "User with this email or phone already exists"
                };
            }
            throw error;
        }
        // Generate JWT token
        if (!process.env.JWT_SECRET) {
            console.error("❌ [AUTH] JWT_SECRET is not set!");
            throw {
                status: 500,
                type: "https://api.shop.am/problems/internal-error",
                title: "Internal Server Error",
                detail: "Server configuration error"
            };
        }
        console.log("🎫 [AUTH] Generating JWT token...");
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sign"]({
            userId: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d"
        });
        console.log("✅ [AUTH] JWT token generated");
        return {
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles
            },
            token
        };
    }
    /**
   * Login user
   */ async login(data) {
        console.log("🔐 [AUTH] Login attempt:", {
            email: data.email || "not provided",
            phone: data.phone || "not provided"
        });
        if (!data.email && !data.phone) {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/validation-error",
                title: "Validation failed",
                detail: "Either email or phone is required"
            };
        }
        if (!data.password) {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/validation-error",
                title: "Validation failed",
                detail: "Password is required"
            };
        }
        // Find user
        console.log("🔍 [AUTH] Searching for user in database...");
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findFirst({
            where: {
                OR: [
                    ...data.email ? [
                        {
                            email: data.email
                        }
                    ] : [],
                    ...data.phone ? [
                        {
                            phone: data.phone
                        }
                    ] : []
                ],
                deletedAt: null
            },
            select: {
                id: true,
                email: true,
                phone: true,
                firstName: true,
                lastName: true,
                passwordHash: true,
                roles: true,
                blocked: true
            }
        });
        if (!user || !user.passwordHash) {
            console.log("❌ [AUTH] User not found or no password set");
            throw {
                status: 401,
                type: "https://api.shop.am/problems/unauthorized",
                title: "Invalid credentials",
                detail: "Invalid email/phone or password"
            };
        }
        console.log("✅ [AUTH] User found:", user.id);
        // Check password
        console.log("🔒 [AUTH] Verifying password...");
        const isValidPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["compare"](data.password, user.passwordHash);
        if (!isValidPassword) {
            console.log("❌ [AUTH] Invalid password");
            throw {
                status: 401,
                type: "https://api.shop.am/problems/unauthorized",
                title: "Invalid credentials",
                detail: "Invalid email/phone or password"
            };
        }
        if (user.blocked) {
            console.log("❌ [AUTH] Account is blocked");
            throw {
                status: 403,
                type: "https://api.shop.am/problems/forbidden",
                title: "Account blocked",
                detail: "Your account has been blocked"
            };
        }
        // Generate JWT token
        if (!process.env.JWT_SECRET) {
            throw {
                status: 500,
                type: "https://api.shop.am/problems/internal-error",
                title: "Internal Server Error",
                detail: "Server configuration error"
            };
        }
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sign"]({
            userId: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d"
        });
        console.log("✅ [AUTH] Login successful, token generated");
        return {
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles
            },
            token
        };
    }
}
const authService = new AuthService();
}),
"[project]/apps/web/app/api/v1/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/auth.service.ts [app-route] (ecmascript)");
;
;
async function POST(req) {
    try {
        const data = await req.json();
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authService"].login(data);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        console.error("❌ [AUTH] Login error:", error);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__d4b216c0._.js.map