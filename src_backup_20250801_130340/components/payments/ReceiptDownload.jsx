import React, { useState } from 'react';
import { usePayments } from '../../hooks/usePayments';
import { getPaymentMethodIcon } from '../../utils/paymentUtils';
import { formatDate, formatAmount } from '../../utils/formatters';

const ReceiptDownload = ({ payment }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { downloadReceipt } = usePayments();

  const handleDownload = async (format) => {
    try {
      setLoading(true);
      setError(null);
      await downloadReceipt(payment.transactionId, format);
    } catch (err) {
      setError('Failed to download receipt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="receipt-download bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={getPaymentMethodIcon(payment)}
            alt="Payment Method"
            className="w-8 h-8 mr-3"
          />
          <div>
            <h3 className="text-lg font-semibold">Payment Receipt</h3>
            <p className="text-sm text-gray-500">
              {formatDate(payment.createdAt)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold">
            {formatAmount(payment.amount, payment.currency)}
          </p>
          {payment.fiatAmount && (
            <p className="text-sm text-gray-500">
              {formatAmount(payment.fiatAmount, payment.fiatCurrency)}
            </p>
          )}
        </div>
      </div>

      <div className="payment-details space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Transaction ID:</span>
          <span className="font-mono">{payment.transactionId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Status:</span>
          <span className={`status-badge status-${payment.status.toLowerCase()}`}>
            {payment.status}
          </span>
        </div>
        {payment.blockchainTxId && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Blockchain Transaction:</span>
            <a
              href={`${getBlockchainExplorerUrl(payment)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              View on Explorer
            </a>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => handleDownload('pdf')}
          disabled={loading}
          className="flex-1 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 disabled:opacity-50 transition"
        >
          {loading ? 'Downloading...' : 'Download PDF'}
        </button>
        <button
          onClick={() => handleDownload('html')}
          disabled={loading}
          className="flex-1 border border-primary-600 text-primary-600 px-4 py-2 rounded hover:bg-primary-50 disabled:opacity-50 transition"
        >
          View Online
        </button>
      </div>

      {error && (
        <div className="mt-4 text-red-600 text-sm text-center">{error}</div>
      )}

      <div className="mt-4 text-xs text-gray-500 text-center">
        Need help? Contact our support team
      </div>
    </div>
  );
};

export default ReceiptDownload;
