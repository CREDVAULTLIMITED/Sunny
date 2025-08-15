'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Pre-defined positions to avoid hydration mismatch
const predefinedShapes = [
  { left: 15, top: 25, width: 35, height: 28, opacity: 0.04, radius: 50, duration: 10, delay: 0 },
  { left: 65, top: 40, width: 25, height: 30, opacity: 0.06, radius: 8, duration: 12, delay: 1 },
  { left: 85, top: 15, width: 40, height: 35, opacity: 0.03, radius: 50, duration: 14, delay: 2 },
  { left: 35, top: 70, width: 30, height: 25, opacity: 0.05, radius: 8, duration: 9, delay: 3 },
  { left: 75, top: 75, width: 20, height: 40, opacity: 0.07, radius: 50, duration: 11, delay: 4 },
  { left: 5, top: 60, width: 45, height: 32, opacity: 0.04, radius: 8, duration: 13, delay: 5 },
  { left: 50, top: 10, width: 28, height: 38, opacity: 0.06, radius: 50, duration: 15, delay: 6 },
  { left: 90, top: 85, width: 32, height: 22, opacity: 0.05, radius: 8, duration: 8, delay: 7 },
  { left: 25, top: 90, width: 38, height: 30, opacity: 0.04, radius: 50, duration: 16, delay: 8 },
  { left: 10, top: 35, width: 22, height: 45, opacity: 0.07, radius: 8, duration: 10, delay: 9 },
  { left: 60, top: 80, width: 42, height: 26, opacity: 0.03, radius: 50, duration: 12, delay: 10 },
  { left: 80, top: 50, width: 26, height: 35, opacity: 0.06, radius: 8, duration: 11, delay: 11 },
];

const predefinedIcons = [
  { icon: '💳', left: 10, top: 30, delay: 0 },
  { icon: '🏦', left: 25, top: 60, delay: 1 },
  { icon: '📊', left: 40, top: 25, delay: 2 },
  { icon: '🔒', left: 55, top: 75, delay: 3 },
  { icon: '🌍', left: 70, top: 45, delay: 4 },
  { icon: '⚡', left: 85, top: 35, delay: 5 },
];

// Custom animated background pattern component
const AnimatedBackgroundPattern = () => {
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
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating geometric shapes with predefined positions */}
      {predefinedShapes.map((shape, i) => (
        <motion.div
          key={i}
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

      {/* Animated financial chart lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 600">
        <motion.path
          d="M0,300 Q300,200 600,250 T1200,200"
          stroke="rgba(34, 197, 94, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.path
          d="M0,400 Q300,350 600,380 T1200,320"
          stroke="rgba(34, 197, 94, 0.2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        />
      </svg>

      {/* Floating payment icons with predefined positions */}
      <div className="absolute inset-0">
        {predefinedIcons.map(({ icon, left, top, delay }, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-20"
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

// Stats counter component with animation
const AnimatedStat = ({ value, label, description, delay = 0 }: {
  value: string;
  label: string;
  description: string;
  delay?: number;
}) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 + delay }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="text-3xl md:text-4xl font-bold text-white mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: 'spring',
          stiffness: 200,
          damping: 10,
          delay: 1 + delay 
        }}
      >
        {value}
      </motion.div>
      <div className="text-lg font-medium text-gray-200 mb-1">{label}</div>
      <div className="text-sm text-gray-300">{description}</div>
    </motion.div>
  );
};

// Interactive button component
const InteractiveButton = ({ 
  children, 
  variant = 'primary',
  onClick,
  className = ''
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
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)',
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default function AnimatedInstitutionalHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-emerald-50 via-green-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <AnimatedBackgroundPattern />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/90 via-emerald-50/80 to-blue-50/90 dark:from-gray-900/80 dark:via-gray-800/70 dark:to-gray-900/80" />
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
              {' '}Institutional Payment Solutions
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
                Powering Financial
              </motion.span>
              <br />
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Institutions
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Comprehensive payment infrastructure designed specifically for banks, SACCOs, MFIs, 
              and fintech companies. Ensure{' '}
              <motion.span 
                className="text-green-600 dark:text-green-400 font-semibold"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                regulatory compliance
              </motion.span>
              {' '}while delivering exceptional digital financial services to your customers.
            </motion.p>

            {/* Actions */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <InteractiveButton variant="primary">
                Get Started Free
                <motion.svg 
                  className="ml-2 h-5 w-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </InteractiveButton>
              
              <InteractiveButton variant="secondary">
                View Demo
                <motion.svg 
                  className="ml-2 h-5 w-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-6 0V9a3 3 0 013-3h0a3 3 0 013 3v5.172a4 4 0 01-1.172 2.828z" />
                </motion.svg>
              </InteractiveButton>
            </motion.div>

            {/* Trust indicators / Partner logos */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-sm text-gray-400 mb-6">Trusted by leading financial institutions across Africa</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {['CBK', 'SASRA', 'KBA', 'PCI DSS'].map((logo, index) => (
                  <motion.div 
                    key={logo}
                    className="h-12 w-24 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/5"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <span className="text-white text-xs font-medium">{logo}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <AnimatedStat 
                value="50+" 
                label="Institutions" 
                description="Served globally"
                delay={0}
              />
              <AnimatedStat 
                value="99.99%" 
                label="Uptime" 
                description="SLA guarantee"
                delay={0.1}
              />
              <AnimatedStat 
                value="15+" 
                label="Countries" 
                description="Across Africa"
                delay={0.2}
              />
              <AnimatedStat 
                value="$2.5B" 
                label="Processed" 
                description="Annual volume"
                delay={0.3}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <motion.svg 
          className="w-full h-20 text-white" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.path
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
          />
        </motion.svg>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
