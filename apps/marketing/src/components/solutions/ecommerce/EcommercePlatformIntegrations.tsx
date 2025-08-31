'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CodeBracketIcon,
  CubeIcon,
  CloudIcon,
  CommandLineIcon,
  DocumentTextIcon,
  PlayIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export function EcommercePlatformIntegrations() {
  const [activeTab, setActiveTab] = useState('platforms');

  const platforms = [
    {
      name: 'Shopify',
      logo: '🛍️',
      description: 'Native Shopify app with one-click installation',
      category: 'E-commerce',
      setupTime: '5 minutes',
      features: ['One-click install', 'Auto sync', 'Multi-store', 'Webhooks'],
      status: 'Available',
      popularity: 95,
      documentation: '/docs/shopify',
      demo: 'https://demo.shopify-sunny.com'
    },
    {
      name: 'WooCommerce',
      logo: '🔌',
      description: 'WordPress plugin for WooCommerce stores',
      category: 'WordPress',
      setupTime: '10 minutes',
      features: ['WordPress plugin', 'Gutenberg blocks', 'Custom fields', 'Shortcodes'],
      status: 'Available',
      popularity: 88,
      documentation: '/docs/woocommerce',
      demo: 'https://demo.woo-sunny.com'
    },
    {
      name: 'Magento',
      logo: '🏪',
      description: 'Extension for Magento 2.x stores',
      category: 'E-commerce',
      setupTime: '15 minutes',
      features: ['Admin panel', 'Multi-store', 'B2B features', 'Advanced config'],
      status: 'Available',
      popularity: 72,
      documentation: '/docs/magento',
      demo: 'https://demo.magento-sunny.com'
    },
    {
      name: 'BigCommerce',
      logo: '🛒',
      description: 'Native BigCommerce integration',
      category: 'E-commerce',
      setupTime: '8 minutes',
      features: ['Native API', 'Webhooks', 'Multi-currency', 'Tax sync'],
      status: 'Available',
      popularity: 65,
      documentation: '/docs/bigcommerce',
      demo: 'https://demo.bigcommerce-sunny.com'
    },
    {
      name: 'Squarespace',
      logo: '⬜',
      description: 'Code injection for Squarespace sites',
      category: 'Website Builder',
      setupTime: '20 minutes',
      features: ['Code injection', 'Custom forms', 'Analytics', 'Mobile optimized'],
      status: 'Available',
      popularity: 58,
      documentation: '/docs/squarespace',
      demo: 'https://demo.squarespace-sunny.com'
    },
    {
      name: 'Wix',
      logo: '🎨',
      description: 'Wix Velo integration for dynamic sites',
      category: 'Website Builder',
      setupTime: '25 minutes',
      features: ['Velo by Wix', 'Database sync', 'Member areas', 'Corvid'],
      status: 'Available',
      popularity: 52,
      documentation: '/docs/wix',
      demo: 'https://demo.wix-sunny.com'
    }
  ];

  const customSolutions = [
    {
      name: 'REST API',
      logo: '🔗',
      description: 'Full-featured REST API for custom integrations',
      category: 'API',
      setupTime: '30 minutes',
      features: ['RESTful design', 'OpenAPI spec', 'Webhooks', 'Rate limiting'],
      status: 'Available',
      popularity: 100,
      documentation: '/docs/api',
      demo: 'https://api-explorer.sunnypayments.com'
    },
    {
      name: 'JavaScript SDK',
      logo: '📜',
      description: 'Client-side JavaScript SDK for web applications',
      category: 'SDK',
      setupTime: '15 minutes',
      features: ['Drop-in UI', 'Custom forms', 'TypeScript', 'Tree shaking'],
      status: 'Available',
      popularity: 92,
      documentation: '/docs/javascript-sdk',
      demo: 'https://codepen.io/sunny-payments/pen/js-sdk-demo'
    },
    {
      name: 'React Components',
      logo: '⚛️',
      description: 'Pre-built React components for faster development',
      category: 'Framework',
      setupTime: '10 minutes',
      features: ['Hooks', 'TypeScript', 'Styled components', 'Storybook'],
      status: 'Available',
      popularity: 89,
      documentation: '/docs/react',
      demo: 'https://storybook.sunnypayments.com'
    },
    {
      name: 'Node.js SDK',
      logo: '🟢',
      description: 'Server-side Node.js SDK for backend integration',
      category: 'SDK',
      setupTime: '20 minutes',
      features: ['Promise-based', 'TypeScript', 'Middleware', 'Express helpers'],
      status: 'Available',
      popularity: 85,
      documentation: '/docs/nodejs-sdk',
      demo: 'https://github.com/sunny-payments/nodejs-examples'
    },
    {
      name: 'Python SDK',
      logo: '🐍',
      description: 'Python SDK for Django, Flask, and FastAPI',
      category: 'SDK',
      setupTime: '25 minutes',
      features: ['Django integration', 'Flask helpers', 'FastAPI support', 'Async/await'],
      status: 'Available',
      popularity: 78,
      documentation: '/docs/python-sdk',
      demo: 'https://github.com/sunny-payments/python-examples'
    },
    {
      name: 'PHP SDK',
      logo: '🐘',
      description: 'PHP SDK for Laravel, Symfony, and custom applications',
      category: 'SDK',
      setupTime: '20 minutes',
      features: ['Composer package', 'Laravel service provider', 'PSR-4', 'Unit tests'],
      status: 'Available',
      popularity: 74,
      documentation: '/docs/php-sdk',
      demo: 'https://github.com/sunny-payments/php-examples'
    }
  ];

  const tabs = [
    { id: 'platforms', label: 'E-commerce Platforms', count: platforms.length },
    { id: 'custom', label: 'Custom Development', count: customSolutions.length }
  ];

  const currentData = activeTab === 'platforms' ? platforms : customSolutions;

  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Seamless Platform Integrations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get started in minutes with our pre-built integrations for popular e-commerce platforms, 
              or build custom solutions with our comprehensive APIs and SDKs.
            </p>
          </div>

          {/* Integration Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">15+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Platform Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">5 min</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">20+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">SDKs & Libraries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">99.9%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">API Uptime</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {tab.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {currentData.map((integration, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-md">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{integration.logo}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{integration.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{integration.description}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={integration.status === 'Available' ? 'default' : 'secondary'} 
                    className="text-xs"
                  >
                    {integration.status}
                  </Badge>
                </div>

                {/* Category & Setup Time */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <CubeIcon className="w-4 h-4" />
                    <span>{integration.category}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <ClockIcon className="w-4 h-4" />
                    <span>{integration.setupTime}</span>
                  </div>
                </div>

                {/* Popularity Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Popularity</span>
                    <span className="text-gray-900 dark:text-white font-medium">{integration.popularity}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      data-width={integration.popularity}
                      style={{ width: `${integration.popularity}%` }}
                    ></div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Features:</div>
                  <div className="flex flex-wrap gap-1">
                    {integration.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    <DocumentTextIcon className="w-4 h-4 mr-1" />
                    Docs
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    <PlayIcon className="w-4 h-4 mr-1" />
                    Demo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Start Guide */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-0">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Get Started in 3 Simple Steps
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Whether you're using a popular e-commerce platform or building a custom solution, 
                getting started with Sunny Payments is quick and straightforward.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Choose Integration</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select your platform or SDK from our comprehensive list of integrations.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Install & Configure</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Follow our step-by-step guide to install and configure the integration.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Start Accepting Payments</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Go live and start accepting payments from customers worldwide.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <CommandLineIcon className="w-5 h-5 mr-2" />
                Start Integration
              </Button>
              <Button variant="outline" size="lg">
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                View Documentation
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
