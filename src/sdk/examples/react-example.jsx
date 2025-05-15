/**
 * React usage example for the Sunny Payment Gateway SDK
 */

import React, { useState } from 'react';
import { 
  SunnyProvider, 
  useSunny, 
  PaymentForm, 
  QRCodePayment, 
  PaymentButton 
} from '../SunnyReactSDK';

// Example App component
const App = () => {
  return (
    <SunnyProvider
      config={{
        apiKey: 'your_api_key',
        environment: 'sandbox',
        merchantId: 'your_merchant_id'
      }}
    >
      <div className="app">
        <h1>Sunny Payment Gateway Demo</h1>
        <CheckoutPage />
      </div>
    </SunnyProvider>
  );
};

// Checkout page component
const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('FORM');
  const [paymentResult, setPaymentResult] = useState(null);
  
  // Payment details
  const paymentDetails = {
    amount: '99.99',
    currency: 'USD',
    paymentMethod: 'CARD',
    metadata: {
      productName: 'Premium Subscription',
      orderId: `order-${Date.now()}`
    }
  };
  
  // Handle payment success
  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    setPaymentResult({
      success: true,
      transactionId: result.transactionId,
      message: 'Payment processed successfully!'
    });
  };
  
  // Handle payment error
  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    setPaymentResult({
      success: false,
      message: error.message || 'Payment failed. Please try again.'
    });
  };
  
  return (
    <div className="checkout-page">
      <div className="product-details">
        <h2>Premium Subscription</h2>
        <p className="price">USD 99.99</p>
        <p className="description">
          Get access to all premium features for one year.
        </p>
      </div>
      
      <div className="payment-method-selector">
        <h3>Select Payment Method</h3>
        <div className="payment-options">
          <button
            className={`option ${paymentMethod === 'FORM' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('FORM')}
          >
            Payment Form
          </button>
          <button
            className={`option ${paymentMethod === 'QR' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('QR')}
          >
            QR Code
          </button>
          <button
            className={`option ${paymentMethod === 'BUTTON' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('BUTTON')}
          >
            Quick Pay
          </button>
        </div>
      </div>
      
      {/* Payment result message */}
      {paymentResult && (
        <div className={`payment-result ${paymentResult.success ? 'success' : 'error'}`}>
          {paymentResult.success && (
            <div>
              <h3>Payment Successful!</h3>
              <p>Transaction ID: {paymentResult.transactionId}</p>
              <p>{paymentResult.message}</p>
            </div>
          )}
          
          {!paymentResult.success && (
            <div>
              <h3>Payment Failed</h3>
              <p>{paymentResult.message}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Payment components */}
      {!paymentResult && (
        <div className="payment-container">
          {paymentMethod === 'FORM' && (
            <PaymentForm
              paymentDetails={paymentDetails}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          )}
          
          {paymentMethod === 'QR' && (
            <QRCodePayment
              paymentDetails={paymentDetails}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          )}
          
          {paymentMethod === 'BUTTON' && (
            <div className="quick-pay">
              <p>Click the button below to pay with your default payment method.</p>
              <PaymentButton
                paymentDetails={paymentDetails}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                text="Pay Now"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Example of using the SDK hooks directly
const CustomPaymentComponent = () => {
  const { sdk, loading, error } = useSunny();
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  
  // Handle custom payment
  const handleCustomPayment = async () => {
    if (!sdk || loading) return;
    
    setProcessing(true);
    
    try {
      const paymentResult = await sdk.createPayment({
        amount: '50.00',
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
      
      setResult(paymentResult);
    } catch (err) {
      setResult({
        success: false,
        message: err.message
      });
    } finally {
      setProcessing(false);
    }
  };
  
  if (loading) {
    return <div>Loading SDK...</div>;
  }
  
  if (error) {
    return <div>Error loading SDK: {error.message}</div>;
  }
  
  return (
    <div className="custom-payment">
      <button
        onClick={handleCustomPayment}
        disabled={processing}
      >
        {processing ? 'Processing...' : 'Make Custom Payment'}
      </button>
      
      {result && (
        <div className={`result ${result.success ? 'success' : 'error'}`}>
          <p>{result.success ? 'Payment successful!' : 'Payment failed'}</p>
          <p>{result.message}</p>
          {result.transactionId && (
            <p>Transaction ID: {result.transactionId}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;