const webpack = require('webpack');
const path = require('path');

console.log('✅ config-overrides.js loaded');

module.exports = function override(config, env) {
  console.log('✅ webpack override function running');

  // Add resolve fallbacks for node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    process: require.resolve('process/browser'),
    fs: false,
    vm: false,
    http: false,
    https: false,
  };

  // Add resolve for JSX runtime
  config.resolve.alias = {
    ...config.resolve.alias,
    'react/jsx-runtime': require.resolve('react/jsx-runtime'),
  };

  // Add resolve extensions
  config.resolve.extensions = [...(config.resolve.extensions || []), '.js', '.jsx', '.json'];

  // Add module rules for ESM
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false
      }
    }
  ];

  // Add plugins
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  // Return the modified config
  return config;
};