'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  GlobeAltIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface ComplianceRegion {
  id: string;
  name: string;
  countries: number;
  flag: string;
  compliance: number;
  color: string;
  taxTypes: string[];
  authorities: string[];
  coverage: string;
  lastUpdate: string;
  highlights: string[];
}

interface ComplianceMetric {
  region: string;
  accuracy: number;
  coverage: number;
  automation: number;
  reporting: number;
  trend: 'up' | 'down' | 'stable';
}

const complianceRegions: ComplianceRegion[] = [
  {
    id: 'north-america',
    name: 'North America',
    countries: 3,
    flag: '🌎',
    compliance: 100,
    color: 'bg-blue-500',
    taxTypes: ['Sales Tax', 'Federal Tax', 'GST/HST', 'Provincial Tax'],
    authorities: ['IRS', 'CRA', 'SAT'],
    coverage: '100% of GDP',
    lastUpdate: '2024-01-15',
    highlights: ['Real-time rate updates', 'Multi-jurisdiction handling', 'Automated filing']
  },
  {
    id: 'europe',
    name: 'Europe',
    countries: 45,
    flag: '🇪🇺',
    compliance: 99.8,
    color: 'bg-green-500',
    taxTypes: ['VAT', 'Corporate Tax', 'Digital Services Tax', 'Excise Duty'],
    authorities: ['EC', 'HMRC', 'DGFiP', 'Agenzia delle Entrate'],
    coverage: '98% of EU GDP',
    lastUpdate: '2024-01-14',
    highlights: ['GDPR compliant', 'Brexit adjustments', 'Digital tax rules']
  },
  {
    id: 'asia-pacific',
    name: 'Asia Pacific',
    countries: 67,
    flag: '🌏',
    compliance: 98.5,
    color: 'bg-purple-500',
    taxTypes: ['GST', 'Service Tax', 'Consumption Tax', 'Withholding Tax'],
    authorities: ['ATO', 'IRAS', 'NTA', 'CBDT'],
    coverage: '85% of region GDP',
    lastUpdate: '2024-01-13',
    highlights: ['Rapid digitalization', 'Cross-border compliance', 'Regional harmonization']
  },
  {
    id: 'africa',
    name: 'Africa 🏠',
    countries: 54,
    flag: '🌍',
    compliance: 97.2,
    color: 'bg-orange-500',
    taxTypes: ['VAT', 'Withholding Tax', 'Excise Duty', 'Customs Duty', 'Digital Service Tax'],
    authorities: ['KRA (Kenya - HQ)', 'SARS', 'ETA', 'DGI'],
    coverage: '75% of region GDP',
    lastUpdate: '2024-01-12',
    highlights: ['Kenya HQ advantage', 'Mobile money integration', 'AfCFTA compliance', 'Digital transformation']
  },
  {
    id: 'south-america',
    name: 'South America',
    countries: 21,
    flag: '🌎',
    compliance: 96.8,
    color: 'bg-red-500',
    taxTypes: ['IVA', 'ICMS', 'Federal Tax', 'Municipal Tax'],
    authorities: ['RFB', 'SUNAT', 'AFIP', 'SII'],
    coverage: '80% of region GDP',
    lastUpdate: '2024-01-11',
    highlights: ['Electronic invoicing', 'Tax automation', 'Regional integration']
  }
];

const complianceMetrics: ComplianceMetric[] = [
  {
    region: 'North America',
    accuracy: 100,
    coverage: 100,
    automation: 98,
    reporting: 100,
    trend: 'stable'
  },
  {
    region: 'Europe',
    accuracy: 99.8,
    coverage: 98,
    automation: 99,
    reporting: 99.5,
    trend: 'up'
  },
  {
    region: 'Asia Pacific',
    accuracy: 98.5,
    coverage: 85,
    automation: 95,
    reporting: 97,
    trend: 'up'
  },
  {
    region: 'Africa',
    accuracy: 97.2,
    coverage: 75,
    automation: 88,
    reporting: 92,
    trend: 'up'
  },
  {
    region: 'South America',
    accuracy: 96.8,
    coverage: 80,
    automation: 85,
    reporting: 90,
    trend: 'up'
  }
];

