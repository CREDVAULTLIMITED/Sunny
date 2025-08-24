'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../providers/ThemeProvider';
import {
  BookOpenIcon,
  CodeBracketIcon,
  LinkIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  RocketLaunchIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  ArrowLeftIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  DocsInstitutionType,
  INSTITUTION_CONFIGS
} from '@sunny/shared-types';

// Docs-specific navigation structure
const docsNavigation = [
  {
    name: 'Getting Started',
    href: '/resources/docs/getting-started',
    icon: RocketLaunchIcon,
    description: 'Quick setup and onboarding',
    popular: true,
  },
  {
    name: 'API Reference',
    href: '/resources/docs/api',
    icon: CodeBracketIcon,
    description: 'Complete API documentation',
    dropdown: [
      { name: 'Authentication', href: '/resources/docs/api/auth', icon: '🔐' },
      { name: 'Payments', href: '/resources/docs/api/payments', icon: '💳' },
      { name: 'Webhooks', href: '/resources/docs/api/webhooks', icon: '🔗' },
      { name: 'SDKs', href: '/resources/docs/api/sdks', icon: '📦' },
      { name: 'Rate Limits', href: '/resources/docs/api/rate-limits', icon: '⚡' },
    ]
  },
  {
    name: 'Integrations',
    href: '/resources/docs/integrations',
    icon: LinkIcon,
    description: 'Connect with external systems',
    dropdown: [
      { name: 'M-Pesa', href: '/resources/docs/integrations/mpesa', icon: '📱' },
      { name: 'Core Banking', href: '/resources/docs/integrations/core-banking', icon: '🏦' },
      { name: 'Government APIs', href: '/resources/docs/integrations/government', icon: '🏛️' },
      { name: 'Third-party Services', href: '/resources/docs/integrations/third-party', icon: '🔌' },
    ]
  },
  {
    name: 'Compliance',
    href: '/resources/docs/compliance',
    icon: ShieldCheckIcon,
    description: 'Regulatory requirements',
    required: true,
    dropdown: [
      { name: 'CBK Guidelines', href: '/resources/docs/compliance/cbk', icon: '🇰🇪' },
      { name: 'AML/CFT', href: '/resources/docs/compliance/aml-cft', icon: '🛡️' },
      { name: 'Data Protection', href: '/resources/docs/compliance/data-protection', icon: '🔒' },
      { name: 'PCI DSS', href: '/resources/docs/compliance/pci-dss', icon: '💳' },
    ]
  },
  {
    name: 'White-label',
    href: '/resources/docs/white-label',
    icon: PaintBrushIcon,
    description: 'Customization and branding',
    dropdown: [
      { name: 'Branding Setup', href: '/resources/docs/white-label/branding', icon: '🎨' },
      { name: 'Mobile Apps', href: '/resources/docs/white-label/mobile', icon: '📱' },
      { name: 'Web Portals', href: '/resources/docs/white-label/web', icon: '🌐' },
      { name: 'Custom Domains', href: '/resources/docs/white-label/domains', icon: '🔗' },
    ]
  },
  {
    name: 'Support',
    href: '/resources/docs/support',
    icon: WrenchScrewdriverIcon,
    description: 'Help and troubleshooting',
    dropdown: [
      { name: 'FAQ', href: '/resources/docs/support/faq', icon: '❓' },
      { name: 'Contact Support', href: '/resources/docs/support/contact', icon: '💬' },
      { name: 'Status Page', href: '/resources/docs/support/status', icon: '🟢' },
      { name: 'Community', href: '/resources/docs/support/community', icon: '👥' },
    ]
  }
];

// Institution selector for docs
const institutionTypes = [
  {
    id: DocsInstitutionType.COMMERCIAL_BANK,
    name: INSTITUTION_CONFIGS[DocsInstitutionType.COMMERCIAL_BANK].name,
    icon: INSTITUTION_CONFIGS[DocsInstitutionType.COMMERCIAL_BANK].icon,
    href: '/resources/docs/institutions/banks'
  },
  {
    id: DocsInstitutionType.SACCO,
    name: INSTITUTION_CONFIGS[DocsInstitutionType.SACCO].name,
    icon: INSTITUTION_CONFIGS[DocsInstitutionType.SACCO].icon,
    href: '/resources/docs/institutions/saccos'
  },
  {
    id: DocsInstitutionType.MICROFINANCE,
    name: INSTITUTION_CONFIGS[DocsInstitutionType.MICROFINANCE].name,
    icon: INSTITUTION_CONFIGS[DocsInstitutionType.MICROFINANCE].icon,
    href: '/resources/docs/institutions/mfi'
  },
  {
    id: DocsInstitutionType.FINTECH,
    name: INSTITUTION_CONFIGS[DocsInstitutionType.FINTECH].name,
    icon: INSTITUTION_CONFIGS[DocsInstitutionType.FINTECH].icon,
    href: '/resources/docs/institutions/fintech'
  },
  {
    id: DocsInstitutionType.PAYMENT_PROCESSOR,
    name: INSTITUTION_CONFIGS[DocsInstitutionType.PAYMENT_PROCESSOR].name,
    icon: INSTITUTION_CONFIGS[DocsInstitutionType.PAYMENT_PROCESSOR].icon,
    href: '/resources/docs/institutions/processors'
  },
  {
    id: DocsInstitutionType.REMITTANCE_SERVICE,
    name: INSTITUTION_CONFIGS[DocsInstitutionType.REMITTANCE_SERVICE].name,
    icon: INSTITUTION_CONFIGS[DocsInstitutionType.REMITTANCE_SERVICE].icon,
    href: '/resources/docs/institutions/remittance'
  }
];

