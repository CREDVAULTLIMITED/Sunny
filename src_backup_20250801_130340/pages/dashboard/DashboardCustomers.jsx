import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { customerService } from '../../services/customerService';
import '../../styles/pages/dashboard-components.css';

const DashboardCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        setLoading(true);
        const data = await customerService.getCustomers();
        setCustomers(data);
      } catch (err) {
        setError('Failed to load customers.');
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 220 },
    {
      field: 'created',
      headerName: 'Created',
      width: 130,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    },
    {
      field: 'totalSpent',
      headerName: 'Total Spent',
      width: 130,
      valueFormatter: (params) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(params.value);
      }
    },
    { field: 'status', headerName: 'Status', width: 130 }
  ];

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-customers">
      <div className="page-header">
        <h1>Customers</h1>
        <button className="btn btn-primary">Add Customer</button>
      </div>

      <div className="customer-metrics">
        <div className="metric-card">
          <h3>Total Customers</h3>
          <div className="metric-value">842</div>
          <div className="metric-change up">+12% this month</div>
        </div>
        <div className="metric-card">
          <h3>Active Customers</h3>
          <div className="metric-value">623</div>
          <div className="metric-change up">74% of total</div>
        </div>
        <div className="metric-card">
          <h3>Average Revenue/Customer</h3>
          <div className="metric-value">$148</div>
          <div className="metric-change up">+5% this month</div>
        </div>
      </div>

      <div className="filters">
        <input 
          type="text" 
          placeholder="Search customers..." 
          className="search-input"
        />
        <select className="filter-select">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="customers-table" style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={customers}
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

export default DashboardCustomers;
