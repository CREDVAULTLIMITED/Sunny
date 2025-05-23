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

const SuccessRateChart = () => {
  const { sdk } = useSunny();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('week'); // week, month, year

  const loadChartData = useCallback(async () => {
    try {
      setLoading(true);
      const chartData = await sdk.getSuccessRateData({ timeframe });
      setData(chartData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load success rate data');
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
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
            className="text-sm text-green-600 hover:text-green-500"
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
        label: 'Success Rate',
        data: data.map(d => d.successRate),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
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
            return `Success Rate: ${context.raw.toFixed(1)}%`;
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
        beginAtZero: false,
        min: Math.min(90, Math.floor(Math.min(...data.map(d => d.successRate)) - 2)),
        max: 100,
        ticks: {
          callback: (value) => `${value}%`
        }
      }
    }
  };

  // Calculate overall success rate
  const overallSuccessRate = (data.reduce((sum, item) => sum + item.successRate, 0) / data.length).toFixed(1);

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
                ? 'bg-green-100 text-green-700'
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

      {/* Overall Success Rate */}
      <div className="mt-4 text-right">
        <p className="font-medium">
          Overall Success Rate: {overallSuccessRate}%
        </p>
      </div>
    </div>
  );
};

export default SuccessRateChart;
