(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/apps/institutions-portal/src/components/providers/ThemeProvider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ClientThemeProvider": ()=>ClientThemeProvider,
    "useTheme": ()=>useTheme
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.6_@babel+core@7.28.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.6_@babel+core@7.28.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
// Theme configuration specific to institutions portal
const lightTheme = {
    colors: {
        background: {
            primary: 'rgb(255, 255, 255)',
            secondary: 'rgb(248, 250, 252)',
            tertiary: 'rgb(241, 245, 249)'
        },
        text: {
            primary: 'rgb(15, 23, 42)',
            secondary: 'rgb(51, 65, 85)',
            tertiary: 'rgb(100, 116, 139)'
        },
        border: {
            primary: 'rgb(226, 232, 240)',
            secondary: 'rgb(203, 213, 225)'
        },
        accent: {
            primary: 'rgb(34, 197, 94)',
            secondary: 'rgb(16, 185, 129)',
            tertiary: 'rgb(5, 150, 105)'
        }
    }
};
const darkTheme = {
    colors: {
        background: {
            primary: 'rgb(15, 23, 42)',
            secondary: 'rgb(30, 41, 59)',
            tertiary: 'rgb(51, 65, 85)'
        },
        text: {
            primary: 'rgb(248, 250, 252)',
            secondary: 'rgb(226, 232, 240)',
            tertiary: 'rgb(148, 163, 184)'
        },
        border: {
            primary: 'rgb(51, 65, 85)',
            secondary: 'rgb(71, 85, 105)'
        },
        accent: {
            primary: 'rgb(34, 197, 94)',
            secondary: 'rgb(16, 185, 129)',
            tertiary: 'rgb(5, 150, 105)'
        }
    }
};
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ClientThemeProvider({ children, defaultTheme = "system", enableSystem = true, attribute = "class", storageKey = "sunny-institution-theme", disableTransitionOnChange = false }) {
    _s();
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultTheme);
    const [actualTheme, setActualTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('light');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Get system preference
    const getSystemTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClientThemeProvider.useCallback[getSystemTheme]": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
    }["ClientThemeProvider.useCallback[getSystemTheme]"], []);
    // Apply theme to document
    const applyTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClientThemeProvider.useCallback[applyTheme]": (newTheme)=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const root = window.document.documentElement;
            if (!disableTransitionOnChange) {
                root.classList.add('theme-transition');
                setTimeout({
                    "ClientThemeProvider.useCallback[applyTheme]": ()=>root.classList.remove('theme-transition')
                }["ClientThemeProvider.useCallback[applyTheme]"], 150);
            }
            root.classList.remove('light', 'dark');
            root.classList.add(newTheme);
            if (attribute === 'class') {
                root.classList.add(newTheme);
            } else if (attribute) {
                root.setAttribute(attribute, newTheme);
            }
            setActualTheme(newTheme);
        }
    }["ClientThemeProvider.useCallback[applyTheme]"], [
        attribute,
        disableTransitionOnChange
    ]);
    // Set theme with persistence
    const setTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClientThemeProvider.useCallback[setTheme]": (newTheme)=>{
            setThemeState(newTheme);
            if ("TURBOPACK compile-time truthy", 1) {
                try {
                    localStorage.setItem(storageKey, newTheme);
                } catch (e) {
                    console.warn('Failed to save theme to localStorage:', e);
                }
            }
            const resolvedTheme = newTheme === 'system' ? getSystemTheme() : newTheme;
            applyTheme(resolvedTheme);
        }
    }["ClientThemeProvider.useCallback[setTheme]"], [
        applyTheme,
        getSystemTheme,
        storageKey
    ]);
    // Toggle between light and dark (skips system)
    const toggleTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClientThemeProvider.useCallback[toggleTheme]": ()=>{
            const newTheme = actualTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        }
    }["ClientThemeProvider.useCallback[toggleTheme]"], [
        actualTheme,
        setTheme
    ]);
    // Initialize theme on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientThemeProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            let initialTheme = defaultTheme;
            // Try to get saved theme from localStorage
            try {
                const savedTheme = localStorage.getItem(storageKey);
                if (savedTheme && [
                    'light',
                    'dark',
                    'system'
                ].includes(savedTheme)) {
                    initialTheme = savedTheme;
                }
            } catch (e) {
                console.warn('Failed to read theme from localStorage:', e);
            }
            setThemeState(initialTheme);
            const resolvedTheme = initialTheme === 'system' ? getSystemTheme() : initialTheme;
            applyTheme(resolvedTheme);
            setMounted(true);
        }
    }["ClientThemeProvider.useEffect"], [
        defaultTheme,
        storageKey,
        getSystemTheme,
        applyTheme
    ]);
    // Listen for system theme changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientThemeProvider.useEffect": ()=>{
            if (!enableSystem || theme !== 'system') return;
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = {
                "ClientThemeProvider.useEffect.handleChange": ()=>{
                    if (theme === 'system') {
                        applyTheme(getSystemTheme());
                    }
                }
            }["ClientThemeProvider.useEffect.handleChange"];
            mediaQuery.addEventListener('change', handleChange);
            return ({
                "ClientThemeProvider.useEffect": ()=>mediaQuery.removeEventListener('change', handleChange)
            })["ClientThemeProvider.useEffect"];
        }
    }["ClientThemeProvider.useEffect"], [
        theme,
        enableSystem,
        applyTheme,
        getSystemTheme
    ]);
    // Don't render until mounted to avoid hydration issues
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            actualTheme,
            setTheme,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/institutions-portal/src/components/providers/ThemeProvider.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
_s(ClientThemeProvider, "xa1TgOA0sJnQ/zRzEW54NQHweiw=");
_c = ClientThemeProvider;
const useTheme = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        // Return a safe fallback instead of throwing an error
        return {
            theme: 'light',
            actualTheme: 'light',
            setTheme: ()=>{},
            toggleTheme: ()=>{}
        };
    }
    return context;
};
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ClientThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_institutions-portal_src_components_providers_ThemeProvider_tsx_e1ec114a._.js.map