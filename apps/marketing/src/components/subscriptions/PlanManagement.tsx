'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  AdjustmentsHorizontalIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  MinusIcon,
  CheckCircleIcon,
  XMarkIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  ArrowsRightLeftIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  currency: string;
  interval: string;
  description: string;
  features: string[];
  limits: {
    users: string;
    storage: string;
    bandwidth: string;
    support: string;
  };
  popular?: boolean;
  enterprise?: boolean;
  color: string;
}

interface PlanFeature {
  category: string;
  items: {
    name: string;
    basic: boolean | string;
    pro: boolean | string;
    enterprise: boolean | string;
  }[];
}

const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 19,
    originalPrice: 29,
    currency: 'USD',
    interval: 'month',
    description: 'Perfect for small teams and startups',
    features: [
      'Up to 10 team members',
      '10GB storage',
      'Basic analytics',
      'Email support',
      'API access'
    ],
    limits: {
      users: '10',
      storage: '10GB',
      bandwidth: '100GB',
      support: 'Email'
    },
    color: 'blue'
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 49,
    originalPrice: 69,
    currency: 'USD',
    interval: 'month',
    description: 'For growing businesses with advanced needs',
    features: [
      'Up to 100 team members',
      '100GB storage',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
      'A/B testing'
    ],
    limits: {
      users: '100',
      storage: '100GB',
      bandwidth: '1TB',
      support: 'Priority'
    },
    popular: true,
    color: 'green'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 149,
    currency: 'USD',
    interval: 'month',
    description: 'For large organizations with complex requirements',
    features: [
      'Unlimited team members',
      'Unlimited storage',
      'Custom analytics',
      'Dedicated support',
      'White-label solution',
      'SLA guarantees',
      'Advanced security'
    ],
    limits: {
      users: 'Unlimited',
      storage: 'Unlimited',
      bandwidth: 'Unlimited',
      support: 'Dedicated'
    },
    enterprise: true,
    color: 'purple'
  }
];

const planFeatures: PlanFeature[] = [
  {
    category: 'Core Features',
    items: [
      { name: 'Dashboard access', basic: true, pro: true, enterprise: true },
      { name: 'Basic reporting', basic: true, pro: true, enterprise: true },
      { name: 'API access', basic: '100 calls/day', pro: '10K calls/day', enterprise: 'Unlimited' },
      { name: 'Team members', basic: '10', pro: '100', enterprise: 'Unlimited' },
      { name: 'Storage', basic: '10GB', pro: '100GB', enterprise: 'Unlimited' }
    ]
  },
  {
    category: 'Advanced Features',
    items: [
      { name: 'Advanced analytics', basic: false, pro: true, enterprise: true },
      { name: 'Custom integrations', basic: false, pro: true, enterprise: true },
      { name: 'A/B testing', basic: false, pro: true, enterprise: true },
      { name: 'White-label branding', basic: false, pro: false, enterprise: true },
      { name: 'SSO integration', basic: false, pro: false, enterprise: true }
    ]
  },
  {
    category: 'Support & SLA',
    items: [
      { name: 'Email support', basic: true, pro: true, enterprise: true },
      { name: 'Priority support', basic: false, pro: true, enterprise: true },
      { name: 'Phone support', basic: false, pro: false, enterprise: true },
      { name: '99.9% uptime SLA', basic: false, pro: false, enterprise: true },
      { name: 'Dedicated account manager', basic: false, pro: false, enterprise: true }
    ]
  }
];

const upgradeBenefits = [
  {
    icon: ArrowUpIcon,
    title: 'Instant Upgrades',
    description: 'Upgrade plans instantly with automatic proration'
  },
  {
    icon: ArrowsRightLeftIcon,
    title: 'Flexible Changes',
    description: 'Switch between monthly and annual billing anytime'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Fair Pricing',
    description: 'Prorated billing ensures you only pay for what you use'
  },
  {
    icon: CogIcon,
    title: 'Auto-scaling',
    description: 'Plans automatically adjust based on usage patterns'
  }
];

export default function PlanManagement() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annually'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [expandedFeatures, setExpandedFeatures] = useState<boolean>(false);

  const getAnnualPrice = (monthlyPrice: number) => Math.round(monthlyPrice * 12 * 0.8);
  const getAnnualSavings = (monthlyPrice: number) => Math.round(monthlyPrice * 12 * 0.2);

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
            <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2" />
            Plan Management
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Flexible Pricing Tiers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Create sophisticated pricing strategies with multiple tiers, usage-based billing, 
            and automatic plan changes based on customer needs.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingInterval === 'monthly'
                  ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('annually')}
              className={`px-6 py-2 rounded-lg font-medium transition-all relative ${
                billingInterval === 'annually'
                  ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Annually
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                20% off
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              variants={itemVariants}
              className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 transition-all cursor-pointer ${
                tier.popular
                  ? 'border-green-500 ring-4 ring-green-500/20 scale-105'
                  : selectedPlan === tier.id
                  ? 'border-blue-500 ring-2 ring-blue-500/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setSelectedPlan(tier.id)}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <StarIcon className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Enterprise Badge */}
              {tier.enterprise && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Enterprise
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {tier.description}
                </p>
                
                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${billingInterval === 'monthly' ? tier.price : getAnnualPrice(tier.price)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      /{billingInterval === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  
                  {billingInterval === 'annually' && (
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Save ${getAnnualSavings(tier.price)}/year
                    </div>
                  )}
                  
                  {tier.originalPrice && billingInterval === 'monthly' && (
                    <div className="text-sm text-gray-500 line-through">
                      ${tier.originalPrice}/month
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    tier.popular
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : tier.enterprise
                      ? 'bg-purple-500 text-white hover:bg-purple-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {tier.enterprise ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <CheckCircleIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      tier.popular ? 'text-green-500' :
                      tier.enterprise ? 'text-purple-500' : 'text-blue-500'
                    }`} />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Limits */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-sm">
                  Plan Limits
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Users:</span>
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">
                      {tier.limits.users}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Storage:</span>
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">
                      {tier.limits.storage}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Bandwidth:</span>
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">
                      {tier.limits.bandwidth}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Support:</span>
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">
                      {tier.limits.support}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Compare All Features
            </h3>
            <button
              onClick={() => setExpandedFeatures(!expandedFeatures)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
            >
              {expandedFeatures ? (
                <>
                  <MinusIcon className="w-4 h-4" />
                  Hide Details
                </>
              ) : (
                <>
                  <PlusIcon className="w-4 h-4" />
                  Show All
                </>
              )}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Features
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Basic
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Professional
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {planFeatures.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr>
                      <td colSpan={4} className="py-4 px-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {category.category}
                        </h4>
                      </td>
                    </tr>
                    {category.items.slice(0, expandedFeatures ? category.items.length : 3).map((item, itemIndex) => (
                      <tr key={itemIndex} className="border-b border-gray-100 dark:border-gray-700/50">
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300 text-sm">
                          {item.name}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {typeof item.basic === 'boolean' ? (
                            item.basic ? (
                              <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {item.basic}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {typeof item.pro === 'boolean' ? (
                            item.pro ? (
                              <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {item.pro}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {typeof item.enterprise === 'boolean' ? (
                            item.enterprise ? (
                              <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {item.enterprise}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Plan Management Benefits */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {upgradeBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
