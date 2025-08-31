'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CreditCardIcon,
  BuildingLibraryIcon,
  DevicePhoneMobileIcon,
  WalletIcon,
  CircleStackIcon,
  ShoppingBagIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  MicrophoneIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

interface PaymentMethod {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  methods: string[];
  regions: string[];
  features: string[];
  isPopular?: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'cards',
    category: 'Card Payments',
    title: 'Credit & Debit Cards',
    description: 'Accept all major card brands with optimized authorization rates',
    icon: CreditCardIcon,
    methods: ['Visa', 'Mastercard', 'American Express', 'Discover', 'JCB', 'UnionPay'],
    regions: ['Global', 'US', 'Europe', 'Asia', 'Latin America'],
    features: ['3D Secure', 'Network tokens', 'Contactless', 'Recurring billing'],
    isPopular: true
  },
  {
    id: 'bank_transfers',
    category: 'Bank Transfers',
    title: 'Direct Bank Payments',
    description: 'Low-cost bank transfers with instant verification',
    icon: BuildingLibraryIcon,
    methods: ['ACH', 'SEPA', 'Wire Transfer', 'Open Banking', 'FedNow', 'PIX'],
    regions: ['US', 'Europe', 'Brazil', 'UK', 'Canada'],
    features: ['Instant verification', 'Low fees', 'High limits', 'Real-time processing']
  },
  {
    id: 'mobile_money',
    category: 'Mobile Money',
    title: 'Mobile Payments',
    description: 'Mobile money and carrier billing for emerging markets',
    icon: DevicePhoneMobileIcon,
    methods: ['M-Pesa', 'MTN Mobile Money', 'Airtel Money', 'Orange Money', 'Tigo Pesa'],
    regions: ['Africa', 'Asia', 'Latin America'],
    features: ['SMS payments', 'USSD support', 'Carrier billing', 'Cash-in/cash-out']
  },
  {
    id: 'digital_wallets',
    category: 'Digital Wallets',
    title: 'Digital Wallets',
    description: 'Popular digital wallets for faster, secure checkouts',
    icon: WalletIcon,
    methods: ['Apple Pay', 'Google Pay', 'PayPal', 'Alipay', 'WeChat Pay', 'Samsung Pay'],
    regions: ['Global', 'US', 'Europe', 'China', 'Asia'],
    features: ['One-click payments', 'Biometric auth', 'Tokenization', 'In-app payments']
  },
  {
    id: 'crypto',
    category: 'Cryptocurrency',
    title: 'Crypto Payments',
    description: 'Accept major cryptocurrencies with instant conversion',
    icon: CircleStackIcon,
    methods: ['Bitcoin', 'Ethereum', 'USDC', 'USDT', 'Litecoin', 'Bitcoin Cash'],
    regions: ['Global'],
    features: ['Instant conversion', 'Stablecoin support', 'DeFi integration', 'Low fees']
  },
  {
    id: 'bnpl',
    category: 'Buy Now Pay Later',
    title: 'BNPL Solutions',
    description: 'Flexible payment options to increase conversion rates',
    icon: ShoppingBagIcon,
    methods: ['Klarna', 'Afterpay', 'Affirm', 'Zip', 'Sezzle', 'PayBright'],
    regions: ['US', 'Europe', 'Australia', 'Canada'],
    features: ['Flexible terms', 'Instant approval', 'Risk management', 'Higher conversions']
  },
  {
    id: 'innovative',
    category: 'Innovative Methods',
    title: 'Next-Gen Payments',
    description: 'Cutting-edge payment technologies for the future',
    icon: MicrophoneIcon,
    methods: ['Voice Payments', 'IoT Device Payments', 'Biometric Auth', 'QR Codes'],
    regions: ['Global', 'Emerging Markets'],
    features: ['Voice activation', 'IoT integration', 'Biometric security', 'Contactless']
  },
  {
    id: 'pos',
    category: 'Point of Sale',
    title: 'POS Systems',
    description: 'Complete point-of-sale solutions for physical locations',
    icon: ComputerDesktopIcon,
    methods: ['Kiosk POS', 'Tablet POS', 'Mobile Terminals', 'Self-Checkout'],
    regions: ['Global'],
    features: ['Offline capability', 'Multi-device sync', 'Inventory integration', 'Receipt printing']
  }
];

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
};

