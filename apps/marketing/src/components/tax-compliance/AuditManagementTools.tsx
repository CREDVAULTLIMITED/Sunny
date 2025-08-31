'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  DocumentMagnifyingGlassIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  FolderIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  ShieldCheckIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { formatDateTime, formatDate } from '@/utils/date-utils';

interface AuditTrail {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  entity: string;
  details: string;
  ip: string;
  location: string;
  risk: 'low' | 'medium' | 'high';
}

interface AuditReport {
  id: string;
  name: string;
  period: string;
  type: 'tax' | 'compliance' | 'security' | 'financial';
  status: 'completed' | 'in-progress' | 'pending';
  findings: number;
  score: number;
  lastUpdate: string;
}

const auditTrails: AuditTrail[] = [
  {
    id: 'audit-001',
    timestamp: '2024-01-15 14:32:18',
    action: 'Tax Calculation Modified',
    user: 'admin@sunny.com',
    entity: 'US Sales Tax Rule',
    details: 'Updated California sales tax rate from 8.25% to 8.50%',
    ip: '192.168.1.100',
    location: 'San Francisco, CA',
    risk: 'medium'
  },
  {
    id: 'audit-002',
    timestamp: '2024-01-15 13:45:32',
    action: 'Report Generated',
    user: 'system@sunny.com',
    entity: 'VAT Return Q4 2023',
    details: 'Automated VAT return generated for UK operations',
    ip: '10.0.0.1',
    location: 'London, UK',
    risk: 'low'
  },
  {
    id: 'audit-003',
    timestamp: '2024-01-15 12:18:45',
    action: 'Access Denied',
    user: 'unknown@external.com',
    entity: 'Tax Configuration',
    details: 'Unauthorized access attempt to tax rate configuration',
    ip: '203.0.113.1',
    location: 'Unknown',
    risk: 'high'
  },
  {
    id: 'audit-004',
    timestamp: '2024-01-15 11:22:10',
    action: 'Receipt Generated',
    user: 'api@sunny.com',
    entity: 'Transaction TXN-123456',
    details: 'Digital receipt generated for German VAT transaction',
    ip: '172.16.0.1',
    location: 'Frankfurt, DE',
    risk: 'low'
  }
];

const auditReports: AuditReport[] = [
  {
    id: 'report-001',
    name: 'Q4 2023 Tax Compliance Audit',
    period: 'Q4 2023',
    type: 'tax',
    status: 'completed',
    findings: 2,
    score: 98.5,
    lastUpdate: '2024-01-10'
  },
  {
    id: 'report-002',
    name: 'GDPR Compliance Review',
    period: 'January 2024',
    type: 'compliance',
    status: 'in-progress',
    findings: 0,
    score: 100,
    lastUpdate: '2024-01-15'
  },
  {
    id: 'report-003',
    name: 'Security Audit 2024',
    period: 'January 2024',
    type: 'security',
    status: 'pending',
    findings: 0,
    score: 0,
    lastUpdate: '2024-01-01'
  },
  {
    id: 'report-004',
    name: 'Financial Controls Assessment',
    period: 'Q1 2024',
    type: 'financial',
    status: 'in-progress',
    findings: 1,
    score: 95.2,
    lastUpdate: '2024-01-12'
  }
];

export default function AuditManagementTools() {
  const [selectedTab, setSelectedTab] = useState<'trails' | 'reports'>('trails');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  const filteredTrails = auditTrails.filter(trail => {
    const matchesSearch = trail.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trail.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trail.entity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || trail.risk === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'in-progress': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'pending': return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tax': return DocumentTextIcon;
      case 'compliance': return ShieldCheckIcon;
      case 'security': return MagnifyingGlassIcon;
      case 'financial': return ChartBarIcon;
      default: return FolderIcon;
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
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium mb-4">
            <DocumentMagnifyingGlassIcon className="w-4 h-4 mr-2" />
            Audit Management Tools
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Complete Audit Trail Management
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive audit trails, compliance reporting, and investigation tools. 
            Full transparency with 7+ year retention and forensic-grade logging.
          </p>
        </motion.div>

        {/* Audit Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Audit Events', value: '1.2M+', description: 'Total recorded events', color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Retention Period', value: '7+ Years', description: 'Compliance retention', color: 'text-green-600 dark:text-green-400' },
            { label: 'Response Time', value: '<100ms', description: 'Query performance', color: 'text-purple-600 dark:text-purple-400' },
            { label: 'Compliance Score', value: '98.5%', description: 'Overall compliance', color: 'text-orange-600 dark:text-orange-400' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700"
            >
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="font-medium text-gray-900 dark:text-white mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
        >
          {/* Tab Navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedTab('trails')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTab === 'trails'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Audit Trails
              </button>
              <button
                onClick={() => setSelectedTab('reports')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTab === 'reports'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Audit Reports
              </button>
            </div>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              Generate Report
            </button>
          </div>

          {/* Audit Trails Tab */}
          {selectedTab === 'trails' && (
            <div>
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search audit trails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  title="Filter by risk level"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="high">High Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="low">Low Risk</option>
                </select>
              </div>

              {/* Audit Trails List */}
              <div className="space-y-4">
                {filteredTrails.map((trail, index) => (
                  <motion.div
                    key={trail.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(trail.risk)}`}>
                            {trail.risk.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{trail.action}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{trail.entity}</p>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">User</div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{trail.user}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{trail.location}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time</div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {formatDateTime(trail.timestamp)}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <button 
                          title="View audit trail details"
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{trail.details}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-500">
                        <span>IP: {trail.ip}</span>
                        <span className="mx-2">•</span>
                        <span>ID: {trail.id}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Audit Reports Tab */}
          {selectedTab === 'reports' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {auditReports.map((report, index) => {
                  const TypeIcon = getTypeIcon(report.type);
                  return (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                            <TypeIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{report.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{report.period}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status.replace('-', ' ')}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{report.score}%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{report.findings}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Findings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900 dark:text-white capitalize">{report.type}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Type</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Last Updated: {formatDate(report.lastUpdate)}
                        </span>
                        <div className="flex gap-2">
                          <button 
                            title="View report details"
                            className="p-1 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button 
                            title="Download report"
                            className="p-1 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
                          >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Audit Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: ClockIcon,
              title: 'Real-time Monitoring',
              description: 'Live audit trail capture with instant alerting',
              features: ['Event streaming', 'Real-time alerts', 'Anomaly detection']
            },
            {
              icon: FolderIcon,
              title: 'Long-term Retention',
              description: '7+ year retention with forensic-grade integrity',
              features: ['Tamper-proof storage', 'Compliance retention', 'Fast retrieval']
            },
            {
              icon: ChartBarIcon,
              title: 'Advanced Analytics',
              description: 'AI-powered audit analytics and risk assessment',
              features: ['Pattern analysis', 'Risk scoring', 'Predictive insights']
            }
          ].map((capability, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <capability.icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                {capability.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {capability.description}
              </p>
              <div className="space-y-2">
                {capability.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center justify-center text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
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

