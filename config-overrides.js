const webpack = require('webpack');
const path = require('path');

console.log('✅ config-overrides.js loaded');

module.exports = function override(config, env) {
  console.log('✅ webpack override function running');

  // Add fallbacks for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    fs: false,
    vm: false,
    http: false,
    https: false,
    net: false,
    tls: false,
    zlib: false,
    child_process: false,
    dns: false
  };

  // Add buffer and process to plugins
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    }),
    new webpack.NormalModuleReplacementPlugin(
      /node:/, 
      (resource) => {
        const mod = resource.request.replace(/^node:/, "");
        switch (mod) {
          case 'buffer':
            resource.request = 'buffer';
            break;
          case 'stream':
            resource.request = 'stream-browserify';
            break;
          default:
            break;
        }
      }
    )
  );

  return config;
}