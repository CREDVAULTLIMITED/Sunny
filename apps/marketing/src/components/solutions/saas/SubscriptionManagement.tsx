'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CreditCardIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PauseIcon,
  PlayIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  CheckCircleIcon,
  XMarkIcon,
  ClockIcon,
  GiftIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

export function SubscriptionManagement() {
  const [activeTab, setActiveTab] = useState('lifecycle');

  const subscriptionFeatures = [
    {
      id: 'lifecycle',
      title: 'Subscription Lifecycle',
      description: 'Complete management from trial to cancellation',
      icon: CreditCardIcon,
      content: {
        title: 'End-to-End Subscription Management',
        description: 'Handle every aspect of the subscription lifecycle with automated workflows and intelligent decision-making.',
        features: [
          {
            icon: GiftIcon,
            title: 'Free Trials & Freemium',
            description: 'Flexible trial periods with automatic conversion',
            details: ['Custom trial lengths', 'No credit card required options', 'Trial extension capabilities', 'Conversion tracking']
          },
          {
            icon: ArrowTrendingUpIcon,
            title: 'Plan Upgrades',
            description: 'Seamless plan upgrades with proration',
            details: ['Instant plan changes', 'Automatic proration', 'Usage-based upgrades', 'Upgrade incentives']
          },
          {
            icon: ArrowTrendingDownIcon,
            title: 'Downgrades & Changes',
            description: 'Flexible plan changes and modifications',
            details: ['Immediate or end-of-cycle changes', 'Credit management', 'Feature access control', 'Change notifications']
          },
          {
            icon: PauseIcon,
            title: 'Pause & Resume',
            description: 'Subscription pausing without cancellation',
            details: ['Temporary suspension', 'Scheduled resumption', 'Pause duration limits', 'Data retention during pause']
          }
        ]
      }
    },
    {
      id: 'billing',
      title: 'Flexible Billing',
      description: 'Support for any billing model or cycle',
      icon: CalendarDaysIcon,
      content: {
        title: 'Advanced Billing Flexibility',
        description: 'Support any billing model from simple subscriptions to complex usage-based pricing.',
        features: [
          {
            icon: CalendarDaysIcon,
            title: 'Custom Billing Cycles',
            description: 'Any billing frequency your business needs',
            details: ['Monthly, quarterly, annual billing', 'Custom intervals (e.g., every 3 months)', 'Multiple cycles per customer', 'Billing date optimization']
          },
          {
            icon: ChartBarIcon,
            title: 'Usage-Based Billing',
            description: 'Meter usage and bill accordingly',
            details: ['API call metering', 'Storage usage tracking', 'Tiered usage pricing', 'Overage handling']
          },
          {
            icon: BanknotesIcon,
            title: 'Hybrid Models',
            description: 'Combine fixed and variable pricing',
            details: ['Base subscription + usage', 'Per-seat with overages', 'Tiered hybrid pricing', 'Custom billing logic']
          },
          {
            icon: CurrencyDollarIcon,
            title: 'Proration & Credits',
            description: 'Accurate billing adjustments',
            details: ['Automatic proration', 'Credit management', 'Refund processing', 'Billing adjustments']
          }
        ]
      }
    },
    {
      id: 'analytics',
      title: 'Revenue Analytics',
      description: 'Deep insights into subscription performance',
      icon: ChartBarIcon,
      content: {
        title: 'Subscription Business Intelligence',
        description: 'Get actionable insights into your subscription business with comprehensive analytics and forecasting.',
        features: [
          {
            icon: CurrencyDollarIcon,
            title: 'MRR & ARR Tracking',
            description: 'Monitor recurring revenue growth',
            details: ['Real-time MRR calculation', 'ARR projections', 'Revenue cohorts', 'Growth rate analysis']
          },
          {
            icon: UserGroupIcon,
            title: 'Customer Metrics',
            description: 'Understand customer behavior and value',
            details: ['Customer lifetime value', 'Churn prediction', 'Retention analysis', 'Segmentation insights']
          },
          {
            icon: ChartBarIcon,
            title: 'Performance Dashboards',
            description: 'Real-time business intelligence',
            details: ['Executive dashboards', 'Custom KPI tracking', 'Automated reporting', 'Data visualization']
          },
          {
            icon: ArrowTrendingUpIcon,
            title: 'Revenue Forecasting',
            description: 'Predict future revenue and growth',
            details: ['AI-powered forecasting', 'Scenario modeling', 'Churn impact analysis', 'Growth projections']
          }
        ]
      }
    },
    {
      id: 'automation',
      title: 'Smart Automation',
      description: 'Automated workflows and decision-making',
      icon: CogIcon,
      content: {
        title: 'Intelligent Subscription Automation',
        description: 'Reduce manual work with smart automation that handles routine tasks and makes intelligent decisions.',
        features: [
          {
            icon: CheckCircleIcon,
            title: 'Automated Provisioning',
            description: 'Instant access upon payment',
            details: ['Account activation', 'Feature enablement', 'Access provisioning', 'Welcome workflows']
          },
          {
            icon: ClockIcon,
            title: 'Renewal Management',
            description: 'Automated renewal processes',
            details: ['Automatic renewals', 'Renewal reminders', 'Payment retries', 'Renewal optimization']
          },
          {
            icon: CogIcon,
            title: 'Workflow Automation',
            description: 'Custom business logic automation',
            details: ['Rule-based workflows', 'Event triggers', 'Multi-step processes', 'Exception handling']
          },
          {
            icon: UserGroupIcon,
            title: 'Customer Communications',
            description: 'Automated customer touchpoints',
            details: ['Lifecycle emails', 'Usage notifications', 'Billing reminders', 'Engagement campaigns']
          }
        ]
      }
    }
  ];

  const stats = [
    { label: 'Subscription Growth', value: '+156%', icon: ArrowTrendingUpIcon, color: 'green' },
    { label: 'Churn Reduction', value: '-67%', icon: ArrowTrendingDownIcon, color: 'green' },
    { label: 'Revenue Recovery', value: '+$2.3M', icon: CurrencyDollarIcon, color: 'blue' },
    { label: 'Time Saved', value: '40 hrs/week', icon: ClockIcon, color: 'purple' }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
              <CreditCardIcon className="w-4 h-4 mr-2" />
              Subscription Management
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Complete Subscription
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Lifecycle Management
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From trial to renewal, manage every aspect of your subscription business with 
              intelligent automation, flexible billing, and deep analytics.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const StatIconComponent = stat.icon;
              const colorClasses = {
                blue: 'text-blue-600 dark:text-blue-400',
                green: 'text-green-600 dark:text-green-400',
                purple: 'text-purple-600 dark:text-purple-400',
                indigo: 'text-indigo-600 dark:text-indigo-400'
              }[stat.color] || 'text-blue-600 dark:text-blue-400';
              
              return (
                <Card key={index} className="p-6 text-center bg-white dark:bg-gray-800">
                  <div className="space-y-2">
                    <StatIconComponent className={`w-8 h-8 mx-auto ${colorClasses}`} />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Feature Tabs */}
        <div className="space-y-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2">
            {subscriptionFeatures.map((feature) => {
              const FeatureIconComponent = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === feature.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FeatureIconComponent className="w-5 h-5" />
                    <span>{feature.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <div className="space-y-6">
              {(() => {
                const activeFeature = subscriptionFeatures.find(f => f.id === activeTab);
                if (!activeFeature) return null;
                
                const IconComponent = activeFeature.icon;
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      {IconComponent && (
                        <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      )}
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {activeFeature.content.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      {activeFeature.content.description}
                    </p>
                  </div>
                );
              })()}

              <div className="grid gap-6">
                {(() => {
                  const activeFeature = subscriptionFeatures.find(f => f.id === activeTab);
                  return activeFeature?.content.features.map((feature, index) => {
                    const FeatureIconComponent = feature.icon;
                    return (
                      <Card key={index} className="p-6 bg-gray-50 dark:bg-gray-800">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-4">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex-shrink-0">
                              <FeatureIconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <div className="pl-14 space-y-2">
                        {feature.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center space-x-2">
                            <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                      </Card>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Visual Demo */}
            <div className="space-y-6">
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Subscription Dashboard
                    </h4>
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Live Demo
                    </Badge>
                  </div>

                  {/* Mock Subscription List */}
                  <div className="space-y-3">
                    {[
                      { plan: 'Pro Plan', customer: 'Acme Corp', status: 'Active', mrr: '$299', next: 'Dec 15' },
                      { plan: 'Enterprise', customer: 'TechFlow', status: 'Trial', mrr: '$999', next: 'Dec 10' },
                      { plan: 'Starter', customer: 'StartupXYZ', status: 'Past Due', mrr: '$49', next: 'Dec 8' }
                    ].map((sub, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            sub.status === 'Active' ? 'bg-green-500' :
                            sub.status === 'Trial' ? 'bg-blue-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{sub.customer}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{sub.plan}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900 dark:text-white">{sub.mrr}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Next: {sub.next}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button size="sm" variant="outline">
                      <PlayIcon className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <CogIcon className="w-4 h-4 mr-2" />
                      Manage Plans
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Feature Highlights */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Why Choose Sunny for Subscriptions?
                </h4>
                {[
                  'Reduce churn by up to 67% with smart dunning',
                  'Recover 40% more revenue from failed payments',
                  'Save 40+ hours per week with automation',
                  'Support any billing model or complexity'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
