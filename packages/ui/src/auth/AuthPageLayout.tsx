'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface AuthPageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  className?: string;
}

export default function AuthPageLayout({
  children,
  title,
  subtitle,
  showBackButton = true,
  backButtonText = "Back to Home",
  backButtonHref = "/",
  className = '',
}: AuthPageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-green-900/20 ${className}`}>
      {/* Minimal Header */}
      <header className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-bold text-lg relative z-10 font-mono">S</span>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Sunny
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium -mt-1">
                  Payments
                </span>
              </div>
            </Link>

            {/* Back Button */}
            {showBackButton && (
              <Link
                href={backButtonHref}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{backButtonText}</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
            >
              {title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 text-base"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Auth Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8"
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-6">
              <span>© {new Date().getFullYear()} Sunny Payments</span>
              <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/support" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Support
              </Link>
              <Link href="/status" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                System Status
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
