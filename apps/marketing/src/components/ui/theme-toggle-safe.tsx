'use client';

/**
 * Safe Theme Toggle Component
 * Provides an elegant way to switch between light/dark/system themes with proper error handling
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';
import { useSafeTheme } from '@/lib/contexts/theme-context';
import { Theme } from '@/lib/types/theme';

interface ThemeOption {
  value: Theme;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const themeOptions: ThemeOption[] = [
  {
    value: 'light',
    label: 'Light',
    icon: SunIcon,
    description: 'Light theme for better visibility during the day',
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: MoonIcon,
    description: 'Dark theme for reduced eye strain in low light',
  },
  {
    value: 'system',
    label: 'System',
    icon: ComputerDesktopIcon,
    description: 'Automatically switch based on your system preference',
  },
];

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function SafeThemeToggle({ 
  variant = 'dropdown', 
  size = 'md',
  showLabel = false,
  className = '' 
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Only access theme context after component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use safe theme hook to prevent errors during SSR
  const themeContext = useSafeTheme();

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`${variant === 'button' ? 'h-8 w-8' : 'h-10 w-10'} ${className}`}>
        {/* Placeholder skeleton */}
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-full" />
      </div>
    );
  }

  // If theme context is not available, render a fallback
  if (!themeContext) {
    return (
      <button
        className={`${variant === 'button' ? 'h-8 w-8' : 'h-10 w-10'} ${className} 
          flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 
          text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 
          transition-colors duration-200`}
        onClick={() => {
          // Fallback theme toggle using document class
          if (typeof window !== 'undefined') {
            const isDark = document.documentElement.classList.contains('dark');
            if (isDark) {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('sunny-theme', 'light');
            } else {
              document.documentElement.classList.add('dark');
              localStorage.setItem('sunny-theme', 'dark');
            }
          }
        }}
        title="Toggle theme"
      >
        <SunIcon className="h-5 w-5" />
      </button>
    );
  }

  const { theme, setTheme, toggleTheme, actualTheme } = themeContext;

  const currentThemeOption = themeOptions.find(option => option.value === theme) || themeOptions[0];
  const CurrentIcon = currentThemeOption.icon;

  // Size configurations
  const sizeClasses = {
    sm: {
      button: 'h-8 w-8 text-sm',
      icon: 'h-4 w-4',
      dropdown: 'text-sm',
      panel: 'w-48',
    },
    md: {
      button: 'h-10 w-10 text-base',
      icon: 'h-5 w-5',
      dropdown: 'text-sm',
      panel: 'w-52',
    },
    lg: {
      button: 'h-12 w-12 text-lg',
      icon: 'h-6 w-6',
      dropdown: 'text-base',
      panel: 'w-56',
    },
  };

  const sizes = sizeClasses[size];

  // Simple toggle button (cycles through light -> dark -> light)
  if (variant === 'button') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`${sizes.button} ${className} 
          flex items-center justify-center rounded-lg 
          bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          text-gray-700 dark:text-gray-300 
          hover:bg-gray-50 dark:hover:bg-gray-700 
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
          transition-all duration-200 shadow-sm hover:shadow-md`}
        title={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} theme`}
      >
        <motion.div
          key={actualTheme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentIcon className={sizes.icon} />
        </motion.div>
      </motion.button>
    );
  }

  // Dropdown variant
  return (
    <div className={`relative ${className}`}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${sizes.button} 
          flex items-center justify-center space-x-2 rounded-lg 
          bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          text-gray-700 dark:text-gray-300 
          hover:bg-gray-50 dark:hover:bg-gray-700 
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
          transition-all duration-200 shadow-sm hover:shadow-md`}
        title="Theme options"
      >
        <motion.div
          key={actualTheme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentIcon className={sizes.icon} />
        </motion.div>
        {showLabel && (
          <span className={`${sizes.dropdown} font-medium`}>
            {currentThemeOption.label}
          </span>
        )}
        <ChevronDownIcon 
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute right-0 mt-2 ${sizes.panel} z-50
                bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10
                overflow-hidden`}
            >
              <div className="py-2">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = theme === option.value;
                  
                  return (
                    <motion.button
                      key={option.value}
                      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                      onClick={() => {
                        setTheme(option.value);
                        setIsOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center space-x-3
                        ${sizes.dropdown} font-medium
                        ${isSelected 
                          ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }
                        transition-colors duration-150`}
                    >
                      <Icon className={`${sizes.icon} ${isSelected ? 'text-green-600 dark:text-green-400' : ''}`} />
                      <div className="flex-1">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {option.description}
                        </div>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Compact theme toggle for mobile/header use
export function CompactThemeToggle({ className = '' }: { className?: string }) {
  return (
    <SafeThemeToggle 
      variant="button" 
      size="sm"
      className={className}
    />
  );
}

// Theme toggle with label for settings pages
export function LabeledThemeToggle({ className = '' }: { className?: string }) {
  return (
    <SafeThemeToggle 
      variant="dropdown" 
      size="md" 
      showLabel={true}
      className={className}
    />
  );
}
