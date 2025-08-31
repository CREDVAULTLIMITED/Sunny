'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  BuildingLibraryIcon,
  GlobeAltIcon,
  ClockIcon,
  CheckCircleIcon,
  BoltIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowPathIcon,
  LinkIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface BankConnection {
  id: string;
  name: string;
  region: string;
  type: 'central' | 'commercial' | 'investment' | 'digital';
  status: 'connected' | 'testing' | 'pending' | 'maintenance';
  uptime: string;
  latency: number;
  logo: string;
  capabilities: string[];
}

interface IntegrationFeature {
  icon: any;
  title: string;
  description: string;
  metrics: {
    label: string;
    value: string;
    trend?: string;
  }[];
}

const bankConnections: BankConnection[] = [
  {
    id: 'kcb',
    name: 'Kenya Commercial Bank',
    region: 'Kenya',
    type: 'commercial',
    status: 'connected',
    uptime: '99.96%',
    latency: 42,
    logo: '🏦',
    capabilities: ['M-Pesa integration', 'Mobile banking', 'Corporate banking', 'International transfers']
  },
  {
    id: 'equity',
    name: 'Equity Bank',
    region: 'Kenya',
    type: 'commercial',
    status: 'connected',
    uptime: '99.94%',
    latency: 38,
    logo: '🏛️',
    capabilities: ['Equitel integration', 'Agent banking', 'SME banking', 'Digital loans']
  },
  {
    id: 'coop',
    name: 'Co-operative Bank',
    region: 'Kenya',
    type: 'commercial',
    status: 'connected',
    uptime: '99.92%',
    latency: 45,
    logo: '🤝',
    capabilities: ['Co-op mobile', 'SACCO services', 'Agricultural finance', 'Youth banking']
  },
  {
    id: 'absa',
    name: 'Absa Bank Kenya',
    region: 'Kenya',
    type: 'commercial',
    status: 'testing',
    uptime: '99.88%',
    latency: 48,
    logo: '🏪',
    capabilities: ['Corporate banking', 'Trade finance', 'Investment banking', 'Treasury services']
  },
  {
    id: 'ncba',
    name: 'NCBA Bank',
    region: 'Kenya',
    type: 'commercial',
    status: 'connected',
    uptime: '99.91%',
    latency: 44,
    logo: '💼',
    capabilities: ['Digital banking', 'Loop platform', 'SME solutions', 'Investment services']
  },
  {
    id: 'stanbic',
    name: 'Stanbic Bank',
    region: 'Kenya',
    type: 'commercial',
    status: 'connected',
    uptime: '99.89%',
    latency: 50,
    logo: '🏢',
    capabilities: ['Corporate banking', 'Trade finance', 'Treasury services', 'Investment banking']
  },
  {
    id: 'dtb',
    name: 'Diamond Trust Bank',
    region: 'Kenya',
    type: 'commercial',
    status: 'maintenance',
    uptime: '99.85%',
    latency: 52,
    logo: '💎',
    capabilities: ['SME banking', 'Islamic banking', 'Trade finance', 'Remittances']
  },
  {
    id: 'family',
    name: 'Family Bank',
    region: 'Kenya',
    type: 'commercial',
    status: 'connected',
    uptime: '99.87%',
    latency: 46,
    logo: '👨‍👩‍👧‍👦',
    capabilities: ['Micro-finance', 'Mobile banking', 'Agent banking', 'Digital loans']
  },
  {
    id: 'ib',
    name: 'I&M Bank',
    region: 'Kenya',
    type: 'commercial',
    status: 'connected',
    uptime: '99.90%',
    latency: 43,
    logo: '🏦',
    capabilities: ['Corporate banking', 'Investment services', 'Trade finance', 'Digital banking']
  },
  {
    id: 'cbk',
    name: 'Central Bank of Kenya',
    region: 'Kenya',
    type: 'central',
    status: 'connected',
    uptime: '99.99%',
    latency: 35,
    logo: '🏛️',
    capabilities: ['RTGS system', 'Regulatory compliance', 'Monetary policy', 'Payment systems']
  }
];

