'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CodeBracketIcon,
  DocumentTextIcon,
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  CommandLineIcon,
  CubeIcon
} from '@heroicons/react/24/outline';

export function EcommerceGettingStarted() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState('shopify');

  const quickStartSteps = [
    {
      title: 'Create Account',
      description: 'Sign up for your free Sunny account in under 2 minutes',
      time: '2 minutes',
      details: [
        'Provide basic business information',
        'Verify your email address',
        'Complete identity verification',
        'Access your dashboard immediately'
      ],
      code: null
    },
    {
      title: 'Choose Integration',
      description: 'Select your e-commerce platform or custom integration method',
      time: '1 minute',
      details: [
        'Browse our platform integrations',
        'Download plugins or SDKs',
        'Access API documentation',
        'Get your API keys'
      ],
      code: null
    },
    {
      title: 'Install & Configure',
      description: 'Install the integration and configure your payment settings',
      time: '5 minutes',
      details: [
        'Install plugin or SDK',
        'Enter your API credentials',
        'Configure payment methods',
        'Set up webhooks'
      ],
      code: `// Example: JavaScript SDK Integration
import { SunnyPayments } from '@sunny/payments-js';

const sunny = new SunnyPayments({
  apiKey: 'your-api-key',
  environment: 'sandbox' // or 'production'
});

// Create payment form
const paymentForm = sunny.createPaymentForm({
  amount: 2999, // $29.99
  currency: 'USD',
  onSuccess: (result) => {
    console.log('Payment successful:', result);
  },
  onError: (error) => {
    console.error('Payment failed:', error);
  }
});

paymentForm.mount('#payment-form');`
    },
    {
      title: 'Test & Go Live',
      description: 'Test your integration and switch to live mode',
      time: '10 minutes',
      details: [
        'Process test transactions',
        'Verify webhook delivery',
        'Test different payment methods',
        'Switch to production mode'
      ],
      code: `// Test with sample data
const testPayment = await sunny.processPayment({
  amount: 1000, // $10.00
  currency: 'USD',
  paymentMethod: {
    type: 'card',
    card: {
      number: '4242424242424242', // Test card
      exp_month: 12,
      exp_year: 2025,
      cvc: '123'
    }
  }
});

console.log('Test payment result:', testPayment);`
    }
  ];

  const platforms = [
    {
      id: 'shopify',
      name: 'Shopify',
      logo: '🛍️',
      setupTime: '5 minutes',
      difficulty: 'Easy',
      steps: [
        'Install Sunny Payments app from Shopify App Store',
        'Connect your Sunny account',
        'Configure payment methods and settings',
        'Test checkout flow and go live'
      ]
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      logo: '🔌',
      setupTime: '10 minutes',
      difficulty: 'Easy',
      steps: [
        'Download Sunny WooCommerce plugin',
        'Upload and activate the plugin',
        'Enter API credentials in settings',
        'Configure payment gateway options'
      ]
    },
    {
      id: 'custom',
      name: 'Custom Integration',
      logo: '⚡',
      setupTime: '30 minutes',
      difficulty: 'Medium',
      steps: [
        'Choose your preferred SDK or API',
        'Install SDK via package manager',
        'Implement payment flow in your app',
        'Set up webhooks and error handling'
      ]
    }
  ];

  const codeExamples = {
    javascript: `// JavaScript/Node.js
import { SunnyPayments } from '@sunny/payments-js';

const sunny = new SunnyPayments('your-api-key');

const payment = await sunny.createPayment({
  amount: 2999,
  currency: 'USD',
  paymentMethods: ['card', 'apple_pay', 'google_pay']
});`,
    
    python: `# Python
import sunny_payments

sunny = sunny_payments.SunnyPayments('your-api-key')

payment = sunny.create_payment(
    amount=2999,
    currency='USD',
    payment_methods=['card', 'apple_pay', 'google_pay']
)`,
    
    php: `<?php
// PHP
use Sunny\\Payments\\SunnyPayments;

$sunny = new SunnyPayments('your-api-key');

$payment = $sunny->createPayment([
    'amount' => 2999,
    'currency' => 'USD',
    'payment_methods' => ['card', 'apple_pay', 'google_pay']
]);`,
    
    curl: `# cURL
curl -X POST "https://api.sunnypayments.com/v1/payments" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2999,
    "currency": "USD",
    "payment_methods": ["card", "apple_pay", "google_pay"]
  }'`
  };

  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const resources = [
    {
      title: 'Complete API Documentation',
      description: 'Comprehensive guides and API reference',
      icon: DocumentTextIcon,
      link: '/docs/api',
      type: 'Documentation'
    },
    {
      title: 'Interactive Code Examples',
      description: 'Live code samples you can test immediately',
      icon: CodeBracketIcon,
      link: '/docs/examples',
      type: 'Examples'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for popular platforms',
      icon: PlayIcon,
      link: '/docs/tutorials',
      type: 'Videos'
    },
    {
      title: 'Developer Community',
      description: 'Connect with other developers and get help',
      icon: UserGroupIcon,
      link: '/community',
      type: 'Community'
    },
    {
      title: '24/7 Developer Support',
      description: 'Get help from our technical support team',
      icon: ChatBubbleLeftRightIcon,
      link: '/support',
      type: 'Support'
    },
    {
      title: 'Sunny CLI Tools',
      description: 'Command-line tools for faster development',
      icon: CommandLineIcon,
      link: '/docs/cli',
      type: 'Tools'
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
              <CodeBracketIcon className="w-4 h-4 mr-1" />
              Getting Started
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Start Accepting Payments
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                In Under 15 Minutes
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose your integration method and follow our step-by-step guide to start processing payments. 
              From simple plugins to custom APIs, we make integration fast and straightforward.
            </p>
          </div>
        </div>

        {/* Quick Start Steps */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
            4-Step Quick Start Process
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {quickStartSteps.map((step, index) => (
              <Card 
                key={index} 
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  activeStep === index 
                    ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'hover:shadow-lg bg-white dark:bg-gray-800'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                      <ClockIcon className="w-3 h-3" />
                      <span>{step.time}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Step Details */}
          <Card className="mt-8 p-8 bg-gray-50 dark:bg-gray-800">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Step {activeStep + 1}: {quickStartSteps[activeStep].title}
                  </h4>
                  <div className="space-y-2">
                    {quickStartSteps[activeStep].details.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-400">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  {activeStep > 0 && (
                    <Button variant="outline" onClick={() => setActiveStep(activeStep - 1)}>
                      Previous Step
                    </Button>
                  )}
                  {activeStep < quickStartSteps.length - 1 && (
                    <Button onClick={() => setActiveStep(activeStep + 1)}>
                      Next Step
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>

              {quickStartSteps[activeStep].code && (
                <div className="space-y-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white">Code Example:</h5>
                  <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300">
                      <code>{quickStartSteps[activeStep].code}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Platform Integration */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Choose Your Integration Method
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {platforms.map((platform) => (
              <Card 
                key={platform.id}
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  selectedPlatform === platform.id 
                    ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'hover:shadow-lg bg-white dark:bg-gray-800'
                }`}
                onClick={() => setSelectedPlatform(platform.id)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{platform.logo}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{platform.name}</h4>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {platform.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{platform.setupTime}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Platform Steps */}
          <Card className="p-8 bg-white dark:bg-gray-800">
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                {platforms.find(p => p.id === selectedPlatform)?.name} Integration Steps
              </h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {platforms.find(p => p.id === selectedPlatform)?.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex-shrink-0">
                        <span className="text-xs font-bold text-green-600 dark:text-green-400">{index + 1}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white">Quick Actions:</h5>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <DocumentTextIcon className="w-4 h-4 mr-2" />
                      View Integration Guide
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <CodeBracketIcon className="w-4 h-4 mr-2" />
                      Download SDK/Plugin
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <PlayIcon className="w-4 h-4 mr-2" />
                      Watch Tutorial Video
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Code Examples */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Code Examples
          </h3>

          <Card className="p-8 bg-white dark:bg-gray-800">
            <div className="space-y-6">
              <div className="flex justify-center space-x-2">
                {Object.keys(codeExamples).map((language) => (
                  <Button
                    key={language}
                    variant={selectedLanguage === language ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLanguage(language)}
                    className="capitalize"
                  >
                    {language === 'curl' ? 'cURL' : language}
                  </Button>
                ))}
              </div>
              
              <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{codeExamples[selectedLanguage as keyof typeof codeExamples]}</code>
                </pre>
              </div>
            </div>
          </Card>
        </div>

        {/* Resources */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Developer Resources
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <resource.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Access Resource
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-green-600 text-white text-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Join thousands of developers who have already integrated Sunny Payments. 
                Start your free trial today and process your first payment in minutes.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Free Trial
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                Talk to Developer Success
              </Button>
            </div>

            <div className="text-sm text-blue-100">
              No setup fees • Full sandbox access • 24/7 developer support
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
