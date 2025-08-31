'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  CalculatorIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  BoltIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  ExclamationTriangleIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface TaxFeature {
  icon: any;
  title: string;
  description: string;
  metric: string;
}

interface ComplianceMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

interface GlobalRegion {
  name: string;
  countries: number;
  compliance: number;
  color: string;
  flag: string;
  taxTypes: string[];
}

const taxFeatures: TaxFeature[] = [
  {
    icon: CalculatorIcon,
    title: 'Real-time Calculation',
    description: 'Instant tax computation for all transaction types',
    metric: '<1s response'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Coverage',
    description: '190+ countries with localized tax rules',
    metric: '190+ countries'
  },
  {
    icon: DocumentTextIcon,
    title: 'Automated Reporting',
    description: 'Regulatory compliance reports for 50+ authorities',
    metric: '50+ authorities'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Audit Ready',
    description: 'Complete audit trails with 7+ year retention',
    metric: '100% compliant'
  }
];

const complianceMetrics: ComplianceMetric[] = [
  {
    label: 'Tax Accuracy',
    value: '99.8%',
    change: '+0.1%',
    trend: 'up',
    description: 'Calculation precision'
  },
  {
    label: 'Response Time',
    value: '<1s',
    change: '-50ms',
    trend: 'down',
    description: 'Real-time processing'
  },
  {
    label: 'Countries Supported',
    value: '190+',
    change: '+3',
    trend: 'up',
    description: 'Global coverage'
  },
  {
    label: 'Compliance Rate',
    value: '100%',
    change: '0%',
    trend: 'neutral',
    description: 'Regulatory adherence'
  }
];

const globalRegions: GlobalRegion[] = [
  {
    name: 'North America',
    countries: 3,
    compliance: 100,
    color: 'bg-blue-500',
    flag: '🇺🇸',
    taxTypes: ['Federal Tax', 'State Sales Tax', 'GST/HST']
  },
  {
    name: 'Europe',
    countries: 45,
    compliance: 99.8,
    color: 'bg-green-500',
    flag: '🇪🇺',
    taxTypes: ['VAT', 'Corporate Tax', 'Digital Services Tax']
  },
  {
    name: 'Asia Pacific',
    countries: 67,
    compliance: 98.5,
    color: 'bg-purple-500',
    flag: '🌏',
    taxTypes: ['GST', 'Service Tax', 'Consumption Tax']
  },
  {
    name: 'Africa',
    countries: 54,
    compliance: 97.2,
    color: 'bg-orange-500',
    flag: '🇰🇪',
    taxTypes: ['Kenya VAT', 'M-Pesa Tax', 'KRA Integration']
  },
  {
    name: 'South America',
    countries: 21,
    compliance: 96.8,
    color: 'bg-red-500',
    flag: '🌎',
    taxTypes: ['IVA', 'ICMS', 'Federal Tax']
  }
];

const liveTransactions = [
  { country: 'United States', amount: '$1,247.50', tax: '$124.75', type: 'Sales Tax', status: 'completed' },
  { country: 'Germany', amount: '€892.30', tax: '€169.54', type: 'VAT', status: 'processing' },
  { country: 'Kenya', amount: 'KSh 15,420', tax: 'KSh 2,467', type: 'VAT', status: 'completed' },
  { country: 'Canada', amount: 'CAD 567.80', tax: 'CAD 73.81', type: 'GST/HST', status: 'completed' },
  { country: 'Australia', amount: 'AUD 1,098.40', tax: 'AUD 109.84', type: 'GST', status: 'processing' }
];

