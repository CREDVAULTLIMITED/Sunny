'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Pre-defined values to avoid hydration mismatch
const predefinedShapes = [
  { left: 6, top: 12, width: 32, height: 32, opacity: 0.08, radius: 50, duration: 16, delay: 0 },
  { left: 86, top: 18, width: 28, height: 28, opacity: 0.06, radius: 8, duration: 14, delay: 1 },
  { left: 76, top: 6, width: 36, height: 24, opacity: 0.09, radius: 50, duration: 18, delay: 2 },
  { left: 14, top: 82, width: 24, height: 40, opacity: 0.07, radius: 8, duration: 13, delay: 3 },
  { left: 94, top: 76, width: 40, height: 20, opacity: 0.05, radius: 50, duration: 15, delay: 4 },
  { left: 8, top: 58, width: 20, height: 36, opacity: 0.08, radius: 8, duration: 17, delay: 5 },
];

const predefinedIcons = [
  { icon: '🌍', left: 10, top: 22, delay: 0 },
  { icon: '💸', left: 26, top: 74, delay: 1 },
  { icon: '🏦', left: 66, top: 14, delay: 2 },
  { icon: '📱', left: 84, top: 84, delay: 3 },
  { icon: '💱', left: 88, top: 28, delay: 4 },
  { icon: '🔒', left: 96, top: 62, delay: 5 },
];

const transferConnections = [
  { x1: 150, y1: 110, x2: 300, y2: 170, delay: 0 },
  { x1: 350, y1: 130, x2: 500, y2: 190, delay: 0.3 },
  { x1: 550, y1: 150, x2: 700, y2: 120, delay: 0.6 },
  { x1: 750, y1: 140, x2: 900, y2: 200, delay: 0.9 },
  { x1: 950, y1: 180, x2: 1100, y2: 150, delay: 1.2 },
];

const AnimatedBackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Global Transfer Network Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px),
                           linear-gradient(rgba(236, 72, 153, 0.1) 1px, transparent 1px)`,
          backgroundSize: '55px 55px'
        }}
      />
      
      {/* Animated Transfer Shapes */}
      {predefinedShapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            width: `${shape.width}px`,
            height: `${shape.height}px`,
            background: `rgba(236, 72, 153, ${shape.opacity})`,
            borderRadius: shape.radius === 50 ? '50%' : '8px',
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            rotate: shape.radius === 50 ? [0, 360] : [0, 60, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}

      {/* Transfer Corridor Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-12" viewBox="0 0 1200 400">
        {transferConnections.map((connection, index) => (
          <motion.line
            key={index}
            x1={connection.x1}
            y1={connection.y1}
            x2={connection.x2}
            y2={connection.y2}
            stroke="rgba(236, 72, 153, 0.4)"
            strokeWidth="2"
            strokeDasharray="8,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 2.8, 
              ease: 'easeInOut', 
              repeat: Infinity, 
              repeatType: 'reverse',
              delay: connection.delay 
            }}
          />
        ))}
        
        {/* Transfer Nodes */}
        <motion.circle
          cx="220" cy="140" r="8"
          fill="rgba(236, 72, 153, 0.6)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }}
        />
        <motion.circle
          cx="580" cy="170" r="8"
          fill="rgba(236, 72, 153, 0.6)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 1.0 }}
        />
        <motion.circle
          cx="880" cy="160" r="8"
          fill="rgba(236, 72, 153, 0.6)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 1.6 }}
        />
      </svg>

      {/* Floating Transfer Icons */}
      <div className="absolute inset-0">
        {predefinedIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl opacity-15"
            style={{ left: `${item.left}%`, top: `${item.top}%` }}
            animate={{
              y: [-8, 8, -8],
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration: 5 + index,
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
    primary: "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl",
    secondary: "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white shadow-lg hover:shadow-xl dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-400 dark:hover:text-gray-900"
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

export default function RemittanceHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-pink-50 via-rose-100 to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <AnimatedBackgroundPattern />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/90 via-rose-50/80 to-red-50/90 dark:from-gray-900/80 dark:via-gray-800/70 dark:to-gray-900/80" />
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="text-center">
            {/* Subtitle */}
            <motion.p
              className="text-sm font-semibold uppercase tracking-wide text-pink-600 dark:text-pink-400 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌍
              </motion.span>
              {' '}Remittance Solutions
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
                Connect the
              </motion.span>
              <br />
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Global Diaspora
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Comprehensive cross-border payment infrastructure for money transfer operators, remittance service providers, and international payment facilitators. 
              <span className="text-pink-600 dark:text-pink-400 font-semibold"> Power global money transfers with enterprise-grade corridors, compliance automation, and real-time settlement.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <InteractiveButton variant="primary">
                Start Transferring
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </InteractiveButton>
              <InteractiveButton variant="secondary">
                Explore Corridors
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Trusted by leading money transfer operators</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {['Licensed MTOs', 'Global Compliance', 'Real-time Rates', 'Multi-corridor'].map((cert, index) => (
                  <motion.div
                    key={cert}
                    className="h-12 w-36 bg-white/10 dark:bg-gray-800/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/5 dark:border-gray-700/20"
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
                { value: '150+', label: 'Payment Corridors', subtitle: 'Global coverage' },
                { value: '2 min', label: 'Average Transfer', subtitle: 'Lightning fast' },
                { value: '$50B+', label: 'Annual Volume', subtitle: 'Trusted scale' },
                { value: '24/7', label: 'Settlement', subtitle: 'Always available' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                >
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2"
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
        <div className="w-6 h-10 border-2 border-pink-400/30 dark:border-pink-300/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-pink-400/50 dark:bg-pink-300/50 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

