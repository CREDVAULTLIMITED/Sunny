'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  UserCircleIcon,
  CreditCardIcon,
  BuildingOfficeIcon,
  CodeBracketIcon,
  PhoneIcon,
  DocumentTextIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { 
  BoltIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/solid';
import { CompactThemeToggle } from '@/components/ui/theme-toggle-safe';

// Types
interface NavItem {
  name: string;
  href?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
  badge?: string;
  external?: boolean;
}

interface MegaMenuSection {
  title: string;
  items: NavItem[];
}

// Navigation configuration
const navigation: NavItem[] = [
  {
    name: 'Products',
    children: [
      {
        name: 'Payment Gateway',
        href: '/payment-gateway',
        description: 'Accept payments globally with our secure API',
        icon: CreditCardIcon
      },
      {
        name: 'Checkout',
        href: '/checkout',
        description: 'Optimized checkout flows for higher conversion',
        icon: BoltIcon
      },
      {
        name: 'Subscriptions',
        href: '/subscriptions',
        description: 'Recurring billing and subscription management',
        icon: CurrencyDollarIcon,
        badge: 'Popular'
      },
      {
        name: 'Marketplace',
        href: '/marketplace',
        description: 'Split payments for multi-party transactions',
        icon: BuildingOfficeIcon
      },
      {
        name: 'Financial Services',
        href: '/financial-services',
        description: 'AI fraud detection, tax compliance, banking integrations',
        icon: ShieldCheckIcon
      },
      {
        name: 'Tax & Compliance',
        href: '/tax-compliance',
        description: 'Global tax calculation and regulatory compliance',
        icon: DocumentTextIcon,
        badge: 'New'
      }
    ]
  },
  {
    name: 'Solutions',
    children: [
      {
        name: 'E-commerce',
        href: '/solutions/ecommerce',
        description: 'Complete payment solutions for online stores'
      },
      {
        name: 'SaaS',
        href: '/solutions/saas',
        description: 'Subscription billing for software companies'
      },
      {
        name: 'Marketplaces',
        href: '/solutions/marketplaces',
        description: 'Multi-vendor payment processing'
      },
      {
        name: 'Financial Services',
        href: '/solutions/financial-services',
        description: 'AI-powered fintech ecosystem with comprehensive features'
      }
    ]
  },
  {
    name: 'Developers',
    children: [
      {
        name: 'Documentation',
        href: '/docs',
        description: 'Complete API reference and guides',
        icon: DocumentTextIcon
      },
      {
        name: 'API Reference',
        href: '/docs/api',
        description: 'Detailed endpoint documentation',
        icon: CodeBracketIcon
      },
      {
        name: 'Sunny CLI',
        href: '/cli',
        description: 'Python command-line interface with AI chat',
        icon: CodeBracketIcon,
        badge: 'AI Powered'
      },
      {
        name: 'SDKs & Libraries',
        href: '/docs/sdks',
        description: '20+ programming languages with icons and examples'
      },
      {
        name: 'API Playground',
        href: '/tools/playground',
        description: 'Interactive API testing environment'
      },
      {
        name: 'Security Tools',
        href: '/tools/security',
        description: 'Real-time security monitoring and compliance'
      },
      {
        name: 'Database Tools',
        href: '/tools/database',
        description: 'Migration and optimization utilities'
      }
    ]
  },
  {
    name: 'Enterprise',
    children: [
      {
        name: 'Admin Dashboard',
        href: '/enterprise/dashboard',
        description: 'TypeScript-based administrative interface',
        icon: DocumentTextIcon
      },
      {
        name: 'Analytics Platform',
        href: '/enterprise/analytics',
        description: 'Real-time analytics and reporting',
        icon: ChartBarIcon
      },
      {
        name: 'Go API Gateway',
        href: '/enterprise/api-gateway',
        description: 'High-performance scalable gateway',
        icon: CodeBracketIcon,
        badge: 'Enterprise'
      },
      {
        name: 'Infrastructure',
        href: '/enterprise/infrastructure',
        description: 'Load balancing, caching, monitoring'
      }
    ]
  },
  {
    name: 'Pricing',
    href: '/pricing'
  },
  {
    name: 'Company',
    children: [
      {
        name: 'About',
        href: '/about',
        description: 'Learn about our mission and team'
      },
      {
        name: 'Careers',
        href: '/careers',
        description: 'Join our growing team',
        badge: 'Hiring'
      },
      {
        name: 'News',
        href: '/news',
        description: 'Latest company updates and insights'
      },
      {
        name: 'Contact',
        href: '/contact',
        description: 'Get in touch with our team',
        icon: PhoneIcon
      }
    ]
  }
];

// Mega menu sections for Products
const productMegaMenu: MegaMenuSection[] = [
  {
    title: 'Core Products',
    items: [
      {
        name: 'Payment Gateway',
        href: '/payment-gateway',
        description: 'Accept payments from 190+ countries, 20+ methods',
        icon: CreditCardIcon
      },
      {
        name: 'Checkout',
        href: '/checkout',
        description: 'AI-optimized checkout with fraud detection',
        icon: BoltIcon
      },
      {
        name: 'Subscriptions',
        href: '/subscriptions',
        description: 'Recurring billing with tax management',
        icon: CurrencyDollarIcon,
        badge: 'Popular'
      }
    ]
  },
  {
    title: 'Advanced Features',
    items: [
      {
        name: 'Financial Services',
        href: '/financial-services',
        description: 'AI fraud detection, tax compliance, banking APIs',
        icon: ShieldCheckIcon
      },
      {
        name: 'Tax & Compliance',
        href: '/tax-compliance',
        description: 'Global tax calculation, GDPR, PCI DSS',
        icon: DocumentTextIcon,
        badge: 'New'
      },
      {
        name: 'Marketplace',
        href: '/marketplace',
        description: 'Multi-party payments with escrow',
        icon: BuildingOfficeIcon
      }
    ]
  },
  {
    title: 'AI & Enterprise',
    items: [
      {
        name: 'AI Fraud Detection',
        href: '/financial-services#ai-fraud',
        description: '99.97% accuracy ML fraud prevention',
        icon: ShieldCheckIcon,
        badge: 'AI Powered'
      },
      {
        name: 'Tax & Compliance Suite',
        href: '/financial-services#tax-compliance',
        description: '190+ countries automated compliance',
        icon: DocumentTextIcon
      },
      {
        name: 'Enterprise Infrastructure',
        href: '/financial-services#infrastructure',
        description: 'Load balancing, caching, monitoring',
        icon: ChartBarIcon
      }
    ]
  }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll behavior
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const direction = latest > lastScrollY ? 'down' : 'up';
    const isAtTop = latest < 10;
    
    setIsScrolled(latest > 20);
    
    if (isAtTop) {
      setIsVisible(true);
    } else if (direction === 'down' && latest > 100) {
      setIsVisible(false);
      setActiveDropdown(null);
    } else if (direction === 'up') {
      setIsVisible(true);
    }
    
    setLastScrollY(latest);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Handle dropdown interactions
  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownClick = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          isScrolled 
            ? 'border-gray-200/80 dark:border-gray-700/80 backdrop-blur-md shadow-sm bg-white/95 dark:bg-gray-900/95' 
            : 'border-transparent bg-white dark:bg-gray-900'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  {/* Logo background with gradient */}
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                    {/* Animated rays */}
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ 
                        opacity: 1,
                        boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* S letter with modern typography */}
                    <span className="text-white font-bold text-lg lg:text-xl relative z-10 font-mono">
                      S
                    </span>
                  </div>
                  
                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-green-400"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Sunny
                  </span>
                  <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 font-medium -mt-1">
                    Payments
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && handleDropdownEnter(item.name)}
                  onMouseLeave={() => item.children && handleDropdownLeave()}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        pathname === item.href
                          ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
                          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleDropdownClick(item.name)}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        activeDropdown === item.name
                          ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {item.name}
                      <ChevronDownIcon 
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-2 z-50"
                      >
                        {item.name === 'Products' ? (
                          // Mega menu for Products
                          <div className="w-[800px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
                            <div className="grid grid-cols-3 gap-6">
                              {productMegaMenu.map((section) => (
                                <div key={section.title}>
                                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                                    {section.title}
                                  </h3>
                                  <div className="space-y-1">
                                    {section.items.map((menuItem) => (
                                      <Link
                                        key={menuItem.name}
                                        href={menuItem.href!}
                                        className="group flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                      >
                                        {menuItem.icon && (
                                          <menuItem.icon className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                              {menuItem.name}
                                            </p>
                                            {menuItem.badge && (
                                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {menuItem.badge}
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                            {menuItem.description}
                                          </p>
                                        </div>
                                        <ArrowRightIcon className="h-4 w-4 text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* CTA Section */}
                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                      Ready to get started?
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                      Try our interactive demo
                                    </p>
                                  </div>
                                  <Link
                                    href="/demo"
                                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                                  >
                                    Try Demo
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Standard dropdown
                          <div className="w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4">
                            <div className="space-y-1">
                              {item.children.map((menuItem) => (
                                <Link
                                  key={menuItem.name}
                                  href={menuItem.href!}
                                  className="group flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                  {menuItem.icon && (
                                    <menuItem.icon className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                        {menuItem.name}
                                      </p>
                                      {menuItem.badge && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                          {menuItem.badge}
                                        </span>
                                      )}
                                    </div>
                                    {menuItem.description && (
                                      <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                        {menuItem.description}
                                      </p>
                                    )}
                                  </div>
                                  <ArrowRightIcon className="h-4 w-4 text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle & Language Selector - Desktop */}
              <div className="hidden lg:flex items-center space-x-3">
                <CompactThemeToggle />
                
                <button className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                  <GlobeAltIcon className="h-4 w-4 mr-1" />
                  <span>EN</span>
                  <ChevronDownIcon className="h-3 w-3 ml-1" />
                </button>
              </div>

              {/* Auth Buttons - Desktop */}
              <div className="hidden lg:flex items-center space-x-3">
                <Link
                  href="/sign-in"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <UserCircleIcon className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Get Started
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                aria-label="Toggle mobile menu"
                title="Toggle mobile menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Sunny</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="px-6 py-6 space-y-6">
                {/* Quick Actions */}
                <div className="space-y-3">
                  <Link
                    href="/sign-up"
                    className="flex items-center w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                  >
                    Get Started
                    <ArrowRightIcon className="ml-auto h-5 w-5" />
                  </Link>
                  
                  <Link
                    href="/sign-in"
                    className="flex items-center w-full px-4 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <UserCircleIcon className="h-5 w-5 mr-3" />
                    Sign In
                  </Link>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.href ? (
                        <Link
                          href={item.href}
                                                  className={`flex items-center w-full px-4 py-3 text-left font-medium rounded-xl transition-colors duration-200 ${
                          pathname === item.href
                            ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() => handleDropdownClick(item.name)}
                            className={`flex items-center justify-between w-full px-4 py-3 text-left font-medium rounded-xl transition-colors duration-200 ${
                              activeDropdown === item.name
                                ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                          >
                            {item.name}
                            <ChevronDownIcon 
                              className={`h-5 w-5 transition-transform duration-200 ${
                                activeDropdown === item.name ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          
                          <AnimatePresence>
                            {activeDropdown === item.name && item.children && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pr-4 pb-2 space-y-1">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.name}
                                      href={child.href!}
                                      className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 group"
                                    >
                                      {child.icon && (
                                        <child.icon className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                                            {child.name}
                                          </p>
                                          {child.badge && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                              {child.badge}
                                            </span>
                                          )}
                                        </div>
                                        {child.description && (
                                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {child.description}
                                          </p>
                                        )}
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Language & Additional Options */}
                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
                  <button className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors duration-200">
                    <GlobeAltIcon className="h-5 w-5 mr-3" />
                    Language: English
                    <ChevronDownIcon className="h-4 w-4 ml-auto" />
                  </button>
                  
                  <Link
                    href="/support"
                    className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors duration-200"
                  >
                    <PhoneIcon className="h-5 w-5 mr-3" />
                    Support
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
