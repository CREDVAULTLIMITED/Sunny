import React, { useState, useEffect } from 'react';
import { useSunny } from '../../sdk/SunnyReactSDK.js';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';

/**
 * QR code payment component
 */
const QRCodePayment = ({
  amount,
  currency,
  qrType = 'dynamic',
  onSuccess,
  onError
}) => {
  const { sdk, loading: sdkLoading, error: sdkError } = useSunny();
  const [qrData, setQrData] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [statusCheckInterval, setStatusCheckInterval] = useState(null);

  // Generate QR code on component mount
  useEffect(() => {
    generateQRCode();
    
    return () => {
      // Clear interval on unmount
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!qrData || timeLeft <= 0) return;
    
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
  }, [qrData, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate QR code
  const generateQRCode = async () => {
    setGenerating(true);
    setError(null);
    
    try {
      const result = await sdk.createQRCode({
        amount,
        currency,
        qrType,
        expiryMinutes: 5
      });
      
      if (result.success) {
        setQrData(result);
        
        // Start checking payment status every 5 seconds
        const interval = setInterval(() => {
          checkPaymentStatus(result.qrId);
        }, 5000);
        
        setStatusCheckInterval(interval);
      } else {
        setError(result.message || 'Failed to generate QR code');
        onError && onError(result);
      }
    } catch (err) {
      setError(err.message || 'Failed to generate QR code');
      onError && onError(err);
    } finally {
      setGenerating(false);
    }
  };

  // Check payment status
  const checkPaymentStatus = async (qrId) => {
    try {
      // This is a placeholder - you would need to implement this method
      const result = await sdk.orchestrator.checkQRPaymentStatus(qrId);
      
      if (result && result.status === 'COMPLETED') {
        // Clear interval and call onSuccess
        if (statusCheckInterval) {
          clearInterval(statusCheckInterval);
        }
        
        onSuccess && onSuccess(result);
      }
    } catch (err) {
      console.error('Error checking payment status:', err);
    }
  };

  // Regenerate QR code
  const handleRegenerate = () => {
    // Clear existing interval
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
    }
    
    // Reset timer
    setTimeLeft(300);
    
    // Generate new QR code
    generateQRCode();
  };

  if (generating || sdkLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-600">Generating QR code...</p>
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
          onClick={handleRegenerate}
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!qrData) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">No QR code data available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
        <img
          src={qrData.qrImageUrl}
          alt="Payment QR Code"
          className="w-64 h-64"
        />
      </div>
      
      <div className="text-center mb-6">
        <p className="text-lg font-medium text-gray-800">
          {currency} {amount}
        </p>
        
        {timeLeft > 0 ? (
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              QR code expires in <span className="font-medium">{formatTime(timeLeft)}</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${(timeLeft / 300) * 100}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-red-600 mt-2">
            QR code has expired
          </p>
        )}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Scan this QR code with your mobile banking app or payment app to complete the payment.
            </p>
          </div>
        </div>
      </div>
      
      {timeLeft <= 0 && (
        <Button
          variant="primary"
          className="mt-4"
          onClick={handleRegenerate}
        >
          Generate New QR Code
        </Button>
      )}
    </div>
  );
};

export default QRCodePayment;