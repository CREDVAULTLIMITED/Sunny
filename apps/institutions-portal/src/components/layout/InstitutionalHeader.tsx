'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../providers/ThemeProvider';

// Navigation items for institutional portal
const navigationItems = [
  {
    name: 'Solutions',
    href: '/solutions',
    dropdown: [
      { name: 'Commercial Banks', href: '/solutions/banks', icon: '🏛️' },
      { name: 'SACCOs', href: '/solutions/saccos', icon: '👥' },
      { name: 'Microfinance', href: '/solutions/microfinance', icon: '💰' },
      { name: 'Fintech', href: '/solutions/fintech', icon: '💻' },
      { name: 'Payment Processors', href: '/solutions/processors', icon: '💳' },
      { name: 'Remittance Services', href: '/solutions/remittance', icon: '🌍' },
    ]
  },
  {
    name: 'Platform',
    href: '/platform',
    dropdown: [
      { name: 'Core Banking Integration', href: '/platform/core-banking', icon: '🔗' },
      { name: 'API Gateway', href: '/platform/api', icon: '⚡' },
      { name: 'White-label Solutions', href: '/platform/white-label', icon: '🎨' },
      { name: 'Analytics Dashboard', href: '/platform/analytics', icon: '📊' },
      { name: 'Compliance Tools', href: '/platform/compliance', icon: '✅' },
      { name: 'Security Center', href: '/platform/security', icon: '🔒' },
    ]
  },
  {
    name: 'Resources',
    href: '/resources',
    dropdown: [
      { name: 'Documentation', href: '/docs', icon: '📚' },
      { name: 'API Reference', href: '/api-docs', icon: '🔧' },
      { name: 'Case Studies', href: '/case-studies', icon: '📈' },
      { name: 'Webinars', href: '/webinars', icon: '🎥' },
      { name: 'Regulatory Updates', href: '/regulatory', icon: '📋' },
      { name: 'Download Center', href: '/downloads', icon: '⬇️' },
    ]
  },
  {
    name: 'Pricing',
    href: '/pricing'
  },
  {
    name: 'Support',
    href: '/support',
    dropdown: [
      { name: 'Help Center', href: '/help', icon: '❓' },
      { name: 'Contact Support', href: '/contact', icon: '💬' },
      { name: 'Technical Support', href: '/technical-support', icon: '🛠️' },
      { name: 'Training', href: '/training', icon: '🎓' },
      { name: 'Status Page', href: '/status', icon: '📡' },
    ]
  }
];

// Mobile menu component
const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-slate-800 shadow-xl z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      {item.name}
                    </a>
                    {item.dropdown && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                          >
                            <span className="mr-2">{subItem.icon}</span>
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    Sign In
                  </button>
                  <button className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Dropdown menu component
const DropdownMenu = ({ items, isOpen }: { items: any[]; isOpen: boolean }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-2">
            {items.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors group"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <span className="mr-3 text-lg group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function InstitutionalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, actualTheme, toggleTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-lg border-b border-slate-200/50 dark:border-slate-700/50' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="relative">
                {/* Logo background with gradient - matching marketing site */}
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
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
                <span className={`text-xl lg:text-2xl font-bold tracking-tight transition-colors ${
                  isScrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'
                }`}>
                  Sunny
                </span>
                <span className={`text-xs lg:text-sm font-medium -mt-1 transition-colors ${
                  isScrolled ? 'text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  Institutions
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.a
                    href={item.href}
                                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${
                        isScrolled 
                          ? 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-green-50/80 hover:text-green-600'
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                    {item.dropdown && (
                      <motion.svg 
                        className="ml-1 h-4 w-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    )}
                  </motion.a>
                  
                  {item.dropdown && (
                    <DropdownMenu 
                      items={item.dropdown} 
                      isOpen={activeDropdown === item.name} 
                    />
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons & Mobile Menu */}
            <div className="flex items-center space-x-3">
              {/* Desktop CTAs */}
              <div className="hidden lg:flex items-center space-x-3">
                <motion.button
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isScrolled 
                      ? 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-green-50/80 hover:text-green-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg"
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgb(34 197 94 / 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </div>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-green-50/80 hover:text-green-600'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {actualTheme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800' 
                    : 'text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}
