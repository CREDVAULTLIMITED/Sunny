'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  SwatchIcon,
  CogIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  CodeBracketIcon,
  CheckCircleIcon,
  EyeIcon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

interface WhiteLabelProduct {
  id: string;
  name: string;
  description: string;
  category: 'banking' | 'payments' | 'lending' | 'wealth';
  features: string[];
  customizations: string[];
  timeline: string;
  pricing: string;
}

interface CustomizationOption {
  category: string;
  options: {
    name: string;
    description: string;
    preview: string;
  }[];
}

const whiteLabelProducts: WhiteLabelProduct[] = [
  {
    id: 'digital-banking',
    name: 'Digital Banking Platform',
    description: 'Complete digital banking solution with accounts, cards, and payments',
    category: 'banking',
    features: [
      'Account management',
      'Digital wallet',
      'Card issuance',
      'P2P transfers',
      'Bill payments',
      'Budgeting tools'
    ],
    customizations: [
      'Custom branding & UI',
      'Feature selection',
      'API integrations',
      'Compliance configuration'
    ],
    timeline: '8-12 weeks',
    pricing: 'From $50K setup'
  },
  {
    id: 'payment-gateway',
    name: 'Payment Gateway',
    description: 'White-label payment processing with global coverage',
    category: 'payments',
    features: [
      'Multi-currency processing',
      'Card acceptance',
      'Alternative payments',
      'Fraud protection',
      'Real-time reporting',
      'Webhook notifications'
    ],
    customizations: [
      'Branded checkout',
      'Custom pricing',
      'Integration options',
      'Regional settings'
    ],
    timeline: '4-6 weeks',
    pricing: 'From $25K setup'
  },
  {
    id: 'lending-platform',
    name: 'Lending Platform',
    description: 'End-to-end lending solution with credit decisioning',
    category: 'lending',
    features: [
      'Loan origination',
      'Credit scoring',
      'Document verification',
      'Automated underwriting',
      'Loan servicing',
      'Collections management'
    ],
    customizations: [
      'Risk models',
      'Product configuration',
      'Workflow customization',
      'Third-party integrations'
    ],
    timeline: '12-16 weeks',
    pricing: 'From $100K setup'
  },
  {
    id: 'wealth-management',
    name: 'Wealth Management',
    description: 'Investment platform with portfolio management',
    category: 'wealth',
    features: [
      'Portfolio management',
      'Investment research',
      'Risk assessment',
      'Automated rebalancing',
      'Performance tracking',
      'Tax optimization'
    ],
    customizations: [
      'Investment products',
      'Risk frameworks',
      'Reporting templates',
      'Advisory tools'
    ],
    timeline: '10-14 weeks',
    pricing: 'From $75K setup'
  }
];

const customizationOptions: CustomizationOption[] = [
  {
    category: 'Branding',
    options: [
      {
        name: 'Logo & Colors',
        description: 'Upload your logo and define brand colors',
        preview: '🎨'
      },
      {
        name: 'Typography',
        description: 'Choose fonts that match your brand',
        preview: '📝'
      },
      {
        name: 'Layout',
        description: 'Customize interface layouts and spacing',
        preview: '📐'
      }
    ]
  },
  {
    category: 'Features',
    options: [
      {
        name: 'Module Selection',
        description: 'Enable/disable specific features',
        preview: '🔧'
      },
      {
        name: 'Workflow Design',
        description: 'Configure user journeys and processes',
        preview: '🔄'
      },
      {
        name: 'Integrations',
        description: 'Connect to your existing systems',
        preview: '🔗'
      }
    ]
  },
  {
    category: 'Compliance',
    options: [
      {
        name: 'Regional Settings',
        description: 'Configure for local regulations',
        preview: '🌍'
      },
      {
        name: 'KYC/AML Rules',
        description: 'Set compliance requirements',
        preview: '🛡️'
      },
      {
        name: 'Reporting',
        description: 'Custom regulatory reporting',
        preview: '📊'
      }
    ]
  }
];

const deliverySteps = [
  {
    step: 1,
    title: 'Requirements Gathering',
    description: 'Define scope, features, and customization needs',
    duration: '1-2 weeks',
    deliverables: ['Technical specification', 'Design mockups', 'Project timeline']
  },
  {
    step: 2,
    title: 'Platform Configuration',
    description: 'Set up and customize your white-label solution',
    duration: '4-8 weeks',
    deliverables: ['Configured platform', 'Custom branding', 'API integration']
  },
  {
    step: 3,
    title: 'Testing & Integration',
    description: 'Comprehensive testing and third-party integrations',
    duration: '2-4 weeks',
    deliverables: ['Test results', 'Integration documentation', 'Performance reports']
  },
  {
    step: 4,
    title: 'Launch & Support',
    description: 'Go-live support and ongoing maintenance',
    duration: 'Ongoing',
    deliverables: ['Live platform', 'Training materials', '24/7 support']
  }
];

