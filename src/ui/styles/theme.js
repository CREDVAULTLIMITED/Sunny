/**
 * Sunny Payment Gateway - Design System
 * 
 * This file contains the core design tokens for the Sunny platform,
 * ensuring consistent styling across all components and pages.
 */

export const colors = {
  // Primary brand colors
  primary: {
    50: '#e6f7ff',
    100: '#b3e6ff',
    200: '#80d4ff',
    300: '#4dc2ff',
    400: '#1aafff',
    500: '#0099e6', // Main primary color
    600: '#0077b3',
    700: '#005580',
    800: '#00334d',
    900: '#00121a',
  },
  
  // Secondary accent colors
  secondary: {
    50: '#fff8e6',
    100: '#ffeab3',
    200: '#ffdc80',
    300: '#ffce4d',
    400: '#ffc01a',
    500: '#e6ab00', // Main secondary color
    600: '#b38600',
    700: '#806100',
    800: '#4d3a00',
    900: '#1a1400',
  },
  
  // Neutral colors for text, backgrounds, etc.
  neutral: {
    50: '#f8f9fa',
    100: '#eef1f4',
    200: '#e2e7ec',
    300: '#d0d7df',
    400: '#b0bac5',
    500: '#8c98a8', // Main text color
    600: '#6c7a8c',
    700: '#4e5c6e',
    800: '#333d4b',
    900: '#1a2028',
  },
  
  // Functional colors for status indicators
  success: {
    light: '#e6f7ed',
    main: '#00b359',
    dark: '#008c45',
  },
  warning: {
    light: '#fff8e6',
    main: '#ffb31a',
    dark: '#cc8800',
  },
  error: {
    light: '#ffe6e6',
    main: '#ff1a1a',
    dark: '#cc0000',
  },
  info: {
    light: '#e6f0ff',
    main: '#1a75ff',
    dark: '#0052cc',
  },
  
  // Special purpose colors
  background: {
    default: '#ffffff',
    paper: '#f8f9fa',
    elevated: '#ffffff',
    dark: '#1a2028',
  },
  text: {
    primary: '#333d4b',
    secondary: '#6c7a8c',
    disabled: '#b0bac5',
    hint: '#8c98a8',
    white: '#ffffff',
  },
  divider: '#e2e7ec',
  border: '#d0d7df',
};

export const typography = {
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    secondary: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    mono: "'Roboto Mono', monospace",
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
  40: '10rem',     // 160px
  48: '12rem',     // 192px
  56: '14rem',     // 224px
  64: '16rem',     // 256px
};

export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  default: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',   // Fully rounded (circles)
};

export const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
};

export const zIndex = {
  mobileStepper: 1000,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

// Complete theme object
const theme = {
  colors,
  typography,
  spacing,
  breakpoints,
  shadows,
  borderRadius,
  transitions,
  zIndex,
};

export default theme;