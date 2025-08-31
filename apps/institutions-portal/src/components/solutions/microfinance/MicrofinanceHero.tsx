'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Pre-defined values to avoid hydration mismatch
const predefinedShapes = [
  { left: 8, top: 15, width: 28, height: 24, opacity: 0.07, radius: 50, duration: 14, delay: 0 },
  { left: 78, top: 25, width: 32, height: 28, opacity: 0.06, radius: 8, duration: 16, delay: 1 },
  { left: 85, top: 5, width: 24, height: 36, opacity: 0.08, radius: 50, duration: 12, delay: 2 },
  { left: 25, top: 82, width: 36, height: 20, opacity: 0.05, radius: 8, duration: 18, delay: 3 },
  { left: 88, top: 78, width: 20, height: 40, opacity: 0.09, radius: 50, duration: 13, delay: 4 },
  { left: 5, top: 65, width: 40, height: 26, opacity: 0.07, radius: 8, duration: 15, delay: 5 },
];

const predefinedIcons = [
  { icon: '🌍', left: 15, top: 25, delay: 0 },
  { icon: '🤝', left: 35, top: 65, delay: 1 },
  { icon: '💡', left: 55, top: 18, delay: 2 },
  { icon: '📈', left: 72, top: 75, delay: 3 },
  { icon: '🏘️', left: 82, top: 35, delay: 4 },
  { icon: '💪', left: 95, top: 25, delay: 5 },
];

const communityConnections = [
  { x1: 150, y1: 120, x2: 250, y2: 180, delay: 0 },
  { x1: 300, y1: 150, x2: 450, y2: 200, delay: 0.5 },
  { x1: 500, y1: 180, x2: 650, y2: 140, delay: 1 },
  { x1: 700, y1: 160, x2: 850, y2: 220, delay: 1.5 },
  { x1: 900, y1: 200, x2: 1050, y2: 170, delay: 2 },
];

const AnimatedBackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px),
                           linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
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
            background: `rgba(251, 146, 60, ${shape.opacity})`,
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

      {/* Community Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 400">
        {communityConnections.map((connection, index) => (
          <motion.line
            key={index}
            x1={connection.x1}
            y1={connection.y1}
            x2={connection.x2}
            y2={connection.y2}
            stroke="rgba(251, 146, 60, 0.4)"
            strokeWidth="2"
            strokeDasharray="5,5"
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
        
        {/* Community Nodes */}
        <motion.circle
          cx="200" cy="150" r="6"
          fill="rgba(251, 146, 60, 0.6)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        />
        <motion.circle
          cx="500" cy="200" r="6"
          fill="rgba(251, 146, 60, 0.6)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
        />
        <motion.circle
          cx="800" cy="170" r="6"
          fill="rgba(251, 146, 60, 0.6)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
        />
      </svg>

      {/* Floating Community Icons */}
      <div className="absolute inset-0">
        {predefinedIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-20"
            style={{ left: `${item.left}%`, top: `${item.top}%` }}
            animate={{
              y: [-15, 15, -15],
              rotate: [-2, 2, -2],
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
    primary: "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl",
    secondary: "border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white shadow-lg hover:shadow-xl dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400 dark:hover:text-gray-900"
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

export default function MicrofinanceHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <AnimatedBackgroundPattern />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/90 via-amber-50/80 to-yellow-50/90 dark:from-gray-900/80 dark:via-gray-800/70 dark:to-gray-900/80" />
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="text-center">
            {/* Subtitle */}
            <motion.p
              className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400 mb-4"
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
              {' '}Microfinance Solutions
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
                Financial
              </motion.span>
              <br />
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Inclusion
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Comprehensive microfinance platform designed for MFIs, NBFIs, and community finance institutions. 
              <span className="text-orange-600 dark:text-orange-400 font-semibold"> Empower communities through group lending, impact tracking, and inclusive financial services.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <InteractiveButton variant="primary">
                Get MFI Demo
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </InteractiveButton>
              <InteractiveButton variant="secondary">
                Impact Measurement Guide
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Serving financial inclusion across East Africa</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {['Impact Focused', 'Community Driven', 'Inclusive Finance', 'Social Innovation'].map((cert, index) => (
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

            {/* Impact Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              {[
                { value: '250+', label: 'MFIs Served', subtitle: 'Across East Africa' },
                { value: '2.8M+', label: 'Lives Impacted', subtitle: 'Through financial inclusion' },
                { value: 'KES 15B+', label: 'Disbursed', subtitle: 'Microcredit facilities' },
                { value: '92%', label: 'Repayment Rate', subtitle: 'Average portfolio quality' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                >
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2"
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
        <div className="w-6 h-10 border-2 border-orange-400/30 dark:border-orange-300/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-orange-400/50 dark:bg-orange-300/50 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
