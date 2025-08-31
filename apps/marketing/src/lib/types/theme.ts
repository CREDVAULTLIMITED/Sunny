/**
 * Theme system types for Sunny Payments
 */

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeColors {
  // Background colors
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
  };
  
  // Text colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  
  // Border colors
  border: {
    primary: string;
    secondary: string;
    accent: string;
  };
  
  // Brand colors (consistent across themes)
  brand: {
    primary: string;
    secondary: string;
    accent: string;
  };
  
  // Status colors
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

export interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark'; // Resolved theme (when system is selected)
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  themeConfig: ThemeConfig;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}
