'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BoltIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  BanknotesIcon,
  ReceiptPercentIcon
} from '@heroicons/react/24/outline';

interface KenyaTaxRate {
  type: string;
  rate: number;
  description: string;
  applicableFrom: string;
  category: 'vat' | 'withholding' | 'excise' | 'corporate' | 'paye';
}

interface KRAIntegration {
  service: string;
  status: 'active' | 'pending' | 'maintenance';
  description: string;
  features: string[];
}

const kenyaTaxRates: KenyaTaxRate[] = [
  {
    type: 'Standard VAT',
    rate: 16,
    description: 'Standard rate for most goods and services',
    applicableFrom: '2023-07-01',
    category: 'vat'
  },
  {
    type: 'Zero-rated VAT',
    rate: 0,
    description: 'Essential goods, exports, medical supplies',
    applicableFrom: '2023-07-01',
    category: 'vat'
  },
  {
    type: 'Withholding Tax - Professional Services',
    rate: 5,
    description: 'Legal, accounting, consulting services',
    applicableFrom: '2023-01-01',
    category: 'withholding'
  },
  {
    type: 'Withholding Tax - Digital Services',
    rate: 20,
    description: 'Digital marketplace services by non-residents',
    applicableFrom: '2021-01-01',
    category: 'withholding'
  },
  {
    type: 'Corporate Income Tax',
    rate: 30,
    description: 'Standard corporate tax rate',
    applicableFrom: '2023-01-01',
    category: 'corporate'
  },
  {
    type: 'Excise Duty - Mobile Money',
    rate: 15,
    description: 'Per transaction on mobile money transfers (KES 15)',
    applicableFrom: '2023-07-01',
    category: 'excise'
  }
];

const kraIntegrations: KRAIntegration[] = [
  {
    service: 'iTax Portal Integration',
    status: 'active',
    description: 'Direct integration with KRA iTax system for automated filing',
    features: ['Automated VAT returns', 'Real-time tax calculations', 'Compliance monitoring']
  },
  {
    service: 'eTIMS Integration',
    status: 'active',
    description: 'Electronic Tax Invoice Management System integration',
    features: ['Digital receipts', 'Invoice validation', 'Real-time reporting']
  },
  {
    service: 'PIN Validation Service',
    status: 'active',
    description: 'Real-time KRA PIN validation for businesses and individuals',
    features: ['Instant PIN verification', 'Taxpayer status check', 'Compliance validation']
  },
  {
    service: 'Digital Service Tax (DST)',
    status: 'active',
    description: 'Automated calculation and remittance of Digital Service Tax',
    features: ['1.5% DST calculation', 'Monthly remittance', 'Compliance reporting']
  }
];

const complianceFeatures = [
  {
    icon: ShieldCheckIcon,
    title: 'KRA Compliance Certified',
    description: 'Fully certified and integrated with Kenya Revenue Authority systems',
    highlights: ['iTax integration', 'eTIMS certified', 'Real-time validation'],
    color: 'bg-green-500'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'M-Pesa Tax Integration',
    description: 'Automated tax calculation for mobile money transactions',
    highlights: ['Excise duty automation', 'Transaction monitoring', 'Compliance alerts'],
    color: 'bg-blue-500'
  },
  {
    icon: BanknotesIcon,
    title: 'Multi-Currency Support',
    description: 'Handle KES, USD, EUR with automatic conversion and tax calculation',
    highlights: ['Real-time rates', 'Cross-border tax', 'Currency compliance'],
    color: 'bg-purple-500'
  },
  {
    icon: ReceiptPercentIcon,
    title: 'Digital Receipts & Invoicing',
    description: 'Generate KRA-compliant digital receipts and invoices',
    highlights: ['eTIMS integration', 'QR code receipts', 'Audit trail'],
    color: 'bg-orange-500'
  }
];

