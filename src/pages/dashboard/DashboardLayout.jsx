import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import {
  PaymentsIcon,
  BillingIcon,
  FinanceIcon,
  SecurityIcon,
  CodeIcon,
  DocsIcon,
  BlogIcon,
  SupportIcon
} from '../../components/icons/MenuIcons';
import '../../styles/pages/dashboard.css';
import '../../styles/pages/dashboard-components.css';

const DashboardLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Double-check authentication status
    if (!isAuthenticated || !user) {
      console.error('Dashboard accessed without proper authentication');
      logout();
      navigate('/login', { 
        state: { error: 'Please login to access your dashboard' },
        replace: true 
      });
      return;
    }

    // Check user session periodically
    const checkSession = setInterval(async () => {
      try {
        // Use AuthContext's decryptData to get the real token
        const encryptedToken = sessionStorage.getItem('sunnyAuthToken');
        let token = encryptedToken;
        if (encryptedToken && typeof encryptedToken === 'string' && encryptedToken.length > 0) {
          try {
            // Try to decrypt if possible (async)
            token = await (window.decryptData ? window.decryptData(encryptedToken) : encryptedToken);
          } catch (e) {
            // fallback: use as is
          }
        }
        const isValid = await authService.verifyToken(token);
        if (!isValid) {
          logout();
          navigate('/login', { 
            state: { error: 'Session expired. Please login again.' },
            replace: true 
          });
        }
      } catch (err) {
        console.error('Session check failed:', err);
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(checkSession);
  }, [isAuthenticated, user, logout, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-group">
            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active' : ''} aria-label="Home">
              <FinanceIcon />
              <span>Home</span>
            </NavLink>
          </div>
          <div className="nav-group">
            <h3>Accept payments</h3>
            <NavLink to="/dashboard/payments" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Payments">
              <PaymentsIcon />
              <span>Payments</span>
            </NavLink>
            <NavLink to="/dashboard/customers" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Customers">
              <DocsIcon />
              <span>Customers</span>
            </NavLink>
            <NavLink to="/dashboard/balance" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Balance">
              <BillingIcon />
              <span>Balance</span>
            </NavLink>
            <NavLink to="/dashboard/payouts" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Payouts">
              <FinanceIcon />
              <span>Payouts</span>
            </NavLink>
          </div>
          <div className="nav-group">
            <h3>Generate revenue</h3>
            <NavLink to="/dashboard/products" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Products">
              <PaymentsIcon />
              <span>Products</span>
            </NavLink>
            <NavLink to="/dashboard/subscriptions" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Subscriptions">
              <BillingIcon />
              <span>Subscriptions</span>
            </NavLink>
            <NavLink to="/dashboard/invoices" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Invoices">
              <DocsIcon />
              <span>Invoices</span>
            </NavLink>
            <NavLink to="/dashboard/orders" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Orders">
              <FinanceIcon />
              <span>Orders</span>
            </NavLink>
          </div>
          <div className="nav-group">
            <h3>Business operations</h3>
            <NavLink to="/dashboard/radar" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Fraud & Risk">
              <SecurityIcon />
              <span>Fraud & Risk</span>
            </NavLink>
            <NavLink to="/dashboard/connect" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Connect">
              <CodeIcon />
              <span>Connect</span>
            </NavLink>
            <NavLink to="/dashboard/reports" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Reports">
              <BlogIcon />
              <span>Reports</span>
            </NavLink>
          </div>
          <div className="nav-group">
            <NavLink to="/dashboard/settings" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Settings">
              <SupportIcon />
              <span>Settings</span>
            </NavLink>
            <NavLink to="/dashboard/developers" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Developers">
              <CodeIcon />
              <span>Developers</span>
            </NavLink>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-search">
            <input type="search" placeholder="Search..." />
          </div>
          <div className="header-user">
            <span>{user?.email}</span>
          </div>
        </header>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
