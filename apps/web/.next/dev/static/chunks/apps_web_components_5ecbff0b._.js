(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/components/HeroCarousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroCarousel",
    ()=>HeroCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const heroImages = [
    'https://images.pexels.com/photos/67102/pexels-photo-67102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/266688/pexels-photo-266688.jpeg',
    'https://images.pexels.com/photos/3217852/pexels-photo-3217852.jpeg'
];
function HeroCarousel() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroCarousel.useEffect": ()=>{
            const interval = setInterval({
                "HeroCarousel.useEffect.interval": ()=>{
                    setCurrentIndex({
                        "HeroCarousel.useEffect.interval": (prevIndex)=>(prevIndex + 1) % heroImages.length
                    }["HeroCarousel.useEffect.interval"]);
                }
            }["HeroCarousel.useEffect.interval"], 5000); // Change image every 5 seconds
            return ({
                "HeroCarousel.useEffect": ()=>clearInterval(interval)
            })["HeroCarousel.useEffect"];
        }
    }["HeroCarousel.useEffect"], []); // Auto-advance every 5 seconds
    const goToSlide = (index)=>{
        setCurrentIndex(index);
    };
    const goToPrevious = ()=>{
        setCurrentIndex((prevIndex)=>prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1);
    };
    const goToNext = ()=>{
        setCurrentIndex((prevIndex)=>prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1);
    };
    const handleShopNow = ()=>{
        router.push('/products');
    };
    const handleBrowseCategories = ()=>{
        router.push('/categories');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full h-full",
                children: heroImages.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: image,
                            alt: `Hero image ${index + 1}`,
                            fill: true,
                            className: "object-cover",
                            priority: index === 0,
                            unoptimized: true
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this)
                    }, index, false, {
                        fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-start justify-center z-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-left pointer-events-auto max-w-2xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-10 lg:p-12 shadow-2xl border border-white/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight",
                                children: t('home.hero_title')
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed",
                                children: t('home.hero_subtitle')
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleShopNow,
                                        className: "px-10 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
                                        children: t('home.hero_button_products')
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleBrowseCategories,
                                        className: "px-10 py-4 bg-white text-gray-900 border-2 border-gray-900 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
                                        children: t('home.hero_button_view_more')
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: goToPrevious,
                className: "absolute left-6 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 text-gray-900 p-2 md:p-3 rounded-full shadow-lg transition-all z-30 cursor-pointer hover:scale-110",
                "aria-label": "Previous image",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4 md:w-6 md:h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2.5,
                        d: "M15 19l-7-7 7-7"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: goToNext,
                className: "absolute right-6 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 text-gray-900 p-2 md:p-3 rounded-full shadow-lg transition-all z-30 cursor-pointer hover:scale-110",
                "aria-label": "Next image",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4 md:w-6 md:h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2.5,
                        d: "M9 5l7 7-7 7"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-30",
                children: heroImages.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>goToSlide(index),
                        className: `h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-10' : 'bg-white/50 hover:bg-white/75 w-2'}`,
                        "aria-label": `Go to slide ${index + 1}`
                    }, index, false, {
                        fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/components/HeroCarousel.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/HeroCarousel.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(HeroCarousel, "+c/ZVvfE5/iyf6TR3RGIWl6DOD8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = HeroCarousel;
var _c;
__turbopack_context__.k.register(_c, "HeroCarousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/FeaturesSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeaturesSection",
    ()=>FeaturesSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function FeaturesSection() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-16 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4",
                            children: t('home.features_title')
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-base text-gray-600 max-w-2xl mx-auto",
                            children: t('home.features_subtitle')
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/delivery",
                            className: "text-center group cursor-pointer transition-all duration-300 hover:scale-105",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-20 h-20 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "https://img.freepik.com/premium-vector/vector-fast-delivery-icon-illustration_723554-1032.jpg",
                                            alt: "Fast Delivery",
                                            className: "w-full h-full object-contain"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                            lineNumber: 37,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors",
                                    children: t('home.feature_fast_delivery_title')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 leading-relaxed",
                                    children: t('home.feature_fast_delivery_description')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/about",
                            className: "text-center group cursor-pointer transition-all duration-300 hover:scale-105",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-20 h-20 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "https://www.shutterstock.com/image-vector/best-quality-stamp-sticker-icon-600w-1922730422.jpg",
                                            alt: "Best Quality",
                                            className: "w-full h-full object-contain"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                            lineNumber: 59,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors",
                                    children: t('home.feature_best_quality_title')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 leading-relaxed",
                                    children: t('home.feature_best_quality_description')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/returns",
                            className: "text-center group cursor-pointer transition-all duration-300 hover:scale-105",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-20 h-20 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSgoxSEhKJM1oLGZSKnh1mVW4wTQcQl_DV1Q&s",
                                            alt: "Free Return",
                                            className: "w-full h-full object-contain"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                            lineNumber: 81,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors",
                                    children: t('home.feature_free_return_title')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 leading-relaxed",
                                    children: t('home.feature_free_return_description')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/FeaturesSection.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/components/FeaturesSection.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/FeaturesSection.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(FeaturesSection, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = FeaturesSection;
var _c;
__turbopack_context__.k.register(_c, "FeaturesSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/TopCategories.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopCategories",
    ()=>TopCategories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/language.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n-client.ts [app-client] (ecmascript)");
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
/**
 * Flatten categories tree to get all categories (root + children)
 */ function flattenAllCategories(cats) {
    const result = [];
    cats.forEach((cat)=>{
        result.push(cat);
        if (cat.children && cat.children.length > 0) {
            result.push(...flattenAllCategories(cat.children));
        }
    });
    return result;
}
function TopCategories() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [topCategories, setTopCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopCategories.useEffect": ()=>{
            fetchTopCategories();
        }
    }["TopCategories.useEffect"], []);
    /**
   * Fetch categories, get product counts, and select top 5
   */ const fetchTopCategories = async ()=>{
        try {
            setLoading(true);
            console.log('📦 [TopCategories] Fetching categories...');
            const language = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])();
            console.log('📦 [TopCategories] Language:', language);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/v1/categories/tree', {
                params: {
                    lang: language
                }
            });
            console.log('📦 [TopCategories] Response received:', response);
            // Validate response structure
            if (!response) {
                console.error('❌ [TopCategories] Empty response received');
                setTopCategories([]);
                return;
            }
            if (!response.data) {
                console.warn('⚠️ [TopCategories] Response missing "data" field:', response);
                setTopCategories([]);
                return;
            }
            if (!Array.isArray(response.data)) {
                console.error('❌ [TopCategories] Response.data is not an array:', typeof response.data, response.data);
                setTopCategories([]);
                return;
            }
            const categoriesList = response.data;
            console.log('📦 [TopCategories] Categories list:', categoriesList);
            // Get all categories including children (flatten the tree)
            const allCategories = flattenAllCategories(categoriesList);
            console.log('📦 [TopCategories] Total categories found:', allCategories.length);
            // Fetch product counts and first product with image for each category
            const categoryDataPromises = allCategories.map(async (category)=>{
                try {
                    // Fetch products to get count and find one with image
                    console.log(`🔍 [TopCategories] Fetching products for category: "${category.title}" (slug: "${category.slug}")`);
                    const productsResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/v1/products', {
                        params: {
                            category: category.slug,
                            limit: '10',
                            lang: language
                        }
                    });
                    console.log(`📦 [TopCategories] Response for "${category.title}":`, {
                        total: productsResponse.meta?.total || 0,
                        productsCount: productsResponse.data?.length || 0,
                        firstProductId: productsResponse.data?.[0]?.id,
                        firstProductImage: productsResponse.data?.[0]?.image
                    });
                    // If category has 0 products, it might mean category was not found
                    if (productsResponse.meta?.total === 0) {
                        console.warn(`⚠️ [TopCategories] Category "${category.title}" (${category.slug}) has 0 products - category might not exist in database`);
                    }
                    const productCount = productsResponse.meta?.total || 0;
                    // Get first product with image, or first product if no image available
                    // Only assign product if we have products for this category
                    const productWithImage = productsResponse.data && productsResponse.data.length > 0 ? productsResponse.data.find((p)=>p.image) || productsResponse.data[0] || null : null;
                    console.log(`✅ [TopCategories] Category "${category.title}" (${category.slug}): ${productCount} products, selected product: ${productWithImage?.id} (image: ${productWithImage?.image ? 'yes' : 'no'})`);
                    return {
                        category,
                        productCount,
                        product: productWithImage
                    };
                } catch (err) {
                    console.error(`❌ [TopCategories] Error fetching products for category ${category.slug}:`, err);
                    return {
                        category,
                        productCount: 0,
                        product: null
                    };
                }
            });
            // Wait for all category data to load
            const allCategoryData = await Promise.all(categoryDataPromises);
            // Filter out categories with 0 products, sort by product count (descending), and take top 5
            const sortedCategories = allCategoryData.filter((item)=>item.productCount > 0).sort((a, b)=>b.productCount - a.productCount).slice(0, 5);
            setTopCategories(sortedCategories);
            console.log('✅ [TopCategories] Top 5 categories selected:', sortedCategories.map((c)=>`${c.category.title} (${c.productCount} products)`));
        } catch (err) {
            console.error('❌ [TopCategories] Error fetching categories:', err);
            console.error('❌ [TopCategories] Error details:', {
                message: err?.message,
                status: err?.status,
                statusText: err?.statusText,
                data: err?.data,
                stack: err?.stack
            });
            // Set empty array to prevent infinite loading
            setTopCategories([]);
        } finally{
            setLoading(false);
        }
    };
    const handleCategoryClick = (categorySlug)=>{
        router.push(`/products?category=${categorySlug}`);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "py-12 bg-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center items-center gap-8 md:gap-12 lg:gap-16 flex-wrap",
                    children: [
                        1,
                        2,
                        3,
                        4,
                        5
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-3 min-w-[120px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-24 rounded-full bg-gray-200 animate-pulse shadow-sm"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TopCategories.tsx",
                                    lineNumber: 201,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-20 h-4 bg-gray-200 rounded animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TopCategories.tsx",
                                    lineNumber: 202,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-3 bg-gray-200 rounded animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TopCategories.tsx",
                                    lineNumber: 203,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/apps/web/components/TopCategories.tsx",
                            lineNumber: 200,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/TopCategories.tsx",
                    lineNumber: 198,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/TopCategories.tsx",
                lineNumber: 197,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/TopCategories.tsx",
            lineNumber: 196,
            columnNumber: 7
        }, this);
    }
    if (topCategories.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-12 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center gap-6 md:gap-8 lg:gap-12 xl:gap-16 flex-wrap",
                children: topCategories.map((item)=>{
                    const { category, productCount, product } = item;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/products?category=${category.slug}`,
                        onClick: (e)=>{
                            e.preventDefault();
                            handleCategoryClick(category.slug);
                        },
                        className: "flex flex-col items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105 min-w-[120px] outline-none focus:outline-none hover:outline-none focus-visible:outline-none ring-0 focus:ring-0 hover:ring-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 relative outline-none",
                                children: product?.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-24 rounded-full overflow-hidden bg-gray-100 shadow-md transition-all duration-300 flex items-center justify-center outline-none ring-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: product.image,
                                        alt: category.title,
                                        width: 96,
                                        height: 96,
                                        className: "w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-300 outline-none",
                                        unoptimized: true
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/TopCategories.tsx",
                                        lineNumber: 237,
                                        columnNumber: 23
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TopCategories.tsx",
                                    lineNumber: 236,
                                    columnNumber: 21
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center shadow-md transition-all duration-300 outline-none ring-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-12 h-12 text-gray-400",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        strokeWidth: 2,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TopCategories.tsx",
                                            lineNumber: 249,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/TopCategories.tsx",
                                        lineNumber: 248,
                                        columnNumber: 23
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TopCategories.tsx",
                                    lineNumber: 247,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TopCategories.tsx",
                                lineNumber: 234,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-semibold text-gray-900 text-center max-w-[140px] group-hover:text-gray-700 transition-colors",
                                children: category.title
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TopCategories.tsx",
                                lineNumber: 256,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-500 font-medium",
                                children: [
                                    productCount,
                                    " ",
                                    productCount === 1 ? t('common.product.product') : t('common.product.products')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/TopCategories.tsx",
                                lineNumber: 261,
                                columnNumber: 17
                            }, this)
                        ]
                    }, category.id, true, {
                        fileName: "[project]/apps/web/components/TopCategories.tsx",
                        lineNumber: 224,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/apps/web/components/TopCategories.tsx",
                lineNumber: 219,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/TopCategories.tsx",
            lineNumber: 218,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/TopCategories.tsx",
        lineNumber: 217,
        columnNumber: 5
    }, this);
}
_s(TopCategories, "U2sky8fNzRziX6TNlU7D2WYlMIE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TopCategories;
var _c;
__turbopack_context__.k.register(_c, "TopCategories");
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
"[project]/apps/web/components/ProductCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductCard",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/currency.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/auth/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CompareIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/icons/CompareIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CartIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/icons/CartIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$ProductLabels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/ProductLabels.tsx [app-client] (ecmascript)");
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
;
const WISHLIST_KEY = 'shop_wishlist';
const COMPARE_KEY = 'shop_compare';
// Color mapping for common color names
// Иконки
const WishlistIcon = ({ filled = false })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M10 17L8.55 15.7C4.4 12.2 2 10.1 2 7.5C2 5.4 3.4 4 5.5 4C6.8 4 8.1 4.6 9 5.5C9.9 4.6 11.2 4 12.5 4C14.6 4 16 5.4 16 7.5C16 10.1 13.6 12.2 9.45 15.7L10 17Z",
            stroke: "currentColor",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: filled ? "currentColor" : "none"
        }, void 0, false, {
            fileName: "[project]/apps/web/components/ProductCard.tsx",
            lineNumber: 53,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/web/components/ProductCard.tsx",
        lineNumber: 52,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = WishlistIcon;
function ProductCard({ product, viewMode = 'grid-3' }) {
    _s();
    const isCompact = viewMode === 'grid-3';
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isLoggedIn } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [currency, setCurrency] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredCurrency"])());
    const [isInWishlist, setIsInWishlist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isInCompare, setIsInCompare] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAddingToCart, setIsAddingToCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [imageError, setImageError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Проверка состояния wishlist и compare
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductCard.useEffect": ()=>{
            const checkWishlist = {
                "ProductCard.useEffect.checkWishlist": ()=>{
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    try {
                        const stored = localStorage.getItem(WISHLIST_KEY);
                        const wishlist = stored ? JSON.parse(stored) : [];
                        setIsInWishlist(wishlist.includes(product.id));
                    } catch  {
                        setIsInWishlist(false);
                    }
                }
            }["ProductCard.useEffect.checkWishlist"];
            const checkCompare = {
                "ProductCard.useEffect.checkCompare": ()=>{
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    try {
                        const stored = localStorage.getItem(COMPARE_KEY);
                        const compare = stored ? JSON.parse(stored) : [];
                        setIsInCompare(compare.includes(product.id));
                    } catch  {
                        setIsInCompare(false);
                    }
                }
            }["ProductCard.useEffect.checkCompare"];
            checkWishlist();
            checkCompare();
            // Слушаем обновления
            const handleWishlistUpdate = {
                "ProductCard.useEffect.handleWishlistUpdate": ()=>checkWishlist()
            }["ProductCard.useEffect.handleWishlistUpdate"];
            const handleCompareUpdate = {
                "ProductCard.useEffect.handleCompareUpdate": ()=>checkCompare()
            }["ProductCard.useEffect.handleCompareUpdate"];
            window.addEventListener('wishlist-updated', handleWishlistUpdate);
            window.addEventListener('compare-updated', handleCompareUpdate);
            return ({
                "ProductCard.useEffect": ()=>{
                    window.removeEventListener('wishlist-updated', handleWishlistUpdate);
                    window.removeEventListener('compare-updated', handleCompareUpdate);
                }
            })["ProductCard.useEffect"];
        }
    }["ProductCard.useEffect"], [
        product.id
    ]);
    // Listen for currency updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductCard.useEffect": ()=>{
            const handleCurrencyUpdate = {
                "ProductCard.useEffect.handleCurrencyUpdate": ()=>{
                    setCurrency((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredCurrency"])());
                }
            }["ProductCard.useEffect.handleCurrencyUpdate"];
            // Listen for currency rates updates to force re-render
            const handleCurrencyRatesUpdate = {
                "ProductCard.useEffect.handleCurrencyRatesUpdate": ()=>{
                    setCurrency((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredCurrency"])());
                }
            }["ProductCard.useEffect.handleCurrencyRatesUpdate"];
            window.addEventListener('currency-updated', handleCurrencyUpdate);
            window.addEventListener('currency-rates-updated', handleCurrencyRatesUpdate);
            return ({
                "ProductCard.useEffect": ()=>{
                    window.removeEventListener('currency-updated', handleCurrencyUpdate);
                    window.removeEventListener('currency-rates-updated', handleCurrencyRatesUpdate);
                }
            })["ProductCard.useEffect"];
        }
    }["ProductCard.useEffect"], []);
    // Добавление/удаление из wishlist
    const handleWishlistToggle = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        // Проверка авторизации - если не залогинен, перенаправляем на страницу входа
        if (!isLoggedIn) {
            router.push(`/login?redirect=/products`);
            return;
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const stored = localStorage.getItem(WISHLIST_KEY);
            const wishlist = stored ? JSON.parse(stored) : [];
            if (isInWishlist) {
                const updated = wishlist.filter((id)=>id !== product.id);
                localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
                setIsInWishlist(false);
            } else {
                wishlist.push(product.id);
                localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
                setIsInWishlist(true);
            }
            window.dispatchEvent(new Event('wishlist-updated'));
        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    };
    // Добавление/удаление из compare
    const handleCompareToggle = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const stored = localStorage.getItem(COMPARE_KEY);
            const compare = stored ? JSON.parse(stored) : [];
            // Максимум 4 продукта для сравнения
            console.info('[Compare] Toggling compare from ProductCard', {
                productId: product.id,
                action: isInCompare ? 'remove' : 'add'
            });
            if (isInCompare) {
                const updated = compare.filter((id)=>id !== product.id);
                localStorage.setItem(COMPARE_KEY, JSON.stringify(updated));
                setIsInCompare(false);
            } else {
                if (compare.length >= 4) {
                    alert(t('common.alerts.compareMaxReached'));
                    return;
                }
                compare.push(product.id);
                localStorage.setItem(COMPARE_KEY, JSON.stringify(compare));
                setIsInCompare(true);
            }
            window.dispatchEvent(new Event('compare-updated'));
        } catch (error) {
            console.error('Error updating compare:', error);
        }
    };
    // Добавление в корзину
    const handleAddToCart = async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (!product.inStock) {
            return;
        }
        // Validate product slug before making API call
        if (!product.slug || product.slug.trim() === '' || product.slug.includes(' ')) {
            console.error('❌ [PRODUCT CARD] Invalid product slug:', product.slug);
            alert(t('common.alerts.invalidProduct'));
            return;
        }
        // Если пользователь не залогинен, используем localStorage для корзины
        if (!isLoggedIn) {
            setIsAddingToCart(true);
            try {
                const CART_KEY = 'shop_cart_guest';
                const stored = localStorage.getItem(CART_KEY);
                const cart = stored ? JSON.parse(stored) : [];
                // Encode slug to handle special characters
                const encodedSlug = encodeURIComponent(product.slug.trim());
                const productDetails = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/v1/products/${encodedSlug}`);
                if (!productDetails.variants || productDetails.variants.length === 0) {
                    alert(t('common.alerts.noVariantsAvailable'));
                    setIsAddingToCart(false);
                    return;
                }
                const variantId = productDetails.variants[0].id;
                const variant = productDetails.variants[0];
                // Проверяем, есть ли уже этот товар в корзине
                const existingItem = cart.find((item)=>item.productId === product.id && item.variantId === variantId);
                // Calculate total quantity that will be in cart after adding
                const currentQuantityInCart = existingItem?.quantity || 0;
                const totalQuantity = currentQuantityInCart + 1;
                // Check if total quantity exceeds available stock
                if (totalQuantity > variant.stock) {
                    console.log('🚫 [PRODUCT CARD - GUEST CART] Stock limit exceeded:', {
                        variantId,
                        currentInCart: currentQuantityInCart,
                        requestedQuantity: 1,
                        totalQuantity,
                        availableStock: variant.stock
                    });
                    alert(t('common.alerts.noMoreStockAvailable'));
                    setIsAddingToCart(false);
                    return;
                }
                if (existingItem) {
                    existingItem.quantity = totalQuantity;
                    // Обновляем slug, если его не было
                    if (!existingItem.productSlug) {
                        existingItem.productSlug = productDetails.slug;
                    }
                } else {
                    cart.push({
                        productId: product.id,
                        productSlug: productDetails.slug || product.slug,
                        variantId: variantId,
                        quantity: 1
                    });
                }
                localStorage.setItem(CART_KEY, JSON.stringify(cart));
                window.dispatchEvent(new Event('cart-updated'));
            } catch (error) {
                console.error('❌ [PRODUCT CARD] Error adding to guest cart:', error);
                // Check if error is about product not found
                if (error?.message?.includes('does not exist') || error?.message?.includes('404') || error?.status === 404) {
                    alert(t('common.alerts.productNotFound'));
                } else {
                    // Если не удалось добавить в localStorage, перенаправляем на login
                    router.push(`/login?redirect=/products`);
                }
            } finally{
                setIsAddingToCart(false);
            }
            return;
        }
        setIsAddingToCart(true);
        try {
            // Encode slug to handle special characters
            const encodedSlug = encodeURIComponent(product.slug.trim());
            const productDetails = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/v1/products/${encodedSlug}`);
            if (!productDetails.variants || productDetails.variants.length === 0) {
                alert(t('common.alerts.noVariantsAvailable'));
                return;
            }
            const variantId = productDetails.variants[0].id;
            await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/v1/cart/items', {
                productId: product.id,
                variantId: variantId,
                quantity: 1
            });
            // Триггерим обновление корзины
            window.dispatchEvent(new Event('cart-updated'));
        } catch (error) {
            console.error('❌ [PRODUCT CARD] Error adding to cart:', error);
            // Check if error is about product not found
            if (error?.message?.includes('does not exist') || error?.message?.includes('404') || error?.status === 404 || error?.statusCode === 404) {
                alert(t('common.alerts.productNotFound'));
                setIsAddingToCart(false);
                return;
            }
            // Check if error is about insufficient stock
            if (error.response?.data?.detail?.includes('No more stock available') || error.response?.data?.detail?.includes('exceeds available stock') || error.response?.data?.title === 'Insufficient stock') {
                alert(t('common.alerts.noMoreStockAvailable'));
                setIsAddingToCart(false);
                return;
            }
            // Если ошибка авторизации, перенаправляем на login
            if (error.message?.includes('401') || error.message?.includes('Unauthorized') || error?.status === 401 || error?.statusCode === 401) {
                router.push(`/login?redirect=/products`);
            } else {
                // Generic error message
                alert(t('common.alerts.failedToAddToCart'));
            }
        } finally{
            setIsAddingToCart(false);
        }
    };
    // List view layout (similar to cart)
    if (viewMode === 'list') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg border border-gray-200 overflow-hidden hover:bg-gray-50 transition-colors",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center gap-4 px-4 sm:px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/products/${product.slug}`,
                        className: "w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden self-start sm:self-center",
                        children: product.image && !imageError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: product.image,
                            alt: product.title,
                            fill: true,
                            className: "object-cover",
                            sizes: "80px",
                            unoptimized: true,
                            onError: ()=>setImageError(true)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/ProductCard.tsx",
                            lineNumber: 390,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-full bg-gray-200 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-8 h-8 text-gray-400",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/ProductCard.tsx",
                                    lineNumber: 402,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                lineNumber: 401,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/ProductCard.tsx",
                            lineNumber: 400,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                        lineNumber: 385,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0 w-full sm:w-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/products/${product.slug}`,
                                className: "block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg sm:text-xl font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2",
                                        children: product.title
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                                        lineNumber: 411,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-base sm:text-lg text-gray-500 mt-1",
                                        children: product.brand?.name || t('common.defaults.category')
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                                        lineNumber: 414,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                lineNumber: 410,
                                columnNumber: 13
                            }, this),
                            product.colors && product.colors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 mt-2 flex-wrap",
                                children: [
                                    product.colors.slice(0, 6).map((colorData, index)=>{
                                        const colorValue = typeof colorData === 'string' ? colorData : colorData.value;
                                        const imageUrl = typeof colorData === 'object' ? colorData.imageUrl : null;
                                        const colorsHex = typeof colorData === 'object' ? colorData.colors : null;
                                        // Determine color hex: use colorsHex[0] if available, otherwise use getColorHex
                                        const colorHex = colorsHex && Array.isArray(colorsHex) && colorsHex.length > 0;
                                        colorsHex[0];
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-5 h-5 rounded-full border border-gray-300 flex-shrink-0 overflow-hidden",
                                            style: imageUrl ? {} : {
                                                backgroundColor: colorHex
                                            },
                                            title: colorValue,
                                            "aria-label": `Color: ${colorValue}`,
                                            children: imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: imageUrl,
                                                alt: colorValue,
                                                className: "w-full h-full object-cover",
                                                onError: (e)=>{
                                                    // Fallback to color hex if image fails to load
                                                    e.target.style.backgroundColor = colorHex;
                                                    e.target.style.display = 'none';
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                                lineNumber: 440,
                                                columnNumber: 25
                                            }, this) : null
                                        }, index, false, {
                                            fileName: "[project]/apps/web/components/ProductCard.tsx",
                                            lineNumber: 432,
                                            columnNumber: 21
                                        }, this);
                                    }),
                                    product.colors.length > 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-500",
                                        children: [
                                            "+",
                                            product.colors.length - 6
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                                        lineNumber: 455,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                lineNumber: 420,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                        lineNumber: 409,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl sm:text-2xl font-semibold text-blue-600",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(product.price || 0, currency || 'USD')
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                                lineNumber: 468,
                                                columnNumber: 17
                                            }, this),
                                            product.discountPercent && product.discountPercent > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs sm:text-sm font-semibold text-blue-600",
                                                children: [
                                                    "-",
                                                    product.discountPercent,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                                lineNumber: 472,
                                                columnNumber: 19
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                                        lineNumber: 467,
                                        columnNumber: 15
                                    }, this),
                                    product.originalPrice && product.originalPrice > product.price || product.compareAtPrice && product.compareAtPrice > product.price ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base sm:text-lg text-gray-500 line-through mt-0.5",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(product.originalPrice && product.originalPrice > product.price ? product.originalPrice : product.compareAtPrice || 0, currency || 'USD')
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                                        lineNumber: 479,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                lineNumber: 466,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 self-start sm:self-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCompareToggle,
                                        className: `w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isInCompare ? 'border-gray-900 text-gray-900 bg-white shadow-sm' : 'border-gray-200 text-gray-700 bg-white hover:border-gray-300 hover:bg-gray-50'}`,
                                        title: isInCompare ? t('common.messages.removedFromCompare') : t('common.messages.addedToCompare'),
                                        "aria-label": isInCompare ? t('common.messages.removedFromCompare') : t('common.messages.addedToCompare'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CompareIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompareIcon"], {
                                            isActive: isInCompare
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/ProductCard.tsx",
                                            lineNumber: 503,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                                        lineNumber: 493,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleWishlistToggle,
                                        className: `w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${isInWishlist ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                        title: isInWishlist ? t('common.messages.removedFromWishlist') : t('common.messages.addedToWishlist'),
                                        "aria-label": isInWishlist ? t('common.messages.removedFromWishlist') : t('common.messages.addedToWishlist'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WishlistIcon, {
                                            filled: isInWishlist
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/ProductCard.tsx",
                                            lineNumber: 517,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                                        lineNumber: 507,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleAddToCart,
                                        disabled: !product.inStock || isAddingToCart,
                                        className: `w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${product.inStock && !isAddingToCart ? 'bg-gray-100 text-gray-700 hover:bg-green-600 hover:text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`,
                                        title: product.inStock ? t('common.buttons.addToCart') : t('common.stock.outOfStock'),
                                        "aria-label": product.inStock ? t('common.buttons.addToCart') : t('common.stock.outOfStock'),
                                        children: isAddingToCart ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "animate-spin h-4 w-4 sm:h-5 sm:w-5",
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
                                                    fileName: "[project]/apps/web/components/ProductCard.tsx",
                                                    lineNumber: 534,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    className: "opacity-75",
                                                    fill: "currentColor",
                                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/ProductCard.tsx",
                                                    lineNumber: 535,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/ProductCard.tsx",
                                            lineNumber: 533,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CartIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartIcon"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/ProductCard.tsx",
                                            lineNumber: 538,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                                        lineNumber: 521,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                lineNumber: 491,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                        lineNumber: 464,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/ProductCard.tsx",
                lineNumber: 383,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/ProductCard.tsx",
            lineNumber: 381,
            columnNumber: 7
        }, this);
    }
    // Grid view layout (original)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "aspect-square bg-gray-100 relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/products/${product.slug}`,
                        className: "block w-full h-full",
                        children: product.image && !imageError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: product.image,
                            alt: product.title,
                            fill: true,
                            className: "object-cover",
                            sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
                            unoptimized: true,
                            onError: ()=>setImageError(true)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/ProductCard.tsx",
                            lineNumber: 555,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-full bg-gray-200 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-400 text-sm",
                                children: "No Image"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                lineNumber: 566,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/ProductCard.tsx",
                            lineNumber: 565,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                        lineNumber: 553,
                        columnNumber: 9
                    }, this),
                    product.labels && product.labels.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$ProductLabels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductLabels"], {
                        labels: product.labels
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                        lineNumber: 572,
                        columnNumber: 57
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute ${isCompact ? 'top-1.5 right-1.5' : 'top-3 right-3'} flex flex-col ${isCompact ? 'gap-1.5' : 'gap-2'} opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleCompareToggle,
                                className: `${isCompact ? 'w-10 h-10' : 'w-12 h-12'} rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isInCompare ? 'border-gray-900 text-gray-900 bg-white shadow-sm' : 'border-gray-200 text-gray-700 bg-white hover:border-gray-300 hover:bg-gray-50'}`,
                                title: isInCompare ? t('common.messages.removedFromCompare') : t('common.messages.addedToCompare'),
                                "aria-label": isInCompare ? t('common.ariaLabels.removeFromCompare') : t('common.ariaLabels.addToCompare'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CompareIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompareIcon"], {
                                    isActive: isInCompare,
                                    size: isCompact ? 16 : 18
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/ProductCard.tsx",
                                    lineNumber: 587,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                lineNumber: 577,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleWishlistToggle,
                                className: `${isCompact ? 'w-10 h-10' : 'w-12 h-12'} rounded-full flex items-center justify-center transition-all duration-200 ${isInWishlist ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'}`,
                                title: isInWishlist ? t('common.messages.removedFromWishlist') : t('common.messages.addedToWishlist'),
                                "aria-label": isInWishlist ? t('common.ariaLabels.removeFromWishlist') : t('common.ariaLabels.addToWishlist'),
                                children: isCompact ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "18",
                                    height: "18",
                                    viewBox: "0 0 20 20",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M10 17L8.55 15.7C4.4 12.2 2 10.1 2 7.5C2 5.4 3.4 4 5.5 4C6.8 4 8.1 4.6 9 5.5C9.9 4.6 11.2 4 12.5 4C14.6 4 16 5.4 16 7.5C16 10.1 13.6 12.2 9.45 15.7L10 17Z",
                                        stroke: "currentColor",
                                        strokeWidth: "1.8",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        fill: isInWishlist ? "currentColor" : "none"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                                        lineNumber: 603,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/ProductCard.tsx",
                                    lineNumber: 602,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WishlistIcon, {
                                    filled: isInWishlist
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/ProductCard.tsx",
                                    lineNumber: 613,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                lineNumber: 591,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                        lineNumber: 575,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/ProductCard.tsx",
                lineNumber: 552,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: isCompact ? 'p-2.5' : 'p-4',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/products/${product.slug}`,
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: `${isCompact ? 'text-base' : 'text-xl'} font-medium text-gray-900 ${isCompact ? 'mb-0.5' : 'mb-1'} line-clamp-2`,
                                children: product.title
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                lineNumber: 623,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `${isCompact ? 'text-sm' : 'text-lg'} text-gray-500 ${isCompact ? 'mb-1' : 'mb-2'}`,
                                children: product.brand?.name || t('common.defaults.category')
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                lineNumber: 628,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                        lineNumber: 621,
                        columnNumber: 9
                    }, this),
                    product.colors && product.colors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center gap-1.5 ${isCompact ? 'mb-1' : 'mb-2'} flex-wrap`,
                        children: [
                            product.colors.slice(0, 6).map((colorData, index)=>{
                                const colorValue = typeof colorData === 'string' ? colorData : colorData.value;
                                const imageUrl = typeof colorData === 'object' ? colorData.imageUrl : null;
                                const colorsHex = typeof colorData === 'object' ? colorData.colors : null;
                                // Determine color hex: use colorsHex[0] if available, otherwise use getColorHex
                                const colorHex = colorsHex && Array.isArray(colorsHex) && colorsHex.length > 0 ? colorsHex[0] : getColorHex(colorValue);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${isCompact ? 'w-4 h-4' : 'w-5 h-5'} rounded-full border border-gray-300 flex-shrink-0 overflow-hidden`,
                                    style: imageUrl ? {} : {
                                        backgroundColor: colorHex
                                    },
                                    title: colorValue,
                                    "aria-label": t('common.ariaLabels.color').replace('{color}', colorValue),
                                    children: imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: imageUrl,
                                        alt: colorValue,
                                        className: "w-full h-full object-cover",
                                        onError: (e)=>{
                                            // Fallback to color hex if image fails to load
                                            e.target.style.backgroundColor = colorHex;
                                            e.target.style.display = 'none';
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                                        lineNumber: 655,
                                        columnNumber: 21
                                    }, this) : null
                                }, index, false, {
                                    fileName: "[project]/apps/web/components/ProductCard.tsx",
                                    lineNumber: 647,
                                    columnNumber: 17
                                }, this);
                            }),
                            product.colors.length > 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${isCompact ? 'text-xs' : 'text-sm'} text-gray-500`,
                                children: [
                                    "+",
                                    product.colors.length - 6
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                lineNumber: 670,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                        lineNumber: 635,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-2 flex items-center justify-between ${isCompact ? 'gap-2' : 'gap-4'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `${isCompact ? 'text-lg' : 'text-2xl'} font-semibold text-gray-900`,
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(product.price || 0, currency || 'USD')
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                                lineNumber: 681,
                                                columnNumber: 15
                                            }, this),
                                            product.discountPercent && product.discountPercent > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `${isCompact ? 'text-xs' : 'text-sm'} font-semibold text-blue-600`,
                                                children: [
                                                    "-",
                                                    product.discountPercent,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                                lineNumber: 685,
                                                columnNumber: 17
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                                        lineNumber: 680,
                                        columnNumber: 13
                                    }, this),
                                    product.originalPrice && product.originalPrice > product.price || product.compareAtPrice && product.compareAtPrice > product.price ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `${isCompact ? 'text-sm' : 'text-lg'} text-gray-500 line-through`,
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(product.originalPrice && product.originalPrice > product.price ? product.originalPrice : product.compareAtPrice || 0, currency || 'USD')
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                                        lineNumber: 692,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                lineNumber: 679,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAddToCart,
                                disabled: !product.inStock || isAddingToCart,
                                className: `${isCompact ? 'w-10 h-10' : 'w-12 h-12'} rounded-full flex items-center justify-center transition-all duration-200 ${product.inStock && !isAddingToCart ? 'bg-transparent text-gray-600 hover:bg-green-600 hover:text-white hover:shadow-md' : 'bg-transparent text-gray-400 cursor-not-allowed'}`,
                                title: product.inStock ? t('common.buttons.addToCart') : t('common.stock.outOfStock'),
                                "aria-label": product.inStock ? t('common.ariaLabels.addToCart') : t('common.ariaLabels.outOfStock'),
                                children: isAddingToCart ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: `animate-spin ${isCompact ? 'h-5 w-5' : 'h-6 w-6'}`,
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
                                            fileName: "[project]/apps/web/components/ProductCard.tsx",
                                            lineNumber: 715,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            className: "opacity-75",
                                            fill: "currentColor",
                                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/ProductCard.tsx",
                                            lineNumber: 716,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/ProductCard.tsx",
                                    lineNumber: 714,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CartIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartIcon"], {
                                    size: isCompact ? 18 : 24
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/ProductCard.tsx",
                                    lineNumber: 719,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/ProductCard.tsx",
                                lineNumber: 702,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/ProductCard.tsx",
                        lineNumber: 678,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/ProductCard.tsx",
                lineNumber: 620,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/ProductCard.tsx",
        lineNumber: 550,
        columnNumber: 5
    }, this);
}
_s(ProductCard, "ncFRQFUBXg63fT00l/ahILaT9iQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c1 = ProductCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "WishlistIcon");
__turbopack_context__.k.register(_c1, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/FeaturedProductsTabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeaturedProductsTabs",
    ()=>FeaturedProductsTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/language.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/ProductCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// Tabs will be generated dynamically with translations
const PRODUCTS_PER_PAGE = 10;
const MOBILE_GRID_LAYOUT = 'grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
function FeaturedProductsTabs() {
    _s();
    // Use state for language to prevent hydration mismatch
    // Start with 'en' on server, update on client mount
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('new');
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Update language on mount and when language changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeaturedProductsTabs.useEffect": ()=>{
            const updateLanguage = {
                "FeaturedProductsTabs.useEffect.updateLanguage": ()=>{
                    const storedLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])();
                    setLanguage(storedLang);
                }
            }["FeaturedProductsTabs.useEffect.updateLanguage"];
            // Update immediately on mount
            updateLanguage();
            // Listen to language-updated events
            const handleLanguageUpdate = {
                "FeaturedProductsTabs.useEffect.handleLanguageUpdate": ()=>{
                    updateLanguage();
                }
            }["FeaturedProductsTabs.useEffect.handleLanguageUpdate"];
            window.addEventListener('language-updated', handleLanguageUpdate);
            return ({
                "FeaturedProductsTabs.useEffect": ()=>{
                    window.removeEventListener('language-updated', handleLanguageUpdate);
                }
            })["FeaturedProductsTabs.useEffect"];
        }
    }["FeaturedProductsTabs.useEffect"], []);
    // Generate tabs with translations (memoized based on language)
    const tabs = [
        {
            id: 'new',
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'home.featured_products.tab_new'),
            filter: 'new'
        },
        {
            id: 'bestseller',
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'home.featured_products.tab_bestseller'),
            filter: 'bestseller'
        },
        {
            id: 'featured',
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'home.featured_products.tab_featured'),
            filter: 'featured'
        }
    ];
    /**
   * Fetch products based on active filter
   */ const fetchProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FeaturedProductsTabs.useCallback[fetchProducts]": async (filter)=>{
            try {
                setLoading(true);
                setError(null);
                console.log('📦 [FeaturedProductsTabs] Fetching products with filter:', filter);
                // Use current language from state (always up-to-date)
                const currentLang = language;
                const params = {
                    page: '1',
                    limit: PRODUCTS_PER_PAGE.toString(),
                    lang: currentLang
                };
                // Add filter if provided
                if (filter) {
                    params.filter = filter;
                }
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/v1/products', {
                    params
                });
                console.log(`✅ [FeaturedProductsTabs] Loaded ${response.data.length} products`);
                // Ограничиваем до 10 продуктов максимум
                setProducts((response.data || []).slice(0, PRODUCTS_PER_PAGE));
            } catch (err) {
                console.error('❌ [FeaturedProductsTabs] Error fetching products:', err);
                // Use current language from state for error message
                setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'home.featured_products.errorLoading'));
                setProducts([]);
            } finally{
                setLoading(false);
            }
        }
    }["FeaturedProductsTabs.useCallback[fetchProducts]"], [
        language
    ]);
    /**
   * Handle tab change
   */ const handleTabChange = (tabId)=>{
        setActiveTab(tabId);
        const tab = tabs.find((t)=>t.id === tabId);
        fetchProducts(tab?.filter || null);
    };
    // Load products on mount (default "NEW")
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeaturedProductsTabs.useEffect": ()=>{
            fetchProducts('new');
            console.log('🧱 [FeaturedProductsTabs] Mobile grid locked to 2 columns on phones');
        }
    }["FeaturedProductsTabs.useEffect"], [
        fetchProducts
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-16 bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-3xl font-bold text-gray-900 text-center",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'home.featured_products.title')
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                    lineNumber: 156,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-3 mb-8 text-base text-gray-600 text-center",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'home.featured_products.subtitle')
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center items-center gap-6 md:gap-8 mb-8 flex-wrap",
                    children: tabs.map((tab)=>{
                        const isActive = activeTab === tab.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleTabChange(tab.id),
                            className: `
                  relative px-4 py-2 text-sm font-medium transition-colors duration-200
                  ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}
                `,
                            "aria-label": (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'home.featured_products.ariaShowProducts').replace('{label}', tab.label),
                            "aria-pressed": isActive,
                            children: [
                                tab.label,
                                isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600",
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                                    lineNumber: 184,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, tab.id, true, {
                            fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                            lineNumber: 168,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: MOBILE_GRID_LAYOUT,
                    children: [
                        ...Array(PRODUCTS_PER_PAGE)
                    ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg overflow-hidden animate-pulse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "aspect-square bg-gray-200"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                                    lineNumber: 199,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-4 bg-gray-200 rounded w-3/4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                                            lineNumber: 201,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-3 bg-gray-200 rounded w-1/2"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                                            lineNumber: 202,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-5 bg-gray-200 rounded w-1/3"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                                            lineNumber: 203,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                                    lineNumber: 200,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                            lineNumber: 198,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                    lineNumber: 196,
                    columnNumber: 11
                }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-600 mb-4",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                            lineNumber: 210,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                const tab = tabs.find((t)=>t.id === activeTab);
                                fetchProducts(tab?.filter || null);
                            },
                            className: "px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'home.featured_products.tryAgain')
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                            lineNumber: 211,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                    lineNumber: 209,
                    columnNumber: 11
                }, this) : products.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: MOBILE_GRID_LAYOUT,
                    children: products.slice(0, PRODUCTS_PER_PAGE).map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductCard"], {
                            product: product
                        }, product.id, false, {
                            fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                            lineNumber: 224,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                    lineNumber: 222,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'home.featured_products.noProducts')
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                        lineNumber: 229,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
                    lineNumber: 228,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
            lineNumber: 154,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/FeaturedProductsTabs.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_s(FeaturedProductsTabs, "QE7uOFhTP3w1HegAB4zYoXGf5vE=");
_c = FeaturedProductsTabs;
var _c;
__turbopack_context__.k.register(_c, "FeaturedProductsTabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_components_5ecbff0b._.js.map