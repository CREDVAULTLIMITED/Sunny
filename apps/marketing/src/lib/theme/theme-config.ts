/**
 * Theme configuration for light and dark modes
 */

import { ThemeConfig } from '@/lib/types/theme';

export const lightTheme: ThemeConfig = {
  name: 'light',
  colors: {
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      elevated: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#ffffff',
    },
    border: {
      primary: '#e2e8f0',
      secondary: '#cbd5e1',
      accent: '#22c55e',
    },
    brand: {
      primary: '#22c55e', // Green-500
      secondary: '#10b981', // Emerald-500
      accent: '#059669',   // Emerald-600
    },
    status: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
    secondary: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    accent: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  },
};

export const darkTheme: ThemeConfig = {
  name: 'dark',
  colors: {
    background: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      elevated: '#1e293b',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
      inverse: '#0f172a',
    },
    border: {
      primary: '#334155',
      secondary: '#475569',
      accent: '#22c55e',
    },
    brand: {
      primary: '#22c55e', // Keep brand colors consistent
      secondary: '#10b981',
      accent: '#059669',
    },
    status: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.2)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.2)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.2)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
    secondary: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    accent: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type ThemeName = keyof typeof themes;