export default function GlobalComplianceSection() {
  const [selectedRegion, setSelectedRegion] = useState<string>('africa'); // Default to Africa (Kenya HQ)
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  const currentRegion = complianceRegions.find(r => r.id === selectedRegion) || complianceRegions[1];
  const currentMetrics = complianceMetrics.find(m => m.region === currentRegion.name) || complianceMetrics[1];

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 99) return 'text-green-600 dark:text-green-400';
    if (compliance >= 95) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return ArrowTrendingUpIcon;
      case 'down': return ArrowTrendingDownIcon;
      default: return ClockIcon;
    }
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
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <GlobeAltIcon className="w-4 h-4 mr-2" />
            Global Compliance Coverage
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            190+ Countries, One Platform
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive tax compliance across all major regions with real-time updates, 
            automated reporting, and local expertise in every jurisdiction.
          </p>
        </motion.div>

        {/* Global Overview Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 mb-20 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Regional Compliance Overview
            </h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode('overview')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'overview' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'detailed' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Detailed
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {complianceRegions.map((region, index) => (
              <motion.button
                key={region.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedRegion(region.id)}
                className={`p-6 rounded-xl border-2 text-center transition-all hover:scale-105 ${
                  selectedRegion === region.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-3xl mb-3">{region.flag}</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {region.name}
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {region.countries} countries
                </div>
                <div className={`text-lg font-bold ${getComplianceColor(region.compliance)}`}>
                  {region.compliance}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">compliance</div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                  <motion.div
                    className={`h-2 rounded-full ${region.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${region.compliance}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Selected Region Details */}
          <motion.div
            key={selectedRegion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Region Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{currentRegion.flag}</span>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {currentRegion.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentRegion.coverage} coverage
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Countries</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {currentRegion.countries}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Compliance</div>
                    <div className={`text-xl font-bold ${getComplianceColor(currentRegion.compliance)}`}>
                      {currentRegion.compliance}%
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Tax Types Supported</h5>
                    <div className="flex flex-wrap gap-2">
                      {currentRegion.taxTypes.map((type, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Key Highlights</h5>
                    <div className="space-y-2">
                      {currentRegion.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-4">Performance Metrics</h5>
                <div className="space-y-4">
                  {[
                    { label: 'Accuracy', value: currentMetrics.accuracy, max: 100 },
                    { label: 'Coverage', value: currentMetrics.coverage, max: 100 },
                    { label: 'Automation', value: currentMetrics.automation, max: 100 },
                    { label: 'Reporting', value: currentMetrics.reporting, max: 100 }
                  ].map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{metric.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full bg-blue-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${metric.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-white dark:bg-slate-900 rounded-lg">
                  <h6 className="font-medium text-gray-900 dark:text-white mb-3">Tax Authorities</h6>
                  <div className="space-y-2">
                    {currentRegion.authorities.map((authority, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{authority}</span>
                        <div className="flex items-center gap-1">
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 dark:text-green-400 font-medium">Connected</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Compliance Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: DocumentTextIcon,
              title: 'Real-time Updates',
              description: 'Tax rates and regulations updated automatically as they change globally',
              stats: ['Daily rate updates', '50+ tax authorities', 'Zero manual intervention']
            },
            {
              icon: ChartBarIcon,
              title: 'Automated Reporting',
              description: 'Generate and submit regulatory reports for multiple jurisdictions',
              stats: ['190+ countries', 'Automated filing', 'Compliance monitoring']
            },
            {
              icon: BuildingOfficeIcon,
              title: 'Local Expertise',
              description: 'Tax rules configured by local experts in each jurisdiction',
              stats: ['Local partnerships', 'Expert validation', 'Cultural compliance']
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {feature.description}
              </p>
              <div className="space-y-2">
                {feature.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="flex items-center justify-center text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{stat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

