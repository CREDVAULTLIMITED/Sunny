'use client';

import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    id: 'global-corridors',
    title: 'Global Payment Corridors',
    description: 'Pre-established payment corridors covering 150+ countries with optimized routing and competitive exchange rates.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: [
      '150+ country coverage',
      'Real-time corridor status',
      'Optimized routing',
      'Competitive FX rates'
    ],
    badge: 'Global Network'
  },
  {
    id: 'real-time-fx',
    title: 'Real-time FX Management',
    description: 'Dynamic foreign exchange management with real-time rates, hedging tools, and automated risk management.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    features: [
      'Live exchange rates',
      'FX risk management',
      'Hedging strategies',
      'Multi-currency wallets'
    ],
    badge: 'Smart FX'
  },
  {
    id: 'compliance-automation',
    title: 'Compliance Automation',
    description: 'Automated AML/CFT compliance, sanctions screening, and regulatory reporting across all jurisdictions.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    features: [
      'AML/CFT automation',
      'Sanctions screening',
      'Regulatory reporting',
      'Transaction monitoring'
    ],
    badge: 'Compliant'
  },
  {
    id: 'instant-settlement',
    title: 'Instant Settlement',
    description: 'Near-instant cross-border settlements with multiple payout methods including bank transfers, mobile money, and cash pickup.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    features: [
      'Real-time settlement',
      'Multiple payout methods',
      'Bank account deposits',
      'Mobile money integration'
    ],
    badge: 'Instant'
  },
  {
    id: 'agent-network',
    title: 'Agent Network Management',
    description: 'Comprehensive agent network management with onboarding, training, monitoring, and commission tracking.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    features: [
      'Agent onboarding',
      'Performance monitoring',
      'Commission management',
      'Training platforms'
    ],
    badge: 'Network'
  },
  {
    id: 'customer-platform',
    title: 'Customer Experience Platform',
    description: 'White-label customer platforms with mobile apps, web portals, and customer support tools.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      'White-label mobile apps',
      'Web transfer portals',
      'Customer support tools',
      'Transaction tracking'
    ],
    badge: 'Customer First'
  }
];

export default function RemittanceFeatures() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

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
            🌍 Cross-Border Infrastructure
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Complete Remittance Infrastructure
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            End-to-end remittance solutions with global payment corridors, real-time FX management, 
            automated compliance, and comprehensive agent network support.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-300 cursor-pointer relative group overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Badge */}
              {feature.badge && (
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 rounded-full text-xs font-semibold">
                  {feature.badge}
                </div>
              )}

              {/* Icon */}
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                <div className="text-pink-600 dark:text-pink-300">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-6">
                {feature.features.map((item, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-3 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50/0 to-pink-100/0 dark:from-pink-900/0 dark:to-pink-800/0 group-hover:from-pink-50/20 group-hover:to-pink-100/20 dark:group-hover:from-pink-900/20 dark:group-hover:to-pink-800/20 transition-all duration-300 rounded-xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-pink-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Scale Your Remittance Business?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join leading money transfer operators who trust Sunny's infrastructure to power their 
              cross-border payment operations. Get global reach with local expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Sending Money
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
              <motion.button 
                className="inline-flex items-center px-6 py-3 border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-400 dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Corridors
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

