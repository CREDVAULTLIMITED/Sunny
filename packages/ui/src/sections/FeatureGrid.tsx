import React from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  badge?: string;
  stats?: {
    value: string;
    label: string;
  };
}

export interface FeatureGridProps {
  variant: 'user' | 'business' | 'institution' | 'admin' | 'developer';
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  showBorder?: boolean;
  showHover?: boolean;
  className?: string;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  variant,
  title,
  subtitle,
  features,
  columns = 3,
  showBorder = true,
  showHover = true,
  className = '',
}) => {
  const getVariantColors = () => {
    switch (variant) {
      case 'user':
        return {
          background: 'bg-blue-50 dark:bg-blue-900/10',
          iconBg: 'bg-blue-100 dark:bg-blue-900/20',
          iconColor: 'text-blue-600 dark:text-blue-400',
          hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
        };
      case 'business':
        return {
          background: 'bg-emerald-50 dark:bg-emerald-900/10',
          iconBg: 'bg-emerald-100 dark:bg-emerald-900/20',
          iconColor: 'text-emerald-600 dark:text-emerald-400',
          hoverBg: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
          border: 'border-emerald-200 dark:border-emerald-800',
        };
      case 'institution':
        return {
          background: 'bg-slate-50 dark:bg-slate-900/10',
          iconBg: 'bg-slate-100 dark:bg-slate-900/20',
          iconColor: 'text-slate-600 dark:text-slate-400',
          hoverBg: 'hover:bg-slate-50 dark:hover:bg-slate-900/20',
          border: 'border-slate-200 dark:border-slate-800',
        };
      case 'admin':
        return {
          background: 'bg-red-50 dark:bg-red-900/10',
          iconBg: 'bg-red-100 dark:bg-red-900/20',
          iconColor: 'text-red-600 dark:text-red-400',
          hoverBg: 'hover:bg-red-50 dark:hover:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
        };
      case 'developer':
        return {
          background: 'bg-purple-50 dark:bg-purple-900/10',
          iconBg: 'bg-purple-100 dark:bg-purple-900/20',
          iconColor: 'text-purple-600 dark:text-purple-400',
          hoverBg: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
          border: 'border-purple-200 dark:border-purple-800',
        };
      default:
        return {
          background: 'bg-gray-50 dark:bg-gray-900/10',
          iconBg: 'bg-gray-100 dark:bg-gray-900/20',
          iconColor: 'text-gray-600 dark:text-gray-400',
          hoverBg: 'hover:bg-gray-50 dark:hover:bg-gray-900/20',
          border: 'border-gray-200 dark:border-gray-800',
        };
    }
  };

  const colors = getVariantColors();
  
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {subtitle && (
              <p className={`text-sm font-semibold uppercase tracking-wide ${colors.iconColor} mb-4`}>
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Feature Grid */}
        <div className={`grid ${getGridCols()} gap-8`}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`
                bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm
                ${showBorder ? `border ${colors.border}` : ''}
                ${showHover ? `${colors.hoverBg} transition-all duration-200 cursor-pointer` : ''}
                relative group
              `}
            >
              {/* Badge */}
              {feature.badge && (
                <div className={`
                  absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-semibold
                  ${colors.background} ${colors.iconColor}
                `}>
                  {feature.badge}
                </div>
              )}

              {/* Icon */}
              <div className={`
                w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center mb-4
                group-hover:scale-110 transition-transform duration-200
              `}>
                <div className={colors.iconColor}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Stats */}
              {feature.stats && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {feature.stats.value}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {feature.stats.label}
                    </span>
                  </div>
                </div>
              )}

              {/* Link Arrow */}
              {feature.link && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg className={`w-5 h-5 ${colors.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
