'use client';

import React from 'react';
import { motion } from 'framer-motion';

const infrastructureComponents = [
  {
    title: 'Global Settlement Network',
    description: 'Multi-bank settlement infrastructure with real-time liquidity management',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: 'FX Trading Engine',
    description: 'Real-time foreign exchange with automated hedging and risk management',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    )
  },
  {
    title: 'Compliance Engine',
    description: 'Automated AML/CFT screening and regulatory reporting across jurisdictions',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Corridor Management',
    description: 'Dynamic corridor configuration with route optimization and monitoring',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

const transferFlow = [
  {
    step: 1,
    title: 'Customer Initiation',
    description: 'Customer initiates transfer through app, web, or agent',
    details: ['Multi-channel access', 'KYC verification', 'Beneficiary validation', 'Rate confirmation']
  },
  {
    step: 2,
    title: 'Compliance Screening',
    description: 'Automated AML/CFT and sanctions screening',
    details: ['Real-time screening', 'Risk scoring', 'Watchlist checks', 'Enhanced due diligence']
  },
  {
    step: 3,
    title: 'FX & Routing',
    description: 'Foreign exchange and optimal route selection',
    details: ['Live FX rates', 'Route optimization', 'Cost calculation', 'Hedging execution']
  },
  {
    step: 4,
    title: 'Settlement',
    description: 'Cross-border settlement and beneficiary payout',
    details: ['Real-time settlement', 'Multiple payout options', 'Status notifications', 'Receipt confirmation']
  }
];

const complianceFeatures = [
  {
    title: 'AML/CFT Automation',
    description: 'Comprehensive anti-money laundering and counter-terrorism financing compliance',
    features: [
      'Real-time transaction monitoring',
      'Suspicious activity detection',
      'Automated case management',
      'Regulatory reporting'
    ]
  },
  {
    title: 'Sanctions Screening',
    description: 'Global sanctions list screening and watchlist monitoring',
    features: [
      'Real-time sanctions checks',
      'Watchlist monitoring',
      'False positive reduction',
      'Enhanced due diligence'
    ]
  },
  {
    title: 'Regulatory Reporting',
    description: 'Automated regulatory reporting across multiple jurisdictions',
    features: [
      'Multi-jurisdiction reports',
      'Automated filing',
      'Audit trail maintenance',
      'Compliance dashboards'
    ]
  },
  {
    title: 'Record Keeping',
    description: 'Comprehensive transaction and customer record management',
    features: [
      'Complete audit trails',
      'Document management',
      'Data retention policies',
      'Compliance archives'
    ]
  }
];

const performanceMetrics = [
  {
    metric: 'Transfer Speed',
    traditional: '3-5 days',
    sunny: '2 minutes',
    improvement: '99% faster',
    icon: '⚡'
  },
  {
    metric: 'FX Spread',
    traditional: '3-5%',
    sunny: '0.5-1%',
    improvement: '70% reduction',
    icon: '💱'
  },
  {
    metric: 'Corridor Coverage',
    traditional: '20-50',
    sunny: '150+',
    improvement: '3x expansion',
    icon: '🌍'
  },
  {
    metric: 'Compliance Time',
    traditional: '24-48 hours',
    sunny: 'Real-time',
    improvement: '100% automation',
    icon: '🛡️'
  }
];

export default function CrossBorderInfrastructure() {
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
    <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
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
            🏗️ Cross-Border Infrastructure
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Enterprise Cross-Border Payment Infrastructure
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Built on global settlement networks with real-time FX management, automated compliance, 
            and comprehensive corridor monitoring. Scale cross-border payments with confidence.
          </motion.p>
        </motion.div>

        {/* Infrastructure Components */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {infrastructureComponents.map((component, index) => (
            <motion.div
              key={component.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <div className="text-pink-600 dark:text-pink-400">
                  {component.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {component.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {component.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Transfer Flow */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Cross-Border Transfer Flow
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              From initiation to settlement - optimized for speed, compliance, and cost efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transferFlow.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Connection Line */}
                {index < transferFlow.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-3 w-6 h-0.5 bg-pink-300 dark:bg-pink-600" />
                )}
                
                {/* Step Number */}
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-pink-600 dark:text-pink-400 font-bold">{step.step}</span>
                </div>

                {/* Content */}
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-1">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <div className="w-1 h-1 bg-pink-400 rounded-full mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Features */}
        <motion.div
          className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-pink-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Automated Compliance Framework
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive compliance automation across all jurisdictions and regulatory requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {complianceFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {feature.description}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {feature.features.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center text-sm">
                      <svg className="w-3 h-3 mr-2 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
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
              Cross-Border Performance Excellence
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              See how Sunny's infrastructure transforms cross-border payment operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
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
                    <span className="text-pink-600 dark:text-pink-400 font-semibold">{metric.sunny}</span>
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
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Infrastructure
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

