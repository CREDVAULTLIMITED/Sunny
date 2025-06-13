import React, { useEffect, useState } from 'react';
import { analyticsService } from '../../services/analyticsService';
import '../../styles/pages/dashboard-components.css';

const DashboardOverview = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        setLoading(true);
        const data = await analyticsService.getDashboardMetrics();
        setMetrics(data);
      } catch (err) {
        setError('Failed to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;
  if (!metrics) return null;

  return (
    <div className="dashboard-overview">
      <div className="page-header">
        <h1>Sunny Dashboard</h1>
        <span className="dashboard-date">{new Date().toLocaleDateString()}</span>
      </div>
      <div className="overview-metrics">
        <div className="metric-card">
          <h3>Total Revenue</h3>
          <div className="metric-value">${metrics.revenue?.toLocaleString()}</div>
        </div>
        <div className="metric-card">
          <h3>API Calls</h3>
          <div className="metric-value">{metrics.apiCalls?.toLocaleString()}</div>
        </div>
        <div className="metric-card">
          <h3>Active Customers</h3>
          <div className="metric-value">{metrics.activeCustomers?.toLocaleString()}</div>
        </div>
      </div>
      <div className="overview-charts">
        {/* Example: Insert chart components here, e.g. <OverviewTrendsChart data={metrics.trends} /> */}
        <div className="chart-placeholder">[Trend charts go here]</div>
      </div>
      <div className="overview-activity">
        <h2>Recent Activity</h2>
        <ul>
          {metrics.recentActivity?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="overview-quicklinks">
        <h2>Quick Actions</h2>
        <div className="quicklinks-list">
          <a href="/dashboard/payments" className="btn btn-primary">View Payments</a>
          <a href="/dashboard/customers" className="btn btn-outline">Manage Customers</a>
          <a href="/dashboard/developers" className="btn btn-outline">API Docs</a>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
