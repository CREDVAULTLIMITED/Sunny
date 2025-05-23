import React, { useState, useEffect, useCallback } from 'react';
import { useSunny } from '../../sdk/SunnyReactSDK.js';
import DashboardLayout from '../dashboard/layout/DashboardLayout';
import './EnterpriseDashboard.css';

// Import chart components
import PaymentMethodsChart from '../dashboard/charts/PaymentMethodsChart.jsx';
import CountryDistributionMap from '../dashboard/charts/CountryDistributionMap.jsx';
import TransactionVolumeChart from '../dashboard/charts/TransactionVolumeChart.jsx';

const EnterpriseDashboard = () => {
  const { sdk } = useSunny();
  
  // Dashboard state
  const [analyticsData, setAnalyticsData] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const [bulkPayments, setBulkPayments] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [realtimeTransactions, setRealtimeTransactions] = useState([]);
  const [reportingData, setReportingData] = useState(null);
  
  // UI state
  const [loading, setLoading] = useState({
    analytics: true,
    team: true,
    bulkPayments: true,
    workflows: true,
    transactions: true,
    reporting: true
  });
  const [error, setError] = useState({
    analytics: null,
    team: null,
    bulkPayments: null,
    workflows: null,
    transactions: null,
    reporting: null
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    end: new Date()
  });
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [bulkUploadFile, setBulkUploadFile] = useState(null);
  const [workflowEditorOpen, setWorkflowEditorOpen] = useState(false);
  const [currentWorkflow, setCurrentWorkflow] = useState(null);
  
  // Fetch analytics data
  const fetchAnalyticsData = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, analytics: true }));
      setError(prev => ({ ...prev, analytics: null }));
      
      // Fetch enterprise analytics data from SDK
      const data = await sdk.getEnterpriseAnalytics({
        startDate: dateRange.start,
        endDate: dateRange.end,
        detailLevel: 'comprehensive'
      });
      
      setAnalyticsData(data);
      setLoading(prev => ({ ...prev, analytics: false }));
    } catch (err) {
      console.error("Failed to load enterprise analytics:", err);
      setError(prev => ({ ...prev, analytics: err.message || 'Failed to load analytics data' }));
      setLoading(prev => ({ ...prev, analytics: false }));
    }
  }, [sdk, dateRange]);
  
  // Fetch team data
  const fetchTeamData = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, team: true }));
      setError(prev => ({ ...prev, team: null }));
      
      // Fetch team members and permissions
      const team = await sdk.getTeamMembers();
      setTeamData(team);
      setLoading(prev => ({ ...prev, team: false }));
    } catch (err) {
      console.error("Failed to load team data:", err);
      setError(prev => ({ ...prev, team: err.message || 'Failed to load team data' }));
      setLoading(prev => ({ ...prev, team: false }));
    }
  }, [sdk]);
  
  // Fetch bulk payment data
  const fetchBulkPayments = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, bulkPayments: true }));
      setError(prev => ({ ...prev, bulkPayments: null }));
      
      // Fetch bulk payment history
      const bulkPayments = await sdk.getBulkPayments({
        startDate: dateRange.start,
        endDate: dateRange.end,
        status: 'all'
      });
      
      setBulkPayments(bulkPayments);
      setLoading(prev => ({ ...prev, bulkPayments: false }));
    } catch (err) {
      console.error("Failed to load bulk payment data:", err);
      setError(prev => ({ ...prev, bulkPayments: err.message || 'Failed to load bulk payment data' }));
      setLoading(prev => ({ ...prev, bulkPayments: false }));
    }
  }, [sdk, dateRange]);
  
  // Fetch workflow data
  const fetchWorkflows = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, workflows: true }));
      setError(prev => ({ ...prev, workflows: null }));
      
      // Fetch custom payment workflows
      const workflows = await sdk.getPaymentWorkflows();
      setWorkflows(workflows);
      setLoading(prev => ({ ...prev, workflows: false }));
    } catch (err) {
      console.error("Failed to load workflow data:", err);
      setError(prev => ({ ...prev, workflows: err.message || 'Failed to load workflow data' }));
      setLoading(prev => ({ ...prev, workflows: false }));
    }
  }, [sdk]);
  
  // Setup real-time transaction monitoring
  useEffect(() => {
    let subscription;
    
    const setupRealTimeMonitoring = async () => {
      try {
        setLoading(prev => ({ ...prev, transactions: true }));
        setError(prev => ({ ...prev, transactions: null }));
        
        // Get initial transactions
        const initialTransactions = await sdk.getRecentTransactions({ limit: 10 });
        setRealtimeTransactions(initialTransactions);
        
        // Subscribe to real-time updates
        subscription = sdk.subscribeToTransactions({
          onData: (transaction) => {
            setRealtimeTransactions(prev => {
              const updatedTransactions = [transaction, ...prev].slice(0, 10);
              return updatedTransactions;
            });
          },
          onError: (err) => {
            console.error("Real-time transaction error:", err);
            setError(prev => ({ ...prev, transactions: err.message || 'Real-time transaction feed error' }));
          }
        });
        
        setLoading(prev => ({ ...prev, transactions: false }));
      } catch (err) {
        console.error("Failed to setup transaction monitoring:", err);
        setError(prev => ({ ...prev, transactions: err.message || 'Failed to load transaction data' }));
        setLoading(prev => ({ ...prev, transactions: false }));
      }
    };
    
    setupRealTimeMonitoring();
    
    // Cleanup subscription
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [sdk]);
  
  // Fetch reporting data
  const fetchReportingData = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, reporting: true }));
      setError(prev => ({ ...prev, reporting: null }));
      
      // Fetch advanced reporting data
      const reportingData = await sdk.getAdvancedReporting({
        startDate: dateRange.start,
        endDate: dateRange.end,
        metrics: ['volume', 'revenue', 'transactions', 'users'],
        dimensions: ['time', 'country', 'paymentMethod', 'channel'],
        filters: {
          // Add any filters here
        }
      });
      
      setReportingData(reportingData);
      setLoading(prev => ({ ...prev, reporting: false }));
    } catch (err) {
      console.error("Failed to load reporting data:", err);
      setError(prev => ({ ...prev, reporting: err.message || 'Failed to load reporting data' }));
      setLoading(prev => ({ ...prev, reporting: false }));
    }
  }, [sdk, dateRange]);
  
  // Initial data load
  useEffect(() => {
    fetchAnalyticsData();
    fetchTeamData();
    fetchBulkPayments();
    fetchWorkflows();
    fetchReportingData();
  }, [fetchAnalyticsData, fetchTeamData, fetchBulkPayments, fetchWorkflows, fetchReportingData]);
  
  // Date range change handler
  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
  };
  
  // Bulk upload handler
  const handleBulkUpload = async (event) => {
    event.preventDefault();
    if (!bulkUploadFile) return;
    
    try {
      setLoading(prev => ({ ...prev, bulkPayments: true }));
      
      // Process bulk payment file
      const result = await sdk.processBulkPayments(bulkUploadFile);
      
      // Update bulk payments list
      fetchBulkPayments();
      
      // Show success message
      alert(`Bulk payment job created. Job ID: ${result.jobId}`);
      setBulkUploadFile(null);
    } catch (err) {
      console.error("Bulk payment upload failed:", err);
      setError(prev => ({ ...prev, bulkPayments: err.message || 'Bulk payment upload failed' }));
      setLoading(prev => ({ ...prev, bulkPayments: false }));
    }
  };
  
  // Team member role update handler
  const handleUpdateRole = async (memberId, newRole) => {
    try {
      await sdk.updateTeamMemberRole(memberId, newRole);
      fetchTeamData(); // Refresh team data
    } catch (err) {
      console.error("Failed to update team member role:", err);
      alert(`Failed to update role: ${err.message}`);
    }
  };
  
  // Create or update workflow handler
  const handleSaveWorkflow = async (workflow) => {
    try {
      if (workflow.id) {
        await sdk.updatePaymentWorkflow(workflow);
      } else {
        await sdk.createPaymentWorkflow(workflow);
      }
      
      fetchWorkflows(); // Refresh workflows
      setWorkflowEditorOpen(false);
      setCurrentWorkflow(null);
    } catch (err) {
      console.error("Failed to save workflow:", err);
      alert(`Failed to save workflow: ${err.message}`);
    }
  };
  
  // Edit workflow handler
  const handleEditWorkflow = (workflow) => {
    setCurrentWorkflow(workflow);
    setWorkflowEditorOpen(true);
  };
  
  // New workflow handler
  const handleNewWorkflow = () => {
    setCurrentWorkflow({
      name: '',
      steps: [],
      isActive: false,
      triggers: []
    });
    setWorkflowEditorOpen(true);
  };
  
  // Render loading spinner
  const renderLoading = () => (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading data...</p>
    </div>
  );
  
  // Render error message
  const renderError = (message, retryFunction) => (
    <div className="error-container">
      <svg xmlns="http://www.w3.org/2000/svg" className="error-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      <p className="error-message">{message}</p>
      {retryFunction && (
        <button className="retry-button" onClick={retryFunction}>
          Retry
        </button>
      )}
    </div>
  );
  
  // Render analytics section
  const renderAnalytics = () => {
    if (loading.analytics) return renderLoading();
    if (error.analytics) return renderError(error.analytics, fetchAnalyticsData);
    
    const paymentMethodsData = analyticsData?.paymentMethods || [];
    const countryDistributionData = analyticsData?.countryDistribution || [];
    const volumeData = analyticsData?.volumeOverTime || [];
    
    return (
      <div className="analytics-section">
        <div className="metrics-row">
          {analyticsData?.topMetrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-header">
                <h3 className="metric-title">{metric.label}</h3>
                <span className={`metric-trend ${metric.trend > 0 ? 'positive' : metric.trend < 0 ? 'negative' : ''}`}>
                  {metric.trend > 0 ? '↑' : metric.trend < 0 ? '↓' : ''}
                  {Math.abs(metric.trend).toFixed(1)}%
                </span>
              </div>
              <div className="metric-value">{metric.value}</div>
              <div className="metric-subtitle">{metric.subtitle}</div>
            </div>
          ))}
        </div>
        
        <div className="charts-row">
          <div className="chart-container">
            <h3 className="chart-title">Volume by Payment Method</h3>
            <PaymentMethodsChart data={paymentMethodsData} />
          </div>
          <div className="chart-container">
            <h3 className="chart-title">Global Transaction Distribution</h3>
            <CountryDistributionMap data={countryDistributionData} />
          </div>
        </div>
        
        <div className="full-width-chart">
          <h3 className="chart-title">Transaction Volume Over Time</h3>
          <TransactionVolumeChart data={volumeData} />
        </div>
        
        <div className="metrics-table">
          <h3 className="section-title">Key Performance Indicators</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Current Period</th>
                <th>Previous Period</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData?.kpis.map((kpi, index) => (
                <tr key={index}>
                  <td>{kpi.name}</td>
                  <td>{kpi.current}</td>
                  <td>{kpi.previous}</td>
                  <td className={kpi.change > 0 ? 'positive' : kpi.change < 0 ? 'negative' : ''}>
                    {kpi.change > 0 ? '+' : ''}{kpi.change

