'use client';

import { useState, useEffect, useCallback } from 'react';

// Utility function to calculate percentage change
function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 1 : 0;
  return (current - previous) / previous;
}

interface DailyVolumeData {
  date: string;
  amount: number;
  success_count: number;
  failed_count: number;
}

interface PaymentMethodData {
  method: string;
  count: number;
  amount: number;
  success_rate: number;
  average_processing_time: number;
}

interface CountryData {
  country: string;
  count: number;
  amount: number;
  success_rate: number;
  popular_payment_methods: string[];
}

interface RealtimeMetrics {
  active_transactions: number;
  processing_speed: number; // ms
  error_rate: number;
  system_health: 'healthy' | 'degraded' | 'down';
  last_updated: string;
}

interface RiskMetrics {
  fraud_attempts: number;
  suspicious_transactions: number;
  high_risk_countries: string[];
  average_risk_score: number;
}

interface TrendMetrics {
  totalVolume: number;      // percentage change
  successRate: number;      // percentage change
  averageValue: number;     // percentage change
  transactionCount: number; // percentage change
}

interface Stats {
  // Current metrics
  totalVolume: number;
  successRate: number;
  averageValue: number;
  transactionCount: number;
  
  // Main dashboard metrics
  dashboardMetrics: DashboardMetricsData;
  
  // Trend metrics (compared to previous period)
  trends: TrendMetrics;
  
  // Time-series data
  dailyVolume: DailyVolumeData[];
  
  // Payment method analytics
  byPaymentMethod: PaymentMethodData[];
  
  // Geographical analytics
  byCountry: CountryData[];
  
  // Real-time metrics
  realtimeMetrics: RealtimeMetrics;
  
  // Risk metrics
  riskMetrics: RiskMetrics;
}

interface UseStatsProps {
  startDate: string;
  endDate: string;
  refreshInterval?: number;  // for real-time updates in milliseconds
  previousPeriodStartDate?: string;
  previousPeriodEndDate?: string;
}

export interface DashboardMetricsData {
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
  paymentMethods: {
    method: string;
    amount: number;
    color: string;
  }[];
}

export function useStats({ 
  startDate, 
  endDate, 
  refreshInterval = 30000,
  previousPeriodStartDate,
  previousPeriodEndDate 
}: UseStatsProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [previousStats, setPreviousStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [websocketStatus, setWebsocketStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');

  // Calculate previous period dates if not provided
  const calculatePreviousPeriodDates = useCallback(() => {
    if (previousPeriodStartDate && previousPeriodEndDate) {
      return { previousPeriodStartDate, previousPeriodEndDate };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationMs = end.getTime() - start.getTime();
    
    const previousEnd = new Date(start);
    previousEnd.setDate(previousEnd.getDate() - 1);
    
    const previousStart = new Date(previousEnd);
    previousStart.setTime(previousStart.getTime() - durationMs);
    
    return {
      previousPeriodStartDate: previousStart.toISOString().split('T')[0],
      previousPeriodEndDate: previousEnd.toISOString().split('T')[0]
    };
  }, [startDate, endDate, previousPeriodStartDate, previousPeriodEndDate]);

  // Fetch current period stats
  const fetchCurrentStats = useCallback(async () => {
    try {
      // In production, replace with real API call
      // const response = await fetch('/api/stats', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ startDate, endDate }),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error(`Failed to fetch stats: ${response.statusText}`);
      // }
      // 
      // const data = await response.json();
      // return data;

      // Simulate API call for demo
      return new Promise<Stats>((resolve) => {
        setTimeout(() => {
          // Enhanced mock data that includes all required fields
          // Add dashboard metrics mock data
          const mockDashboardMetrics: DashboardMetricsData = {
            totalBalance: {
              amount: 128420.50,
              currency: 'USD',
              change: 0.125, // +12.5%
              period: 'month'
            },
            todayVolume: {
              amount: 2642.25,
              currency: 'USD',
              change: 0.122, // +12.2%
              period: 'yesterday'
            },
            pendingPayouts: {
              amount: 12350.00,
              currency: 'USD',
              count: 3
            },
            offlineTransactions: {
              count: 24,
              status: 'Waiting for sync'
            },
            paymentMethods: [
              { method: 'Cards', amount: 75000, color: 'rgb(59, 130, 246)' }, // Blue
              { method: 'M-Pesa', amount: 45000, color: 'rgb(34, 197, 94)' }, // Green
              { method: 'Crypto', amount: 30000, color: 'rgb(234, 179, 8)' }  // Yellow
            ]
          };

          const mockStats: Stats = {
            totalVolume: 12500.75,
            successRate: 0.95,
            averageValue: 125.50,
            transactionCount: 100,
            dashboardMetrics: mockDashboardMetrics, // Add the dashboard metrics
            trends: {
              totalVolume: 0.12,      // +12%
              successRate: 0.03,       // +3%
              averageValue: -0.05,     // -5%
              transactionCount: 0.08   // +8%
            },
            dailyVolume: [
              { date: '2023-05-01', amount: 1200, success_count: 57, failed_count: 3 },
              { date: '2023-05-02', amount: 1500, success_count: 65, failed_count: 5 },
              { date: '2023-05-03', amount: 1100, success_count: 50, failed_count: 2 },
              { date: '2023-05-04', amount: 1800, success_count: 75, failed_count: 7 },
              { date: '2023-05-05', amount: 1300, success_count: 60, failed_count: 4 },
              { date: '2023-05-06', amount: 900, success_count: 45, failed_count: 3 },
              { date: '2023-05-07', amount: 1600, success_count: 68, failed_count: 6 }
            ],
            byPaymentMethod: [
              { method: 'card', count: 60, amount: 7500, success_rate: 0.97, average_processing_time: 1.2 },
              { method: 'bank_transfer', count: 15, amount: 3000, success_rate: 0.93, average_processing_time: 3.5 },
              { method: 'mobile_money', count: 10, amount: 1000, success_rate: 0.9, average_processing_time: 1.8 },
              { method: 'apple_pay', count: 10, amount: 800, success_rate: 0.99, average_processing_time: 0.9 },
              { method: 'google_pay', count: 5, amount: 200, success_rate: 0.98, average_processing_time: 1.0 }
            ],
            byCountry: [
              { country: 'US', count: 40, amount: 5000, success_rate: 0.96, popular_payment_methods: ['card', 'apple_pay'] },
              { country: 'UK', count: 20, amount: 2500, success_rate: 0.94, popular_payment_methods: ['card', 'bank_transfer'] },
              { country: 'DE', count: 15, amount: 2000, success_rate: 0.95, popular_payment_methods: ['bank_transfer', 'card'] },
              { country: 'FR', count: 10, amount: 1500, success_rate: 0.92, popular_payment_methods: ['card', 'apple_pay'] },
