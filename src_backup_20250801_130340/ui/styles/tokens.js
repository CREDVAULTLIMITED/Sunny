/**
 * Design Tokens for Sunny Payment Gateway
 * Contains core design decisions like colors, typography, spacing, animations etc.
 */

// Color Palette
export const colors = {
  // Brand colors
  brand: {
    // Modern blue as primary color
    primary: {
      50: '#f0f7ff',  // Lightest blue, good for hover states
      100: '#e3f1ff', // Light blue background
      200: '#c7e2ff', // Subtle blue background
      300: '#94cbff', // Light accents
      400: '#4aa9ff', // Secondary accents
      500: '#0070f3', // Main brand color
      600: '#0058cc', // Darker shade for hover states
      700: '#004299', // Even darker for active states
      800: '#002c66', // Very dark blue for text
      900: '#001433', // Darkest blue 
    },
    // Warm accent colors
    accent: {
      amber: {
        50: '#fff8e6',
        100: '#ffeab3',
        200: '#ffdc80',
        300: '#ffce4d',
        400: '#ffc01a',
        500: '#e6ab00',
        600: '#b38600',
      }
    }
  },

  // Semantic colors for different states
  semantic: {
    success: {
      50: '#e6fff2',
      100: '#b3ffd9',
      200: '#80ffbf',
      300: '#4dffa6',
      400: '#1aff8c',
      500: '#00e673',
      600: '#00b359',
    },
    error: {
      50: '#ffe6e6',
      100: '#ffb3b3',
      200: '#ff8080',
      300: '#ff4d4d',
      400: '#ff1a1a',
      500: '#e60000',
      600: '#b30000',
    },
    warning: {
      50: '#fff8e6',
      100: '#ffeab3',
      200: '#ffdc80',
      300: '#ffce4d',
      400: '#ffc01a',
      500: '#e6ab00',
      600: '#b38600',
    },
    info: {
      50: '#e6f7ff',
      100: '#b3e7ff',
      200: '#80d6ff',
      300: '#4dc6ff',
      400: '#1ab5ff',
      500: '#0099e6',
      600: '#0077b3',
    }
  },

  // Neutral colors for text and backgrounds
  neutral: {
    50: '#f8f9fa',   // Background light
    100: '#eef1f4',  // Background
    200: '#e2e7ec',  // Border light
    300: '#d0d7df',  // Border
    400: '#b0bac5',  // Disabled text
    500: '#8c98a8',  // Secondary text
    600: '#6c7a8c',  // Primary text
    700: '#4e5c6e',  // Heading text
    800: '#333d4b',  // Dark text
    900: '#1a2028',  // Darkest text
  },

  // Special purpose colors
  surface: {
    background: {
      light: '#ffffff',
      dark: '#1a2028',
    },
    paper: {
      light: '#f8f9fa',
      dark: '#333d4b',
    },
    elevated: {
      light: '#ffffff',
      dark: '#4e5c6e',
    }
  }
};

// Typography Scale
export const typography = {
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Roboto Mono', monospace"
  },
  size: {
    '3xs': '0.625rem',     // 10px - Very small text
    '2xs': '0.75rem',      // 12px - Small labels
    'xs': '0.875rem',      // 14px - Secondary text
    'sm': '1rem',          // 16px - Body text
    'md': '1.125rem',      // 18px - Large body text
    'lg': '1.25rem',       // 20px - Small headings
    'xl': '1.5rem',        // 24px - Section headings
    '2xl': '2rem',         // 32px - Page headings
    '3xl': '2.5rem',       // 40px - Large titles
    '4xl': '3rem',         // 48px - Display text
    '5xl': '4rem',         // 64px - Hero text
  },
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  tracking: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  }
};

// Spacing Scale
export const spacing = {
  0: '0',
  '2xs': '0.125rem',   // 2px
  'xs': '0.25rem',     // 4px
  'sm': '0.5rem',      // 8px
  'md': '0.75rem',     // 12px
  'base': '1rem',      // 16px
  'lg': '1.25rem',     // 20px
  'xl': '1.5rem',      // 24px
  '2xl': '2rem',       // 32px
  '3xl': '2.5rem',     // 40px
  '4xl': '3rem',       // 48px
  '5xl': '4rem',       // 64px
  '6xl': '5rem',       // 80px
};

// Border Radius
export const radius = {
  none: '0',
  'xs': '0.125rem',    // 2px
  'sm': '0.25rem',     // 4px
  'md': '0.375rem',    // 6px
  'base': '0.5rem',    // 8px
  'lg': '0.75rem',     // 12px
  'xl': '1rem',        // 16px
  '2xl': '1.5rem',     // 24px
  'full': '9999px',
};

// Shadows
export const shadows = {
  'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'sm': '0 2px 4px 0 rgba(0, 0, 0, 0.08)',
  'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// Animations
export const animations = {
  duration: {
    'instant': '0ms',
    'fastest': '100ms',
    'fast': '150ms',
    'normal': '200ms',
    'slow': '300ms',
    'slowest': '400ms',
  },
  easing: {
    // Standard easing curves
    'linear': 'linear',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Custom easing curves for specific interactions
    'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }
};

// Z-index scale
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
};

// Breakpoints for responsive design
export const breakpoints = {
  'xs': '320px',    // Small phones
  'sm': '640px',    // Large phones
  'md': '768px',    // Tablets
  'lg': '1024px',   // Laptops/Desktops
  'xl': '1280px',   // Large Desktops
  '2xl': '1536px',  // Extra Large Screens
};

// Media queries
export const mediaQueries = {
  'xs': `@media (min-width: ${breakpoints.xs})`,
  'sm': `@media (min-width: ${breakpoints.sm})`,
  'md': `@media (min-width: ${breakpoints.md})`,
  'lg': `@media (min-width: ${breakpoints.lg})`,
  'xl': `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
};

// Focus states
export const focusRing = {
  default: '0 0 0 3px rgba(66, 153, 225, 0.5)',
  error: '0 0 0 3px rgba(245, 101, 101, 0.5)',
  success: '0 0 0 3px rgba(72, 187, 120, 0.5)',
};
