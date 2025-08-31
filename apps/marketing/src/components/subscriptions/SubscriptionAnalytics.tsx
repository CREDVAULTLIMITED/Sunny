'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  PresentationChartLineIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface AnalyticsMetric {
  id: string;
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
  icon: any;
  color: string;
}

interface ChartData {
  label: string;
  value: number;
  previousValue?: number;
}

const analyticsMetrics: AnalyticsMetric[] = [
  {
    id: 'mrr',
    name: 'Monthly Recurring Revenue',
    value: '$127,890',
    change: '+12.5%',
    trend: 'up',
    description: 'Total monthly recurring revenue from active subscriptions',
    icon: CurrencyDollarIcon,
    color: 'green'
  },
  {
    id: 'churn',
    name: 'Churn Rate',
    value: '2.3%',
    change: '-0.8%',
    trend: 'down',
    description: 'Percentage of customers who cancelled this month',
    icon: ArrowTrendingDownIcon,
    color: 'red'
  },
  {
    id: 'ltv',
    name: 'Customer LTV',
    value: '$4,280',
    change: '+18.2%',
    trend: 'up',
    description: 'Average lifetime value per customer',
    icon: UsersIcon,
    color: 'blue'
  },
  {
    id: 'arpu',
    name: 'ARPU',
    value: '$127',
    change: '+5.1%',
    trend: 'up',
    description: 'Average revenue per user per month',
    icon: ChartBarIcon,
    color: 'purple'
  },
  {
    id: 'active_subs',
    name: 'Active Subscriptions',
    value: '1,247',
    change: '+89',
    trend: 'up',
    description: 'Total number of active subscriptions',
    icon: CheckCircleIcon,
    color: 'emerald'
  },
  {
    id: 'trial_conversion',
    name: 'Trial Conversion',
    value: '34.2%',
    change: '+2.1%',
    trend: 'up',
    description: 'Percentage of trials that convert to paid',
    icon: FunnelIcon,
    color: 'amber'
  }
];

const mrrData: ChartData[] = [
  { label: 'Jan', value: 95000, previousValue: 87000 },
  { label: 'Feb', value: 102000, previousValue: 91000 },
  { label: 'Mar', value: 108000, previousValue: 95000 },
  { label: 'Apr', value: 115000, previousValue: 102000 },
  { label: 'May', value: 120000, previousValue: 108000 },
  { label: 'Jun', value: 127890, previousValue: 115000 }
];

const cohortData = [
  { month: 'Jan 2024', customers: 150, retained: [100, 85, 78, 72, 68, 65] },
  { month: 'Feb 2024', customers: 180, retained: [100, 88, 81, 76, 73] },
  { month: 'Mar 2024', customers: 220, retained: [100, 91, 84, 79] },
  { month: 'Apr 2024', customers: 195, retained: [100, 89, 82] },
  { month: 'May 2024', customers: 205, retained: [100, 87] },
  { month: 'Jun 2024', customers: 235, retained: [100] }
];

const analyticsFeatures = [
  {
    icon: ChartBarIcon,
    title: 'Revenue Analytics',
    description: 'Track MRR, ARR, and revenue trends',
    capabilities: [
      'Monthly/Annual recurring revenue',
      'Revenue cohort analysis',
      'Plan performance metrics',
      'Geographic revenue breakdown'
    ]
  },
  {
    icon: UsersIcon,
    title: 'Customer Insights',
    description: 'Understand customer behavior and lifetime value',
    capabilities: [
      'Customer lifetime value (LTV)',
      'Churn rate analysis',
      'Cohort retention rates',
      'Customer segmentation'
    ]
  },
  {
    icon: ArrowTrendingUpIcon,
    title: 'Growth Metrics',
    description: 'Monitor growth and identify opportunities',
    capabilities: [
      'Growth rate tracking',
      'Trial conversion rates',
      'Upgrade/downgrade patterns',
      'Market penetration'
    ]
  },
  {
    icon: PresentationChartLineIcon,
    title: 'Custom Dashboards',
    description: 'Build dashboards for your specific needs',
    capabilities: [
      'Drag-and-drop dashboard builder',
      'Custom metric calculations',
      'Automated reporting',
      'Export capabilities'
    ]
  }
];

