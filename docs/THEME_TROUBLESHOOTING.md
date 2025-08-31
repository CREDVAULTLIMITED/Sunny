# Theme System Troubleshooting Guide

## Error: "useTheme must be used within a ThemeProvider"

This error occurs when a component tries to use the `useTheme` hook outside of the `ThemeProvider` context or during server-side rendering.

### Root Cause Analysis

1. **Component rendered outside ThemeProvider**: The component using `useTheme` is not wrapped within the `ThemeProvider` component.
2. **Hydration mismatch**: Server-side rendering tries to access the theme context before it's available on the client.
3. **Import issues**: Wrong ThemeProvider is being imported or used.

### Solutions Implemented

#### 1. Safe Theme Hook
We've created a `useSafeTheme` hook that returns `null` instead of throwing an error:

```typescript
// Safe theme hook that doesn't throw errors during SSR or when provider is missing
export function useSafeTheme(): ThemeContextType | null {
  const context = useContext(ThemeContext);
  return context || null;
}
```

#### 2. Safe Theme Toggle Component
Created `theme-toggle-safe.tsx` that:
- Uses `useSafeTheme` instead of `useTheme`
- Provides fallback behavior when context is not available
- Handles hydration properly with `mounted` state
- Renders skeleton during loading

#### 3. Proper Component Structure
Ensure the layout structure is correct:

```tsx
// apps/marketing/src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full antialiased`}>
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          attribute="class"
          storageKey="sunny-theme"
          disableTransitionOnChange={false}
        >
          <Layout>
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Quick Fix Steps

1. **Replace theme-toggle import**:
   ```tsx
   // Before
   import { CompactThemeToggle } from '@/components/ui/theme-toggle';
   
   // After
   import { CompactThemeToggle } from '@/components/ui/theme-toggle-safe';
   ```

2. **Use safe theme hook in custom components**:
   ```tsx
   // Before
   const { theme, setTheme } = useTheme();
   
   // After
   const themeContext = useSafeTheme();
   if (!themeContext) return <div>Loading...</div>;
   const { theme, setTheme } = themeContext;
   ```

3. **Add proper hydration handling**:
   ```tsx
   const [mounted, setMounted] = useState(false);
   
   useEffect(() => {
     setMounted(true);
   }, []);
   
   if (!mounted) {
     return <div>Loading...</div>; // or skeleton
   }
   ```

### Prevention

1. **Always use ThemeProvider at root level** in `layout.tsx`
2. **Use safe theme hooks** for components that might render during SSR
3. **Add hydration guards** for client-only theme functionality
4. **Test in both development and production** builds

### Testing

1. **Check browser console** for hydration warnings
2. **Test theme switching** in both light and dark modes
3. **Verify SSR compatibility** by disabling JavaScript
4. **Test on different devices** and screen sizes

### Files Modified

- `apps/marketing/src/components/ui/theme-toggle-safe.tsx` - New safe theme toggle
- `apps/marketing/src/components/layout/Header.tsx` - Updated import
- `apps/marketing/src/lib/contexts/theme-context.tsx` - Added useSafeTheme hook

### Additional Resources

- [Next.js Hydration Documentation](https://nextjs.org/docs/messages/react-hydration-error)
- [React Context Documentation](https://react.dev/reference/react/useContext)
- [Theme System Architecture](./TECHNICAL_OVERVIEW.md#theme-system)
