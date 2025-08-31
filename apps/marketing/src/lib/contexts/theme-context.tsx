'use client';

/**
 * Theme Context Provider for Sunny Payments
 * Provides theme state management and persistence
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Theme, ThemeContextType, ThemeProviderProps, ThemeConfig } from '@/lib/types/theme';
import { themes } from '@/lib/theme/theme-config';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'sunny-theme',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Get system preference
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Resolve actual theme based on current theme setting
  const resolveTheme = useCallback((currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return getSystemTheme();
    }
    return currentTheme;
  }, [getSystemTheme]);

  // Apply theme to document
  const applyTheme = useCallback((newTheme: 'light' | 'dark') => {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;
    
    // Disable transitions temporarily if requested
    if (disableTransitionOnChange) {
      const css = document.createElement('style');
      css.appendChild(
        document.createTextNode(
          `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
        )
      );
      document.head.appendChild(css);

      // Re-enable transitions after a brief delay
      setTimeout(() => {
        document.head.removeChild(css);
      }, 1);
    }

    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    if (attribute === 'class') {
      root.classList.add(newTheme);
    } else {
      root.setAttribute(attribute, newTheme);
    }

    // Set CSS custom properties for the theme
    const themeConfig = themes[newTheme];
    const style = root.style;
    
    // Apply theme colors as CSS custom properties
    style.setProperty('--color-background-primary', themeConfig.colors.background.primary);
    style.setProperty('--color-background-secondary', themeConfig.colors.background.secondary);
    style.setProperty('--color-background-tertiary', themeConfig.colors.background.tertiary);
    style.setProperty('--color-background-elevated', themeConfig.colors.background.elevated);
    
    style.setProperty('--color-text-primary', themeConfig.colors.text.primary);
    style.setProperty('--color-text-secondary', themeConfig.colors.text.secondary);
    style.setProperty('--color-text-tertiary', themeConfig.colors.text.tertiary);
    style.setProperty('--color-text-inverse', themeConfig.colors.text.inverse);
    
    style.setProperty('--color-border-primary', themeConfig.colors.border.primary);
    style.setProperty('--color-border-secondary', themeConfig.colors.border.secondary);
    style.setProperty('--color-border-accent', themeConfig.colors.border.accent);
    
    style.setProperty('--gradient-primary', themeConfig.gradients.primary);
    style.setProperty('--gradient-secondary', themeConfig.gradients.secondary);
    style.setProperty('--gradient-accent', themeConfig.gradients.accent);
  }, [attribute, disableTransitionOnChange]);

  // Set theme and persist to localStorage
  const setTheme = useCallback((newTheme: Theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
    setThemeState(newTheme);
  }, [storageKey]);

  // Toggle between light and dark (skips system)
  const toggleTheme = useCallback(() => {
    setTheme(actualTheme === 'light' ? 'dark' : 'light');
  }, [actualTheme, setTheme]);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme);
      } else if (enableSystem) {
        setThemeState('system');
      } else {
        setThemeState('light');
      }
    } catch (error) {
      console.error('Error reading theme from localStorage:', error);
      setThemeState(defaultTheme);
    }

    setMounted(true);
  }, [defaultTheme, enableSystem, storageKey]);

  // Update actual theme when theme or system preference changes
  useEffect(() => {
    if (!mounted) return;

    const newActualTheme = resolveTheme(theme);
    setActualTheme(newActualTheme);
    applyTheme(newActualTheme);
  }, [theme, mounted, resolveTheme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || !enableSystem || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const newActualTheme = getSystemTheme();
      setActualTheme(newActualTheme);
      applyTheme(newActualTheme);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [mounted, enableSystem, theme, getSystemTheme, applyTheme]);

  // Get current theme configuration
  const themeConfig: ThemeConfig = themes[actualTheme];

  const contextValue: ThemeContextType = {
    theme,
    actualTheme,
    setTheme,
    toggleTheme,
    themeConfig,
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Safe theme hook that doesn't throw errors during SSR or when provider is missing
export function useSafeTheme(): ThemeContextType | null {
  const context = useContext(ThemeContext);
  return context || null;
}

// Hook for accessing theme colors directly
export function useThemeColors() {
  const { themeConfig } = useTheme();
  return themeConfig.colors;
}

// Hook for checking if dark mode is active
export function useIsDarkMode(): boolean {
  const { actualTheme } = useTheme();
  return actualTheme === 'dark';
}
