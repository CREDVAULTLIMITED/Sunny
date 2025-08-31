'use client';

import React from 'react';
import { motion } from 'framer-motion';

const complianceItems = [
  {
    id: 'sasra-prudential',
    title: 'SASRA Prudential Guidelines',
    description: 'Full compliance with SACCO Societies Regulatory Authority prudential guidelines and reporting requirements',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    features: [
      'Capital adequacy monitoring',
      'Liquidity ratio compliance',
      'Asset quality assessment',
      'Earnings performance tracking'
    ],
    status: 'SASRA Certified',
    color: 'green'
  },
  {
    id: 'automated-reporting',
    title: 'Automated SASRA Reporting',
    description: 'Streamlined quarterly and annual reporting to SASRA with automated data compilation and submission workflows',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    features: [
      'Quarterly SASRA returns',
      'Annual supervision reports',
      'Member statistics reporting',
      'Financial performance data'
    ],
    status: 'Automated',
    color: 'emerald'
  },
  {
    id: 'governance-framework',
    title: 'Cooperative Governance',
    description: 'Digital governance tools for democratic decision-making, member voting, and board management',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    features: [
      'Electronic voting systems',
      'Board meeting management',
      'Member engagement tools',
      'Committee management'
    ],
    status: 'Democratic',
    color: 'teal'
  },
  {
    id: 'risk-management',
    title: 'Risk Management Framework',
    description: 'Comprehensive risk assessment and management tools aligned with SASRA requirements and cooperative principles',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    features: [
      'Credit risk assessment',
      'Operational risk monitoring',
      'Member default tracking',
      'Portfolio diversification'
    ],
    status: 'Active Monitoring',
    color: 'blue'
  }
];

const complianceMetrics = [
  {
    title: 'SASRA Reporting',
    description: 'Automated regulatory submissions',
    metric: '100%',
    subtext: 'On-time submissions'
  },
  {
    title: 'Capital Adequacy',
    description: 'Real-time ratio monitoring',
    metric: '15%+',
    subtext: 'Maintained above minimum'
  },
  {
    title: 'Member Compliance',
    description: 'KYC and documentation',
    metric: '99.8%',
    subtext: 'Member verification rate'
  },
  {
    title: 'Audit Readiness',
    description: 'Complete audit trails',
    metric: '24/7',
    subtext: 'Continuous monitoring'
  }
];

const sasraRequirements = [
  {
    category: 'Capital Requirements',
    items: [
      'Minimum core capital of KES 10M for deposit-taking SACCOs',
      'Capital adequacy ratio above 10%',
      'Institutional capital of at least 10% of total assets',
      'Liquid asset ratio of minimum 15%'
    ]
  },
  {
    category: 'Governance Standards',
    items: [
      'Democratic member control and ownership',
      'Transparent election processes',
      'Board composition and independence',
      'Regular AGMs and member meetings'
    ]
  },
  {
    category: 'Operational Requirements',
    items: [
      'Proper books of accounts and records',
      'Internal audit function',
      'Risk management framework',
      'Member protection mechanisms'
    ]
  }
];

export default function SasraCompliance() {
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
      emerald: {
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        icon: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
        badge: 'bg-emerald-600 text-white',
        border: 'border-emerald-200 dark:border-emerald-800'
      },
      teal: {
        bg: 'bg-teal-50 dark:bg-teal-900/20',
        icon: 'bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400',
        badge: 'bg-teal-600 text-white',
        border: 'border-teal-200 dark:border-teal-800'
      },
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        icon: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-600 text-white',
        border: 'border-blue-200 dark:border-blue-800'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.green;
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
            className="text-sm font-semibold uppercase tracking-wide text-green-600 dark:text-green-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            ⚖️ SASRA Compliance
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Complete SASRA Regulatory Compliance
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Built-in compliance frameworks ensure your SACCO meets all SASRA regulatory requirements. 
            Automated monitoring, reporting, and governance tools reduce compliance overhead while maintaining cooperative principles.
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
                      <svg className="w-4 h-4 mr-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Compliance Metrics */}
        <motion.div
          className="bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-gray-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Real-time Compliance Monitoring
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive compliance dashboard with real-time monitoring and automated alerts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {metric.metric}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {metric.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                    {metric.description}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {metric.subtext}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SASRA Requirements */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              SASRA Regulatory Requirements
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive coverage of all SASRA requirements for deposit-taking SACCOs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sasraRequirements.map((requirement, index) => (
              <motion.div
                key={requirement.category}
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  {requirement.category}
                </h4>
                <ul className="space-y-3">
                  {requirement.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-sm">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.button 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download SASRA Compliance Guide
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
