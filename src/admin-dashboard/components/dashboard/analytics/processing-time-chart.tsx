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

interface ProcessingTimeChartProps {
  data: {
    timestamp: string;
    average: number;
    percentile95: number;
  }[];
}

export function ProcessingTimeChart({ data }: ProcessingTimeChartProps) {
  const chartData = {
    labels: data.map(d => new Date(d.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Average',
        data: data.map(d => d.average),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4
      },
      {
        label: '95th Percentile',
        data: data.map(d => d.percentile95),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
        tension: 0.4,
        borderDash: [5, 5]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.raw.toFixed(1)}ms`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value}ms`
        }
      }
    }
  };

  return <Line data={chartData} options={options} height={300} />;
}

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

interface ProcessingTimeChartProps {
  data: {
    timestamp: string;
    average: number;
    percentile95: number;
  }[];
}

export function ProcessingTimeChart({ data }: ProcessingTimeChartProps) {
  const chartData = {
    labels: data.map(d => new Date(d.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Average Processing Time',
        data: data.map(d => d.average),
        borderColor: 'rgb(124, 58, 237)', // purple
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: '95th Percentile',
        data: data.map(d => d.percentile95),
        borderColor: 'rgb(220, 38, 38)', // red
        backgroundColor: 'rgba(220, 38, 38, 0.05)',
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
            const datasetLabel = context.dataset.label;
            
            if (datasetLabel === 'Average Processing Time') {
              return [
                `Average: ${dataPoint.average.toFixed(2)}ms`,
                `95th Percentile: ${dataPoint.percentile95.toFixed(2)}ms`
              ];
            }
            
            return `${datasetLabel}: ${context.raw.toFixed(2)}ms`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value}ms`
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

