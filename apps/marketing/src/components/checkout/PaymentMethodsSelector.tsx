'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  CreditCardIcon,
  BanknotesIcon,
  DevicePhoneMobileIcon,
  WalletIcon
} from '@heroicons/react/24/outline';
import { Bitcoin } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  processingTime: string;
  fee: string;
  popular?: boolean;
  logos?: string[];
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit or Debit Card',
    icon: CreditCardIcon,
    description: 'Pay securely with your credit or debit card',
    processingTime: 'Instant',
    fee: '2.9% + $0.30',
    popular: true,
    logos: ['visa', 'mastercard', 'amex', 'discover']
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: BanknotesIcon,
    description: 'Direct transfer from your bank account',
    processingTime: '1-3 business days',
    fee: '1.5% + $0.25',
    logos: ['ach', 'wire']
  },
  {
    id: 'digital-wallet',
    name: 'Digital Wallet',
    icon: WalletIcon,
    description: 'Pay with your preferred digital wallet',
    processingTime: 'Instant',
    fee: '2.9% + $0.30',
    logos: ['paypal', 'apple-pay', 'google-pay']
  },
  {
    id: 'mobile-money',
    name: 'Mobile Money',
    icon: DevicePhoneMobileIcon,
    description: 'Pay using mobile money services',
    processingTime: 'Instant',
    fee: '1.9% + $0.20',
    logos: ['mpesa', 'gcash']
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    icon: Bitcoin,
    description: 'Pay with Bitcoin, Ethereum, or other crypto',
    processingTime: '10-60 minutes',
    fee: '1.5% + $0.15',
    logos: ['bitcoin', 'ethereum', 'usdc']
  }
];

interface Props {
  selectedMethod: string;
  onMethodSelect: (methodId: string) => void;
}

export default function PaymentMethodsSelector({ selectedMethod, onMethodSelect }: Props) {
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Choose Payment Method
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Select your preferred option
        </span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            variants={itemVariants}
            className={`relative cursor-pointer transition-all duration-300 ${
              selectedMethod === method.id
                ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : hoveredMethod === method.id
                ? 'bg-gray-50 dark:bg-slate-700'
                : 'hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
            onClick={() => onMethodSelect(method.id)}
            onMouseEnter={() => setHoveredMethod(method.id)}
            onMouseLeave={() => setHoveredMethod(null)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-4 rounded-xl border-2 border-transparent">
              {method.popular && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Most Popular
                </div>
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Method Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    selectedMethod === method.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    <method.icon className="w-6 h-6" />
                  </div>

                  {/* Method Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {method.name}
                      </h4>
                      {method.popular && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {method.description}
                    </p>

                    {/* Payment Method Logos */}
                    {method.logos && (
                      <div className="flex items-center gap-2 mb-2">
                        {method.logos.map((logo) => (
                          <div
                            key={logo}
                            className="w-8 h-5 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center"
                          >
                            <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">
                              {logo.substring(0, 2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Processing Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Processing: {method.processingTime}</span>
                      <span>Fee: {method.fee}</span>
                    </div>
                  </div>
                </div>

                {/* Selection Indicator */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {selectedMethod === method.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Security:</span>
                      <p className="text-gray-600 dark:text-gray-400">256-bit SSL encryption</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Support:</span>
                      <p className="text-gray-600 dark:text-gray-400">24/7 customer service</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Refunds:</span>
                      <p className="text-gray-600 dark:text-gray-400">Full refund policy</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg"
      >
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
          Payment Security
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>PCI DSS compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>SSL encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Fraud protection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Data protection</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}



