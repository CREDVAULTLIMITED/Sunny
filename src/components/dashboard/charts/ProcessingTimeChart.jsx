import React, { useCallback, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSunny } from '../../../sdk/SunnyReactSDK.js';
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

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProcessingTimeChart = () => {
  const { sdk } = useSunny();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('week'); // week, month, year

  const loadChartData = useCallback(async () => {
    try {
      setLoading(true);
      const chartData = await sdk.getProcessingTimeData({ timeframe });
      setData(chartData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load processing time data');
    } finally {
      setLoading(false);
    }
  }, [sdk, timeframe]);

  useEffect(() => {
    loadChartData();
  }, [loadChartData]);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <button
            onClick={loadChartData}
            className="text-sm text-purple-600 hover:text-purple-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Average Processing Time',
        data: data.map(d => d.avgTime),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: '95th Percentile',
        data: data.map(d => d.p95Time),
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        fill: false,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const ms = context.raw;
            return `${context.dataset.label}: ${ms < 1000 ? 
              `${ms.toFixed(0)}ms` : 
              `${(ms / 1000).toFixed(2)}s`}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => {
            return value < 1000 ? 
              `${value}ms` : 
              `${(value / 1000).toFixed(1)}s`;
          }
        }
      }
    }
  };

  // Calculate average processing time across the period
  const avgProcessingTime = data.reduce((sum, item) => sum + item.avgTime, 0) / data.length;

  return (
    <div>
      {/* Time Range Selector */}
      <div className="flex justify-end mb-4 space-x-2">
        {['week', 'month', 'year'].map((option) => (
          <button
            key={option}
            onClick={() => setTimeframe(option)}
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === option
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Average Processing Time */}
      <div className="mt-4 text-right">
        <p className="font-medium">
          Average Processing Time: {avgProcessingTime < 1000 ? 
            `${avgProcessingTime.toFixed(0)}ms` : 
            `${(avgProcessingTime / 1000).toFixed(2)}s`}
        </p>
      </div>
    </div>
  );
};

export default ProcessingTimeChart;
