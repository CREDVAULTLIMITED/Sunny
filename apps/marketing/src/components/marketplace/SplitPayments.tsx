'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  BanknotesIcon,
  ArrowsRightLeftIcon,
  UserGroupIcon,
  CalculatorIcon,
  ClockIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  PlayIcon,
  PauseIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';

interface SplitRule {
  id: string;
  name: string;
  type: 'percentage' | 'fixed' | 'dynamic';
  value: number;
  recipient: string;
  description: string;
  color: string;
}

interface SplitScenario {
  id: string;
  name: string;
  description: string;
  totalAmount: number;
  splits: SplitRule[];
  useCase: string;
}

const splitScenarios: SplitScenario[] = [
  {
    id: 'ecommerce',
    name: 'E-commerce Marketplace',
    description: 'Product sales with platform commission',
    totalAmount: 100,
    useCase: 'Online retail marketplace with multiple vendors',
    splits: [
      {
        id: 'vendor',
        name: 'Vendor',
        type: 'percentage',
        value: 85,
        recipient: 'vendor@store.com',
        description: 'Product seller commission',
        color: 'bg-blue-500'
      },
      {
        id: 'platform',
        name: 'Platform Fee',
        type: 'percentage',
        value: 12,
        recipient: 'platform@marketplace.com',
        description: 'Platform commission',
        color: 'bg-green-500'
      },
      {
        id: 'payment',
        name: 'Payment Processing',
        type: 'percentage',
        value: 3,
        recipient: 'fees@sunny.com',
        description: 'Payment processing fee',
        color: 'bg-purple-500'
      }
    ]
  },
  {
    id: 'rideshare',
    name: 'Ride Sharing',
    description: 'Trip payment distribution',
    totalAmount: 25,
    useCase: 'Transportation service with driver and platform split',
    splits: [
      {
        id: 'driver',
        name: 'Driver',
        type: 'percentage',
        value: 75,
        recipient: 'driver@transport.com',
        description: 'Driver earnings',
        color: 'bg-emerald-500'
      },
      {
        id: 'platform',
        name: 'Platform',
        type: 'percentage',
        value: 20,
        recipient: 'platform@rideshare.com',
        description: 'Platform commission',
        color: 'bg-blue-500'
      },
      {
        id: 'insurance',
        name: 'Insurance',
        type: 'percentage',
        value: 5,
        recipient: 'insurance@provider.com',
        description: 'Trip insurance fee',
        color: 'bg-amber-500'
      }
    ]
  },
  {
    id: 'freelance',
    name: 'Freelance Platform',
    description: 'Project payment with escrow',
    totalAmount: 500,
    useCase: 'Freelance work with milestone-based payments',
    splits: [
      {
        id: 'freelancer',
        name: 'Freelancer',
        type: 'percentage',
        value: 90,
        recipient: 'freelancer@work.com',
        description: 'Project payment',
        color: 'bg-indigo-500'
      },
      {
        id: 'platform',
        name: 'Platform Fee',
        type: 'percentage',
        value: 8,
        recipient: 'platform@freelance.com',
        description: 'Service commission',
        color: 'bg-green-500'
      },
      {
        id: 'processing',
        name: 'Processing',
        type: 'percentage',
        value: 2,
        recipient: 'fees@sunny.com',
        description: 'Payment processing',
        color: 'bg-purple-500'
      }
    ]
  }
];

