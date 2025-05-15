import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './DashboardPage.css';
import MetricCard from './widgets/MetricCard';
import TransactionsTable from './transactions-table';
import PaymentMethodsChart from './charts/PaymentMethodsChart';
import TransactionVolumeChart from './charts/TransactionVolumeChart';
import CountryDistributionMap from './charts/CountryDistributionMap';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTransactions: 0,
    successRate: 0,
    totalVolume: 0,
    averageValue: 0,
    recentTransactions: [],
    paymentMethods: [],
    volumeByDay: [],
    countryDistribution: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('7d');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, this would be an API call
        // For now, we'll simulate the data
        const response = await fetch(`/api/stats?timeframe=${timeframe}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        
        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        
        // For demo purposes, set mock data
        setStats({
          totalTransactions: 1247,
          successRate: 98.2,
          totalVolume: 284750.50,
          averageValue: 228.35,
          recentTransactions: [
            { id: 'tx_123', amount: 125.00, currency: 'USD', status: 'success', date: new Date().toISOString(), customer: { name: 'John Doe' }, paymentMethod: 'card' },
            { id: 'tx_124', amount: 75.50, currency: 'USD', status: 'success', date: new Date().toISOString(), customer: { name: 'Jane Smith' }, paymentMethod: 'bank_transfer' },
            { id: 'tx_125', amount: 200.00, currency: 'USD', status: 'pending', date: new Date().toISOString(), customer: { name: 'Robert Johnson' }, paymentMethod: 'mobile_money' },
            { id: 'tx_126', amount: 50.00, currency: 'USD', status: 'failed', date: new Date().toISOString(), customer: { name: 'Sarah Williams' }, paymentMethod: 'crypto' },
            { id: 'tx_127', amount: 300.00, currency: 'USD', status: 'success', date: new Date().toISOString(), customer: { name: 'Michael Brown' }, paymentMethod: 'card' }
          ],
          paymentMethods: [
            { method: 'card', count: 523, volume: 120500.25 },
            { method: 'bank_transfer', count: 215, volume: 85750.00 },
            { method: 'mobile_money', count: 312, volume: 45250.75 },
            { method: 'crypto', count: 98, volume: 28500.50 },
            { method: 'apple_pay', count: 99, volume: 4750.00 }
          ],
          volumeByDay: [
            { date: '2023-06-01', volume: 12500.00 },
            { date: '2023-06-02', volume: 15750.25 },
            { date: '2023-06-03', volume: 9800.50 },
            { date: '2023-06-04', volume: 11250.75 },
            { date: '2023-06-05', volume: 14500.00 },
            { date: '2023-06-06', volume: 18250.25 },
            { date: '2023-06-07', volume: 16750.50 }
          ],
          countryDistribution: [
            { country: 'US', volume: 125000.00, count: 520 },
            { country: 'GB', volume: 45750.25, count: 215 },
            { country: 'CA', volume: 28500.50, count: 120 },
            { country: 'AU', volume: 18250.75, count: 85 },
            { country: 'DE', volume: 15500.00, count: 65 },
            { country: 'FR', volume: 12750.25, count: 55 },
            { country: 'JP', volume: 9800.50, count: 42 },
            { country: 'IN', volume: 7500.75, count: 35 },
            { country: 'BR', volume: 6250.00, count: 28 },
            { country: 'ZA', volume: 4750.25, count: 22 }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeframe]);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p className="welcome-message">Welcome back, {user?.firstName || 'User'}!</p>
        </div>
        <div className="dashboard-actions">
          <div className="timeframe-selector">
            <button 
              className={`timeframe-button ${timeframe === '24h' ? 'active' : ''}`}
              onClick={() => handleTimeframeChange('24h')}
            >
              24h
            </button>
            <button 
              className={`timeframe-button ${timeframe === '7d' ? 'active' : ''}`}
              onClick={() => handleTimeframeChange('7d')}
            >
              7d
            </button>
            <button 
              className={`timeframe-button ${timeframe === '30d' ? 'active' : ''}`}
              onClick={() => handleTimeframeChange('30d')}
            >
              30d
            </button>
            <button 
              className={`timeframe-button ${timeframe === '90d' ? 'active' : ''}`}
              onClick={() => handleTimeframeChange('90d')}
            >
              90d
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <div className="metrics-grid">
            <MetricCard 
              title="Total Transactions" 
              value={stats.totalTransactions.toLocaleString()} 
              icon="transactions"
              trend={+7.2}
            />
            <MetricCard 
              title="Success Rate" 
              value={`${stats.successRate}%`} 
              icon="success-rate"
              trend={+0.5}
            />
            <MetricCard 
              title="Total Volume" 
              value={`$${stats.totalVolume.toLocaleString()}`} 
              icon="volume"
              trend={+12.3}
            />
            <MetricCard 
              title="Average Value" 
              value={`$${stats.averageValue.toLocaleString()}`} 
              icon="average"
              trend={+4.8}
            />
          </div>

          <div className="charts-grid">
            <div className="chart-container transaction-volume">
              <h2>Transaction Volume</h2>
              <TransactionVolumeChart data={stats.volumeByDay} />
            </div>
            <div className="chart-container payment-methods">
              <h2>Payment Methods</h2>
              <PaymentMethodsChart data={stats.paymentMethods} />
            </div>
          </div>

          <div className="map-container">
            <h2>Global Distribution</h2>
            <CountryDistributionMap data={stats.countryDistribution} />
          </div>

          <div className="recent-transactions">
            <div className="section-header">
              <h2>Recent Transactions</h2>
              <a href="/transactions" className="view-all">View All</a>
            </div>
            <TransactionsTable transactions={stats.recentTransactions} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;