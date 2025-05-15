import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SectionHelp from './SectionHelp';

/**
 * HelpButton component
 * Floating button that opens contextual help for the current section
 */
const HelpButton = ({ section }) => {
  const [showHelp, setShowHelp] = useState(false);
  
  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 transition-all z-50"
        onClick={() => setShowHelp(true)}
        aria-label="Show help"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      
      {showHelp && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-auto">
            <SectionHelp 
              section={section} 
              onClose={() => setShowHelp(false)} 
            />
          </div>
        </div>
      )}
    </>
  );
};

HelpButton.propTypes = {
  section: PropTypes.string.isRequired
};

export default HelpButton;