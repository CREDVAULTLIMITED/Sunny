import React, { useState, useEffect } from 'react';
import { useSunny } from '../../../sdk/SunnyReactSDK';

const PaymentsPage = () => {
  const { sdk } = useSunny();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState({
    amount: '',
    currency: 'USD',
    paymentMethod: 'card',
    description: ''
  });
  const [customerData, setCustomerData] = useState({
    email: '',
    name: ''
  });
  const [paymentLink, setPaymentLink] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const paymentDetails = {
        amount: parseFloat(paymentData.amount),
        currency: paymentData.currency,
        paymentMethod: paymentData.paymentMethod,
        description: paymentData.description,
        customer: {
          email: customerData.email,
          name: customerData.name
        }
      };

      const response = await sdk.createPayment(paymentDetails);
      
      if (response.success) {
        setSuccessMessage('Payment processed successfully');
        setPaymentLink(response.paymentLink);
        // Reset form
        setPaymentData({
          amount: '',
          currency: 'USD',
          paymentMethod: 'card',
          description: ''
        });
        setCustomerData({
          email: '',
          name: ''
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to process payment');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateLink = async () => {
    try {
      setLoading(true);
      setError(null);

      const linkDetails = {
        amount: parseFloat(paymentData.amount),
        currency: paymentData.currency,
        description: paymentData.description
      };

      const response = await sdk.generatePaymentLink(linkDetails);
      setPaymentLink(response.paymentLink);
    } catch (err) {
      setError(err.message || 'Failed to generate payment link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Create Payment</h3>
            <p className="mt-1 text-sm text-gray-600">
              Create a new payment or generate a payment link for your customer.
            </p>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handlePaymentSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {/* Success Message */}
                {successMessage && (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">{successMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Amount and Currency */}
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        step="0.01"
                        required
                        value={paymentData.amount}
                        onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                      Currency
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      value={paymentData.currency}
                      onChange={(e) => setPaymentData({ ...paymentData, currency: e.target.value })}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <select
                    id="payment-method"
                    name="payment-method"
                    value={paymentData.paymentMethod}
                    onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="card">Credit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="crypto">Cryptocurrency</option>
                  </select>
                </div>

                {/* Customer Information */}
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="customer-name"
                      id="customer-name"
                      value={customerData.name}
                      onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="customer-email" className="block text-sm font-medium text-gray-700">
                      Customer Email
                    </label>
                    <input
                      type="email"
                      name="customer-email"
                      id="customer-email"
                      value={customerData.email}
                      onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={paymentData.description}
                      onChange={(e) => setPaymentData({ ...paymentData, description: e.target.value })}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Payment description"
                    />
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-3">
                <button
                  type="button"
                  onClick={generateLink}
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Generate Link
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? 'Processing...' : 'Create Payment'}
                </button>
              </div>
            </div>
          </form>

          {/* Payment Link Display */}
          {paymentLink && (
            <div className="mt-6">
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-blue-800">Payment Link Generated</p>
                    <div className="mt-2 text-sm text-blue-700">
                      <input
                        type="text"
                        readOnly
                        value={paymentLink}
                        className="w-full bg-blue-50 border-0 focus:ring-0"
                        onClick={(e) => e.target.select()}
                      />
                    </div>
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(paymentLink)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        Copy to clipboard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;

import React, { useState, useEffect, useCallback } from 'react';
import { useSunny } from '../../../sdk/SunnyReactSDK';
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

/**
 * Card payment form component
 */
const CardPaymentForm = ({ onSubmit, processing }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!cardDetails.cardNumber) newErrors.cardNumber = 'Card number is required';
    else if (!/^\d{13,19}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))) 
      newErrors.cardNumber = 'Invalid card number';
    
    if (!cardDetails.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
    
    if (!cardDetails.expiryMonth) newErrors.expiryMonth = 'Required';
    else if (!/^(0[1-9]|1[0-2])$/.test(cardDetails.expiryMonth)) 
      newErrors.expiryMonth = 'Invalid month';
    
    if (!cardDetails.expiryYear) newErrors.expiryYear = 'Required';
    else if (!/^20\d{2}$/.test(cardDetails.expiryYear)) 
      newErrors.expiryYear = 'Invalid year';
    
    if (!cardDetails.cvv) newErrors.cvv = 'Required';
    else if (!/^\d{3,4}$/.test(cardDetails.cvv)) 
      newErrors.cvv = 'Invalid CVV';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(cardDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={cardDetails.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.cardNumber ? 'border-red-500' : ''}`}
          disabled={processing}
        />
        {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
      </div>

      <div>
        <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
        <input
          type="text"
          id="cardholderName"
          name="cardholderName"
          value={cardDetails.cardholderName}
          onChange={handleChange}
          placeholder="John Smith"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.cardholderName ? 'border-red-500' : ''}`}
          disabled={processing}
        />
        {errors.cardholderName && <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700">Month</label>
          <input
            type="text"
            id="expiryMonth"
            name="expiryMonth"
            value={cardDetails.expiryMonth}
            onChange={handleChange}
            placeholder="MM"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.expiryMonth ? 'border-red-500' : ''}`}
            disabled={processing}
          />
          {errors.expiryMonth && <p className="mt-1 text-sm text-red-600">{errors.expiryMonth}</p>}
        </div>

        <div>
          <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="text"
            id="expiryYear"
            name="expiryYear"
            value={cardDetails.expiryYear}
            onChange={handleChange}
            placeholder="YYYY"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.expiryYear ? 'border-red-500' : ''}`}
            disabled={processing}
          />
          {errors.expiryYear && <p className="mt-1 text-sm text-red-600">{errors.expiryYear}</p>}
        </div>

        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleChange}
            placeholder="123"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.cvv ? 'border-red-500' : ''}`}
            disabled={processing}
          />
          {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={processing}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : 'Pay Now'}
        </button>
      </div>
    </form>
  );
};

CardPaymentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  processing: PropTypes.bool
};

/**
 * Bank transfer payment form component
 */
const BankTransferForm = ({ onSubmit, processing }) => {
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    routingNumber: '',
    accountHolderName: '',
    bankName: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!bankDetails.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!bankDetails.routingNumber) newErrors.routingNumber = 'Routing number is required';
    if (!bankDetails.accountHolderName) newErrors.accountHolderName = 'Account holder name is required';
    if (!bankDetails.bankName) newErrors.bankName = 'Bank name is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(bankDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>

import React, { useState } from 'react';
import { useSunny } from '../../../sdk/SunnyReactSDK.js';

const PaymentsPage = () => {
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Card Payment',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'mpesa',
      name: 'M-Pesa',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      )
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'KES', symbol: 'KSh' },
    { code: 'GBP', symbol: '£' }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-9xl mx-auto">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Payments</h1>
          <p className="text-sm text-gray-600">Create and manage your payments</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            View Payment History
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          {/* Payment Method Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`cursor-pointer rounded-lg border p-4 flex items-center space-x-3 ${
                    selectedMethod === method.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`${
                    selectedMethod === method.id ? 'text-indigo-500' : 'text-gray-400'
                  }`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{method.name}</h3>
                  </div>
                  {selectedMethod === method.id && (
                    <div className="text-indigo-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Amount and Currency */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">
                      {currencies.find(c => c.code === currency)?.symbol}
                    </span>
                  </div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
