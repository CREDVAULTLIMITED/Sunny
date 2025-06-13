import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const DashboardSettings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    businessName: 'My Business',
    email: user?.email || '',
    phone: '',
    country: 'US',
    timezone: 'UTC-5',
    currency: 'USD',
    notifications: {
      email: true,
      app: true,
      payments: true,
      security: true
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle settings update
    console.log('Settings updated:', formData);
  };

  return (
    <div className="dashboard-settings">
      <div className="page-header">
        <h1>Settings</h1>
      </div>

      <div className="settings-layout">
        <aside className="settings-sidebar">
          <nav>
            <button
              className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button
              className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
            <button
              className={`nav-link ${activeTab === 'team' ? 'active' : ''}`}
              onClick={() => setActiveTab('team')}
            >
              Team Members
            </button>
            <button
              className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
            <button
              className={`nav-link ${activeTab === 'api' ? 'active' : ''}`}
              onClick={() => setActiveTab('api')}
            >
              API Keys
            </button>
            <button
              className={`nav-link ${activeTab === 'webhooks' ? 'active' : ''}`}
              onClick={() => setActiveTab('webhooks')}
            >
              Webhooks
            </button>
          </nav>
        </aside>

        <main className="settings-content">
          {activeTab === 'general' && (
            <form onSubmit={handleSubmit} className="settings-form">
              <div className="form-group">
                <label htmlFor="businessName">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  {/* Add more countries */}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="timezone">Timezone</label>
                <select
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                >
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC-6">Central Time (UTC-6)</option>
                  <option value="UTC-7">Mountain Time (UTC-7)</option>
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  {/* Add more timezones */}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="currency">Default Currency</label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  {/* Add more currencies */}
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          )}

          {activeTab === 'notifications' && (
            <form onSubmit={handleSubmit} className="settings-form">
              <div className="form-section">
                <h2>Notification Preferences</h2>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="email"
                      checked={formData.notifications.email}
                      onChange={handleCheckboxChange}
                    />
                    Email Notifications
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="app"
                      checked={formData.notifications.app}
                      onChange={handleCheckboxChange}
                    />
                    In-App Notifications
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="payments"
                      checked={formData.notifications.payments}
                      onChange={handleCheckboxChange}
                    />
                    Payment Alerts
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="security"
                      checked={formData.notifications.security}
                      onChange={handleCheckboxChange}
                    />
                    Security Alerts
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Save Preferences
              </button>
            </form>
          )}

          {/* Add other tab content */}
        </main>
      </div>
    </div>
  );
};

export default DashboardSettings;
