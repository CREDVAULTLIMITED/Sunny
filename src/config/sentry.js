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
