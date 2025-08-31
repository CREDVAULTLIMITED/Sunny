'use client';

import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  variant?: 'default' | 'minimal';
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export default function Layout({ 
  children, 
  variant = 'default',
  showHeader = true,
  showFooter = true,
  className = '' 
}: LayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 ${className}`}>
      {/* Header */}
      {showHeader && <Header />}
      
      {/* Main Content */}
      <main className={`flex-1 ${showHeader ? 'pt-16 lg:pt-20' : ''}`}>
        {children}
      </main>
      
      {/* Footer */}
      {showFooter && variant === 'default' && <Footer />}
      
      {/* Minimal Footer for minimal variant */}
      {showFooter && variant === 'minimal' && (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8 transition-colors duration-300">
          <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">Sunny Payments</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <span>© {new Date().getFullYear()} Sunny Payments</span>
                <a href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a>
                <a href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</a>
                <a href="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

