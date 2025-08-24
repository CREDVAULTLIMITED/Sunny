'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../providers/ThemeProvider';
import {
  ArrowRightIcon,
  PlayCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  FeaturedContentType,
  DocsContentType
} from '@sunny/shared-types';

export default function FeaturedContent() {
  const { actualTheme } = useTheme();

  const featuredContent: FeaturedContentType[] = [
    {
      id: '1',
      title: 'M-Pesa Integration Made Simple',
      description: 'Complete guide to integrating Safaricom M-Pesa with your institution',
      type: DocsContentType.GUIDE,
      readTime: '20 min',
      href: '/resources/docs/integrations/mpesa',
      popular: true,
      image: '/images/mpesa-integration.jpg'
    },
    {
      id: '2',
      title: 'CBK Compliance Automation',
      description: 'Automate your Central Bank of Kenya regulatory reporting',
      type: DocsContentType.TUTORIAL,
      readTime: '45 min',
      href: '/resources/docs/compliance/cbk',
      new: true,
      image: '/images/cbk-compliance.jpg'
    },
    {
      id: '3',
      title: 'API Quick Start Video Series',
      description: 'Learn to integrate Sunny APIs in under 30 minutes',
      type: DocsContentType.VIDEO,
      readTime: '28 min',
      href: '/resources/docs/api/quickstart',
      popular: true,
      image: '/images/api-tutorial.jpg'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <motion.h2 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Featured Content
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Popular guides and tutorials to get you started quickly
            </motion.p>
          </div>
          <Link
            href="/resources/docs/featured"
            className="hidden sm:inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
          >
            View all content
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredContent.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Link href={content.href}>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200">
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center relative overflow-hidden">
                    <div className="text-6xl opacity-20">
                      {content.type === DocsContentType.VIDEO ? '📹' : content.type === DocsContentType.TUTORIAL ? '🎯' : '📖'}
                    </div>
                    {content.type === DocsContentType.VIDEO && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <PlayCircleIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {content.popular && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
                          Popular
                        </span>
                      )}
                      {content.new && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{content.type}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {content.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      {content.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {content.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
