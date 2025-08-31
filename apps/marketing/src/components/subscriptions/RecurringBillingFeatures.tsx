'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ArrowPathIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BanknotesIcon,
  CreditCardIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  StopIcon
} from '@heroicons/react/24/outline';

interface BillingFeature {
  icon: any;
  title: string;
  description: string;
  benefits: string[];
  highlight?: boolean;
}

interface BillingCycle {
  id: string;
  name: string;
  interval: string;
  description: string;
  example: string;
  popular?: boolean;
}

const billingFeatures: BillingFeature[] = [
  {
    icon: ArrowPathIcon,
    title: 'Flexible Billing Cycles',
    description: 'Support any billing frequency from daily to annual with custom intervals',
    benefits: [
      'Daily, weekly, monthly, quarterly, annual',
      'Custom intervals (every 3 months, etc.)',
      'Trial periods and grace periods',
      'Billing date alignment'
    ]
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Smart Proration',
    description: 'Automatic proration for plan changes, upgrades, and downgrades',
    benefits: [
      'Instant plan upgrades',
      'Fair downgrade credits',
      'Mid-cycle changes',
      'Prorated refunds'
    ],
    highlight: true
  },
  {
    icon: CalendarDaysIcon,
    title: 'Billing Date Control',
    description: 'Set specific billing dates and align multiple subscriptions',
    benefits: [
      'Custom billing dates',
      'Subscription alignment',
      'Anniversary billing',
      'End-of-month billing'
    ]
  },
  {
    icon: GlobeAltIcon,
    title: 'Multi-Currency Support',
    description: 'Bill customers in their local currency with automatic conversion',
    benefits: [
      '135+ currencies supported',
      'Real-time exchange rates',
      'Currency-specific pricing',
      'Local payment methods'
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Payment Security',
    description: 'Bank-grade security with PCI DSS Level 1 compliance',
    benefits: [
      'PCI DSS Level 1 certified',
      'Tokenized payment storage',
      'Fraud detection',
      '3D Secure authentication'
    ]
  },
  {
    icon: BanknotesIcon,
    title: 'Revenue Recognition',
    description: 'Automated revenue recognition and financial reporting',
    benefits: [
      'ASC 606 compliance',
      'Deferred revenue tracking',
      'Financial exports',
      'Audit trail'
    ]
  }
];

const billingCycles: BillingCycle[] = [
  {
    id: 'weekly',
    name: 'Weekly',
    interval: 'Every 7 days',
    description: 'Perfect for consumable services and high-frequency usage',
    example: 'Meal delivery, content subscriptions'
  },
  {
    id: 'monthly',
    name: 'Monthly',
    interval: 'Every 30 days',
    description: 'The most popular billing cycle for SaaS and services',
    example: 'Software licenses, hosting services',
    popular: true
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    interval: 'Every 3 months',
    description: 'Ideal for business services and enterprise customers',
    example: 'Consulting services, enterprise software'
  },
  {
    id: 'annual',
    name: 'Annual',
    interval: 'Every 12 months',
    description: 'Lower churn and better cash flow for businesses',
    example: 'Annual memberships, software licenses'
  }
];

const subscriptionStates = [
  { state: 'active', label: 'Active', icon: PlayIcon, color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  { state: 'paused', label: 'Paused', icon: PauseIcon, color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { state: 'cancelled', label: 'Cancelled', icon: StopIcon, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/30' }
];

export default function RecurringBillingFeatures() {
  const [selectedCycle, setSelectedCycle] = useState<string>('monthly');
  const [activeDemo, setActiveDemo] = useState<string>('proration');

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
    <section className="py-24 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 text-sm font-medium mb-4">
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Recurring Billing Engine
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Automate Your Revenue
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Handle complex billing scenarios with ease. From simple monthly subscriptions 
            to enterprise-grade usage-based billing with automated proration and revenue recognition.
          </p>
        </motion.div>

        {/* Interactive Billing Cycle Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-20 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Choose Your Billing Frequency
          </h3>
          
          {/* Billing Cycle Selector */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {billingCycles.map((cycle) => (
              <button
                key={cycle.id}
                onClick={() => setSelectedCycle(cycle.id)}
                className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                  selectedCycle === cycle.id
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
                }`}
              >
                {cycle.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {cycle.name}
                  </h4>
                  <p className="text-green-600 dark:text-green-400 font-medium text-sm">
                    {cycle.interval}
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {cycle.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                  Examples: {cycle.example}
                </p>
                {selectedCycle === cycle.id && (
                  <CheckCircleIcon className="absolute top-4 right-4 w-5 h-5 text-green-500" />
                )}
              </button>
            ))}
          </div>

          {/* Selected Cycle Preview */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {billingCycles.find(c => c.id === selectedCycle)?.name} Billing Preview
              </h4>
              <div className="flex items-center gap-2">
                {subscriptionStates.map((state) => (
                  <div key={state.state} className={`flex items-center gap-1 px-2 py-1 rounded ${state.bgColor}`}>
                    <state.icon className={`w-3 h-3 ${state.color}`} />
                    <span className={`text-xs font-medium ${state.color}`}>
                      {state.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  $29.99
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Base price per {selectedCycle === 'monthly' ? 'month' : selectedCycle.slice(0, -2)}
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {selectedCycle === 'weekly' ? '4x' : 
                   selectedCycle === 'monthly' ? '12x' :
                   selectedCycle === 'quarterly' ? '4x' : '1x'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Charges per year
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {selectedCycle === 'weekly' ? '$359.88' :
                   selectedCycle === 'monthly' ? '$359.88' :
                   selectedCycle === 'quarterly' ? '$359.88' : '$359.88'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Annual revenue
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {billingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-6 border transition-all hover:shadow-lg ${
                feature.highlight 
                  ? 'border-green-500 ring-2 ring-green-500/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400'
              }`}
            >
              {feature.highlight && (
                <div className="absolute -top-3 left-6">
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    Popular
                  </span>
                </div>
              )}
              
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Proration Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Smart Proration in Action
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See how our intelligent proration system handles plan changes, upgrades, 
              and downgrades fairly for both you and your customers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before/After Comparison */}
            <div className="space-y-6">
              <h4 className="font-semibold text-gray-900 dark:text-white">Scenario: Mid-month Upgrade</h4>
              
              {/* Current Plan */}
              <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-900 dark:text-white">Current Plan: Basic</h5>
                  <span className="text-sm text-gray-600 dark:text-gray-400">$19/month</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }} />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">15 days used (50% of billing cycle)</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <ArrowPathIcon className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* New Plan */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-900 dark:text-white">New Plan: Pro</h5>
                  <span className="text-sm text-gray-600 dark:text-gray-400">$39/month</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Prorated charge:</span>
                    <span className="font-medium text-gray-900 dark:text-white">$19.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Basic refund:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">-$9.50</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span className="text-gray-900 dark:text-white">Total due today:</span>
                    <span className="text-gray-900 dark:text-white">$10.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-col justify-center">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Proration Benefits</h4>
              <div className="space-y-4">
                {[
                  {
                    title: 'Fair Billing',
                    description: 'Customers only pay for what they use',
                    icon: CheckCircleIcon,
                    color: 'text-green-500'
                  },
                  {
                    title: 'Instant Upgrades',
                    description: 'No need to wait for the next billing cycle',
                    icon: ClockIcon,
                    color: 'text-blue-500'
                  },
                  {
                    title: 'Automated Calculations',
                    description: 'Complex math handled automatically',
                    icon: CurrencyDollarIcon,
                    color: 'text-purple-500'
                  },
                  {
                    title: 'Revenue Recognition',
                    description: 'Compliant with accounting standards',
                    icon: BanknotesIcon,
                    color: 'text-amber-500'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      benefit.color === 'text-green-500' ? 'bg-green-100 dark:bg-green-900/30' :
                      benefit.color === 'text-blue-500' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      benefit.color === 'text-purple-500' ? 'bg-purple-100 dark:bg-purple-900/30' :
                      'bg-amber-100 dark:bg-amber-900/30'
                    }`}>
                      <benefit.icon className={`w-4 h-4 ${benefit.color}`} />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                        {benefit.title}
                      </h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
