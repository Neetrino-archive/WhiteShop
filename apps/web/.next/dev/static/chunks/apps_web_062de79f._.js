(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/lib/api-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API Client
 * 
 * Client for making requests to the backend API
 * 
 * In Next.js, when API routes are in the same app, we use relative paths.
 * If NEXT_PUBLIC_API_URL is set, use it (for external API).
 * Otherwise, use empty string to make relative requests to Next.js API routes.
 */ __turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "apiClient",
    ()=>apiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = ("TURBOPACK compile-time value", "") || '';
const AUTH_TOKEN_KEY = 'auth_token';
class ApiError extends Error {
    status;
    statusText;
    data;
    constructor(message, status, statusText = '', data){
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.statusText = statusText;
        this.data = data;
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}
/**
 * Get auth token from localStorage
 */ function getAuthToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch  {
        return null;
    }
}
class ApiClient {
    baseUrl;
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    buildUrl(endpoint, params) {
        // Ensure endpoint starts with /
        const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        // If baseUrl is empty (relative paths for Next.js API routes)
        if (!this.baseUrl || this.baseUrl.trim() === '') {
            // Check if we're on the server (Node.js environment)
            const isServer = ("TURBOPACK compile-time value", "object") === 'undefined';
            // On server, we need an absolute URL
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // On client, use relative URL
            let url = normalizedEndpoint;
            if (params && Object.keys(params).length > 0) {
                const searchParams = Object.entries(params).filter(([_, value])=>value !== undefined && value !== null).map(([key, value])=>`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`).join('&');
                url = `${url}${url.includes('?') ? '&' : '?'}${searchParams}`;
            }
            return url;
        }
        // Build base URL for absolute URLs
        let baseUrl = this.baseUrl;
        if (!baseUrl.endsWith('/')) {
            baseUrl = baseUrl.replace(/\/+$/, '');
        }
        // Combine base URL and endpoint
        const fullUrl = `${baseUrl}${normalizedEndpoint}`;
        // Use URL constructor for proper URL handling
        try {
            const url = new URL(fullUrl);
            if (params) {
                Object.entries(params).forEach(([key, value])=>{
                    if (value !== undefined && value !== null) {
                        url.searchParams.append(key, String(value));
                    }
                });
            }
            return url.toString();
        } catch (error) {
            // Fallback: manual URL construction if URL constructor fails
            console.error('❌ [API CLIENT] URL construction error:', error, {
                baseUrl,
                endpoint,
                fullUrl
            });
            let url = fullUrl;
            if (params && Object.keys(params).length > 0) {
                const searchParams = Object.entries(params).filter(([_, value])=>value !== undefined && value !== null).map(([key, value])=>`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`).join('&');
                url = `${url}${url.includes('?') ? '&' : '?'}${searchParams}`;
            }
            return url;
        }
    }
    /**
   * Get headers with automatic token injection
   */ getHeaders(options) {
        const headers = {
            'Content-Type': 'application/json',
            ...options?.headers || {}
        };
        // Add auth token if available and not skipped
        if (!options?.skipAuth) {
            const token = getAuthToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return headers;
    }
    /**
   * Check if error should be logged (skip 401 and 404 errors)
   * 401 - authentication errors are expected
   * 404 - resource not found is expected (e.g., product doesn't exist)
   */ shouldLogError(status) {
        return status !== 401 && status !== 404;
    }
    /**
   * Check if error should be logged as warning (404 Not Found)
   */ shouldLogWarning(status) {
        return status === 404;
    }
    /**
   * Handle 401 Unauthorized errors - clear auth and redirect
   */ handleUnauthorized() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        console.warn('⚠️ [API CLIENT] Unauthorized (401) - clearing auth data');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        // Trigger auth update event to notify AuthContext
        window.dispatchEvent(new Event('auth-updated'));
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
            const currentPath = window.location.pathname + window.location.search;
            window.location.href = '/login?redirect=' + encodeURIComponent(currentPath);
        }
    }
    async get(endpoint, options, retryCount = 0) {
        const url = this.buildUrl(endpoint, options?.params);
        const maxRetries = 3;
        const retryDelay = 1000; // 1 second
        const timeout = 30000; // 30 seconds timeout
        console.log('🌐 [API CLIENT] GET request:', {
            url,
            endpoint,
            baseUrl: this.baseUrl
        });
        let response;
        try {
            // Ստեղծում ենք timeout controller
            const controller = new AbortController();
            const timeoutId = setTimeout(()=>controller.abort(), timeout);
            try {
                response = await fetch(url, {
                    method: 'GET',
                    headers: this.getHeaders(options),
                    cache: 'no-store',
                    signal: controller.signal,
                    ...options
                });
                clearTimeout(timeoutId);
            } catch (fetchError) {
                clearTimeout(timeoutId);
                if (fetchError.name === 'AbortError') {
                    throw new Error(`Request timeout: API server did not respond within ${timeout / 1000} seconds. URL: ${url}`);
                }
                throw fetchError;
            }
            // Լոգավորում ենք response status-ը անվտանգ կերպով
            try {
                console.log('🌐 [API CLIENT] GET response status:', response.status, response.statusText || '');
            } catch (logError) {
                // Եթե console.log-ը ձախողվի, շարունակում ենք
                console.warn('⚠️ [API CLIENT] Failed to log response status');
            }
        } catch (networkError) {
            // Ստուգում ենք timeout սխալը
            if (networkError.message?.includes('timeout') || networkError.message?.includes('Request timeout')) {
                console.error('⏱️ [API CLIENT] Request timeout:', networkError.message);
                throw networkError;
            }
            console.error('❌ [API CLIENT] Network error during fetch:', networkError);
            // Ստուգում ենք, արդյոք սա կապի մերժման սխալ է
            const isConnectionRefused = networkError.message?.includes('Failed to fetch') || networkError.message?.includes('ERR_CONNECTION_REFUSED') || networkError.message?.includes('NetworkError') || networkError.message?.includes('Network request failed');
            if (isConnectionRefused) {
                const errorMessage = this.baseUrl ? `⚠️ API սերվերը հասանելի չէ!\n\n` + `Չհաջողվեց միանալ ${this.baseUrl}\n\n` + `Լուծում:\n` + `1. Համոզվեք, որ API սերվերը գործարկված է\n` + `2. Ստուգեք, որ ${this.baseUrl.split(':').pop() || 'port'} պորտը զբաղված չէ այլ գործընթացով\n\n` + `Հարցման URL: ${url}` : `⚠️ API route-ը հասանելի չէ!\n\n` + `Չհաջողվեց միանալ Next.js API route-ին: ${url}\n\n` + `Լուծում:\n` + `1. Համոզվեք, որ Next.js dev server-ը գործարկված է (npm run dev)\n` + `2. Ստուգեք, որ API route-ը գոյություն ունի: ${url}\n\n`;
                console.error('❌ [API CLIENT]', errorMessage);
                throw new Error(errorMessage);
            }
            throw new Error(`Ցանցային սխալ: Չհաջողվեց միանալ API-ին ${url}. ${networkError.message || 'Խնդրում ենք ստուգել, արդյոք Next.js server-ը գործարկված է:'}`);
        }
        if (!response.ok) {
            // Retry on 429 (Too Many Requests) errors
            if (response.status === 429 && retryCount < maxRetries) {
                const delay = retryDelay * (retryCount + 1); // Exponential backoff
                console.warn(`⚠️ [API CLIENT] Rate limited, retrying in ${delay}ms... (attempt ${retryCount + 1}/${maxRetries})`);
                await new Promise((resolve)=>setTimeout(resolve, delay));
                return this.get(endpoint, options, retryCount + 1);
            }
            let errorText = '';
            let errorData = null;
            const isUnauthorized = response.status === 401;
            const isNotFound = response.status === 404;
            // Log 404 as warning (expected situation - resource doesn't exist)
            if (this.shouldLogWarning(response.status)) {
                console.warn(`⚠️ [API CLIENT] GET Not Found (404): ${url}`);
            } else if (this.shouldLogError(response.status)) {
                console.error(`❌ [API CLIENT] GET Error: ${response.status} ${response.statusText}`, {
                    url,
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries())
                });
            }
            // Handle 401 Unauthorized - clear token and redirect
            if (isUnauthorized) {
                this.handleUnauthorized();
            }
            try {
                const text = await response.text();
                errorText = text || '';
                // Try to parse as JSON
                if (errorText && errorText.trim().startsWith('{')) {
                    try {
                        errorData = JSON.parse(errorText);
                        // Log 404 as warning, other errors (except 401) as error
                        if (isNotFound) {
                            console.warn('⚠️ [API CLIENT] GET Not Found response:', errorData);
                        } else if (!isUnauthorized) {
                            console.error('❌ [API CLIENT] GET Error response (JSON):', errorData);
                        }
                    } catch (parseErr) {
                        // If JSON parse fails, use text as is
                        if (isNotFound) {
                            console.warn('⚠️ [API CLIENT] GET Not Found response (text):', errorText);
                        } else if (!isUnauthorized) {
                            console.error('❌ [API CLIENT] GET Error response (text):', errorText);
                        }
                    }
                } else if (errorText) {
                    if (isNotFound) {
                        console.warn('⚠️ [API CLIENT] GET Not Found response (text):', errorText);
                    } else if (!isUnauthorized) {
                        console.error('❌ [API CLIENT] GET Error response (text):', errorText);
                    }
                }
            } catch (e) {
                if (isNotFound) {
                    console.warn('⚠️ [API CLIENT] Failed to read 404 response:', e);
                } else if (!isUnauthorized) {
                    console.error('❌ [API CLIENT] Failed to read error response:', e);
                }
            }
            // Create a more detailed error with safe fallbacks
            const errorMessage = errorData?.detail || errorData?.message || (errorText ? String(errorText) : '') || `API Error: ${response.status} ${response.statusText}`;
            throw new ApiError(errorMessage, response.status, response.statusText || '', errorData);
        }
        try {
            if (!response) {
                throw new Error('Response is undefined');
            }
            const contentType = response.headers?.get('content-type');
            console.log('🌐 [API CLIENT] Response content-type:', contentType);
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('❌ [API CLIENT] GET Non-JSON response:', {
                    contentType,
                    status: response.status,
                    text: text?.substring(0, 200) || ''
                });
                throw new Error(`Expected JSON response but got ${contentType}. Status: ${response.status}`);
            }
            const jsonData = await response.json();
            console.log('✅ [API CLIENT] GET Response parsed successfully');
            if (!jsonData) {
                console.warn('⚠️ [API CLIENT] Response data is null or undefined');
                return null;
            }
            return jsonData;
        } catch (parseError) {
            console.error('❌ [API CLIENT] GET JSON parse error:', parseError);
            console.error('❌ [API CLIENT] Parse error stack:', parseError.stack);
            if (parseError.message && parseError.message.includes('Expected JSON')) {
                throw parseError;
            }
            throw new Error(`Failed to parse response as JSON: ${parseError.message || String(parseError)}`);
        }
    }
    async post(endpoint, data, options) {
        try {
            const url = this.buildUrl(endpoint, options?.params);
            console.log('📤 [API CLIENT] POST request:', {
                url,
                data: data ? 'provided' : 'none'
            });
            const response = await fetch(url, {
                method: 'POST',
                headers: this.getHeaders(options),
                body: data ? JSON.stringify(data) : undefined,
                ...options
            });
            console.log('📥 [API CLIENT] Response status:', response.status, response.statusText);
            if (!response.ok) {
                let errorText = '';
                let errorData = null;
                const isUnauthorized = response.status === 401;
                // Handle 401 Unauthorized - clear token and redirect
                if (isUnauthorized) {
                    this.handleUnauthorized();
                }
                try {
                    const text = await response.text();
                    errorText = text || '';
                    // Try to parse as JSON
                    if (errorText && errorText.trim().startsWith('{')) {
                        try {
                            errorData = JSON.parse(errorText);
                            if (this.shouldLogError(response.status)) {
                                console.error('❌ [API CLIENT] POST Error response (JSON):', errorData);
                            }
                        } catch (parseErr) {
                            // If JSON parse fails, use text as is
                            if (this.shouldLogError(response.status)) {
                                console.error('❌ [API CLIENT] POST Error response (text):', errorText);
                            }
                        }
                    } else if (errorText && this.shouldLogError(response.status)) {
                        console.error('❌ [API CLIENT] POST Error response (text):', errorText);
                    }
                } catch (e) {
                    if (this.shouldLogError(response.status)) {
                        console.error('❌ [API CLIENT] Failed to read error response:', e);
                    }
                }
                // Create a more detailed error with safe fallbacks
                const errorMessage = errorData?.detail || errorData?.message || (errorText ? String(errorText) : '') || `API Error: ${response.status} ${response.statusText}`;
                throw new ApiError(errorMessage, response.status, response.statusText || '', errorData);
            }
            try {
                const jsonData = await response.json();
                console.log('✅ [API CLIENT] Response parsed successfully');
                return jsonData;
            } catch (parseError) {
                console.error('❌ [API CLIENT] JSON parse error:', parseError);
                throw new Error(`Failed to parse response: ${parseError}`);
            }
        } catch (error) {
            // Handle network errors, URL construction errors, etc.
            if (error instanceof TypeError && error.message.includes('fetch')) {
                console.error('❌ [API CLIENT] Network error:', error);
                const errorMsg = this.baseUrl ? `Network error: Unable to connect to API. Please check if the API server is running at ${this.baseUrl}` : `Network error: Unable to connect to Next.js API routes. Please check if the Next.js server is running.`;
                throw new Error(errorMsg);
            }
            // Re-throw if it's already our custom ApiError
            if (error instanceof ApiError) {
                throw error;
            }
            // Re-throw if it's a parse error
            if (error.message && error.message.includes('Failed to parse')) {
                throw error;
            }
            // Otherwise wrap in a generic error
            console.error('❌ [API CLIENT] POST request failed:', error);
            throw new Error(`API request failed: ${error.message || String(error)}`);
        }
    }
    async put(endpoint, data, options) {
        const url = this.buildUrl(endpoint, options?.params);
        console.log('📤 [API CLIENT] PUT request:', {
            url,
            endpoint,
            hasData: !!data
        });
        const response = await fetch(url, {
            method: 'PUT',
            headers: this.getHeaders(options),
            body: data ? JSON.stringify(data) : undefined,
            ...options
        });
        console.log('📥 [API CLIENT] PUT response status:', response.status, response.statusText);
        if (!response.ok) {
            let errorText = '';
            let errorData = null;
            try {
                const text = await response.text();
                errorText = text || '';
                // Try to parse as JSON
                if (errorText && errorText.trim().startsWith('{')) {
                    try {
                        errorData = JSON.parse(errorText);
                        if (this.shouldLogError(response.status)) {
                            console.error('❌ [API CLIENT] PUT Error response (JSON):', {
                                url,
                                status: response.status,
                                statusText: response.statusText,
                                error: {
                                    type: errorData?.type,
                                    title: errorData?.title,
                                    detail: errorData?.detail,
                                    message: errorData?.message,
                                    status: errorData?.status,
                                    instance: errorData?.instance,
                                    fullError: errorData
                                }
                            });
                        }
                    } catch (parseErr) {
                        // If JSON parse fails, use text as is
                        if (this.shouldLogError(response.status)) {
                            console.error('❌ [API CLIENT] PUT Error response (text):', {
                                url,
                                status: response.status,
                                statusText: response.statusText,
                                errorText
                            });
                        }
                    }
                } else if (errorText && this.shouldLogError(response.status)) {
                    console.error('❌ [API CLIENT] PUT Error response (text):', {
                        url,
                        status: response.status,
                        statusText: response.statusText,
                        errorText
                    });
                }
            } catch (e) {
                if (this.shouldLogError(response.status)) {
                    console.error('❌ [API CLIENT] Failed to read error response:', {
                        url,
                        status: response.status,
                        error: e
                    });
                }
            }
            // Create a more detailed error with safe fallbacks
            const errorMessage = errorData?.detail || errorData?.message || (errorText ? String(errorText) : '') || `API Error: ${response.status} ${response.statusText}`;
            throw new ApiError(errorMessage, response.status, response.statusText || '', errorData);
        }
        try {
            const jsonData = await response.json();
            console.log('✅ [API CLIENT] PUT Response parsed successfully');
            return jsonData;
        } catch (parseError) {
            console.error('❌ [API CLIENT] PUT JSON parse error:', {
                url,
                status: response.status,
                error: parseError
            });
            throw new Error(`Failed to parse response: ${parseError}`);
        }
    }
    async patch(endpoint, data, options) {
        const url = this.buildUrl(endpoint, options?.params);
        const response = await fetch(url, {
            method: 'PATCH',
            headers: this.getHeaders(options),
            body: data ? JSON.stringify(data) : undefined,
            ...options
        });
        if (!response.ok) {
            let errorText = '';
            let errorData = null;
            try {
                const text = await response.text();
                errorText = text || '';
                // Try to parse as JSON
                if (errorText && errorText.trim().startsWith('{')) {
                    try {
                        errorData = JSON.parse(errorText);
                        if (this.shouldLogError(response.status)) {
                            console.error('❌ [API CLIENT] PATCH Error response (JSON):', errorData);
                        }
                    } catch (parseErr) {
                        // If JSON parse fails, use text as is
                        if (this.shouldLogError(response.status)) {
                            console.error('❌ [API CLIENT] PATCH Error response (text):', errorText);
                        }
                    }
                } else if (errorText && this.shouldLogError(response.status)) {
                    console.error('❌ [API CLIENT] PATCH Error response (text):', errorText);
                }
            } catch (e) {
                if (this.shouldLogError(response.status)) {
                    console.error('❌ [API CLIENT] Failed to read error response:', e);
                }
            }
            // Create a more detailed error with safe fallbacks
            const errorMessage = errorData?.detail || errorData?.message || (errorText ? String(errorText) : '') || `API Error: ${response.status} ${response.statusText}`;
            throw new ApiError(errorMessage, response.status, response.statusText || '', errorData);
        }
        try {
            return await response.json();
        } catch (parseError) {
            console.error('❌ [API CLIENT] PATCH JSON parse error:', parseError);
            throw new Error(`Failed to parse response: ${parseError}`);
        }
    }
    async delete(endpoint, options) {
        const url = this.buildUrl(endpoint, options?.params);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: this.getHeaders(options),
            ...options
        });
        if (!response.ok) {
            let errorText = '';
            let errorData = null;
            try {
                const text = await response.text();
                errorText = text || '';
                // Try to parse as JSON
                if (errorText && errorText.trim().startsWith('{')) {
                    try {
                        errorData = JSON.parse(errorText);
                        if (this.shouldLogError(response.status)) {
                            console.error('❌ [API CLIENT] DELETE Error response:', {
                                status: response.status,
                                statusText: response.statusText,
                                url: url,
                                error: {
                                    type: errorData?.type,
                                    title: errorData?.title,
                                    status: errorData?.status,
                                    detail: errorData?.detail,
                                    message: errorData?.message,
                                    instance: errorData?.instance,
                                    fullData: errorData
                                },
                                rawText: errorText
                            });
                        }
                    } catch (parseErr) {
                        // If JSON parse fails, use text as is
                        if (this.shouldLogError(response.status)) {
                            console.error('❌ [API CLIENT] DELETE Error response (text, parse failed):', {
                                status: response.status,
                                statusText: response.statusText,
                                url: url,
                                errorText: errorText,
                                parseError: parseErr
                            });
                        }
                    }
                } else if (errorText && this.shouldLogError(response.status)) {
                    console.error('❌ [API CLIENT] DELETE Error response (text):', {
                        status: response.status,
                        statusText: response.statusText,
                        url: url,
                        errorText: errorText
                    });
                } else if (this.shouldLogError(response.status)) {
                    console.error('❌ [API CLIENT] DELETE Error response (no body):', {
                        status: response.status,
                        statusText: response.statusText,
                        url: url
                    });
                }
            } catch (e) {
                if (this.shouldLogError(response.status)) {
                    console.error('❌ [API CLIENT] Failed to read error response:', {
                        status: response.status,
                        statusText: response.statusText,
                        url: url,
                        error: e
                    });
                }
            }
            // Create a more detailed error with safe fallbacks
            const errorMessage = errorData?.detail || errorData?.message || (errorText ? String(errorText) : '') || `API Error: ${response.status} ${response.statusText}`;
            throw new ApiError(errorMessage, response.status, response.statusText || '', errorData);
        }
        // DELETE requests might not return a body
        try {
            const text = await response.text();
            if (text) {
                return JSON.parse(text);
            }
            return null;
        } catch (parseError) {
            // If there's no body or parse fails, return null for DELETE
            return null;
        }
    }
}
const apiClient = new ApiClient(API_BASE_URL);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/auth/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Load auth state from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            console.log('🔐 [AUTH] Loading auth state from localStorage...');
            const loadAuthState = {
                "AuthProvider.useEffect.loadAuthState": async ()=>{
                    try {
                        const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
                        const storedUser = localStorage.getItem(AUTH_USER_KEY);
                        if (storedToken && storedUser) {
                            console.log('✅ [AUTH] Found stored auth data');
                            const parsedUser = JSON.parse(storedUser);
                            // If user doesn't have roles, fetch from API
                            if (!parsedUser.roles || !Array.isArray(parsedUser.roles)) {
                                console.log('⚠️ [AUTH] User data missing roles, fetching from API...');
                                try {
                                    const profileData = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/v1/users/profile');
                                    if (profileData.roles) {
                                        parsedUser.roles = profileData.roles;
                                        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(parsedUser));
                                        console.log('✅ [AUTH] Roles updated from API:', profileData.roles);
                                    }
                                } catch (fetchError) {
                                    console.error('❌ [AUTH] Failed to fetch user roles:', fetchError);
                                }
                            }
                            setToken(storedToken);
                            setUser(parsedUser);
                        } else {
                            console.log('ℹ️ [AUTH] No stored auth data found');
                        }
                    } catch (error) {
                        console.error('❌ [AUTH] Error loading auth state:', error);
                        // Clear corrupted data
                        localStorage.removeItem(AUTH_TOKEN_KEY);
                        localStorage.removeItem(AUTH_USER_KEY);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["AuthProvider.useEffect.loadAuthState"];
            loadAuthState();
        }
    }["AuthProvider.useEffect"], []);
    /**
   * Login user
   */ const login = async (emailOrPhone, password)=>{
        console.log('🔐 [AUTH] Login attempt:', {
            emailOrPhone: emailOrPhone ? 'provided' : 'not provided',
            password: password ? 'provided' : 'not provided'
        });
        try {
            setIsLoading(true);
            // Determine if it's email or phone
            const isEmail = emailOrPhone.includes('@');
            const requestData = isEmail ? {
                email: emailOrPhone,
                password
            } : {
                phone: emailOrPhone,
                password
            };
            console.log('📤 [AUTH] Sending login request to API...');
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/v1/auth/login', requestData, {
                skipAuth: true
            });
            console.log('✅ [AUTH] Login successful:', {
                userId: response.user.id,
                roles: response.user.roles,
                isAdmin: response.user.roles?.includes('admin')
            });
            // Store auth data
            localStorage.setItem(AUTH_TOKEN_KEY, response.token);
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));
            setToken(response.token);
            setUser(response.user);
            // Trigger auth update event
            window.dispatchEvent(new Event('auth-updated'));
        // Don't redirect here - let the login page handle redirect based on query params
        } catch (error) {
            console.error('❌ [AUTH] Login error:', error);
            // Extract error message from API response
            let errorMessage = 'Login failed. Please try again.';
            // Check if it's an ApiError
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
                if (error.status === 401) {
                    errorMessage = error.message || 'Invalid email/phone or password';
                } else if (error.status === 403) {
                    errorMessage = error.message || 'Your account has been blocked';
                } else if (error.status === 400) {
                    errorMessage = error.message || 'Please provide email/phone and password';
                } else {
                    errorMessage = error.message || errorMessage;
                }
            } else if (error.status === 401) {
                errorMessage = error.message || 'Invalid email/phone or password';
            } else if (error.status === 403) {
                errorMessage = error.message || 'Your account has been blocked';
            } else if (error.status === 400) {
                errorMessage = error.message || 'Please provide email/phone and password';
            } else if (error.message) {
                // Use the error message directly if available
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        } finally{
            setIsLoading(false);
        }
    };
    /**
   * Register new user
   */ const register = async (data)=>{
        console.log('🔐 [AUTH] Registration attempt:', {
            email: data.email || 'not provided',
            phone: data.phone || 'not provided',
            hasFirstName: !!data.firstName,
            hasLastName: !!data.lastName
        });
        try {
            setIsLoading(true);
            console.log('📤 [AUTH] Sending registration request to API...', {
                data
            });
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/v1/auth/register', data, {
                skipAuth: true
            });
            console.log('✅ [AUTH] Registration response received:', response);
            if (!response || !response.user || !response.token) {
                console.error('❌ [AUTH] Invalid response structure:', response);
                throw new Error('Invalid response from server');
            }
            console.log('✅ [AUTH] Registration successful:', {
                userId: response.user.id
            });
            // Store auth data
            try {
                localStorage.setItem(AUTH_TOKEN_KEY, response.token);
                localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));
                console.log('💾 [AUTH] Auth data stored in localStorage');
            } catch (storageError) {
                console.error('❌ [AUTH] Failed to store auth data:', storageError);
                throw new Error('Failed to save authentication data');
            }
            setToken(response.token);
            setUser(response.user);
            // Trigger auth update event
            window.dispatchEvent(new Event('auth-updated'));
            console.log('🔄 [AUTH] Redirecting to home page...');
            // Redirect to home page
            router.push('/');
        } catch (error) {
            console.error('❌ [AUTH] Registration error:', error);
            console.error('❌ [AUTH] Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            // Extract error message from API response
            let errorMessage = 'Registration failed. Please try again.';
            if (error.message) {
                // Check if error has structured data
                if (error.data && error.data.detail) {
                    errorMessage = error.data.detail;
                } else if (error.data && error.data.message) {
                    errorMessage = error.data.message;
                } else {
                    // Fallback to parsing error message
                    const errorText = error.message;
                    if (errorText.includes('409') || errorText.includes('already exists') || errorText.includes('User already exists')) {
                        errorMessage = 'User with this email or phone already exists';
                    } else if (errorText.includes('400') || errorText.includes('Validation failed')) {
                        if (errorText.includes('password') || errorText.includes('Password')) {
                            errorMessage = 'Password must be at least 6 characters';
                        } else if (errorText.includes('email') || errorText.includes('phone')) {
                            errorMessage = 'Please provide email or phone and password';
                        } else {
                            errorMessage = 'Invalid registration data. Please check your input.';
                        }
                    } else if (errorText.includes('500') || errorText.includes('Internal Server Error')) {
                        errorMessage = 'Server error. Please try again later.';
                    } else if (errorText.includes('Failed to parse')) {
                        errorMessage = 'Invalid response from server. Please try again.';
                    } else {
                        // Try to extract meaningful message
                        const match = errorText.match(/detail[:\s]+([^,\n]+)/i);
                        if (match) {
                            errorMessage = match[1].trim();
                        }
                    }
                }
            }
            console.error('❌ [AUTH] Final error message:', errorMessage);
            throw new Error(errorMessage);
        } finally{
            setIsLoading(false);
        }
    };
    /**
   * Logout user
   */ const logout = ()=>{
        console.log('🔐 [AUTH] Logging out...');
        // Clear auth data
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        setToken(null);
        setUser(null);
        // Trigger auth update event
        window.dispatchEvent(new Event('auth-updated'));
        // Redirect to home page
        router.push('/');
    };
    // Calculate roles and admin status
    const roles = user && Array.isArray(user.roles) ? user.roles : [];
    const isAdmin = roles.includes('admin');
    // Debug logging and ensure roles are loaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (user && token) {
                const userRoles = Array.isArray(user.roles) ? user.roles : [];
                const userIsAdmin = userRoles.includes('admin');
                console.log('🔍 [AUTH] User state updated:', {
                    userId: user.id,
                    roles: user.roles,
                    rolesArray: userRoles,
                    isAdmin: userIsAdmin,
                    rolesType: typeof user.roles,
                    rolesIsArray: Array.isArray(user.roles)
                });
                // If user doesn't have roles, fetch from API
                if (!user.roles || !Array.isArray(user.roles) || user.roles.length === 0) {
                    console.log('⚠️ [AUTH] User missing roles, fetching from API...');
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/v1/users/profile').then({
                        "AuthProvider.useEffect": (profileData)=>{
                            if (profileData.roles && Array.isArray(profileData.roles)) {
                                const updatedUser = {
                                    ...user,
                                    roles: profileData.roles
                                };
                                setUser(updatedUser);
                                localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));
                                console.log('✅ [AUTH] Roles updated from API:', profileData.roles);
                            }
                        }
                    }["AuthProvider.useEffect"]).catch({
                        "AuthProvider.useEffect": (error)=>{
                            console.error('❌ [AUTH] Failed to fetch user roles:', error);
                        }
                    }["AuthProvider.useEffect"]);
                }
            }
        }
    }["AuthProvider.useEffect"], [
        user,
        token
    ]);
    const value = {
        user,
        token,
        isLoggedIn: !!token && !!user,
        isLoading,
        isAdmin,
        roles,
        login,
        register,
        logout
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/lib/auth/AuthContext.tsx",
        lineNumber: 352,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "VPCfXJZdo36DSLlj/i8TEIK8OVw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastContainer",
    ()=>ToastContainer,
    "showToast",
    ()=>showToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
function ToastItem({ toast, onClose }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ToastItem.useEffect": ()=>{
            const timer = setTimeout({
                "ToastItem.useEffect.timer": ()=>{
                    onClose(toast.id);
                }
            }["ToastItem.useEffect.timer"], toast.duration || 3000);
            return ({
                "ToastItem.useEffect": ()=>clearTimeout(timer)
            })["ToastItem.useEffect"];
        }
    }["ToastItem.useEffect"], [
        toast.id,
        toast.duration,
        onClose
    ]);
    const bgColors = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800'
    };
    const iconColors = {
        success: 'text-green-600',
        error: 'text-red-600',
        warning: 'text-yellow-600',
        info: 'text-blue-600'
    };
    const icons = {
        success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M5 13l4 4L19 7"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Toast.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/Toast.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this),
        error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M6 18L18 6M6 6l12 12"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Toast.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/Toast.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this),
        warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Toast.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/Toast.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this),
        info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Toast.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/Toast.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `
        ${bgColors[toast.type]}
        border rounded-lg shadow-lg p-4 mb-3 flex items-start gap-3
        max-w-md w-full
        animate-fade-in
      `,
        role: "alert",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex-shrink-0 ${iconColors[toast.type]}`,
                children: icons[toast.type]
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Toast.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 text-sm font-medium",
                children: toast.message
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Toast.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onClose(toast.id),
                className: `flex-shrink-0 ${iconColors[toast.type]} hover:opacity-70 transition-opacity`,
                "aria-label": "Close",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M6 18L18 6M6 6l12 12"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/Toast.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/Toast.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Toast.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/Toast.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s(ToastItem, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ToastItem;
function ToastContainer() {
    _s1();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ToastContainer.useEffect": ()=>{
            // Listen for toast events
            const handleShowToast = {
                "ToastContainer.useEffect.handleShowToast": (event)=>{
                    const customEvent = event;
                    if (!customEvent.detail) return;
                    const newToast = {
                        ...customEvent.detail,
                        id: Date.now().toString() + Math.random().toString(36).substring(2, 11)
                    };
                    setToasts({
                        "ToastContainer.useEffect.handleShowToast": (prev)=>[
                                ...prev,
                                newToast
                            ]
                    }["ToastContainer.useEffect.handleShowToast"]);
                }
            }["ToastContainer.useEffect.handleShowToast"];
            window.addEventListener('show-toast', handleShowToast);
            return ({
                "ToastContainer.useEffect": ()=>{
                    window.removeEventListener('show-toast', handleShowToast);
                }
            })["ToastContainer.useEffect"];
        }
    }["ToastContainer.useEffect"], []);
    const handleClose = (id)=>{
        setToasts((prev)=>prev.filter((toast)=>toast.id !== id));
    };
    if (toasts.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-4 right-4 z-50 flex flex-col items-end",
        children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastItem, {
                toast: toast,
                onClose: handleClose
            }, toast.id, false, {
                fileName: "[project]/apps/web/components/Toast.tsx",
                lineNumber: 124,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/apps/web/components/Toast.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_s1(ToastContainer, "oL0MrtDCqig+amxuKH2EOlnBcjg=");
_c1 = ToastContainer;
function showToast(message, type = 'info', duration) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const event = new CustomEvent('show-toast', {
        detail: {
            message,
            type,
            duration
        }
    });
    window.dispatchEvent(event);
}
var _c, _c1;
__turbopack_context__.k.register(_c, "ToastItem");
__turbopack_context__.k.register(_c1, "ToastContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/ClientProviders.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientProviders",
    ()=>ClientProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/auth/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/Toast.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function ClientProviders({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastContainer"], {}, void 0, false, {
                fileName: "[project]/apps/web/components/ClientProviders.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/ClientProviders.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = ClientProviders;
var _c;
__turbopack_context__.k.register(_c, "ClientProviders");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/currency.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Currency utilities and exchange rates
__turbopack_context__.s([
    "CURRENCIES",
    ()=>CURRENCIES,
    "clearCurrencyRatesCache",
    ()=>clearCurrencyRatesCache,
    "convertPrice",
    ()=>convertPrice,
    "formatPrice",
    ()=>formatPrice,
    "formatPriceInCurrency",
    ()=>formatPriceInCurrency,
    "getStoredCurrency",
    ()=>getStoredCurrency,
    "initializeCurrencyRates",
    ()=>initializeCurrencyRates,
    "setStoredCurrency",
    ()=>setStoredCurrency
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const CURRENCIES = {
    USD: {
        code: 'USD',
        symbol: '$',
        name: 'US Dollar',
        rate: 1
    },
    AMD: {
        code: 'AMD',
        symbol: '֏',
        name: 'Armenian Dram',
        rate: 400
    },
    EUR: {
        code: 'EUR',
        symbol: '€',
        name: 'Euro',
        rate: 0.92
    },
    RUB: {
        code: 'RUB',
        symbol: '₽',
        name: 'Russian Ruble',
        rate: 90
    },
    GEL: {
        code: 'GEL',
        symbol: '₾',
        name: 'Georgian Lari',
        rate: 2.7
    }
};
// Cache for currency rates from API
let currencyRatesCache = null;
let currencyRatesCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
/**
 * Get currency rates from API with caching
 */ async function getCurrencyRates() {
    // Return cached rates if still valid
    if (currencyRatesCache && Date.now() - currencyRatesCacheTime < CACHE_DURATION) {
        return currencyRatesCache;
    }
    try {
        const response = await fetch('/api/v1/currency-rates', {
            cache: 'no-store'
        });
        if (response.ok) {
            const rates = await response.json();
            currencyRatesCache = rates;
            currencyRatesCacheTime = Date.now();
            console.log('✅ [CURRENCY] Currency rates loaded:', rates);
            return rates;
        } else {
            console.error('❌ [CURRENCY] API returned error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('❌ [CURRENCY] Failed to fetch currency rates:', error);
    }
    // Return default rates on error
    return {
        USD: 1,
        AMD: 400,
        EUR: 0.92,
        RUB: 90,
        GEL: 2.7
    };
}
function clearCurrencyRatesCache() {
    currencyRatesCache = null;
    currencyRatesCacheTime = 0;
    // Dispatch event to notify components
    if ("TURBOPACK compile-time truthy", 1) {
        window.dispatchEvent(new Event('currency-rates-updated'));
    }
}
const CURRENCY_STORAGE_KEY = 'shop_currency';
function getStoredCurrency() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
        if (stored && stored in CURRENCIES) {
            return stored;
        }
    } catch  {
    // Ignore errors
    }
    return 'AMD';
}
function setStoredCurrency(currency) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
        window.dispatchEvent(new Event('currency-updated'));
    } catch (error) {
        console.error('Failed to save currency:', error);
    }
}
function formatPrice(price, currency = 'USD') {
    const currencyInfo = CURRENCIES[currency];
    // Use cached rates if available (client-side only), otherwise use default rates
    // On server-side, currencyRatesCache will be null, so it will use default rates
    let rate;
    if (("TURBOPACK compile-time value", "object") !== 'undefined' && currencyRatesCache && currencyRatesCache[currency] !== undefined) {
        rate = currencyRatesCache[currency];
    } else {
        rate = currencyInfo.rate;
    }
    const convertedPrice = price * rate;
    // Show all currencies without decimals (remove .00)
    const minimumFractionDigits = 0;
    const maximumFractionDigits = 0;
    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyInfo.code,
        minimumFractionDigits,
        maximumFractionDigits
    }).format(convertedPrice);
    // Debug logging (only in development)
    if ("TURBOPACK compile-time truthy", 1) {
        console.log(`💱 [formatPrice] ${price} ${currencyInfo.code} × ${rate} = ${formatted}`);
    }
    return formatted;
}
async function initializeCurrencyRates(forceReload = false) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (forceReload) {
        currencyRatesCache = null;
        currencyRatesCacheTime = 0;
    }
    const rates = await getCurrencyRates();
    console.log('✅ [CURRENCY] Currency rates initialized:', rates);
}
function convertPrice(price, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return price;
    // Use cached rates if available, otherwise use default rates
    const fromRate = currencyRatesCache?.[fromCurrency] ?? CURRENCIES[fromCurrency].rate;
    const toRate = currencyRatesCache?.[toCurrency] ?? CURRENCIES[toCurrency].rate;
    // Convert to USD first, then to target currency
    const usdPrice = price / fromRate;
    return usdPrice * toRate;
}
function formatPriceInCurrency(price, currency = 'AMD') {
    const currencyInfo = CURRENCIES[currency];
    // Show all currencies without decimals (remove .00)
    const minimumFractionDigits = 0;
    const maximumFractionDigits = 0;
    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyInfo.code,
        minimumFractionDigits,
        maximumFractionDigits
    }).format(price);
    return formatted;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/language.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored && stored in LANGUAGES) {
            return stored;
        }
    } catch  {
    // Ignore errors
    }
    return 'en';
}
function setStoredLanguage(language, options) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        window.dispatchEvent(new Event('language-updated'));
        // Only reload if skipReload is not true
        if (!options?.skipReload) {
            // Use a small delay to ensure state updates are visible before reload
            setTimeout(()=>{
                window.location.reload();
            }, 50);
        }
    } catch (error) {
        console.error('Failed to save language:', error);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/locales/hy/common.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"buttons":{"addToCart":"Ավելացնել զամբյուղ","addToWishlist":"Ավելացնել ցանկությունների ցուցակ","viewProduct":"Դիտել ապրանքը","viewDetails":"Դիտել մանրամասները","browseProducts":"Դիտել ապրանքները","proceedToCheckout":"Անցնել վճարման","remove":"Հեռացնել","submit":"Ուղարկել","cancel":"Չեղարկել","login":"Մուտք","register":"Գրանցում","search":"Որոնել","shopNow":"Գնել հիմա","viewMore":"Դիտել ավելին","close":"Փակել"},"navigation":{"home":"Գլխավոր","products":"Ապրանքներ","categories":"Կատեգորիաներ","cart":"Զամբյուղ","wishlist":"Ցանկությունների ցուցակ","compare":"Համեմատել","checkout":"Վճարում","profile":"Պրոֆիլ","orders":"Պատվերներ","login":"Մուտք","register":"Գրանցում","about":"Մեր մասին","contact":"Կապ","admin":"Ադմին","adminPanel":"Ադմին էջ","logout":"Ելք","faq":"Հաճախակի հարցեր","shipping":"Առաքում","returns":"Վերադարձ","support":"Աջակցություն","privacy":"Գաղտնիություն","terms":"Պայմաններ","cookies":"Cookie-ներ","delivery":"Առաքում","stores":"Խանութներ"},"stock":{"inStock":"Պահեստում","outOfStock":"Արտադրված"},"cart":{"title":"Գնումների զամբյուղ","empty":"Ձեր զամբյուղը դատարկ է","orderSummary":"Պատվերի ամփոփում","subtotal":"Ենթագումար","shipping":"Առաքում","tax":"Հարկ","total":"Ընդամենը","free":"Անվճար","items":"ապրանք","item":"ապրանք"},"wishlist":{"title":"Իմ ցանկությունների ցուցակ","empty":"Ձեր ցանկությունների ցուցակը դատարկ է","emptyDescription":"Սկսեք ավելացնել ապրանքներ ձեր ցանկությունների ցուցակին՝ հետագա օգտագործման համար:","totalCount":"Ընդհանուր ապրանքներ ցանկությունների ցուցակում","tableHeaders":{"productName":"Ապրանքի անվանում","unitPrice":"Միավորի գին","stockStatus":"Պահեստի կարգավիճակ","action":"Գործողություն"}},"compare":{"title":"Համեմատել ապրանքները","empty":"Համեմատելու ապրանքներ չկան","emptyDescription":"Ավելացրեք մինչև 4 ապրանք՝ դրանց հատկանիշներն ու գները համեմատելու համար:","products":"ապրանք","product":"ապրանք","isFull":"Համեմատման ցուցակը լի է","characteristic":"Հատկանիշ","image":"Պատկեր","name":"Անվանում","brand":"Բրենդ","price":"Գին","availability":"Պահեստ","actions":"Գործողություններ","viewDetails":"Դիտել մանրամասները","browseProducts":"Դիտել ապրանքները"},"reviews":{"title":"Կարծիքներ","writeReview":"Գրել կարծիք","rating":"Գնահատական","comment":"Ձեր կարծիքը","commentPlaceholder":"Կիսվեք ձեր մտքերով այս ապրանքի մասին...","submitReview":"Ուղարկել կարծիք","submitting":"Ուղարկվում է...","loginRequired":"Խնդրում ենք մուտք գործել կարծիք գրելու համար","ratingRequired":"Խնդրում ենք ընտրել գնահատական","commentRequired":"Խնդրում ենք գրել կարծիք","submitError":"Չհաջողվեց ուղարկել կարծիքը","alreadyReviewed":"Դուք արդեն գրել եք կարծիք այս ապրանքի մասին","noReviews":"Կարծիքներ դեռ չկան: Դարձեք առաջինը, ով կգրի կարծիք:","review":"կարծիք","reviews":"կարծիք"},"messages":{"addedToCart":"Ավելացվեց զամբյուղ","removedFromCart":"Հեռացվեց զամբյուղից","addedToWishlist":"Ավելացվեց ցանկությունների ցուցակ","removedFromWishlist":"Հեռացվեց ցանկությունների ցուցակից","addedToCompare":"Ավելացվեց համեմատման ցուցակ","removedFromCompare":"Հեռացվեց համեմատման ցուցակից","errorAddingToCart":"Սխալ ավելացնելիս","loading":"Բեռնվում է...","loadingFilters":"Բեռնվում են ֆիլտրերը...","noImage":"Պատկեր չկա","noProductsFound":"Ապրանքներ չգտնվեցին","selectColor":"Խնդրում ենք ընտրել գույն","selectSize":"Խնդրում ենք ընտրել չափ","selectColorAndSize":"Խնդրում ենք ընտրել գույն և չափ","selectOptions":"Ընտրել ընտրանքներ","adding":"Ավելացվում է...","pcs":"հատ","compareMaxReached":"Դուք կարող եք համեմատել առավելագույնը 4 ապրանք","invalidProduct":"Անվավեր ապրանք: Խնդրում ենք թարմացնել էջը և կրկին փորձել:","noVariantsAvailable":"Տարբերակներ չկան","stockExceeded":"Մատչելի քանակը {stock} հատ է: Դուք չեք կարող ավելացնել ավելի շատ քանակ:","quantityUpdated":"Քանակը թարմացվեց","failedToUpdateQuantity":"Չհաջողվեց թարմացնել քանակը","stockInsufficient":"Մատչելի քանակը բավարար չէ","availableQuantity":"Մատչելի քանակը {stock} հատ է","addQuantity":"Ավելացնել քանակ","product":"Ապրանք","quantity":"Քանակ","subtotal":"Ենթագումար","sku":"SKU"},"alerts":{"compareMaxReached":"Դուք կարող եք համեմատել առավելագույնը 4 ապրանք","invalidProduct":"Անվավեր ապրանք: Խնդրում ենք թարմացնել էջը և կրկին փորձել:","noVariantsAvailable":"Տարբերակներ չկան","stockExceeded":"Մատչելի քանակը {stock} հատ է: Դուք չեք կարող ավելացնել ավելի շատ քանակ:","stockInsufficient":"Մատչելի քանակը բավարար չէ: {message}","noMoreStockAvailable":"Պահեստում ավելի շատ ապրանք չկա","productNotFound":"Ապրանքը չի գտնվել: Խնդրում ենք թարմացնել էջը և կրկին փորձել:","failedToAddToCart":"Չհաջողվեց ավելացնել ապրանքը զամբյուղ: Խնդրում ենք կրկին փորձել:"},"ariaLabels":{"addToCart":"Ավելացնել զամբյուղ","removeFromCart":"Հեռացնել զամբյուղից","addToWishlist":"Ավելացնել ցանկությունների ցուցակ","removeFromWishlist":"Հեռացնել ցանկությունների ցուցակից","addToCompare":"Ավելացնել համեմատման ցուցակ","removeFromCompare":"Հեռացնել համեմատման ցուցակից","outOfStock":"Արտադրված","search":"Որոնել","searchPlaceholder":"Որոնել ապրանքներ","openMenu":"Բացել նավիգացիայի մենյու","closeMenu":"Փակել նավիգացիայի մենյու","instagram":"Instagram","facebook":"Facebook","linkedin":"LinkedIn","color":"Գույն: {color}","previousImage":"Նախորդ պատկեր","nextImage":"Հաջորդ պատկեր","goToSlide":"Գնալ {number} սլայդ","removeItem":"Հեռացնել ապրանք","decreaseQuantity":"Նվազեցնել քանակ","increaseQuantity":"Ավելացնել քանակ","previousThumbnail":"Նախորդ մանրապատկեր","nextThumbnail":"Հաջորդ մանրապատկեր","fullscreenImage":"Լիաէկրան պատկեր"},"placeholders":{"search":"Որոնել ապրանքներ"},"defaults":{"category":"Մթերք"},"footer":{"shop":"Խանութ","description":"Պրոֆեսիոնալ էլեկտրոնային առևտրի հարթակ ժամանակակից գնումների փորձի համար:","quickLinks":"Արագ հղումներ","legal":"Իրավական","contactInfo":"Կոնտակտային տեղեկատվություն","privacyPolicy":"Գաղտնիության քաղաքականություն","termsOfService":"Ծառայությունների պայմաններ","cookiePolicy":"Cookie քաղաքականություն","refundPolicy":"Փոխհատուցման քաղաքականություն","deliveryTerms":"Առաքման պայմաններ","copyright":"© {year} Խանութ: Բոլոր իրավունքները պաշտպանված են:","paymentMethods":"Վճարման եղանակներ:"},"product":{"product":"ապրանք","products":"ապրանք"},"pagination":{"previous":"Նախորդ","next":"Հաջորդ","pageOf":"Էջ {page} {totalPages}-ից"},"notFound":{"title":"Էջը չի գտնվել","description":"Ձեր փնտրած էջը գոյություն չունի կամ տեղափոխվել է:","goHome":"Գնալ գլխավոր էջ"}});}),
"[project]/apps/web/locales/hy/home.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"hero_title":"Բարի գալուստ  խանութ","hero_subtitle":"Բացահայտեք զարմանալի ապրանքներ և բացառիկ առաջարկներ: Գնեք ամենավերջին միտումները և գտեք այն ամենը, ինչ ձեզ հարկավոր է մեկ տեղում:","hero_button_products":"ԱՊՐԱՆՔՆԵՐ","hero_button_view_more":"ԴԻՏԵԼ ԱՎԵԼԻՆ","features_title":"Մենք ապահովում ենք բարձրորակ ապրանքներ","features_subtitle":"Անբավարարված հաճախորդը, ով ունի պատճառ, խնդիր է, բայց անբավարարված հաճախորդը, ով չի կարող բացատրել, ավելի մեծ խնդիր է:","feature_fast_delivery_title":"Արագ առաքում","feature_fast_delivery_description":"Հավանական է, որ չի եղել համագործակցություն և ստուգման կետեր, չի եղել գործընթաց:","feature_best_quality_title":"Լավագույն որակ","feature_best_quality_description":"Սա բովանդակության ռազմավարություն է, որը սխալվել է հենց սկզբից:","feature_free_return_title":"Անվճար վերադարձ","feature_free_return_description":"Ճիշտ է, բայց դա ամենը չէ, ինչ անհրաժեշտ է բաները վերադարձնելու համար:","featured_products":{"title":"Առաջարկվող ապրանքներ","subtitle":"Երեք արագ ընտրություն. Նոր ժամանումներ, Լավագույն վաճառքներ և Առաջարկվող ընտրություններ","tab_new":"ՆՈՐ","tab_bestseller":"ԼԱՎԱԳՈՒՅՆ ՎԱՃԱՌՔ","tab_featured":"ԱՌԱՋԱՐԿՎՈՂ","ariaShowProducts":"Ցուցադրել {label} ապրանքներ","errorLoading":"Չհաջողվեց բեռնել ապրանքները","tryAgain":"Փորձել կրկին","noProducts":"Այս կատեգորիայում ապրանքներ չկան:"}});}),
"[project]/apps/web/locales/hy/product.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"details_title":"Ապրանքի մանրամասներ","related_products_title":"Նմանատիպ ապրանքներ","reviews_title":"Կարծիքներ","specifications_title":"Տեխնիկական բնութագրեր","description_title":"Նկարագրություն","color":"Գույն","size":"Չափ","quantity":"Քանակ","addToCart":"Ավելացնել զամբյուղ","outOfStock":"Արտադրված","selectColor":"Խնդրում ենք ընտրել գույն","selectSize":"Խնդրում ենք ընտրել չափ","selectColorAndSize":"Խնդրում ենք ընտրել գույն և չափ","selectOptions":"Ընտրել ընտրանքներ","adding":"Ավելացվում է...","addedToCart":"Ավելացվեց զամբյուղ","addedToWishlist":"Ավելացվեց ցանկությունների ցուցակ","removedFromWishlist":"Հեռացվեց ցանկությունների ցուցակից","addedToCompare":"Ավելացվեց համեմատման ցուցակ","removedFromCompare":"Հեռացվեց համեմատման ցուցակից","compareListFull":"Համեմատման ցուցակը լի է","errorAddingToCart":"Սխալ ավելացնելիս","pcs":"հատ","outOfStockLabel":"Արտադրված","noRelatedProducts":"Նմանատիպ ապրանքներ չգտնվեցին"});}),
"[project]/apps/web/locales/hy/products.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"filters":{"price":{"title":"Զտել ըստ գնի","priceLabel":"Գին:"},"color":{"title":"Զտել ըստ գույնի","noColors":"Գույներ չկան","loading":"Բեռնվում է..."},"size":{"title":"Զտել ըստ չափի","noSizes":"Չափեր չկան","loading":"Բեռնվում է..."},"brand":{"title":"Զտել ըստ բրենդի","searchPlaceholder":"Գտնել բրենդ","noBrands":"Բրենդներ չգտնվեցին","loading":"Բեռնվում է..."}},"header":{"allProducts":"Բոլոր ապրանքները ({total})","clearFilters":"Մաքրել ֆիլտրերը","show":"Ցուցադրել","all":"Բոլորը","sort":{"default":"Լռելյայն դասավորություն","priceAsc":"Գին: ցածրից բարձր","priceDesc":"Գին: բարձրից ցածր","nameAsc":"Անվանում: Ա-ից Զ","nameDesc":"Անվանում: Զ-ից Ա"},"viewModes":{"list":"Ցուցակի տեսք","grid2":"Ցանցի տեսք 2x2","grid3":"Ցանցի տեսք 3x3"},"filters":"Ֆիլտրեր","sortProducts":"Դասավորել ապրանքները"},"grid":{"noProducts":"Ապրանքներ չգտնվեցին։"},"mobileFilters":{"title":"Ֆիլտրեր","close":"Փակել ֆիլտրերը"},"categoryNavigation":{"all":"Բոլորը","shopAll":"Բոլոր ապրանքները","newArrivals":"Նոր ապրանքներ","sale":"Զեղչ","labels":{"all":"ԲՈԼՈՐ","new":"ՆՈՐ","sale":"ԶԵՂՉ"},"scrollLeft":"Ոլորել կատեգորիաները ձախ","scrollRight":"Ոլորել կատեգորիաները աջ"}});}),
"[project]/apps/web/locales/hy/attributes.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"color":{"red":"Կարմիր","blue":"Կապույտ","green":"Կանաչ","yellow":"Դեղին","black":"Սև","white":"Սպիտակ","gray":"Մոխրագույն","grey":"Մոխրագույն","brown":"Շագանակագույն","orange":"Նարնջագույն","pink":"Վարդագույն","purple":"Մանուշակագույն","navy":"Մուգ կապույտ","beige":"Բեժ","maroon":"Շագանակագույն","olive":"Զայթուն","teal":"Ծովակնագույն","cyan":"Երկնագույն","magenta":"Մագենտա","lime":"Լայմ","silver":"Արծաթագույն","gold":"Ոսկեգույն"},"size":{"xs":"XS","s":"S","m":"M","l":"L","xl":"XL","xxl":"XXL","xxxl":"XXXL"}});}),
"[project]/apps/web/locales/hy/delivery.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Առաքում և վերադարձ","deliveryInformation":{"title":"Առաքման տեղեկատվություն","freeDelivery":"Անվճար առաքում","deliveryCost":"Առաքման արժեք: {price}","freeForOrdersAbove":"Անվճար {amount} և ավելի պատվերների համար","estimatedDelivery":"Մոտավոր առաքում: {days} {daysText}","day":"օր","days":"օր","pickupLocations":"Վերցման վայրեր:"},"returnPolicy":{"title":"Վերադարձի քաղաքականություն","thirtyDayPolicy":{"title":"30-օրյա վերադարձի քաղաքականություն","description":"Դուք ունեք 30 օր գնման ամսաթվից՝ ապրանքները վերադարձնելու համար իրենց սկզբնական վիճակում՝ պիտակներով:"},"returnConditions":{"title":"Վերադարձի պայմաններ","items":["Ապրանքները պետք է լինեն չկրած, չլվացված և սկզբնական փաթեթավորման մեջ","Բոլոր պիտակները և նշանները պետք է ամրացված լինեն","Ապրանքները պետք է լինեն վաճառելի վիճակում","Պահանջվում է գնման ապացույց"]},"howToReturn":{"title":"Ինչպես վերադարձնել","steps":["Կապ հաստատեք մեր հաճախորդների սպասարկման թիմի հետ վերադարձը սկսելու համար","Ստացեք վերադարձի արտոնագրի համար","Ապահով փաթեթավորեք ապրանքները վերադարձի ձևով","Ուղարկեք փաթեթը մեր վերադարձի հասցեին","Ստանալուց հետո մենք կմշակենք ձեր վերադարձը 5-7 աշխատանքային օրվա ընթացքում"]},"refundProcess":{"title":"Վերադարձի գործընթաց","description":"Վերադարձները կմշակվեն սկզբնական վճարման եղանակով: Խնդրում ենք թույլ տալ 5-7 աշխատանքային օր, որպեսզի վերադարձը հայտնվի ձեր հաշվում:"},"nonReturnableItems":{"title":"Չվերադարձվող ապրանքներ","items":["Անհատականացված կամ հատուկ պատվերով ապրանքներ","Ապրանքներ առանց սկզբնական փաթեթավորման","Սխալ օգտագործման պատճառով վնասված ապրանքներ","Զեղչված ապրանքներ (բացառությամբ թերի ապրանքների)"]}},"contact":{"title":"Օգնության կարիք ունե՞ք","description":"Եթե ունեք հարցեր առաքման կամ վերադարձի վերաբերյալ, խնդրում ենք չկասկածել մեզ հետ կապ հաստատել:","email":"Էլ. փոստ:","phone":"Հեռախոս:","hours":"Աշխատանքային ժամեր:","hoursValue":"Երկուշաբթի - Ուրբաթ, 9:00 - 18:00"}});}),
"[project]/apps/web/locales/hy/about.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"subtitle":"ԱՐՏԱՀՅՈՒՍԵԼԻ ԴԻԶԱՅՆ","title":"Մեր առցանց խանութի մասին","description":{"paragraph1":"Մենք ուրախ ենք ողջունել ձեզ մեր առցանց խանութում: Մեր ընկերությունը ձգտում է ապահովել ձեզ լավագույն գնումների փորձ՝ լայն տեսականի բարձրորակ ապրանքներով և գերազանց սպասարկմամբ:","paragraph2":"Մեր առաքելությունը առցանց գնումները դարձնել պարզ, հարմար և հաճելի է: Մենք ուշադիր ընտրում ենք յուրաքանչյուր ապրանք՝ ապահովելու բարձր որակ և մեր հաճախորդների բավարարվածությունը:","paragraph3":"Մենք հպարտ ենք, որ առաջարկում ենք ոչ միայն գերազանց ապրանքներ, այլև գերազանց հաճախորդների սպասարկում: Մեր թիմը միշտ պատրաստ է օգնել ձեզ գտնել հենց այն, ինչ փնտրում եք:"},"team":{"subtitle":"ՄԵՐ ՄԱՍԻՆ","title":"Մեր թիմը","description":"Մեր թիմը բաղկացած է փորձառու մասնագետներից, ովքեր նվիրված են իրենց աշխատանքին և ձգտում են ապահովել լավագույն սպասարկում մեր հաճախորդների համար:"}});}),
"[project]/apps/web/locales/hy/contact.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"callToUs":{"title":"Զանգահարեք մեզ:","description":"Մենք հասանելի ենք շաբաթվա 7 օր, օրվա 24 ժամ:"},"writeToUs":{"title":"Գրեք մեզ:","description":"Լրացրեք մեր ձևը, և մենք կկապվենք ձեզ հետ 24 ժամվա ընթացքում:","emailLabel":"Էլ. փոստ:"},"headquarter":{"title":"Գլխավոր գրասենյակ:","hours":{"weekdays":"Երկուշաբթի - Ուրբաթ: 9:00-20:00","saturday":"Շաբաթ: 11:00 - 15:00"}},"form":{"name":"Անուն *","namePlaceholder":"Ձեր անունը","email":"Էլ. փոստ *","emailPlaceholder":"your@email.com","subject":"Թեմա *","subjectPlaceholder":"Ինչի՞ մասին է","message":"Հաղորդագրություն","messagePlaceholder":"Ձեր հաղորդագրությունը...","submit":"Ուղարկել","submitting":"Ուղարկվում է...","submitSuccess":"Ձեր հաղորդագրությունը հաջողությամբ ուղարկվեց","submitError":"Սխալ: Չհաջողվեց ուղարկել հաղորդագրությունը"}});}),
"[project]/apps/web/locales/hy/faq.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Հաճախակի տրվող հարցեր","description":"Գտեք պատասխաններ մեր ապրանքների, առաքման, վերադարձի և այլ հարցերի վերաբերյալ:","categories":{"ordersShipping":{"title":"Պատվերներ և առաքում","questions":{"shippingTime":{"q":"Որքա՞ն է տևում առաքումը:","a":"Առաքման ժամկետները տարբերվում են՝ կախված ձեր գտնվելու վայրից և ընտրված առաքման եղանակից: Ստանդարտ առաքումը սովորաբար տևում է 5-7 աշխատանքային օր, մինչդեռ արագ առաքումը տևում է 2-3 աշխատանքային օր: Դուք կարող եք գտնել մանրամասն առաքման տեղեկատվություն մեր Առաքում էջում:"},"internationalShipping":{"q":"Արտասահման արդյոք առաքու՞մ եք:","a":"Այո, մենք առաքում ենք աշխարհի մեծ մասի երկրներ: Առաքման արժեքները և առաքման ժամկետները տարբերվում են՝ կախված գտնվելու վայրից: Խնդրում ենք ստուգել մեր առաքման էջը ավելի մանրամասն տեղեկությունների համար:"},"trackOrder":{"q":"Կարո՞ղ եմ հետևել իմ պատվերին:","a":"Այո, երբ ձեր պատվերը ուղարկվի, դուք կստանաք հետևման համար էլ. փոստով: Դուք կարող եք օգտագործել այս համարը՝ ձեր փաթեթը հետևելու համար փոխադրողի կայքում:"},"damagedOrder":{"q":"Ի՞նչ անել, եթե իմ պատվերը վնասված կամ սխալ է:","a":"Եթե դուք ստանում եք վնասված կամ սխալ ապրանք, խնդրում ենք անմիջապես կապ հաստատել մեր հաճախորդների սպասարկման թիմի հետ: Մենք կկազմակերպենք փոխարինում կամ վերադարձ առանց լրացուցիչ վճարի:"}}},"returnsRefunds":{"title":"Վերադարձ և փոխհատուցում","questions":{"returnPolicy":{"q":"Ո՞րն է ձեր վերադարձի քաղաքականությունը:","a":"Մենք առաջարկում ենք 30-օրյա վերադարձի քաղաքականություն: Ապրանքները պետք է լինեն իրենց սկզբնական վիճակում՝ պիտակներով: Խնդրում ենք այցելել մեր Վերադարձ էջը ամբողջական մանրամասների համար:"},"howToReturn":{"q":"Ինչպե՞ս վերադարձնել ապրանք:","a":"Ապրանք վերադարձնելու համար կապ հաստատեք մեր հաճախորդների սպասարկման թիմի հետ՝ վերադարձի արտոնագրի համար ստանալու համար: Այնուհետև ապահով փաթեթավորեք ապրանքը և ուղարկեք այն մեր վերադարձի հասցեին: Ամբողջական հրահանգները հասանելի են մեր Վերադարձ էջում:"},"refundTime":{"q":"Որքա՞ն է տևում փոխհատուցման մշակումը:","a":"Ձեր վերադարձված ապրանքը ստանալուց հետո մենք մշակում ենք փոխհատուցումը 5-7 աշխատանքային օրվա ընթացքում: Փոխհատուցումը կհայտնվի ձեր հաշվում մշակումից անմիջապես հետո:"},"returnShipping":{"q":"Պետք է վճարե՞մ վերադարձի առաքման համար:","a":"Վերադարձի առաքման արժեքները կախված են վերադարձի պատճառից: Եթե ապրանքը թերի է կամ սխալ, մենք վճարում ենք վերադարձի առաքումը: Հակառակ դեպքում հաճախորդը պատասխանատու է վերադարձի առաքման արժեքի համար:"}}},"payment":{"title":"Վճարում","questions":{"paymentMethods":{"q":"Ի՞նչ վճարման եղանակներ եք ընդունում:","a":"Մենք ընդունում ենք բոլոր հիմնական վարկային քարտերը, դեբետային քարտերը, PayPal և այլ անվտանգ վճարման եղանակներ: Բոլոր վճարումները մշակվում են անվտանգ:"},"paymentSecurity":{"q":"Արդյոք իմ վճարման տեղեկատվությունը անվտանգ է:","a":"Այո, մենք օգտագործում ենք արդյունաբերական ստանդարտ գաղտնագրում՝ ձեր վճարման տեղեկատվությունը պաշտպանելու համար: Մենք երբեք չենք պահում ձեր վարկային քարտի ամբողջական մանրամասները մեր սերվերներում:"},"multiplePayment":{"q":"Կարո՞ղ եմ վճարել մի քանի վճարման եղանակներով:","a":"Ներկայումս մենք ընդունում ենք միայն մեկ վճարման եղանակ մեկ պատվերի համար: Եթե ձեզ անհրաժեշտ է բաժանել վճարումը, խնդրում ենք կապ հաստատել մեր հաճախորդների սպասարկման թիմի հետ:"}}},"accountPrivacy":{"title":"Հաշիվ և գաղտնիություն","questions":{"createAccount":{"q":"Ինչպե՞ս ստեղծել հաշիվ:","a":"Դուք կարող եք ստեղծել հաշիվ՝ սեղմելով վերնագրի \"Գրանցում\" հղումը կամ գրանցվելով վճարման ժամանակ: Հաշիվ ունենալը թույլ է տալիս հետևել պատվերներին և պահպանել ձեր տեղեկատվությունը ավելի արագ վճարման համար:"},"resetPassword":{"q":"Ինչպե՞ս վերականգնել գաղտնաբառը:","a":"Եթե մոռացել եք ձեր գաղտնաբառը, սեղմեք մուտքի էջի \"Մոռացել եմ գաղտնաբառը\" կոճակը: Դուք կստանաք էլ. փոստ հրահանգներով՝ գաղտնաբառը վերականգնելու համար:"},"privacyProtection":{"q":"Ինչպե՞ս եք պաշտպանում իմ անձնական տեղեկատվությունը:","a":"Մենք լուրջ ենք վերաբերվում ձեր գաղտնիությանը: Մենք օգտագործում ենք անվտանգ գաղտնագրում և երբեք չենք կիսվում ձեր անձնական տեղեկատվությամբ երրորդ կողմերի հետ: Խնդրում ենք վերանայել մեր Գաղտնիության քաղաքականությունը ամբողջական մանրամասների համար:"}}},"products":{"title":"Ապրանքներ","questions":{"authenticProducts":{"q":"Արդյոք ձեր ապրանքները իսկական են:","a":"Այո, մենք վաճառում ենք միայն իսկական ապրանքներ լիցենզավորված դիլերներից և արտադրողներից: Մենք երաշխավորում ենք բոլոր ապրանքների իսկականությունը:"},"outOfStock":{"q":"Ի՞նչ անել, եթե ապրանքը պահեստում չկա:","a":"Եթե ապրանքը պահեստում չկա, դուք կարող եք գրանցվել էլ. փոստի ծանուցումների համար, որպեսզի տեղեկացվեք, երբ այն կրկին հասանելի դառնա:"},"warranties":{"q":"Արդյոք առաջարկում եք ապրանքների երաշխիք:","a":"Երաշխիքի տեղեկատվությունը տարբերվում է ապրանքից: Խնդրում ենք ստուգել ապրանքի նկարագրությունը կոնկրետ երաշխիքի մանրամասների համար: Շատ ապրանքներ ունեն արտադրողի երաշխիք:"}}}},"stillHaveQuestions":{"title":"Դեռ հարցեր ունե՞ք:","description":"Չե՞ք կարող գտնել այն, ինչ փնտրում եք: Մեր հաճախորդների սպասարկման թիմը պատրաստ է օգնել:","contactUs":"Կապ մեզ հետ →","getSupport":"Ստանալ աջակցություն →"}});}),
"[project]/apps/web/locales/hy/login.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Բարի վերադարձ","subtitle":"Մուտք գործեք ձեր հաշիվ՝ շարունակելու համար","form":{"emailOrPhone":"Էլ. փոստ կամ հեռախոս","emailOrPhonePlaceholder":"your@email.com կամ +374 XX XXX XXX","password":"Գաղտնաբառ","passwordPlaceholder":"••••••••","rememberMe":"Հիշել ինձ","forgotPassword":"Մոռացել եք գաղտնաբառը?","submit":"Մուտք","submitting":"Մուտք գործվում է...","noAccount":"Հաշիվ չունե՞ք:","signUp":"Գրանցվել"},"errors":{"emailOrPhoneRequired":"Խնդրում ենք մուտքագրել ձեր էլ. փոստը կամ հեռախոսահամարը","passwordRequired":"Խնդրում ենք մուտքագրել ձեր գաղտնաբառը","loginFailed":"Մուտքը ձախողվեց: Խնդրում ենք կրկին փորձել:"}});}),
"[project]/apps/web/locales/hy/cookies.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Cookie քաղաքականություն","lastUpdated":"Վերջին թարմացում:","whatAreCookies":{"title":"Ի՞նչ են Cookie-ները:","description1":"Cookie-ները փոքր տեքստային ֆայլեր են, որոնք տեղադրվում են ձեր համակարգչի կամ բջջային սարքի վրա, երբ դուք այցելում եք կայք: Դրանք լայնորեն օգտագործվում են կայքերը ավելի արդյունավետ աշխատացնելու և տեղեկատվություն տրամադրելու կայքի սեփականատերերին:","description2":"Cookie-ները թույլ են տալիս կայքին ճանաչել ձեր սարքը և պահել որոշ տեղեկատվություն ձեր նախասիրությունների կամ անցյալ գործողությունների մասին:"},"howWeUseCookies":{"title":"Ինչպես ենք մենք օգտագործում Cookie-ները","description":"Մենք օգտագործում ենք Cookie-ները մի քանի նպատակով:","types":{"essential":{"title":"Կարևոր Cookie-ներ:","description":"Այս Cookie-ները անհրաժեշտ են կայքի ճիշտ աշխատանքի համար: Դրանք ապահովում են հիմնական գործառույթները, ինչպիսիք են էջի նավիգացիան և կայքի անվտանգ տարածքներին մուտքը:"},"performance":{"title":"Արտադրողականության Cookie-ներ:","description":"Այս Cookie-ները օգնում են մեզ հասկանալ, թե ինչպես են այցելուները փոխազդում մեր կայքի հետ՝ անանուն հավաքելով և հաղորդելով տեղեկատվություն: Սա օգնում է մեզ բարելավել մեր կայքի աշխատանքը:"},"functionality":{"title":"Ֆունկցիոնալ Cookie-ներ:","description":"Այս Cookie-ները թույլ են տալիս կայքին հիշել ձեր կատարած ընտրությունները (ինչպիսիք են ձեր լեզվի նախասիրությունը կամ տարածաշրջանը) և ապահովել բարելավված, անհատականացված հնարավորություններ:"},"targeting":{"title":"Թիրախավորման/Գովազդային Cookie-ներ:","description":"Այս Cookie-ները կարող են սահմանվել մեր կայքում մեր գովազդային գործընկերների կողմից՝ ձեր հետաքրքրությունների պրոֆիլ ստեղծելու և ձեզ համապատասխան բովանդակություն ցուցադրելու համար այլ կայքերում:"}}},"typesOfCookies":{"title":"Մեր օգտագործած Cookie-ների տեսակները","sessionCookies":{"title":"Նիստի Cookie-ներ","description":"Սրանք ժամանակավոր Cookie-ներ են, որոնք ջնջվում են, երբ դուք փակում եք ձեր բրաուզերը: Դրանք օգնում են մեզ պահպանել ձեր նիստը, մինչ դուք զննում եք մեր կայքը:"},"persistentCookies":{"title":"Մշտական Cookie-ներ","description":"Այս Cookie-ները մնում են ձեր սարքի վրա որոշակի ժամանակահատվածի համար կամ մինչև դուք դրանք ջնջեք: Դրանք օգնում են մեզ հիշել ձեր նախասիրությունները և բարելավել ձեր փորձը ապագա այցելությունների ժամանակ:"},"thirdPartyCookies":{"title":"Երրորդ կողմի Cookie-ներ","description":"Այս Cookie-ները սահմանվում են երրորդ կողմի ծառայությունների կողմից, որոնք հայտնվում են մեր էջերում: Դրանք կարող են օգտագործվել ձեր զննման գործունեությունը հետևելու համար տարբեր կայքերում:"}},"managingCookies":{"title":"Cookie-ների կառավարում","description":"Դուք իրավունք ունեք որոշել՝ ընդունել, թե մերժել Cookie-ները: Դուք կարող եք իրականացնել ձեր Cookie-ների իրավունքները՝ սահմանելով ձեր նախասիրությունները ձեր բրաուզերի կարգավորումներում:","browserSettings":{"title":"Բրաուզերի կարգավորումներ","description1":"Վեբ բրաուզերների մեծ մասը թույլ է տալիս վերահսկել Cookie-ները իրենց կարգավորումների նախասիրությունների միջոցով: Այնուամենայնիվ, Cookie-ների սահմանափակումը կարող է ազդել ձեր փորձի վրա մեր կայքում:","description2":"Ահա հղումներ հրահանգների համար Cookie-ների կառավարման համար հայտնի բրաուզերներում:","browsers":{"chrome":"Google Chrome (Գուգլ Քրոմ)","firefox":"Mozilla Firefox (Մոզիլա Ֆայրֆոքս)","safari":"Safari (Սաֆարի)","edge":"Microsoft Edge (Մայքրոսոֆթ Էջ)"}},"optOutTools":{"title":"Հրաժարման գործիքներ","description":"Դուք նաև կարող եք հրաժարվել որոշ երրորդ կողմի Cookie-ներից՝ այցելելով {digitalAdvertisingAlliance} կամ {yourOnlineChoices}:","digitalAdvertisingAlliance":"Թվային գովազդային դաշինք (Digital Advertising Alliance)","yourOnlineChoices":"Ձեր առցանց ընտրությունները (Your Online Choices)"}},"cookiesWeUse":{"title":"Մեր օգտագործած Cookie-ները","essential":{"title":"Կարևոր Cookie-ներ","description":"Այս Cookie-ները խիստ անհրաժեշտ են ձեզ մեր կայքի միջոցով հասանելի ծառայություններ տրամադրելու և դրա որոշ հնարավորություններ օգտագործելու համար:"},"analytics":{"title":"Վերլուծական Cookie-ներ","description":"Այս Cookie-ները օգնում են մեզ հասկանալ, թե ինչպես են այցելուները փոխազդում մեր կայքի հետ՝ անանուն հավաքելով և հաղորդելով տեղեկատվություն:"},"preference":{"title":"Նախասիրության Cookie-ներ","description":"Այս Cookie-ները թույլ են տալիս մեր կայքին հիշել տեղեկատվություն, որը փոխում է կայքի վարքագիծը կամ տեսքը, ինչպիսիք են ձեր նախընտրած լեզուն կամ տարածաշրջանը:"}},"updates":{"title":"Այս քաղաքականության թարմացումներ","description":"Մենք կարող ենք ժամանակ առ ժամանակ թարմացնել այս Cookie քաղաքականությունը՝ արտացոլելու մեր պրակտիկայի փոփոխությունները կամ այլ գործառնական, իրավական կամ կարգավորող պատճառներով: Խնդրում ենք պարբերաբար նորից այցելել այս Cookie քաղաքականությունը՝ տեղեկացված մնալու համար մեր Cookie-ների օգտագործման մասին:"},"contact":{"title":"Կապ մեզ հետ","description":"Եթե ունեք հարցեր մեր Cookie-ների օգտագործման վերաբերյալ, խնդրում ենք կապ հաստատել հետևյալ հասցեով:"}});}),
"[project]/apps/web/locales/hy/delivery-terms.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Առաքման պայմաններ","lastUpdated":"Վերջին թարմացում:","overview":{"title":"Ակնարկ","description":"Այս Առաքման պայմանները բացատրում են, թե ինչպես ենք մենք մշակում, առաքում և հասցնում ձեր պատվերները, ներառյալ ակնկալվող ժամանակացույցերը, վճարները և պատասխանատվությունները:"},"shippingOptions":{"title":"Առաքման տարբերակներ","description":"Հասանելի տարբերակները ցուցադրվում են վճարման ժամանակ և կարող են ներառել:","options":{"standard":"Ստանդարտ առաքում յուրաքանչյուր տարածաշրջանի համար գնահատված ժամանակացույցերով:","express":"Արագ առաքում, որտեղ աջակցվում է:","pickup":"Խանութից վերցնել կամ տեղական կուրիեր (եթե հասանելի է ձեր տարածքում):"}},"processingTimes":{"title":"Մշակման ժամկետներ","items":{"typical":"Պատվերները սովորաբար մշակվում են վճարման հաստատումից հետո 1–2 աշխատանքային օրվա ընթացքում:","weekends":"Շաբաթ օրերին կամ արձակուրդներին տրված պատվերները մշակվում են հաջորդ աշխատանքային օրը:","preorder":"Նախապատվերային ապրանքները առաքվում են գնման ժամանակ ցուցադրված գնահատված հասանելիության հիման վրա:"}},"deliveryTimeframes":{"title":"Առաքման ժամկետներ","description":"Առաքման գնահատականները տարբերվում են՝ կախված նպատակակետից և ընտրված եղանակից: Հետևման մանրամասները տրամադրվում են, երբ պատվերը առաքվում է: Իրական առաքման ժամկետները կարող են տարբերվել՝ կապված փոխադրողի հզորության կամ տեղական մաքսային հետ:"},"shippingFees":{"title":"Առաքման վճարներ և տուրքեր","items":{"costs":"Առաքման արժեքները հաշվարկվում են վճարման ժամանակ՝ հիմնվելով նպատակակետի և ծառայության մակարդակի վրա:","duties":"Միջազգային առաքումների համար կարող են կիրառվել ներմուծման տուրքեր, հարկեր կամ բրոքերային վճարներ, և դրանք ստացողի պատասխանատվությունն են:","promotional":"Գովազդային անվճար առաքման առաջարկները կիրառվում են միայն գովազդում նշվածի համաձայն:"}},"delaysDamageLoss":{"title":"Հետաձգումներ, վնաս կամ կորուստ","items":{"delays":"Մենք պատասխանատու չենք փոխադրողների, եղանակային պայմանների կամ մաքսային ստուգումների պատճառով առաջացած հետաձգումների համար:","damage":"Խնդրում ենք ստուգել փաթեթները առաքման ժամանակ և 48 ժամվա ընթացքում հաղորդել տեսանելի վնասը փոխադրողին և մեր աջակցության թիմին:","loss":"Եթե առաքումը կորել է, կապ հաստատեք մեզ հետ ձեր պատվերի համարով. մենք կհամակարգենք փոխադրողի հետ՝ խնդիրը լուծելու համար:"}},"contact":{"title":"Կապ մեզ հետ","description":"Առաքման հարցերի կամ հատուկ մշակման խնդրանքների համար կապ հաստատեք հետևյալ հասցեով"}});}),
"[project]/apps/web/locales/hy/terms.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Ծառայությունների պայմաններ","lastUpdated":"Վերջին թարմացում:","agreementToTerms":{"title":"Պայմանների համաձայնություն","description1":"Մեր կայքին մուտք գործելով կամ օգտագործելով, դուք համաձայնում եք պարտավորվել այս Ծառայությունների պայմաններով և բոլոր կիրառելի օրենքներով և կանոնակարգերով: Եթե դուք համաձայն չեք այս պայմաններից որևէ մեկի հետ, ձեզ արգելվում է օգտագործել կամ մուտք գործել այս կայք:","description2":"Այս կայքում պարունակվող նյութերը պաշտպանված են կիրառելի հեղինակային իրավունքի և ապրանքանշանի օրենքով:"},"useLicense":{"title":"Օգտագործման արտոնագիր","description":"Թույլատրվում է ժամանակավորապես ներբեռնել մեր կայքի նյութերի մեկ պատճեն անձնական, ոչ առևտրային ժամանակավոր դիտման համար միայն: Սա արտոնագրի շնորհում է, ոչ թե տիտղոսի փոխանցում, և այս արտոնագրի ներքո դուք չեք կարող:","restrictions":{"modify":"Փոփոխել կամ պատճենել նյութերը","commercial":"Օգտագործել նյութերը ցանկացած առևտրային նպատակով կամ ցանկացած հանրային ցուցադրման համար","reverse":"Փորձել հակադարձել ինժեներական ցանկացած ծրագրակազմ, որը պարունակվում է կայքում","copyright":"Հեռացնել ցանկացած հեղինակային իրավունքի կամ այլ սեփականատիրական նշումներ նյութերից","transfer":"Փոխանցել նյութերը մեկ այլ անձի կամ \"հայելել\" նյութերը ցանկացած այլ սերվերի վրա"}},"accountRegistration":{"title":"Հաշվի գրանցում","description":"Մեր կայքի որոշ հնարավորություններին մուտք գործելու համար ձեզ կարող է պահանջվել գրանցվել հաշիվ: Գրանցվելիս դուք համաձայնում եք:","requirements":{"accurate":"Տրամադրել ճշգրիտ, ընթացիկ և ամբողջական տեղեկատվություն","maintain":"Պահպանել և թարմացնել ձեր տեղեկատվությունը՝ այն ճշգրիտ պահելու համար","security":"Պահպանել ձեր գաղտնաբառի և նույնականացման անվտանգությունը","responsibility":"Ընդունել բոլոր պատասխանատվությունը ձեր հաշվի ներքո տեղի ունեցող գործողությունների համար","notify":"Անմիջապես տեղեկացնել մեզ ձեր հաշվի ցանկացած չարտոնված օգտագործման մասին"}},"productInformation":{"title":"Ապրանքի տեղեկատվություն","description1":"Մենք ձգտում ենք տրամադրել ճշգրիտ ապրանքի նկարագրություններ, պատկերներ և գնագոյացում: Այնուամենայնիվ, մենք երաշխավորություն չենք տալիս, որ ապրանքի նկարագրությունները կամ այս կայքի այլ բովանդակությունը ճշգրիտ, ամբողջական, հուսալի, ընթացիկ կամ սխալներից զերծ է:","description2":"Եթե մեր առաջարկած ապրանքը չի համապատասխանում նկարագրությանը, ձեր միակ բուժումը այն վերադարձնելն է չօգտագործված վիճակում:"},"pricingAndPayment":{"title":"Գնագոյացում և վճարում","description1":"Բոլոր գները ցուցադրվում են ընտրված արժույթով և կարող են փոխվել առանց նախապես տեղեկացնելու: Մենք իրավունք ենք պահպանում ցանկացած ժամանակ փոփոխել գները:","description2":"Վճարումը պետք է ստացվի մինչև մենք առաքում ենք ձեր պատվերը: Մենք ընդունում ենք տարբեր վճարման եղանակներ, ինչպես նշված է վճարման ժամանակ:","description3":"Բոլոր վաճառքները վերջնական են, եթե այլ բան նշված չէ: Վերադարձները ենթակա են մեր վերադարձի քաղաքականությանը:"},"shippingAndDelivery":{"title":"Առաքում և առաքում","description1":"Մենք ամեն ջանք կգործադրենք ձեր պատվերը առաքել նշված ժամանակահատվածներում: Այնուամենայնիվ, առաքման ժամկետները գնահատականներ են և երաշխավորված չեն:","description2":"Մերից գնված ապրանքների կորստի և տիտղոսի ռիսկը անցնում է ձեզ փոխադրողին առաքելիս: Դուք պատասխանատու եք վնասված կամ կորած առաքումների համար փոխադրողների հետ ցանկացած հայտ ներկայացնելու համար:"},"returnsAndRefunds":{"title":"Վերադարձ և փոխհատուցում","description1":"Մեր վերադարձի քաղաքականությունը մանրամասն նկարագրված է մեր Վերադարձ էջում: Գնում կատարելով, դուք համաձայնում եք մեր վերադարձի քաղաքականությանը:","description2":"Մենք իրավունք ենք պահպանում մերժել վերադարձները, որոնք չեն համապատասխանում մեր վերադարձի քաղաքականության պահանջներին:"},"prohibitedUses":{"title":"Արգելված օգտագործումներ","description":"Դուք չեք կարող օգտագործել մեր կայքը:","items":{"violate":"Ցանկացած ձևով, որը խախտում է ցանկացած կիրառելի օրենք կամ կանոնակարգ","transmit":"Փոխանցել ցանկացած նյութ, որը վիրավորական, հալածական կամ այլապես անընդունելի է","impersonate":"Պատճենել կամ փորձել պատճենել ընկերությունը կամ ցանկացած աշխատակցի","infringe":"Ցանկացած ձևով, որը խախտում է ուրիշների իրավունքները","automated":"Մասնակցել համակարգի ցանկացած ավտոմատացված օգտագործմանը"}},"limitationOfLiability":{"title":"Պատասխանատվության սահմանափակում","description":"Ոչ մի դեպքում White-Shop-ը կամ նրա մատակարարները պատասխանատու չեն ցանկացած վնասների համար (ներառյալ, առանց սահմանափակման, տվյալների կամ շահույթի կորստի վնասներ կամ բիզնեսի ընդհատման պատճառով), որոնք առաջանում են մեր կայքի նյութերի օգտագործման կամ դրանք օգտագործելու անկարողությունից, նույնիսկ եթե մենք կամ լիազորված ներկայացուցիչը բանավոր կամ գրավոր տեղեկացվել են նման վնասի հնարավորության մասին:"},"revisionsAndErrata":{"title":"Վերանայումներ և սխալներ","description":"Մեր կայքում հայտնվող նյութերը կարող են ներառել տեխնիկական, տպագրական կամ լուսանկարչական սխալներ: Մենք երաշխավորություն չենք տալիս, որ կայքի նյութերից որևէ մեկը ճշգրիտ, ամբողջական կամ ընթացիկ է: Մենք կարող ենք ցանկացած ժամանակ առանց նախապես տեղեկացնելու փոփոխություններ կատարել կայքում պարունակվող նյութերում:"},"governingLaw":{"title":"Կարգավորող օրենք","description":"Այս պայմաններն ու պայմանները կարգավորվում և մեկնաբանվում են համապատասխան օրենքներին համապատասխան: Այս պայմանների հետ կապված ցանկացած վեճեր ենթակա են մեր բիզնեսի գտնվելու վայրի իրավասության դատարանների բացառիկ իրավասությանը:"},"contactInformation":{"title":"Կոնտակտային տեղեկատվություն","description":"Եթե ունեք հարցեր այս Ծառայությունների պայմանների վերաբերյալ, խնդրում ենք կապ հաստատել հետևյալ հասցեով:"}});}),
"[project]/apps/web/locales/hy/privacy.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Գաղտնիության քաղաքականություն","lastUpdated":"Վերջին թարմացում:","introduction":{"title":"Ներածություն","description1":"White-Shop-ում մենք պարտավորված ենք պաշտպանել ձեր գաղտնիությունը: Այս Գաղտնիության քաղաքականությունը բացատրում է, թե ինչպես ենք մենք հավաքում, օգտագործում, բացահայտում և պաշտպանում ձեր տեղեկատվությունը, երբ դուք այցելում եք մեր կայք և օգտագործում եք մեր ծառայությունները:","description2":"Խնդրում ենք ուշադիր կարդալ այս գաղտնիության քաղաքականությունը: Եթե դուք համաձայն չեք այս գաղտնիության քաղաքականության պայմանների հետ, խնդրում ենք չմուտք գործել կայք:"},"informationWeCollect":{"title":"Տեղեկատվություն, որը մենք հավաքում ենք","personalInformation":{"title":"Անձնական տեղեկատվություն","description":"Մենք կարող ենք հավաքել անձնական տեղեկատվություն, որը դուք կամավոր տրամադրում եք մեզ, երբ դուք:","items":{"register":"Գրանցվում եք հաշիվ","order":"Տալիս եք պատվեր","newsletter":"Բաժանորդագրվում եք մեր նորություններին","contact":"Կապ հաստատում եք հաճախորդների սպասարկման համար","surveys":"Մասնակցում եք հարցումներին կամ ակցիաներին"},"details":"Այս տեղեկատվությունը կարող է ներառել ձեր անունը, էլ. փոստի հասցեն, հեռախոսահամարը, առաքման հասցեն, հաշիվ-ապրանքագրի հասցեն և վճարման տեղեկատվությունը:"},"automaticallyCollected":{"title":"Ավտոմատ հավաքված տեղեկատվություն","description":"Երբ դուք այցելում եք մեր կայք, մենք ավտոմատ կերպով հավաքում ենք որոշակի տեղեկատվություն ձեր սարքի մասին, ներառյալ ձեր վեբ բրաուզերի, IP հասցեի, ժամային գոտու և ձեր սարքի վրա տեղադրված որոշ cookie-ների մասին տեղեկատվությունը:"}},"howWeUse":{"title":"Ինչպես ենք մենք օգտագործում ձեր տեղեկատվությունը","description":"Մենք օգտագործում ենք հավաքած տեղեկատվությունը՝","items":{"process":"Մշակելու և կատարելու ձեր պատվերները","confirmations":"Ուղարկելու ձեզ պատվերի հաստատումներ և թարմացումներ","support":"Պատասխանելու ձեր հաճախորդների սպասարկման խնդրանքներին","marketing":"Ուղարկելու ձեզ մարքեթինգային հաղորդագրություններ (ձեր համաձայնությամբ)","improve":"Բարելավելու մեր կայքը և ծառայությունները","fraud":"Բացահայտելու և կանխելու խարդախությունը","legal":"Կատարելու իրավական պարտավորությունները"}},"informationSharing":{"title":"Տեղեկատվության բաժանում և բացահայտում","description":"Մենք չենք վաճառում, չենք փոխանակում կամ վարձակալում ձեր անձնական տեղեկատվությունը երրորդ կողմերին: Մենք կարող ենք կիսվել ձեր տեղեկատվությամբ միայն հետևյալ հանգամանքներում:","items":{"providers":"Ծառայությունների մատակարարների հետ, որոնք օգնում են մեզ գործարկել մեր կայքը և վարել մեր բիզնեսը","law":"Երբ պահանջվում է օրենքով կամ մեր իրավունքները պաշտպանելու համար","transfer":"Բիզնեսի փոխանցման կամ միաձուլման հետ կապված","consent":"Ձեր բացահայտ համաձայնությամբ"}},"dataSecurity":{"title":"Տվյալների անվտանգություն","description":"Մենք իրականացնում ենք համապատասխան տեխնիկական և կազմակերպական անվտանգության միջոցներ՝ ձեր անձնական տեղեկատվությունը պաշտպանելու համար չարտոնված մուտքից, փոփոխությունից, բացահայտումից կամ ոչնչացումից: Այնուամենայնիվ, ինտերնետի միջոցով փոխանցման կամ էլեկտրոնային պահպանման ոչ մի մեթոդ 100% անվտանգ չէ:"},"yourRights":{"title":"Ձեր իրավունքները","description":"Դուք իրավունք ունեք:","items":{"access":"Մուտք գործել ձեր անձնական տեղեկատվությանը","correct":"Ուղղել ոչ ճշգրիտ տեղեկատվությունը","delete":"Հայցել ձեր տեղեկատվության ջնջումը","object":"Դեմ լինել ձեր տեղեկատվության մշակմանը","portability":"Հայցել տվյալների փոխանցելիություն","withdraw":"Ցանկացած ժամանակ հետ վերցնել համաձայնությունը"}},"cookies":{"title":"Cookie-ներ","description1":"Մենք օգտագործում ենք cookie-ներ և նմանատիպ հետևման տեխնոլոգիաներ՝ հետևելու մեր կայքի գործունեությանը և պահելու որոշակի տեղեկատվություն: Դուք կարող եք հրահանգել ձեր բրաուզերին մերժել բոլոր cookie-ները կամ ցույց տալ, երբ cookie է ուղարկվում:","description2":"Cookie-ների մեր օգտագործման մասին ավելի մանրամասն տեղեկությունների համար, խնդրում ենք տեսնել մեր","linkText":"Cookie քաղաքականություն"},"contact":{"title":"Կապ մեզ հետ","description":"Եթե ունեք հարցեր այս Գաղտնիության քաղաքականության վերաբերյալ, խնդրում ենք կապ հաստատել հետևյալ հասցեով:"}});}),
"[project]/apps/web/locales/hy/support.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Հաճախորդների սպասարկում","description":"Մենք այստեղ ենք օգնելու համար: Ընտրեք մեզ հետ կապ հաստատելու լավագույն եղանակը:","contactUs":{"title":"Կապ մեզ հետ","email":"Էլ. փոստ","phone":"Հեռախոս","businessHours":"Աշխատանքային ժամեր","hours":{"weekdays":"Երկուշաբթի - Ուրբաթ: 9:00 - 18:00","saturday":"Շաբաթ: 10:00 - 16:00","sunday":"Կիրակի: Փակ"}},"quickLinks":{"title":"Արագ հղումներ","faq":"Հաճախակի տրվող հարցեր →","delivery":"Առաքում և վերադարձի տեղեկատվություն →","returns":"Վերադարձի քաղաքականություն →","contact":"Կապի ձև →"},"sendMessage":{"title":"Ուղարկեք մեզ հաղորդագրություն","form":{"name":"Անուն","namePlaceholder":"Ձեր անունը","email":"Էլ. փոստ","emailPlaceholder":"your@email.com","subject":"Թեմա","subjectPlaceholder":"Ինչով կարող ենք օգնել:","message":"Հաղորդագրություն","messagePlaceholder":"Խնդրում ենք նկարագրել ձեր խնդիրը կամ հարցը...","submit":"Ուղարկել հաղորդագրություն"}},"commonTopics":{"title":"Ընդհանուր աջակցության թեմաներ","orderIssues":{"title":"Պատվերի խնդիրներ","items":{"tracking":"Պատվերի հետևում","cancellation":"Պատվերի չեղարկում","modification":"Պատվերի փոփոխություն","missing":"Բացակայող ապրանքներ"}},"accountHelp":{"title":"Հաշվի օգնություն","items":{"password":"Գաղտնաբառի վերականգնում","settings":"Հաշվի կարգավորումներ","history":"Պատվերների պատմություն","profile":"Պրոֆիլի թարմացումներ"}},"paymentBilling":{"title":"Վճարում և հաշիվ-ապրանքագիր","items":{"methods":"Վճարման եղանակներ","refund":"Փոխհատուցման կարգավիճակ","billing":"Հաշիվ-ապրանքագրի հարցեր","issues":"Վճարման խնդիրներ"}},"productQuestions":{"title":"Ապրանքի հարցեր","items":{"availability":"Ապրանքի հասանելիություն","specifications":"Ապրանքի բնութագրեր","size":"Չափերի ուղեցույցներ","warranty":"Երաշխիքի տեղեկատվություն"}}}});}),
"[project]/apps/web/locales/hy/stores.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Մեր խանութները","description":"Այցելեք մեզ մեր ցանկացած վայրում: Մեր բարեկամական անձնակազմը պատրաստ է օգնել ձեզ գտնել հենց այն, ինչ փնտրում եք:","getDirections":"Ստանալ ուղղություններ","cantFind":{"title":"Չե՞ք կարող գտնել այն, ինչ փնտրում եք:","description":"Կապ հաստատեք մեզ հետ, և մենք կօգնենք ձեզ գտնել կատարյալ ապրանքը:","contactUs":"Կապ մեզ հետ"}});}),
"[project]/apps/web/locales/hy/returns.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Վերադարձ և փոխհատուցում","returnPolicy":{"title":"30-օրյա վերադարձի քաղաքականություն","description":"Դուք ունեք 30 օր գնման ամսաթվից՝ ապրանքները վերադարձնելու համար իրենց սկզբնական վիճակում՝ պիտակներով:"},"returnConditions":{"title":"Վերադարձի պայմաններ","items":{"unworn":"Ապրանքները պետք է լինեն չհագնված, չլվացված և սկզբնական փաթեթավորման մեջ","tags":"Բոլոր պիտակները և նշումները պետք է ամրացված լինեն","saleable":"Ապրանքները պետք է լինեն վաճառելի վիճակում","proof":"Պահանջվում է գնման ապացույց"}},"howToReturn":{"title":"Ինչպես վերադարձնել","steps":{"contact":"Կապ հաստատեք մեր հաճախորդների սպասարկման թիմի հետ՝ վերադարձ սկսելու համար","authorization":"Ստացեք վերադարձի արտոնագրի համար","package":"Ապահով փաթեթավորեք ապրանքները վերադարձի ձևով","ship":"Ուղարկեք փաթեթը մեր վերադարձի հասցեին","process":"Ստանալուց հետո մենք կմշակենք ձեր փոխհատուցումը 5-7 աշխատանքային օրվա ընթացքում"}},"refundProcess":{"title":"Փոխհատուցման գործընթաց","description":"Փոխհատուցումները կմշակվեն սկզբնական վճարման եղանակով: Խնդրում ենք թույլ տալ 5-7 աշխատանքային օր՝ փոխհատուցման համար, որպեսզի այն հայտնվի ձեր հաշվում:"},"nonReturnable":{"title":"Չվերադարձվող ապրանքներ","items":{"personalized":"Անհատականացված կամ հատուկ պատվերով պատրաստված ապրանքներ","packaging":"Ապրանքներ առանց սկզբնական փաթեթավորման","damaged":"Վնասված ապրանքներ սխալ օգտագործման պատճառով","sale":"Վաճառքի ապրանքներ (բացառությամբ թերի ապրանքների)"}},"needMoreInfo":{"title":"Ավելի շատ տեղեկատվություն է պետք:","description1":"Մանրամասն առաքման և վերադարձի տեղեկատվության համար այցելեք մեր","deliveryLink":"Առաքում և վերադարձ էջ","description2":"Եթե ունեք հարցեր, խնդրում ենք","contactLink":"կապ հաստատել մեր աջակցության թիմի հետ"}});}),
"[project]/apps/web/locales/hy/refund-policy.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Փոխհատուցման քաղաքականություն","lastUpdated":"Վերջին թարմացում:","overview":{"title":"Ակնարկ","description":"Մենք ցանկանում ենք, որ դուք գոհ լինեք յուրաքանչյուր գնումից: Այս քաղաքականությունը բացատրում է, թե ինչպես են աշխատում վերադարձները և փոխհատուցումները, ներառյալ ժամանակացույցերը և իրավասության պահանջները:"},"eligibility":{"title":"Փոխհատուցման իրավասություն","description":"Փոխհատուցման իրավունք ստանալու համար խնդրում ենք համոզվել, որ:","items":{"condition":"Ապրանքը չօգտագործված է, սկզբնական վիճակում է և սկզբնական փաթեթավորման մեջ:","timeline":"Վերադարձի հարցումը ներկայացվում է առաքումից հետո 14 օրվա ընթացքում, եթե այլ բան նշված չէ:","proof":"Տրամադրվում է գնման ապացույց (պատվերի համար կամ անդորրագիր):","excluded":"Վերջնական վաճառքի կամ չվերադարձվող նշված ապրանքները բացառվում են:"}},"howToInitiate":{"title":"Ինչպես սկսել վերադարձ","steps":{"contact":"Կապ հաստատեք մեր աջակցության թիմի հետ ձեր պատվերի համարով և վերադարձի պատճառով:","authorization":"Ստացեք վերադարձի արտոնագրում և հրահանգներ:","ship":"Ուղարկեք ապրանքը հետևելի եղանակով. ներառեք բոլոր սկզբնական աքսեսուարները և պիտակները:"},"description":"Ապրանքը ստանալուց և ստուգելուց հետո մենք կհաստատենք փոխհատուցման հաստատումը կամ մերժումը:"},"refundMethod":{"title":"Փոխհատուցման եղանակ և ժամանակ","items":{"method":"Հաստատված փոխհատուցումները տրվում են սկզբնական վճարման եղանակով:","timing":"Մշակման ժամանակը սովորաբար 5–10 աշխատանքային օր է հաստատումից հետո. բանկի ժամանակները կարող են տարբերվել:","shipping":"Առաքման վճարները չեն վերադարձվում, բացառությամբ այն դեպքերի, երբ վերադարձը պայմանավորված է մեր սխալով կամ թերի ապրանքով:"}},"nonRefundable":{"title":"Չփոխհատուցվող ապրանքներ","items":{"giftCards":"Նվեր քարտեր և թվային ապրանքներ առաքումից հետո:","personalized":"Անհատականացված կամ հատուկ պատվերով պատրաստված ապրանքներ, բացառությամբ թերի ապրանքների:","unauthorized":"Ապրանքներ, որոնք վերադարձվել են առանց նախնական արտոնագրի:","condition":"Ապրանքներ, որոնք սկզբնական վիճակում չեն, վնասված են կամ բացակայող մասեր ունեն, մեր սխալի պատճառով չեն:"}},"contact":{"title":"Կապ մեզ հետ","description":"Այս Փոխհատուցման քաղաքականության վերաբերյալ հարցերի կամ վերադարձ սկսելու համար գրեք մեզ"}});}),
"[project]/apps/web/locales/hy/profile.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Իմ պրոֆիլը","subtitle":"Կառավարեք ձեր հաշվի տեղեկատվությունը և նախապատվությունները","myProfile":"Իմ պրոֆիլը","tabs":{"dashboard":"Վահանակ","personal":"Անձնական տեղեկատվություն","addresses":"Հասցեներ","password":"Փոխել գաղտնաբառը","orders":"Պատվերներ"},"dashboard":{"loading":"Վահանակը բեռնվում է...","totalOrders":"Ընդամենը պատվերներ","totalSpent":"Ընդամենը ծախսված","pendingOrders":"Սպասվող պատվերներ","savedAddresses":"Պահպանված հասցեներ","recentOrders":"Վերջին պատվերներ","viewAll":"Դիտել բոլորը","noOrders":"Դուք դեռ պատվեր չեք կատարել","startShopping":"Սկսել գնումները","orderStatus":"Պատվերի կարգավիճակ","paymentStatus":"Վճարման կարգավիճակ","items":"ապրանք","itemsPlural":"ապրանք","placedOn":"Պատվիրված է","viewDetails":"Դիտել մանրամասները →","quickActions":"Արագ գործողություններ","viewAllOrders":"Դիտել բոլոր պատվերները","manageAddresses":"Կառավարել հասցեները","continueShopping":"Շարունակել գնումները","failedToLoad":"Չհաջողվեց բեռնել վահանի տվյալները"},"personal":{"title":"Անձնական տեղեկատվություն","firstName":"Անուն","lastName":"Ազգանուն","email":"Էլ. փոստ","phone":"Հեռախոս","save":"Պահել փոփոխությունները","saving":"Պահվում է...","updatedSuccess":"Անձնական տեղեկատվությունը հաջողությամբ թարմացվեց","failedToUpdate":"Չհաջողվեց թարմացնել անձնական տեղեկատվությունը","failedToLoad":"Չհաջողվեց բեռնել պրոֆիլը","firstNamePlaceholder":"Հովհաննես","lastNamePlaceholder":"Պետրոսյան","emailPlaceholder":"your@email.com","phonePlaceholder":"+374 XX XXX XXX","cancel":"Չեղարկել"},"addresses":{"title":"Պահպանված հասցեներ","addNew":"Ավելացնել նոր հասցե","edit":"Խմբագրել","delete":"Ջնջել","setDefault":"Սահմանել որպես լռելյայն","default":"Լռելյայն","noAddresses":"Հասցեներ դեռ չեն պահպանվել","addFirst":"Ավելացրեք ձեր առաջին հասցեն՝ սկսելու համար","country":"Երկիր","countryArmenia":"Հայաստան","countryUS":"Ամերիկայի Միացյալ Նահանգներ","countryRU":"Ռուսաստան","countryGE":"Վրաստան","form":{"title":"Հասցեի ձև","addTitle":"Ավելացնել նոր հասցե","editTitle":"Խմբագրել հասցե","firstName":"Անուն","lastName":"Ազգանուն","company":"Ընկերություն (ընտրովի)","addressLine1":"Հասցե 1","addressLine2":"Հասցե 2 (ընտրովի)","city":"Քաղաք","state":"Մարզ/Նահանգ (ընտրովի)","postalCode":"Փոստային կոդ","phone":"Հեռախոսահամար","isDefault":"Սահմանել որպես լռելյայն հասցե","save":"Պահել հասցեն","update":"Թարմացնել հասցեն","add":"Ավելացնել հասցե","cancel":"Չեղարկել","saving":"Պահվում է..."},"updatedSuccess":"Հասցեն հաջողությամբ թարմացվեց","addedSuccess":"Հասցեն հաջողությամբ ավելացվեց","deletedSuccess":"Հասցեն հաջողությամբ ջնջվեց","defaultUpdatedSuccess":"Լռելյայն հասցեն հաջողությամբ թարմացվեց","failedToSave":"Չհաջողվեց պահել հասցեն","failedToDelete":"Չհաջողվեց ջնջել հասցեն","failedToSetDefault":"Չհաջողվեց սահմանել լռելյայն հասցե","deleteConfirm":"Վստահ ե՞ք, որ ցանկանում եք ջնջել այս հասցեն:"},"password":{"title":"Փոխել գաղտնաբառը","currentPassword":"Ներկա գաղտնաբառ","newPassword":"Նոր գաղտնաբառ","confirmPassword":"Կրկին մուտքագրեք նոր գաղտնաբառը","change":"Փոխել գաղտնաբառը","changing":"Գաղտնաբառը փոխվում է...","changedSuccess":"Գաղտնաբառը հաջողությամբ փոխվեց","failedToChange":"Չհաջողվեց փոխել գաղտնաբառը","passwordsDoNotMatch":"Նոր գաղտնաբառերը չեն համընկնում","passwordMinLength":"Գաղտնաբառը պետք է լինի առնվազն 6 նիշ","currentPasswordPlaceholder":"Մուտքագրեք ձեր ներկա գաղտնաբառը","newPasswordPlaceholder":"Մուտքագրեք նոր գաղտնաբառ (նվազագույն 6 նիշ)","confirmPasswordPlaceholder":"Հաստատեք նոր գաղտնաբառը"},"orders":{"title":"Իմ պատվերները","loading":"Պատվերները բեռնվում են...","noOrders":"Պատվերներ չեն գտնվել","failedToLoad":"Չհաջողվեց բեռնել պատվերները","orderNumber":"Պատվեր #","status":"Կարգավիճակ","paymentStatus":"Վճարման կարգավիճակ","total":"Ընդամենը","date":"Ամսաթիվ","viewDetails":"Դիտել մանրամասները","reorder":" կրկնել պատվերը","reordering":"Պատվիրվում է...","reorderSuccess":"Ապրանքները հաջողությամբ ավելացվեցին զամբյուղ","reorderFailed":"Չհաջողվեց ավելացնել ապրանքները զամբյուղ","page":"Էջ","of":"ից","totalOrders":"ընդամենը պատվերներ","previous":"Նախորդ","next":"Հաջորդ","item":"ապրանք","items":"ապրանք"},"orderDetails":{"title":"Պատվեր #","placedOn":"Պատվիրված է","reorder":"Կրկին պատվիրել","adding":"Ավելացվում է...","close":"Փակել","loading":"Պատվերի մանրամասները բեռնվում են...","failedToLoad":"Չհաջողվեց բեռնել պատվերի մանրամասները","orderStatus":"Պատվերի կարգավիճակ","payment":"Վճարում","orderItems":"Պատվերի ապրանքներ","orderSummary":"Պատվերի ամփոփում","subtotal":"Ենթագումար","discount":"Զեղչ","shipping":"Առաքում","tax":"Հարկ","total":"Ընդամենը","loadingTotals":"Ընդամենը բեռնվում է...","shippingMethod":"Առաքման եղանակ","method":"Եղանակ","delivery":"Առաքում","pickup":"Ինքնավերցում","notSpecified":"Նշված չէ","deliveryAddress":"Առաքման հասցե","phone":"Հեռախոս","color":"Գույն","size":"Չափ","quantity":"Քանակ","sku":"SKU","itemsAdded":"ապրանք(ներ) ավելացվեցին զամբյուղ","skipped":"բաց թողնված","failedToAdd":"Չհաջողվեց ավելացնել ապրանքները զամբյուղ: Խնդրում ենք կրկին փորձել:"},"common":{"loading":"Պրոֆիլը բեռնվում է...","loadingProfile":"Պրոֆիլը բեռնվում է..."}});}),
"[project]/apps/web/locales/hy/checkout.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Վճարում","contactInformation":"Կոնտակտային տեղեկատվություն","shippingMethod":"Առաքման եղանակ","shippingAddress":"Առաքման հասցե","paymentMethod":"Վճարման եղանակ","orderSummary":"Պատվերի ամփոփում","form":{"firstName":"Անուն","lastName":"Ազգանուն","email":"Էլ. փոստ","phone":"Հեռախոս","address":"Հասցե","city":"Քաղաք","postalCode":"Փոստային կոդ","phoneNumber":"Հեռախոսահամար","cardNumber":"Քարտի համար","expiryDate":"Վավերականության ժամկետ","cvv":"CVV","cardHolderName":"Քարտի տիրոջ անուն"},"placeholders":{"phone":"+374XXXXXXXX","address":"Փողոց, բնակարան, սենյակ և այլն","city":"Քաղաք","postalCode":"Փոստային կոդ","cardNumber":"1234 5678 9012 3456","expiryDate":"ԱԱ/ՏՏ","cvv":"123","cardHolderName":"Արամ Պետրոսյան"},"shipping":{"storePickup":"Խանութից վերցնել","storePickupDescription":"Վերցրեք ձեր պատվերը մեր խանութից (Անվճար)","delivery":"Առաքում","deliveryDescription":"Մենք կառաքենք ձեր պատվերը ձեր հասցեին","freePickup":"Անվճար (Խանութից)","loading":"Բեռնվում է...","enterCity":"Մուտքագրել քաղաք"},"payment":{"cashOnDelivery":"Կանխիկ առաքման ժամանակ","cashOnDeliveryDescription":"Վճարեք կանխիկ, երբ ստանաք ձեր պատվերը","idram":"Idram","idramDescription":"Վճարեք Idram դրամապանակով կամ քարտով","arca":"ArCa","arcaDescription":"Վճարեք ArCa քարտով","paymentDetails":"Վճարման մանրամասներ","enterCardDetails":"Մուտքագրեք ձեր քարտի տվյալները՝ վճարումն ավարտելու համար"},"summary":{"items":"Ապրանքներ","subtotal":"Ենթագումար","shipping":"Առաքում","tax":"Հարկ","total":"Ընդամենը"},"buttons":{"placeOrder":"Պատվիրել","processing":"Մշակվում է...","continueToPayment":"Անցնել վճարման","continueShopping":"Շարունակել գնումները","cancel":"Չեղարկել"},"modals":{"completeOrder":"Ավարտել ձեր պատվերը","confirmOrder":"Հաստատել պատվերը","cardDetails":"{method} քարտի տվյալներ","closeModal":"Փակել պատուհանը"},"messages":{"cashOnDeliveryInfo":"Կանխիկ առաքման ժամանակ: Դուք կվճարեք կանխիկ, երբ ստանաք ձեր պատվերը: Քարտի տվյալներ չեն պահանջվում:","cashOnDeliveryPickup":"Կանխիկ առաքման ժամանակ: Դուք կվճարեք կանխիկ, երբ վերցնեք ձեր պատվերը: Քարտի տվյալներ չեն պահանջվում:","storePickupInfo":"Խանութից վերցնել: Դուք կվերցնեք ձեր պատվերը մեր խանութից: Առաքումն անվճար է:"},"errors":{"firstNameRequired":"Անունը պարտադիր է","lastNameRequired":"Ազգանունը պարտադիր է","emailRequired":"Էլ. փոստը պարտադիր է","invalidEmail":"Անվավեր էլ. փոստ","phoneRequired":"Հեռախոսը պարտադիր է","invalidPhone":"Անվավեր հեռախոսահամար","selectShippingMethod":"Խնդրում ենք ընտրել առաքման եղանակ","selectPaymentMethod":"Խնդրում ենք ընտրել վճարման եղանակ","addressRequired":"Հասցեն պարտադիր է առաքման համար","cityRequired":"Քաղաքը պարտադիր է առաքման համար","postalCodeRequired":"Փոստային կոդը պարտադիր է առաքման համար","phoneRequiredDelivery":"Հեռախոսահամարը պարտադիր է առաքման համար","invalidPhoneFormat":"Անվավեր հեռախոսահամարի ձևաչափ","cardNumberRequired":"Քարտի համարը պարտադիր է","cardExpiryRequired":"Քարտի վավերականության ժամկետը պարտադիր է","cvvRequired":"CVV-ն պարտադիր է","cardHolderNameRequired":"Քարտի տիրոջ անունը պարտադիր է","fillShippingAddress":"Խնդրում ենք լրացնել բոլոր առաքման հասցեի դաշտերը","cartEmpty":"Զամբյուղը դատարկ է","failedToLoadCart":"Չհաջողվեց բեռնել զամբյուղը","failedToCreateOrder":"Չհաջողվեց ստեղծել պատվերը: Խնդրում ենք կրկին փորձել:"}});}),
"[project]/apps/web/locales/hy/register.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Ստեղծել հաշիվ","subtitle":"Գրանցվեք՝ ձեր գնումների ճանապարհորդությունը սկսելու համար","form":{"firstName":"Անուն","lastName":"Ազգանուն","email":"Էլ. փոստ","phone":"Հեռախոս (ընտրովի, եթե նշված է էլ. փոստ)","password":"Գաղտնաբառ","confirmPassword":"Հաստատել գաղտնաբառը","acceptTerms":"Ես համաձայն եմ","termsOfService":"Ծառայությունների պայմաններ","and":"և","privacyPolicy":"Գաղտնիության քաղաքականություն","createAccount":"Ստեղծել հաշիվ","creatingAccount":"Ստեղծվում է հաշիվ...","alreadyHaveAccount":"Արդեն ունե՞ք հաշիվ","signIn":"Մուտք գործել"},"placeholders":{"firstName":"Արամ","lastName":"Պետրոսյան","email":"your@email.com","phone":"+374 XX XXX XXX","password":"••••••••","confirmPassword":"••••••••"},"errors":{"acceptTerms":"Խնդրում ենք ընդունել Ծառայությունների պայմանները և Գաղտնիության քաղաքականությունը","mustAcceptTerms":"Դուք պետք է ընդունեք պայմանները՝ շարունակելու համար","emailOrPhoneRequired":"Խնդրում ենք նշել էլ. փոստ կամ հեռախոսահամար","passwordRequired":"Խնդրում ենք մուտքագրել գաղտնաբառ","passwordMinLength":"Գաղտնաբառը պետք է լինի առնվազն 6 նիշ","passwordsDoNotMatch":"Գաղտնաբառերը չեն համընկնում","registrationFailed":"Գրանցումը ձախողվեց: Խնդրում ենք կրկին փորձել:"},"passwordHint":"Պետք է լինի առնվազն 6 նիշ"});}),
"[project]/apps/web/locales/hy/categories.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Կատեգորիաներ","description":"Ընտրեք ապրանքների կատեգորիաներ՝ ձեզ անհրաժեշտը գտնելու համար:","loading":"Բեռնվում են կատեգորիաները...","empty":"Կատեգորիաներ չգտնվեցին","productsCount":"ապրանք"});}),
"[project]/apps/web/locales/hy/orders.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"notFound":{"title":"Պատվերը չի գտնվել","description":"Ձեր փնտրած պատվերը գոյություն չունի:"},"title":"Պատվեր #{number}","placedOn":"Տեղադրված է {date}","orderStatus":{"title":"Պատվերի կարգավիճակ","payment":"Վճարում: {status}","fulfillment":"Կատարում: {status}"},"orderItems":{"title":"Պատվերի ապրանքներ"},"shippingAddress":{"title":"Առաքման հասցե","phone":"Հեռախոս: {phone}"},"orderSummary":{"title":"Պատվերի ամփոփում","subtotal":"Ենթագումար","discount":"Զեղչ","shipping":"Առաքում","tax":"Հարկ","total":"Ընդամենը","loadingTotals":"Բեռնվում են գումարները..."},"buttons":{"continueShopping":"Շարունակել գնումները","viewCart":"Դիտել զամբյուղ"},"itemDetails":{"color":"Գույն:","size":"Չափ:","sku":"SKU: {sku}","quantity":"Քանակ: {qty} × {price} = {total}"}});}),
"[project]/apps/web/locales/hy/admin.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"menu\":{\"dashboard\":\"Վահանակ\",\"orders\":\"Պատվերներ\",\"products\":\"Ապրանքներ\",\"categories\":\"Կատեգորիաներ\",\"brands\":\"Բրենդներ\",\"attributes\":\"Ատրիբուտներ\",\"discounts\":\"Զեղչեր\",\"users\":\"Օգտատերեր\",\"messages\":\"Հաղորդագրություններ\",\"analytics\":\"Վերլուծություն\",\"filterByPrice\":\"Զտել ըստ գնի\",\"delivery\":\"Առաքում\",\"settings\":\"Կարգավորումներ\"},\"dashboard\":{\"title\":\"Ադմին էջ\",\"welcome\":\"Բարի վերադարձ, {name}!\",\"totalUsers\":\"օգտատերեր\",\"totalProducts\":\" ապրանքներ\",\"lowStock\":\"{count} ցածր պաշար\",\"totalOrders\":\"պատվերներ\",\"pending\":\"{count} սպասվող\",\"revenue\":\"Եկամուտ\",\"recentOrders\":\"Վերջին պատվերներ\",\"viewAll\":\"Դիտել բոլորը\",\"noRecentOrders\":\"Վերջին պատվերներ չկան\",\"items\":\"{count} ապրանք\",\"itemsPlural\":\"{count} ապրանք\",\"guest\":\"Հյուր\",\"topSellingProducts\":\"Ամենավաճառվող ապրանքներ\",\"noSalesData\":\"Դեռ վաճառքի տվյալներ չկան\",\"sold\":\"{count} վաճառված\",\"orders\":\"{count} պատվեր\",\"userActivity\":\"Օգտատիրական ակտիվություն\",\"recentRegistrations\":\"Վերջին գրանցումներ\",\"noRecentRegistrations\":\"Վերջին գրանցումներ չկան\",\"mostActiveUsers\":\"Ամենաակտիվ օգտատերեր\",\"noActiveUsers\":\"Ակտիվ օգտատերեր չկան\",\"ordersCount\":\"{count} պատվեր\",\"noUserActivityData\":\"Օգտատիրական ակտիվության տվյալներ չկան\",\"quickActions\":\"Արագ գործողություններ\",\"addProduct\":\"Ավելացնել ապրանք\",\"createNewProduct\":\"Ստեղծել նոր ապրանք\",\"manageOrders\":\"Կառավարել պատվերները\",\"viewAllOrders\":\"Դիտել բոլոր պատվերները\",\"manageUsers\":\"Կառավարել օգտատերերին\",\"viewAllUsers\":\"Դիտել բոլոր օգտատերերին\",\"settings\":\"Կարգավորումներ\",\"configureSystem\":\"Կարգավորել համակարգը\",\"adminInformation\":\"Ադմինիստրատորի տեղեկություն\",\"email\":\"Էլ. փոստ\",\"phone\":\"Հեռախոս\",\"roles\":\"Դերեր\",\"userId\":\"Օգտատիրական ID\",\"na\":\"Չկա\",\"customer\":\"հաճախորդ\"},\"analytics\":{\"title\":\"Վերլուծություն\",\"subtitle\":\"Հետևեք ձեր բիզնեսի արդյունավետությանը և վիճակագրությանը\",\"backToAdmin\":\"Վերադառնալ ադմինիստրատորի վահան\",\"timePeriod\":\"Ժամանակահատված\",\"period\":\"ժամանակահատված\",\"today\":\"Այսօր\",\"last7Days\":\"Վերջին 7 օր\",\"last30Days\":\"Վերջին 30 օր\",\"lastYear\":\"Վերջին տարի\",\"customRange\":\"Պատվերով միջակայք\",\"startDate\":\"Սկզբի ամսաթիվ\",\"endDate\":\"Ավարտի ամսաթիվ\",\"loadingAnalytics\":\"Բեռնվում է վերլուծությունը...\",\"totalOrders\":\"Ընդամենը պատվերներ\",\"totalRevenue\":\"Ընդամենը եկամուտ\",\"totalUsers\":\"Ընդամենը օգտատերեր\",\"topSellingProducts\":\"Ամենավաճառվող ապրանքներ\",\"noSalesDataAvailable\":\"Վաճառքի տվյալներ չկան\",\"sold\":\"վաճառված\",\"orders\":\"պատվեր\",\"topCategories\":\"Ամենավաճառվող կատեգորիաներ\",\"noCategoryDataAvailable\":\"Կատեգորիայի տվյալներ չկան\",\"items\":\"ապրանք\",\"ordersByDay\":\"Պատվերներ ըստ օրվա\",\"dailyOrderTrends\":\"Օրական պատվերների միտումներ և եկամուտ\",\"noDataAvailable\":\"Այս ժամանակահատվածի համար տվյալներ չկան\",\"ordersLabel\":\"պատվեր\",\"revenue\":\"եկամուտ\",\"noAnalyticsData\":\"Վերլուծության տվյալներ չկան\",\"errorLoading\":\"Չհաջողվեց բեռնել վերլուծության տվյալները\",\"apiNotFound\":\"Վերլուծության API route-ը չի գտնվել: Խնդրում ենք ստուգել, որ API route-ը գոյություն ունի\",\"invalidResponse\":\"API-ն վերադարձրել է սխալ response: Խնդրում ենք ստուգել server logs\",\"clickToViewAllOrders\":\"Սեղմեք բոլոր պատվերները դիտելու համար\",\"clickToViewPaidOrders\":\"Սեղմեք վճարված պատվերները դիտելու համար\",\"totalRegisteredUsers\":\"Ընդամենը գրանցված օգտատերեր\",\"skuLabel\":\"SKU\"},\"attributes\":{\"title\":\"Ատրիբուտներ\",\"subtitle\":\"Կառավարել գլոբալ ապրանքների ատրիբուտները և դրանց արժեքները\",\"addAttribute\":\"Ավելացնել ատրիբուտ\",\"cancel\":\"Չեղարկել\",\"createNewAttribute\":\"Ստեղծել նոր ատրիբուտ\",\"name\":\"Անվանում\",\"required\":\"*\",\"namePlaceholder\":\"օր.՝ Գույն, Չափ, Նյութ\",\"keyAutoGenerated\":\"Բանալին ավտոմատ կստեղծվի անվանումից (փոքրատառ, առանց բացատների)\",\"createAttribute\":\"Ստեղծել ատրիբուտ\",\"noAttributes\":\"Ատրիբուտներ դեռ չկան\",\"getStarted\":\"Սկսեք ձեր առաջին ատրիբուտը ստեղծելով\",\"loadingAttributes\":\"Բեռնվում են ատրիբուտները...\",\"filterable\":\"Զտելի\",\"values\":\"{count} արժեք\",\"valuesPlural\":\"{count} արժեք\",\"deleteAttribute\":\"Ջնջել ատրիբուտ\",\"addNewValue\":\"Ավելացնել նոր արժեք (օր.՝ Կարմիր, Կապույտ, Մեծ, Փոքր)\",\"add\":\"Ավելացնել\",\"adding\":\"Ավելացվում է...\",\"noValuesYet\":\"Արժեքներ դեռ չկան: Ավելացրեք ձեր առաջին արժեքը վերևում:\",\"deleteValue\":\"Ջնջել արժեք\",\"deleteConfirm\":\"Վստահ ե՞ք, որ ցանկանում եք ջնջել \\\"{name}\\\" ատրիբուտը: Այս գործողությունը չի կարող հետարկվել:\",\"deleteValueConfirm\":\"Վստահ ե՞ք, որ ցանկանում եք ջնջել \\\"{label}\\\" արժեքը:\",\"createdSuccess\":\"Ատրիբուտը հաջողությամբ ստեղծվեց\",\"deletedSuccess\":\"Ատրիբուտը հաջողությամբ ջնջվեց\",\"errorCreating\":\"Սխալ: {message}\",\"errorDeleting\":\"Սխալ: {message}\",\"errorAddingValue\":\"Սխալ: {message}\",\"errorDeletingValue\":\"Սխալ: {message}\",\"errorUpdatingValue\":\"Սխալ: {message}\",\"fillName\":\"Խնդրում ենք լրացնել անվանում դաշտը\",\"enterValue\":\"Խնդրում ենք մուտքագրել արժեք\",\"valueAlreadyExists\":\"\\\"{value}\\\" արժեքը արդեն գոյություն ունի այս ատրիբուտի համար\",\"valueAddedSuccess\":\"Արժեքը հաջողությամբ ավելացվեց\",\"valueDeletedSuccess\":\"Արժեքը հաջողությամբ ջնջվեց\",\"valueUpdatedSuccess\":\"Արժեքը հաջողությամբ թարմացվեց\",\"failedToAddValue\":\"Չհաջողվեց ավելացնել արժեքը\",\"attributeNotFound\":\"Ատրիբուտը չի գտնվել\",\"configureValue\":\"Կոնֆիգուրացիա\",\"editAttribute\":\"Խմբագրել ատրիբուտ\",\"nameUpdatedSuccess\":\"Ատրիբուտի անվանումը հաջողությամբ թարմացվեց\",\"saving\":\"Պահվում է...\",\"save\":\"Պահել\",\"valueModal\":{\"editValue\":\"Խմբագրել արժեք\",\"label\":\"Անվանում\",\"labelPlaceholder\":\"Մուտքագրել արժեքի անվանում\",\"colors\":\"Գույներ\",\"image\":\"Նկար\",\"imagePreview\":\"Նկարի նախադիտում\",\"uploadImage\":\"Վերբեռնել նկար\",\"changeImage\":\"Փոխել նկարը\",\"removeImage\":\"Հեռացնել նկարը\",\"uploading\":\"Վերբեռնվում է...\",\"saving\":\"Պահվում է...\",\"save\":\"Պահել\",\"cancel\":\"Չեղարկել\",\"close\":\"Փակել\",\"selectImageFile\":\"Խնդրում ենք ընտրել նկարի ֆայլ\",\"failedToProcessImage\":\"Չհաջողվեց մշակել նկարը\",\"failedToSave\":\"Չհաջողվեց պահել արժեքը\",\"selectedColors\":\"Ընտրված գույներ\",\"addColor\":\"Ավելացնել գույն\",\"addCustomColor\":\"Ավելացնել գույն\",\"hide\":\"Թաքցնել\",\"add\":\"Ավելացնել\",\"removeColor\":\"Հեռացնել գույնը\"}},\"categories\":{\"title\":\"Կատեգորիաներր\",\"backToAdmin\":\"Վերադառնալ ադմինիստրատորի վահան\",\"loadingCategories\":\"Բեռնվում են կատեգորիաները...\",\"noCategories\":\"Կատեգորիաներ չեն գտնվել\",\"addCategory\":\"Ավելացնել կատեգորիա \",\"editCategory\":\"Խմբագրել կատեգորիա\",\"createCategory\":\"Ստեղծել կատեգորիա\",\"updateCategory\":\"Թարմացնել կատեգորիա\",\"categoryTitle\":\"Կատեգորիայի անվանում\",\"categoryTitlePlaceholder\":\"Մուտքագրել կատեգորիայի անվանում\",\"parentCategory\":\"Ենթակատեգորիա\",\"rootCategory\":\"Ոչինչ (Արմատային կատեգորիա)\",\"requiresSizes\":\"Այս կատեգորիան պահանջում է չափեր (օր.՝ հագուստ, կոշիկ)\",\"titleRequired\":\"Խնդրում ենք մուտքագրել կատեգորիայի անվանում\",\"creating\":\"Ստեղծվում է...\",\"updating\":\"Թարմացվում է...\",\"createdSuccess\":\"Կատեգորիան հաջողությամբ ստեղծվեց\",\"updatedSuccess\":\"Կատեգորիան հաջողությամբ թարմացվեց\",\"errorUpdating\":\"Սխալ կատեգորիա թարմացնելիս\",\"deleteConfirm\":\"Վստահ ե՞ք, որ ցանկանում եք ջնջել կատեգորիա \\\"{name}\\\": Այս գործողությունը չի կարող հետարկվել:\",\"deletedSuccess\":\"Կատեգորիան հաջողությամբ ջնջվեց\",\"errorDeleting\":\"Սխալ կատեգորիան ջնջելիս: {message}\",\"showingPage\":\"Ցուցադրվում է {page} էջը {totalPages}-ից ({total} ընդամենը)\",\"previous\":\"Նախորդ\",\"next\":\"Հաջորդ\"},\"delivery\":{\"title\":\"Առաքում\",\"backToAdmin\":\"Վերադառնալ ադմինիստրատորի վահան\",\"deliveryPricesByLocation\":\"Առաքման գներ ըստ վայրի\",\"addLocation\":\"Ավելացնել վայր\",\"noLocations\":\"Առաքման վայրեր չեն կարգավորվել: Սեղմեք \\\"Ավելացնել վայր\\\" սկսելու համար:\",\"country\":\"Երկիր\",\"city\":\"Քաղաք\",\"price\":\"Գին (ԴՐԱՄ)\",\"countryPlaceholder\":\"օր.՝ Հայաստան\",\"cityPlaceholder\":\"օր.՝ Երևան\",\"pricePlaceholder\":\"1000\",\"deleteLocation\":\"Վստահ ե՞ք, որ ցանկանում եք ջնջել այս առաքման վայրը:\",\"saveSettings\":\"Պահել կարգավորումները\",\"saving\":\"Պահվում է...\",\"cancel\":\"Չեղարկել\",\"savedSuccess\":\"Առաքման կարգավորումները հաջողությամբ պահվեցին:\",\"errorSaving\":\"Սխալ: {message}\"},\"users\":{\"title\":\"Կառավարել օգտատերերին\",\"backToAdmin\":\"Վերադառնալ ադմինիստրատորի վահան\",\"searchPlaceholder\":\"Որոնել ըստ էլ. փոստի, հեռախոսի, անվան...\",\"search\":\"Որոնել\",\"adminCustomer\":\"Ադմին / Հաճախորդ\",\"all\":\"Բոլորը\",\"admins\":\"Ադմիններ\",\"customers\":\"Հաճախորդներ\",\"loadingUsers\":\"Բեռնվում են օգտատերերը...\",\"noUsers\":\"Օգտատերեր չեն գտնվել\",\"user\":\"Օգտատեր\",\"contact\":\"Կոնտակտ\",\"orders\":\"Պատվերներ\",\"roles\":\"Դերեր\",\"status\":\"Կարգավիճակ\",\"created\":\"Ստեղծված\",\"selectAll\":\"Ընտրել բոլոր օգտատերերին\",\"selectUser\":\"Ընտրել օգտատիր {email}\",\"clickToActivate\":\"Սեղմեք ակտիվացնելու համար\",\"clickToBlock\":\"Սեղմեք արգելափակելու համար\",\"blocked\":\"արգելափակված\",\"active\":\"ակտիվ\",\"userBlocked\":\"Օգտատեր \\\"{name}\\\" այժմ արգելափակված է և չի կարող մուտք գործել:\",\"userActive\":\"Օգտատեր \\\"{name}\\\" այժմ ակտիվ է և կարող է մուտք գործել:\",\"errorUpdatingStatus\":\"Սխալ օգտատիրի կարգավիճակը թարմացնելիս: {message}\",\"selectedUsers\":\"Ընտրված {count} օգտատեր\",\"deleteSelected\":\"Ջնջել ընտրվածները\",\"deleting\":\"Ջնջվում է...\",\"deleteConfirm\":\"Ջնջե՞լ {count} ընտրված օգտատիր:\",\"bulkDeleteFinished\":\"Զանգվածային ջնջումն ավարտվեց: Հաջողություն: {success}/{total}\",\"failedToDelete\":\"Չհաջողվեց ջնջել ընտրված օգտատերերը\",\"showingPage\":\"Ցուցադրվում է {page} էջը {totalPages}-ից ({total} ընդամենը)\",\"previous\":\"Նախորդ\",\"next\":\"Հաջորդ\"},\"products\":{\"title\":\"Ապրանքներ\",\"backToAdmin\":\"Վերադառնալ ադմինիստրատորի վահան\",\"searchPlaceholder\":\"Որոնել ըստ վերնագրի կամ slug-ի...\",\"searchByTitleOrSlug\":\"Որոնել ըստ վերնագրի կամ slug-ի\",\"search\":\"Որոնել\",\"clearAll\":\"Մաքրել բոլորը\",\"filterByCategory\":\"Զտել ըստ կատեգորիայի\",\"allCategories\":\"Բոլոր կատեգորիաները\",\"loadingCategories\":\"Բեռնվում են կատեգորիաները...\",\"noCategoriesAvailable\":\"Կատեգորիաներ չկան\",\"searchBySku\":\"Որոնել ըստ SKU\",\"skuPlaceholder\":\"Մուտքագրել SKU կոդ...\",\"filterByStock\":\"Զտել ըստ պաշարի\",\"allProducts\":\"Բոլոր ապրանքները\",\"inStock\":\"Պահեստում\",\"outOfStock\":\"Պահեստում չկա\",\"selectedProducts\":\"Ընտրված {count} ապրանք\",\"deleteSelected\":\"Ջնջել ընտրվածները\",\"deleting\":\"Ջնջվում է...\",\"addNewProduct\":\"Ավելացնել նոր ապրանք\",\"loadingProducts\":\"Բեռնվում են ապրանքները...\",\"noProducts\":\"Ապրանքներ չեն գտնվել\",\"selectAll\":\"Ընտրել բոլոր ապրանքները\",\"selectProduct\":\"Ընտրել ապրանք {title}\",\"product\":\"ԱՊՐԱՆՔ\",\"stock\":\"ՊԱՇԱՐ\",\"price\":\"ԳԻՆ\",\"status\":\"ԿԱՐԳԱՎԻՃԱԿ\",\"featured\":\"ԱՌԱՋԱՐԿՎԱԾ\",\"created\":\"ՍՏԵՂծՎԱԾ\",\"actions\":\"ԳՈՐԾՈՂՈՒԹՅՈՒՆՆԵՐ\",\"pcs\":\"հատ\",\"published\":\"Հրապարակված\",\"draft\":\"Սևագիր\",\"clickToDraft\":\"Սեղմեք սևագրին անցնելու համար\",\"clickToPublished\":\"Սեղմեք հրապարակելու համար\",\"clickToRemoveFeatured\":\"Սեղմեք առաջարկվածից հեռացնելու համար\",\"clickToMarkFeatured\":\"Սեղմեք առաջարկված նշելու համար\",\"edit\":\"Խմբագրել\",\"delete\":\"Ջնջել\",\"deleteConfirm\":\"Վստահ ե՞ք, որ ցանկանում եք ջնջել \\\"{title}\\\": Այս գործողությունը չի կարող հետարկվել:\",\"deletedSuccess\":\"Ապրանքը հաջողությամբ ջնջվեց\",\"errorDeleting\":\"Սխալ ապրանքը ջնջելիս: {message}\",\"productPublished\":\"Ապրանք \\\"{title}\\\" այժմ հրապարակված է և տեսանելի:\",\"productDraft\":\"Ապրանք \\\"{title}\\\" այժմ սևագիր է և թաքնված:\",\"errorUpdatingStatus\":\"Սխալ ապրանքի կարգավիճակը թարմացնելիս: {message}\",\"errorUpdatingFeatured\":\"Սխալ առաջարկված կարգավիճակը թարմացնելիս: {message}\",\"bulkDeleteConfirm\":\"Ջնջե՞լ {count} ընտրված ապրանք:\",\"bulkDeleteFinished\":\"Զանգվածային ջնջումն ավարտվեց: Հաջողություն: {success}/{total}\",\"failedToDelete\":\"Չհաջողվեց ջնջել ընտրված ապրանքները\",\"featuredToggleFinished\":\"Առաջարկված փոփոխությունը ավարտվեց: Հաջողություն: {success}/{total}: Որոշ ապրանքներ չհաջողվեց թարմացնել:\",\"failedToUpdateFeatured\":\"Չհաջողվեց թարմացնել առաջարկված կարգավիճակը ապրանքների համար\",\"errorLoading\":\"Սխալ ապրանքները բեռնելիս: {message}\",\"showingPage\":\"Ցուցադրվում է {page} էջը {totalPages}-ից ({total} ընդամենը)\",\"previous\":\"Նախորդ\",\"next\":\"Հաջորդ\",\"add\":{\"defaultColor\":\"Լռելյայն\",\"productTitlePlaceholder\":\"Ապրանքի վերնագիր\",\"productSlugPlaceholder\":\"ապրանք-slug\",\"productDescriptionPlaceholder\":\"Ապրանքի նկարագրություն (HTML-ը աջակցվում է)\",\"enterNewCategoryName\":\"Մուտքագրեք նոր կատեգորիայի անվանում\",\"enterNewBrandName\":\"Մուտքագրեք նոր բրենդի անվանում\",\"percentagePlaceholder\":\"50 (կավտոմատ թարմացվի)\",\"newProductLabel\":\"Նոր ապրանք\",\"colorHexPlaceholder\":\"#FF0000 կամ թողեք դատարկ լռելյայնի համար\",\"addLabelsHint\":\"Ավելացրեք պիտակներ, ինչպիսիք են \\\"Նոր ապրանք\\\", \\\"Տաք\\\", \\\"Վաճառք\\\" կամ տոկոսային զեղչեր, ինչպիսիք են \\\"50%\\\"\",\"noLabelsAdded\":\"Դեռ պիտակներ չեն ավելացվել\",\"removeImage\":\"Հեռացնել պատկերը\",\"autoGenerated\":\"Ավտոմատ գեներացված\",\"mainProductImage\":\"Գլխավոր ապրանքի նկար\",\"uploadImage\":\"Վերբեռնել նկար\",\"uploading\":\"Վերբեռնվում է...\",\"productImages\":\"Ապրանքի նկարներ\",\"uploadMultipleImages\":\"Կարող եք վերբեռնել մի քանի նկար\",\"uploadImages\":\"Վերբեռնել նկարներ\",\"setAsMain\":\"Նշել որպես գլխավոր\",\"main\":\"Գլխավոր\",\"backToAdmin\":\"Վերադառնալ ադմինիստրատորի վահան\",\"editProduct\":\"Խմբագրել ապրանք\",\"addNewProduct\":\"Ավելացնել նոր ապրանք\",\"basicInformation\":\"Հիմնական տեղեկություն\",\"title\":\"Վերնագիր\",\"slug\":\"Slug\",\"description\":\"Նկարագրություն\",\"categoriesAndBrands\":\"Կատեգորիաներ և Բրենդներ\",\"categories\":\"Կատեգորիաներ\",\"selectMultiple\":\"(Ընտրել մի քանիսը)\",\"selectExistingCategories\":\"Ընտրել գոյություն ունեցող կատեգորիաներ\",\"addNewCategory\":\"Ավելացնել նոր կատեգորիա\",\"selectCategories\":\"Ընտրել կատեգորիաներ\",\"categorySelected\":\"{count} կատեգորիա ընտրված\",\"categoriesSelected\":\"{count} կատեգորիա ընտրված\",\"brands\":\"Բրենդներ\",\"selectExistingBrands\":\"Ընտրել գոյություն ունեցող բրենդներ\",\"addNewBrand\":\"Ավելացնել նոր բրենդ\",\"selectBrands\":\"Ընտրել բրենդներ\",\"brandSelected\":\"{count} բրենդ ընտրված\",\"brandsSelected\":\"{count} բրենդ ընտրված\",\"categoryRequiresSizes\":\"Այս կատեգորիան պահանջում է չափեր (օր.՝ հագուստ, կոշիկ)\",\"productLabels\":\"Ապրանքի պիտակներ\",\"addLabel\":\"+ Ավելացնել պիտակ\",\"label\":\"Պիտակ {index}\",\"remove\":\"Հեռացնել\",\"type\":\"Տիպ\",\"value\":\"Արժեք\",\"position\":\"Դիրք\",\"colorOptional\":\"Գույն (ընտրովի)\",\"textType\":\"Տեքստ (Նոր ապրանք, Տաք, Վաճառք և այլն)\",\"percentageType\":\"Տոկոս (50%, 30% և այլն)\",\"topLeft\":\"Վերևի ձախ\",\"topRight\":\"Վերևի աջ\",\"bottomLeft\":\"Ներքևի ձախ\",\"bottomRight\":\"Ներքևի աջ\",\"hexColorHint\":\"Hex գունային կոդ (օր.՝ #FF0000) կամ թողեք դատարկ\",\"percentageAutoUpdateHint\":\"ⓘ Այս արժեքը կավտոմատ թարմացվի ապրանքի զեղչի տոկոսի հիման վրա: Կարող եք մուտքագրել ցանկացած թիվ որպես placeholder:\",\"attributes\":\"Ատրիբուտներ\",\"selectAttribute\":\"Ընտրել ատրիբուտ:\",\"creating\":\"Ստեղծվում է...\",\"productVariants\":\"Ապրանքի տարբերակներ\",\"sku\":\"SKU:\",\"price\":\"Գին\",\"stock\":\"Պաշար\",\"variantBuilder\":\"Տարբերակների կառուցիչ\",\"selectAttributesForVariants\":\"Ընտրել ատրիբուտներ\",\"selectAttributes\":\"Ընտրել ատրիբուտներ\",\"selectAttributesDescription\":\"Ընտրեք ատրիբուտներ ապրանքի տարբերակներ ստեղծելու համար\",\"noAttributesAvailable\":\"Ատրիբուտներ չկան\",\"attributeSelected\":\"{count} ատրիբուտ ընտրված\",\"attributesSelected\":\"{count} ատրիբուտ ընտրված\",\"generatedVariants\":\"Գեներացված տարբերակներ\",\"applyPriceToAll\":\"Կիրառել գինը բոլորին\",\"applyStockToAll\":\"Կիրառել պաշարը բոլորին\",\"applySkuToAll\":\"Կիրառել SKU նմուշը բոլորին\",\"variantsReady\":\"Տարբերակները պատրաստ են\",\"addVariant\":\"Ավելացնել\",\"image\":\"Պատկեր\",\"compareAtPrice\":\"Զեղչված գինը\",\"pricePlaceholder\":\"0.00\",\"quantity\":\"Քանակ\",\"quantityPlaceholder\":\"0\",\"publishing\":\"Հրապարակում\",\"markAsFeatured\":\"Նշել որպես առաջարկվող (գլխավոր էջի ներդիրի համար)\",\"updateProduct\":\"Թարմացնել ապրանք\",\"createProduct\":\"Ստեղծել ապրանք\",\"updating\":\"Թարմացվում է...\",\"loadingProduct\":\"Բեռնվում է ապրանքը...\",\"loading\":\"Բեռնվում է...\",\"colorAttributeNotFound\":\"Գույնի ատրիբուտ չի գտնվել\",\"colorNameRequired\":\"Գույնի անվանումը պարտադիր է\",\"colorAddedSuccess\":\"Գույն \\\"{name}\\\" հաջողությամբ ավելացվեց\",\"failedToAddColor\":\"Չհաջողվեց ավելացնել գույն\",\"sizeAttributeNotFound\":\"Չափի ատրիբուտ չի գտնվել\",\"sizeNameRequired\":\"Չափի անվանումը պարտադիր է\",\"sizeAddedSuccess\":\"Չափ \\\"{name}\\\" հաջողությամբ ավելացվեց\",\"failedToAddSize\":\"Չհաջողվեց ավելացնել չափ\",\"brandCreatedSuccess\":\"Բրենդ \\\"{name}\\\" հաջողությամբ ստեղծվեց\",\"categoryCreatedSuccess\":\"Կատեգորիա \\\"{name}\\\" հաջողությամբ ստեղծվեց\",\"categoryCreatedSuccessSizes\":\"Կատեգորիա \\\"{name}\\\" հաջողությամբ ստեղծվեց (չափեր պահանջվում են)\",\"failedToProcessImages\":\"Չհաջողվեց մշակել ընտրված պատկերները\",\"failedToProcessImage\":\"Չհաջողվեց մշակել ընտրված պատկերը\",\"enterDefaultPrice\":\"Մուտքագրել լռելյայն գին բոլոր տարբերակների համար:\",\"enterDefaultStock\":\"Մուտքագրել լռելյայն պաշար բոլոր տարբերակների համար:\",\"enterSkuPrefix\":\"Մուտքագրել SKU նախածանց (կավտոմատ կավելացվի -color-size, եթե կիրառելի է):\"}},\"settings\":{\"title\":\"Կարգավորումներ\",\"backToAdmin\":\"Վերադառնալ ադմինիստրատորի վահան\",\"generalSettings\":\"Ընդհանուր կարգավորումներ\",\"siteName\":\"Կայքի անվանում\",\"siteDescription\":\"Կայքի նկարագրություն\",\"paymentSettings\":\"Վճարման կարգավորումներ\",\"defaultCurrency\":\"Լռելյայն արժույթ\",\"amd\":\"ԴՐԱՄ - Հայկական դրամ\",\"usd\":\"USD - ԱՄՆ դոլար\",\"eur\":\"EUR - Եվրո\",\"enableOnlinePayments\":\"Միացնել առցանց վճարումները\",\"saveSettings\":\"Պահել կարգավորումները\",\"saving\":\"Պահվում է...\",\"cancel\":\"Չեղարկել\",\"savedSuccess\":\"Կարգավորումները հաջողությամբ պահվեցին:\",\"errorSaving\":\"Սխալ: {message}\",\"siteNamePlaceholder\":\"Իմ խանութ\",\"siteDescriptionPlaceholder\":\"Ձեր խանութի նկարագրությունը\",\"currencyRates\":\"Արտարժույթի փոխարժեքներ\",\"currencyRatesDescription\":\"Սահմանեք արտարժույթի փոխարժեքները USD-ի նկատմամբ: Այս փոխարժեքները օգտագործվում են ապրանքների գների փոխարկման համար:\",\"baseCurrency\":\"Հիմնական արժույթ (միշտ 1)\",\"rateToUSD\":\"Փոխարժեք USD-ի նկատմամբ (1 USD = նշված արժեք)\"},\"quickSettings\":{\"title\":\"Արագ կարգավորումներ\",\"subtitle\":\"Արագ կարգավորումներ և զեղչերի կառավարում\",\"quickSettingsTitle\":\"Արագ կարգավորումներ\",\"quickSettingsSubtitle\":\"Արագ կարգավորումներ և զեղչերի կառավարում\",\"globalDiscount\":\"Գլոբալ զեղչ\",\"forAllProducts\":\"Բոլոր ապրանքների համար\",\"save\":\"Պահել\",\"saving\":\"Պահվում է...\",\"active\":\"Ակտիվ:\",\"discountApplied\":\"{percent}% զեղչ կիրառվում է բոլոր ապրանքների վրա\",\"noGlobalDiscount\":\"Գլոբալ զեղչ չկա: Մուտքագրեք տոկոս (0-100) բոլոր ապրանքներին զեղչ տալու համար\",\"cancel\":\"Չեղարկել\",\"usefulInformation\":\"Օգտակար տեղեկություն\",\"aboutDiscounts\":\"Զեղչերի մասին\",\"discountApplies\":\"Զեղչը կիրառվում է բոլոր ապրանքների գներին\",\"discountExample\":\"Օրինակ: 10% = բոլոր գները կնվազեն 10%-ով\",\"noDiscount\":\"0% = զեղչ չկա, ցուցադրվում են բնօրինակ գները\",\"changesApplied\":\"Փոփոխությունները կիրառվում են անմիջապես\",\"moreSettings\":\"Ավելի շատ կարգավորումներ →\",\"categoryDiscounts\":\"Կատեգորիայի զեղչեր\",\"categoryDiscountsSubtitle\":\"Կիրառել զեղչեր կատեգորիայի ներսում գտնվող յուրաքանչյուր ապրանքի վրա\",\"loadingCategories\":\"Բեռնվում են կատեգորիաները...\",\"noCategories\":\"Կատեգորիաներ չեն գտնվել\",\"parentCategoryId\":\"Ծնող կատեգորիայի ID: {id}\",\"rootCategory\":\"Արմատային կատեգորիա\",\"clear\":\"Մաքրել\",\"savedSuccess\":\"Կատեգորիայի զեղչերը հաջողությամբ պահվեցին:\",\"errorSaving\":\"Սխալ: {message}\",\"brandDiscounts\":\"Բրենդի զեղչեր\",\"brandDiscountsSubtitle\":\"Սահմանել զեղչեր կոնկրետ բրենդի ապրանքների համար\",\"loadingBrands\":\"Բեռնվում են բրենդները...\",\"noBrands\":\"Բրենդներ չեն գտնվել\",\"brandId\":\"Բրենդի ID: {id}\",\"productDiscounts\":\"Ապրանքի զեղչեր\",\"productDiscountsSubtitle\":\"Սահմանել անհատական զեղչի տոկոս յուրաքանչյուր ապրանքի համար\",\"loadingProducts\":\"Բեռնվում են ապրանքները...\",\"noProducts\":\"No products found\",\"discountMustBeValid\":\"Զեղչը պետք է լինի 0-100 միջակայքում\",\"productDiscountSaved\":\"Ապրանքի զեղչը հաջողությամբ պահվեց:\",\"errorSavingProduct\":\"Սխալ: {message}\",\"untitledCategory\":\"Անանուն կատեգորիա\",\"untitledBrand\":\"Անանուն բրենդ\"},\"priceFilter\":{\"title\":\"Զտել ըստ գնի կարգավորումներ\",\"subtitle\":\"Կարգավորել լռելյայն գնային միջակայքը և քայլի չափը ապրանքների էջի զտիչի համար\",\"backToAdmin\":\"Վերադառնալ ադմինիստրատորի վահան\",\"priceFilterDefaultRange\":\"Գնային զտիչի լռելյայն միջակայք\",\"stepSizeDescription\":\"Սահմանել լռելյայն քայլի չափը ապրանքների էջի գնային զտիչի սահիչի համար յուրաքանչյուր արժույթի համար:\",\"loadingSettings\":\"Բեռնվում են կարգավորումները...\",\"stepSizeUsd\":\"Քայլի չափ (USD)\",\"stepSizeAmd\":\"Քայլի չափ (ԴՐԱՄ)\",\"stepSizeRub\":\"Քայլի չափ (RUB)\",\"stepSizeGel\":\"Քայլի չափ (GEL)\",\"usdPlaceholder\":\"100\",\"amdPlaceholder\":\"5000\",\"rubPlaceholder\":\"500\",\"gelPlaceholder\":\"10\",\"howItWorks\":\"Ինչպես է աշխատում:\",\"stepSizeControls\":\"Քայլի չափը վերահսկում է, թե ինչպես է շարժվում գնային սահիչը (օր.՝ 100 = 100-ի աճ)\",\"differentStepSizes\":\"Կարող եք սահմանել տարբեր քայլի չափեր USD, ԴՐԱՄ, RUB և GEL-ի համար\",\"defaultRange\":\"Լռելյայն min/max միջակայքը վերցվում է իրական ապրանքների գներից\",\"usersCanAdjust\":\"Օգտատերերը դեռ կարող են կարգավորել ամբողջ միջակայքը օգտագործելով սահիչը ապրանքների էջում\",\"changesTakeEffect\":\"Փոփոխությունները կիրառվում են անմիջապես պահելուց հետո\",\"saveSettings\":\"Պահել կարգավորումները\",\"saving\":\"Պահվում է...\",\"clear\":\"Մաքրել\",\"savedSuccess\":\"Գնային զտիչի կարգավորումները հաջողությամբ պահվեցին:\",\"errorSaving\":\"Սխալ: {message}\",\"minPriceInvalid\":\"Նվազագույն գինը պետք է լինի վավեր դրական թիվ\",\"maxPriceInvalid\":\"Առավելագույն գինը պետք է լինի վավեր դրական թիվ\",\"stepSizeInvalid\":\"{label} պետք է լինի վավեր դրական թիվ\",\"minMustBeLess\":\"Նվազագույն գինը պետք է փոքր լինի առավելագույն գնից\"},\"brands\":{\"title\":\"Բրենդներ\",\"loading\":\"Բրենդները բեռնվում են...\",\"noBrands\":\"Բրենդներ չեն գտնվել\",\"addNew\":\"Ավելացնել նորը\",\"edit\":\"Խմբագրել\",\"delete\":\"Ջնջել\",\"editBrand\":\"Խմբագրել բրենդ\",\"addNewBrand\":\"Ավելացնել նոր բրենդ\",\"brandName\":\"Բրենդի անվանում *\",\"enterBrandName\":\"Մուտքագրել բրենդի անվանում\",\"cancel\":\"Չեղարկել\",\"create\":\"Ստեղծել\",\"update\":\"Թարմացնել\",\"saving\":\"Պահվում է...\",\"deleteConfirm\":\"Վստահ ե՞ք, որ ցանկանում եք ջնջել \\\"{name}\\\" բրենդը: Այս գործողությունը չի կարող հետարկվել:\",\"deletedSuccess\":\"Բրենդը հաջողությամբ ջնջվեց\",\"createdSuccess\":\"Բրենդը հաջողությամբ ստեղծվեց\",\"updatedSuccess\":\"Բրենդը հաջողությամբ թարմացվեց\",\"nameRequired\":\"Բրենդի անվանումը պարտադիր է\",\"errorDeleting\":\"Սխալ բրենդը ջնջելիս:\",\"errorSaving\":\"Սխալ բրենդը պահելիս:\",\"unknownError\":\"Անհայտ սխալ տեղի ունեցավ\",\"unknownErrorFallback\":\"Անհայտ սխալ\"},\"orders\":{\"title\":\"Դիտել պատվերները\",\"backToAdmin\":\"Վերադառնալ ադմինիստրատորի վահան\",\"loading\":\"Բեռնվում է...\",\"loadingOrders\":\"Պատվերները բեռնվում են...\",\"noOrders\":\"Պատվերներ չեն գտնվել\",\"searchPlaceholder\":\"Որոնել ըստ պատվերի համարի, հաճախորդի, էլ. փոստի, հեռախոսի...\",\"allStatuses\":\"Բոլոր կարգավիճակները\",\"allPaymentStatuses\":\"Բոլոր վճարման կարգավիճակները\",\"pending\":\"Սպասվող\",\"processing\":\"Մշակվող\",\"completed\":\"Ավարտված\",\"cancelled\":\"Չեղարկված\",\"paid\":\"Վճարված\",\"pendingPayment\":\"սպասվում է\",\"failed\":\"Ձախողված\",\"statusUpdated\":\"Կարգավիճակը հաջողությամբ թարմացվեց\",\"paymentStatusUpdated\":\"Վճարման կարգավիճակը հաջողությամբ թարմացվեց\",\"failedToUpdateStatus\":\"Չհաջողվեց թարմացնել կարգավիճակը: Խնդրում ենք կրկին փորձել:\",\"failedToUpdatePaymentStatus\":\"Չհաջողվեց թարմացնել վճարման կարգավիճակը: Խնդրում ենք կրկին փորձել:\",\"updating\":\"Թարմացվում է...\",\"selectedOrders\":\"Ընտրված {count} պատվեր\",\"deleteSelected\":\"Ջնջել ընտրվածները\",\"deleting\":\"Ջնջվում է...\",\"deleteConfirm\":\"Ջնջե՞լ {count} ընտրված պատվերը:\",\"bulkDeleteFinished\":\"Զանգվածային ջնջումն ավարտվեց: Հաջողություն: {success}/{total}\",\"bulkDeleteFailed\":\"Զանգվածային ջնջումն ավարտվեց: Հաջողություն: {success}/{total}\\n\\nՁախողված պատվերներ: {failed}\",\"failedToDelete\":\"Չհաջողվեց ջնջել ընտրված պատվերները: Խնդրում ենք կրկին փորձել:\",\"orderNumber\":\"Պատվեր #\",\"customer\":\"Հաճախորդ\",\"status\":\"Կարգավիճակ\",\"payment\":\"Վճարում\",\"total\":\"Ընդամենը\",\"items\":\"Ապրանքներ\",\"date\":\"Ամսաթիվ\",\"unknownCustomer\":\"Անհայտ հաճախորդ\",\"viewOrderDetails\":\"Դիտել պատվերի մանրամասները\",\"showingPage\":\"Ցուցադրվում է {page} էջը {totalPages}-ից ({total} ընդամենը)\",\"previous\":\"Նախորդ\",\"next\":\"Հաջորդ\",\"selectAllOrders\":\"Ընտրել բոլոր պատվերները\",\"selectOrder\":\"Ընտրել պատվեր {number}\",\"orderDetails\":{\"backToOrders\":\"Վերադառնալ պատվերներին\",\"title\":\"Պատվերի մանրամասներ\",\"loadingOrderDetails\":\"Բեռնվում են պատվերի մանրամասները...\",\"orderIdMissing\":\"Պատվերի ID-ն բացակայում է URL-ում\",\"failedToLoad\":\"Չհաջողվեց բեռնել պատվերի մանրամասները\",\"orderNotFound\":\"Պատվեր չի գտնվել:\",\"createdAt\":\"Ստեղծված է\",\"updatedAt\":\"Թարմացված է\",\"summary\":\"Ամփոփում\",\"orderNumber\":\"Պատվեր #:\",\"total\":\"Ընդամենը:\",\"status\":\"Կարգավիճակ:\",\"payment\":\"Վճարում:\",\"customer\":\"Հաճախորդ\",\"shippingAddress\":\"Առաքման հասցե\",\"noShippingAddress\":\"Առաքման հասցե չկա\",\"shippingMethod\":\"Առաքման եղանակ:\",\"pickup\":\"ինքնավերցում\",\"paymentInfo\":\"Վճարում\",\"method\":\"Եղանակ:\",\"amount\":\"Գումար:\",\"card\":\"Քարտ:\",\"noPaymentInfo\":\"Վճարման տեղեկություն չկա\",\"items\":\"Ապրանքներ\",\"product\":\"Ապրանք\",\"sku\":\"SKU\",\"colorSize\":\"Գույն / Չափ\",\"qty\":\"Քանակ\",\"price\":\"Գին\",\"totalCol\":\"Ընդամենը\",\"noItemsFound\":\"Այս պատվերի համար ապրանքներ չեն գտնվել\"}},\"messages\":{\"title\":\"Հաղորդագրություններ\",\"backToAdmin\":\"Վերադառնալ ադմինիստրատորի վահան\",\"loadingMessages\":\"Բեռնվում են հաղորդագրությունները...\",\"noMessages\":\"Հաղորդագրություններ չեն գտնվել\",\"name\":\"Անուն\",\"email\":\"Էլ. փոստ\",\"subject\":\"Թեմա\",\"message\":\"Հաղորդագրություն\",\"date\":\"Ամսաթիվ\",\"selectAll\":\"Ընտրել բոլորը\",\"selectMessage\":\"Ընտրել հաղորդագրություն {email}\",\"selectedMessages\":\"Ընտրված {count} հաղորդագրություն\",\"deleteSelected\":\"Ջնջել ընտրվածները\",\"deleting\":\"Ջնջվում է...\",\"deleteConfirm\":\"Ջնջե՞լ {count} ընտրված հաղորդագրություն:\",\"deletedSuccess\":\"Հաղորդագրությունները հաջողությամբ ջնջվեցին\",\"failedToDelete\":\"Չհաջողվեց ջնջել հաղորդագրությունները\",\"showingPage\":\"Ցուցադրվում է {page} էջը {totalPages}-ից ({total} ընդամենը)\",\"previous\":\"Նախորդ\",\"next\":\"Հաջորդ\"},\"common\":{\"loading\":\"Բեռնվում է...\",\"error\":\"Սխալ\",\"success\":\"Հաջողություն\",\"cancel\":\"Չեղարկել\",\"close\":\"Փակել\",\"save\":\"Պահել\",\"delete\":\"Ջնջել\",\"edit\":\"Խմբագրել\",\"create\":\"Ստեղծել\",\"update\":\"Թարմացնել\",\"saving\":\"Պահվում է...\",\"back\":\"Վերադառնալ\",\"backToAdmin\":\"Վերադառնալ ադմինիստրատորի վահան\"}}"));}),
"[project]/apps/web/locales/ru/common.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"buttons":{"addToCart":"Добавить в корзину","addToWishlist":"Добавить в избранное","viewProduct":"Посмотреть товар","viewDetails":"Посмотреть детали","browseProducts":"Просмотреть товары","proceedToCheckout":"Перейти к оформлению","remove":"Удалить","submit":"Отправить","cancel":"Отмена","login":"Войти","register":"Зарегистрироваться","search":"Поиск","shopNow":"Купить сейчас","viewMore":"Узнать больше","close":"Закрыть"},"navigation":{"home":"Главная","products":"Товары","categories":"Категории","cart":"Корзина","wishlist":"Избранное","compare":"Сравнить","checkout":"Оформление заказа","profile":"Профиль","orders":"Заказы","login":"Войти","register":"Зарегистрироваться","about":"О нас","contact":"Контакты","admin":"Админ","adminPanel":"Панель администратора","logout":"Выйти","faq":"FAQ","shipping":"Доставка","returns":"Возвраты","support":"Поддержка","privacy":"Конфиденциальность","terms":"Условия","cookies":"Файлы cookie","delivery":"Доставка","stores":"Магазины"},"stock":{"inStock":"В наличии","outOfStock":"Нет в наличии"},"cart":{"title":"Корзина покупок","empty":"Ваша корзина пуста","orderSummary":"Итоги заказа","subtotal":"Промежуточный итог","shipping":"Доставка","tax":"Налог","total":"Итого","free":"Бесплатно","items":"товаров","item":"товар"},"wishlist":{"title":"Мое избранное","empty":"Ваше избранное пусто","emptyDescription":"Начните добавлять товары в избранное, чтобы сохранить их на потом.","totalCount":"Всего товаров в избранном","tableHeaders":{"productName":"Название товара","unitPrice":"Цена за единицу","stockStatus":"Наличие","action":"Действие"}},"compare":{"title":"Сравнить товары","empty":"Нет товаров для сравнения","emptyDescription":"Добавьте до 4 товаров для сравнения их характеристик и цен.","products":"товаров","product":"товар","isFull":"Список сравнения заполнен","characteristic":"Характеристика","image":"Изображение","name":"Название","brand":"Бренд","price":"Цена","availability":"Наличие","actions":"Действия","viewDetails":"Посмотреть детали","browseProducts":"Просмотреть товары"},"reviews":{"title":"Отзывы","writeReview":"Написать отзыв","rating":"Рейтинг","comment":"Ваш отзыв","commentPlaceholder":"Поделитесь своими мыслями об этом товаре...","submitReview":"Отправить отзыв","submit":"Отправить отзыв","submitting":"Отправка...","loginRequired":"Пожалуйста, войдите, чтобы написать отзыв","ratingRequired":"Пожалуйста, выберите рейтинг","commentRequired":"Пожалуйста, напишите комментарий","submitError":"Не удалось отправить отзыв","alreadyReviewed":"Вы уже оставили отзыв на этот товар","noReviews":"Пока нет отзывов. Будьте первым, кто оставит отзыв об этом товаре!","review":"отзыв","reviews":"отзывов","cancel":"Отмена"},"messages":{"addedToCart":"Добавлено в корзину","removedFromCart":"Удалено из корзины","addedToWishlist":"Добавлено в избранное","removedFromWishlist":"Удалено из избранного","addedToCompare":"Добавлено к сравнению","removedFromCompare":"Удалено из сравнения","errorAddingToCart":"Ошибка при добавлении в корзину","loading":"Загрузка...","loadingFilters":"Загрузка фильтров...","noImage":"Нет изображения","noProductsFound":"Товары не найдены","selectColor":"Пожалуйста, выберите цвет","selectSize":"Пожалуйста, выберите размер","selectColorAndSize":"Пожалуйста, выберите размер и цвет","selectOptions":"Выберите опции","adding":"Добавление...","pcs":"шт","compareMaxReached":"Вы можете сравнить максимум 4 товара","invalidProduct":"Недействительный товар. Пожалуйста, обновите страницу и попробуйте снова.","noVariantsAvailable":"Нет доступных вариантов","stockExceeded":"Доступное количество составляет {stock} шт. Вы не можете добавить больше:","quantityUpdated":"Количество обновлено","failedToUpdateQuantity":"Не удалось обновить количество","stockInsufficient":"Доступное количество недостаточно","availableQuantity":"Доступное количество составляет {stock} шт","addQuantity":"Добавить количество","product":"Товар","quantity":"Количество","subtotal":"Промежуточный итог","sku":"Артикул"},"alerts":{"compareMaxReached":"Вы можете сравнить максимум 4 товара","invalidProduct":"Недействительный товар. Пожалуйста, обновите страницу и попробуйте снова.","noVariantsAvailable":"Нет доступных вариантов","stockExceeded":"Доступное количество составляет {stock} шт. Вы не можете добавить больше:","stockInsufficient":"Доступное количество недостаточно: {message}","noMoreStockAvailable":"Больше нет товара в наличии","productNotFound":"Товар не найден. Пожалуйста, обновите страницу и попробуйте снова.","failedToAddToCart":"Не удалось добавить товар в корзину. Пожалуйста, попробуйте снова."},"ariaLabels":{"addToCart":"Добавить в корзину","removeFromCart":"Удалить из корзины","addToWishlist":"Добавить в избранное","removeFromWishlist":"Удалить из избранного","addToCompare":"Добавить к сравнению","removeFromCompare":"Удалить из сравнения","outOfStock":"Нет в наличии","search":"Поиск","searchPlaceholder":"Поиск товаров","openMenu":"Открыть меню навигации","closeMenu":"Закрыть меню навигации","instagram":"Instagram","facebook":"Facebook","linkedin":"LinkedIn","color":"Цвет: {color}","previousImage":"Предыдущее изображение","nextImage":"Следующее изображение","goToSlide":"Перейти к слайду {number}","previousThumbnail":"Предыдущая миниатюра","nextThumbnail":"Следующая миниатюра","fullscreenImage":"Полноэкранное изображение"},"placeholders":{"search":"Поиск товаров"},"defaults":{"category":"Бакалея"},"footer":{"shop":"Магазин","description":"Профессиональная платформа электронной коммерции для современного опыта покупок.","quickLinks":"Быстрые ссылки","legal":"Юридическая информация","contactInfo":"Контактная информация","privacyPolicy":"Политика конфиденциальности","termsOfService":"Условия использования","cookiePolicy":"Политика использования файлов cookie","refundPolicy":"Политика возврата","deliveryTerms":"Условия доставки","copyright":"© {year} Shop. Все права защищены.","paymentMethods":"Способы оплаты:"},"product":{"product":"товар","products":"товаров"},"pagination":{"previous":"Предыдущая","next":"Следующая","pageOf":"Страница {page} из {totalPages}"},"notFound":{"title":"Страница не найдена","description":"Страница, которую вы ищете, не существует или была перемещена.","goHome":"На главную"}});}),
"[project]/apps/web/locales/ru/home.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"hero_title":"Добро пожаловать в магазин","hero_subtitle":"Откройте для себя удивительные товары и эксклюзивные предложения. Покупайте последние тренды и найдите все необходимое в одном месте.","hero_button_products":"ТОВАРЫ","hero_button_view_more":"УЗНАТЬ БОЛЬШЕ","features_title":"Мы предоставляем товары высокого качества","features_subtitle":"Клиент, который недоволен по причине, это проблема, клиент, который недоволен, хотя он или она не может","feature_fast_delivery_title":"Быстрая доставка","feature_fast_delivery_description":"Скорее всего, не было сотрудничества и контрольных точек, не было процесса.","feature_best_quality_title":"Лучшее качество","feature_best_quality_description":"Это стратегия контента, которая пошла не так с самого начала. Отказ от использования Lorem Ipsum.","feature_free_return_title":"Бесплатный возврат","feature_free_return_description":"Это правда, но этого недостаточно, чтобы вернуть все в нужное русло для текста.","featured_products":{"title":"Рекомендуемые товары","subtitle":"Три быстрых выбора: Новинки, Бестселлеры и Рекомендуемые товары","tab_new":"НОВИНКИ","tab_bestseller":"БЕСТСЕЛЛЕРЫ","tab_featured":"РЕКОМЕНДУЕМЫЕ","ariaShowProducts":"Показать товары {label}","errorLoading":"Не удалось загрузить товары","tryAgain":"Попробовать снова","noProducts":"В этой категории нет товаров."}});}),
"[project]/apps/web/locales/ru/product.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"details_title":"Детали товара","related_products_title":"Похожие товары","reviews_title":"Отзывы","specifications_title":"Характеристики","description_title":"Описание","color":"Цвет","size":"Размер","quantity":"Количество","addToCart":"Добавить в корзину","outOfStock":"Нет в наличии","selectColor":"Пожалуйста, выберите цвет","selectSize":"Пожалуйста, выберите размер","selectColorAndSize":"Пожалуйста, выберите размер и цвет","selectOptions":"Выберите опции","adding":"Добавление...","addedToCart":"Добавлено в корзину","addedToWishlist":"Добавлено в избранное","removedFromWishlist":"Удалено из избранного","addedToCompare":"Добавлено к сравнению","removedFromCompare":"Удалено из сравнения","compareListFull":"Список сравнения заполнен","errorAddingToCart":"Ошибка при добавлении в корзину","pcs":"шт","outOfStockLabel":"Нет в наличии","noRelatedProducts":"Похожие товары не найдены"});}),
"[project]/apps/web/locales/ru/products.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"filters":{"price":{"title":"Фильтр по цене","priceLabel":"Цена:"},"color":{"title":"Фильтр по цвету","noColors":"Цвета недоступны","loading":"Загрузка..."},"size":{"title":"Фильтр по размеру","noSizes":"Размеры недоступны","loading":"Загрузка..."},"brand":{"title":"Фильтр по бренду","searchPlaceholder":"Найти бренд","noBrands":"Бренды не найдены","loading":"Загрузка..."}},"header":{"allProducts":"Все товары ({total})","clearFilters":"Очистить фильтры","show":"Показать","all":"Все","sort":{"default":"Сортировка по умолчанию","priceAsc":"Цена: от низкой к высокой","priceDesc":"Цена: от высокой к низкой","nameAsc":"Название: А-Я","nameDesc":"Название: Я-А"},"viewModes":{"list":"Вид списка","grid2":"Вид сетки 2x2","grid3":"Вид сетки 3x3"},"filters":"Фильтры","sortProducts":"Сортировать товары"},"grid":{"noProducts":"Товары не найдены."},"mobileFilters":{"title":"Фильтры","close":"Закрыть фильтры"},"categoryNavigation":{"all":"Все","shopAll":"Все товары","newArrivals":"Новинки","sale":"Распродажа","labels":{"all":"ВСЕ","new":"НОВОЕ","sale":"РАСПРОДАЖА"},"scrollLeft":"Прокрутить категории влево","scrollRight":"Прокрутить категории вправо"}});}),
"[project]/apps/web/locales/ru/attributes.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"color":{"red":"Красный","blue":"Синий","green":"Зеленый","yellow":"Желтый","black":"Черный","white":"Белый","gray":"Серый","grey":"Серый","brown":"Коричневый","orange":"Оранжевый","pink":"Розовый","purple":"Фиолетовый","navy":"Темно-синий","beige":"Бежевый","maroon":"Темно-бордовый","olive":"Оливковый","teal":"Бирюзовый","cyan":"Голубой","magenta":"Пурпурный","lime":"Лайм","silver":"Серебряный","gold":"Золотой"},"size":{"xs":"XS","s":"S","m":"M","l":"L","xl":"XL","xxl":"XXL","xxxl":"XXXL"}});}),
"[project]/apps/web/locales/ru/delivery.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Доставка и возврат","deliveryInformation":{"title":"Информация о доставке","freeDelivery":"Бесплатная доставка","deliveryCost":"Стоимость доставки: {price}","freeForOrdersAbove":"Бесплатно для заказов свыше {amount}","estimatedDelivery":"Примерная доставка: {days} {daysText}","day":"день","days":"дней","pickupLocations":"Места самовывоза:"},"returnPolicy":{"title":"Политика возврата","thirtyDayPolicy":{"title":"Политика возврата 30 дней","description":"У вас есть 30 дней с даты покупки, чтобы вернуть товары в их первоначальном состоянии с прикрепленными бирками."},"returnConditions":{"title":"Условия возврата","items":["Товары должны быть неношеными, нестиранными и в оригинальной упаковке","Все бирки и этикетки должны быть прикреплены","Товары должны быть в пригодном для продажи состоянии","Требуется подтверждение покупки"]},"howToReturn":{"title":"Как вернуть","steps":["Свяжитесь с нашей службой поддержки клиентов, чтобы инициировать возврат","Получите номер авторизации возврата","Упакуйте товары надежно с формой возврата","Отправьте посылку на наш адрес возврата","После получения мы обработаем ваш возврат в течение 5-7 рабочих дней"]},"refundProcess":{"title":"Процесс возврата","description":"Возвраты будут обработаны на исходный способ оплаты. Пожалуйста, подождите 5-7 рабочих дней, чтобы возврат появился на вашем счете."},"nonReturnableItems":{"title":"Товары, не подлежащие возврату","items":["Персонализированные или изготовленные на заказ товары","Товары без оригинальной упаковки","Товары, поврежденные из-за неправильного использования","Товары со скидкой (если не дефектные)"]}},"contact":{"title":"Нужна помощь?","description":"Если у вас есть вопросы о доставке или возврате, пожалуйста, не стесняйтесь связаться с нами.","email":"Email:","phone":"Телефон:","hours":"Часы работы:","hoursValue":"Понедельник - Пятница, 9:00 - 18:00"}});}),
"[project]/apps/web/locales/ru/about.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"subtitle":"КАЖУЩИЙСЯ ЭЛЕГАНТНЫМ ДИЗАЙН","title":"О нашем интернет-магазине","description":{"paragraph1":"Мы рады приветствовать вас в нашем интернет-магазине. Наша компания стремится предоставить вам лучший опыт покупок с широким ассортиментом качественных товаров и отличным сервисом.","paragraph2":"Наша миссия - сделать онлайн-покупки простыми, удобными и приятными. Мы тщательно отбираем каждый товар, чтобы гарантировать высокое качество и удовлетворенность наших клиентов.","paragraph3":"Мы гордимся тем, что предлагаем не только отличные продукты, но и превосходное обслуживание клиентов. Наша команда всегда готова помочь вам найти именно то, что вы ищете."},"team":{"subtitle":"СЛОВА О НАС","title":"Наша команда","description":"Наша команда состоит из опытных профессионалов, которые преданы своему делу и стремятся обеспечить лучший сервис для наших клиентов."}});}),
"[project]/apps/web/locales/ru/contact.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"callToUs":{"title":"Позвоните нам:","description":"Мы доступны 24/7, 7 дней в неделю."},"writeToUs":{"title":"Напишите нам:","description":"Заполните нашу форму, и мы свяжемся с вами в течение 24 часов.","emailLabel":"Электронная почта:"},"headquarter":{"title":"Главный офис:","hours":{"weekdays":"Понедельник - Пятница: 9:00-20:00","saturday":"Суббота: 11:00 - 15:00"}},"form":{"name":"Имя *","namePlaceholder":"Ваше имя","email":"E-mail *","emailPlaceholder":"your@email.com","subject":"Тема *","subjectPlaceholder":"О чем это?","message":"Сообщение","messagePlaceholder":"Ваше сообщение...","submit":"Отправить","submitting":"Отправка...","submitSuccess":"Ваше сообщение успешно отправлено","submitError":"Ошибка: Не удалось отправить сообщение"}});}),
"[project]/apps/web/locales/ru/faq.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Часто задаваемые вопросы","description":"Найдите ответы на распространенные вопросы о наших товарах, доставке, возвратах и многом другом.","categories":{"ordersShipping":{"title":"Заказы и доставка","questions":{"shippingTime":{"q":"Сколько времени занимает доставка?","a":"Сроки доставки различаются в зависимости от вашего местоположения и выбранного способа доставки. Стандартная доставка обычно занимает 5-7 рабочих дней, а экспресс-доставка - 2-3 рабочих дня. Подробную информацию о доставке вы можете найти на нашей странице Доставка."},"internationalShipping":{"q":"Вы доставляете за границу?","a":"Да, мы доставляем в большинство стран мира. Стоимость доставки и сроки различаются в зависимости от местоположения. Пожалуйста, проверьте нашу страницу доставки для получения более подробной информации."},"trackOrder":{"q":"Могу ли я отследить свой заказ?","a":"Да, как только ваш заказ будет отправлен, вы получите номер отслеживания по электронной почте. Вы можете использовать этот номер для отслеживания вашей посылки на сайте перевозчика."},"damagedOrder":{"q":"Что делать, если мой заказ поврежден или неправильный?","a":"Если вы получили поврежденный или неправильный товар, пожалуйста, немедленно свяжитесь с нашей службой поддержки клиентов. Мы организуем замену или возврат без дополнительных затрат для вас."}}},"returnsRefunds":{"title":"Возвраты и возмещения","questions":{"returnPolicy":{"q":"Какова ваша политика возврата?","a":"Мы предлагаем политику возврата 30 дней. Товары должны быть в их первоначальном состоянии с прикрепленными бирками. Пожалуйста, посетите нашу страницу Возвраты для получения полной информации."},"howToReturn":{"q":"Как вернуть товар?","a":"Чтобы вернуть товар, свяжитесь с нашей службой поддержки клиентов, чтобы получить номер авторизации возврата. Затем упакуйте товар надежно и отправьте его на наш адрес возврата. Полные инструкции доступны на нашей странице Возвраты."},"refundTime":{"q":"Сколько времени занимает обработка возврата?","a":"После получения вашего возвращенного товара мы обрабатываем возвраты в течение 5-7 рабочих дней. Возврат появится на вашем счете вскоре после обработки."},"returnShipping":{"q":"Должен ли я платить за доставку возврата?","a":"Стоимость доставки возврата зависит от причины возврата. Если товар дефектный или неправильный, мы покрываем стоимость доставки возврата. В противном случае клиент несет ответственность за стоимость доставки возврата."}}},"payment":{"title":"Оплата","questions":{"paymentMethods":{"q":"Какие способы оплаты вы принимаете?","a":"Мы принимаем все основные кредитные карты, дебетовые карты, PayPal и другие безопасные способы оплаты. Все платежи обрабатываются безопасно."},"paymentSecurity":{"q":"Безопасна ли моя платежная информация?","a":"Да, мы используем шифрование промышленного стандарта для защиты вашей платежной информации. Мы никогда не храним полные данные вашей кредитной карты на наших серверах."},"multiplePayment":{"q":"Могу ли я оплатить несколькими способами оплаты?","a":"В настоящее время мы принимаем только один способ оплаты на заказ. Если вам нужно разделить оплату, пожалуйста, свяжитесь с нашей службой поддержки клиентов."}}},"accountPrivacy":{"title":"Аккаунт и конфиденциальность","questions":{"createAccount":{"q":"Как создать аккаунт?","a":"Вы можете создать аккаунт, нажав ссылку \"Зарегистрироваться\" в заголовке или зарегистрировавшись при оформлении заказа. Наличие аккаунта позволяет отслеживать заказы и сохранять вашу информацию для более быстрого оформления заказа."},"resetPassword":{"q":"Как сбросить пароль?","a":"Если вы забыли пароль, нажмите \"Забыли пароль\" на странице входа. Вы получите электронное письмо с инструкциями по сбросу пароля."},"privacyProtection":{"q":"Как вы защищаете мою личную информацию?","a":"Мы серьезно относимся к вашей конфиденциальности. Мы используем безопасное шифрование и никогда не передаем вашу личную информацию третьим лицам. Пожалуйста, ознакомьтесь с нашей Политикой конфиденциальности для получения полной информации."}}},"products":{"title":"Товары","questions":{"authenticProducts":{"q":"Ваши товары подлинные?","a":"Да, мы продаем только подлинные товары от авторизованных дилеров и производителей. Мы гарантируем подлинность всех товаров."},"outOfStock":{"q":"Что делать, если товар отсутствует на складе?","a":"Если товар отсутствует на складе, вы можете подписаться на уведомления по электронной почте, чтобы получать уведомления, когда он снова станет доступен."},"warranties":{"q":"Предлагаете ли вы гарантии на товары?","a":"Информация о гарантии различается в зависимости от товара. Пожалуйста, проверьте описание товара для получения конкретной информации о гарантии. Многие товары поставляются с гарантией производителя."}}}},"stillHaveQuestions":{"title":"Все еще есть вопросы?","description":"Не можете найти то, что ищете? Наша служба поддержки клиентов готова помочь.","contactUs":"Связаться с нами →","getSupport":"Получить поддержку →"}});}),
"[project]/apps/web/locales/ru/login.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Добро пожаловать","subtitle":"Войдите в свой аккаунт, чтобы продолжить","form":{"emailOrPhone":"Email или Телефон","emailOrPhonePlaceholder":"your@email.com или +7 XXX XXX XX XX","password":"Пароль","passwordPlaceholder":"••••••••","rememberMe":"Запомнить меня","forgotPassword":"Забыли пароль?","submit":"Войти","submitting":"Вход...","noAccount":"Нет аккаунта?","signUp":"Зарегистрироваться"},"errors":{"emailOrPhoneRequired":"Пожалуйста, введите ваш email или номер телефона","passwordRequired":"Пожалуйста, введите ваш пароль","loginFailed":"Ошибка входа. Пожалуйста, попробуйте снова."}});}),
"[project]/apps/web/locales/ru/cookies.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Политика использования файлов cookie","lastUpdated":"Последнее обновление:","whatAreCookies":{"title":"Что такое файлы cookie?","description1":"Файлы cookie - это небольшие текстовые файлы, которые размещаются на вашем компьютере или мобильном устройстве при посещении веб-сайта. Они широко используются для более эффективной работы веб-сайтов и предоставления информации владельцам веб-сайтов.","description2":"Файлы cookie позволяют веб-сайту распознавать ваше устройство и хранить некоторую информацию о ваших предпочтениях или прошлых действиях."},"howWeUseCookies":{"title":"Как мы используем файлы cookie","description":"Мы используем файлы cookie для нескольких целей:","types":{"essential":{"title":"Необходимые файлы cookie:","description":"Эти файлы cookie необходимы для правильной работы веб-сайта. Они обеспечивают основные функции, такие как навигация по страницам и доступ к защищенным областям веб-сайта."},"performance":{"title":"Файлы cookie производительности:","description":"Эти файлы cookie помогают нам понять, как посетители взаимодействуют с нашим веб-сайтом, собирая и сообщая информацию анонимно. Это помогает нам улучшить работу нашего веб-сайта."},"functionality":{"title":"Функциональные файлы cookie:","description":"Эти файлы cookie позволяют веб-сайту запоминать сделанные вами выборы (например, предпочтения языка или региона) и предоставлять расширенные персонализированные функции."},"targeting":{"title":"Рекламные файлы cookie:","description":"Эти файлы cookie могут быть установлены на нашем сайте нашими рекламными партнерами для создания профиля ваших интересов и показа вам релевантного контента на других сайтах."}}},"typesOfCookies":{"title":"Типы файлов cookie, которые мы используем","sessionCookies":{"title":"Сеансовые файлы cookie","description":"Это временные файлы cookie, которые удаляются при закрытии браузера. Они помогают нам поддерживать ваш сеанс во время просмотра нашего веб-сайта."},"persistentCookies":{"title":"Постоянные файлы cookie","description":"Эти файлы cookie остаются на вашем устройстве в течение установленного периода или до тех пор, пока вы их не удалите. Они помогают нам запоминать ваши предпочтения и улучшать ваш опыт при будущих посещениях."},"thirdPartyCookies":{"title":"Сторонние файлы cookie","description":"Эти файлы cookie устанавливаются сторонними сервисами, которые появляются на наших страницах. Они могут использоваться для отслеживания вашей активности просмотра на разных веб-сайтах."}},"managingCookies":{"title":"Управление файлами cookie","description":"Вы имеете право решать, принимать или отклонять файлы cookie. Вы можете реализовать свои права в отношении файлов cookie, установив свои предпочтения в настройках браузера.","browserSettings":{"title":"Настройки браузера","description1":"Большинство веб-браузеров позволяют контролировать файлы cookie через настройки предпочтений. Однако ограничение файлов cookie может повлиять на ваш опыт использования нашего веб-сайта.","description2":"Вот ссылки на инструкции по управлению файлами cookie в популярных браузерах:","browsers":{"chrome":"Google Chrome (Гугл Хром)","firefox":"Mozilla Firefox (Мозилла Фаерфокс)","safari":"Safari (Сафари)","edge":"Microsoft Edge (Майкрософт Эдж)"}},"optOutTools":{"title":"Инструменты отказа","description":"Вы также можете отказаться от определенных сторонних файлов cookie, посетив {digitalAdvertisingAlliance} или {yourOnlineChoices}.","digitalAdvertisingAlliance":"Альянс цифровой рекламы (Digital Advertising Alliance)","yourOnlineChoices":"Ваш онлайн-выбор (Your Online Choices)"}},"cookiesWeUse":{"title":"Файлы cookie, которые мы используем","essential":{"title":"Необходимые файлы cookie","description":"Эти файлы cookie строго необходимы для предоставления вам услуг, доступных через наш веб-сайт, и использования некоторых его функций."},"analytics":{"title":"Аналитические файлы cookie","description":"Эти файлы cookie помогают нам понять, как посетители взаимодействуют с нашим веб-сайтом, собирая и сообщая информацию анонимно."},"preference":{"title":"Файлы cookie предпочтений","description":"Эти файлы cookie позволяют нашему веб-сайту запоминать информацию, которая изменяет способ работы или внешний вид веб-сайта, например, ваш предпочтительный язык или регион."}},"updates":{"title":"Обновления этой политики","description":"Мы можем время от времени обновлять эту Политику использования файлов cookie, чтобы отражать изменения в наших практиках или по другим операционным, юридическим или нормативным причинам. Пожалуйста, регулярно пересматривайте эту Политику использования файлов cookie, чтобы быть в курсе нашего использования файлов cookie."},"contact":{"title":"Свяжитесь с нами","description":"Если у вас есть вопросы о нашем использовании файлов cookie, пожалуйста, свяжитесь с нами по адресу:"}});}),
"[project]/apps/web/locales/ru/delivery-terms.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Условия доставки","lastUpdated":"Последнее обновление:","overview":{"title":"Обзор","description":"Эти Условия доставки объясняют, как мы обрабатываем, отправляем и доставляем ваши заказы, включая ожидаемые сроки, сборы и ответственность."},"shippingOptions":{"title":"Варианты доставки","description":"Доступные варианты отображаются при оформлении заказа и могут включать:","options":{"standard":"Стандартная доставка с расчетными сроками по регионам.","express":"Экспресс-доставка, где поддерживается.","pickup":"Самовывоз из магазина или местная курьерская служба (если доступно в вашем регионе)."}},"processingTimes":{"title":"Время обработки","items":{"typical":"Заказы обычно обрабатываются в течение 1–2 рабочих дней после подтверждения оплаты.","weekends":"Заказы, размещенные в выходные или праздничные дни, обрабатываются на следующий рабочий день.","preorder":"Товары предзаказа отправляются на основе расчетной доступности, указанной при покупке."}},"deliveryTimeframes":{"title":"Сроки доставки","description":"Расчетные сроки доставки различаются в зависимости от пункта назначения и выбранного способа. Детали отслеживания предоставляются при отправке заказа. Фактические сроки доставки могут отличаться из-за пропускной способности перевозчика или местных таможенных процедур."},"shippingFees":{"title":"Сборы за доставку и пошлины","items":{"costs":"Стоимость доставки рассчитывается при оформлении заказа на основе пункта назначения и уровня обслуживания.","duties":"Импортные пошлины, налоги или брокерские сборы могут применяться для международных отправлений и являются ответственностью получателя.","promotional":"Рекламные предложения бесплатной доставки применяются только в соответствии с условиями акции."}},"delaysDamageLoss":{"title":"Задержки, повреждения или потеря","items":{"delays":"Мы не несем ответственности за задержки, вызванные перевозчиками, погодными условиями или таможенными проверками.","damage":"Пожалуйста, проверьте посылки при доставке и сообщите о видимых повреждениях перевозчику и нашей службе поддержки в течение 48 часов.","loss":"Если отправление потеряно, свяжитесь с нами с номером вашего заказа; мы скоординируем с перевозчиком для решения проблемы."}},"contact":{"title":"Свяжитесь с нами","description":"По вопросам доставки или специальной обработки обращайтесь к нам по адресу"}});}),
"[project]/apps/web/locales/ru/terms.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Условия использования","lastUpdated":"Последнее обновление:","agreementToTerms":{"title":"Согласие с условиями","description1":"Получая доступ к нашему веб-сайту или используя его, вы соглашаетесь соблюдать эти Условия использования и все применимые законы и правила. Если вы не согласны с какими-либо из этих условий, вам запрещено использовать или получать доступ к этому сайту.","description2":"Материалы, содержащиеся на этом веб-сайте, защищены применимым законом об авторском праве и товарных знаках."},"useLicense":{"title":"Лицензия на использование","description":"Разрешается временно загружать одну копию материалов на нашем веб-сайте только для личного, некоммерческого временного просмотра. Это предоставление лицензии, а не передача права собственности, и в соответствии с этой лицензией вы не можете:","restrictions":{"modify":"Изменять или копировать материалы","commercial":"Использовать материалы в коммерческих целях или для публичного показа","reverse":"Пытаться провести обратную разработку любого программного обеспечения, содержащегося на веб-сайте","copyright":"Удалять любые уведомления об авторских правах или других правах собственности с материалов","transfer":"Передавать материалы другому лицу или \"зеркалировать\" материалы на любом другом сервере"}},"accountRegistration":{"title":"Регистрация аккаунта","description":"Для доступа к определенным функциям нашего веб-сайта вам может потребоваться зарегистрировать аккаунт. При регистрации вы соглашаетесь:","requirements":{"accurate":"Предоставлять точную, актуальную и полную информацию","maintain":"Поддерживать и обновлять вашу информацию, чтобы она оставалась точной","security":"Поддерживать безопасность вашего пароля и идентификации","responsibility":"Принимать всю ответственность за действия, происходящие под вашим аккаунтом","notify":"Немедленно уведомлять нас о любом несанкционированном использовании вашего аккаунта"}},"productInformation":{"title":"Информация о товарах","description1":"Мы стремимся предоставлять точные описания товаров, изображения и цены. Однако мы не гарантируем, что описания товаров или другой контент на этом сайте являются точными, полными, надежными, актуальными или безошибочными.","description2":"Если товар, предлагаемый нами, не соответствует описанию, ваше единственное средство правовой защиты - вернуть его в неношеном состоянии."},"pricingAndPayment":{"title":"Ценообразование и оплата","description1":"Все цены отображаются в выбранной валюте и могут быть изменены без уведомления. Мы оставляем за собой право изменять цены в любое время.","description2":"Оплата должна быть получена до того, как мы отправим ваш заказ. Мы принимаем различные способы оплаты, как указано при оформлении заказа.","description3":"Все продажи являются окончательными, если не указано иное. Возвраты регулируются нашей политикой возврата."},"shippingAndDelivery":{"title":"Доставка","description1":"Мы приложим все усилия, чтобы отправить ваш заказ в указанные сроки. Однако сроки доставки являются приблизительными и не гарантируются.","description2":"Риск потери и право собственности на товары, приобретенные у нас, переходят к вам при доставке перевозчику. Вы несете ответственность за подачу любых претензий к перевозчикам по поводу поврежденных или потерянных отправлений."},"returnsAndRefunds":{"title":"Возвраты и возмещения","description1":"Наша политика возврата подробно описана на нашей странице Возвраты. Совершая покупку, вы соглашаетесь с нашей политикой возврата.","description2":"Мы оставляем за собой право отказывать в возврате, который не соответствует требованиям нашей политики возврата."},"prohibitedUses":{"title":"Запрещенные виды использования","description":"Вы не можете использовать наш веб-сайт:","items":{"violate":"Любым способом, который нарушает любой применимый закон или правило","transmit":"Для передачи любого материала, который является оскорбительным, преследующим или иным образом неприемлемым","impersonate":"Для выдачи себя за компанию или любого сотрудника","infringe":"Любым способом, который нарушает права других","automated":"Для участия в любом автоматизированном использовании системы"}},"limitationOfLiability":{"title":"Ограничение ответственности","description":"Ни при каких обстоятельствах White-Shop или его поставщики не несут ответственности за любой ущерб (включая, без ограничения, ущерб от потери данных или прибыли или из-за прерывания бизнеса), возникающий в результате использования или невозможности использования материалов на нашем веб-сайте, даже если мы или уполномоченный представитель были уведомлены устно или письменно о возможности такого ущерба."},"revisionsAndErrata":{"title":"Исправления и опечатки","description":"Материалы, появляющиеся на нашем веб-сайте, могут включать технические, типографские или фотографические ошибки. Мы не гарантируем, что какие-либо материалы на нашем веб-сайте являются точными, полными или актуальными. Мы можем вносить изменения в материалы, содержащиеся на нашем веб-сайте, в любое время без уведомления."},"governingLaw":{"title":"Применимое право","description":"Эти условия регулируются и толкуются в соответствии с применимыми законами. Любые споры, связанные с этими условиями, подлежат исключительной юрисдикции судов в юрисдикции, где находится наш бизнес."},"contactInformation":{"title":"Контактная информация","description":"Если у вас есть вопросы об этих Условиях использования, пожалуйста, свяжитесь с нами по адресу:"}});}),
"[project]/apps/web/locales/ru/privacy.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Политика конфиденциальности","lastUpdated":"Последнее обновление:","introduction":{"title":"Введение","description1":"В White-Shop мы стремимся защищать вашу конфиденциальность. Эта Политика конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию, когда вы посещаете наш веб-сайт и используете наши услуги.","description2":"Пожалуйста, внимательно прочитайте эту политику конфиденциальности. Если вы не согласны с условиями этой политики конфиденциальности, пожалуйста, не заходите на сайт."},"informationWeCollect":{"title":"Информация, которую мы собираем","personalInformation":{"title":"Личная информация","description":"Мы можем собирать личную информацию, которую вы добровольно предоставляете нам, когда вы:","items":{"register":"Регистрируетесь для создания аккаунта","order":"Размещаете заказ","newsletter":"Подписываетесь на нашу рассылку","contact":"Связываетесь с нами для поддержки клиентов","surveys":"Участвуете в опросах или акциях"},"details":"Эта информация может включать ваше имя, адрес электронной почты, номер телефона, адрес доставки, адрес для выставления счетов и платежную информацию."},"automaticallyCollected":{"title":"Автоматически собираемая информация","description":"Когда вы посещаете наш веб-сайт, мы автоматически собираем определенную информацию о вашем устройстве, включая информацию о вашем веб-браузере, IP-адресе, часовом поясе и некоторых файлах cookie, которые установлены на вашем устройстве."}},"howWeUse":{"title":"Как мы используем вашу информацию","description":"Мы используем собранную информацию для:","items":{"process":"Обработки и выполнения ваших заказов","confirmations":"Отправки вам подтверждений заказов и обновлений","support":"Ответа на ваши запросы службы поддержки клиентов","marketing":"Отправки вам маркетинговых сообщений (с вашего согласия)","improve":"Улучшения нашего веб-сайта и услуг","fraud":"Обнаружения и предотвращения мошенничества","legal":"Соблюдения юридических обязательств"}},"informationSharing":{"title":"Обмен информацией и раскрытие","description":"Мы не продаем, не обмениваем и не сдаем в аренду вашу личную информацию третьим лицам. Мы можем делиться вашей информацией только в следующих обстоятельствах:","items":{"providers":"С поставщиками услуг, которые помогают нам в работе нашего веб-сайта и ведении нашего бизнеса","law":"Когда требуется по закону или для защиты наших прав","transfer":"В связи с передачей бизнеса или слиянием","consent":"С вашего явного согласия"}},"dataSecurity":{"title":"Безопасность данных","description":"Мы применяем соответствующие технические и организационные меры безопасности для защиты вашей личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения. Однако ни один метод передачи через Интернет или электронного хранения не является на 100% безопасным."},"yourRights":{"title":"Ваши права","description":"Вы имеете право:","items":{"access":"Получать доступ к вашей личной информации","correct":"Исправлять неточную информацию","delete":"Запрашивать удаление вашей информации","object":"Возражать против обработки вашей информации","portability":"Запрашивать переносимость данных","withdraw":"Отозвать согласие в любое время"}},"cookies":{"title":"Файлы cookie","description1":"Мы используем файлы cookie и аналогичные технологии отслеживания для отслеживания активности на нашем веб-сайте и хранения определенной информации. Вы можете настроить свой браузер, чтобы он отклонял все файлы cookie или указывал, когда отправляется файл cookie.","description2":"Для получения дополнительной информации о нашем использовании файлов cookie, пожалуйста, см. нашу","linkText":"Политику использования файлов cookie"},"contact":{"title":"Свяжитесь с нами","description":"Если у вас есть вопросы об этой Политике конфиденциальности, пожалуйста, свяжитесь с нами по адресу:"}});}),
"[project]/apps/web/locales/ru/support.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Служба поддержки клиентов","description":"Мы здесь, чтобы помочь! Выберите лучший способ связаться с нами.","contactUs":{"title":"Свяжитесь с нами","email":"Электронная почта","phone":"Телефон","businessHours":"Часы работы","hours":{"weekdays":"Понедельник - Пятница: 9:00 - 18:00","saturday":"Суббота: 10:00 - 16:00","sunday":"Воскресенье: Выходной"}},"quickLinks":{"title":"Быстрые ссылки","faq":"Часто задаваемые вопросы →","delivery":"Информация о доставке и возврате →","returns":"Политика возврата →","contact":"Форма обратной связи →"},"sendMessage":{"title":"Отправьте нам сообщение","form":{"name":"Имя","namePlaceholder":"Ваше имя","email":"Электронная почта","emailPlaceholder":"your@email.com","subject":"Тема","subjectPlaceholder":"С чем мы можем помочь?","message":"Сообщение","messagePlaceholder":"Пожалуйста, опишите вашу проблему или вопрос...","submit":"Отправить сообщение"}},"commonTopics":{"title":"Общие темы поддержки","orderIssues":{"title":"Проблемы с заказом","items":{"tracking":"Отслеживание заказа","cancellation":"Отмена заказа","modification":"Изменение заказа","missing":"Отсутствующие товары"}},"accountHelp":{"title":"Помощь с аккаунтом","items":{"password":"Сброс пароля","settings":"Настройки аккаунта","history":"История заказов","profile":"Обновления профиля"}},"paymentBilling":{"title":"Оплата и выставление счетов","items":{"methods":"Способы оплаты","refund":"Статус возврата","billing":"Вопросы по счетам","issues":"Проблемы с оплатой"}},"productQuestions":{"title":"Вопросы о товарах","items":{"availability":"Наличие товара","specifications":"Характеристики товара","size":"Таблицы размеров","warranty":"Информация о гарантии"}}}});}),
"[project]/apps/web/locales/ru/stores.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Наши магазины","description":"Посетите нас в любом из наших мест. Наш дружелюбный персонал готов помочь вам найти именно то, что вы ищете.","getDirections":"Проложить маршрут","cantFind":{"title":"Не можете найти то, что ищете?","description":"Свяжитесь с нами, и мы поможем вам найти идеальный товар.","contactUs":"Связаться с нами"}});}),
"[project]/apps/web/locales/ru/returns.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Возвраты и возмещения","returnPolicy":{"title":"Политика возврата 30 дней","description":"У вас есть 30 дней с даты покупки, чтобы вернуть товары в их первоначальном состоянии с прикрепленными бирками."},"returnConditions":{"title":"Условия возврата","items":{"unworn":"Товары должны быть неношеными, нестиранными и в оригинальной упаковке","tags":"Все бирки и этикетки должны быть прикреплены","saleable":"Товары должны быть в пригодном для продажи состоянии","proof":"Требуется подтверждение покупки"}},"howToReturn":{"title":"Как вернуть","steps":{"contact":"Свяжитесь с нашей службой поддержки клиентов, чтобы инициировать возврат","authorization":"Получите номер авторизации возврата","package":"Упакуйте товары надежно с формой возврата","ship":"Отправьте посылку на наш адрес возврата","process":"После получения мы обработаем ваш возврат в течение 5-7 рабочих дней"}},"refundProcess":{"title":"Процесс возврата","description":"Возвраты будут обработаны на исходный способ оплаты. Пожалуйста, подождите 5-7 рабочих дней, чтобы возврат появился на вашем счете."},"nonReturnable":{"title":"Товары, не подлежащие возврату","items":{"personalized":"Персонализированные или изготовленные на заказ товары","packaging":"Товары без оригинальной упаковки","damaged":"Товары, поврежденные из-за неправильного использования","sale":"Товары со скидкой (если не дефектные)"}},"needMoreInfo":{"title":"Нужна дополнительная информация?","description1":"Для подробной информации о доставке и возврате посетите нашу","deliveryLink":"страницу Доставка и возврат","description2":"Если у вас есть вопросы, пожалуйста","contactLink":"свяжитесь с нашей службой поддержки"}});}),
"[project]/apps/web/locales/ru/refund-policy.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Политика возврата","lastUpdated":"Последнее обновление:","overview":{"title":"Обзор","description":"Мы хотим, чтобы вы были довольны каждой покупкой. Эта политика объясняет, как работают возвраты и возмещения, включая сроки и требования к соответствию."},"eligibility":{"title":"Право на возврат","description":"Чтобы иметь право на возврат, убедитесь, что:","items":{"condition":"Товар не использовался, в оригинальном состоянии и в оригинальной упаковке.","timeline":"Запрос на возврат подается в течение 14 дней с момента доставки, если не указано иное.","proof":"Предоставлено подтверждение покупки (номер заказа или чек).","excluded":"Товары, помеченные как окончательная распродажа или не подлежащие возврату, исключены."}},"howToInitiate":{"title":"Как инициировать возврат","steps":{"contact":"Свяжитесь с нашей службой поддержки с номером вашего заказа и причиной возврата.","authorization":"Получите авторизацию возврата и инструкции.","ship":"Отправьте товар отслеживаемым способом; включите все оригинальные аксессуары и бирки."},"description":"После получения и проверки товара мы подтвердим одобрение или отклонение возврата."},"refundMethod":{"title":"Способ возврата и сроки","items":{"method":"Одобренные возвраты выдаются на исходный способ оплаты.","timing":"Время обработки обычно составляет 5–10 рабочих дней после одобрения; сроки банка могут различаться.","shipping":"Сборы за доставку не возвращаются, если возврат не связан с нашей ошибкой или дефектным товаром."}},"nonRefundable":{"title":"Товары, не подлежащие возврату","items":{"giftCards":"Подарочные карты и цифровые товары после доставки.","personalized":"Персонализированные или изготовленные на заказ товары, если не дефектные.","unauthorized":"Товары, возвращенные без предварительной авторизации.","condition":"Товары не в оригинальном состоянии, поврежденные или с отсутствующими частями по причинам, не связанным с нашей ошибкой."}},"contact":{"title":"Свяжитесь с нами","description":"По вопросам о Политике возврата или для начала возврата напишите нам по адресу"}});}),
"[project]/apps/web/locales/ru/profile.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Мой профиль","subtitle":"Управляйте информацией о вашем аккаунте и настройками","myProfile":"Мой профиль","tabs":{"dashboard":"Панель управления","personal":"Личная информация","addresses":"Адреса","password":"Изменить пароль","orders":"Заказы"},"dashboard":{"loading":"Загрузка панели управления...","totalOrders":"Всего заказов","totalSpent":"Всего потрачено","pendingOrders":"Ожидающие заказы","savedAddresses":"Сохраненные адреса","recentOrders":"Недавние заказы","viewAll":"Показать все","noOrders":"Вы еще не сделали ни одного заказа","startShopping":"Начать покупки","orderStatus":"Статус заказа","paymentStatus":"Статус оплаты","items":"товар","itemsPlural":"товаров","placedOn":"Размещен","viewDetails":"Показать детали →","quickActions":"Быстрые действия","viewAllOrders":"Показать все заказы","manageAddresses":"Управление адресами","continueShopping":"Продолжить покупки","failedToLoad":"Не удалось загрузить данные панели управления"},"personal":{"title":"Личная информация","firstName":"Имя","lastName":"Фамилия","email":"Email","phone":"Телефон","save":"Сохранить изменения","saving":"Сохранение...","updatedSuccess":"Личная информация успешно обновлена","failedToUpdate":"Не удалось обновить личную информацию","failedToLoad":"Не удалось загрузить профиль","firstNamePlaceholder":"Иван","lastNamePlaceholder":"Иванов","emailPlaceholder":"your@email.com","phonePlaceholder":"+374 XX XXX XXX","cancel":"Отмена"},"addresses":{"title":"Сохраненные адреса","addNew":"Добавить новый адрес","edit":"Редактировать","delete":"Удалить","setDefault":"Установить по умолчанию","default":"По умолчанию","noAddresses":"Адреса еще не сохранены","addFirst":"Добавьте свой первый адрес, чтобы начать","country":"Страна","countryArmenia":"Армения","countryUS":"Соединенные Штаты","countryRU":"Россия","countryGE":"Грузия","form":{"title":"Форма адреса","addTitle":"Добавить новый адрес","editTitle":"Редактировать адрес","firstName":"Имя","lastName":"Фамилия","company":"Компания (необязательно)","addressLine1":"Адрес строка 1","addressLine2":"Адрес строка 2 (необязательно)","city":"Город","state":"Область/Провинция (необязательно)","postalCode":"Почтовый индекс","phone":"Номер телефона","isDefault":"Установить как адрес по умолчанию","save":"Сохранить адрес","update":"Обновить адрес","add":"Добавить адрес","cancel":"Отмена","saving":"Сохранение..."},"updatedSuccess":"Адрес успешно обновлен","addedSuccess":"Адрес успешно добавлен","deletedSuccess":"Адрес успешно удален","defaultUpdatedSuccess":"Адрес по умолчанию успешно обновлен","failedToSave":"Не удалось сохранить адрес","failedToDelete":"Не удалось удалить адрес","failedToSetDefault":"Не удалось установить адрес по умолчанию","deleteConfirm":"Вы уверены, что хотите удалить этот адрес?"},"password":{"title":"Изменить пароль","currentPassword":"Текущий пароль","newPassword":"Новый пароль","confirmPassword":"Подтвердите новый пароль","change":"Изменить пароль","changing":"Изменение пароля...","changedSuccess":"Пароль успешно изменен","failedToChange":"Не удалось изменить пароль","passwordsDoNotMatch":"Новые пароли не совпадают","passwordMinLength":"Пароль должен содержать не менее 6 символов","currentPasswordPlaceholder":"Введите текущий пароль","newPasswordPlaceholder":"Введите новый пароль (мин. 6 символов)","confirmPasswordPlaceholder":"Подтвердите новый пароль"},"orders":{"title":"Мои заказы","loading":"Загрузка заказов...","noOrders":"Заказы не найдены","failedToLoad":"Не удалось загрузить заказы","orderNumber":"Заказ #","status":"Статус","paymentStatus":"Статус оплаты","total":"Итого","date":"Дата","viewDetails":"Показать детали","reorder":"Повторить заказ","reordering":"Повторение заказа...","reorderSuccess":"Товары успешно добавлены в корзину","reorderFailed":"Не удалось добавить товары в корзину","page":"Страница","of":"из","totalOrders":"всего заказов","previous":"Предыдущая","next":"Следующая","item":"товар","items":"товаров"},"orderDetails":{"title":"Заказ #","placedOn":"Размещен","reorder":"Повторить заказ","adding":"Добавление...","close":"Закрыть","loading":"Загрузка деталей заказа...","failedToLoad":"Не удалось загрузить детали заказа","orderStatus":"Статус заказа","payment":"Оплата","orderItems":"Товары заказа","orderSummary":"Сводка заказа","subtotal":"Промежуточный итог","discount":"Скидка","shipping":"Доставка","tax":"Налог","total":"Итого","loadingTotals":"Загрузка итогов...","shippingMethod":"Способ доставки","method":"Способ","delivery":"Доставка","pickup":"Самовывоз","notSpecified":"Не указано","deliveryAddress":"Адрес доставки","phone":"Телефон","color":"Цвет","size":"Размер","quantity":"Количество","sku":"Артикул","itemsAdded":"товар(ов) добавлено в корзину","skipped":"пропущено","failedToAdd":"Не удалось добавить товары в корзину. Пожалуйста, попробуйте снова."},"common":{"loading":"Загрузка профиля...","loadingProfile":"Загрузка профиля..."}});}),
"[project]/apps/web/locales/ru/checkout.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Оформление заказа","contactInformation":"Контактная информация","shippingMethod":"Способ доставки","shippingAddress":"Адрес доставки","paymentMethod":"Способ оплаты","orderSummary":"Итоги заказа","form":{"firstName":"Имя","lastName":"Фамилия","email":"Электронная почта","phone":"Телефон","address":"Адрес","city":"Город","postalCode":"Почтовый индекс","phoneNumber":"Номер телефона","cardNumber":"Номер карты","expiryDate":"Срок действия","cvv":"CVV","cardHolderName":"Имя держателя карты"},"placeholders":{"phone":"+374XXXXXXXX","address":"Улица, квартира, офис и т.д.","city":"Город","postalCode":"Почтовый индекс","cardNumber":"1234 5678 9012 3456","expiryDate":"ММ/ГГ","cvv":"123","cardHolderName":"Иван Иванов"},"shipping":{"storePickup":"Самовывоз","storePickupDescription":"Заберите ваш заказ из нашего магазина (Бесплатно)","delivery":"Доставка","deliveryDescription":"Мы доставим ваш заказ по вашему адресу","freePickup":"Бесплатно (Самовывоз)","loading":"Загрузка...","enterCity":"Введите город"},"payment":{"cashOnDelivery":"Наложенный платеж","cashOnDeliveryDescription":"Оплатите наличными при получении заказа","idram":"Idram","idramDescription":"Оплатите кошельком Idram или картой","arca":"ArCa","arcaDescription":"Оплатите картой ArCa","paymentDetails":"Детали оплаты","enterCardDetails":"Введите данные вашей карты для завершения оплаты"},"summary":{"items":"Товары","subtotal":"Промежуточный итог","shipping":"Доставка","tax":"Налог","total":"Итого"},"buttons":{"placeOrder":"Оформить заказ","processing":"Обработка...","continueToPayment":"Перейти к оплате","continueShopping":"Продолжить покупки","cancel":"Отмена"},"modals":{"completeOrder":"Завершите ваш заказ","confirmOrder":"Подтвердить заказ","cardDetails":"Данные карты {method}","closeModal":"Закрыть окно"},"messages":{"cashOnDeliveryInfo":"Наложенный платеж: Вы заплатите наличными при получении заказа. Данные карты не требуются.","cashOnDeliveryPickup":"Наложенный платеж: Вы заплатите наличными при самовывозе заказа. Данные карты не требуются.","storePickupInfo":"Самовывоз: Вы заберете ваш заказ из нашего магазина. Доставка бесплатна."},"errors":{"firstNameRequired":"Имя обязательно","lastNameRequired":"Фамилия обязательна","emailRequired":"Электронная почта обязательна","invalidEmail":"Неверный адрес электронной почты","phoneRequired":"Телефон обязателен","invalidPhone":"Неверный номер телефона","selectShippingMethod":"Пожалуйста, выберите способ доставки","selectPaymentMethod":"Пожалуйста, выберите способ оплаты","addressRequired":"Адрес обязателен для доставки","cityRequired":"Город обязателен для доставки","postalCodeRequired":"Почтовый индекс обязателен для доставки","phoneRequiredDelivery":"Номер телефона обязателен для доставки","invalidPhoneFormat":"Неверный формат номера телефона","cardNumberRequired":"Номер карты обязателен","cardExpiryRequired":"Срок действия карты обязателен","cvvRequired":"CVV обязателен","cardHolderNameRequired":"Имя держателя карты обязательно","fillShippingAddress":"Пожалуйста, заполните все поля адреса доставки","cartEmpty":"Корзина пуста","failedToLoadCart":"Не удалось загрузить корзину","failedToCreateOrder":"Не удалось создать заказ. Пожалуйста, попробуйте снова."}});}),
"[project]/apps/web/locales/ru/register.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Создать аккаунт","subtitle":"Зарегистрируйтесь, чтобы начать свои покупки","form":{"firstName":"Имя","lastName":"Фамилия","email":"Электронная почта","phone":"Телефон (необязательно, если указан email)","password":"Пароль","confirmPassword":"Подтвердите пароль","acceptTerms":"Я согласен с","termsOfService":"Условиями использования","and":"и","privacyPolicy":"Политикой конфиденциальности","createAccount":"Создать аккаунт","creatingAccount":"Создание аккаунта...","alreadyHaveAccount":"Уже есть аккаунт?","signIn":"Войти"},"placeholders":{"firstName":"Иван","lastName":"Иванов","email":"your@email.com","phone":"+374 XX XXX XXX","password":"••••••••","confirmPassword":"••••••••"},"errors":{"acceptTerms":"Пожалуйста, примите Условия использования и Политику конфиденциальности","mustAcceptTerms":"Вы должны принять условия, чтобы продолжить","emailOrPhoneRequired":"Пожалуйста, укажите email или номер телефона","passwordRequired":"Пожалуйста, введите пароль","passwordMinLength":"Пароль должен содержать не менее 6 символов","passwordsDoNotMatch":"Пароли не совпадают","registrationFailed":"Регистрация не удалась. Пожалуйста, попробуйте снова."},"passwordHint":"Должно быть не менее 6 символов"});}),
"[project]/apps/web/locales/ru/categories.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"Категории","description":"Выберите категории товаров, чтобы найти то, что вы ищете.","loading":"Загрузка категорий...","empty":"Категории не найдены","productsCount":"товаров"});}),
"[project]/apps/web/locales/ru/orders.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"notFound":{"title":"Заказ не найден","description":"Заказ, который вы ищете, не существует."},"title":"Заказ #{number}","placedOn":"Размещен {date}","orderStatus":{"title":"Статус заказа","payment":"Оплата: {status}","fulfillment":"Выполнение: {status}"},"orderItems":{"title":"Товары заказа"},"shippingAddress":{"title":"Адрес доставки","phone":"Телефон: {phone}"},"orderSummary":{"title":"Итоги заказа","subtotal":"Промежуточный итог","discount":"Скидка","shipping":"Доставка","tax":"Налог","total":"Итого","loadingTotals":"Загрузка итогов..."},"buttons":{"continueShopping":"Продолжить покупки","viewCart":"Посмотреть корзину"},"itemDetails":{"color":"Цвет:","size":"Размер:","sku":"Артикул: {sku}","quantity":"Количество: {qty} × {price} = {total}"}});}),
"[project]/apps/web/locales/ru/admin.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"menu\":{\"dashboard\":\"Панель управления\",\"orders\":\"Заказы\",\"products\":\"Товары\",\"categories\":\"Категории\",\"brands\":\"Бренды\",\"attributes\":\"Атрибуты\",\"discounts\":\"Скидки\",\"users\":\"Пользователи\",\"messages\":\"Сообщения\",\"analytics\":\"Аналитика\",\"filterByPrice\":\"Фильтр по цене\",\"delivery\":\"Доставка\",\"settings\":\"Настройки\"},\"dashboard\":{\"title\":\"Админ страница\",\"welcome\":\"Добро пожаловать, {name}!\",\"totalUsers\":\"пользователей\",\"totalProducts\":\"товаров\",\"lowStock\":\"{count} низкий запас\",\"totalOrders\":\"заказов\",\"pending\":\"{count} ожидает\",\"revenue\":\"Доход\",\"recentOrders\":\"Недавние заказы\",\"viewAll\":\"Показать все\",\"noRecentOrders\":\"Нет недавних заказов\",\"items\":\"{count} товар\",\"itemsPlural\":\"{count} товаров\",\"guest\":\"Гость\",\"topSellingProducts\":\"Топ продаваемых товаров\",\"noSalesData\":\"Пока нет данных о продажах\",\"sold\":\"{count} продано\",\"orders\":\"{count} заказов\",\"userActivity\":\"Активность пользователей\",\"recentRegistrations\":\"Недавние регистрации\",\"noRecentRegistrations\":\"Нет недавних регистраций\",\"mostActiveUsers\":\"Самые активные пользователи\",\"noActiveUsers\":\"Нет активных пользователей\",\"ordersCount\":\"{count} заказов\",\"noUserActivityData\":\"Нет данных об активности пользователей\",\"quickActions\":\"Быстрые действия\",\"addProduct\":\"Добавить товар\",\"createNewProduct\":\"Создать новый товар\",\"manageOrders\":\"Управление заказами\",\"viewAllOrders\":\"Просмотреть все заказы\",\"manageUsers\":\"Управление пользователями\",\"viewAllUsers\":\"Просмотреть всех пользователей\",\"settings\":\"Настройки\",\"configureSystem\":\"Настроить систему\",\"adminInformation\":\"Информация администратора\",\"email\":\"Email\",\"phone\":\"Телефон\",\"roles\":\"Роли\",\"userId\":\"ID пользователя\",\"na\":\"Н/Д\",\"customer\":\"клиент\"},\"analytics\":{\"title\":\"Аналитика\",\"subtitle\":\"Отслеживайте производительность и аналитику вашего бизнеса\",\"backToAdmin\":\"Вернуться в панель администратора\",\"timePeriod\":\"Временной период\",\"period\":\"Период\",\"today\":\"Сегодня\",\"last7Days\":\"Последние 7 дней\",\"last30Days\":\"Последние 30 дней\",\"lastYear\":\"Последний год\",\"customRange\":\"Произвольный диапазон\",\"startDate\":\"Дата начала\",\"endDate\":\"Дата окончания\",\"loadingAnalytics\":\"Загрузка аналитики...\",\"totalOrders\":\"Всего заказов\",\"totalRevenue\":\"Общий доход\",\"totalUsers\":\"Всего пользователей\",\"topSellingProducts\":\"Топ продаваемых товаров\",\"noSalesDataAvailable\":\"Нет данных о продажах\",\"sold\":\"продано\",\"orders\":\"заказов\",\"topCategories\":\"Топ категорий\",\"noCategoryDataAvailable\":\"Нет данных о категориях\",\"items\":\"товаров\",\"ordersByDay\":\"Заказы по дням\",\"dailyOrderTrends\":\"Ежедневные тренды заказов и доходов\",\"noDataAvailable\":\"Нет данных за этот период\",\"ordersLabel\":\"заказов\",\"revenue\":\"доход\",\"noAnalyticsData\":\"Нет данных аналитики\",\"errorLoading\":\"Не удалось загрузить данные аналитики\",\"apiNotFound\":\"Маршрут API аналитики не найден. Пожалуйста, проверьте, что маршрут API существует\",\"invalidResponse\":\"API вернул неверный ответ. Пожалуйста, проверьте логи сервера\",\"clickToViewAllOrders\":\"Нажмите, чтобы просмотреть все заказы\",\"clickToViewPaidOrders\":\"Нажмите, чтобы просмотреть оплаченные заказы\",\"totalRegisteredUsers\":\"Всего зарегистрированных пользователей\",\"skuLabel\":\"SKU\"},\"attributes\":{\"title\":\"Атрибуты\",\"subtitle\":\"Управление глобальными атрибутами товаров и их значениями\",\"addAttribute\":\"Добавить атрибут\",\"cancel\":\"Отмена\",\"createNewAttribute\":\"Создать новый атрибут\",\"name\":\"Название\",\"required\":\"*\",\"namePlaceholder\":\"например, Цвет, Размер, Материал\",\"keyAutoGenerated\":\"Ключ будет автоматически сгенерирован из названия (строчные буквы, без пробелов)\",\"createAttribute\":\"Создать атрибут\",\"noAttributes\":\"Пока нет атрибутов\",\"getStarted\":\"Начните с создания вашего первого атрибута\",\"loadingAttributes\":\"Загрузка атрибутов...\",\"filterable\":\"Фильтруемый\",\"values\":\"{count} значение\",\"valuesPlural\":\"{count} значений\",\"deleteAttribute\":\"Удалить атрибут\",\"addNewValue\":\"Добавить новое значение (например, Красный, Синий, Большой, Маленький)\",\"add\":\"Добавить\",\"adding\":\"Добавление...\",\"noValuesYet\":\"Пока нет значений. Добавьте первое значение выше.\",\"deleteValue\":\"Удалить значение\",\"deleteConfirm\":\"Вы уверены, что хотите удалить атрибут \\\"{name}\\\"? Это действие нельзя отменить.\",\"deleteValueConfirm\":\"Вы уверены, что хотите удалить значение \\\"{label}\\\"?\",\"createdSuccess\":\"Атрибут успешно создан\",\"deletedSuccess\":\"Атрибут успешно удален\",\"errorCreating\":\"Ошибка: {message}\",\"errorDeleting\":\"Ошибка: {message}\",\"errorAddingValue\":\"Ошибка: {message}\",\"errorDeletingValue\":\"Ошибка: {message}\",\"errorUpdatingValue\":\"Ошибка: {message}\",\"fillName\":\"Пожалуйста, заполните поле названия\",\"enterValue\":\"Пожалуйста, введите значение\",\"valueAlreadyExists\":\"Значение \\\"{value}\\\" уже существует для этого атрибута\",\"valueAddedSuccess\":\"Значение успешно добавлено\",\"valueDeletedSuccess\":\"Значение успешно удалено\",\"valueUpdatedSuccess\":\"Значение успешно обновлено\",\"failedToAddValue\":\"Не удалось добавить значение\",\"attributeNotFound\":\"Атрибут не найден\",\"configureValue\":\"Настроить\",\"editAttribute\":\"Редактировать атрибут\",\"nameUpdatedSuccess\":\"Название атрибута успешно обновлено\",\"saving\":\"Сохранение...\",\"save\":\"Сохранить\",\"valueModal\":{\"editValue\":\"Редактировать значение\",\"label\":\"Название\",\"labelPlaceholder\":\"Введите название значения\",\"colors\":\"Цвета\",\"image\":\"Изображение\",\"imagePreview\":\"Предпросмотр изображения\",\"uploadImage\":\"Загрузить изображение\",\"changeImage\":\"Изменить изображение\",\"removeImage\":\"Удалить изображение\",\"uploading\":\"Загрузка...\",\"saving\":\"Сохранение...\",\"save\":\"Сохранить\",\"cancel\":\"Отмена\",\"close\":\"Закрыть\",\"selectImageFile\":\"Пожалуйста, выберите файл изображения\",\"failedToProcessImage\":\"Не удалось обработать изображение\",\"failedToSave\":\"Не удалось сохранить значение\",\"selectedColors\":\"Выбранные цвета\",\"addColor\":\"Добавить цвет\",\"addCustomColor\":\"Добавить цвет\",\"hide\":\"Скрыть\",\"add\":\"Добавить\",\"removeColor\":\"Удалить цвет\"}},\"categories\":{\"title\":\"Категории\",\"backToAdmin\":\"Вернуться в панель администратора\",\"loadingCategories\":\"Загрузка категорий...\",\"noCategories\":\"Категории не найдены\",\"addCategory\":\"Добавить категорию\",\"editCategory\":\"Редактировать категорию\",\"createCategory\":\"Создать категорию\",\"updateCategory\":\"Обновить категорию\",\"categoryTitle\":\"Название категории\",\"categoryTitlePlaceholder\":\"Введите название категории\",\"parentCategory\":\"категория\",\"rootCategory\":\"Нет (Корневая категория)\",\"requiresSizes\":\"Эта категория требует размеры (например, одежда, обувь)\",\"titleRequired\":\"Пожалуйста, введите название категории\",\"creating\":\"Создание...\",\"updating\":\"Обновление...\",\"createdSuccess\":\"Категория успешно создана\",\"updatedSuccess\":\"Категория успешно обновлена\",\"errorCreating\":\"ошибка  создании категории\",\"errorUpdating\":\"Ошибка при обновлении категории\",\"deleteConfirm\":\"Вы уверены, что хотите удалить категорию \\\"{name}\\\"? Это действие нельзя отменить.\",\"deletedSuccess\":\"Категория успешно удалена\",\"errorDeleting\":\"Ошибка при удалении категории: {message}\",\"showingPage\":\"Показана страница {page} из {totalPages} (всего {total})\",\"previous\":\"Предыдущая\",\"next\":\"Следующая\"},\"delivery\":{\"title\":\"Доставка\",\"backToAdmin\":\"Вернуться в панель администратора\",\"deliveryPricesByLocation\":\"Цены доставки по местоположению\",\"addLocation\":\"Добавить местоположение\",\"noLocations\":\"Местоположения доставки не настроены. Нажмите \\\"Добавить местоположение\\\", чтобы начать.\",\"country\":\"Страна\",\"city\":\"Город\",\"price\":\"Цена (AMD)\",\"countryPlaceholder\":\"например, Армения\",\"cityPlaceholder\":\"например, Ереван\",\"pricePlaceholder\":\"1000\",\"deleteLocation\":\"Вы уверены, что хотите удалить это местоположение доставки?\",\"saveSettings\":\"Сохранить настройки\",\"saving\":\"Сохранение...\",\"cancel\":\"Отмена\",\"savedSuccess\":\"Настройки доставки успешно сохранены!\",\"errorSaving\":\"Ошибка: {message}\"},\"users\":{\"title\":\"Управление пользователями\",\"backToAdmin\":\"Вернуться в панель администратора\",\"searchPlaceholder\":\"Поиск по email, телефону, имени...\",\"search\":\"Поиск\",\"adminCustomer\":\"Админ / Клиент\",\"all\":\"Все\",\"admins\":\"Админы\",\"customers\":\"Клиенты\",\"loadingUsers\":\"Загрузка пользователей...\",\"noUsers\":\"Пользователи не найдены\",\"user\":\"Пользователь\",\"contact\":\"Контакт\",\"orders\":\"Заказы\",\"roles\":\"Роли\",\"status\":\"Статус\",\"created\":\"Создан\",\"selectAll\":\"Выбрать всех пользователей\",\"selectUser\":\"Выбрать пользователя {email}\",\"clickToActivate\":\"Нажмите, чтобы активировать пользователя\",\"clickToBlock\":\"Нажмите, чтобы заблокировать пользователя\",\"blocked\":\"заблокирован\",\"active\":\"активен\",\"userBlocked\":\"Пользователь \\\"{name}\\\" теперь заблокирован и не может войти!\",\"userActive\":\"Пользователь \\\"{name}\\\" теперь активен и может войти.\",\"errorUpdatingStatus\":\"Ошибка обновления статуса пользователя: {message}\",\"selectedUsers\":\"Выбрано {count} пользователей\",\"deleteSelected\":\"Удалить выбранные\",\"deleting\":\"Удаление...\",\"deleteConfirm\":\"Удалить {count} выбранных пользователей?\",\"bulkDeleteFinished\":\"Массовое удаление завершено. Успешно: {success}/{total}\",\"failedToDelete\":\"Не удалось удалить выбранных пользователей\",\"showingPage\":\"Показана страница {page} из {totalPages} ({total} всего)\",\"previous\":\"Предыдущая\",\"next\":\"Следующая\"},\"products\":{\"title\":\"Товары\",\"backToAdmin\":\"Вернуться в панель администратора\",\"searchPlaceholder\":\"Поиск по названию или slug...\",\"searchByTitleOrSlug\":\"Поиск по названию или slug\",\"search\":\"Поиск\",\"clearAll\":\"Очистить все\",\"filterByCategory\":\"Фильтр по категории\",\"allCategories\":\"Все категории\",\"loadingCategories\":\"Загрузка категорий...\",\"noCategoriesAvailable\":\"Категории недоступны\",\"searchBySku\":\"Поиск по SKU\",\"skuPlaceholder\":\"Введите код SKU...\",\"filterByStock\":\"Фильтр по наличию\",\"allProducts\":\"Все товары\",\"inStock\":\"В наличии\",\"outOfStock\":\"Нет в наличии\",\"selectedProducts\":\"Выбрано {count} товаров\",\"deleteSelected\":\"Удалить выбранные\",\"deleting\":\"Удаление...\",\"addNewProduct\":\"Добавить новый товар\",\"loadingProducts\":\"Загрузка товаров...\",\"noProducts\":\"Товары не найдены\",\"selectAll\":\"Выбрать все товары\",\"selectProduct\":\"Выбрать товар {title}\",\"product\":\"ТОВАР\",\"stock\":\"НАЛИЧИЕ\",\"price\":\"ЦЕНА\",\"status\":\"СТАТУС\",\"featured\":\"РЕКОМЕНДУЕМЫЕ\",\"created\":\"СОЗДАН\",\"actions\":\"ДЕЙСТВИЯ\",\"pcs\":\"шт\",\"published\":\"Опубликован\",\"draft\":\"Черновик\",\"clickToDraft\":\"Нажмите, чтобы переключиться на черновик\",\"clickToPublished\":\"Нажмите, чтобы переключиться на опубликованный\",\"clickToRemoveFeatured\":\"Нажмите, чтобы убрать из рекомендуемых\",\"clickToMarkFeatured\":\"Нажмите, чтобы отметить как рекомендуемый\",\"edit\":\"Редактировать\",\"delete\":\"Удалить\",\"deleteConfirm\":\"Вы уверены, что хотите удалить \\\"{title}\\\"? Это действие нельзя отменить.\",\"deletedSuccess\":\"Товар успешно удален\",\"errorDeleting\":\"Ошибка удаления товара: {message}\",\"productPublished\":\"Товар \\\"{title}\\\" теперь опубликован и виден!\",\"productDraft\":\"Товар \\\"{title}\\\" теперь в черновике и скрыт.\",\"errorUpdatingStatus\":\"Ошибка обновления статуса товара: {message}\",\"errorUpdatingFeatured\":\"Ошибка обновления статуса рекомендуемого: {message}\",\"bulkDeleteConfirm\":\"Удалить {count} выбранных товаров?\",\"bulkDeleteFinished\":\"Массовое удаление завершено. Успешно: {success}/{total}\",\"failedToDelete\":\"Не удалось удалить выбранные товары\",\"featuredToggleFinished\":\"Переключение рекомендуемых завершено. Успешно: {success}/{total}. Некоторые товары не удалось обновить.\",\"failedToUpdateFeatured\":\"Не удалось обновить статус рекомендуемых для товаров\",\"errorLoading\":\"Ошибка загрузки товаров: {message}\",\"showingPage\":\"Показана страница {page} из {totalPages} ({total} всего)\",\"previous\":\"Предыдущая\",\"next\":\"Следующая\",\"add\":{\"defaultColor\":\"По умолчанию\",\"productTitlePlaceholder\":\"Название товара\",\"productSlugPlaceholder\":\"товар-slug\",\"productDescriptionPlaceholder\":\"Описание товара (поддерживается HTML)\",\"enterNewCategoryName\":\"Введите название новой категории\",\"enterNewBrandName\":\"Введите название нового бренда\",\"percentagePlaceholder\":\"50 (будет автоматически обновлено)\",\"newProductLabel\":\"Новый товар\",\"colorHexPlaceholder\":\"#FF0000 или оставьте пустым для значения по умолчанию\",\"addLabelsHint\":\"Добавьте метки, такие как \\\"Новый товар\\\", \\\"Горячий\\\", \\\"Распродажа\\\" или процентные скидки, такие как \\\"50%\\\"\",\"noLabelsAdded\":\"Метки еще не добавлены\",\"removeImage\":\"Удалить изображение\",\"autoGenerated\":\"Автоматически сгенерировано\",\"mainProductImage\":\"Главное изображение товара\",\"uploadImage\":\"Загрузить изображение\",\"uploading\":\"Загрузка...\",\"backToAdmin\":\"Вернуться в панель администратора\",\"editProduct\":\"Редактировать товар\",\"addNewProduct\":\"Добавить новый товар\",\"basicInformation\":\"Основная информация\",\"productType\":\"Тип товара\",\"productTypeSimple\":\"Простой\",\"productTypeVariable\":\"Вариантный\",\"productTypeDescription\":\"Выберите тип товара: Простой (без вариантов) или Вариантный (с вариантами)\",\"title\":\"Название\",\"slug\":\"Slug\",\"description\":\"Описание\",\"categoriesAndBrands\":\"Категории и Бренды\",\"categories\":\"Категории\",\"selectMultiple\":\"(Выбрать несколько)\",\"selectExistingCategories\":\"Выбрать существующие категории\",\"addNewCategory\":\"Добавить новую категорию\",\"selectCategories\":\"Выбрать категории\",\"categorySelected\":\"{count} категория выбрана\",\"categoriesSelected\":\"{count} категорий выбрано\",\"brands\":\"Бренды\",\"selectExistingBrands\":\"Выбрать существующие бренды\",\"addNewBrand\":\"Добавить новый бренд\",\"selectBrands\":\"Выбрать бренды\",\"brandSelected\":\"{count} бренд выбран\",\"brandsSelected\":\"{count} брендов выбрано\",\"categoryRequiresSizes\":\"Эта категория требует размеры (например, одежда, обувь)\",\"productLabels\":\"Метки товара\",\"addLabel\":\"+ Добавить метку\",\"label\":\"Метка {index}\",\"remove\":\"Удалить\",\"type\":\"Тип\",\"value\":\"Значение\",\"position\":\"Позиция\",\"colorOptional\":\"Цвет (необязательно)\",\"textType\":\"Текст (Новый товар, Горячий, Распродажа и т.д.)\",\"percentageType\":\"Процент (50%, 30% и т.д.)\",\"topLeft\":\"Верхний левый\",\"topRight\":\"Верхний правый\",\"bottomLeft\":\"Нижний левый\",\"bottomRight\":\"Нижний правый\",\"hexColorHint\":\"Hex цветовой код (например, #FF0000) или оставьте пустым\",\"percentageAutoUpdateHint\":\"ⓘ Это значение будет автоматически обновлено на основе процентной скидки товара. Вы можете ввести любое число здесь в качестве заполнителя.\",\"attributes\":\"Атрибуты\",\"selectAttribute\":\"Выбрать атрибут:\",\"creating\":\"Создание...\",\"productVariants\":\"Варианты товара\",\"sku\":\"SKU:\",\"price\":\"Цена\",\"stock\":\"Наличие\",\"variantBuilder\":\"Конструктор вариантов\",\"selectAttributesForVariants\":\"Выбрать атрибуты\",\"selectAttributes\":\"Выбрать атрибуты\",\"selectAttributesDescription\":\"Выберите атрибуты для создания вариантов товара\",\"noAttributesAvailable\":\"Атрибуты недоступны\",\"attributeSelected\":\"{count} атрибут выбран\",\"attributesSelected\":\"{count} атрибутов выбрано\",\"valuesPlaceholder\":\"значения\",\"selectValues\":\"Выбрать\",\"generatedVariants\":\"Сгенерированные варианты\",\"applyPriceToAll\":\"Применить цену ко всем\",\"applyStockToAll\":\"Применить запас ко всем\",\"applySkuToAll\":\"Применить шаблон SKU ко всем\",\"variantsReady\":\"Варианты готовы\",\"addVariant\":\"Добавить\",\"image\":\"Изображение\",\"compareAtPrice\":\"Старая цена\",\"pricePlaceholder\":\"0.00\",\"quantity\":\"Количество\",\"quantityPlaceholder\":\"0\",\"publishing\":\"Публикация\",\"markAsFeatured\":\"Отметить как рекомендуемый (для вкладки главной страницы)\",\"updateProduct\":\"Обновить товар\",\"createProduct\":\"Создать товар\",\"updating\":\"Обновление...\",\"loadingProduct\":\"Загрузка товара...\",\"loading\":\"Загрузка...\",\"colorAttributeNotFound\":\"Атрибут цвета не найден\",\"colorNameRequired\":\"Название цвета обязательно\",\"colorAddedSuccess\":\"Цвет \\\"{name}\\\" успешно добавлен\",\"failedToAddColor\":\"Не удалось добавить цвет\",\"sizeAttributeNotFound\":\"Атрибут размера не найден\",\"sizeNameRequired\":\"Название размера обязательно\",\"sizeAddedSuccess\":\"Размер \\\"{name}\\\" успешно добавлен\",\"failedToAddSize\":\"Не удалось добавить размер\",\"brandCreatedSuccess\":\"Бренд \\\"{name}\\\" успешно создан\",\"categoryCreatedSuccess\":\"Категория \\\"{name}\\\" успешно создана\",\"categoryCreatedSuccessSizes\":\"Категория \\\"{name}\\\" успешно создана (размеры требуются)\",\"failedToProcessImages\":\"Не удалось обработать выбранные изображения\",\"failedToProcessImage\":\"Не удалось обработать выбранное изображение\",\"enterDefaultPrice\":\"Введите цену по умолчанию для всех вариантов:\",\"enterDefaultStock\":\"Введите наличие по умолчанию для всех вариантов:\",\"enterSkuPrefix\":\"Введите префикс SKU (будет добавлено -color-size, если применимо):\",\"actions\":\"Действия\",\"delete\":\"Удалить\",\"deleteVariant\":\"Удалить вариант\"}},\"settings\":{\"title\":\"Настройки\",\"backToAdmin\":\"Вернуться в панель администратора\",\"generalSettings\":\"Общие настройки\",\"siteName\":\"Название сайта\",\"siteDescription\":\"Описание сайта\",\"paymentSettings\":\"Настройки оплаты\",\"defaultCurrency\":\"Валюта по умолчанию\",\"amd\":\"AMD - Армянский драм\",\"usd\":\"USD - Доллар США\",\"eur\":\"EUR - Евро\",\"enableOnlinePayments\":\"Включить онлайн-платежи\",\"saveSettings\":\"Сохранить настройки\",\"saving\":\"Сохранение...\",\"cancel\":\"Отмена\",\"savedSuccess\":\"Настройки успешно сохранены!\",\"errorSaving\":\"Ошибка: {message}\",\"siteNamePlaceholder\":\"Мой магазин\",\"siteDescriptionPlaceholder\":\"Описание вашего магазина\",\"currencyRates\":\"Курсы валют\",\"currencyRatesDescription\":\"Установите курсы валют относительно USD. Эти курсы используются для конвертации цен товаров.\",\"baseCurrency\":\"Базовая валюта (всегда 1)\",\"rateToUSD\":\"Курс к USD (1 USD = указанное значение)\"},\"quickSettings\":{\"title\":\"Быстрые настройки\",\"subtitle\":\"Быстрые настройки и управление скидками\",\"quickSettingsTitle\":\"Быстрые настройки\",\"quickSettingsSubtitle\":\"Быстрые настройки и управление скидками\",\"globalDiscount\":\"Глобальная скидка\",\"forAllProducts\":\"Для всех товаров\",\"save\":\"Сохранить\",\"saving\":\"Сохранение...\",\"active\":\"Активно:\",\"discountApplied\":\"{percent}% скидка применяется ко всем товарам\",\"noGlobalDiscount\":\"Нет глобальной скидки. Введите процент (0-100), чтобы дать скидку на все товары\",\"cancel\":\"Отмена\",\"usefulInformation\":\"Полезная информация\",\"aboutDiscounts\":\"О скидках\",\"discountApplies\":\"Скидка применяется к ценам всех товаров\",\"discountExample\":\"Пример: 10% = все цены уменьшатся на 10%\",\"noDiscount\":\"0% = нет скидки, отображаются оригинальные цены\",\"changesApplied\":\"Изменения применяются немедленно\",\"moreSettings\":\"Больше настроек →\",\"categoryDiscounts\":\"Скидки по категориям\",\"categoryDiscountsSubtitle\":\"Применить скидки к каждому товару внутри категории\",\"loadingCategories\":\"Загрузка категорий...\",\"noCategories\":\"Категории не найдены\",\"parentCategoryId\":\"ID родительской категории: {id}\",\"rootCategory\":\"Корневая категория\",\"clear\":\"Очистить\",\"savedSuccess\":\"Скидки по категориям успешно сохранены!\",\"errorSaving\":\"Ошибка: {message}\",\"brandDiscounts\":\"Скидки по брендам\",\"brandDiscountsSubtitle\":\"Установить скидки для товаров определенного бренда\",\"loadingBrands\":\"Загрузка брендов...\",\"noBrands\":\"Бренды не найдены\",\"brandId\":\"ID бренда: {id}\",\"productDiscounts\":\"Скидки на товары\",\"productDiscountsSubtitle\":\"Установить индивидуальный процент скидки для каждого товара\",\"loadingProducts\":\"Загрузка товаров...\",\"noProducts\":\"Товары не найдены\",\"discountMustBeValid\":\"Скидка должна быть от 0 до 100\",\"productDiscountSaved\":\"Скидка на товар успешно сохранена!\",\"errorSavingProduct\":\"Ошибка: {message}\",\"untitledCategory\":\"Безымянная категория\",\"untitledBrand\":\"Безымянный бренд\"},\"priceFilter\":{\"title\":\"Настройки фильтра по цене\",\"subtitle\":\"Настроить диапазон цен по умолчанию и размер шага для фильтра страницы товаров\",\"backToAdmin\":\"Вернуться в панель администратора\",\"priceFilterDefaultRange\":\"Диапазон фильтра цен по умолчанию\",\"stepSizeDescription\":\"Установить размер шага по умолчанию для слайдера фильтра цен страницы товаров для каждой валюты.\",\"loadingSettings\":\"Загрузка настроек...\",\"stepSizeUsd\":\"Размер шага (USD)\",\"stepSizeAmd\":\"Размер шага (AMD)\",\"stepSizeRub\":\"Размер шага (RUB)\",\"stepSizeGel\":\"Размер шага (GEL)\",\"usdPlaceholder\":\"100\",\"amdPlaceholder\":\"5000\",\"rubPlaceholder\":\"500\",\"gelPlaceholder\":\"10\",\"howItWorks\":\"Как это работает:\",\"stepSizeControls\":\"Размер шага контролирует, как движется слайдер цен (например, 100 = приращения по 100)\",\"differentStepSizes\":\"Вы можете установить разные размеры шага для USD, AMD, RUB и GEL\",\"usersCanAdjust\":\"Пользователи все еще могут настроить полный диапазон, используя слайдер на странице товаров\",\"changesTakeEffect\":\"Изменения вступают в силу сразу после сохранения\",\"saveSettings\":\"Сохранить настройки\",\"saving\":\"Сохранение...\",\"clear\":\"Очистить\",\"savedSuccess\":\"Настройки фильтра цен успешно сохранены!\",\"errorSaving\":\"Ошибка: {message}\",\"minPriceInvalid\":\"Минимальная цена должна быть действительным положительным числом\",\"maxPriceInvalid\":\"Максимальная цена должна быть действительным положительным числом\",\"stepSizeInvalid\":\"{label} должно быть действительным положительным числом\",\"minMustBeLess\":\"Минимальная цена должна быть меньше максимальной цены\"},\"brands\":{\"title\":\"Бренды\",\"loading\":\"Загрузка брендов...\",\"noBrands\":\"Бренды не найдены\",\"addNew\":\"Добавить новый\",\"edit\":\"Редактировать\",\"delete\":\"Удалить\",\"editBrand\":\"Редактировать бренд\",\"addNewBrand\":\"Добавить новый бренд\",\"brandName\":\"Название бренда *\",\"enterBrandName\":\"Введите название бренда\",\"cancel\":\"Отмена\",\"create\":\"Создать\",\"update\":\"Обновить\",\"saving\":\"Сохранение...\",\"deleteConfirm\":\"Вы уверены, что хотите удалить бренд \\\"{name}\\\"? Это действие нельзя отменить.\",\"deletedSuccess\":\"Бренд успешно удален\",\"createdSuccess\":\"Бренд успешно создан\",\"updatedSuccess\":\"Бренд успешно обновлен\",\"nameRequired\":\"Название бренда обязательно\",\"errorDeleting\":\"Ошибка при удалении бренда:\",\"errorSaving\":\"Ошибка при сохранении бренда:\",\"unknownError\":\"Произошла неизвестная ошибка\",\"unknownErrorFallback\":\"Неизвестная ошибка\"},\"orders\":{\"title\":\"Просмотр заказов\",\"backToAdmin\":\"Вернуться в панель администратора\",\"loading\":\"Загрузка...\",\"loadingOrders\":\"Загрузка заказов...\",\"noOrders\":\"Заказы не найдены\",\"searchPlaceholder\":\"Поиск по номеру заказа, клиенту, email, телефону...\",\"allStatuses\":\"Все статусы\",\"allPaymentStatuses\":\"Все статусы оплаты\",\"pending\":\"Ожидает\",\"processing\":\"Обрабатывается\",\"completed\":\"Завершен\",\"cancelled\":\"Отменен\",\"paid\":\"Оплачен\",\"pendingPayment\":\"Ожидает оплаты\",\"failed\":\"Неудачно\",\"statusUpdated\":\"Статус успешно обновлен\",\"paymentStatusUpdated\":\"Статус оплаты успешно обновлен\",\"failedToUpdateStatus\":\"Не удалось обновить статус. Пожалуйста, попробуйте снова.\",\"failedToUpdatePaymentStatus\":\"Не удалось обновить статус оплаты. Пожалуйста, попробуйте снова.\",\"updating\":\"Обновление...\",\"selectedOrders\":\"Выбрано {count} заказов\",\"deleteSelected\":\"Удалить выбранные\",\"deleting\":\"Удаление...\",\"deleteConfirm\":\"Удалить {count} выбранных заказов?\",\"bulkDeleteFinished\":\"Массовое удаление завершено. Успешно: {success}/{total}\",\"bulkDeleteFailed\":\"Массовое удаление завершено. Успешно: {success}/{total}\\n\\nНеудачные заказы: {failed}\",\"failedToDelete\":\"Не удалось удалить выбранные заказы. Пожалуйста, попробуйте снова.\",\"orderNumber\":\"Заказ #\",\"customer\":\"Клиент\",\"status\":\"Статус\",\"payment\":\"Оплата\",\"total\":\"Итого\",\"items\":\"Товары\",\"date\":\"Дата\",\"unknownCustomer\":\"Неизвестный клиент\",\"viewOrderDetails\":\"Просмотр деталей заказа\",\"selectAllOrders\":\"Выбрать все заказы\",\"selectOrder\":\"Выбрать заказ {number}\",\"orderDetails\":{\"backToOrders\":\"Вернуться к заказам\",\"title\":\"Детали заказа\",\"loadingOrderDetails\":\"Загрузка деталей заказа...\",\"orderIdMissing\":\"ID заказа отсутствует в URL\",\"failedToLoad\":\"Не удалось загрузить детали заказа\",\"orderNotFound\":\"Заказ не найден.\",\"createdAt\":\"Создан\",\"updatedAt\":\"Обновлен\",\"summary\":\"Сводка\",\"orderNumber\":\"Заказ #:\",\"total\":\"Итого:\",\"status\":\"Статус:\",\"payment\":\"Оплата:\",\"customer\":\"Клиент\",\"shippingAddress\":\"Адрес доставки\",\"noShippingAddress\":\"Нет адреса доставки\",\"shippingMethod\":\"Способ доставки:\",\"pickup\":\"самовывоз\",\"paymentInfo\":\"Оплата\",\"method\":\"Метод:\",\"amount\":\"Сумма:\",\"card\":\"Карта:\",\"noPaymentInfo\":\"Нет информации об оплате\",\"items\":\"Товары\",\"product\":\"Товар\",\"sku\":\"SKU\",\"colorSize\":\"Цвет / Размер\",\"qty\":\"Кол-во\",\"price\":\"Цена\",\"totalCol\":\"Итого\",\"noItemsFound\":\"Товары для этого заказа не найдены\"},\"showingPage\":\"Показана страница {page} из {totalPages} ({total} всего)\",\"previous\":\"Предыдущая\",\"next\":\"Следующая\"},\"messages\":{\"title\":\"Сообщения\",\"backToAdmin\":\"Вернуться в панель администратора\",\"loadingMessages\":\"Загрузка сообщений...\",\"noMessages\":\"Сообщения не найдены\",\"name\":\"Имя\",\"email\":\"Электронная почта\",\"subject\":\"Тема\",\"message\":\"Сообщение\",\"date\":\"Дата\",\"selectAll\":\"Выбрать все\",\"selectMessage\":\"Выбрать сообщение {email}\",\"selectedMessages\":\"Выбрано {count} сообщений\",\"deleteSelected\":\"Удалить выбранные\",\"deleting\":\"Удаление...\",\"deleteConfirm\":\"Удалить {count} выбранных сообщений?\",\"deletedSuccess\":\"Сообщения успешно удалены\",\"failedToDelete\":\"Не удалось удалить сообщения\",\"showingPage\":\"Показана страница {page} из {totalPages} ({total} всего)\",\"previous\":\"Предыдущая\",\"next\":\"Следующая\"},\"common\":{\"loading\":\"Загрузка...\",\"error\":\"Ошибка\",\"success\":\"Успех\",\"cancel\":\"Отмена\",\"close\":\"Закрыть\",\"save\":\"Сохранить\",\"delete\":\"Удалить\",\"edit\":\"Редактировать\",\"create\":\"Создать\",\"update\":\"Обновить\",\"saving\":\"Сохранение...\",\"back\":\"Назад\",\"backToAdmin\":\"Вернуться в панель администратора\"}}"));}),
"[project]/apps/web/lib/i18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * i18n helper functions according to plan.md and structure.md
 * Server-side translation functions (can be used in Server Components)
 * For client-side React hooks, see i18n-client.ts
 */ __turbopack_context__.s([
    "clearTranslationCache",
    ()=>clearTranslationCache,
    "getAttributeLabel",
    ()=>getAttributeLabel,
    "getAvailableLanguages",
    ()=>getAvailableLanguages,
    "getAvailableNamespaces",
    ()=>getAvailableNamespaces,
    "getProductText",
    ()=>getProductText,
    "loadTranslation",
    ()=>loadTranslation,
    "t",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/language.ts [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../locales/en/common.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/home.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/product.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/products.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/attributes.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/delivery.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/about.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/contact.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/faq.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/login.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/cookies.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/delivery-terms.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/terms.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/privacy.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/support.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/stores.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/returns.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/refund-policy.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/profile.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/checkout.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/register.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/categories.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/orders.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../locales/en/admin.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/common.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$home$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/home.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$product$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/product.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$products$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/products.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$attributes$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/attributes.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$delivery$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/delivery.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$about$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/about.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$contact$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/contact.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$faq$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/faq.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$login$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/login.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$cookies$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/cookies.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$delivery$2d$terms$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/delivery-terms.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$terms$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/terms.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$privacy$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/privacy.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$support$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/support.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$stores$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/stores.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$returns$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/returns.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$refund$2d$policy$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/refund-policy.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$profile$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/profile.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$checkout$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/checkout.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$register$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/register.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$categories$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/categories.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$orders$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/orders.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$admin$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/admin.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/common.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$home$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/home.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$product$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/product.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$products$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/products.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$attributes$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/attributes.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$delivery$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/delivery.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$about$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/about.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$contact$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/contact.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$faq$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/faq.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$login$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/login.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$cookies$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/cookies.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$delivery$2d$terms$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/delivery-terms.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$terms$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/terms.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$privacy$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/privacy.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$support$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/support.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$stores$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/stores.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$returns$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/returns.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$refund$2d$policy$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/refund-policy.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$profile$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/profile.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$checkout$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/checkout.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$register$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/register.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$categories$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/categories.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$orders$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/orders.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$admin$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/admin.json (json)");
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
;
;
;
;
;
;
;
// Translation store - organized by language and namespace
// Supports en, hy, and ru languages
const translations = {
    en: {
        common: enCommon,
        home: enHome,
        product: enProduct,
        products: enProducts,
        attributes: enAttributes,
        delivery: enDelivery,
        about: enAbout,
        contact: enContact,
        faq: enFaq,
        login: enLogin,
        cookies: enCookies,
        'delivery-terms': enDeliveryTerms,
        terms: enTerms,
        privacy: enPrivacy,
        support: enSupport,
        stores: enStores,
        returns: enReturns,
        'refund-policy': enRefundPolicy,
        profile: enProfile,
        checkout: enCheckout,
        register: enRegister,
        categories: enCategories,
        orders: enOrders,
        admin: enAdmin
    },
    hy: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$common$2e$json__$28$json$29$__["default"],
        home: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$home$2e$json__$28$json$29$__["default"],
        product: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$product$2e$json__$28$json$29$__["default"],
        products: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$products$2e$json__$28$json$29$__["default"],
        attributes: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$attributes$2e$json__$28$json$29$__["default"],
        delivery: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$delivery$2e$json__$28$json$29$__["default"],
        about: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$about$2e$json__$28$json$29$__["default"],
        contact: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$contact$2e$json__$28$json$29$__["default"],
        faq: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$faq$2e$json__$28$json$29$__["default"],
        login: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$login$2e$json__$28$json$29$__["default"],
        cookies: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$cookies$2e$json__$28$json$29$__["default"],
        'delivery-terms': __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$delivery$2d$terms$2e$json__$28$json$29$__["default"],
        terms: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$terms$2e$json__$28$json$29$__["default"],
        privacy: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$privacy$2e$json__$28$json$29$__["default"],
        support: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$support$2e$json__$28$json$29$__["default"],
        stores: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$stores$2e$json__$28$json$29$__["default"],
        returns: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$returns$2e$json__$28$json$29$__["default"],
        'refund-policy': __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$refund$2d$policy$2e$json__$28$json$29$__["default"],
        profile: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$profile$2e$json__$28$json$29$__["default"],
        checkout: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$checkout$2e$json__$28$json$29$__["default"],
        register: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$register$2e$json__$28$json$29$__["default"],
        categories: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$categories$2e$json__$28$json$29$__["default"],
        orders: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$orders$2e$json__$28$json$29$__["default"],
        admin: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$admin$2e$json__$28$json$29$__["default"]
    },
    ru: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$common$2e$json__$28$json$29$__["default"],
        home: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$home$2e$json__$28$json$29$__["default"],
        product: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$product$2e$json__$28$json$29$__["default"],
        products: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$products$2e$json__$28$json$29$__["default"],
        attributes: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$attributes$2e$json__$28$json$29$__["default"],
        delivery: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$delivery$2e$json__$28$json$29$__["default"],
        about: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$about$2e$json__$28$json$29$__["default"],
        contact: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$contact$2e$json__$28$json$29$__["default"],
        faq: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$faq$2e$json__$28$json$29$__["default"],
        login: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$login$2e$json__$28$json$29$__["default"],
        cookies: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$cookies$2e$json__$28$json$29$__["default"],
        'delivery-terms': __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$delivery$2d$terms$2e$json__$28$json$29$__["default"],
        terms: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$terms$2e$json__$28$json$29$__["default"],
        privacy: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$privacy$2e$json__$28$json$29$__["default"],
        support: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$support$2e$json__$28$json$29$__["default"],
        stores: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$stores$2e$json__$28$json$29$__["default"],
        returns: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$returns$2e$json__$28$json$29$__["default"],
        'refund-policy': __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$refund$2d$policy$2e$json__$28$json$29$__["default"],
        profile: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$profile$2e$json__$28$json$29$__["default"],
        checkout: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$checkout$2e$json__$28$json$29$__["default"],
        register: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$register$2e$json__$28$json$29$__["default"],
        categories: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$categories$2e$json__$28$json$29$__["default"],
        orders: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$orders$2e$json__$28$json$29$__["default"],
        admin: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$admin$2e$json__$28$json$29$__["default"]
    }
};
// Cache for resolved translation paths (performance optimization)
const translationCache = new Map();
/**
 * Get nested value from object by path array
 * @param obj - Object to traverse
 * @param keys - Array of keys to navigate
 * @returns The value at the path or null
 */ function getNestedValue(obj, keys) {
    let current = obj;
    for (const key of keys){
        if (current && typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            return null;
        }
    }
    return current;
}
function loadTranslation(lang, namespace) {
    try {
        return translations[lang]?.[namespace] || null;
    } catch (error) {
        if ("TURBOPACK compile-time truthy", 1) {
            console.warn(`[i18n] Failed to load translation: ${lang}/${namespace}`, error);
        }
        return null;
    }
}
function t(lang, path) {
    // Validate path parameter
    if (!path || typeof path !== 'string') {
        if ("TURBOPACK compile-time truthy", 1) {
            console.warn(`[i18n] Invalid path parameter: ${path}. Expected a string.`);
        }
        return typeof path === 'string' ? path : '';
    }
    // Use stored language if not provided
    if (!lang) {
        lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])();
    }
    // Validate path format
    const parts = path.split('.');
    if (parts.length < 2) {
        if ("TURBOPACK compile-time truthy", 1) {
            console.warn(`[i18n] Invalid translation path: "${path}". Expected format: "namespace.key"`);
        }
        return path;
    }
    const namespace = parts[0];
    const keys = parts.slice(1);
    // Check cache first (performance optimization)
    const cacheKey = `${lang}:${path}`;
    if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey);
    }
    // Validate namespace
    const validNamespaces = [
        'common',
        'home',
        'product',
        'products',
        'attributes',
        'delivery',
        'about',
        'contact',
        'faq',
        'login',
        'cookies',
        'delivery-terms',
        'terms',
        'privacy',
        'support',
        'stores',
        'returns',
        'refund-policy',
        'profile',
        'checkout',
        'register',
        'categories',
        'orders',
        'admin'
    ];
    if (!validNamespaces.includes(namespace)) {
        if ("TURBOPACK compile-time truthy", 1) {
            console.warn(`[i18n] Invalid namespace: "${namespace}". Valid namespaces: ${validNamespaces.join(', ')}`);
        }
        return path;
    }
    // Try to load translation for the requested language
    let translationObj = loadTranslation(lang, namespace);
    // Fallback to English if translation not found
    if (!translationObj && lang !== 'en') {
        translationObj = loadTranslation('en', namespace);
    }
    if (!translationObj) {
        return path;
    }
    // Navigate through nested keys
    let value = getNestedValue(translationObj, keys);
    // If value not found in requested language, try English fallback
    if (value === null && lang !== 'en') {
        const enTranslationObj = loadTranslation('en', namespace);
        if (enTranslationObj) {
            value = getNestedValue(enTranslationObj, keys);
        }
    }
    // Return result - can be string or array
    if (value === null || value === undefined) {
        return path;
    }
    // For arrays, return as-is (don't cache)
    if (Array.isArray(value)) {
        return value;
    }
    const result = typeof value === 'string' ? value : path;
    // Cache the result (limit cache size to prevent memory issues)
    if (translationCache.size < 1000) {
        translationCache.set(cacheKey, result);
    }
    return result;
}
function getProductText(lang, productId, field) {
    // Use stored language if not provided
    if (!lang) {
        lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])();
    }
    // Validate productId
    if (!productId || typeof productId !== 'string') {
        if ("TURBOPACK compile-time truthy", 1) {
            console.warn(`[i18n] Invalid productId: ${productId}`);
        }
        return '';
    }
    try {
        // Try to load products for the requested language
        let products = loadTranslation(lang, 'products');
        // Fallback to English if not found
        if ((!products || typeof products !== 'object') && lang !== 'en') {
            products = loadTranslation('en', 'products');
        }
        if (!products || typeof products !== 'object') {
            return '';
        }
        // Get product data
        const product = products[productId];
        if (!product || typeof product !== 'object') {
            // Try English fallback
            if (lang !== 'en') {
                const enProducts1 = loadTranslation('en', 'products');
                if (enProducts1 && typeof enProducts1 === 'object' && productId in enProducts1) {
                    const enProduct1 = enProducts1[productId];
                    if (enProduct1 && typeof enProduct1 === 'object' && field in enProduct1) {
                        const value = enProduct1[field];
                        return typeof value === 'string' ? value : '';
                    }
                }
            }
            return '';
        }
        // Get field value
        if (field in product) {
            const value = product[field];
            if (typeof value === 'string') {
                return value;
            }
        }
        // Fallback to English
        if (lang !== 'en') {
            const enProducts1 = loadTranslation('en', 'products');
            if (enProducts1 && typeof enProducts1 === 'object' && productId in enProducts1) {
                const enProduct1 = enProducts1[productId];
                if (enProduct1 && typeof enProduct1 === 'object' && field in enProduct1) {
                    const value = enProduct1[field];
                    return typeof value === 'string' ? value : '';
                }
            }
        }
        return '';
    } catch (error) {
        if ("TURBOPACK compile-time truthy", 1) {
            console.warn(`[i18n] Failed to get product text: ${lang}/${productId}/${field}`, error);
        }
        return '';
    }
}
function getAttributeLabel(lang, type, value) {
    // Use stored language if not provided
    if (!lang) {
        lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])();
    }
    // Validate inputs
    if (!type || !value || typeof type !== 'string' || typeof value !== 'string') {
        return value || '';
    }
    // Normalize value (lowercase for case-insensitive lookup)
    const normalizedValue = value.toLowerCase().trim();
    try {
        // Try to load attributes for the requested language
        let attributes = loadTranslation(lang, 'attributes');
        // Fallback to English if not found
        if ((!attributes || typeof attributes !== 'object') && lang !== 'en') {
            attributes = loadTranslation('en', 'attributes');
        }
        if (!attributes || typeof attributes !== 'object') {
            return value;
        }
        // Get attribute type object
        if (type in attributes) {
            const typeObj = attributes[type];
            if (typeObj && typeof typeObj === 'object') {
                // Try exact match first
                if (normalizedValue in typeObj) {
                    const label = typeObj[normalizedValue];
                    if (typeof label === 'string') {
                        return label;
                    }
                }
                // Try case-insensitive match
                for (const [key, label] of Object.entries(typeObj)){
                    if (key.toLowerCase() === normalizedValue && typeof label === 'string') {
                        return label;
                    }
                }
            }
        }
        // Fallback to English
        if (lang !== 'en') {
            const enAttributes1 = loadTranslation('en', 'attributes');
            if (enAttributes1 && typeof enAttributes1 === 'object' && type in enAttributes1) {
                const enTypeObj = enAttributes1[type];
                if (enTypeObj && typeof enTypeObj === 'object') {
                    if (normalizedValue in enTypeObj) {
                        const label = enTypeObj[normalizedValue];
                        if (typeof label === 'string') {
                            return label;
                        }
                    }
                    // Try case-insensitive match
                    for (const [key, label] of Object.entries(enTypeObj)){
                        if (key.toLowerCase() === normalizedValue && typeof label === 'string') {
                            return label;
                        }
                    }
                }
            }
        }
        // Return original value if no translation found (graceful degradation)
        return value;
    } catch (error) {
        if ("TURBOPACK compile-time truthy", 1) {
            console.warn(`[i18n] Failed to get attribute label: ${lang}/${type}/${value}`, error);
        }
        return value;
    }
}
function clearTranslationCache() {
    translationCache.clear();
}
function getAvailableNamespaces() {
    return [
        'common',
        'home',
        'product',
        'products',
        'attributes',
        'delivery',
        'about',
        'contact',
        'faq',
        'login',
        'cookies',
        'delivery-terms',
        'terms',
        'privacy',
        'support',
        'stores',
        'returns',
        'refund-policy',
        'profile',
        'checkout',
        'register',
        'categories',
        'orders'
    ];
}
function getAvailableLanguages() {
    return [
        'en',
        'hy',
        'ru'
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/i18n-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTranslation",
    ()=>useTranslation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Client-side i18n React hook
 * This file contains React hooks that can only be used in Client Components
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/language.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n.ts [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../locales/en/common.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/hy/common.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/locales/ru/common.json (json)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const translations = {
    en: {
        common: enCommon
    },
    hy: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$hy$2f$common$2e$json__$28$json$29$__["default"]
    },
    ru: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$locales$2f$ru$2f$common$2e$json__$28$json$29$__["default"]
    }
};
function useTranslation() {
    _s();
    // Always start with 'en' to prevent hydration mismatch
    // The language will be updated after mount in useEffect
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    // Listen to language changes and update state reactively
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTranslation.useEffect": ()=>{
            // Update language on mount to ensure we have the latest from localStorage
            const updateLanguage = {
                "useTranslation.useEffect.updateLanguage": ()=>{
                    const storedLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])();
                    const newLang = storedLang && storedLang in translations ? storedLang : 'en';
                    setLang({
                        "useTranslation.useEffect.updateLanguage": (currentLang)=>{
                            if (newLang !== currentLang) {
                                // Clear translation cache when language changes
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearTranslationCache"])();
                                return newLang;
                            }
                            return currentLang;
                        }
                    }["useTranslation.useEffect.updateLanguage"]);
                }
            }["useTranslation.useEffect.updateLanguage"];
            // Update immediately on mount
            updateLanguage();
            // Listen to language-updated events
            const handleLanguageUpdate = {
                "useTranslation.useEffect.handleLanguageUpdate": ()=>{
                    updateLanguage();
                }
            }["useTranslation.useEffect.handleLanguageUpdate"];
            window.addEventListener('language-updated', handleLanguageUpdate);
            return ({
                "useTranslation.useEffect": ()=>{
                    window.removeEventListener('language-updated', handleLanguageUpdate);
                }
            })["useTranslation.useEffect"];
        }
    }["useTranslation.useEffect"], []); // Empty dependency array - only run on mount/unmount
    // Memoized translation function with validation
    const translate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTranslation.useCallback[translate]": (path)=>{
            if (!path || typeof path !== 'string') {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn('[i18n] useTranslation: Invalid path provided to t()', path);
                }
                return '';
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, path);
        }
    }["useTranslation.useCallback[translate]"], [
        lang
    ]);
    // Memoized product text getter
    const getProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTranslation.useCallback[getProduct]": (productId, field)=>{
            if (!productId || typeof productId !== 'string') {
                return '';
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductText"])(lang, productId, field);
        }
    }["useTranslation.useCallback[getProduct]"], [
        lang
    ]);
    // Memoized attribute label getter
    const getAttribute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTranslation.useCallback[getAttribute]": (type, value)=>{
            if (!type || !value || typeof type !== 'string' || typeof value !== 'string') {
                return value || '';
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAttributeLabel"])(lang, type, value);
        }
    }["useTranslation.useCallback[getAttribute]"], [
        lang
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useTranslation.useMemo": ()=>({
                t: translate,
                lang,
                getProductText: getProduct,
                getAttributeLabel: getAttribute
            })
    }["useTranslation.useMemo"], [
        translate,
        lang,
        getProduct,
        getAttribute
    ]);
}
_s(useTranslation, "XdVNg/NBPzizcxTv4kELYYo/oT0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/storageCounts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CART_KEY",
    ()=>CART_KEY,
    "COMPARE_KEY",
    ()=>COMPARE_KEY,
    "STORAGE_KEYS",
    ()=>STORAGE_KEYS,
    "WISHLIST_KEY",
    ()=>WISHLIST_KEY,
    "getCompareCount",
    ()=>getCompareCount,
    "getWishlistCount",
    ()=>getWishlistCount
]);
'use client';
const STORAGE_KEYS = {
    wishlist: 'shop_wishlist',
    compare: 'shop_compare',
    cart: 'shop_cart_guest'
};
const WISHLIST_KEY = STORAGE_KEYS.wishlist;
const COMPARE_KEY = STORAGE_KEYS.compare;
const CART_KEY = STORAGE_KEYS.cart;
/**
 * Returns the stored length for an array kept under the provided key.
 */ function getStoredArrayLength(key) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = window.localStorage.getItem(key);
        const parsed = stored ? JSON.parse(stored) : [];
        return Array.isArray(parsed) ? parsed.length : 0;
    } catch  {
        return 0;
    }
}
function getWishlistCount() {
    return getStoredArrayLength(WISHLIST_KEY);
}
function getCompareCount() {
    return getStoredArrayLength(COMPARE_KEY);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/LanguageSwitcherHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageSwitcherHeader",
    ()=>LanguageSwitcherHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/language.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const ChevronDownIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "10",
        height: "10",
        viewBox: "0 0 12 12",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3 4.5L6 7.5L9 4.5",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
            lineNumber: 9,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
        lineNumber: 8,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = ChevronDownIcon;
// Language icons/flags
const getLanguageIcon = (code)=>{
    const icons = {
        en: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1024px-Flag_of_the_United_Kingdom_%283-5%29.svg.png",
            alt: "English",
            width: 25,
            height: 25,
            className: "rounded",
            unoptimized: true
        }, void 0, false, {
            fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0)),
        hy: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "https://janarmenia.com/uploads/0000/83/2022/04/28/anthem-armenia.jpg",
            alt: "Armenian",
            width: 25,
            height: 25,
            className: "rounded",
            unoptimized: true
        }, void 0, false, {
            fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0)),
        ru: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "https://flagfactoryshop.com/image/cache/catalog/products/flags/national/mockups/russia_coa-600x400.jpg",
            alt: "Russian",
            width: 25,
            height: 25,
            className: "rounded",
            unoptimized: true
        }, void 0, false, {
            fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0)),
        ka: '🌐'
    };
    return icons[code] || '🌐';
};
// Language colors for better visual distinction
const getLanguageColor = (code, isActive)=>{
    if (isActive) {
        const colors = {
            en: 'bg-blue-50 border-blue-200',
            hy: 'bg-orange-50 border-orange-200',
            ru: 'bg-red-50 border-red-200',
            ka: 'bg-gray-100 border-gray-200'
        };
        return colors[code] || 'bg-gray-100 border-gray-200';
    }
    return 'bg-white border-transparent';
};
function LanguageSwitcherHeader() {
    _s();
    const [showMenu, setShowMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Start with 'en' to avoid hydration mismatch, then update in useEffect
    const [currentLang, setCurrentLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Update current language on mount and when it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageSwitcherHeader.useEffect": ()=>{
            // Update on mount to ensure we have the latest language from localStorage
            const storedLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])();
            // If stored language is 'ka' (Georgian), fallback to 'en' for header display
            const displayLang = storedLang === 'ka' ? 'en' : storedLang;
            // Only update if different to avoid unnecessary re-renders
            if (displayLang !== currentLang) {
                setCurrentLang(displayLang);
            }
            const handleLanguageUpdate = {
                "LanguageSwitcherHeader.useEffect.handleLanguageUpdate": ()=>{
                    const newLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])();
                    // If new language is 'ka' (Georgian), fallback to 'en' for header display
                    const displayLang = newLang === 'ka' ? 'en' : newLang;
                    setCurrentLang(displayLang);
                }
            }["LanguageSwitcherHeader.useEffect.handleLanguageUpdate"];
            window.addEventListener('language-updated', handleLanguageUpdate);
            return ({
                "LanguageSwitcherHeader.useEffect": ()=>{
                    window.removeEventListener('language-updated', handleLanguageUpdate);
                }
            })["LanguageSwitcherHeader.useEffect"];
        }
    }["LanguageSwitcherHeader.useEffect"], [
        currentLang
    ]); // Include currentLang to check for changes
    // Close menu when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageSwitcherHeader.useEffect": ()=>{
            const handleClickOutside = {
                "LanguageSwitcherHeader.useEffect.handleClickOutside": (event)=>{
                    if (menuRef.current && !menuRef.current.contains(event.target)) {
                        setShowMenu(false);
                    }
                }
            }["LanguageSwitcherHeader.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "LanguageSwitcherHeader.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["LanguageSwitcherHeader.useEffect"];
        }
    }["LanguageSwitcherHeader.useEffect"], []);
    /**
   * Switches the page language using our i18n system
   */ const changeLanguage = (langCode)=>{
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && currentLang !== langCode) {
            console.info('[LanguageSwitcher] Changing language', {
                from: currentLang,
                to: langCode
            });
            // Close menu first
            setShowMenu(false);
            // Immediately update the UI state to prevent showing 'en' during reload
            const displayLang = langCode === 'ka' ? 'en' : langCode;
            setCurrentLang(displayLang);
            // Update language - this will reload the page after a small delay
            // The delay ensures the UI state is updated before reload
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStoredLanguage"])(langCode);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: menuRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setShowMenu(!showMenu),
                "aria-expanded": showMenu,
                className: "flex items-center gap-1 sm:gap-2 bg-transparent md:bg-white px-2 sm:px-3 py-1.5 sm:py-2 text-gray-800 transition-colors",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center text-base sm:text-lg leading-none",
                        children: getLanguageIcon(currentLang)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs sm:text-sm font-medium",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGUAGES"][currentLang].name
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronDownIcon, {}, void 0, false, {
                        fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            showMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full right-0 mt-2 w-48 bg-white shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200",
                children: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGUAGES"]).filter((lang)=>lang.code !== 'ka') // Exclude Georgian (ka) from header
                .map((lang)=>{
                    const isActive = currentLang === lang.code;
                    const icon = getLanguageIcon(lang.code);
                    const colorClass = getLanguageColor(lang.code, isActive);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>changeLanguage(lang.code),
                        disabled: isActive,
                        className: `w-full text-left px-4 py-3 text-sm transition-all duration-150 border-l-4 ${isActive ? `${colorClass} text-gray-900 font-semibold cursor-default` : 'text-gray-700 hover:bg-gray-50 cursor-pointer border-transparent hover:border-gray-200'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl flex-shrink-0",
                                    children: icon
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
                                    lineNumber: 171,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: isActive ? 'font-semibold' : 'font-medium',
                                            children: lang.nativeName
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
                                            lineNumber: 173,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-xs ml-2 ${isActive ? 'text-gray-700 font-semibold' : 'text-gray-500'}`,
                                            children: lang.code.toUpperCase()
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
                                            lineNumber: 176,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
                                    lineNumber: 172,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
                            lineNumber: 170,
                            columnNumber: 17
                        }, this)
                    }, lang.code, false, {
                        fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
                        lineNumber: 160,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
                lineNumber: 151,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/LanguageSwitcherHeader.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_s(LanguageSwitcherHeader, "d4R99KQdzBA1TPKW+yXkXlL5q/A=");
_c1 = LanguageSwitcherHeader;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChevronDownIcon");
__turbopack_context__.k.register(_c1, "LanguageSwitcherHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/icons/CompareIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompareIcon",
    ()=>CompareIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shuffle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shuffle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shuffle.js [app-client] (ecmascript) <export default as Shuffle>");
'use client';
;
;
function CompareIcon({ size = 18, strokeWidth = 1.8, className = '', isActive = false }) {
    const resolvedClassName = `${className} ${isActive ? '' : ''}`.trim();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shuffle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shuffle$3e$__["Shuffle"], {
        size: size,
        strokeWidth: strokeWidth,
        className: resolvedClassName || undefined
    }, void 0, false, {
        fileName: "[project]/apps/web/components/icons/CompareIcon.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_c = CompareIcon;
var _c;
__turbopack_context__.k.register(_c, "CompareIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/icons/CartIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartIcon",
    ()=>CartIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
function CartIcon({ size = 20, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        src: "https://cdn-icons-png.flaticon.com/512/3081/3081986.png",
        alt: "Cart",
        width: size,
        height: size,
        className: className
    }, void 0, false, {
        fileName: "[project]/apps/web/components/icons/CartIcon.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = CartIcon;
var _c;
__turbopack_context__.k.register(_c, "CartIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/currency.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/auth/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$storageCounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/storageCounts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$LanguageSwitcherHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/LanguageSwitcherHeader.tsx [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../config/contact.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-client] (ecmascript) <export default as Linkedin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CompareIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/icons/CompareIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CartIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/icons/CartIcon.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
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
;
;
const socialLinks = contactData.social || {};
// Navigation links will be translated dynamically using useTranslation hook
const primaryNavLinks = [
    {
        href: '/',
        translationKey: 'common.navigation.home'
    },
    {
        href: '/categories',
        translationKey: 'common.navigation.products'
    },
    {
        href: '/about',
        translationKey: 'common.navigation.about'
    },
    {
        href: '/contact',
        translationKey: 'common.navigation.contact'
    }
];
// Icon Components
const ChevronDownIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "10",
        height: "10",
        viewBox: "0 0 12 12",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3 4.5L6 7.5L9 4.5",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/apps/web/components/Header.tsx",
            lineNumber: 50,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/web/components/Header.tsx",
        lineNumber: 49,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = ChevronDownIcon;
// Arrow icon for categories with subcategories (▶)
const ArrowRightIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "8",
        height: "8",
        viewBox: "0 0 8 8",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: "ml-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3 2L5 4L3 6",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/apps/web/components/Header.tsx",
            lineNumber: 57,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/web/components/Header.tsx",
        lineNumber: 56,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = ArrowRightIcon;
/**
 * Profile icon for logged out state (outline style)
 */ const ProfileIconOutline = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "19",
        height: "19",
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "10",
                cy: "7",
                r: "3.2",
                stroke: "currentColor",
                strokeWidth: "1.8",
                fill: "none"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 66,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 17C5 14.5 7.5 12.5 10 12.5C12.5 12.5 15 14.5 15 17",
                stroke: "currentColor",
                strokeWidth: "1.8",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 67,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/Header.tsx",
        lineNumber: 65,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = ProfileIconOutline;
/**
 * Profile icon for logged in state (filled style with background)
 */ const ProfileIconFilled = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-[19px] h-[19px] flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 77,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "19",
                height: "19",
                viewBox: "0 0 20 20",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "10",
                        cy: "7",
                        r: "3.2",
                        fill: "white"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/Header.tsx",
                        lineNumber: 87,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M5 17C5 14.5 7.5 12.5 10 12.5C12.5 12.5 15 14.5 15 17",
                        stroke: "white",
                        strokeWidth: "1.8",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/Header.tsx",
                        lineNumber: 88,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 79,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/Header.tsx",
        lineNumber: 75,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = ProfileIconFilled;
const WishlistIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "19",
        height: "19",
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M10 17L8.55 15.7C4.4 12.2 2 10.1 2 7.5C2 5.4 3.4 4 5.5 4C6.8 4 8.1 4.6 9 5.5C9.9 4.6 11.2 4 12.5 4C14.6 4 16 5.4 16 7.5C16 10.1 13.6 12.2 9.45 15.7L10 17Z",
            stroke: "currentColor",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none"
        }, void 0, false, {
            fileName: "[project]/apps/web/components/Header.tsx",
            lineNumber: 95,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/web/components/Header.tsx",
        lineNumber: 94,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = WishlistIcon;
const SearchIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "22",
        height: "22",
        viewBox: "0 0 22 22",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "10",
                cy: "10",
                r: "6.5",
                stroke: "currentColor",
                strokeWidth: "1.8",
                fill: "none"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 101,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M15.5 15.5L19 19",
                stroke: "currentColor",
                strokeWidth: "1.8",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 102,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/Header.tsx",
        lineNumber: 100,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c5 = SearchIcon;
const BadgeIcon = ({ icon, badge = 0, className = '', iconClassName = '' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: iconClassName,
                children: icon
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 115,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            badge > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "   absolute    -top-5    -right-5    bg-gradient-to-br from-red-500 to-red-600    text-white text-[10px] font-bold    rounded-full min-w-[20px] h-5 px-1.5    flex items-center justify-center    leading-none shadow-lg border-2 border-white    animate-pulse   ",
                children: badge > 99 ? '99+' : badge
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/Header.tsx",
        lineNumber: 114,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c6 = BadgeIcon;
/**
 * Component that syncs search params with state
 * Must be wrapped in Suspense because it uses useSearchParams()
 */ function HeaderSearchSync({ setSearchQuery, setSelectedCategory, categories }) {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeaderSearchSync.useEffect": ()=>{
            const searchParam = searchParams.get('search');
            const categoryParam = searchParams.get('category');
            setSearchQuery(searchParam || '');
            // Set selected category from URL
            if (categoryParam && categories.length > 0) {
                const flattenCategories = {
                    "HeaderSearchSync.useEffect.flattenCategories": (cats)=>{
                        const result = [];
                        cats.forEach({
                            "HeaderSearchSync.useEffect.flattenCategories": (cat)=>{
                                result.push(cat);
                                if (cat.children && cat.children.length > 0) {
                                    result.push(...flattenCategories(cat.children));
                                }
                            }
                        }["HeaderSearchSync.useEffect.flattenCategories"]);
                        return result;
                    }
                }["HeaderSearchSync.useEffect.flattenCategories"];
                const allCategories = flattenCategories(categories);
                const foundCategory = allCategories.find({
                    "HeaderSearchSync.useEffect.foundCategory": (cat)=>cat.slug === categoryParam
                }["HeaderSearchSync.useEffect.foundCategory"]);
                setSelectedCategory(foundCategory || null);
            } else {
                setSelectedCategory(null);
            }
        }
    }["HeaderSearchSync.useEffect"], [
        searchParams,
        categories,
        setSearchQuery,
        setSelectedCategory
    ]);
    return null;
}
_s(HeaderSearchSync, "wpYCjx3Iuh0YGg4csUQIo9F8Zhk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c7 = HeaderSearchSync;
/**
 * Category Menu Item Component with nested submenu support
 * Displays subcategories in a multi-column layout without scroll
 */ function CategoryMenuItem({ category, onClose }) {
    _s1();
    const [showSubmenu, setShowSubmenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submenuStyle, setSubmenuStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const submenuTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const submenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const menuItemRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasChildren = category.children && category.children.length > 0;
    const handleMouseEnter = ()=>{
        if (hasChildren) {
            if (submenuTimeoutRef.current) {
                clearTimeout(submenuTimeoutRef.current);
                submenuTimeoutRef.current = null;
            }
            setShowSubmenu(true);
        }
    };
    const handleMouseLeave = ()=>{
        if (hasChildren) {
            submenuTimeoutRef.current = setTimeout(()=>{
                setShowSubmenu(false);
            }, 150);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryMenuItem.useEffect": ()=>{
            return ({
                "CategoryMenuItem.useEffect": ()=>{
                    if (submenuTimeoutRef.current) {
                        clearTimeout(submenuTimeoutRef.current);
                    }
                }
            })["CategoryMenuItem.useEffect"];
        }
    }["CategoryMenuItem.useEffect"], []);
    // Calculate submenu position relative to Products dropdown
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryMenuItem.useEffect": ()=>{
            if (showSubmenu && submenuRef.current && menuItemRef.current) {
                const menuItem = menuItemRef.current;
                // Find Products dropdown container (parent with w-64 class)
                const productsDropdown = menuItem.closest('.w-64');
                if (productsDropdown) {
                    const dropdownRect = productsDropdown.getBoundingClientRect();
                    const viewportWidth = window.innerWidth;
                    // Position submenu to the right of Products dropdown, aligned higher than dropdown
                    const leftPosition = dropdownRect.width; // Right edge of Products dropdown
                    const topPosition = -12; // Move up a bit from top of dropdown
                    const maxWidth = Math.min(600, viewportWidth - dropdownRect.right - 20);
                    setSubmenuStyle({
                        left: `${leftPosition}px`,
                        top: `${topPosition}px`,
                        maxWidth: `${maxWidth}px`
                    });
                }
            }
        }
    }["CategoryMenuItem.useEffect"], [
        showSubmenu
    ]);
    // Organize subcategories into columns (4 columns max)
    // Distributes items evenly across columns
    const organizeIntoColumns = (items, columnsCount = 4)=>{
        if (items.length === 0) return [];
        // Calculate optimal number of columns based on items count
        const optimalColumns = Math.min(columnsCount, Math.ceil(items.length / 8));
        const itemsPerColumn = Math.ceil(items.length / optimalColumns);
        const columns = [];
        for(let i = 0; i < optimalColumns; i++){
            const start = i * itemsPerColumn;
            const end = start + itemsPerColumn;
            const column = items.slice(start, end);
            if (column.length > 0) {
                columns.push(column);
            }
        }
        return columns;
    };
    const subcategoryColumns = hasChildren ? organizeIntoColumns(category.children, 4) : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: menuItemRef,
        className: "relative group",
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: `/products?category=${category.slug}`,
                className: "flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-150",
                onClick: onClose,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: category.title
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/Header.tsx",
                        lineNumber: 286,
                        columnNumber: 9
                    }, this),
                    hasChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowRightIcon, {}, void 0, false, {
                        fileName: "[project]/apps/web/components/Header.tsx",
                        lineNumber: 288,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 281,
                columnNumber: 7
            }, this),
            hasChildren && showSubmenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: submenuRef,
                className: "absolute top-0 z-[60]",
                style: submenuStyle,
                onMouseEnter: ()=>{
                    if (submenuTimeoutRef.current) {
                        clearTimeout(submenuTimeoutRef.current);
                        submenuTimeoutRef.current = null;
                    }
                    setShowSubmenu(true);
                },
                onMouseLeave: ()=>{
                    submenuTimeoutRef.current = setTimeout(()=>{
                        setShowSubmenu(false);
                    }, 150);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow-2xl border border-gray-200/80 p-6 min-w-[500px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-6",
                        style: {
                            gridTemplateColumns: `repeat(${subcategoryColumns.length}, minmax(150px, 1fr))`
                        },
                        children: subcategoryColumns.map((column, columnIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 pb-2 border-b border-gray-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/products?category=${category.slug}`,
                                            className: "text-sm font-bold text-gray-900 hover:text-gray-700 uppercase tracking-wide",
                                            onClick: onClose,
                                            children: category.title
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Header.tsx",
                                            lineNumber: 319,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/Header.tsx",
                                        lineNumber: 318,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2.5",
                                        children: column.map((subCategory)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/products?category=${subCategory.slug}`,
                                                className: "block text-sm text-gray-700 hover:text-gray-900 transition-colors duration-150 py-1",
                                                onClick: onClose,
                                                children: subCategory.title
                                            }, subCategory.id, false, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 329,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/Header.tsx",
                                        lineNumber: 327,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, columnIndex, true, {
                                fileName: "[project]/apps/web/components/Header.tsx",
                                lineNumber: 317,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/Header.tsx",
                        lineNumber: 312,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/Header.tsx",
                    lineNumber: 309,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 292,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/Header.tsx",
        lineNumber: 275,
        columnNumber: 5
    }, this);
}
_s1(CategoryMenuItem, "TF7BW5Cp+armLSawnNefy60JJSI=");
_c8 = CategoryMenuItem;
function Header() {
    _s2();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isLoggedIn, logout, isAdmin } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [compareCount, setCompareCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [wishlistCount, setWishlistCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [cartCount, setCartCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [cartTotal, setCartTotal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showCurrency, setShowCurrency] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showMobileCurrency, setShowMobileCurrency] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showUserMenu, setShowUserMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showProductsMenu, setShowProductsMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSearchModal, setShowSearchModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedCurrency, setSelectedCurrency] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('AMD');
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingCategories, setLoadingCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const currentYear = new Date().getFullYear();
    const currencyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mobileCurrencyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const userMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const productsMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const productsMenuTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const searchModalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const searchInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Fetch cart data with debouncing
    const fetchCart = async ()=>{
        // Եթե օգտատերը գրանցված չէ, օգտագործում ենք localStorage
        if (!isLoggedIn) {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                const stored = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$storageCounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CART_KEY"]);
                const guestCart = stored ? JSON.parse(stored) : [];
                if (guestCart.length === 0) {
                    setCartCount(0);
                    setCartTotal(0);
                    return;
                }
                const itemsCount = guestCart.reduce((sum, item)=>sum + item.quantity, 0);
                setCartCount(itemsCount);
                // Հաշվարկում ենք total-ը ապրանքների գների հիման վրա
                // և հեռացնում ենք գոյություն չունեցող ապրանքները
                let total = 0;
                const validCartItems = [];
                try {
                    const itemsWithPrices = await Promise.all(guestCart.map(async (item)=>{
                        try {
                            if (!item.productSlug) {
                                return {
                                    price: 0,
                                    isValid: false
                                };
                            }
                            const productData = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/v1/products/${item.productSlug}`);
                            const variant = productData.variants?.find((v)=>(v._id?.toString() || v.id) === item.variantId) || productData.variants?.[0];
                            if (!variant) {
                                return {
                                    price: 0,
                                    isValid: false
                                };
                            }
                            // Ապրանքը գոյություն ունի, ավելացնում ենք validCartItems-ին
                            validCartItems.push(item);
                            return {
                                price: variant.price * item.quantity,
                                isValid: true
                            };
                        } catch (error) {
                            // 404 սխալը նորմալ իրավիճակ է (ապրանքը հեռացված է կամ չհրապարակված)
                            if (error?.status === 404 || error?.statusCode === 404) {
                                console.warn(`⚠️ [CART] Ապրանքը գոյություն չունի կամ հեռացված է: ${item.productSlug}`);
                            } else {
                                // Այլ սխալների համար լոգավորում ենք
                                console.error(`❌ [CART] Սխալ ապրանքը բեռնելիս ${item.productId}:`, error);
                            }
                            return {
                                price: 0,
                                isValid: false
                            };
                        }
                    }));
                    total = itemsWithPrices.reduce((sum, item)=>sum + item.price, 0);
                    // Եթե հեռացվել են ապրանքներ, թարմացնում ենք localStorage-ը
                    if (validCartItems.length !== guestCart.length) {
                        const removedCount = guestCart.length - validCartItems.length;
                        console.log(`🧹 [CART] Հեռացվել է ${removedCount} գոյություն չունեցող ապրանք զամբյուղից`);
                        if (validCartItems.length > 0) {
                            localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$storageCounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CART_KEY"], JSON.stringify(validCartItems));
                        } else {
                            localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$storageCounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CART_KEY"]);
                        }
                        // Թարմացնում ենք itemsCount-ը
                        const newItemsCount = validCartItems.reduce((sum, item)=>sum + item.quantity, 0);
                        setCartCount(newItemsCount);
                    }
                } catch (error) {
                    console.error('❌ [CART] Սխալ զամբյուղի ընդհանուր գումարը հաշվարկելիս:', error);
                }
                setCartTotal(total);
            } catch (error) {
                console.error('Error loading guest cart:', error);
                setCartCount(0);
                setCartTotal(0);
            }
            return;
        }
        // Check if token exists in localStorage
        if ("TURBOPACK compile-time truthy", 1) {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                setCartCount(0);
                setCartTotal(0);
                return;
            }
        }
        // Small delay to avoid simultaneous requests
        await new Promise((resolve)=>setTimeout(resolve, 100));
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/v1/cart');
            setCartCount(response.cart?.itemsCount || 0);
            setCartTotal(response.cart?.totals?.total || 0);
        } catch (error) {
            // Only log non-authentication errors
            if (error?.status !== 401 && error?.statusCode !== 401) {
                console.error('Error fetching cart:', error);
            }
            // Silently handle 401 errors (user not logged in or token expired)
            setCartCount(0);
            setCartTotal(0);
        }
    };
    // Load wishlist and compare counts from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const updateCounts = {
                "Header.useEffect.updateCounts": ()=>{
                    setWishlistCount((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$storageCounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWishlistCount"])());
                    setCompareCount((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$storageCounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCompareCount"])());
                }
            }["Header.useEffect.updateCounts"];
            // Initial load
            updateCounts();
            // Listen for updates
            const handleWishlistUpdate = {
                "Header.useEffect.handleWishlistUpdate": ()=>{
                    setWishlistCount((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$storageCounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWishlistCount"])());
                }
            }["Header.useEffect.handleWishlistUpdate"];
            const handleCompareUpdate = {
                "Header.useEffect.handleCompareUpdate": ()=>{
                    setCompareCount((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$storageCounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCompareCount"])());
                }
            }["Header.useEffect.handleCompareUpdate"];
            const handleAuthUpdate = {
                "Header.useEffect.handleAuthUpdate": ()=>{
                    // Refresh counts when auth state changes
                    updateCounts();
                    fetchCart();
                }
            }["Header.useEffect.handleAuthUpdate"];
            const handleCartUpdate = {
                "Header.useEffect.handleCartUpdate": ()=>{
                    fetchCart();
                }
            }["Header.useEffect.handleCartUpdate"];
            window.addEventListener('wishlist-updated', handleWishlistUpdate);
            window.addEventListener('compare-updated', handleCompareUpdate);
            window.addEventListener('auth-updated', handleAuthUpdate);
            window.addEventListener('cart-updated', handleCartUpdate);
            return ({
                "Header.useEffect": ()=>{
                    window.removeEventListener('wishlist-updated', handleWishlistUpdate);
                    window.removeEventListener('compare-updated', handleCompareUpdate);
                    window.removeEventListener('auth-updated', handleAuthUpdate);
                    window.removeEventListener('cart-updated', handleCartUpdate);
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        isLoggedIn
    ]);
    // Fetch cart when logged in state changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            fetchCart();
        }
    }["Header.useEffect"], [
        isLoggedIn
    ]);
    // Load currency from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            setSelectedCurrency((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredCurrency"])());
            const handleCurrencyUpdate = {
                "Header.useEffect.handleCurrencyUpdate": ()=>{
                    setSelectedCurrency((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredCurrency"])());
                }
            }["Header.useEffect.handleCurrencyUpdate"];
            window.addEventListener('currency-updated', handleCurrencyUpdate);
            return ({
                "Header.useEffect": ()=>{
                    window.removeEventListener('currency-updated', handleCurrencyUpdate);
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    // Initialize and update currency rates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            // Load currency rates on mount
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeCurrencyRates"])().catch(console.error);
            // Listen for currency rates updates (when admin changes rates)
            const handleCurrencyRatesUpdate = {
                "Header.useEffect.handleCurrencyRatesUpdate": ()=>{
                    console.log('🔄 [HEADER] Currency rates updated, reloading...');
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearCurrencyRatesCache"])();
                    // Force reload to get fresh rates from API
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeCurrencyRates"])(true).catch(console.error);
                    // Force re-render by dispatching currency-updated event
                    window.dispatchEvent(new Event('currency-updated'));
                }
            }["Header.useEffect.handleCurrencyRatesUpdate"];
            window.addEventListener('currency-rates-updated', handleCurrencyRatesUpdate);
            return ({
                "Header.useEffect": ()=>{
                    window.removeEventListener('currency-rates-updated', handleCurrencyRatesUpdate);
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    // Sync search input with URL params - handled by HeaderSearchSync component wrapped in Suspense
    // Fetch categories (language is always 'en')
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            fetchCategories();
        }
    }["Header.useEffect"], []);
    const fetchCategories = async ()=>{
        try {
            setLoadingCategories(true);
            // Small delay to avoid simultaneous requests
            await new Promise((resolve)=>setTimeout(resolve, 200));
            // Language is always 'en'
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/v1/categories/tree', {
                params: {
                    lang: 'en'
                }
            });
            setCategories(response.data || []);
        } catch (err) {
            console.error('Error fetching categories:', err);
            setCategories([]);
        } finally{
            setLoadingCategories(false);
        }
    };
    // Get only root categories (parent categories) for main dropdown
    // API already returns root categories in tree structure, so we just return them as-is
    const getRootCategories = (cats)=>{
        return cats; // API already returns only root categories
    };
    const selectedCurrencyInfo = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURRENCIES"][selectedCurrency];
    // Close dropdowns when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const handleClickOutside = {
                "Header.useEffect.handleClickOutside": (event)=>{
                    if (currencyRef.current && !currencyRef.current.contains(event.target)) {
                        setShowCurrency(false);
                    }
                    if (mobileCurrencyRef.current && !mobileCurrencyRef.current.contains(event.target)) {
                        setShowMobileCurrency(false);
                    }
                    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                        setShowUserMenu(false);
                    }
                    if (productsMenuRef.current && !productsMenuRef.current.contains(event.target)) {
                        setShowProductsMenu(false);
                    }
                    if (searchModalRef.current && !searchModalRef.current.contains(event.target)) {
                        setShowSearchModal(false);
                    }
                }
            }["Header.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "Header.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            if (typeof document === 'undefined') {
                return;
            }
            if (mobileMenuOpen) {
                const previousOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
                return ({
                    "Header.useEffect": ()=>{
                        document.body.style.overflow = previousOverflow;
                    }
                })["Header.useEffect"];
            }
        }
    }["Header.useEffect"], [
        mobileMenuOpen
    ]);
    // Cleanup timeout on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            return ({
                "Header.useEffect": ()=>{
                    if (productsMenuTimeoutRef.current) {
                        clearTimeout(productsMenuTimeoutRef.current);
                    }
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    // Focus search input when modal opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            if (showSearchModal && searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }
    }["Header.useEffect"], [
        showSearchModal
    ]);
    // Close search modal on ESC key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const handleEscape = {
                "Header.useEffect.handleEscape": (e)=>{
                    if (e.key !== 'Escape') {
                        return;
                    }
                    if (showSearchModal) {
                        setShowSearchModal(false);
                    }
                    if (mobileMenuOpen) {
                        setMobileMenuOpen(false);
                    }
                }
            }["Header.useEffect.handleEscape"];
            document.addEventListener('keydown', handleEscape);
            return ({
                "Header.useEffect": ()=>{
                    document.removeEventListener('keydown', handleEscape);
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        showSearchModal,
        mobileMenuOpen
    ]);
    const handleSearch = (e)=>{
        e.preventDefault();
        const query = searchQuery.trim();
        const params = new URLSearchParams();
        if (query) {
            params.set('search', query);
        }
        // Note: Category selection is removed from search modal
        // Users can use the categories icon button in header for category filtering
        setShowSearchModal(false);
        const queryString = params.toString();
        router.push(queryString ? `/products?${queryString}` : '/products');
    };
    /**
   * Updates currency selection and notifies the app with a visible log entry.
   */ const handleCurrencyChange = (currency)=>{
        console.info('[Header][LangCurrency] Currency changed', {
            from: selectedCurrency,
            to: currency
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStoredCurrency"])(currency);
        setSelectedCurrency(currency);
        setShowCurrency(false);
        // Trigger currency update event to refresh prices
        window.dispatchEvent(new Event('currency-updated'));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "bg-gradient-to-b from-gray-50 to-white sticky top-0 z-50 border-b border-gray-200/80 shadow-sm backdrop-blur-sm bg-white/95",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderSearchSync, {
                    setSearchQuery: setSearchQuery,
                    setSelectedCategory: setSelectedCategory,
                    categories: categories
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/Header.tsx",
                    lineNumber: 743,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 742,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border-b border-gray-200 hidden md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3 py-3 text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-gray-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 20 20",
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90715 11.8783 8.12168 14.0929 10.8956 15.2088L11.6697 13.6606C11.866 13.2679 12.2955 13.0493 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z",
                                                    stroke: "currentColor",
                                                    strokeWidth: "1.5",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                    lineNumber: 757,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 756,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: contactData.phone
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 759,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/Header.tsx",
                                        lineNumber: 755,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 text-gray-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: socialLinks.instagram || '#',
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "hover:text-pink-600 transition-colors",
                                                "aria-label": t('common.ariaLabels.instagram'),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                    lineNumber: 769,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 762,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: socialLinks.facebook || '#',
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "hover:text-blue-600 transition-colors",
                                                "aria-label": t('common.ariaLabels.facebook'),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                    lineNumber: 778,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 771,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: socialLinks.linkedin || '#',
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "hover:text-blue-700 transition-colors",
                                                "aria-label": t('common.ariaLabels.linkedin'),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__["Linkedin"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                    lineNumber: 787,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 780,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/Header.tsx",
                                        lineNumber: 761,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/Header.tsx",
                                lineNumber: 754,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-3 sm:justify-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$LanguageSwitcherHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LanguageSwitcherHeader"], {}, void 0, false, {
                                        fileName: "[project]/apps/web/components/Header.tsx",
                                        lineNumber: 794,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        ref: currencyRef,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    setShowCurrency(!showCurrency);
                                                },
                                                className: "flex items-center gap-2 bg-white px-3 py-2 text-gray-800 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-base font-semibold leading-none",
                                                        children: selectedCurrencyInfo.symbol
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 803,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium leading-none",
                                                        children: selectedCurrency
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 804,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronDownIcon, {}, void 0, false, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 805,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 796,
                                                columnNumber: 17
                                            }, this),
                                            showCurrency && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-full right-0 mt-2 w-40 bg-white z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200",
                                                children: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURRENCIES"]).map((currency)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleCurrencyChange(currency.code),
                                                        className: `w-full text-left px-4 py-2.5 text-sm transition-all duration-150 ${selectedCurrency === currency.code ? 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: currency.code
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                                    lineNumber: 819,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-500",
                                                                    children: currency.symbol
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                                    lineNumber: 820,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/components/Header.tsx",
                                                            lineNumber: 818,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, currency.code, false, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 810,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 808,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/Header.tsx",
                                        lineNumber: 795,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/Header.tsx",
                                lineNumber: 793,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/Header.tsx",
                        lineNumber: 752,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/Header.tsx",
                    lineNumber: 751,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 750,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto pl-2 sm:pl-4 md:pl-6 lg:pl-8 pr-2 sm:pr-4 md:pr-6 lg:pr-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center gap-2 sm:gap-4 py-4 md:py-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex w-full items-center justify-between md:w-auto md:justify-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 sm:gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setMobileMenuOpen(true),
                                            className: "md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200",
                                            "aria-label": t('common.ariaLabels.openMenu'),
                                            "aria-expanded": mobileMenuOpen,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 sm:w-5 sm:h-5",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M4 7h16M4 12h16M4 17h16"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                    lineNumber: 846,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 845,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Header.tsx",
                                            lineNumber: 838,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/",
                                            className: "flex items-center flex-shrink-0 group",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-300",
                                                children: "White-Shop"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 850,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Header.tsx",
                                            lineNumber: 849,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 837,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 sm:gap-2 md:hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            ref: mobileCurrencyRef,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>{
                                                        setShowMobileCurrency(!showMobileCurrency);
                                                    },
                                                    className: "flex h-9 sm:h-10 items-center justify-center gap-1 sm:gap-2 bg-transparent md:bg-white px-2 sm:px-3 text-xs sm:text-sm font-medium text-gray-800 shadow-none md:shadow-sm transition-colors cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm sm:text-base font-semibold leading-none",
                                                            children: selectedCurrencyInfo.symbol
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/Header.tsx",
                                                            lineNumber: 866,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs sm:text-sm font-medium leading-none",
                                                            children: selectedCurrency
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/Header.tsx",
                                                            lineNumber: 867,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronDownIcon, {}, void 0, false, {
                                                            fileName: "[project]/apps/web/components/Header.tsx",
                                                            lineNumber: 868,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                    lineNumber: 859,
                                                    columnNumber: 17
                                                }, this),
                                                showMobileCurrency && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-full right-0 mt-2 w-40 bg-white shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200",
                                                    children: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURRENCIES"]).map((currency)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                handleCurrencyChange(currency.code);
                                                                setShowMobileCurrency(false);
                                                            },
                                                            className: `w-full text-left px-4 py-2.5 text-sm transition-all duration-150 ${selectedCurrency === currency.code ? 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: currency.code
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                                        lineNumber: 886,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-500",
                                                                        children: currency.symbol
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                                        lineNumber: 887,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 885,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, currency.code, false, {
                                                            fileName: "[project]/apps/web/components/Header.tsx",
                                                            lineNumber: 873,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                    lineNumber: 871,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/Header.tsx",
                                            lineNumber: 858,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-9 sm:h-10 items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$LanguageSwitcherHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LanguageSwitcherHeader"], {}, void 0, false, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 896,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Header.tsx",
                                            lineNumber: 895,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 856,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/Header.tsx",
                            lineNumber: 836,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "order-3 hidden w-full items-center justify-center gap-1 md:order-none md:flex md:flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium whitespace-nowrap",
                                    children: t('common.navigation.home')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 903,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    ref: productsMenuRef,
                                    onMouseEnter: ()=>{
                                        if (productsMenuTimeoutRef.current) {
                                            clearTimeout(productsMenuTimeoutRef.current);
                                            productsMenuTimeoutRef.current = null;
                                        }
                                        setShowProductsMenu(true);
                                    },
                                    onMouseLeave: ()=>{
                                        productsMenuTimeoutRef.current = setTimeout(()=>{
                                            setShowProductsMenu(false);
                                        }, 150);
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/categories",
                                            className: "text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium whitespace-nowrap flex items-center gap-1",
                                            children: [
                                                t('common.navigation.products'),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronDownIcon, {}, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                    lineNumber: 927,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/Header.tsx",
                                            lineNumber: 922,
                                            columnNumber: 15
                                        }, this),
                                        showProductsMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-full left-0 w-full h-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                    lineNumber: 931,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-full left-0 pt-2 w-64 z-50",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white rounded-xl shadow-2xl border border-gray-200/80 overflow-visible",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/products",
                                                                className: "block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-150 font-medium border-b border-gray-100",
                                                                onClick: ()=>setShowProductsMenu(false),
                                                                children: t('common.navigation.products')
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 934,
                                                                columnNumber: 23
                                                            }, this),
                                                            loadingCategories ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "px-4 py-2 text-sm text-gray-500",
                                                                children: t('common.messages.loading')
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 942,
                                                                columnNumber: 25
                                                            }, this) : getRootCategories(categories).map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryMenuItem, {
                                                                    category: category,
                                                                    onClose: ()=>setShowProductsMenu(false)
                                                                }, category.id, false, {
                                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                                    lineNumber: 945,
                                                                    columnNumber: 27
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 933,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                    lineNumber: 932,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 906,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/about",
                                    className: "text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium whitespace-nowrap",
                                    children: t('common.navigation.about')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 957,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact",
                                    className: "text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium whitespace-nowrap",
                                    children: t('common.navigation.contact')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 960,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/Header.tsx",
                            lineNumber: 902,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ml-auto hidden items-center gap-2 md:flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowSearchModal(!showSearchModal);
                                        setShowCurrency(false);
                                    },
                                    className: "w-11 h-11 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors duration-150",
                                    "aria-label": t('common.ariaLabels.search'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {}, void 0, false, {
                                        fileName: "[project]/apps/web/components/Header.tsx",
                                        lineNumber: 977,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 969,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    ref: userMenuRef,
                                    children: isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowUserMenu(!showUserMenu),
                                                className: "w-11 h-11 flex items-center justify-center transition-all duration-200 group",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileIconFilled, {}, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                    lineNumber: 989,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 985,
                                                columnNumber: 21
                                            }, this),
                                            showUserMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-200/80 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/profile",
                                                        className: "block px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-150 font-medium border-b border-gray-100",
                                                        onClick: ()=>setShowUserMenu(false),
                                                        children: t('common.navigation.profile')
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 993,
                                                        columnNumber: 25
                                                    }, this),
                                                    isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/admin",
                                                        className: "block px-5 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-white transition-all duration-150 font-medium border-b border-gray-100",
                                                        onClick: ()=>setShowUserMenu(false),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-4 h-4 mr-2",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/web/components/Header.tsx",
                                                                            lineNumber: 1008,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/web/components/Header.tsx",
                                                                            lineNumber: 1009,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                                    lineNumber: 1007,
                                                                    columnNumber: 31
                                                                }, this),
                                                                t('common.navigation.adminPanel')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/components/Header.tsx",
                                                            lineNumber: 1006,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 1001,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setShowUserMenu(false);
                                                            logout();
                                                        },
                                                        className: "block w-full text-left px-5 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-white transition-all duration-150 font-medium",
                                                        children: t('common.navigation.logout')
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 1015,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 992,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        className: "w-11 h-11 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors duration-150 group",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileIconOutline, {}, void 0, false, {
                                            fileName: "[project]/apps/web/components/Header.tsx",
                                            lineNumber: 1029,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/Header.tsx",
                                        lineNumber: 1028,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 982,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/compare",
                                    className: "w-11 h-11 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors duration-150 relative group",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BadgeIcon, {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CompareIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompareIcon"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Header.tsx",
                                            lineNumber: 1036,
                                            columnNumber: 34
                                        }, void 0),
                                        badge: compareCount
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/Header.tsx",
                                        lineNumber: 1036,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 1035,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/wishlist",
                                    className: "w-11 h-11 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors duration-150 relative group",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BadgeIcon, {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WishlistIcon, {}, void 0, false, {
                                            fileName: "[project]/apps/web/components/Header.tsx",
                                            lineNumber: 1041,
                                            columnNumber: 34
                                        }, void 0),
                                        badge: wishlistCount
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/Header.tsx",
                                        lineNumber: 1041,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 1040,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/cart",
                                    className: "flex items-center gap-[0.hpx] group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-11 h-11 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors duration-150 relative",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BadgeIcon, {
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CartIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartIcon"], {
                                                    size: 19
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                    lineNumber: 1047,
                                                    columnNumber: 36
                                                }, void 0),
                                                badge: cartCount
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 1047,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Header.tsx",
                                            lineNumber: 1046,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-800 font-bold text-sm hidden sm:block min-w-[3.25rem] group-hover:text-gray-900 transition-colors",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(cartTotal, selectedCurrency)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Header.tsx",
                                            lineNumber: 1049,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 1045,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/Header.tsx",
                            lineNumber: 967,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/Header.tsx",
                    lineNumber: 834,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 833,
                columnNumber: 7
            }, this),
            mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex md:hidden bg-black/40 backdrop-blur-sm",
                role: "dialog",
                "aria-modal": "true",
                onClick: ()=>setMobileMenuOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full min-h-screen w-1/2 min-w-[16rem] max-w-full bg-white flex flex-col shadow-2xl",
                    onClick: (event)=>event.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between border-b border-gray-200 px-5 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-semibold text-gray-900",
                                    children: "Navigation"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 1071,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setMobileMenuOpen(false),
                                    className: "w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors",
                                    "aria-label": t('common.ariaLabels.closeMenu'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5 mx-auto",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Header.tsx",
                                            lineNumber: 1079,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/Header.tsx",
                                        lineNumber: 1078,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 1072,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/Header.tsx",
                            lineNumber: 1070,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-hidden min-h-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "flex h-full flex-col border-y border-gray-200 text-sm font-semibold uppercase tracking-wide text-gray-800 bg-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 overflow-y-auto divide-y divide-gray-200",
                                        children: [
                                            primaryNavLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: link.href,
                                                    onClick: ()=>setMobileMenuOpen(false),
                                                    className: "flex items-center justify-between px-4 py-3 hover:bg-gray-50",
                                                    children: [
                                                        t(link.translationKey),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4 text-gray-400",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M9 5l7 7-7 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 1096,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/Header.tsx",
                                                            lineNumber: 1095,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, link.href, true, {
                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                    lineNumber: 1088,
                                                    columnNumber: 21
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/wishlist",
                                                onClick: ()=>setMobileMenuOpen(false),
                                                className: "flex items-center justify-between px-4 py-3 hover:bg-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-2 normal-case font-medium text-gray-700",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WishlistIcon, {}, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 1107,
                                                                columnNumber: 23
                                                            }, this),
                                                            t('common.navigation.wishlist')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 1106,
                                                        columnNumber: 21
                                                    }, this),
                                                    wishlistCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-full bg-gray-900 px-2 py-0.5 text-xs font-semibold text-white",
                                                        children: wishlistCount > 99 ? '99+' : wishlistCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 1101,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/compare",
                                                onClick: ()=>setMobileMenuOpen(false),
                                                className: "flex items-center justify-between px-4 py-3 hover:bg-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-2 normal-case font-medium text-gray-700",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CompareIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompareIcon"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 1123,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Compare"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 1122,
                                                        columnNumber: 21
                                                    }, this),
                                                    compareCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-full bg-gray-900 px-2 py-0.5 text-xs font-semibold text-white",
                                                        children: compareCount > 99 ? '99+' : compareCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 1127,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 1117,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/cart",
                                                onClick: ()=>setMobileMenuOpen(false),
                                                className: "flex items-center justify-between px-4 py-3 hover:bg-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-2 normal-case font-medium text-gray-700",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CartIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartIcon"], {
                                                                size: 19
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 1139,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Cart"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 1138,
                                                        columnNumber: 21
                                                    }, this),
                                                    cartCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-full bg-gray-900 px-2 py-0.5 text-xs font-semibold text-white",
                                                        children: cartCount > 99 ? '99+' : cartCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 1143,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                lineNumber: 1133,
                                                columnNumber: 19
                                            }, this),
                                            isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/profile",
                                                        onClick: ()=>setMobileMenuOpen(false),
                                                        className: "flex items-center justify-between px-4 py-3 hover:bg-gray-50 normal-case text-gray-800",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileIconFilled, {}, void 0, false, {
                                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                                        lineNumber: 1157,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    "Profile"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 1156,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-4 h-4 text-gray-400",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M9 5l7 7-7 7"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                                    lineNumber: 1161,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 1160,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 1151,
                                                        columnNumber: 23
                                                    }, this),
                                                    isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/admin",
                                                        onClick: ()=>setMobileMenuOpen(false),
                                                        className: "flex items-center justify-between px-4 py-3 hover:bg-blue-50 normal-case text-blue-700",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Admin Panel"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 1170,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-4 h-4",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M9 5l7 7-7 7"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                                    lineNumber: 1172,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 1171,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 1165,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setMobileMenuOpen(false);
                                                            logout();
                                                        },
                                                        className: "flex w-full items-center justify-between px-4 py-3 text-left text-red-600 hover:bg-red-50 normal-case font-semibold",
                                                        children: [
                                                            "Logout",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-4 h-4",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M9 5l7 7-7 7"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                                    lineNumber: 1185,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 1184,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 1176,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/login",
                                                        onClick: ()=>setMobileMenuOpen(false),
                                                        className: "flex items-center justify-between px-4 py-3 hover:bg-gray-50 normal-case text-gray-800",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Login"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 1196,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-4 h-4 text-gray-400",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M9 5l7 7-7 7"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                                    lineNumber: 1198,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 1197,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 1191,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/register",
                                                        onClick: ()=>setMobileMenuOpen(false),
                                                        className: "flex items-center justify-between px-4 py-3 hover:bg-gray-900 hover:text-white normal-case text-gray-900 font-semibold",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Create account"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 1206,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-4 h-4",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M9 5l7 7-7 7"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/Header.tsx",
                                                                    lineNumber: 1208,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/Header.tsx",
                                                                lineNumber: 1207,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/Header.tsx",
                                                        lineNumber: 1201,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/Header.tsx",
                                        lineNumber: 1086,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-gray-200 px-4 py-4 text-xs font-medium tracking-wide text-gray-500 normal-case",
                                        children: [
                                            "© ",
                                            currentYear,
                                            " White-Shop"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/Header.tsx",
                                        lineNumber: 1215,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/Header.tsx",
                                lineNumber: 1085,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/Header.tsx",
                            lineNumber: 1084,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/Header.tsx",
                    lineNumber: 1066,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 1060,
                columnNumber: 9
            }, this),
            showSearchModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: searchModalRef,
                    className: "w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200/80 p-4 animate-in fade-in slide-in-from-top-2 duration-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSearch,
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: searchInputRef,
                                type: "text",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                placeholder: t('common.placeholders.search'),
                                className: "flex-1 h-11 px-4 border-2 border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm placeholder:text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/Header.tsx",
                                lineNumber: 1233,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "h-11 px-6 bg-gray-900 text-white rounded-r-lg hover:bg-gray-800 transition-colors flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {}, void 0, false, {
                                    fileName: "[project]/apps/web/components/Header.tsx",
                                    lineNumber: 1247,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/Header.tsx",
                                lineNumber: 1243,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/Header.tsx",
                        lineNumber: 1231,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/Header.tsx",
                    lineNumber: 1227,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Header.tsx",
                lineNumber: 1226,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/Header.tsx",
        lineNumber: 741,
        columnNumber: 5
    }, this);
}
_s2(Header, "GwZQvkrUNrkR9wypuH/GEovpdtU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c9 = Header;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "ChevronDownIcon");
__turbopack_context__.k.register(_c1, "ArrowRightIcon");
__turbopack_context__.k.register(_c2, "ProfileIconOutline");
__turbopack_context__.k.register(_c3, "ProfileIconFilled");
__turbopack_context__.k.register(_c4, "WishlistIcon");
__turbopack_context__.k.register(_c5, "SearchIcon");
__turbopack_context__.k.register(_c6, "BadgeIcon");
__turbopack_context__.k.register(_c7, "HeaderSearchSync");
__turbopack_context__.k.register(_c8, "CategoryMenuItem");
__turbopack_context__.k.register(_c9, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/language.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n-client.ts [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../config/contact.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function Footer() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Footer.useEffect": ()=>{
            const storedLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])();
            const mappedLang = storedLang === 'hy' ? 'am' : storedLang === 'ka' ? 'en' : storedLang;
            if (mappedLang === 'am' || mappedLang === 'ru' || mappedLang === 'en') {
                setLanguage(mappedLang);
            } else {
                setLanguage('en');
            }
            const handleLanguageUpdate = {
                "Footer.useEffect.handleLanguageUpdate": ()=>{
                    const newLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])();
                    const mappedNewLang = newLang === 'hy' ? 'am' : newLang === 'ka' ? 'en' : newLang;
                    if (mappedNewLang === 'am' || mappedNewLang === 'ru' || mappedNewLang === 'en') {
                        setLanguage(mappedNewLang);
                    } else {
                        setLanguage('en');
                    }
                }
            }["Footer.useEffect.handleLanguageUpdate"];
            window.addEventListener('language-updated', handleLanguageUpdate);
            return ({
                "Footer.useEffect": ()=>{
                    window.removeEventListener('language-updated', handleLanguageUpdate);
                }
            })["Footer.useEffect"];
        }
    }["Footer.useEffect"], []);
    const address = contactData.address[language] || contactData.address.en;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-black border-t border-gray-800",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-4 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-white mb-4",
                                    children: t('common.footer.shop')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-300",
                                    children: t('common.footer.description')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/Footer.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-semibold text-white mb-4",
                                    children: t('common.footer.quickLinks')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/products",
                                                className: "text-sm text-gray-300 hover:text-white transition-colors",
                                                children: t('common.navigation.products')
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Footer.tsx",
                                                lineNumber: 60,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                            lineNumber: 59,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/categories",
                                                className: "text-sm text-gray-300 hover:text-white transition-colors",
                                                children: t('common.navigation.categories')
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Footer.tsx",
                                                lineNumber: 68,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                            lineNumber: 67,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/about",
                                                className: "text-sm text-gray-300 hover:text-white transition-colors",
                                                children: t('common.navigation.about')
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Footer.tsx",
                                                lineNumber: 76,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/contact",
                                                className: "text-sm text-gray-300 hover:text-white transition-colors",
                                                children: t('common.navigation.contact')
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Footer.tsx",
                                                lineNumber: 84,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                            lineNumber: 83,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/Footer.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-semibold text-white mb-4",
                                    children: t('common.footer.legal')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/privacy",
                                                className: "text-sm text-gray-300 hover:text-white transition-colors",
                                                children: t('common.footer.privacyPolicy')
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Footer.tsx",
                                                lineNumber: 99,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/terms",
                                                className: "text-sm text-gray-300 hover:text-white transition-colors",
                                                children: t('common.footer.termsOfService')
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Footer.tsx",
                                                lineNumber: 107,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/cookies",
                                                className: "text-sm text-gray-300 hover:text-white transition-colors",
                                                children: t('common.footer.cookiePolicy')
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Footer.tsx",
                                                lineNumber: 115,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/refund-policy",
                                                className: "text-sm text-gray-300 hover:text-white transition-colors",
                                                children: t('common.footer.refundPolicy')
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Footer.tsx",
                                                lineNumber: 123,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                            lineNumber: 122,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/delivery-terms",
                                                className: "text-sm text-gray-300 hover:text-white transition-colors",
                                                children: t('common.footer.deliveryTerms')
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Footer.tsx",
                                                lineNumber: 131,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                            lineNumber: 130,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/Footer.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-semibold text-white mb-4",
                                    children: t('common.footer.contactInfo')
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                                            lineNumber: 152,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                                            lineNumber: 158,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-gray-300",
                                                    children: address
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                            lineNumber: 145,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-5 h-5 text-gray-400 flex-shrink-0",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/Footer.tsx",
                                                        lineNumber: 174,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `tel:${contactData.phone}`,
                                                    className: "text-sm text-gray-300 hover:text-white transition-colors",
                                                    children: contactData.phone
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-5 h-5 text-gray-400 flex-shrink-0",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/Footer.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `mailto:${contactData.email}`,
                                                    className: "text-sm text-gray-300 hover:text-white transition-colors",
                                                    children: contactData.email
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/Footer.tsx",
                                            lineNumber: 188,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/Footer.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/Footer.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/Footer.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 pt-8 border-t border-gray-800",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row justify-between items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-300",
                                children: t('common.footer.copyright').replace('{year}', new Date().getFullYear().toString())
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/Footer.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-400 mr-2",
                                        children: t('common.footer.paymentMethods')
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/Footer.tsx",
                                        lineNumber: 222,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: "https://static.tert.am/storage/files/tert/2020/04/27/idram_main_visual-770x_.png",
                                                alt: "Idram",
                                                width: 80,
                                                height: 30,
                                                className: "h-6 w-auto opacity-80 hover:opacity-100 transition-opacity",
                                                unoptimized: true
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Footer.tsx",
                                                lineNumber: 224,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: "https://finport.am/mcgallery/20190415121452.jpg",
                                                alt: "ArCa",
                                                width: 80,
                                                height: 30,
                                                className: "h-6 w-auto opacity-80 hover:opacity-100 transition-opacity",
                                                unoptimized: true
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/Footer.tsx",
                                                lineNumber: 232,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/Footer.tsx",
                                        lineNumber: 223,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/Footer.tsx",
                                lineNumber: 221,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/Footer.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/Footer.tsx",
                    lineNumber: 214,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/components/Footer.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/Footer.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(Footer, "OYnj/UImq0Lzs4PkbpQL5SmliOs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/Breadcrumb.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Breadcrumb",
    ()=>Breadcrumb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/language.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Breadcrumb() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Breadcrumb.useEffect": ()=>{
            const storedLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])();
            setLanguage(storedLang);
            const handleLanguageUpdate = {
                "Breadcrumb.useEffect.handleLanguageUpdate": ()=>{
                    setLanguage((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$language$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredLanguage"])());
                }
            }["Breadcrumb.useEffect.handleLanguageUpdate"];
            window.addEventListener('language-updated', handleLanguageUpdate);
            return ({
                "Breadcrumb.useEffect": ()=>{
                    window.removeEventListener('language-updated', handleLanguageUpdate);
                }
            })["Breadcrumb.useEffect"];
        }
    }["Breadcrumb.useEffect"], []);
    const getBreadcrumbs = ()=>{
        const items = [
            {
                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'common.navigation.home'),
                href: '/'
            }
        ];
        if (pathname === '/') {
            return items;
        }
        const segments = pathname.split('/').filter(Boolean);
        segments.forEach((segment, index)=>{
            const href = '/' + segments.slice(0, index + 1).join('/');
            // Translate common routes
            let label = segment;
            // Map common routes to translations
            const routeMap = {
                'products': 'common.navigation.products',
                'categories': 'common.navigation.categories',
                'cart': 'common.navigation.cart',
                'wishlist': 'common.navigation.wishlist',
                'compare': 'common.navigation.compare',
                'checkout': 'common.navigation.checkout',
                'profile': 'common.navigation.profile',
                'orders': 'common.navigation.orders',
                'login': 'common.navigation.login',
                'register': 'common.navigation.register',
                'about': 'common.navigation.about',
                'contact': 'common.navigation.contact',
                'admin': 'common.navigation.admin',
                'faq': 'common.navigation.faq',
                'shipping': 'common.navigation.shipping',
                'returns': 'common.navigation.returns',
                'support': 'common.navigation.support',
                'privacy': 'common.navigation.privacy',
                'terms': 'common.navigation.terms',
                'cookies': 'common.navigation.cookies',
                'delivery': 'common.navigation.delivery',
                'stores': 'common.navigation.stores'
            };
            if (routeMap[segment]) {
                label = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, routeMap[segment]);
            } else {
                // Capitalize and format segment (for product slugs, etc.)
                label = segment.split('-').map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            }
            items.push({
                label,
                href
            });
        });
        return items;
    };
    const breadcrumbs = getBreadcrumbs();
    // Don't show breadcrumb on home page
    if (pathname === '/') {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "bg-gray-50 border-b border-gray-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center text-sm",
                children: breadcrumbs.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center",
                        children: [
                            index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mx-2 text-gray-400",
                                children: "/"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/Breadcrumb.tsx",
                                lineNumber: 105,
                                columnNumber: 17
                            }, this),
                            index === breadcrumbs.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-900 font-semibold",
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/Breadcrumb.tsx",
                                lineNumber: 108,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: "text-gray-500 hover:text-gray-700 transition-colors",
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/Breadcrumb.tsx",
                                lineNumber: 110,
                                columnNumber: 17
                            }, this)
                        ]
                    }, item.href, true, {
                        fileName: "[project]/apps/web/components/Breadcrumb.tsx",
                        lineNumber: 103,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/components/Breadcrumb.tsx",
                lineNumber: 101,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/Breadcrumb.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/Breadcrumb.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s(Breadcrumb, "2gbjdU2Pu0WvAoS7jfbaGmLdS34=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Breadcrumb;
var _c;
__turbopack_context__.k.register(_c, "Breadcrumb");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/MobileBottomNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileBottomNav",
    ()=>MobileBottomNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-round.js [app-client] (ecmascript) <export default as UserRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/store.js [app-client] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$storageCounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/storageCounts.ts [app-client] (ecmascript)");
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
function MobileBottomNav() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isProductsPage = pathname?.startsWith('/products');
    const [wishlistCount, setWishlistCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [compareCount, setCompareCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileBottomNav.useEffect": ()=>{
            const updateCounts = {
                "MobileBottomNav.useEffect.updateCounts": ()=>{
                    const wishlist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$storageCounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWishlistCount"])();
                    const compare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$storageCounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCompareCount"])();
                    console.debug('[MobileBottomNav] wishlist/compare counts refreshed', {
                        wishlist,
                        compare
                    });
                    setWishlistCount(wishlist);
                    setCompareCount(compare);
                }
            }["MobileBottomNav.useEffect.updateCounts"];
            updateCounts();
            window.addEventListener('wishlist-updated', updateCounts);
            window.addEventListener('compare-updated', updateCounts);
            return ({
                "MobileBottomNav.useEffect": ()=>{
                    window.removeEventListener('wishlist-updated', updateCounts);
                    window.removeEventListener('compare-updated', updateCounts);
                }
            })["MobileBottomNav.useEffect"];
        }
    }["MobileBottomNav.useEffect"], []);
    const navItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MobileBottomNav.useMemo[navItems]": ()=>[
                {
                    label: 'Home',
                    href: '/',
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
                    visible: true
                },
                // Shop with Store icon
                {
                    label: 'Shop',
                    href: '/products',
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"],
                    visible: true,
                    onClick: {
                        "MobileBottomNav.useMemo[navItems]": ()=>console.info('🛒 [MobileBottomNav] Shop tapped, navigating to /products')
                    }["MobileBottomNav.useMemo[navItems]"]
                },
                // On mobile we show Cart instead of Wishlist
                {
                    label: 'Cart',
                    href: '/cart',
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$icons$2f$CartIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartIcon"],
                    visible: true
                },
                {
                    label: 'My account',
                    href: '/profile',
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__["UserRound"],
                    visible: true
                }
            ]
    }["MobileBottomNav.useMemo[navItems]"], [
        isProductsPage
    ]);
    const resolveBadgeValue = (badge)=>{
        if (badge === 'wishlist') return wishlistCount;
        if (badge === 'compare') return compareCount;
        return 0;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(15,23,42,0.08)]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex max-w-md items-stretch justify-between px-2 py-2",
            children: navItems.filter((item)=>item.visible).map(({ label, href, icon: Icon, badge, action, onClick })=>{
                const isActive = href ? pathname === href : false;
                const badgeValue = resolveBadgeValue(badge);
                const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    className: `h-5 w-5 ${isActive ? 'text-gray-900' : 'text-gray-500'}`
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/MobileBottomNav.tsx",
                                    lineNumber: 93,
                                    columnNumber: 17
                                }, this),
                                badgeValue > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute -top-2 -right-2 rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white",
                                    children: badgeValue > 99 ? '99+' : badgeValue
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/MobileBottomNav.tsx",
                                    lineNumber: 95,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/MobileBottomNav.tsx",
                            lineNumber: 92,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mt-1 text-[11px]",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/MobileBottomNav.tsx",
                            lineNumber: 100,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true);
                if (action) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: action,
                        className: "flex flex-1 flex-col items-center rounded-xl px-2 py-1 text-xs font-medium text-gray-500 transition",
                        children: content
                    }, label, false, {
                        fileName: "[project]/apps/web/components/MobileBottomNav.tsx",
                        lineNumber: 106,
                        columnNumber: 15
                    }, this);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: href || '#',
                    onClick: onClick,
                    className: `flex flex-1 flex-col items-center rounded-xl px-2 py-1 text-xs font-medium transition ${isActive ? 'text-gray-900' : 'text-gray-500'}`,
                    children: content
                }, label, false, {
                    fileName: "[project]/apps/web/components/MobileBottomNav.tsx",
                    lineNumber: 118,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/apps/web/components/MobileBottomNav.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/MobileBottomNav.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_s(MobileBottomNav, "BTMkKWZ8PhPdHyBIWG6geFVjin4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = MobileBottomNav;
var _c;
__turbopack_context__.k.register(_c, "MobileBottomNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_062de79f._.js.map