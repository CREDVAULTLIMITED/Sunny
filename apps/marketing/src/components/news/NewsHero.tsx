'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  NewspaperIcon,
  RssIcon,
  BellIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export function NewsHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const stats = [
    { number: '50+', label: 'Articles', description: 'Industry insights' },
    { number: '10K+', label: 'Readers', description: 'Monthly visitors' },
    { number: 'Weekly', label: 'Updates', description: 'Fresh content' },
    { number: '2025', label: 'Launch Year', description: 'Exciting journey ahead' }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Background Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20"
        animate={{
          y: [-10, 10, -10]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20"
        animate={{
          y: [-10, 10, -10]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 dark:bg-green-800 rounded-full opacity-20"
        animate={{
          y: [-10, 10, -10]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="container mx-auto px-6 relative">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Hero Content */}
          <div className="text-center mb-16">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <NewspaperIcon className="w-4 h-4" />
              <span>News & Updates</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent mb-8"
            >
              Stay Informed
              <br />
              Stay Ahead
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Get the latest insights, product updates, and industry trends from Sunny Payments. 
              Follow our journey as we build the future of global payment infrastructure.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <BellIcon className="w-5 h-5 mr-2" />
                Subscribe to Updates
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                <RssIcon className="w-5 h-5 mr-2" />
                RSS Feed
              </Button>
            </motion.div>
          </div>

          {/* Featured Categories */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Product Updates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Latest features, improvements, and platform developments
              </p>
            </div>

            <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <NewspaperIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Industry Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Trends, analysis, and thought leadership in payments
              </p>
            </div>

            <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <RssIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Company News</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Milestones, partnerships, and behind-the-scenes updates
              </p>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-2">
                Join Our Growing Community
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                Be part of a community that's passionate about the future of payments 
                and global commerce innovation.
              </p>
              
              <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="font-semibold mb-1">{stat.label}</div>
                    <div className="text-sm opacity-75">{stat.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
