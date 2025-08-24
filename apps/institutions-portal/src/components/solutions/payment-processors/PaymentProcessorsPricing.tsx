'use client';

import React from 'react';
import { motion } from 'framer-motion';

const pricingTiers = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for emerging payment processors and PSPs',
    price: 'Custom',
    period: 'contact for pricing',
    badge: 'Getting Started',
    features: [
      'Core payment processing',
      'Basic merchant onboarding',
      'Standard fraud protection',
      'Email support',
      'Up to 100K transactions/month',
      'Single acquirer connection',
      'Basic reporting dashboard',
      'API access'
    ],
    limitations: [
      'Limited customization',
      'Standard SLA',
      'Basic fraud rules'
    ],
    color: 'teal',
    ctaText: 'Contact Sales',
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For established processors with growing transaction volumes',
    price: 'Custom',
    period: 'volume-based pricing',
    badge: 'Most Popular',
    features: [
      'Advanced payment orchestration',
      'Automated merchant onboarding',
      'AI-powered fraud prevention',
      'Priority support',
      'Up to 10M transactions/month',
      'Multiple acquirer connections',
      'Advanced analytics',
      'Webhook notifications',
      'Custom integrations',
      'Risk management tools',
      'Settlement optimization'
    ],
    limitations: [],
    color: 'cyan',
    ctaText: 'Start Professional',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large-scale processors requiring custom solutions',
    price: 'Custom',
    period: 'enterprise agreement',
    badge: 'Full Platform',
    features: [
      'White-label platform',
      'Custom payment flows',
      'Dedicated infrastructure',
      '24/7 dedicated support',
      'Unlimited transactions',
      'Global acquirer network',
      'Custom fraud models',
      'Real-time monitoring',
      'Multi-region deployment',
      'Custom compliance tools',
      'Dedicated account manager',
      'SLA guarantees',
      'Custom development'
    ],
    limitations: [],
    color: 'blue',
    ctaText: 'Contact Enterprise',
    popular: false
  }
];

const processingPricing = [
  {
    category: 'Transaction Processing',
    services: [
      { name: 'Domestic Card Processing', price: '0.8%', description: 'Per successful transaction' },
      { name: 'International Card Processing', price: '1.5%', description: 'Per successful transaction' },
      { name: 'Bank Transfer Processing', price: '0.3%', description: 'Per successful transaction' },
      { name: 'Alternative Payment Methods', price: '1.2%', description: 'Per successful transaction' }
    ]
  },
  {
    category: 'Merchant Services',
    services: [
      { name: 'Merchant Onboarding', price: 'KES 500', description: 'Per merchant activated' },
      { name: 'KYB Verification', price: 'KES 300', description: 'Per verification check' },
      { name: 'Risk Assessment', price: 'KES 200', description: 'Per assessment' },
      { name: 'Settlement Processing', price: 'KES 50', description: 'Per settlement batch' }
    ]
  },
  {
    category: 'Infrastructure & Support',
    services: [
      { name: 'API Calls', price: 'KES 1', description: 'Per API request' },
      { name: 'Dedicated Support', price: 'KES 50,000', description: 'Per month' },
      { name: 'Custom Integration', price: 'KES 100,000', description: 'One-time setup' },
      { name: 'White-label Setup', price: 'KES 500,000', description: 'One-time setup' }
    ]
  }
];

const valueProps = [
  {
    title: 'No Setup Fees',
    description: 'Start processing immediately',
    icon: '🚀'
  },
  {
    title: 'Volume Discounts',
    description: 'Lower rates as you scale',
    icon: '📈'
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprises',
    icon: '💎'
  },
  {
    title: 'Flexible Billing',
    description: 'Monthly or annual options',
    icon: '🔄'
  }
];

const PricingCard = ({ tier, index }: { tier: any, index: number }) => {
  const colorClasses = {
    teal: {
      border: 'border-teal-200 dark:border-teal-800',
      bg: 'from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20',
      badge: 'bg-teal-600 text-white',
      cta: 'bg-teal-600 hover:bg-teal-700 text-white',
      icon: 'text-teal-600 dark:text-teal-400'
    },
    cyan: {
      border: 'border-cyan-200 dark:border-cyan-800',
      bg: 'from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20',
      badge: 'bg-cyan-600 text-white',
      cta: 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white',
      icon: 'text-cyan-600 dark:text-cyan-400'
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

export default function PaymentProcessorsPricing() {
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
            className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            💰 Processing Pricing
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Enterprise Payment Processing Pricing
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Flexible pricing that scales with your payment processing business. 
            Custom enterprise solutions with transparent, volume-based pricing.
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
          className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-teal-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why Payment Processors Choose Sunny
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enterprise-grade infrastructure with transparent, scalable pricing
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

        {/* Service Pricing */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Service Pricing
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Transparent per-use pricing for all processing services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processingPricing.map((category, index) => (
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
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{service.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{service.description}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-teal-600 dark:text-teal-400 font-semibold text-sm">
                          {service.price}
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
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-teal-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Scale Your Payment Processing?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join leading payment processors who trust Sunny's infrastructure. 
              Get enterprise-grade processing with transparent pricing and dedicated support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Sales
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </motion.button>
              <motion.button 
                className="inline-flex items-center px-6 py-3 border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-teal-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                💳 <strong>Enterprise Ready:</strong> Custom solutions for high-volume processors.
                <br />
                🛡️ <strong>Security First:</strong> PCI DSS Level 1 certified infrastructure.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

