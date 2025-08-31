'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BanknotesIcon,
  UsersIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CogIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  DocumentCheckIcon,
  BeakerIcon,
  LockClosedIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

export function MarketplaceFeatures() {
  const [activeTab, setActiveTab] = useState('payments');

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

  const featureTabs = [
    {
      id: 'payments',
      title: 'Split Payments',
      icon: BanknotesIcon,
      color: 'blue'
    },
    {
      id: 'vendors',
      title: 'Vendor Management',
      icon: UsersIcon,
      color: 'green'
    },
    {
      id: 'analytics',
      title: 'Analytics & Reporting',
      icon: ChartBarIcon,
      color: 'purple'
    },
    {
      id: 'compliance',
      title: 'Compliance & Security',
      icon: ShieldCheckIcon,
      color: 'indigo'
    }
  ];

  const featureContent = {
    payments: {
      title: 'Advanced Split Payment Solutions',
      description: 'Seamlessly handle complex multi-party transactions with intelligent payment splitting, instant vendor payouts, and flexible commission structures.',
      features: [
        {
          icon: BanknotesIcon,
          color: 'blue',
          title: 'Intelligent Payment Splitting',
          description: 'Automatically distribute payments between vendors and platform based on configurable rules.',
          details: [
            'Real-time payment distribution',
            'Custom commission structures',
            'Multi-tier vendor payouts',
            'Automatic fee calculations'
          ]
        },
        {
          icon: ClockIcon,
          color: 'green',
          title: 'Instant Settlements',
          description: 'Get funds to vendors within minutes, not days, improving cash flow and vendor satisfaction.',
          details: [
            'Sub-2 minute settlements',
            'Real-time balance updates',
            'Instant payout notifications',
            'Same-day bank transfers'
          ]
        },
        {
          icon: CurrencyDollarIcon,
          color: 'purple',
          title: 'Multi-Currency Support',
          description: 'Handle payments in 135+ currencies with automatic conversion and local payment methods.',
          details: [
            '135+ supported currencies',
            'Real-time exchange rates',
            'Local payment methods',
            'Currency hedging options'
          ]
        },
        {
          icon: CogIcon,
          color: 'orange',
          title: 'Flexible Commission Models',
          description: 'Configure dynamic commission structures based on vendor performance, categories, or volume.',
          details: [
            'Tiered commission rates',
            'Performance-based pricing',
            'Category-specific rates',
            'Volume discounts'
          ]
        }
      ]
    },
    vendors: {
      title: 'Comprehensive Vendor Management',
      description: 'Streamline vendor onboarding, verification, and ongoing management with automated workflows and compliance checks.',
      features: [
        {
          icon: UsersIcon,
          color: 'blue',
          title: 'Automated Onboarding',
          description: 'Streamline vendor registration with automated KYC, document verification, and compliance checks.',
          details: [
            'Digital KYC verification',
            'Document upload & validation',
            'Automated compliance checks',
            'Multi-language support'
          ]
        },
        {
          icon: DocumentCheckIcon,
          color: 'green',
          title: 'Verification & Compliance',
          description: 'Ensure all vendors meet regulatory requirements with automated verification processes.',
          details: [
            'Identity verification',
            'Business registration checks',
            'Tax compliance validation',
            'Ongoing monitoring'
          ]
        },
        {
          icon: ChartBarIcon,
          color: 'purple',
          title: 'Performance Analytics',
          description: 'Track vendor performance with detailed analytics and automated performance scoring.',
          details: [
            'Sales performance tracking',
            'Customer satisfaction scores',
            'Dispute resolution metrics',
            'Performance benchmarking'
          ]
        },
        {
          icon: BanknotesIcon,
          color: 'indigo',
          title: 'Payout Management',
          description: 'Flexible payout schedules and methods to meet diverse vendor needs globally.',
          details: [
            'Flexible payout schedules',
            'Multiple payout methods',
            'Automated payout processing',
            'Payout history & reporting'
          ]
        }
      ]
    },
    analytics: {
      title: 'Deep Marketplace Analytics',
      description: 'Gain actionable insights into your marketplace performance with comprehensive analytics and reporting tools.',
      features: [
        {
          icon: ArrowTrendingUpIcon,
          color: 'blue',
          title: 'Revenue Analytics',
          description: 'Track revenue streams, commission earnings, and financial performance across your marketplace.',
          details: [
            'Real-time revenue tracking',
            'Commission breakdown analysis',
            'Vendor contribution metrics',
            'Profit margin optimization'
          ]
        },
        {
          icon: ChartBarIcon,
          color: 'green',
          title: 'Vendor Performance Insights',
          description: 'Monitor vendor performance, identify top performers, and optimize your vendor ecosystem.',
          details: [
            'Vendor ranking systems',
            'Performance trend analysis',
            'Customer satisfaction metrics',
            'Churn prediction models'
          ]
        },
        {
          icon: GlobeAltIcon,
          color: 'purple',
          title: 'Market Intelligence',
          description: 'Understand market trends, customer behavior, and growth opportunities.',
          details: [
            'Market trend analysis',
            'Customer behavior insights',
            'Geographic performance data',
            'Competitive benchmarking'
          ]
        },
        {
          icon: BeakerIcon,
          color: 'orange',
          title: 'Predictive Analytics',
          description: 'Leverage AI-powered insights to predict trends and optimize marketplace operations.',
          details: [
            'Sales forecasting',
            'Demand prediction',
            'Risk assessment models',
            'Growth opportunity identification'
          ]
        }
      ]
    },
    compliance: {
      title: 'Enterprise-Grade Compliance & Security',
      description: 'Meet global regulatory requirements with built-in compliance tools and enterprise-grade security measures.',
      features: [
        {
          icon: ShieldCheckIcon,
          color: 'blue',
          title: 'Regulatory Compliance',
          description: 'Stay compliant with global financial regulations including PCI DSS, GDPR, and local requirements.',
          details: [
            'PCI DSS Level 1 compliance',
            'GDPR compliance tools',
            'AML/KYC automation',
            'Regulatory reporting'
          ]
        },
        {
          icon: LockClosedIcon,
          color: 'green',
          title: 'Advanced Security',
          description: 'Protect your marketplace with military-grade encryption and fraud detection.',
          details: [
            'End-to-end encryption',
            'Real-time fraud detection',
            '3D Secure authentication',
            'Biometric verification'
          ]
        },
        {
          icon: DocumentCheckIcon,
          color: 'purple',
          title: 'Audit & Reporting',
          description: 'Comprehensive audit trails and compliance reporting for regulatory requirements.',
          details: [
            'Complete audit trails',
            'Automated compliance reports',
            'Transaction monitoring',
            'Risk assessment tools'
          ]
        },
        {
          icon: CalendarDaysIcon,
          color: 'indigo',
          title: 'Ongoing Monitoring',
          description: 'Continuous monitoring and alerting for compliance and security issues.',
          details: [
            '24/7 transaction monitoring',
            'Automated risk scoring',
            'Suspicious activity alerts',
            'Compliance dashboard'
          ]
        }
      ]
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400">
              Comprehensive Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Everything Your{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Marketplace
              </span>{' '}
              Needs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From split payments to vendor management, analytics to compliance - 
              we've got every aspect of marketplace payments covered.
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="space-y-12">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-4">
              {featureTabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {(() => {
                const activeContent = featureContent[activeTab as keyof typeof featureContent];
                
                return (
                  <>
                    {/* Content Header */}
                    <div className="text-center space-y-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {activeContent.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        {activeContent.description}
                      </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                      {activeContent.features.map((feature, index) => {
                        const FeatureIconComponent = feature.icon;
                        
                        return (
                          <Card key={index} className="p-8 bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all">
                            <div className="space-y-6">
                              <div className="flex items-start space-x-4">
                                <div className={`p-3 rounded-lg ${getBgClasses(feature.color)}`}>
                                  <FeatureIconComponent className={`w-6 h-6 ${getColorClasses(feature.color)}`} />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                  </h4>
                                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {feature.description}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                {feature.details.map((detail, detailIndex) => (
                                  <div key={detailIndex} className="flex items-center space-x-3">
                                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Integration Examples */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Integration
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Get started with marketplace payments in minutes with our simple APIs
              </p>
            </div>

            <Card className="p-8 bg-gray-900 text-white">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-4">marketplace-split-payment.js</span>
                </div>
                
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Split payment between multiple vendors
const payment = await sunny.payments.create({
  amount: 10000, // $100.00
  currency: 'USD',
  splits: [
    {
      vendor_id: 'vendor_123',
      amount: 8500, // $85.00 to vendor
      description: 'Product sale'
    },
    {
      account_id: 'platform',
      amount: 1500, // $15.00 platform fee
      description: 'Platform commission'
    }
  ],
  customer: {
    email: 'customer@example.com'
  }
});

console.log('Payment created:', payment.id);
console.log('Vendor payout:', payment.splits[0].status);`}
                </pre>
              </div>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Power Your Marketplace?
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of marketplaces already using Sunny for their payment needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-3">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
