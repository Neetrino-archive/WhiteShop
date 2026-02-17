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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

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
"[project]/apps/web/lib/middleware/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authenticateToken",
    ()=>authenticateToken,
    "requireAdmin",
    ()=>requireAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
;
async function authenticateToken(request) {
    try {
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.split(" ")[1]; // Bearer TOKEN
        if (!token) {
            return null;
        }
        if (!process.env.JWT_SECRET) {
            console.error("❌ [AUTH] JWT_SECRET is not set!");
            return null;
        }
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verify"](token, process.env.JWT_SECRET);
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findUnique({
            where: {
                id: decoded.userId
            },
            select: {
                id: true,
                email: true,
                phone: true,
                locale: true,
                roles: true,
                blocked: true,
                deletedAt: true
            }
        });
        if (!user || user.blocked || user.deletedAt) {
            return null;
        }
        return {
            id: user.id,
            email: user.email,
            phone: user.phone,
            locale: user.locale,
            roles: user.roles
        };
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JsonWebTokenError"] || error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TokenExpiredError"]) {
            return null;
        }
        throw error;
    }
}
function requireAdmin(user) {
    if (!user) {
        return false;
    }
    return user.roles.includes("admin");
}
}),
"[project]/apps/web/lib/services/users.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usersService",
    ()=>usersService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
