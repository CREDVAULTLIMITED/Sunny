'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChatBubbleLeftEllipsisIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClockIcon,
  ChartBarIcon,
  PlayIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  BoltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export function SaaSCaseStudies() {
  const [activeCase, setActiveCase] = useState(0);

  const caseStudies = [
    {
      company: 'CloudSync Pro',
      industry: 'Project Management SaaS',
      logo: '☁️',
      size: '100-500 employees',
      region: 'North America',
      customerSince: '2023',
      challenge: 'High involuntary churn rate of 8.5% due to failed payments and complex billing for team subscriptions',
      solution: 'Implemented Sunny\'s smart dunning management, flexible team billing, and automated payment recovery workflows',
      results: [
        { metric: '-73%', label: 'Involuntary Churn', icon: ArrowTrendingUpIcon, trend: 'down' },
        { metric: '+$1.8M', label: 'Recovered Revenue', icon: CurrencyDollarIcon, trend: 'up' },
        { metric: '+156%', label: 'Customer LTV', icon: UserGroupIcon, trend: 'up' },
        { metric: '3 weeks', label: 'Implementation', icon: ClockIcon, trend: 'neutral' }
      ],
      testimonial: "Sunny's dunning management is incredible. We recovered $1.8M in revenue that would have been lost to failed payments. The team billing features made it easy for our customers to manage their subscriptions, leading to higher satisfaction and retention.",
      author: 'Sarah Chen',
      position: 'VP of Revenue Operations',
      authorImage: '👩‍💼',
      timeframe: '12 months',
      featured: true,
      metrics: {
        before: { churn: '8.5%', mrr: '$420K', ltv: '$1,200' },
        after: { churn: '2.3%', mrr: '$847K', ltv: '$3,072' }
      }
    },
    {
      company: 'DevTools Inc',
      industry: 'Developer Tools',
      logo: '🛠️',
      size: '50-200 employees',
      region: 'Global',
      customerSince: '2022',
      challenge: 'Complex usage-based billing for API calls and storage, manual invoice generation taking 40+ hours monthly',
      solution: 'Deployed usage-based billing automation with real-time metering and automated invoice generation',
      results: [
        { metric: '+234%', label: 'Billing Accuracy', icon: CheckCircleIcon, trend: 'up' },
        { metric: '40 hrs', label: 'Time Saved Monthly', icon: ClockIcon, trend: 'neutral' },
        { metric: '+89%', label: 'Customer Satisfaction', icon: UserGroupIcon, trend: 'up' },
        { metric: '2 weeks', label: 'Setup Time', icon: BoltIcon, trend: 'neutral' }
      ],
      testimonial: "The usage-based billing automation transformed our operations. What used to take 40 hours of manual work now happens automatically with 100% accuracy. Our customers love the transparent, real-time billing.",
      author: 'Marcus Rodriguez',
      position: 'Co-founder & CTO',
      authorImage: '👨‍💻',
      timeframe: '18 months',
      featured: true,
      metrics: {
        before: { accuracy: '67%', manual_hours: '40/month', satisfaction: '6.2/10' },
        after: { accuracy: '100%', manual_hours: '0/month', satisfaction: '9.1/10' }
      }
    },
    {
      company: 'EduPlatform',
      industry: 'EdTech SaaS',
      logo: '🎓',
      size: '200-1000 employees',
      region: 'Global',
      customerSince: '2023',
      challenge: 'Expanding globally but struggling with local payment methods, tax compliance, and currency conversions',
      solution: 'Implemented global payment infrastructure with local payment methods, automated tax compliance, and multi-currency support',
      results: [
        { metric: '+312%', label: 'International Revenue', icon: GlobeAltIcon, trend: 'up' },
        { metric: '47', label: 'New Markets', icon: GlobeAltIcon, trend: 'up' },
        { metric: '+67%', label: 'Conversion Rate', icon: ArrowTrendingUpIcon, trend: 'up' },
        { metric: '6 months', label: 'Global Rollout', icon: ClockIcon, trend: 'neutral' }
      ],
      testimonial: "Sunny enabled our global expansion in just 6 months. The local payment methods and automated tax compliance removed all the complexity of international billing. We're now serving customers in 47 countries seamlessly.",
      author: 'Emma Thompson',
      position: 'Head of International Growth',
      authorImage: '👩‍🎓',
      timeframe: '15 months',
      featured: false,
      metrics: {
        before: { markets: '3', intl_revenue: '$89K', conversion: '2.1%' },
        after: { markets: '47', intl_revenue: '$367K', conversion: '3.5%' }
      }
    },
    {
      company: 'AnalyticsPro',
      industry: 'Business Intelligence',
      logo: '📊',
      size: '50-200 employees',
      region: 'Europe',
      customerSince: '2022',
      challenge: 'Complex enterprise contracts with custom billing cycles, multiple stakeholders, and compliance requirements',
      solution: 'Deployed enterprise billing features with custom contracts, multi-stakeholder management, and compliance automation',
      results: [
        { metric: '+445%', label: 'Enterprise Revenue', icon: CurrencyDollarIcon, trend: 'up' },
        { metric: '-89%', label: 'Billing Errors', icon: ShieldCheckIcon, trend: 'down' },
        { metric: '+78%', label: 'Contract Velocity', icon: ArrowTrendingUpIcon, trend: 'up' },
        { metric: '4 weeks', label: 'Implementation', icon: ClockIcon, trend: 'neutral' }
      ],
      testimonial: "The enterprise billing capabilities are outstanding. We can handle the most complex contracts with multiple stakeholders, custom terms, and compliance requirements. Our sales team closes deals 78% faster now.",
      author: 'David Park',
      position: 'VP of Sales Operations',
      authorImage: '👨‍💼',
      timeframe: '24 months',
      featured: false,
      metrics: {
        before: { enterprise_revenue: '$67K', errors: '12%', velocity: '45 days' },
        after: { enterprise_revenue: '$365K', errors: '1.3%', velocity: '10 days' }
      }
    }
  ];

  const industryStats = [
    { industry: 'SaaS Platforms', improvement: '+156%', metric: 'Average LTV increase' },
    { industry: 'Developer Tools', improvement: '-67%', metric: 'Churn reduction' },
    { industry: 'EdTech', improvement: '+312%', metric: 'International growth' },
    { industry: 'Enterprise SaaS', improvement: '+445%', metric: 'Revenue growth' },
  ];

  const successMetrics = [
    { metric: '10,000+', label: 'SaaS Companies', description: 'Trust Sunny for their payments' },
    { metric: '$2.8B+', label: 'Revenue Processed', description: 'Through our platform annually' },
    { metric: '67%', label: 'Churn Reduction', description: 'Average across our customers' },
    { metric: '40%', label: 'Revenue Recovery', description: 'From failed payments' }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              SaaS Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how SaaS companies like yours are reducing churn, recovering revenue, 
              and scaling globally with Sunny's intelligent payment platform.
            </p>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.metric}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{stat.label}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Case Study */}
        <Card className="p-8 mb-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{caseStudies[activeCase].logo}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {caseStudies[activeCase].company}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Badge variant="outline">{caseStudies[activeCase].industry}</Badge>
                    <Badge variant="outline">{caseStudies[activeCase].size}</Badge>
                    <Badge variant="outline">{caseStudies[activeCase].region}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Challenge:</h4>
                  <p className="text-gray-600 dark:text-gray-400">{caseStudies[activeCase].challenge}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Solution:</h4>
                  <p className="text-gray-600 dark:text-gray-400">{caseStudies[activeCase].solution}</p>
                </div>
              </div>

              {/* Testimonial */}
              <Card className="p-6 bg-white dark:bg-gray-800">
                <div className="flex items-start space-x-4">
                  <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 dark:text-white italic mb-4">
                      "{caseStudies[activeCase].testimonial}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{caseStudies[activeCase].authorImage}</div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {caseStudies[activeCase].author}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {caseStudies[activeCase].position}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                Results After {caseStudies[activeCase].timeframe}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {caseStudies[activeCase].results.map((result, index) => (
                  <Card key={index} className="p-6 text-center bg-white dark:bg-gray-800">
                    <div className="space-y-2">
                      <result.icon className={`w-8 h-8 mx-auto ${
                        result.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                        result.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                        'text-blue-600 dark:text-blue-400'
                      }`} />
                      <div className={`text-2xl font-bold ${
                        result.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                        result.trend === 'down' && result.metric.startsWith('-') ? 'text-green-600 dark:text-green-400' :
                        'text-gray-900 dark:text-white'
                      }`}>
                        {result.metric}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {result.label}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <PlayIcon className="w-4 h-4 mr-2" />
                  Watch Full Case Study
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Case Study Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {caseStudies.map((study, index) => (
            <button
              key={index}
              onClick={() => setActiveCase(index)}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                activeCase === index
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{study.logo}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">{study.company}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{study.industry}</div>
                  {study.featured && (
                    <Badge variant="default" className="mt-1 text-xs">Featured</Badge>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Industry Stats */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Industry Performance
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Average improvements across different SaaS verticals
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {industryStats.map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-white dark:bg-gray-800">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stat.improvement}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {stat.industry}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {stat.metric}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Ready to Join These Success Stories?</h3>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Join thousands of SaaS companies that have transformed their subscription 
                business with Sunny. Start your free trial and see results in weeks.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>

            <div className="text-sm text-blue-100">
              No setup fees • 30-day free trial • Cancel anytime
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
