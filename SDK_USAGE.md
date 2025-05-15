# Sunny Payment Gateway SDK Usage Guide

This guide provides examples of how to use the Sunny Payment Gateway SDK in various scenarios.

## Table of Contents

1. [Installation](#installation)
2. [Basic Setup](#basic-setup)
3. [Payment Methods](#payment-methods)
   - [Card Payments](#card-payments)
   - [Mobile Money](#mobile-money)
   - [QR Code Payments](#qr-code-payments)
   - [P2P Transfers](#p2p-transfers)
   - [Hardware Payments](#hardware-payments)
   - [Offline Payments](#offline-payments)
4. [React Integration](#react-integration)
5. [Advanced Features](#advanced-features)
   - [Multi-Method Payments](#multi-method-payments)
   - [Split Payments](#split-payments)
   - [Recurring Payments](#recurring-payments)
   - [Identity Management](#identity-management)

## Installation

```bash
npm install sunny-payment-gateway
```

## Basic Setup

```javascript
import SunnySDK from 'sunny-payment-gateway/sdk';

// Initialize the SDK
const sunny = new SunnySDK({
  apiKey: 'your_api_key',
  merchantId: 'your_merchant_id',
  environment: 'sandbox' // or 'production'
});
```

## Payment Methods

### Card Payments

```javascript
// Process a card payment
const cardPayment = await sunny.createPayment({
  amount: '100.00',
  currency: 'USD',
  paymentMethod: 'card',
  card: {
    number: '4242424242424242',
    expMonth: '12',
    expYear: '2025',
    cvv: '123',
    holderName: 'John Doe'
  },
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890'
  },
  description: 'Test payment'
});

if (cardPayment.success) {
  console.log('Card payment successful!', cardPayment.transactionId);
} else {
  console.error('Card payment failed:', cardPayment.message);
}
```

### Mobile Money

```javascript
// Process a mobile money payment
const mobilePayment = await sunny.processMobileMoney({
  amount: '1000.00',
  currency: 'KES',
  provider: 'mpesa',
  phoneNumber: '254712345678',
  reference: 'INV-001',
  description: 'Payment for invoice #001'
});

if (mobilePayment.success) {
  console.log('Mobile money payment initiated!', mobilePayment.transactionId);
  
  // For STK push, you might need to check the status later
  const statusCheck = await sunny.orchestrator.mobileMoneyProcessor.checkTransactionStatus({
    provider: 'mpesa',
    transactionId: mobilePayment.transactionId
  });
  
  console.log('Transaction status:', statusCheck.status);
} else {
  console.error('Mobile money payment failed:', mobilePayment.message);
}
```

### QR Code Payments

```javascript
// Generate a static QR code for a merchant
const staticQR = await sunny.createQRCode({
  qrType: 'static',
  accountType: 'merchant',
  accountId: 'merchant123',
  username: '@sunnystore',
  supportedMethods: ['mpesa', 'airtel', 'card']
});

if (staticQR.success) {
  console.log('Static QR code generated:', staticQR.qrImageUrl);
}

// Generate a dynamic QR code for a specific payment
const dynamicQR = await sunny.createQRCode({
  qrType: 'dynamic',
  amount: '250.00',
  currency: 'USD',
  orderId: 'ORD-12345',
  expiryMinutes: 30,
  allowedMethods: ['card', 'mpesa', 'crypto']
});

if (dynamicQR.success) {
  console.log('Dynamic QR code generated:', dynamicQR.qrImageUrl);
}

// Process a scanned QR code
const scannedQR = await sunny.orchestrator.qrCodeManager.processScannedQR({
  payload: 'v=1&id=DQR12345&t=D&mid=merchant123&amt=100.00&cur=USD&oid=ORD-12345',
  payerInfo: {
    id: 'user123',
    name: 'Jane Doe'
  },
  paymentMethod: 'card'
});

if (scannedQR.success) {
  console.log('QR code processed:', scannedQR);
}
```

### P2P Transfers

```javascript
// Send money to another user
const transfer = await sunny.sendMoney({
  senderId: 'user123',
  recipientAlias: 'jane@example.com',
  aliasType: 'email',
  amount: '50.00',
  currency: 'USD',
  note: 'Lunch payment'
});

if (transfer.success) {
  console.log('Money sent successfully!', transfer.transferId);
}

// Request money from another user
const request = await sunny.requestMoney({
  requesterId: 'user123',
  payerAlias: '254712345678',
  aliasType: 'phoneNumber',
  amount: '25.00',
  currency: 'USD',
  note: 'Movie tickets',
  expiryHours: 48
});

if (request.success) {
  console.log('Money request created!', request.requestId);
}

// Split a bill among multiple users
const billSplit = await sunny.orchestrator.p2pTransferManager.splitBill({
  organizerId: 'user123',
  title: 'Dinner at Restaurant',
  totalAmount: '120.00',
  currency: 'USD',
  participants: [
    { id: 'user123', name: 'John', amount: '40.00' },
    { id: 'user456', name: 'Jane', amount: '40.00' },
    { id: 'user789', name: 'Bob', amount: '40.00' }
  ],
  equal: true
});

if (billSplit.success) {
  console.log('Bill split created!', billSplit.splitId);
}
```

### Hardware Payments

```javascript
// Register a POS terminal
const deviceRegistration = await sunny.orchestrator.hardwareIntegration.registerDevice({
  deviceType: 'pos',
  model: 'Sunny Terminal X1',
  serialNumber: 'SN12345678',
  locationId: 'store-001'
});

if (deviceRegistration.success) {
  console.log('Device registered!', deviceRegistration.deviceId);
}

// Process a payment using a POS terminal
const posPayment = await sunny.processHardwarePayment({
  deviceId: 'DEV-12345ABC',
  amount: '75.50',
  currency: 'USD',
  paymentMethod: 'pos'
});

if (posPayment.success) {
  console.log('POS payment successful!', posPayment.transactionId);
}

// Process a biometric payment
const biometricPayment = await sunny.processHardwarePayment({
  deviceId: 'DEV-BIO789',
  amount: '120.00',
  currency: 'USD',
  paymentMethod: 'biometric',
  biometricType: 'face',
  customerId: 'cust-456'
});

if (biometricPayment.success) {
  console.log('Biometric payment successful!', biometricPayment.transactionId);
  console.log('Verification score:', biometricPayment.verificationScore);
}
```

### Offline Payments

```javascript
// Process a USSD payment
const ussdPayment = await sunny.processOfflinePayment({
  offlineType: 'ussd',
  sessionId: 'USSD-123456',
  phoneNumber: '254712345678',
  input: '1*500*PIN',
  network: 'Safaricom'
});

if (ussdPayment.success) {
  console.log('USSD response:', ussdPayment.responseString);
}

// Process an SMS payment
const smsPayment = await sunny.processOfflinePayment({
  offlineType: 'sms',
  phoneNumber: '254712345678',
  message: 'PAY MERCHANT123 500',
  timestamp: new Date().toISOString()
});

if (smsPayment.success) {
  console.log('SMS payment processed:', smsPayment.responseMessage);
}

// Generate an offline token
const offlineToken = await sunny.orchestrator.offlineProcessor.generateOfflineToken({
  amount: '100.00',
  currency: 'USD',
  validityHours: 24
});

if (offlineToken.success) {
  console.log('Offline token generated:', offlineToken.shortCode);
  console.log('QR payload:', offlineToken.qrPayload);
}

// Synchronize offline transactions
const syncResult = await sunny.synchronizeOfflineTransactions([
  {
    offlineTransactionId: 'OFF-12345ABC',
    merchantId: 'merchant123',
    amount: '100.00',
    currency: 'USD',
    createdAt: '2023-06-01T12:00:00Z'
  },
  {
    offlineTransactionId: 'OFF-67890DEF',
    merchantId: 'merchant123',
    amount: '50.00',
    currency: 'USD',
    createdAt: '2023-06-01T14:30:00Z'
  }
]);

if (syncResult.success) {
  console.log('Synchronized transactions:', syncResult.successfulTransactions);
  console.log('Failed transactions:', syncResult.failedTransactions);
}
```

## React Integration

```jsx
import React, { useState } from 'react';
import { SunnyProvider, PaymentButton, QRCodeDisplay, MobileMoneyForm } from 'sunny-payment-gateway/react';

function CheckoutPage() {
  const [paymentStatus, setPaymentStatus] = useState(null);
  
  const handlePaymentSuccess = (result) => {
    setPaymentStatus({ success: true, message: 'Payment successful!', data: result });
  };
  
  const handlePaymentError = (error) => {
    setPaymentStatus({ success: false, message: `Payment failed: ${error.message}`, data: error });
  };
  
  return (
    <SunnyProvider
      apiKey="your_api_key"
      merchantId="your_merchant_id"
      environment="sandbox"
    >
      <div className="checkout-container">
        <h1>Checkout</h1>
        
        <div className="payment-amount">
          <h2>Total: $100.00</h2>
        </div>
        
        <div className="payment-methods">
          <h3>Pay with Card</h3>
          <PaymentButton
            amount="100.00"
            currency="USD"
            paymentMethod="card"
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            className="payment-button"
          >
            Pay with Card
          </PaymentButton>
          
          <h3>Pay with Mobile Money</h3>
          <MobileMoneyForm
            amount="100.00"
            currency="USD"
            provider="mpesa"
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            className="mobile-money-form"
          />
          
          <h3>Pay with QR Code</h3>
          <QRCodeDisplay
            amount="100.00"
            currency="USD"
            qrType="dynamic"
            onGenerated={(qrData) => console.log('QR code generated:', qrData)}
            className="qr-code-container"
          />
        </div>
        
        {paymentStatus && (
          <div className={`payment-status ${paymentStatus.success ? 'success' : 'error'}`}>
            <p>{paymentStatus.message}</p>
            {paymentStatus.success && (
              <p>Transaction ID: {paymentStatus.data.transactionId}</p>
            )}
          </div>
        )}
      </div>
    </SunnyProvider>
  );
}

export default CheckoutPage;
```

## Advanced Features

### Multi-Method Payments

```javascript
// Try multiple payment methods in sequence
const multiMethodPayment = await sunny.orchestrator.processMultiMethodPayment({
  amount: '100.00',
  currency: 'USD',
  methods: ['card', 'mpesa', 'airtel', 'crypto'],
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '254712345678'
  }
});

if (multiMethodPayment.success) {
  console.log('Payment successful using:', multiMethodPayment.methodUsed);
} else {
  console.error('All payment methods failed:', multiMethodPayment.attemptedMethods);
  console.error('Last error:', multiMethodPayment.lastError);
}
```

### Split Payments

```javascript
// Process a payment and split it among multiple recipients
const splitPayment = await sunny.orchestrator.processSplitPayment({
  amount: '1000.00',
  currency: 'USD',
  paymentMethod: 'card',
  card: {
    number: '4242424242424242',
    expMonth: '12',
    expYear: '2025',
    cvv: '123'
  },
  recipients: [
    {
      recipientId: 'merchant456',
      amount: '700.00',
      description: 'Product payment'
    },
    {
      recipientId: 'merchant789',
      amount: '300.00',
      description: 'Service fee'
    }
  ]
});

if (splitPayment.success) {
  console.log('Main payment:', splitPayment.mainPayment);
  console.log('Successful splits:', splitPayment.successfulSplits);
  console.log('Failed splits:', splitPayment.failedSplits);
}
```

### Recurring Payments

```javascript
// Create a subscription
const subscription = await sunny.createSubscription({
  customerId: 'cust-123',
  amount: '19.99',
  currency: 'USD',
  frequency: 'monthly',
  startDate: '2023-07-01T00:00:00Z',
  paymentMethod: 'card',
  card: {
    number: '4242424242424242',
    expMonth: '12',
    expYear: '2025',
    cvv: '123'
  },
  description: 'Premium Plan Subscription',
  processInitialPayment: true
});

if (subscription.success) {
  console.log('Subscription created!', subscription.subscriptionId);
  console.log('Next payment date:', subscription.nextPaymentDate);
  
  if (subscription.initialPayment) {
    console.log('Initial payment:', subscription.initialPayment);
  }
}
```

### Identity Management

```javascript
// Create a new user identity
const identity = await sunny.createIdentity({
  phoneNumber: '254712345678',
  email: 'user@example.com',
  preferredUsername: 'johndoe'
});

if (identity.success) {
  console.log('Identity created!', identity.sunnyId);
  console.log('Username:', identity.username);
} else if (identity.error === 'USERNAME_TAKEN') {
  console.log('Username is taken. Suggestions:', identity.suggestions);
}

// Add an alias to an existing identity
const aliasResult = await sunny.orchestrator.identityManager.addAlias(
  'user-123',
  'bankAccount',
  'BANK-ACC-12345',
  false
);

if (aliasResult.success) {
  console.log('Alias added!');
}

// Resolve an alias to an identity
const resolvedIdentity = await sunny.resolveAlias('phoneNumber', '254712345678');

if (resolvedIdentity) {
  console.log('Identity found:', resolvedIdentity.sunnyId);
  console.log('Username:', resolvedIdentity.username);
} else {
  console.log('Identity not found');
}

// Verify an alias
const verificationResult = await sunny.orchestrator.identityManager.verifyAlias(
  'user-123',
  'phoneNumber',
  '254712345678',
  '123456' // verification code
);

if (verificationResult.success) {
  console.log('Alias verified!');
} else {
  console.error('Verification failed:', verificationResult.message);
}
```