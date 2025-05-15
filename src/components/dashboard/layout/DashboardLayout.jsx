import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from "../../../context/AuthContext";
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('Core');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Navigation structure
  const navSections = {
    'Core': [
      { name: 'Dashboard', path: '/dashboard', active: true },
      { name: 'Balances', path: '/balances' },
      { name: 'Transactions', path: '/transactions' }
    ],
    'Payment Methods': [
      { name: 'Payment Rails', path: '/payment-rails' },
      { name: 'Mobile Money', path: '/mobile-money' },
      { name: 'Bank Transfers', path: '/bank-transfers' },
      { name: 'Crypto', path: '/crypto' },
      { name: 'Cards', path: '/cards' }
    ],
    'Business Operations': [
      { name: 'Customers', path: '/customers' },
      { name: 'Global Markets', path: '/global-markets' },
      { name: 'Reports', path: '/reports' },
      { name: 'Settlements', path: '/settlements' },
      { name: 'Compliance', path: '/compliance' },
      { name: 'Settings', path: '/settings' }
    ],
    'Advanced Features': [
      { name: 'Gesture/FacePay', path: '/gesture-facepay' },
      { name: 'Offline Mode', path: '/offline-mode' },
      { name: 'Multi-ID Search', path: '/multi-id-search' }
    ],
    'Developers': [
      { name: 'API Keys', path: '/api-keys' },
      { name: 'Webhooks', path: '/webhooks' },
      { name: 'API Explorer', path: '/api-explorer' },
      { name: 'SDK Integration', path: '/sdk-integration' }
    ]
  };

  // Quick actions
  const quickActions = [
    { name: 'New Transaction', icon: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' },
    { name: 'Add Customer', icon: 'M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
    { name: 'Generate Report', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' },
    { name: 'Settings', icon: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z' }
  ];

  return (
    <div className={`dashboard-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-text">Sunny</span>
          </div>
        </div>
        
        <div className="sidebar-content">
          {Object.keys(navSections).map((section) => (
            <div key={section} className="nav-section">
              <div 
                className={`nav-section-header ${activeSection === section ? 'active' : ''}`}
                onClick={() => toggleSection(section)}
              >
                <span>{section}</span>
                <svg className="section-icon" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="currentColor" d={activeSection === section ? 
                    "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" : 
                    "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"} 
                  />
                </svg>
              </div>
              {activeSection === section && (
                <nav className="sidebar-nav">
                  {navSections[section].map((item) => (
                    <a 
                      key={item.name} 
                      href={item.path} 
                      className={`nav-item ${item.active ? 'active' : ''}`}
                    >
                      <span className="nav-text">{item.name}</span>
                    </a>
                  ))}
                </nav>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="dashboard-main">
        <div className="topbar">
          <div className="topbar-left">
            <button className="menu-button" onClick={toggleSidebar}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
            <div className="breadcrumb">
              <span className="breadcrumb-item">Home</span>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-item current">Dashboard</span>
            </div>
          </div>
          <div className="topbar-right">
            <div className="quick-actions">
              <button className="action-button">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                </svg>
                <span className="notification-badge">3</span>
              </button>
              <button className="action-button">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </button>
            </div>
            <div className="user-profile" ref={profileRef}>
              <div className="profile-trigger" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                <div className="user-info">
                  <span className="user-name">{user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : (user?.firstName || 'User')}</span>
                  <span className="user-role">Account Owner</span>
                </div>
                <div className="user-avatar">
                  {user?.firstName && user?.lastName ? `${user.firstName[0]}${user.lastName[0]}` : (user?.firstName ? user.firstName[0] : 'U')}
                </div>
                <svg className="dropdown-arrow" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="currentColor" d={profileDropdownOpen ? 
                    "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" : 
                    "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"} 
                  />
                </svg>
              </div>
              
              {profileDropdownOpen && (
                <div className="profile-dropdown">
                  <a href="/profile" className="dropdown-item">My Profile</a>
                  <a href="/account-settings" className="dropdown-item">Account Settings</a>
                  <div className="dropdown-divider"></div>
                  <button onClick={logout} className="dropdown-item logout">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="dashboard-content">
          {children}
        </div>
        <div className="quick-action-fab">
          <button className="fab-button">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          <div className="fab-menu">
            {quickActions.map((action, index) => (
              <button key={index} className="fab-menu-item" title={action.name}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d={action.icon}/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;