;
class UsersService {
    /**
   * Get user profile
   */ async getProfile(userId) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true,
                phone: true,
                firstName: true,
                lastName: true,
                locale: true,
                roles: true,
                addresses: true
            }
        });
        if (!user) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "User not found"
            };
        }
        return {
            id: user.id,
            email: user.email,
            phone: user.phone,
            firstName: user.firstName,
            lastName: user.lastName,
            locale: user.locale,
            roles: user.roles,
            addresses: user.addresses
        };
    }
    /**
   * Update user profile
   */ async updateProfile(userId, data) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.update({
            where: {
                id: userId
            },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                locale: data.locale
            },
            select: {
                id: true,
                email: true,
                phone: true,
                firstName: true,
                lastName: true,
                locale: true
            }
        });
        return {
            id: user.id,
            email: user.email,
            phone: user.phone,
            firstName: user.firstName,
            lastName: user.lastName,
            locale: user.locale
        };
    }
    /**
   * Change password
   */ async changePassword(userId, oldPassword, newPassword) {
        // Validate input parameters
        if (!oldPassword || typeof oldPassword !== 'string' || oldPassword.trim() === '') {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/validation-error",
                title: "Validation Error",
                detail: "Old password is required and must be a non-empty string"
            };
        }
        if (!newPassword || typeof newPassword !== 'string' || newPassword.trim() === '') {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/validation-error",
                title: "Validation Error",
                detail: "New password is required and must be a non-empty string"
            };
        }
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                passwordHash: true
            }
        });
        if (!user || !user.passwordHash) {
            throw {
                status: 401,
                type: "https://api.shop.am/problems/unauthorized",
                title: "Invalid credentials",
                detail: "User not found or password not set"
            };
        }
        // Validate that passwordHash is a valid string
        if (typeof user.passwordHash !== 'string' || user.passwordHash.trim() === '') {
            throw {
                status: 500,
                type: "https://api.shop.am/problems/internal-error",
                title: "Internal Server Error",
                detail: "User password hash is invalid"
            };
        }
        try {
            const isValid = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["compare"](oldPassword.trim(), user.passwordHash);
            if (!isValid) {
                throw {
                    status: 401,
                    type: "https://api.shop.am/problems/unauthorized",
                    title: "Invalid password",
                    detail: "The old password is incorrect"
                };
            }
        } catch (bcryptError) {
            // Handle bcrypt errors
            console.error("❌ [USERS SERVICE] bcrypt.compare error:", {
                error: bcryptError,
                message: bcryptError?.message,
                userId,
                hasOldPassword: !!oldPassword,
                hasPasswordHash: !!user.passwordHash
            });
            throw {
                status: 500,
                type: "https://api.shop.am/problems/internal-error",
                title: "Internal Server Error",
                detail: "Failed to verify password"
            };
        }
        try {
            const newPasswordHash = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hash"](newPassword.trim(), 10);
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.update({
                where: {
                    id: userId
                },
                data: {
                    passwordHash: newPasswordHash
                },
                select: {
                    id: true
                }
            });
            return {
                success: true
            };
        } catch (hashError) {
            console.error("❌ [USERS SERVICE] bcrypt.hash error:", {
                error: hashError,
                message: hashError?.message,
                userId
            });
            throw {
                status: 500,
                type: "https://api.shop.am/problems/internal-error",
                title: "Internal Server Error",
                detail: "Failed to hash new password"
            };
        }
    }
    /**
   * Get addresses
   */ async getAddresses(userId) {
        const addresses = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].address.findMany({
            where: {
                userId
            },
            orderBy: {
                isDefault: "desc"
            }
        });
        return {
            data: addresses
        };
    }
    /**
   * Add address
   */ async addAddress(userId, data) {
        // If this is the first address, set it as default
        const existingAddresses = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].address.findMany({
            where: {
                userId
            }
        });
        const address = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].address.create({
            data: {
                ...data,
                userId,
                isDefault: existingAddresses.length === 0
            }
        });
        return address;
    }
    /**
   * Update address
   */ async updateAddress(userId, addressId, data) {
        const address = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].address.findFirst({
            where: {
                id: addressId,
                userId
            }
        });
        if (!address) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Address not found"
            };
        }
        return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].address.update({
            where: {
                id: addressId
            },
            data
        });
    }
    /**
   * Delete address
   */ async deleteAddress(userId, addressId) {
        const address = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].address.findFirst({
            where: {
                id: addressId,
                userId
            }
        });
        if (!address) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Address not found"
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].address.delete({
            where: {
                id: addressId
            }
        });
        return null;
    }
    /**
   * Set default address
   */ async setDefaultAddress(userId, addressId) {
        // Unset all other default addresses
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].address.updateMany({
            where: {
                userId,
                isDefault: true
            },
            data: {
                isDefault: false
            }
        });
        // Set this one as default
        return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].address.update({
            where: {
                id: addressId
            },
            data: {
                isDefault: true
            }
        });
    }
    /**
   * Get user dashboard statistics
   */ async getDashboard(userId) {
        // Get all orders for the user
        const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.findMany({
            where: {
                userId
            },
            include: {
                items: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        // Calculate statistics
        const totalOrders = orders.length;
        const pendingOrders = orders.filter((o)=>o.status === "pending").length;
        const completedOrders = orders.filter((o)=>o.status === "completed").length;
        const totalSpent = orders.filter((o)=>o.status === "completed" || o.paymentStatus === "paid").reduce((sum, o)=>sum + o.total, 0);
        // Count addresses
        const addressesCount = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].address.count({
            where: {
                userId
            }
        });
        // Count orders by status
        const ordersByStatus = {};
        orders.forEach((order)=>{
            ordersByStatus[order.status] = (ordersByStatus[order.status] || 0) + 1;
        });
        // Get recent orders (last 5)
        const recentOrders = orders.slice(0, 5).map((order)=>({
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
                currency: order.currency,
                itemsCount: order.items.length,
                createdAt: order.createdAt.toISOString()
            }));
        return {
            stats: {
                totalOrders,
                pendingOrders,
                completedOrders,
                totalSpent,
                addressesCount,
                ordersByStatus
            },
            recentOrders
        };
    }
}
const usersService = new UsersService();
}),
"[project]/apps/web/app/api/v1/users/dashboard/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/middleware/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$users$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/users.service.ts [app-route] (ecmascript)");
;
;
;
async function GET(req) {
    try {
        console.log("📊 [DASHBOARD] Request received");
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authenticateToken"])(req);
        if (!user) {
            console.log("❌ [DASHBOARD] Unauthorized");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                type: "https://api.shop.am/problems/unauthorized",
                title: "Unauthorized",
                status: 401,
                detail: "Authentication token required",
                instance: req.url
            }, {
                status: 401
            });
        }
        console.log(`✅ [DASHBOARD] User authenticated: ${user.id}`);
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$users$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["usersService"].getDashboard(user.id);
        console.log("✅ [DASHBOARD] Dashboard data retrieved successfully");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        console.error("❌ [DASHBOARD] Error:", error);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__da38194d._.js.map