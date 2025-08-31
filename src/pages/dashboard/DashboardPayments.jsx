import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { paymentService } from '../../services/paymentService';
import { analyticsService } from '../../services/analyticsService';
import { OverviewTrendsChart } from '../../components/dashboard/Charts';
import '../../styles/pages/dashboard-components.css';

const DashboardPayments = () => {
  const [payments, setPayments] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('all');
  const [timeframeFilter, setTimeframeFilter] = useState('30');
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [paymentsData, metricsData] = await Promise.all([
          paymentService.getPayments({
            query: searchQuery,
            status: statusFilter,
            paymentType: paymentTypeFilter,
            timeframe: timeframeFilter
          }),
          analyticsService.getPaymentMetrics()
        ]);
        
        setPayments(paymentsData);
        setMetrics(metricsData);
      } catch (err) {
        setError('Failed to load payments data.');
        console.error('Payments loading error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchQuery, statusFilter, paymentTypeFilter, timeframeFilter]);

  const columns = [
    { 
      field: 'id', 
      headerName: 'Payment ID', 
      width: 180,
      renderCell: (params) => (
        <div className="payment-id">
          <span className="id-prefix">py_</span>
          {params.value}
        </div>
      )
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 130,
      renderCell: (params) => (
        <div className="payment-amount">
          <span className="currency">{params.row.currency}</span>
          {params.value.toFixed(2)}
        </div>
      )
    },
    { 
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <div className={`status-badge status-${params.value}`}>
          {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
        </div>
      )
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      width: 180,
      renderCell: (params) => {
        const methodIcons = {
          card: '💳',
          bank_transfer: '🏦',
          crypto: '₿',
          wallet: '👝'
        };
        
        return (
          <div className="payment-method">
            <span className="payment-icon">{methodIcons[params.row.methodType] || '💰'}</span>
            {params.value}
          </div>
        );
      }
    },
    {
      field: 'customerName',
      headerName: 'Customer',
      width: 200,
      renderCell: (params) => (
        <div className="customer-info">
          <div className="customer-name">{params.value}</div>
          <div className="customer-email">{params.row.customerEmail}</div>
        </div>
      )
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 180,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString();
      }
    },
    {
      field: 'riskScore',
      headerName: 'Risk Score',
      width: 120,
      renderCell: (params) => (
        <div className={`risk-score risk-${getRiskLevel(params.value)}`}>
          {params.value}
        </div>
      )
    }
  ];

  const getRiskLevel = (score) => {
    if (score < 20) return 'low';
    if (score < 50) return 'medium';
    return 'high';
  };

  if (loading) return (
    <div className="dashboard-loading">
      <div className="loader"></div>
      <p>Loading payments data...</p>
    </div>
  );
  
  if (error) return (
    <div className="dashboard-error">
      <div className="error-icon">⚠️</div>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  return (
    <div className="dashboard-payments">
      <div className="page-header">
        <div className="header-content">
          <h1>Payments</h1>
          <div className="header-metrics">
            <div className="metric">
              <span className="metric-label">Today's Volume</span>
              <span className="metric-value">${metrics?.todayVolume?.toLocaleString() || '0'}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Success Rate</span>
              <span className="metric-value">{metrics?.successRate?.toFixed(1) || '0'}%</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => paymentService.exportPayments(payments)}>
            Export
          </button>
          <button className="btn btn-primary" onClick={() => window.location.href = '/dashboard/accept-payments'}>
            New Payment
          </button>
        </div>
      </div>

      <div className="payment-filters">
        <div className="filter-group">
          <input 
            type="text" 
            placeholder="Search payments..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="succeeded">Succeeded</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <select 
            className="filter-select"
            value={paymentTypeFilter}
            onChange={(e) => setPaymentTypeFilter(e.target.value)}
          >
            <option value="all">All Payment Types</option>
            <option value="card">Card Payments</option>
            <option value="bank_transfer">Bank Transfers</option>
            <option value="crypto">Cryptocurrency</option>
            <option value="wallet">Digital Wallets</option>
          </select>
          <select 
            className="filter-select"
            value={timeframeFilter}
            onChange={(e) => setTimeframeFilter(e.target.value)}
          >
            <option value="30">Last 30 days</option>
            <option value="7">Last 7 days</option>
            <option value="24">Last 24 hours</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>

      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={payments}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          className="payments-table"
          loading={loading}
          components={{
            NoRowsOverlay: () => (
              <div className="no-data">
                <p>No payments found matching your criteria</p>
              </div>
            )
          }}
        />
      </div>
      
      {metrics?.revenueData && (
        <div className="payments-charts">
          <div className="chart-container">
            <h3>Revenue Trends</h3>
            <OverviewTrendsChart data={metrics.revenueData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPayments;
