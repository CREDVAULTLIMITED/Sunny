'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 'faulu-mfi',
    quote: "Sunny's microfinance platform has revolutionized our group lending operations. The impact measurement tools have helped us demonstrate real poverty reduction in our communities, with 78% of our clients moving above the poverty line.",
    author: "Dr. Grace Wanjiru",
    position: "CEO",
    company: "Faulu Microfinance Bank",
    avatar: "GW",
    stats: {
      improvement: "78% above poverty line",
      processing: "340% loan portfolio growth"
    },
    color: "orange"
  },
  {
    id: "smep-microfinance",
    quote: "The group lending automation and mobile disbursement features have transformed our field operations. We can now serve rural communities more efficiently while maintaining our 96% repayment rate.",
    author: "John Muturi",
    position: "Operations Director",
    company: "SMEP Microfinance",
    avatar: "JM",
    stats: {
      improvement: "96% repayment rate",
      processing: "65% operational efficiency gain"
    },
    color: "amber"
  },
  {
    id: "vision-fund",
    quote: "Sunny's impact tracking capabilities align perfectly with our mission. The poverty assessment tools and social performance indicators help us measure and report on our true social impact to stakeholders.",
    author: "Sarah Nyokabi",
    position: "Social Impact Manager",
    company: "Vision Fund Kenya",
    avatar: "SN",
    stats: {
      improvement: "85% client retention",
      processing: "Real-time impact reporting"
    },
    color: "yellow"
  }
];

const mfiPartners = [
  { name: "Faulu Bank", logo: "FB", description: "Leading microfinance institution" },
  { name: "SMEP Microfinance", logo: "SMEP", description: "Community-focused MFI" },
  { name: "Kenya Women Finance", logo: "KWF", description: "Women empowerment MFI" },
  { name: "Vision Fund Kenya", logo: "VFK", description: "International microfinance network" },
  { name: "SISDO Microfinance", logo: "SISDO", description: "Rural development MFI" },
  { name: "Jitegemee Credit", logo: "JTC", description: "Community credit scheme" }
];

const impactStories = [
  {
    title: "Lives Transformed",
    metrics: [
      { value: "2.8M", label: "People Reached", icon: "👥" },
      { value: "73%", label: "Above Poverty Line", icon: "📈" },
      { value: "68%", label: "Women Borrowers", icon: "👩" },
      { value: "89%", label: "Rural Coverage", icon: "🏘️" }
    ]
  },
  {
    title: "Financial Inclusion",
    metrics: [
      { value: "KES 15B", label: "Loans Disbursed", icon: "💰" },
      { value: "94%", label: "Repayment Rate", icon: "✅" },
      { value: "250K", label: "First-time Borrowers", icon: "🆕" },
      { value: "156%", label: "Repeat Loan Rate", icon: "🔄" }
    ]
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: any, index: number }) => {
  const colorClasses = {
    orange: 'from-orange-500 to-orange-600',
    amber: 'from-amber-500 to-amber-600',
    yellow: 'from-yellow-500 to-yellow-600'
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
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {testimonial.stats.improvement}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Impact Achievement
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {testimonial.stats.processing}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Operational Improvement
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function MfiTestimonials() {
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
            className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            💬 MFI Success Stories
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Trusted by Leading MFIs
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            See how leading microfinance institutions across East Africa have transformed their operations 
            and amplified their social impact with Sunny's comprehensive microfinance solutions.
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

        {/* Impact Stories */}
        <motion.div
          className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-orange-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Collective MFI Impact
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Measuring the collective social and financial impact of our MFI partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactStories.map((story, index) => (
              <motion.div
                key={story.title}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
                  {story.title}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {story.metrics.map((metric, metricIndex) => (
                    <motion.div
                      key={metric.label}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + metricIndex * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -3 }}
                    >
                      <div className="text-2xl mb-2">{metric.icon}</div>
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* MFI Partners */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Powering Kenya's Leading MFIs
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join the growing network of microfinance institutions that trust Sunny for their impact-driven operations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {mfiPartners.map((mfi, index) => (
              <motion.div
                key={mfi.name}
                className="flex flex-col items-center group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-3 group-hover:bg-orange-100 dark:group-hover:bg-orange-900 transition-colors duration-200">
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 font-bold text-sm transition-colors duration-200">
                    {mfi.logo}
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {mfi.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {mfi.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.button 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All MFI Case Studies
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
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-orange-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Join These Impact Champions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Schedule a consultation to see how Sunny can transform your MFI's operations 
              and amplify your social impact with measurable improvements in financial inclusion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule MFI Consultation
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.button>
              <motion.button 
                className="inline-flex items-center px-6 py-3 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400 dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Impact Demo
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
