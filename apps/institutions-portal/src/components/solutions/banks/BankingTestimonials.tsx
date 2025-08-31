'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 'equity-bank',
    quote: "Sunny's banking infrastructure has transformed our payment processing capabilities. The seamless RTGS integration and real-time settlement have significantly improved our operational efficiency.",
    author: "Sarah Mwangi",
    position: "Head of Digital Payments",
    company: "Leading Commercial Bank",
    avatar: "SM",
    stats: {
      improvement: "40% faster processing",
      uptime: "99.99% uptime achieved"
    },
    color: "blue"
  },
  {
    id: 'cooperative-bank',
    quote: "The compliance automation features have been game-changing for our regulatory reporting. What used to take days now happens automatically, and we have complete confidence in our CBK submissions.",
    author: "Michael Kiprotich",
    position: "Chief Risk Officer",
    company: "Premier Cooperative Bank",
    avatar: "MK",
    stats: {
      improvement: "90% reduction in reporting time",
      uptime: "100% compliance rate"
    },
    color: "green"
  },
  {
    id: 'development-bank',
    quote: "Sunny's core banking integration capabilities are exceptional. The T24 connectivity was seamless, and the multi-channel support has enhanced our customer experience across all touchpoints.",
    author: "Grace Wanjiku",
    position: "IT Director",
    company: "Development Finance Institution",
    avatar: "GW",
    stats: {
      improvement: "300% increase in transaction volume",
      uptime: "Zero integration downtime"
    },
    color: "purple"
  }
];

const clientLogos = [
  { name: "Equity Bank", logo: "EB", description: "Leading commercial bank in East Africa" },
  { name: "KCB Group", logo: "KCB", description: "Largest bank in Kenya by assets" },
  { name: "Co-operative Bank", logo: "COOP", description: "Leading cooperative financial institution" },
  { name: "NCBA Bank", logo: "NCBA", description: "Premier commercial bank" },
  { name: "Absa Bank", logo: "ABSA", description: "International banking group" },
  { name: "Standard Chartered", logo: "SC", description: "Global banking corporation" }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: any, index: number }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {/* Quote */}
      <div className="mb-6">
        <svg className="w-8 h-8 text-gray-300 dark:text-gray-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.78-3.018.68-1.062 1.855-1.816 3.525-2.263l.455-1.518c-2.162.518-3.94 1.614-5.333 3.287C5.777 10.438 5.101 12.3 5.101 14.408c0 1.555.647 2.804 1.942 3.744 1.295.94 2.553 1.41 3.774 1.41.914 0 1.729-.322 2.446-.966.717-.644 1.075-1.548 1.075-2.712l.854.073z"/>
        </svg>
        <blockquote className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
          "{testimonial.quote}"
        </blockquote>
      </div>

      {/* Author */}
      <div className="flex items-center mb-6">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[testimonial.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center text-white font-bold text-sm mr-4`}>
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {testimonial.author}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {testimonial.position}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-500">
            {testimonial.company}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {testimonial.stats.improvement}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Performance Improvement
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {testimonial.stats.uptime}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Reliability Metric
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function BankingTestimonials() {
  return (
    <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            💬 Client Success Stories
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Trusted by Leading Banks
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            See how leading commercial banks across Kenya have transformed their payment infrastructure 
            and improved operational efficiency with Sunny's banking solutions.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index}
            />
          ))}
        </div>

        {/* Client Logos */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Powering Kenya's Leading Financial Institutions
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join the growing network of banks that trust Sunny for their payment infrastructure
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                className="flex flex-col items-center group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors duration-200">
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-bold text-sm transition-colors duration-200">
                    {client.logo}
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {client.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {client.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.button 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Case Studies
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-blue-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Join These Success Stories?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Schedule a consultation to see how Sunny can transform your bank's payment infrastructure 
              and deliver measurable improvements in efficiency and customer satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.button>
              <motion.button 
                className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Demo
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-6 0V9a3 3 0 013-3h0a3 3 0 013 3v5.172a4 4 0 01-1.172 2.828z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
