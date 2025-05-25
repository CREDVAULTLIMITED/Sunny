import React, { Component, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
// SunnyProvider is required for useSunny hook to work
import { SunnyProvider } from './sdk/SunnyReactSDK';
import DashboardLayout from './components/dashboard/layout/DashboardLayout';
import DashboardPage from './components/dashboard/DashboardPage';
import PaymentMethodsPage from './components/dashboard/pages/PaymentMethodsPage';
import IdentityManagementPage from './components/dashboard/pages/IdentityManagementPage';
import ModernTransactionsPage from './components/dashboard/pages/ModernTransactionsPage';
import CryptoPage from './components/dashboard/pages/CryptoPage';
import CardsPage from './components/dashboard/pages/CardsPage';
import CustomersPage from './components/dashboard/pages/CustomersPage';
import GlobalMarketsPage from './components/dashboard/pages/GlobalMarketsPage';
import SettlementsPage from './components/dashboard/pages/SettlementsPage';
import CompliancePage from './components/dashboard/pages/CompliancePage';
import SettingsPage from './components/dashboard/pages/SettingsPage';
import GestureFacePayPage from './components/dashboard/pages/GestureFacePayPage';
import OfflineModePage from './components/dashboard/pages/OfflineModePage';
import MultiIdSearchPage from './components/dashboard/pages/MultiIdSearchPage';
import ApiKeysPage from './components/dashboard/pages/ApiKeysPage';
import WebhooksPage from './components/dashboard/pages/WebhooksPage';
import ApiExplorerPage from './components/dashboard/pages/ApiExplorerPage';
import SdkIntegrationPage from './components/dashboard/pages/SdkIntegrationPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import HomePage from './components/homepage/HomePage';
import ReportsPage from './components/dashboard/pages/ReportsPage';
import MobileMoneyPage from './components/dashboard/pages/MobileMoneyPage';
import BankTransfersPage from './components/dashboard/pages/BankTransfersPage';
import BalancesPage from './components/dashboard/pages/BalancesPage';

// Styles
import './index.css';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  // In a real app, this would check for authentication
  const isAuthenticated = localStorage.getItem('sunnyAuthToken');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Error boundary to catch rendering errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Error Boundary caught an error:", error, errorInfo);
    console.error("Error message:", error.message);
    console.error("Component stack:", errorInfo.componentStack);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          margin: '20px', 
          border: '1px solid red',
          borderRadius: '5px',
          backgroundColor: '#ffe6e6' 
        }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Error Details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Create router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { path: '', element: <DashboardPage /> },
      { path: 'payment-methods', element: <PaymentMethodsPage /> },
      { path: 'identity', element: <IdentityManagementPage /> },
      { path: 'transactions', element: <ModernTransactionsPage /> },
      { path: 'crypto', element: <CryptoPage /> },
      { path: 'cards', element: <CardsPage /> },
      { path: 'customers', element: <CustomersPage /> },
      { path: 'markets', element: <GlobalMarketsPage /> },
      { path: 'settlements', element: <SettlementsPage /> },
      { path: 'compliance', element: <CompliancePage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'gesture-face-pay', element: <GestureFacePayPage /> },
      { path: 'offline', element: <OfflineModePage /> },
      { path: 'multi-id-search', element: <MultiIdSearchPage /> },
      { path: 'api-keys', element: <ApiKeysPage /> },
      { path: 'webhooks', element: <WebhooksPage /> },
      { path: 'api-explorer', element: <ApiExplorerPage /> },
      { path: 'sdk-integration', element: <SdkIntegrationPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'mobile-money', element: <MobileMoneyPage /> },
      { path: 'bank-transfers', element: <BankTransfersPage /> },
      { path: 'balances', element: <BalancesPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

// App component
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SunnyProvider>
          <RouterProvider router={router} />
        </SunnyProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
