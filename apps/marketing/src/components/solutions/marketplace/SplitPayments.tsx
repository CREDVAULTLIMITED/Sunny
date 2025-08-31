'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BanknotesIcon,
  ArrowRightIcon,
  UsersIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  CogIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export function SplitPayments() {
  const [activeDemo, setActiveDemo] = useState('basic');
  const [animationStep, setAnimationStep] = useState(0);

  // Static color mapping to avoid dynamic Tailwind classes
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      purple: 'text-purple-600 dark:text-purple-400',
      indigo: 'text-indigo-600 dark:text-indigo-400',
      orange: 'text-orange-600 dark:text-orange-400',
      emerald: 'text-emerald-600 dark:text-emerald-400',
      red: 'text-red-600 dark:text-red-400'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-blue-600 dark:text-blue-400';
  };

  const getBgClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 dark:bg-blue-900/40',
      green: 'bg-green-100 dark:bg-green-900/40',
      purple: 'bg-purple-100 dark:bg-purple-900/40',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/40',
      orange: 'bg-orange-100 dark:bg-orange-900/40',
      emerald: 'bg-emerald-100 dark:bg-emerald-900/40',
      red: 'bg-red-100 dark:bg-red-900/40'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-blue-100 dark:bg-blue-900/40';
  };

  const splitFeatures = [
    {
      icon: BanknotesIcon,
      color: 'blue',
      title: 'Instant Payment Splitting',
      description: 'Automatically split payments in real-time based on your configuration',
      benefits: [
        'Real-time payment distribution',
        'Configurable split rules',
        'Multi-party transactions',
        'Automatic fee calculations'
      ]
    },
    {
      icon: CogIcon,
      color: 'purple',
      title: 'Flexible Commission Models',
      description: 'Set up complex commission structures that adapt to your business needs',
      benefits: [
        'Tiered commission rates',
        'Performance-based pricing',
        'Category-specific rates',
        'Volume-based discounts'
      ]
    },
    {
      icon: ClockIcon,
      color: 'green',
      title: 'Instant Settlements',
      description: 'Get funds to vendors within minutes, improving cash flow and satisfaction',
      benefits: [
        'Sub-2 minute settlements',
        'Real-time notifications',
        'Automated processing',
        'Same-day bank transfers'
      ]
    },
    {
      icon: GlobeAltIcon,
      color: 'indigo',
      title: 'Global Multi-Currency',
      description: 'Handle payments in 135+ currencies with automatic conversion',
      benefits: [
        '135+ supported currencies',
        'Real-time exchange rates',
        'Local payment methods',
        'Currency hedging options'
      ]
    }
  ];

  const demoScenarios = {
    basic: {
      title: 'Basic Split Payment',
      description: 'Simple 2-way split between vendor and platform',
      payment: {
        amount: 100,
        splits: [
          { recipient: 'Platform', amount: 15, percentage: 15, color: 'blue' },
          { recipient: 'Vendor A', amount: 85, percentage: 85, color: 'green' }
        ]
      }
    },
    multi: {
      title: 'Multi-Vendor Split',
      description: 'Complex split between multiple vendors and platform',
      payment: {
        amount: 200,
        splits: [
          { recipient: 'Platform', amount: 30, percentage: 15, color: 'blue' },
          { recipient: 'Vendor A', amount: 120, percentage: 60, color: 'green' },
          { recipient: 'Vendor B', amount: 50, percentage: 25, color: 'purple' }
        ]
      }
    },
    tiered: {
      title: 'Tiered Commission',
      description: 'Performance-based commission structure',
      payment: {
        amount: 500,
        splits: [
          { recipient: 'Platform (Premium)', amount: 50, percentage: 10, color: 'blue' },
          { recipient: 'Top Vendor', amount: 450, percentage: 90, color: 'emerald' }
        ]
      }
    }
  };

  const commissionModels = [
    {
      icon: ChartBarIcon,
      color: 'blue',
      title: 'Percentage-Based',
      description: 'Fixed percentage commission on all transactions',
      example: '5% platform fee on all sales',
      useCases: ['Simple marketplaces', 'Consistent pricing', 'Easy to understand']
    },
    {
      icon: CurrencyDollarIcon,
      color: 'green',
      title: 'Fixed Fee',
      description: 'Flat fee per transaction regardless of amount',
      example: '$2.50 per transaction',
      useCases: ['High-value items', 'Subscription services', 'Predictable costs']
    },
    {
      icon: UsersIcon,
      color: 'purple',
      title: 'Tiered Rates',
      description: 'Commission rates based on vendor performance',
      example: '3% for top vendors, 5% for others',
      useCases: ['Incentivize performance', 'Reward loyalty', 'Volume discounts']
    },
    {
      icon: CalendarDaysIcon,
      color: 'indigo',
      title: 'Time-Based',
      description: 'Dynamic rates based on seasonal or promotional periods',
      example: '2% during holiday season',
      useCases: ['Promotional periods', 'Seasonal adjustments', 'Market conditions']
    }
  ];

  // Start animation
  const startAnimation = () => {
    setAnimationStep(0);
    const steps = [1, 2, 3, 4];
    steps.forEach((step, index) => {
      setTimeout(() => setAnimationStep(step), (index + 1) * 800);
    });
    setTimeout(() => setAnimationStep(0), 4000);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400">
              Split Payments & Commissions
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Intelligent{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Payment Splitting
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Automatically distribute payments between vendors and your platform with 
              flexible commission structures and instant settlements.
            </p>
          </div>

          {/* Interactive Demo */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                See Split Payments in Action
              </h3>
              <div className="flex justify-center space-x-4 mb-6">
                {Object.entries(demoScenarios).map(([key, scenario]) => (
                  <button
                    key={key}
                    onClick={() => setActiveDemo(key)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeDemo === key
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {scenario.title}
                  </button>
                ))}
              </div>
            </div>

            <Card className="p-8 bg-white dark:bg-gray-900">
              {(() => {
                const scenario = demoScenarios[activeDemo as keyof typeof demoScenarios];
                
                return (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {scenario.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {scenario.description}
                      </p>
                      <Button onClick={startAnimation} className="bg-blue-600 hover:bg-blue-700">
                        <BanknotesIcon className="w-4 h-4 mr-2" />
                        Process Payment
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-center">
                      {/* Customer Payment */}
                      <Card className="p-6 text-center bg-gray-50 dark:bg-gray-800">
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                          <CurrencyDollarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Customer Payment</h5>
                        <div className="text-2xl font-bold text-green-600">${scenario.payment.amount}</div>
                      </Card>

                      {/* Arrow */}
                      <div className="flex justify-center">
                        <ArrowRightIcon className={`w-8 h-8 transition-all duration-500 ${
                          animationStep >= 1 ? 'text-blue-600 scale-110' : 'text-gray-400'
                        }`} />
                      </div>

                      {/* Split Results */}
                      <div className="space-y-4">
                        {scenario.payment.splits.map((split, index) => {
                          const bgColor = getBgClasses(split.color);
                          const textColor = getColorClasses(split.color);
                          
                          return (
                            <Card key={index} className={`p-4 transition-all duration-500 ${
                              animationStep >= (index + 2) ? `${bgColor} scale-105` : 'bg-gray-100 dark:bg-gray-700'
                            }`}>
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {split.recipient}
                                </span>
                                <div className="text-right">
                                  <div className={`font-bold ${animationStep >= (index + 2) ? textColor : 'text-gray-600'}`}>
                                    ${split.amount}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {split.percentage}%
                                  </div>
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </div>

                    {animationStep >= 4 && (
                      <div className="text-center">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">
                          ✓ Payment Split Complete - Instant Settlement
                        </Badge>
                      </div>
                    )}
                  </div>
                );
              })()}
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {splitFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              
              return (
                <Card key={index} className="p-6 text-center bg-white dark:bg-gray-900 hover:shadow-lg transition-all">
                  <div className={`w-16 h-16 mx-auto mb-4 ${getBgClasses(feature.color)} rounded-full flex items-center justify-center`}>
                    <IconComponent className={`w-8 h-8 ${getColorClasses(feature.color)}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Commission Models */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Flexible Commission Models
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choose from multiple commission structures or create custom models that fit your business
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {commissionModels.map((model, index) => {
                const ModelIconComponent = model.icon;
                
                return (
                  <Card key={index} className="p-8 bg-white dark:bg-gray-900 hover:shadow-lg transition-all">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`p-3 ${getBgClasses(model.color)} rounded-lg`}>
                        <ModelIconComponent className={`w-6 h-6 ${getColorClasses(model.color)}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {model.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {model.description}
                        </p>
                        <div className={`inline-block px-3 py-1 ${getBgClasses(model.color)} rounded-full`}>
                          <span className={`text-sm font-medium ${getColorClasses(model.color)}`}>
                            {model.example}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-900 dark:text-white">Best for:</h5>
                      {model.useCases.map((useCase, useCaseIndex) => (
                        <div key={useCaseIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Integration Code Example */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Simple Integration
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Set up split payments with just a few lines of code
              </p>
            </div>

            <Card className="p-8 bg-gray-900 text-white">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-4">split-payment-example.js</span>
                </div>
                
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Configure split payment rules
const splitRules = {
  platform_fee: {
    type: 'percentage',
    value: 15, // 15% platform commission
    recipient: 'platform_account'
  },
  vendor_payout: {
    type: 'remainder', // Vendor gets the rest
    recipient: 'vendor_123'
  }
};

// Process payment with automatic splitting
const payment = await sunny.payments.create({
  amount: 10000, // $100.00
  currency: 'USD',
  split_rules: splitRules,
  customer: {
    email: 'customer@example.com'
  },
  metadata: {
    order_id: 'order_456'
  }
});

// Automatic settlement to all parties
console.log('Payment processed:', payment.id);
console.log('Platform fee:', payment.splits.platform_fee.amount);
console.log('Vendor payout:', payment.splits.vendor_payout.amount);`}
                </pre>
              </div>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Why Choose Sunny for Split Payments?
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="space-y-3">
                  <ShieldCheckIcon className="w-12 h-12 mx-auto opacity-90" />
                  <h4 className="text-xl font-semibold">Secure & Compliant</h4>
                  <p className="opacity-90">PCI DSS Level 1 certified with enterprise-grade security</p>
                </div>
                <div className="space-y-3">
                  <ClockIcon className="w-12 h-12 mx-auto opacity-90" />
                  <h4 className="text-xl font-semibold">Instant Settlements</h4>
                  <p className="opacity-90">Funds reach vendors in under 2 minutes globally</p>
                </div>
                <div className="space-y-3">
                  <DocumentTextIcon className="w-12 h-12 mx-auto opacity-90" />
                  <h4 className="text-xl font-semibold">Complete Transparency</h4>
                  <p className="opacity-90">Detailed reporting and real-time transaction tracking</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-3">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
