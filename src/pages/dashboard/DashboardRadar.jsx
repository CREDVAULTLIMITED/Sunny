import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ChartCard, BarChart } from '../../components/analytics';

const DashboardRadar = () => {
  const [riskEvents] = useState([
    {
      id: 1,
      type: 'card_verification',
      risk_level: 'high',
      ip_address: '192.168.1.1',
      country: 'US',
      timestamp: '2025-06-08T10:30:00',
      status: 'blocked',
      details: 'Multiple failed attempts'
    },
    // Add more sample risk events
  ]);

  const [riskStats] = useState([
    { month: 'Jan', blocked: 120 },
    { month: 'Feb', blocked: 145 },
    { month: 'Mar', blocked: 132 },
    { month: 'Apr', blocked: 158 },
    { month: 'May', blocked: 142 },
    { month: 'Jun', blocked: 165 }
  ]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'type', headerName: 'Event Type', width: 150 },
    { 
      field: 'risk_level',
      headerName: 'Risk Level',
      width: 120,
      renderCell: (params) => (
        <div className={`risk-badge risk-${params.value}`}>
          {params.value.toUpperCase()}
        </div>
      )
    },
    { field: 'ip_address', headerName: 'IP Address', width: 130 },
    { field: 'country', headerName: 'Country', width: 100 },
    {
      field: 'timestamp',
      headerName: 'Time',
      width: 180,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString();
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
    { field: 'details', headerName: 'Details', width: 200 }
  ];

  return (
    <div className="dashboard-radar">
      <div className="welcome-banner">
        <div className="welcome-content">
          <h2>Welcome to Sunny Radar</h2>
          <p>Your intelligent fraud detection and prevention system. Let's get you started with protecting your payments.</p>
          <div className="welcome-actions">
            <button className="btn btn-primary">Quick Setup Guide</button>
            <button className="btn btn-outline">Watch Tutorial</button>
          </div>
        </div>
      </div>

      <div className="page-header">
        <div className="header-left">
          <h1>Fraud Detection (Radar)</h1>
        </div>
        <div className="header-right">
          <button className="btn btn-outline">Download Report</button>
          <button className="btn btn-primary">Configure Rules</button>
        </div>
      </div>

      <div className="radar-metrics">
        <div className="metric-card">
          <h3>Fraud Prevention Score</h3>
          <div className="radar-score">92</div>
          <div className="metric-change success">↑ 3 points this month</div>
        </div>
        <div className="metric-card">
          <h3>Blocked Attempts</h3>
          <div className="metric-value">165</div>
          <div className="metric-change">Last 30 days</div>
        </div>
        <div className="metric-card">
          <h3>High Risk Transactions</h3>
          <div className="metric-value">2.4%</div>
          <div className="metric-change success">↓ 0.8% this month</div>
        </div>
        <div className="metric-card">
          <h3>Average Response Time</h3>
          <div className="metric-value">124ms</div>
          <div className="metric-change success">↓ 15ms improvement</div>
        </div>
      </div>

      <div className="radar-charts">
        <ChartCard title="Blocked Attempts Over Time">
          <BarChart data={riskStats} />
        </ChartCard>
      </div>

      <div className="risk-rules-summary">
        <h2>Active Risk Rules</h2>
        <div className="rules-grid">
          <div className="rule-card">
            <div className="rule-header">
              <h3>Card Verification</h3>
              <div className="rule-status active">Active</div>
            </div>
            <p>Block after 3 failed attempts within 24h</p>
          </div>
          <div className="rule-card">
            <div className="rule-header">
              <h3>Suspicious IPs</h3>
              <div className="rule-status active">Active</div>
            </div>
            <p>Block known suspicious IP addresses</p>
          </div>
          <div className="rule-card">
            <div className="rule-header">
              <h3>Velocity Check</h3>
              <div className="rule-status active">Active</div>
            </div>
            <p>Monitor transaction frequency patterns</p>
          </div>
          <div className="rule-card">
            <div className="rule-header">
              <h3>Location Analysis</h3>
              <div className="rule-status active">Active</div>
            </div>
            <p>Track unusual location patterns</p>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h2>Recent Risk Events</h2>
        <div className="header-actions">
          <select className="filter-select">
            <option value="all">All Risk Levels</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
        </div>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={riskEvents}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default DashboardRadar;
