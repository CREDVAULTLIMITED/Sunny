import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * SidebarCustomization component
 * Allows users to customize which elements appear in their sidebar
 */
const SidebarCustomization = ({ onSave, defaultSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  
  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('sunny_sidebar_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error parsing sidebar settings:', error);
      }
    }
  }, []);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  const toggleSetting = (key) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: !prevSettings[key]
    }));
  };
  
  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('sunny_sidebar_settings', JSON.stringify(settings));
    
    // Notify parent component
    if (onSave) {
      onSave(settings);
    }
    
    setIsOpen(false);
  };
  
  const handleReset = () => {
    setSettings(defaultSettings);
  };
  
  return (
    <div className="sidebar-customization">
      <button
        className="w-full flex items-center justify-between px-3 py-2 text-sm text-indigo-200 hover:text-white border-t border-indigo-800"
        onClick={toggleOpen}
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Customize Sidebar
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="px-3 py-2 bg-indigo-800 border-t border-indigo-700">
          <p className="text-xs text-indigo-300 mb-2">
            Select which elements to show in your sidebar:
          </p>
          
          <div className="space-y-2">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input
                  id={`setting-${key}`}
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={value}
                  onChange={() => toggleSetting(key)}
                />
                <label htmlFor={`setting-${key}`} className="ml-2 block text-sm text-indigo-200">
                  {formatSettingName(key)}
                </label>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between">
            <button
              className="px-3 py-1 text-xs text-indigo-300 hover:text-indigo-100"
              onClick={handleReset}
            >
              Reset to Default
            </button>
            
            <button
              className="px-3 py-1 text-xs bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to format setting keys as readable names
const formatSettingName = (key) => {
  // Convert camelCase to Title Case with spaces
  const formatted = key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
  
  return formatted;
};

SidebarCustomization.propTypes = {
  onSave: PropTypes.func,
  defaultSettings: PropTypes.object
};

SidebarCustomization.defaultProps = {
  defaultSettings: {
    analytics: true,
    paymentFilters: true,
    timeframeSelector: true,
    geoFilter: true,
    recentActivity: true,
    quickActions: true,
    notifications: true
  }
};

export default SidebarCustomization;