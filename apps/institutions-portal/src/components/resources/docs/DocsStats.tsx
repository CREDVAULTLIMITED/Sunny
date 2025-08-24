'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../providers/ThemeProvider';
import {
  UserGroupIcon,
  CodeBracketIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

interface Statistic {
  label: string;
  value: string;
  icon: React.ElementType;
  description?: string;
}

export default function DocsStats() {
  const { actualTheme } = useTheme();

  const stats: Statistic[] = [
    { 
      label: 'Active Institutions', 
      value: '450+', 
      icon: UserGroupIcon,
      description: 'Financial institutions using Sunny'
    },
    { 
      label: 'API Endpoints', 
      value: '127', 
      icon: CodeBracketIcon,
      description: 'Comprehensive API coverage'
    },
    { 
      label: 'Documentation Pages', 
      value: '600+', 
      icon: DocumentTextIcon,
      description: 'Detailed guides and references'
    },
    { 
      label: 'Developer Community', 
      value: '2.1K', 
      icon: UserGroupIcon,
      description: 'Active developers and integrators'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Trusted by Financial Institutions
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join hundreds of institutions already using Sunny for their payment infrastructure
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <div className="bg-blue-50 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              {stat.description && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.description}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
