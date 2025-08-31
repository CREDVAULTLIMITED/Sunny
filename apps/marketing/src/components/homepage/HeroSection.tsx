'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  BoltIcon,
  PlayIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

interface TrustIndicator {
  name: string;
  logo: string;
  description: string;
}

const trustIndicators: TrustIndicator[] = [
  { name: 'PCI DSS Level 1', logo: '/icons/pci-dss.svg', description: 'Highest security standard' },
  { name: 'SOC 2 Type II', logo: '/icons/soc2.svg', description: 'Security & availability certified' },
  { name: 'ISO 27001', logo: '/icons/iso27001.svg', description: 'Information security management' },
  { name: 'GDPR Compliant', logo: '/icons/gdpr.svg', description: 'Data protection regulation' }
];

const globalStats = [
  { value: '190+', label: 'Countries' },
  { value: '135+', label: 'Currencies' },
  { value: '99.9%', label: 'Uptime' },
  { value: '<2min', label: 'Settlement' }
];

export default function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % globalStats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))]" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'w-3 h-3 bg-green-400' :
              i % 3 === 1 ? 'w-2 h-2 bg-blue-400' :
              'w-1 h-1 bg-purple-400'
            } opacity-40`}
            animate={{
              x: [0, 100 + (i * 20), 0],
              y: [0, -150 + (i * 15), 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${5 + i * 8}%`,
              top: `${15 + (i * 7)}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                <SparklesIcon className="w-3 h-3 mr-1" />
                Trusted by 10,000+ businesses globally
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Global Payment Processing{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-500 to-emerald-500">
                Made Simple
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Accept payments globally with enterprise-grade security, instant settlement, and 
              transparent pricing. Built for businesses of all sizes.
            </motion.p>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid sm:grid-cols-3 gap-4 mb-8"
            >
              {[
                { icon: GlobeAltIcon, text: "190+ Countries" },
                { icon: ShieldCheckIcon, text: "Enterprise Security" },
                { icon: BoltIcon, text: "Instant Settlement" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <benefit.icon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold group"
              >
                Get Started Free
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-300 hover:border-green-500 hover:text-green-600 px-8 py-4 text-lg font-semibold group"
              >
                <PlayIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                View Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="border-t border-gray-200 dark:border-gray-700 pt-8"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide font-medium">
                Trusted Security & Compliance
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {trustIndicators.map((indicator, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-green-300 dark:hover:border-green-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mb-2">
                      <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                      {indicator.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Interactive Visual */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Main Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                {/* Global Stats Display */}
                <div className="text-center mb-8">
                  <motion.div
                    key={currentStat}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                  >
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {globalStats[currentStat].value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 font-medium">
                      {globalStats[currentStat].label}
                    </div>
                  </motion.div>
                </div>

                {/* Payment Flow Animation */}
                <div className="space-y-4">
                  {/* Transaction Steps */}
                  {[
                    { label: 'Customer Payment', status: 'completed' },
                    { label: 'Security Verification', status: 'completed' },
                    { label: 'Processing', status: 'processing' },
                    { label: 'Settlement', status: 'pending' }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        step.status === 'completed' ? 'bg-green-500' :
                        step.status === 'processing' ? 'bg-blue-500 animate-pulse' :
                        'bg-gray-300 dark:bg-gray-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {step.label}
                      </span>
                      {step.status === 'completed' && (
                        <CheckIcon className="w-4 h-4 text-green-500 ml-auto" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <BoltIcon className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <ShieldCheckIcon className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
