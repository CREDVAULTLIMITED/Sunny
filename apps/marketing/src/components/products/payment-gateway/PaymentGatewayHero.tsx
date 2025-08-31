'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  CreditCardIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  BoltIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Key stats data
const keyStats = [
  {
    value: "190+",
    label: "Countries",
    icon: GlobeAltIcon,
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    value: "99.99%",
    label: "Uptime",
    icon: ShieldCheckIcon,
    color: "text-green-600 dark:text-green-400"
  },
  {
    value: "<500ms",
    label: "Response Time",
    icon: BoltIcon,
    color: "text-purple-600 dark:text-purple-400"
  },
  {
    value: "2.5%",
    label: "Starting Fee",
    icon: CurrencyDollarIcon,
    color: "text-orange-600 dark:text-orange-400"
  }
];

// Trust indicators
const trustIndicators = [
  "PCI DSS Level 1",
  "SOC 2 Type II",
  "ISO 27001",
  "GDPR Compliant"
];

// Demo transaction states
const transactionStates = [
  {
    id: 1,
    status: "Initiating Payment",
    description: "Customer enters payment details",
    progress: 20,
    color: "bg-blue-500"
  },
  {
    id: 2,
    status: "Security Check",
    description: "AI fraud detection in progress",
    progress: 40,
    color: "bg-yellow-500"
  },
  {
    id: 3,
    status: "Processing",
    description: "Routing through optimal network",
    progress: 70,
    color: "bg-purple-500"
  },
  {
    id: 4,
    status: "Success",
    description: "Payment completed successfully",
    progress: 100,
    color: "bg-green-500"
  }
];

export default function PaymentGatewayHero() {
  const [currentTransaction, setCurrentTransaction] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-cycle through transaction states
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTransaction((prev) => (prev + 1) % transactionStates.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const startDemo = () => {
    setIsAnimating(true);
    setCurrentTransaction(0);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 8000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-green-100/50 to-blue-100/30 dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 dark:bg-green-500/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-1/3 right-16 w-24 h-24 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-800/20 bg-[size:20px_20px] opacity-40" />
      </div>

      <div className="relative max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-4 py-2 text-sm">
                🚀 Global Payment Processing
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              Accept Payments{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
                Anywhere
              </span>
              <br />
              in the World
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Process payments from 190+ countries with our enterprise-grade gateway. 
              Instant settlement, advanced fraud protection, and 99.99% uptime guaranteed.
            </motion.p>

            {/* Key Features List */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto lg:mx-0">
                {[
                  "135+ currencies supported",
                  "PCI DSS Level 1 compliant",
                  "Real-time fraud detection",
                  "Instant settlement available"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg group"
              >
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-300 hover:border-green-500 px-8 py-4 text-lg group"
                onClick={startDemo}
              >
                <PlayIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Trusted by 10,000+ businesses worldwide
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {trustIndicators.map((indicator, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    {indicator}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Interactive Demo */}
          <motion.div variants={itemVariants} className="lg:pl-8">
            <Card className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border-gray-200/50 dark:border-gray-700/50">
              {/* Demo Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Live Payment Processing
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  See how fast payments are processed globally
                </p>
              </div>

              {/* Transaction Simulator */}
              <div className="space-y-6">
                {/* Current Transaction Status */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTransaction}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-3 h-3 rounded-full ${transactionStates[currentTransaction].color} animate-pulse`} />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {transactionStates[currentTransaction].status}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {transactionStates[currentTransaction].description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${transactionStates[currentTransaction].color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${transactionStates[currentTransaction].progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Payment Methods Preview */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "Cards", icon: CreditCardIcon, active: currentTransaction === 1 },
                    { name: "Wallets", icon: BoltIcon, active: currentTransaction === 2 },
                    { name: "Bank", icon: GlobeAltIcon, active: currentTransaction === 3 }
                  ].map((method, index) => (
                    <motion.div
                      key={method.name}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        method.active
                          ? 'border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <method.icon className={`w-6 h-6 mx-auto mb-2 ${
                        method.active
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`} />
                      <p className={`text-xs text-center font-medium ${
                        method.active
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {method.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {keyStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
