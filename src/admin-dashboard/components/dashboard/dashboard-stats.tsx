'use client';

import React from 'react';
import { Card, CardContent } from '../ui/card';

interface StatsProps {
  stats: any;
  isLoading: boolean;
}

export function DashboardStats({ stats, isLoading }: StatsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="h-24 animate-pulse bg-gray-100">
            <CardContent className="p-6">{/* Loading placeholder */}</CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statItems = [
    {
      title: 'Total Volume',
      value: stats?.totalVolume ? `$${stats.totalVolume.toLocaleString()}` : '$0',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      title: 'Success Rate',
      value: stats?.successRate ? `${(stats.successRate * 100).toFixed(1)}%` : '0%',
      change: '+0.8%',
      changeType: 'positive'
    },
    {
      title: 'Average Value',
      value: stats?.averageValue ? `$${stats.averageValue.toLocaleString()}` : '$0',
      change: '-2.3%',
      changeType: 'negative'
    },
    {
      title: 'Transaction Count',
      value: stats?.transactionCount ? stats.transactionCount.toLocaleString() : '0',
      change: '+5.2%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {statItems.map((stat, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <span className={`text-sm ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}