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
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TransactionValueChartProps {
  data: {
    timestamp: string;
    average: number;
    min: number;
    max: number;
  }[];
}

export function TransactionValueChart({ data }: TransactionValueChartProps) {
  const chartData = {
    labels: data.map(d => new Date(d.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Average Value',
        data: data.map(d => d.average),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Min Value',
        data: data.map(d => d.min),
        borderColor: 'rgb(239, 68, 68)',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Max Value',
        data: data.map(d => d.max),
        borderColor: 'rgb(34, 197, 94)',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        tension: 0.4,
        fill: false
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
              `Average: $${dataPoint.average.toFixed(2)}`,
              `Min: $${dataPoint.min.toFixed(2)}`,
              `Max: $${dataPoint.max.toFixed(2)}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value}`
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return <Line data={chartData} options={options} height={300} />;
}
