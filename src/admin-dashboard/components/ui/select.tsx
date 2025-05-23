'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}

export function Select({ 
  value, 
  onValueChange, 
  options, 
  placeholder = "Select an option", 
  disabled = false 
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={`flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span>{selectedOption?.label || placeholder}</span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <li 
                key={option.value}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                  option.value === value ? 'bg-blue-50 text-blue-700' : ''
                }`}
                onClick={() => {
                  onValueChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

