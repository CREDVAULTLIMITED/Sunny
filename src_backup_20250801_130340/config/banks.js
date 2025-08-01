/**
 * Bank configuration for direct payment processing
 */

export const bankConfig = {
  visa: {
    name: 'VISA Direct',
    host: process.env.VISA_BANK_HOST,
    port: parseInt(process.env.VISA_BANK_PORT || '1234'),
    merchantId: process.env.VISA_MERCHANT_ID,
    terminalId: process.env.VISA_TERMINAL_ID,
    acquirerID: process.env.VISA_ACQUIRER_ID,
    clientCert: process.env.VISA_CLIENT_CERT,
    clientKey: process.env.VISA_CLIENT_KEY,
    serverCert: process.env.VISA_SERVER_CERT,
    merchantLocation: process.env.MERCHANT_LOCATION,
    messageTimeout: 30000,
    heartbeatInterval: 30000,
    maxReconnectAttempts: 3,
    reconnectDelay: 5000
  },
  mastercard: {
    name: 'Mastercard Direct',
    host: process.env.MASTERCARD_BANK_HOST,
    port: parseInt(process.env.MASTERCARD_BANK_PORT || '1235'),
    merchantId: process.env.MASTERCARD_MERCHANT_ID,
    terminalId: process.env.MASTERCARD_TERMINAL_ID,
    acquirerID: process.env.MASTERCARD_ACQUIRER_ID,
    clientCert: process.env.MASTERCARD_CLIENT_CERT,
    clientKey: process.env.MASTERCARD_CLIENT_KEY,
    serverCert: process.env.MASTERCARD_SERVER_CERT,
    merchantLocation: process.env.MERCHANT_LOCATION,
    messageTimeout: 30000,
    heartbeatInterval: 30000,
    maxReconnectAttempts: 3,
    reconnectDelay: 5000
  },
  amex: {
    name: 'AMEX Direct',
    host: process.env.AMEX_BANK_HOST,
    port: parseInt(process.env.AMEX_BANK_PORT || '1236'),
    merchantId: process.env.AMEX_MERCHANT_ID,
    terminalId: process.env.AMEX_TERMINAL_ID,
    acquirerID: process.env.AMEX_ACQUIRER_ID,
    clientCert: process.env.AMEX_CLIENT_CERT,
    clientKey: process.env.AMEX_CLIENT_KEY,
    serverCert: process.env.AMEX_SERVER_CERT,
    merchantLocation: process.env.MERCHANT_LOCATION,
    messageTimeout: 30000,
    heartbeatInterval: 30000,
    maxReconnectAttempts: 3,
    reconnectDelay: 5000
  }
};
