'use client';

import { motion } from 'framer-motion';
import { 
  BuildingLibraryIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  GlobeAltIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  UsersIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const keyFeatures = [
  {
    icon: BuildingLibraryIcon,
    title: 'Banking Integrations',
    description: 'Direct connections to 2,500+ banks with ISO8583 protocols'
  },
  {
    icon: ShieldCheckIcon,
    title: 'AI-Powered Security',
    description: 'ML fraud detection, AES-256 encryption, PCI DSS Level 1'
  },
  {
    icon: CogIcon,
    title: 'Enterprise Infrastructure',
    description: 'Load balancing, caching systems, Go API Gateway'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Fintech Stack',
    description: '190+ countries, 20+ payment methods, instant settlement'
  }
];

const stats = [
  { label: 'Bank Connections', value: '2,500+', trend: 'up' },
  { label: 'API Uptime', value: '99.99%', trend: 'neutral' },
  { label: 'AI Models Active', value: '11+', trend: 'up' },
  { label: 'Payment Methods', value: '20+', trend: 'up' }
];

const financialProducts = [
  { name: 'Digital Banking', share: 35, color: 'bg-blue-500', description: 'Core banking services' },
  { name: 'Payment Processing', share: 28, color: 'bg-green-500', description: 'Transaction handling' },
  { name: 'Lending Solutions', share: 22, color: 'bg-purple-500', description: 'Credit & loans' },
  { name: 'Investment Tools', share: 15, color: 'bg-amber-500', description: 'Wealth management' }
];

const liveMetrics = [
  { label: 'Active Transactions', value: '$2.4M', change: '+12%' },
  { label: 'AI Fraud Blocked', value: '1,247', change: '+23%' },
  { label: 'API Calls/min', value: '45,230', change: '+15%' },
  { label: 'Tax Compliance', value: '99.8%', change: '+0.1%' }
];

export default function FinancialHero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-green-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-green-500/5 rounded-full blur-3xl" />
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
              className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
            >
              <BuildingLibraryIcon className="w-4 h-4 mr-2" />
              Financial Services Platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
            >
              Enterprise
              <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                FinTech Stack
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Complete financial services infrastructure with AI-powered fraud detection, 
              tax compliance automation, enterprise security, and global banking integrations. 
              Build the future of finance with our comprehensive ecosystem.
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
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Schedule Demo
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
              
              <button className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <PlayCircleIcon className="w-5 h-5 mr-2" />
                Watch Overview
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

          {/* Right Column - Interactive Financial Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Financial Dashboard */}
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Financial Control Center</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise banking platform</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Real-time</span>
                </div>
              </div>

              {/* Live Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {liveMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400">{metric.label}</span>
                      <span className={`text-xs font-medium ${
                        metric.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {metric.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Financial Products Distribution */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/20 dark:to-blue-900/20 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">Product Portfolio</h4>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-xs">
                    <ChartBarIcon className="w-3 h-3 mr-1" />
                    Live allocation
                  </div>
                </div>
                
                <div className="space-y-3">
                  {financialProducts.map((product, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${product.color}`} />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-xs">{product.name}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{product.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          {product.share}%
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* API Status */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  Banking API Status
                </h4>
                {[
                  { name: 'Core Banking API', status: 'operational', uptime: '99.99%' },
                  { name: 'Payment Rails', status: 'operational', uptime: '99.97%' },
                  { name: 'Compliance API', status: 'operational', uptime: '100%' }
                ].map((api, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{api.name}</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {api.uptime} uptime
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Features */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -left-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-xl shadow-lg text-sm"
            >
              <div className="font-medium">PCI DSS Level 1</div>
              <div className="text-xs opacity-80">Bank-grade security</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-xl shadow-lg text-sm"
            >
              <div className="font-medium">99.99% Uptime</div>
              <div className="text-xs opacity-80">Enterprise SLA</div>
            </motion.div>

            {/* Compliance Badge */}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              className="absolute top-20 -right-16 w-32 h-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3"
            >
              <div className="text-xs font-medium text-gray-900 dark:text-white mb-2">Compliance</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">SOX Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">GDPR Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">ISO 27001</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">PCI DSS L1</span>
                </div>
              </div>
            </motion.div>

            {/* Bank Connections */}
            <motion.div
              animate={{ rotate: [0, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 3 }}
              className="absolute bottom-20 -left-12 w-28 h-24 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2"
            >
              <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">Bank Network</div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">2,547 Banks</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">190 Countries</span>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  <GlobeAltIcon className="w-3 h-3 inline mr-1" />
                  Real-time
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

