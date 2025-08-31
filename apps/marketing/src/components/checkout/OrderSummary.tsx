'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ShoppingCartIcon,
  TagIcon,
  InformationCircleIcon,
  GiftIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface OrderItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image?: string;
  type: 'product' | 'service' | 'subscription';
}

interface DiscountCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
}

interface Props {
  items: OrderItem[];
  shippingCost?: number;
  taxRate?: number;
  currency?: string;
}

const sampleItems: OrderItem[] = [
  {
    id: '1',
    name: 'Sunny Payment Gateway - Pro Plan',
    description: 'Monthly subscription for advanced payment processing',
    quantity: 1,
    price: 99.00,
    type: 'subscription'
  },
  {
    id: '2',
    name: 'Setup & Integration Service',
    description: 'Professional setup and integration assistance',
    quantity: 1,
    price: 199.00,
    type: 'service'
  }
];

const availableDiscounts: DiscountCode[] = [
  { code: 'SUNNY10', type: 'percentage', value: 10, description: '10% off first month' },
  { code: 'WELCOME20', type: 'fixed', value: 20, description: '$20 off setup service' },
  { code: 'STUDENT50', type: 'percentage', value: 50, description: '50% student discount' }
];

export default function OrderSummary({ 
  items = sampleItems, 
  shippingCost = 0, 
  taxRate = 0.08,
  currency = 'USD' 
}: Props) {
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [discountError, setDiscountError] = useState('');
  const [showPromoCode, setShowPromoCode] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const discountAmount = appliedDiscount 
    ? appliedDiscount.type === 'percentage' 
      ? subtotal * (appliedDiscount.value / 100)
      : appliedDiscount.value
    : 0;

  const afterDiscount = subtotal - discountAmount;
  const taxAmount = afterDiscount * taxRate;
  const total = afterDiscount + taxAmount + shippingCost;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const applyDiscountCode = () => {
    const discount = availableDiscounts.find(d => d.code.toLowerCase() === discountCode.toLowerCase());
    
    if (discount) {
      setAppliedDiscount(discount);
      setDiscountError('');
      setDiscountCode('');
    } else {
      setDiscountError('Invalid discount code');
      setAppliedDiscount(null);
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    setDiscountError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg sticky top-8"
    >
      {/* Header */}
      <div className="flex items-center mb-6">
        <ShoppingCartIcon className="w-6 h-6 text-blue-500 mr-3" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Order Summary
        </h3>
      </div>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
          >
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.type === 'subscription' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      item.type === 'service' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatCurrency(item.price)} each
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Promo Code Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        {!showPromoCode && !appliedDiscount ? (
          <button
            onClick={() => setShowPromoCode(true)}
            className="flex items-center text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            <GiftIcon className="w-4 h-4 mr-2" />
            Have a promo code?
          </button>
        ) : (
          <div className="space-y-3">
            {appliedDiscount ? (
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div>
                  <span className="text-sm font-medium text-green-800 dark:text-green-400">
                    {appliedDiscount.code} applied
                  </span>
                  <p className="text-xs text-green-600 dark:text-green-500">
                    {appliedDiscount.description}
                  </p>
                </div>
                <button
                  onClick={removeDiscount}
                  className="text-green-600 hover:text-green-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value);
                      setDiscountError('');
                    }}
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyDiscountCode}
                    disabled={!discountCode.trim()}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      discountCode.trim()
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Apply
                  </button>
                </div>
                {discountError && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {discountError}
                  </p>
                )}
                <button
                  onClick={() => setShowPromoCode(false)}
                  className="text-xs text-gray-500 hover:text-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Price Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {appliedDiscount && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600 dark:text-green-400">
              Discount ({appliedDiscount.code})
            </span>
            <span className="text-green-600 dark:text-green-400 font-medium">
              -{formatCurrency(discountAmount)}
            </span>
          </div>
        )}

        {shippingCost > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {formatCurrency(shippingCost)}
            </span>
          </div>
        )}

        {taxRate > 0 && (
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <span className="text-gray-600 dark:text-gray-400">Tax</span>
              <InformationCircleIcon className="w-4 h-4 text-gray-400 ml-1" />
            </div>
            <span className="text-gray-900 dark:text-white font-medium">
              {formatCurrency(taxAmount)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-gray-900 dark:text-white">Total</span>
          <span className="text-gray-900 dark:text-white">
            {formatCurrency(total)}
          </span>
        </div>
      </motion.div>

      {/* Payment Schedule (for subscriptions) */}
      {items.some(item => item.type === 'subscription') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-start">
            <DocumentTextIcon className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                Billing Information
              </p>
              <p className="text-blue-700 dark:text-blue-400">
                You will be charged {formatCurrency(total)} today. 
                Subscription items will auto-renew monthly unless cancelled.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Security Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Secured by 256-bit SSL encryption</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
