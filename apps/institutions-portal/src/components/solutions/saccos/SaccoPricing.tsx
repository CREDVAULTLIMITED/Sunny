'use client';

import React from 'react';
import { motion } from 'framer-motion';

const pricingTiers = [
  {
    id: 'community',
    name: 'Community SACCO',
    description: 'Perfect for small community-based SACCOs and starting cooperatives',
    price: 'KES 15K',
    period: 'per month',
    badge: '',
    features: [
      'Up to 500 members',
      'Basic savings & loan products',
      'Mobile SACCO app',
      'SASRA reporting suite',
      'Member management system',
      'Email support',
      'Basic financial reports',
      'Group banking features'
    ],
    limitations: [
      'Limited to 500 members',
      'Basic product offerings',
      'Standard support only'
    ],
    color: 'green',
    ctaText: 'Start Community Plan'
  },
  {
    id: 'growth',
    name: 'Growth SACCO',
    description: 'Comprehensive solution for growing SACCOs with expanding membership',
    price: 'KES 35K',
    period: 'per month',
    badge: 'Most Popular',
    features: [
      'Up to 2,000 members',
      'Full savings & loan portfolio',
      'Advanced mobile banking',
      'Complete SASRA compliance',
      'Digital governance tools',
      'Priority support + account manager',
      'Advanced analytics dashboard',
      'Member portal & self-service',
      'Table banking & groups',
      'Multiple branch support',
      'Custom loan products',
      'Member education portal'
    ],
    limitations: [],
    color: 'emerald',
    ctaText: 'Most Popular Choice',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise SACCO',
    description: 'Complete solution for large SACCOs and cooperative unions',
    price: 'KES 75K',
    period: 'per month',
    badge: 'Full Scale',
    features: [
      'Unlimited members',
      'Complete product suite',
      'White-label mobile app',
      'Full SASRA automation',
      'Advanced governance platform',
      '24/7 dedicated support + SLA',
      'Executive BI dashboard',
      'API platform access',
      'Multi-SACCO management',
      'Unlimited branches',
      'Custom integrations included',
      'Member training platform',
      'Investment management tools',
      'Cooperative union features'
    ],
    limitations: [],
    color: 'teal',
    ctaText: 'Contact Sales'
  }
];

const addOns = [
  {
    name: 'Investment Management',
    description: 'Portfolio management and investment tracking tools',
    price: 'KES 10K/month'
  },
  {
    name: 'Agricultural Finance',
    description: 'Specialized features for agricultural cooperatives',
    price: 'KES 8K/month'
  },
  {
    name: 'Microfinance Module',
    description: 'Group lending and microfinance capabilities',
    price: 'KES 12K/month'
  },
  {
    name: 'Cooperative Training',
    description: 'Member education and financial literacy platform',
    price: 'KES 5K/month'
  }
];

const cooperativeBenefits = [
  {
    title: 'Member-Owned Technology',
    description: 'Cooperative principles embedded in our platform design',
    icon: '🤝'
  },
  {
    title: 'Community Impact',
    description: 'Tools to measure and enhance community development',
    icon: '🌍'
  },
  {
    title: 'Democratic Governance',
    description: 'Digital voting and transparent decision-making',
    icon: '🗳️'
  },
  {
    title: 'Financial Inclusion',
    description: 'Expanding access to financial services',
    icon: '💝'
  }
];

const PricingCard = ({ tier, index }: { tier: any, index: number }) => {
  const colorClasses = {
    green: {
      border: 'border-green-200 dark:border-green-800',
      bg: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      badge: 'bg-green-600 text-white',
      cta: 'bg-green-600 hover:bg-green-700 text-white',
      icon: 'text-green-600 dark:text-green-400'
    },
    emerald: {
      border: 'border-emerald-200 dark:border-emerald-800',
      bg: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20',
      badge: 'bg-emerald-600 text-white',
      cta: 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white',
      icon: 'text-emerald-600 dark:text-emerald-400'
    },
    teal: {
      border: 'border-teal-200 dark:border-teal-800',
      bg: 'from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20',
      badge: 'bg-teal-600 text-white',
      cta: 'bg-teal-600 hover:bg-teal-700 text-white',
      icon: 'text-teal-600 dark:text-teal-400'
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

export default function SaccoPricing() {
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
            className="text-sm font-semibold uppercase tracking-wide text-green-600 dark:text-green-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            💰 SACCO Pricing
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Cooperative-Friendly Pricing
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Transparent pricing plans designed for SACCOs of all sizes. From community cooperatives 
            to large SACCO unions, we have a solution that grows with your membership.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* Cooperative Benefits */}
        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-green-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Cooperative Advantage
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Built with cooperative principles at the core
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cooperativeBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-200 dark:border-gray-700">
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {benefit.description}
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
              Enhance your SACCO platform with specialized cooperative modules
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
                    <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
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
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-green-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Empower Your Cooperative?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join leading SACCOs across Kenya who are already transforming their cooperative operations 
              with member-focused technology that drives community development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule SACCO Consultation
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.button>
              <motion.button 
                className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download SACCO Guide
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-green-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                🤝 <strong>Cooperative Commitment:</strong> All plans include cooperative governance tools and member-focused features.
                <br />
                📞 <strong>SACCO Support:</strong> Growth and Enterprise plans include dedicated SACCO specialists.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
