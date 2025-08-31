'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircleIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  HomeIcon,
  ShoppingCartIcon,
  ClockIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

interface OrderDetails {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  orderDate: string;
  estimatedDelivery?: string;
  customerEmail: string;
  billingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    type: string;
  }>;
}

const sampleOrder: OrderDetails = {
  orderId: 'ord_2024_001234',
  orderNumber: 'SUN-001234',
  amount: 298.00,
  currency: 'USD',
  paymentMethod: 'Visa ending in 4242',
  status: 'completed',
  orderDate: '2024-01-15T10:30:00Z',
  estimatedDelivery: '2024-01-16T10:30:00Z',
  customerEmail: 'john.doe@example.com',
  billingAddress: {
    name: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'US'
  },
  items: [
    { name: 'Sunny Payment Gateway - Pro Plan', quantity: 1, price: 99.00, type: 'subscription' },
    { name: 'Setup & Integration Service', quantity: 1, price: 199.00, type: 'service' }
  ]
};

interface Props {
  order?: OrderDetails;
}

export default function CheckoutSuccess({ order = sampleOrder }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: order.currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadReceipt = () => {
    // Implementation for downloading receipt
    console.log('Downloading receipt for order:', order.orderId);
  };

  const shareOrder = () => {
    // Implementation for sharing order
    console.log('Sharing order:', order.orderId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-green-900/20 dark:via-slate-900 dark:to-blue-900/20 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            delay: 0.2 
          }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <CheckCircleIcon className="w-12 h-12 text-white" />
            </motion.div>
            
            {/* Confetti Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 3, delay: 0.5 }}
              className="absolute inset-0 pointer-events-none"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full"
                  initial={{ 
                    x: 0, 
                    y: 0,
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 200,
                    y: (Math.random() - 0.5) * 200,
                    scale: [0, 1, 0],
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 0.5 + i * 0.1,
                    ease: "easeOut"
                  }}
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                />
              ))}
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-2"
          >
            Thank you for your purchase!
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-lg text-gray-500 dark:text-gray-400"
          >
            Order #{order.orderNumber} • {formatCurrency(order.amount)}
          </motion.p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={downloadReceipt}
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
          >
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            Download Receipt
          </button>
          
          <button
            onClick={shareOrder}
            className="flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ShareIcon className="w-5 h-5 mr-2" />
            Share Order
          </button>

          <Link
            href="/"
            className="flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>

        {/* Order Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Order Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <DocumentTextIcon className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order Information
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Order Number</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {order.orderNumber}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Order Date</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatDate(order.orderDate)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                <div className="flex items-center">
                  <CreditCardIcon className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {order.paymentMethod}
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircleIcon className="w-3 h-3 mr-1" />
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              {order.estimatedDelivery && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Estimated Delivery</span>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(order.estimatedDelivery)}
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total Paid</span>
                  <span className="text-green-600 dark:text-green-400">
                    {formatCurrency(order.amount)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Email Confirmation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <EnvelopeIcon className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Confirmation Sent
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                A confirmation email has been sent to:
              </p>
              
              <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                <p className="font-medium text-gray-900 dark:text-white">
                  {order.customerEmail}
                </p>
              </div>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Order confirmation and receipt</span>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Account setup instructions (if applicable)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Support contact information</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Didn't receive the email?</strong><br />
                  Check your spam folder or contact our support team at{' '}
                  <a href="mailto:support@sunny.com" className="underline hover:text-blue-600">
                    support@sunny.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <ShoppingCartIcon className="w-6 h-6 text-purple-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order Items
              </h3>
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          <div className="space-y-4">
            {order.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.2 + index * 0.1 }}
                className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.type === 'subscription' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatCurrency(item.price)} each
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                Billing Address
              </h4>
              <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                <p className="font-medium text-gray-900 dark:text-white">
                  {order.billingAddress.name}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {order.billingAddress.street}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {order.billingAddress.country}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
        >
          <div className="text-center">
            <CalendarDaysIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What's Next?
            </h3>
            <div className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 space-y-3">
              <p>
                Our team will begin setting up your Sunny Payment Gateway account within 24 hours.
              </p>
              <p>
                You'll receive detailed setup instructions and access credentials via email.
              </p>
              <p>
                Need help? Our support team is available 24/7 to assist you with the integration process.
              </p>
            </div>
            <div className="mt-6">
              <a
                href="/support"
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}