interface DocsHeaderProps {
  currentPath?: string;
  showBreadcrumbs?: boolean;
}

export default function DocsHeader({ currentPath = '', showBreadcrumbs = true }: DocsHeaderProps) {
  const { actualTheme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
    };

    if (isMobileMenuOpen || activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
    
    return undefined;
  }, [isMobileMenuOpen, activeDropdown]);

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = () => {
    const pathSegments = currentPath.split('/').filter(Boolean);
    const breadcrumbs = [
      { name: 'Documentation', href: '/resources/docs' }
    ];

    let currentHref = '/resources/docs';
    for (let i = 0; i < pathSegments.length; i++) {
      if (pathSegments[i] !== 'resources' && pathSegments[i] !== 'docs') {
        currentHref += `/${pathSegments[i]}`;
        breadcrumbs.push({
          name: pathSegments[i] ? pathSegments[i].charAt(0).toUpperCase() + pathSegments[i].slice(1).replace('-', ' ') : '',
          href: currentHref
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = showBreadcrumbs ? generateBreadcrumbs() : [];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm w-full">
        <div className="w-full">
          {/* Mobile Header */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between px-4 py-4">
              {/* Left side - Menu button and logo */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  <Bars3Icon className="w-6 h-6" />
                </button>
                
                <Link href="/resources/docs" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      Sunny<span className="text-blue-600"> Docs</span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Right side - Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {actualTheme === 'dark' ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block">
            {/* Top bar with logo and back button */}
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-6">
                <Link
                  href="/"
                  className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors group"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">Back to Portal</span>
                </Link>
                
                <Link href="/resources/docs" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                    <BookOpenIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      Sunny<span className="text-blue-600"> Docs</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 -mt-0.5">
                      Documentation Portal
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-80 pl-10 pr-16 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-700 transition-all"
                  />
                  <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-500 dark:text-gray-400 font-mono">
                    ⌘K
                  </kbd>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Toggle theme"
                >
                  {actualTheme === 'dark' ? (
                    <SunIcon className="w-5 h-5" />
                  ) : (
                    <MoonIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

        {/* Main Navigation */}
        <div className="px-4 sm:px-6 lg:px-8">
          <nav className="hidden lg:flex items-center space-x-8 py-4">
            {docsNavigation.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentPath.startsWith(item.href)
                      ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span>{item.name}</span>
                  {item.popular && (
                    <span className="ml-2 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full font-medium flex items-center">
                      <StarIcon className="w-3 h-3 mr-1" />
                      Popular
                    </span>
                  )}
                  {item.required && (
                    <span className="ml-2 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full font-medium">
                      Required
                    </span>
                  )}
                  {item.dropdown && (
                    <ChevronDownIcon className="w-4 h-4 ml-2 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                    </div>
                    <div className="py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <span className="mr-3 text-base">{subItem.icon}</span>
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}

            {/* Institution Filter */}
            <div className="ml-8 flex items-center space-x-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Filter by:</span>
              <select
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue=""
                aria-label="Select institution type"
              >
                <option value="">All Institutions</option>
                {institutionTypes.map((institution) => (
                  <option key={institution.id} value={institution.id}>
                    {institution.icon} {institution.name}
                  </option>
                ))}
              </select>
            </div>
          </nav>
        </div>

            {/* Breadcrumbs - Desktop only */}
            {breadcrumbs.length > 1 && (
              <div className="px-4 sm:px-6 lg:px-8 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <nav className="flex items-center space-x-2 text-sm">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.href}>
                      {index > 0 && (
                        <span className="text-gray-400 dark:text-gray-500 mx-2">/</span>
                      )}
                      <Link
                        href={crumb.href}
                        className={`px-2 py-1 rounded-md transition-colors ${
                          index === breadcrumbs.length - 1
                            ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-700'
                        }`}
                      >
                        {crumb.name}
                      </Link>
                    </React.Fragment>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 lg:hidden shadow-xl flex flex-col"
            >
              {/* Sidebar Header - Fixed */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <Link href="/resources/docs" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      Sunny<span className="text-blue-600"> Docs</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">
                      Documentation Portal
                    </div>
                  </div>
                </Link>
                
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Close sidebar"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search - Fixed */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Back to Portal Link - Fixed */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <Link
                  href="/"
                  className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">Back to Portal</span>
                </Link>
              </div>

              {/* Scrollable Content Container */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {/* Mobile Navigation */}
                <nav className="p-4 space-y-2">
                  {docsNavigation.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <Link
                        href={item.href}
                        className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                          currentPath.startsWith(item.href)
                            ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="flex-1">{item.name}</span>
                        {item.popular && (
                          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full font-medium ml-2">
                            ★
                          </span>
                        )}
                        {item.required && (
                          <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full font-medium ml-2">
                            !
                          </span>
                        )}
                      </Link>
                      
                      {/* Mobile Dropdown Items */}
                      {item.dropdown && (
                        <div className="ml-8 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="mr-3 text-base flex-shrink-0">{subItem.icon}</span>
                              <span>{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile Institution Filter */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Filter by Institution
                  </label>
                  <select
                    className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue=""
                    aria-label="Select institution type"
                  >
                    <option value="">All Institutions</option>
                    {institutionTypes.map((institution) => (
                      <option key={institution.id} value={institution.id}>
                        {institution.icon} {institution.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bottom padding for scroll space */}
                <div className="h-4"></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
