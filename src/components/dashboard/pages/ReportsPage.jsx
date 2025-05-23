import React, { useState } from 'react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { 
  BarChart2, 
  Download, 
  Calendar,
  TrendingUp,
  DollarSign,
  Globe,
  Filter,
  RefreshCw
} from 'lucide-react';

const ReportsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState('transactions');
  const [dateRange, setDateRange] = useState('last_30');

  // Mock data for reports
  const reports = {
    transactions: {
      title: 'Transaction Reports',
      description: 'Detailed analysis of payment transactions',
      metrics: [
        { label: 'Total Volume', value: '$2.8M', trend: '+12.5%' },
        { label: 'Success Rate', value: '98.2%', trend: '+0.8%' },
        { label: 'Average Value', value: '$156', trend: '+5.2%' }
      ],
      charts: ['volume_trend', 'success_rate', 'payment_methods'],
      exportFormats: ['csv', 'xlsx', 'pdf']
    },
    settlements: {
      title: 'Settlement Reports',
      description: 'Settlement and payout analysis',
      metrics: [
        { label: 'Settled Amount', value: '$2.1M', trend: '+15.3%' },
        { label: 'Pending', value: '$320K', trend: '-2.1%' },
        { label: 'Average Time', value: '1.2 days', trend: '-8.4%' }
      ],
      charts: ['settlement_trend', 'payout_distribution', 'currencies'],
      exportFormats: ['csv', 'xlsx', 'pdf']
    },
    financials: {
      title: 'Financial Reports',
      description: 'Revenue and fee analysis',
      metrics: [
        { label: 'Revenue', value: '$185K', trend: '+18.7%' },
        { label: 'Processing Fees', value: '$42K', trend: '+11.2%' },
        { label: 'Net Margin', value: '77.3%', trend: '+2.4%' }
      ],
      charts: ['revenue_trend', 'fee_breakdown', 'profit_margin'],
      exportFormats: ['csv', 'xlsx', 'pdf']
    },
    regional: {
      title: 'Regional Reports',
      description: 'Geographic performance analysis',
      metrics: [
        { label: 'Top Region', value: 'APAC', trend: '+25.8%' },
        { label: 'Countries', value: '45', trend: '+3' },
        { label: 'Local Methods', value: '28', trend: '+5' }
      ],
      charts: ['region_volume', 'country_distribution', 'method_adoption'],
      exportFormats: ['csv', 'xlsx', 'pdf']
    }
  };

  const dateRanges = [
    { id: 'today', label: 'Today' },
    { id: 'last_7', label: 'Last 7 Days' },
    { id: 'last_30', label: 'Last 30 Days' },
    { id: 'last_90', label: 'Last 90 Days' },
    { id: 'ytd', label: 'Year to Date' },
    { id: 'custom', label: 'Custom Range' }
  ];

  const handleExport = (format) => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Exporting ${selectedReport} report in ${format} format`);
    }, 1500);
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="mt-2 text-sm text-gray-600">
            Generate and analyze detailed reports for your payment operations
          </p>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              {dateRanges.map(range => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          <Button
            variant="primary"
            icon={<Download size={16} />}
            onClick={() => handleExport('pdf')}
          >
            Export Report
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {Object.entries(reports).map(([id, report]) => (
          <Card
            key={id}
            className={`cursor-pointer transform transition duration-200 ${
              selectedReport === id ? 'ring-2 ring-indigo-500 scale-105' : 'hover:scale-105'
            }`}
            onClick={() => setSelectedReport(id)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  {id === 'transactions' && <BarChart2 className="h-6 w-6 text-indigo-600" />}
                  {id === 'settlements' && <DollarSign className="h-6 w-6 text-indigo-600" />}
                  {id === 'financials' && <TrendingUp className="h-6 w-6 text-indigo-600" />}
                  {id === 'regional' && <Globe className="h-6 w-6 text-indigo-600" />}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExport('pdf');
                  }}
                >
                  Export
                </Button>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{report.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Selected Report Detail */}
      {selectedReport && (
        <div className="mt-8">
          <Card>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {reports[selectedReport].title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {reports[selectedReport].description}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Filter size={14} />}
                  >
                    Filter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<RefreshCw size={14} />}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Calendar size={14} />}
                  >
                    Schedule
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {reports[selectedReport].metrics.map((metric, index) => (
                  <Card key={index}>
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-500">{metric.label}</h4>
                      <div className="mt-2 flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                        <p className={`ml-2 text-sm ${
                          metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.trend}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Export Options</h3>
                <div className="mt-4 flex space-x-3">
                  {reports[selectedReport].exportFormats.map(format => (
                    <Button
                      key={format}
                      variant="outline"
                      size="sm"
                      icon={<Download size={14} />}
                      onClick={() => handleExport(format)}
                      disabled={isLoading}
                    >
                      Export as {format.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
