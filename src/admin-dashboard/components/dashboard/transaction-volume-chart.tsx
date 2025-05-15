'use client';

import React from 'react';

interface TransactionVolumeChartProps {
  data: { date: string; amount: number }[] | undefined;
  isLoading: boolean;
}

export function TransactionVolumeChart({ data, isLoading }: TransactionVolumeChartProps) {
  if (isLoading) {
    return <div className="animate-pulse bg-gray-100 h-full rounded-md"></div>;
  }

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>;
  }

  // In a real app, you would use a charting library like Chart.js or Recharts
  // For this example, we'll just render a simple representation
  const maxAmount = Math.max(...data.map(item => item.amount));
  
  return (
    <div className="h-full flex items-end space-x-2">
      {data.map((item, index) => {
        const height = (item.amount / maxAmount) * 100;
        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-blue-500 rounded-t-sm" 
              style={{ height: `${height}%` }}
            ></div>
            <div className="text-xs mt-2 text-gray-500">
              {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
          </div>
        );
      })}
    </div>
  );
}