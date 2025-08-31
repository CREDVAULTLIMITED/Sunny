'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { PaymentMethod, PaymentResult } from '@/lib/types/payment';

const paymentMethods: PaymentMethod[] = [
  { id: 'card', name: 'Credit/Debit Card', type: 'card', enabled: true },
  { id: 'bank_transfer', name: 'Bank Transfer', type: 'bank_transfer', enabled: true },
  { id: 'mobile_money', name: 'Mobile Money', type: 'mobile_money', enabled: true }
];

export default function DemoPage() {
  const handlePaymentSuccess = (result: PaymentResult) => {
    console.log('Payment successful:', result);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                Interactive Demo
                <span className="text-green-600 block">Payment Gateway</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              >
                Experience our payment gateway with a live demo. Test different payment methods 
                and see how easy it is to integrate Sunny Payments into your application.
              </motion.p>
            </div>

            {/* Demo Section */}
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <CheckoutForm
                  merchantName="Demo Store"
                  amount={2500} // $25.00
                  currency="USD"
                  paymentMethods={paymentMethods}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                />
              </motion.div>
            </div>

            {/* Features */}
            <div className="mt-20 grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Secure Processing
                </h3>
                <p className="text-gray-600">
                  PCI DSS Level 1 compliant with advanced fraud detection
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Instant Settlement
                </h3>
                <p className="text-gray-600">
                  Get your funds in minutes, not days
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Global Coverage
                </h3>
                <p className="text-gray-600">
                  Accept payments from 190+ countries
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

