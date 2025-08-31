'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CreditCardIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ClockIcon,
  BoltIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  CogIcon,
  DocumentChartBarIcon,
  ExclamationTriangleIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

export function SaaSFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);

  // Helper function to get color classes
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      purple: 'text-purple-600 dark:text-purple-400',
      indigo: 'text-indigo-600 dark:text-indigo-400'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-blue-600 dark:text-blue-400';
  };

  const getBorderClasses = (color: string, isActive: boolean) => {
    if (!isActive) return 'bg-white dark:bg-gray-700 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600';
    
    const colorMap = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700',
      green: 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700',
      purple: 'bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-700',
      indigo: 'bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-700'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700';
  };

  const getIconBgClasses = (color: string, isActive: boolean) => {
    if (!isActive) return 'bg-gray-100 dark:bg-gray-600';
    
    const colorMap = {
      blue: 'bg-blue-100 dark:bg-blue-900/40',
      green: 'bg-green-100 dark:bg-green-900/40',
      purple: 'bg-purple-100 dark:bg-purple-900/40',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/40'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-blue-100 dark:bg-blue-900/40';
  };

  const mainFeatures = [
    {
      id: 0,
      title: 'Subscription Management',
      description: 'Complete subscription lifecycle management with flexible billing cycles, prorations, and upgrades/downgrades.',
      icon: CreditCardIcon,
      color: 'blue',
      features: [
        'Flexible billing cycles (monthly, quarterly, annual, custom)',
        'Automatic proration calculations',
        'Plan upgrades and downgrades',
        'Trial period management',
        'Add-ons and usage-based billing',
        'Subscription pausing and resumption'
      ],
      demo: {
        title: 'Subscription Dashboard',
        metrics: [
          { label: 'Active Subscriptions', value: '12,847', change: '+8.2%' },
          { label: 'Monthly Churn Rate', value: '2.1%', change: '-0.5%' },
          { label: 'Average Revenue Per User', value: '$89', change: '+12.3%' }
        ]
      }
    },
    {
      id: 1,
      title: 'Smart Dunning Management',
      description: 'AI-powered payment retry logic that recovers up to 40% of failed payments and reduces involuntary churn.',
      icon: BoltIcon,
      color: 'green',
      features: [
        'Intelligent retry sequences',
        'Custom retry rules per payment method',
        'Automated customer communication',
        'Grace period management',
        'Payment method update requests',
        'Churn prevention workflows'
      ],
      demo: {
        title: 'Dunning Performance',
        metrics: [
          { label: 'Recovery Rate', value: '38.7%', change: '+5.2%' },
          { label: 'Failed Payments', value: '156', change: '-23.1%' },
          { label: 'Recovered Revenue', value: '$47.2K', change: '+15.8%' }
        ]
      }
    },
    {
      id: 2,
      title: 'Revenue Analytics',
      description: 'Deep insights into your subscription business with MRR, ARR, cohort analysis, and revenue forecasting.',
      icon: ChartBarIcon,
      color: 'purple',
      features: [
        'MRR and ARR tracking',
        'Cohort analysis and retention curves',
        'Revenue forecasting',
        'Customer lifetime value analysis',
        'Churn analysis and predictions',
        'Revenue recognition compliance'
      ],
      demo: {
        title: 'Revenue Insights',
        metrics: [
          { label: 'Monthly Recurring Revenue', value: '$847K', change: '+18.5%' },
          { label: 'Annual Run Rate', value: '$10.2M', change: '+22.1%' },
          { label: 'Customer LTV', value: '$2,340', change: '+9.7%' }
        ]
      }
    },
    {
      id: 3,
      title: 'Global Tax Compliance',
      description: 'Automated tax calculations, compliance reporting, and support for VAT, GST, and sales tax worldwide.',
      icon: GlobeAltIcon,
      color: 'indigo',
      features: [
        'Automatic tax rate detection',
        'VAT/GST compliance for EU and other regions',
        'US sales tax calculation',
        'Tax reporting and filing assistance',
        'Reverse charge mechanisms',
        'Digital service tax compliance'
      ],
      demo: {
        title: 'Tax Management',
        metrics: [
          { label: 'Tax Jurisdictions', value: '47', change: '+3' },
          { label: 'Compliance Rate', value: '99.9%', change: '0%' },
          { label: 'Tax Collected', value: '$89.2K', change: '+14.2%' }
        ]
      }
    }
  ];

  const additionalFeatures = [
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Security',
      description: 'Bank-grade security with PCI DSS Level 1 compliance, encryption, and fraud protection.',
      benefits: ['PCI DSS Level 1', 'End-to-end encryption', 'Advanced fraud detection', 'SOC 2 compliance']
    },
    {
      icon: CogIcon,
      title: 'Flexible APIs',
      description: 'RESTful APIs and webhooks for seamless integration with your existing tech stack.',
      benefits: ['RESTful APIs', 'Real-time webhooks', 'SDKs for all languages', 'Comprehensive documentation']
    },
    {
      icon: UserGroupIcon,
      title: 'Customer Portal',
      description: 'Self-service portal for customers to manage subscriptions, update payment methods, and view invoices.',
      benefits: ['Self-service management', 'Payment method updates', 'Invoice downloads', 'Usage tracking']
    },
    {
      icon: DocumentChartBarIcon,
      title: 'Advanced Reporting',
      description: 'Customizable reports and dashboards with real-time data and automated insights.',
      benefits: ['Custom reports', 'Real-time dashboards', 'Automated insights', 'Data exports']
    },
    {
      icon: BanknotesIcon,
      title: 'Multi-Currency Support',
      description: 'Accept payments in 135+ currencies with automatic conversion and local pricing.',
      benefits: ['135+ currencies', 'Automatic conversion', 'Local pricing', 'Currency hedging']
    },
    {
      icon: CalendarDaysIcon,
      title: 'Billing Automation',
      description: 'Fully automated billing processes with customizable invoice templates and delivery.',
      benefits: ['Automated invoicing', 'Custom templates', 'Multi-channel delivery', 'Payment reminders']
    }
  ];

  const integrations = [
    { name: 'Stripe', category: 'Payments', logo: '💳' },
    { name: 'Salesforce', category: 'CRM', logo: '☁️' },
    { name: 'HubSpot', category: 'CRM', logo: '🧡' },
    { name: 'Slack', category: 'Communication', logo: '💬' },
    { name: 'Zapier', category: 'Automation', logo: '⚡' },
    { name: 'Webhooks', category: 'Custom', logo: '🔗' }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
              <BeakerIcon className="w-4 h-4 mr-2" />
              Advanced SaaS Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Everything You Need to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Scale Your SaaS
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From subscription management to revenue analytics, our comprehensive platform 
              handles every aspect of SaaS payments so you can focus on growing your business.
            </p>
          </div>
        </div>

        {/* Main Features Showcase */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Feature Navigation */}
            <div className="space-y-4">
              {mainFeatures.map((feature, index) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(index)}
                  className={`w-full text-left p-6 rounded-lg transition-all ${getBorderClasses(feature.color, activeFeature === index)}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${getIconBgClasses(feature.color, activeFeature === index)}`}>
                      {(() => {
                        const IconComponent = feature.icon;
                        return <IconComponent className={`w-6 h-6 ${
                          activeFeature === index
                            ? getColorClasses(feature.color)
                            : 'text-gray-600 dark:text-gray-400'
                        }`} />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${
                        activeFeature === index
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Feature Details */}
            <div className="space-y-6">
              <Card className="p-8 bg-white dark:bg-gray-700">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const IconComponent = mainFeatures[activeFeature].icon;
                      return <IconComponent className={`w-8 h-8 ${getColorClasses(mainFeatures[activeFeature].color)}`} />;
                    })()}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {mainFeatures[activeFeature].title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {mainFeatures[activeFeature].features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Demo Metrics */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {mainFeatures[activeFeature].demo.title}
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {mainFeatures[activeFeature].demo.metrics.map((metric, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-300">{metric.label}</span>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                              {metric.value}
                            </div>
                            <div className={`text-sm ${
                              metric.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                              {metric.change}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Complete SaaS Payment Infrastructure
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Everything you need to manage subscriptions, payments, and revenue growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="p-6 bg-white dark:bg-gray-700 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                      <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Integrations Section */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Seamless Integrations
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Connect with your existing tools and workflows. Our flexible APIs and pre-built 
              integrations make it easy to get started.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="p-4 bg-white dark:bg-gray-700 text-center hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <div className="text-3xl">{integration.logo}</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {integration.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {integration.category}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="pt-8">
            <Button variant="outline" size="lg">
              View All Integrations
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
