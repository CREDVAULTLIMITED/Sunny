'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../providers/ThemeProvider';
import {
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  DocsInstitutionTypeType,
  DocsInstitutionType,
  INSTITUTION_CONFIGS
} from '@sunny/shared-types';

export default function InstitutionTypeSelector() {
  const { actualTheme } = useTheme();
  const [selectedInstitution, setSelectedInstitution] = useState<DocsInstitutionTypeType | null>(null);

  const institutionTypes: DocsInstitutionTypeType[] = [
    {
      id: DocsInstitutionType.COMMERCIAL_BANK,
      name: INSTITUTION_CONFIGS[DocsInstitutionType.COMMERCIAL_BANK].name,
      icon: INSTITUTION_CONFIGS[DocsInstitutionType.COMMERCIAL_BANK].icon,
      color: INSTITUTION_CONFIGS[DocsInstitutionType.COMMERCIAL_BANK].color,
      description: 'Traditional banking institutions with comprehensive financial services',
      features: ['Corporate Banking', 'Retail Banking', 'Treasury Management', 'RTGS Integration'],
      docs: 127,
      popular: true
    },
    {
      id: DocsInstitutionType.SACCO,
      name: INSTITUTION_CONFIGS[DocsInstitutionType.SACCO].name,
      icon: INSTITUTION_CONFIGS[DocsInstitutionType.SACCO].icon,
      color: INSTITUTION_CONFIGS[DocsInstitutionType.SACCO].color,
      description: 'Savings & Credit Cooperatives serving member communities',
      features: ['Member Management', 'Share Capital', 'Dividend Calculation', 'SASRA Compliance'],
      docs: 89
    },
    {
      id: DocsInstitutionType.MICROFINANCE,
      name: INSTITUTION_CONFIGS[DocsInstitutionType.MICROFINANCE].name,
      icon: INSTITUTION_CONFIGS[DocsInstitutionType.MICROFINANCE].icon,
      color: INSTITUTION_CONFIGS[DocsInstitutionType.MICROFINANCE].color,
      description: 'Microfinance institutions serving underbanked populations',
      features: ['Group Lending', 'Micro Insurance', 'Rural Payments', 'Impact Tracking'],
      docs: 76
    },
    {
      id: DocsInstitutionType.FINTECH,
      name: INSTITUTION_CONFIGS[DocsInstitutionType.FINTECH].name,
      icon: INSTITUTION_CONFIGS[DocsInstitutionType.FINTECH].icon,
      color: INSTITUTION_CONFIGS[DocsInstitutionType.FINTECH].color,
      description: 'Innovative financial technology companies',
      features: ['API-First', 'Digital Lending', 'Mobile Wallets', 'Real-time Processing'],
      docs: 156,
      popular: true
    },
    {
      id: DocsInstitutionType.PAYMENT_PROCESSOR,
      name: INSTITUTION_CONFIGS[DocsInstitutionType.PAYMENT_PROCESSOR].name,
      icon: INSTITUTION_CONFIGS[DocsInstitutionType.PAYMENT_PROCESSOR].icon,
      color: INSTITUTION_CONFIGS[DocsInstitutionType.PAYMENT_PROCESSOR].color,
      description: 'Payment processing and merchant services',
      features: ['Multi-Merchant', 'Settlement', 'Risk Management', 'Gateway Services'],
      docs: 98
    },
    {
      id: DocsInstitutionType.REMITTANCE_SERVICE,
      name: INSTITUTION_CONFIGS[DocsInstitutionType.REMITTANCE_SERVICE].name,
      icon: INSTITUTION_CONFIGS[DocsInstitutionType.REMITTANCE_SERVICE].icon,
      color: INSTITUTION_CONFIGS[DocsInstitutionType.REMITTANCE_SERVICE].color,
      description: 'International money transfer operations',
      features: ['Cross-Border', 'Exchange Rates', 'Compliance', 'Correspondent Banking'],
      docs: 67
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; hover: string }> = {
      blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-700', hover: 'hover:border-blue-300 dark:hover:border-blue-600' },
      green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-700', hover: 'hover:border-green-300 dark:hover:border-green-600' },
      purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-700', hover: 'hover:border-purple-300 dark:hover:border-purple-600' },
      orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-700', hover: 'hover:border-orange-300 dark:hover:border-orange-600' },
      indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-700', hover: 'hover:border-indigo-300 dark:hover:border-indigo-600' },
      teal: { bg: 'bg-teal-50 dark:bg-teal-900/20', text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-700', hover: 'hover:border-teal-300 dark:hover:border-teal-600' },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section className="py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Choose Your Institution Type
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get personalized documentation and guides tailored to your specific institution type and requirements.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutionTypes.map((institution, index) => (
            <motion.div
              key={institution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedInstitution(institution)}
              className={`group cursor-pointer relative bg-white dark:bg-gray-800 rounded-xl border-2 transition-all duration-200 p-6 ${
                selectedInstitution?.id === institution.id
                  ? 'border-blue-500 shadow-lg ring-4 ring-blue-100 dark:ring-blue-900/20'
                  : `border-gray-200 dark:border-gray-700 ${getColorClasses(institution.color).hover} hover:shadow-md`
              }`}
            >
              {institution.popular && (
                <div className="absolute -top-3 -right-3">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <StarIcon className="w-3 h-3 mr-1" />
                    Popular
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className={`text-4xl p-3 rounded-xl ${getColorClasses(institution.color).bg} group-hover:scale-110 transition-transform duration-200`}>
                  {institution.icon}
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getColorClasses(institution.color).text}`}>
                    {institution.docs}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">docs</div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                {institution.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {institution.description}
              </p>

              <div className="space-y-2">
                {institution.features.slice(0, 3).map((feature) => (
                  <div key={feature} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircleIcon className={`w-4 h-4 mr-2 ${getColorClasses(institution.color).text}`} />
                    {feature}
                  </div>
                ))}
                {institution.features.length > 3 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    +{institution.features.length - 3} more features
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className={`inline-flex items-center text-sm font-medium ${getColorClasses(institution.color).text} group-hover:translate-x-1 transition-transform duration-200`}>
                  View Documentation
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedInstitution && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedInstitution.name} Documentation
                </h3>
                <Link
                  href={`/resources/docs/institutions/${selectedInstitution.id}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Get Started
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedInstitution.features.map((feature) => (
                  <div key={feature} className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircleIcon className="w-5 h-5 mr-3 text-blue-700 dark:text-blue-300" />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
