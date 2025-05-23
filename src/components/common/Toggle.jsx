import React from 'react';
import './Toggle.css';

export const Toggle = ({ checked, onChange, disabled }) => {
  return (
    <label className="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="toggle-slider"></span>
    </label>
  );
};

export default Toggle;
