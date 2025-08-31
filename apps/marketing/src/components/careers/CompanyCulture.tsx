'use client';

import { motion } from 'framer-motion';
import { 
  HeartIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  LightBulbIcon,
  UsersIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

export function CompanyCulture() {
  const cultureValues = [
    {
      icon: HeartIcon,
      title: 'People First',
      description: 'We believe great products come from great people. We invest in our team\'s growth, well-being, and success.',
      gradient: 'from-pink-500 to-rose-600',
      benefits: ['Mental health support', 'Professional development', 'Work-life balance', 'Inclusive environment']
    },
    {
      icon: RocketLaunchIcon,
      title: 'Move Fast, Think Big',
      description: 'We move quickly but thoughtfully, making bold decisions that drive meaningful impact at global scale.',
      gradient: 'from-blue-500 to-cyan-600',
      benefits: ['Rapid iteration', 'Ownership mindset', 'Bold vision', 'Quick decisions']
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation Mindset',
      description: 'We challenge the status quo and constantly seek better ways to solve complex payment challenges.',
      gradient: 'from-yellow-500 to-orange-600',
      benefits: ['Creative freedom', 'Experimentation', 'Learning culture', 'Cutting-edge tech']
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Impact',
      description: 'Everything we build has the potential to impact millions of businesses and billions of people worldwide.',
      gradient: 'from-green-500 to-emerald-600',
      benefits: ['Meaningful work', 'Global reach', 'Social impact', 'Market transformation']
    },
    {
      icon: ShieldCheckIcon,
      title: 'Trust & Transparency',
      description: 'We build trust through radical transparency, open communication, and ethical business practices.',
      gradient: 'from-purple-500 to-indigo-600',
      benefits: ['Open communication', 'Ethical practices', 'Honest feedback', 'Transparent processes']
    },
    {
      icon: BoltIcon,
      title: 'Excellence & Growth',
      description: 'We strive for excellence in everything we do while maintaining a growth mindset and learning from failures.',
      gradient: 'from-orange-500 to-red-600',
      benefits: ['High standards', 'Continuous learning', 'Growth opportunities', 'Skill development']
    }
  ];

  const workLifeFeatures = [
    {
      icon: UsersIcon,
      title: 'Remote-First Culture',
      description: 'Work from anywhere with flexible hours and async collaboration tools.',
      stats: ['100% Remote', 'Flexible Hours', 'Global Team']
    },
    {
      icon: SparklesIcon,
      title: 'Learning & Development',
      description: 'Continuous learning budget, conference attendance, and skill development programs.',
      stats: ['$2,000 Learning Budget', 'Conference Attendance', 'Skill Workshops']
    },
    {
      icon: HeartIcon,
      title: 'Health & Wellness',
      description: 'Comprehensive health coverage, mental health support, and wellness programs.',
      stats: ['Health Insurance', 'Mental Health Support', 'Wellness Programs']
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Our Culture & Values
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're building more than just a payment platform – we're creating a culture 
            where innovation thrives, people grow, and everyone can make a meaningful impact.
          </p>
        </motion.div>

        {/* Core Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {cultureValues.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {value.description}
                </p>
                
                <div className="space-y-2">
                  {value.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Work-Life Balance Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Work-Life Integration
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We believe in creating an environment where you can do your best work 
              while maintaining a healthy and fulfilling life outside of work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {workLifeFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-2">
                    {feature.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                        {stat}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl font-medium text-gray-900 dark:text-white mb-8 leading-relaxed">
              "We're not just building a company – we're building a movement. Every person 
              who joins us becomes part of a mission to democratize global commerce and 
              create opportunities for businesses everywhere."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SM</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">Samuel Mbugua</div>
                <div className="text-gray-600 dark:text-gray-300">Chairperson, CTO & CFO</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
