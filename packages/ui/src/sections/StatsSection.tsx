import React from 'react';

export interface Stat {
  id: string;
  value: string;
  label: string;
  description?: string;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
}

export interface StatsSectionProps {
  variant: 'user' | 'business' | 'institution' | 'admin' | 'developer';
  title?: string;
  subtitle?: string;
  stats: Stat[];
  layout?: 'horizontal' | 'grid';
  showTrends?: boolean;
  showIcons?: boolean;
  backgroundVariant?: 'light' | 'dark' | 'gradient';
  className?: string;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  variant,
  title,
  subtitle,
  stats,
  layout = 'horizontal',
  showTrends = true,
  showIcons = false,
  backgroundVariant = 'light',
  className = '',
}) => {
  const getVariantColors = () => {
    switch (variant) {
      case 'user':
        return {
          accent: 'text-blue-600 dark:text-blue-400',
          background: 'bg-blue-50 dark:bg-blue-900/10',
          gradient: 'from-blue-600 to-purple-600',
          trend: {
            up: 'text-green-600 bg-green-100 dark:bg-green-900/20',
            down: 'text-red-600 bg-red-100 dark:bg-red-900/20',
            neutral: 'text-gray-600 bg-gray-100 dark:bg-gray-700',
          },
        };
      case 'business':
        return {
          accent: 'text-emerald-600 dark:text-emerald-400',
          background: 'bg-emerald-50 dark:bg-emerald-900/10',
          gradient: 'from-emerald-600 to-green-600',
          trend: {
            up: 'text-green-600 bg-green-100 dark:bg-green-900/20',
            down: 'text-red-600 bg-red-100 dark:bg-red-900/20',
            neutral: 'text-gray-600 bg-gray-100 dark:bg-gray-700',
          },
        };
      case 'institution':
        return {
          accent: 'text-slate-600 dark:text-slate-400',
          background: 'bg-slate-50 dark:bg-slate-900/10',
          gradient: 'from-slate-700 to-gray-700',
          trend: {
            up: 'text-green-600 bg-green-100 dark:bg-green-900/20',
            down: 'text-red-600 bg-red-100 dark:bg-red-900/20',
            neutral: 'text-gray-600 bg-gray-100 dark:bg-gray-700',
          },
        };
      case 'admin':
        return {
          accent: 'text-red-600 dark:text-red-400',
          background: 'bg-red-50 dark:bg-red-900/10',
          gradient: 'from-red-600 to-rose-600',
          trend: {
            up: 'text-green-600 bg-green-100 dark:bg-green-900/20',
            down: 'text-red-600 bg-red-100 dark:bg-red-900/20',
            neutral: 'text-gray-600 bg-gray-100 dark:bg-gray-700',
          },
        };
      case 'developer':
        return {
          accent: 'text-purple-600 dark:text-purple-400',
          background: 'bg-purple-50 dark:bg-purple-900/10',
          gradient: 'from-purple-600 to-violet-600',
          trend: {
            up: 'text-green-600 bg-green-100 dark:bg-green-900/20',
            down: 'text-red-600 bg-red-100 dark:bg-red-900/20',
            neutral: 'text-gray-600 bg-gray-100 dark:bg-gray-700',
          },
        };
      default:
        return {
          accent: 'text-gray-600 dark:text-gray-400',
          background: 'bg-gray-50 dark:bg-gray-900/10',
          gradient: 'from-gray-600 to-slate-600',
          trend: {
            up: 'text-green-600 bg-green-100 dark:bg-green-900/20',
            down: 'text-red-600 bg-red-100 dark:bg-red-900/20',
            neutral: 'text-gray-600 bg-gray-100 dark:bg-gray-700',
          },
        };
    }
  };

  const colors = getVariantColors();

  const getBackgroundClass = () => {
    switch (backgroundVariant) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'gradient':
        return `bg-gradient-to-r ${colors.gradient} text-white`;
      default:
        return colors.background;
    }
  };

  const getLayoutClass = () => {
    if (layout === 'grid') {
      return stats.length <= 2 
        ? 'grid grid-cols-1 md:grid-cols-2 gap-8'
        : stats.length <= 4
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
        : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8';
    }
    return `flex flex-col md:flex-row justify-between items-center gap-8 divide-y md:divide-y-0 md:divide-x ${backgroundVariant === 'gradient' ? 'divide-white/20' : 'divide-gray-200 dark:divide-gray-700'}`;
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7m0 0H7" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10m0 0h10" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" />
          </svg>
        );
    }
  };

  return (
    <section className={`py-16 md:py-20 ${getBackgroundClass()} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {subtitle && (
              <p className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
                backgroundVariant === 'gradient' ? 'text-white/80' : colors.accent
              }`}>
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                backgroundVariant === 'gradient' ? 'text-white' : 'text-gray-900 dark:text-white'
              }`}>
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Stats */}
        <div className={getLayoutClass()}>
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className={`
                text-center ${layout === 'horizontal' ? 'flex-1 pt-8 md:pt-0 first:pt-0' : ''}
                ${layout === 'horizontal' && index > 0 ? 'md:pl-8' : ''}
              `}
            >
              {/* Icon */}
              {showIcons && stat.icon && (
                <div className={`
                  w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center
                  ${backgroundVariant === 'gradient' ? 'bg-white/20' : colors.background}
                  ${backgroundVariant === 'gradient' ? 'text-white' : colors.accent}
                `}>
                  {stat.icon}
                </div>
              )}

              {/* Value */}
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                backgroundVariant === 'gradient' ? 'text-white' : 'text-gray-900 dark:text-white'
              }`}>
                {stat.value}
              </div>

              {/* Label */}
              <div className={`text-lg font-medium mb-1 ${
                backgroundVariant === 'gradient' ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {stat.label}
              </div>

              {/* Description */}
              {stat.description && (
                <div className={`text-sm ${
                  backgroundVariant === 'gradient' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {stat.description}
                </div>
              )}

              {/* Trend */}
              {showTrends && stat.trend && (
                <div className={`
                  inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-2
                  ${colors.trend[stat.trend.direction]}
                `}>
                  {getTrendIcon(stat.trend.direction)}
                  <span>{stat.trend.value > 0 ? '+' : ''}{stat.trend.value}%</span>
                  <span>{stat.trend.label}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
