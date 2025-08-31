'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../providers/ThemeProvider';
import {
  RocketLaunchIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const quickStats = [
  {
    label: 'Setup Time',
    value: '15 mins',
    icon: ClockIcon,
    description: 'From account to first payment'
  },
  {
    label: 'Integration Steps',
    value: '3 Steps',
    icon: CheckCircleIcon,
    description: 'Simple onboarding process'
  },
  {
    label: 'Go Live',
    value: '< 1 hour',
    icon: RocketLaunchIcon,
    description: 'Start processing payments'
  }
];

const institutionTypes = [
  {
    name: 'Commercial Banks',
    description: 'Full banking solutions with CBK compliance',
    href: '/resources/docs/getting-started/commercial-banks',
    icon: '🏦',
    features: ['Core Banking Integration', 'CBK Reporting', 'Regulatory Compliance']
  },
  {
    name: 'SACCOs',
    description: 'Cooperative financial services platform',
    href: '/resources/docs/getting-started/saccos',
    icon: '🤝',
    features: ['Member Management', 'SASRA Compliance', 'Cooperative Tools']
  },
  {
    name: 'Microfinance',
    description: 'Micro-lending and financial inclusion',
    href: '/resources/docs/getting-started/microfinance',
    icon: '💰',
    features: ['Loan Management', 'Mobile Money', 'Agent Banking']
  },
  {
    name: 'Fintech Companies',
    description: 'Modern financial technology solutions',
    href: '/resources/docs/getting-started/fintech',
    icon: '⚡',
    features: ['API First', 'White-label Ready', 'Rapid Deployment']
  }
];

export default function GettingStartedHero() {

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
                <RocketLaunchIcon className="w-4 h-4 mr-2" />
                Getting Started with Sunny Payments
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Start Processing
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {' '}Payments{' '}
                </span>
                in Minutes
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Complete guide to integrating Sunny Payments into your financial institution. 
                From account setup to your first transaction, we'll get you up and running quickly.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
            >
              {quickStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl mb-4">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link
                href="/resources/docs/getting-started/quick-start"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg hover:shadow-xl group"
              >
                <span>Quick Start Guide</span>
                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/resources/docs/getting-started/institution-setup"
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Institution Setup
              </Link>
            </motion.div>
          </div>

          {/* Institution Type Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Institution Type
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Get tailored setup instructions and compliance guidelines specific to your institution type.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {institutionTypes.map((type, index) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <Link
                    href={type.href}
                    className="group block p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">{type.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {type.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {type.description}
                      </p>
                      
                      <div className="space-y-2">
                        {type.features.map((feature) => (
                          <div key={feature} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <CheckCircleIcon className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
