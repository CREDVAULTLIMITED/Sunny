const prometheus = require('prometheus-client');

const collectDefaultMetrics = prometheus.collectDefaultMetrics;
const Registry = prometheus.Registry;
const register = new Registry();

collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500]
});

const paymentProcessingDuration = new prometheus.Histogram({
  name: 'payment_processing_duration_ms',
  help: 'Duration of payment processing in ms',
  labelNames: ['payment_method', 'status'],
  buckets: [50, 100, 200, 500, 1000, 2000, 5000]
});

register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(paymentProcessingDuration);

module.exports = {
  register,
  httpRequestDurationMicroseconds,
  paymentProcessingDuration
};
