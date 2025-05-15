import React from 'react';
import PropTypes from 'prop-types';

/**
 * SidebarQuickActions component
 * Provides quick action buttons in the sidebar
 */
const SidebarQuickActions = ({ onActionClick }) => {
  const quickActions = [
    { id: 'new-payment', label: 'New Payment', icon: PaymentIcon },
    { id: 'generate-qr', label: 'Generate QR', icon: QRIcon },
    { id: 'view-reports', label: 'View Reports', icon: ReportIcon },
    { id: 'export-data', label: 'Export Data', icon: ExportIcon }
  ];
  
  const handleActionClick = (actionId) => {
    if (onActionClick) {
      onActionClick(actionId);
    }
  };
  
  return (
    <div className="sidebar-quick-actions px-3 py-3 border-t border-indigo-800">
      <h3 className="text-xs font-semibold text-indigo-200 uppercase tracking-wider mb-2">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action) => (
          <button
            key={action.id}
            className="flex flex-col items-center justify-center p-2 bg-indigo-800 hover:bg-indigo-700 rounded-md transition-colors"
            onClick={() => handleActionClick(action.id)}
          >
            <action.icon className="h-5 w-5 text-indigo-300 mb-1" />
            <span className="text-xs text-indigo-100">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Icon components
function PaymentIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}

function QRIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
    </svg>
  );
}

function ReportIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function ExportIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

SidebarQuickActions.propTypes = {
  onActionClick: PropTypes.func
};

export default SidebarQuickActions;