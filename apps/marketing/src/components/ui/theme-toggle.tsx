'use client';

/**
 * Theme Toggle Component
 * Provides an elegant way to switch between light/dark/system themes
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';
import { useTheme, useSafeTheme } from '@/lib/contexts/theme-context';
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
    description: 'Light theme',
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: MoonIcon,
    description: 'Dark theme',
  },
  {
    value: 'system',
    label: 'System',
    icon: ComputerDesktopIcon,
    description: 'Follow system preference',
  },
];

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function ThemeToggle({ 
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

  // Don't render until mounted and context is available to prevent hydration mismatch
  if (!mounted || !themeContext) {
    return (
      <div className={`${variant === 'button' ? 'h-8 w-8' : 'h-10 w-10'} ${className}`}>
        {/* Placeholder skeleton */}
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-full" />
      </div>
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
        onClick={toggleTheme}
        className={`
          relative ${sizes.button} rounded-lg 
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700
          text-gray-700 dark:text-gray-300
          hover:bg-gray-50 dark:hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          transition-all duration-200
          flex items-center justify-center
          shadow-sm hover:shadow-md
          ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} theme`}
        title={`Currently ${actualTheme} theme. Click to toggle.`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={actualTheme}
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <CurrentIcon className={sizes.icon} />
          </motion.div>
        </AnimatePresence>
      </motion.button>
    );
  }

  // Dropdown selector
  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center space-x-2 px-3 py-2 rounded-lg
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700
          text-gray-700 dark:text-gray-300
          hover:bg-gray-50 dark:hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          transition-all duration-200
          shadow-sm hover:shadow-md
          ${sizes.dropdown}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Select theme"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CurrentIcon className={sizes.icon} />
        </motion.div>
        
        {showLabel && (
          <span className="font-medium">{currentThemeOption.label}</span>
        )}
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon className="h-4 w-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            
            {/* Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`
                absolute top-full left-0 mt-2 ${sizes.panel} z-50
                bg-white dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700
                rounded-xl shadow-xl
                py-2
              `}
              role="listbox"
              aria-label="Theme options"
            >
              {themeOptions.map((option, index) => {
                const OptionIcon = option.icon;
                const isSelected = theme === option.value;
                
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => {
                      setTheme(option.value);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 text-left
                      hover:bg-gray-50 dark:hover:bg-gray-700
                      transition-colors duration-150
                      ${isSelected ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}
                    `}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.1 }}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                  >
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      ${isSelected ? 'bg-green-100 dark:bg-green-900/40' : 'bg-gray-100 dark:bg-gray-700'}
                    `}>
                      <OptionIcon className={`h-4 w-4 ${isSelected ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-green-500 rounded-full"
                          />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {option.description}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
              
              {/* Current System Theme Indicator */}
              {theme === 'system' && (
                <div className="mx-4 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>System is using {actualTheme} theme</span>
                  </div>
                </div>
              )}
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
    <ThemeToggle 
      variant="button" 
      size="sm" 
      className={className}
    />
  );
}

// Theme toggle with label for settings pages
export function LabeledThemeToggle({ className = '' }: { className?: string }) {
  return (
    <ThemeToggle 
      variant="dropdown" 
      size="md" 
      showLabel={true}
      className={className}
    />
  );
}
