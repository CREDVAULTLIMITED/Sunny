'use client';

import React from 'react';
import { motion } from 'framer-motion';

const pricingTiers = [
  {
    id: 'startup',
    name: 'Startup MTO',
    description: 'Perfect for emerging money transfer operators',
    price: '$2,500',
    period: 'per month + transaction fees',
    badge: 'New MTOs',
    features: [
      'Up to 10 corridors',
      'Basic compliance tools',
      'Standard FX rates',
      'Email support',
      'Up to 50K transactions/month',
      'Mobile money integration',
      'Agent network (up to 100)',
      'Basic reporting'
    ],
    limitations: [
      'Limited corridor customization',
      'Standard compliance rules',
      'Basic settlement options'
    ],
    color: 'pink',
    ctaText: 'Start MTO Business',
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional MTO',
    description: 'For established MTOs with growing transfer volumes',
    price: '$7,500',
    period: 'per month + competitive rates',
    badge: 'Most Popular',
    features: [
      'Up to 50 corridors',
      'Advanced compliance automation',
      'Premium FX rates',
      'Priority support',
      'Up to 500K transactions/month',
      'Real-time settlement',
      'Agent network (up to 1,000)',
      'Advanced analytics',
      'Custom branding',
      'API access',
      'Multi-currency wallets'
    ],
    limitations: [],
    color: 'rose',
    ctaText: 'Scale Your MTO',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise MTO',
    description: 'For large-scale MTOs requiring custom solutions',
    price: 'Custom',
    period: 'enterprise agreement',
    badge: 'Global Scale',
    features: [
      'Unlimited corridors',
      'Custom compliance rules',
      'Wholesale FX rates',
      '24/7 dedicated support',
      'Unlimited transactions',
      'Instant settlement',
      'Unlimited agent network',
      'Custom reporting',
      'White-label platform',
      'Dedicated infrastructure',
      'Regulatory consulting',
      'Custom integrations',
      'SLA guarantees'
    ],
    limitations: [],
    color: 'red',
    ctaText: 'Contact Enterprise',
    popular: false
  }
];

const corridorPricing = [
  {
    category: 'Cross-Border Transfers',
    services: [
      { name: 'Africa Corridors', price: '0.8-1.2%', description: 'Per successful transfer' },
      { name: 'Asia Corridors', price: '0.6-1.0%', description: 'Per successful transfer' },
      { name: 'Americas Corridors', price: '0.7-1.1%', description: 'Per successful transfer' },
      { name: 'Europe Corridors', price: '0.5-0.9%', description: 'Per successful transfer' }
    ]
  },
  {
    category: 'Compliance & Verification',
    services: [
      { name: 'AML/CFT Screening', price: 'KES 25', description: 'Per transaction screening' },
      { name: 'Sanctions Check', price: 'KES 15', description: 'Per sanctions screening' },
      { name: 'Enhanced Due Diligence', price: 'KES 200', description: 'Per enhanced check' },
      { name: 'Regulatory Reporting', price: 'KES 5,000', description: 'Per monthly report' }
    ]
  },
  {
    category: 'Agent & Network Services',
    services: [
      { name: 'Agent Onboarding', price: 'KES 1,000', description: 'Per agent activation' },
      { name: 'Agent Training', price: 'KES 2,500', description: 'Per training session' },
      { name: 'Commission Processing', price: '0.1%', description: 'Of commission amount' },
      { name: 'Network Monitoring', price: 'KES 500', description: 'Per agent per month' }
    ]
  }
];

const valueProps = [
  {
    title: 'Corridor Ready',
    description: 'Pre-built corridors to 150+ countries',
    icon: '🌍'
  },
  {
    title: 'Compliance Included',
    description: 'Built-in AML/CFT and regulatory tools',
    icon: '🛡️'
  },
  {
    title: 'Agent Network',
    description: 'Complete agent management platform',
    icon: '👥'
  },
  {
    title: 'Real-time Settlement',
    description: 'Instant cross-border settlements',
    icon: '⚡'
  }
];

const PricingCard = ({ tier, index }: { tier: any, index: number }) => {
  const colorClasses = {
    pink: {
      border: 'border-pink-200 dark:border-pink-800',
      bg: 'from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20',
      badge: 'bg-pink-600 text-white',
      cta: 'bg-pink-600 hover:bg-pink-700 text-white',
      icon: 'text-pink-600 dark:text-pink-400'
    },
    rose: {
      border: 'border-rose-200 dark:border-rose-800',
      bg: 'from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20',
      badge: 'bg-rose-600 text-white',
      cta: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white',
      icon: 'text-rose-600 dark:text-rose-400'
    },
    red: {
      border: 'border-red-200 dark:border-red-800',
      bg: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
      badge: 'bg-red-600 text-white',
      cta: 'bg-red-600 hover:bg-red-700 text-white',
      icon: 'text-red-600 dark:text-red-400'
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

export default function RemittancePricing() {
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
            className="text-sm font-semibold uppercase tracking-wide text-pink-600 dark:text-pink-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            💰 Remittance Pricing
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Transparent MTO Pricing
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Competitive pricing for money transfer operators with transparent fees and no hidden costs. 
            Scale your remittance business with confidence.
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
          className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-pink-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why MTOs Choose Sunny
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Complete remittance infrastructure with everything you need to succeed
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

        {/* Corridor Pricing */}
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
              Transparent per-use pricing for all remittance services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corridorPricing.map((category, index) => (
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
                        <span className="text-pink-600 dark:text-pink-400 font-semibold text-sm">
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
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-pink-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Launch Your Money Transfer Business?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join leading money transfer operators who trust Sunny's infrastructure. 
              Get started with comprehensive remittance solutions and scale globally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your MTO
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
              <motion.button 
                className="inline-flex items-center px-6 py-3 border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-400 dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-pink-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                🌍 <strong>Global Reach:</strong> 150+ payment corridors ready to activate.
                <br />
                🛡️ <strong>Compliance Ready:</strong> Built-in AML/CFT and regulatory tools.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
