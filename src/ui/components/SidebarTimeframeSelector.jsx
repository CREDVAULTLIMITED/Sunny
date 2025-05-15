import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * SidebarTimeframeSelector component
 * Allows users to select a timeframe for filtering data
 */
const SidebarTimeframeSelector = ({ onTimeframeChange }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('last30days');
  
  const timeframes = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'last7days', label: 'Last 7 Days' },
    { id: 'last30days', label: 'Last 30 Days' },
    { id: 'thisMonth', label: 'This Month' },
    { id: 'lastMonth', label: 'Last Month' }
  ];
  
  const handleTimeframeChange = (timeframeId) => {
    setSelectedTimeframe(timeframeId);
    
    if (onTimeframeChange) {
      onTimeframeChange(timeframeId);
    }
  };
  
  return (
    <div className="sidebar-timeframe-selector px-3 py-3 border-t border-indigo-800">
      <h3 className="text-xs font-semibold text-indigo-200 uppercase tracking-wider mb-2">
        Timeframe
      </h3>
      
      <div className="space-y-1">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe.id}
            className={`w-full text-left px-2 py-1.5 text-sm font-medium rounded-md ${
              selectedTimeframe === timeframe.id
                ? 'bg-indigo-600 text-white'
                : 'text-indigo-100 hover:bg-indigo-800'
            }`}
            onClick={() => handleTimeframeChange(timeframe.id)}
          >
            {timeframe.label}
          </button>
        ))}
      </div>
      
      <div className="mt-3">
        <button className="w-full flex items-center justify-center px-2 py-1.5 text-xs font-medium text-indigo-200 hover:text-white border border-indigo-600 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Custom Range
        </button>
      </div>
    </div>
  );
};

SidebarTimeframeSelector.propTypes = {
  onTimeframeChange: PropTypes.func
};

export default SidebarTimeframeSelector;