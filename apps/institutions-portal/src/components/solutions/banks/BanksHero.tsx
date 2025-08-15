'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Pre-defined values to avoid hydration mismatch
const predefinedShapes = [
  { left: 10, top: 20, width: 30, height: 25, opacity: 0.05, radius: 50, duration: 12, delay: 0 },
  { left: 70, top: 35, width: 20, height: 35, opacity: 0.07, radius: 8, duration: 14, delay: 1 },
  { left: 85, top: 10, width: 35, height: 30, opacity: 0.04, radius: 50, duration: 16, delay: 2 },
  { left: 30, top: 75, width: 25, height: 20, opacity: 0.06, radius: 8, duration: 10, delay: 3 },
  { left: 80, top: 80, width: 15, height: 40, opacity: 0.08, radius: 50, duration: 13, delay: 4 },
  { left: 5, top: 65, width: 40, height: 28, opacity: 0.05, radius: 8, duration: 15, delay: 5 },
];

const predefinedIcons = [
  { icon: '🏦', left: 15, top: 25, delay: 0 },
  { icon: '💳', left: 30, top: 55, delay: 1 },
  { icon: '📊', left: 45, top: 20, delay: 2 },
  { icon: '🔒', left: 60, top: 70, delay: 3 },
  { icon: '🌐', left: 75, top: 40, delay: 4 },
  { icon: '⚡', left: 90, top: 30, delay: 5 },
];

const AnimatedBackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Animated Shapes */}
      {predefinedShapes.map((shape, index) => (
        <motion.div
          key={index}
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
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}

      {/* Animated SVG Paths */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 600">
        <motion.path
          d="M0,300 Q300,200 600,250 T1200,200"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.path
          d="M0,400 Q300,350 600,380 T1200,320"
          stroke="rgba(59, 130, 246, 0.2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', delay: 1 }}
        />
      </svg>

      {/* Floating Icons */}
      <div className="absolute inset-0">
        {predefinedIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-20"
            style={{ left: `${item.left}%`, top: `${item.top}%` }}
            animate={{
              y: [-15, 15, -15],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const InteractiveButton = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}) => {
  const baseClasses = "inline-flex items-center px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform";
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl",
    secondary: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      {children}
    </motion.button>
  );
};

export default function BanksHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="text-center">
            {/* Subtitle */}
            <motion.p
              className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🏦
              </motion.span>
              {' '}Commercial Banking Solutions
            </motion.p>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Enterprise Banking
              </motion.span>
              <br />
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Infrastructure
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Comprehensive payment infrastructure designed for commercial banks. Seamlessly integrate with 
              <span className="text-blue-600 dark:text-blue-400 font-semibold"> RTGS, SWIFT, and core banking systems</span> 
              {' '}while ensuring CBK Tier 1 compliance and delivering exceptional customer experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <InteractiveButton variant="primary">
                Schedule Demo
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </InteractiveButton>
              <InteractiveButton variant="secondary">
                View Integration Guide
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </InteractiveButton>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Trusted by leading commercial banks across Kenya</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {['CBK Certified', 'SWIFT Ready', 'ISO 27001', 'PCI DSS Level 1'].map((cert, index) => (
                  <motion.div
                    key={cert}
                    className="h-12 w-32 bg-white/10 dark:bg-gray-800/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/5 dark:border-gray-700/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  >
                    <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Banking Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              {[
                { value: '25+', label: 'Commercial Banks', subtitle: 'Currently integrated' },
                { value: '99.99%', label: 'Uptime SLA', subtitle: 'Guaranteed availability' },
                { value: '$50B+', label: 'Processed', subtitle: 'Annual transaction volume' },
                { value: '<500ms', label: 'Processing', subtitle: 'Average response time' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                >
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.3 + index * 0.1, type: 'spring', stiffness: 100 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.subtitle}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <motion.svg
          className="w-full h-20 text-white dark:text-gray-900"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.path
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.6 }}
          />
        </motion.svg>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <div className="w-6 h-10 border-2 border-blue-400/30 dark:border-blue-300/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-blue-400/50 dark:bg-blue-300/50 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
