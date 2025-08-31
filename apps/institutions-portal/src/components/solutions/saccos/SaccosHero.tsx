'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Pre-defined values to avoid hydration mismatch
const predefinedShapes = [
  { left: 12, top: 18, width: 32, height: 28, opacity: 0.06, radius: 50, duration: 13, delay: 0 },
  { left: 75, top: 30, width: 22, height: 38, opacity: 0.08, radius: 8, duration: 15, delay: 1 },
  { left: 88, top: 8, width: 38, height: 32, opacity: 0.05, radius: 50, duration: 17, delay: 2 },
  { left: 28, top: 78, width: 28, height: 22, opacity: 0.07, radius: 8, duration: 11, delay: 3 },
  { left: 82, top: 85, width: 18, height: 42, opacity: 0.09, radius: 50, duration: 14, delay: 4 },
  { left: 8, top: 68, width: 42, height: 30, opacity: 0.06, radius: 8, duration: 16, delay: 5 },
];

const predefinedIcons = [
  { icon: '🏛️', left: 18, top: 28, delay: 0 },
  { icon: '💰', left: 32, top: 58, delay: 1 },
  { icon: '👥', left: 48, top: 22, delay: 2 },
  { icon: '📈', left: 65, top: 72, delay: 3 },
  { icon: '🤝', left: 78, top: 42, delay: 4 },
  { icon: '🏆', left: 92, top: 28, delay: 5 },
];

const AnimatedBackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                           linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
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
            background: `rgba(34, 197, 94, ${shape.opacity})`,
            borderRadius: shape.radius === 50 ? '50%' : '8px',
          }}
          animate={{
            y: [-25, 25, -25],
            x: [-12, 12, -12],
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

      {/* Animated SVG Paths for cooperative connections */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 600">
        <motion.path
          d="M0,250 Q200,150 400,200 T800,180 Q1000,160 1200,200"
          stroke="rgba(34, 197, 94, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.path
          d="M0,350 Q300,300 600,330 T1200,310"
          stroke="rgba(34, 197, 94, 0.2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', delay: 1.5 }}
        />
        {/* Connection nodes representing member cooperatives */}
        <motion.circle
          cx="200" cy="200" r="4"
          fill="rgba(34, 197, 94, 0.4)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="600" cy="180" r="4"
          fill="rgba(34, 197, 94, 0.4)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        <motion.circle
          cx="1000" cy="200" r="4"
          fill="rgba(34, 197, 94, 0.4)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
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
              y: [-18, 18, -18],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 7 + index,
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
    primary: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl",
    secondary: "border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white shadow-lg hover:shadow-xl dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-gray-900"
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

export default function SaccosHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-green-50 via-emerald-100 to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <AnimatedBackgroundPattern />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/90 via-emerald-50/80 to-teal-50/90 dark:from-gray-900/80 dark:via-gray-800/70 dark:to-gray-900/80" />
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="text-center">
            {/* Subtitle */}
            <motion.p
              className="text-sm font-semibold uppercase tracking-wide text-green-600 dark:text-green-400 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🏛️
              </motion.span>
              {' '}SACCO Payment Solutions
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
                Empowering
              </motion.span>
              <br />
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-400"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Cooperatives
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Complete payment infrastructure for Savings and Credit Cooperative Organizations. Streamline 
              <span className="text-green-600 dark:text-green-400 font-semibold"> member services, lending operations, and SASRA compliance</span> 
              {' '}while driving financial inclusion across your community.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <InteractiveButton variant="primary">
                Get SACCO Demo
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </InteractiveButton>
              <InteractiveButton variant="secondary">
                SASRA Compliance Guide
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Trusted by leading SACCOs across Kenya</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {['SASRA Certified', 'CBK Compliant', 'Member-Focused', 'Community Impact'].map((cert, index) => (
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

            {/* SACCO Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              {[
                { value: '150+', label: 'SACCOs Served', subtitle: 'Across Kenya' },
                { value: '99.5%', label: 'Member Satisfaction', subtitle: 'Average rating' },
                { value: 'KES 12B+', label: 'Processed', subtitle: 'Annual savings & loans' },
                { value: '500K+', label: 'Members', subtitle: 'Empowered daily' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                >
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2"
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
        <div className="w-6 h-10 border-2 border-green-400/30 dark:border-green-300/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-green-400/50 dark:bg-green-300/50 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
