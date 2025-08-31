'use client';

import React from 'react';
import { motion } from 'framer-motion';

const memberServices = [
  {
    id: 'savings-accounts',
    category: 'Savings Products',
    description: 'Flexible savings solutions designed for cooperative members',
    items: [
      { 
        name: 'Ordinary Shares', 
        description: 'Basic membership shares with voting rights',
        rate: '6% p.a.',
        features: ['Voting rights', 'Dividend eligibility', 'Withdrawable', 'No minimum balance']
      },
      { 
        name: 'Deposit Shares', 
        description: 'Additional shares for enhanced returns',
        rate: '8% p.a.',
        features: ['Higher returns', 'Flexible contributions', 'Member benefits', 'Annual dividends']
      },
      { 
        name: 'Holiday Savings', 
        description: 'Seasonal savings for special occasions',
        rate: '10% p.a.',
        features: ['Goal-based saving', 'Automatic deposits', 'Bonus rewards', 'Easy withdrawals']
      }
    ],
    color: 'green'
  },
  {
    id: 'loan-products',
    category: 'Loan Products',
    description: 'Affordable credit solutions for member development',
    items: [
      { 
        name: 'Emergency Loans', 
        description: 'Quick access to funds for urgent needs',
        rate: '12% p.a.',
        features: ['Same-day approval', 'No collateral', '3x shares limit', 'Flexible repayment']
      },
      { 
        name: 'Development Loans', 
        description: 'Long-term financing for major investments',
        rate: '14% p.a.',
        features: ['Property purchase', 'Business expansion', 'Education funding', 'Up to 48 months']
      },
      { 
        name: 'Asset Financing', 
        description: 'Vehicle and equipment financing',
        rate: '16% p.a.',
        features: ['Vehicle loans', 'Equipment purchase', 'Competitive rates', 'Asset security']
      }
    ],
    color: 'emerald'
  },
  {
    id: 'digital-services',
    category: 'Digital Services',
    description: 'Modern digital solutions for member convenience',
    items: [
      { 
        name: 'Mobile App', 
        description: 'Full-featured mobile banking platform',
        rate: 'Free',
        features: ['Account access', 'Loan applications', 'Bill payments', 'Transaction history']
      },
      { 
        name: 'USSD Banking', 
        description: 'Basic banking via mobile phone',
        rate: 'KES 5/txn',
        features: ['Balance inquiry', 'Mini statements', 'Fund transfers', 'Airtime purchase']
      },
      { 
        name: 'Online Portal', 
        description: 'Web-based member portal',
        rate: 'Free',
        features: ['Account management', 'Loan tracking', 'E-statements', 'Document uploads']
      }
    ],
    color: 'teal'
  }
];

const memberBenefits = [
  {
    title: 'Member Ownership',
    description: 'Democratic ownership and control by members',
    icon: '👥',
    benefit: 'One member, one vote'
  },
  {
    title: 'Profit Sharing',
    description: 'Annual dividends based on SACCO performance',
    icon: '💰',
    benefit: 'Up to 12% dividend'
  },
  {
    title: 'Low Interest Rates',
    description: 'Competitive rates for member loans',
    icon: '📉',
    benefit: 'From 10% p.a.'
  },
  {
    title: 'Member Education',
    description: 'Financial literacy and cooperative training',
    icon: '🎓',
    benefit: 'Free workshops'
  }
];

const ServiceCard = ({ item, color, index }: { item: any, color: string, index: number }) => {
  const colorClasses = {
    green: 'from-green-500 to-green-600 group-hover:from-green-600 group-hover:to-green-700',
    emerald: 'from-emerald-500 to-emerald-600 group-hover:from-emerald-600 group-hover:to-emerald-700',
    teal: 'from-teal-500 to-teal-600 group-hover:from-teal-600 group-hover:to-teal-700'
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
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
            {item.name}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            {item.description}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} text-white`}>
          {item.rate}
        </div>
      </div>

      <div className="space-y-2">
        {item.features.map((feature: string, featureIndex: number) => (
          <div key={featureIndex} className="flex items-center text-sm">
            <svg className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="text-green-600 dark:text-green-400 font-medium text-sm hover:text-green-700 dark:hover:text-green-300 transition-colors">
          Learn More →
        </button>
      </div>
    </motion.div>
  );
};

export default function SaccoMemberServices() {
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
            className="text-sm font-semibold uppercase tracking-wide text-green-600 dark:text-green-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            👥 Member Services
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Comprehensive Member Solutions
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Tailored financial products and services designed specifically for SACCO members. 
            From savings and loans to digital banking solutions that drive community growth.
          </motion.p>
        </motion.div>

        {/* Member Services Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {memberServices.map((category) => (
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

              {/* Service Items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.items.map((item, index) => (
                  <ServiceCard 
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

        {/* Member Benefits */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-green-200 dark:border-gray-600">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Exclusive Member Benefits
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience the cooperative advantage with member-focused benefits and community-driven value
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {memberBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                >
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <span className="text-2xl">{benefit.icon}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    {benefit.description}
                  </p>
                  <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                    {benefit.benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Become a Member Today
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
