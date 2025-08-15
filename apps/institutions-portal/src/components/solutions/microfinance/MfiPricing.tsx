'use client';

import React from 'react';
import { motion } from 'framer-motion';

const pricingTiers = [
  {
    id: 'community',
    name: 'Community MFI',
    description: 'Perfect for small community-based microfinance institutions and rural finance cooperatives',
    price: 'KES 20K',
    period: 'per month',
    badge: '',
    features: [
      'Up to 1,000 active borrowers',
      'Basic group lending tools',
      'Mobile money integration',
      'Essential impact tracking',
      'Community banking features',
      'Email & phone support',
      'Standard reporting templates',
      'Basic financial literacy tools'
    ],
    limitations: [
      'Limited to 1,000 borrowers',
      'Basic impact measurement only',
      'Standard support hours'
    ],
    color: 'orange',
    ctaText: 'Start Community Plan'
  },
  {
    id: 'growth',
    name: 'Growth MFI',
    description: 'Comprehensive solution for expanding MFIs with advanced group lending and impact measurement',
    price: 'KES 50K',
    period: 'per month',
    badge: 'Most Popular',
    features: [
      'Up to 5,000 active borrowers',
      'Advanced group lending platform',
      'Complete impact measurement suite',
      'Social performance indicators',
      'Agent banking network tools',
      'Priority support + account manager',
      'Advanced analytics dashboard',
      'Custom loan products',
      'Financial literacy curriculum',
      'Multi-branch management',
      'Poverty assessment tools',
      'Client protection features'
    ],
    limitations: [],
    color: 'amber',
    ctaText: 'Most Popular Choice',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise MFI',
    description: 'Complete microfinance solution for large MFIs and international development organizations',
    price: 'KES 120K',
    period: 'per month',
    badge: 'Impact Scale',
    features: [
      'Unlimited active borrowers',
      'Complete microfinance suite',
      'White-label mobile app',
      'Full impact automation',
      'International standards compliance',
      '24/7 dedicated support + SLA',
      'Executive impact dashboard',
      'API platform access',
      'Multi-country operations',
      'Unlimited branches',
      'Custom development included',
      'Research & evaluation tools',
      'Donor reporting automation',
      'Graduate program management'
    ],
    limitations: [],
    color: 'yellow',
    ctaText: 'Contact Sales'
  }
];

const addOns = [
  {
    name: 'Advanced Impact Analytics',
    description: 'Deep impact measurement and research capabilities',
    price: 'KES 15K/month'
  },
  {
    name: 'Agricultural Finance Module',
    description: 'Specialized tools for agricultural microfinance',
    price: 'KES 12K/month'
  },
  {
    name: 'Village Banking Platform',
    description: 'Complete village savings and loan associations management',
    price: 'KES 18K/month'
  },
  {
    name: 'Financial Education Platform',
    description: 'Comprehensive financial literacy and business training',
    price: 'KES 8K/month'
  }
];

const impactFocus = [
  {
    title: 'Poverty Reduction',
    description: 'Measurable impact on poverty alleviation',
    icon: '📈'
  },
  {
    title: 'Women Empowerment',
    description: 'Gender-focused financial inclusion',
    icon: '👩'
  },
  {
    title: 'Rural Development',
    description: 'Last-mile financial service delivery',
    icon: '🏘️'
  },
  {
    title: 'Social Innovation',
    description: 'Technology for social good',
    icon: '💡'
  }
];

const PricingCard = ({ tier, index }: { tier: any, index: number }) => {
  const colorClasses = {
    orange: {
      border: 'border-orange-200 dark:border-orange-800',
      bg: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
      badge: 'bg-orange-600 text-white',
      cta: 'bg-orange-600 hover:bg-orange-700 text-white',
      icon: 'text-orange-600 dark:text-orange-400'
    },
    amber: {
      border: 'border-amber-200 dark:border-amber-800',
      bg: 'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20',
      badge: 'bg-amber-600 text-white',
      cta: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white',
      icon: 'text-amber-600 dark:text-amber-400'
    },
    yellow: {
      border: 'border-yellow-200 dark:border-yellow-800',
      bg: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20',
      badge: 'bg-yellow-600 text-white',
      cta: 'bg-yellow-600 hover:bg-yellow-700 text-white',
      icon: 'text-yellow-600 dark:text-yellow-400'
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
              Plan limitations:
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

export default function MfiPricing() {
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
            className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            💰 MFI Pricing
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Impact-Driven Pricing
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Transparent pricing plans designed for MFIs of all sizes. From community organizations 
            to international development programs, we scale with your social impact goals.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* Impact Focus */}
        <motion.div
          className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-orange-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Impact-First Approach
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our pricing reflects our commitment to social impact and financial inclusion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactFocus.map((focus, index) => (
              <motion.div
                key={focus.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-200 dark:border-gray-700">
                  <span className="text-2xl">{focus.icon}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {focus.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {focus.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
              Specialized Add-ons
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enhance your microfinance platform with specialized impact modules
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
                    <span className="text-orange-600 dark:text-orange-400 font-semibold text-sm">
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
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-orange-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Amplify Your Social Impact?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join leading MFIs across East Africa who are already transforming lives and communities 
              with technology-enabled microfinance solutions that scale social impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Impact Consultation
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.button>
              <motion.button 
                className="inline-flex items-center px-6 py-3 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400 dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download MFI Guide
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-orange-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                🌍 <strong>Impact Commitment:</strong> All plans include social impact measurement and poverty assessment tools.
                <br />
                📞 <strong>MFI Support:</strong> Growth and Enterprise plans include dedicated microfinance specialists.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
