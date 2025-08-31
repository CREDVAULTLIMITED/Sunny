'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PlayIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ClockIcon,
  CodeBracketIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface DemoStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  duration: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'bank' | 'wallet';
  icon: string;
  description: string;
}

const demoSteps: DemoStep[] = [
  {
    id: 'initiate',
    title: 'Payment Initiated',
    description: 'Customer clicks pay button',
    status: 'completed',
    duration: '0ms'
  },
  {
    id: 'validate',
    title: 'Data Validation',
    description: 'Real-time form validation',
    status: 'completed',
    duration: '50ms'
  },
  {
    id: 'tokenize',
    title: 'Secure Tokenization',
    description: 'Payment data tokenized',
    status: 'processing',
    duration: '120ms'
  },
  {
    id: 'authorize',
    title: 'Authorization',
    description: 'Bank authorization request',
    status: 'pending',
    duration: '800ms'
  },
  {
    id: 'settle',
    title: 'Settlement',
    description: 'Funds transferred',
    status: 'pending',
    duration: '90s'
  }
];

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit Card',
    type: 'card',
    icon: '💳',
    description: 'Visa ending in 4242'
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    type: 'bank',
    icon: '🏦',
    description: 'Chase Business Account'
  },
  {
    id: 'wallet',
    name: 'Apple Pay',
    type: 'wallet',
    icon: '📱',
    description: 'Touch ID payment'
  }
];

const codeExamples = {
  card: `// Accept card payments
const payment = await sunny.payments.create({
  amount: 2500,
  currency: 'usd',
  payment_method: 'card',
  customer: 'cus_demo123'
});`,
  
  bank: `// Bank transfer integration
const payment = await sunny.payments.create({
  amount: 2500,
  currency: 'usd',
  payment_method: 'ach_debit',
  customer: 'cus_demo123'
});`,
  
  wallet: `// Digital wallet payments
const payment = await sunny.payments.create({
  amount: 2500,
  currency: 'usd',
  payment_method: 'apple_pay',
  customer: 'cus_demo123'
});`
};

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [showCode, setShowCode] = useState(false);

  const runDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= demoSteps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <section id="demo" className="py-20 lg:py-32 bg-gradient-to-br from-white via-purple-50/40 to-pink-50/40 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800/60 dark:to-gray-900">
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            <SparklesIcon className="w-3 h-3 mr-1" />
            Interactive Demo
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            See Sunny in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Action
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience our payment flow firsthand with this interactive demo. 
            See how fast and secure payment processing can be with Sunny.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Interface */}
          <div className="space-y-6">
            {/* Payment Method Selection */}
            <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl shadow-purple-500/10 dark:shadow-purple-400/20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Choose Payment Method
              </h3>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    onClick={() => setSelectedMethod(method)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedMethod.id === method.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {method.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {method.description}
                        </div>
                      </div>
                      {selectedMethod.id === method.id && (
                        <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </Card>

            {/* Demo Controls */}
            <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl shadow-purple-500/10 dark:shadow-purple-400/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Demo Controls
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={showCode ? () => setShowCode(false) : () => setShowCode(true)}
                    variant="outline"
                    size="sm"
                  >
                    <CodeBracketIcon className="w-4 h-4 mr-1" />
                    {showCode ? 'Hide' : 'Show'} Code
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={runDemo}
                  disabled={isPlaying}
                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                >
                  {isPlaying ? (
                    <>
                      <ClockIcon className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <PlayIcon className="w-4 h-4 mr-2" />
                      Run Demo
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={resetDemo}
                  variant="outline"
                  className="px-4"
                >
                  Reset
                </Button>
              </div>

              {/* Amount Display */}
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Demo Amount
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    $25.00 USD
                  </div>
                </div>
              </div>
            </Card>

            {/* Code Example */}
            <AnimatePresence>
              {showCode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 border-gray-200 dark:border-gray-700 bg-gray-900 text-green-400">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        Integration Code
                      </h3>
                      <Badge variant="secondary">
                        {selectedMethod.type}
                      </Badge>
                    </div>
                    
                    <pre className="text-sm overflow-x-auto">
                      <code>{codeExamples[selectedMethod.type as keyof typeof codeExamples]}</code>
                    </pre>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Payment Flow Visualization */}
          <div className="space-y-6">
            <Card className="p-6 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Payment Flow
                </h3>
                <Badge variant="outline" className="border-green-200 text-green-700 dark:border-green-800 dark:text-green-400">
                  Real-time
                </Badge>
              </div>

              <div className="space-y-4">
                {demoSteps.map((step, index) => {
                  const isActive = index <= currentStep;
                  const isCurrent = index === currentStep && isPlaying;
                  const isCompleted = index < currentStep || (!isPlaying && currentStep >= demoSteps.length - 1);

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0.5 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0.5,
                        scale: isCurrent ? 1.02 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isCurrent
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : isCompleted
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCurrent
                            ? 'bg-blue-500 text-white'
                            : isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircleIcon className="w-5 h-5" />
                          ) : isCurrent ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            <span className="text-sm font-bold">{index + 1}</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {step.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {step.description}
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {step.duration}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Results */}
            {currentStep >= demoSteps.length - 1 && !isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                  <div className="text-center">
                    <CheckCircleIcon className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Payment Successful!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Transaction completed in under 2 minutes with enterprise-grade security.
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ✓
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Secure
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          90s
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Settlement
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          99.9%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Success Rate
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-16 lg:mt-24"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to integrate?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Get started with our comprehensive documentation and start accepting payments in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Start Building
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-gray-300 hover:border-green-500">
                View Documentation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