export default function SubscriptionAnalytics() {
  const [selectedMetric, setSelectedMetric] = useState<string>('mrr');
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const getMetricColor = (color: string) => {
    const colors = {
      green: 'text-green-600 dark:text-green-400',
      red: 'text-red-600 dark:text-red-400',
      blue: 'text-blue-600 dark:text-blue-400',
      purple: 'text-purple-600 dark:text-purple-400',
      emerald: 'text-emerald-600 dark:text-emerald-400',
      amber: 'text-amber-600 dark:text-amber-400'
    };
    return colors[color as keyof typeof colors] || 'text-gray-600 dark:text-gray-400';
  };

  const getBgColor = (color: string) => {
    const colors = {
      green: 'bg-green-100 dark:bg-green-900/30',
      red: 'bg-red-100 dark:bg-red-900/30',
      blue: 'bg-blue-100 dark:bg-blue-900/30',
      purple: 'bg-purple-100 dark:bg-purple-900/30',
      emerald: 'bg-emerald-100 dark:bg-emerald-900/30',
      amber: 'bg-amber-100 dark:bg-amber-900/30'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-900/30';
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
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <ChartBarIcon className="w-4 h-4 mr-2" />
            Subscription Analytics
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Data-Driven Insights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive analytics to understand your subscription business. 
            Track MRR, churn, cohorts, and customer lifetime value with real-time dashboards.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {analyticsMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-slate-800 rounded-xl p-6 border cursor-pointer transition-all hover:shadow-lg ${
                selectedMetric === metric.id 
                  ? 'border-blue-500 ring-2 ring-blue-500/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getBgColor(metric.color)}`}>
                  <metric.icon className={`w-6 h-6 ${getMetricColor(metric.color)}`} />
                </div>
                <div className={`text-sm font-medium flex items-center gap-1 ${
                  metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                  metric.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                  ) : metric.trend === 'down' ? (
                    <ArrowTrendingDownIcon className="w-4 h-4" />
                  ) : (
                    <ClockIcon className="w-4 h-4" />
                  )}
                  {metric.change}
                </div>
              </div>
              
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {metric.value}
              </div>
              
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {metric.name}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* MRR Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Monthly Recurring Revenue
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your MRR growth over time
              </p>
            </div>
            
            <div className="flex gap-2">
              {(['7d', '30d', '90d', '1y'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeframe === period
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Simple Chart Visualization */}
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-2 h-48">
              {mrrData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center justify-end h-40 gap-1">
                    {/* Current Value Bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.value / 130000) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg min-h-[4px] relative group"
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        ${(data.value / 1000).toFixed(0)}k
                      </div>
                    </motion.div>
                    
                    {/* Previous Value Bar (lighter) */}
                    {data.previousValue && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.previousValue / 130000) * 100}%` }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                        className="w-full bg-gray-300 dark:bg-gray-600 rounded-t-lg min-h-[2px] absolute bottom-0 opacity-50"
                      />
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {data.label}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span className="text-gray-600 dark:text-gray-400">Current Period</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded" />
                <span className="text-gray-600 dark:text-gray-400">Previous Period</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cohort Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Cohort Retention Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track how customers from each month retain over time
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white text-sm">
                    Cohort
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white text-sm">
                    Size
                  </th>
                  {[0, 1, 2, 3, 4, 5].map((month) => (
                    <th key={month} className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white text-sm">
                      Month {month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohortData.map((cohort, index) => (
                  <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium text-sm">
                      {cohort.month}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
                      {cohort.customers}
                    </td>
                    {cohort.retained.map((retention, retIndex) => (
                      <td key={retIndex} className="py-3 px-4 text-center">
                        <div 
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            retention >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            retention >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                        >
                          {retention}%
                        </div>
                      </td>
                    ))}
                    {Array.from({ length: 6 - cohort.retained.length }, (_, i) => (
                      <td key={`empty-${i}`} className="py-3 px-4 text-center">
                        <div className="w-8 h-6 bg-gray-100 dark:bg-gray-700 rounded mx-auto" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Analytics Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {analyticsFeatures.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.capabilities.map((capability, capIndex) => (
                  <li key={capIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
