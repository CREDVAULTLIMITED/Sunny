const tracer = require('dd-trace').init({
  env: process.env.NODE_ENV,
  service: 'sunny-payments',
  version: process.env.npm_package_version,
  analytics: true,
  logInjection: true,
  runtimeMetrics: true,
  clientToken: process.env.DATADOG_CLIENT_TOKEN,
  site: 'datadoghq.com'
});

module.exports = tracer;
