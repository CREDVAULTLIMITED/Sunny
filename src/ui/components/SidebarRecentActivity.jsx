import React from 'react';
import PropTypes from 'prop-types';

/**
 * SidebarRecentActivity component
 * Displays recent transactions or activities in the sidebar
 */
const SidebarRecentActivity = ({ activities }) => {
  return (
    <div className="sidebar-recent-activity px-3 py-3 border-t border-indigo-800">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">
          Recent Activity
        </h3>
        
        <a href="/transactions" className="text-xs text-indigo-300 hover:text-indigo-100">
          View all
        </a>
      </div>
      
      <div className="space-y-2">
        {activities.map((activity) => (
          <a
            key={activity.id}
            href={`/transactions/${activity.id}`}
            className="block bg-indigo-800 hover:bg-indigo-700 rounded-md p-2 transition-colors"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-md bg-indigo-700 flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="ml-2 flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-indigo-300 truncate">
                  {activity.description}
                </p>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs font-medium ${
                    getStatusColor(activity.status)
                  }`}>
                    {activity.status}
                  </span>
                  <span className="ml-auto text-xs text-indigo-400">
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

// Helper function to get appropriate icon based on activity type
const getActivityIcon = (type) => {
  switch (type) {
    case 'payment':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'refund':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      );
    case 'dispute':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-900 text-green-300';
    case 'pending':
      return 'bg-yellow-900 text-yellow-300';
    case 'failed':
      return 'bg-red-900 text-red-300';
    case 'refunded':
      return 'bg-indigo-900 text-indigo-300';
    default:
      return 'bg-gray-900 text-gray-300';
  }
};

SidebarRecentActivity.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['payment', 'refund', 'dispute', 'other'])
    })
  )
};

SidebarRecentActivity.defaultProps = {
  activities: [
    {
      id: 'trx-123',
      title: 'Payment from John Doe',
      description: 'Credit Card •••• 4242',
      status: 'Completed',
      time: '2m ago',
      type: 'payment'
    },
    {
      id: 'trx-122',
      title: 'Refund to Sarah Smith',
      description: '$24.99 - Order #45678',
      status: 'Pending',
      time: '15m ago',
      type: 'refund'
    },
    {
      id: 'trx-121',
      title: 'Dispute from Michael Brown',
      description: 'Reason: Item not received',
      status: 'Failed',
      time: '1h ago',
      type: 'dispute'
    }
  ]
};

export default SidebarRecentActivity;