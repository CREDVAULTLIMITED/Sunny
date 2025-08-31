'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CpuChipIcon,
  CommandLineIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface AIFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge?: string;
  features: string[];
  learnMoreHref: string;
}

const aiFeatures: AIFeature[] = [
  {
    icon: CpuChipIcon,
    title: 'AI Fraud Detection',
    description: 'Advanced machine learning algorithms analyze transaction patterns and user behavior in real-time.',
    badge: 'ML Powered',
    features: [
      'Neural network analysis',
      'Behavioral profiling',
      'Dynamic risk scoring',
      'Real-time decision making'
    ],
    learnMoreHref: '/ai-security'
  },
  {
    icon: CommandLineIcon,
    title: 'Developer AI Assistant',
    description: 'Python CLI with integrated AI chat assistant for accelerated development and debugging.',
    badge: 'AI Enhanced',
    features: [
      'Interactive code generation',
      'Smart debugging assistance',
      'Documentation queries',
      'Integration guidance'
    ],
    learnMoreHref: '/cli'
  },
  {
    icon: ChartBarIcon,
    title: 'Predictive Analytics',
    description: 'AI-driven insights predict payment trends, optimize conversion rates, and forecast revenue.',
    badge: 'Predictive',
    features: [
      'Revenue forecasting',
      'Conversion optimization',
      'Churn prediction',
      'Market trend analysis'
    ],
    learnMoreHref: '/analytics'
  }
];

const enterpriseFeatures: AIFeature[] = [
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise Security Suite',
    description: 'Comprehensive security tools including PCI DSS validation, GDPR compliance, and audit logging.',
    badge: 'Enterprise',
    features: [
      'Automated compliance checking',
      'Real-time security monitoring',
      'Audit trail generation',
      'Vulnerability scanning'
    ],
    learnMoreHref: '/enterprise/security'
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Infrastructure Management',
    description: 'Production-ready infrastructure with load balancing, caching, and advanced monitoring.',
    badge: 'Enterprise',
    features: [
      'Multi-cloud deployment',
      'Auto-scaling capabilities',
      'Advanced caching layers',
      'Health monitoring'
    ],
    learnMoreHref: '/enterprise/infrastructure'
  },
  {
    icon: DocumentTextIcon,
    title: 'Tax & Compliance Engine',
    description: 'Global tax calculation, receipt generation, and regulatory compliance for 190+ countries.',
    badge: 'Global',
    features: [
      'Automated tax calculation',
      'Receipt generation',
      'Regulatory reporting',
      'Multi-jurisdiction compliance'
    ],
    learnMoreHref: '/tax-compliance'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function AIFeaturesSection() {
  return (
    <section id="ai-features" className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 via-blue-50/30 to-purple-50/30 dark:bg-gradient-to-b dark:from-gray-800 dark:via-gray-900/50 dark:to-gray-800">
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            AI & Advanced Features
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Powered by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              Artificial Intelligence
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Advanced AI and machine learning capabilities that set Sunny apart from traditional payment processors.
          </p>
        </motion.div>

        {/* AI Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            AI-Powered Capabilities
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/20 transition-all duration-300 border-gray-200/50 dark:border-gray-700 group hover:border-purple-300 dark:hover:border-purple-600 hover:bg-white dark:hover:bg-gray-800 hover:-translate-y-1">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                      <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        {feature.badge && (
                          <Badge variant="outline" className="text-xs border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-400">
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {feature.features.map((featureItem, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0" />
                        <span>{featureItem}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <Link 
                    href={feature.learnMoreHref}
                    className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group/link"
                  >
                    Learn more
                    <ArrowRightIcon className="ml-1 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enterprise Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Enterprise-Grade Infrastructure
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {enterpriseFeatures.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 transition-all duration-300 border-gray-200/50 dark:border-gray-700 group hover:border-blue-300 dark:hover:border-blue-600 hover:bg-white dark:hover:bg-gray-800 hover:-translate-y-1">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                      <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        {feature.badge && (
                          <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400">
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {feature.features.map((featureItem, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                        <span>{featureItem}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <Link 
                    href={feature.learnMoreHref}
                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
                  >
                    Learn more
                    <ArrowRightIcon className="ml-1 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-16 lg:mt-24"
        >
          <div className="bg-gradient-to-r from-purple-100 via-blue-100 to-emerald-100 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-emerald-900/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Experience AI-Powered Payments?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Join forward-thinking businesses leveraging AI for superior payment processing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Try AI Demo
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/enterprise"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                Enterprise Solutions
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

