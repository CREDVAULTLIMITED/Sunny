import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/dashboard/layout/DashboardLayout';
import DashboardPage from './components/dashboard/DashboardPage';
import PaymentMethodsPage from './components/dashboard/pages/PaymentMethodsPage';
import IdentityManagementPage from './components/dashboard/pages/IdentityManagementPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import HomePage from './components/homepage/HomePage';
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

function App() {
  return (
    <AuthProvider>
      <Router>
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
          
          <Route path="/payment-methods" element={
            <ProtectedRoute>
              <DashboardLayout>
                <PaymentMethodsPage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/identity-management" element={
            <ProtectedRoute>
              <DashboardLayout>
                <IdentityManagementPage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* Add more routes for other dashboard pages */}
          <Route path="/transactions" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Transactions Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/balances" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Balances Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/mobile-money" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Mobile Money Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/bank-transfers" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Bank Transfers Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/crypto" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Crypto Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/cards" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Cards Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/customers" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Customers Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/global-markets" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Global Markets Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Reports Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/settlements" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Settlements Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/compliance" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Compliance Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Settings Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/gesture-facepay" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Gesture/FacePay Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/offline-mode" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Offline Mode Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/multi-id-search" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Multi-ID Search Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/api-keys" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>API Keys Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/webhooks" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>Webhooks Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/api-explorer" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>API Explorer Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/sdk-integration" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div>SDK Integration Page (Coming Soon)</div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;