'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChatBubbleLeftEllipsisIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ClockIcon,
  GlobeAltIcon,
  ShoppingBagIcon,
  TruckIcon,
  HomeIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

export function MarketplaceCaseStudies() {
  const [activeCase, setActiveCase] = useState(0);

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

  const caseStudies = [
    {
      id: 0,
      company: 'GlobalMarket Pro',
      industry: 'Multi-Category Marketplace',
      icon: ShoppingBagIcon,
      color: 'blue',
      logo: '/images/case-studies/globalmarket-logo.png',
      challenge: 'Complex multi-vendor payouts across 50+ countries with different commission structures',
      solution: 'Implemented Sunny\'s split payment system with tiered commission models and instant global settlements',
      results: {
        metrics: [
          { label: 'Settlement Time', before: '7-14 days', after: '<2 minutes', improvement: '99%' },
          { label: 'Vendor Satisfaction', before: '68%', after: '94%', improvement: '38%' },
          { label: 'Transaction Volume', before: '$2M/month', after: '$8M/month', improvement: '300%' },
          { label: 'Operational Costs', before: '$50K/month', after: '$12K/month', improvement: '76%' }
        ],
        quote: 'Sunny transformed our marketplace operations. Instant vendor payouts increased our vendor retention by 40% and attracted premium sellers.',
        author: 'Sarah Chen',
        title: 'CEO, GlobalMarket Pro'
      },
      features: ['Split Payments', 'Global Settlements', 'Multi-Currency', 'Vendor Analytics']
    },
    {
      id: 1,
      company: 'DeliveryHub',
      industry: 'Food & Grocery Delivery',
      icon: TruckIcon,
      color: 'green',
      logo: '/images/case-studies/deliveryhub-logo.png',
      challenge: 'Managing payments between restaurants, drivers, and platform with real-time settlements',
      solution: 'Deployed 3-way split payments with dynamic commission rates based on delivery zones and peak hours',
      results: {
        metrics: [
          { label: 'Driver Earnings', before: 'Next day', after: 'Instant', improvement: '100%' },
          { label: 'Restaurant Payouts', before: 'Weekly', after: 'Daily', improvement: '85%' },
          { label: 'Platform Revenue', before: '$500K/month', after: '$1.2M/month', improvement: '140%' },
          { label: 'Dispute Resolution', before: '48 hours', after: '4 hours', improvement: '92%' }
        ],
        quote: 'Real-time payments revolutionized our driver retention. We went from 60% monthly churn to 15% with instant earnings.',
        author: 'Marcus Rodriguez',
        title: 'COO, DeliveryHub'
      },
      features: ['3-Way Splits', 'Dynamic Rates', 'Real-Time Payouts', 'Zone-Based Pricing']
    },
    {
      id: 2,
      company: 'PropertyConnect',
      industry: 'Real Estate Marketplace',
      icon: HomeIcon,
      color: 'purple',
      logo: '/images/case-studies/propertyconnect-logo.png',
      challenge: 'High-value transactions requiring escrow services and multiple party settlements',
      solution: 'Integrated escrow payments with automated release conditions and multi-party distributions',
      results: {
        metrics: [
          { label: 'Transaction Security', before: '92%', after: '99.8%', improvement: '8%' },
          { label: 'Closing Time', before: '45 days', after: '21 days', improvement: '53%' },
          { label: 'Commission Disputes', before: '12%', after: '1%', improvement: '92%' },
          { label: 'Agent Satisfaction', before: '71%', after: '96%', improvement: '35%' }
        ],
        quote: 'Sunny\'s escrow system gave our clients confidence in high-value transactions. Our average deal size increased 180%.',
        author: 'Jennifer Walsh',
        title: 'Founder, PropertyConnect'
      },
      features: ['Escrow Payments', 'Multi-Party Splits', 'Automated Release', 'High-Value Security']
    },
    {
      id: 3,
      company: 'EduMarketplace',
      industry: 'Online Education',
      icon: AcademicCapIcon,
      color: 'indigo',
      logo: '/images/case-studies/edumarketplace-logo.png',
      challenge: 'Revenue sharing between course creators, affiliates, and platform with subscription management',
      solution: 'Implemented subscription-based split payments with affiliate tracking and creator royalties',
      results: {
        metrics: [
          { label: 'Creator Payouts', before: 'Monthly', after: 'Weekly', improvement: '75%' },
          { label: 'Affiliate Commissions', before: 'Manual', after: 'Automated', improvement: '100%' },
          { label: 'Revenue Growth', before: '$100K/month', after: '$450K/month', improvement: '350%' },
          { label: 'Creator Retention', before: '45%', after: '89%', improvement: '98%' }
        ],
        quote: 'Automated revenue sharing attracted top educators to our platform. Our course quality and revenue both skyrocketed.',
        author: 'Dr. Ahmed Hassan',
        title: 'CTO, EduMarketplace'
      },
      features: ['Subscription Splits', 'Affiliate Tracking', 'Creator Royalties', 'Automated Payouts']
    }
  ];

  const industryStats = [
    {
      icon: ArrowTrendingUpIcon,
      color: 'green',
      stat: '340%',
      label: 'Average Revenue Growth',
      description: 'Marketplaces see significant growth after implementing split payments'
    },
    {
      icon: ClockIcon,
      color: 'blue',
      stat: '<2 min',
      label: 'Settlement Time',
      description: 'Instant vendor payouts improve satisfaction and retention'
    },
    {
      icon: UsersIcon,
      color: 'purple',
      stat: '85%',
      label: 'Vendor Retention',
      description: 'Higher retention rates with transparent, fast payments'
    },
    {
      icon: CurrencyDollarIcon,
      color: 'orange',
      stat: '65%',
      label: 'Cost Reduction',
      description: 'Lower operational costs through automation'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Marketplace{' '}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See how leading marketplaces transformed their operations and accelerated growth 
              with Sunny's payment solutions.
            </p>
          </div>

          {/* Industry Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {industryStats.map((stat, index) => {
              const StatIconComponent = stat.icon;
              
              return (
                <Card key={index} className="p-6 text-center bg-gray-50 dark:bg-gray-800">
                  <div className={`w-12 h-12 mx-auto mb-3 ${getBgClasses(stat.color)} rounded-full flex items-center justify-center`}>
                    <StatIconComponent className={`w-6 h-6 ${getColorClasses(stat.color)}`} />
                  </div>
                  <div className={`text-2xl font-bold ${getColorClasses(stat.color)} mb-1`}>
                    {stat.stat}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Case Study Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {caseStudies.map((study, index) => {
              const StudyIconComponent = study.icon;
              
              return (
                <button
                  key={study.id}
                  onClick={() => setActiveCase(index)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-3 ${
                    activeCase === index
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <StudyIconComponent className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">{study.company}</div>
                    <div className="text-xs opacity-75">{study.industry}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Case Study */}
          <div className="space-y-12">
            {(() => {
              const activeStudy = caseStudies[activeCase];
              const StudyIconComponent = activeStudy.icon;
              
              return (
                <>
                  {/* Case Study Header */}
                  <Card className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 ${getBgClasses(activeStudy.color)} rounded-lg`}>
                            <StudyIconComponent className={`w-8 h-8 ${getColorClasses(activeStudy.color)}`} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {activeStudy.company}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {activeStudy.industry}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Challenge</h4>
                            <p className="text-gray-600 dark:text-gray-400">{activeStudy.challenge}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Solution</h4>
                            <p className="text-gray-600 dark:text-gray-400">{activeStudy.solution}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {activeStudy.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} className={`${getBgClasses(activeStudy.color)} ${getColorClasses(activeStudy.color)} border-0`}>
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Testimonial */}
                      <Card className="p-6 bg-white dark:bg-gray-800">
                        <div className="space-y-4">
                          <ChatBubbleLeftEllipsisIcon className={`w-8 h-8 ${getColorClasses(activeStudy.color)}`} />
                          <blockquote className="text-lg text-gray-900 dark:text-white italic">
                            "{activeStudy.results.quote}"
                          </blockquote>
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 ${getBgClasses(activeStudy.color)} rounded-full flex items-center justify-center`}>
                              <span className={`font-bold ${getColorClasses(activeStudy.color)}`}>
                                {activeStudy.results.author.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {activeStudy.results.author}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {activeStudy.results.title}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </Card>

                  {/* Results Metrics */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activeStudy.results.metrics.map((metric, metricIndex) => (
                      <Card key={metricIndex} className="p-6 text-center bg-gray-50 dark:bg-gray-800">
                        <div className="space-y-3">
                          <h5 className="font-semibold text-gray-900 dark:text-white">
                            {metric.label}
                          </h5>
                          <div className="space-y-2">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Before: <span className="font-medium">{metric.before}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              After: <span className="font-medium text-green-600">{metric.after}</span>
                            </div>
                          </div>
                          <div className={`text-2xl font-bold ${getColorClasses('green')}`}>
                            {metric.improvement} better
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>

          {/* Global Impact */}
          <div className="mt-20">
            <Card className="p-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
              <div className="space-y-8">
                <div>
                  <GlobeAltIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Powering Marketplaces Worldwide
                  </h3>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    Join 500+ marketplaces across 190 countries that trust Sunny 
                    for their payment infrastructure
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="opacity-90">Active Marketplaces</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">190</div>
                    <div className="opacity-90">Countries Supported</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">$2B+</div>
                    <div className="opacity-90">Processed Monthly</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                    Start Your Success Story
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-3">
                    View All Case Studies
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
