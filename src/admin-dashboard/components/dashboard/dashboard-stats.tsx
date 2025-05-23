'use client';

import React from 'react';
import { Card, CardContent } from '../ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface StatsProps {
  stats: {
    totalVolume: number;
    successRate: number;
    averageValue: number;
    transactionCount: number;
    trends: {
      totalVolume: number;
      successRate: number;
      averageValue: number;
      transactionCount: number;
    };
    realtimeMetrics: {
      active_transactions: number;
      processing_speed: number;
      error_rate: number;
      system_health: 'healthy' | 'degraded' | 'down';
    };
  };
  isLoading: boolean;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatPercentage = (value: number) => {
  return `${(value * 100).toFixed(1)}%`;
};

export function DashboardStats({ stats, isLoading }: StatsProps) {
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

  const statItems = [
    {
      title: 'Total Volume',
      value: formatCurrency(stats.totalVolume),
      change: formatPercentage(stats.trends.totalVolume),
      changeType: stats.trends.totalVolume >= 0 ? 'positive' : 'negative',
      metric: stats.realtimeMetrics.active_transactions > 0 ? 
        `${stats.realtimeMetrics.active_transactions} active transactions` : null
    },
    {
      title: 'Success Rate',
      value: formatPercentage(stats.successRate),
      change: formatPercentage(stats.trends.successRate),
      changeType: stats.trends.successRate >= 0 ? 'positive' : 'negative',
      metric: `${formatPercentage(1 - stats.realtimeMetrics.error_rate)} current success rate`
    },
    {
      title: 'Average Value',
      value: formatCurrency(stats.averageValue),
      change: formatPercentage(stats.trends.averageValue),
      changeType: stats.trends.averageValue >= 0 ? 'positive' : 'negative',
      metric: `${stats.realtimeMetrics.processing_speed}ms avg. processing time`
    },
    {
      title: 'Transaction Count',
      value: stats.transactionCount.toLocaleString(),
      change: formatPercentage(stats.trends.transactionCount),
      changeType: stats.trends.transactionCount >= 0 ? 'positive' : 'negative',
      metric: `System health: ${stats.realtimeMetrics.system_health}`
    }
  ];

  return (
    <TooltipProvider>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {statItems.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={`flex items-center ${
                        stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {stat.changeType === 'positive' ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        <span>{stat.change}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Compared to previous period</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                {stat.metric && (
                  <div className="mt-4 text-sm text-gray-500">
                    {stat.metric}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  );
}
