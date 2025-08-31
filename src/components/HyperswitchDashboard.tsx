/**
 * Hyperswitch Dashboard Component
 * 
 * Comprehensive dashboard for Sunny's payment operations
 * Displays real-time metrics, analytics, and system health
 */

import React, { useState, useCallback } from 'react';
import {
  useDashboard,
  useRealTimeMetrics,
  useHealthMonitor,
  usePayments,
  useConnectors
} from '../hooks/useHyperswitch';

interface HyperswitchDashboardProps {
  className?: string;
  timeRange?: '1h' | '24h' | '7d' | '30d';
  autoRefresh?: boolean;
  refreshInterval?: number;
}

const HyperswitchDashboard: React.FC<HyperswitchDashboardProps> = ({
  className = '',
  timeRange = '24h',
  autoRefresh = true,
  refreshInterval = 60000,
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'analytics' | 'connectors' | 'monitoring'>('overview');

  // Fetch dashboard data
  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
    lastUpdated: dashboardLastUpdated,
    refetch: refetchDashboard
  } = useDashboard(selectedTimeRange, autoRefresh, refreshInterval);

  // Fetch real-time metrics
  const {
    metrics: realTimeMetrics,
    loading: metricsLoading,
    error: metricsError,
    lastUpdated: metricsLastUpdated,
    refetch: refetchMetrics
  } = useRealTimeMetrics(30000);

  // Monitor system health
  const {
    isHealthy,
    loading: healthLoading,
    error: healthError,
    lastChecked,
    checkHealth
  } = useHealthMonitor(30000);

  // Fetch recent payments
  const {
    payments,
    loading: paymentsLoading,
    error: paymentsError,
    refresh: refreshPayments
  } = usePayments({}, autoRefresh, 30000);

  // Fetch connector information
  const {
    connectors,
    loading: connectorsLoading,
    error: connectorsError,
    refetch: refetchConnectors
  } = useConnectors();

  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    }).format(amount / 100); // Assuming amount is in cents
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className={`hyperswitch-dashboard ${className}`}>
      <div className="dashboard-header">
        <h1>Hyperswitch Payment Dashboard</h1>
        <div className="header-subtitle">Sunny Internal Operations</div>
        
        <div className="header-controls">
          <select 
            value={selectedTimeRange} 
            onChange={(e) => setSelectedTimeRange(e.target.value as any)}
            className="time-range-select"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          
          <button 
            onClick={() => {
              refetchDashboard();
              refetchMetrics();
              checkHealth();
            }}
            disabled={dashboardLoading || metricsLoading}
            className="refresh-button"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* System Health */}
      <div className={`health-status ${isHealthy ? 'healthy' : 'unhealthy'}`}>
        <span className={`status-indicator ${isHealthy ? 'green' : 'red'}`}>●</span>
        <span>System Status: {isHealthy ? 'Healthy' : 'Issues Detected'}</span>
        {lastChecked && <span className="last-checked">Last checked: {lastChecked.toLocaleTimeString()}</span>}
      </div>

      {/* Navigation Tabs */}
      <div className="tab-navigation">
        {(['overview', 'payments', 'analytics', 'connectors', 'monitoring'] as const).map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            {realTimeMetrics && (
              <div className="metrics-grid">
                <div className="metric-card">
                  <h3>Total Payments</h3>
                  <div className="metric-value">{formatNumber(realTimeMetrics.totalPayments)}</div>
                </div>
                <div className="metric-card">
                  <h3>Success Rate</h3>
                  <div className="metric-value">{formatPercentage(realTimeMetrics.successRate)}</div>
                </div>
                <div className="metric-card">
                  <h3>Total Amount</h3>
                  <div className="metric-value">{formatCurrency(realTimeMetrics.totalAmount)}</div>
                </div>
                <div className="metric-card">
                  <h3>Average Amount</h3>
                  <div className="metric-value">{formatCurrency(realTimeMetrics.averageAmount)}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="payments-content">
            <h3>Recent Payments</h3>
            {paymentsLoading ? (
              <div>Loading payments...</div>
            ) : paymentsError ? (
              <div className="error">Error: {paymentsError}</div>
            ) : (
              <div className="payments-list">
                {payments.slice(0, 10).map((payment) => (
                  <div key={payment.payment_id} className="payment-item">
                    <div>ID: {payment.payment_id}</div>
                    <div>Amount: {formatCurrency(payment.amount, payment.currency)}</div>
                    <div>Status: {payment.status}</div>
                    <div>Method: {payment.payment_method}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'connectors' && (
          <div className="connectors-content">
            <h3>Payment Connectors</h3>
            {connectorsLoading ? (
              <div>Loading connectors...</div>
            ) : connectorsError ? (
              <div className="error">Error: {connectorsError}</div>
            ) : (
              <div className="connectors-list">
                {connectors.map((connector) => (
                  <div key={connector.merchant_connector_id} className="connector-item">
                    <div><strong>{connector.connector_name}</strong></div>
                    <div>Status: {connector.status}</div>
                    <div>Type: {connector.connector_type}</div>
                    <div>Methods: {connector.payment_methods_enabled.join(', ')}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-content">
            <h3>Advanced Analytics</h3>
            {dashboardData && (
              <div className="analytics-sections">
                {dashboardData.costs && (
                  <div className="analytics-section">
                    <h4>Cost Analysis</h4>
                    <pre>{JSON.stringify(dashboardData.costs, null, 2)}</pre>
                  </div>
                )}
                {dashboardData.revenue && (
                  <div className="analytics-section">
                    <h4>Revenue Recovery</h4>
                    <pre>{JSON.stringify(dashboardData.revenue, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="monitoring-content">
            <h3>System Monitoring</h3>
            <div className="monitoring-info">
              <div>Health Status: {isHealthy ? 'Healthy' : 'Issues'}</div>
              <div>Last Dashboard Update: {dashboardLastUpdated?.toLocaleString()}</div>
              <div>Last Metrics Update: {metricsLastUpdated?.toLocaleString()}</div>
              <div>Last Health Check: {lastChecked?.toLocaleString()}</div>
            </div>
            
            {(dashboardError || metricsError || healthError || paymentsError || connectorsError) && (
              <div className="error-summary">
                <h4>System Errors</h4>
                {dashboardError && <div>Dashboard: {dashboardError}</div>}
                {metricsError && <div>Metrics: {metricsError}</div>}
                {healthError && <div>Health: {healthError}</div>}
                {paymentsError && <div>Payments: {paymentsError}</div>}
                {connectorsError && <div>Connectors: {connectorsError}</div>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HyperswitchDashboard;
