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
"[project]/apps/web/lib/services/cart.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cartService",
    ()=>cartService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
class CartService {
    /**
   * Get or create user's cart
   */ async getCart(userId, locale = "en") {
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
        let cart = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].cart.findFirst({
            where: {
                userId
            },
            include: {
                items: {
                    include: {
                        variant: {
                            include: {
                                product: {
                                    include: {
                                        translations: true
                                    }
                                }
                            }
                        },
                        product: {
                            include: {
                                translations: true
                            }
                        }
                    }
                }
            }
        });
        if (!cart) {
            cart = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].cart.create({
                data: {
                    userId,
                    locale,
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    items: {
                        create: []
                    }
                },
                include: {
                    items: {
                        include: {
                            variant: {
                                include: {
                                    product: {
                                        include: {
                                            translations: true
                                        }
                                    }
                                }
                            },
                            product: {
                                include: {
                                    translations: true
                                }
                            }
                        }
                    }
                }
            });
        }
        // Format items with details
        const itemsWithDetails = await Promise.all(cart.items.map(async (item)=>{
            const product = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findUnique({
                where: {
                    id: item.productId
                },
                include: {
                    translations: true,
                    variants: {
                        where: {
                            id: item.variantId
                        }
                    }
                }
            });
            const variant = product?.variants[0];
            const translation = product?.translations.find((t)=>t.locale === locale) || product?.translations[0];
            let imageUrl = null;
            if (product?.media && Array.isArray(product.media) && product.media.length > 0) {
                const firstMedia = product.media[0];
                if (typeof firstMedia === "string") {
                    imageUrl = firstMedia;
                } else if (firstMedia?.url) {
                    imageUrl = firstMedia.url;
                } else if (firstMedia?.src) {
                    imageUrl = firstMedia.src;
                }
            }
            // Calculate discount and original price
            // Always use the latest discount from the product, not the stored priceSnapshot
            const productDiscount = product?.discountPercent || 0;
            let appliedDiscount = 0;
            if (productDiscount > 0) {
                appliedDiscount = productDiscount;
            } else {
                // Check category discounts
                const primaryCategoryId = product?.primaryCategoryId;
                if (primaryCategoryId && categoryDiscounts[primaryCategoryId]) {
                    appliedDiscount = categoryDiscounts[primaryCategoryId];
                } else {
                    // Check brand discounts
                    const brandId = product?.brandId;
                    if (brandId && brandDiscounts[brandId]) {
                        appliedDiscount = brandDiscounts[brandId];
                    } else if (globalDiscount > 0) {
                        appliedDiscount = globalDiscount;
                    }
                }
            }
            // Always calculate the latest price from variant.price with current discount
            // This ensures that if product discount is updated, cart shows the latest price
            const variantOriginalPrice = variant?.price || 0;
            let finalPrice = variantOriginalPrice;
            let originalPrice = null;
            if (appliedDiscount > 0 && variantOriginalPrice > 0) {
                // Calculate discounted price with latest discount
                finalPrice = variantOriginalPrice * (1 - appliedDiscount / 100);
                originalPrice = variantOriginalPrice;
            } else if (variant?.compareAtPrice && variant.compareAtPrice > variantOriginalPrice) {
                originalPrice = Number(variant.compareAtPrice);
            }
            return {
                id: item.id,
                variant: {
                    id: variant?.id || item.variantId,
                    sku: variant?.sku || "",
                    stock: variant?.stock || 0,
                    product: {
                        id: product?.id || "",
                        title: translation?.title || "",
                        slug: translation?.slug || "",
                        image: imageUrl
                    }
                },
                quantity: item.quantity,
                price: finalPrice,
                originalPrice: originalPrice,
                total: finalPrice * item.quantity
            };
        }));
        const subtotal = itemsWithDetails.reduce((sum, item)=>sum + item.total, 0);
        return {
            cart: {
                id: cart.id,
                items: itemsWithDetails,
                totals: {
                    subtotal,
                    discount: 0,
                    shipping: 0,
                    tax: 0,
                    total: subtotal,
                    currency: "AMD"
                },
                itemsCount: itemsWithDetails.reduce((sum, item)=>sum + item.quantity, 0)
            }
        };
    }
    /**
   * Add item to cart
   */ async addItem(userId, data, locale = "en") {
        const { variantId, productId, quantity = 1 } = data;
        if (!variantId || !productId) {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/validation-error",
                title: "Validation failed",
                detail: "variantId and productId are required"
            };
        }
        // Get or create cart
        let cart = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].cart.findFirst({
            where: {
                userId
            },
            include: {
                items: true
            }
        });
        if (!cart) {
            cart = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].cart.create({
                data: {
                    userId,
                    locale,
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    items: {
                        create: []
                    }
                },
                include: {
                    items: true
                }
            });
        }
        // Get variant
        const variant = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].productVariant.findUnique({
            where: {
                id: variantId
            },
            include: {
                product: true
            }
        });
        if (!variant || !variant.published || variant.productId !== productId) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Variant not found"
            };
        }
        // Check if item already exists
        const existingItem = cart.items.find((item)=>item.variantId === variantId);
        // Calculate total quantity that will be in cart after adding
        const totalQuantity = existingItem ? existingItem.quantity + quantity : quantity;
        // Check if total quantity exceeds available stock
        if (totalQuantity > variant.stock) {
            console.log('🚫 [CART SERVICE] Stock limit exceeded:', {
                variantId,
                currentInCart: existingItem?.quantity || 0,
                requestedQuantity: quantity,
                totalQuantity,
                availableStock: variant.stock
            });
            throw {
                status: 422,
                type: "https://api.shop.am/problems/validation-error",
                title: "Insufficient stock",
                detail: `No more stock available. Maximum available: ${variant.stock}, already in cart: ${existingItem?.quantity || 0}, requested: ${quantity}`
            };
        }
        let item;
        if (existingItem) {
            console.log('✅ [CART SERVICE] Updating existing cart item:', {
                itemId: existingItem.id,
                oldQuantity: existingItem.quantity,
                newQuantity: totalQuantity,
                variantStock: variant.stock
            });
            item = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].cartItem.update({
                where: {
                    id: existingItem.id
                },
                data: {
                    quantity: totalQuantity
                }
            });
        } else {
            console.log('✅ [CART SERVICE] Creating new cart item:', {
                variantId,
                quantity,
                variantStock: variant.stock
            });
            item = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].cartItem.create({
                data: {
                    cartId: cart.id,
                    variantId,
                    productId,
                    quantity,
                    priceSnapshot: variant.price
                }
            });
        }
        return {
            item: {
                id: item.id,
                variantId: variantId,
                quantity: item.quantity,
                price: Number(item.priceSnapshot)
            }
        };
    }
    /**
   * Update cart item
   */ async updateItem(userId, itemId, quantity) {
        if (!quantity || quantity < 1) {
            throw {
                status: 400,
                type: "https://api.shop.am/problems/validation-error",
                title: "Validation failed",
                detail: "quantity must be at least 1"
            };
        }
        const cart = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].cart.findFirst({
            where: {
                userId,
                items: {
                    some: {
                        id: itemId
                    }
                }
            },
            include: {
                items: {
                    where: {
                        id: itemId
                    }
                }
            }
        });
        if (!cart || cart.items.length === 0) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Cart item not found"
            };
        }
        const item = cart.items[0];
        const variant = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].productVariant.findUnique({
            where: {
                id: item.variantId
            }
        });
        if (!variant || variant.stock < quantity) {
            throw {
                status: 422,
                type: "https://api.shop.am/problems/validation-error",
                title: "Insufficient stock",
                detail: `Requested quantity (${quantity}) exceeds available stock (${variant?.stock || 0})`
            };
        }
        const updatedItem = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].cartItem.update({
            where: {
                id: itemId
            },
            data: {
                quantity
            }
        });
        return {
            item: {
                id: updatedItem.id,
                quantity: updatedItem.quantity
            }
        };
    }
    /**
   * Remove item from cart
   */ async removeItem(userId, itemId) {
        const cart = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].cart.findFirst({
            where: {
                userId,
                items: {
                    some: {
                        id: itemId
                    }
                }
            }
        });
        if (!cart) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Cart item not found"
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].cartItem.delete({
            where: {
                id: itemId
            }
        });
        return null;
    }
}
const cartService = new CartService();
}),
"[project]/apps/web/app/api/v1/cart/items/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/middleware/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$cart$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/cart.service.ts [app-route] (ecmascript)");
;
;
;
async function PATCH(req, { params }) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authenticateToken"])(req);
        if (!user) {
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
        const { id } = await params;
        const data = await req.json();
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$cart$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cartService"].updateItem(user.id, id, data.quantity);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        console.error("❌ [CART] Error:", error);
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
async function DELETE(req, { params }) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authenticateToken"])(req);
        if (!user) {
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
        const { id } = await params;
        await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$cart$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cartService"].removeItem(user.id, id);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
            status: 204
        });
    } catch (error) {
        console.error("❌ [CART] Error:", error);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__07774e1f._.js.map