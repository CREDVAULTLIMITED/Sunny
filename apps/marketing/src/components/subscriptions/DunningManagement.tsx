'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ExclamationTriangleIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  CreditCardIcon,
  EnvelopeIcon,
  PhoneIcon,
  BellIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface DunningStrategy {
  id: string;
  name: string;
  description: string;
  successRate: number;
  steps: DunningStep[];
  color: string;
}

interface DunningStep {
  day: number;
  action: string;
  method: string;
  description: string;
  icon: any;
}

const dunningStrategies: DunningStrategy[] = [
  {
    id: 'gentle',
    name: 'Gentle Approach',
    description: 'Friendly reminders with generous grace periods',
    successRate: 78,
    color: 'blue',
    steps: [
      {
        day: 1,
        action: 'Payment Failed',
        method: 'Auto-retry',
        description: 'Automatic retry within 24 hours',
        icon: ArrowPathIcon
      },
      {
        day: 3,
        action: 'Friendly Reminder',
        method: 'Email',
        description: 'Polite email notification about payment failure',
        icon: EnvelopeIcon
      },
      {
        day: 7,
        action: 'Payment Update',
        method: 'In-app + Email',
        description: 'Request to update payment method',
        icon: CreditCardIcon
      },
      {
        day: 14,
        action: 'Final Notice',
        method: 'Email + SMS',
        description: 'Last reminder before service suspension',
        icon: BellIcon
      }
    ]
  },
  {
    id: 'aggressive',
    name: 'Aggressive Recovery',
    description: 'Quick action with multiple touchpoints',
    successRate: 94,
    color: 'red',
    steps: [
      {
        day: 1,
        action: 'Immediate Retry',
        method: 'Auto-retry',
        description: 'Retry payment immediately and after 6 hours',
        icon: ArrowPathIcon
      },
      {
        day: 2,
        action: 'Payment Alert',
        method: 'Email + In-app',
        description: 'Urgent payment failure notification',
        icon: ExclamationTriangleIcon
      },
      {
        day: 4,
        action: 'Phone Call',
        method: 'Sales team',
        description: 'Personal outreach from account manager',
        icon: PhoneIcon
      },
      {
        day: 7,
        action: 'Service Suspension',
        method: 'Auto-suspend',
        description: 'Temporary service suspension with recovery option',
        icon: ClockIcon
      }
    ]
  },
  {
    id: 'smart',
    name: 'AI-Optimized',
    description: 'Machine learning powered dunning strategy',
    successRate: 89,
    color: 'purple',
    steps: [
      {
        day: 1,
        action: 'Smart Retry',
        method: 'ML-timed',
        description: 'AI determines optimal retry timing',
        icon: ArrowPathIcon
      },
      {
        day: 2,
        action: 'Personalized Email',
        method: 'Dynamic content',
        description: 'Personalized message based on customer profile',
        icon: EnvelopeIcon
      },
      {
        day: 5,
        action: 'Preferred Channel',
        method: 'Customer preference',
        description: 'Contact via customers preferred communication method',
        icon: BellIcon
      },
      {
        day: 10,
        action: 'Retention Offer',
        method: 'Auto-discount',
        description: 'AI-generated retention offer based on customer value',
        icon: CurrencyDollarIcon
      }
    ]
  }
];

const dunningStats = [
  {
    label: 'Recovery Rate',
    value: '94%',
    change: '+12%',
    trend: 'up',
    icon: ChartBarIcon,
    color: 'text-green-600'
  },
  {
    label: 'Average Recovery Time',
    value: '4.2 days',
    change: '-2.1 days',
    trend: 'down',
    icon: ClockIcon,
    color: 'text-blue-600'
  },
  {
    label: 'Customer Retention',
    value: '87%',
    change: '+8%',
    trend: 'up',
    icon: UserGroupIcon,
    color: 'text-purple-600'
  },
  {
    label: 'Revenue Recovered',
    value: '$2.4M',
    change: '+23%',
    trend: 'up',
    icon: CurrencyDollarIcon,
    color: 'text-amber-600'
  }
];

