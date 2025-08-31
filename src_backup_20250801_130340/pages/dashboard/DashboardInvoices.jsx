import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { paymentService } from '../../services/paymentService'; // Replace with invoiceService if available

const DashboardInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        setLoading(true);
        // Replace with real API call for invoices
        const data = await paymentService.getPayments({ type: 'invoice' });
        setInvoices(data);
      } catch (err) {
        setError('Failed to load invoices.');
      } finally {
        setLoading(false);
      }
    }
    fetchInvoices();
  }, []);

  const columns = [
    { field: 'id', headerName: 'Invoice #', width: 130 },
    { field: 'customer', headerName: 'Customer', width: 200 },
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
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <div className={`status-badge status-${params.value}`}>
          {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
        </div>
      )
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 130,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    },
    {
      field: 'issuedDate',
      headerName: 'Issued Date',
      width: 130,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    }
  ];

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-invoices">
      <div className="page-header">
        <div className="header-left">
          <h1>Invoices</h1>
        </div>
        <div className="header-right">
          <button className="btn btn-outline">Import</button>
          <button className="btn btn-primary">Create Invoice</button>
        </div>
      </div>

      <div className="invoice-metrics">
        <div className="metric-card">
          <h3>Total Outstanding</h3>
          <div className="metric-value">$24,512.00</div>
          <div className="metric-change">12 invoices</div>
        </div>
        <div className="metric-card">
          <h3>Overdue</h3>
          <div className="metric-value">$3,840.00</div>
          <div className="metric-change danger">3 invoices</div>
        </div>
        <div className="metric-card">
          <h3>Paid Last 30 Days</h3>
          <div className="metric-value">$47,290.00</div>
          <div className="metric-change success">28 invoices</div>
        </div>
        <div className="metric-card">
          <h3>Average Time to Pay</h3>
          <div className="metric-value">8.2 days</div>
          <div className="metric-change success">-1.5 days</div>
        </div>
      </div>

      <div className="filters">
        <input 
          type="text" 
          placeholder="Search invoices..." 
          className="search-input"
        />
        <select className="filter-select">
          <option value="all">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select className="filter-select">
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last 365 days</option>
          <option value="custom">Custom range</option>
        </select>
      </div>

      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={invoices}
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

export default DashboardInvoices;
