'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  CpuChipIcon,
  CloudIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ServerIcon,
  GlobeAltIcon,
  BoltIcon,
  ArrowPathIcon,
  CircleStackIcon,
  WifiIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  CogIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface InfrastructureComponent {
  id: string;
  name: string;
  type: 'compute' | 'storage' | 'network' | 'security' | 'monitoring';
  status: 'healthy' | 'warning' | 'critical' | 'maintenance';
  uptime: number;
  load: number;
  location: string;
  specs: {
    cpu?: string;
    memory?: string;
    storage?: string;
    bandwidth?: string;
  };
  metrics: {
    latency: string;
    throughput: string;
    availability: string;
  };
}

interface CloudProvider {
  name: string;
  logo: string;
  regions: number;
  services: string[];
  status: 'active' | 'backup' | 'testing';
  marketShare: number;
}

interface MonitoringMetric {
  name: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  threshold: number;
  current: number;
  icon: any;
}

const infrastructureComponents: InfrastructureComponent[] = [
  {
    id: 'api-gateway-cluster',
    name: 'Go API Gateway Cluster',
    type: 'compute',
    status: 'healthy',
    uptime: 99.99,
    load: 67,
    location: 'Global CDN',
    specs: {
      cpu: '32 vCPU',
      memory: '128 GB',
      bandwidth: '10 Gbps'
    },
    metrics: {
      latency: '12ms',
      throughput: '50k req/s',
      availability: '99.99%'
    }
  },
  {
    id: 'load-balancers',
    name: 'Load Balancer Network',
    type: 'network',
    status: 'healthy',
    uptime: 99.98,
    load: 45,
    location: 'Multi-region',
    specs: {
      bandwidth: '100 Gbps',
      memory: '64 GB'
    },
    metrics: {
      latency: '8ms',
      throughput: '1M req/s',
      availability: '99.98%'
    }
  },
  {
    id: 'cache-layer',
    name: 'Redis Cache Cluster',
    type: 'storage',
    status: 'healthy',
    uptime: 99.97,
    load: 58,
    location: 'Edge locations',
    specs: {
      memory: '512 GB',
      storage: '2 TB NVMe'
    },
    metrics: {
      latency: '0.3ms',
      throughput: '2M ops/s',
      availability: '99.97%'
    }
  },
  {
    id: 'database-cluster',
    name: 'PostgreSQL HA Cluster',
    type: 'storage',
    status: 'healthy',
    uptime: 99.95,
    load: 72,
    location: 'Multi-AZ',
    specs: {
      cpu: '64 vCPU',
      memory: '256 GB',
      storage: '10 TB SSD'
    },
    metrics: {
      latency: '2ms',
      throughput: '100k queries/s',
      availability: '99.95%'
    }
  },
  {
    id: 'security-layer',
    name: 'Security Monitoring',
    type: 'security',
    status: 'healthy',
    uptime: 100,
    load: 34,
    location: 'Global',
    specs: {
      cpu: '16 vCPU',
      memory: '64 GB'
    },
    metrics: {
      latency: '5ms',
      throughput: '500k events/s',
      availability: '100%'
    }
  },
  {
    id: 'monitoring-stack',
    name: 'Health Monitoring',
    type: 'monitoring',
    status: 'warning',
    uptime: 99.92,
    load: 81,
    location: 'Central',
    specs: {
      cpu: '24 vCPU',
      memory: '96 GB',
      storage: '5 TB'
    },
    metrics: {
      latency: '15ms',
      throughput: '1M metrics/s',
      availability: '99.92%'
    }
  }
];

const cloudProviders: CloudProvider[] = [
  {
    name: 'AWS',
    logo: '🅰️',
    regions: 28,
    services: ['EC2', 'RDS', 'ElastiCache', 'CloudFront', 'Route 53'],
    status: 'active',
    marketShare: 45
  },
  {
    name: 'Google Cloud',
    logo: '🅶',
    regions: 15,
    services: ['Compute Engine', 'Cloud SQL', 'Cloud CDN', 'Cloud DNS'],
    status: 'active',
    marketShare: 25
  },
  {
    name: 'Microsoft Azure',
    logo: '🅼',
    regions: 12,
    services: ['Virtual Machines', 'Azure Database', 'Azure CDN'],
    status: 'backup',
    marketShare: 20
  },
  {
    name: 'DigitalOcean',
    logo: '🌊',
    regions: 8,
    services: ['Droplets', 'Managed Databases', 'Spaces CDN'],
    status: 'testing',
    marketShare: 10
  }
];

const monitoringMetrics: MonitoringMetric[] = [
  {
    name: 'API Response Time',
    value: '12',
    unit: 'ms',
    trend: 'stable',
    threshold: 50,
    current: 12,
    icon: BoltIcon
  },
  {
    name: 'Database Connections',
    value: '2,847',
    unit: 'active',
    trend: 'up',
    threshold: 5000,
    current: 2847,
    icon: CircleStackIcon
  },
  {
    name: 'Cache Hit Rate',
    value: '97.8',
    unit: '%',
    trend: 'up',
    threshold: 95,
    current: 97.8,
    icon: ServerIcon
  },
  {
    name: 'Network Latency',
    value: '8',
    unit: 'ms',
    trend: 'down',
    threshold: 20,
    current: 8,
    icon: WifiIcon
  },
  {
    name: 'Error Rate',
    value: '0.02',
    unit: '%',
    trend: 'down',
    threshold: 0.1,
    current: 0.02,
    icon: ExclamationTriangleIcon
  },
  {
    name: 'Throughput',
    value: '45,230',
    unit: 'req/s',
    trend: 'up',
    threshold: 50000,
    current: 45230,
    icon: ChartBarIcon
  }
];

