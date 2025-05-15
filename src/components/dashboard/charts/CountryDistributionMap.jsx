import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import './Charts.css';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const CountryDistributionMap = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="chart-no-data">No country distribution data available</div>;
  }

  // Find max volume for scaling
  const maxVolume = Math.max(...data.map(item => item.volume));
  
  return (
    <div className="map-container">
      <ComposableMap projection="geoMercator">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>
        {data.map((country) => {
          const countryCode = country.country;
          const size = Math.max(5, Math.sqrt(country.volume / maxVolume) * 30);
          
          // Map country codes to coordinates (simplified)
          const coordinates = getCountryCoordinates(countryCode);
          
          if (coordinates) {
            return (
              <Marker key={countryCode} coordinates={coordinates}>
                <circle 
                  r={size} 
                  fill="#0070f3" 
                  fillOpacity={0.3} 
                  stroke="#0070f3"
                  strokeWidth={2}
                />
              </Marker>
            );
          }
          return null;
        })}
      </ComposableMap>
      
      <div className="map-legend">
        {data.slice(0, 5).map((item, index) => (
          <div key={index} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#0070f3' }}></div>
            <div className="legend-label">{getCountryName(item.country)}</div>
            <div className="legend-value">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
              }).format(item.volume)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get country coordinates
function getCountryCoordinates(code) {
  const coordinates = {
    US: [-95, 38],
    GB: [0, 55],
    CA: [-106, 56],
    AU: [133, -25],
    DE: [10, 51],
    FR: [2, 46],
    JP: [138, 36],
    IN: [78, 21],
    BR: [-53, -10],
    ZA: [24, -29]
  };
  return coordinates[code];
}

// Helper function to get country name
function getCountryName(code) {
  const names = {
    US: 'United States',
    GB: 'United Kingdom',
    CA: 'Canada',
    AU: 'Australia',
    DE: 'Germany',
    FR: 'France',
    JP: 'Japan',
    IN: 'India',
    BR: 'Brazil',
    ZA: 'South Africa'
  };
  return names[code] || code;
}

export default CountryDistributionMap;
