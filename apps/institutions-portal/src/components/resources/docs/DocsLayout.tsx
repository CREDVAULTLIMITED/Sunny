'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../providers/ThemeProvider';
import DocsHeader from './DocsHeader';
import DocsSidebar from './DocsSidebar';
import DocsFooter from './DocsFooter';

interface DocsLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showBreadcrumbs?: boolean;
  maxWidth?: 'full' | '7xl' | '6xl' | '5xl';
  className?: string;
}

export default function DocsLayout({ 
  children, 
  showSidebar = true, 
  showBreadcrumbs = true,
  maxWidth = '7xl',
  className = '' 
}: DocsLayoutProps) {
  const { actualTheme } = useTheme();
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarNavigate = (path: string) => {
    // Handle any special navigation logic here
    console.log('Navigating to:', path);
  };

  const maxWidthClasses = {
    'full': 'w-full',
    '7xl': 'max-w-7xl',
    '6xl': 'max-w-6xl',
    '5xl': 'max-w-5xl',
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      {/* Docs Header */}
      <DocsHeader 
        currentPath={pathname} 
        showBreadcrumbs={showBreadcrumbs}
      />

      <div className="flex">
        {/* Docs Sidebar */}
        {showSidebar && (
          <div className={`hidden lg:block transition-all duration-300 ${
            sidebarCollapsed ? 'w-16' : 'w-80'
          }`}>
            <div className="sticky top-16 h-[calc(100vh-4rem)]">
              <DocsSidebar 
                currentPath={pathname}
                onNavigate={handleSidebarNavigate}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className={`${maxWidthClasses[maxWidth]} ${maxWidth === 'full' ? 'px-0' : 'mx-auto px-4 sm:px-6 lg:px-8'} py-8`}>
            {children}
          </div>
        </main>
      </div>

      {/* Docs Footer */}
      <DocsFooter />
    </div>
  );
}