export default function EnterpriseInfrastructureSection() {
  const [selectedComponent, setSelectedComponent] = useState<string>('api-gateway-cluster');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  const currentComponent = infrastructureComponents.find(c => c.id === selectedComponent) || infrastructureComponents[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'critical': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'maintenance': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'compute': return CpuChipIcon;
      case 'storage': return CircleStackIcon;
      case 'network': return WifiIcon;
      case 'security': return ShieldCheckIcon;
      case 'monitoring': return EyeIcon;
      default: return ServerIcon;
    }
  };

  const getLoadColor = (load: number) => {
    if (load >= 80) return 'bg-red-500';
    if (load >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getMetricStatus = (current: number, threshold: number, isError: boolean = false) => {
    if (isError) {
      return current <= threshold ? 'healthy' : 'warning';
    }
    return current >= threshold ? 'healthy' : 'warning';
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
            <ServerIcon className="w-4 h-4 mr-2" />
            Enterprise Infrastructure
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Global Infrastructure Stack
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Enterprise-grade infrastructure with load balancing, caching systems, health monitoring, 
            and multi-cloud deployment for maximum reliability and performance.
          </p>
        </motion.div>

        {/* Real-time Monitoring Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 mb-20 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Real-time Infrastructure Monitoring
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Live monitoring</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {monitoringMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-center mb-2">
                  <metric.icon className="w-5 h-5 text-blue-500 mr-1" />
                  <span className="text-xs">{getTrendIcon(metric.trend)}</span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {metric.unit}
                </div>
                <div className="text-xs font-medium text-gray-900 dark:text-white">
                  {metric.name}
                </div>
                
                {/* Progress indicator */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2">
                  <motion.div
                    className={`h-1 rounded-full ${
                      getMetricStatus(metric.current, metric.threshold, metric.name.includes('Error')) === 'healthy' 
                        ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min((metric.current / metric.threshold) * 100, 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Infrastructure Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 mb-20 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Infrastructure Components
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Component Selector */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Select Component</h4>
              {infrastructureComponents.map((component) => {
                const TypeIcon = getTypeIcon(component.type);
                return (
                  <button
                    key={component.id}
                    onClick={() => setSelectedComponent(component.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedComponent === component.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <TypeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                          {component.name}
                        </h5>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className={`px-2 py-1 rounded capitalize ${getStatusColor(component.status)}`}>
                            {component.status}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">{component.uptime}% uptime</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600 dark:text-gray-400">Load:</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                            <div 
                              className={`h-1 rounded-full ${getLoadColor(component.load)}`}
                              style={{ width: `${component.load}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{component.load}%</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Component Details */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentComponent.name}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentComponent.status)}`}>
                    {currentComponent.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Uptime</div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {currentComponent.uptime}%
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Load</div>
                    <div className={`text-lg font-bold ${
                      currentComponent.load >= 80 ? 'text-red-600 dark:text-red-400' :
                      currentComponent.load >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-green-600 dark:text-green-400'
                    }`}>
                      {currentComponent.load}%
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {currentComponent.location}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">Specifications</h5>
                    <div className="space-y-2">
                      {Object.entries(currentComponent.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400 capitalize">{key}:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">Performance Metrics</h5>
                    <div className="space-y-2">
                      {Object.entries(currentComponent.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400 capitalize">{key}:</span>
                          <span className="font-medium text-blue-600 dark:text-blue-400">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Multi-Cloud Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Multi-Cloud Deployment
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Distributed across multiple cloud providers for maximum reliability and global reach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cloudProviders.map((provider, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-4">{provider.logo}</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {provider.name}
                </h4>
                
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    provider.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    provider.status === 'backup' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                    'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {provider.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Regions:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{provider.regions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Share:</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{provider.marketShare}%</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Services</h5>
                  <div className="space-y-1">
                    {provider.services.slice(0, 3).map((service, serviceIndex) => (
                      <div key={serviceIndex} className="text-xs text-gray-600 dark:text-gray-400">
                        {service}
                      </div>
                    ))}
                    {provider.services.length > 3 && (
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        +{provider.services.length - 3} more
                      </div>
                    )}
                  </div>
                </div>

                {/* Market share visualization */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full bg-blue-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${provider.marketShare}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Architecture Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Enterprise-Grade Benefits
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our infrastructure delivers unmatched reliability, performance, and scalability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BoltIcon,
                title: 'High Performance',
                description: 'Sub-second response times with optimized caching and load balancing',
                metrics: ['<12ms API response', '1M+ req/s capacity', '99.99% uptime SLA']
              },
              {
                icon: ShieldCheckIcon,
                title: 'Enterprise Security',
                description: 'Multi-layered security with continuous monitoring and threat detection',
                metrics: ['Zero breaches', 'AES-256 encryption', '24/7 monitoring']
              },
              {
                icon: GlobeAltIcon,
                title: 'Global Scale',
                description: 'Multi-cloud deployment across 190+ countries with edge optimization',
                metrics: ['63 regions', '4 cloud providers', 'Edge caching']
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {benefit.description}
                </p>
                <div className="space-y-1">
                  {benefit.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center justify-center text-sm">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

