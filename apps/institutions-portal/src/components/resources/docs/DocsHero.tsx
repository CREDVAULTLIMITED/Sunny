'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../providers/ThemeProvider';
import {
  BookOpenIcon,
  SparklesIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline';

// Pre-defined demo steps to avoid hydration mismatch
const demoSteps = [
  {
    title: 'Institution Setup',
    description: 'Complete onboarding in minutes',
    icon: '🏗️'
  },
  {
    title: 'API Integration',
    description: 'Connect with your existing systems',
    icon: '🔌'
  },
  {
    title: 'Go Live',
    description: 'Start processing payments instantly',
    icon: '🚀'
  }
];

// Pre-defined floating elements
const predefinedShapes = [
  { left: 15, top: 25, width: 35, height: 28, opacity: 0.04, radius: 50, duration: 10, delay: 0 },
  { left: 65, top: 40, width: 25, height: 30, opacity: 0.06, radius: 8, duration: 12, delay: 1 },
  { left: 85, top: 15, width: 40, height: 35, opacity: 0.03, radius: 50, duration: 14, delay: 2 },
  { left: 35, top: 70, width: 30, height: 25, opacity: 0.05, radius: 8, duration: 9, delay: 3 },
  { left: 75, top: 75, width: 20, height: 40, opacity: 0.07, radius: 50, duration: 11, delay: 4 },
];

const predefinedIcons = [
  { icon: '📚', left: 10, top: 30, delay: 0 },
  { icon: '🔧', left: 25, top: 60, delay: 1 },
  { icon: '📊', left: 40, top: 25, delay: 2 },
  { icon: '🔒', left: 55, top: 75, delay: 3 },
  { icon: '🌍', left: 70, top: 45, delay: 4 },
  { icon: '⚡', left: 85, top: 35, delay: 5 },
];

// Animated background pattern component
const AnimatedBackgroundPattern = () => {
  const { actualTheme } = useTheme();
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            linear-gradient(90deg, ${actualTheme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)'} 1px, transparent 1px),
            linear-gradient(${actualTheme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)'} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating geometric shapes */}
      {predefinedShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            width: `${shape.width}px`,
            height: `${shape.height}px`,
            background: `rgba(59, 130, 246, ${shape.opacity})`,
            borderRadius: shape.radius === 50 ? '50%' : '8px',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 5, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating documentation icons */}
      <div className="absolute inset-0">
        {predefinedIcons.map(({ icon, left, top, delay }, index) => (
          <motion.div
            key={index}
            className={`absolute text-2xl ${actualTheme === 'dark' ? 'opacity-20' : 'opacity-20'}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: delay,
              ease: 'easeInOut',
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function DocsHero() {
  const { actualTheme } = useTheme();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [activeDemo, setActiveDemo] = useState(0);

  // Auto-rotate demo every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demoSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <AnimatedBackgroundPattern />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-indigo-50/80 to-purple-50/90 dark:from-gray-900/80 dark:via-gray-800/70 dark:to-gray-900/80" />
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                <SparklesIcon className="w-4 h-4 mr-2" />
                New: CBK Compliance Automation
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Payment Infrastructure{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Documentation
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                Everything you need to build, integrate, and scale payment solutions for your financial institution. 
                From quick start guides to advanced compliance automation.
              </p>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Trusted by leading financial institutions across Africa
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 opacity-60">
                {['CBK', 'SASRA', 'KBA', 'PCI DSS'].map((logo, index) => (
                  <motion.div 
                    key={logo}
                    className="h-10 w-20 bg-white/10 dark:bg-white/5 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/10 dark:border-white/5"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: actualTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.15)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">{logo}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <BookOpenIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Integration Demo
                  </h3>
                  <div className="flex space-x-1">
                    {demoSteps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveDemo(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === activeDemo 
                            ? 'bg-blue-600' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        aria-label={`Go to step ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl mb-4 flex items-center justify-center">
                    <div className="text-6xl">{demoSteps[activeDemo].icon}</div>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {demoSteps[activeDemo].title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {demoSteps[activeDemo].description}
                  </p>
                </motion.div>

                {/* Play button overlay */}
                <motion.button
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg opacity-0 hover:opacity-100 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Play demo video"
                >
                  <PlayCircleIcon className="w-8 h-8" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
