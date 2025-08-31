import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DeveloperTerminal from '../components/developer/DeveloperTerminal';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const isDevRoute = location.pathname.includes('/developers');

  return (
    <div className="dashboard-layout">
      <nav className="dashboard-nav">
        {/* Existing navigation */}
      </nav>
      
      <main className="dashboard-main">
        {children}
      </main>

      {isDevRoute && <DeveloperTerminal />}
    </div>
  );
};

export default DashboardLayout;