export default function TaxComplianceHero() {
  const [selectedRegion, setSelectedRegion] = useState<string>('africa'); // Default to Africa (Kenya HQ)
  const [activeDemo, setActiveDemo] = useState<boolean>(false);

  const currentRegion = globalRegions.find(r => r.name.toLowerCase().replace(' ', '') === selectedRegion) || globalRegions[1];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6"
            >
              <span className="text-lg mr-2">🇰🇪</span>
              Built in Kenya, Trusted Globally
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
            >
              Automate
              <span className="block bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Tax Compliance
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Full KRA integration with eTIMS support and M-Pesa tax automation. 
              Real-time tax calculation for Kenya and 190+ countries. 
              From Nairobi to the world - stay compliant with AI-powered tax automation.
            </motion.p>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              {taxFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                      {feature.description}
                    </p>
                    <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      {feature.metric}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <CalculatorIcon className="w-5 h-5 mr-2" />
                Try Tax Calculator
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
              
              <button 
                onClick={() => setActiveDemo(!activeDemo)}
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <PlayCircleIcon className="w-5 h-5 mr-2" />
                {activeDemo ? 'Stop Demo' : 'Live Demo'}
              </button>
            </motion.div>

            {/* Compliance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {complianceMetrics.map((metric, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className={`text-2xl lg:text-3xl font-bold mb-1 ${
                    metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                    metric.trend === 'down' ? 'text-blue-600 dark:text-blue-400' :
                    'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {metric.label}
                  </div>
                  <div className={`text-xs font-medium ${
                    metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                    metric.trend === 'down' ? 'text-blue-600 dark:text-blue-400' :
                    'text-gray-600 dark:text-gray-400'
                  }`}>
                    {metric.change}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Tax Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Tax Dashboard */}
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Global Tax Dashboard</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Real-time compliance monitoring</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${activeDemo ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {activeDemo ? 'Live Demo' : 'Standby'}
                  </span>
                </div>
              </div>

              {/* Global Regions Selector */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Select Region</h4>
                <div className="grid grid-cols-3 gap-2">
                  {globalRegions.slice(0, 6).map((region, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedRegion(region.name.toLowerCase().replace(' ', ''))}
                      className={`p-2 rounded-lg text-xs transition-all ${
                        selectedRegion === region.name.toLowerCase().replace(' ', '')
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-300'
                          : 'bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-600'
                      }`}
                    >
                      <div className="text-base mb-1">{region.flag}</div>
                      <div className="font-medium">{region.name}</div>
                      <div className="text-xs opacity-75">{region.countries} countries</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Region Details */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentRegion.flag}</span>
                    <h4 className="font-medium text-gray-900 dark:text-white">{currentRegion.name}</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {currentRegion.compliance}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Compliance</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {currentRegion.taxTypes.map((type, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-600 dark:text-gray-400">{type}</div>
                    </div>
                  ))}
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${currentRegion.compliance}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              {/* Live Transactions */}
              {activeDemo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Live Tax Calculations</h4>
                  {liveTransactions.map((transaction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          transaction.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'
                        }`} />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {transaction.country}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {transaction.type}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.amount}
                        </div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400">
                          Tax: {transaction.tax}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Floating Compliance Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -left-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white p-3 rounded-xl shadow-lg text-sm"
            >
              <div className="font-medium">99.8% Accuracy</div>
              <div className="text-xs opacity-80">Real-time calculation</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-xl shadow-lg text-sm"
            >
              <div className="font-medium">190+ Countries</div>
              <div className="text-xs opacity-80">Global coverage</div>
            </motion.div>

            {/* Compliance Status */}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              className="absolute top-20 -right-16 w-32 h-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3"
            >
              <div className="text-xs font-medium text-gray-900 dark:text-white mb-2">Compliance Status</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">GDPR Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">PCI DSS L1</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">SOC 2 Type II</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">ISO 27001</span>
                </div>
              </div>
            </motion.div>

            {/* Processing Speed Indicator */}
            <motion.div
              animate={{ rotate: [0, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 3 }}
              className="absolute bottom-20 -left-12 w-28 h-24 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2"
            >
              <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">Processing Speed</div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <BoltIcon className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">&lt;1s Tax Calc</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-3 h-3 text-blue-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Real-time</span>
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <GlobeAltIcon className="w-3 h-3 inline mr-1" />
                  Global
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

