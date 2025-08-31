'use client';

import React from 'react';
import { motion } from 'framer-motion';

const institutionTypes = [
  {
    id: 'commercial-banks',
    title: 'Commercial Banks',
    description: 'Comprehensive payment solutions for traditional banking institutions with RTGS integration, correspondent banking, and forex management.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    features: [
      'RTGS & Swift Integration',
      'CBK Tier 1 Compliance',
      'Corporate Banking Solutions',
      'Multi-branch Management'
    ],
    badge: 'Enterprise',
    color: 'blue'
  },
  {
    id: 'saccos',
    title: 'SACCOs',
    description: 'Specialized solutions for Savings and Credit Cooperatives with member management, dividend calculations, and cooperative governance.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    features: [
      'Member Portal Integration',
      'SASRA Compliance',
      'Dividend Management',
      'Cooperative Workflows'
    ],
    badge: 'Popular',
    color: 'emerald'
  },
  {
    id: 'microfinance',
    title: 'Microfinance Institutions',
    description: 'Tailored solutions for MFIs with group lending, micro-insurance, and agricultural finance capabilities.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: [
      'Group Lending Support',
      'Mobile Money Integration',
      'Rural Payment Solutions',
      'Micro-insurance'
    ],
    color: 'amber'
  },
  {
    id: 'fintech',
    title: 'Fintech Companies',
    description: 'API-first architecture for digital financial service providers with rapid deployment and custom integrations.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: [
      'Developer-friendly APIs',
      'Rapid Deployment',
      'Webhook Management',
      'Sandbox Environment'
    ],
    badge: 'Tech-First',
    color: 'purple'
  },
  {
    id: 'payment-processors',
    title: 'Payment Processors',
    description: 'Multi-merchant management with settlement automation and aggregated reporting for third-party payment service providers.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    features: [
      'Multi-merchant Support',
      'PCI DSS Compliance',
      'Settlement Automation',
      'Merchant Onboarding'
    ],
    color: 'red'
  },
  {
    id: 'remittance',
    title: 'Remittance Services',
    description: 'Cross-border payment solutions with currency exchange and correspondent networks for international money transfer operators.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
      </svg>
    ),
    features: [
      'Cross-border Payments',
      'Currency Exchange',
      'AML/CFT Compliance',
      'Correspondent Banking'
    ],
    color: 'indigo'
  }
];

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50 hover:bg-blue-100',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      badge: 'bg-blue-600 text-white'
    },
    emerald: {
      bg: 'bg-emerald-50 hover:bg-emerald-100',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      badge: 'bg-emerald-600 text-white'
    },
    amber: {
      bg: 'bg-amber-50 hover:bg-amber-100',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      badge: 'bg-amber-600 text-white'
    },
    purple: {
      bg: 'bg-purple-50 hover:bg-purple-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      badge: 'bg-purple-600 text-white'
    },
    red: {
      bg: 'bg-red-50 hover:bg-red-100',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      badge: 'bg-red-600 text-white'
    },
    indigo: {
      bg: 'bg-indigo-50 hover:bg-indigo-100',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      badge: 'bg-indigo-600 text-white'
    }
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};

export default function InstitutionTypes() {
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
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-green-600 dark:text-green-400 mb-4">
            🏛️ Institution Types
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Solutions for Every Financial Institution
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Whether you're a traditional bank, a cooperative, or a modern fintech startup, 
            we have specialized solutions tailored to your institution's unique needs and 
            regulatory requirements.
          </p>
        </motion.div>

        {/* Institution Types Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {institutionTypes.map((type) => {
            const colors = getColorClasses(type.color);
            
            return (
              <motion.div
                key={type.id}
                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 cursor-pointer relative group ${colors.bg}`}
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Badge */}
                {type.badge && (
                  <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                    {type.badge}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 ${colors.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}>
                  <div className={colors.iconColor}>
                    {type.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {type.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <svg className={`w-4 h-4 mr-2 ${colors.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Learn More Link */}
                <div className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Don't see your institution type?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We work with all types of financial institutions. Contact our team to discuss 
              your specific requirements and how we can tailor our solutions for you.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200">
              Contact Our Team
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
