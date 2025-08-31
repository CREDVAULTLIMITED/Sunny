'use client';

import React from 'react';
import { motion } from 'framer-motion';

const groupLendingModels = [
  {
    id: 'solidarity-groups',
    title: 'Solidarity Groups',
    description: 'Traditional group lending with joint liability, peer support, and graduated lending cycles',
    icon: '🤝',
    features: [
      'Joint liability structure',
      'Peer selection process',
      'Group training programs',
      'Graduated loan amounts'
    ],
    stats: { members: '5-10', cycle: '16 weeks', rate: '94%' },
    color: 'orange'
  },
  {
    id: 'village-banking',
    title: 'Village Banking',
    description: 'Community-based financial services with local leadership and democratic governance',
    icon: '🏘️',
    features: [
      'Community ownership',
      'Local leader training',
      'Savings mobilization',
      'Democratic decision making'
    ],
    stats: { members: '30-50', cycle: '12 months', rate: '96%' },
    color: 'amber'
  },
  {
    id: 'self-help-groups',
    title: 'Self-Help Groups',
    description: 'Member-driven groups focused on savings, credit, and livelihood development',
    icon: '💪',
    features: [
      'Member-driven governance',
      'Compulsory savings',
      'Skill development',
      'Livelihood support'
    ],
    stats: { members: '10-20', cycle: '6 months', rate: '92%' },
    color: 'yellow'
  }
];

const lendingProcess = [
  {
    step: 1,
    title: 'Group Formation',
    description: 'Community members form groups with peer selection and training',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    step: 2,
    title: 'Capacity Building',
    description: 'Training on financial literacy, business skills, and group dynamics',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    step: 3,
    title: 'Credit Assessment',
    description: 'Group-based credit evaluation and loan sizing based on capacity',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2m-2 0v6a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2h-2m-2 0V9a2 2 0 00-2-2h-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h.01M7 13h.01M13 13h.01M13 7h.01" />
      </svg>
    )
  },
  {
    step: 4,
    title: 'Loan Disbursement',
    description: 'Mobile money disbursement with flexible scheduling options',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    step: 5,
    title: 'Monitoring & Support',
    description: 'Ongoing support, mentorship, and business development assistance',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    step: 6,
    title: 'Repayment & Graduation',
    description: 'Regular repayments with graduation to larger loans and individual credit',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )
  }
];

const GroupCard = ({ model, index }: { model: any, index: number }) => {
  const colorClasses = {
    orange: 'from-orange-500 to-orange-600 group-hover:from-orange-600 group-hover:to-orange-700',
    amber: 'from-amber-500 to-amber-600 group-hover:from-amber-600 group-hover:to-amber-700',
    yellow: 'from-yellow-500 to-yellow-600 group-hover:from-yellow-600 group-hover:to-yellow-700'
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{model.icon}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {model.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {model.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{model.stats.members}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Members</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{model.stats.cycle}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Cycle</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{model.stats.rate}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Repayment</div>
        </div>
      </div>

      <div className="space-y-3">
        {model.features.map((feature: string, featureIndex: number) => (
          <div key={featureIndex} className="flex items-center text-sm">
            <svg className="w-4 h-4 mr-3 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="text-orange-600 dark:text-orange-400 font-medium text-sm hover:text-orange-700 dark:hover:text-orange-300 transition-colors">
          Learn More →
        </button>
      </div>
    </motion.div>
  );
};

export default function GroupLending() {
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

  const processVariants = {
    hidden: { opacity: 0, y: 20 },
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
            className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            🤝 Group Lending Solutions
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Community-Based Microfinance Models
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Comprehensive group lending solutions that harness the power of community solidarity, 
            peer support, and social collateral to drive financial inclusion.
          </motion.p>
        </motion.div>

        {/* Group Models */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {groupLendingModels.map((model, index) => (
            <GroupCard key={model.id} model={model} index={index} />
          ))}
        </div>

        {/* Lending Process */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Group Lending Process
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our proven 6-step methodology for successful community-based microfinance
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {lendingProcess.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative"
                variants={processVariants}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {step.description}
                    </p>
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center text-orange-600 dark:text-orange-400">
                      {step.icon}
                    </div>
                  </div>
                </div>
                
                {/* Connection Line (except last item) */}
                {index < lendingProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-6 h-0.5 bg-gradient-to-r from-orange-300 to-transparent transform translate-x-2" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-orange-200 dark:border-gray-600"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Group Lending Success Metrics
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Proven results from our group lending implementations across East Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: '94%', label: 'Average Repayment Rate', description: 'Across all group models' },
              { metric: '2.1M', label: 'Lives Impacted', description: 'Through group lending programs' },
              { metric: '68%', label: 'Women Participation', description: 'Female group members' },
              { metric: 'KES 45K', label: 'Average Loan Size', description: 'Group member loan amount' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {stat.metric}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.button 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Group Lending Program
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
