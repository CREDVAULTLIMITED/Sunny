'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface RealTimeMetricsProps {
  realtimeMetrics: {
    active_transactions: number;
    processing_speed: number;
    error_rate: number;
    system_health: 'healthy' | 'degraded' | 'down';
    last_updated: string;
  };
  isLoading?: boolean;
}

export function RealTimeMetrics({ realtimeMetrics, isLoading = false }: RealTimeMetricsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const healthConfig = {
    healthy: {
      color: 'bg-green-500',
      textColor: 'text-green-500',
      icon: <CheckCircle className="h-4 w-4 mr-1" />,
      badgeColor: 'bg-green-100 text-green-800'
    },
    degraded: {
      color: 'bg-yellow-500',
      textColor: 'text-yellow-500',
      icon: <AlertTriangle className="h-4 w-4 mr-1" />,
      badgeColor: 'bg-yellow-100 text-yellow-800'
    },
    down: {
      color: 'bg-red-500',
      textColor: 'text-red-500',
      icon: <AlertTriangle className="h-4 w-4 mr-1" />,
      badgeColor: 'bg-red-100 text-red-800'
    }
  };

  const health = healthConfig[realtimeMetrics.system_health];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-muted-foreground" />
          <CardTitle>Real-Time Metrics</CardTitle>
        </div>
        <Badge className={health.badgeColor}>
          <div className="flex items-center">
            {health.icon}
            <span className="capitalize">{realtimeMetrics.system_health}</span>
          </div>
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-4">
          Last updated: {new Date(realtimeMetrics.last_updated).toLocaleTimeString()}
        </p>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Active Transactions</span>
            <span className="font-semibold">{realtimeMetrics.active_transactions}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Processing Speed</span>
            <span className="font-semibold">{realtimeMetrics.processing_speed}ms</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Error Rate</span>
            <span className="font-semibold">{(realtimeMetrics.error_rate * 100).toFixed(2)}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1 rounded-full mt-2">
            <div 
              className="bg-blue-500 h-1 rounded-full" 
              style={{ width: `${Math.min(realtimeMetrics.active_transactions / 10, 100)}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

