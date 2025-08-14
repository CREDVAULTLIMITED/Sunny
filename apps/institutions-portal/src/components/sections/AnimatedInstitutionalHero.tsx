'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating geometric shapes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            background: `rgba(148, 163, 184, ${0.03 + Math.random() * 0.05})`,
            borderRadius: Math.random() > 0.5 ? '50%' : '8px',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, Math.random() * 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 12,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Animated financial chart lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 600">
        <motion.path
          d="M0,300 Q300,200 600,250 T1200,200"
          stroke="rgba(148, 163, 184, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.path
          d="M0,400 Q300,350 600,380 T1200,320"
          stroke="rgba(148, 163, 184, 0.2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        />
      </svg>

      {/* Floating payment icons */}
      <div className="absolute inset-0">
        {[
          { icon: '💳', delay: 0 },
          { icon: '🏦', delay: 1 },
          { icon: '📊', delay: 2 },
          { icon: '🔒', delay: 3 },
          { icon: '🌍', delay: 4 },
          { icon: '⚡', delay: 5 },
        ].map(({ icon, delay }, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${10 + (index * 15)}%`,
              top: `${20 + Math.random() * 60}%`,
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
    primary: "bg-slate-700 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl border border-slate-600",
    secondary: "border-2 border-white text-white hover:bg-white hover:text-gray-900 shadow-lg hover:shadow-xl"
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
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <AnimatedBackgroundPattern />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/80 via-gray-700/70 to-zinc-700/80" />
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="text-center">
            {/* Subtitle */}
            <motion.p 
              className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4"
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
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
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
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Comprehensive payment infrastructure designed specifically for banks, SACCOs, MFIs, 
              and fintech companies. Ensure{' '}
              <motion.span 
                className="text-emerald-400 font-semibold"
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
                Request Demo
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
                Contact Sales
                <motion.svg 
                  className="ml-2 h-5 w-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 15 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
