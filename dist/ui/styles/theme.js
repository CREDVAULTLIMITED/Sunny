"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.theme = exports.getColor = exports["default"] = void 0;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Sunny Payment Gateway - UI Theme
 * 
 * Defines the theme and styling variables for the Sunny UI components
 * Matches CreditBoost's design system for consistent branding
 */

var theme = exports.theme = {
  // Colors from CreditBoost's tailwind config
  colors: {
    primary: {
      DEFAULT: "#02A669",
      light: "#05B19B"
    },
    secondary: {
      DEFAULT: "#0177A5",
      light: "#12AACF"
    },
    background: "#F6F8F6",
    foreground: "#000000",
    border: "#E2E8F0",
    input: "#E2E8F0",
    ring: "#02A669",
    destructive: {
      DEFAULT: "#EF4444",
      foreground: "#FFFFFF"
    },
    muted: {
      DEFAULT: "#F1F5F9",
      foreground: "#64748B"
    },
    accent: {
      DEFAULT: "#05B19B",
      foreground: "#FFFFFF"
    },
    popover: {
      DEFAULT: "#FFFFFF",
      foreground: "#000000"
    },
    card: {
      DEFAULT: "#FFFFFF",
      foreground: "#000000"
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
    "default": "all 0.2s ease-in-out",
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
var getColor = exports.getColor = function getColor(colorPath) {
  var parts = colorPath.split('.');
  var color = theme.colors;
  var _iterator = _createForOfIteratorHelper(parts),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var part = _step.value;
      if (color[part]) {
        color = color[part];
      } else {
        return null;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return typeof color === 'string' ? color : color.DEFAULT || null;
};
var _default = exports["default"] = theme;