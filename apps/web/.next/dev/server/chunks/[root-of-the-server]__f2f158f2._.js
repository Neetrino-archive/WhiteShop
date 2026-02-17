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
"[project]/apps/web/lib/services/orders.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ordersService",
    ()=>ordersService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/client.ts [app-route] (ecmascript)");
;
function generateOrderNumber() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const random = String(Math.floor(Math.random() * 10000)).padStart(5, "0");
    return `${year}${month}${day}-${random}`;
}
class OrdersService {
    /**
   * Create order (checkout)
   */ async checkout(data, userId) {
        try {
            const { cartId, items: guestItems, email, phone, shippingMethod = 'pickup', shippingAddress, shippingAmount: providedShippingAmount, paymentMethod = 'idram' } = data;
            // Validate required fields
            if (!email || !phone) {
                throw {
                    status: 400,
                    type: "https://api.shop.am/problems/validation-error",
                    title: "Validation Error",
                    detail: "Email and phone are required"
                };
            }
            // Get cart items - either from user cart or guest items
            let cartItems = [];
            if (userId && cartId && cartId !== 'guest-cart') {
                // Get items from user's cart
                const cart = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].cart.findFirst({
                    where: {
                        id: cartId,
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
                                        },
                                        options: true
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
                if (!cart || cart.items.length === 0) {
                    throw {
                        status: 400,
                        type: "https://api.shop.am/problems/validation-error",
                        title: "Cart is empty",
                        detail: "Cannot checkout with an empty cart"
                    };
                }
                // Format cart items
                console.log('🛒 [ORDERS SERVICE] Processing cart items:', cart.items.map((item)=>({
                        itemId: item.id,
                        variantId: item.variantId,
                        productId: item.productId,
                        quantity: item.quantity,
                        hasVariant: !!item.variant
                    })));
                cartItems = await Promise.all(cart.items.map(async (item)=>{
                    const product = item.product;
                    const variant = item.variant;
                    if (!variant) {
                        console.error('❌ [ORDERS SERVICE] Cart item missing variant:', {
                            itemId: item.id,
                            variantId: item.variantId,
                            productId: item.productId
                        });
                        throw {
                            status: 404,
                            type: "https://api.shop.am/problems/not-found",
                            title: "Variant not found",
                            detail: `Variant ${item.variantId} not found for cart item`
                        };
                    }
                    console.log('✅ [ORDERS SERVICE] Processing cart item:', {
                        itemId: item.id,
                        variantId: variant.id,
                        productId: product.id,
                        quantity: item.quantity,
                        variantStock: variant.stock,
                        variantSku: variant.sku
                    });
                    const translation = product.translations?.[0] || product.translations?.[0];
                    // Get variant title from options
                    const variantTitle = variant.options?.map((opt)=>`${opt.attributeKey}: ${opt.value}`).join(', ') || undefined;
                    // Get image URL
                    let imageUrl;
                    if (product.media && Array.isArray(product.media) && product.media.length > 0) {
                        const firstMedia = product.media[0];
                        if (typeof firstMedia === "string") {
                            imageUrl = firstMedia;
                        } else if (firstMedia?.url) {
                            imageUrl = firstMedia.url;
                        } else if (firstMedia?.src) {
                            imageUrl = firstMedia.src;
                        }
                    }
                    // Check stock availability
                    if (variant.stock < item.quantity) {
                        throw {
                            status: 422,
                            type: "https://api.shop.am/problems/validation-error",
                            title: "Insufficient stock",
                            detail: `Product "${translation?.title || 'Unknown'}" - insufficient stock. Available: ${variant.stock}, Requested: ${item.quantity}`
                        };
                    }
                    const cartItem = {
                        variantId: variant.id,
                        productId: product.id,
                        quantity: item.quantity,
                        price: Number(item.priceSnapshot),
                        productTitle: translation?.title || 'Unknown Product',
                        variantTitle,
                        sku: variant.sku || '',
                        imageUrl
                    };
                    console.log('✅ [ORDERS SERVICE] Cart item formatted:', {
                        variantId: cartItem.variantId,
                        productId: cartItem.productId,
                        quantity: cartItem.quantity,
                        sku: cartItem.sku
                    });
                    return cartItem;
                }));
                console.log('✅ [ORDERS SERVICE] All cart items processed:', cartItems.length);
            } else if (guestItems && Array.isArray(guestItems) && guestItems.length > 0) {
                // Get items from guest checkout
                cartItems = await Promise.all(guestItems.map(async (item)=>{
                    const { productId, variantId, quantity } = item;
                    if (!productId || !variantId || !quantity) {
                        throw {
                            status: 400,
                            type: "https://api.shop.am/problems/validation-error",
                            title: "Validation Error",
                            detail: "Each item must have productId, variantId, and quantity"
                        };
                    }
                    // Get product and variant details
                    const variant = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].productVariant.findUnique({
                        where: {
                            id: variantId
                        },
                        include: {
                            product: {
                                include: {
                                    translations: true
                                }
                            },
                            options: true
                        }
                    });
                    if (!variant || variant.productId !== productId) {
                        throw {
                            status: 404,
                            type: "https://api.shop.am/problems/not-found",
                            title: "Product variant not found",
                            detail: `Variant ${variantId} not found for product ${productId}`
                        };
                    }
                    // Check stock
                    if (variant.stock < quantity) {
                        throw {
                            status: 422,
                            type: "https://api.shop.am/problems/validation-error",
                            title: "Insufficient stock",
                            detail: `Insufficient stock. Available: ${variant.stock}, Requested: ${quantity}`
                        };
                    }
                    const translation = variant.product.translations?.[0] || variant.product.translations?.[0];
                    const variantTitle = variant.options?.map((opt)=>`${opt.attributeKey}: ${opt.value}`).join(', ') || undefined;
                    // Get image URL
                    let imageUrl;
                    if (variant.product.media && Array.isArray(variant.product.media) && variant.product.media.length > 0) {
                        const firstMedia = variant.product.media[0];
                        if (typeof firstMedia === "string") {
                            imageUrl = firstMedia;
                        } else if (firstMedia?.url) {
                            imageUrl = firstMedia.url;
                        } else if (firstMedia?.src) {
                            imageUrl = firstMedia.src;
                        }
                    }
                    return {
                        variantId: variant.id,
                        productId: variant.product.id,
                        quantity,
                        price: Number(variant.price),
                        productTitle: translation?.title || 'Unknown Product',
                        variantTitle,
                        sku: variant.sku || '',
                        imageUrl
                    };
                }));
            } else {
                throw {
                    status: 400,
                    type: "https://api.shop.am/problems/validation-error",
                    title: "Cart is empty",
                    detail: "Cannot checkout with an empty cart"
                };
            }
            if (cartItems.length === 0) {
                throw {
                    status: 400,
                    type: "https://api.shop.am/problems/validation-error",
                    title: "Cart is empty",
                    detail: "Cannot checkout with an empty cart"
                };
            }
            // Calculate totals
            const subtotal = cartItems.reduce((sum, item)=>sum + item.price * item.quantity, 0);
            const discountAmount = 0; // TODO: Implement discount/coupon logic
            // Use provided shipping amount from frontend (calculated from delivery API), or 0 if not provided
            const shippingAmount = providedShippingAmount !== undefined ? Number(providedShippingAmount) : 0;
            const taxAmount = 0; // TODO: Calculate tax if needed
            const total = subtotal - discountAmount + shippingAmount + taxAmount;
            // Generate order number
            const orderNumber = generateOrderNumber();
            // Create order with items in a transaction
            const order = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$transaction(async (tx)=>{
                // Create order
                const newOrder = await tx.order.create({
                    data: {
                        number: orderNumber,
                        userId: userId || null,
                        status: 'pending',
                        paymentStatus: 'pending',
                        fulfillmentStatus: 'unfulfilled',
                        subtotal,
                        discountAmount,
                        shippingAmount,
                        taxAmount,
                        total,
                        currency: 'AMD',
                        customerEmail: email,
                        customerPhone: phone,
                        customerLocale: 'en',
                        shippingMethod,
                        shippingAddress: shippingAddress ? JSON.parse(JSON.stringify(shippingAddress)) : null,
                        billingAddress: shippingAddress ? JSON.parse(JSON.stringify(shippingAddress)) : null,
                        items: {
                            create: cartItems.map((item)=>({
                                    variantId: item.variantId,
                                    productTitle: item.productTitle,
                                    variantTitle: item.variantTitle,
                                    sku: item.sku,
                                    quantity: item.quantity,
                                    price: item.price,
                                    total: item.price * item.quantity,
                                    imageUrl: item.imageUrl
                                }))
                        },
                        events: {
                            create: {
                                type: 'order_created',
                                data: {
                                    source: userId ? 'user' : 'guest',
                                    paymentMethod,
                                    shippingMethod
                                }
                            }
                        }
                    },
                    include: {
                        items: true
                    }
                });
                // Update stock for all variants
                console.log('📦 [ORDERS SERVICE] Updating stock for variants:', cartItems.map((item)=>({
                        variantId: item.variantId,
                        quantity: item.quantity,
                        sku: item.sku
                    })));
                try {
                    for (const item of cartItems){
                        if (!item.variantId) {
                            console.error('❌ [ORDERS SERVICE] Missing variantId for item:', item);
                            throw {
                                status: 400,
                                type: "https://api.shop.am/problems/validation-error",
                                title: "Validation Error",
                                detail: `Missing variantId for item with SKU: ${item.sku}`
                            };
                        }
                        // Get current stock before update for logging
                        const variantBefore = await tx.productVariant.findUnique({
                            where: {
                                id: item.variantId
                            },
                            select: {
                                stock: true,
                                sku: true
                            }
                        });
                        if (!variantBefore) {
                            console.error('❌ [ORDERS SERVICE] Variant not found:', item.variantId);
                            throw {
                                status: 404,
                                type: "https://api.shop.am/problems/not-found",
                                title: "Variant not found",
                                detail: `Variant with id '${item.variantId}' not found`
                            };
                        }
                        console.log(`📦 [ORDERS SERVICE] Updating stock for variant ${item.variantId} (SKU: ${variantBefore.sku}):`, {
                            currentStock: variantBefore.stock,
                            quantityToDecrement: item.quantity,
                            newStock: variantBefore.stock - item.quantity
                        });
                        // Update stock with decrement
                        const updatedVariant = await tx.productVariant.update({
                            where: {
                                id: item.variantId
                            },
                            data: {
                                stock: {
                                    decrement: item.quantity
                                }
                            },
                            select: {
                                stock: true,
                                sku: true
                            }
                        });
                        console.log(`✅ [ORDERS SERVICE] Stock updated for variant ${item.variantId} (SKU: ${updatedVariant.sku}):`, {
                            newStock: updatedVariant.stock,
                            expectedStock: variantBefore.stock - item.quantity,
                            match: updatedVariant.stock === variantBefore.stock - item.quantity
                        });
                        // Verify stock was actually decremented
                        if (updatedVariant.stock !== variantBefore.stock - item.quantity) {
                            console.error('❌ [ORDERS SERVICE] Stock update mismatch!', {
                                variantId: item.variantId,
                                expectedStock: variantBefore.stock - item.quantity,
                                actualStock: updatedVariant.stock,
                                quantity: item.quantity
                            });
                        // Don't throw here - transaction will rollback if needed
                        }
                    }
                    console.log('✅ [ORDERS SERVICE] All variant stocks updated successfully');
                } catch (stockError) {
                    console.error('❌ [ORDERS SERVICE] Error updating stock:', {
                        error: stockError,
                        message: stockError?.message,
                        detail: stockError?.detail
                    });
                    // Re-throw to rollback transaction
                    throw stockError;
                }
                // Create payment record
                const payment = await tx.payment.create({
                    data: {
                        orderId: newOrder.id,
                        provider: paymentMethod,
                        method: paymentMethod,
                        amount: total,
                        currency: 'AMD',
                        status: 'pending'
                    }
                });
                // If user cart, delete cart after successful checkout
                if (userId && cartId && cartId !== 'guest-cart') {
                    await tx.cart.delete({
                        where: {
                            id: cartId
                        }
                    });
                }
                return {
                    order: newOrder,
                    payment
                };
            });
            // Return order and payment info
            return {
                order: {
                    id: order.order.id,
                    number: order.order.number,
                    status: order.order.status,
                    paymentStatus: order.order.paymentStatus,
                    total: order.order.total,
                    currency: order.order.currency
                },
                payment: {
                    provider: order.payment.provider,
                    paymentUrl: null,
                    expiresAt: null
                },
                nextAction: paymentMethod === 'idram' || paymentMethod === 'arca' ? 'redirect_to_payment' : 'view_order'
            };
        } catch (error) {
            // If it's already our custom error, re-throw it
            if (error.status && error.type) {
                throw error;
            }
            // Log unexpected errors
            console.error("❌ [ORDERS SERVICE] Checkout error:", {
                error: {
                    name: error?.name,
                    message: error?.message,
                    code: error?.code,
                    meta: error?.meta,
                    stack: error?.stack?.substring(0, 500)
                }
            });
            // Handle Prisma errors
            if (error?.code === 'P2002') {
                throw {
                    status: 409,
                    type: "https://api.shop.am/problems/conflict",
                    title: "Conflict",
                    detail: "Order number already exists, please try again"
                };
            }
            // Generic error
            throw {
                status: 500,
                type: "https://api.shop.am/problems/internal-error",
                title: "Internal Server Error",
                detail: error?.message || "An error occurred during checkout"
            };
        }
    }
    /**
   * Get user orders list
   */ async list(userId) {
        const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.findMany({
            where: {
                userId
            },
            include: {
                items: true,
                payments: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return {
            data: orders.map((order)=>({
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
                    createdAt: order.createdAt,
                    itemsCount: order.items.length
                }))
        };
    }
    /**
   * Get order by number
   */ async findByNumber(orderNumber, userId) {
        const order = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.findFirst({
            where: {
                number: orderNumber,
                userId
            },
            include: {
                items: {
                    include: {
                        variant: {
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
                        }
                    }
                },
                payments: true,
                events: true
            }
        });
        if (!order) {
            throw {
                status: 404,
                type: "https://api.shop.am/problems/not-found",
                title: "Order not found",
                detail: `Order with number '${orderNumber}' not found`
            };
        }
        // Parse shipping address if it's a JSON string
        let shippingAddress = order.shippingAddress;
        if (typeof shippingAddress === 'string') {
            try {
                shippingAddress = JSON.parse(shippingAddress);
            } catch  {
                shippingAddress = null;
            }
        }
        // Debug logging
        console.log('📦 [ORDERS SERVICE] Order found:', {
            orderNumber: order.number,
            itemsCount: order.items.length,
            items: order.items.map((item)=>({
                    variantId: item.variantId,
                    productTitle: item.productTitle,
                    variant: item.variant ? {
                        id: item.variant.id,
                        optionsCount: item.variant.options?.length || 0,
                        options: item.variant.options
                    } : null
                }))
        });
        return {
            id: order.id,
            number: order.number,
            status: order.status,
            paymentStatus: order.paymentStatus,
            fulfillmentStatus: order.fulfillmentStatus,
            items: order.items.map((item)=>{
                const variantOptions = item.variant?.options?.map((opt)=>{
                    // Debug logging for each option
                    console.log(`🔍 [ORDERS SERVICE] Processing option:`, {
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
                console.log(`🔍 [ORDERS SERVICE] Item mapping:`, {
                    productTitle: item.productTitle,
                    variantId: item.variantId,
                    hasVariant: !!item.variant,
                    optionsCount: item.variant?.options?.length || 0,
                    variantOptions
                });
                return {
                    variantId: item.variantId || '',
                    productTitle: item.productTitle,
                    variantTitle: item.variantTitle || '',
                    sku: item.sku,
                    quantity: item.quantity,
                    price: Number(item.price),
                    total: Number(item.total),
                    imageUrl: item.imageUrl || undefined,
                    variantOptions
                };
            }),
            totals: {
                subtotal: Number(order.subtotal),
                discount: Number(order.discountAmount),
                shipping: Number(order.shippingAmount),
                tax: Number(order.taxAmount),
                total: Number(order.total),
                currency: order.currency
            },
            customer: {
                email: order.customerEmail || undefined,
                phone: order.customerPhone || undefined
            },
            shippingAddress: shippingAddress,
            shippingMethod: order.shippingMethod || 'pickup',
            trackingNumber: order.trackingNumber || undefined,
            createdAt: order.createdAt.toISOString(),
            updatedAt: order.updatedAt.toISOString()
        };
    }
}
const ordersService = new OrdersService();
}),
"[project]/apps/web/app/api/v1/orders/[number]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/middleware/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$orders$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/services/orders.service.ts [app-route] (ecmascript)");
;
;
;
async function GET(req, { params }) {
    let user = null;
    try {
        user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authenticateToken"])(req);
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
        const { number } = await params;
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$services$2f$orders$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ordersService"].findByNumber(number, user.id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        const { number } = await params;
        console.error("❌ [ORDERS] Get order by number error:", {
            orderNumber: number,
            userId: user?.id,
            message: error?.message,
            stack: error?.stack,
            name: error?.name,
            type: error?.type,
            title: error?.title,
            status: error?.status,
            detail: error?.detail,
            fullError: error
        });
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

//# sourceMappingURL=%5Broot-of-the-server%5D__f2f158f2._.js.map