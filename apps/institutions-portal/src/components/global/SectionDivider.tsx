'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'wave' | 'dots' | 'zigzag' | 'gradient';
  color?: 'green' | 'blue' | 'purple' | 'orange' | 'pink' | 'teal';
  className?: string;
}

export default function SectionDivider({ 
  variant = 'wave', 
  color = 'green',
  className = '' 
}: SectionDividerProps) {
  const colorClasses = {
    green: 'from-green-400 via-emerald-500 to-green-600',
    blue: 'from-blue-400 via-cyan-500 to-blue-600',
    purple: 'from-purple-400 via-violet-500 to-purple-600',
    orange: 'from-orange-400 via-red-500 to-pink-500',
    pink: 'from-pink-400 via-rose-500 to-pink-600',
    teal: 'from-teal-400 via-cyan-500 to-teal-600'
  };

  if (variant === 'wave') {
    return (
      <div className={`relative h-8 overflow-hidden ${className}`}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${colorClasses[color]} opacity-20 rounded-full origin-left`}
        />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex justify-center items-center py-8 ${className}`}>
        <div className="flex space-x-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`w-3 h-3 rounded-full bg-gradient-to-r ${colorClasses[color]} opacity-60`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={`h-1 w-full my-8 ${className}`}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${colorClasses[color]} opacity-30 origin-left`}
        />
      </div>
    );
  }

  // Default zigzag - simplified to dots
  return (
    <div className={`flex justify-center items-center py-6 ${className}`}>
      <div className="flex space-x-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorClasses[color]} opacity-50`}
          />
        ))}
      </div>
    </div>
  );
}
