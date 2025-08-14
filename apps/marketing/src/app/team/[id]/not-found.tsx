'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserGroupIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function TeamMemberNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 flex items-center justify-center">
      <div className="text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <UserGroupIcon className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Team Member Not Found
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Sorry, we couldn't find the team member you're looking for. 
            They might have moved to a different role or the link might be outdated.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Team</span>
            </Link>
            
            <div>
              <Link
                href="/"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
