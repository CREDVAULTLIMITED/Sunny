import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  console.log("App component is rendering - initialization started");
  
  // Track app initialization state
  const [initializationComplete, setInitializationComplete] = useState(false);
  
  // Run initialization logic
  useEffect(() => {
    console.log("App initialization effect running");
    try {
      // Any initialization logic can go here
      
      // Mark initialization as complete
      setInitializationComplete(true);
      console.log("App initialization completed successfully");
    } catch (error) {
      console.error("Error during app initialization:", error);
    }
  }, []);
  
  // eslint-disable-next-line no-unused-vars
  const sdkConfig = {
    apiKey: process.env.REACT_APP_SUNNY_API_KEY || 'test_key_123456',
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
    region: 'global',
    defaultCurrency: 'USD',
    logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'error'
  };
  
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Initialization state:", initializationComplete ? "Complete" : "In progress");
  
  return (
    <ErrorBoundary>
      {/* SunnyProvider is required for components using useSunny hook */}
      <SunnyProvider config={sdkConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <Router>
              <ErrorBoundary>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  
                  {/* Dashboard routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <DashboardPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/payment-methods" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <PaymentMethodsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/identity-management" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <IdentityManagementPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  {/* Add more routes for other dashboard pages */}
                  <Route path="/dashboard/transactions" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <ModernTransactionsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/balances" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <BalancesPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/mobile-money" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <MobileMoneyPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/bank-transfers" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <BankTransfersPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/crypto" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <CryptoPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/cards" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <CardsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/customers" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <CustomersPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/global-markets" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <GlobalMarketsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/reports" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <ReportsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/settlements" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <SettlementsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/compliance" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <CompliancePage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/settings" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <SettingsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/gesture-facepay" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <GestureFacePayPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/offline-mode" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <OfflineModePage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/multi-id-search" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <MultiIdSearchPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/api-keys" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <ApiKeysPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/webhooks" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <WebhooksPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/api-explorer" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <ApiExplorerPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/sdk-integration" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <SdkIntegrationPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ErrorBoundary>
            </Router>
          </AuthProvider>
        </ErrorBoundary>
      </SunnyProvider>
    </ErrorBoundary>
  );
}

export default App;
