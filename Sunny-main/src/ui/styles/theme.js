/**
 * Sunny Payment Gateway - UI Theme
 * 
 * Defines the theme and styling variables for the Sunny UI components
 * Matches CreditBoost's design system for consistent branding
 */

export const theme = {
  // Colors from CreditBoost's tailwind config
  colors: {
    primary: {
      DEFAULT: "#02A669",
      light: "#05B19B",
    },
    secondary: {
      DEFAULT: "#0177A5",
      light: "#12AACF",
    },
    background: "#F6F8F6",
    foreground: "#000000",
    border: "#E2E8F0",
    input: "#E2E8F0",
    ring: "#02A669",
    destructive: {
      DEFAULT: "#EF4444",
      foreground: "#FFFFFF",
    },
    muted: {
      DEFAULT: "#F1F5F9",
      foreground: "#64748B",
    },
    accent: {
      DEFAULT: "#05B19B",
      foreground: "#FFFFFF",
    },
    popover: {
      DEFAULT: "#FFFFFF",
      foreground: "#000000",
    },
    card: {
      DEFAULT: "#FFFFFF",
      foreground: "#000000",
    },
    // Sunny-specific colors
    sunny: {
      gold: "#F2C94C",
      orange: "#F2994A",
      purple: "#9B51E0",
      success: "#27AE60",
      warning: "#F2C94C",
      error: "#EB5757",
      info: "#2F80ED"
    }
  },
  
  // Typography
  fonts: {
    brand: "'Montserrat', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'Roboto Mono', monospace"
  },
  
  // Font sizes
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "brand-credit": "2rem",
    "brand-boost": "2rem"
  },
  
  // Font weights
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },
  
  // Border radius
  radii: {
    none: "0",
    sm: "0.125rem",
    md: "0.25rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px"
  },
  
  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    none: "none"
  },
  
  // Spacing
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
    40: "10rem",
    48: "12rem",
    56: "14rem",
    64: "16rem"
  },
  
  // Breakpoints
  breakpoints: {
    xs: "360px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1400px"
  },
  
  // Transitions
  transitions: {
    default: "all 0.2s ease-in-out",
    fast: "all 0.1s ease-in-out",
    slow: "all 0.3s ease-in-out"
  },
  
  // Z-index
  zIndices: {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  }
};

// Helper functions for using the theme
export const getColor = (colorPath) => {
  const parts = colorPath.split('.');
  let color = theme.colors;
  
  for (const part of parts) {
    if (color[part]) {
      color = color[part];
    } else {
      return null;
    }
  }
  
  return typeof color === 'string' ? color : color.DEFAULT || null;
};

export default theme;