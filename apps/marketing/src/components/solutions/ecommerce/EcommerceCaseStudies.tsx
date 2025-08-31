'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ClockIcon,
  GlobeAltIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  PlayIcon,
  ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/outline';

export function EcommerceCaseStudies() {
  const [activeCase, setActiveCase] = useState(0);

  // Define ShieldIcon before using it in caseStudies
  const ShieldIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

  const caseStudies = [
    {
      company: 'TechGear Pro',
      industry: 'Electronics',
      logo: '💻',
      size: '50-200 employees',
      region: 'North America',
      challenge: 'High cart abandonment rates and limited payment options causing lost sales',
      solution: 'Implemented Sunny\'s optimized checkout with 15+ payment methods and A/B testing',
      results: [
        { metric: '+34%', label: 'Conversion Rate', icon: ArrowTrendingUpIcon },
        { metric: '+67%', label: 'Revenue Growth', icon: CurrencyDollarIcon },
        { metric: '-45%', label: 'Cart Abandonment', icon: ShoppingBagIcon },
        { metric: '3 weeks', label: 'Implementation Time', icon: ClockIcon }
      ],
      testimonial: "Sunny's checkout optimization transformed our business. The A/B testing feature alone increased our conversions by 34%. The integration was seamless and their support team was incredible.",
      author: 'Sarah Chen',
      position: 'CTO, TechGear Pro',
      timeframe: '6 months',
      featured: true
    },
    {
      company: 'Global Fashion House',
      industry: 'Fashion & Apparel',
      logo: '👗',
      size: '200-1000 employees',
      region: 'Global',
      challenge: 'Expanding internationally but struggling with local payment preferences and currencies',
      solution: 'Deployed multi-currency support with regional payment methods and localized checkout',
      results: [
        { metric: '+156%', label: 'International Sales', icon: GlobeAltIcon },
        { metric: '25', label: 'New Markets', icon: GlobeAltIcon },
        { metric: '+89%', label: 'Customer Satisfaction', icon: UsersIcon },
        { metric: '2 months', label: 'Global Rollout', icon: ClockIcon }
      ],
      testimonial: "Sunny enabled us to expand to 25 new markets in just 2 months. Their local payment method support and multi-currency capabilities were game-changing for our international growth.",
      author: 'Marcus Rodriguez',
      position: 'Head of International, Global Fashion House',
      timeframe: '12 months',
      featured: true
    },
    {
      company: 'Artisan Marketplace',
      industry: 'Marketplace',
      logo: '🎨',
      size: '10-50 employees',
      region: 'Europe',
      challenge: 'Complex split payments for multiple vendors and high chargeback rates',
      solution: 'Implemented marketplace payment splitting with advanced fraud detection',
      results: [
        { metric: '-78%', label: 'Chargeback Rate', icon: ShieldIcon },
        { metric: '+45%', label: 'Vendor Satisfaction', icon: UsersIcon },
        { metric: '+23%', label: 'Transaction Volume', icon: ChartBarIcon },
        { metric: '1 week', label: 'Setup Time', icon: ClockIcon }
      ],
      testimonial: "The marketplace split payment feature saved us months of development time. The fraud detection is so accurate that our chargeback rate dropped to almost zero.",
      author: 'Emma Thompson',
      position: 'Founder, Artisan Marketplace',
      timeframe: '8 months',
      featured: false
    },
    {
      company: 'Subscription Box Co',
      industry: 'Subscription Commerce',
      logo: '📦',
      size: '50-200 employees',
      region: 'North America',
      challenge: 'High involuntary churn due to failed recurring payments',
      solution: 'Implemented smart payment retry logic and dunning management',
      results: [
        { metric: '-67%', label: 'Involuntary Churn', icon: ArrowTrendingUpIcon },
        { metric: '+$2.3M', label: 'Recovered Revenue', icon: CurrencyDollarIcon },
        { metric: '+34%', label: 'Customer Lifetime Value', icon: UsersIcon },
        { metric: '4 weeks', label: 'Integration Time', icon: ClockIcon }
      ],
      testimonial: "Sunny's dunning management recovered $2.3M in revenue that we would have lost to failed payments. Their smart retry logic is incredibly sophisticated.",
      author: 'David Park',
      position: 'VP Operations, Subscription Box Co',
      timeframe: '10 months',
      featured: false
    }
  ];

  const industryStats = [
    { industry: 'E-commerce', improvement: '+28%', metric: 'Average conversion increase' },
    { industry: 'SaaS', improvement: '+45%', metric: 'Subscription retention' },
    { industry: 'Marketplace', improvement: '+67%', metric: 'Vendor satisfaction' },
    { industry: 'Fashion', improvement: '+89%', metric: 'International expansion' },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Customer Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how businesses like yours are growing revenue, reducing costs, and improving customer experience 
              with Sunny's e-commerce payment solutions.
            </p>
          </div>

          {/* Industry Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {industryStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stat.improvement}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{stat.industry}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{stat.metric}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Case Study */}
        <Card className="p-8 mb-16 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-0">
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
                      <result.icon className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400" />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
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
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
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

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-r from-green-600 to-blue-600 text-white text-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Ready to Write Your Success Story?</h3>
              <p className="text-green-100 max-w-2xl mx-auto">
                Join thousands of businesses that have transformed their payment experience with Sunny. 
                Start your free trial today and see results in weeks, not months.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>

            <div className="text-sm text-green-100">
              No setup fees • 30-day free trial • Cancel anytime
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
