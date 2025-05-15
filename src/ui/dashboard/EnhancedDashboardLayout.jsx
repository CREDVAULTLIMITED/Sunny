import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import sidebar components
import SidebarSearch from '../components/SidebarSearch';
import SidebarUserProfile from '../components/SidebarUserProfile';
import SidebarAnalytics from '../components/SidebarAnalytics';
import SidebarPaymentFilters from '../components/SidebarPaymentFilters';
import SidebarTimeframeSelector from '../components/SidebarTimeframeSelector';
import SidebarGeoFilter from '../components/SidebarGeoFilter';
import SidebarRecentActivity from '../components/SidebarRecentActivity';
import SidebarQuickActions from '../components/SidebarQuickActions';
import SidebarNotifications from '../components/SidebarNotifications';

/**
 * Enhanced Dashboard layout component with improved sidebar features
 */
const EnhancedDashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useState('dashboard');

  // Check if we're on mobile and handle window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample data for analytics
  const analyticsStats = [
    { name: 'Total Volume', value: '$128,420', change: '+8.2%', trend: 'up' },
    { name: 'Success Rate', value: '98.7%', change: '+0.5%', trend: 'up' },
    { name: 'Transactions', value: '2,543', change: '+12.5%', trend: 'up' }
  ];

  // Navigation items
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: currentSection === 'dashboard' },
    { name: 'Transactions', href: '/dashboard/transactions', icon: TransactionIcon, current: currentSection === 'transactions' },
    { name: 'Payments', href: '/dashboard/payments', icon: PaymentIcon, current: currentSection === 'payments' },
    { name: 'Customers', href: '/dashboard/customers', icon: CustomerIcon, current: currentSection === 'customers' },
    { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon, current: currentSection === 'settings' },
  ];

  // Handle navigation item click
  const handleNavClick = (section) => {
    setCurrentSection(section);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    console.log(`Searching for: ${searchTerm}`);
    // Implement search functionality
  };

  // Handle payment filter change
  const handlePaymentFilterChange = (selectedMethods) => {
    console.log('Selected payment methods:', selectedMethods);
    // Implement filter functionality
  };

  // Handle timeframe change
  const handleTimeframeChange = (timeframe) => {
    console.log('Selected timeframe:', timeframe);
    // Implement timeframe filter
  };

  // Handle region change
  const handleRegionChange = (regions) => {
    console.log('Selected regions:', regions);
    // Implement region filter
  };

  // Handle quick action click
  const handleQuickAction = (actionId) => {
    console.log('Quick action clicked:', actionId);
    // Implement quick action functionality
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75" 
          aria-hidden="true" 
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-700 transition-transform transform ${
          isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
        } md:relative md:translate-x-0 flex flex-col`}
      >
        {/* Sidebar header */}
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-indigo-800">
          <img className="h-8 w-auto" src="/logo-white.svg" alt="Sunny" />
          <span className="ml-2 text-white font-semibold text-lg">Sunny</span>
          
          {/* Close button for mobile */}
          {isMobile && (
            <button
              className="ml-auto text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleSidebar}
            >
              <XIcon className="h-6 w-6" />
            </button>
          )}
        </div>
        
        {/* Sidebar content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Search */}
          <SidebarSearch onSearch={handleSearch} />
          
          {/* Main navigation */}
          <nav className="px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${item.current
                    ? 'bg-indigo-800 text-white'
                    : 'text-indigo-100 hover:bg-indigo-600'
                  }
                `}
                onClick={() => handleNavClick(item.name.toLowerCase())}
              >
                <item.icon className="mr-3 h-6 w-6 text-indigo-300" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Quick analytics */}
          <SidebarAnalytics stats={analyticsStats} />
          
          {/* Payment method filters */}
          <SidebarPaymentFilters onFilterChange={handlePaymentFilterChange} />
          
          {/* Timeframe selector */}
          <SidebarTimeframeSelector onTimeframeChange={handleTimeframeChange} />
          
          {/* Geographic filter */}
          <SidebarGeoFilter onRegionChange={handleRegionChange} />
          
          {/* Quick actions */}
          <SidebarQuickActions onActionClick={handleQuickAction} />
          
          {/* Recent activity */}
          <SidebarRecentActivity />
          
          {/* Notifications */}
          <SidebarNotifications />
          
          {/* User profile */}
          <SidebarUserProfile user={{
            name: 'John Doe',
            email: 'john@example.com'
          }} />
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          {/* Mobile menu button */}
          {isMobile && (
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" />
            </button>
          )}
          
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
              </h1>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              {/* Help button */}
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3">
                <span className="sr-only">Help</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              
              {/* Settings dropdown */}
              <div className="relative">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Settings</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Icon components
function HomeIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function TransactionIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function PaymentIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function CustomerIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

EnhancedDashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default EnhancedDashboardLayout;