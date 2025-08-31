'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BuildingLibraryIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  LockClosedIcon,
  GlobeAltIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  UserGroupIcon,
  BanknotesIcon,
  CalculatorIcon,
  BeakerIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export function FinancialServicesFeatures() {
  const [activeTab, setActiveTab] = useState('banking');

  // Static color mapping to avoid dynamic Tailwind classes
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      purple: 'text-purple-600 dark:text-purple-400',
      indigo: 'text-indigo-600 dark:text-indigo-400',
      orange: 'text-orange-600 dark:text-orange-400',
      emerald: 'text-emerald-600 dark:text-emerald-400',
      red: 'text-red-600 dark:text-red-400',
      amber: 'text-amber-600 dark:text-amber-400'
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
      red: 'bg-red-100 dark:bg-red-900/40',
      amber: 'bg-amber-100 dark:bg-amber-900/40'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-blue-100 dark:bg-blue-900/40';
  };

  const featureTabs = [
    {
      id: 'banking',
      title: 'Banking Solutions',
      icon: BuildingLibraryIcon,
      color: 'blue'
    },
    {
      id: 'compliance',
      title: 'Compliance & Security',
      icon: ShieldCheckIcon,
      color: 'green'
    },
    {
      id: 'lending',
      title: 'Lending & Credit',
      icon: CreditCardIcon,
      color: 'purple'
    },
    {
      id: 'analytics',
      title: 'Financial Analytics',
      icon: ChartBarIcon,
      color: 'indigo'
    }
  ];

  const featureContent = {
    banking: {
      title: 'Complete Banking Infrastructure',
      description: 'Enterprise-grade payment solutions designed for traditional banks, digital banks, and neobanks with full regulatory compliance.',
      features: [
        {
          icon: BuildingLibraryIcon,
          color: 'blue',
          title: 'Core Banking Integration',
          description: 'Seamless integration with existing core banking systems and modern APIs.',
          details: [
            'Real-time account updates',
            'Legacy system compatibility',
            'Modern API architecture',
            'Microservices design'
          ]
        },
        {
          icon: CurrencyDollarIcon,
          color: 'green',
          title: 'Multi-Currency Operations',
          description: 'Support for 135+ currencies with real-time exchange rates and local settlement.',
          details: [
            '135+ supported currencies',
            'Real-time FX rates',
            'Local settlement networks',
            'Currency risk management'
          ]
        },
        {
          icon: ClockIcon,
          color: 'purple',
          title: 'Instant Settlements',
          description: 'Real-time gross settlement (RTGS) and instant payment processing.',
          details: [
            'Sub-second processing',
            'RTGS integration',
            '24/7 availability',
            'Instant notifications'
          ]
        },
        {
          icon: GlobeAltIcon,
          color: 'orange',
          title: 'Global Network',
          description: 'Access to global payment networks and local payment methods worldwide.',
          details: [
            'SWIFT network access',
            'Local payment methods',
            'Cross-border payments',
            'Correspondent banking'
          ]
        }
      ]
    },
    compliance: {
      title: 'Regulatory Compliance & Security',
      description: 'Built-in compliance for global financial regulations with enterprise-grade security and audit capabilities.',
      features: [
        {
          icon: ShieldCheckIcon,
          color: 'green',
          title: 'Regulatory Compliance',
          description: 'Comprehensive compliance with global financial regulations and standards.',
          details: [
            'PCI DSS Level 1 certified',
            'SOX compliance ready',
            'GDPR compliant',
            'Basel III alignment'
          ]
        },
        {
          icon: DocumentCheckIcon,
          color: 'blue',
          title: 'AML/KYC Automation',
          description: 'Automated anti-money laundering and know-your-customer processes.',
          details: [
            'Real-time screening',
            'Risk scoring algorithms',
            'Automated reporting',
            'Sanctions list checking'
          ]
        },
        {
          icon: LockClosedIcon,
          color: 'red',
          title: 'Enterprise Security',
          description: 'Bank-grade security with advanced encryption and fraud detection.',
          details: [
            'End-to-end encryption',
            'Hardware security modules',
            'Multi-factor authentication',
            'Biometric verification'
          ]
        },
        {
          icon: ExclamationTriangleIcon,
          color: 'amber',
          title: 'Risk Management',
          description: 'Advanced risk assessment and monitoring with real-time alerts.',
          details: [
            'Real-time risk scoring',
            'Transaction monitoring',
            'Suspicious activity alerts',
            'Compliance dashboards'
          ]
        }
      ]
    },
    lending: {
      title: 'Lending & Credit Solutions',
      description: 'Comprehensive payment infrastructure for lending platforms, P2P lending, and credit services.',
      features: [
        {
          icon: BanknotesIcon,
          color: 'blue',
          title: 'Automated Disbursements',
          description: 'Instant loan disbursements with automated verification and compliance checks.',
          details: [
            'Instant fund disbursement',
            'Automated verification',
            'Multi-channel delivery',
            'Compliance validation'
          ]
        },
        {
          icon: CalendarDaysIcon,
          color: 'green',
          title: 'Payment Scheduling',
          description: 'Flexible repayment scheduling with automated collection and reminders.',
          details: [
            'Flexible payment plans',
            'Automated collections',
            'Smart reminders',
            'Grace period management'
          ]
        },
        {
          icon: CalculatorIcon,
          color: 'purple',
          title: 'Credit Scoring',
          description: 'AI-powered credit assessment and risk evaluation for lending decisions.',
          details: [
            'AI-driven scoring',
            'Alternative data sources',
            'Real-time assessment',
            'Risk categorization'
          ]
        },
        {
          icon: UserGroupIcon,
          color: 'indigo',
          title: 'P2P Lending Support',
          description: 'Complete infrastructure for peer-to-peer lending platforms.',
          details: [
            'Investor fund management',
            'Borrower verification',
            'Automated matching',
            'Performance tracking'
          ]
        }
      ]
    },
    analytics: {
      title: 'Advanced Financial Analytics',
      description: 'Deep insights and reporting capabilities designed for financial institutions and regulatory requirements.',
      features: [
        {
          icon: ChartBarIcon,
          color: 'blue',
          title: 'Real-time Dashboards',
          description: 'Comprehensive dashboards with real-time financial metrics and KPIs.',
          details: [
            'Real-time data visualization',
            'Custom dashboard creation',
            'Executive reporting',
            'Mobile accessibility'
          ]
        },
        {
          icon: ArrowTrendingUpIcon,
          color: 'green',
          title: 'Risk Analytics',
          description: 'Advanced risk modeling and analytics for portfolio management.',
          details: [
            'Portfolio risk analysis',
            'Stress testing models',
            'Scenario analysis',
            'Risk forecasting'
          ]
        },
        {
          icon: DocumentCheckIcon,
          color: 'purple',
          title: 'Regulatory Reporting',
          description: 'Automated regulatory reporting with audit trails and compliance tracking.',
          details: [
            'Automated report generation',
            'Audit trail maintenance',
            'Compliance tracking',
            'Regulatory submissions'
          ]
        },
        {
          icon: BeakerIcon,
          color: 'orange',
          title: 'Predictive Analytics',
          description: 'AI-powered predictive analytics for financial forecasting and planning.',
          details: [
            'Cash flow forecasting',
            'Customer behavior prediction',
            'Market trend analysis',
            'Performance optimization'
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
            <Badge className="mb-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-400">
              Enterprise Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Built for{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Financial Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Enterprise-grade payment infrastructure with regulatory compliance, 
              advanced security, and institutional-level reliability.
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
                Enterprise Integration
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Seamlessly integrate with your existing financial infrastructure
              </p>
            </div>

            <Card className="p-8 bg-gray-900 text-white">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-4">banking-integration.js</span>
                </div>
                
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Initialize Sunny Financial Services SDK
const sunny = new SunnyFinancial({
  apiKey: process.env.SUNNY_API_KEY,
  environment: 'production',
  compliance: {
    pciDss: true,
    amlKyc: true,
    sox: true
  }
});

// Process high-value institutional transfer
const transfer = await sunny.transfers.create({
  amount: 10000000, // $10M
  currency: 'USD',
  from: {
    account: 'bank_account_123',
    type: 'institutional'
  },
  to: {
    account: 'correspondent_bank_456',
    type: 'correspondent'
  },
  compliance: {
    amlCheck: true,
    sanctionsScreening: true,
    riskAssessment: 'high_value'
  },
  settlement: {
    method: 'rtgs',
    priority: 'urgent'
  }
});

console.log('Transfer initiated:', transfer.id);
console.log('Compliance status:', transfer.compliance.status);
console.log('Settlement ETA:', transfer.settlement.eta);`}
                </pre>
              </div>
            </Card>
          </div>

          {/* Enterprise Support */}
          <div className="mt-20">
            <Card className="p-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
              <div className="space-y-8">
                <div>
                  <PhoneIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Enterprise Support & Services
                  </h3>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    Dedicated support for financial institutions with 24/7 availability, 
                    dedicated account management, and regulatory expertise.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="opacity-90">Enterprise Support</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">99.99%</div>
                    <div className="opacity-90">Uptime SLA</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">50+</div>
                    <div className="opacity-90">Regulatory Frameworks</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                    Schedule Enterprise Demo
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-3">
                    Contact Sales Team
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
