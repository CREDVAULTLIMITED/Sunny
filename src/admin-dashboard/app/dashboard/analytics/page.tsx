'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Select } from '../../../components/ui/select';
import { SuccessRateChart } from '../../../components/dashboard/analytics/success-rate-chart';
import { TransactionValueChart } from '../../../components/dashboard/analytics/transaction-value-chart';
import { ProcessingTimeChart } from '../../../components/dashboard/analytics/processing-time-chart';
import { CurrencyExchangeChart } from '../../../components/dashboard/analytics/currency-exchange-chart';
import { DashboardShell } from '../../../components/dashboard/dashboard-shell';
import { DashboardHeader } from '../../../components/dashboard/dashboard-header';
import { useAnalytics } from '../../../hooks/use-analytics';

const timeRangeOptions = [
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' }
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = React.useState('7d');
  const { data, isLoading, error } = useAnalytics({ timeRange });

  const renderError = () => {
    if (!error) return null;
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-red-600">
            <p className="text-lg font-medium">Error loading analytics data</p>
            <p className="text-sm mt-2">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSkeleton = () => (
    <div className="space-y-6">
      {/* Summary Stats Skeleton */}
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={`stat-${i}`}>
            <CardContent className="pt-6">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts Skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={`chart-${i}`}>
            <CardHeader>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDashboard = () => {
    if (!data) return null;
    
    const latestStats = {
      successRate: data.successRates[data.successRates.length - 1],
      processingTime: data.processingTimes[data.processingTimes.length - 1],
      transactionValue: data.transactionValues[data.transactionValues.length - 1]
    };

    return (
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {(latestStats.successRate.rate * 100).toFixed(1)}%
              </div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-xs text-gray-400 mt-1">
                {latestStats.successRate.successful.toLocaleString()} of {latestStats.successRate.total.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {latestStats.processingTime.average.toFixed(1)}ms
              </div>
              <p className="text-sm text-gray-500">Avg Processing Time</p>
              <p className="text-xs text-gray-400 mt-1">
                95th: {latestStats.processingTime.percentile95.toFixed(1)}ms
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                ${latestStats.transactionValue.average.toFixed(2)}
              </div>
              <p className="text-sm text-gray-500">Avg Transaction Value</p>
              <p className="text-xs text-gray-400 mt-1">
                Range: ${latestStats.transactionValue.min.toFixed(2)} - ${latestStats.transactionValue.max.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {latestStats.successRate.total.toLocaleString()}
              </div>
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="text-xs text-gray-400 mt-1">
                Volume: ${(latestStats.successRate.total * latestStats.transactionValue.average).toLocaleString(undefined, {maximumFractionDigits: 0})}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Success Rate Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <SuccessRateChart data={data.successRates} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Transaction Values</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionValueChart data={data.transactionValues} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processing Time Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ProcessingTimeChart data={data.processingTimes} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Currency Exchange Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <CurrencyExchangeChart data={data.currencyExchange} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics Dashboard"
        text="Monitor your payment processing metrics and trends."
      >
        <Select
          value={timeRange}
          onValueChange={setTimeRange}
          options={timeRangeOptions}
        />
      </DashboardHeader>
      
      {error ? renderError() : isLoading ? renderSkeleton() : renderDashboard()}
    </DashboardShell>
  );
}
