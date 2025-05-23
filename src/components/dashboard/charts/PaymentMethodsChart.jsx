import React from 'react';
import './Charts.css';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const PaymentMethodsChart = ({ data }) => {
  if (!data || !data.length) {
    return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>;
  }

  // Colors for different payment methods
  const methodColors = {
    card: '#0070f3',
    bank_transfer: '#10b981',
    mobile_money: '#f59e0b',
    crypto: '#8b5cf6',
    apple_pay: '#000000',
    google_pay: '#4285F4',
    default: '#64748b'
  };

  // Format payment method name for display
  const formatMethodName = (method) => {
    return method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const totalVolume = data.reduce((sum, item) => sum + item.volume, 0);

  const chartData = {
    labels: data.map(item => formatMethodName(item.method)),
    datasets: [
      {
        data: data.map(item => item.volume),
        backgroundColor: data.map(item => methodColors[item.method] || methodColors.default),
        borderColor: data.map(item => methodColors[item.method] || methodColors.default),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
          boxWidth: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const percentage = ((value / totalVolume) * 100).toFixed(1);
            return `${context.label}: ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0
            }).format(value)} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '70%',
  };

  return (
    <div className="chart-wrapper">
      <div className="chart-container" style={{ height: '300px' }}>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <div className="chart-legend">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color" 
              style={{ backgroundColor: methodColors[item.method] || methodColors.default }}
            ></div>
            <div className="legend-label">{formatMethodName(item.method)}</div>
            <div className="legend-value">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
              }).format(item.volume)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodsChart;