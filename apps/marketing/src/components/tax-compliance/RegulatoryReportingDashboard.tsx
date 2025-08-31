'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  DocumentChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { formatDate } from '@/utils/date-utils';

interface Report {
  id: string;
  name: string;
  authority: string;
  country: string;
  flag: string;
  status: 'submitted' | 'pending' | 'draft' | 'overdue';
  dueDate: string;
  submissionDate?: string;
  period: string;
  size: string;
}

const reports: Report[] = [
  {
    id: 'us-sales-tax-q1',
    name: 'Sales Tax Return',
    authority: 'IRS',
    country: 'United States',
    flag: '🇺🇸',
    status: 'submitted',
    dueDate: '2024-01-31',
    submissionDate: '2024-01-29',
    period: 'Q1 2024',
    size: '2.4 MB'
  },
  {
    id: 'uk-vat-return',
    name: 'VAT Return',
    authority: 'HMRC',
    country: 'United Kingdom',
    flag: '🇬🇧',
    status: 'pending',
    dueDate: '2024-02-07',
    period: 'Q4 2023',
    size: '1.8 MB'
  },
  {
    id: 'de-vat-advance',
    name: 'VAT Advance Return',
    authority: 'Bundesfinanzministerium',
    country: 'Germany',
    flag: '🇩🇪',
    status: 'draft',
    dueDate: '2024-02-10',
    period: 'January 2024',
    size: '3.2 MB'
  },
  {
    id: 'ke-vat-monthly',
    name: 'Monthly VAT Return',
    authority: 'KRA',
    country: 'Kenya',
    flag: '🇰🇪',
    status: 'submitted',
    dueDate: '2024-01-20',
    submissionDate: '2024-01-18',
    period: 'December 2023',
    size: '892 KB'
  },
  {
    id: 'ca-gst-quarterly',
    name: 'GST/HST Return',
    authority: 'CRA',
    country: 'Canada',
    flag: '🇨🇦',
    status: 'overdue',
    dueDate: '2024-01-15',
    period: 'Q4 2023',
    size: '1.5 MB'
  }
];

export default function RegulatoryReportingDashboard() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredReports = selectedStatus === 'all' 
    ? reports 
    : reports.filter(report => report.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'pending': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'draft': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'overdue': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return CheckCircleIcon;
      case 'pending': return ClockIcon;
      case 'draft': return DocumentChartBarIcon;
      case 'overdue': return ExclamationTriangleIcon;
      default: return ClockIcon;
    }
  };

  const statusCounts = {
    submitted: reports.filter(r => r.status === 'submitted').length,
    pending: reports.filter(r => r.status === 'pending').length,
    draft: reports.filter(r => r.status === 'draft').length,
    overdue: reports.filter(r => r.status === 'overdue').length
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
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
            <DocumentChartBarIcon className="w-4 h-4 mr-2" />
            Regulatory Reporting Dashboard
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Automated Compliance Reporting
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Monitor, generate, and submit regulatory reports for 50+ tax authorities worldwide. 
            Automated scheduling, validation, and submission with full audit trails.
          </p>
        </motion.div>

        {/* Report Status Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { status: 'submitted', label: 'Submitted', count: statusCounts.submitted, color: 'text-green-600 dark:text-green-400' },
            { status: 'pending', label: 'Pending', count: statusCounts.pending, color: 'text-blue-600 dark:text-blue-400' },
            { status: 'draft', label: 'Draft', count: statusCounts.draft, color: 'text-yellow-600 dark:text-yellow-400' },
            { status: 'overdue', label: 'Overdue', count: statusCounts.overdue, color: 'text-red-600 dark:text-red-400' }
          ].map((item, index) => (
            <motion.button
              key={item.status}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedStatus(selectedStatus === item.status ? 'all' : item.status)}
              className={`p-6 rounded-xl border-2 text-center transition-all hover:scale-105 ${
                selectedStatus === item.status
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className={`text-3xl font-bold mb-2 ${item.color}`}>
                {item.count}
              </div>
              <div className="font-medium text-gray-900 dark:text-white mb-1">
                {item.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Reports
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Reports Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Regulatory Reports
            </h3>
            <div className="flex items-center gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                title="Filter reports by status"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Reports</option>
                <option value="submitted">Submitted</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
                <option value="overdue">Overdue</option>
              </select>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Generate Report
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredReports.map((report, index) => {
              const StatusIcon = getStatusIcon(report.status);
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    {/* Report Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{report.flag}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {report.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {report.authority} • {report.country}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Period */}
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Period</div>
                      <div className="font-medium text-gray-900 dark:text-white">{report.period}</div>
                    </div>

                    {/* Due Date */}
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Due Date</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {formatDate(report.dueDate)}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          title="Download report"
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          <ArrowDownTrayIcon className="w-5 h-5" />
                        </button>
                        <button 
                          title="Schedule report"
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          <CalendarIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {report.size}
                      </div>
                    </div>
                  </div>

                  {/* Submission Details */}
                  {report.submissionDate && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Submitted: {formatDate(report.submissionDate)}
                        </span>
                        <div className="flex items-center text-green-600 dark:text-green-400">
                          <CheckCircleIcon className="w-4 h-4 mr-1" />
                          On time
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Reporting Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: BuildingOfficeIcon,
              title: 'Multi-Authority Support',
              description: 'Submit reports to 50+ tax authorities worldwide',
              features: ['Automated formatting', 'Authority-specific rules', 'Direct submission']
            },
            {
              icon: ClockIcon,
              title: 'Scheduled Reporting',
              description: 'Automated report generation and submission',
              features: ['Smart scheduling', 'Deadline tracking', 'Auto-submission']
            },
            {
              icon: GlobeAltIcon,
              title: 'Global Compliance',
              description: 'Stay compliant across all jurisdictions',
              features: ['Real-time updates', 'Local expertise', 'Audit trails']
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {feature.description}
              </p>
              <div className="space-y-2">
                {feature.features.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-center text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
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

