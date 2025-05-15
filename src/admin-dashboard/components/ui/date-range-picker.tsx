'use client';

import React from 'react';

interface DateRangePickerProps {
  value: {
    from: Date;
    to: Date;
  };
  onChange: (range: { from: Date; to: Date }) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col">
        <label className="text-sm text-gray-500">From</label>
        <input
          type="date"
          className="border rounded p-2"
          value={value.from.toISOString().split('T')[0]}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            onChange({ from: newDate, to: value.to });
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-500">To</label>
        <input
          type="date"
          className="border rounded p-2"
          value={value.to.toISOString().split('T')[0]}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            onChange({ from: value.from, to: newDate });
          }}
        />
      </div>
    </div>
  );
}