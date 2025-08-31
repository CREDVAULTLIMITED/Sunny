'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeftIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  TrophyIcon,
  MapPinIcon,
  GlobeAltIcon,
  HeartIcon,
  CodeBracketIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  RocketLaunchIcon,
  SparklesIcon,
  UserCircleIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { LinkedInLogoIcon, TwitterLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { TeamMember } from '@/data/team';

interface TeamMemberProfileProps {
  teamMember: TeamMember;
}

export function TeamMemberProfile({ teamMember }: TeamMemberProfileProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20">
      <motion.div
        className="container mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            href="/about"
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Team</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          {/* Left: Profile Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <motion.div
                className="relative"
                variants={floatingVariants}
                animate="animate"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center relative overflow-hidden">
                  <span className="text-white font-bold text-4xl">
                    {teamMember.name.split(' ').map(n => n[0]).join('')}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>

              <div>
                <motion.h1
                  className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {teamMember.name}
                </motion.h1>
                <motion.p
                  className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {teamMember.role}
                </motion.p>

                <motion.div
                  className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-500/30"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-3" />
                  <p className="text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed">
                    "{teamMember.personalQuote}"
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                <CalendarDaysIcon className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {teamMember.yearsOfExperience}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                <MapPinIcon className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {teamMember.location}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Based in</div>
              </div>
            </motion.div>

            {/* Social Links */}
            {(teamMember.linkedIn || teamMember.twitter || teamMember.github || teamMember.email) && (
              <motion.div
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {teamMember.linkedIn && (
                  <a
                    href={teamMember.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${teamMember.name}'s LinkedIn profile`}
                    className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors group"
                  >
                    <LinkedInLogoIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}
                {teamMember.twitter && (
                  <a
                    href={teamMember.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${teamMember.name}'s Twitter profile`}
                    className="p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-colors group"
                  >
                    <TwitterLogoIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}
                {teamMember.github && (
                  <a
                    href={teamMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${teamMember.name}'s GitHub profile`}
                    className="p-3 bg-gray-800 hover:bg-gray-900 text-white rounded-xl transition-colors group"
                  >
                    <GitHubLogoIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}
                {teamMember.email && (
                  <a
                    href={`mailto:${teamMember.email}`}
                    aria-label={`Send email to ${teamMember.name}`}
                    className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors group"
                  >
                    <LinkIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}
              </motion.div>
            )}
          </div>

          {/* Right: Background Story */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <Card className="p-8 bg-gradient-to-br from-white/90 to-blue-50/90 dark:from-gray-800/90 dark:to-blue-900/30 backdrop-blur-sm border-2 border-blue-200/50 dark:border-blue-500/30">
              <UserCircleIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Background Story
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {teamMember.backgroundStory}
              </p>
            </Card>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-30"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Full Bio */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="p-8 h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <SparklesIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Professional Journey
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {teamMember.fullBio}
              </p>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200/50 dark:border-purple-500/30">
                <LightBulbIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Philosophy
                </h3>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  {teamMember.philosophy}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Skills & Education */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Education */}
            <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <AcademicCapIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Education</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{teamMember.education}</p>
            </Card>

            {/* Languages */}
            <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <GlobeAltIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {teamMember.languages.map((language, index) => (
                  <Badge
                    key={index}
                    className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Favorite Tools */}
            <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <CodeBracketIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Favorite Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {teamMember.favoriteTools.map((tool, index) => (
                  <Badge
                    key={index}
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Hobbies */}
            <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <HeartIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Interests</h3>
              </div>
              <div className="space-y-2">
                {teamMember.hobbies.map((hobby, index) => (
                  <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                    • {hobby}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Key Projects */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="text-center mb-12">
            <RocketLaunchIcon className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Key Projects & Achievements
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Notable contributions that showcase {teamMember.name.split(' ')[0]}'s impact and expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMember.keyProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <BriefcaseIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400">
                      {project.year}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200/50 dark:border-green-500/30">
                    <div className="text-sm font-medium text-green-800 dark:text-green-400 mb-1">
                      Impact:
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      {project.impact}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Working Style & Fun Facts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Working Style */}
          <motion.div variants={itemVariants}>
            <Card className="p-8 h-full bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <BuildingOfficeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Working Style
                </h2>
              </div>
              <div className="space-y-3">
                {teamMember.workingStyle.map((style, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                    <span className="text-gray-700 dark:text-gray-300">{style}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Fun Facts */}
          <motion.div variants={itemVariants}>
            <Card className="p-8 h-full bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <TrophyIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Fun Facts
                </h2>
              </div>
              <div className="space-y-4">
                {teamMember.funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{fact}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Vision & Contribution */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contribution to Sunny */}
            <Card className="p-8 bg-gradient-to-br from-green-50/80 to-blue-50/80 dark:from-green-900/20 dark:to-blue-900/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <SparklesIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Contribution to Sunny
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {teamMember.contributionToSunny}
              </p>
            </Card>

            {/* Vision for Company */}
            <Card className="p-8 bg-gradient-to-br from-purple-50/80 to-blue-50/80 dark:from-purple-900/20 dark:to-blue-900/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <RocketLaunchIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Vision for Sunny
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {teamMember.visionForCompany}
              </p>
            </Card>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Get in Touch with {teamMember.name.split(' ')[0]}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Have questions about {teamMember.name.split(' ')[0]}'s work or want to connect?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {teamMember.email && (
                <a
                  href={`mailto:${teamMember.email}`}
                  className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Send Email
                </a>
              )}
              <Link
                href="/about"
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                Meet the Team
              </Link>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  );
}
