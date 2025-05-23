'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SuccessRateChartProps {
  data: {
    timestamp: string;
    rate: number;
    total: number;
    successful: number;
  }[];
}

export function SuccessRateChart({ data }: SuccessRateChartProps) {
  const chartData = {
    labels: data.map(d => new Date(d.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Success Rate',
        data: data.map(d => d.rate * 100),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataPoint = data[context.dataIndex];
            return [
              `Success Rate: ${context.raw.toFixed(1)}%`,
              `Total: ${dataPoint.total.toLocaleString()}`,
              `Successful: ${dataPoint.successful.toLocaleString()}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: number) => `${value}%`
        }
      }
    }
  };

  return <Line data={chartData} options={options} height={300} />;
}

