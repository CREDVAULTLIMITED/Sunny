import React from 'react';
import PropTypes from 'prop-types';

/**
 * SidebarAnalytics component
 * Displays quick analytics metrics in the sidebar
 */
const SidebarAnalytics = ({ stats }) => {
  return (
    <div className="sidebar-analytics px-3 py-3 border-t border-indigo-800">
      <h3 className="text-xs font-semibold text-indigo-200 uppercase tracking-wider mb-2">
        Quick Stats
      </h3>
      
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-indigo-800 rounded-md p-2 flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 rounded-md bg-indigo-700 flex items-center justify-center">
                {stat.icon ? (
                  stat.icon
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )}
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium text-indigo-200">{stat.name}</p>
                <p className="text-sm font-semibold text-white">{stat.value}</p>
              </div>
            </div>
            
            {stat.change && (
              <div className={`text-xs font-medium ${
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-2 text-center">
        <a href="/analytics" className="text-xs text-indigo-300 hover:text-indigo-100">
          View full analytics →
        </a>
      </div>
    </div>
  );
};

SidebarAnalytics.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      change: PropTypes.string,
      trend: PropTypes.oneOf(['up', 'down']),
      icon: PropTypes.element
    })
  )
};

SidebarAnalytics.defaultProps = {
  stats: [
    { name: 'Total Volume', value: '$12,450', change: '+8.2%', trend: 'up' },
    { name: 'Success Rate', value: '98.7%', change: '+0.5%', trend: 'up' },
    { name: 'Transactions', value: '1,234', change: '+12.5%', trend: 'up' }
  ]
};

export default SidebarAnalytics;