export default function PaymentMethodsSection() {
  const [activeMethod, setActiveMethod] = useState(paymentMethods[0].id);

  const currentMethod = paymentMethods.find(method => method.id === activeMethod) || paymentMethods[0];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900/80 dark:to-gray-800">
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            Payment Methods
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Accept Payments{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
              Your Way
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Support 20+ payment methods including Voice, IoT, and POS systems across 190+ countries 
            with localized experiences and AI-optimized routing for maximum success rates.
          </p>
        </motion.div>

        {/* Mobile-First Design */}
        <div className="block lg:hidden">
          {/* Mobile: Horizontal Scroll Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-none">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="snap-start flex-shrink-0 w-72"
                >
                  <Card
                    className={`p-6 h-full cursor-pointer transition-all duration-300 ${
                      activeMethod === method.id
                        ? 'bg-white dark:bg-gray-800 shadow-xl shadow-green-500/20 dark:shadow-green-400/30 border-2 border-green-300 dark:border-green-600 scale-105'
                        : 'bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg border-2 border-transparent'
                    }`}
                    onClick={() => setActiveMethod(method.id)}
                  >
                    {/* Card Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        activeMethod === method.id 
                          ? 'bg-green-100 dark:bg-green-900/30' 
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <method.icon className={`w-6 h-6 ${
                          activeMethod === method.id 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                            {method.title}
                          </h3>
                          {method.isPopular && (
                            <Badge variant="outline" className="text-xs border-green-200 text-green-700 dark:border-green-800 dark:text-green-400">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {method.category}
                        </p>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 overflow-hidden">
                      <span className="block leading-5 max-h-10 overflow-hidden">
                        {method.description}
                      </span>
                    </p>

                    {/* Top Methods Preview */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {method.methods.slice(0, 3).map((methodName) => (
                          <Badge key={methodName} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            {methodName}
                          </Badge>
                        ))}
                        {method.methods.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                            +{method.methods.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Regions Preview */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <GlobeAltIcon className="w-4 h-4" />
                      <span>{method.regions.slice(0, 2).join(', ')}{method.regions.length > 2 && '...'}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile: Active Method Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMethod}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center">
                    <currentMethod.icon className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {currentMethod.title}
                      </h3>
                      {currentMethod.isPopular && (
                        <Badge variant="outline" className="border-green-200 text-green-700 dark:border-green-800 dark:text-green-400 text-xs">
                          Most Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {currentMethod.description}
                    </p>
                  </div>
                </div>

                {/* Supported Methods */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                    Supported Methods
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {currentMethod.methods.map((method, index) => (
                      <motion.div
                        key={method}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {method}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Features & Regions */}
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Key Features
                    </h4>
                    <div className="space-y-2">
                      {currentMethod.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <GlobeAltIcon className="w-4 h-4" />
                      Supported Regions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentMethod.regions.map((region) => (
                        <Badge key={region} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Start Integration
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300 hover:border-green-500">
                    View Documentation
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Design - Same as before */}
        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Payment Method Tabs */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-2">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    onClick={() => setActiveMethod(method.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                      activeMethod === method.id
                        ? 'bg-white dark:bg-gray-800 shadow-xl shadow-green-500/20 dark:shadow-green-400/30 border-2 border-green-300 dark:border-green-600 scale-105'
                        : 'bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 hover:bg-white hover:shadow-lg hover:shadow-blue-500/10 dark:hover:bg-gray-800 dark:hover:shadow-blue-400/20 border-2 border-transparent hover:scale-102'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activeMethod === method.id 
                          ? 'bg-green-100 dark:bg-green-900/30' 
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <method.icon className={`w-5 h-5 ${
                          activeMethod === method.id 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {method.title}
                          </h3>
                          {method.isPopular && (
                            <Badge variant="outline" className="text-xs border-green-200 text-green-700 dark:border-green-800 dark:text-green-400">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {method.category}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Payment Method Details */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMethod}
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Card className="p-8 border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center">
                        <currentMethod.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {currentMethod.title}
                          </h3>
                          {currentMethod.isPopular && (
                            <Badge variant="outline" className="border-green-200 text-green-700 dark:border-green-800 dark:text-green-400">
                              Most Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                          {currentMethod.description}
                        </p>
                      </div>
                    </div>

                    {/* Payment Methods Grid */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Supported Methods
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {currentMethod.methods.map((method, index) => (
                          <motion.div
                            key={method}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <CheckCircleIcon className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {method}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Key Features
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {currentMethod.features.map((feature, index) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Regions */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <GlobeAltIcon className="w-5 h-5" />
                        Supported Regions
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentMethod.regions.map((region) => (
                          <Badge key={region} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Start Integration
                      </Button>
                      <Button variant="outline" className="border-gray-300 hover:border-green-500">
                        View Documentation
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 lg:mt-24 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '100+', label: 'Payment Methods' },
              { value: '190+', label: 'Countries' },
              { value: '135+', label: 'Currencies' },
              { value: '99.9%', label: 'Success Rate' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
