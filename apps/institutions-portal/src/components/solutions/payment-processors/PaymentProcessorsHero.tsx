'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Pre-defined values to avoid hydration mismatch
const predefinedShapes = [
  { left: 8, top: 15, width: 28, height: 28, opacity: 0.08, radius: 50, duration: 14, delay: 0 },
  { left: 88, top: 20, width: 32, height: 32, opacity: 0.06, radius: 8, duration: 16, delay: 1 },
  { left: 78, top: 8, width: 24, height: 36, opacity: 0.09, radius: 50, duration: 13, delay: 2 },
  { left: 12, top: 80, width: 36, height: 24, opacity: 0.07, radius: 8, duration: 15, delay: 3 },
  { left: 92, top: 78, width: 20, height: 40, opacity: 0.05, radius: 50, duration: 17, delay: 4 },
  { left: 6, top: 55, width: 40, height: 20, opacity: 0.08, radius: 8, duration: 12, delay: 5 },
];

const predefinedIcons = [
  { icon: '💳', left: 15, top: 25, delay: 0 },
  { icon: '🔄', left: 28, top: 72, delay: 1 },
  { icon: '⚡', left: 68, top: 15, delay: 2 },
  { icon: '🛡️', left: 82, top: 82, delay: 3 },
  { icon: '📊', left: 90, top: 30, delay: 4 },
  { icon: '🌐', left: 95, top: 65, delay: 5 },
];

const processingConnections = [
  { x1: 180, y1: 120, x2: 320, y2: 180, delay: 0 },
  { x1: 380, y1: 140, x2: 520, y2: 200, delay: 0.4 },
  { x1: 580, y1: 160, x2: 720, y2: 130, delay: 0.8 },
  { x1: 780, y1: 150, x2: 920, y2: 210, delay: 1.2 },
  { x1: 980, y1: 190, x2: 1120, y2: 160, delay: 1.6 },
];

const AnimatedBackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Payment Processing Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px),
                           linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Animated Processing Shapes */}
      {predefinedShapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            width: `${shape.width}px`,
            height: `${shape.height}px`,
            background: `rgba(20, 184, 166, ${shape.opacity})`,
            borderRadius: shape.radius === 50 ? '50%' : '8px',
          }}
          animate={{
            y: [-12, 12, -12],
            x: [-6, 6, -6],
            rotate: shape.radius === 50 ? [0, 360] : [0, 45, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}

      {/* Processing Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1200 400">
        {processingConnections.map((connection, index) => (
          <motion.line
            key={index}
            x1={connection.x1}
            y1={connection.y1}
            x2={connection.x2}
            y2={connection.y2}
            stroke="rgba(20, 184, 166, 0.4)"
            strokeWidth="2"
            strokeDasharray="6,3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 2.5, 
              ease: 'easeInOut', 
              repeat: Infinity, 
              repeatType: 'reverse',
              delay: connection.delay 
            }}
          />
        ))}
        
        {/* Processing Nodes */}
        <motion.circle
          cx="200" cy="150" r="6"
          fill="rgba(20, 184, 166, 0.6)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.2 }}
        />
        <motion.circle
          cx="550" cy="180" r="6"
          fill="rgba(20, 184, 166, 0.6)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.8 }}
        />
        <motion.circle
          cx="850" cy="170" r="6"
          fill="rgba(20, 184, 166, 0.6)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 1.4 }}
        />
      </svg>

      {/* Floating Payment Icons */}
      <div className="absolute inset-0">
        {predefinedIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl opacity-12"
            style={{ left: `${item.left}%`, top: `${item.top}%` }}
            animate={{
              y: [-10, 10, -10],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 4 + index,
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
    primary: "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl",
    secondary: "border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white shadow-lg hover:shadow-xl dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-gray-900"
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

export default function PaymentProcessorsHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-teal-50 via-cyan-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <AnimatedBackgroundPattern />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/90 via-cyan-50/80 to-blue-50/90 dark:from-gray-900/80 dark:via-gray-800/70 dark:to-gray-900/80" />
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="text-center">
            {/* Subtitle */}
            <motion.p
              className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💳
              </motion.span>
              {' '}Payment Processors Solutions
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
                Power Global
              </motion.span>
              <br />
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Payment Processing
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Complete payment processing infrastructure for payment service providers, gateways, and aggregators. 
              <span className="text-teal-600 dark:text-teal-400 font-semibold"> Scale payment operations with enterprise-grade processing, merchant onboarding, and real-time settlement capabilities.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <InteractiveButton variant="primary">
                Start Processing
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </InteractiveButton>
              <InteractiveButton variant="secondary">
                Explore Infrastructure
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Trusted by leading payment processors</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {['PCI DSS Level 1', 'ISO 27001', '99.9% Uptime', 'Real-time Processing'].map((cert, index) => (
                  <motion.div
                    key={cert}
                    className="h-12 w-40 bg-white/10 dark:bg-gray-800/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/5 dark:border-gray-700/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  >
                    <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              {[
                { value: '500+', label: 'Payment Processors', subtitle: 'Trust our platform' },
                { value: '99.99%', label: 'Processing Uptime', subtitle: 'Industry-leading' },
                { value: '2s', label: 'Settlement Time', subtitle: 'Real-time processing' },
                { value: '200+', label: 'Payment Methods', subtitle: 'Global coverage' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                >
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2"
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
        <div className="w-6 h-10 border-2 border-teal-400/30 dark:border-teal-300/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-teal-400/50 dark:bg-teal-300/50 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

