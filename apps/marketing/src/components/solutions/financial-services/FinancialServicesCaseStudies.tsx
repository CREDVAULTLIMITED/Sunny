'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChatBubbleLeftEllipsisIcon,
  ArrowTrendingUpIcon,
  BuildingLibraryIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ClockIcon,
  GlobeAltIcon,
  UserGroupIcon,
  BanknotesIcon,
  ChartBarIcon,
  CalculatorIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export function FinancialServicesCaseStudies() {
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

  const caseStudies = [
    {
      id: 0,
      company: 'MetroBank Digital',
      industry: 'Digital Banking',
      icon: BuildingLibraryIcon,
      color: 'blue',
      logo: '/images/case-studies/metrobank-logo.png',
      challenge: 'Traditional bank needed to launch digital services while maintaining regulatory compliance and integrating with legacy systems',
      solution: 'Implemented Sunny\'s enterprise banking infrastructure with full PCI DSS compliance and core banking integration',
      results: {
        metrics: [
          { label: 'Digital Adoption', before: '15%', after: '78%', improvement: '420%' },
          { label: 'Transaction Speed', before: '3-5 days', after: '< 2 minutes', improvement: '99%' },
          { label: 'Operational Costs', before: '$2.5M/year', after: '$800K/year', improvement: '68%' },
          { label: 'Customer Satisfaction', before: '72%', after: '94%', improvement: '31%' }
        ],
        quote: 'Sunny enabled our digital transformation while ensuring complete regulatory compliance. Our customers now enjoy instant banking services.',
        author: 'Maria Rodriguez',
        title: 'CTO, MetroBank Digital'
      },
      features: ['Core Banking Integration', 'PCI DSS Compliance', 'Real-time Settlements', 'Legacy System Bridge']
    },
    {
      id: 1,
      company: 'LendFast Platform',
      industry: 'P2P Lending',
      icon: CreditCardIcon,
      color: 'green',
      logo: '/images/case-studies/lendfast-logo.png',
      challenge: 'P2P lending platform struggling with manual loan disbursements, compliance issues, and high operational overhead',
      solution: 'Deployed automated lending infrastructure with AI-powered risk assessment and instant disbursements',
      results: {
        metrics: [
          { label: 'Loan Processing', before: '7-14 days', after: '< 1 hour', improvement: '95%' },
          { label: 'Default Rate', before: '8.5%', after: '3.2%', improvement: '62%' },
          { label: 'Platform Volume', before: '$10M/month', after: '$85M/month', improvement: '750%' },
          { label: 'Operational Staff', before: '45 people', after: '12 people', improvement: '73%' }
        ],
        quote: 'Sunny\'s automated lending infrastructure transformed our operations. We now process 10x more loans with better risk management.',
        author: 'David Kim',
        title: 'CEO, LendFast Platform'
      },
      features: ['Automated Disbursements', 'AI Risk Assessment', 'Compliance Automation', 'Real-time Analytics']
    },
    {
      id: 2,
      company: 'NeoFinance',
      industry: 'Neobank',
      icon: BanknotesIcon,
      color: 'purple',
      logo: '/images/case-studies/neofinance-logo.png',
      challenge: 'Startup neobank needed complete banking infrastructure from scratch with regulatory compliance and scalability',
      solution: 'Built on Sunny\'s comprehensive fintech platform with embedded banking, compliance, and analytics',
      results: {
        metrics: [
          { label: 'Time to Market', before: '18 months', after: '3 months', improvement: '83%' },
          { label: 'Customer Acquisition', before: '0', after: '250K users', improvement: '∞' },
          { label: 'Monthly Transactions', before: '0', after: '$50M', improvement: '∞' },
          { label: 'Compliance Score', before: 'N/A', after: '99.8%', improvement: 'New' }
        ],
        quote: 'Sunny provided everything we needed to launch a compliant neobank. We focused on customer experience while they handled the infrastructure.',
        author: 'Sarah Chen',
        title: 'Founder, NeoFinance'
      },
      features: ['Embedded Banking', 'Instant Account Opening', 'Multi-currency Wallets', 'Regulatory Compliance']
    },
    {
      id: 3,
      company: 'InsureTech Solutions',
      industry: 'Insurance Technology',
      icon: ShieldCheckIcon,
      color: 'indigo',
      logo: '/images/case-studies/insuretech-logo.png',
      challenge: 'Insurance company needed automated claims processing and premium collection with fraud detection',
      solution: 'Integrated Sunny\'s payment platform with AI-powered fraud detection and automated claim disbursements',
      results: {
        metrics: [
          { label: 'Claims Processing', before: '21 days', after: '2 hours', improvement: '99%' },
          { label: 'Fraud Detection', before: '65%', after: '94%', improvement: '45%' },
          { label: 'Customer Satisfaction', before: '68%', after: '91%', improvement: '34%' },
          { label: 'Operational Efficiency', before: 'Baseline', after: '280% faster', improvement: '180%' }
        ],
        quote: 'Sunny\'s fraud detection and automated processing revolutionized our claims operation. Customer satisfaction soared.',
        author: 'Michael Thompson',
        title: 'COO, InsureTech Solutions'
      },
      features: ['Automated Claims', 'Fraud Detection', 'Premium Collection', 'Regulatory Reporting']
    }
  ];

  const industryStats = [
    {
      icon: ArrowTrendingUpIcon,
      color: 'green',
      stat: '450%',
      label: 'Average ROI Increase',
      description: 'Financial institutions see significant returns on investment'
    },
    {
      icon: ClockIcon,
      color: 'blue',
      stat: '95%',
      label: 'Faster Processing',
      description: 'Dramatic reduction in transaction processing times'
    },
    {
      icon: ShieldCheckIcon,
      color: 'purple',
      stat: '99.8%',
      label: 'Compliance Rate',
      description: 'Maintain highest levels of regulatory compliance'
    },
    {
      icon: CurrencyDollarIcon,
      color: 'orange',
      stat: '70%',
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
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400">
              Financial Services Success Stories
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Transforming{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Financial Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See how leading financial institutions transformed their operations and 
              accelerated growth with Sunny's enterprise payment infrastructure.
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

          {/* Enterprise Impact */}
          <div className="mt-20">
            <Card className="p-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
              <div className="space-y-8">
                <div>
                  <BuildingLibraryIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Powering Financial Innovation Worldwide
                  </h3>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    Join 200+ financial institutions across 50 countries that trust Sunny 
                    for their mission-critical payment infrastructure
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">200+</div>
                    <div className="opacity-90">Financial Institutions</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">50</div>
                    <div className="opacity-90">Countries</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">$50B+</div>
                    <div className="opacity-90">Processed Annually</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                    Schedule Enterprise Demo
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
