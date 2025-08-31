'use client';

import { motion } from 'framer-motion';
import { 
  NewspaperIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface ArticlesHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: Array<{ id: string; name: string; count: number }>;
}

export function ArticlesHero({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  categories 
}: ArticlesHeroProps) {
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
    { number: '50+', label: 'Articles', description: 'In-depth content' },
    { number: '6', label: 'Categories', description: 'Diverse topics' },
    { number: '10K+', label: 'Readers', description: 'Monthly visitors' },
    { number: 'Weekly', label: 'Updates', description: 'Fresh content' }
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

      <div className="container mx-auto px-6 relative">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Hero Content */}
          <div className="text-center mb-12">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <NewspaperIcon className="w-4 h-4" />
              <span>All Articles</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent mb-6"
            >
              Explore Our Insights
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Dive deep into payment technology, fintech trends, and our journey building 
              the future of global commerce. Find exactly what you're looking for.
            </motion.p>
          </div>

          {/* Search and Filter Section */}
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto mb-12"
          >
            {/* Search Bar */}
            <div className="relative mb-8">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <FunnelIcon className="w-5 h-5" />
                <span className="font-medium">Filter by:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <SparklesIcon className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Our Knowledge Hub</h2>
              </div>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Comprehensive insights from our team of payment experts, engineers, and industry leaders.
              </p>
              
              <div className="grid md:grid-cols-4 gap-8">
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
