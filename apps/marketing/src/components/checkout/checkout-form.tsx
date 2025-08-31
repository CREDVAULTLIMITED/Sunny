'use client';

/**
 * Modern React Checkout Component
 * Replaces the vanilla JavaScript CheckoutUI with a modern TypeScript React component
 */

import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { 
  CheckoutConfig, 
  PaymentData, 
  PaymentResult, 
  PaymentMethods
} from '@/lib/types/payment';
import { SunnyPaymentGateway } from '@/lib/services/payment-gateway';

// Form validation schemas
const cardSchema = z.object({
  number: z.string().min(13, 'Card number must be at least 13 digits').max(19, 'Card number cannot exceed 19 digits'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date format (MM/YY)'),
  cvc: z.string().min(3, 'CVC must be at least 3 digits').max(4, 'CVC cannot exceed 4 digits'),
  name: z.string().min(2, 'Name must be at least 2 characters')
});

const bankTransferSchema = z.object({
  bankName: z.string().min(2, 'Bank name is required'),
  accountNumber: z.string().min(8, 'Account number must be at least 8 digits'),
  routingNumber: z.string().min(9, 'Routing number must be 9 digits').max(9, 'Routing number must be 9 digits')
});

const mobileMoneySchema = z.object({
  provider: z.enum(['mpesa', 'mtn', 'airtel', 'orange']),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits')
});

interface CheckoutFormProps extends CheckoutConfig {
  onPaymentSuccess?: (result: PaymentResult) => void;
  onPaymentError?: (error: string) => void;
  className?: string;
}

export function CheckoutForm({
  merchantName,
  amount,
  currency,
  paymentMethods,
  locale = 'en-US',
  theme: _theme = {},
  onPaymentSuccess,
  onPaymentError,
  className = ''
}: CheckoutFormProps) {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]?.id || PaymentMethods.CARD);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Initialize payment gateway (in real app, this would come from context/props)
  const paymentGateway = new SunnyPaymentGateway({
    merchantId: 'demo_merchant',
    apiKey: 'demo_api_key',
    apiSecret: 'demo_secret',
    environment: 'sandbox'
  });

  const getValidationSchema = () => {
    switch (selectedMethod) {
      case PaymentMethods.CARD:
        return cardSchema;
      case PaymentMethods.BANK_TRANSFER:
        return bankTransferSchema;
      case PaymentMethods.MOBILE_MONEY:
        return mobileMoneySchema;
      default:
        return z.object({});
    }
  };

  const form = useForm<any>({
    resolver: zodResolver(getValidationSchema()),
    mode: 'onChange'
  });

  const formatCurrency = useCallback((amount: number, currency: string) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount / 100);
  }, [locale]);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      const paymentData: PaymentData = {
        amount,
        currency,
        paymentMethod: selectedMethod,
        customer: {
          name: data.name || 'Customer',
          email: 'customer@example.com' // In real app, this would come from user input
        },
        metadata: {
          checkoutId: Date.now().toString()
        }
      };

      const result = await paymentGateway.processPayment(paymentData);

      if (result.success) {
        setPaymentStatus('success');
        onPaymentSuccess?.(result);
      } else {
        setPaymentStatus('error');
        setErrorMessage(result.message || 'Payment failed');
        onPaymentError?.(result.message || 'Payment failed');
      }
    } catch (error) {
      setPaymentStatus('error');
      const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred';
      setErrorMessage(errorMsg);
      onPaymentError?.(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case PaymentMethods.CARD:
        return <CreditCardIcon className="w-5 h-5" />;
      case PaymentMethods.BANK_TRANSFER:
        return <BanknotesIcon className="w-5 h-5" />;
      case PaymentMethods.MOBILE_MONEY:
        return <DevicePhoneMobileIcon className="w-5 h-5" />;
      default:
        return <CreditCardIcon className="w-5 h-5" />;
    }
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case PaymentMethods.CARD:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                {...form.register('number')}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  e.target.value = formatted;
                  form.setValue('number', formatted.replace(/\s/g, ''));
                }}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                maxLength={19}
              />
              {form.formState.errors.number && (
                <p className="mt-1 text-sm text-red-600">{String(form.formState.errors.number.message)}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  {...form.register('expiry')}
                  onChange={(e) => {
                    const formatted = formatExpiry(e.target.value);
                    e.target.value = formatted;
                    form.setValue('expiry', formatted);
                  }}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  maxLength={5}
                />
                {form.formState.errors.expiry && (
                  <p className="mt-1 text-sm text-red-600">{String(form.formState.errors.expiry.message)}</p>
                )}
              </div>

              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  {...form.register('cvc')}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  maxLength={4}
                />
                {form.formState.errors.cvc && (
                  <p className="mt-1 text-sm text-red-600">{String(form.formState.errors.cvc.message)}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                id="cardName"
                {...form.register('name')}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-sm text-red-600">{String(form.formState.errors.name.message)}</p>
              )}
            </div>
          </motion.div>
        );

      case PaymentMethods.BANK_TRANSFER:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                {...form.register('bankName')}
                placeholder="Your Bank Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {form.formState.errors.bankName && (
                <p className="mt-1 text-sm text-red-600">{String(form.formState.errors.bankName.message)}</p>
              )}
            </div>

            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                {...form.register('accountNumber')}
                placeholder="Your Account Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {form.formState.errors.accountNumber && (
                <p className="mt-1 text-sm text-red-600">{String(form.formState.errors.accountNumber.message)}</p>
              )}
            </div>

            <div>
              <label htmlFor="routingNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Routing Number
              </label>
              <input
                type="text"
                id="routingNumber"
                {...form.register('routingNumber')}
                placeholder="Routing Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                maxLength={9}
              />
              {form.formState.errors.routingNumber && (
                <p className="mt-1 text-sm text-red-600">{String(form.formState.errors.routingNumber.message)}</p>
              )}
            </div>
          </motion.div>
        );

      case PaymentMethods.MOBILE_MONEY:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
                Provider
              </label>
              <select
                id="provider"
                {...form.register('provider')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="mpesa">M-Pesa</option>
                <option value="mtn">MTN Mobile Money</option>
                <option value="airtel">Airtel Money</option>
                <option value="orange">Orange Money</option>
              </select>
              {form.formState.errors.provider && (
                <p className="mt-1 text-sm text-red-600">{String(form.formState.errors.provider.message)}</p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                {...form.register('phoneNumber')}
                placeholder="+254712345678"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {form.formState.errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{String(form.formState.errors.phoneNumber.message)}</p>
              )}
            </div>
          </motion.div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Payment method configuration not available
          </div>
        );
    }
  };

  if (paymentStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
      >
        <div className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your payment of {formatCurrency(amount, currency)} has been processed successfully.
          </p>
          <button
            onClick={() => setPaymentStatus('idle')}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="/api/placeholder/32/32"
            alt="Sunny Payments"
            className="w-8 h-8"
          />
          <span className="text-lg font-semibold text-gray-900">Sunny Payments</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Pay to</div>
          <div className="font-semibold text-gray-900">{merchantName}</div>
        </div>
      </div>

      {/* Amount */}
      <div className="px-6 py-6 text-center border-b border-gray-200">
        <div className="text-sm text-gray-500 mb-1">Amount</div>
        <div className="text-3xl font-bold text-green-600">
          {formatCurrency(amount, currency)}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="px-6 py-4">
        <div className="text-sm font-medium text-gray-700 mb-3">Payment Method</div>
        <div className="flex flex-wrap gap-2 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md border transition-colors ${
                selectedMethod === method.id
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {getPaymentMethodIcon(method.id)}
              <span className="text-sm font-medium">{method.name}</span>
            </button>
          ))}
        </div>

        {/* Payment Form */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {renderPaymentForm()}
          </AnimatePresence>

          {/* Error Message */}
          {paymentStatus === 'error' && errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md"
            >
              <div className="flex items-center">
                <ExclamationCircleIcon className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-sm text-red-700">{errorMessage}</span>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isProcessing || !form.formState.isValid}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Pay ${formatCurrency(amount, currency)}`
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
          <span>🔒 Secured by Sunny</span>
          <span>•</span>
          <span>PCI DSS Compliant</span>
        </div>
      </div>
    </div>
  );
}
