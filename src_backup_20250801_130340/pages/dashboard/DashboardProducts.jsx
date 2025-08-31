import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { productService } from '../../services/productService';
import '../../styles/pages/dashboard-components.css';

const DashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'type', headerName: 'Type', width: 130 },
    {
      field: 'price',
      headerName: 'Price',
      width: 130,
      valueFormatter: (params) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: params.row.currency
        }).format(params.value);
      }
    },
    { field: 'interval', headerName: 'Billing Interval', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'created',
      headerName: 'Created',
      width: 130,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    }
  ];

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-products">
      <div className="page-header">
        <div className="header-left">
          <h1>Products</h1>
        </div>
        <div className="header-right">
          <button className="btn btn-primary">Add Product</button>
        </div>
      </div>

      <div className="product-metrics">
        <div className="metric-card">
          <h3>Total Products</h3>
          <div className="metric-value">24</div>
          <div className="metric-change up">+3 this month</div>
        </div>
        <div className="metric-card">
          <h3>Active Subscriptions</h3>
          <div className="metric-value">156</div>
          <div className="metric-change up">+12% this month</div>
        </div>
        <div className="metric-card">
          <h3>Revenue/Product (Avg)</h3>
          <div className="metric-value">$5,192</div>
          <div className="metric-change up">+8% this month</div>
        </div>
      </div>

      <div className="filters">
        <input 
          type="text" 
          placeholder="Search products..." 
          className="search-input"
        />
        <select className="filter-select">
          <option value="all">All Types</option>
          <option value="subscription">Subscription</option>
          <option value="one_time">One-time</option>
          <option value="usage">Usage-based</option>
        </select>
        <select className="filter-select">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="products-table" style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={products}
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

export default DashboardProducts;
