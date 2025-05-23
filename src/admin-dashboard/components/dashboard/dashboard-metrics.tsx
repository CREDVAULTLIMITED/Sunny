'use client';

import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Doughnut } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, Clock, WifiOff, Wallet, CreditCard, Calendar } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PaymentMethodDistribution {
  method: string;
  amount: number;
  color: string;
}

interface DashboardMetricsProps {
  totalBalance: {
    amount: number;
    currency: string;
    change: number;
    period: string;
  };
  todayVolume: {
    amount: number;
    currency: string;
    change: number;
    period: string;
  };
  pendingPayouts: {
    amount: number;
    currency: string;
    count: number;
  };
  offlineTransactions: {
    count: number;
    status: string;
  };
  paymentMethods: PaymentMethodDistribution[];
  isLoading?: boolean;
}

const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

const formatPercentage = (value: number) => {
  return `${value >= 0 ? '+' : ''}${(value * 100).toFixed(1)}%`;
};

export function DashboardMetrics({
  totalBalance,
  todayVolume,
  pendingPayouts,
  offlineTransactions,
  paymentMethods,
  isLoading = false
}: DashboardMetricsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mt-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Prepare chart data for the donut chart
  const chartData = {
    labels: paymentMethods.map(pm => pm.method),
    datasets: [
      {
        data: paymentMethods.map(pm => pm.amount),
        backgroundColor: paymentMethods.map(pm => pm.color),
        borderColor: paymentMethods.map(pm => pm.color),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          boxWidth: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '70%',
  };

  // Metrics cards with specified data
  const metrics = [
    {
      title: 'Total Balance',
      value: formatCurrency(totalBalance.amount, totalBalance.currency),
      change: formatPercentage(totalBalance.change),
      changeType: totalBalance.change >= 0 ? 'positive' : 'negative',
      description: `from last ${totalBalance.period}`,
      icon: <Wallet className="w-5 h-5" />
    },
    {
      title: 'Today\'s Volume',
      value: formatCurrency(todayVolume.amount, todayVolume.currency),
      change: formatPercentage(todayVolume.change),
      changeType: todayVolume.change >= 0 ? 'positive' : 'negative',
      description: `from ${todayVolume.period}`,
      icon: <Calendar className="w-5 h-5" />
    },
    {
      title: 'Pending Payouts',
      value: formatCurrency(pendingPayouts.amount, pendingPayouts.currency),
      description: `Processing (${pendingPayouts.count} payouts)`,
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: 'Offline Transactions',
      value: offlineTransactions.count.toString(),
      description: `Status: ${offlineTransactions.status}`,
      icon: <WifiOff className="w-5 h-5" />
    }
  ];

  return (
    <div className="space-y-8">
      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-700">
                      {metric.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mt-4">{metric.value}</h3>
                <div className="mt-2 flex items-center">
                  {metric.change && (
                    <div className={`flex items-center ${
                      metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {metric.changeType === 'positive' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      <span className="text-sm font-medium">{metric.change}</span>
                    </div>
                  )}
                  <span className="text-sm text-gray-500 ml-1">{metric.description}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Method Distribution Chart */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-700">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Volume by Payment Method</h3>
            </div>
            <div className="h-64">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

