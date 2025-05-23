/**
 * SunnyReactSDK.js
 * 
 * React-specific SDK for integrating with Sunny Payment Gateway
 */

import React, { useState, useEffect, createContext, useContext } from 'react';
import SunnySDK from './SunnySDK.js';

// Create context for the SDK
const SunnyContext = createContext(null);

/**
 * Sunny SDK Provider component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.config - SDK configuration
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} Provider component
 */
export const SunnyProvider = ({ config, children }) => {
  const [sdk, setSdk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initialize SDK
  useEffect(() => {
    try {
      const sunnySDK = new SunnySDK(config);
      setSdk(sunnySDK);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [config]);
  
  // Context value
  const value = {
    sdk,
    loading,
    error
  };
  
  return (
    <SunnyContext.Provider value={value}>
      {children}
    </SunnyContext.Provider>
  );
};

/**
 * Hook to use the Sunny SDK
 * 
 * @returns {Object} SDK context
 */
export const useSunny = () => {
  const context = useContext(SunnyContext);
  
  if (!context) {
    throw new Error('useSunny must be used within a SunnyProvider');
  }
  
  return context;
};

/**
 * Payment Form component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.paymentDetails - Payment details
 * @param {Function} props.onSuccess - Success callback
 * @param {Function} props.onError - Error callback
 * @returns {React.ReactElement} Payment form component
 */
export const PaymentForm = ({ paymentDetails, onSuccess, onError }) => {
  const { sdk, loading, error: sdkError } = useSunny();
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: ''
  });
  const [mobileMoneyDetails, setMobileMoneyDetails] = useState({
    provider: 'MPESA',
    phoneNumber: ''
  });
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    routingNumber: '',
    accountHolderName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!sdk) {
      setError('SDK not initialized');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create payment request
      const request = {
        ...paymentDetails,
        paymentMethod,
      };
      
      // Add payment method-specific details
      switch (paymentMethod) {
        case 'CARD':
          request.cardDetails = cardDetails;
          break;
          
        case 'MOBILE_MONEY':
          request.mobileMoneyDetails = mobileMoneyDetails;
          break;
          
        case 'BANK_TRANSFER':
          request.bankDetails = bankDetails;
          break;
        default:
          // No additional details needed for other payment methods
          break;
      }
      
      // Process payment
      const result = await sdk.createPayment(request);
      
      setIsSubmitting(false);
      
      if (result.success) {
        onSuccess && onSuccess(result);
      } else {
        setError(result.message);
        onError && onError(result);
      }
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message);
      onError && onError(err);
    }
  };
  
  // Render loading state
  if (loading || isSubmitting) {
    return <div className="sunny-loading">Loading payment form...</div>;
  }
  
  // Render error state
  if (sdkError) {
    return <div className="sunny-error">Error initializing payment SDK: {sdkError.message}</div>;
  }
  
  // Render form
  return (
    <form className="sunny-payment-form" onSubmit={handleSubmit}>
      <div className="sunny-payment-methods">
        <div className="sunny-payment-method-selector">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="CARD"
              checked={paymentMethod === 'CARD'}
              onChange={() => setPaymentMethod('CARD')}
            />
            Credit/Debit Card
          </label>
          
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="MOBILE_MONEY"
              checked={paymentMethod === 'MOBILE_MONEY'}
              onChange={() => setPaymentMethod('MOBILE_MONEY')}
            />
            Mobile Money
          </label>
          
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="BANK_TRANSFER"
              checked={paymentMethod === 'BANK_TRANSFER'}
              onChange={() => setPaymentMethod('BANK_TRANSFER')}
            />
            Bank Transfer
          </label>
        </div>
      </div>
      
      {/* Card payment form */}
      {paymentMethod === 'CARD' && (
        <div className="sunny-card-form">
          <div className="sunny-form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          
          <div className="sunny-form-row">
            <div className="sunny-form-group">
              <label htmlFor="expiryMonth">Expiry Month</label>
              <input
                type="text"
                id="expiryMonth"
                value={cardDetails.expiryMonth}
                onChange={(e) => setCardDetails({ ...cardDetails, expiryMonth: e.target.value })}
                placeholder="MM"
                required
              />
            </div>
            
            <div className="sunny-form-group">
              <label htmlFor="expiryYear">Expiry Year</label>
              <input
                type="text"
                id="expiryYear"
                value={cardDetails.expiryYear}
                onChange={(e) => setCardDetails({ ...cardDetails, expiryYear: e.target.value })}
                placeholder="YY"
                required
              />
            </div>
            
            <div className="sunny-form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                placeholder="123"
                required
              />
            </div>
          </div>
          
          <div className="sunny-form-group">
            <label htmlFor="cardholderName">Cardholder Name</label>
            <input
              type="text"
              id="cardholderName"
              value={cardDetails.cardholderName}
              onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
              placeholder="John Smith"
              required
            />
          </div>
        </div>
      )}
      
      {/* Mobile Money payment form */}
      {paymentMethod === 'MOBILE_MONEY' && (
        <div className="sunny-mobile-money-form">
          <div className="sunny-form-group">
            <label htmlFor="mobileMoneyProvider">Provider</label>
            <select
              id="mobileMoneyProvider"
              value={mobileMoneyDetails.provider}
              onChange={(e) => setMobileMoneyDetails({ ...mobileMoneyDetails, provider: e.target.value })}
              required
            >
              <option value="MPESA">M-Pesa</option>
              <option value="AIRTEL">Airtel Money</option>
              <option value="MTN">MTN Mobile Money</option>
              <option value="ORANGE">Orange Money</option>
              <option value="VODACOM">Vodacom M-Pesa</option>
              <option value="TIGO">Tigo Pesa</option>
            </select>
          </div>
          
          <div className="sunny-form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={mobileMoneyDetails.phoneNumber}
              onChange={(e) => setMobileMoneyDetails({ ...mobileMoneyDetails, phoneNumber: e.target.value })}
              placeholder="+254712345678"
              required
            />
          </div>
        </div>
      )}
      
      {/* Bank Transfer payment form */}
      {paymentMethod === 'BANK_TRANSFER' && (
        <div className="sunny-bank-form">
          <div className="sunny-form-group">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              value={bankDetails.accountNumber}
              onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
              placeholder="Account Number"
              required
            />
          </div>
          
          <div className="sunny-form-group">
            <label htmlFor="routingNumber">Routing Number</label>
            <input
              type="text"
              id="routingNumber"
              value={bankDetails.routingNumber}
              onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
              placeholder="Routing Number"
              required
            />
          </div>
          
          <div className="sunny-form-group">
            <label htmlFor="accountHolderName">Account Holder Name</label>
            <input
              type="text"
              id="accountHolderName"
              value={bankDetails.accountHolderName}
              onChange={(e) => setBankDetails({ ...bankDetails, accountHolderName: e.target.value })}
              placeholder="Account Holder Name"
              required
            />
          </div>
        </div>
      )}
      
      {/* Payment details */}
      <div className="sunny-payment-details">
        <div className="sunny-amount">
          <span className="sunny-amount-label">Amount:</span>
          <span className="sunny-amount-value">
            {paymentDetails.currency} {paymentDetails.amount}
          </span>
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="sunny-error-message">
          {error}
        </div>
      )}
      
      {/* Submit button */}
      <div className="sunny-form-actions">
        <button
          type="submit"
          className="sunny-submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : `Pay ${paymentDetails.currency} ${paymentDetails.amount}`}
        </button>
      </div>
    </form>
  );
};

