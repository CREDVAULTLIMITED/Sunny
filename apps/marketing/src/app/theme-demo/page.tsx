'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { useTheme, useIsDarkMode, useThemeColors, useSafeTheme } from '@/lib/contexts/theme-context';
import { LabeledThemeToggle, CompactThemeToggle } from '@/components/ui/theme-toggle-safe';
import { 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon,
  SwatchIcon,
  PaintBrushIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function ThemeDemoPage() {
  const themeContext = useSafeTheme();
  
  // Fallback if theme context is not available
  if (!themeContext) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading theme system...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  const { theme, actualTheme, themeConfig } = themeContext;
  const isDarkMode = useIsDarkMode();
  const colors = useThemeColors();

  const colorGrid = [
    { name: 'Primary Background', value: colors.background.primary, key: 'bg-primary' },
    { name: 'Secondary Background', value: colors.background.secondary, key: 'bg-secondary' },
    { name: 'Tertiary Background', value: colors.background.tertiary, key: 'bg-tertiary' },
    { name: 'Elevated Background', value: colors.background.elevated, key: 'bg-elevated' },
    { name: 'Primary Text', value: colors.text.primary, key: 'text-primary' },
    { name: 'Secondary Text', value: colors.text.secondary, key: 'text-secondary' },
    { name: 'Tertiary Text', value: colors.text.tertiary, key: 'text-tertiary' },
    { name: 'Inverse Text', value: colors.text.inverse, key: 'text-inverse' },
    { name: 'Primary Border', value: colors.border.primary, key: 'border-primary' },
    { name: 'Secondary Border', value: colors.border.secondary, key: 'border-secondary' },
    { name: 'Accent Border', value: colors.border.accent, key: 'border-accent' },
  ];

  const statusColors = [
    { name: 'Success', value: colors.status.success, bg: 'bg-green-500' },
    { name: 'Warning', value: colors.status.warning, bg: 'bg-yellow-500' },
    { name: 'Error', value: colors.status.error, bg: 'bg-red-500' },
    { name: 'Info', value: colors.status.info, bg: 'bg-blue-500' },
  ];

  const gradients = [
    { name: 'Primary', value: themeConfig.gradients.primary },
    { name: 'Secondary', value: themeConfig.gradients.secondary },
    { name: 'Accent', value: themeConfig.gradients.accent },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="py-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center mb-6"
              >
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl mr-4">
                  <SwatchIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                  Theme System
                  <span className="text-green-600 dark:text-green-400 block">Demo</span>
                </h1>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
              >
                Experience our comprehensive theme system with smooth transitions between light and dark modes.
                The system automatically adapts to your system preferences and remembers your choice.
              </motion.p>

              {/* Theme Controls */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme Controls:</span>
                  <LabeledThemeToggle />
                  <CompactThemeToggle />
                </div>
              </motion.div>
            </div>

            {/* Current Theme Status */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <PaintBrushIcon className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                Current Theme Status
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center mb-4">
                    {theme === 'light' ? (
                      <SunIcon className="h-6 w-6 text-yellow-500 mr-2" />
                    ) : theme === 'dark' ? (
                      <MoonIcon className="h-6 w-6 text-blue-500 mr-2" />
                    ) : (
                      <ComputerDesktopIcon className="h-6 w-6 text-purple-500 mr-2" />
                    )}
                    <h3 className="font-semibold text-gray-900 dark:text-white">Selected Theme</h3>
                  </div>
                  <p className="text-lg font-medium text-green-600 dark:text-green-400 capitalize">
                    {theme}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    User preference
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center mb-4">
                    {actualTheme === 'light' ? (
                      <SunIcon className="h-6 w-6 text-yellow-500 mr-2" />
                    ) : (
                      <MoonIcon className="h-6 w-6 text-blue-500 mr-2" />
                    )}
                    <h3 className="font-semibold text-gray-900 dark:text-white">Active Theme</h3>
                  </div>
                  <p className="text-lg font-medium text-blue-600 dark:text-blue-400 capitalize">
                    {actualTheme}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Currently applied
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center mb-4">
                    <SparklesIcon className="h-6 w-6 text-purple-500 mr-2" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Dark Mode</h3>
                  </div>
                  <p className="text-lg font-medium text-purple-600 dark:text-purple-400">
                    {isDarkMode ? 'Enabled' : 'Disabled'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Current state
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Color Palette
            </h2>

            {/* Theme Colors */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Theme Colors
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {colorGrid.map((color) => (
                  <motion.div
                    key={color.key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                  >
                    <div
                      className="w-full h-16 rounded-lg mb-3 border border-gray-200 dark:border-gray-600"
                      style={{ backgroundColor: color.value }}
                    />
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {color.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {color.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Status Colors */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Status Colors
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statusColors.map((color) => (
                  <motion.div
                    key={color.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className={`w-full h-16 rounded-lg mb-3 ${color.bg}`} />
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {color.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {color.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gradients */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Theme Gradients
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {gradients.map((gradient, index) => (
                  <motion.div
                    key={gradient.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div
                      className="w-full h-24 rounded-lg mb-4"
                      style={{ background: gradient.value }}
                    />
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {gradient.name} Gradient
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-mono break-all">
                      {gradient.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Component Examples */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Component Examples
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Card Component
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  This card demonstrates how components adapt to theme changes with smooth transitions.
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Action Button
                </button>
              </motion.div>

              {/* Form Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Form Elements
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Input field"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Select option</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
              </motion.div>

              {/* Status Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Status Indicators
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">Success Status</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">Warning Status</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">Error Status</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

