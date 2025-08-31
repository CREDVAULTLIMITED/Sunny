'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  DocumentTextIcon,
  CalculatorIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

interface TaxJurisdiction {
  id: string;
  country: string;
  region: string;
  taxTypes: string[];
  status: 'active' | 'pending' | 'review';
  compliance: number;
  lastUpdate: string;
  flag: string;
}

interface ComplianceFeature {
  icon: any;
  title: string;
  description: string;
  capabilities: string[];
  coverage: string;
  automation: number;
}

const taxJurisdictions: TaxJurisdiction[] = [
  {
    id: 'us',
    country: 'United States',
    region: 'North America',
    taxTypes: ['Federal Income', 'State Sales', 'City Tax', '1099 Reporting'],
    status: 'active',
    compliance: 100,
    lastUpdate: '2024-01-15',
    flag: '🇺🇸'
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    region: 'Europe',
    taxTypes: ['VAT', 'Corporation Tax', 'PAYE', 'Making Tax Digital'],
    status: 'active',
    compliance: 100,
    lastUpdate: '2024-01-14',
    flag: '🇬🇧'
  },
  {
    id: 'ke',
    country: 'Kenya',
    region: 'Africa',
    taxTypes: ['VAT', 'Withholding Tax', 'PAYE', 'ETR Integration'],
    status: 'active',
    compliance: 98,
    lastUpdate: '2024-01-13',
    flag: '🇰🇪'
  },
  {
    id: 'de',
    country: 'Germany',
    region: 'Europe',
    taxTypes: ['VAT', 'Corporate Tax', 'Trade Tax', 'DATEV Integration'],
    status: 'active',
    compliance: 100,
    lastUpdate: '2024-01-12',
    flag: '🇩🇪'
  },
  {
    id: 'ca',
    country: 'Canada',
    region: 'North America',
    taxTypes: ['GST/HST', 'Provincial Tax', 'T4 Reporting', 'CRA Integration'],
    status: 'active',
    compliance: 99,
    lastUpdate: '2024-01-11',
    flag: '🇨🇦'
  },
  {
    id: 'au',
    country: 'Australia',
    region: 'Oceania',
    taxTypes: ['GST', 'PAYG', 'FBT', 'STP Reporting'],
    status: 'review',
    compliance: 95,
    lastUpdate: '2024-01-10',
    flag: '🇦🇺'
  }
];

const complianceFeatures: ComplianceFeature[] = [
  {
    icon: CalculatorIcon,
    title: 'Automated Tax Calculation',
    description: 'Real-time tax computation for 190+ countries with dynamic rate updates',
    capabilities: [
      'Real-time rate updates',
      'Multi-jurisdiction support',
      'Product-specific rules',
      'Exception handling',
      'Rate history tracking'
    ],
    coverage: '190+ countries',
    automation: 98
  },
  {
    icon: DocumentTextIcon,
    title: 'Receipt Generation',
    description: 'Dynamic receipt creation with localized templates and compliance formatting',
    capabilities: [
      'Localized templates',
      'Digital signatures',
      'QR code integration',
      'Multi-language support',
      'Custom branding'
    ],
    coverage: '35+ languages',
    automation: 100
  },
  {
    icon: DocumentChartBarIcon,
    title: 'Regulatory Reporting',
    description: 'Automated compliance reporting for multiple jurisdictions and tax authorities',
    capabilities: [
      'Scheduled submissions',
      'Format validation',
      'Authority integration',
      'Audit trails',
      'Error resolution'
    ],
    coverage: '50+ tax authorities',
    automation: 95
  },
  {
    icon: ShieldCheckIcon,
    title: 'Audit Management',
    description: 'Comprehensive audit trail generation and compliance documentation',
    capabilities: [
      'Complete audit trails',
      'Document retention',
      'Compliance scoring',
      'Risk assessment',
      'Investigation tools'
    ],
    coverage: '7+ year retention',
    automation: 92
  }
];

