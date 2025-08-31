const Sentry = require('@sentry/node');
const { Integrations } = require("@sentry/tracing");
const DatadogTracer = require('dd-trace');
const NewRelic = require('newrelic');
const config = require('../src/config/config');

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: config.app.environment,
  beforeSend(event) {
    // Scrub sensitive data
    if (event.request?.data) {
      const sensitiveFields = ['cardNumber', 'cvv', 'password'];
      sensitiveFields.forEach(field => {
        if (event.request.data[field]) {
          event.request.data[field] = '[REDACTED]';
        }
      });
    }
    return event;
  }
});

// Initialize DataDog APM
DatadogTracer.init({
  env: config.app.environment,
  service: 'sunny-payments',
  version: config.app.version,
  logInjection: true
});

// Configure custom metrics
DatadogTracer.tracer.trace('payment.processing', {
  tags: {
    'payment.type': 'credit_card',
    'payment.status': 'success'
  }
});

// Export monitoring utilities
module.exports = {
  monitorPayment: (paymentData) => {
    try {
      // Track payment in Sentry
      Sentry.addBreadcrumb({
        category: 'payment',
        message: 'Processing payment',
        level: Sentry.Severity.Info,
        data: {
          amount: paymentData.amount,
          currency: paymentData.currency,
          method: paymentData.method
        }
      });

      // Track in NewRelic
      NewRelic.recordCustomEvent('Payment', {
        amount: paymentData.amount,
        currency: paymentData.currency,
        method: paymentData.method,
        timestamp: Date.now()
      });

      // Custom DataDog span
      const span = DatadogTracer.startSpan('payment.process');
      span.setTag('payment.amount', paymentData.amount);
      span.setTag('payment.currency', paymentData.currency);
      span.setTag('payment.method', paymentData.method);
      span.finish();
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error in payment monitoring:', error);
    }
  },

  monitorError: (error, context = {}) => {
    Sentry.withScope(scope => {
      scope.setExtras(context);
      Sentry.captureException(error);
    });

    NewRelic.noticeError(error, context);
  },

  monitorApiEndpoint: (req, res, next) => {
    const startTime = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      
      NewRelic.recordMetric('Custom/API/Response/Duration', duration);
      NewRelic.recordCustomEvent('APIRequest', {
        path: req.path,
        method: req.method,
        statusCode: res.statusCode,
        duration,
        timestamp: Date.now()
      });

      DatadogTracer.increment('api.request.count', 1, [
        `path:${req.path}`,
        `method:${req.method}`,
        `status:${res.statusCode}`
      ]);
    });

    next();
  }
};
