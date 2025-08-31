'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../providers/ThemeProvider';
import {
  BookOpenIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  BugAntIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const footerSections = [
  {
    title: 'Documentation',
    links: [
      { name: 'Getting Started', href: '/resources/docs/getting-started' },
      { name: 'API Reference', href: '/resources/docs/api' },
      { name: 'Integration Guides', href: '/resources/docs/integrations' },
      { name: 'Compliance', href: '/resources/docs/compliance' },
      { name: 'White-label Solutions', href: '/resources/docs/white-label' },
    ]
  },
  {
    title: 'Institution Types',
    links: [
      { name: 'Commercial Banks', href: '/resources/docs/institutions/banks' },
      { name: 'SACCOs', href: '/resources/docs/institutions/saccos' },
      { name: 'Microfinance', href: '/resources/docs/institutions/mfi' },
      { name: 'Fintech Companies', href: '/resources/docs/institutions/fintech' },
      { name: 'Payment Processors', href: '/resources/docs/institutions/processors' },
      { name: 'Remittance Services', href: '/resources/docs/institutions/remittance' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Code Examples', href: '/resources/docs/examples' },
      { name: 'Video Tutorials', href: '/resources/docs/videos' },
      { name: 'Case Studies', href: '/resources/case-studies' },
      { name: 'Changelog', href: '/resources/docs/changelog' },
      { name: 'Roadmap', href: '/resources/docs/roadmap' },
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '/resources/docs/support' },
      { name: 'Contact Support', href: '/resources/docs/support/contact' },
      { name: 'Community Forum', href: '/resources/docs/support/community' },
      { name: 'Report Bug', href: '/resources/docs/support/bug-report' },
      { name: 'Feature Request', href: '/resources/docs/support/feature-request' },
    ]
  },
];

const quickActions = [
  {
    name: 'Improve this page',
    icon: HeartIcon,
    href: '#',
    description: 'Help us improve this documentation'
  },
  {
    name: 'Join community',
    icon: ChatBubbleLeftRightIcon,
    href: '/resources/docs/support/community',
    description: 'Connect with other developers'
  },
  {
    name: 'Report issue',
    icon: BugAntIcon,
    href: '/resources/docs/support/bug-report',
    description: 'Found a problem? Let us know'
  },
  {
    name: 'Get help',
    icon: QuestionMarkCircleIcon,
    href: '/resources/docs/support',
    description: 'Need assistance with integration?'
  },
];

export default function DocsFooter() {
  const { actualTheme } = useTheme();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      {/* Quick Actions Bar */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Was this page helpful?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Help us improve our documentation
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <motion.div
                key={action.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={action.href}
                  className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 group"
                >
                  <action.icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {action.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                    {action.description}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo and Description */}
            <div className="flex items-center mb-6 md:mb-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpenIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Sunny Docs
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Financial Institution Documentation
                  </div>
                </div>
              </div>
            </div>

            {/* Links and Copyright */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/resources/docs/changelog"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  v2.1.0
                </Link>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 Sunny Payments. All rights reserved.
              </div>
            </div>
          </div>
        </div>

        {/* Status and Build Info */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>All systems operational</span>
              </div>
              <Link 
                href="/resources/docs/support/status" 
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Status page
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <span>Last updated: 2025-01-16</span>
              <span>•</span>
              <span>Build: production</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
