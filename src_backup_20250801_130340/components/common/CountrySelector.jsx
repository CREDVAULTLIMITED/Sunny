import React, { useState, useEffect } from 'react';
import './CountrySelector.css';

const CountrySelector = ({ onSelect, selectedCountries = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const sortedCountries = data.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountryClick = (country) => {
    onSelect(country);
  };

  return (
    <div className="country-selector">
      <div className="country-search">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="country-search-input"
        />
      </div>
      <div className="countries-grid">
        {loading ? (
          <div className="loading-spinner">Loading countries...</div>
        ) : (
          filteredCountries.map(country => (
            <div
              key={country.cca3}
              className={`country-item ${selectedCountries.includes(country.cca3) ? 'selected' : ''}`}
              onClick={() => handleCountryClick(country)}
            >
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="country-flag"
              />
              <span className="country-name">{country.name.common}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CountrySelector;
