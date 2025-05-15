import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * SidebarUserProfile component
 * Displays user profile in the sidebar with dropdown menu
 */
const SidebarUserProfile = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="sidebar-user-profile px-3 py-4 border-t border-indigo-800">
      <div 
        className="flex items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex-shrink-0">
          <img
            className="h-9 w-9 rounded-full border-2 border-indigo-500"
            src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
            alt={user.name || "User"}
          />
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {user.name || "User Name"}
          </p>
          <p className="text-xs text-indigo-300 truncate">
            {user.email || "user@example.com"}
          </p>
        </div>
        <div className="ml-2 flex-shrink-0 text-indigo-300">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <div className="mt-3 py-2 bg-indigo-800 rounded-md shadow-lg">
          <a href="/profile" className="block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-700">
            Your Profile
          </a>
          <a href="/account/settings" className="block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-700">
            Account Settings
          </a>
          <a href="/support" className="block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-700">
            Support
          </a>
          <div className="border-t border-indigo-700 my-1"></div>
          <a href="/logout" className="block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-700">
            Sign out
          </a>
        </div>
      )}
    </div>
  );
};

SidebarUserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string
  })
};

SidebarUserProfile.defaultProps = {
  user: {
    name: 'User Name',
    email: 'user@example.com',
    avatar: null
  }
};

export default SidebarUserProfile;