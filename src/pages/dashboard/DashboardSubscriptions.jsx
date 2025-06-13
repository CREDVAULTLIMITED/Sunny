import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { productService } from '../../services/productService'; // Replace with subscriptionService if available
import '../../styles/pages/dashboard-components.css';

const DashboardSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        setLoading(true);
        // Replace with real API call for subscriptions
        const data = await productService.getProducts({ type: 'subscription' });
        setSubscriptions(data);
      } catch (err) {
        setError('Failed to load subscriptions.');
      } finally {
        setLoading(false);
      }
    }
    fetchSubscriptions();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'customer', headerName: 'Customer', width: 200 },
    { field: 'plan', headerName: 'Plan', width: 160 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 130,
      valueFormatter: (params) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: params.row.currency
        }).format(params.value);
      }
    },
    {
      field: 'lastPayment',
      headerName: 'Last Payment',
      width: 130,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    },
    {
      field: 'nextPayment',
      headerName: 'Next Payment',
      width: 130,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    }
  ];

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-subscriptions">
      <div className="page-header">
        <div className="header-left">
          <h1>Subscriptions</h1>
        </div>
        <div className="header-right">
          <button className="btn btn-primary">Create Subscription</button>
        </div>
      </div>

      <div className="subscription-metrics">
        <div className="metric-card">
          <h3>Active Subscriptions</h3>
          <div className="metric-value">156</div>
          <div className="metric-change up">+12% this month</div>
        </div>
        <div className="metric-card">
          <h3>Monthly Recurring Revenue</h3>
          <div className="metric-value">$7,842</div>
          <div className="metric-change up">+8% this month</div>
        </div>
        <div className="metric-card">
          <h3>Churn Rate</h3>
          <div className="metric-value">2.1%</div>
          <div className="metric-change down">-0.5% this month</div>
        </div>
        <div className="metric-card">
          <h3>Avg. Subscription Value</h3>
          <div className="metric-value">$50.27</div>
          <div className="metric-change up">+3% this month</div>
        </div>
      </div>

      <div className="filters">
        <input 
          type="text" 
          placeholder="Search subscriptions..." 
          className="search-input"
        />
        <select className="filter-select">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="past_due">Past Due</option>
          <option value="canceled">Canceled</option>
          <option value="trialing">Trialing</option>
        </select>
        <select className="filter-select">
          <option value="all">All Plans</option>
          <option value="basic">Basic Plan</option>
          <option value="premium">Premium Plan</option>
          <option value="enterprise">Enterprise Plan</option>
        </select>
      </div>

      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={subscriptions}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default DashboardSubscriptions;
