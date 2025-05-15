'use client';

import { useState, useEffect } from 'react';

interface Stats {
  totalVolume: number;
  successRate: number;
  averageValue: number;
  transactionCount: number;
  dailyVolume: { date: string; amount: number }[];
  byPaymentMethod: { method: string; count: number; amount: number }[];
  byCountry: { country: string; count: number; amount: number }[];
}

interface UseStatsProps {
  startDate: string;
  endDate: string;
}

export function useStats({ startDate, endDate }: UseStatsProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockStats: Stats = {
        totalVolume: 12500.75,
        successRate: 0.95,
        averageValue: 125.50,
        transactionCount: 100,
        dailyVolume: [
          { date: '2023-05-01', amount: 1200 },
          { date: '2023-05-02', amount: 1500 },
          { date: '2023-05-03', amount: 1100 },
          { date: '2023-05-04', amount: 1800 },
          { date: '2023-05-05', amount: 1300 },
          { date: '2023-05-06', amount: 900 },
          { date: '2023-05-07', amount: 1600 }
        ],
        byPaymentMethod: [
          { method: 'card', count: 60, amount: 7500 },
          { method: 'bank_transfer', count: 15, amount: 3000 },
          { method: 'mobile_money', count: 10, amount: 1000 },
          { method: 'apple_pay', count: 10, amount: 800 },
          { method: 'google_pay', count: 5, amount: 200 }
        ],
        byCountry: [
          { country: 'US', count: 40, amount: 5000 },
          { country: 'UK', count: 20, amount: 2500 },
          { country: 'DE', count: 15, amount: 2000 },
          { country: 'FR', count: 10, amount: 1500 },
          { country: 'CA', count: 8, amount: 1000 },
          { country: 'AU', count: 7, amount: 500 }
        ]
      };
      
      setStats(mockStats);
      setIsLoading(false);
    }, 1000);
  }, [startDate, endDate]);

  return { stats, isLoading };
}