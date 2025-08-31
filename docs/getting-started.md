# Getting Started with Sunny Payment Gateway

This guide will help you integrate Sunny Payment Gateway into your application.

## Prerequisites

- A Sunny account (sign up at [dashboard.sunnypayments.com](https://dashboard.sunnypayments.com))
- API keys from your Sunny dashboard
- SSL/TLS enabled environment for production use

## Installation

### JavaScript

```bash
npm install @sunny/payment-sdk
# or
yarn add @sunny/payment-sdk
```

### Python

```bash
pip install sunny-payments
```

### PHP

```bash
composer require sunny/payment-gateway
```

### Java

```xml
<dependency>
  <groupId>com.sunnypayments</groupId>
  <artifactId>payment-gateway</artifactId>
  <version>1.0.0</version>
</dependency>
```

## Quick Start

### 1. Initialize the SDK

```javascript
// JavaScript example
import { SunnyPayments } from '@sunny/payment-sdk';

const sunny = new SunnyPayments({
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret',
  environment: 'sandbox' // Use 'production' for live payments
});
```

### 2. Process a Payment

```javascript
// Process a card payment
const paymentResult = await sunny.processPayment({
  amount: 1000, // Amount in smallest currency unit (e.g., cents)
  currency: 'USD',
  paymentMethod: 'card',
  card: {
    number: '4242424242424242',
    expMonth: 12,
    expYear: 2025,
    cvc: '123'
  },
  customer: {
    name: 'John Doe',
    email: 'john@example.com'
  },
  description: 'Payment for order #1234'
});

console.log(paymentResult);
// {
//   success: true,
//   transactionId: 'txn_123456789',
//   status: 'completed',
//   ...
// }
```

### 3. Handle Different Payment Methods

```javascript
// Mobile money payment
const mobilePayment = await sunny.processPayment({
  amount: 1000,
  currency: 'KES',
  paymentMethod: 'mobile_money',
  mobileProvider: 'mpesa',
  phoneNumber: '+254712345678',
  customer: {
    name: 'Jane Doe',
    email: 'jane@example.com'
  }
});

// Bank transfer
const bankPayment = await sunny.processPayment({
  amount: 5000,
  currency: 'EUR',
  paymentMethod: 'bank_transfer',
  bankAccount: {
    accountNumber: '12345678',
    routingNumber: '87654321',
    accountType: 'checking'
  },
  customer: {
    name: 'Alice Smith',
    email: 'alice@example.com'
  }
});

// Cryptocurrency payment
const cryptoPayment = await sunny.processPayment({
  amount: 50,
  currency: 'USD',
  paymentMethod: 'crypto',
  cryptoCurrency: 'BTC',
  customer: {
    name: 'Bob Johnson',
    email: 'bob@example.com'
  }
});
```

### 4. Verify a Payment

```javascript
const verificationResult = await sunny.verifyPayment('txn_123456789');

if (verificationResult.success && verificationResult.status === 'completed') {
  // Payment is verified and completed
  console.log('Payment verified successfully');
} else {
  // Handle verification failure
  console.error('Payment verification failed:', verificationResult.message);
}
```

### 5. Process Refunds

```javascript
const refundResult = await sunny.refundPayment({
  transactionId: 'txn_123456789',
  amount: 500, // Partial refund of 500 cents
  reason: 'Customer request'
});

console.log(refundResult);
// {
//   success: true,
//   refundId: 'ref_987654321',
//   status: 'completed',
//   ...
// }
```

### 6. Create a Payment Link

```javascript
const paymentLink = await sunny.createPaymentLink({
  amount: 2500,
  currency: 'USD',
  description: 'Premium subscription',
  expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  successUrl: 'https://yourwebsite.com/success',
  cancelUrl: 'https://yourwebsite.com/cancel'
});

console.log(paymentLink);
// {
//   success: true,
//   url: 'https://pay.sunnypayments.com/p/abcdef123456',
//   expiresAt: '2023-12-31T23:59:59Z',
//   ...
// }
```

### 7. Set Up Webhooks

Configure your webhook endpoint in the Sunny dashboard, then implement a handler:

```javascript
// Express.js example
app.post('/webhooks/sunny', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['sunny-signature'];
  
  try {
    const event = sunny.verifyWebhook(req.body, signature);
    
    switch (event.type) {
      case 'payment.succeeded':
        // Handle successful payment
        break;
      case 'payment.failed':
        // Handle failed payment
        break;
      case 'refund.completed':
        // Handle completed refund
        break;
      // Handle other event types
    }
    
    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Webhook verification failed:', error);
    res.status(400).send('Webhook verification failed');
  }
});
```

## Advanced Features

### Multi-Currency Support

Sunny supports over 135 currencies. Simply specify the currency code in your payment request:

```javascript
const payment = await sunny.processPayment({
  amount: 1000,
  currency: 'JPY', // Japanese Yen
  // other payment details
});
```

### Marketplace Payments

For platforms and marketplaces, you can split payments between multiple recipients:

```javascript
const marketplacePayment = await sunny.processPayment({
  amount: 10000,
  currency: 'USD',
  paymentMethod: 'card',
  card: { /* card details */ },
  splits: [
    {
      destination: 'acct_seller1',
      amount: 8500, // 85% to seller
      currency: 'USD'
    },
    {
      destination: 'acct_platform',
      amount: 1500, // 15% platform fee
      currency: 'USD'
    }
  ]
});
```

### Subscription Billing

Create and manage recurring subscriptions:

```javascript
// Create a subscription plan
const plan = await sunny.createPlan({
  name: 'Premium Plan',
  amount: 1999,
  currency: 'USD',
  interval: 'month',
  intervalCount: 1
});

// Subscribe a customer to the plan
const subscription = await sunny.createSubscription({
  customer: 'cust_12345',
  plan: plan.id,
  paymentMethod: 'card',
  card: { /* card details */ }
});
```

### Localization

Sunny automatically detects and adapts to the customer's location:

```javascript
const checkout = sunny.createCheckout({
  amount: 1000,
  currency: 'USD',
  localization: {
    autoDetect: true, // Automatically detect customer's locale
    fallbackLocale: 'en-US' // Fallback if detection fails
  }
});
```

## Testing

Use test API keys and the following test cards in the sandbox environment:

- `4242424242424242` - Successful payment
- `4000000000000002` - Declined payment
- `4000000000009995` - Insufficient funds
- `4000000000000101` - 3D Secure required

For mobile money testing, use:
- M-Pesa: `+254700000000`
- MTN: `+256700000000`

## Going Live

When you're ready to accept real payments:

1. Complete the verification process in your Sunny dashboard
2. Switch your API keys from sandbox to production
3. Update your code to use the production environment:

```javascript
const sunny = new SunnyPayments({
  apiKey: 'your_production_api_key',
  apiSecret: 'your_production_api_secret',
  environment: 'production'
});
```

## Support

If you need help with integration:

- Check our [API Reference](https://docs.sunnypayments.com/api)
- Visit our [Developer Community](https://community.sunnypayments.com)
- Contact support at support@sunnypayments.com
- Live chat with our team at [sunnypayments.com](https://sunnypayments.com)