const features = [
  {
    icon: ArrowPathIcon,
    title: 'Smart Retry Logic',
    description: 'Intelligent retry timing based on payment method and customer behavior',
    benefits: [
      'Optimal retry timing',
      'Payment method intelligence',
      'Bank decline code analysis',
      'Success rate optimization'
    ]
  },
  {
    icon: EnvelopeIcon,
    title: 'Multi-Channel Communication',
    description: 'Reach customers through their preferred communication channels',
    benefits: [
      'Email notifications',
      'SMS alerts',
      'In-app messaging',
      'Phone call triggers'
    ]
  },
  {
    icon: ChartBarIcon,
    title: 'Performance Analytics',
    description: 'Track and optimize your dunning performance with detailed analytics',
    benefits: [
      'Recovery rate tracking',
      'Channel effectiveness',
      'Customer segmentation',
      'A/B testing'
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Compliance & Security',
    description: 'Ensure all dunning activities comply with regulations and best practices',
    benefits: [
      'GDPR compliance',
      'PCI DSS security',
      'Opt-out management',
      'Data protection'
    ]
  }
];

export default function DunningManagement() {
  const [selectedStrategy, setSelectedStrategy] = useState<string>('smart');
  const [activeStep, setActiveStep] = useState<number>(0);

  const currentStrategy = dunningStrategies.find(s => s.id === selectedStrategy) || dunningStrategies[0];

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
          <div className="inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400 text-sm font-medium mb-4">
            <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
            Smart Dunning Management
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Recover Failed Payments
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Intelligent dunning management that recovers 94% of failed payments while 
            maintaining customer relationships and reducing churn.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {dunningStats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  stat.color === 'text-green-600' ? 'bg-green-100 dark:bg-green-900/30' :
                  stat.color === 'text-blue-600' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  stat.color === 'text-purple-600' ? 'bg-purple-100 dark:bg-purple-900/30' :
                  'bg-amber-100 dark:bg-amber-900/30'
                }`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Dunning Strategy Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-20 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Choose Your Dunning Strategy
          </h3>

          {/* Strategy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {dunningStrategies.map((strategy) => (
              <button
                key={strategy.id}
                onClick={() => setSelectedStrategy(strategy.id)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  selectedStrategy === strategy.id
                    ? `border-${strategy.color}-500 bg-${strategy.color}-50 dark:bg-${strategy.color}-900/20`
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {strategy.name}
                  </h4>
                  <div className={`text-2xl font-bold ${
                    strategy.color === 'blue' ? 'text-blue-600' :
                    strategy.color === 'red' ? 'text-red-600' : 'text-purple-600'
                  }`}>
                    {strategy.successRate}%
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {strategy.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {strategy.steps.length} steps • {strategy.steps[strategy.steps.length - 1].day} day cycle
                </div>
                {selectedStrategy === strategy.id && (
                  <CheckCircleIcon className={`w-5 h-5 mt-2 ${
                    strategy.color === 'blue' ? 'text-blue-600' :
                    strategy.color === 'red' ? 'text-red-600' : 'text-purple-600'
                  }`} />
                )}
              </button>
            ))}
          </div>

          {/* Selected Strategy Timeline */}
          <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-6">
              {currentStrategy.name} - Recovery Timeline
            </h4>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
              
              {/* Timeline Steps */}
              <div className="space-y-6">
                {currentStrategy.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-start gap-4"
                  >
                    {/* Step Icon */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-700 ${
                      currentStrategy.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      currentStrategy.color === 'red' ? 'bg-red-100 dark:bg-red-900/30' :
                      'bg-purple-100 dark:bg-purple-900/30'
                    }`}>
                      <step.icon className={`w-6 h-6 ${
                        currentStrategy.color === 'blue' ? 'text-blue-600' :
                        currentStrategy.color === 'red' ? 'text-red-600' : 'text-purple-600'
                      }`} />
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h5 className="font-semibold text-gray-900 dark:text-white">
                          Day {step.day}: {step.action}
                        </h5>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          currentStrategy.color === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          currentStrategy.color === 'red' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                        }`}>
                          {step.method}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
