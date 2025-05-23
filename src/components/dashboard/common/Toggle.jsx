import React from 'react';

const Toggle = ({ enabled, onChange, label }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={onChange}
        />
        <div className={`block w-14 h-8 rounded-full ${enabled ? 'bg-blue-600' : 'bg-gray-400'}`} />
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${enabled ? 'translate-x-6' : ''}`} />
      </div>
      {label && <span className="ml-3">{label}</span>}
    </label>
  );
};

export default Toggle;
