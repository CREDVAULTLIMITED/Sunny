import React, { useState } from 'react';
import './AnalyticsPage.css';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { BarChart2, TrendingUp, Globe, AlertCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const AnalyticsPage = () => {
  const [timeframe, setTimeframe] = useState('30d');

  const volumeData = [
    { date: '2025-05-01', value: 125000 },
    { date: '2025-05-02', value: 132000 },
    // Add more data points...
  ];

  const methodDistribution = [
    { name: 'Card Payments', value: 45 },
    { name: 'Mobile Money', value: 30 },
    { name: 'Bank Transfer', value: 15 },
    { name: 'Crypto', value: 10 }
  ];

  const colors = ['#0070f3', '#00c6ff', '#10b981', '#7c3aed'];

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p className="subtitle">Track your payment performance and insights</p>
        </div>
        
        <div className="timeframe-selector">
          <Button 
            variant={timeframe === '7d' ? 'primary' : 'outline'}
            onClick={() => setTimeframe('7d')}
          >
            7 Days
          </Button>
          <Button 
            variant={timeframe === '30d' ? 'primary' : 'outline'}
            onClick={() => setTimeframe('30d')}
          >
            30 Days
          </Button>
          <Button 
            variant={timeframe === '90d' ? 'primary' : 'outline'}
            onClick={() => setTimeframe('90d')}
          >
            90 Days
          </Button>
          <Button 
            variant={timeframe === '1y' ? 'primary' : 'outline'}
            onClick={() => setTimeframe('1y')}
          >
            1 Year
          </Button>
        </div>
      </div>

      <div className="analytics-grid">
        <Card className="chart-card volume-chart">
          <h3>
            <BarChart2 size={20} />
            Payment Volume
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={volumeData}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0070f3" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0070f3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#0070f3" 
                fill="url(#volumeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="chart-card distribution-chart">
          <h3>
            <TrendingUp size={20} />
            Payment Methods
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={methodDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {methodDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="chart-card geographic-chart">
          <h3>
            <Globe size={20} />
            Geographic Distribution
          </h3>
          <div className="country-bars">
            {[
              { country: 'United States', value: 35 },
              { country: 'United Kingdom', value: 25 },
              { country: 'Germany', value: 20 },
              { country: 'Japan', value: 15 },
              { country: 'Others', value: 5 }
            ].map(item => (
              <div key={item.country} className="country-bar">
                <span className="country-name">{item.country}</span>
                <div className="bar-container">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${item.value}%` }}
                  />
                </div>
                <span className="country-value">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="chart-card fraud-chart">
          <h3>
            <AlertCircle size={20} />
            Fraud Analysis
          </h3>
          <div className="fraud-stats">
            <div className="fraud-stat">
              <div className="stat-header">
                <span className="stat-title">Fraud Rate</span>
                <span className="stat-trend success">-0.3%</span>
              </div>
              <div className="stat-value">0.08%</div>
              <div className="stat-chart">
                <ResponsiveContainer width="100%" height={50}>
                  <LineChart data={[
                    { value: 0.12 },
                    { value: 0.10 },
                    { value: 0.09 },
                    { value: 0.08 }
                  ]}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="fraud-stat">
              <div className="stat-header">
                <span className="stat-title">Blocked Attempts</span>
                <span className="stat-trend">+158</span>
              </div>
              <div className="stat-value">1,247</div>
              <div className="stat-chart">
                <ResponsiveContainer width="100%" height={50}>
                  <LineChart data={[
                    { value: 980 },
                    { value: 1050 },
                    { value: 1150 },
                    { value: 1247 }
                  ]}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0070f3" 
                      strokeWidth={2} 
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
