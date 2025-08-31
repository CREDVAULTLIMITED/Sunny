'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChartBarIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  BoltIcon,
  CogIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  LockClosedIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export function EcommerceFeatures() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Features', icon: CogIcon },
    { id: 'conversion', label: 'Conversion', icon: ArrowTrendingUpIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'global', label: 'Global', icon: GlobeAltIcon },
  ];

  const features = [
    // Conversion Optimization
    {
      category: 'conversion',
      title: 'A/B Test Checkout Flows',
      description: 'Test different checkout layouts, payment methods, and flows to maximize conversions',
      icon: ChartBarIcon,
      benefits: ['Increase conversion rates', 'Data-driven decisions', 'Real-time results'],
      metric: '+23% conversion improvement',
      status: 'Available',
      popular: true
    },
    {
      category: 'conversion',
      title: 'Smart Payment Routing',
      description: 'AI-powered routing to the best payment processor for each transaction',
      icon: BoltIcon,
      benefits: ['Higher approval rates', 'Lower processing costs', 'Automatic optimization'],
      metric: '+15% approval rate',
      status: 'Available',
      popular: true
    },
    {
      category: 'conversion',
      title: 'One-Click Checkout',
      description: 'Returning customers can complete purchases with a single click',
      icon: DevicePhoneMobileIcon,
      benefits: ['Faster checkout', 'Better mobile experience', 'Higher repeat purchases'],
      metric: '80% faster checkout',
      status: 'Available',
      popular: false
    },
    {
      category: 'conversion',
      title: 'Cart Abandonment Recovery',
      description: 'Automated emails and notifications to recover abandoned shopping carts',
      icon: DocumentTextIcon,
      benefits: ['Recover lost sales', 'Automated campaigns', 'Personalized messaging'],
      metric: '25% cart recovery',
      status: 'Available',
      popular: false
    },

    // Security Features
    {
      category: 'security',
      title: 'AI Fraud Detection',
      description: 'Machine learning models analyze transactions in real-time to prevent fraud',
      icon: ShieldCheckIcon,
      benefits: ['Real-time protection', 'Reduce chargebacks', 'Lower fraud rates'],
      metric: '99.8% fraud detection',
      status: 'Available',
      popular: true
    },
    {
      category: 'security',
      title: 'PCI DSS Level 1 Compliance',
      description: 'Highest level of payment security compliance for enterprise businesses',
      icon: LockClosedIcon,
      benefits: ['Enterprise security', 'Compliance guarantee', 'Regular audits'],
      metric: 'Level 1 certified',
      status: 'Available',
      popular: true
    },
    {
      category: 'security',
      title: '3D Secure Authentication',
      description: 'Additional security layer for card payments with liability shift',
      icon: ShieldCheckIcon,
      benefits: ['Liability protection', 'Reduced fraud', 'SCA compliance'],
      metric: '90% fraud reduction',
      status: 'Available',
      popular: false
    },
    {
      category: 'security',
      title: 'Tokenization & Encryption',
      description: 'Advanced tokenization and end-to-end encryption for sensitive data',
      icon: LockClosedIcon,
      benefits: ['Data protection', 'Compliance ready', 'Secure storage'],
      metric: 'AES-256 encryption',
      status: 'Available',
      popular: false
    },

    // Analytics Features
    {
      category: 'analytics',
      title: 'Real-Time Analytics',
      description: 'Live dashboard with transaction data, conversion rates, and revenue metrics',
      icon: ChartBarIcon,
      benefits: ['Live data', 'Custom dashboards', 'Automated reports'],
      metric: 'Real-time updates',
      status: 'Available',
      popular: true
    },
    {
      category: 'analytics',
      title: 'Customer Insights',
      description: 'Deep analytics on customer behavior, preferences, and purchase patterns',
      icon: ChartBarIcon,
      benefits: ['Customer segmentation', 'Behavioral analysis', 'Predictive insights'],
      metric: '360° customer view',
      status: 'Available',
      popular: false
    },
    {
      category: 'analytics',
      title: 'Revenue Optimization',
      description: 'AI-powered recommendations to optimize pricing and payment flows',
      icon: CurrencyDollarIcon,
      benefits: ['Revenue insights', 'Pricing optimization', 'Performance recommendations'],
      metric: '+12% revenue increase',
      status: 'Available',
      popular: false
    },
    {
      category: 'analytics',
      title: 'Custom Reporting',
      description: 'Build custom reports and export data for deeper business analysis',
      icon: DocumentTextIcon,
      benefits: ['Custom reports', 'Data export', 'API access'],
      metric: 'Unlimited reports',
      status: 'Available',
      popular: false
    },

    // Global Features
    {
      category: 'global',
      title: 'Multi-Currency Support',
      description: 'Accept payments in 135+ currencies with automatic conversion',
      icon: CurrencyDollarIcon,
      benefits: ['Global reach', 'Local currencies', 'Real-time rates'],
      metric: '135+ currencies',
      status: 'Available',
      popular: true
    },
    {
      category: 'global',
      title: 'Localization',
      description: 'Checkout forms in 35+ languages with local payment preferences',
      icon: GlobeAltIcon,
      benefits: ['Local languages', 'Cultural preferences', 'Higher conversions'],
      metric: '35+ languages',
      status: 'Available',
      popular: false
    },
    {
      category: 'global',
      title: 'Regional Payment Methods',
      description: 'Support for local payment methods in each market',
      icon: GlobeAltIcon,
      benefits: ['Local preferences', 'Higher acceptance', 'Market expansion'],
      metric: '190+ countries',
      status: 'Available',
      popular: false
    },
    {
      category: 'global',
      title: 'Tax Calculation',
      description: 'Automatic tax calculation for global transactions and compliance',
      icon: DocumentTextIcon,
      benefits: ['Tax compliance', 'Automatic calculation', 'Global coverage'],
      metric: 'Global tax support',
      status: 'Available',
      popular: false
    },
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeCategory);

  const stats = [
    { label: 'Features Available', value: features.length.toString(), icon: CogIcon },
    { label: 'Popular Features', value: features.filter(f => f.popular).length.toString(), icon: ArrowTrendingUpIcon },
    { label: 'Security Certifications', value: '5+', icon: ShieldCheckIcon },
    { label: 'API Endpoints', value: '150+', icon: CloudIcon },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Comprehensive E-commerce Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to build, optimize, and scale your e-commerce business. 
              From conversion optimization to global expansion, we've got you covered.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg mb-3">
                  <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="relative"
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
              {category.id !== 'all' && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {features.filter(f => f.category === category.id).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredFeatures.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 relative">
              {feature.popular && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  Popular
                </Badge>
              )}
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                    </div>
                  </div>
                  <Badge 
                    variant={feature.status === 'Available' ? 'default' : 'secondary'} 
                    className="text-xs"
                  >
                    {feature.status}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Benefits:</div>
                  <div className="space-y-1">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metric */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Impact:</span>
                    <Badge variant="outline" className="text-xs font-medium">
                      {feature.metric}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-0">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                All Features Included in Every Plan
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Unlike other payment processors, all our advanced features are available 
                in every plan. No hidden fees, no feature restrictions.
              </p>
            </div>

            {/* Feature Categories Summary */}
            <div className="grid md:grid-cols-4 gap-6">
              {categories.slice(1).map((category, index) => {
                const categoryFeatures = features.filter(f => f.category === category.id);
                return (
                  <div key={index} className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <category.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{category.label}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {categoryFeatures.length} features included
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Compare All Features
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
