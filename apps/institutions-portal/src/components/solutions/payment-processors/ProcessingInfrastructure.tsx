'use client';

import React from 'react';
import { motion } from 'framer-motion';

const infrastructureFeatures = [
  {
    title: 'High-Availability Processing',
    description: 'Redundant infrastructure with 99.99% uptime guarantee',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: 'Global Load Balancing',
    description: 'Intelligent traffic distribution across multiple data centers',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Real-time Monitoring',
    description: 'Advanced monitoring and alerting for all payment flows',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    title: 'API Gateway',
    description: 'Unified API gateway with rate limiting and authentication',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  }
];

const processingMetrics = [
  {
    title: 'Transaction Volume',
    before: '1M/day',
    after: '100M/day',
    improvement: '100x scale',
    icon: '📈'
  },
  {
    title: 'Processing Speed',
    before: '5 seconds',
    after: '200ms',
    improvement: '96% faster',
    icon: '⚡'
  },
  {
    title: 'System Uptime',
    before: '99.5%',
    after: '99.99%',
    improvement: '10x reliability',
    icon: '🔥'
  },
  {
    title: 'Global Reach',
    before: '5 countries',
    after: '150+ countries',
    improvement: '30x expansion',
    icon: '🌍'
  }
];

const processingFlow = [
  {
    step: 1,
    title: 'Transaction Initiation',
    description: 'Customer initiates payment through merchant or app',
    details: ['Multi-channel support', 'Device fingerprinting', 'Initial validation']
  },
  {
    step: 2,
    title: 'Intelligent Routing',
    description: 'Smart routing algorithm selects optimal processing path',
    details: ['Performance optimization', 'Cost efficiency', 'Success rate priority']
  },
  {
    step: 3,
    title: 'Authorization',
    description: 'Real-time authorization through acquirer networks',
    details: ['Sub-second response', 'Global connectivity', 'Redundant pathways']
  },
  {
    step: 4,
    title: 'Settlement',
    description: 'Automated settlement and reconciliation',
    details: ['Real-time settlement', 'Multi-currency support', 'Automated reporting']
  }
];

const architectureDiagram = `
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Merchants     │───▶│  Payment Gateway │───▶│   Acquirers     │
│                 │    │                  │    │                 │
│ • E-commerce    │    │ • Routing Engine │    │ • Bank Partners │
│ • Mobile Apps   │    │ • Fraud Engine   │    │ • Card Networks │
│ • POS Systems   │    │ • Risk Manager   │    │ • Alt. Payments │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        ▲                        │                        │
        │                        ▼                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Dashboard     │◀───│  Processing Hub  │───▶│   Settlement    │
│                 │    │                  │    │                 │
│ • Analytics     │    │ • Transaction    │    │ • Real-time     │
│ • Reporting     │    │   Processing     │    │ • Multi-bank    │
│ • Monitoring    │    │ • Data Pipeline  │    │ • Reconciliation│
└─────────────────┘    └──────────────────┘    └─────────────────┘
`;

export default function ProcessingInfrastructure() {
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
            className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            🏗️ Processing Infrastructure
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Enterprise Payment Processing Architecture
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Built on cloud-native architecture with global redundancy, intelligent routing, 
            and enterprise-grade security. Scale from thousands to millions of transactions seamlessly.
          </motion.p>
        </motion.div>

        {/* Infrastructure Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {infrastructureFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <div className="text-teal-600 dark:text-teal-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Processing Flow */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Payment Processing Flow
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              From initiation to settlement - every step optimized for speed and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processingFlow.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Connection Line */}
                {index < processingFlow.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-3 w-6 h-0.5 bg-teal-300 dark:bg-teal-600" />
                )}
                
                {/* Step Number */}
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">{step.step}</span>
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
                      <div className="w-1 h-1 bg-teal-400 rounded-full mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-teal-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Payment Processing Architecture
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              High-level overview of our distributed payment processing system
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {architectureDiagram}
            </pre>
          </div>
        </motion.div>

        {/* Processing Metrics */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Performance at Scale
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              See how Sunny's infrastructure transforms payment processing capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processingMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="text-3xl mb-3">{metric.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {metric.title}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Before:</span>
                    <span className="text-gray-700 dark:text-gray-300">{metric.before}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">After:</span>
                    <span className="text-teal-600 dark:text-teal-400 font-semibold">{metric.after}</span>
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
              Explore Architecture
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