const eastAfricanExpansion = [
  { country: 'Uganda', flag: '🇺🇬', status: 'planning', timeline: 'Q3 2024' },
  { country: 'Tanzania', flag: '🇹🇿', status: 'planning', timeline: 'Q4 2024' },
  { country: 'Rwanda', flag: '🇷🇼', status: 'research', timeline: 'Q1 2025' },
  { country: 'Ethiopia', flag: '🇪🇹', status: 'research', timeline: 'Q2 2025' }
];

export default function KenyaTaxComplianceSection() {
  const [selectedTaxCategory, setSelectedTaxCategory] = useState<string>('vat');
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('10000');

  const filteredRates = kenyaTaxRates.filter(rate => rate.category === selectedTaxCategory);

  const calculateTax = (amount: number, rate: number, type: string) => {
    if (type === 'Excise Duty - Mobile Money') {
      // Fixed rate of KES 15 per transaction
      return 15;
    }
    return (amount * rate) / 100;
  };

  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'maintenance': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 text-sm font-medium mb-4">
            <span className="text-lg mr-2">🇰🇪</span>
            Kenya Tax Compliance - Our Home Market
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Built for Kenya, Expanding to Africa
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            As a Kenyan fintech company, we understand the local tax landscape intimately. 
            Full KRA integration, M-Pesa compliance, and deep knowledge of Kenyan business needs.
          </p>
        </motion.div>

        {/* Kenya Highlights Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">KRA Compliance</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">&lt;1s</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tax Calculation</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">M-Pesa Integration</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">Q3 2024</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">East Africa Expansion</div>
            </div>
          </div>
        </motion.div>

        {/* Kenya Tax Rates Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Current Kenya Tax Rates
            </h3>
            
            {/* Tax Category Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['vat', 'withholding', 'excise', 'corporate'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedTaxCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    selectedTaxCategory === category
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Tax Rates Display */}
            <div className="space-y-4">
              {filteredRates.map((rate, index) => (
                <motion.div
                  key={rate.type}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{rate.type}</h4>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600 dark:text-green-400">
                        {rate.rate}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Effective: {rate.applicableFrom}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{rate.description}</p>
                  
                  {/* Quick Calculator */}
                  {rate.type === 'Standard VAT' && (
                    <div className="mt-3 p-3 bg-white dark:bg-slate-900 rounded border">
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-slate-800"
                        />
                        <div className="text-right">
                          <div className="text-xs text-gray-500 dark:text-gray-400">VAT Amount</div>
                          <div className="font-semibold text-green-600 dark:text-green-400">
                            {formatKES(calculateTax(parseFloat(amount) || 0, rate.rate, rate.type))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* KRA Integrations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              KRA System Integrations
            </h3>
            
            <div className="space-y-6">
              {kraIntegrations.map((integration, index) => (
                <motion.div
                  key={integration.service}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {integration.service}
                    </h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(integration.status)}`}>
                      {integration.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {integration.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {integration.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h5 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                Integration Performance
              </h5>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">99.9%</div>
                  <div className="text-xs text-green-700 dark:text-green-300">Uptime</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">&lt;2s</div>
                  <div className="text-xs text-green-700 dark:text-green-300">Response Time</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Compliance Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {complianceFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {feature.description}
              </p>
              <div className="space-y-2">
                {feature.highlights.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex items-center justify-center text-xs">
                    <CheckCircleIcon className="w-3 h-3 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* East African Expansion Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              East African Expansion Roadmap
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              After mastering Kenya, we're expanding across East Africa to serve the entire region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eastAfricanExpansion.map((country, index) => (
              <motion.div
                key={country.country}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="text-4xl mb-3">{country.flag}</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {country.country}
                </h4>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                  country.status === 'planning' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}>
                  {country.status}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Target: {country.timeline}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 text-sm">
              <GlobeAltIcon className="w-4 h-4 mr-2" />
              Building Africa's leading fintech tax compliance platform
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Simplify Your Kenya Tax Compliance?
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of Kenyan businesses already using Sunny for seamless tax compliance. 
            Full KRA integration, real-time calculations, and local expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-green-500 text-green-600 dark:text-green-400 rounded-lg font-semibold text-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
              Schedule Demo
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-lg hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              View KRA Integration Docs
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
