(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/components/RelatedProducts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RelatedProducts",
    ()=>RelatedProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/currency.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/language.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/auth/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CartIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/icons/CartIcon.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
function RelatedProducts({ categorySlug, currentProductId }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isLoggedIn } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [visibleCards, setVisibleCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(4);
    const [addingToCart, setAddingToCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [startX, setStartX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [scrollLeft, setScrollLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [hasMoved, setHasMoved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const carouselRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Initialize language with 'en' to match server-side default and prevent hydration mismatch
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const [imageErrors, setImageErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    // Initialize language from localStorage after mount to prevent hydration mismatch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RelatedProducts.useEffect": ()=>{
            setLanguage((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])());
            const handleLanguageUpdate = {
                "RelatedProducts.useEffect.handleLanguageUpdate": ()=>{
                    setLanguage((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])());
                }
            }["RelatedProducts.useEffect.handleLanguageUpdate"];
            window.addEventListener('language-updated', handleLanguageUpdate);
            return ({
                "RelatedProducts.useEffect": ()=>{
                    window.removeEventListener('language-updated', handleLanguageUpdate);
                }
            })["RelatedProducts.useEffect"];
        }
    }["RelatedProducts.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RelatedProducts.useEffect": ()=>{
            const fetchRelatedProducts = {
                "RelatedProducts.useEffect.fetchRelatedProducts": async ()=>{
                    try {
                        setLoading(true);
                        // Build params - if no categorySlug, fetch all products
                        const params = {
                            limit: '30',
                            lang: language
                        };
                        if (categorySlug) {
                            params.category = categorySlug;
                            console.log('[RelatedProducts] Fetching related products for category:', categorySlug);
                        } else {
                            console.log('[RelatedProducts] No categorySlug, fetching all products');
                        }
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/v1/products', {
                            params
                        });
                        console.log('[RelatedProducts] Received products:', response.data.length);
                        // Filter out current product and take exactly 10
                        const filtered = response.data.filter({
                            "RelatedProducts.useEffect.fetchRelatedProducts.filtered": (p)=>p.id !== currentProductId
                        }["RelatedProducts.useEffect.fetchRelatedProducts.filtered"]);
                        console.log('[RelatedProducts] After filtering current product:', filtered.length);
                        const finalProducts = filtered.slice(0, 10);
                        console.log('[RelatedProducts] Final products to display:', finalProducts.length);
                        setProducts(finalProducts);
                    } catch (error) {
                        console.error('[RelatedProducts] Error fetching related products:', error);
                        setProducts([]);
                    } finally{
                        setLoading(false);
                    }
                }
            }["RelatedProducts.useEffect.fetchRelatedProducts"];
            fetchRelatedProducts();
        }
    }["RelatedProducts.useEffect"], [
        categorySlug,
        currentProductId
    ]);
    // Determine visible cards based on screen size
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RelatedProducts.useEffect": ()=>{
            const updateVisibleCards = {
                "RelatedProducts.useEffect.updateVisibleCards": ()=>{
                    const width = window.innerWidth;
                    if (width < 640) {
                        setVisibleCards(1); // mobile
                    } else if (width < 1024) {
                        setVisibleCards(2); // tablet
                    } else if (width < 1280) {
                        setVisibleCards(3); // desktop
                    } else {
                        setVisibleCards(4); // large desktop
                    }
                }
            }["RelatedProducts.useEffect.updateVisibleCards"];
            updateVisibleCards();
            window.addEventListener('resize', updateVisibleCards);
            return ({
                "RelatedProducts.useEffect": ()=>window.removeEventListener('resize', updateVisibleCards)
            })["RelatedProducts.useEffect"];
        }
    }["RelatedProducts.useEffect"], []);
    // Auto-rotate carousel
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RelatedProducts.useEffect": ()=>{
            if (products.length <= visibleCards || isDragging) return; // Don't auto-rotate if all products are visible or if dragging
            const interval = setInterval({
                "RelatedProducts.useEffect.interval": ()=>{
                    setCurrentIndex({
                        "RelatedProducts.useEffect.interval": (prevIndex)=>{
                            const maxIndex = Math.max(0, products.length - visibleCards);
                            return prevIndex >= maxIndex ? 0 : prevIndex + 1;
                        }
                    }["RelatedProducts.useEffect.interval"]);
                }
            }["RelatedProducts.useEffect.interval"], 5000); // Change every 5 seconds
            return ({
                "RelatedProducts.useEffect": ()=>clearInterval(interval)
            })["RelatedProducts.useEffect"];
        }
    }["RelatedProducts.useEffect"], [
        products.length,
        visibleCards,
        isDragging
    ]);
    // Adjust currentIndex when visibleCards changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RelatedProducts.useEffect": ()=>{
            const maxIndex = Math.max(0, products.length - visibleCards);
            setCurrentIndex({
                "RelatedProducts.useEffect": (prevIndex)=>{
                    if (prevIndex > maxIndex) {
                        return maxIndex;
                    }
                    return prevIndex;
                }
            }["RelatedProducts.useEffect"]);
        }
    }["RelatedProducts.useEffect"], [
        visibleCards,
        products.length
    ]);
    const maxIndex = Math.max(0, products.length - visibleCards);
    const goToPrevious = ()=>{
        setCurrentIndex((prevIndex)=>{
            return prevIndex === 0 ? maxIndex : prevIndex - 1;
        });
    };
    const goToNext = ()=>{
        setCurrentIndex((prevIndex)=>{
            return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
    };
    /**
   * Handle mouse down for dragging
   */ const handleMouseDown = (e)=>{
        if (!carouselRef.current) return;
        setHasMoved(false);
        setIsDragging(true);
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setScrollLeft(currentIndex);
    };
    /**
   * Handle mouse move for dragging
   */ const handleMouseMove = (e)=>{
        if (!isDragging || !carouselRef.current) return;
        const x = e.pageX - carouselRef.current.offsetLeft;
        const deltaX = Math.abs(x - startX);
        // Only consider it dragging if mouse moved more than 5px
        if (deltaX > 5) {
            setHasMoved(true);
            e.preventDefault();
            const walk = (x - startX) * 2; // Scroll speed multiplier
            const cardWidth = 100 / visibleCards;
            const newIndex = Math.round((scrollLeft - walk / (carouselRef.current.offsetWidth / 100)) / cardWidth);
            const clampedIndex = Math.max(0, Math.min(maxIndex, newIndex));
            setCurrentIndex(clampedIndex);
        }
    };
    /**
   * Handle mouse up/leave to stop dragging
   */ const handleMouseUp = ()=>{
        const wasDragging = isDragging;
        const didMove = hasMoved;
        setIsDragging(false);
        // Reset hasMoved after a short delay to allow click events to process
        // Only reset if we were actually dragging
        if (wasDragging && didMove) {
            setTimeout(()=>setHasMoved(false), 150);
        } else {
            setHasMoved(false);
        }
    };
    /**
   * Handle touch start for mobile dragging
   */ const handleTouchStart = (e)=>{
        if (!carouselRef.current) return;
        setHasMoved(false);
        setIsDragging(true);
        setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
        setScrollLeft(currentIndex);
    };
    /**
   * Handle touch move for mobile dragging
   */ const handleTouchMove = (e)=>{
        if (!isDragging || !carouselRef.current) return;
        const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
        const deltaX = Math.abs(x - startX);
        // Only consider it dragging if touch moved more than 5px
        if (deltaX > 5) {
            setHasMoved(true);
            const walk = (x - startX) * 2;
            const cardWidth = 100 / visibleCards;
            const newIndex = Math.round((scrollLeft - walk / (carouselRef.current.offsetWidth / 100)) / cardWidth);
            const clampedIndex = Math.max(0, Math.min(maxIndex, newIndex));
            setCurrentIndex(clampedIndex);
        }
    };
    /**
   * Handle touch end to stop dragging
   */ const handleTouchEnd = ()=>{
        const wasDragging = isDragging;
        const didMove = hasMoved;
        setIsDragging(false);
        // Reset hasMoved after a short delay to allow click events to process
        // Only reset if we were actually dragging
        if (wasDragging && didMove) {
            setTimeout(()=>setHasMoved(false), 150);
        } else {
            setHasMoved(false);
        }
    };
    /**
   * Handle wheel scroll for horizontal scrolling
   */ const handleWheel = (e)=>{
        if (e.deltaY === 0) return;
        e.preventDefault();
        const delta = e.deltaY > 0 ? 1 : -1;
        setCurrentIndex((prevIndex)=>{
            const newIndex = prevIndex + delta;
            return Math.max(0, Math.min(maxIndex, newIndex));
        });
    };
    /**
   * Handle adding product to cart
   */ const handleAddToCart = async (e, product)=>{
        e.preventDefault();
        e.stopPropagation();
        if (!product.inStock) {
            return;
        }
        if (!isLoggedIn) {
            router.push(`/login?redirect=/products/${product.slug}`);
            return;
        }
        setAddingToCart((prev)=>new Set(prev).add(product.id));
        try {
            const encodedSlug = encodeURIComponent(product.slug.trim());
            const productDetails = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/v1/products/${encodedSlug}`);
            if (!productDetails.variants || productDetails.variants.length === 0) {
                alert('No variants available');
                return;
            }
            const variantId = productDetails.variants[0].id;
            await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/v1/cart/items', {
                productId: product.id,
                variantId: variantId,
                quantity: 1
            });
            // Trigger cart update event
            window.dispatchEvent(new Event('cart-updated'));
        } catch (error) {
            console.error('[RelatedProducts] Error adding to cart:', error);
            if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
                router.push(`/login?redirect=/products/${product.slug}`);
            } else {
                alert('Failed to add product to cart. Please try again.');
            }
        } finally{
            setAddingToCart((prev)=>{
                const next = new Set(prev);
                next.delete(product.id);
                return next;
            });
        }
    };
    const currency = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredCurrency"])();
    // Always show the section, even if no products (will show loading or empty state)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-12 mt-20 border-t border-gray-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-3xl font-bold text-gray-900 mb-10",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.related_products_title')
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                    lineNumber: 366,
                    columnNumber: 9
                }, this),
                loading ? // Loading state
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                    children: [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-pulse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "aspect-square bg-gray-200 rounded-lg mb-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                    lineNumber: 373,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-4 bg-gray-200 rounded w-3/4 mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                    lineNumber: 374,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-4 bg-gray-200 rounded w-1/2"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                    lineNumber: 375,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                            lineNumber: 372,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                    lineNumber: 370,
                    columnNumber: 11
                }, this) : products.length === 0 ? // Empty state
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 text-lg",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.noRelatedProducts')
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                        lineNumber: 382,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                    lineNumber: 381,
                    columnNumber: 11
                }, this) : // Products Carousel
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: carouselRef,
                            className: "relative overflow-hidden cursor-grab active:cursor-grabbing select-none",
                            onMouseDown: handleMouseDown,
                            onMouseMove: handleMouseMove,
                            onMouseUp: handleMouseUp,
                            onMouseLeave: handleMouseUp,
                            onTouchStart: handleTouchStart,
                            onTouchMove: handleTouchMove,
                            onTouchEnd: handleTouchEnd,
                            onWheel: handleWheel,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-stretch",
                                style: {
                                    transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                                    transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
                                },
                                children: products.map((product)=>{
                                    const hasImage = product.image && !imageErrors.has(product.id);
                                    // Get category name from product categories
                                    const categoryName = product.categories && product.categories.length > 0 ? product.categories.map((c)=>c.title).join(', ') : product.brand?.name || 'Product';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-shrink-0 px-3 h-full",
                                        style: {
                                            width: `${100 / visibleCards}%`
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "group relative h-full flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/products/${product.slug}`,
                                                    className: "block cursor-pointer flex-1 flex flex-col",
                                                    onClick: (e)=>{
                                                        // Prevent navigation only if we actually dragged (moved more than threshold)
                                                        if (hasMoved) {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            return;
                                                        }
                                                        // Allow navigation - Link will handle it
                                                        console.log('[RelatedProducts] Navigating to product:', product.slug);
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative aspect-square bg-gray-100 overflow-hidden flex-shrink-0",
                                                                children: hasImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    src: product.image,
                                                                    alt: product.title,
                                                                    fill: true,
                                                                    className: "object-cover group-hover:scale-105 transition-transform duration-300",
                                                                    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
                                                                    unoptimized: true,
                                                                    onError: ()=>{
                                                                        setImageErrors((prev)=>new Set(prev).add(product.id));
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                    lineNumber: 439,
                                                                    columnNumber: 33
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-full h-full bg-gray-200 flex items-center justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-400 text-sm",
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'common.messages.noImage')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                        lineNumber: 452,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                    lineNumber: 451,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                lineNumber: 437,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-4 flex flex-col flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "text-sm font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-gray-600 transition-colors",
                                                                        children: product.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                        lineNumber: 460,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-500 mb-3",
                                                                        children: categoryName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                        lineNumber: 465,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-col gap-1 mt-auto",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-lg font-bold text-gray-900",
                                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(product.price, currency)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                                        lineNumber: 472,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    product.discountPercent && product.discountPercent > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded",
                                                                                        children: [
                                                                                            "-",
                                                                                            product.discountPercent,
                                                                                            "%"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                                        lineNumber: 476,
                                                                                        columnNumber: 37
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                                lineNumber: 471,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            product.originalPrice && product.originalPrice > product.price || product.compareAtPrice && product.compareAtPrice > product.price ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm text-gray-500 line-through decoration-gray-400",
                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(product.originalPrice && product.originalPrice > product.price ? product.originalPrice : product.compareAtPrice || 0, currency)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                                lineNumber: 483,
                                                                                columnNumber: 35
                                                                            }, this) : null
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                        lineNumber: 470,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                lineNumber: 458,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                    lineNumber: 421,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: (e)=>handleAddToCart(e, product),
                                                    disabled: !product.inStock || addingToCart.has(product.id),
                                                    className: "absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed z-20 group/cart",
                                                    title: product.inStock ? 'Add to cart' : 'Out of stock',
                                                    "aria-label": product.inStock ? 'Add to cart' : 'Out of stock',
                                                    children: addingToCart.has(product.id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "animate-spin h-5 w-5 text-green-600",
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                className: "opacity-25",
                                                                cx: "12",
                                                                cy: "12",
                                                                r: "10",
                                                                stroke: "currentColor",
                                                                strokeWidth: "4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                lineNumber: 507,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                className: "opacity-75",
                                                                fill: "currentColor",
                                                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                                lineNumber: 508,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 29
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `transition-colors duration-200 ${product.inStock ? 'text-gray-600 group-hover/cart:text-green-600' : 'text-gray-400'}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CartIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartIcon"], {
                                                            size: 24
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                            lineNumber: 512,
                                                            columnNumber: 31
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                        lineNumber: 511,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                                    lineNumber: 498,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                            lineNumber: 420,
                                            columnNumber: 23
                                        }, this)
                                    }, product.id, false, {
                                        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                        lineNumber: 415,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                lineNumber: 400,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                            lineNumber: 388,
                            columnNumber: 13
                        }, this),
                        products.length > visibleCards && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: goToPrevious,
                                    className: "absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-all z-20 cursor-pointer hover:scale-110",
                                    "aria-label": "Previous products",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2.5,
                                            d: "M15 19l-7-7 7-7"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                            lineNumber: 537,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                        lineNumber: 531,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                    lineNumber: 526,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: goToNext,
                                    className: "absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-all z-20 cursor-pointer hover:scale-110",
                                    "aria-label": "Next products",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2.5,
                                            d: "M9 5l7 7-7 7"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                            lineNumber: 557,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                        lineNumber: 551,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                    lineNumber: 546,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true),
                        products.length > visibleCards && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center gap-2 mt-6",
                            children: Array.from({
                                length: Math.ceil(products.length / visibleCards)
                            }).map((_, index)=>{
                                const startIndex = index * visibleCards;
                                const endIndex = Math.min(startIndex + visibleCards, products.length);
                                const isActive = currentIndex >= startIndex && currentIndex < endIndex;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setCurrentIndex(startIndex),
                                    className: `h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-gray-900 w-8' : 'bg-gray-300 hover:bg-gray-400 w-2'}`,
                                    "aria-label": `Go to slide ${index + 1}`
                                }, index, false, {
                                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                                    lineNumber: 577,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                            lineNumber: 570,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/RelatedProducts.tsx",
                    lineNumber: 386,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/components/RelatedProducts.tsx",
            lineNumber: 365,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/RelatedProducts.tsx",
        lineNumber: 364,
        columnNumber: 5
    }, this);
}
_s(RelatedProducts, "Nr55a8xwoG/oIeQvyRyyNrUcXpA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = RelatedProducts;
var _c;
__turbopack_context__.k.register(_c, "RelatedProducts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = function Button({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) {
    const baseStyles = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantStyles = {
        primary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900',
        secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
        outline: 'bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
        ghost: 'bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-500'
    };
    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/ui/Button.tsx",
        lineNumber: 32,
        columnNumber: 7
    }, this);
});
_c1 = Button;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/Card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const Card = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = function Card({ className = '', children, ...props }, ref) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `bg-white border border-gray-200 rounded-lg shadow-sm ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/ui/Card.tsx",
        lineNumber: 12,
        columnNumber: 7
    }, this);
});
_c1 = Card;
var _c, _c1;
__turbopack_context__.k.register(_c, "Card$forwardRef");
__turbopack_context__.k.register(_c1, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/Input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const Input = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = function Input({ label, error, className = '', onKeyDown, ...props }, ref) {
    // Ensure pipe character (|) works in all input fields
    const handleKeyDown = (e)=>{
        // Allow pipe character (|) - key code 220 or Shift+Backslash
        if (e.key === '|' || e.keyCode === 220 || e.shiftKey && e.key === '\\') {
            // Allow the default behavior for pipe character
            return;
        }
        // Call original onKeyDown if provided
        if (onKeyDown) {
            onKeyDown(e);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/packages/ui/Input.tsx",
                lineNumber: 29,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: ref,
                className: `w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed ${error ? 'border-error focus:ring-error' : 'border-gray-300'} ${className}`,
                onKeyDown: handleKeyDown,
                ...props
            }, void 0, false, {
                fileName: "[project]/packages/ui/Input.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-error",
                children: error
            }, void 0, false, {
                fileName: "[project]/packages/ui/Input.tsx",
                lineNumber: 42,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/ui/Input.tsx",
        lineNumber: 27,
        columnNumber: 7
    }, this);
});
_c1 = Input;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Input.tsx [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/ProductReviews.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductReviews",
    ()=>ProductReviews
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/auth/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ProductReviews({ productId, productSlug }) {
    _s();
    const { isLoggedIn, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [reviews, setReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rating, setRating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [hoveredRating, setHoveredRating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [comment, setComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingReviewId, setEditingReviewId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductReviews.useEffect": ()=>{
            loadReviews();
        }
    }["ProductReviews.useEffect"], [
        productId,
        productSlug
    ]);
    const loadReviews = async ()=>{
        try {
            // Use slug if available, otherwise fall back to productId
            const identifier = productSlug || productId;
            if (!identifier) {
                console.warn('⚠️ [PRODUCT REVIEWS] No product identifier provided');
                setReviews([]);
                setLoading(false);
                return;
            }
            console.log('📝 [PRODUCT REVIEWS] Loading reviews for product:', identifier);
            setLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/v1/products/${identifier}/reviews`);
            console.log('✅ [PRODUCT REVIEWS] Reviews loaded:', data?.length || 0);
            setReviews(data || []);
        } catch (error) {
            console.error('❌ [PRODUCT REVIEWS] Error loading reviews:', error);
            // If 404, product might not have reviews yet - that's okay
            if (error.status !== 404) {
                console.error('Failed to load reviews:', error);
            }
            setReviews([]);
        } finally{
            setLoading(false);
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!isLoggedIn) {
            alert(t('common.reviews.loginRequired'));
            return;
        }
        if (rating === 0) {
            alert(t('common.reviews.ratingRequired'));
            return;
        }
        if (!comment.trim()) {
            alert(t('common.reviews.commentRequired'));
            return;
        }
        setSubmitting(true);
        try {
            // Use slug if available, otherwise fall back to productId
            const identifier = productSlug || productId;
            if (!identifier) {
                alert(t('common.reviews.submitError'));
                return;
            }
            console.log('📝 [PRODUCT REVIEWS] Submitting review:', {
                identifier,
                rating,
                commentLength: comment.length
            });
            const newReview = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/v1/products/${identifier}/reviews`, {
                rating,
                comment: comment.trim()
            });
            console.log('✅ [PRODUCT REVIEWS] Review submitted successfully:', newReview.id);
            // Add new review to the list
            setReviews([
                newReview,
                ...reviews
            ]);
            setRating(0);
            setComment('');
            setShowForm(false);
            // Dispatch event to update rating on product page
            if ("TURBOPACK compile-time truthy", 1) {
                window.dispatchEvent(new Event('review-updated'));
            }
        } catch (error) {
            console.error('❌ [PRODUCT REVIEWS] Error submitting review:', error);
            // Handle specific error cases
            if (error.status === 409) {
                // User already has a review - load it and show in edit mode
                try {
                    const identifier = productSlug || productId;
                    if (!identifier) {
                        alert(t('common.reviews.alreadyReviewed') || 'You have already reviewed this product');
                        return;
                    }
                    console.log('📝 [PRODUCT REVIEWS] Loading existing review for user');
                    const existingReview = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/v1/products/${identifier}/reviews?my=true`);
                    if (existingReview) {
                        // Add to reviews list if not already there
                        const reviewExists = reviews.some((r)=>r.id === existingReview.id);
                        if (!reviewExists) {
                            setReviews([
                                existingReview,
                                ...reviews
                            ]);
                        }
                        // Show in edit mode
                        handleEditReview(existingReview);
                        alert(t('common.reviews.alreadyReviewed') || 'You have already reviewed this product. You can update your review below.');
                    } else {
                        alert(t('common.reviews.alreadyReviewed') || 'You have already reviewed this product');
                    }
                } catch (loadError) {
                    console.error('❌ [PRODUCT REVIEWS] Error loading existing review:', loadError);
                    // Fallback to checking local reviews
                    if (userReview) {
                        handleEditReview(userReview);
                        alert(t('common.reviews.alreadyReviewed') || 'You have already reviewed this product. You can update your review below.');
                    } else {
                        alert(t('common.reviews.alreadyReviewed') || 'You have already reviewed this product');
                    }
                }
            } else if (error.status === 401) {
                alert(t('common.reviews.loginRequired'));
            } else {
                alert(t('common.reviews.submitError'));
            }
        } finally{
            setSubmitting(false);
        }
    };
    const averageRating = reviews.length > 0 ? reviews.reduce((sum, review)=>sum + review.rating, 0) / reviews.length : 0;
    const ratingDistribution = [
        5,
        4,
        3,
        2,
        1
    ].map((star)=>({
            star,
            count: reviews.filter((r)=>r.rating === star).length,
            percentage: reviews.length > 0 ? reviews.filter((r)=>r.rating === star).length / reviews.length * 100 : 0
        }));
    // Get user's review if exists
    const userReview = user ? reviews.find((r)=>r.userId === user.id) : null;
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        // Use browser's default locale for date formatting
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const handleEditReview = (review)=>{
        setEditingReviewId(review.id);
        setRating(review.rating);
        setComment(review.comment || '');
        setShowForm(true);
    };
    const handleCancelEdit = ()=>{
        setEditingReviewId(null);
        setRating(0);
        setComment('');
        setShowForm(false);
    };
    const handleUpdateReview = async (e)=>{
        e.preventDefault();
        if (!isLoggedIn || !editingReviewId) {
            return;
        }
        if (rating === 0) {
            alert(t('common.reviews.ratingRequired'));
            return;
        }
        if (!comment.trim()) {
            alert(t('common.reviews.commentRequired'));
            return;
        }
        setSubmitting(true);
        try {
            console.log('📝 [PRODUCT REVIEWS] Updating review:', {
                reviewId: editingReviewId,
                rating,
                commentLength: comment.length
            });
            const updatedReview = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/api/v1/reviews/${editingReviewId}`, {
                rating,
                comment: comment.trim()
            });
            console.log('✅ [PRODUCT REVIEWS] Review updated successfully:', updatedReview.id);
            // Update review in the list
            setReviews(reviews.map((r)=>r.id === editingReviewId ? updatedReview : r));
            setRating(0);
            setComment('');
            setEditingReviewId(null);
            setShowForm(false);
            // Dispatch event to update rating on product page
            if ("TURBOPACK compile-time truthy", 1) {
                window.dispatchEvent(new Event('review-updated'));
            }
        } catch (error) {
            console.error('❌ [PRODUCT REVIEWS] Error updating review:', error);
            // Handle specific error cases
            if (error.status === 401) {
                alert(t('common.reviews.loginRequired'));
            } else if (error.status === 403) {
                alert('You can only update your own reviews');
            } else {
                alert(t('common.reviews.submitError'));
            }
        } finally{
            setSubmitting(false);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-pulse",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-8 bg-gray-200 rounded w-1/4 mb-8"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                        lineNumber: 263,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-24 bg-gray-200 rounded"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                lineNumber: 265,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-24 bg-gray-200 rounded"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                lineNumber: 266,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                        lineNumber: 264,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                lineNumber: 262,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/ProductReviews.tsx",
            lineNumber: 261,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold text-gray-900 mb-4",
                        children: t('common.reviews.title')
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row gap-8 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center md:items-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-5xl font-bold text-gray-900 mb-2",
                                        children: averageRating.toFixed(1)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1 mb-2",
                                        children: [
                                            1,
                                            2,
                                            3,
                                            4,
                                            5
                                        ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: `w-6 h-6 ${star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`,
                                                fill: "currentColor",
                                                viewBox: "0 0 20 20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 19
                                                }, this)
                                            }, star, false, {
                                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                lineNumber: 288,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                        lineNumber: 286,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-600",
                                        children: [
                                            reviews.length,
                                            " ",
                                            reviews.length === 1 ? t('common.reviews.review') : t('common.reviews.reviews')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                        lineNumber: 302,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: ratingDistribution.map(({ star, count, percentage })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1 w-20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-gray-600 w-4",
                                                        children: star
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4 text-yellow-400",
                                                        fill: "currentColor",
                                                        viewBox: "0 0 20 20",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 bg-gray-200 rounded-full h-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-yellow-400 h-2 rounded-full",
                                                    style: {
                                                        width: `${percentage}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                lineNumber: 319,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-600 w-12 text-right",
                                                children: count
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                lineNumber: 325,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, star, true, {
                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this),
                    !showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "primary",
                        onClick: ()=>{
                            if (!isLoggedIn) {
                                alert(t('common.reviews.loginRequired'));
                                return;
                            }
                            setShowForm(true);
                        },
                        className: "mb-8",
                        children: t('common.reviews.writeReview')
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                        lineNumber: 333,
                        columnNumber: 11
                    }, this),
                    showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: editingReviewId ? handleUpdateReview : handleSubmit,
                        className: "mb-8 p-6 bg-gray-50 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-semibold text-gray-900 mb-4",
                                children: editingReviewId ? 'Update Your Review' : t('common.reviews.writeReview')
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                lineNumber: 351,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: [
                                            t('common.reviews.rating'),
                                            " *"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                        lineNumber: 357,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            1,
                                            2,
                                            3,
                                            4,
                                            5
                                        ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setRating(star),
                                                onMouseEnter: ()=>setHoveredRating(star),
                                                onMouseLeave: ()=>setHoveredRating(0),
                                                className: "focus:outline-none",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: `w-8 h-8 transition-colors ${star <= (hoveredRating || rating) ? 'text-yellow-400' : 'text-gray-300'}`,
                                                    fill: "currentColor",
                                                    viewBox: "0 0 20 20",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 21
                                                }, this)
                                            }, star, false, {
                                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                lineNumber: 362,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                        lineNumber: 360,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                lineNumber: 356,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: [
                                            t('common.reviews.comment'),
                                            " *"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                        lineNumber: 388,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: comment,
                                        onChange: (e)=>setComment(e.target.value),
                                        rows: 5,
                                        className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                                        placeholder: t('common.reviews.commentPlaceholder'),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                lineNumber: 387,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "submit",
                                        variant: "primary",
                                        disabled: submitting,
                                        children: submitting ? t('common.reviews.submitting') : editingReviewId ? 'Update Review' : t('common.reviews.submitReview')
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                        lineNumber: 403,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: "outline",
                                        onClick: editingReviewId ? handleCancelEdit : ()=>{
                                            setShowForm(false);
                                            setRating(0);
                                            setComment('');
                                        },
                                        children: t('common.buttons.cancel')
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                        lineNumber: 414,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                lineNumber: 402,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                        lineNumber: 350,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                lineNumber: 275,
                columnNumber: 7
            }, this),
            reviews.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-4",
                        children: t('common.reviews.noReviews')
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                        lineNumber: 433,
                        columnNumber: 11
                    }, this),
                    !showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "primary",
                        onClick: ()=>{
                            if (!isLoggedIn) {
                                alert(t('common.reviews.loginRequired'));
                                return;
                            }
                            setShowForm(true);
                        },
                        children: t('common.reviews.writeReview')
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                        lineNumber: 437,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                lineNumber: 432,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: reviews.map((review)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-gray-200 pb-6 last:border-b-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-gray-900 mb-1",
                                                children: review.userName
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                lineNumber: 457,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            1,
                                                            2,
                                                            3,
                                                            4,
                                                            5
                                                        ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: `w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`,
                                                                fill: "currentColor",
                                                                viewBox: "0 0 20 20",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                                    lineNumber: 473,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, star, false, {
                                                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                                lineNumber: 463,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-gray-500",
                                                        children: formatDate(review.createdAt)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                        lineNumber: 477,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                                lineNumber: 460,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                        lineNumber: 456,
                                        columnNumber: 17
                                    }, this),
                                    user && review.userId === user.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: "outline",
                                        size: "sm",
                                        onClick: ()=>handleEditReview(review),
                                        className: "ml-4",
                                        children: "Edit"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                        lineNumber: 483,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                lineNumber: 455,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-700 whitespace-pre-wrap",
                                children: review.comment
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                                lineNumber: 494,
                                columnNumber: 15
                            }, this)
                        ]
                    }, review.id, true, {
                        fileName: "[project]/apps/web/components/ProductReviews.tsx",
                        lineNumber: 454,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/components/ProductReviews.tsx",
                lineNumber: 452,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/ProductReviews.tsx",
        lineNumber: 274,
        columnNumber: 5
    }, this);
}
_s(ProductReviews, "CiSuU4TLPhOhL4p+bFzHDc6I1ts=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = ProductReviews;
var _c;
__turbopack_context__.k.register(_c, "ProductReviews");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/ProductLabels.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductLabels",
    ()=>ProductLabels
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ProductLabels = ({ labels })=>{
    if (!labels || labels.length === 0) return null;
    // Փոքր logging, որ հեշտ լինի debug անել label-ների խնդիրները
    console.info('[UI][ProductLabels] Rendering labels', {
        total: labels.length,
        positions: labels.map((l)=>l.position)
    });
    const positions = [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right'
    ];
    const getColorClasses = (label)=>{
        if (label.color) {
            return '';
        }
        if (label.type === 'percentage') {
            return 'bg-red-600 text-white';
        }
        const value = label.value.toLowerCase();
        if (value.includes('new') || value.includes('նոր')) {
            return 'bg-green-600 text-white';
        }
        if (value.includes('hot') || value.includes('տաք')) {
            return 'bg-orange-600 text-white';
        }
        if (value.includes('sale') || value.includes('զեղչ')) {
            return 'bg-red-600 text-white';
        }
        return 'bg-blue-600 text-white';
    };
    const getCornerPositionClasses = (position)=>{
        switch(position){
            case 'top-left':
                return 'top-2 left-2 items-start';
            case 'top-right':
                return 'top-2 right-2 items-end';
            case 'bottom-left':
                return 'bottom-2 left-2 items-start';
            case 'bottom-right':
                return 'bottom-2 right-2 items-end';
            default:
                return '';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 pointer-events-none z-20",
        children: positions.map((position)=>{
            const labelsForPosition = labels.filter((label)=>label.position === position);
            if (labelsForPosition.length === 0) return null;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute flex flex-col gap-1 ${getCornerPositionClasses(position)}`,
                children: labelsForPosition.map((label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `px-2 py-0.5 text-[10px] font-semibold rounded-md shadow-sm pointer-events-auto ${getColorClasses(label)}`,
                        style: label.color ? {
                            backgroundColor: label.color,
                            color: 'white'
                        } : undefined,
                        children: label.type === 'percentage' ? `${label.value}%` : label.value
                    }, label.id, false, {
                        fileName: "[project]/apps/web/components/ProductLabels.tsx",
                        lineNumber: 86,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)))
            }, position, false, {
                fileName: "[project]/apps/web/components/ProductLabels.tsx",
                lineNumber: 81,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0));
        })
    }, void 0, false, {
        fileName: "[project]/apps/web/components/ProductLabels.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ProductLabels;
var _c;
__turbopack_context__.k.register(_c, "ProductLabels");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductImageGallery",
    ()=>ProductImageGallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$ProductLabels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/ProductLabels.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const THUMBNAILS_PER_VIEW = 3;
function ProductImageGallery({ images, product, discountPercent, language, currentImageIndex, onImageIndexChange, thumbnailStartIndex, onThumbnailStartIndexChange }) {
    _s();
    const [showZoom, setShowZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Auto-scroll thumbnails to show selected image
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductImageGallery.useEffect": ()=>{
            if (images.length > THUMBNAILS_PER_VIEW) {
                if (currentImageIndex < thumbnailStartIndex) {
                    // Selected image is above visible range - scroll up
                    onThumbnailStartIndexChange(currentImageIndex);
                } else if (currentImageIndex >= thumbnailStartIndex + THUMBNAILS_PER_VIEW) {
                    // Selected image is below visible range - scroll down
                    onThumbnailStartIndexChange(currentImageIndex - THUMBNAILS_PER_VIEW + 1);
                }
            }
        }
    }["ProductImageGallery.useEffect"], [
        currentImageIndex,
        images.length,
        thumbnailStartIndex,
        onThumbnailStartIndexChange
    ]);
    // Show only 3 thumbnails at a time, scrollable with navigation arrows
    const visibleThumbnails = images.slice(thumbnailStartIndex, thumbnailStartIndex + THUMBNAILS_PER_VIEW);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-6 items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4 w-28 flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-4 flex-1 overflow-hidden",
                                children: visibleThumbnails.map((image, index)=>{
                                    const actualIndex = thumbnailStartIndex + index;
                                    const isActive = actualIndex === currentImageIndex;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onImageIndexChange(actualIndex),
                                        className: `relative w-full aspect-[3/4] rounded-lg overflow-hidden border bg-white transition-all duration-300 flex-shrink-0 ${isActive ? 'border-gray-400 shadow-[0_2px_8px_rgba(0,0,0,0.12)] ring-2 ring-gray-300' : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_2px_6px_rgba(0,0,0,0.08)]'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: image,
                                            alt: "",
                                            className: "w-full h-full object-cover transition-transform duration-300"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                            lineNumber: 70,
                                            columnNumber: 19
                                        }, this)
                                    }, actualIndex, false, {
                                        fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                        lineNumber: 61,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            images.length > THUMBNAILS_PER_VIEW && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-row gap-1.5 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: (e)=>{
                                            e.preventDefault();
                                            e.stopPropagation();
                                            // Scroll thumbnails up
                                            const newStart = Math.max(0, thumbnailStartIndex - 1);
                                            onThumbnailStartIndexChange(newStart);
                                            // Also update current image if needed
                                            if (currentImageIndex > newStart + THUMBNAILS_PER_VIEW - 1) {
                                                onImageIndexChange(newStart + THUMBNAILS_PER_VIEW - 1);
                                            } else if (currentImageIndex < newStart) {
                                                onImageIndexChange(newStart);
                                            }
                                        },
                                        disabled: thumbnailStartIndex <= 0,
                                        className: "w-9 h-9 rounded border transition-all duration-200 flex items-center justify-center border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-200 hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:border-gray-300 disabled:hover:shadow-none bg-gray-100",
                                        "aria-label": (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'common.ariaLabels.previousThumbnail'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2.5,
                                                d: "M5 15l7-7 7 7"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                                lineNumber: 108,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                            lineNumber: 102,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: (e)=>{
                                            e.preventDefault();
                                            e.stopPropagation();
                                            // Scroll thumbnails down
                                            const newStart = Math.min(images.length - THUMBNAILS_PER_VIEW, thumbnailStartIndex + 1);
                                            onThumbnailStartIndexChange(newStart);
                                            // Also update current image if needed
                                            if (currentImageIndex < newStart) {
                                                onImageIndexChange(newStart);
                                            } else if (currentImageIndex > newStart + THUMBNAILS_PER_VIEW - 1) {
                                                onImageIndexChange(newStart + THUMBNAILS_PER_VIEW - 1);
                                            }
                                        },
                                        disabled: thumbnailStartIndex >= images.length - THUMBNAILS_PER_VIEW,
                                        className: "w-9 h-9 rounded border transition-all duration-200 flex items-center justify-center border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-200 hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:border-gray-300 disabled:hover:shadow-none bg-gray-100",
                                        "aria-label": (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'common.ariaLabels.nextThumbnail'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2.5,
                                                d: "M19 9l-7 7-7-7"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                                lineNumber: 141,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative aspect-square bg-white rounded-lg overflow-hidden group shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
                            children: [
                                images.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: images[currentImageIndex],
                                    alt: product.title,
                                    className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                    lineNumber: 157,
                                    columnNumber: 13
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-full flex items-center justify-center text-gray-400",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'common.messages.noImage')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                discountPercent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-4 right-4 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10 shadow-[0_2px_8px_rgba(37,99,235,0.3)]",
                                    children: [
                                        "-",
                                        discountPercent,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this),
                                product.labels && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$ProductLabels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductLabels"], {
                                    labels: product.labels
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                    lineNumber: 173,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-4 left-4 flex flex-col gap-3 z-10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowZoom(true),
                                        className: "w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-white/90 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]",
                                        "aria-label": (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'common.ariaLabels.fullscreenImage'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                            className: "w-5 h-5 text-gray-800"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                            lineNumber: 183,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                                    lineNumber: 176,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            showZoom && images.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4",
                onClick: ()=>setShowZoom(false),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: images[currentImageIndex],
                        alt: "",
                        className: "max-w-full max-h-full object-contain"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "absolute top-4 right-4 text-white text-2xl",
                        "aria-label": (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'common.buttons.close'),
                        onClick: (e)=>{
                            e.stopPropagation();
                            setShowZoom(false);
                        },
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'common.buttons.close')
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                        lineNumber: 194,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx",
                lineNumber: 192,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(ProductImageGallery, "WItyAcrUm/92AcXbTjWyv4LPJY4=");
_c = ProductImageGallery;
var _c;
__turbopack_context__.k.register(_c, "ProductImageGallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/utils/logger.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Logger utility for consistent logging across the application
 * Replaces console.log with structured logging
 */ __turbopack_context__.s([
    "logger",
    ()=>logger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/utils/image-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$browser$2d$image$2d$compression$2f$dist$2f$browser$2d$image$2d$compression$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/browser-image-compression/dist/browser-image-compression.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/logger.ts [app-client] (ecmascript)");
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
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Starting image processing', {
            fileName: file.name,
            originalSize: `${Math.round(file.size / 1024)}KB`,
            type: file.type
        });
        const { maxSizeMB = 2, maxWidthOrHeight = 1920, useWebWorker = true, fileType = 'image/jpeg', initialQuality = 0.8 } = options || {};
        // Process image with compression and EXIF orientation correction
        // browser-image-compression automatically handles EXIF orientation
        const compressedFile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$browser$2d$image$2d$compression$2f$dist$2f$browser$2d$image$2d$compression$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(file, {
            maxSizeMB,
            maxWidthOrHeight,
            useWebWorker,
            fileType,
            initialQuality
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].info('Image processed successfully', {
            originalSize: `${Math.round(file.size / 1024)}KB`,
            compressedSize: `${Math.round(compressedFile.size / 1024)}KB`,
            reduction: `${Math.round((1 - compressedFile.size / file.size) * 100)}%`
        });
        // Convert to base64
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onload = ()=>{
                const result = reader.result;
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Image converted to base64', {
                    length: result.length
                });
                resolve(result);
            };
            reader.onerror = (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error converting to base64', {
                    error
                });
                reject(new Error('Failed to convert image to base64'));
            };
            reader.readAsDataURL(compressedFile);
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to process image';
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error processing image', {
            error
        });
        throw new Error(errorMessage);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductAttributesSelector",
    ()=>ProductAttributesSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/image-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n.ts [app-client] (ecmascript)");
'use client';
;
;
;
// Helper function to get color hex/rgb from color name
const getColorValue = (colorName)=>{
    const colorMap = {
        'beige': '#F5F5DC',
        'black': '#000000',
        'blue': '#0000FF',
        'brown': '#A52A2A',
        'gray': '#808080',
        'grey': '#808080',
        'green': '#008000',
        'red': '#FF0000',
        'white': '#FFFFFF',
        'yellow': '#FFFF00',
        'orange': '#FFA500',
        'pink': '#FFC0CB',
        'purple': '#800080',
        'navy': '#000080',
        'maroon': '#800000',
        'olive': '#808000',
        'teal': '#008080',
        'cyan': '#00FFFF',
        'magenta': '#FF00FF',
        'lime': '#00FF00',
        'silver': '#C0C0C0',
        'gold': '#FFD700'
    };
    const normalizedName = colorName.toLowerCase().trim();
    return colorMap[normalizedName] || '#CCCCCC';
};
function ProductAttributesSelector({ product, attributeGroups, selectedColor, selectedSize, selectedAttributeValues, unavailableAttributes, colorGroups, sizeGroups, language, onColorSelect, onSizeSelect, onAttributeValueSelect, getOptionValue }) {
    const attributeGroupsEntries = Array.from(attributeGroups.entries());
    console.log('🎨 [PRODUCT ATTRIBUTES SELECTOR] attributeGroups entries:', attributeGroupsEntries.length);
    console.log('🎨 [PRODUCT ATTRIBUTES SELECTOR] attributeGroups keys:', Array.from(attributeGroups.keys()));
    console.log('🎨 [PRODUCT ATTRIBUTES SELECTOR] product.productAttributes:', product?.productAttributes);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8 p-4 bg-white border border-gray-200 rounded-2xl space-y-4",
        children: [
            attributeGroupsEntries.length > 0 ? // Use attributeGroups which contains all attributes (from productAttributes and variants)
            Array.from(attributeGroups.entries()).map(([attrKey, attrGroups])=>{
                // Try to get attribute name from productAttributes if available
                const productAttr = product?.productAttributes?.find((pa)=>pa.attribute?.key === attrKey);
                const attributeName = productAttr?.attribute?.name || attrKey.charAt(0).toUpperCase() + attrKey.slice(1);
                const isColor = attrKey === 'color';
                const isSize = attrKey === 'size';
                if (attrGroups.length === 0) return null;
                // Check if this attribute is unavailable for the selected variant
                const isUnavailable = unavailableAttributes.get(attrKey) || false;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: `text-xs font-bold uppercase ${isUnavailable ? 'text-red-600' : ''}`,
                            children: [
                                attrKey === 'color' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.color') : attrKey === 'size' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.size') : attributeName,
                                ":"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                            lineNumber: 99,
                            columnNumber: 15
                        }, this),
                        isColor ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-1.5 items-center",
                            children: attrGroups.map((g)=>{
                                const isSelected = selectedColor === g.value?.toLowerCase().trim();
                                // IMPORTANT: Don't disable based on stock - show all colors, even if stock is 0
                                // Stock is just informational, not a reason to hide the option
                                const isDisabled = false; // Always show all colors
                                // Process imageUrl to ensure it's in the correct format
                                const processedImageUrl = g.imageUrl ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processImageUrl"])(g.imageUrl) : null;
                                const hasImage = processedImageUrl && processedImageUrl.trim() !== '';
                                const colorHex = g.colors && Array.isArray(g.colors) && g.colors.length > 0 ? g.colors[0] : getColorValue(g.value);
                                // Dynamic sizing based on number of values
                                // Keep size consistent for 2 values, reduce for more
                                const totalValues = attrGroups.length;
                                const sizeClass = totalValues > 6 ? 'w-8 h-8' : totalValues > 3 ? 'w-9 h-9' : 'w-10 h-10';
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center gap-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onColorSelect(g.value),
                                            className: `${sizeClass} rounded-full transition-all overflow-hidden ${isSelected ? 'border-[3px] border-green-500 scale-110' : g.stock <= 0 ? 'border-2 border-gray-200 opacity-60 hover:opacity-80' : 'border-2 border-gray-300 hover:scale-105'}`,
                                            style: hasImage ? {} : {
                                                backgroundColor: colorHex
                                            },
                                            title: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAttributeLabel"])(language, attrKey, g.value)}${g.stock > 0 ? ` (${g.stock} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.pcs')})` : ` (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.outOfStock')})`}`,
                                            children: hasImage && processedImageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: processedImageUrl,
                                                alt: g.label,
                                                className: "w-full h-full object-cover",
                                                onError: (e)=>{
                                                    console.error(`❌ [COLOR IMAGE] Failed to load image for color "${g.value}":`, processedImageUrl);
                                                    e.target.style.display = 'none';
                                                },
                                                onLoad: ()=>{
                                                    console.log(`✅ [COLOR IMAGE] Successfully loaded image for color "${g.value}":`, processedImageUrl);
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                                lineNumber: 142,
                                                columnNumber: 29
                                            }, this) : null
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                            lineNumber: 129,
                                            columnNumber: 25
                                        }, this),
                                        g.stock > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `${totalValues > 8 ? 'text-[10px]' : 'text-xs'} text-gray-500`,
                                            children: g.stock
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                            lineNumber: 157,
                                            columnNumber: 27
                                        }, this),
                                        g.stock <= 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `${totalValues > 8 ? 'text-[10px]' : 'text-xs'} text-gray-400`,
                                            children: "0"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                            lineNumber: 160,
                                            columnNumber: 27
                                        }, this)
                                    ]
                                }, g.valueId || g.value, true, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                    lineNumber: 128,
                                    columnNumber: 23
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                            lineNumber: 105,
                            columnNumber: 17
                        }, this) : isSize ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-1.5",
                            children: attrGroups.map((g)=>{
                                // Use stock from groups (already calculated with compatibility)
                                const displayStock = g.stock;
                                const isSelected = selectedSize === g.value.toLowerCase().trim();
                                // IMPORTANT: Don't disable based on stock - show all sizes, even if stock is 0
                                // Stock is just informational, not a reason to hide the option
                                const isDisabled = false; // Always show all sizes
                                // Process imageUrl to ensure it's in the correct format
                                const processedImageUrl = g.imageUrl ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processImageUrl"])(g.imageUrl) : null;
                                const hasImage = processedImageUrl && processedImageUrl.trim() !== '';
                                // Dynamic sizing based on number of values
                                // Keep size consistent for 2 values, reduce for more
                                const totalValues = attrGroups.length;
                                const paddingClass = totalValues > 6 ? 'px-2 py-1' : totalValues > 3 ? 'px-2.5 py-1.5' : 'px-3 py-2';
                                const textSizeClass = totalValues > 6 ? 'text-xs' : 'text-sm';
                                const imageSizeClass = totalValues > 6 ? 'w-4 h-4' : 'w-5 h-5';
                                const minWidthClass = totalValues > 6 ? 'min-w-[40px]' : 'min-w-[50px]';
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onSizeSelect(g.value),
                                    className: `${minWidthClass} ${paddingClass} rounded-lg border-2 transition-all flex items-center gap-1.5 ${isSelected ? 'border-green-500 bg-gray-50' : displayStock <= 0 ? 'border-gray-200 opacity-60 hover:opacity-80' : 'border-gray-200 hover:border-gray-400'}`,
                                    children: [
                                        hasImage && processedImageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: processedImageUrl,
                                            alt: g.label,
                                            className: `${imageSizeClass} object-cover rounded border border-gray-300 flex-shrink-0`,
                                            onError: (e)=>{
                                                console.error(`❌ [SIZE IMAGE] Failed to load image for size "${g.value}":`, processedImageUrl);
                                                e.target.style.display = 'none';
                                            },
                                            onLoad: ()=>{
                                                console.log(`✅ [SIZE IMAGE] Successfully loaded image for size "${g.value}":`, processedImageUrl);
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                            lineNumber: 211,
                                            columnNumber: 27
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `${textSizeClass} font-medium`,
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAttributeLabel"])(language, attrKey, g.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `${totalValues > 10 ? 'text-[10px]' : 'text-xs'} ${displayStock > 0 ? 'text-gray-500' : 'text-gray-400'}`,
                                                    children: [
                                                        "(",
                                                        displayStock,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                            lineNumber: 224,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, g.valueId || g.value, true, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                    lineNumber: 199,
                                    columnNumber: 23
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                            lineNumber: 167,
                            columnNumber: 17
                        }, this) : // Generic attribute selector
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-1.5",
                            children: attrGroups.map((g)=>{
                                const selectedValueId = selectedAttributeValues.get(attrKey);
                                const isSelected = selectedValueId === g.valueId || !g.valueId && selectedColor === g.value;
                                // IMPORTANT: Don't disable based on stock - show all attribute values, even if stock is 0
                                // Stock is just informational, not a reason to hide the option
                                const isDisabled = false; // Always show all attribute values
                                // Process imageUrl to ensure it's in the correct format
                                const processedImageUrl = g.imageUrl ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processImageUrl"])(g.imageUrl) : null;
                                const hasImage = processedImageUrl && processedImageUrl.trim() !== '';
                                const hasColors = g.colors && Array.isArray(g.colors) && g.colors.length > 0;
                                const colorHex = hasColors && g.colors ? g.colors[0] : null;
                                // Debug logging for image issues
                                if (g.imageUrl && !hasImage) {
                                    console.warn(`⚠️ [ATTRIBUTE IMAGE] Failed to process imageUrl for attribute "${attrKey}" value "${g.value}":`, g.imageUrl);
                                }
                                // Dynamic sizing based on number of values
                                // Keep size consistent for 2 values, reduce for more
                                const totalValues = attrGroups.length;
                                const paddingClass = totalValues > 6 ? 'px-2 py-1' : totalValues > 3 ? 'px-3 py-1.5' : 'px-4 py-2';
                                const textSizeClass = totalValues > 6 ? 'text-xs' : 'text-sm';
                                const imageSizeClass = totalValues > 6 ? 'w-4 h-4' : totalValues > 3 ? 'w-5 h-5' : 'w-6 h-6';
                                const gapClass = totalValues > 6 ? 'gap-1' : 'gap-2';
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if ("TURBOPACK compile-time truthy", 1) {
                                            onAttributeValueSelect(attrKey, g.valueId || g.value);
                                        }
                                    },
                                    className: `${paddingClass} rounded-lg border-2 transition-all flex items-center ${gapClass} ${isSelected ? 'border-green-500 bg-gray-50' : g.stock <= 0 ? 'border-gray-200 opacity-60 hover:opacity-80' : 'border-gray-200 hover:border-gray-400'}`,
                                    style: !hasImage && colorHex ? {
                                        backgroundColor: colorHex
                                    } : {},
                                    children: [
                                        hasImage && processedImageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: processedImageUrl,
                                            alt: g.label,
                                            className: `${imageSizeClass} object-cover rounded border border-gray-300 flex-shrink-0`,
                                            onError: (e)=>{
                                                console.error(`❌ [ATTRIBUTE IMAGE] Failed to load image for attribute "${attrKey}" value "${g.value}":`, processedImageUrl);
                                                e.target.style.display = 'none';
                                            },
                                            onLoad: ()=>{
                                                console.log(`✅ [ATTRIBUTE IMAGE] Successfully loaded image for attribute "${attrKey}" value "${g.value}":`, processedImageUrl);
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                            lineNumber: 293,
                                            columnNumber: 27
                                        }, this) : hasColors && colorHex ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `${imageSizeClass} rounded border border-gray-300 flex-shrink-0`,
                                            style: {
                                                backgroundColor: colorHex
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                            lineNumber: 306,
                                            columnNumber: 27
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: textSizeClass,
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAttributeLabel"])(language, attrKey, g.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `${totalValues > 10 ? 'text-[10px]' : 'text-xs'} ${g.stock > 0 ? 'text-gray-500' : 'text-gray-400'}`,
                                                    children: [
                                                        "(",
                                                        g.stock,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                            lineNumber: 311,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, g.valueId || g.value, true, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                    lineNumber: 276,
                                    columnNumber: 23
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                            lineNumber: 234,
                            columnNumber: 17
                        }, this)
                    ]
                }, attrKey, true, {
                    fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                    lineNumber: 98,
                    columnNumber: 13
                }, this);
            }) : // Old format: Use colorGroups and sizeGroups
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: colorGroups.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-sm font-medium",
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.color'),
                                ":"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                            lineNumber: 328,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2 items-center",
                            children: colorGroups.map((g)=>{
                                const isSelected = selectedColor === g.color?.toLowerCase().trim();
                                const isDisabled = g.stock <= 0;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>!isDisabled && onColorSelect(g.color),
                                            disabled: isDisabled,
                                            className: `w-10 h-10 rounded-full transition-all ${isSelected ? 'border-[3px] border-green-500 scale-110' : isDisabled ? 'border-2 border-gray-100 opacity-30 grayscale cursor-not-allowed' : 'border-2 border-gray-300 hover:scale-105'}`,
                                            style: {
                                                backgroundColor: getColorValue(g.color)
                                            },
                                            title: isDisabled ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAttributeLabel"])(language, 'color', g.color)} (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.outOfStock')})` : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAttributeLabel"])(language, 'color', g.color)}${g.stock > 0 ? ` (${g.stock} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.pcs')})` : ''}`
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                            lineNumber: 336,
                                            columnNumber: 23
                                        }, this),
                                        g.stock > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-gray-500",
                                            children: g.stock
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                            lineNumber: 350,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, g.color, true, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                    lineNumber: 335,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                            lineNumber: 329,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                    lineNumber: 327,
                    columnNumber: 13
                }, this)
            }, void 0, false),
            !product?.productAttributes && sizeGroups.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm font-bold uppercase",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.size')
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                        lineNumber: 364,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: sizeGroups.map((g)=>{
                            let displayStock = g.stock;
                            if (selectedColor) {
                                const v = g.variants.find((v)=>{
                                    const colorOpt = getOptionValue(v.options, 'color');
                                    return colorOpt === selectedColor.toLowerCase().trim();
                                });
                                displayStock = v ? v.stock : 0;
                            }
                            const isSelected = selectedSize === g.size;
                            const isDisabled = displayStock <= 0;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>!isDisabled && onSizeSelect(g.size),
                                disabled: isDisabled,
                                className: `min-w-[50px] px-3 py-2 rounded-lg border-2 transition-all ${isSelected ? 'border-green-500 bg-gray-50' : isDisabled ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed' : 'border-gray-200 hover:border-gray-400'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-sm font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-900'}`,
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAttributeLabel"])(language, 'size', g.size)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                            lineNumber: 392,
                                            columnNumber: 21
                                        }, this),
                                        displayStock > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-xs ${isDisabled ? 'text-gray-300' : 'text-gray-500'}`,
                                            children: [
                                                displayStock,
                                                " ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.pcs')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                            lineNumber: 394,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                    lineNumber: 391,
                                    columnNumber: 19
                                }, this)
                            }, g.size, false, {
                                fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                                lineNumber: 379,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                        lineNumber: 365,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
                lineNumber: 363,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_c = ProductAttributesSelector;
var _c;
__turbopack_context__.k.register(_c, "ProductAttributesSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductInfoAndActions",
    ()=>ProductInfoAndActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/currency.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CompareIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/icons/CompareIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$ProductAttributesSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/app/products/[slug]/ProductAttributesSelector.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function ProductInfoAndActions({ product, price, originalPrice, compareAtPrice, discountPercent, currency, language, averageRating, reviewsCount, quantity, maxQuantity, isOutOfStock, isVariationRequired, hasUnavailableAttributes, unavailableAttributes, canAddToCart, isAddingToCart, isInWishlist, isInCompare, showMessage, isLoggedIn, currentVariant, attributeGroups, selectedColor, selectedSize, selectedAttributeValues, colorGroups, sizeGroups, onQuantityAdjust, onAddToCart, onAddToWishlist, onCompareToggle, onScrollToReviews, onColorSelect, onSizeSelect, onAttributeValueSelect, getOptionValue, getRequiredAttributesMessage }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1",
                children: [
                    product.brand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 mb-2",
                        children: product.brand.name
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                        lineNumber: 96,
                        columnNumber: 27
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-gray-900 mb-4",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductText"])(language, product.id, 'title') || product.title
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3xl font-bold text-gray-900",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(price, currency)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this),
                                        discountPercent && discountPercent > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg font-semibold text-blue-600",
                                            children: [
                                                "-",
                                                discountPercent,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                (originalPrice || compareAtPrice && compareAtPrice > price) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-gray-500 line-through decoration-gray-400 mt-1",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(originalPrice || compareAtPrice || 0, currency)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                    lineNumber: 113,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-600 mb-8 prose prose-sm",
                        dangerouslySetInnerHTML: {
                            __html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductText"])(language, product.id, 'longDescription') || product.description || ''
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$ProductAttributesSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductAttributesSelector"], {
                            product: product,
                            attributeGroups: attributeGroups,
                            selectedColor: selectedColor,
                            selectedSize: selectedSize,
                            selectedAttributeValues: selectedAttributeValues,
                            unavailableAttributes: unavailableAttributes,
                            colorGroups: colorGroups,
                            sizeGroups: sizeGroups,
                            language: language,
                            quantity: quantity,
                            maxQuantity: maxQuantity,
                            isOutOfStock: isOutOfStock,
                            isVariationRequired: isVariationRequired,
                            hasUnavailableAttributes: hasUnavailableAttributes,
                            canAddToCart: canAddToCart,
                            isAddingToCart: isAddingToCart,
                            showMessage: showMessage,
                            onColorSelect: onColorSelect,
                            onSizeSelect: onSizeSelect,
                            onAttributeValueSelect: onAttributeValueSelect,
                            onQuantityAdjust: onQuantityAdjust,
                            onAddToCart: onAddToCart,
                            getOptionValue: getOptionValue,
                            getRequiredAttributesMessage: getRequiredAttributesMessage
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 p-4 bg-white border border-gray-200 rounded-2xl space-y-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 pb-3 border-b border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                1,
                                                2,
                                                3,
                                                4,
                                                5
                                            ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: `w-5 h-5 ${star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`,
                                                    fill: "currentColor",
                                                    viewBox: "0 0 20 20",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                                        lineNumber: 167,
                                                        columnNumber: 21
                                                    }, this)
                                                }, star, false, {
                                                    fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                            lineNumber: 155,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-gray-900",
                                            children: averageRating > 0 ? averageRating.toFixed(1) : '0.0'
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                            lineNumber: 171,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    onClick: onScrollToReviews,
                                    className: "text-sm text-gray-600 cursor-pointer hover:text-gray-900 hover:underline transition-colors",
                                    children: [
                                        "(",
                                        reviewsCount,
                                        " ",
                                        reviewsCount === 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'common.reviews.review') : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'common.reviews.reviews'),
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                    lineNumber: 175,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto pt-6",
                children: [
                    isVariationRequired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-yellow-800 font-medium",
                            children: getRequiredAttributesMessage()
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                            lineNumber: 190,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this),
                    hasUnavailableAttributes && !isVariationRequired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 p-3 bg-red-50 border border-red-200 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-red-800 font-medium",
                            children: [
                                Array.from(unavailableAttributes.entries()).map(([attrKey])=>{
                                    const productAttr = product?.productAttributes?.find((pa)=>pa.attribute?.key === attrKey);
                                    const attributeName = productAttr?.attribute?.name || attrKey.charAt(0).toUpperCase() + attrKey.slice(1);
                                    return attrKey === 'color' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.color') : attrKey === 'size' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.size') : attributeName;
                                }).join(', '),
                                " ",
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.outOfStock')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                            lineNumber: 198,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 pt-4 border-t",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center border rounded-xl overflow-hidden bg-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onQuantityAdjust(-1),
                                        disabled: quantity <= 1,
                                        className: "w-12 h-12 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: "-"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                        lineNumber: 211,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 text-center font-bold",
                                        children: quantity
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onQuantityAdjust(1),
                                        disabled: quantity >= maxQuantity,
                                        className: "w-12 h-12 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: !canAddToCart || isAddingToCart,
                                className: "flex-1 h-12 bg-gray-900 text-white rounded-xl uppercase font-bold disabled:bg-gray-300 disabled:cursor-not-allowed",
                                onClick: onAddToCart,
                                children: isAddingToCart ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.adding') : isOutOfStock ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.outOfStock') : isVariationRequired ? getRequiredAttributesMessage() : hasUnavailableAttributes ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.outOfStock') : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.addToCart')
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onCompareToggle,
                                className: `w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${isInCompare ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CompareIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompareIcon"], {
                                    isActive: isInCompare
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                    lineNumber: 238,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onAddToWishlist,
                                className: `w-12 h-12 rounded-xl border-2 flex items-center justify-center ${isInWishlist ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                    fill: isInWishlist ? 'currentColor' : 'none'
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                    lineNumber: 244,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            showMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 p-4 bg-gray-900 text-white rounded-md shadow-lg",
                children: showMessage
            }, void 0, false, {
                fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
                lineNumber: 248,
                columnNumber: 23
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_c = ProductInfoAndActions;
var _c;
__turbopack_context__.k.register(_c, "ProductInfoAndActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/app/products/[slug]/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Product page types and interfaces
__turbopack_context__.s([
    "COMPARE_KEY",
    ()=>COMPARE_KEY,
    "RESERVED_ROUTES",
    ()=>RESERVED_ROUTES,
    "WISHLIST_KEY",
    ()=>WISHLIST_KEY
]);
const RESERVED_ROUTES = [
    'admin',
    'login',
    'register',
    'cart',
    'checkout',
    'profile',
    'orders',
    'wishlist',
    'compare',
    'categories',
    'products',
    'about',
    'contact',
    'delivery',
    'shipping',
    'returns',
    'faq',
    'support',
    'stores',
    'privacy',
    'terms',
    'cookies'
];
const WISHLIST_KEY = 'shop_wishlist';
const COMPARE_KEY = 'shop_compare';
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/app/products/[slug]/useProductPage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProductPage",
    ()=>useProductPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/currency.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/language.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/app/products/[slug]/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/image-utils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function useProductPage(params) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [product, setProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentImageIndex, setCurrentImageIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currency, setCurrency] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredCurrency"])());
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const [selectedVariant, setSelectedVariant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedColor, setSelectedColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedSize, setSelectedSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedAttributeValues, setSelectedAttributeValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [isAddingToCart, setIsAddingToCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showMessage, setShowMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [thumbnailStartIndex, setThumbnailStartIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isInWishlist, setIsInWishlist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isInCompare, setIsInCompare] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [reviews, setReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const resolvedParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const rawSlug = resolvedParams?.slug ?? '';
    const slugParts = rawSlug.includes(':') ? rawSlug.split(':') : [
        rawSlug
    ];
    const slug = slugParts[0];
    const variantIdFromUrl = slugParts.length > 1 ? slugParts[1] : null;
    // Get images array from product
    const images = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useProductPage.useMemo[images]": ()=>{
            if (!product) return [];
            const mainImages = Array.isArray(product.media) ? product.media : [];
            const cleanedMain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cleanImageUrls"])(mainImages);
            const variantImages = [];
            if (product.variants && Array.isArray(product.variants)) {
                const sortedVariants = [
                    ...product.variants
                ].sort({
                    "useProductPage.useMemo[images].sortedVariants": (a, b)=>{
                        const aPos = a.position ?? 0;
                        const bPos = b.position ?? 0;
                        return aPos - bPos;
                    }
                }["useProductPage.useMemo[images].sortedVariants"]);
                sortedVariants.forEach({
                    "useProductPage.useMemo[images]": (v)=>{
                        if (v.imageUrl) {
                            const urls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smartSplitUrls"])(v.imageUrl);
                            variantImages.push(...urls);
                        }
                    }
                }["useProductPage.useMemo[images]"]);
            }
            const cleanedVariantImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cleanImageUrls"])(variantImages);
            const allImages = [];
            const seenNormalized = new Set();
            cleanedMain.forEach({
                "useProductPage.useMemo[images]": (img)=>{
                    const processed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processImageUrl"])(img) || img;
                    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeUrlForComparison"])(processed);
                    if (!seenNormalized.has(normalized)) {
                        allImages.push(img);
                        seenNormalized.add(normalized);
                    }
                }
            }["useProductPage.useMemo[images]"]);
            cleanedVariantImages.forEach({
                "useProductPage.useMemo[images]": (img)=>{
                    const processed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processImageUrl"])(img) || img;
                    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeUrlForComparison"])(processed);
                    if (!seenNormalized.has(normalized)) {
                        allImages.push(img);
                        seenNormalized.add(normalized);
                    }
                }
            }["useProductPage.useMemo[images]"]);
            return allImages;
        }
    }["useProductPage.useMemo[images]"], [
        product
    ]);
    // Fetch product
    const fetchProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProductPage.useCallback[fetchProduct]": async ()=>{
            if (!slug || __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESERVED_ROUTES"].includes(slug.toLowerCase())) return;
            try {
                setLoading(true);
                const currentLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])();
                let data;
                try {
                    data = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/v1/products/${slug}`, {
                        params: {
                            lang: currentLang
                        }
                    });
                } catch (error) {
                    if (error?.status === 404 && currentLang !== 'en') {
                        try {
                            data = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/v1/products/${slug}`, {
                                params: {
                                    lang: 'en'
                                }
                            });
                        } catch (fallbackError) {
                            throw error;
                        }
                    } else {
                        throw error;
                    }
                }
                console.log('📦 [USE PRODUCT PAGE] Fetched product:', data.id);
                console.log('📦 [USE PRODUCT PAGE] productAttributes:', data.productAttributes);
                console.log('📦 [USE PRODUCT PAGE] productAttributes length:', data.productAttributes?.length || 0);
                console.log('📦 [USE PRODUCT PAGE] variants count:', data.variants?.length || 0);
                if (data.variants && data.variants.length > 0) {
                    console.log('📦 [USE PRODUCT PAGE] First variant options:', data.variants[0]?.options);
                    data.variants.forEach({
                        "useProductPage.useCallback[fetchProduct]": (v, idx)=>{
                            console.log(`📦 [USE PRODUCT PAGE] Variant ${idx} (${v.id}) options:`, v.options);
                        }
                    }["useProductPage.useCallback[fetchProduct]"]);
                }
                setProduct(data);
                setCurrentImageIndex(0);
                setThumbnailStartIndex(0);
                if (data.variants && data.variants.length > 0) {
                    let initialVariant = data.variants[0];
                    if (variantIdFromUrl) {
                        const variantById = data.variants.find({
                            "useProductPage.useCallback[fetchProduct].variantById": (v)=>v.id === variantIdFromUrl || v.id.endsWith(variantIdFromUrl)
                        }["useProductPage.useCallback[fetchProduct].variantById"]);
                        const variantByIndex = data.variants[parseInt(variantIdFromUrl) - 1];
                        initialVariant = variantById || variantByIndex || data.variants[0];
                    }
                    setSelectedVariant(initialVariant);
                    const colorOption = initialVariant.options?.find({
                        "useProductPage.useCallback[fetchProduct]": (opt)=>opt.key === 'color'
                    }["useProductPage.useCallback[fetchProduct]"]);
                    if (colorOption) setSelectedColor(colorOption.value?.toLowerCase().trim() || null);
                    const sizeOption = initialVariant.options?.find({
                        "useProductPage.useCallback[fetchProduct]": (opt)=>opt.key === 'size'
                    }["useProductPage.useCallback[fetchProduct]"]);
                    if (sizeOption) setSelectedSize(sizeOption.value?.toLowerCase().trim() || null);
                }
            } catch (error) {
                if (error?.status === 404) {
                    setProduct(null);
                }
            } finally{
                setLoading(false);
            }
        }
    }["useProductPage.useCallback[fetchProduct]"], [
        slug,
        variantIdFromUrl
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProductPage.useEffect": ()=>{
            if (!slug) return;
            if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESERVED_ROUTES"].includes(slug.toLowerCase())) {
                router.replace(`/${slug}`);
            }
        }
    }["useProductPage.useEffect"], [
        slug,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProductPage.useEffect": ()=>{
            setLanguage((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])());
        }
    }["useProductPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProductPage.useEffect": ()=>{
            if (!slug || __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESERVED_ROUTES"].includes(slug.toLowerCase())) return;
            fetchProduct();
            const handleCurrencyUpdate = {
                "useProductPage.useEffect.handleCurrencyUpdate": ()=>setCurrency((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredCurrency"])())
            }["useProductPage.useEffect.handleCurrencyUpdate"];
            const handleLanguageUpdate = {
                "useProductPage.useEffect.handleLanguageUpdate": ()=>{
                    setLanguage((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])());
                    fetchProduct();
                }
            }["useProductPage.useEffect.handleLanguageUpdate"];
            const handleCurrencyRatesUpdate = {
                "useProductPage.useEffect.handleCurrencyRatesUpdate": ()=>setCurrency((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredCurrency"])())
            }["useProductPage.useEffect.handleCurrencyRatesUpdate"];
            window.addEventListener('currency-updated', handleCurrencyUpdate);
            window.addEventListener('language-updated', handleLanguageUpdate);
            window.addEventListener('currency-rates-updated', handleCurrencyRatesUpdate);
            return ({
                "useProductPage.useEffect": ()=>{
                    window.removeEventListener('currency-updated', handleCurrencyUpdate);
                    window.removeEventListener('language-updated', handleLanguageUpdate);
                    window.removeEventListener('currency-rates-updated', handleCurrencyRatesUpdate);
                }
            })["useProductPage.useEffect"];
        }
    }["useProductPage.useEffect"], [
        slug,
        variantIdFromUrl,
        router,
        fetchProduct
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProductPage.useEffect": ()=>{
            if (!product) return;
            const checkWishlist = {
                "useProductPage.useEffect.checkWishlist": ()=>{
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    try {
                        const stored = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WISHLIST_KEY"]);
                        const wishlist = stored ? JSON.parse(stored) : [];
                        setIsInWishlist(wishlist.includes(product.id));
                    } catch  {
                        setIsInWishlist(false);
                    }
                }
            }["useProductPage.useEffect.checkWishlist"];
            checkWishlist();
            window.addEventListener('wishlist-updated', checkWishlist);
            return ({
                "useProductPage.useEffect": ()=>window.removeEventListener('wishlist-updated', checkWishlist)
            })["useProductPage.useEffect"];
        }
    }["useProductPage.useEffect"], [
        product?.id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProductPage.useEffect": ()=>{
            if (!product) return;
            const checkCompare = {
                "useProductPage.useEffect.checkCompare": ()=>{
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    try {
                        const stored = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPARE_KEY"]);
                        const compare = stored ? JSON.parse(stored) : [];
                        setIsInCompare(compare.includes(product.id));
                    } catch  {
                        setIsInCompare(false);
                    }
                }
            }["useProductPage.useEffect.checkCompare"];
            checkCompare();
            window.addEventListener('compare-updated', checkCompare);
            return ({
                "useProductPage.useEffect": ()=>window.removeEventListener('compare-updated', checkCompare)
            })["useProductPage.useEffect"];
        }
    }["useProductPage.useEffect"], [
        product?.id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProductPage.useEffect": ()=>{
            if (images.length > 0 && currentImageIndex >= images.length) {
                setCurrentImageIndex(0);
            }
        }
    }["useProductPage.useEffect"], [
        images.length,
        currentImageIndex
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProductPage.useEffect": ()=>{
            if (!product || !slug) return;
            const loadReviews = {
                "useProductPage.useEffect.loadReviews": async ()=>{
                    try {
                        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/v1/products/${slug}/reviews`);
                        setReviews(data || []);
                    } catch (error) {
                        setReviews([]);
                    }
                }
            }["useProductPage.useEffect.loadReviews"];
            loadReviews();
            const handleReviewUpdate = {
                "useProductPage.useEffect.handleReviewUpdate": ()=>loadReviews()
            }["useProductPage.useEffect.handleReviewUpdate"];
            if ("TURBOPACK compile-time truthy", 1) {
                window.addEventListener('review-updated', handleReviewUpdate);
                return ({
                    "useProductPage.useEffect": ()=>window.removeEventListener('review-updated', handleReviewUpdate)
                })["useProductPage.useEffect"];
            }
        }
    }["useProductPage.useEffect"], [
        product?.id,
        slug
    ]);
    const averageRating = reviews.length > 0 ? reviews.reduce((sum, review)=>sum + review.rating, 0) / reviews.length : 0;
    const scrollToReviews = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProductPage.useCallback[scrollToReviews]": ()=>{
            const reviewsElement = document.getElementById('product-reviews');
            if (reviewsElement) {
                reviewsElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }["useProductPage.useCallback[scrollToReviews]"], []);
    const getOptionValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProductPage.useCallback[getOptionValue]": (options, key)=>{
            if (!options) return null;
            const opt = options.find({
                "useProductPage.useCallback[getOptionValue].opt": (o)=>o.key === key || o.attribute === key
            }["useProductPage.useCallback[getOptionValue].opt"]);
            return opt?.value?.toLowerCase().trim() || null;
        }
    }["useProductPage.useCallback[getOptionValue]"], []);
    const variantHasColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProductPage.useCallback[variantHasColor]": (variant, color)=>{
            if (!variant.options || !color) return false;
            const normalizedColor = color.toLowerCase().trim();
            const colorOptions = variant.options.filter({
                "useProductPage.useCallback[variantHasColor].colorOptions": (opt)=>opt.key === 'color' || opt.attribute === 'color'
            }["useProductPage.useCallback[variantHasColor].colorOptions"]);
            return colorOptions.some({
                "useProductPage.useCallback[variantHasColor]": (opt)=>{
                    const optValue = opt.value?.toLowerCase().trim();
                    return optValue === normalizedColor;
                }
            }["useProductPage.useCallback[variantHasColor]"]);
        }
    }["useProductPage.useCallback[variantHasColor]"], []);
    const findVariantByColorAndSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProductPage.useCallback[findVariantByColorAndSize]": (color, size)=>{
            if (!product?.variants || product.variants.length === 0) return null;
            const normalizedColor = color?.toLowerCase().trim();
            const normalizedSize = size?.toLowerCase().trim();
            if (normalizedColor && normalizedSize) {
                const variant = product.variants.find({
                    "useProductPage.useCallback[findVariantByColorAndSize].variant": (v)=>{
                        const hasColor = variantHasColor(v, normalizedColor);
                        const vSize = getOptionValue(v.options, 'size');
                        return hasColor && vSize === normalizedSize;
                    }
                }["useProductPage.useCallback[findVariantByColorAndSize].variant"]);
                if (variant) return variant;
            }
            if (normalizedColor) {
                const colorVariants = product.variants.filter({
                    "useProductPage.useCallback[findVariantByColorAndSize].colorVariants": (v)=>variantHasColor(v, normalizedColor)
                }["useProductPage.useCallback[findVariantByColorAndSize].colorVariants"]);
                if (colorVariants.length > 0) {
                    return colorVariants.find({
                        "useProductPage.useCallback[findVariantByColorAndSize]": (v)=>v.stock > 0
                    }["useProductPage.useCallback[findVariantByColorAndSize]"]) || colorVariants[0];
                }
            }
            if (normalizedSize) {
                const sizeVariants = product.variants.filter({
                    "useProductPage.useCallback[findVariantByColorAndSize].sizeVariants": (v)=>{
                        const vSize = getOptionValue(v.options, 'size');
                        return vSize === normalizedSize;
                    }
                }["useProductPage.useCallback[findVariantByColorAndSize].sizeVariants"]);
                if (sizeVariants.length > 0) {
                    return sizeVariants.find({
                        "useProductPage.useCallback[findVariantByColorAndSize]": (v)=>v.stock > 0
                    }["useProductPage.useCallback[findVariantByColorAndSize]"]) || sizeVariants[0];
                }
            }
            return product.variants.find({
                "useProductPage.useCallback[findVariantByColorAndSize]": (v)=>v.stock > 0
            }["useProductPage.useCallback[findVariantByColorAndSize]"]) || product.variants[0] || null;
        }
    }["useProductPage.useCallback[findVariantByColorAndSize]"], [
        product?.variants,
        getOptionValue,
        variantHasColor
    ]);
    const findVariantByAllAttributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProductPage.useCallback[findVariantByAllAttributes]": (color, size, otherAttributes)=>{
            if (!product?.variants || product.variants.length === 0) return null;
            const normalizedColor = color?.toLowerCase().trim();
            const normalizedSize = size?.toLowerCase().trim();
            const allSelectedAttributes = new Map();
            if (normalizedColor) allSelectedAttributes.set('color', normalizedColor);
            if (normalizedSize) allSelectedAttributes.set('size', normalizedSize);
            otherAttributes.forEach({
                "useProductPage.useCallback[findVariantByAllAttributes]": (value, key)=>{
                    if (key !== 'color' && key !== 'size') {
                        allSelectedAttributes.set(key, value.toLowerCase().trim());
                    }
                }
            }["useProductPage.useCallback[findVariantByAllAttributes]"]);
            const variantMatches = {
                "useProductPage.useCallback[findVariantByAllAttributes].variantMatches": (variant)=>{
                    if (normalizedColor) {
                        if (!variantHasColor(variant, normalizedColor)) return false;
                    }
                    if (normalizedSize) {
                        const vSize = getOptionValue(variant.options, 'size');
                        if (vSize !== normalizedSize) return false;
                    }
                    for (const [attrKey, attrValue] of otherAttributes.entries()){
                        if (attrKey === 'color' || attrKey === 'size') continue;
                        const variantValue = getOptionValue(variant.options, attrKey);
                        const normalizedAttrValue = attrValue.toLowerCase().trim();
                        const option = variant.options?.find({
                            "useProductPage.useCallback[findVariantByAllAttributes].variantMatches": (opt)=>opt.key === attrKey || opt.attribute === attrKey
                        }["useProductPage.useCallback[findVariantByAllAttributes].variantMatches"]);
                        if (option) {
                            if (option.valueId && attrValue && option.valueId === attrValue) {
                                continue;
                            }
                            if (variantValue !== normalizedAttrValue) {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    }
                    return true;
                }
            }["useProductPage.useCallback[findVariantByAllAttributes].variantMatches"];
            const exactMatch = product.variants.find({
                "useProductPage.useCallback[findVariantByAllAttributes].exactMatch": (v)=>variantMatches(v) && v.imageUrl
            }["useProductPage.useCallback[findVariantByAllAttributes].exactMatch"]);
            if (exactMatch) return exactMatch;
            const anyMatch = product.variants.find({
                "useProductPage.useCallback[findVariantByAllAttributes].anyMatch": (v)=>variantMatches(v)
            }["useProductPage.useCallback[findVariantByAllAttributes].anyMatch"]);
            if (anyMatch) return anyMatch;
            if (normalizedColor || normalizedSize) {
                return findVariantByColorAndSize(normalizedColor || null, normalizedSize || null);
            }
            return product.variants.find({
                "useProductPage.useCallback[findVariantByAllAttributes]": (v)=>v.stock > 0
            }["useProductPage.useCallback[findVariantByAllAttributes]"]) || product.variants[0] || null;
        }
    }["useProductPage.useCallback[findVariantByAllAttributes]"], [
        product?.variants,
        getOptionValue,
        findVariantByColorAndSize,
        variantHasColor
    ]);
    // Build attribute groups - simplified version
    const attributeGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useProductPage.useMemo[attributeGroups]": ()=>{
            const groups = new Map();
            if (!product) {
                console.log('🔄 [ATTRIBUTE GROUPS] No product, returning empty groups');
                return groups;
            }
            console.log('🔄 [ATTRIBUTE GROUPS] Building attribute groups for product:', product.id);
            console.log('🔄 [ATTRIBUTE GROUPS] product.productAttributes:', product.productAttributes);
            console.log('🔄 [ATTRIBUTE GROUPS] product.productAttributes length:', product.productAttributes?.length || 0);
            const isVariantCompatible = {
                "useProductPage.useMemo[attributeGroups].isVariantCompatible": (variant, currentSelections, excludeAttrKey)=>{
                    if (currentSelections.size === 0) return true;
                    for (const [attrKey, selectedValue] of currentSelections.entries()){
                        if (excludeAttrKey && attrKey === excludeAttrKey) continue;
                        const normalizedSelectedValue = selectedValue.toLowerCase().trim();
                        let hasMatchingValue = false;
                        const matchingOptions = variant.options?.filter({
                            "useProductPage.useMemo[attributeGroups].isVariantCompatible": (opt)=>{
                                const optKey = opt.key || opt.attribute;
                                return optKey === attrKey;
                            }
                        }["useProductPage.useMemo[attributeGroups].isVariantCompatible"]) || [];
                        if (matchingOptions.length === 0) return false;
                        for (const option of matchingOptions){
                            const optValue = option.value?.toLowerCase().trim();
                            const optValueId = option.valueId;
                            if (optValue === normalizedSelectedValue || optValueId && optValueId === selectedValue) {
                                hasMatchingValue = true;
                                break;
                            }
                        }
                        if (!hasMatchingValue) return false;
                    }
                    return true;
                }
            }["useProductPage.useMemo[attributeGroups].isVariantCompatible"];
            const getCurrentSelections = {
                "useProductPage.useMemo[attributeGroups].getCurrentSelections": (excludeAttrKey)=>{
                    const selections = new Map();
                    if (selectedColor && excludeAttrKey !== 'color') selections.set('color', selectedColor);
                    if (selectedSize && excludeAttrKey !== 'size') selections.set('size', selectedSize);
                    selectedAttributeValues.forEach({
                        "useProductPage.useMemo[attributeGroups].getCurrentSelections": (value, key)=>{
                            if (key !== excludeAttrKey) selections.set(key, value);
                        }
                    }["useProductPage.useMemo[attributeGroups].getCurrentSelections"]);
                    return selections;
                }
            }["useProductPage.useMemo[attributeGroups].getCurrentSelections"];
            if (product.productAttributes && product.productAttributes.length > 0) {
                console.log('🔄 [ATTRIBUTE GROUPS] Using productAttributes format, processing', product.productAttributes.length, 'attributes');
                product.productAttributes.forEach({
                    "useProductPage.useMemo[attributeGroups]": (productAttr)=>{
                        const attrKey = productAttr.attribute.key;
                        console.log('🔄 [ATTRIBUTE GROUPS] Processing attribute:', attrKey, 'with', productAttr.attribute.values?.length || 0, 'values');
                        const valueMap = new Map();
                        product.variants?.forEach({
                            "useProductPage.useMemo[attributeGroups]": (variant)=>{
                                const options = variant.options?.filter({
                                    "useProductPage.useMemo[attributeGroups]": (opt)=>{
                                        if (opt.valueId && opt.attributeId === productAttr.attribute.id) return true;
                                        return opt.key === attrKey || opt.attribute === attrKey;
                                    }
                                }["useProductPage.useMemo[attributeGroups]"]) || [];
                                options.forEach({
                                    "useProductPage.useMemo[attributeGroups]": (option)=>{
                                        const valueId = option.valueId || '';
                                        const value = option.value || '';
                                        let label = option.value || '';
                                        if (valueId && productAttr.attribute.values) {
                                            const attrValue = productAttr.attribute.values.find({
                                                "useProductPage.useMemo[attributeGroups].attrValue": (v)=>v.id === valueId
                                            }["useProductPage.useMemo[attributeGroups].attrValue"]);
                                            if (attrValue) label = attrValue.label || attrValue.value || value;
                                        }
                                        const mapKey = valueId || value;
                                        if (!valueMap.has(mapKey)) {
                                            valueMap.set(mapKey, {
                                                valueId: valueId || undefined,
                                                value,
                                                label,
                                                variants: []
                                            });
                                        }
                                        if (!valueMap.get(mapKey).variants.some({
                                            "useProductPage.useMemo[attributeGroups]": (v)=>v.id === variant.id
                                        }["useProductPage.useMemo[attributeGroups]"])) {
                                            valueMap.get(mapKey).variants.push(variant);
                                        }
                                    }
                                }["useProductPage.useMemo[attributeGroups]"]);
                            }
                        }["useProductPage.useMemo[attributeGroups]"]);
                        const currentSelections = getCurrentSelections(attrKey);
                        const groupsArray = Array.from(valueMap.values()).map({
                            "useProductPage.useMemo[attributeGroups].groupsArray": (item)=>{
                                let attrValue = null;
                                if (item.valueId && productAttr.attribute.values) {
                                    attrValue = productAttr.attribute.values.find({
                                        "useProductPage.useMemo[attributeGroups].groupsArray": (v)=>v.id === item.valueId
                                    }["useProductPage.useMemo[attributeGroups].groupsArray"]);
                                }
                                if (!attrValue && productAttr.attribute.values) {
                                    attrValue = productAttr.attribute.values.find({
                                        "useProductPage.useMemo[attributeGroups].groupsArray": (v)=>v.value?.toLowerCase() === item.value?.toLowerCase() || v.value === item.value
                                    }["useProductPage.useMemo[attributeGroups].groupsArray"]);
                                }
                                let stock = 0;
                                if (currentSelections.size > 0) {
                                    const compatibleVariants = item.variants.filter({
                                        "useProductPage.useMemo[attributeGroups].groupsArray.compatibleVariants": (v)=>isVariantCompatible(v, currentSelections, attrKey)
                                    }["useProductPage.useMemo[attributeGroups].groupsArray.compatibleVariants"]);
                                    stock = compatibleVariants.reduce({
                                        "useProductPage.useMemo[attributeGroups].groupsArray": (sum, v)=>sum + v.stock
                                    }["useProductPage.useMemo[attributeGroups].groupsArray"], 0);
                                } else {
                                    stock = item.variants.reduce({
                                        "useProductPage.useMemo[attributeGroups].groupsArray": (sum, v)=>sum + v.stock
                                    }["useProductPage.useMemo[attributeGroups].groupsArray"], 0);
                                }
                                return {
                                    valueId: item.valueId,
                                    value: item.value,
                                    label: item.label,
                                    stock: stock,
                                    variants: item.variants,
                                    imageUrl: attrValue?.imageUrl || null,
                                    colors: attrValue?.colors || null
                                };
                            }
                        }["useProductPage.useMemo[attributeGroups].groupsArray"]);
                        console.log('🔄 [ATTRIBUTE GROUPS] Built', groupsArray.length, 'values for attribute', attrKey);
                        groups.set(attrKey, groupsArray);
                    }
                }["useProductPage.useMemo[attributeGroups]"]);
                console.log('🔄 [ATTRIBUTE GROUPS] Final groups size:', groups.size);
            } else {
                console.log('🔄 [ATTRIBUTE GROUPS] No productAttributes, falling back to old format (color/size only)');
                console.log('🔄 [ATTRIBUTE GROUPS] Product variants count:', product?.variants?.length || 0);
                if (product?.variants) {
                    const colorMap = new Map();
                    const sizeMap = new Map();
                    product.variants.forEach({
                        "useProductPage.useMemo[attributeGroups]": (variant)=>{
                            console.log('🔄 [ATTRIBUTE GROUPS] Variant', variant.id, 'options:', variant.options);
                            variant.options?.forEach({
                                "useProductPage.useMemo[attributeGroups]": (opt)=>{
                                    const attrKey = opt.key || opt.attribute || '';
                                    const value = opt.value || '';
                                    console.log('🔄 [ATTRIBUTE GROUPS] Option:', {
                                        attrKey,
                                        value
                                    });
                                    if (!value) return;
                                    if (attrKey === 'color') {
                                        const normalizedColor = value.toLowerCase().trim();
                                        if (!colorMap.has(normalizedColor)) colorMap.set(normalizedColor, []);
                                        if (!colorMap.get(normalizedColor).some({
                                            "useProductPage.useMemo[attributeGroups]": (v)=>v.id === variant.id
                                        }["useProductPage.useMemo[attributeGroups]"])) {
                                            colorMap.get(normalizedColor).push(variant);
                                        }
                                    } else if (attrKey === 'size') {
                                        const normalizedSize = value.toLowerCase().trim();
                                        if (!sizeMap.has(normalizedSize)) sizeMap.set(normalizedSize, []);
                                        if (!sizeMap.get(normalizedSize).some({
                                            "useProductPage.useMemo[attributeGroups]": (v)=>v.id === variant.id
                                        }["useProductPage.useMemo[attributeGroups]"])) {
                                            sizeMap.get(normalizedSize).push(variant);
                                        }
                                    } else {
                                        // Also collect other attributes, not just color and size
                                        console.log('🔄 [ATTRIBUTE GROUPS] Found other attribute:', attrKey, '=', value);
                                    }
                                }
                            }["useProductPage.useMemo[attributeGroups]"]);
                        }
                    }["useProductPage.useMemo[attributeGroups]"]);
                    console.log('🔄 [ATTRIBUTE GROUPS] Color map size:', colorMap.size);
                    console.log('🔄 [ATTRIBUTE GROUPS] Size map size:', sizeMap.size);
                    if (colorMap.size > 0) {
                        const colorGroups = Array.from(colorMap.entries()).map({
                            "useProductPage.useMemo[attributeGroups].colorGroups": ([value, variants])=>({
                                    value,
                                    label: value,
                                    stock: variants.reduce({
                                        "useProductPage.useMemo[attributeGroups].colorGroups": (sum, v)=>sum + v.stock
                                    }["useProductPage.useMemo[attributeGroups].colorGroups"], 0),
                                    variants
                                })
                        }["useProductPage.useMemo[attributeGroups].colorGroups"]);
                        console.log('🔄 [ATTRIBUTE GROUPS] Setting color groups:', colorGroups.length);
                        groups.set('color', colorGroups);
                    }
                    if (sizeMap.size > 0) {
                        const sizeGroups = Array.from(sizeMap.entries()).map({
                            "useProductPage.useMemo[attributeGroups].sizeGroups": ([value, variants])=>({
                                    value,
                                    label: value,
                                    stock: variants.reduce({
                                        "useProductPage.useMemo[attributeGroups].sizeGroups": (sum, v)=>sum + v.stock
                                    }["useProductPage.useMemo[attributeGroups].sizeGroups"], 0),
                                    variants
                                })
                        }["useProductPage.useMemo[attributeGroups].sizeGroups"]);
                        console.log('🔄 [ATTRIBUTE GROUPS] Setting size groups:', sizeGroups.length);
                        groups.set('size', sizeGroups);
                    }
                    // Also collect ALL other attributes from variants (not just color/size)
                    const otherAttributesMap = new Map();
                    product.variants.forEach({
                        "useProductPage.useMemo[attributeGroups]": (variant)=>{
                            variant.options?.forEach({
                                "useProductPage.useMemo[attributeGroups]": (opt)=>{
                                    const attrKey = opt.key || opt.attribute || '';
                                    const value = opt.value || '';
                                    if (!value || attrKey === 'color' || attrKey === 'size') return;
                                    if (!otherAttributesMap.has(attrKey)) {
                                        otherAttributesMap.set(attrKey, new Map());
                                    }
                                    const valueMap = otherAttributesMap.get(attrKey);
                                    const normalizedValue = value.toLowerCase().trim();
                                    if (!valueMap.has(normalizedValue)) {
                                        valueMap.set(normalizedValue, []);
                                    }
                                    if (!valueMap.get(normalizedValue).some({
                                        "useProductPage.useMemo[attributeGroups]": (v)=>v.id === variant.id
                                    }["useProductPage.useMemo[attributeGroups]"])) {
                                        valueMap.get(normalizedValue).push(variant);
                                    }
                                }
                            }["useProductPage.useMemo[attributeGroups]"]);
                        }
                    }["useProductPage.useMemo[attributeGroups]"]);
                    // Add all other attributes to groups
                    otherAttributesMap.forEach({
                        "useProductPage.useMemo[attributeGroups]": (valueMap, attrKey)=>{
                            const attrGroups = Array.from(valueMap.entries()).map({
                                "useProductPage.useMemo[attributeGroups].attrGroups": ([value, variants])=>({
                                        value,
                                        label: value,
                                        stock: variants.reduce({
                                            "useProductPage.useMemo[attributeGroups].attrGroups": (sum, v)=>sum + v.stock
                                        }["useProductPage.useMemo[attributeGroups].attrGroups"], 0),
                                        variants
                                    })
                            }["useProductPage.useMemo[attributeGroups].attrGroups"]);
                            console.log('🔄 [ATTRIBUTE GROUPS] Setting attribute', attrKey, 'with', attrGroups.length, 'values');
                            groups.set(attrKey, attrGroups);
                        }
                    }["useProductPage.useMemo[attributeGroups]"]);
                }
            }
            console.log('🔄 [ATTRIBUTE GROUPS] Returning groups with', groups.size, 'attributes:', Array.from(groups.keys()));
            return groups;
        }
    }["useProductPage.useMemo[attributeGroups]"], [
        product,
        selectedColor,
        selectedSize,
        selectedAttributeValues,
        getOptionValue
    ]);
    const colorGroups = [];
    const colorAttrGroup = attributeGroups.get('color');
    if (colorAttrGroup) {
        colorGroups.push(...colorAttrGroup.map((g)=>({
                color: g.value,
                stock: g.stock,
                variants: g.variants
            })));
    }
    const sizeGroups = [];
    const sizeAttrGroup = attributeGroups.get('size');
    if (sizeAttrGroup) {
        sizeGroups.push(...sizeAttrGroup.map((g)=>({
                size: g.value,
                stock: g.stock,
                variants: g.variants
            })));
    }
    const currentVariant = selectedVariant || findVariantByColorAndSize(selectedColor, selectedSize) || product?.variants?.[0] || null;
    const price = currentVariant?.price || 0;
    const originalPrice = currentVariant?.originalPrice;
    const compareAtPrice = currentVariant?.compareAtPrice;
    const discountPercent = currentVariant?.productDiscount || product?.productDiscount || null;
    const maxQuantity = currentVariant?.stock && currentVariant.stock > 0 ? currentVariant.stock : 0;
    const isOutOfStock = !currentVariant || currentVariant.stock <= 0;
    const hasColorAttribute = colorGroups.length > 0 && colorGroups.some((g)=>g.stock > 0);
    const hasSizeAttribute = sizeGroups.length > 0 && sizeGroups.some((g)=>g.stock > 0);
    const needsColor = hasColorAttribute && !selectedColor;
    const needsSize = hasSizeAttribute && !selectedSize;
    const isVariationRequired = needsColor || needsSize;
    const getRequiredAttributesMessage = ()=>{
        if (needsColor && needsSize) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.selectColorAndSize');
        if (needsColor) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.selectColor');
        if (needsSize) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.selectSize');
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.selectOptions');
    };
    const unavailableAttributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useProductPage.useMemo[unavailableAttributes]": ()=>{
            const unavailable = new Map();
            if (!currentVariant || !product) return unavailable;
            currentVariant.options?.forEach({
                "useProductPage.useMemo[unavailableAttributes]": (option)=>{
                    const attrKey = option.key || option.attribute;
                    if (!attrKey) return;
                    const attrGroup = attributeGroups.get(attrKey);
                    if (!attrGroup) return;
                    const attrValue = attrGroup.find({
                        "useProductPage.useMemo[unavailableAttributes].attrValue": (g)=>{
                            if (option.valueId && g.valueId) return g.valueId === option.valueId;
                            return g.value?.toLowerCase().trim() === option.value?.toLowerCase().trim();
                        }
                    }["useProductPage.useMemo[unavailableAttributes].attrValue"]);
                    if (attrValue && attrValue.stock <= 0) unavailable.set(attrKey, true);
                }
            }["useProductPage.useMemo[unavailableAttributes]"]);
            return unavailable;
        }
    }["useProductPage.useMemo[unavailableAttributes]"], [
        currentVariant,
        attributeGroups,
        product
    ]);
    const hasUnavailableAttributes = unavailableAttributes.size > 0;
    const canAddToCart = !isOutOfStock && !isVariationRequired && !hasUnavailableAttributes;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProductPage.useEffect": ()=>{
            if (!currentVariant || currentVariant.stock <= 0) {
                setQuantity(0);
                return;
            }
            setQuantity({
                "useProductPage.useEffect": (prev)=>{
                    const currentStock = currentVariant.stock;
                    if (prev > currentStock) return currentStock;
                    if (prev <= 0 && currentStock > 0) return 1;
                    return prev;
                }
            }["useProductPage.useEffect"]);
        }
    }["useProductPage.useEffect"], [
        currentVariant?.id,
        currentVariant?.stock
    ]);
    const adjustQuantity = (delta)=>{
        if (isOutOfStock || isVariationRequired) return;
        setQuantity((prev)=>{
            const next = prev + delta;
            if (next < 1) return currentVariant && currentVariant.stock > 0 ? 1 : 0;
            return next > maxQuantity ? maxQuantity : next;
        });
    };
    // Switch to variant's image if it exists
    const switchToVariantImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProductPage.useCallback[switchToVariantImage]": (variant)=>{
            if (!variant || !variant.imageUrl || !product) return;
            const splitUrls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smartSplitUrls"])(variant.imageUrl);
            if (splitUrls.length === 0) return;
            const normalizeUrl = {
                "useProductPage.useCallback[switchToVariantImage].normalizeUrl": (url)=>{
                    let normalized = url.trim();
                    if (normalized.startsWith('/')) normalized = normalized.substring(1);
                    if (normalized.endsWith('/')) normalized = normalized.substring(0, normalized.length - 1);
                    return normalized.toLowerCase();
                }
            }["useProductPage.useCallback[switchToVariantImage].normalizeUrl"];
            const isAttributeValueImage = {
                "useProductPage.useCallback[switchToVariantImage].isAttributeValueImage": (url)=>{
                    if (!product.productAttributes) return false;
                    for (const productAttr of product.productAttributes){
                        if (productAttr.attribute?.values) {
                            for (const val of productAttr.attribute.values){
                                if (val.imageUrl) {
                                    const attrProcessed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processImageUrl"])(val.imageUrl);
                                    if (attrProcessed) {
                                        const normalizedAttr = normalizeUrl(attrProcessed);
                                        const normalizedVariant = normalizeUrl(url);
                                        if (normalizedAttr === normalizedVariant) return true;
                                    }
                                }
                            }
                        }
                    }
                    return false;
                }
            }["useProductPage.useCallback[switchToVariantImage].isAttributeValueImage"];
            for (const url of splitUrls){
                if (!url || url.trim() === '') continue;
                const processedUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processImageUrl"])(url);
                if (!processedUrl || isAttributeValueImage(processedUrl)) continue;
                const imageIndex = images.findIndex({
                    "useProductPage.useCallback[switchToVariantImage].imageIndex": (img)=>{
                        if (!img) return false;
                        const processedImg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processImageUrl"])(img);
                        if (!processedImg) return false;
                        const normalizedImg = normalizeUrl(processedImg);
                        const normalizedProcessed = normalizeUrl(processedUrl);
                        if (normalizedImg === normalizedProcessed) return true;
                        const imgWithSlash = processedImg.startsWith('/') ? processedImg : `/${processedImg}`;
                        const imgWithoutSlash = processedImg.startsWith('/') ? processedImg.substring(1) : processedImg;
                        const processedWithSlash = processedUrl.startsWith('/') ? processedUrl : `/${processedUrl}`;
                        const processedWithoutSlash = processedUrl.startsWith('/') ? processedUrl.substring(1) : processedUrl;
                        return imgWithSlash === processedWithSlash || imgWithoutSlash === processedWithoutSlash || imgWithSlash === processedWithoutSlash || imgWithoutSlash === processedWithSlash;
                    }
                }["useProductPage.useCallback[switchToVariantImage].imageIndex"]);
                if (imageIndex !== -1) {
                    setCurrentImageIndex(imageIndex);
                    return;
                }
            }
        }
    }["useProductPage.useCallback[switchToVariantImage]"], [
        images,
        product,
        setCurrentImageIndex
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProductPage.useEffect": ()=>{
            if (product && product.variants && product.variants.length > 0) {
                const newVariant = findVariantByAllAttributes(selectedColor, selectedSize, selectedAttributeValues);
                if (newVariant && newVariant.id !== selectedVariant?.id) {
                    setSelectedVariant(newVariant);
                    switchToVariantImage(newVariant);
                    const colorValue = getOptionValue(newVariant.options, 'color');
                    const sizeValue = getOptionValue(newVariant.options, 'size');
                    if (colorValue && colorValue !== selectedColor?.toLowerCase().trim()) {
                        setSelectedColor(colorValue);
                    }
                    if (sizeValue && sizeValue !== selectedSize?.toLowerCase().trim()) {
                        setSelectedSize(sizeValue);
                    }
                } else if (newVariant && newVariant.imageUrl) {
                    switchToVariantImage(newVariant);
                }
            }
        }
    }["useProductPage.useEffect"], [
        selectedColor,
        selectedSize,
        selectedAttributeValues,
        findVariantByAllAttributes,
        selectedVariant?.id,
        product,
        getOptionValue,
        switchToVariantImage
    ]);
    const handleColorSelect = (color)=>{
        if (!color || !product) return;
        const normalizedColor = color.toLowerCase().trim();
        if (selectedColor === normalizedColor) {
            setSelectedColor(null);
        } else {
            setSelectedColor(normalizedColor);
            // Try to find and switch to a variant image with this color
            const colorVariants = product.variants?.filter((v)=>{
                return variantHasColor(v, normalizedColor) && v.imageUrl;
            }) || [];
            for (const variant of colorVariants){
                if (!variant.imageUrl) continue;
                const splitUrls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smartSplitUrls"])(variant.imageUrl);
                for (const url of splitUrls){
                    if (!url || url.trim() === '') continue;
                    const processedUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processImageUrl"])(url);
                    if (!processedUrl) continue;
                    const normalizeUrl = (u)=>{
                        let n = u.trim().toLowerCase();
                        if (n.startsWith('/')) n = n.substring(1);
                        if (n.endsWith('/')) n = n.substring(0, n.length - 1);
                        return n;
                    };
                    const imageIndex = images.findIndex((img)=>{
                        if (!img) return false;
                        const processedImg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$image$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processImageUrl"])(img);
                        if (!processedImg) return false;
                        const normalizedImg = normalizeUrl(processedImg);
                        const normalizedUrl = normalizeUrl(processedUrl);
                        if (normalizedImg === normalizedUrl) return true;
                        const imgWithSlash = processedImg.startsWith('/') ? processedImg : `/${processedImg}`;
                        const imgWithoutSlash = processedImg.startsWith('/') ? processedImg.substring(1) : processedImg;
                        const urlWithSlash = processedUrl.startsWith('/') ? processedUrl : `/${processedUrl}`;
                        const urlWithoutSlash = processedUrl.startsWith('/') ? processedUrl.substring(1) : processedUrl;
                        return imgWithSlash === urlWithSlash || imgWithoutSlash === urlWithoutSlash || imgWithSlash === urlWithoutSlash || imgWithoutSlash === urlWithSlash;
                    });
                    if (imageIndex !== -1) {
                        setCurrentImageIndex(imageIndex);
                        return;
                    }
                }
            }
        }
    };
    const handleSizeSelect = (size)=>{
        if (selectedSize === size) setSelectedSize(null);
        else setSelectedSize(size);
    };
    const handleAttributeValueSelect = (attrKey, value)=>{
        const newMap = new Map(selectedAttributeValues);
        const currentValue = selectedAttributeValues.get(attrKey);
        if (currentValue === value) {
            newMap.delete(attrKey);
        } else {
            newMap.set(attrKey, value);
        }
        setSelectedAttributeValues(newMap);
    };
    const handleAddToWishlist = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (!product || ("TURBOPACK compile-time value", "object") === 'undefined') return;
        try {
            const stored = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WISHLIST_KEY"]);
            const wishlist = stored ? JSON.parse(stored) : [];
            if (isInWishlist) {
                localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WISHLIST_KEY"], JSON.stringify(wishlist.filter((id)=>id !== product.id)));
                setIsInWishlist(false);
                setShowMessage((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.removedFromWishlist'));
            } else {
                wishlist.push(product.id);
                localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WISHLIST_KEY"], JSON.stringify(wishlist));
                setIsInWishlist(true);
                setShowMessage((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.addedToWishlist'));
            }
            setTimeout(()=>setShowMessage(null), 2000);
            window.dispatchEvent(new Event('wishlist-updated'));
        } catch (err) {}
    };
    const handleCompareToggle = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (!product || ("TURBOPACK compile-time value", "object") === 'undefined') return;
        try {
            const stored = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPARE_KEY"]);
            const compare = stored ? JSON.parse(stored) : [];
            if (isInCompare) {
                localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPARE_KEY"], JSON.stringify(compare.filter((id)=>id !== product.id)));
                setIsInCompare(false);
                setShowMessage((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.removedFromCompare'));
            } else {
                if (compare.length >= 4) {
                    setShowMessage((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.compareListFull'));
                } else {
                    compare.push(product.id);
                    localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPARE_KEY"], JSON.stringify(compare));
                    setIsInCompare(true);
                    setShowMessage((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.addedToCompare'));
                }
            }
            setTimeout(()=>setShowMessage(null), 2000);
            window.dispatchEvent(new Event('compare-updated'));
        } catch (err) {}
    };
    return {
        product,
        loading,
        images,
        currentImageIndex,
        setCurrentImageIndex,
        thumbnailStartIndex,
        setThumbnailStartIndex,
        currency,
        language,
        selectedVariant,
        selectedColor,
        selectedSize,
        selectedAttributeValues,
        isAddingToCart,
        setIsAddingToCart,
        showMessage,
        setShowMessage,
        isInWishlist,
        isInCompare,
        quantity,
        reviews,
        averageRating,
        slug,
        attributeGroups,
        colorGroups,
        sizeGroups,
        currentVariant,
        price,
        originalPrice: originalPrice ?? null,
        compareAtPrice: compareAtPrice ?? null,
        discountPercent,
        maxQuantity,
        isOutOfStock,
        isVariationRequired,
        hasUnavailableAttributes,
        unavailableAttributes,
        canAddToCart,
        scrollToReviews,
        getOptionValue,
        adjustQuantity,
        handleColorSelect,
        handleSizeSelect,
        handleAttributeValueSelect,
        handleAddToWishlist,
        handleCompareToggle,
        getRequiredAttributesMessage
    };
}
_s(useProductPage, "FvouY8k1aeOCR4F7oTLblatH/0A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/app/products/[slug]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/auth/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$RelatedProducts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/RelatedProducts.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$ProductReviews$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/ProductReviews.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$ProductImageGallery$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/app/products/[slug]/ProductImageGallery.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$ProductInfoAndActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/app/products/[slug]/ProductInfoAndActions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$useProductPage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/app/products/[slug]/useProductPage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function ProductPage({ params }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isLoggedIn } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { product, loading, images, currentImageIndex, setCurrentImageIndex, thumbnailStartIndex, setThumbnailStartIndex, currency, language, selectedColor, selectedSize, selectedAttributeValues, isAddingToCart, setIsAddingToCart, showMessage, setShowMessage, isInWishlist, isInCompare, quantity, reviews, averageRating, slug, attributeGroups, colorGroups, sizeGroups, currentVariant, price, originalPrice, compareAtPrice, discountPercent, maxQuantity, isOutOfStock, isVariationRequired, hasUnavailableAttributes, unavailableAttributes, canAddToCart, scrollToReviews, getOptionValue, adjustQuantity, handleColorSelect, handleSizeSelect, handleAttributeValueSelect, handleAddToWishlist, handleCompareToggle, getRequiredAttributesMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$useProductPage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductPage"])(params);
    const handleAddToCart = async ()=>{
        if (!canAddToCart || !product || !currentVariant) return;
        setIsAddingToCart(true);
        try {
            if (!isLoggedIn) {
                const stored = localStorage.getItem('shop_cart_guest');
                const cart = stored ? JSON.parse(stored) : [];
                const existing = cart.find((i)=>i.variantId === currentVariant.id);
                if (existing) existing.quantity += quantity;
                else cart.push({
                    productId: product.id,
                    productSlug: product.slug,
                    variantId: currentVariant.id,
                    quantity
                });
                localStorage.setItem('shop_cart_guest', JSON.stringify(cart));
            } else {
                await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/v1/cart/items', {
                    productId: product.id,
                    variantId: currentVariant.id,
                    quantity
                });
            }
            setShowMessage(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.addedToCart')} ${quantity} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.pcs')}`);
            window.dispatchEvent(new Event('cart-updated'));
        } catch (err) {
            setShowMessage((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'product.errorAddingToCart'));
        } finally{
            setIsAddingToCart(false);
            setTimeout(()=>setShowMessage(null), 2000);
        }
    };
    if (loading || !product) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 py-16 text-center",
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'common.messages.loading')
        }, void 0, false, {
            fileName: "[project]/apps/web/app/products/[slug]/page.tsx",
            lineNumber: 94,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$ProductImageGallery$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductImageGallery"], {
                        images: images,
                        product: product,
                        discountPercent: discountPercent,
                        language: language,
                        currentImageIndex: currentImageIndex,
                        onImageIndexChange: setCurrentImageIndex,
                        thumbnailStartIndex: thumbnailStartIndex,
                        onThumbnailStartIndexChange: setThumbnailStartIndex
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/page.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$ProductInfoAndActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductInfoAndActions"], {
                        product: product,
                        price: price,
                        originalPrice: originalPrice,
                        compareAtPrice: compareAtPrice,
                        discountPercent: discountPercent,
                        currency: currency,
                        language: language,
                        averageRating: averageRating,
                        reviewsCount: reviews.length,
                        quantity: quantity,
                        maxQuantity: maxQuantity,
                        isOutOfStock: isOutOfStock,
                        isVariationRequired: isVariationRequired,
                        hasUnavailableAttributes: hasUnavailableAttributes,
                        unavailableAttributes: unavailableAttributes,
                        canAddToCart: canAddToCart,
                        isAddingToCart: isAddingToCart,
                        isInWishlist: isInWishlist,
                        isInCompare: isInCompare,
                        showMessage: showMessage,
                        isLoggedIn: isLoggedIn,
                        currentVariant: currentVariant,
                        attributeGroups: attributeGroups,
                        selectedColor: selectedColor,
                        selectedSize: selectedSize,
                        selectedAttributeValues: selectedAttributeValues,
                        colorGroups: colorGroups,
                        sizeGroups: sizeGroups,
                        onQuantityAdjust: adjustQuantity,
                        onAddToCart: handleAddToCart,
                        onAddToWishlist: handleAddToWishlist,
                        onCompareToggle: handleCompareToggle,
                        onScrollToReviews: scrollToReviews,
                        onColorSelect: handleColorSelect,
                        onSizeSelect: handleSizeSelect,
                        onAttributeValueSelect: handleAttributeValueSelect,
                        getOptionValue: getOptionValue,
                        getRequiredAttributesMessage: getRequiredAttributesMessage
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/products/[slug]/page.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/products/[slug]/page.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "product-reviews",
                className: "mt-24 scroll-mt-24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$ProductReviews$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductReviews"], {
                    productSlug: slug,
                    productId: product.id
                }, void 0, false, {
                    fileName: "[project]/apps/web/app/products/[slug]/page.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/app/products/[slug]/page.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$RelatedProducts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RelatedProducts"], {
                    categorySlug: product.categories?.[0]?.slug,
                    currentProductId: product.id
                }, void 0, false, {
                    fileName: "[project]/apps/web/app/products/[slug]/page.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/app/products/[slug]/page.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/app/products/[slug]/page.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
_s(ProductPage, "qGIrHMEwdVaR2ojtg7s8Nv/0NHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$products$2f5b$slug$5d2f$useProductPage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductPage"]
    ];
});
_c = ProductPage;
var _c;
__turbopack_context__.k.register(_c, "ProductPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_7ab4982f._.js.map