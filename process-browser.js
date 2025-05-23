// Minimal process polyfill for browser environments
const process = {
  env: {},
  browser: true,
  version: '',
  nextTick: function(fn) { setTimeout(fn, 0); }
};

module.exports = process;