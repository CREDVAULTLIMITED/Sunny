'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  SparklesIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export function CompanyStory() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const milestones = [
    {
      icon: SparklesIcon,
      year: 'Late 2024',
      title: 'The Vision',
      description: 'Founded with a vision to simplify global payments for businesses of all sizes.',
      color: 'blue'
    },
    {
      icon: RocketLaunchIcon,
      year: 'Q4 2024',
      title: 'Team Formation',
      description: 'Assembled core founding team with expertise in fintech, technology, and operations.',
      color: 'green'
    },
    {
      icon: GlobeAltIcon,
      year: 'Q1 2025',
      title: 'Platform Development',
      description: 'Building advanced payment infrastructure with global reach and enterprise security.',
      color: 'purple'
    },
    {
      icon: TrophyIcon,
      year: 'Q3 2025',
      title: 'Launch Preparation',
      description: 'Finalizing platform development and preparing for market launch.',
      color: 'orange'
    }
  ];

  const stats = [
    { number: '3', label: 'Founding Team Members', description: 'Expert leadership team' },
    { number: '190+', label: 'Target Countries', description: 'Global reach planned' },
    { number: '2025', label: 'Launch Year', description: 'Ready to transform payments' },
    { number: '<2min', label: 'Settlement Goal', description: 'Instant processing target' }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Story
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From a small startup with big dreams to a global payments platform 
              trusted by thousands of businesses worldwide
            </p>
          </motion.div>

          {/* Story Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Text Content */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                It Started with a Problem
              </h3>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p className="text-lg leading-relaxed">
                  Our founding team experienced firsthand the frustration of 
                  complex payment systems while working in fintech and trying to 
                  scale businesses globally. Existing solutions were either too 
                  expensive, too complicated, or simply didn't work in many countries.
                </p>
                
                <p className="text-lg leading-relaxed">
                  We envisioned a world where any business, regardless of size 
                  or location, could accept payments from anywhere in the world 
                  with just a few lines of code. This vision became Sunny Payments.
                </p>
                
                <p className="text-lg leading-relaxed">
                  As a pre-launch startup, we're building the infrastructure that 
                  will serve businesses across 190+ countries, with the goal of 
                  processing millions of transactions and helping entrepreneurs 
                  turn their dreams into reality.
                </p>
              </div>

              <motion.div
                className="flex items-center space-x-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Our Mission Continues
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Every day, we work to make payments simpler and more accessible
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div variants={imageVariants}>
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-20"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-2xl">S</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Sunny Payments
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Powering Global Commerce
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Journey Timeline */}
          <motion.div className="mb-20" variants={itemVariants}>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Journey
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Key milestones that shaped our growth and impact in the fintech industry
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                const colorMap = {
                  blue: 'from-blue-500 to-blue-600',
                  green: 'from-green-500 to-green-600',
                  purple: 'from-purple-500 to-purple-600',
                  orange: 'from-orange-500 to-orange-600'
                };
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.2,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 group">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${colorMap[milestone.color as keyof typeof colorMap]} rounded-full flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                      
                      <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        {milestone.year}
                      </div>
                      
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        {milestone.title}
                      </h4>
                      
                      <p className="text-gray-600 dark:text-gray-400">
                        {milestone.description}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-12">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  By the Numbers
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Our impact in the global payments ecosystem
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {stat.number}
                    </motion.div>
                    
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">
                      {stat.label}
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.description}
                    </div>
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
