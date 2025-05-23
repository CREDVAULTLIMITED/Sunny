import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext.js';
import './TopBar.css';

const TopBar = ({ onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="menu-button" onClick={onMenuClick}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
        <div className="search-container">
          <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>
      <div className="topbar-right">
        <button className="icon-button">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <span className="notification-badge">3</span>
        </button>
        <div className="user-profile">
          <div className="user-profile-button" onClick={toggleDropdown}>
            <div className="user-avatar">
              {user ? user.firstName?.charAt(0) + user.lastName?.charAt(0) : 'U'}
            </div>
            <div className="user-info">
              <div className="user-name">{user ? `${user.firstName} ${user.lastName}` : 'User'}</div>
              <div className="user-role">{user?.accountType || 'Account'}</div>
            </div>
            <svg className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
          
          {dropdownOpen && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-user-avatar">
                  {user ? user.firstName?.charAt(0) + user.lastName?.charAt(0) : 'U'}
                </div>
                <div>
                  <div className="dropdown-user-name">{user ? `${user.firstName} ${user.lastName}` : 'User'}</div>
                  <div className="dropdown-user-email">{user?.email || 'user@example.com'}</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <a href="/profile" className="dropdown-item">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Profile
              </a>
              <a href="/settings" className="dropdown-item">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
                Settings
              </a>
              <div className="dropdown-divider"></div>
              <button onClick={logout} className="dropdown-item">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;