const integrationFeatures: IntegrationFeature[] = [
  {
    icon: BoltIcon,
    title: 'Real-time Connectivity',
    description: 'Direct API connections with sub-second response times',
    metrics: [
      { label: 'Average Latency', value: '45ms', trend: 'down' },
      { label: 'API Uptime', value: '99.97%', trend: 'up' },
      { label: 'Concurrent Connections', value: '10K+' }
    ]
  },
  {
    icon: GlobeAltIcon,
    title: 'Kenya Banking Network',
    description: 'Connected to all major Kenyan banks and financial institutions',
                metrics: [
      { label: 'Connected Banks', value: '42', trend: 'up' },
      { label: 'Kenyan Market Coverage', value: '95%+' },
      { label: 'M-Pesa Integration', value: 'Active' }
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise Security',
    description: 'Bank-grade security with end-to-end encryption',
    metrics: [
      { label: 'Security Score', value: '100%' },
      { label: 'Compliance Certs', value: '15+' },
      { label: 'Zero Breaches', value: '5+ years' }
    ]
  },
  {
    icon: ArrowPathIcon,
    title: 'Automatic Failover',
    description: 'Intelligent routing with redundant backup connections',
    metrics: [
      { label: 'Failover Time', value: '<1s', trend: 'down' },
      { label: 'Success Rate', value: '99.98%', trend: 'up' },
      { label: 'Backup Routes', value: '3+' }
    ]
  }
];

const regions = [
  { name: 'Kenya', banks: 42, color: 'bg-green-500', percentage: 45 },
  { name: 'East Africa', banks: 28, color: 'bg-blue-500', percentage: 30 },
  { name: 'Sub-Saharan Africa', banks: 15, color: 'bg-purple-500', percentage: 16 },
  { name: 'International', banks: 8, color: 'bg-amber-500', percentage: 9 }
];

export default function BankingIntegrations() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredBanks = bankConnections.filter(bank => {
    const regionMatch = selectedRegion === 'all' || bank.region.toLowerCase().includes(selectedRegion);
    const typeMatch = selectedType === 'all' || bank.type === selectedType;
    return regionMatch && typeMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'testing': return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
      case 'pending': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'maintenance': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircleIcon;
      case 'testing': return ArrowPathIcon;
      case 'pending': return ClockIcon;
      case 'maintenance': return ExclamationTriangleIcon;
      default: return ClockIcon;
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <BuildingLibraryIcon className="w-4 h-4 mr-2" />
            Banking Integrations
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Kenya Banking Network
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Direct connections to all major Kenyan banks and financial institutions. 
            Real-time processing with M-Pesa integration, enterprise security, and 99.97% uptime guarantee.
          </p>
        </motion.div>

        {/* Live Banking Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Live Bank Connections
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Real-time monitoring</span>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                aria-label="Filter banks by region"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Regions</option>
                <option value="kenya">Kenya</option>
                <option value="east africa">East Africa</option>
                <option value="africa">Sub-Saharan Africa</option>
                <option value="international">International</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Filter banks by type"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="commercial">Commercial Banks</option>
                <option value="digital">Digital Banks</option>
                <option value="investment">Investment Banks</option>
                <option value="central">Central Banks</option>
              </select>
            </div>
          </div>

          {/* Bank Connections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBanks.map((bank, index) => {
              const StatusIcon = getStatusIcon(bank.status);
              return (
                <motion.div
                  key={bank.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{bank.logo}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{bank.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{bank.region}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bank.status)}`}>
                      <StatusIcon className="w-3 h-3 inline mr-1" />
                      {bank.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Uptime:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{bank.uptime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Latency:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{bank.latency}ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Type:</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">{bank.type}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Capabilities</h5>
                    <div className="flex flex-wrap gap-1">
                      {bank.capabilities.slice(0, 3).map((capability, capIndex) => (
                        <span
                          key={capIndex}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded"
                        >
                          {capability}
                        </span>
                      ))}
                      {bank.capabilities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                          +{bank.capabilities.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Regional Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Regional Distribution
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our banking network covers Kenya and expanding across East Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {regions.map((region, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700"
              >
                <div className={`w-12 h-12 rounded-full ${region.color} mx-auto mb-4 flex items-center justify-center`}>
                  <GlobeAltIcon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{region.name}</h4>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {region.banks}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {region.percentage}% of network
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                  <motion.div
                    className={`h-2 rounded-full ${region.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${region.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integration Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {integrationFeatures.map((feature, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {feature.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {feature.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center">
                    <div className={`text-lg font-bold mb-1 ${
                      metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                      metric.trend === 'down' ? 'text-blue-600 dark:text-blue-400' :
                      'text-gray-900 dark:text-white'
                    }`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
