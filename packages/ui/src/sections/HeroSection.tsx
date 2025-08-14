import React from 'react';
import { Button } from '../button';

export interface HeroSectionProps {
  variant: 'user' | 'business' | 'institution' | 'admin' | 'developer';
  title: string;
  subtitle: string;
  description?: string;
  primaryAction?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  backgroundImage?: string;
  showStats?: boolean;
  stats?: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  variant,
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  showStats = false,
  stats = [],
  className = '',
}) => {
  const getVariantColors = () => {
    switch (variant) {
      case 'user':
        return {
          gradient: 'from-blue-600 via-purple-600 to-indigo-600',
          accent: 'text-blue-400',
          button: 'bg-blue-600 hover:bg-blue-700',
        };
      case 'business':
        return {
          gradient: 'from-emerald-600 via-green-600 to-teal-600',
          accent: 'text-emerald-400',
          button: 'bg-emerald-600 hover:bg-emerald-700',
        };
      case 'institution':
        return {
          gradient: 'from-slate-700 via-gray-700 to-zinc-700',
          accent: 'text-slate-400',
          button: 'bg-slate-700 hover:bg-slate-800',
        };
      case 'admin':
        return {
          gradient: 'from-red-600 via-rose-600 to-pink-600',
          accent: 'text-red-400',
          button: 'bg-red-600 hover:bg-red-700',
        };
      case 'developer':
        return {
          gradient: 'from-purple-600 via-violet-600 to-indigo-600',
          accent: 'text-purple-400',
          button: 'bg-purple-600 hover:bg-purple-700',
        };
      default:
        return {
          gradient: 'from-gray-600 via-slate-600 to-zinc-600',
          accent: 'text-gray-400',
          button: 'bg-gray-600 hover:bg-gray-700',
        };
    }
  };

  const colors = getVariantColors();

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} mix-blend-multiply`} />
        {backgroundImage && (
          <img
            className="w-full h-full object-cover"
            src={backgroundImage}
            alt="Background"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="text-center">
            {/* Subtitle */}
            <p className={`text-sm font-semibold uppercase tracking-wide ${colors.accent} mb-4`}>
              {subtitle}
            </p>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {primaryAction && (
                <Button
                  className={`${colors.button} text-white px-8 py-3 text-lg font-semibold shadow-lg`}
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.text}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-semibold"
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.text}
                </Button>
              )}
            </div>

            {/* Stats */}
            {showStats && stats.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-lg font-medium text-gray-200 mb-1">
                      {stat.label}
                    </div>
                    {stat.description && (
                      <div className="text-sm text-gray-300">
                        {stat.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
