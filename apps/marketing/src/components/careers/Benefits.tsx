'use client';

import { motion } from 'framer-motion';
import { 
  HeartIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  UsersIcon,
  ComputerDesktopIcon,
  TrophyIcon,
  SparklesIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

export function Benefits() {
  const benefitCategories = [
    {
      title: 'Health & Wellness',
      icon: HeartIcon,
      gradient: 'from-pink-500 to-rose-600',
      benefits: [
        {
          name: 'Comprehensive Health Insurance',
          description: 'Full medical, dental, and vision coverage for you and your family',
          icon: ShieldCheckIcon
        },
        {
          name: 'Mental Health Support',
          description: 'Access to counseling services and mental wellness programs',
          icon: HeartIcon
        },
        {
          name: 'Wellness Stipend',
          description: '$100/month for gym memberships, fitness apps, or wellness activities',
          icon: TrophyIcon
        }
      ]
    },
    {
      title: 'Financial Benefits',
      icon: CurrencyDollarIcon,
      gradient: 'from-green-500 to-emerald-600',
      benefits: [
        {
          name: 'Competitive Salary',
          description: 'Market-competitive compensation with regular reviews and adjustments',
          icon: BanknotesIcon
        },
        {
          name: 'Equity Package',
          description: 'Meaningful equity stake in the company with potential for significant upside',
          icon: TrophyIcon
        },
        {
          name: 'Performance Bonuses',
          description: 'Quarterly and annual bonuses based on individual and company performance',
          icon: SparklesIcon
        }
      ]
    },
    {
      title: 'Learning & Growth',
      icon: AcademicCapIcon,
      gradient: 'from-blue-500 to-cyan-600',
      benefits: [
        {
          name: 'Learning Budget',
          description: '$2,000 annual budget for courses, books, conferences, and certifications',
          icon: AcademicCapIcon
        },
        {
          name: 'Conference Attendance',
          description: 'Attend industry conferences and networking events with company support',
          icon: UsersIcon
        },
        {
          name: 'Mentorship Program',
          description: 'Paired mentorship with senior team members and industry experts',
          icon: SparklesIcon
        }
      ]
    },
    {
      title: 'Work Flexibility',
      icon: GlobeAltIcon,
      gradient: 'from-purple-500 to-indigo-600',
      benefits: [
        {
          name: 'Remote-First',
          description: 'Work from anywhere in the world with flexible hours and async collaboration',
          icon: GlobeAltIcon
        },
        {
          name: 'Unlimited PTO',
          description: 'Take time off when you need it with no arbitrary limits or accrual',
          icon: CalendarDaysIcon
        },
        {
          name: 'Home Office Setup',
          description: '$1,500 stipend for your home office equipment and setup',
          icon: ComputerDesktopIcon
        }
      ]
    },
    {
      title: 'Career Development',
      icon: RocketLaunchIcon,
      gradient: 'from-orange-500 to-red-600',
      benefits: [
        {
          name: 'Clear Career Paths',
          description: 'Well-defined promotion tracks with transparent criteria and expectations',
          icon: RocketLaunchIcon
        },
        {
          name: 'Internal Mobility',
          description: 'Opportunities to explore different roles and departments within the company',
          icon: UsersIcon
        },
        {
          name: 'Leadership Training',
          description: 'Leadership development programs for high-potential team members',
          icon: TrophyIcon
        }
      ]
    },
    {
      title: 'Unique Perks',
      icon: SparklesIcon,
      gradient: 'from-yellow-500 to-orange-600',
      benefits: [
        {
          name: 'Annual Team Retreat',
          description: 'All-expenses-paid team retreat to a exciting destination for team building',
          icon: GlobeAltIcon
        },
        {
          name: 'Innovation Time',
          description: '10% of your time to work on passion projects and explore new ideas',
          icon: SparklesIcon
        },
        {
          name: 'Early Access',
          description: 'First access to our products and features before they go live',
          icon: RocketLaunchIcon
        }
      ]
    }
  ];

  const companyStats = [
    { number: '100%', label: 'Remote Team', description: 'Work from anywhere' },
    { number: '$2K', label: 'Learning Budget', description: 'Annual per employee' },
    { number: '0%', label: 'Attrition Rate', description: 'We retain great people' },
    { number: '4.9/5', label: 'Employee Rating', description: 'Glassdoor equivalent' }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Benefits & Perks
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We believe in taking care of our team members with comprehensive benefits, 
            competitive compensation, and unique perks that support your personal and professional growth.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {benefitCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center`}>
                    <CategoryIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {category.benefits.map((benefit, benefitIndex) => {
                    const BenefitIcon = benefit.icon;
                    return (
                      <div key={benefitIndex} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BenefitIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {benefit.name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Why Our Team Loves Working Here
            </h3>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
              Don't just take our word for it – here are the numbers that show 
              how much our team members value their experience at Sunny Payments.
            </p>
            
            <div className="grid md:grid-cols-4 gap-8">
              {companyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm opacity-75">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Join Our Mission?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for exceptional people who want to make a meaningful 
            impact on the future of global payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-colors"
            >
              View Open Positions
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-950 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Learn About Our Culture
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
