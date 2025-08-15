'use client';

import React from 'react';
import { motion } from 'framer-motion';

const impactMetrics = [
  {
    id: 'poverty-assessment',
    title: 'Poverty Assessment Tools',
    description: 'Comprehensive poverty measurement using validated tools like PPI and USAID PAT',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    features: [
      'Progress out of Poverty Index (PPI)',
      'USAID Poverty Assessment Tool',
      'Household vulnerability scoring',
      'Multi-dimensional poverty tracking'
    ],
    color: 'orange'
  },
  {
    id: 'social-performance',
    title: 'Social Performance Monitoring',
    description: 'Track social outcomes and client protection in line with international standards',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    features: [
      'Client protection standards',
      'Social outcome indicators',
      'Community impact assessment',
      'Gender equality metrics'
    ],
    color: 'amber'
  },
  {
    id: 'financial-inclusion',
    title: 'Financial Inclusion Tracking',
    description: 'Monitor financial inclusion progress and access to financial services',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: [
      'Financial service usage rates',
      'Product penetration analysis',
      'Digital payment adoption',
      'Savings behavior tracking'
    ],
    color: 'yellow'
  },
  {
    id: 'livelihood-impact',
    title: 'Livelihood Impact Assessment',
    description: 'Measure improvements in income, assets, and livelihood diversification',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    features: [
      'Income generation tracking',
      'Asset building measurement',
      'Business growth indicators',
      'Employment creation metrics'
    ],
    color: 'orange'
  }
];

const impactDashboard = [
  {
    category: 'Poverty Reduction',
    metrics: [
      { label: 'Clients Above Poverty Line', value: '73%', change: '+12%' },
      { label: 'Average Income Increase', value: '45%', change: '+8%' },
      { label: 'Asset Growth', value: '62%', change: '+15%' }
    ]
  },
  {
    category: 'Financial Inclusion',
    metrics: [
      { label: 'First-time Borrowers', value: '68%', change: '+5%' },
      { label: 'Savings Account Adoption', value: '84%', change: '+18%' },
      { label: 'Digital Payment Usage', value: '91%', change: '+23%' }
    ]
  },
  {
    category: 'Social Impact',
    metrics: [
      { label: 'Women Empowerment Index', value: '78%', change: '+10%' },
      { label: 'Children School Enrollment', value: '89%', change: '+7%' },
      { label: 'Healthcare Access', value: '76%', change: '+14%' }
    ]
  }
];

const reportingStandards = [
  {
    name: 'SMART Campaign',
    logo: 'SC',
    description: 'Client Protection Certification',
    status: 'Certified'
  },
  {
    name: 'MIX Market',
    logo: 'MIX',
    description: 'Global microfinance reporting',
    status: 'Compliant'
  },
  {
    name: 'CERISE SPI',
    logo: 'SPI',
    description: 'Social Performance Indicators',
    status: 'Aligned'
  },
  {
    name: 'PPI Network',
    logo: 'PPI',
    description: 'Poverty measurement tool',
    status: 'Integrated'
  },
  {
    name: 'UN SDGs',
    logo: 'SDG',
    description: 'Sustainable Development Goals',
    status: 'Tracking'
  },
  {
    name: 'SPTF Standards',
    logo: 'SPTF',
    description: 'Social Performance Task Force',
    status: 'Compliant'
  }
];

export default function ImpactMeasurement() {
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
            className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            📊 Impact Measurement
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Social Impact & Financial Inclusion Tracking
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Comprehensive impact measurement tools aligned with international standards. 
            Track poverty reduction, social outcomes, and financial inclusion progress with precision.
          </motion.p>
        </motion.div>

        {/* Impact Metrics Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {impactMetrics.map((metric) => (
            <motion.div
              key={metric.id}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-transform duration-200">
                  {metric.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {metric.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {metric.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-3 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Dashboard */}
        <motion.div
          className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-orange-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Real-time Impact Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Live tracking of key social and financial inclusion indicators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactDashboard.map((category, index) => (
              <motion.div
                key={category.category}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                  {category.category}
                </h4>
                <div className="space-y-4">
                  {category.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{metric.label}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">{metric.value}</span>
                        <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Reporting Standards */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              International Standards Alignment
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Compliant with leading microfinance and social performance standards
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {reportingStandards.map((standard, index) => (
              <motion.div
                key={standard.name}
                className="flex flex-col items-center group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-3 group-hover:bg-orange-100 dark:group-hover:bg-orange-900 transition-colors duration-200">
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 font-bold text-sm transition-colors duration-200">
                    {standard.logo}
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {standard.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {standard.description}
                  </div>
                  <div className="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded">
                    {standard.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.button 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Impact Report Template
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </motion.button>
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
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-orange-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Start Measuring Your Social Impact
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join leading MFIs who are already tracking their social impact and demonstrating meaningful change 
              in their communities with comprehensive measurement tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Impact Demo
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </motion.button>
              <motion.button 
                className="inline-flex items-center px-6 py-3 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400 dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Impact Guide
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
