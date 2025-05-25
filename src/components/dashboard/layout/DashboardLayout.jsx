import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from "../../../context/AuthContext.jsx";
import { useLocation, Outlet } from 'react-router-dom';
import './DashboardLayout.css';
import NewSidebar from './NewSidebar';

const DashboardLayout = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, logout } = useAuth();
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
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="dashboard-layout">
      <NewSidebar 
        isCollapsed={sidebarCollapsed} 
        activeRoute={location.pathname}
      />
      
      <div className={`dashboard-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <header className="dashboard-header">
          <div className="header-left">
            <button className="menu-button" onClick={toggleSidebar}>
              <i className="lucide-menu"></i>
            </button>
            <div className="search-bar">
              <i className="lucide-search"></i>
              <input type="text" placeholder="Search transactions, customers..." />
            </div>
          </div>
          
          <div className="header-right">
            <button className="header-action">
              <i className="lucide-bell"></i>
              <span className="notification-badge">3</span>
            </button>
            
            <div className="profile-menu" ref={profileRef}>
              <button 
                className="profile-trigger"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div className="avatar">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="profile-name">{user?.name || 'User'}</span>
                <i className={`lucide-chevron-${profileDropdownOpen ? 'up' : 'down'}`}></i>
              </button>
              
              {profileDropdownOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <strong>{user?.email}</strong>
                    <span>{user?.role || 'User'}</span>
                  </div>
                  
                  <div className="dropdown-items">
                    <a href="/profile" className="dropdown-item">
                      <i className="lucide-user"></i>
                      Profile Settings
                    </a>
                    <a href="/organization" className="dropdown-item">
                      <i className="lucide-briefcase"></i>
                      Organization
                    </a>
                    <a href="/billing" className="dropdown-item">
                      <i className="lucide-credit-card"></i>
                      Billing
                    </a>
                    <hr className="dropdown-divider" />
                    <button onClick={logout} className="dropdown-item text-danger">
                      <i className="lucide-log-out"></i>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;