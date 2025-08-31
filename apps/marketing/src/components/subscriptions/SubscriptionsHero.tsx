'use client';

import { motion } from 'framer-motion';
import { 
  ArrowPathIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  CalendarDaysIcon,
  BoltIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const keyFeatures = [
  {
    icon: ArrowPathIcon,
    title: 'Recurring Billing',
    description: 'Automated subscription management'
  },
  {
    icon: ChartBarIcon,
    title: 'Revenue Analytics',
    description: 'MRR, churn, and cohort insights'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Dunning Management',
    description: 'Smart failed payment recovery'
  },
  {
    icon: UsersIcon,
    title: 'Customer Portal',
    description: 'Self-service subscription control'
  }
];

const stats = [
  { label: 'Revenue Recovery', value: '94%', trend: 'up' },
  { label: 'Churn Reduction', value: '35%', trend: 'up' },
  { label: 'Setup Time', value: '<10min', trend: 'neutral' },
  { label: 'Billing Cycles', value: '200+', trend: 'neutral' }
];

const subscriptionPlans = [
  { name: 'Basic', price: '$9.99', period: 'monthly', users: '1-10 users', color: 'bg-blue-500' },
  { name: 'Pro', price: '$29.99', period: 'monthly', users: '11-100 users', color: 'bg-purple-500' },
  { name: 'Enterprise', price: '$99.99', period: 'monthly', users: 'Unlimited', color: 'bg-green-500' }
];

export default function SubscriptionsHero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-full blur-3xl" />
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
              className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 text-sm font-medium mb-6"
            >
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              Subscription Management Platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
            >
              Recurring Revenue
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Simplified
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Complete subscription billing platform with smart dunning, 
              analytics, and customer self-service. Reduce churn and 
              maximize lifetime value.
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
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
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
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
              
              <button className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
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

          {/* Right Column - Interactive Subscription Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Dashboard */}
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Subscription Dashboard</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Real-time analytics</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Live</span>
                </div>
              </div>

              {/* MRR Card */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">Monthly Recurring Revenue</h4>
                  <div className="flex items-center text-green-600 dark:text-green-400 text-xs">
                    <BoltIcon className="w-3 h-3 mr-1" />
                    +12.5%
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">$127,890</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '78%' }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                </div>
              </div>

              {/* Subscription Plans */}
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">Active Plans</h4>
                {subscriptionPlans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${plan.color}`} />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{plan.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{plan.users}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">{plan.price}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{plan.period}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <CalendarDaysIcon className="w-4 h-4" />
                  Billing Cycle
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400 text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                  <ChartBarIcon className="w-4 h-4" />
                  Analytics
                </button>
              </div>
            </div>

            {/* Floating Features */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-xl shadow-lg text-sm"
            >
              <div className="font-medium">Smart Dunning</div>
              <div className="text-xs opacity-80">94% Recovery Rate</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-xl shadow-lg text-sm"
            >
              <div className="font-medium">Auto Proration</div>
              <div className="text-xs opacity-80">Seamless Upgrades</div>
            </motion.div>

            {/* Customer Portal Preview */}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              className="absolute top-20 -right-16 w-32 h-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3"
            >
              <div className="text-xs font-medium text-gray-900 dark:text-white mb-2">Customer Portal</div>
              <div className="space-y-2">
                <div className="w-full h-2 bg-blue-100 dark:bg-blue-900/30 rounded" />
                <div className="w-3/4 h-2 bg-gray-100 dark:bg-gray-700 rounded" />
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-4 bg-green-100 dark:bg-green-900/30 rounded text-xs flex items-center justify-center">
                    <CheckCircleIcon className="w-2 h-2" />
                  </div>
                  <div className="h-4 bg-blue-100 dark:bg-blue-900/30 rounded text-xs flex items-center justify-center">
                    <CurrencyDollarIcon className="w-2 h-2" />
                  </div>
                </div>
                <div className="w-full h-6 bg-gradient-to-r from-green-500 to-blue-600 rounded text-xs text-white flex items-center justify-center font-medium">
                  Self-Service
                </div>
              </div>
            </motion.div>

            {/* Analytics Chart Preview */}
            <motion.div
              animate={{ rotate: [0, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 3 }}
              className="absolute bottom-20 -left-12 w-24 h-20 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2"
            >
              <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">Churn Rate</div>
              <div className="flex items-end gap-1 h-8">
                <div className="w-2 bg-red-300 rounded-t" style={{ height: '60%' }} />
                <div className="w-2 bg-yellow-300 rounded-t" style={{ height: '40%' }} />
                <div className="w-2 bg-green-300 rounded-t" style={{ height: '20%' }} />
                <div className="w-2 bg-green-400 rounded-t" style={{ height: '15%' }} />
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">-35%</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
