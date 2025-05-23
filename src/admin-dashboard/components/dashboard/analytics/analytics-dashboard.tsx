'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Select } from '../../ui/select';
import { SuccessRateChart } from './success-rate-chart';
import { TransactionValueChart } from './transaction-value-chart';
import { ProcessingTimeChart } from './processing-time-chart';
import { CurrencyExchangeChart } from './currency-exchange-chart';

interface AnalyticsDashboardProps {
  startDate: string;
  endDate: string;
  data: {
    successRates: {
      timestamp: string;
      rate: number;
      total: number;
      successful: number;
    }[];
    transactionValues: {
      timestamp: string;
      average: number;
      min: number;
      max: number;
    }[];
    processingTimes: {
      timestamp: string;
      average: number;
      percentile95: number;
    }[];
    currencyExchange: {
      currency: string;
      exchangeRate: number;
      volumeUSD: number;
      changePercent: number;
    }[];
  };
  onTimeRangeChange?: (range: string) => void;
  timeRange?: string;
}

export function AnalyticsDashboard({ 
  data, 
  onTimeRangeChange,
  timeRange = '7d'
}: AnalyticsDashboardProps) {
  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  // Calculate summary metrics
  const currentSuccessRate = data.successRates[data.successRates.length - 1];
  const currentProcessingTime = data.processingTimes[data.processingTimes.length - 1];
  const currentTransactionValue = data.transactionValues[data.transactionValues.length - 1];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        {onTimeRangeChange && (
          <Select
            value={timeRange}
            onValueChange={onTimeRangeChange}
            options={timeRangeOptions}
          />
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(currentSuccessRate.rate * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {currentSuccessRate.successful.toLocaleString()} of {currentSuccessRate.total.toLocaleString()} transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Processing Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentProcessingTime.average.toFixed(1)}ms</div>
            <p className="text-xs text-muted-foreground">
              95th percentile: {currentProcessingTime.percentile95.toFixed(1)}ms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Transaction Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentTransactionValue.average.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Range: ${currentTransactionValue.min.toFixed(2)} - ${currentTransactionValue.max.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(currentSuccessRate.total * currentTransactionValue.average).toLocaleString(undefined, {maximumFractionDigits: 0})}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentSuccessRate.total.toLocaleString()} transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
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
}
