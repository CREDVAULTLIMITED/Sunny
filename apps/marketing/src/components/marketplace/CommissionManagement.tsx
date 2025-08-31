'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ChartBarIcon,
  CurrencyDollarIcon,
  CalculatorIcon,
  TrendingUpIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  AdjustmentsHorizontalIcon,
  ArrowRightIcon,
  CogIcon,
  BanknotesIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface CommissionTier {
  id: string;
  name: string;
  minVolume: number;
  maxVolume: number | null;
  rate: number;
  description: string;
  benefits: string[];
}

interface CommissionModel {
  id: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'tiered' | 'hybrid';
  example: {
    transaction: number;
    commission: number;
    calculation: string;
  };
  useCase: string;
}

const commissionModels: CommissionModel[] = [
  {
    id: 'percentage',
    name: 'Percentage-based',
    description: 'Fixed percentage of transaction value',
    type: 'percentage',
    example: {
      transaction: 1000,
      commission: 50,
      calculation: '5% of $1,000'
    },
    useCase: 'E-commerce marketplaces, digital products'
  },
  {
    id: 'fixed',
    name: 'Fixed Fee',
    description: 'Flat fee per transaction regardless of amount',
    type: 'fixed',
    example: {
      transaction: 1000,
      commission: 25,
      calculation: '$25 flat fee'
    },
    useCase: 'Service bookings, appointment platforms'
  },
  {
    id: 'tiered',
    name: 'Tiered Structure',
    description: 'Different rates based on volume or merchant tier',
    type: 'tiered',
    example: {
      transaction: 1000,
      commission: 30,
      calculation: '3% (Gold tier rate)'
    },
    useCase: 'High-volume marketplaces, B2B platforms'
  },
  {
    id: 'hybrid',
    name: 'Hybrid Model',
    description: 'Combination of fixed fee plus percentage',
    type: 'hybrid',
    example: {
      transaction: 1000,
      commission: 35,
      calculation: '$10 + 2.5% of $1,000'
    },
    useCase: 'Complex marketplaces, multi-service platforms'
  }
];

const commissionTiers: CommissionTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    minVolume: 0,
    maxVolume: 10000,
    rate: 5.0,
    description: 'Perfect for new marketplace vendors',
    benefits: [
      'Basic analytics dashboard',
      'Standard support',
      '7-day settlement',
      'Basic dispute resolution'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    minVolume: 10000,
    maxVolume: 100000,
    rate: 3.5,
    description: 'For growing businesses with higher volumes',
    benefits: [
      'Advanced analytics',
      'Priority support',
      '3-day settlement',
      'Enhanced dispute resolution',
      'Custom reporting'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    minVolume: 100000,
    maxVolume: null,
    rate: 2.5,
    description: 'Best rates for high-volume merchants',
    benefits: [
      'Real-time analytics',
      'Dedicated support',
      'Same-day settlement',
      'White-glove dispute resolution',
      'Custom integrations',
      'API prioritization'
    ]
  }
];

const commissionFeatures = [
  {
    icon: CalculatorIcon,
    title: 'Flexible Rate Structures',
    description: 'Design custom commission models that fit your marketplace business',
    capabilities: [
      'Percentage-based commissions',
      'Fixed fee structures',
      'Tiered rate systems',
      'Hybrid models'
    ]
  },
  {
    icon: ClockIcon,
    title: 'Automated Collection',
    description: 'Automatic commission deduction and transparent reporting',
    capabilities: [
      'Real-time commission calculation',
      'Automatic fee collection',
      'Transparent reporting',
      'Instant vendor notifications'
    ]
  },
  {
    icon: ChartBarIcon,
    title: 'Revenue Analytics',
    description: 'Comprehensive insights into commission performance and trends',
    capabilities: [
      'Commission revenue tracking',
      'Vendor performance metrics',
      'Trend analysis',
      'Custom reporting'
    ]
  },
  {
    icon: AdjustmentsHorizontalIcon,
    title: 'Dynamic Adjustments',
    description: 'Adjust commission rates based on performance, volume, or seasons',
    capabilities: [
      'Volume-based rate changes',
      'Seasonal adjustments',
      'Performance bonuses',
      'Promotional rate changes'
    ]
  }
];

