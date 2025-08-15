'use client';

import React from 'react';
import { motion } from 'framer-motion';

const integrations = [
  {
    id: 'core-banking',
    category: 'Core Banking Systems',
    description: 'Seamless integration with leading core banking platforms',
    items: [
      { name: 'Temenos T24', logo: 'T24', description: 'Real-time transaction processing and account management' },
      { name: 'Oracle Flexcube', logo: 'OFC', description: 'Universal banking platform integration' },
      { name: 'SAP Banking', logo: 'SAP', description: 'End-to-end banking solution connectivity' },
      { name: 'Finastra Fusion', logo: 'FIN', description: 'Digital banking platform integration' },
    ],
    color: 'blue'
  },
  {
    id: 'payment-networks',
    category: 'Payment Networks',
    description: 'Direct connectivity to domestic and international payment networks',
    items: [
      { name: 'CBK RTGS', logo: 'CBK', description: 'Central Bank Real-Time Gross Settlement' },
      { name: 'SWIFT Network', logo: 'SWT', description: 'Global financial messaging standard' },
      { name: 'EFT Network', logo: 'EFT', description: 'Electronic Funds Transfer processing' },
      { name: 'Card Networks', logo: 'CRD', description: 'Visa, Mastercard, and local schemes' },
    ],
    color: 'indigo'
  },
  {
    id: 'regulatory-systems',
    category: 'Regulatory & Compliance',
    description: 'Automated compliance and regulatory reporting systems',
    items: [
      { name: 'CBK Reporting', logo: 'CBK', description: 'Automated regulatory reporting to CBK' },
      { name: 'KRA Integration', logo: 'KRA', description: 'Tax compliance and withholding' },
      { name: 'AML Screening', logo: 'AML', description: 'Anti-money laundering compliance' },
      { name: 'FATCA/CRS', logo: 'FTC', description: 'International tax compliance' },
    ],
    color: 'purple'
  }
];

const IntegrationCard = ({ item, color, index }: { item: any, color: string, index: number }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700',
    indigo: 'from-indigo-500 to-indigo-600 group-hover:from-indigo-600 group-hover:to-indigo-700',
    purple: 'from-purple-500 to-purple-600 group-hover:from-purple-600 group-hover:to-purple-700'
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center text-white font-bold text-sm transition-all duration-300`}>
          {item.logo}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.name}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default function BankingIntegrations() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const categoryVariants = {
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
            className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            🔗 System Integrations
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Seamless Banking Ecosystem Integration
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Connect your existing banking infrastructure with our comprehensive integration suite. 
            Pre-built connectors and APIs ensure rapid deployment with minimal disruption to your operations.
          </motion.p>
        </motion.div>

        {/* Integration Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {integrations.map((category) => (
            <motion.div
              key={category.id}
              variants={categoryVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              {/* Category Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {category.category}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {category.description}
                </p>
              </div>

              {/* Integration Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item, index) => (
                  <IntegrationCard 
                    key={item.name} 
                    item={item} 
                    color={category.color} 
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Integration Process */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-blue-200 dark:border-gray-600">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Rapid Integration Process
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our proven integration methodology ensures smooth deployment with minimal downtime
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Assessment', description: 'System analysis and integration planning', duration: '1-2 weeks' },
                { step: '2', title: 'Development', description: 'Custom connector development and testing', duration: '2-4 weeks' },
                { step: '3', title: 'Testing', description: 'UAT and security validation', duration: '1-2 weeks' },
                { step: '4', title: 'Go-Live', description: 'Production deployment and monitoring', duration: '1 week' },
              ].map((phase, index) => (
                <motion.div
                  key={phase.step}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {phase.step}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {phase.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    {phase.description}
                  </p>
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                    {phase.duration}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Integration Assessment
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
