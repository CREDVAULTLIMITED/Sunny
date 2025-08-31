'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ArrowRightIcon,
  PlayIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CogIcon
} from '@heroicons/react/24/outline';

export function SaaSHero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const keyBenefits = [
    {
      icon: CurrencyDollarIcon,
      title: 'Revenue Recovery',
      description: 'Recover up to 40% of failed payments',
      metric: '+40%'
    },
    {
      icon: ChartBarIcon,
      title: 'Churn Reduction',
      description: 'Reduce involuntary churn by 67%',
      metric: '-67%'
    },
    {
      icon: UserGroupIcon,
      title: 'Customer Retention',
      description: 'Increase customer lifetime value',
      metric: '+156%'
    },
    {
      icon: ClockIcon,
      title: 'Setup Time',
      description: 'Get started in under 2 weeks',
      metric: '< 2 weeks'
    }
  ];

  const trustedByLogos = [
    { name: 'Slack', logo: '💬' },
    { name: 'Zoom', logo: '📹' },
    { name: 'Notion', logo: '📝' },
    { name: 'Figma', logo: '🎨' },
    { name: 'Spotify', logo: '🎵' },
    { name: 'Netflix', logo: '🎬' }
  ];

  const features = [
    'Subscription Management & Billing',
    'Smart Dunning & Recovery',
    'Revenue Recognition & Analytics',
    'Global Tax Compliance',
    'Enterprise Security & Compliance',
    'Advanced Fraud Protection'
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Badge */}
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                Trusted by 10,000+ SaaS Companies
              </Badge>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  SaaS Payments
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Built for Growth
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  The complete payment infrastructure for subscription businesses. 
                  Reduce churn, recover revenue, and scale globally with intelligent 
                  billing automation and advanced analytics.
                </p>
              </div>

              {/* Key Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Start Free Trial
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setIsVideoPlaying(true)}
                  className="border-gray-300 dark:border-gray-600"
                >
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Watch Demo (3 min)
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <ShieldCheckIcon className="w-4 h-4 text-green-500" />
                    <span>PCI DSS Level 1</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GlobeAltIcon className="w-4 h-4 text-blue-500" />
                    <span>135+ Currencies</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CogIcon className="w-4 h-4 text-purple-500" />
                    <span>99.99% Uptime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual/Demo */}
          <div className="space-y-8">
            {/* Key Benefits Cards */}
            <div className="grid grid-cols-2 gap-4">
              {keyBenefits.map((benefit, index) => (
                <Card key={index} className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <benefit.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {benefit.metric}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Interactive Dashboard Preview */}
            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border-0 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    SaaS Dashboard Preview
                  </h3>
                  <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Live Data
                  </Badge>
                </div>

                {/* Mock Dashboard Elements */}
                <div className="space-y-4">
                  {/* Revenue Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">$847K</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Monthly Recurring Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">2.3%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Churn Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">$312</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Average LTV</div>
                    </div>
                  </div>

                  {/* Mock Chart */}
                  <div className="h-24 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-end justify-center space-x-1 px-4 py-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85].map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-sm w-6"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>

                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      Explore Full Dashboard
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center space-y-6">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Trusted by Leading SaaS Companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {trustedByLogos.map((company, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
                  <span className="text-2xl">{company.logo}</span>
                  <span className="font-medium">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-1 max-w-4xl w-full">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <PlayIcon className="w-16 h-16 mx-auto mb-4" />
                <p>Demo video would play here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
