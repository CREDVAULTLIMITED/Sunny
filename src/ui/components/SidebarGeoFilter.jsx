import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * SidebarGeoFilter component
 * Allows filtering by geographic regions
 */
const SidebarGeoFilter = ({ regions, onRegionChange }) => {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleRegion = (regionId) => {
    setSelectedRegions(prevRegions => {
      const isSelected = prevRegions.includes(regionId);
      const newRegions = isSelected
        ? prevRegions.filter(id => id !== regionId)
        : [...prevRegions, regionId];
      
      if (onRegionChange) {
        onRegionChange(newRegions);
      }
      
      return newRegions;
    });
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Display only top regions when collapsed
  const displayRegions = isExpanded ? regions : regions.slice(0, 5);
  
  return (
    <div className="sidebar-geo-filter px-3 py-3 border-t border-indigo-800">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">
          Regions
        </h3>
        
        <button 
          className="text-indigo-300 hover:text-indigo-100"
          onClick={toggleExpand}
        >
          {isExpanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="space-y-1">
        {displayRegions.map((region) => (
          <button
            key={region.id}
            className={`w-full flex items-center justify-between px-2 py-1.5 text-sm font-medium rounded-md ${
              selectedRegions.includes(region.id)
                ? 'bg-indigo-600 text-white'
                : 'text-indigo-100 hover:bg-indigo-800'
            }`}
            onClick={() => toggleRegion(region.id)}
          >
            <div className="flex items-center">
              <span className="mr-2">{region.flag}</span>
              <span>{region.name}</span>
            </div>
            
            {selectedRegions.includes(region.id) ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span className="text-xs text-indigo-300">{region.count}</span>
            )}
          </button>
        ))}
      </div>
      
      {!isExpanded && regions.length > 5 && (
        <button 
          className="mt-2 w-full text-center text-xs text-indigo-300 hover:text-indigo-100"
          onClick={toggleExpand}
        >
          Show {regions.length - 5} more regions
        </button>
      )}
    </div>
  );
};

SidebarGeoFilter.propTypes = {
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      flag: PropTypes.string,
      count: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  onRegionChange: PropTypes.func
};

SidebarGeoFilter.defaultProps = {
  regions: [
    { id: 'us', name: 'United States', flag: '🇺🇸', count: '1.2k' },
    { id: 'gb', name: 'United Kingdom', flag: '🇬🇧', count: '845' },
    { id: 'ca', name: 'Canada', flag: '🇨🇦', count: '483' },
    { id: 'au', name: 'Australia', flag: '🇦🇺', count: '321' },
    { id: 'de', name: 'Germany', flag: '🇩🇪', count: '219' },
    { id: 'fr', name: 'France', flag: '🇫🇷', count: '198' },
    { id: 'jp', name: 'Japan', flag: '🇯🇵', count: '172' },
    { id: 'in', name: 'India', flag: '🇮🇳', count: '156' },
    { id: 'br', name: 'Brazil', flag: '🇧🇷', count: '143' },
    { id: 'za', name: 'South Africa', flag: '🇿🇦', count: '92' }
  ]
};

export default SidebarGeoFilter;