export default function CommissionManagement() {
  const [selectedModel, setSelectedModel] = useState<string>('percentage');
  const [selectedTier, setSelectedTier] = useState<string>('growth');
  const [calculatorAmount, setCalculatorAmount] = useState<number>(1000);

  const currentModel = commissionModels.find(m => m.id === selectedModel) || commissionModels[0];
  const currentTier = commissionTiers.find(t => t.id === selectedTier) || commissionTiers[1];

  const calculateCommission = (amount: number, rate: number, model: string) => {
    switch (model) {
      case 'percentage':
        return (amount * rate) / 100;
      case 'fixed':
        return 25; // Fixed $25 fee
      case 'tiered':
        return (amount * rate) / 100;
      case 'hybrid':
        return 10 + (amount * 2.5) / 100; // $10 + 2.5%
      default:
        return (amount * rate) / 100;
    }
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
          <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 text-sm font-medium mb-4">
            <ChartBarIcon className="w-4 h-4 mr-2" />
            Commission Management
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Maximize Platform Revenue
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Automated commission collection with flexible rate structures, 
            transparent reporting, and real-time analytics to optimize your marketplace revenue.
          </p>
        </motion.div>

        {/* Commission Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Commission Calculator
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Explore different commission models and see how they affect your revenue
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Controls */}
            <div className="space-y-6">
              {/* Transaction Amount */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Transaction Amount
                </label>
                <div className="relative">
                  <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={calculatorAmount}
                    onChange={(e) => setCalculatorAmount(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              {/* Commission Model Selector */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Commission Model</h4>
                <div className="grid grid-cols-2 gap-3">
                  {commissionModels.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedModel === model.id
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <h5 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                        {model.name}
                      </h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {model.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tier Selector */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Merchant Tier</h4>
                <div className="space-y-3">
                  {commissionTiers.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        selectedTier === tier.id
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                            {tier.name}
                          </h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {tier.rate}% commission
                          </p>
                        </div>
                        {selectedTier === tier.id && (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Commission Calculation */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Commission Breakdown</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Transaction Amount:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${calculatorAmount.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Commission Model:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {currentModel.name}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Merchant Tier:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {currentTier.name} ({currentTier.rate}%)
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 dark:text-gray-400">Platform Commission:</span>
                    <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                      ${calculateCommission(calculatorAmount, currentTier.rate, selectedModel).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-medium text-gray-900 dark:text-white">Vendor Receives:</span>
                    <span className="font-bold text-gray-900 dark:text-white text-lg">
                      ${(calculatorAmount - calculateCommission(calculatorAmount, currentTier.rate, selectedModel)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Model Details */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Model Details</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Calculation:</span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {currentModel.example.calculation}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Best for:</span>
                    <p className="text-gray-900 dark:text-white">
                      {currentModel.useCase}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tier Benefits */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Tier Benefits</h4>
                <ul className="space-y-2">
                  {currentTier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Commission Tiers Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Commission Tier Structure
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Reward high-volume merchants with better rates and premium features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commissionTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 ${
                  tier.id === 'growth' 
                    ? 'border-green-500 ring-4 ring-green-500/20 scale-105' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {tier.id === 'growth' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {tier.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {tier.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {tier.rate}%
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">commission</span>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    ${tier.minVolume.toLocaleString()}{tier.maxVolume ? ` - $${tier.maxVolume.toLocaleString()}` : '+'} monthly volume
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  tier.id === 'growth'
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}>
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {commissionFeatures.map((feature, index) => (
            <div key={index} className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6">
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
                {feature.capabilities.map((capability, capIndex) => (
                  <li key={capIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {capability}
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