const taxMetrics = [
  { label: 'Tax Jurisdictions', value: '190+', trend: 'up', description: 'Countries covered' },
  { label: 'Compliance Rate', value: '99.8%', trend: 'up', description: 'Successful filings' },
  { label: 'Processing Time', value: '<1s', trend: 'down', description: 'Tax calculation' },
  { label: 'Audit Readiness', value: '100%', trend: 'neutral', description: 'Documentation' }
];

export default function TaxComplianceSection() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  const filteredJurisdictions = selectedJurisdiction === 'all' 
    ? taxJurisdictions 
    : taxJurisdictions.filter(j => j.region.toLowerCase().includes(selectedJurisdiction));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'pending': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'review': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 98) return 'text-green-600 dark:text-green-400';
    if (compliance >= 95) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
            <DocumentTextIcon className="w-4 h-4 mr-2" />
            Tax & Compliance Suite
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Global Tax Management
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Automated tax calculation, compliance reporting, and receipt generation for 190+ countries. 
            Stay compliant with local regulations while scaling globally.
          </p>
        </motion.div>

        {/* Tax Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {taxMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700"
            >
              <div className={`text-3xl font-bold mb-2 ${
                metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                metric.trend === 'down' ? 'text-blue-600 dark:text-blue-400' :
                'text-gray-900 dark:text-white'
              }`}>
                {metric.value}
              </div>
              <div className="font-medium text-gray-900 dark:text-white mb-1">
                {metric.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tax Jurisdiction Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 mb-20 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tax Jurisdiction Coverage
            </h3>
            <div className="flex items-center gap-4">
              <select
                value={selectedJurisdiction}
                onChange={(e) => setSelectedJurisdiction(e.target.value)}
                aria-label="Filter by region"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Regions</option>
                <option value="north america">North America</option>
                <option value="europe">Europe</option>
                <option value="africa">Africa</option>
                <option value="oceania">Oceania</option>
              </select>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('overview')}
                  className={`px-3 py-2 rounded ${viewMode === 'overview' ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('detailed')}
                  className={`px-3 py-2 rounded ${viewMode === 'detailed' ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                >
                  <ChartBarIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJurisdictions.map((jurisdiction, index) => (
              <motion.div
                key={jurisdiction.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{jurisdiction.flag}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {jurisdiction.country}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {jurisdiction.region}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(jurisdiction.status)}`}>
                    {jurisdiction.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Compliance</span>
                    <span className={`font-semibold ${getComplianceColor(jurisdiction.compliance)}`}>
                      {jurisdiction.compliance}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${jurisdiction.compliance >= 98 ? 'bg-green-500' : jurisdiction.compliance >= 95 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${jurisdiction.compliance}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">Tax Types</h5>
                  <div className="flex flex-wrap gap-1">
                    {jurisdiction.taxTypes.map((type, typeIndex) => (
                      <span
                        key={typeIndex}
                        className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs rounded"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>Last Updated</span>
                    <span>{jurisdiction.lastUpdate}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Compliance Features
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              End-to-end tax and compliance management with automated workflows and intelligent reporting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {complianceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <feature.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Coverage</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{feature.coverage}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Automation</div>
                        <div className="font-semibold text-emerald-600 dark:text-emerald-400">{feature.automation}%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Key Capabilities</h5>
                  <div className="space-y-2">
                    {feature.capabilities.map((capability, capIndex) => (
                      <div key={capIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        {capability}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-100 via-green-100 to-blue-100 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Automate Your Tax Compliance?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Get started with our comprehensive tax and compliance suite. 
            Automate calculations, generate receipts, and stay compliant across all jurisdictions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
              <CalculatorIcon className="w-5 h-5 mr-2" />
              Try Tax Calculator
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              Download Guide
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
              <PrinterIcon className="w-5 h-5 mr-2" />
              View Sample Reports
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">5min</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Setup Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Monitoring</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">99.8%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