export default function WhiteLabelSolutions() {
  const [selectedProduct, setSelectedProduct] = useState<string>('digital-banking');
  const [activeCustomization, setActiveCustomization] = useState<string>('Branding');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const currentProduct = whiteLabelProducts.find(p => p.id === selectedProduct) || whiteLabelProducts[0];
  const currentCustomization = customizationOptions.find(c => c.category === activeCustomization) || customizationOptions[0];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'banking': return 'bg-blue-500';
      case 'payments': return 'bg-green-500';
      case 'lending': return 'bg-purple-500';
      case 'wealth': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'banking': return BanknotesIcon;
      case 'payments': return CurrencyDollarIcon;
      case 'lending': return ChartBarIcon;
      case 'wealth': return UserGroupIcon;
      default: return CogIcon;
    }
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
            <SwatchIcon className="w-4 h-4 mr-2" />
            White-Label Solutions
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Your Brand, Our Technology
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Launch financial products faster with our white-label solutions. 
            Fully customizable platforms that carry your brand and meet your specific needs.
          </p>
        </motion.div>

        {/* Product Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-20 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            White-Label Product Suite
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Selector */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Choose Product</h4>
              {whiteLabelProducts.map((product) => {
                const CategoryIcon = getCategoryIcon(product.category);
                return (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedProduct === product.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(product.category)}/10`}>
                        <CategoryIcon className={`w-5 h-5 text-white`} style={{filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)'}} />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                          {product.name}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className={`px-2 py-1 rounded capitalize ${getCategoryColor(product.category)} text-white`}>
                            {product.category}
                          </span>
                          <span className="text-gray-500 dark:text-gray-500">{product.timeline}</span>
                        </div>
                      </div>
                    </div>
                    {selectedProduct === product.id && (
                      <CheckCircleIcon className="absolute top-4 right-4 w-5 h-5 text-purple-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Product Details */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
                {/* Product Info */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {currentProduct.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewMode('desktop')}
                        aria-label="Desktop preview mode"
                        className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`}
                      >
                        <ComputerDesktopIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPreviewMode('mobile')}
                        aria-label="Mobile preview mode"
                        className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`}
                      >
                        <DevicePhoneMobileIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {currentProduct.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Timeline</h5>
                      <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                        {currentProduct.timeline}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Starting Price</h5>
                      <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                        {currentProduct.pricing}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">Core Features</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {currentProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customizations */}
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">Customization Options</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {currentProduct.customizations.map((customization, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CogIcon className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        {customization}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Customization Studio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-20 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Customization Studio
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Customization Categories */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Customization Areas</h4>
              {customizationOptions.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setActiveCustomization(category.category)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    activeCustomization === category.category
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                      : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>

            {/* Customization Options */}
            <div className="lg:col-span-3">
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {activeCustomization} Options
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentCustomization.options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-colors cursor-pointer"
                    >
                      <div className="text-3xl mb-3">{option.preview}</div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        {option.name}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {option.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delivery Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Delivery Process
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From concept to launch, we guide you through every step of your white-label implementation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {deliverySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                    {step.step}
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 dark:text-white text-center mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                    {step.description}
                  </p>
                  
                  <div className="text-center mb-4">
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-medium text-gray-900 dark:text-white mb-2">Deliverables:</h5>
                    <ul className="space-y-1">
                      {step.deliverables.map((deliverable, delIndex) => (
                        <li key={delIndex} className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                          <CheckCircleIcon className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Connector Arrow */}
                {index < deliverySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowPathIcon className="w-8 h-8 text-purple-300 dark:text-purple-600 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our White-Label Solutions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Accelerate your time-to-market with proven, enterprise-grade financial technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BoltIcon,
                title: 'Faster Time-to-Market',
                description: 'Launch in weeks, not years. Our pre-built solutions get you to market 10x faster.',
                metric: '80% faster launch'
              },
              {
                icon: ShieldCheckIcon,
                title: 'Enterprise Security',
                description: 'Bank-grade security and compliance built-in. Focus on growth, not security.',
                metric: '99.99% uptime SLA'
              },
              {
                icon: CurrencyDollarIcon,
                title: 'Cost Effective',
                description: 'Reduce development costs by up to 70% compared to building from scratch.',
                metric: '70% cost reduction'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {benefit.description}
                </p>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {benefit.metric}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
