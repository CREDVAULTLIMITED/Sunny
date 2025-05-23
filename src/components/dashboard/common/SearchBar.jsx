import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = ({ placeholder, onSearch }) => {
  const handleInputChange = (event) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
};

export default SearchBar;
