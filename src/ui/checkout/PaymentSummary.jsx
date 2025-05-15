import React from 'react';
import Card from '../components/Card.jsx';

/**
 * Payment summary component
 */
const PaymentSummary = ({
  amount,
  currency,
  description,
  paymentStatus
}) => {
  // Format currency
  const formatCurrency = (value, currencyCode) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode
    }).format(value);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Payment Summary</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount</span>
            <span className="font-medium">{formatCurrency(amount, currency)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Processing Fee</span>
            <span className="font-medium">{formatCurrency(0, currency)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">{formatCurrency(amount, currency)}</span>
            </div>
          </div>
          
          {description && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          )}
        </div>
      </Card.Body>
      
      {paymentStatus && (
        <Card.Footer className={`
          ${paymentStatus.success ? 'bg-green-50' : 'bg-red-50'}
          ${paymentStatus.success ? 'border-green-100' : 'border-red-100'}
        `}>
          <div className="flex items-center">
            {paymentStatus.success ? (
              <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span className={`text-sm font-medium ${paymentStatus.success ? 'text-green-700' : 'text-red-700'}`}>
              {paymentStatus.message}
            </span>
          </div>
          
          {paymentStatus.success && paymentStatus.data && paymentStatus.data.transactionId && (
            <div className="mt-2 text-sm text-green-700">
              Transaction ID: <span className="font-mono">{paymentStatus.data.transactionId}</span>
            </div>
          )}
        </Card.Footer>
      )}
    </Card>
  );
};

export default PaymentSummary;