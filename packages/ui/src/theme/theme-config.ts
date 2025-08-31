/**
 * Global theme configuration for all Sunny platform applications
 * Extended theme system with dashboard-specific variants
 */

export type Theme = 'light' | 'dark' | 'system';
export type DashboardVariant = 'marketing' | 'user' | 'business' | 'institution' | 'admin' | 'developer';

export interface ThemeColors {
  // Background colors
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
    card: string;
    surface: string;
  };
  
  // Text colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    muted: string;
  };
  
  // Border colors
  border: {
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
  };
  
  // Brand colors (consistent across themes)
  brand: {
    primary: string;
    secondary: string;
    accent: string;
    light: string;
    dark: string;
  };
  
  // Status colors
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };

  // Dashboard-specific accent colors
  dashboard: {
    marketing: string;
    user: string;
    business: string;
    institution: string;
    admin: string;
    developer: string;
  };
}

export interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  shadows: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    dashboard: {
      marketing: string;
      user: string;
      business: string;
      institution: string;
      admin: string;
      developer: string;
    };
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      default: string;
      bounce: string;
      smooth: string;
    };
  };
}

export const lightTheme: ThemeConfig = {
  name: 'light',
  colors: {
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      elevated: '#ffffff',
      card: '#ffffff',
      surface: '#f8fafc',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#ffffff',
      muted: '#94a3b8',
    },
    border: {
      primary: '#e2e8f0',
      secondary: '#cbd5e1',
      accent: '#22c55e',
      muted: '#f1f5f9',
    },
    brand: {
      primary: '#22c55e', // Green-500
      secondary: '#10b981', // Emerald-500
      accent: '#059669',   // Emerald-600
      light: '#dcfce7',    // Green-100
      dark: '#166534',     // Green-800
    },
    status: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    dashboard: {
      marketing: '#22c55e',  // Green for marketing
      user: '#3b82f6',       // Blue for user
      business: '#10b981',   // Emerald for business
      institution: '#64748b', // Slate for institution
      admin: '#ef4444',      // Red for admin
      developer: '#8b5cf6',  // Purple for developer
    },
  },
  shadows: {
    xs: '0 1px 1px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
    secondary: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    accent: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    dashboard: {
      marketing: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
      user: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      business: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      institution: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
      admin: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      developer: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    },
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
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
      card: '#1e293b',
      surface: '#0f172a',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
      inverse: '#0f172a',
      muted: '#64748b',
    },
    border: {
      primary: '#334155',
      secondary: '#475569',
      accent: '#22c55e',
      muted: '#1e293b',
    },
    brand: {
      primary: '#22c55e', // Keep brand colors consistent
      secondary: '#10b981',
      accent: '#059669',
      light: '#166534',   // Darker for dark theme
      dark: '#dcfce7',    // Lighter for dark theme
    },
    status: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    dashboard: {
      marketing: '#22c55e',  // Green for marketing
      user: '#3b82f6',       // Blue for user
      business: '#10b981',   // Emerald for business
      institution: '#94a3b8', // Lighter slate for dark theme
      admin: '#ef4444',      // Red for admin
      developer: '#8b5cf6',  // Purple for developer
    },
  },
  shadows: {
    xs: '0 1px 1px 0 rgb(0 0 0 / 0.2)',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.2)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.2)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.2)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.4)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.12)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
    secondary: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    accent: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    dashboard: {
      marketing: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
      user: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      business: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      institution: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
      admin: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      developer: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    },
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type ThemeName = keyof typeof themes;
