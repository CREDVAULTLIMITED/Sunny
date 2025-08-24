'use client';

import React from 'react';
import { motion } from 'framer-motion';

const pricingTiers = [
  {
    id: 'startup',
    name: 'Startup',
    description: 'Perfect for early-stage fintechs and MVP development',
    price: 'Free',
    period: 'up to $10K volume',
    badge: 'Most Popular',
    features: [
      'Sandbox environment',
      'Core payment APIs',
      'Basic KYC/AML tools',
      'Community support',
      'Up to 1,000 transactions/month',
      'Standard documentation',
      'Basic analytics dashboard',
      'Email support'
    ],
    limitations: [
      'Limited to sandbox only',
      'Basic support response time',
      'Standard rate limits'
    ],
    color: 'purple',
    ctaText: 'Start Free',
    popular: true
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'For scaling fintechs with growing transaction volumes',
    price: '$99',
    period: 'per month + 0.5% transaction fee',
    badge: '',
    features: [
      'Production environment',
      'Full API suite access',
      'Advanced compliance tools',
      'Priority support',
      'Up to 50,000 transactions/month',
      'Advanced analytics',
      'Custom webhooks',
      'Phone & email support',
      'Multi-currency support',
      'Basic white-labeling',
      'Fraud detection tools'
    ],
    limitations: [],
    color: 'indigo',
    ctaText: 'Start Growth Plan'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For established fintechs requiring custom solutions',
    price: 'Custom',
    period: 'volume-based pricing',
    badge: 'Full Suite',
    features: [
      'Unlimited transactions',
      'Custom API development',
      'Dedicated infrastructure',
      '24/7 dedicated support',
      'SLA guarantees',
      'Advanced security features',
      'Custom compliance solutions',
      'White-label platform',
      'Multi-region deployment',
      'Custom integrations',
      'Dedicated account manager',
      'Custom reporting',
      'API rate limit customization'
    ],
    limitations: [],
    color: 'blue',
    ctaText: 'Contact Sales'
  }
];

const apiPricing = [
  {
    category: 'Payment Processing',
    apis: [
      { name: 'Local Bank Transfers', price: '0.5%', description: 'Per successful transaction' },
      { name: 'International Transfers', price: '1.2%', description: 'Per successful transaction' },
      { name: 'Mobile Money', price: '0.8%', description: 'Per successful transaction' },
      { name: 'Card Processing', price: '2.9% + KES 5', description: 'Per successful transaction' }
    ]
  },
  {
    category: 'Digital Banking',
    apis: [
      { name: 'Account Creation', price: 'KES 50', description: 'Per account created' },
      { name: 'Virtual Cards', price: 'KES 100', description: 'Per card issued' },
      { name: 'Statement Generation', price: 'KES 20', description: 'Per statement' },
      { name: 'Transaction History', price: 'KES 2', description: 'Per API call' }
    ]
  },
  {
    category: 'Compliance & Verification',
    apis: [
      { name: 'KYC Verification', price: 'KES 150', description: 'Per verification check' },
      { name: 'AML Screening', price: 'KES 75', description: 'Per screening' },
      { name: 'Document Verification', price: 'KES 100', description: 'Per document' },
      { name: 'Biometric Verification', price: 'KES 200', description: 'Per biometric check' }
    ]
  }
];

const valueProps = [
  {
    title: 'Developer First',
    description: 'Built by developers for developers',
    icon: '💻'
  },
  {
    title: 'No Setup Fees',
    description: 'Start building immediately',
    icon: '🚀'
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprises',
    icon: '💎'
  },
  {
    title: 'Scale Efficiently',
    description: 'Pay only for what you use',
    icon: '📈'
  }
];

const PricingCard = ({ tier, index }: { tier: any, index: number }) => {
  const colorClasses = {
    purple: {
      border: 'border-purple-200 dark:border-purple-800',
      bg: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
      badge: 'bg-purple-600 text-white',
      cta: 'bg-purple-600 hover:bg-purple-700 text-white',
      icon: 'text-purple-600 dark:text-purple-400'
    },
    indigo: {
      border: 'border-indigo-200 dark:border-indigo-800',
      bg: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
      badge: 'bg-indigo-600 text-white',
      cta: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white',
      icon: 'text-indigo-600 dark:text-indigo-400'
    },
    blue: {
      border: 'border-blue-200 dark:border-blue-800',
      bg: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      badge: 'bg-blue-600 text-white',
      cta: 'bg-blue-600 hover:bg-blue-700 text-white',
      icon: 'text-blue-600 dark:text-blue-400'
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
              <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
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

export default function FintechPricing() {
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
            className="text-sm font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            💰 Fintech Pricing
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Developer-Friendly Pricing
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Transparent pricing that scales with your fintech. Start free and pay only for what you use. 
            No setup fees, no hidden costs.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* Value Props */}
        <motion.div
          className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-purple-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why Developers Choose Sunny
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Built with developers in mind, designed for fintech innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-200 dark:border-gray-700">
                  <span className="text-2xl">{prop.icon}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {prop.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {prop.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API Pricing */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              API Usage Pricing
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Transparent per-use pricing for all API endpoints
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {apiPricing.map((category, index) => (
              <motion.div
                key={category.category}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                  {category.category}
                </h4>
                <div className="space-y-4">
                  {category.apis.map((api, apiIndex) => (
                    <div key={apiIndex} className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{api.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{api.description}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">
                          {api.price}
                        </span>
                      </div>
                    </div>
                  ))}
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
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-purple-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Build Your Fintech?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Start free and scale as you grow. Join leading fintech companies building 
              the future of finance with Sunny's comprehensive infrastructure platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Building Free
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.button>
              <motion.button 
                className="inline-flex items-center px-6 py-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-400 dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-purple-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                🚀 <strong>Free Tier:</strong> Start building immediately with our generous free tier.
                <br />
                🔧 <strong>Developer Support:</strong> Comprehensive documentation and community support.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

