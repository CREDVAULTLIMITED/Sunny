'use client';

import React from 'react';
import { motion } from 'framer-motion';

const onboardingSteps = [
  {
    step: 1,
    title: 'Application Submission',
    description: 'Streamlined digital application process',
    features: ['Digital forms', 'Document upload', 'Real-time validation', 'Auto-save progress'],
    timeframe: '5 minutes',
    icon: '📝'
  },
  {
    step: 2,
    title: 'KYB & Risk Assessment',
    description: 'Automated verification and risk scoring',
    features: ['Identity verification', 'Credit checks', 'Risk scoring', 'Compliance screening'],
    timeframe: '2 hours',
    icon: '🔍'
  },
  {
    step: 3,
    title: 'Underwriting Review',
    description: 'Intelligent underwriting decisions',
    features: ['AI-powered decisions', 'Manual review queue', 'Custom rules', 'Approval workflow'],
    timeframe: '24 hours',
    icon: '⚖️'
  },
  {
    step: 4,
    title: 'Account Activation',
    description: 'Instant merchant account setup',
    features: ['Account provisioning', 'API credentials', 'Test environment', 'Go-live checklist'],
    timeframe: 'Instant',
    icon: '🚀'
  }
];

const merchantServices = [
  {
    title: 'Merchant Portfolio Management',
    description: 'Comprehensive tools for managing your merchant portfolio at scale',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    features: [
      'Merchant dashboard',
      'Transaction monitoring',
      'Risk management',
      'Performance analytics',
      'Automated reporting',
      'Dispute management'
    ]
  },
  {
    title: 'Risk & Compliance Tools',
    description: 'Advanced risk management and regulatory compliance automation',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    features: [
      'Transaction monitoring',
      'AML/CFT screening',
      'Suspicious activity detection',
      'Regulatory reporting',
      'Risk scoring models',
      'Compliance automation'
    ]
  },
  {
    title: 'Merchant Support Platform',
    description: 'Self-service portal and dedicated support for merchants',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
      </svg>
    ),
    features: [
      'Self-service portal',
      'Knowledge base',
      'Ticket management',
      'Live chat support',
      'API documentation',
      'Integration guides'
    ]
  },
  {
    title: 'Settlement & Reconciliation',
    description: 'Automated settlement processing and financial reconciliation',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    features: [
      'Real-time settlements',
      'Multi-currency support',
      'Automated reconciliation',
      'Settlement reporting',
      'Reserve management',
      'Payout scheduling'
    ]
  }
];

const merchantMetrics = [
  {
    metric: 'Onboarding Time',
    traditional: '2-4 weeks',
    sunny: '24 hours',
    improvement: '95% faster',
    icon: '⏱️'
  },
  {
    metric: 'Approval Rate',
    traditional: '65%',
    sunny: '85%',
    improvement: '20% higher',
    icon: '✅'
  },
  {
    metric: 'Manual Review',
    traditional: '80%',
    sunny: '15%',
    improvement: '65% reduction',
    icon: '🤖'
  },
  {
    metric: 'Support Resolution',
    traditional: '48 hours',
    sunny: '2 hours',
    improvement: '96% faster',
    icon: '🚀'
  }
];

export default function MerchantSolutions() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
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
            className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            🏪 Merchant Solutions
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Streamlined Merchant Onboarding & Management
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Accelerate merchant acquisition with automated onboarding, intelligent underwriting, 
            and comprehensive merchant lifecycle management tools.
          </motion.p>
        </motion.div>

        {/* Onboarding Process */}
        <motion.div
          className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-teal-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Automated Merchant Onboarding
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              From application to activation in 24 hours with our intelligent onboarding flow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {onboardingSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                {/* Connection Line */}
                {index < onboardingSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-3 w-6 h-0.5 bg-teal-300 dark:bg-teal-600" />
                )}
                
                {/* Step Icon & Number */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mr-3">
                    <span className="text-teal-600 dark:text-teal-400 font-bold text-sm">{step.step}</span>
                  </div>
                  <span className="text-2xl">{step.icon}</span>
                </div>

                {/* Content */}
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {step.description}
                </p>

                {/* Timeframe */}
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 text-xs rounded-full font-medium">
                    {step.timeframe}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-1">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <div className="w-1 h-1 bg-teal-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Merchant Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {merchantServices.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                  <div className="text-teal-600 dark:text-teal-400">
                    {service.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <svg className="w-3 h-3 mr-2 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Merchant Onboarding Performance
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              See how Sunny transforms the merchant acquisition and management process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {merchantMetrics.map((metric, index) => (
              <motion.div
                key={metric.metric}
                className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="text-3xl mb-3">{metric.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {metric.metric}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Traditional:</span>
                    <span className="text-gray-700 dark:text-gray-300">{metric.traditional}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">With Sunny:</span>
                    <span className="text-teal-600 dark:text-teal-400 font-semibold">{metric.sunny}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-green-600 dark:text-green-400 font-bold">{metric.improvement}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.button 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Onboarding Merchants
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
