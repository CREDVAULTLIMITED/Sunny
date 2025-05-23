# Sunny Payment Gateway Integration Guide

This comprehensive guide provides detailed instructions for integrating Sunny Payment Gateway into your application. Follow these instructions to implement all supported payment methods, handle webhooks, manage errors, and ensure your integration is secure and production-ready.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Setup Process](#setup-process)
3. [SDK Installation](#sdk-installation)
4. [Core Concepts](#core-concepts)
5. [Payment Methods](#payment-methods)
   - [Card Payments](#card-payments)
   - [Mobile Money](#mobile-money)
   - [PayPal](#paypal)
   - [Cryptocurrency](#cryptocurrency)
   - [Bank Transfers](#bank-transfers)
   - [QR Code Payments](#qr-code-payments)
6. [Webhook Handling](#webhook-handling)
7. [Error Handling](#error-handling)
8. [Testing](#testing)
9. [Production Checklist](#production-checklist)
10. [Security Best Practices](#security-best-practices)
11. [Rate Limits and Quotas](#rate-limits-and-quotas)
12. [API Reference](#api-reference)
13. [Support](#support)

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- A Sunny Payment Gateway account (sign up at [dashboard.sunnypayments.com](https://dashboard.sunnypayments.com))
- Completed the merchant verification process
- API keys (available in your dashboard)
- A basic understanding of your platform's development environment

### Supported Platforms

Sunny Payment Gateway supports integration with:

- Web applications (JavaScript, TypeScript)
- Mobile applications (iOS, Android, React Native, Flutter)
- Server-side applications (Node.js, Python, PHP, Java, Ruby, Go)
- E-commerce platforms (Shopify, WooCommerce, Magento)

## Setup Process

Follow these steps to set up your Sunny Payment Gateway integration:

1. **Create your account**
   - Sign up at [dashboard.sunnypayments.com](https://dashboard.sunnypayments.com)
   - Complete the verification process
   - Add business details and compliance information

2. **Configure your payment methods**
   - In your dashboard, navigate to "Payment Methods"
   - Enable the payment methods you want to accept
   - Complete provider-specific setup for each method

3. **Set up webhooks**
   - Navigate to "Developers > Webhooks" in your dashboard
   - Add a webhook endpoint URL where Sunny will send event notifications
   - Note your webhook secret for verifying webhook signatures

4. **Generate API keys**
   - Navigate to "Developers > API Keys" in your dashboard
   - Generate a set of API keys for your environment
   - Securely store these keys (they will only be shown once)

## SDK Installation

### JavaScript/TypeScript

```bash
npm install sunny-payment-gateway
# or
yarn add sunny-payment-gateway
```

### PHP

```bash
composer require sunny/payment-gateway
```

### Python

```bash
pip install sunny-payment-gateway
```

### Ruby

```bash
gem install sunny-payment-gateway
```

### Java

```xml
<!-- Add to your pom.xml -->
<dependency>
  <groupId>com.sunny</groupId>
  <artifactId>payment-gateway</artifactId>
  <version>1.0.0</version>
</dependency>
```

### Go

```bash
go get github.com/sunny/payment-gateway
```

## Core Concepts

### Initialization

All integrations start with initializing the Sunny SDK with your API key:

```javascript
import SunnySDK from 'sunny-payment-gateway';

const sunny = new SunnySDK({
  apiKey: 'your_api_key',
  environment: 'sandbox' // or 'production'
});
```

### Transaction Flow

A typical payment flow follows these steps:

1. **Create Payment Intent**: Initiate a payment with details like amount, currency, and payment method
2. **Collect Payment Details**: Gather payment information from the customer
3. **Submit Payment**: Process the payment using the collected details
4. **Handle Response**: Manage the response (success, failure, pending, etc.)
5. **Receive Webhook**: Get confirmation of the final payment status via webhook

### Payment Status

Payments can have the following statuses:

- `INITIATED`: Payment process has started
- `PENDING`: Payment is being processed
- `COMPLETED`: Payment was successful
- `FAILED`: Payment failed
- `CANCELLED`: Payment was cancelled
- `REFUNDED`: Payment was refunded
- `PARTIALLY_REFUNDED`: Payment was partially refunded

## Payment Methods

### Card Payments

Card payments are processed through our integration with Stripe and other card processors.

#### Setup

1. Enable Card Payments in your Sunny dashboard
2. Configure your Stripe account details if you're using your own Stripe account

#### Code Example

```javascript
// Card payment using Sunny SDK
async function processCardPayment() {
  try {
    const result = await sunny.createPayment({
      amount: '100.00',
      currency: 'USD',
      paymentMethod: 'card',
      card: {
        number: '4242424242424242',
        expMonth: '12',
        expYear: '2025',
        cvv: '123'
      },
      customer: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      description: 'Test payment',
      metadata: {
        orderNumber: 'ORDER-12345'
      }
    });
    
    return result;
  } catch (error) {
    console.error('Card payment failed:', error);
    throw error;
  }
}
```

#### Using Elements (UI Components)

For improved security and PCI compliance, use our pre-built UI components:

```javascript
// Initialize Sunny Elements
const elements = sunny.elements();

// Mount card element to a container
const cardElement = elements.create('card');
cardElement.mount('#card-element-container');

// Handle form submission
document.getElementById('payment-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  try {
    // Collect payment method
    const {paymentMethod, error} = await elements.createPaymentMethod('card');
    
    if (error) {
      console.error('Error creating payment method:', error);
      return;
    }
    
    // Create payment using collected payment method
    const result = await sunny.createPayment({
      amount: '100.00',
      currency: 'USD',
      paymentMethodId: paymentMethod.id,
      customer: {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
      }
    });
    
    // Handle result
    if (result.requiresAction) {
      // Handle 3D Secure authentication if required
      const {error} = await elements.handleAction(result.clientSecret);
      if (error) {
        throw error;
      }
    }
    
    console.log('Payment successful:', result);
  } catch (error) {
    console.error('Payment failed:', error);
  }
});
```

### Mobile Money

Mobile Money is a popular payment method in Africa and some Asian countries. We support multiple providers like M-Pesa, Airtel Money, and MTN Mobile Money.

#### Setup

1. Enable Mobile Money in your Sunny dashboard
2. Configure each provider you want to support
3. Complete any provider-specific registration processes

#### Code Example (M-Pesa)

```javascript
// M-Pesa payment
async function processMPesaPayment() {
  try {
    const result = await sunny.createPayment({
      amount: '1000.00',
      currency: 'KES',
      paymentMethod: 'mobile_money',
      mobileMoneyDetails: {
        provider: 'mpesa',
        phoneNumber: '254712345678'
      },
      customer: {
        name: 'Jane Doe',
        email: 'jane@example.com'
      },
      description: 'Purchase payment',
      metadata: {
        orderId: 'ORD-789'
      }
    });
    
    // For M-Pesa, the user will receive an STK push prompt
    // You'll get a webhook notification when the payment is completed
    
    return result;
  } catch (error) {
    console.error('M-Pesa payment failed:', error);
    throw error;
  }
}
```

#### Check Status (For Mobile Money)

Since mobile money transactions can take time to complete, you may need to check the status:

```javascript
async function checkPaymentStatus(transactionId) {
  try {
    const status = await sunny.checkPaymentStatus({
      transactionId: transactionId
    });
    
    return status;
  } catch (error) {
    console.error('Status check failed:', error);
    throw error;
  }
}
```

### PayPal

PayPal integration allows customers to pay using their PayPal accounts.

#### Setup

1. Enable PayPal in your Sunny dashboard
2. Configure your PayPal account details

#### Code Example

```javascript
// PayPal payment
async function processPayPalPayment() {
  try {
    const result = await sunny.createPayment({
      amount: '50.00',
      currency: 'USD',
      paymentMethod: 'paypal',
      customer: {
        name: 'Alice Smith',
        email: 'alice@example.com'
      },
      description: 'PayPal payment',
      returnUrl: 'https://yourwebsite.com/payment/success',
      cancelUrl: 'https://yourwebsite.com/payment/cancel',
      metadata: {
        orderId: 'ORD-456'
      }
    });
    
    // Redirect the user to the PayPal approval URL
    window.location.href = result.redirectUrl;
    
    return result;
  } catch (error) {
    console.error('PayPal payment failed:', error);
    throw error;
  }
}
```

#### Handling PayPal Return

Create handlers for your return and cancel URLs:

```javascript
// In your success route handler
async function handlePayPalSuccess(req, res) {
  const paymentId = req.query.paymentId;
  const payerId = req.query.PayerID;
  
  try {
    // Capture the approved PayPal payment
    const result = await sunny.capturePayment({
      provider: 'paypal',
      paymentId: paymentId,
      payerId: payerId
    });
    
    // Handle successful payment
    res.render('success', { result });
  } catch (error) {
    console.error('PayPal capture failed:', error);
    res.render('error', { error });
  }
}
```

### Cryptocurrency

Accept payments in cryptocurrencies like Bitcoin, Ethereum, and stablecoins.

#### Setup

1. Enable Cryptocurrency in your Sunny dashboard
2. Configure which cryptocurrencies you want to accept

#### Code Example

```javascript
// Cryptocurrency payment
async function processCryptoPayment() {
  try {
    const result = await sunny.createPayment({
      amount: '100.00',
      currency: 'USD', // This is the fiat equivalent
      paymentMethod: 'crypto',
      cryptoDetails: {
        preferredCurrency: 'BTC', // Customer's preferred crypto (optional)
      },
      customer: {
        name: 'Bob Johnson',
        email: 'bob@example.com'
      },
      description: 'Crypto payment',
      metadata: {
        orderId: 'ORD-123'
      }
    });
    
    // The result will contain a payment address and QR code
    // Display these to the customer
    
    return result;
  } catch (error) {
    console.error('Crypto payment failed:', error);
    throw error;
  }
}
```

#### Displaying Crypto Payment Information

```javascript
function renderCryptoPaymentInfo(result) {
  const paymentInfo = document.getElementById('crypto-payment-info');
  
  paymentInfo.innerHTML = `
    <h3>Pay with ${result.cryptoDetails.currency}</h3>
    <p>Amount: ${result.cryptoDetails.amount} ${result.cryptoDetails.currency}</p>
    <p>Address: ${result.cryptoDetails.address}</p>
    <img src="${result.cryptoDetails.qrCodeUrl}" alt="Payment QR Code">
    <p>Please send exactly the specified amount to complete your payment.</p>
    <p>Transaction ID: ${result.transactionId}</p>
  `;
}
```

### Bank Transfers

Bank transfers allow customers to pay directly from their bank accounts.

#### Setup

1. Enable Bank Transfers in your Sunny dashboard
2. Configure your bank account details

#### Code Example

```javascript
// Bank transfer payment
async function processBankTransfer() {
  try {
    const result = await sunny.createPayment({
      amount: '500.00',
      currency: 'EUR',
      paymentMethod: 'bank_transfer',
      customer: {
        name: 'Charlie Davis',
        email: 'charlie@example.com'
      },
      description: 'Bank transfer payment',
      metadata: {
        invoiceId: 'INV-7890'
      }
    });
    
    // The result will contain bank account details for the customer to use
    // Display these to the customer
    
    return result;
  } catch (error) {
    console.error('Bank transfer failed:', error);
    throw error;
  }
}
```

#### Displaying Bank Transfer Information

```javascript
function renderBankTransferInfo(result) {
  const transferInfo = document.getElementById('bank-transfer-info');
  
  transferInfo.innerHTML = `
    <h3>Bank Transfer Details</h3>
    <p>Please transfer ${result.amount} ${result.currency} to the following account:</p>
    <p>Bank: ${result.bankDetails.bankName}</p>
    <p>Account Holder: ${result.bankDetails.accountHolder}</p>
    <p>Account Number/IBAN: ${result.bankDetails.accountNumber}</p>
    <p>BIC/SWIFT: ${result.bankDetails.bic}</p>
    <p>Reference: ${result.bankDetails.reference}</p>
    <p>Note: Your payment will be processed once we receive the funds.</p>
  `;
}
```

### QR Code Payments

QR code payments allow customers to pay by scanning a QR code with their mobile device.

#### Setup

1. Enable QR Code Payments in your Sunny dashboard
2. Configure which QR payment providers you want to support

#### Code Example

```javascript
// QR code payment
async function processQRCodePayment() {
  try {
    const result = await sunny.createPayment({
      amount: '75.00',
      currency: 'USD',
      paymentMethod: 'qr_code',
      qrCodeDetails: {
        type: 'dynamic', // or 'static'
        provider: 'sunny' // or specific provider like 'promptpay', 'paynow', etc.
      },
      customer: {
        name: 'David Lee',
        email: 'david@example.com'
      },
      description: 'QR code payment',
      metadata: {
        tableNumber: 'T42'
      }
    });
    
    // The result will contain a QR code URL or image
    // Display it to the customer
    
    return result;
  } catch (error) {
    console.error('QR code payment failed:', error);
    throw error;
  }
}
```

#### Displaying QR Code

```javascript
function renderQRCode(result) {
  const qrContainer = document.getElementById('qr-code-container');
  
  qrContainer.innerHTML = `
    <h3>Scan QR Code to Pay</h3>
    <img src="${result.qrCodeDetails.qrCodeUrl}" alt="Payment QR Code">
    <p>Amount: ${result.amount} ${result.currency}</p>
    <p>Transaction ID: ${result.transactionId}</p>
    <p>Expires in: ${result.qrCodeDetails.expiresIn} minutes</p>
  `;
}
```

## Webhook Handling

Webhooks provide real-time notifications about payment status changes. Properly handling webhooks is essential for maintaining an accurate record of payments.

### Setting Up Webhooks

1. Configure your webhook endpoint URL in the Sunny dashboard
2. Implement a webhook handler on your server
3. Verify webhook signatures to prevent unauthorized access

### Example Webhook Handler (Node.js/Express)

```javascript
import express from 'express';
import SunnySDK from 'sunny-payment-gateway';

const app = express();
const sunny = new SunnySDK({
  apiKey: 'your_api_key',
  webhookSecret: 'your_webhook_secret'
});

// Use raw body parser for webhook verification
app.post('/webhooks/sunny', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['sunny-signature'];
  
  try {
    // Verify webhook signature
    const event = sunny.webhooks.constructEvent(
      req.body,
      signature,
      process.env.SUNNY_WEBHOOK_SECRET
    );
    
    // Process webhook based on event type
    switch (event.type) {
      case 'payment.succeeded':
        console.log('Payment succeeded:', event.data);
        // Update order status, send confirmation email, etc.
        handleSuccessfulPayment(event.data);
        break;
        
      case 'payment.failed':
        console.log('Payment failed:', event.data);
        // Update order status, notify customer
        handleFailedPayment(event.data);
        break;
        
      case 'payment.pending':
        console.log('Payment pending:', event.data);
        // Update order status
        handlePendingPayment(event.data);
        break;
        
      case 'payment.refunded':
        console.log('Payment refunded:', event.data);
        // Process refund
        handleRefund(event.data);
        break;
        
      // Handle other event types
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    // Return a 200 response to acknowledge receipt of the webhook
    res.status(200).send({received: true});
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

// Implement event handlers
function handleSuccessfulPayment(paymentData) {
  // Find the order using paymentData.metadata.orderId
  // Update order status to 'paid'
  // Send confirmation email
  // Trigger fulfillment process
}

function handleFailedPayment(paymentData) {
  // Find the order using paymentData.metadata.orderId
  // Update order status to 'payment_failed'
  // Send notification to customer
}

function handlePendingPayment(paymentData) {
  // Find the order using paymentData.metadata.orderId
  // Update order status to 'pending_payment'
}

function handleRefund(paymentData) {
  // Find the order using paymentData.metadata.orderId
  // Update order status to 'refunded'
  // Send refund confirmation to customer
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

### Important Webhook Events

| Event Type | Description | Recommended Action |
|------------|-------------|-------------------|
| `payment.succeeded` | Payment was successful | Complete order, notify customer |
| `payment.failed` | Payment attempt failed | Update order status, notify customer |
| `payment.pending` | Payment is being processed | Update order status |
| `payment.refunded` | Payment was refunded | Process refund, update inventory |
| `payment.disputed` | Payment was disputed/chargeback | Flag for review |
| `subscription.created` | New subscription created | Provision services |
| `subscription.updated` | Subscription was updated | Update service provisions |
| `subscription.cancelled` | Subscription was cancelled | End service provisions |
| `subscription.payment_failed` | Subscription payment failed | Notify customer, retry payment |

### Best Practices for Webhooks

1. **Implement idempotency**: Process each webhook event only once, even if received multiple times
2. **Store raw events**: Save the raw webhook data for debugging and auditing
3. **Acknowledge quickly**: Return a 200 response immediately before processing
4. **Process asynchronously**: Handle time-consuming tasks outside the webhook response
5. **Implement retries**: Set up a system to retry failed webhook processing
6. **Monitor webhook deliveries**: Track webhook delivery success in your dashboard

## Error Handling

Proper error handling ensures a smooth user experience even when issues occur.

### Common Error Types

| Error Code | Description | Recommended Action |
|------------|-------------|-------------------|
| `authentication_error` | Invalid API key | Check API key configuration |
| `validation_error` | Invalid request parameters | Check request format and required fields |
| `processing_error` | Payment processor error | Retry with different payment method |
| `insufficient_funds` | Customer lacks sufficient funds | Ask for alternative payment method |
| `card_declined` | Card was declined by issuer | Suggest alternate payment method |
| `expired_card` | Card is expired | Request updated card details |
| `invalid_card` | Card information is incorrect | Request corrected card details |
| `rate_limit_exceeded` | Too many requests | Implement exponential backoff |
| `api_connection_error` | Unable to connect to Sunny API | Check network connection |
| `system_error` | Internal system error | Contact Sunny support |

### Handling Errors Gracefully

```javascript
async function processPaymentWithErrorHandling() {
  try {
    const result = await sunny.createPayment({
      // payment details
    });
    
    return result;
  } catch (error) {
    // Handle specific error types
    switch (error.code) {
      case 'card_declined':
        console.error('Card was declined:', error.message);
        showUserMessage('Your card was declined. Please try another payment method.');
        break;
        
      case 'validation_error':
        console.error('Validation error:', error.message);
        showUserMessage('Please check your payment information and try again.');
        break;
        
      case 'insufficient_funds':
        console.error('Insufficient funds:', error.message);
        showUserMessage('Your card has insufficient funds. Please try another payment method.');
        break;
        
      case 'expired_card':
        console.error('Expired card:', error.message);
        showUserMessage('Your card is expired. Please use a different card.');
        break;
        
      case 'authentication_error':
        console.error('Authentication error:', error.message);
        showUserMessage('An authentication error occurred. Please contact support.');
        // Also notify developers
        notifyDevelopers('Authentication error', error);
        break;
        
      case 'rate_limit_exceeded':
        console.error('Rate limit exceeded:', error.message);
        // Implement exponential backoff
        const retryAfter = error.headers['retry-after'] || 5;
        setTimeout(() => {
          // Retry the request
          processPaymentWithErrorHandling();
        }, retryAfter * 1000);
        break;
        
      default:
        console.error('Payment error:', error);
        showUserMessage('An error occurred while processing your payment. Please try again later.');
        // Log to error monitoring system
        logToErrorMonitoring(error);
    }
    
    throw error; // Re-throw for further handling if needed
  }
}
```

### Implementing Retries

For transient errors, implement a retry mechanism with exponential backoff:

```javascript
async function retryOperation(operation, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);
      lastError = error;
      
      // Only retry certain types of errors
      if (!isRetryableError(error)) {
        throw error;
      }
      
      // Exponential backoff with jitter
      const delay = Math.min(Math.pow(2, attempt) * 1000 + Math.random() * 1000, 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

function isRetryableError(error) {
  const retryableCodes = ['api_connection_error', 'gateway_timeout', 'idempotency_error', 'rate_limit_exceeded'];
  return retryableCodes.includes(error.code);
}

// Usage
async function processPaymentWithRetry() {
  return retryOperation(() => sunny.createPayment({
    // payment details
  }));
}
```

## Testing

Sunny provides a sandbox environment for testing your integration before going live.

### Sandbox Environment

To use the sandbox environment:

1. Set `environment: 'sandbox'` when initializing the SDK
2. Use test API keys from your Sunny dashboard
3. Use test card numbers and other test credentials

### Test Credentials

#### Test Cards

| Card Number | Brand | Result |
|-------------|-------|--------|
| 4242 4242 4242 4242 | Visa | Success |
| 4000 0000 0000 0002 | Visa | Declined (Generic) |
| 4000 0000 0000 9995 | Visa | Declined (Insufficient Funds) |
| 4000 0000 0000 0069 | Visa | Expired Card |
| 4000 0000 0000 3220 | Visa | 3D Secure required |
| 5555 5555 5555 4444 | Mastercard | Success |
| 5200 8282 8282 8210 | Mastercard | Success |
| 3782 8224 6310 005 | American Express | Success |

#### Test Mobile Money Accounts

| Provider | Phone Number | Result |
|----------|-------------|--------|
| M-Pesa | 254708374149 | Success |
| M-Pesa | 254700000000 | Insufficient Funds |
| M-Pesa | 254711111111 | Timeout |
| Airtel Money | 254733000000 | Success |
| MTN Money | 256770000000 | Success |

#### Test Bank Accounts

| Country | Account Number | Result |
|---------|---------------|--------|
| US | 000123456789 | Success |
| UK | 12345678 / 12-34-56 | Success |
| EU | DE89370400440532013000 (IBAN) | Success |

### Testing Webhooks

To test webhooks locally:

1. Use a tool like [ngrok](https://ngrok.com/) to expose your local webhook endpoint
2. Set the ngrok URL as your webhook endpoint in the Sunny dashboard
3. Trigger test events from the dashboard

```bash
# Start ngrok to expose your local webhook server
ngrok http 3000
```

### Running End-to-End Tests

```javascript
async function runE2ETests() {
  // Test card payment
  const cardPayment = await sunny.createPayment({
    amount: '10.00',
    currency: 'USD',
    paymentMethod: 'card',
    card: {
      number: '4242424242424242',
      expMonth: '12',
      expYear: '2030',
      cvv: '123'
    },
    customer: {
      name: 'Test User',
      email: 'test@example.com'
    },
    description: 'Test payment'
  });
  
  console.log('Card payment test:', cardPayment.success ? 'SUCCESS' : 'FAILURE');
  
  // Test other payment methods...
}
```

## Production Checklist

Before going live with your Sunny integration, verify the following:

### Account and Configuration

- [ ] Complete merchant verification process
- [ ] Set up production webhook endpoints
- [ ] Generate and securely store production API keys
- [ ] Configure payment method-specific settings
- [ ] Set up notifications for critical events
- [ ] Configure fraud detection settings

### Code and Implementation

- [ ] Switch from sandbox to production API keys
- [ ] Set `environment: 'production'` in SDK initialization
- [ ] Remove any test card numbers or credentials from codebase
- [ ] Verify webhook signature validation
- [ ] Implement proper error handling
- [ ] Set up logging and monitoring
- [ ] Implement idempotency for API calls
- [ ] Test all payment flow edge cases

### Security

- [ ] Implement SSL/TLS for all communications
- [ ] Store API keys securely in environment variables
- [ ] Remove debugging code and verbose error messages
- [ ] Ensure PCI compliance if handling card data directly
- [ ] Set up IP restrictions for API access if applicable
- [ ] Implement proper user authentication and authorization
- [ ] Set up audit logging for payment operations

### Operations

- [ ] Set up monitoring for webhook deliveries
- [ ] Configure alerts for payment failures
- [ ] Create procedures for handling disputes and refunds
- [ ] Develop reconciliation processes
- [ ] Document customer support procedures
- [ ] Train customer service team on payment issues

### Financial

- [ ] Verify payment settlement account details
- [ ] Configure payment descriptor text
- [ ] Set up Statement Descriptor in dashboard
- [ ] Understand fee structure for each payment method
- [ ] Setup reconciliation process for accounting

## Security Best Practices

Implementing these security best practices will help protect your integration and customer data:

### API Key Security

- **Never expose API keys**: Keep API keys server-side only
- **Use environment variables**: Store keys in environment variables, not in code
- **Rotate API keys**: Regularly rotate API keys, especially after staff changes
- **Restrict API key access**: Use the principle of least privilege
- **Monitor API key usage**: Set up alerts for unusual API activity

### Data Security

- **Minimize data collection**: Only collect data necessary for transactions
- **Use Sunny Elements**: Use Sunny's hosted UI components to reduce PCI scope
- **Encrypt sensitive data**: Encrypt data in transit and at rest
- **Implement secure deletion**: Delete sensitive data when no longer needed
- **Set data retention policies**: Establish clear policies for payment data retention

### Network Security

- **Enforce HTTPS**: Use HTTPS for all communications
- **Implement HSTS**: Enable HTTP Strict Transport Security
- **Use secure TLS versions**: Support TLS 1.2+ only
- **Configure secure cipher suites**: Follow industry best practices for ciphers
- **Implement IP restrictions**: Restrict API access to known IP addresses

### Authentication and Authorization

- **Implement MFA**: Require multi-factor authentication for dashboard access
- **Set role-based access**: Restrict access based on user roles
- **Audit access logs**: Regularly review access to sensitive systems
- **Implement session timeouts**: Automatically log out inactive users
- **Strong password policies**: Enforce strong password requirements

### Fraud Prevention

- **Enable Sunny's fraud protection**: Use our built-in fraud detection tools
- **Set transaction limits**: Implement velocity limits and amount thresholds
- **Monitor unusual patterns**: Set up alerts for atypical transaction patterns
- **Implement 3D Secure**: Enable 3D Secure for card payments
- **Address verification**: Enable AVS checks for applicable payments
- **Device fingerprinting**: Collect and analyze device information
- **Implement CAPTCHA**: Use CAPTCHA for high-risk actions
- **Geolocation verification**: Compare billing country with IP address location
- **Monitor velocity**: Track transaction frequency per customer/IP/device

## Rate Limits and Quotas

Sunny implements rate limiting to ensure platform stability and security. Understanding these limits will help you implement your integration efficiently.

### API Rate Limits

| API Endpoint | Rate Limit | Period | Notes |
|--------------|------------|--------|-------|
| Authentication | 10 requests | per minute | Includes login and token refresh |
| Create Payment | 120 requests | per minute | Per API key |
| Get Payment | 300 requests | per minute | Per API key |
| Webhooks | 600 requests | per minute | Outgoing webhooks to your server |
| All other endpoints | 180 requests | per minute | Per API key |

### Handling Rate Limiting

When you exceed the rate limit, the API will respond with a 429 Too Many Requests status code. The response will include the following headers:

- `Retry-After`: Seconds to wait before retrying
- `X-Rate-Limit-Limit`: The rate limit ceiling
- `X-Rate-Limit-Remaining`: Remaining requests in the current time window
- `X-Rate-Limit-Reset`: Time when the rate limit will reset (Unix timestamp)

```javascript
// Example of handling rate limits with backoff
async function apiRequestWithRateLimitHandling(requestFn) {
  try {
    return await requestFn();
  } catch (error) {
    if (error.status === 429) {
      const retryAfter = error.headers['retry-after'] || 5;
      console.log(`Rate limited. Retrying after ${retryAfter} seconds`);
      
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return apiRequestWithRateLimitHandling(requestFn);
    }
    throw error;
  }
}

// Usage
const result = await apiRequestWithRateLimitHandling(() => 
  sunny.createPayment({
    // payment details
  })
);
```

### Transaction Limits

Transaction limits are in place to prevent fraud and ensure compliance with regulations:

| Transaction Type | Minimum Amount | Maximum Amount | Notes |
|------------------|----------------|----------------|-------|
| Card payments | $0.50 USD | $25,000 USD | Higher limits available on request |
| Mobile Money | Local minimum | $5,000 USD | Varies by provider |
| Cryptocurrency | $1.00 USD | $50,000 USD | Higher limits available on request |
| Bank transfers | $5.00 USD | $100,000 USD | Subject to bank limits |

To request higher transaction limits, please contact Sunny support with your merchant ID and business needs.

## API Reference

This section provides a quick reference to the most commonly used API endpoints. For complete documentation, visit the [API Reference](https://docs.sunnypayments.com/api).

### Core Endpoints

#### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/payments` | Create a new payment |
| GET | `/v1/payments/{id}` | Retrieve a payment by ID |
| POST | `/v1/payments/{id}/capture` | Capture an authorized payment |
| POST | `/v1/payments/{id}/cancel` | Cancel a payment |
| POST | `/v1/payments/{id}/refund` | Refund a payment |

#### Customers

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/customers` | Create a new customer |
| GET | `/v1/customers/{id}` | Retrieve a customer |
| PATCH | `/v1/customers/{id}` | Update a customer |
| DELETE | `/v1/customers/{id}` | Delete a customer |
| GET | `/v1/customers/{id}/payment_methods` | List a customer's payment methods |

#### Payment Methods

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/payment_methods` | Create a payment method |
| GET | `/v1/payment_methods/{id}` | Retrieve a payment method |
| PATCH | `/v1/payment_methods/{id}` | Update a payment method |
| DELETE | `/v1/payment_methods/{id}` | Delete a payment method |

#### Subscriptions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/subscriptions` | Create a subscription |
| GET | `/v1/subscriptions/{id}` | Retrieve a subscription |
| PATCH | `/v1/subscriptions/{id}` | Update a subscription |
| DELETE | `/v1/subscriptions/{id}` | Cancel a subscription |

### API Request Format

All requests should be in JSON format and include the appropriate headers:

```http
POST /v1/payments HTTP/1.1
Host: api.sunnypayments.com
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
Idempotency-Key: a-unique-key-for-this-request

{
  "amount": "100.00",
  "currency": "USD",
  "payment_method": "card",
  "card": {
    "number": "4242424242424242",
    "exp_month": 12,
    "exp_year": 2025,
    "cvv": "123"
  },
  "customer": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "description": "Order #123"
}
```

### API Response Format

Successful responses include a status code and JSON response body:

```json
{
  "id": "pay_12345",
  "object": "payment",
  "amount": "100.00",
  "currency": "USD",
  "status": "succeeded",
  "created": 1633004998,
  "payment_method": "card",
  "customer": "cus_12345",
  "description": "Order #123",
  "metadata": {}
}
```

Error responses include an error object with details:

```json
{
  "error": {
    "code": "card_declined",
    "message": "Your card was declined.",
    "param": "card",
    "type": "card_error"
  }
}
```

## Support

Sunny provides multiple support channels to help you with your integration.

### Documentation

- [API Reference](https://docs.sunnypayments.com/api)
- [SDK Documentation](https://docs.sunnypayments.com/sdk)
- [FAQs](https://docs.sunnypayments.com/faqs)
- [Tutorials and Guides](https://docs.sunnypayments.com/guides)

### Support Channels

- **Email Support**: [support@sunnypayments.com](mailto:support@sunnypayments.com)
- **Live Chat**: Available in your Sunny dashboard
- **Phone Support**: +1-800-SUNNY-PAY (Premium merchants only)
- **Developer Community**: [community.sunnypayments.com](https://community.sunnypayments.com)
- **Status Page**: [status.sunnypayments.com](https://status.sunnypayments.com)

### Support SLAs

| Plan | Email Response | Chat Response | Phone Support | Hours |
|------|--------------|--------------|--------------|-------|
| Standard | < 24 hours | < 4 hours | Not available | Business hours |
| Premium | < 4 hours | < 1 hour | 24/7 | 24/7 |
| Enterprise | < 1 hour | < 30 minutes | 24/7 priority | 24/7 |

### Reporting Issues

When reporting integration issues, please include:

1. Your merchant ID
2. Transaction IDs if applicable
3. Detailed error messages
4. Reproduction steps
5. Code snippets (with sensitive information removed)
6. Environment details (sandbox/production)

### Contributing to Improvements

We welcome feedback on our documentation and SDKs. To suggest improvements:

1. Open an issue on our [GitHub repository](https://github.com/sunny-payments/sdk)
2. Send feedback via the feedback form in the documentation
3. Contact your account manager with suggestions

Thank you for choosing Sunny Payment Gateway. We're excited to partner with you in delivering seamless payment experiences to your customers!

