'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ShoppingCartIcon,
  UsersIcon,
  BanknotesIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ClockIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export function MarketplaceHero() {
  const [activeFeature, setActiveFeature] = useState(0);

  // Static color mapping to avoid dynamic Tailwind classes
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      purple: 'text-purple-600 dark:text-purple-400',
      indigo: 'text-indigo-600 dark:text-indigo-400',
      orange: 'text-orange-600 dark:text-orange-400',
      emerald: 'text-emerald-600 dark:text-emerald-400'
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
      emerald: 'bg-emerald-100 dark:bg-emerald-900/40'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-blue-100 dark:bg-blue-900/40';
  };

  const keyFeatures = [
    {
      id: 0,
      icon: ShoppingCartIcon,
      color: 'blue',
      title: 'Split Payments',
      description: 'Automatically split payments between vendors and platform',
      details: ['Instant vendor payouts', 'Flexible commission structures', 'Multi-currency support']
    },
    {
      id: 1,
      icon: UsersIcon,
      color: 'green',
      title: 'Vendor Management',
      description: 'Comprehensive vendor onboarding and management',
      details: ['KYC verification', 'Performance analytics', 'Automated compliance']
    },
    {
      id: 2,
      icon: BanknotesIcon,
      color: 'purple',
      title: 'Commission Control',
      description: 'Flexible commission structures and fee management',
      details: ['Dynamic commission rates', 'Tiered pricing', 'Revenue optimization']
    },
    {
      id: 3,
      icon: ChartBarIcon,
      color: 'indigo',
      title: 'Analytics & Insights',
      description: 'Deep marketplace analytics and reporting',
      details: ['Vendor performance', 'Revenue tracking', 'Market insights']
    }
  ];

  const trustIndicators = [
    { icon: GlobeAltIcon, color: 'blue', label: '190+ Countries', value: 'Global Reach' },
    { icon: ShieldCheckIcon, color: 'green', label: 'PCI DSS Level 1', value: 'Security' },
    { icon: ClockIcon, color: 'purple', label: '<2 Minutes', value: 'Settlement' },
    { icon: CurrencyDollarIcon, color: 'orange', label: '135+ Currencies', value: 'Multi-Currency' }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400">
              Marketplace Solutions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Power Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Marketplace
              </span>
              <br />
              with Smart Payments
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Handle complex multi-party transactions, vendor payouts, and commission management 
              with our advanced marketplace payment solutions. Built for global marketplaces.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Start Integration
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                View Documentation
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

          {/* Interactive Features Preview */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Navigation */}
            <div className="space-y-4">
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
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
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
                  
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                        <span className="text-sm font-medium">Customer Payment</span>
                        <span className="text-lg font-bold text-green-600">$100.00</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-sm font-medium">Platform Fee (5%)</span>
                        <span className="text-lg font-bold text-blue-600">$5.00</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <span className="text-sm font-medium">Vendor Payout</span>
                        <span className="text-lg font-bold text-purple-600">$95.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">
                      ✓ Instant Settlement
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
