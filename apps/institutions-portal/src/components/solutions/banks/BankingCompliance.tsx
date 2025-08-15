'use client';

import React from 'react';
import { motion } from 'framer-motion';

const complianceItems = [
  {
    id: 'cbk-compliance',
    title: 'CBK Tier 1 Compliance',
    description: 'Full compliance with Central Bank of Kenya regulations for commercial banks',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    features: [
      'Prudential Guidelines compliance',
      'Risk management frameworks',
      'Capital adequacy reporting',
      'Liquidity monitoring'
    ],
    status: 'Certified',
    color: 'green'
  },
  {
    id: 'aml-cft',
    title: 'AML/CFT Compliance',
    description: 'Comprehensive anti-money laundering and counter-terrorism financing controls',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    features: [
      'Real-time transaction monitoring',
      'Customer due diligence',
      'Sanctions screening',
      'Suspicious activity reporting'
    ],
    status: 'Active',
    color: 'blue'
  },
  {
    id: 'data-protection',
    title: 'Data Protection & Privacy',
    description: 'Comprehensive data protection in line with Kenya Data Protection Act',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    features: [
      'GDPR compliance ready',
      'Data encryption at rest',
      'Privacy by design',
      'Consent management'
    ],
    status: 'Compliant',
    color: 'purple'
  },
  {
    id: 'international',
    title: 'International Standards',
    description: 'Adherence to global banking and security standards',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: [
      'ISO 27001 certification',
      'PCI DSS Level 1',
      'SOC 2 Type II',
      'Basel III compliance'
    ],
    status: 'Certified',
    color: 'indigo'
  }
];

const auditFeatures = [
  {
    title: 'Real-time Monitoring',
    description: 'Continuous monitoring of all transactions and system activities',
    metric: '24/7'
  },
  {
    title: 'Automated Reporting',
    description: 'Automated generation and submission of regulatory reports',
    metric: '100%'
  },
  {
    title: 'Audit Trail',
    description: 'Complete immutable audit trail for all system operations',
    metric: 'Complete'
  },
  {
    title: 'Risk Scoring',
    description: 'AI-powered risk assessment and scoring for transactions',
    metric: '99.8%'
  }
];

export default function BankingCompliance() {
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

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        icon: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400',
        badge: 'bg-green-600 text-white',
        border: 'border-green-200 dark:border-green-800'
      },
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        icon: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-600 text-white',
        border: 'border-blue-200 dark:border-blue-800'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        icon: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
        badge: 'bg-purple-600 text-white',
        border: 'border-purple-200 dark:border-purple-800'
      },
      indigo: {
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
        icon: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400',
        badge: 'bg-indigo-600 text-white',
        border: 'border-indigo-200 dark:border-indigo-800'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
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
            className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            ⚖️ Compliance & Security
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Comprehensive Regulatory Compliance
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Built-in compliance frameworks ensure your bank meets all regulatory requirements. 
            Automated monitoring, reporting, and audit capabilities reduce compliance overhead while maintaining security.
          </motion.p>
        </motion.div>

        {/* Compliance Items */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {complianceItems.map((item) => {
            const colors = getColorClasses(item.color);
            
            return (
              <motion.div
                key={item.id}
                className={`${colors.bg} ${colors.border} p-8 rounded-xl border transition-all duration-300 hover:shadow-lg group cursor-pointer`}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                    {item.icon}
                  </div>
                  <div className={`px-3 py-1 ${colors.badge} rounded-full text-xs font-semibold`}>
                    {item.status}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {item.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <svg className={`w-4 h-4 mr-3 ${item.color === 'green' ? 'text-green-600 dark:text-green-400' : item.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : item.color === 'purple' ? 'text-purple-600 dark:text-purple-400' : 'text-indigo-600 dark:text-indigo-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Audit & Monitoring Features */}
        <motion.div
          className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-gray-200 dark:border-gray-600"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Audit & Monitoring
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive audit capabilities with real-time monitoring and automated compliance reporting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {auditFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {feature.metric}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.button 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Compliance Documentation
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
