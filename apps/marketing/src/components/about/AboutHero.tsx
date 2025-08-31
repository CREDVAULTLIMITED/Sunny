'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  GlobeAltIcon,
  HeartIcon,
  LightBulbIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

export function AboutHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1]
    }
  };

  const values = [
    {
      icon: GlobeAltIcon,
      title: 'Global Impact',
      description: 'Connecting 190+ countries through seamless payments'
    },
    {
      icon: HeartIcon,
      title: 'Customer First',
      description: 'Every decision starts with our customers\' needs'
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'Pioneering the future of financial technology'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Growth',
      description: 'Empowering businesses to scale without limits'
    }
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
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div variants={itemVariants}>
              <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400">
                About Sunny Payments
              </Badge>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              variants={itemVariants}
            >
              Building the{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Future
              </span>
              <br />
              of Global Payments
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8"
              variants={itemVariants}
            >
              We're on a mission to democratize global finance by making payments 
              simple, secure, and accessible for everyone, everywhere. As a pre-launch 
              fintech startup, we're building the next generation of payment infrastructure 
              from the ground up.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Join Our Mission
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Meet the Team
              </Button>
            </motion.div>
          </div>

          {/* Mission Statement */}
          <motion.div
            className="mb-20"
            variants={itemVariants}
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  "To create a world where financial barriers don't exist, where every 
                  business can accept payments from anywhere, and where innovation drives 
                  financial inclusion for all."
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                These principles guide everything we do, from product development 
                to customer relationships
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                
                return (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.8 + (index * 0.1),
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Vision Statement */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Our Vision for 2030
                </h2>
                <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                  To be the world's most trusted payment infrastructure, connecting 
                  businesses globally with seamless, secure, and innovative payment 
                  solutions that remove barriers to international commerce.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-bold mb-2">2025</div>
                    <div className="opacity-90">Launch Year</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-bold mb-2">190+</div>
                    <div className="opacity-90">Target Countries</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="opacity-90">Global Support</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
