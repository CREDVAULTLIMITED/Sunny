import React from 'react';

/**
 * Modern input component with multiple variants
 */
const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  helper,
  disabled = false,
  required = false,
  icon = null,
  iconPosition = 'left',
  className = '',
  inputClassName = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50';
  
  // Error classes
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : '';
  
  // Disabled classes
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : '';
  
  // Icon classes
  const iconClasses = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';
  
  // Combine all classes
  const inputClasses = `
    ${baseClasses}
    ${errorClasses}
    ${disabledClasses}
    ${iconClasses}
    ${inputClassName}
  `.trim();
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
};

/**
 * Textarea component
 */
const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  helper,
  disabled = false,
  required = false,
  rows = 4,
  className = '',
  textareaClassName = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50';
  
  // Error classes
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : '';
  
  // Disabled classes
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : '';
  
  // Combine all classes
  const textareaClasses = `
    ${baseClasses}
    ${errorClasses}
    ${disabledClasses}
    ${textareaClassName}
  `.trim();
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      <textarea
        className={textareaClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={rows}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
};

/**
 * Select component
 */
const Select = ({
  label,
  options = [],
  value,
  onChange,
  error,
  helper,
  disabled = false,
  required = false,
  placeholder = 'Select an option',
  className = '',
  selectClassName = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50';
  
  // Error classes
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : '';
  
  // Disabled classes
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : '';
  
  // Combine all classes
  const selectClasses = `
    ${baseClasses}
    ${errorClasses}
    ${disabledClasses}
    ${selectClassName}
  `.trim();
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      <select
        className={selectClasses}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
};

// Export all components
Input.Textarea = Textarea;
Input.Select = Select;

export default Input;