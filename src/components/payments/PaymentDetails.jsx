import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePayments } from '../../hooks/usePayments';
import ReceiptDownload from './ReceiptDownload';
import PaymentStatusBadge from './PaymentStatusBadge';
import PaymentMethodIcon from './PaymentMethodIcon';
import { formatDate, formatAmount } from '../../utils/formatters';
import { DirectCardProcessor } from '../../core/processors/DirectCardProcessor';

const PaymentDetails = () => {
  const { transactionId } = useParams();
  const { getPaymentDetails, loading, error } = usePayments();
  const [payment, setPayment] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const details = await getPaymentDetails(transactionId);
        setPayment(details);
      } catch (err) {
        // Handle error
      }
    };

    fetchPaymentDetails();
  }, [transactionId, getPaymentDetails]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl text-red-600">Error loading payment details</h2>
        <button
          onClick={() => window.history.back()}
          className="text-primary-600 hover:text-primary-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <PaymentMethodIcon payment={payment} className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-bold">Payment Details</h1>
                <p className="text-gray-500">{formatDate(payment.createdAt)}</p>
              </div>
            </div>
            <PaymentStatusBadge status={payment.status} />
          </div>
        </div>

        {/* Payment Information */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount & Status */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">{formatAmount(payment.amount, payment.currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee:</span>
                  <span>{formatAmount(payment.processingFee, payment.currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Amount:</span>
                  <span className="font-semibold">
                    {formatAmount(payment.amount - payment.processingFee, payment.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Bank Information</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank Name:</span>
                  <span>{payment.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Type:</span>
                  <span>{payment.accountType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-mono">****{payment.accountLast4}</span>
                </div>
                {payment.routingNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Routing Number:</span>
                    <span className="font-mono">{payment.routingNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Transaction Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono">{payment.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank Reference:</span>
                  <span className="font-mono">{payment.bankReference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span>Direct Bank Payment</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Settlement Status:</span>
                  <span>{payment.settlementStatus}</span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span>{payment.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>{payment.customerEmail}</span>
                </div>
                {payment.companyName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company:</span>
                    <span>{payment.companyName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Receipt Actions */}
          <div className="mt-8">
            <ReceiptDownload payment={payment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
