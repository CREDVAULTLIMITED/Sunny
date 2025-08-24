'use client';

import React from 'react';
import { motion } from 'framer-motion';

const footerSections = [
  {
    title: 'Solutions',
    links: [
      { name: 'Commercial Banks', href: '/solutions/banks' },
      { name: 'SACCOs', href: '/solutions/saccos' },
      { name: 'Microfinance', href: '/solutions/microfinance' },
      { name: 'Fintech', href: '/solutions/fintech' },
      { name: 'Payment Processors', href: '/solutions/processors' },
      { name: 'Remittance Services', href: '/solutions/remittance' },
    ]
  },
  {
    title: 'Platform',
    links: [
      { name: 'Core Banking Integration', href: '/platform/core-banking' },
      { name: 'API Gateway', href: '/platform/api' },
      { name: 'White-label Solutions', href: '/platform/white-label' },
      { name: 'Analytics Dashboard', href: '/platform/analytics' },
      { name: 'Compliance Tools', href: '/platform/compliance' },
      { name: 'Security Center', href: '/platform/security' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/resources/docs' },
      { name: 'API Reference', href: '/api-docs' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Webinars', href: '/webinars' },
      { name: 'Regulatory Updates', href: '/regulatory' },
      { name: 'Download Center', href: '/downloads' },
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Support', href: '/contact' },
      { name: 'Technical Support', href: '/technical-support' },
      { name: 'Training', href: '/training' },
      { name: 'Status Page', href: '/status' },
      { name: 'System Health', href: '/system-health' },
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'News & Updates', href: '/news' },
      { name: 'Partner Program', href: '/partners' },
      { name: 'Contact', href: '/contact' },
      { name: 'Locations', href: '/locations' },
    ]
  }
];

const socialLinks = [
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    )
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    name: 'GitHub',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  }
];

const certifications = [
  { name: 'CBK', description: 'Central Bank of Kenya Certified' },
  { name: 'SASRA', description: 'SACCO Societies Regulatory Authority' },
  { name: 'PCI DSS', description: 'Payment Card Industry Compliant' },
  { name: 'ISO 27001', description: 'Information Security Certified' },
];

export default function InstitutionalFooter() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  Sunny<span className="text-slate-400">Institutions</span>
                </h3>
                <p className="text-slate-400 text-sm">Financial Infrastructure Platform</p>
              </div>
            </div>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              Empowering financial institutions across Africa with comprehensive payment 
              infrastructure, regulatory compliance tools, and cutting-edge technology 
              solutions.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 text-slate-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-slate-300">institutions@sunnypayments.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 text-slate-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-slate-300">+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 text-slate-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-slate-300">Nairobi, Kenya</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
            {footerSections.map((section, index) => (
              <motion.div key={section.title} variants={itemVariants}>
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <motion.div variants={itemVariants} className="border-t border-slate-800 pt-8 mb-8">
          <h4 className="font-semibold text-white mb-6 text-center">Regulatory Compliance & Certifications</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="text-center p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-lg font-bold text-white mb-1">{cert.name}</div>
                <div className="text-xs text-slate-400">{cert.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div 
          variants={itemVariants}
          className="bg-slate-800 rounded-xl p-8 mb-8"
        >
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-white mb-2">Stay Updated</h4>
            <p className="text-slate-300">Get the latest updates on regulatory changes, platform features, and industry insights.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <motion.button
              className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Section */}
      <div className="border-t border-slate-800">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-slate-400 text-sm">
              © 2024 Sunny Payments. All rights reserved. | 
              <a href="/privacy" className="hover:text-white ml-1">Privacy Policy</a> | 
              <a href="/terms" className="hover:text-white ml-1">Terms of Service</a>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
