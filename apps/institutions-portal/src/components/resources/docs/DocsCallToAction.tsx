'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../providers/ThemeProvider';
import {
  RocketLaunchIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function DocsCallToAction() {
  const { actualTheme } = useTheme();

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join the institutions already processing millions in payments with Sunny. 
            Get your institution set up in minutes with our comprehensive documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resources/docs/getting-started"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
            >
              <RocketLaunchIcon className="w-5 h-5 mr-2" />
              Quick Start Guide
            </Link>
            <Link
              href="/resources/docs/api"
              className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl"
            >
              <CodeBracketIcon className="w-5 h-5 mr-2" />
              Explore API
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
