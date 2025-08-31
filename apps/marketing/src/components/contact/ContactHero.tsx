'use client';

import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export function ContactHero() {
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

  const contactMethods = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      detail: 'Available 24/7',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      description: 'Send us a detailed message',
      detail: 'hello@sunnypayments.com',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      detail: '+254 700 000 000',
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  const stats = [
    { number: '<1hr', label: 'Response Time', description: 'Average email response' },
    { number: '24/7', label: 'Support', description: 'Always here to help' },
    { number: '99%', label: 'Satisfaction', description: 'Customer satisfaction rate' },
    { number: '3 min', label: 'Average Wait', description: 'Live chat response' }
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
              <HeartIcon className="w-4 h-4" />
              <span>We're Here to Help</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent mb-8"
            >
              Get in Touch
              <br />
              With Our Team
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Have questions about our payment platform? Need support with integration? 
              Want to explore partnership opportunities? We're here to help you succeed.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
                <ClockIcon className="w-5 h-5" />
                <span>Response within 1 hour</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
                <MapPinIcon className="w-5 h-5" />
                <span>Based in Kenya, serving globally</span>
              </div>
            </motion.div>
          </div>

          {/* Contact Methods */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="text-center p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {method.description}
                  </p>
                  <div className="text-blue-600 dark:text-blue-400 font-semibold">
                    {method.detail}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-2">
                Exceptional Support Experience
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                Our commitment to providing outstanding customer support has earned us 
                recognition as a trusted partner for businesses worldwide.
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
