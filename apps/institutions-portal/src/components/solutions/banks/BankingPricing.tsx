'use client';

import React from 'react';
import { motion } from 'framer-motion';

const pricingTiers = [
  {
    id: 'starter',
    name: 'Banking Starter',
    description: 'Perfect for community banks and smaller commercial banks',
    price: 'Custom',
    period: 'per month',
    badge: '',
    features: [
      'Core banking integration (1 system)',
      'Basic payment processing',
      'CBK compliance reporting',
      'Email support',
      'Up to 10,000 transactions/month',
      'Standard API access',
      'Basic dashboard',
      'Monthly reporting'
    ],
    limitations: [
      'Single core banking integration',
      'Limited transaction volume',
      'Basic support tier'
    ],
    color: 'blue',
    ctaText: 'Get Started'
  },
  {
    id: 'professional',
    name: 'Banking Professional',
    description: 'Comprehensive solution for established commercial banks',
    price: 'Custom',
    period: 'per month',
    badge: 'Most Popular',
    features: [
      'Multiple core banking integrations',
      'RTGS & SWIFT connectivity',
      'Advanced compliance suite',
      'Priority support + dedicated manager',
      'Up to 1M transactions/month',
      'Full API access',
      'Advanced analytics dashboard',
      'Real-time reporting',
      'Multi-channel banking support',
      'Custom integrations',
      'AML/CFT screening',
      'Fraud detection'
    ],
    limitations: [],
    color: 'indigo',
    ctaText: 'Most Popular',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Banking Enterprise',
    description: 'Complete enterprise solution for tier-1 commercial banks',
    price: 'Custom',
    period: 'per month',
    badge: 'Enterprise',
    features: [
      'Unlimited core banking integrations',
      'Full RTGS, SWIFT & correspondent banking',
      'Complete compliance automation',
      '24/7 dedicated support + SLA',
      'Unlimited transactions',
      'White-label API platform',
      'Executive dashboard + BI tools',
      'Real-time monitoring',
      'Complete multi-channel suite',
      'Custom development included',
      'Advanced AML/CFT + risk management',
      'AI-powered fraud prevention',
      'Regulatory consultation',
      'Disaster recovery & backup'
    ],
    limitations: [],
    color: 'purple',
    ctaText: 'Contact Sales'
  }
];

const addOns = [
  {
    name: 'Forex & Treasury Management',
    description: 'Advanced FX trading and treasury operations',
    price: 'Custom pricing'
  },
  {
    name: 'Corporate Banking Suite',
    description: 'Specialized features for corporate clients',
    price: 'Custom pricing'
  },
  {
    name: 'Mobile Banking Platform',
    description: 'Complete mobile banking solution',
    price: 'Custom pricing'
  },
  {
    name: 'Advanced Analytics & BI',
    description: 'Executive dashboards and business intelligence',
    price: 'Custom pricing'
  }
];

const PricingCard = ({ tier, index }: { tier: any, index: number }) => {
  const colorClasses = {
    blue: {
      border: 'border-blue-200 dark:border-blue-800',
      bg: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      badge: 'bg-blue-600 text-white',
      cta: 'bg-blue-600 hover:bg-blue-700 text-white',
      icon: 'text-blue-600 dark:text-blue-400'
    },
    indigo: {
      border: 'border-indigo-200 dark:border-indigo-800',
      bg: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
      badge: 'bg-indigo-600 text-white',
      cta: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white',
      icon: 'text-indigo-600 dark:text-indigo-400'
    },
    purple: {
      border: 'border-purple-200 dark:border-purple-800',
      bg: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
      badge: 'bg-purple-600 text-white',
      cta: 'bg-purple-600 hover:bg-purple-700 text-white',
      icon: 'text-purple-600 dark:text-purple-400'
    }
  };

  const colors = colorClasses[tier.color as keyof typeof colorClasses];

  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 ${colors.border} relative overflow-hidden ${tier.popular ? 'scale-105 shadow-2xl' : 'shadow-sm hover:shadow-lg'} transition-all duration-300`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: tier.popular ? 0 : -5 }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-50`} />
      
      {/* Badge */}
      {tier.badge && (
        <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 ${colors.badge} rounded-full text-sm font-semibold`}>
          {tier.badge}
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {tier.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {tier.description}
          </p>
          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              {tier.price}
            </span>
            {tier.period && (
              <span className="text-gray-500 dark:text-gray-400 ml-2">
                {tier.period}
              </span>
            )}
          </div>
          <motion.button
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${colors.cta}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tier.ctaText}
          </motion.button>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            What's included:
          </h4>
          {tier.features.map((feature: string, featureIndex: number) => (
            <div key={featureIndex} className="flex items-start">
              <svg className={`w-5 h-5 mr-3 mt-0.5 ${colors.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Limitations */}
        {tier.limitations && tier.limitations.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              Limitations:
            </h4>
            {tier.limitations.map((limitation: string, limitIndex: number) => (
              <div key={limitIndex} className="flex items-start">
                <svg className="w-4 h-4 mr-3 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {limitation}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function BankingPricing() {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            💰 Transparent Pricing
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Banking Solution Pricing
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Flexible pricing plans designed for banks of all sizes. From community banks to tier-1 institutions, 
            we have a solution that scales with your needs and budget.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Optional Add-ons
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enhance your banking platform with specialized modules
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {addon.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {addon.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                      {addon.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-blue-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Every bank is unique. Our team works with you to create a tailored solution that meets 
              your specific requirements, compliance needs, and integration challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Pricing Consultation
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.button>
              <motion.button 
                className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Custom Quote
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-blue-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                💡 <strong>Implementation included:</strong> All plans include full implementation support, training, and 90-day warranty.
                <br />
                📞 <strong>24/7 Support:</strong> Professional and Enterprise plans include round-the-clock technical support.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
