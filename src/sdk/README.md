# Sunny Payment Gateway SDK

A comprehensive SDK for integrating with the Sunny Payment Gateway, enabling businesses to accept payments globally through multiple payment methods.

## Features

- **Multiple Payment Methods**: Support for cards, mobile money, bank transfers, cryptocurrencies, and more
- **Global Coverage**: Accept payments in 135+ currencies with local payment methods
- **Simple Integration**: Clean, easy-to-use APIs for web and mobile applications
- **React Components**: Ready-to-use React components for quick integration
- **Tokenization**: Securely store payment methods for future use
- **P2P Transfers**: Enable person-to-person transfers between users
- **QR Code Payments**: Generate and process QR code payments

## Installation

```bash
npm install sunny-payment-gateway
```

## Basic Usage

```javascript
import SunnySDK from 'sunny-payment-gateway';

// Initialize the SDK
const sunny = new SunnySDK({
  apiKey: 'your_api_key',
  environment: 'sandbox', // or 'production'
  merchantId: 'your_merchant_id'
});

// Process a payment
async function processPayment() {
  try {
    const result = await sunny.createPayment({
      amount: '100.00',
      currency: 'USD',
      paymentMethod: 'CARD',
      cardDetails: {
        cardNumber: '4242424242424242',
        expiryMonth: '12',
        expiryYear: '2025',
        cvv: '123',
        cardholderName: 'John Smith'
      }
    });
    
    if (result.success) {
      console.log(`Payment successful! Transaction ID: ${result.transactionId}`);
    } else {
      console.error(`Payment failed: ${result.message}`);
    }
  } catch (error) {
    console.error('Error processing payment:', error);
  }
}
```

## React Integration

```jsx
import React from 'react';
import { SunnyProvider, PaymentForm } from 'sunny-payment-gateway/react';

function CheckoutPage() {
  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
  };
  
  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
  };
  
  return (
    <SunnyProvider
      config={{
        apiKey: 'your_api_key',
        environment: 'sandbox',
        merchantId: 'your_merchant_id'
      }}
    >
      <div className="checkout">
        <h2>Complete Your Purchase</h2>
        <PaymentForm
          paymentDetails={{
            amount: '99.99',
            currency: 'USD'
          }}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </div>
    </SunnyProvider>
  );
}
```

## Available Payment Methods

The SDK supports the following payment methods:

- **Card Payments**: Visa, Mastercard, American Express, Discover, JCB, UnionPay
- **Mobile Money**: M-Pesa, Airtel Money, MTN Mobile Money, Orange Money, and more
- **Bank Transfers**: ACH, SEPA, Wire Transfers, UPI, and more
- **Cryptocurrencies**: Bitcoin, Ethereum, USDC, USDT, XRP, and more
- **QR Code Payments**: Static and dynamic QR codes
- **P2P Transfers**: Person-to-person transfers between users

## API Reference

### SunnySDK

#### Constructor

```javascript
const sunny = new SunnySDK({
  apiKey: 'your_api_key',
  environment: 'sandbox', // or 'production'
  merchantId: 'your_merchant_id',
  options: {} // Additional options
});
```

#### Methods

- **createPayment(paymentDetails)**: Process a payment
- **getTransactionStatus(transactionId)**: Get transaction status
- **generatePaymentLink(paymentDetails)**: Generate a payment link or QR code
- **tokenizePaymentMethod(paymentMethod, customerId)**: Tokenize a payment method
- **createTokenPayment(paymentDetails)**: Process a payment with a tokenized payment method
- **createCustomer(customerData)**: Create a customer
- **createP2PTransfer(transferDetails)**: Create a P2P transfer
- **createMoneyRequest(requestDetails)**: Create a money request
- **generateQRCode(qrDetails)**: Generate a QR code for payment
- **getVersion()**: Get SDK version

### React Components

#### SunnyProvider

```jsx
<SunnyProvider
  config={{
    apiKey: 'your_api_key',
    environment: 'sandbox',
    merchantId: 'your_merchant_id'
  }}
>
  {/* Your components */}
</SunnyProvider>
```

#### PaymentForm

```jsx
<PaymentForm
  paymentDetails={{
    amount: '99.99',
    currency: 'USD'
  }}
  onSuccess={handlePaymentSuccess}
  onError={handlePaymentError}
/>
```

#### QRCodePayment

```jsx
<QRCodePayment
  paymentDetails={{
    amount: '99.99',
    currency: 'USD'
  }}
  onSuccess={handlePaymentSuccess}
  onError={handlePaymentError}
/>
```

#### PaymentButton

```jsx
<PaymentButton
  paymentDetails={{
    amount: '99.99',
    currency: 'USD',
    paymentMethod: 'CARD'
  }}
  onSuccess={handlePaymentSuccess}
  onError={handlePaymentError}
  text="Pay Now"
/>
```

#### useSunny Hook

```jsx
const { sdk, loading, error } = useSunny();

// Use sdk to make API calls
const handlePayment = async () => {
  const result = await sdk.createPayment({
    // Payment details
  });
};
```

## Examples

Check out the [examples](./examples) directory for more usage examples:

- [Basic Usage](./examples/basic-usage.js)
- [React Example](./examples/react-example.jsx)

## Documentation

For more detailed documentation, please visit [docs.sunnypayments.com](https://docs.sunnypayments.com).

## Support

If you encounter any issues or have questions, please contact our support team at support@sunnypayments.com.

## License

This SDK is licensed under the MIT License.