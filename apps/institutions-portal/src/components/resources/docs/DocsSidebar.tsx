'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../providers/ThemeProvider';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  BookOpenIcon,
  PlayCircleIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  VideoCameraIcon,
  ClockIcon,
  StarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  DocsContentType,
  DocsDifficulty
} from '@sunny/shared-types';

interface SidebarSection {
  title: string;
  items: SidebarItem[];
  expanded?: boolean;
}

interface SidebarItem {
  title: string;
  href: string;
  type?: DocsContentType;
  difficulty?: DocsDifficulty;
  estimatedTime?: string;
  popular?: boolean;
  new?: boolean;
  required?: boolean;
  children?: SidebarItem[];
}

interface DocsSidebarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export default function DocsSidebar({ currentPath = '', onNavigate }: DocsSidebarProps) {
  const { actualTheme } = useTheme();
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started', 'api']);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const sidebarSections: SidebarSection[] = [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Quick Start',
          href: '/resources/docs/getting-started',
          type: DocsContentType.GUIDE,
          difficulty: DocsDifficulty.BEGINNER,
          estimatedTime: '15 min',
          popular: true,
        },
        {
          title: 'Institution Setup',
          href: '/resources/docs/getting-started/setup',
          type: DocsContentType.GUIDE,
          difficulty: DocsDifficulty.BEGINNER,
          estimatedTime: '30 min',
        },
        {
          title: 'First Transaction',
          href: '/resources/docs/getting-started/first-transaction',
          type: DocsContentType.TUTORIAL,
          difficulty: DocsDifficulty.BEGINNER,
          estimatedTime: '20 min',
        },
        {
          title: 'Dashboard Overview',
          href: '/resources/docs/getting-started/dashboard',
          type: DocsContentType.VIDEO,
          difficulty: DocsDifficulty.BEGINNER,
          estimatedTime: '12 min',
        },
      ]
    },
    {
      title: 'API Reference',
      items: [
        {
          title: 'Authentication',
          href: '/resources/docs/api/auth',
          type: DocsContentType.API,
          difficulty: DocsDifficulty.INTERMEDIATE,
          required: true,
          children: [
            { title: 'API Keys', href: '/resources/docs/api/auth/api-keys', type: DocsContentType.REFERENCE },
            { title: 'OAuth 2.0', href: '/resources/docs/api/auth/oauth', type: DocsContentType.REFERENCE },
            { title: 'JWT Tokens', href: '/resources/docs/api/auth/jwt', type: DocsContentType.REFERENCE },
          ]
        },
        {
          title: 'Payments API',
          href: '/resources/docs/api/payments',
          type: DocsContentType.API,
          difficulty: DocsDifficulty.INTERMEDIATE,
          popular: true,
          children: [
            { title: 'Create Payment', href: '/resources/docs/api/payments/create', type: DocsContentType.REFERENCE },
            { title: 'Get Payment', href: '/resources/docs/api/payments/get', type: DocsContentType.REFERENCE },
            { title: 'List Payments', href: '/resources/docs/api/payments/list', type: DocsContentType.REFERENCE },
            { title: 'Cancel Payment', href: '/resources/docs/api/payments/cancel', type: DocsContentType.REFERENCE },
          ]
        },
        {
          title: 'Webhooks',
          href: '/resources/docs/api/webhooks',
          type: DocsContentType.API,
          difficulty: DocsDifficulty.ADVANCED,
          children: [
            { title: 'Setup Webhooks', href: '/resources/docs/api/webhooks/setup', type: DocsContentType.GUIDE },
            { title: 'Event Types', href: '/resources/docs/api/webhooks/events', type: DocsContentType.REFERENCE },
            { title: 'Signature Verification', href: '/resources/docs/api/webhooks/verification', type: DocsContentType.GUIDE },
          ]
        },
        {
          title: 'SDKs & Libraries',
          href: '/resources/docs/api/sdks',
          type: DocsContentType.REFERENCE,
          difficulty: DocsDifficulty.BEGINNER,
          children: [
            { title: 'JavaScript SDK', href: '/resources/docs/api/sdks/javascript', type: DocsContentType.GUIDE },
            { title: 'Python SDK', href: '/resources/docs/api/sdks/python', type: DocsContentType.GUIDE },
            { title: 'PHP SDK', href: '/resources/docs/api/sdks/php', type: DocsContentType.GUIDE },
            { title: 'Java SDK', href: '/resources/docs/api/sdks/java', type: DocsContentType.GUIDE },
          ]
        },
      ]
    },
    {
      title: 'Integrations',
      items: [
        {
          title: 'M-Pesa Integration',
          href: '/resources/docs/integrations/mpesa',
          type: DocsContentType.GUIDE,
          difficulty: DocsDifficulty.INTERMEDIATE,
          estimatedTime: '45 min',
          popular: true,
          children: [
            { title: 'STK Push', href: '/resources/docs/integrations/mpesa/stk-push', type: DocsContentType.TUTORIAL },
            { title: 'C2B Payments', href: '/resources/docs/integrations/mpesa/c2b', type: DocsContentType.TUTORIAL },
            { title: 'B2C Transfers', href: '/resources/docs/integrations/mpesa/b2c', type: DocsContentType.TUTORIAL },
            { title: 'Transaction Status', href: '/resources/docs/integrations/mpesa/status', type: DocsContentType.REFERENCE },
          ]
        },
        {
          title: 'Core Banking Systems',
          href: '/resources/docs/integrations/core-banking',
          type: DocsContentType.GUIDE,
          difficulty: DocsDifficulty.ADVANCED,
          estimatedTime: '2 hours',
          children: [
            { title: 'Temenos T24', href: '/resources/docs/integrations/core-banking/temenos', type: DocsContentType.GUIDE },
            { title: 'Infosys Finacle', href: '/resources/docs/integrations/core-banking/finacle', type: DocsContentType.GUIDE },
            { title: 'Oracle Flexcube', href: '/resources/docs/integrations/core-banking/flexcube', type: DocsContentType.GUIDE },
            { title: 'Custom Integration', href: '/resources/docs/integrations/core-banking/custom', type: DocsContentType.GUIDE },
          ]
        },
        {
          title: 'Government APIs',
          href: '/resources/docs/integrations/government',
          type: DocsContentType.GUIDE,
          difficulty: DocsDifficulty.ADVANCED,
          required: true,
          children: [
            { title: 'KRA iTax', href: '/resources/docs/integrations/government/kra', type: DocsContentType.GUIDE },
            { title: 'CBK Reporting', href: '/resources/docs/integrations/government/cbk', type: DocsContentType.GUIDE },
            { title: 'SASRA Reporting', href: '/resources/docs/integrations/government/sasra', type: DocsContentType.GUIDE },
          ]
        },
      ]
    },
    {
      title: 'Compliance & Security',
      items: [
        {
          title: 'CBK Compliance',
          href: '/resources/docs/compliance/cbk',
          type: DocsContentType.GUIDE,
          difficulty: DocsDifficulty.INTERMEDIATE,
          required: true,
          new: true,
          children: [
            { title: 'Automated Reporting', href: '/resources/docs/compliance/cbk/reporting', type: DocsContentType.TUTORIAL },
            { title: 'Regulatory Forms', href: '/resources/docs/compliance/cbk/forms', type: DocsContentType.REFERENCE },
            { title: 'Compliance Dashboard', href: '/resources/docs/compliance/cbk/dashboard', type: DocsContentType.GUIDE },
          ]
        },
        {
          title: 'AML/CFT Guidelines',
          href: '/resources/docs/compliance/aml-cft',
          type: DocsContentType.GUIDE,
          difficulty: DocsDifficulty.INTERMEDIATE,
          required: true,
        },
        {
          title: 'Data Protection',
          href: '/resources/docs/compliance/data-protection',
          type: DocsContentType.GUIDE,
          difficulty: DocsDifficulty.INTERMEDIATE,
          required: true,
        },
        {
          title: 'PCI DSS Compliance',
          href: '/resources/docs/compliance/pci-dss',
          type: DocsContentType.GUIDE,
          difficulty: DocsDifficulty.ADVANCED,
          required: true,
        },
      ]
    },
    {
      title: 'White-label Solutions',
      items: [
        {
          title: 'Branding Setup',
          href: '/resources/docs/white-label/branding',
          type: DocsContentType.GUIDE,
          difficulty: DocsDifficulty.BEGINNER,
          estimatedTime: '30 min',
        },
        {
          title: 'Mobile App Builder',
          href: '/resources/docs/white-label/mobile',
          type: DocsContentType.TUTORIAL,
          difficulty: DocsDifficulty.INTERMEDIATE,
          estimatedTime: '2 hours',
        },
        {
          title: 'Web Portal Customization',
          href: '/resources/docs/white-label/web',
          type: DocsContentType.GUIDE,
          difficulty: DocsDifficulty.INTERMEDIATE,
          estimatedTime: '1 hour',
        },
      ]
    },
    {
      title: 'Support & Troubleshooting',
      items: [
        {
          title: 'Frequently Asked Questions',
          href: '/resources/docs/support/faq',
          type: DocsContentType.REFERENCE,
          difficulty: DocsDifficulty.BEGINNER,
        },
        {
          title: 'Error Codes Reference',
          href: '/resources/docs/support/error-codes',
          type: DocsContentType.REFERENCE,
          difficulty: DocsDifficulty.INTERMEDIATE,
        },
        {
          title: 'Diagnostic Tools',
          href: '/resources/docs/support/diagnostics',
          type: DocsContentType.GUIDE,
          difficulty: DocsDifficulty.INTERMEDIATE,
        },
        {
          title: 'Contact Support',
          href: '/resources/docs/support/contact',
          type: DocsContentType.GUIDE,
          difficulty: DocsDifficulty.BEGINNER,
        },
      ]
    },
  ];

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionTitle)
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const toggleItem = (itemHref: string) => {
    setExpandedItems(prev =>
      prev.includes(itemHref)
        ? prev.filter(i => i !== itemHref)
        : [...prev, itemHref]
    );
  };

  const getTypeIcon = (type: DocsContentType) => {
    switch (type) {
      case DocsContentType.API:
        return <CodeBracketIcon className="w-4 h-4" />;
      case DocsContentType.VIDEO:
        return <VideoCameraIcon className="w-4 h-4" />;
      case DocsContentType.TUTORIAL:
        return <PlayCircleIcon className="w-4 h-4" />;
      case DocsContentType.REFERENCE:
        return <DocumentTextIcon className="w-4 h-4" />;
      default:
        return <BookOpenIcon className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: DocsContentType) => {
    switch (type) {
      case DocsContentType.API:
        return 'text-green-600 dark:text-green-400';
      case DocsContentType.VIDEO:
        return 'text-purple-600 dark:text-purple-400';
      case DocsContentType.TUTORIAL:
        return 'text-blue-600 dark:text-blue-400';
      case DocsContentType.REFERENCE:
        return 'text-gray-600 dark:text-gray-400';
      default:
        return 'text-orange-600 dark:text-orange-400';
    }
  };

  const getDifficultyColor = (difficulty: DocsDifficulty) => {
    switch (difficulty) {
      case DocsDifficulty.BEGINNER:
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case DocsDifficulty.INTERMEDIATE:
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
      case DocsDifficulty.ADVANCED:
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleItemClick = (href: string) => {
    onNavigate?.(href);
  };

  return (
    <aside className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Documentation
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Complete guides and API references
          </p>
        </div>

        <nav className="space-y-2">
          {sidebarSections.map((section) => {
            const isExpanded = expandedSections.includes(section.title.toLowerCase().replace(/\s+/g, '-'));
            
            return (
              <div key={section.title} className="space-y-1">
                <button
                  onClick={() => toggleSection(section.title.toLowerCase().replace(/\s+/g, '-'))}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <span>{section.title}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 space-y-1"
                    >
                      {section.items.map((item) => {
                        const isActive = currentPath === item.href;
                        const hasChildren = item.children && item.children.length > 0;
                        const isItemExpanded = expandedItems.includes(item.href);

                        return (
                          <div key={item.href}>
                            <div className="flex items-center">
                              <Link
                                href={item.href}
                                onClick={() => handleItemClick(item.href)}
                                className={`flex-1 flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                                  isActive
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                }`}
                              >
                                <div className={`mr-2 ${getTypeColor(item.type || DocsContentType.GUIDE)}`}>
                                  {getTypeIcon(item.type || DocsContentType.GUIDE)}
                                </div>
                                <span className="flex-1 truncate">{item.title}</span>
                                
                                {/* Badges */}
                                <div className="flex items-center space-x-1 ml-2">
                                  {item.popular && (
                                    <StarIcon className="w-3 h-3 text-yellow-500" />
                                  )}
                                  {item.new && (
                                    <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">
                                      New
                                    </span>
                                  )}
                                  {item.required && (
                                    <ExclamationTriangleIcon className="w-3 h-3 text-red-500" />
                                  )}
                                  {item.difficulty && (
                                    <span className={`px-1.5 py-0.5 text-xs rounded-full font-medium ${getDifficultyColor(item.difficulty)}`}>
                                      {item.difficulty.charAt(0)}
                                    </span>
                                  )}
                                  {item.estimatedTime && (
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                      <ClockIcon className="w-3 h-3 mr-1" />
                                      {item.estimatedTime}
                                    </div>
                                  )}
                                </div>
                              </Link>

                              {hasChildren && (
                                <button
                                  onClick={() => toggleItem(item.href)}
                                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                  aria-label={`Toggle ${item.title} submenu`}
                                >
                                  <motion.div
                                    animate={{ rotate: isItemExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <ChevronDownIcon className="w-3 h-3" />
                                  </motion.div>
                                </button>
                              )}
                            </div>

                            {/* Children */}
                            {hasChildren && (
                              <AnimatePresence>
                                {isItemExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="ml-6 mt-1 space-y-1"
                                  >
                                    {item.children!.map((child) => {
                                      const isChildActive = currentPath === child.href;
                                      
                                      return (
                                        <Link
                                          key={child.href}
                                          href={child.href}
                                          onClick={() => handleItemClick(child.href)}
                                          className={`flex items-center px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                            isChildActive
                                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                              : 'text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'
                                          }`}
                                        >
                                          <div className={`mr-2 ${getTypeColor(child.type || DocsContentType.REFERENCE)}`}>
                                            {getTypeIcon(child.type || DocsContentType.REFERENCE)}
                                          </div>
                                          <span className="truncate">{child.title}</span>
                                        </Link>
                                      );
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            )}
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
