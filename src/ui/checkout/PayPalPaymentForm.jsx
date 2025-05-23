import React, { useState, useEffect } from 'react';
import { useSunny } from '../../sdk/SunnyReactSDK.js';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';

/**
 * PayPal integration component
 * 
 * This component renders a PayPal button for seamless checkout
 */
const PayPalPaymentForm = ({
  amount,
  currency,
  onSuccess,
  onError,
  setLoading,
  customer
}) => {
  const { sdk, loading: sdkLoading, error: sdkError } = useSunny();
  const [buttonRendered, setButtonRendered] = useState(false);
  const [paypalError, setPaypalError] = useState(null);
  
  // Initialize PayPal button
  useEffect(() => {
    if (!window.paypal) {
      // Load PayPal script if not already available
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${sdk.config.paypalClientId}&currency=${currency}`;
      script.async = true;
      script.onload = () => initializePayPalButton();
      script.onerror = () => setPaypalError('Failed to load PayPal script');
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    } else {
      initializePayPalButton();
    }
  }, [currency]);
  
  const initializePayPalButton = () => {
    if (window.paypal && document.getElementById('paypal-button-container')) {
      // Clear existing buttons first
      document.getElementById('paypal-button-container').innerHTML = '';
      
      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'pay'
        },
        
        createOrder: async (data, actions) => {
          setLoading(true);
          try {
            // Create PayPal order through Sunny's SDK
            const result = await sdk.createPayPalOrder({
              amount,
              currency,
              customer: {
                name: customer?.name,
                email: customer?.email,
                phone: customer?.phone
              }
            });
            
            if (result.success) {
              return result.orderID;
            } else {
              throw new Error(result.message || 'Failed to create PayPal order');
            }
          } catch (error) {
            setPaypalError(error.message);
            onError && onError(error);
            throw error;
          }
        },
        
        onApprove: async (data, actions) => {
          try {
            // Capture the funds from the transaction
            const result = await sdk.capturePayPalOrder(data.orderID);
            
            if (result.success) {
              onSuccess && onSuccess(result);
            } else {
              throw new Error(result.message || 'Failed to capture PayPal payment');
            }
          } catch (error) {
            setPaypalError(error.message);
            onError && onError(error);
          } finally {
            setLoading(false);
          }
        },
        
        onCancel: () => {
          setLoading(false);
          // Handle user cancellation
          setPaypalError('Payment was cancelled');
        },
        
        onError: (err) => {
          setLoading(false);
          setPaypalError('PayPal checkout failed');
          onError && onError(err);
        }
      }).render('#paypal-button-container');
      
      setButtonRendered(true);
    }
  };
  
  return (
    <div className="w-full">
      {paypalError || sdkError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {paypalError || sdkError.message}
              </p>
            </div>
          </div>
        </div>
      ) : null}
      
      <div 
        id="paypal-button-container" 
        className={`w-full ${buttonRendered ? '' : 'bg-gray-100 animate-pulse h-12 rounded-md'}`}
      ></div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          By proceeding with PayPal, you'll be redirected to PayPal's secure payment system.
        </p>
      </div>
    </div>
  );
};

export default PayPalPaymentForm;

