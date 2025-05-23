'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CurrencyExchangeChartProps {
  data: {
    currency: string;
    exchangeRate: number;
    volumeUSD: number;
    changePercent: number;
  }[];
}

export function CurrencyExchangeChart({ data }: CurrencyExchangeChartProps) {
  // Sort data by volume for better visualization
  const sortedData = [...data].sort((a, b) => b.volumeUSD - a.volumeUSD);
  const totalVolume = sortedData.reduce((sum, d) => sum + d.volumeUSD, 0);
  const positiveChanges = sortedData.filter(d => d.changePercent > 0).length;

  const chartData = {
    labels: sortedData.map(d => d.currency),
    datasets: [
      {
        label: 'Volume (USD)',
        data: sortedData.map(d => d.volumeUSD),
        backgroundColor: sortedData.map(d => 
          d.changePercent >= 0 ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)'
        ),
        borderColor: sortedData.map(d => 
          d.changePercent >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
        ),
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataPoint = sortedData[context.dataIndex];
            return [
              `Volume: $${dataPoint.volumeUSD.toLocaleString()}`,
              `Rate: ${dataPoint.exchangeRate.toFixed(4)}`,
              `Change: ${dataPoint.changePercent > 0 ? '+' : ''}${dataPoint.changePercent.toFixed(2)}%`,
              `Share: ${((dataPoint.volumeUSD / totalVolume) * 100).toFixed(1)}%`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => 
            `$${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <Bar data={chartData} options={options} height={300} />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h4 className="text-sm font-medium text-gray-500">Top Currency</h4>
          <div className="mt-2 flex items-center space-x-2">
            <span className="text-2xl font-bold">{sortedData[0].currency}</span>
            <span className={`px-2 py-1 rounded-full text-sm ${
              sortedData[0].changePercent >= 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {sortedData[0].changePercent > 0 ? '+' : ''}
              {sortedData[0].changePercent.toFixed(2)}%
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            ${sortedData[0].volumeUSD.toLocaleString()} volume
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h4 className="text-sm font-medium text-gray-500">Market Overview</h4>
          <p className="mt-2 text-2xl font-bold">
            ${totalVolume.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {positiveChanges} of {sortedData.length} currencies trending up
          </p>
        </div>
      </div>
    </div>
  );
}

