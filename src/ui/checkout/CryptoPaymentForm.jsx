import React, { useState, useEffect } from 'react';
import { useSunny } from '../../sdk/SunnyReactSDK.js';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

/**
 * Cryptocurrency payment component
 * 
 * This component displays cryptocurrency payment options, wallet address and payment status
 */
const CryptoPaymentForm = ({
  amount,
  currency,
  onSuccess,
  onError,
  setLoading,
  customer
}) => {
  const { sdk, loading: sdkLoading, error: sdkError } = useSunny();
  const [paymentData, setPaymentData] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [statusCheckInterval, setStatusCheckInterval] = useState(null);
  const [error, setError] = useState(null);
  
  const cryptocurrencies = [
    { value: 'BTC', label: 'Bitcoin' },
    { value: 'ETH', label: 'Ethereum' },
    { value: 'USDT', label: 'USDT (Tether)' },
    { value: 'USDC', label: 'USDC' }
  ];
  
  useEffect(() => {
    createCryptoPayment();

    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, [selectedCrypto]);

  useEffect(() => {
    if (!paymentData || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paymentData, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const createCryptoPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await sdk.createCryptoPayment({
        amount,
        currency,
        cryptoCurrency: selectedCrypto,
        customer: {
          name: customer?.name,
          email: customer?.email,
          phone: customer?.phone
        }
      });

      if (result.success) {
        setPaymentData(result);
        setTimeLeft(result.expirySeconds || 900);

        const interval = setInterval(() => {
          checkPaymentStatus(result.paymentId);
        }, 10000);

        setStatusCheckInterval(interval);
      } else {
        setError(result.message || 'Failed to create crypto payment');
        onError && onError(result);
      }
    } catch (err) {
      setError(err.message || 'Failed to create crypto payment');
      onError && onError(err);
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async (paymentId) => {
    try {
      const result = await sdk.checkCryptoPaymentStatus(paymentId);

      if (result && result.status === 'COMPLETED') {
        if (statusCheckInterval) {
          clearInterval(statusCheckInterval);
        }

        onSuccess && onSuccess(result);
      }
    } catch (err) {
      console.error('Error checking payment status:', err);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        const copyBtn = document.getElementById('copy-btn');
        if (copyBtn) {
          copyBtn.innerText = 'Copied!';
          setTimeout(() => {
            copyBtn.innerText = 'Copy Address';
          }, 2000);
        }
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleCryptoChange = (e) => {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
    }

    setSelectedCrypto(e.target.value);
  };

  if (sdkLoading || (setLoading && !paymentData && !error)) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-600">Generating payment address...</p>
      </div>
    );
  }

  if (error || sdkError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <svg className="h-10 w-10 text-red-400 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-red-700">{error || sdkError.message}</p>
        <Button
          variant="primary"
          className="mt-4"
          onClick={createCryptoPayment}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <Input.Select
          label="Select Cryptocurrency"
          value={selectedCrypto}
          onChange={handleCryptoChange}
          options={cryptocurrencies}
        />
      </div>

      {paymentData && (
        <>
          <div className="flex flex-col items-center mb-6">
            <div className="mb-4">
              <Card elevation="md">
                {paymentData.qrImageUrl ? (
                  <img
                    src={paymentData.qrImageUrl}
                    alt="Crypto Payment QR Code"
                    className="w-48 h-48 mx-auto"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">QR code not available</span>
                  </div>
                )}
              </Card>
            </div>

            <div className="w-full mb-4">
              <div className="text-gray-600 text-sm mb-1">Send exactly this amount:</div>
              <div className="font-mono text-lg font-semibold p-3 bg-gray-100 rounded-md text-center">
                {paymentData.cryptoAmount} {selectedCrypto}
              </div>
            </div>

            <div className="w-full mb-4">
              <div className="text-gray-600 text-sm mb-1">To this address:</div>
              <div className="font-mono text-sm p-3 bg-gray-100 rounded-md text-center break-all">
                {paymentData.walletAddress}
              </div>
              <Button
                id="copy-btn"
                variant="secondary"
                size="small"
                className="mt-2 mx-auto"
                onClick={() => copyToClipboard(paymentData.walletAddress)}
              >
                Copy Address
              </Button>
            </div>

            {timeLeft > 0 ? (
              <div className="w-full mt-2">
                <p className="text-sm text-center text-gray-600">
                  Payment window expires in <span className="font-medium">{formatTime(timeLeft)}</span>
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000"
                    style={{ width: `${(timeLeft / 900) * 100}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="w-full mt-2">
                <p className="text-sm text-center text-red-600">
                  Payment window expired. Please try again.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoPaymentForm;

