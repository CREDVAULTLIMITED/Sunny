'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  RocketLaunchIcon,
  CodeBracketIcon,
  CreditCardIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  ArrowRightIcon,
  ClockIcon,
  SparklesIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
  code?: string;
  features: string[];
}

interface SupportOption {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  availability: string;
  responseTime: string;
  link: string;
}

const steps: Step[] = [
  {
    id: 'signup',
    title: 'Create Account',
    description: 'Sign up for your free Sunny account and get instant access to our sandbox environment.',
    icon: RocketLaunchIcon,
    duration: '2 minutes',
    features: [
      'Instant sandbox access',
      'Test API keys included',
      'No credit card required',
      'Full feature access'
    ]
  },
  {
    id: 'integrate',
    title: 'Quick Integration',
    description: 'Integrate our payment gateway using our SDKs, APIs, or pre-built components.',
    icon: CodeBracketIcon,
    duration: '5-15 minutes',
    code: `npm install @sunny/payment-sdk

import { Sunny } from '@sunny/payment-sdk';

const sunny = new Sunny({
  apiKey: 'pk_test_your_key_here',
  environment: 'sandbox'
});

const payment = await sunny.payments.create({
  amount: 2500,
  currency: 'usd',
  customer: 'cus_demo123'
});`,
    features: [
      'Multiple integration options',
      '15+ programming languages',
      'Pre-built UI components',
      'Comprehensive documentation'
    ]
  },
  {
    id: 'test',
    title: 'Test Payments',
    description: 'Use our comprehensive testing tools to simulate different payment scenarios.',
    icon: CreditCardIcon,
    duration: '10 minutes',
    features: [
      'Test card numbers',
      'Error simulation',
      'Webhook testing',
      'Real-time debugging'
    ]
  },
  {
    id: 'launch',
    title: 'Go Live',
    description: 'Switch to production with live API keys and start accepting real payments.',
    icon: CheckCircleIcon,
    duration: '5 minutes',
    features: [
      'Instant activation',
      'Real-time monitoring',
      'Live support access',
      '99.9% uptime SLA'
    ]
  }
];

const supportOptions: SupportOption[] = [
  {
    title: 'Documentation',
    description: 'Comprehensive guides, API reference, and tutorials',
    icon: DocumentTextIcon,
    availability: '24/7',
    responseTime: 'Instant',
    link: '/docs'
  },
  {
    title: 'Live Chat',
    description: 'Real-time assistance from our technical experts',
    icon: ChatBubbleLeftRightIcon,
    availability: 'Business hours',
    responseTime: '< 2 minutes',
    link: '/chat'
  },
  {
    title: 'Phone Support',
    description: 'Direct phone support for critical integration issues',
    icon: PhoneIcon,
    availability: '24/7',
    responseTime: '< 5 minutes',
    link: '/contact'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function GettingStartedSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [showCode, setShowCode] = useState(false);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/40 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800/40 dark:to-gray-900">
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <Badge variant="secondary" className="mb-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
            <SparklesIcon className="w-3 h-3 mr-1" />
            Quick Start
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Start Accepting Payments in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
              Minutes
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get up and running with Sunny's payment gateway in just a few simple steps. 
            Our streamlined onboarding process gets you accepting payments fast.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 lg:mb-24"
        >
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2" />
              <motion.div 
                className="absolute top-1/2 left-0 h-0.5 bg-green-500 transform -translate-y-1/2"
                initial={{ width: 0 }}
                animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 1 }}
              />

              <div className="grid grid-cols-4 gap-8 relative">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    variants={itemVariants}
                    className="text-center"
                  >
                    <motion.button
                      onClick={() => setActiveStep(index)}
                      className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
                        index <= activeStep
                          ? 'bg-green-500 text-white shadow-lg scale-110'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                      whileHover={{ scale: index <= activeStep ? 1.1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <step.icon className="w-8 h-8" />
                    </motion.button>
                    
                    <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                      index <= activeStep ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {step.description}
                    </p>
                    
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <ClockIcon className="w-3 h-3" />
                      <span>{step.duration}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Steps */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className={`p-6 rounded-xl border-2 transition-all ${
                  index === activeStep
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    index <= activeStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <ClockIcon className="w-4 h-4" />
                      <span>{step.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Step Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 mb-16 lg:mb-24"
        >
          {/* Step Content */}
          <Card className="p-8 border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl shadow-indigo-500/10 dark:shadow-indigo-400/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                {React.createElement(steps[activeStep].icon, { className: "w-6 h-6 text-green-600 dark:text-green-400" })}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Step {activeStep + 1}: {steps[activeStep].title}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <ClockIcon className="w-3 h-3" />
                  <span>{steps[activeStep].duration}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {steps[activeStep].description}
            </p>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                What you get:
              </h4>
              {steps[activeStep].features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Get Started Now
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
              
              {steps[activeStep].code && (
                <Button
                  variant="outline"
                  onClick={() => setShowCode(!showCode)}
                  className="border-gray-300 hover:border-green-500"
                >
                  <CodeBracketIcon className="w-4 h-4 mr-2" />
                  {showCode ? 'Hide' : 'Show'} Code
                </Button>
              )}
            </div>
          </Card>

          {/* Code Example */}
          <Card className="p-8 border-gray-200 dark:border-gray-700 bg-gray-900 text-green-400 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Integration Example
              </h3>
              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                JavaScript
              </Badge>
            </div>

            {steps[activeStep].code ? (
              <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: showCode ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
                className="text-sm overflow-x-auto"
              >
                <code>{steps[activeStep].code}</code>
              </motion.pre>
            ) : (
              <div className="text-center py-8">
                <CodeBracketIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  Ready to implement? Code examples available in the next step.
                </p>
              </div>
            )}

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-xl" />
          </Card>
        </motion.div>

        {/* Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16 lg:mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need Help Getting Started?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our support team is here to help you every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:border-green-300 dark:hover:border-green-600 hover:shadow-xl hover:shadow-indigo-500/20 dark:hover:shadow-indigo-400/30 transition-all duration-300 group cursor-pointer h-full hover:-translate-y-1">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
                      <option.icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {option.title}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {option.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Availability:</span>
                        <span className="text-gray-900 dark:text-white font-medium">{option.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Response:</span>
                        <span className="text-green-600 dark:text-green-400 font-medium">{option.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Payments?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of businesses already using Sunny to power their global payment infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
              
              <Button variant="outline" size="lg" className="border-gray-300 hover:border-green-500 px-8 py-4">
                <PlayIcon className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              No credit card required • Full access to sandbox • 24/7 support
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
