import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { paymentService } from '../../services/paymentService';
import '../../styles/pages/dashboard-components.css';

const DashboardPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPayments() {
      try {
        setLoading(true);
        const data = await paymentService.getPayments();
        setPayments(data);
      } catch (err) {
        setError('Failed to load payments.');
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  const columns = [
    { 
      field: 'id', 
      headerName: 'Payment ID', 
      width: 180,
      renderCell: (params) => (
        <div className="payment-id">
          <span className="id-prefix">bp_</span>
          {params.value.substring(3)}
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
      renderCell: (params) => (
        <div className="payment-method">
          <span className="payment-icon direct-bank"></span>
          {params.row.bankName} ****{params.row.accountLast4}
        </div>
      )
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
        <div className={`risk-score ${getRiskLevel(params.value)}`}>
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

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-payments">
      <div className="page-header">
        <div className="header-content">
          <h1>Payments</h1>
          <div className="header-metrics">
            <div className="metric">
              <span className="metric-label">Today's Volume</span>
              <span className="metric-value">$12,458.90</span>
            </div>
            <div className="metric">
              <span className="metric-label">Success Rate</span>
              <span className="metric-value">98.7%</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">Export</button>
          <button className="btn btn-primary">New Payment</button>
        </div>
      </div>

      <div className="payment-filters">
        <div className="filter-group">
          <input 
            type="text" 
            placeholder="Search payments..." 
            className="search-input"
          />
          <select className="filter-select">
            <option value="all">All Statuses</option>
            <option value="succeeded">Succeeded</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <select className="filter-select">
            <option value="direct_bank">Bank Payments</option>
            <option value="all">All Payment Types</option>
          </select>
          <select className="filter-select">
            <option value="30">Last 30 days</option>
            <option value="7">Last 7 days</option>
            <option value="24">Last 24 hours</option>
            <option value="custom">Custom Range</option>
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
        />
      </div>
      <div className="payments-charts">
        {/* Example: Insert revenue chart here */}
        <div className="chart-placeholder">[Revenue chart goes here]</div>
      </div>
    </div>
  );
};

export default DashboardPayments;
