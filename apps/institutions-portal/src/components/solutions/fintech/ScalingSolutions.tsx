'use client';

import React from 'react';
import { motion } from 'framer-motion';

const scalingStages = [
  {
    stage: 'MVP',
    title: 'Rapid Prototyping',
    description: 'Get your fintech MVP to market in weeks, not months',
    features: [
      'Sandbox environment',
      'Pre-built components',
      'Basic compliance tools',
      'Developer support'
    ],
    timeline: '2-4 weeks',
    users: '< 1K users',
    color: 'from-green-400 to-green-600',
    icon: '🚀'
  },
  {
    stage: 'Growth',
    title: 'Scale with Confidence',
    description: 'Advanced features and infrastructure as you grow',
    features: [
      'Auto-scaling infrastructure',
      'Advanced analytics',
      'Multi-region deployment',
      'Priority support'
    ],
    timeline: '1-3 months',
    users: '1K - 100K users',
    color: 'from-blue-400 to-blue-600',
    icon: '📈'
  },
  {
    stage: 'Enterprise',
    title: 'Global Operations',
    description: 'Enterprise-grade infrastructure for global fintech',
    features: [
      'Custom infrastructure',
      'Dedicated support team',
      'Global compliance',
      'SLA guarantees'
    ],
    timeline: 'Ongoing',
    users: '100K+ users',
    color: 'from-purple-400 to-purple-600',
    icon: '🏢'
  }
];

const infrastructureFeatures = [
  {
    title: 'Auto-Scaling Infrastructure',
    description: 'Automatically scale your infrastructure based on demand',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    ),
    benefits: ['Zero downtime', 'Cost optimization', 'Performance guarantee']
  },
  {
    title: 'Global Data Centers',
    description: 'Deploy your fintech globally with low-latency infrastructure',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    benefits: ['Low latency', 'Data sovereignty', 'Disaster recovery']
  },
  {
    title: 'Real-time Monitoring',
    description: 'Comprehensive monitoring and alerting for your applications',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    benefits: ['Proactive alerts', 'Performance insights', 'Issue prevention']
  },
  {
    title: 'Security & Compliance',
    description: 'Enterprise security with automated compliance monitoring',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    benefits: ['SOC 2 compliance', 'Data encryption', 'Audit trails']
  }
];

const growthMetrics = [
  {
    title: 'Time to Market',
    before: '12-18 months',
    after: '4-8 weeks',
    improvement: '80% faster',
    icon: '⚡'
  },
  {
    title: 'Development Cost',
    before: '$500K - $2M',
    after: '$50K - $200K',
    improvement: '70% reduction',
    icon: '💰'
  },
  {
    title: 'Compliance Time',
    before: '6-12 months',
    after: '2-4 weeks',
    improvement: '90% faster',
    icon: '✅'
  },
  {
    title: 'Infrastructure Costs',
    before: '$20K/month',
    after: '$5K/month',
    improvement: '75% savings',
    icon: '📊'
  }
];

export default function ScalingSolutions() {
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
            className="text-sm font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            📈 Scaling Solutions
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Scale from MVP to Enterprise
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Our platform grows with your fintech business. From rapid prototyping to global operations, 
            we provide the infrastructure and tools you need at every stage.
          </motion.p>
        </motion.div>

        {/* Scaling Stages */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {scalingStages.map((stage, index) => (
            <motion.div
              key={stage.stage}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Stage Badge */}
              <div className={`absolute -top-4 left-6 px-4 py-2 bg-gradient-to-r ${stage.color} text-white rounded-full text-sm font-semibold`}>
                {stage.stage}
              </div>

              {/* Icon */}
              <div className="text-4xl mb-4 mt-4">{stage.icon}</div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {stage.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {stage.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {stage.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-3 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">Timeline</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{stage.timeline}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">Scale</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{stage.users}</div>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              {index < scalingStages.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Infrastructure Features */}
        <motion.div
          className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-purple-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Enterprise Infrastructure Features
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Built for scale with enterprise-grade reliability and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infrastructureFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <span
                          key={benefitIndex}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-xs rounded"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Growth Metrics */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Accelerate Your Growth
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              See how Sunny's platform accelerates fintech development and reduces costs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {growthMetrics.map((metric, index) => (
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
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">{metric.after}</span>
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
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Scaling Journey
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
