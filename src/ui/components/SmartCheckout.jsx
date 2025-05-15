import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PaymentMethodSelector from './PaymentMethodSelector';
import Button from './Button';
import Card from './Card';
import '../styles/components/SmartCheckout.css';

/**
 * SmartCheckout component for Sunny Payment Gateway
 * 
 * A comprehensive checkout experience that adapts to the user's location and preferences
 */
const SmartCheckout = ({
  amount,
  currency = 'USD',
  onPaymentComplete,
  onPaymentError,
  merchantId,
  orderId,
  customerInfo = {},
  availablePaymentMethods = [],
  className = '',
  theme = 'light',
  showOrderSummary = true,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState(availablePaymentMethods);
  const [userCountry, setUserCountry] = useState(customerInfo.country || null);
  const [step, setStep] = useState('method-selection');
  const [paymentDetails, setPaymentDetails] = useState({});
  
  // Detect user's country if not provided
  useEffect(() => {
    if (!userCountry) {
      // In a real implementation, this would use geolocation or IP-based detection
      // For this example, we'll just set a default
      setUserCountry('US');
    }
  }, [userCountry]);
  
  // Load available payment methods if not provided
  useEffect(() => {
    if (availablePaymentMethods.length === 0) {
      // In a real implementation, this would fetch from an API
      // For this example, we'll use some mock data
      setPaymentMethods([
        {
          id: 'card',
          name: 'Credit/Debit Card',
          icon: '/images/payment-methods/card.svg',
          description: 'Pay with Visa, Mastercard, or American Express',
          preferredCountries: ['US', 'CA', 'GB', 'AU'],
          supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
        },
        {
          id: 'apple_pay',
          name: 'Apple Pay',
          icon: '/images/payment-methods/apple-pay.svg',
          description: 'Fast, secure checkout with Apple Pay',
          preferredCountries: ['US', 'CA', 'GB', 'AU'],
          supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
        },
        {
          id: 'google_pay',
          name: 'Google Pay',
          icon: '/images/payment-methods/google-pay.svg',
          description: 'Fast checkout with Google Pay',
          preferredCountries: ['US', 'CA', 'GB', 'IN'],
          supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'INR']
        },
        {
          id: 'paypal',
          name: 'PayPal',
          icon: '/images/payment-methods/paypal.svg',
          description: 'Pay with your PayPal account',
          preferredCountries: ['US', 'CA', 'GB', 'DE', 'AU'],
          supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
        },
        {
          id: 'mpesa',
          name: 'M-Pesa',
          icon: '/images/payment-methods/mpesa.svg',
          description: 'Pay with M-Pesa mobile money',
          preferredCountries: ['KE', 'TZ', 'GH'],
          supportedCurrencies: ['KES', 'TZS', 'GHS']
        },
        {
          id: 'upi',
          name: 'UPI',
          icon: '/images/payment-methods/upi.svg',
          description: 'Pay with UPI',
          preferredCountries: ['IN'],
          supportedCurrencies: ['INR']
        }
      ]);
    }
  }, [availablePaymentMethods]);
  
  // Handle payment method selection
  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    setStep('payment-details');
  };
  
  // Handle payment details submission
  const handlePaymentDetailsSubmit = (details) => {
    setPaymentDetails(details);
    setStep('confirmation');
  };
  
  // Handle payment confirmation
  const handlePaymentConfirmation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would make an API call to process the payment
      // For this example, we'll simulate a successful payment after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const paymentResult = {
        success: true,
        transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        amount,
        currency,
        paymentMethod: selectedMethod,
        timestamp: new Date().toISOString()
      };
      
      setLoading(false);
      setStep('success');
      
      if (onPaymentComplete) {
        onPaymentComplete(paymentResult);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Payment processing failed');
      
      if (onPaymentError) {
        onPaymentError(err);
      }
    }
  };
  
  // Render payment method details form based on selected method
  const renderPaymentDetailsForm = () => {
    switch (selectedMethod) {
      case 'card':
        return (
          <div className="sunny-checkout__card-form">
            <div className="sunny-checkout__form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input 
                type="text" 
                id="cardNumber" 
                placeholder="1234 5678 9012 3456" 
                className="sunny-checkout__input"
              />
            </div>
            
            <div className="sunny-checkout__form-row">
              <div className="sunny-checkout__form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input 
                  type="text" 
                  id="expiryDate" 
                  placeholder="MM/YY" 
                  className="sunny-checkout__input"
                />
              </div>
              
              <div className="sunny-checkout__form-group">
                <label htmlFor="cvv">CVV</label>
                <input 
                  type="text" 
                  id="cvv" 
                  placeholder="123" 
                  className="sunny-checkout__input"
                />
              </div>
            </div>
            
            <div className="sunny-checkout__form-group">
              <label htmlFor="cardholderName">Cardholder Name</label>
              <input 
                type="text" 
                id="cardholderName" 
                placeholder="John Doe" 
                className="sunny-checkout__input"
              />
            </div>
          </div>
        );
      
      case 'mpesa':
        return (
          <div className="sunny-checkout__mpesa-form">
            <div className="sunny-checkout__form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input 
                type="tel" 
                id="phoneNumber" 
                placeholder="e.g., 254712345678" 
                className="sunny-checkout__input"
              />
            </div>
            
            <p className="sunny-checkout__info-text">
              You will receive an STK push notification on your phone to complete the payment.
            </p>
          </div>
        );
      
      case 'upi':
        return (
          <div className="sunny-checkout__upi-form">
            <div className="sunny-checkout__form-group">
              <label htmlFor="upiId">UPI ID</label>
              <input 
                type="text" 
                id="upiId" 
                placeholder="username@upi" 
                className="sunny-checkout__input"
              />
            </div>
            
            <p className="sunny-checkout__info-text">
              You will receive a payment request on your UPI app to complete the payment.
            </p>
          </div>
        );
      
      default:
        return (
          <div className="sunny-checkout__generic-form">
            <p className="sunny-checkout__info-text">
              Click "Continue" to proceed with your payment using {
                paymentMethods.find(m => m.id === selectedMethod)?.name
              }.
            </p>
          </div>
        );
    }
  };
  
  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 'method-selection':
        return (
          <div className="sunny-checkout__step sunny-checkout__step--method-selection">
            <h2 className="sunny-checkout__step-title">Select Payment Method</h2>
            
            <PaymentMethodSelector
              availableMethods={paymentMethods}
              selectedMethod={selectedMethod}
              onMethodSelect={handleMethodSelect}
              userCountry={userCountry}
              userCurrency={currency}
              className="sunny-checkout__payment-methods"
            />
            
            <div className="sunny-checkout__actions">
              <Button 
                variant="primary" 
                disabled={!selectedMethod}
                onClick={() => setStep('payment-details')}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      
      case 'payment-details':
        return (
          <div className="sunny-checkout__step sunny-checkout__step--payment-details">
            <h2 className="sunny-checkout__step-title">
              {paymentMethods.find(m => m.id === selectedMethod)?.name} Details
            </h2>
            
            <form 
              className="sunny-checkout__form"
              onSubmit={(e) => {
                e.preventDefault();
                handlePaymentDetailsSubmit({});
              }}
            >
              {renderPaymentDetailsForm()}
              
              <div className="sunny-checkout__actions">
                <Button 
                  variant="tertiary" 
                  onClick={() => setStep('method-selection')}
                >
                  Back
                </Button>
                
                <Button 
                  variant="primary" 
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        );
      
      case 'confirmation':
        return (
          <div className="sunny-checkout__step sunny-checkout__step--confirmation">
            <h2 className="sunny-checkout__step-title">Confirm Payment</h2>
            
            <div className="sunny-checkout__confirmation-details">
              <div className="sunny-checkout__confirmation-row">
                <span>Amount:</span>
                <span className="sunny-checkout__amount">
                  {new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency
                  }).format(amount)}
                </span>
              </div>
              
              <div className="sunny-checkout__confirmation-row">
                <span>Payment Method:</span>
                <span>{paymentMethods.find(m => m.id === selectedMethod)?.name}</span>
              </div>
              
              <div className="sunny-checkout__confirmation-row">
                <span>Order ID:</span>
                <span>{orderId}</span>
              </div>
            </div>
            
            <div className="sunny-checkout__actions">
              <Button 
                variant="tertiary" 
                onClick={() => setStep('payment-details')}
              >
                Back
              </Button>
              
              <Button 
                variant="primary" 
                onClick={handlePaymentConfirmation}
                loading={loading}
              >
                Pay Now
              </Button>
            </div>
            
            {error && (
              <div className="sunny-checkout__error">
                {error}
              </div>
            )}
          </div>
        );
      
      case 'success':
        return (
          <div className="sunny-checkout__step sunny-checkout__step--success">
            <div className="sunny-checkout__success-icon">
              <svg viewBox="0 0 24 24" width="64" height="64">
                <path 
                  fill="currentColor" 
                  d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm6.93,8.2-6.85,9.29a1,1,0,0,1-1.43.19L5.76,13.77a1,1,0,0,1-.15-1.41,1,1,0,0,1,1.41-.15l4.08,3.26L17.07,7a1,1,0,0,1,1.4-.14A1,1,0,0,1,18.93,8.2Z"
                />
              </svg>
            </div>
            
            <h2 className="sunny-checkout__step-title">Payment Successful!</h2>
            
            <p className="sunny-checkout__success-message">
              Your payment has been processed successfully. A confirmation has been sent to your email.
            </p>
            
            <div className="sunny-checkout__actions">
              <Button 
                variant="primary" 
                onClick={() => window.location.reload()}
              >
                Done
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  const baseClass = 'sunny-checkout';
  const themeClass = `${baseClass}--theme-${theme}`;
  const classes = [baseClass, themeClass, className].filter(Boolean).join(' ');
  
  return (
    <div className={classes} {...props}>
      <div className="sunny-checkout__container">
        <Card className="sunny-checkout__card">
          {showOrderSummary && (
            <div className="sunny-checkout__order-summary">
              <h2 className="sunny-checkout__summary-title">Order Summary</h2>
              
              <div className="sunny-checkout__summary-amount">
                {new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency
                }).format(amount)}
              </div>
              
              {orderId && (
                <div className="sunny-checkout__summary-order-id">
                  Order #{orderId}
                </div>
              )}
            </div>
          )}
          
          <div className="sunny-checkout__content">
            {renderStep()}
          </div>
        </Card>
        
        <div className="sunny-checkout__secure-badge">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path 
              fill="currentColor" 
              d="M12,1L3,5v6c0,5.55,3.84,10.74,9,12,5.16-1.26,9-6.45,9-12V5L12,1z M12,11.99h7c-0.53,4.12-3.28,7.79-7,8.94V12H5V6.3l7-3.11v8.8z"
            />
          </svg>
          <span>Secure Checkout</span>
        </div>
      </div>
    </div>
  );
};

SmartCheckout.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string,
  onPaymentComplete: PropTypes.func,
  onPaymentError: PropTypes.func,
  merchantId: PropTypes.string.isRequired,
  orderId: PropTypes.string,
  customerInfo: PropTypes.object,
  availablePaymentMethods: PropTypes.array,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
  showOrderSummary: PropTypes.bool,
};

export default SmartCheckout;