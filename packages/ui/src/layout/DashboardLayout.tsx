import React from 'react';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  variant: 'user' | 'business' | 'institution' | 'admin' | 'developer';
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  sidebarCollapsed?: boolean;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  variant,
  showHeader = true,
  showFooter = true,
  showSidebar = false,
  sidebarCollapsed = false,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'user':
        return 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900';
      case 'business':
        return 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-emerald-900';
      case 'institution':
        return 'bg-gradient-to-br from-slate-50 to-gray-50 dark:from-gray-900 dark:to-slate-900';
      case 'admin':
        return 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-gray-900 dark:to-red-900';
      case 'developer':
        return 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-gray-900 dark:to-purple-900';
      default:
        return 'bg-gray-50 dark:bg-gray-900';
    }
  };

  return (
    <div className={`min-h-screen ${getVariantStyles()} ${className}`}>
      {children}
    </div>
  );
};
