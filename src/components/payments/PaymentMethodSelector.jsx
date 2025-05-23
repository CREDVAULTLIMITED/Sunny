import React from 'react';
import PropTypes from 'prop-types';

/**
 * Payment method selector component
 */
const PaymentMethodSelector = ({ selectedMethod, onMethodChange, disabledMethods = [] }) => {
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'credit-card' },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: 'bank' },
    { id: 'paypal', name: 'PayPal', icon: 'paypal' },
    { id: 'crypto', name: 'Cryptocurrency', icon: 'bitcoin' },
    { id: 'mobile_money', name: 'Mobile Money', icon: 'phone' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {paymentMethods.map(method => (
        <div 
          key={method.id}
          className={`
            p-4 border rounded-lg flex items-center cursor-pointer transition-colors
            ${selectedMethod === method.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}
            ${disabledMethods.includes(method.id) ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={() => !disabledMethods.includes(method.id) && onMethodChange(method.id)}
        >
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
            {method.icon === 'credit-card' && (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            )}
            {method.icon === 'bank' && (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
            )}
            {method.icon === 'paypal' && (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            )}
            {method.icon === 'bitcoin' && (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {method.icon === 'phone' && (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{method.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

PaymentMethodSelector.propTypes = {
  selectedMethod: PropTypes.string.isRequired,
  onMethodChange: PropTypes.func.isRequired,
  disabledMethods: PropTypes.arrayOf(PropTypes.string)
};

export default PaymentMethodSelector;

