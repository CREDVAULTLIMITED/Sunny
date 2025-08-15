'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 'paga-processor',
    quote: "Sunny's payment processing infrastructure allowed us to scale from 10,000 to 5 million transactions per day without any performance degradation. Their intelligent routing increased our success rates by 15%.",
    author: "Tayo Oviosu",
    position: "CEO & Founder",
    company: "Paga",
    avatar: "TO",
    stats: {
      improvement: "5M transactions/day",
      processing: "15% higher success rate"
    },
    color: "teal"
  },
  {
    id: "interswitch-scale",
    quote: "The real-time settlement capabilities and multi-acquirer support transformed our processing operations. We reduced settlement time from T+2 to real-time, improving merchant satisfaction significantly.",
    author: "Mitchell Elegbe",
    position: "Founder & CEO",
    company: "Interswitch",
    avatar: "ME",
    stats: {
      improvement: "Real-time settlement",
      processing: "T+2 to instant"
    },
    color: "cyan"
  },
  {
    id: "cellulant-growth",
    quote: "Sunny's merchant onboarding platform reduced our KYB process from 3 weeks to 24 hours. The automated underwriting and risk assessment tools are game-changers for our business.",
    author: "Ken Njoroge",
    position: "Co-founder & CEO",
    company: "Cellulant",
    avatar: "KN",
    stats: {
      improvement: "24-hour onboarding",
      processing: "95% faster KYB"
    },
    color: "blue"
  }
];

const processorPartners = [
  { name: "Paga", logo: "PG", description: "Digital payment platform" },
  { name: "Interswitch", logo: "IS", description: "Payment processing pioneer" },
  { name: "Cellulant", logo: "CL", description: "Pan-African payment processor" },
  { name: "Flutterwave", logo: "FW", description: "Global payment infrastructure" },
  { name: "Paystack", logo: "PS", description: "Payment gateway leader" },
  { name: "TeamApt", logo: "TA", description: "Financial technology solutions" }
];

const platformMetrics = [
  {
    title: 'Payment Processing Excellence',
    metrics: [
      { value: "100+", label: "Payment Processors", icon: "🏢" },
      { value: "24/7", label: "Processing Uptime", icon: "⚡" },
      { value: "5M+", label: "Daily Transactions", icon: "💳" },
      { value: "50+", label: "Countries Served", icon: "🌍" }
    ]
  },
  {
    title: 'Infrastructure Performance',
    metrics: [
      { value: "99.99%", label: "System Availability", icon: "🔧" },
      { value: "200ms", label: "Average Response", icon: "🎯" },
      { value: "24/7", label: "Technical Support", icon: "💬" },
      { value: "PCI DSS", label: "Security Certified", icon: "🛡️" }
    ]
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: any, index: number }) => {
  const colorClasses = {
    teal: 'from-teal-500 to-teal-600',
    cyan: 'from-cyan-500 to-cyan-600',
    blue: 'from-blue-500 to-blue-600'
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
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
            {testimonial.stats.improvement}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Key Achievement
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            {testimonial.stats.processing}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Performance Gain
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PaymentProcessorsTestimonials() {
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
            className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            💬 Processor Success Stories
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Trusted by Leading Payment Processors
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            See how innovative payment processors are scaling their operations and improving 
            performance with Sunny's enterprise payment infrastructure platform.
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

        {/* Platform Metrics */}
        <motion.div
          className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-teal-200 dark:border-gray-600 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Performance Metrics
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Industry-leading metrics powering payment processing excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platformMetrics.map((category, index) => (
              <motion.div
                key={category.title}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
                  {category.title}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {category.metrics.map((metric, metricIndex) => (
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
                      <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">
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

        {/* Processor Partners */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Leading African Payment Processors
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join the growing ecosystem of payment processors powered by Sunny
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {processorPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="flex flex-col items-center group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-3 group-hover:bg-teal-100 dark:group-hover:bg-teal-900 transition-colors duration-200">
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 font-bold text-sm transition-colors duration-200">
                    {partner.logo}
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {partner.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {partner.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.button 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
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
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-teal-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Payment Processing?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join leading payment processors who trust Sunny's infrastructure to power their operations. 
              Scale globally with confidence, improve performance, and accelerate growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Processing Today
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </motion.button>
              <motion.button 
                className="inline-flex items-center px-6 py-3 border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
