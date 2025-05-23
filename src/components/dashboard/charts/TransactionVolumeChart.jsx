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

const TransactionVolumeChart = () => {
  const { sdk } = useSunny();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('week'); // week, month, year

  const loadChartData = useCallback(async () => {
    try {
      setLoading(true);
      const chartData = await sdk.getTransactionVolume({ timeframe });
      setData(chartData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load chart data');
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
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
            className="text-sm text-indigo-600 hover:text-indigo-500"
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
        label: 'Transaction Volume',
        data: data.map(d => d.value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Volume: ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0
            }).format(context.raw)}`;
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
          callback: (value) => new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 1
          }).format(value)
        }
      }
    }
  };

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
                ? 'bg-indigo-100 text-indigo-700'
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

      {/* Total Volume */}
      <div className="mt-4 text-right">
        <p className="font-medium">
          Total: {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
          }).format(data.reduce((sum, item) => sum + item.value, 0))}
        </p>
      </div>
    </div>
  );
};

export default TransactionVolumeChart;
