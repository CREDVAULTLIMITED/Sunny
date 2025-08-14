'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BuildingOfficeIcon,
  AcademicCapIcon,
  TrophyIcon,
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { teamMembers, advisors } from '@/data/team';

export function LeadershipTeam() {
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
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05, y: -5 }
  };



  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
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
            <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400">
              Leadership Team
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Founding team with diverse expertise in fintech, technology, operations, 
              and security, united by a shared vision to democratize global payments
            </p>
          </motion.div>

          {/* Leadership Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {teamMembers.map((leader, index) => (
              <motion.div
                key={leader.id}
                variants={cardVariants}
                whileHover="hover"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/team/${leader.id}`}>
                  <Card className="p-6 h-full bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div className="space-y-4">
                    {/* Profile Image */}
                    <div className="relative">
                      <motion.div
                        className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-white font-bold text-2xl">
                          {leader.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </motion.div>
                    </div>

                    {/* Basic Info */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {leader.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                        {leader.role}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {leader.bio}
                      </p>
                    </div>

                    {/* Education */}
                    <motion.div
                      className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <AcademicCapIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {leader.education}
                      </span>
                    </motion.div>

                    {/* Previous Roles */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <BuildingOfficeIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Previous Roles
                        </span>
                      </div>
                      <div className="space-y-1">
                        {leader.previousRoles.slice(0, 2).map((role, roleIndex) => (
                          <div key={roleIndex} className="text-xs text-gray-600 dark:text-gray-400">
                            • {role}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <TrophyIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Key Achievements
                        </span>
                      </div>
                      <div className="space-y-1">
                        {leader.achievements.slice(0, 2).map((achievement, achIndex) => (
                          <div key={achIndex} className="text-xs text-gray-600 dark:text-gray-400">
                            • {achievement}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.slice(0, 3).map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 text-xs rounded-full"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.1 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                      {leader.expertise.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          +{leader.expertise.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* View More Button */}
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        <span className="text-sm font-medium">View Full Profile</span>
                        <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Advisory Board */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Advisory Board
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                World-class advisors who guide our strategic vision and growth
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {advisors.map((advisor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="p-6 text-center bg-white dark:bg-gray-900 hover:shadow-lg transition-all">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-white font-bold text-lg">
                        {advisor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </motion.div>
                    
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {advisor.name}
                    </h4>
                    
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {advisor.company}
                    </p>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {advisor.expertise}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Stats */}
          <motion.div
            className="mt-20"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-8">
                Our Growing Team
              </h3>
              
              <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <UserGroupIcon className="w-8 h-8 mx-auto mb-2 opacity-90" />
                  <div className="text-3xl font-bold mb-1">3</div>
                  <div className="opacity-90">Founding Members</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <BuildingOfficeIcon className="w-8 h-8 mx-auto mb-2 opacity-90" />
                  <div className="text-3xl font-bold mb-1">3</div>
                  <div className="opacity-90">Core Disciplines</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <AcademicCapIcon className="w-8 h-8 mx-auto mb-2 opacity-90" />
                  <div className="text-3xl font-bold mb-1">Multi</div>
                  <div className="opacity-90">Industry Experience</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <TrophyIcon className="w-8 h-8 mx-auto mb-2 opacity-90" />
                  <div className="text-3xl font-bold mb-1">2025</div>
                  <div className="opacity-90">Launch Ready</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