/**
 * QR Code Payment component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.paymentDetails - Payment details
 * @param {Function} props.onSuccess - Success callback
 * @param {Function} props.onError - Error callback
 * @returns {React.ReactElement} QR code payment component
 */
export const QRCodePayment = ({ paymentDetails, onSuccess, onError }) => {
  const { sdk, loading: sdkLoading, error: sdkError } = useSunny();
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [statusCheckInterval, setStatusCheckInterval] = useState(null);
  
  // Generate QR code on mount
  useEffect(() => {
    if (!sdk) return;
    
    const generateQR = async () => {
      try {
        const result = await sdk.generateQRCode({
          ...paymentDetails,
          type: 'DYNAMIC'
        });
        
        if (result.success) {
          setQrCode(result);
          
          // Start polling for status
          const interval = setInterval(async () => {
            try {
              // In a real implementation, this would check the status of the QR code payment
              const status = { status: 'PENDING' };
              
              if (status.status === 'COMPLETED') {
                clearInterval(interval);
                setTransactionStatus('COMPLETED');
                onSuccess && onSuccess(status);
              } else if (status.status === 'FAILED') {
                clearInterval(interval);
                setTransactionStatus('FAILED');
                setError('Payment failed');
                onError && onError(status);
              }
            } catch (err) {
              console.error('Error checking payment status:', err);
            }
          }, 3000);
          
          setStatusCheckInterval(interval);
        } else {
          setError(result.message);
          onError && onError(result);
        }
      } catch (err) {
        setError(err.message);
        onError && onError(err);
      } finally {
        setLoading(false);
      }
    };
    
    generateQR();
    
    // Clean up interval on unmount
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
    // statusCheckInterval is both set and used in this effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk, paymentDetails, onSuccess, onError]);
  
  // Render loading state
  if (sdkLoading || loading) {
    return <div className="sunny-loading">Generating QR code...</div>;
  }
  
  // Render error state
  if (sdkError || error) {
    return <div className="sunny-error">Error: {sdkError?.message || error}</div>;
  }
  
  // Render QR code
  return (
    <div className="sunny-qr-payment">
      <div className="sunny-qr-container">
        {qrCode && (
          <>
            <img
              src={qrCode.qrImage}
              alt="Payment QR Code"
              className="sunny-qr-image"
            />
            
            <div className="sunny-qr-instructions">
              <p>Scan this QR code to pay</p>
              <p className="sunny-amount">
                {paymentDetails.currency} {paymentDetails.amount}
              </p>
            </div>
            
            {transactionStatus === 'COMPLETED' && (
              <div className="sunny-payment-success">
                Payment completed successfully!
              </div>
            )}
            
            {transactionStatus === 'FAILED' && (
              <div className="sunny-payment-error">
                Payment failed. Please try again.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/**
 * Payment Button component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.paymentDetails - Payment details
 * @param {Function} props.onSuccess - Success callback
 * @param {Function} props.onError - Error callback
 * @param {string} props.text - Button text
 * @returns {React.ReactElement} Payment button component
 */
export const PaymentButton = ({ paymentDetails, onSuccess, onError, text }) => {
  const { sdk, loading: sdkLoading, error: sdkError } = useSunny();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Handle button click
  const handleClick = async () => {
    if (!sdk) {
      setError('SDK not initialized');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Process payment
      const result = await sdk.createPayment(paymentDetails);
      
      setLoading(false);
      
      if (result.success) {
        onSuccess && onSuccess(result);
      } else {
        setError(result.message);
        onError && onError(result);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
      onError && onError(err);
    }
  };
  
  // Render button
  return (
    <div className="sunny-payment-button-container">
      <button
        className="sunny-payment-button"
        onClick={handleClick}
        disabled={sdkLoading || loading}
      >
        {loading ? 'Processing...' : text || `Pay ${paymentDetails.currency} ${paymentDetails.amount}`}
      </button>
      
      {(sdkError || error) && (
        <div className="sunny-error-message">
          {sdkError?.message || error}
        </div>
      )}
    </div>
  );
};

const SunnyReactSDK = {
  SunnyProvider,
  useSunny,
  PaymentForm,
  QRCodePayment,
  PaymentButton
};

export default SunnyReactSDK;
