#!/bin/bash

# Production Monitoring Setup Script
echo "Setting up Production Monitoring..."

# Install monitoring tools
npm install --save \
  @sentry/node@7.0.0 \
  @sentry/tracing@7.0.0 \
  newrelic@9.0.0 \
  dd-trace@3.0.0 \
  prometheus-client@0.5.0

# Create Sentry configuration
cat > src/config/sentry.js << 'EOL'
const Sentry = require('@sentry/node');
const { Integrations } = require('@sentry/tracing');

const initSentry = () => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    beforeSend(event) {
      // Scrub sensitive data
      if (event.request && event.request.data) {
        delete event.request.data.cardNumber;
        delete event.request.data.cvv;
      }
      return event;
    }
  });
};

module.exports = { initSentry };
EOL

# Create New Relic configuration
cat > newrelic.js << 'EOL'
exports.config = {
  app_name: ['Sunny Payments'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: {
    level: 'info',
    enabled: true
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  }
};
EOL

# Create DataDog configuration
cat > src/config/datadog.js << 'EOL'
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
EOL

# Create Prometheus metrics configuration
cat > src/config/metrics.js << 'EOL'
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
EOL

# Create monitoring endpoints
cat > src/routes/monitoring.js << 'EOL'
const express = require('express');
const router = express.Router();
const metrics = require('../config/metrics');

router.get('/metrics', async (req, res) => {
  res.set('Content-Type', metrics.register.contentType);
  res.end(await metrics.register.metrics());
});

router.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

router.get('/status', async (req, res) => {
  const status = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    connections: await getConnectionStatus(),
    services: await checkServices()
  };
  res.json(status);
});

module.exports = router;
EOL

# Create Grafana dashboard configuration
mkdir -p monitoring/grafana/dashboards
cat > monitoring/grafana/dashboards/payment-gateway.json << 'EOL'
{
  "dashboard": {
    "id": null,
    "title": "Sunny Payments Dashboard",
    "tags": ["payments", "production"],
    "timezone": "browser",
    "panels": [
      {
        "title": "HTTP Request Duration",
        "type": "graph",
        "datasource": "Prometheus",
        "targets": [
          {
            "expr": "rate(http_request_duration_ms_sum[5m]) / rate(http_request_duration_ms_count[5m])",
            "legendFormat": "{{method}} {{route}}"
          }
        ]
      },
      {
        "title": "Payment Processing Duration",
        "type": "graph",
        "datasource": "Prometheus",
        "targets": [
          {
            "expr": "rate(payment_processing_duration_ms_sum[5m]) / rate(payment_processing_duration_ms_count[5m])",
            "legendFormat": "{{payment_method}}"
          }
        ]
      }
    ]
  }
}
EOL

# Create alert rules
cat > monitoring/alert-rules.yml << 'EOL'
groups:
- name: sunny-payments
  rules:
  - alert: HighErrorRate
    expr: rate(http_request_duration_ms_count{code=~"5.."}[5m]) > 0.1
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: High HTTP error rate
      description: Error rate is {{ $value }} for the last 5 minutes

  - alert: SlowPaymentProcessing
    expr: rate(payment_processing_duration_ms_sum[5m]) / rate(payment_processing_duration_ms_count[5m]) > 2000
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: Slow payment processing
      description: Average payment processing time is {{ $value }}ms

  - alert: HighMemoryUsage
    expr: process_resident_memory_bytes > 1.5e9
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: High memory usage
      description: Memory usage is {{ $value | humanize }}
EOL

# Create payment monitoring configuration
cat > src/config/payment-monitoring.js << 'EOL'
const newrelic = require('newrelic');
const Sentry = require('@sentry/node');

class PaymentMonitoring {
  static trackPayment(paymentData) {
    // Track payment attempt
    newrelic.recordCustomEvent('PaymentAttempt', {
      amount: paymentData.amount,
      currency: paymentData.currency,
      paymentMethod: paymentData.method,
      timestamp: Date.now()
    });

    // Monitor payment processing time
    const startTime = process.hrtime();
    return {
      end: (status) => {
        const duration = process.hrtime(startTime);
        const durationMs = (duration[0] * 1e9 + duration[1]) / 1e6;

        newrelic.recordMetric('PaymentProcessingTime', durationMs);
        newrelic.recordCustomEvent('PaymentComplete', {
          status,
          duration: durationMs,
          timestamp: Date.now()
        });

        if (status === 'failed') {
          Sentry.captureMessage('Payment Failed', {
            level: 'error',
            extra: {
              paymentData,
              duration: durationMs
            }
          });
        }
      }
    };
  }

  static monitorCryptoTransaction(txHash, network) {
    newrelic.recordCustomEvent('CryptoTransaction', {
      txHash,
      network,
      timestamp: Date.now()
    });
  }
}

module.exports = PaymentMonitoring;
EOL

# Create security monitoring configuration
cat > src/config/security-monitoring.js << 'EOL'
const newrelic = require('newrelic');
const Sentry = require('@sentry/node');

class SecurityMonitoring {
  static trackSecurityEvent(eventType, data) {
    newrelic.recordCustomEvent('SecurityEvent', {
      type: eventType,
      ...data,
      timestamp: Date.now()
    });

    if (eventType === 'suspicious' || eventType === 'breach') {
      Sentry.captureMessage(`Security Event: ${eventType}`, {
        level: 'warning',
        extra: data
      });
    }
  }

  static monitorRateLimit(ip, endpoint) {
    newrelic.recordCustomEvent('RateLimit', {
      ip,
      endpoint,
      timestamp: Date.now()
    });
  }

  static trackFailedLogin(username, ip) {
    newrelic.recordCustomEvent('FailedLogin', {
      username,
      ip,
      timestamp: Date.now()
    });
  }
}

module.exports = SecurityMonitoring;
EOL

# Set up Prometheus alerting rules
cat > monitoring/alert-rules.yml << 'EOL'
groups:
- name: payment_alerts
  rules:
  - alert: HighPaymentFailureRate
    expr: rate(payment_failure_total[5m]) / rate(payment_attempt_total[5m]) > 0.1
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: High payment failure rate
      description: Payment failure rate is {{ $value }} for the last 5 minutes

  - alert: SlowPaymentProcessing
    expr: payment_processing_duration_seconds > 10
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: Slow payment processing
      description: Payment processing taking longer than 10 seconds

  - alert: CryptoNodeDown
    expr: crypto_node_health == 0
    for: 2m
    labels:
      severity: critical
    annotations:
      summary: Cryptocurrency node is down
      description: {{ $labels.node }} is not responding

  - alert: HighSecurityEvents
    expr: rate(security_events_total{severity="high"}[5m]) > 10
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: High number of security events
      description: Detecting {{ $value }} high severity security events per second
EOL

echo "Setting up DataDog APM..."
cat > src/config/datadog-apm.js << 'EOL'
const tracer = require('dd-trace').init({
  env: process.env.NODE_ENV,
  service: 'sunny-payments',
  version: process.env.npm_package_version,
  analytics: true,
  logInjection: true,
  runtimeMetrics: true
});

// Payment processing traces
tracer.wrap('payment.process', (span, payment) => {
  span.setTag('payment.id', payment.id);
  span.setTag('payment.amount', payment.amount);
  span.setTag('payment.method', payment.method);
});

// Crypto transaction traces
tracer.wrap('crypto.transaction', (span, tx) => {
  span.setTag('crypto.txHash', tx.hash);
  span.setTag('crypto.network', tx.network);
});

module.exports = tracer;
EOL

echo "✅ Enhanced monitoring setup complete!"
