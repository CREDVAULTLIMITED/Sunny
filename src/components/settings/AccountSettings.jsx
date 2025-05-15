import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AccountSettings.css';

const AccountSettings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    twoFactorEnabled: user?.twoFactorEnabled || false,
    language: user?.language || 'en',
    theme: user?.theme || 'light'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [name]: checked
      }
    });
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would implement the API call to update user settings
    console.log('Saving settings:', formData);
    // Show success message
    alert('Settings saved successfully');
  };

  return (
    <div className="account-settings">
      <div className="settings-header">
        <h1>Account Settings</h1>
        <p>Manage your account preferences and settings</p>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <ul className="settings-tabs">
            <li 
              className={activeTab === 'profile' ? 'active' : ''} 
              onClick={() => setActiveTab('profile')}
            >
              Personal Information
            </li>
            <li 
              className={activeTab === 'security' ? 'active' : ''} 
              onClick={() => setActiveTab('security')}
            >
              Security
            </li>
            <li 
              className={activeTab === 'notifications' ? 'active' : ''} 
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </li>
            <li 
              className={activeTab === 'preferences' ? 'active' : ''} 
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </li>
            <li 
              className={activeTab === 'activity' ? 'active' : ''} 
              onClick={() => setActiveTab('activity')}
            >
              Account Activity
            </li>
          </ul>
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className="settings-form">
              <h2>Personal Information</h2>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="save-button">Save Changes</button>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handleSubmit} className="settings-form">
              <h2>Security Settings</h2>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group toggle-group">
                <label htmlFor="twoFactorEnabled">Two-Factor Authentication</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="twoFactorEnabled"
                    name="twoFactorEnabled"
                    checked={formData.twoFactorEnabled}
                    onChange={handleToggleChange}
                  />
                  <label htmlFor="twoFactorEnabled"></label>
                </div>
              </div>
              <button type="submit" className="save-button">Save Changes</button>
            </form>
          )}

          {activeTab === 'notifications' && (
            <form onSubmit={handleSubmit} className="settings-form">
              <h2>Notification Preferences</h2>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="email"
                    checked={formData.notifications.email}
                    onChange={handleCheckboxChange}
                  />
                  Email Notifications
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="push"
                    checked={formData.notifications.push}
                    onChange={handleCheckboxChange}
                  />
                  Push Notifications
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="sms"
                    checked={formData.notifications.sms}
                    onChange={handleCheckboxChange}
                  />
                  SMS Notifications
                </label>
              </div>
              <button type="submit" className="save-button">Save Changes</button>
            </form>
          )}

          {activeTab === 'preferences' && (
            <form onSubmit={handleSubmit} className="settings-form">
              <h2>User Preferences</h2>
              <div className="form-group">
                <label htmlFor="language">Language</label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="theme">Theme</label>
                <select
                  id="theme"
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
              <button type="submit" className="save-button">Save Changes</button>
            </form>
          )}

          {activeTab === 'activity' && (
            <div className="settings-form">
              <h2>Account Activity</h2>
              <div className="activity-log">
                <div className="activity-item">
                  <div className="activity-info">
                    <span className="activity-type">Login</span>
                    <span className="activity-date">Today, 10:45 AM</span>
                  </div>
                  <div className="activity-details">
                    <span className="activity-ip">IP: 192.168.1.1</span>
                    <span className="activity-device">Chrome on Windows</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-info">
                    <span className="activity-type">Password Changed</span>
                    <span className="activity-date">Yesterday, 3:20 PM</span>
                  </div>
                  <div className="activity-details">
                    <span className="activity-ip">IP: 192.168.1.1</span>
                    <span className="activity-device">Firefox on MacOS</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-info">
                    <span className="activity-type">Login</span>
                    <span className="activity-date">Oct 15, 2023, 8:30 AM</span>
                  </div>
                  <div className="activity-details">
                    <span className="activity-ip">IP: 192.168.1.100</span>
                    <span className="activity-device">Safari on iOS</span>
                  </div>
                </div>
              </div>
              <button className="secondary-button">Download Activity Log</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;