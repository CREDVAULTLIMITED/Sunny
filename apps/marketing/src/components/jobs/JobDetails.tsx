'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { 
  CheckIcon,
  StarIcon,
  LightBulbIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

interface JobDetailsProps {
  job: {
    id: number;
    title: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave: string[];
    skills: string[];
    benefits: string[];
    team: {
      size: string;
      description: string;
      workingWith: string[];
    };
    growth: {
      opportunities: string[];
      mentorship: string;
      training: string[];
    };
  };
}

export function JobDetails({ job }: JobDetailsProps) {
  const sections = [
    {
      id: 'responsibilities',
      title: 'Key Responsibilities',
      icon: BriefcaseIcon,
      content: job.responsibilities,
      description: 'What you\'ll be working on day-to-day'
    },
    {
      id: 'requirements',
      title: 'Requirements',
      icon: CheckIcon,
      content: job.requirements,
      description: 'What we\'re looking for in an ideal candidate'
    },
    {
      id: 'nice-to-have',
      title: 'Nice to Have',
      icon: StarIcon,
      content: job.niceToHave,
      description: 'Additional qualifications that would be great'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {section.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {section.content.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: itemIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}

              {/* Skills Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <LightBulbIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Key Skills & Technologies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Technologies and skills you'll be working with
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {job.skills.map((skill) => (
                    <Badge key={skill} className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Team Information */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <UserGroupIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Your Team
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">
                      Team Size
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {job.team.size}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white mb-2">
                      Team Description
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {job.team.description}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white mb-2">
                      You'll Work With
                    </div>
                    <div className="space-y-2">
                      {job.team.workingWith.map((role, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Growth & Development */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <AcademicCapIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Growth & Learning
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white mb-2">
                      Growth Opportunities
                    </div>
                    <div className="space-y-2">
                      {job.growth.opportunities.map((opportunity, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{opportunity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">
                      Mentorship
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {job.growth.mentorship}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white mb-2">
                      Training & Development
                    </div>
                    <div className="space-y-2">
                      {job.growth.training.map((training, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{training}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Benefits Preview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Key Benefits
                </h3>
                <div className="space-y-2">
                  {job.benefits.slice(0, 5).map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                  {job.benefits.length > 5 && (
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      +{job.benefits.length - 5} more benefits
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
