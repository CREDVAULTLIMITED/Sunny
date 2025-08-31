'use client';

import { motion } from 'framer-motion';
import { 
  PaintBrushIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  SparklesIcon,
  ArrowRightIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline';

const keyFeatures = [
  {
    icon: PaintBrushIcon,
    title: 'Brand Matching',
    description: 'Fully customizable UI to match your brand'
  },
  {
    icon: ChartBarIcon,
    title: 'Conversion Optimization',
    description: 'A/B testing and analytics included'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Mobile Optimized',
    description: 'Perfect checkout on any device'
  },
  {
    icon: GlobeAltIcon,
    title: '35+ Languages',
    description: 'Global localization support'
  }
];

const stats = [
  { label: 'Conversion Rate Increase', value: '23%', trend: 'up' },
  { label: 'Integration Time', value: '<5min', trend: 'neutral' },
  { label: 'Languages Supported', value: '35+', trend: 'neutral' },
  { label: 'Checkout Flows', value: '10+', trend: 'neutral' }
];

export default function CheckoutHero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-6"
            >
              <SparklesIcon className="w-4 h-4 mr-2" />
              White-Label Checkout Solution
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
            >
              Checkout That
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Converts
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Embed our fully customizable, conversion-optimized checkout 
              into your website. Increase sales with proven UX patterns 
              and global payment methods.
            </motion.p>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Try Live Demo
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
              
              <button className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <PlayCircleIcon className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className={`text-2xl lg:text-3xl font-bold mb-1 ${
                    stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Demo Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Checkout Demo */}
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
              {/* Browser Bar */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1 text-sm text-gray-600 dark:text-gray-400 text-center">
                  yourstore.com/checkout
                </div>
              </div>

              {/* Customizable Brand Header */}
              <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-dashed border-blue-300 dark:border-blue-600">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">YS</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">Your Store</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Fully Customizable Branding</div>
                </div>
              </div>

              {/* Checkout Form Preview */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="w-full h-10 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center px-3">
                    <span className="text-gray-400 text-sm">customer@example.com</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-500">
                      <div className="w-4 h-4 bg-blue-500 rounded-full" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Credit Card</span>
                      <div className="ml-auto flex gap-1">
                        <div className="w-6 h-4 bg-blue-500 rounded text-xs text-white flex items-center justify-center font-bold">V</div>
                        <div className="w-6 h-4 bg-red-500 rounded text-xs text-white flex items-center justify-center font-bold">M</div>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg"
                >
                  Complete Purchase - $99.00
                </motion.button>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="text-xs text-gray-500">•</div>
                  <div className="text-xs text-gray-500">256-bit Encryption</div>
                </div>
              </div>
            </div>

            {/* Floating Brand Customization Examples */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -left-6 bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-xl shadow-lg text-sm"
            >
              <div className="font-medium">Brand Colors</div>
              <div className="text-xs opacity-80">Instantly Customizable</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl shadow-lg text-sm"
            >
              <div className="font-medium">A/B Testing</div>
              <div className="text-xs opacity-80">Built-in Optimization</div>
            </motion.div>

            {/* Mobile Preview */}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              className="absolute top-20 -right-16 w-24 h-32 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2"
            >
              <div className="w-full h-1 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
              <div className="space-y-1">
                <div className="w-full h-2 bg-blue-100 dark:bg-blue-900/30 rounded" />
                <div className="w-3/4 h-2 bg-gray-100 dark:bg-gray-700 rounded" />
                <div className="w-full h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded text-xs text-white flex items-center justify-center">
                  Mobile
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
