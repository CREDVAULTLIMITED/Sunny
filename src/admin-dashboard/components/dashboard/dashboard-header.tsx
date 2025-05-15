'use client';

import React from 'react';

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">{heading}</h1>
        {text && <p className="text-gray-500 mt-1">{text}</p>}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}