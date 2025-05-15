'use client';

import React from 'react';

interface PaymentMethodsChartProps {
  data: { method: string; count: number; amount: number }[] | undefined;
  isLoading: boolean;
}

export function PaymentMethodsChart({ data, isLoading }: PaymentMethodsChartProps) {
  if (isLoading) {
    return <div className="animate-pulse bg-gray-100 h-full rounded-md"></div>;
  }

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>;
  }

  // In a real app, you would use a charting library like Chart.js or Recharts
  // For this example, we'll just render a simple representation
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-red-500',
  ];
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <div className="flex h-4 mb-4">
          {data.map((item, index) => {
            const width = (item.amount / totalAmount) * 100;
            return (
              <div 
                key={index} 
                className={`${colors[index % colors.length]}`}
                style={{ width: `${width}%` }}
              ></div>
            );
          })}
        </div>
        
        <div className="space-y-4">
          {data.map((item, index) => {
            const percentage = ((item.amount / totalAmount) * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]} mr-2`}></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{item.method}</span>
                    <span className="text-sm text-gray-500">{percentage}%</span>
                  </div>
                  <div className="text-xs text-gray-500">{item.count} transactions</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}