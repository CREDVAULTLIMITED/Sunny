import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * SidebarNotifications component
 * Displays notifications in the sidebar
 */
const SidebarNotifications = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  const markAsRead = (id) => {
    // This would typically update the notification state in a real app
    console.log(`Marking notification ${id} as read`);
  };
  
  return (
    <div className="sidebar-notifications px-3 py-3 border-t border-indigo-800">
      <button
        className="w-full flex items-center justify-between"
        onClick={toggleOpen}
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <h3 className="text-sm font-medium text-indigo-100">
            Notifications
          </h3>
        </div>
        
        <div className="flex items-center">
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-indigo-100 bg-indigo-600 rounded-full">
              {unreadCount}
            </span>
          )}
          
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-indigo-300 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </button>
      
      {isOpen && (
        <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-2 rounded-md ${notification.read ? 'bg-indigo-800' : 'bg-indigo-700'}`}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${getNotificationTypeStyles(notification.type).bgColor}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <p className="text-xs font-medium text-indigo-100">
                      {notification.title}
                    </p>
                    <p className="text-xs text-indigo-300 mt-0.5">
                      {notification.message}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs text-indigo-400">
                        {notification.time}
                      </span>
                      
                      {!notification.read && (
                        <button
                          className="text-xs text-indigo-300 hover:text-indigo-100"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-xs text-indigo-400">No notifications</p>
            </div>
          )}
          
          {notifications.length > 0 && (
            <div className="text-center pt-1">
              <a href="/notifications" className="text-xs text-indigo-300 hover:text-indigo-100">
                View all notifications
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Helper function to get notification icon based on type
const getNotificationIcon = (type) => {
  switch (type) {
    case 'success':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'warning':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    case 'error':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    case 'info':
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

// Helper function to get notification type styles
const getNotificationTypeStyles = (type) => {
  switch (type) {
    case 'success':
      return {
        bgColor: 'bg-green-600',
        textColor: 'text-green-100'
      };
    case 'warning':
      return {
        bgColor: 'bg-yellow-600',
        textColor: 'text-yellow-100'
      };
    case 'error':
      return {
        bgColor: 'bg-red-600',
        textColor: 'text-red-100'
      };
    case 'info':
    default:
      return {
        bgColor: 'bg-blue-600',
        textColor: 'text-blue-100'
      };
  }
};

SidebarNotifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      read: PropTypes.bool.isRequired,
      type: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
    })
  )
};

SidebarNotifications.defaultProps = {
  notifications: [
    {
      id: 'notif-1',
      title: 'Payment Successful',
      message: 'Payment of $250.00 was successful',
      time: '2 minutes ago',
      read: false,
      type: 'success'
    },
    {
      id: 'notif-2',
      title: 'New Dispute',
      message: 'Customer opened a dispute for order #12345',
      time: '1 hour ago',
      read: false,
      type: 'warning'
    },
    {
      id: 'notif-3',
      title: 'Payment Failed',
      message: 'Payment of $120.00 failed due to insufficient funds',
      time: '3 hours ago',
      read: true,
      type: 'error'
    }
  ]
};

export default SidebarNotifications;