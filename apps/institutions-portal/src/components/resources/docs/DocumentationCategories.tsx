'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../providers/ThemeProvider';
import {
  RocketLaunchIcon,
  CodeBracketIcon,
  LinkIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  ChartBarIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  ChevronRightIcon,
  ClockIcon,
  StarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  DocsCategoryType,
  DocsCategory,
  DocsDifficulty
} from '@sunny/shared-types';

export default function DocumentationCategories() {
  const { actualTheme } = useTheme();

  const docCategories: DocsCategoryType[] = [
    {
      id: DocsCategory.GETTING_STARTED,
      title: 'Getting Started',
      description: 'Quick setup guides and initial configuration',
      color: 'blue',
      estimatedTime: '30 min',
      difficulty: DocsDifficulty.BEGINNER,
      items: ['Institution Setup', 'Dashboard Overview', 'First Transaction', 'Basic Configuration'],
      badge: 'Essential'
    },
    {
      id: DocsCategory.API_DOCS,
      title: 'API Documentation',
      description: 'Complete API reference with interactive examples',
      color: 'green',
      estimatedTime: '2 hours',
      difficulty: DocsDifficulty.INTERMEDIATE,
      items: ['Authentication', 'Core Endpoints', 'Webhooks', 'SDKs & Libraries'],
      popular: true,
      badge: 'Interactive'
    },
    {
      id: DocsCategory.INTEGRATIONS,
      title: 'Integration Guides',
      description: 'Connect with external systems and services',
      color: 'purple',
      estimatedTime: '4-8 hours',
      difficulty: DocsDifficulty.ADVANCED,
      items: ['Core Banking', 'Mobile Money', 'Government APIs', 'Third-party Services'],
      popular: true
    },
    {
      id: DocsCategory.COMPLIANCE,
      title: 'Compliance & Security',
      description: 'Regulatory compliance and security guidelines',
      color: 'red',
      estimatedTime: '1-3 hours',
      difficulty: DocsDifficulty.INTERMEDIATE,
      items: ['CBK Compliance', 'AML/CFT', 'Data Protection', 'Security Best Practices'],
      mandatory: true,
      badge: 'Required'
    },
    {
      id: DocsCategory.WHITE_LABEL,
      title: 'White-label Solutions',
      description: 'Customize and brand your payment solutions',
      color: 'pink',
      estimatedTime: '2-6 hours',
      difficulty: DocsDifficulty.INTERMEDIATE,
      items: ['Branding Setup', 'Mobile Apps', 'Web Portals', 'Custom Domains']
    },
    {
      id: DocsCategory.ANALYTICS,
      title: 'Analytics & Reporting',
      description: 'Business intelligence and reporting tools',
      color: 'indigo',
      estimatedTime: '1-3 hours',
      difficulty: DocsDifficulty.INTERMEDIATE,
      items: ['Dashboard Analytics', 'Custom Reports', 'Data Export', 'Business Intelligence']
    },
    {
      id: DocsCategory.TRAINING,
      title: 'Training & Education',
      description: 'Learning paths and certification programs',
      color: 'yellow',
      estimatedTime: '4-12 weeks',
      difficulty: DocsDifficulty.BEGINNER,
      items: ['Learning Paths', 'Video Tutorials', 'Certifications', 'Best Practices']
    },
    {
      id: DocsCategory.SUPPORT,
      title: 'Support & Troubleshooting',
      description: 'Get help and resolve issues quickly',
      color: 'orange',
      estimatedTime: '< 2 hours',
      difficulty: DocsDifficulty.BEGINNER,
      items: ['Common Issues', 'Error Codes', 'Diagnostic Tools', 'Contact Support']
    }
  ];

  const categoryIcons = {
    [DocsCategory.GETTING_STARTED]: RocketLaunchIcon,
    [DocsCategory.API_DOCS]: CodeBracketIcon,
    [DocsCategory.INTEGRATIONS]: LinkIcon,
    [DocsCategory.COMPLIANCE]: ShieldCheckIcon,
    [DocsCategory.WHITE_LABEL]: PaintBrushIcon,
    [DocsCategory.ANALYTICS]: ChartBarIcon,
    [DocsCategory.TRAINING]: AcademicCapIcon,
    [DocsCategory.SUPPORT]: WrenchScrewdriverIcon,
  };

  const getDifficultyColor = (difficulty: DocsDifficulty) => {
    switch (difficulty) {
      case DocsDifficulty.BEGINNER: 
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700';
      case DocsDifficulty.INTERMEDIATE: 
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700';
      case DocsDifficulty.ADVANCED: 
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700';
      default: 
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; hover: string }> = {
      blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-700', hover: 'hover:border-blue-300 dark:hover:border-blue-600' },
      green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-700', hover: 'hover:border-green-300 dark:hover:border-green-600' },
      purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-700', hover: 'hover:border-purple-300 dark:hover:border-purple-600' },
      red: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-700', hover: 'hover:border-red-300 dark:hover:border-red-600' },
      orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-700', hover: 'hover:border-orange-300 dark:hover:border-orange-600' },
      pink: { bg: 'bg-pink-50 dark:bg-pink-900/20', text: 'text-pink-700 dark:text-pink-300', border: 'border-pink-200 dark:border-pink-700', hover: 'hover:border-pink-300 dark:hover:border-pink-600' },
      indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-700', hover: 'hover:border-indigo-300 dark:hover:border-indigo-600' },
      yellow: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-300', border: 'border-yellow-200 dark:border-yellow-700', hover: 'hover:border-yellow-300 dark:hover:border-yellow-600' },
    };
    return colorMap[color] || colorMap.blue;
  };

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
            Explore Documentation
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Comprehensive guides and references to help you build, integrate, and optimize your payment infrastructure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {docCategories.map((category, index) => {
            const IconComponent = categoryIcons[category.id];
            const colors = getColorClasses(category.color);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={`/resources/docs/${category.id}`}>
                  <div className={`relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 ${colors.hover} hover:shadow-lg transition-all duration-200 p-6 h-full`}>
                    {/* Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-1">
                      {category.popular && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
                          Popular
                        </span>
                      )}
                      {category.mandatory && (
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full font-medium flex items-center">
                          <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
                          Required
                        </span>
                      )}
                      {category.badge && (
                        <span className={`px-2 py-1 ${colors.bg} ${colors.text} text-xs rounded-full font-medium border ${colors.border}`}>
                          {category.badge}
                        </span>
                      )}
                    </div>

                    {/* Icon and Title */}
                    <div className="flex items-start mb-4">
                      <div className={`${colors.bg} p-3 rounded-xl group-hover:scale-110 transition-transform duration-200 mr-4`}>
                        <IconComponent className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {category.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
                      {category.estimatedTime && (
                        <div className="flex items-center">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {category.estimatedTime}
                        </div>
                      )}
                      {category.difficulty && (
                        <span className={`px-2 py-1 rounded-full font-medium border ${getDifficultyColor(category.difficulty)}`}>
                          {category.difficulty}
                        </span>
                      )}
                    </div>

                    {/* Items */}
                    <div className="space-y-2 mb-4">
                      {category.items.slice(0, 3).map((item) => (
                        <div key={item} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')} mr-2`} />
                          {item}
                        </div>
                      ))}
                      {category.items.length > 3 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          +{category.items.length - 3} more topics
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className={`inline-flex items-center text-sm font-medium ${colors.text} group-hover:translate-x-1 transition-transform duration-200`}>
                      Explore {category.title}
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
