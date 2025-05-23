// Minimal process polyfill for browser environments
window.process = {
  env: {},
  browser: true,
  version: '',
  nextTick: function(fn) { setTimeout(fn, 0); }
};

// Use CommonJS export for compatibility with both import and require
module.exports = window.process;