'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  BuildingLibraryIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  LockClosedIcon,
  UserGroupIcon,
  CreditCardIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';

export function FinancialServicesHero() {
  const [activeFeature, setActiveFeature] = useState(0);

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

  const keyFeatures = [
    {
      id: 0,
      icon: BuildingLibraryIcon,
      color: 'blue',
      title: 'Banking Solutions',
      description: 'Complete payment infrastructure for traditional and digital banks',
      details: ['Digital wallet integration', 'Real-time settlements', 'Multi-currency support']
    },
    {
      id: 1,
      icon: ShieldCheckIcon,
      color: 'green',
      title: 'Regulatory Compliance',
      description: 'Built-in compliance for global financial regulations',
      details: ['PCI DSS Level 1', 'AML/KYC automation', 'SOX compliance']
    },
    {
      id: 2,
      icon: CreditCardIcon,
      color: 'purple',
      title: 'Lending & Credit',
      description: 'Advanced payment solutions for lending platforms',
      details: ['Automated disbursements', 'Payment scheduling', 'Risk assessment']
    },
    {
      id: 3,
      icon: ChartBarIcon,
      color: 'indigo',
      title: 'Financial Analytics',
      description: 'Deep insights and reporting for financial institutions',
      details: ['Real-time dashboards', 'Risk analytics', 'Regulatory reporting']
    }
  ];

  const trustIndicators = [
    { icon: ShieldCheckIcon, color: 'green', label: 'PCI DSS Level 1', value: 'Certified' },
    { icon: GlobeAltIcon, color: 'blue', label: '50+ Regulations', value: 'Compliant' },
    { icon: ClockIcon, color: 'purple', label: '99.99%', value: 'Uptime SLA' },
    { icon: LockClosedIcon, color: 'amber', label: 'Bank-Grade', value: 'Security' }
  ];

  const industryTypes = [
    {
      icon: BuildingLibraryIcon,
      color: 'blue',
      title: 'Traditional Banking',
      description: 'Digital transformation for established banks'
    },
    {
      icon: CreditCardIcon,
      color: 'green',
      title: 'Digital Banks',
      description: 'Complete infrastructure for neobanks'
    },
    {
      icon: CalculatorIcon,
      color: 'purple',
      title: 'Lending Platforms',
      description: 'Payment solutions for P2P and business lending'
    },
    {
      icon: UserGroupIcon,
      color: 'indigo',
      title: 'Insurance',
      description: 'Claims processing and premium collections'
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400">
              Financial Services Solutions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Enterprise{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Financial
              </span>
              <br />
              Payment Infrastructure
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Power your financial services with enterprise-grade payment solutions. 
              Built for banks, fintech, lending platforms, and insurance companies with 
              regulatory compliance and institutional-grade security.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Schedule Enterprise Demo
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                View Compliance Docs
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {trustIndicators.map((indicator, index) => {
                const IconComponent = indicator.icon;
                return (
                  <Card key={index} className="p-4 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <div className={`w-12 h-12 mx-auto mb-2 rounded-lg ${getBgClasses(indicator.color)} flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${getColorClasses(indicator.color)}`} />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {indicator.label}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {indicator.value}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Industry Types */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Built for Every Financial Service
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                From traditional banks to innovative fintech startups, we power the future of finance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industryTypes.map((industry, index) => {
                const IndustryIconComponent = industry.icon;
                
                return (
                  <Card key={index} className="p-6 text-center bg-white dark:bg-gray-800 hover:shadow-lg transition-all">
                    <div className={`w-16 h-16 mx-auto mb-4 ${getBgClasses(industry.color)} rounded-full flex items-center justify-center`}>
                      <IndustryIconComponent className={`w-8 h-8 ${getColorClasses(industry.color)}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {industry.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {industry.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Interactive Features Preview */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Navigation */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Enterprise-Grade Capabilities
              </h3>
              {keyFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                const isActive = activeFeature === index;
                
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    className={`w-full text-left p-6 rounded-xl transition-all ${
                      isActive
                        ? 'bg-white dark:bg-gray-800 shadow-lg border-2 border-blue-200 dark:border-blue-700'
                        : 'bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${getBgClasses(feature.color)}`}>
                        <IconComponent className={`w-6 h-6 ${getColorClasses(feature.color)}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {feature.description}
                        </p>
                        <div className="space-y-1">
                          {feature.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feature Visual */}
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const IconComponent = keyFeatures[activeFeature].icon;
                      return <IconComponent className={`w-8 h-8 ${getColorClasses(keyFeatures[activeFeature].color)}`} />;
                    })()}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {keyFeatures[activeFeature].title}
                    </h3>
                  </div>
                  
                  {/* Feature-specific visual content */}
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                    {activeFeature === 0 && (
                      // Banking Solutions Visual
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                          <span className="text-sm font-medium">Account Balance</span>
                          <span className="text-lg font-bold text-green-600">$1,234,567.89</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <span className="text-sm font-medium">Pending Transfers</span>
                          <span className="text-lg font-bold text-blue-600">$45,678.90</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <span className="text-sm font-medium">Daily Volume</span>
                          <span className="text-lg font-bold text-purple-600">$2,890,123.45</span>
                        </div>
                      </div>
                    )}
                    
                    {activeFeature === 1 && (
                      // Compliance Visual
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                            <ShieldCheckIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <div className="text-sm font-medium">PCI DSS</div>
                            <div className="text-xs text-green-600">Compliant</div>
                          </div>
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                            <DocumentCheckIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <div className="text-sm font-medium">SOX</div>
                            <div className="text-xs text-green-600">Certified</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeFeature === 2 && (
                      // Lending Visual
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                          <span className="text-sm font-medium">Loan Disbursement</span>
                          <span className="text-lg font-bold text-blue-600">$50,000.00</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="text-sm font-medium">Payment Received</span>
                          <span className="text-lg font-bold text-green-600">$2,150.00</span>
                        </div>
                      </div>
                    )}
                    
                    {activeFeature === 3 && (
                      // Analytics Visual
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">99.8%</div>
                            <div className="text-xs">Success Rate</div>
                          </div>
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">1.2s</div>
                            <div className="text-xs">Avg Response</div>
                          </div>
                          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">24/7</div>
                            <div className="text-xs">Monitoring</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">
                      ✓ Enterprise Ready
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
