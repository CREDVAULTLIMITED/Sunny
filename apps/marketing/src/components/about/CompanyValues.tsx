'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  HeartIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  UsersIcon,
  RocketLaunchIcon,
  SparklesIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline';

export function CompanyValues() {
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

  const values = [
    {
      icon: HeartIcon,
      title: 'Customer Obsession',
      description: 'Every decision starts with our customers. We listen, learn, and build solutions that truly matter.',
      principles: [
        'Listen to customer feedback daily',
        'Measure success by customer satisfaction',
        'Go above and beyond to solve problems',
        'Build products customers love to use'
      ],
      color: 'red',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation First',
      description: 'We challenge the status quo and pioneer new ways to make payments better for everyone.',
      principles: [
        'Embrace new technologies and ideas',
        'Experiment and learn from failures',
        'Think beyond current limitations',
        'Create solutions that don\'t exist yet'
      ],
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Trust & Security',
      description: 'We earn trust through transparency, reliability, and unwavering commitment to security.',
      principles: [
        'Maintain the highest security standards',
        'Be transparent in all communications',
        'Keep promises and deliver on time',
        'Protect customer data as our own'
      ],
      color: 'green',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Impact',
      description: 'We think globally and act locally, creating positive change in communities worldwide.',
      principles: [
        'Consider global implications of decisions',
        'Respect local cultures and customs',
        'Enable financial inclusion everywhere',
        'Reduce barriers to global commerce'
      ],
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: UsersIcon,
      title: 'Team Excellence',
      description: 'We hire the best, support each other, and create an environment where everyone thrives.',
      principles: [
        'Hire for potential and passion',
        'Invest in continuous learning',
        'Celebrate diverse perspectives',
        'Support work-life balance'
      ],
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Bias for Action',
      description: 'We move fast, make decisions quickly, and iterate based on real-world feedback.',
      principles: [
        'Prefer action over endless planning',
        'Make reversible decisions quickly',
        'Learn by doing and building',
        'Embrace calculated risks'
      ],
      color: 'orange',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const culture = [
    {
      icon: SparklesIcon,
      title: 'Innovation Culture',
      description: '20% time for personal projects, hackathons, and experimental features',
      stats: '50+ internal projects launched'
    },
    {
      icon: HandRaisedIcon,
      title: 'Inclusive Environment',
      description: 'Diverse team from 25+ countries with equal opportunity and representation',
      stats: '45% women in leadership'
    },
    {
      icon: GlobeAltIcon,
      title: 'Remote-First',
      description: 'Flexible work arrangements with global talent and local impact',
      stats: '15+ countries represented'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Growth Mindset',
      description: 'Continuous learning budget and career development for every team member',
      stats: '$5K annual learning budget'
    }
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
                Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              These core values guide our decisions, shape our culture, and define 
              how we work together to achieve our mission
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="p-8 h-full bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group">
                    <div className="space-y-6">
                      {/* Icon */}
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {value.description}
                        </p>
                      </div>

                      {/* Principles */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                          How We Live This
                        </h4>
                        <div className="space-y-2">
                          {value.principles.map((principle, principleIndex) => (
                            <motion.div
                              key={principleIndex}
                              className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ 
                                duration: 0.4, 
                                delay: 0.5 + (index * 0.1) + (principleIndex * 0.05)
                              }}
                              viewport={{ once: true }}
                            >
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                              <span>{principle}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Culture Section */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Culture in Action
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                See how our values translate into a thriving, inclusive workplace 
                where everyone can do their best work
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {culture.map((item, index) => {
                const ItemIconComponent = item.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="p-6 text-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 hover:shadow-lg transition-all">
                      <motion.div
                        className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <ItemIconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h4>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <motion.div
                        className="text-blue-600 dark:text-blue-400 font-semibold text-sm"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {item.stats}
                      </motion.div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Values in Practice */}
          <motion.div
            className="mt-20"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Values in Practice
                </h3>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  Real examples of how our values drive decisions and shape our impact
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl mb-4">🌍</div>
                  <h4 className="text-lg font-semibold mb-2">Global Impact</h4>
                  <p className="opacity-90 text-sm">
                    Enabled $2B+ in cross-border transactions for small businesses in emerging markets
                  </p>
                </motion.div>
                
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl mb-4">🔒</div>
                  <h4 className="text-lg font-semibold mb-2">Trust & Security</h4>
                  <p className="opacity-90 text-sm">
                    Zero security breaches and 99.99% uptime since launch, protecting millions of transactions
                  </p>
                </motion.div>
                
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl mb-4">💡</div>
                  <h4 className="text-lg font-semibold mb-2">Innovation First</h4>
                  <p className="opacity-90 text-sm">
                    Launched 15+ industry-first features including voice payments and IoT transactions
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
