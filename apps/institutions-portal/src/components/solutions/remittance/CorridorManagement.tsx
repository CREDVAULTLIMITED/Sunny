'use client';

import React from 'react';
import { motion } from 'framer-motion';

const corridorRegions = [
  {
    region: 'Africa',
    countries: 54,
    volume: '$45B',
    corridors: [
      { from: 'USA', to: 'Nigeria', volume: '$6.1B', fee: '2.8%' },
      { from: 'UK', to: 'Kenya', volume: '$2.3B', fee: '3.2%' },
      { from: 'Canada', to: 'Ghana', volume: '$1.8B', fee: '2.9%' },
      { from: 'Germany', to: 'Ethiopia', volume: '$1.2B', fee: '3.5%' }
    ],
    color: 'from-pink-500 to-rose-500'
  },
  {
    region: 'Asia',
    countries: 48,
    volume: '$150B',
    corridors: [
      { from: 'UAE', to: 'India', volume: '$18.5B', fee: '1.8%' },
      { from: 'Saudi', to: 'Philippines', volume: '$9.2B', fee: '2.1%' },
      { from: 'Qatar', to: 'Bangladesh', volume: '$7.8B', fee: '2.3%' },
      { from: 'Kuwait', to: 'Pakistan', volume: '$5.4B', fee: '2.0%' }
    ],
    color: 'from-rose-500 to-pink-500'
  },
  {
    region: 'Americas',
    countries: 35,
    volume: '$95B',
    corridors: [
      { from: 'USA', to: 'Mexico', volume: '$36.4B', fee: '2.5%' },
      { from: 'USA', to: 'Guatemala', volume: '$8.9B', fee: '3.1%' },
      { from: 'Spain', to: 'Colombia', volume: '$3.7B', fee: '2.9%' },
      { from: 'USA', to: 'El Salvador', volume: '$5.2B', fee: '3.0%' }
    ],
    color: 'from-pink-600 to-red-500'
  }
];

const managementTools = [
  {
    title: 'Corridor Configuration',
    description: 'Dynamic corridor setup with route optimization and compliance mapping',
    features: [
      'Real-time corridor status',
      'Route optimization',
      'Compliance mapping',
      'Performance monitoring'
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: 'Liquidity Management',
    description: 'Automated liquidity optimization across all payment corridors',
    features: [
      'Real-time liquidity pools',
      'Automated rebalancing',
      'Nostro optimization',
      'Cash flow forecasting'
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    title: 'Rate Management',
    description: 'Dynamic pricing and FX rate management with profit optimization',
    features: [
      'Dynamic pricing models',
      'FX rate management',
      'Profit optimization',
      'Competitive analysis'
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    )
  },
  {
    title: 'Network Analytics',
    description: 'Comprehensive analytics and reporting across all corridors',
    features: [
      'Real-time analytics',
      'Performance dashboards',
      'Trend analysis',
      'Regulatory reporting'
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
];

const networkMetrics = [
  {
    title: 'Global Reach',
    metrics: [
      { value: "150+", label: "Payment Corridors", icon: "🌍" },
      { value: "95%", label: "Population Coverage", icon: "👥" },
      { value: "$290B", label: "Annual Volume", icon: "💰" },
      { value: "50+", label: "Settlement Partners", icon: "🏦" }
    ]
  },
  {
    title: 'Performance Excellence',
    metrics: [
      { value: "99.9%", label: "Corridor Uptime", icon: "⚡" },
      { value: "2 min", label: "Average Transfer", icon: "⏱️" },
      { value: "0.5%", label: "FX Spread", icon: "💱" },
      { value: "24/7", label: "Settlement", icon: "🔄" }
    ]
  }
];

export default function CorridorManagement() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-sm font-semibold uppercase tracking-wide text-pink-600 dark:text-pink-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            🌐 Corridor Management
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Global Payment Corridor Network
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Comprehensive corridor management with real-time monitoring, dynamic optimization, 
            and automated liquidity management across 150+ global payment routes.
          </motion.p>
        </motion.div>

        {/* Corridor Regions */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {corridorRegions.map((region, index) => (
            <motion.div
              key={region.region}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Region Header */}
              <div className="text-center mb-6">
                <div className={`w-20 h-20 bg-gradient-to-br ${region.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-2xl">{region.region[0]}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {region.region}
                </h3>
                <div className="flex justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{region.countries} Countries</span>
                  <span>•</span>
                  <span>{region.volume} Volume</span>
                </div>
              </div>

              {/* Top Corridors */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
                  Top Corridors:
                </h4>
                {region.corridors.map((corridor, corridorIndex) => (
                  <div key={corridorIndex} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {corridor.from} → {corridor.to}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {corridor.volume} annual
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-pink-600 dark:text-pink-400 font-semibold text-sm">
                        {corridor.fee}
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        avg. fee
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Management Tools */}
        <motion.div
          className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-pink-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Corridor Management Tools
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive tools for managing and optimizing your global payment corridor network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {managementTools.map((tool, index) => (
              <motion.div
                key={tool.title}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                    <div className="text-pink-600 dark:text-pink-400">
                      {tool.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {tool.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {tool.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      {tool.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <svg className="w-3 h-3 mr-2 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Network Metrics */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Global Network Performance
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Real-time metrics showcasing our global payment corridor network performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {networkMetrics.map((category, index) => (
              <motion.div
                key={category.title}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
                  {category.title}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {category.metrics.map((metric, metricIndex) => (
                    <motion.div
                      key={metric.label}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + metricIndex * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -3 }}
                    >
                      <div className="text-2xl mb-2">{metric.icon}</div>
                      <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.button 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Manage Corridors
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
