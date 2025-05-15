'use client';

import { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  customerName: string;
  date: string;
}

interface UseTransactionsProps {
  startDate: string;
  endDate: string;
}

export function useTransactions({ startDate, endDate }: UseTransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockTransactions: Transaction[] = [
        {
          id: 'tx_123456',
          amount: 125.50,
          currency: 'USD',
          status: 'completed',
          paymentMethod: 'card',
          customerName: 'John Doe',
          date: '2023-05-10T14:30:00Z'
        },
        {
          id: 'tx_123457',
          amount: 75.20,
          currency: 'USD',
          status: 'completed',
          paymentMethod: 'bank_transfer',
          customerName: 'Jane Smith',
          date: '2023-05-09T10:15:00Z'
        },
        {
          id: 'tx_123458',
          amount: 200.00,
          currency: 'EUR',
          status: 'pending',
          paymentMethod: 'mobile_money',
          customerName: 'Alice Johnson',
          date: '2023-05-08T16:45:00Z'
        },
        {
          id: 'tx_123459',
          amount: 50.00,
          currency: 'GBP',
          status: 'failed',
          paymentMethod: 'card',
          customerName: 'Bob Brown',
          date: '2023-05-07T09:20:00Z'
        },
        {
          id: 'tx_123460',
          amount: 300.75,
          currency: 'USD',
          status: 'completed',
          paymentMethod: 'apple_pay',
          customerName: 'Charlie Wilson',
          date: '2023-05-06T13:10:00Z'
        }
      ];
      
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000);
  }, [startDate, endDate]);

  return { transactions, isLoading };
}