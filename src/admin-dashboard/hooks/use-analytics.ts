'use client';

import { useState, useEffect } from 'react';

interface SuccessRate {
  timestamp: string;
  rate: number;
  total: number;
  successful: number;
}

interface TransactionValue {
  timestamp: string;
  average: number;
  min: number;
  max: number;
}

interface ProcessingTime {
  timestamp: string;
  average: number;
  percentile95: number;
}

interface CurrencyExchange {
  currency: string;
  exchangeRate: number;
  volumeUSD: number;
  changePercent: number;
}

interface AnalyticsData {
  successRates: SuccessRate[];
  transactionValues: TransactionValue[];
  processingTimes: ProcessingTime[];
  currencyExchange: CurrencyExchange[];
}

interface UseAnalyticsProps {
  timeRange: string;
  refreshInterval?: number;
}

export function useAnalytics({ timeRange, refreshInterval = 30000 }: UseAnalyticsProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // In production, replace with actual API call
        // const response = await fetch(`/api/analytics?timeRange=${timeRange}`);
        // if (!response.ok) throw new Error('Failed to fetch analytics data');
        // const data = await response.json();

        // Mock data for demonstration
        const dataPoints = timeRange === '24h' ? 24 : 
                         timeRange === '7d' ? 7 : 
                         timeRange === '30d' ? 30 : 90;

        const now = new Date();
        const mockData: AnalyticsData = {
          successRates: Array.from({ length: dataPoints }, (_, i) => ({
            timestamp: new Date(now.getTime() - (dataPoints - 1 - i) * 24 * 60 * 60 * 1000).toISOString(),
            rate: 0.95 + Math.random() * 0.04,
            total: 1000 + Math.floor(Math.random() * 500),
            successful: 950 + Math.floor(Math.random() * 45)
          })),
          transactionValues: Array.from({ length: dataPoints }, (_, i) => ({
            timestamp: new Date(now.getTime() - (dataPoints - 1 - i) * 24 * 60 * 60 * 1000).toISOString(),
            average: 100 + Math.random() * 50,
            min: 10 + Math.random() * 20,
            max: 500 + Math.random() * 1000
          })),
          processingTimes: Array.from({ length: dataPoints }, (_, i) => ({
            timestamp: new Date(now.getTime() - (dataPoints - 1 - i) * 24 * 60 * 60 * 1000).toISOString(),
            average: 100 + Math.random() * 50,
            percentile95: 200 + Math.random() * 100
          })),
          currencyExchange: [
            { currency: 'USD', exchangeRate: 1.0, volumeUSD: 350000, changePercent: 0 },
            { currency: 'EUR', exchangeRate: 0.93, volumeUSD: 210000, changePercent: -1.2 },
            { currency: 'GBP', exchangeRate: 0.82, volumeUSD: 180000, changePercent: -0.8 },
            { currency: 'JPY', exchangeRate: 110.22, volumeUSD: 95000, changePercent: 2.1 },
            { currency: 'KES', exchangeRate: 105.5, volumeUSD: 75000, changePercent: 1.5 },
            { currency: 'NGN', exchangeRate: 410.5, volumeUSD: 65000, changePercent: -2.3 }
          ]
        };

        setData(mockData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch analytics data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Set up polling if refreshInterval is provided
    if (refreshInterval) {
      const intervalId = setInterval(fetchData, refreshInterval);
