import React, { useEffect, useState } from 'react';
import { analyticsService } from '../../services/analyticsService';
import { OverviewTrendsChart, TransactionVolumeChart, PaymentMethodsChart } from '../../components/dashboard/Charts';
import '../../styles/pages/dashboard-components.css';

const DashboardOverview = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        setLoading(true);
        const [dashboardData, volumeData, methodsData] = await Promise.all([
          analyticsService.getDashboardMetrics(),
          analyticsService.getTransactionVolume(),
          analyticsService.getPaymentMethodDistribution()
        ]);
        
        setMetrics({
          ...dashboardData,
          volumeData,
          methodsData
        });
      } catch (err) {
        setError('Failed to load dashboard metrics.');
        console.error('Dashboard loading error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

  if (loading) return (
    <div className="dashboard-loading">
      <div className="loader"></div>
      <p>Loading dashboard data...</p>
    </div>
  );
  
  if (error) return (
    <div className="dashboard-error">
      <div className="error-icon">⚠️</div>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
  
  if (!metrics) return null;

  return (
    <div className="dashboard-overview">
      <div className="page-header">
        <div className="header-left">
          <h1>Dashboard Overview</h1>
          <span className="dashboard-date">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="header-right">
          <select className="timeframe-select" defaultValue="30d">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="overview-metrics">
        <div className="metric-card">
          <h3>Total Revenue</h3>
          <div className="metric-value">${metrics.revenue?.toLocaleString()}</div>
          <div className={`metric-change ${metrics.revenueChange >= 0 ? 'positive' : 'negative'}`}>
            {metrics.revenueChange > 0 ? '↑' : '↓'} {Math.abs(metrics.revenueChange)}%
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Successful Payments</h3>
          <div className="metric-value">{metrics.successfulPayments?.toLocaleString()}</div>
          <div className="metric-subtitle">{metrics.successRate}% success rate</div>
        </div>
        
        <div className="metric-card">
          <h3>Active Customers</h3>
          <div className="metric-value">{metrics.activeCustomers?.toLocaleString()}</div>
          <div className={`metric-change ${metrics.customerGrowth >= 0 ? 'positive' : 'negative'}`}>
            {metrics.customerGrowth > 0 ? '↑' : '↓'} {Math.abs(metrics.customerGrowth)}%
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Average Transaction</h3>
          <div className="metric-value">${metrics.avgTransaction?.toFixed(2)}</div>
          <div className="metric-subtitle">per payment</div>
        </div>
      </div>

      <div className="overview-charts">
        <div className="chart-grid">
          <div className="chart-container">
            <OverviewTrendsChart data={metrics.trends} />
          </div>
          <div className="chart-container">
            <TransactionVolumeChart data={metrics.volumeData} />
          </div>
          <div className="chart-container">
            <PaymentMethodsChart data={metrics.methodsData} />
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {metrics.recentActivity?.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">{activity.type === 'payment' ? '💰' : '👤'}</div>
              <div className="activity-details">
                <div className="activity-title">{activity.description}</div>
                <div className="activity-time">{new Date(activity.timestamp).toLocaleString()}</div>
              </div>
              <div className="activity-amount">${activity.amount?.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
