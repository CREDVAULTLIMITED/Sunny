'use client';

/**
 * Global Theme Context Provider for all Sunny Platform Applications
 * Provides theme state management, dashboard variants, and persistence
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Theme, ThemeConfig, DashboardVariant, themes } from './theme-config';

export interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark'; // Resolved theme (when system is selected)
  dashboardVariant: DashboardVariant;
  setTheme: (theme: Theme) => void;
  setDashboardVariant: (variant: DashboardVariant) => void;
  toggleTheme: () => void;
  themeConfig: ThemeConfig;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  dashboardVariant?: DashboardVariant;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  dashboardVariant = 'marketing',
  storageKey = 'sunny-theme',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [currentDashboardVariant, setCurrentDashboardVariant] = useState<DashboardVariant>(dashboardVariant);
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

  // Apply theme to document with dashboard-specific CSS custom properties
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
    style.setProperty('--color-background-card', themeConfig.colors.background.card);
    style.setProperty('--color-background-surface', themeConfig.colors.background.surface);
    
    style.setProperty('--color-text-primary', themeConfig.colors.text.primary);
    style.setProperty('--color-text-secondary', themeConfig.colors.text.secondary);
    style.setProperty('--color-text-tertiary', themeConfig.colors.text.tertiary);
    style.setProperty('--color-text-inverse', themeConfig.colors.text.inverse);
    style.setProperty('--color-text-muted', themeConfig.colors.text.muted);
    
    style.setProperty('--color-border-primary', themeConfig.colors.border.primary);
    style.setProperty('--color-border-secondary', themeConfig.colors.border.secondary);
    style.setProperty('--color-border-accent', themeConfig.colors.border.accent);
    style.setProperty('--color-border-muted', themeConfig.colors.border.muted);
    
    style.setProperty('--color-brand-primary', themeConfig.colors.brand.primary);
    style.setProperty('--color-brand-secondary', themeConfig.colors.brand.secondary);
    style.setProperty('--color-brand-accent', themeConfig.colors.brand.accent);
    style.setProperty('--color-brand-light', themeConfig.colors.brand.light);
    style.setProperty('--color-brand-dark', themeConfig.colors.brand.dark);
    
    style.setProperty('--color-status-success', themeConfig.colors.status.success);
    style.setProperty('--color-status-warning', themeConfig.colors.status.warning);
    style.setProperty('--color-status-error', themeConfig.colors.status.error);
    style.setProperty('--color-status-info', themeConfig.colors.status.info);

    // Dashboard-specific colors
    style.setProperty('--color-dashboard-current', themeConfig.colors.dashboard[currentDashboardVariant]);
    style.setProperty('--gradient-dashboard-current', themeConfig.gradients.dashboard[currentDashboardVariant]);
    
    style.setProperty('--gradient-primary', themeConfig.gradients.primary);
    style.setProperty('--gradient-secondary', themeConfig.gradients.secondary);
    style.setProperty('--gradient-accent', themeConfig.gradients.accent);

    // Shadow properties
    style.setProperty('--shadow-xs', themeConfig.shadows.xs);
    style.setProperty('--shadow-sm', themeConfig.shadows.sm);
    style.setProperty('--shadow-md', themeConfig.shadows.md);
    style.setProperty('--shadow-lg', themeConfig.shadows.lg);
    style.setProperty('--shadow-xl', themeConfig.shadows.xl);
    style.setProperty('--shadow-2xl', themeConfig.shadows['2xl']);
    style.setProperty('--shadow-inner', themeConfig.shadows.inner);

    // Animation properties
    style.setProperty('--duration-fast', themeConfig.animations.duration.fast);
    style.setProperty('--duration-normal', themeConfig.animations.duration.normal);
    style.setProperty('--duration-slow', themeConfig.animations.duration.slow);
    style.setProperty('--easing-default', themeConfig.animations.easing.default);
    style.setProperty('--easing-bounce', themeConfig.animations.easing.bounce);
    style.setProperty('--easing-smooth', themeConfig.animations.easing.smooth);

    // Set dashboard variant class
    root.classList.remove('dashboard-marketing', 'dashboard-user', 'dashboard-business', 'dashboard-institution', 'dashboard-admin', 'dashboard-developer');
    root.classList.add(`dashboard-${currentDashboardVariant}`);
  }, [attribute, disableTransitionOnChange, currentDashboardVariant]);

  // Set theme and persist to localStorage
  const setTheme = useCallback((newTheme: Theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
    setThemeState(newTheme);
  }, [storageKey]);

  // Set dashboard variant
  const setDashboardVariant = useCallback((variant: DashboardVariant) => {
    setCurrentDashboardVariant(variant);
  }, []);

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

  // Re-apply theme when dashboard variant changes
  useEffect(() => {
    if (!mounted) return;
    applyTheme(actualTheme);
  }, [currentDashboardVariant, mounted, actualTheme, applyTheme]);

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
    dashboardVariant: currentDashboardVariant,
    setTheme,
    setDashboardVariant,
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

// Hook for getting dashboard-specific colors
export function useDashboardColors() {
  const { themeConfig, dashboardVariant } = useTheme();
  return {
    primary: themeConfig.colors.dashboard[dashboardVariant],
    gradient: themeConfig.gradients.dashboard[dashboardVariant],
  };
}
