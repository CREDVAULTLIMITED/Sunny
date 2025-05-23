import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { formatCryptoAmount } from '../../utils/formatters';
import { CRYPTO_TYPES } from '../../core/constants';
import { CryptoProcessor } from '../../integrations/crypto/CryptoProcessor';

const cryptoProcessor = new CryptoProcessor();

const CryptoPayment = ({ 
  amount, 
  currency, 
  onSuccess, 
  onError,
  transactionId 
}) => {
  const [paymentData, setPaymentData] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});
  const [statusCheckInterval, setStatusCheckInterval] = useState(null);

  useEffect(() => {
    loadExchangeRates();
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedCrypto) {
      createPayment();
    }
  }, [selectedCrypto]);

  const loadExchangeRates = async () => {
    try {
      const rates = await cryptoProcessor.getExchangeRates();
      if (rates.success) {
        setExchangeRates(rates.rates);
      } else {
        setError('Failed to load exchange rates');
      }
    } catch (error) {
      setError('Error loading exchange rates');
    }
  };

  const createPayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await cryptoProcessor.createTransaction({
        amount,
        currency,
        cryptoCurrency: selectedCrypto,
        transactionId,
        metadata: {
          paymentType: 'crypto'
        }
      });

      if (result.success) {
        setPaymentData(result);
        startStatusCheck(result);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to create payment');
    } finally {
      setLoading(false);
    }
  };

  const startStatusCheck = (payment) => {
    const interval = setInterval(async () => {
      try {
        const status = await cryptoProcessor.checkTransactionStatus({
          transactionId: payment.transactionId,
          paymentAddress: payment.paymentAddress,
          cryptoCurrency: payment.cryptoCurrency
        });

        if (status.success) {
          if (status.status === 'COMPLETED') {
            clearInterval(interval);
            onSuccess(status);
          }
        }
      } catch (error) {
        console.error('Status check error:', error);
      }
    }, 30000); // Check every 30 seconds

    setStatusCheckInterval(interval);
  };

  const handleCryptoChange = (crypto) => {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
    }
    setSelectedCrypto(crypto);
  };

  if (loading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
        <button 
          onClick={createPayment}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Select Cryptocurrency</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(CRYPTO_TYPES).map((crypto) => (
            <button
              key={crypto}
              onClick={() => handleCryptoChange(crypto)}
              className={`p-3 rounded border ${
                selectedCrypto === crypto
                  ? 'bg-blue-500 text-white'
                  : 'bg-white'
              }`}
            >
              {crypto}
            </button>
          ))}
        </div>
      </div>

      {paymentData && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-4 text-center">
            <QRCode 
              value={paymentData.paymentAddress}
              size={200}
              level="H"
              className="mx-auto"
            />
          </div>

          <div className="space-y-2">
            <div className="font-medium">Amount to Pay</div>
            <div className="text-xl font-bold">
              {formatCryptoAmount(paymentData.amount, paymentData.cryptoCurrency)}
              {' '}
              {paymentData.cryptoCurrency}
            </div>

            <div className="text-sm text-gray-500">
              Original amount: {amount} {currency}
              <br />
              Exchange rate: 1 {paymentData.cryptoCurrency} = {' '}
              {(1 / paymentData.conversionRate).toFixed(2)} {currency}
            </div>

            <div className="mt-4">
              <div className="font-medium">Payment Address</div>
              <div className="break-all bg-white p-2 rounded border">
                {paymentData.paymentAddress}
              </div>
            </div>

            <div className="text-sm text-gray-500 mt-4">
              Required confirmations: {paymentData.requiredConfirmations}
              <br />
              Payment expires in: {new Date(paymentData.expiresAt).toLocaleString()}
            </div>
          </div>

          {paymentData.isToken && (
            <div className="mt-4 p-3 bg-yellow-50 rounded text-sm">
              <div className="font-medium">Important Note</div>
              This is a {paymentData.tokenType} token on the {paymentData.network} network.
              Make sure to send the payment from a compatible wallet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CryptoPayment;
