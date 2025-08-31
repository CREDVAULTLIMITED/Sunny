'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

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

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ClientThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  attribute?: string;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
}

export function ClientThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  attribute = "class",
  storageKey = "sunny-institution-theme",
  disableTransitionOnChange = false,
}: ClientThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Get system preference
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((newTheme: 'light' | 'dark') => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    
    if (!disableTransitionOnChange) {
      root.classList.add('theme-transition');
      setTimeout(() => root.classList.remove('theme-transition'), 150);
    }

    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    
    if (attribute === 'class') {
      root.classList.add(newTheme);
    } else if (attribute) {
      root.setAttribute(attribute, newTheme);
    }
    
    setActualTheme(newTheme);
  }, [attribute, disableTransitionOnChange]);

  // Set theme with persistence
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch (e) {
        console.warn('Failed to save theme to localStorage:', e);
      }
    }

    const resolvedTheme = newTheme === 'system' ? getSystemTheme() : newTheme;
    applyTheme(resolvedTheme);
  }, [applyTheme, getSystemTheme, storageKey]);

  // Toggle between light and dark (skips system)
  const toggleTheme = useCallback(() => {
    const newTheme = actualTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [actualTheme, setTheme]);

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let initialTheme = defaultTheme;

    // Try to get saved theme from localStorage
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        initialTheme = savedTheme;
      }
    } catch (e) {
      console.warn('Failed to read theme from localStorage:', e);
    }

    setThemeState(initialTheme);
    const resolvedTheme = initialTheme === 'system' ? getSystemTheme() : initialTheme;
    applyTheme(resolvedTheme);
    setMounted(true);
  }, [defaultTheme, storageKey, getSystemTheme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme(getSystemTheme());
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, enableSystem, applyTheme, getSystemTheme]);

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        actualTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return a safe fallback instead of throwing an error
    return {
      theme: 'light' as const,
      actualTheme: 'light' as const,
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
};
