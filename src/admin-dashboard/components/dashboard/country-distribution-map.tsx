'use client';

import React from 'react';

interface CountryDistributionMapProps {
  data: { country: string; count: number; amount: number }[] | undefined;
  isLoading: boolean;
}

export function CountryDistributionMap({ data, isLoading }: CountryDistributionMapProps) {
  if (isLoading) {
    return <div className="animate-pulse bg-gray-100 h-full rounded-md"></div>;
  }

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>;
  }

  // In a real app, you would use a mapping library like react-simple-maps
  // For this example, we'll just render a table of countries
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <div className="h-full overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => {
            const percentage = ((item.amount / totalAmount) * 100).toFixed(1);
            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.country}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.count}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{percentage}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}