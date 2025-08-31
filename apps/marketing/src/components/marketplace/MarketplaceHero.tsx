'use client';

import { motion } from 'framer-motion';
import { 
  BuildingStorefrontIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  UsersIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';

const keyFeatures = [
  {
    icon: BanknotesIcon,
    title: 'Split Payments',
    description: 'Automatic multi-party fund distribution'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Escrow Services',
    description: 'Conditional fund release & protection'
  },
  {
    icon: ChartBarIcon,
    title: 'Commission Management',
    description: 'Automated platform fee collection'
  },
  {
    icon: UsersIcon,
    title: 'Multi-Vendor Support',
    description: 'Complex marketplace scenarios'
  }
];

const stats = [
  { label: 'Transaction Success Rate', value: '99.8%', trend: 'up' },
  { label: 'Average Settlement Time', value: '2min', trend: 'neutral' },
  { label: 'Vendor Onboarding', value: '<24hrs', trend: 'neutral' },
  { label: 'Marketplace Types', value: '50+', trend: 'neutral' }
];

const marketplaceTypes = [
  { name: 'E-commerce', share: 35, color: 'bg-blue-500' },
  { name: 'Services', share: 28, color: 'bg-green-500' },
  { name: 'Digital Products', share: 22, color: 'bg-purple-500' },
  { name: 'Rentals', share: 15, color: 'bg-amber-500' }
];

export default function MarketplaceHero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl" />
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
              <BuildingStorefrontIcon className="w-4 h-4 mr-2" />
              Marketplace Payment Platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
            >
              Power Your
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Marketplace
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Complete marketplace payment solution with split payments, 
              escrow services, and automated commission management. 
              Handle complex multi-vendor scenarios with ease.
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
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
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
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Start Building
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
              
              <button className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <PlayCircleIcon className="w-5 h-5 mr-2" />
                View Demo
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
                    stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-purple-600 dark:text-purple-400'
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

          {/* Right Column - Interactive Marketplace Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Marketplace Dashboard */}
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Marketplace Overview</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Multi-vendor platform</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Live</span>
                </div>
              </div>

              {/* Revenue Split Visualization */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">Revenue Split</h4>
                  <div className="flex items-center text-purple-600 dark:text-purple-400 text-xs">
                    <CurrencyDollarIcon className="w-3 h-3 mr-1" />
                    $45,670 today
                  </div>
                </div>
                
                {/* Split Visualization */}
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                    <span>Vendors (85%)</span>
                    <span className="ml-auto">$38,820</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1.5, delay: 1 }}
                    />
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                    <span>Platform (15%)</span>
                    <span className="ml-auto">$6,850</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '15%' }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                    />
                  </div>
                </div>
              </div>

              {/* Marketplace Types */}
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  Active Marketplaces
                </h4>
                {marketplaceTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${type.color}`} />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{type.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{type.share}% of volume</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {type.share}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400 text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                  <BanknotesIcon className="w-4 h-4" />
                  Split Payment
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <ScaleIcon className="w-4 h-4" />
                  Escrow
                </button>
              </div>
            </div>

            {/* Floating Features */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -left-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-xl shadow-lg text-sm"
            >
              <div className="font-medium">Smart Routing</div>
              <div className="text-xs opacity-80">99.8% Success Rate</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-xl shadow-lg text-sm"
            >
              <div className="font-medium">Instant Settlement</div>
              <div className="text-xs opacity-80">2-minute average</div>
            </motion.div>

            {/* Escrow Preview */}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              className="absolute top-20 -right-16 w-32 h-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3"
            >
              <div className="text-xs font-medium text-gray-900 dark:text-white mb-2">Escrow Status</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Funds Held</span>
                </div>
                <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded">
                  <div className="w-3/4 h-1 bg-green-500 rounded" />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">Conditions: 3/4 met</div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-3 h-3 text-amber-500" />
                  <span className="text-xs text-amber-600 dark:text-amber-400">Pending release</span>
                </div>
              </div>
            </motion.div>

            {/* Vendor Management Preview */}
            <motion.div
              animate={{ rotate: [0, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 3 }}
              className="absolute bottom-20 -left-12 w-28 h-24 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2"
            >
              <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">Vendors</div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">247 Active</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">12 Pending</span>
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  <CheckCircleIcon className="w-3 h-3 inline mr-1" />
                  KYC Verified
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