const splitFeatures = [
  {
    icon: CalculatorIcon,
    title: 'Flexible Split Rules',
    description: 'Define percentage, fixed amount, or dynamic splits based on complex business logic',
    capabilities: [
      'Percentage-based splits',
      'Fixed amount allocations',
      'Dynamic rule engine',
      'Conditional distributions'
    ]
  },
  {
    icon: ClockIcon,
    title: 'Real-time Processing',
    description: 'Instant multi-party fund distribution with transparent tracking',
    capabilities: [
      'Instant fund distribution',
      'Real-time notifications',
      'Transaction transparency',
      'Automatic reconciliation'
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Compliance & Security',
    description: 'Bank-grade security with full compliance for multi-party transactions',
    capabilities: [
      'PCI DSS Level 1 compliance',
      'Multi-party KYC/AML',
      'Fraud detection',
      'Audit trail logging'
    ]
  },
  {
    icon: ChartBarIcon,
    title: 'Advanced Analytics',
    description: 'Comprehensive reporting and analytics for all stakeholders',
    capabilities: [
      'Revenue analytics',
      'Split performance tracking',
      'Vendor insights',
      'Platform metrics'
    ]
  }
];

export default function SplitPayments() {
  const [selectedScenario, setSelectedScenario] = useState<string>('ecommerce');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const currentScenario = splitScenarios.find(s => s.id === selectedScenario) || splitScenarios[0];

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 3000);
  };

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
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <BanknotesIcon className="w-4 h-4 mr-2" />
            Split Payment Engine
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Intelligent Fund Distribution
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Automatically distribute payments to multiple parties with flexible rules, 
            real-time processing, and complete transparency for all stakeholders.
          </p>
        </motion.div>

        {/* Interactive Split Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Split Payment Scenarios
            </h3>
            <button
              onClick={triggerAnimation}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isAnimating ? (
                <PauseIcon className="w-4 h-4" />
              ) : (
                <PlayIcon className="w-4 h-4" />
              )}
              {isAnimating ? 'Running...' : 'Simulate Payment'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Scenario Selector */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Choose Scenario</h4>
              {splitScenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedScenario === scenario.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    {scenario.name}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {scenario.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    ${scenario.totalAmount} • {scenario.splits.length} recipients
                  </div>
                  {selectedScenario === scenario.id && (
                    <CheckCircleIcon className="absolute top-4 right-4 w-5 h-5 text-blue-500" />
                  )}
                </button>
              ))}
            </div>

            {/* Payment Flow Visualization */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {currentScenario.name} - ${currentScenario.totalAmount}
                  </h4>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {currentScenario.useCase}
                  </span>
                </div>

                {/* Payment Source */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-bold text-lg mb-3">
                    ${currentScenario.totalAmount}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Customer Payment</p>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    animate={isAnimating ? { y: [0, 10, 0] } : {}}
                    transition={{ duration: 0.5, repeat: isAnimating ? 5 : 0 }}
                  >
                    <ArrowsRightLeftIcon className="w-8 h-8 text-gray-400 rotate-90" />
                  </motion.div>
                </div>

                {/* Split Recipients */}
                <div className="space-y-4">
                  {currentScenario.splits.map((split, index) => (
                    <motion.div
                      key={split.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        scale: isAnimating ? [1, 1.05, 1] : 1
                      }}
                      transition={{ 
                        delay: index * 0.1,
                        scale: { duration: 0.3, delay: isAnimating ? index * 0.2 + 1 : 0 }
                      }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-600 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${split.color}`} />
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                            {split.name}
                          </h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {split.recipient}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          ${((currentScenario.totalAmount * split.value) / 100).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {split.value}%
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Processing Status */}
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-green-800 dark:text-green-400">
                      Split processing completed in 1.2 seconds
                    </span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-500 mt-1">
                    All recipients notified • Funds instantly available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {splitFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.capabilities.map((capability, capIndex) => (
                  <li key={capIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {capability}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Use Cases Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Split Payment Use Cases
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our split payment engine handles complex distribution scenarios across various industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'E-commerce Marketplaces',
                description: 'Vendor commissions, platform fees, and payment processing',
                icon: BuildingStorefrontIcon,
                examples: ['Product sales', 'Digital downloads', 'Subscription boxes']
              },
              {
                title: 'Service Platforms',
                description: 'Provider earnings, platform commissions, and insurance',
                icon: UserGroupIcon,
                examples: ['Ride sharing', 'Food delivery', 'Home services']
              },
              {
                title: 'Content Platforms',
                description: 'Creator revenue, platform fees, and royalty distributions',
                icon: CogIcon,
                examples: ['Video streaming', 'Music platforms', 'Educational content']
              }
            ].map((useCase, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <useCase.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {useCase.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {useCase.description}
                </p>
                <ul className="space-y-1">
                  {useCase.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex} className="text-xs text-gray-500 dark:text-gray-500">
                      • {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
