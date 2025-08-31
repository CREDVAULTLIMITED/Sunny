'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import {
  TwitterIcon,
  LinkedInIcon,
  GitHubIcon,
  YouTubeIcon
} from '@/components/icons/SocialIcons';

// Footer navigation structure
const footerNavigation = {
  product: {
    title: 'Product',
    links: [
      { name: 'Payment Gateway', href: '/payment-gateway' },
      { name: 'Checkout', href: '/checkout' },
      { name: 'Subscriptions', href: '/subscriptions' },
      { name: 'Marketplace', href: '/marketplace' },
      { name: 'Analytics', href: '/analytics' },
      { name: 'Security', href: '/security' }
    ]
  },
  solutions: {
    title: 'Solutions',
    links: [
      { name: 'E-commerce', href: '/solutions/ecommerce' },
      { name: 'SaaS', href: '/solutions/saas' },
      { name: 'Marketplaces', href: '/solutions/marketplaces' },
      { name: 'Financial Services', href: '/solutions/financial-services' },
      { name: 'Non-profits', href: '/solutions/nonprofits' }
    ]
  },
  developers: {
    title: 'Developers',
    links: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/docs/api' },
      { name: 'SDKs', href: '/docs/sdks' },
      { name: 'Tools', href: '/tools' },
      { name: 'Community', href: '/community' },
      { name: 'Status', href: '/status' }
    ]
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'News', href: '/news' },
      { name: 'Investors', href: '/investors' },
      { name: 'Partners', href: '/partners' },
      { name: 'Contact', href: '/contact' }
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'Help Center', href: '/help' },
      { name: 'Blog', href: '/blog' },
      { name: 'Webinars', href: '/webinars' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Guides', href: '/guides' },
      { name: 'Glossary', href: '/glossary' }
    ]
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Compliance', href: '/compliance' },
      { name: 'Security', href: '/security' },
      { name: 'Licenses', href: '/licenses' }
    ]
  }
};

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com/sunnypayments', icon: TwitterIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/sunnypayments', icon: LinkedInIcon },
  { name: 'GitHub', href: 'https://github.com/sunnypayments', icon: GitHubIcon },
  { name: 'YouTube', href: 'https://youtube.com/sunnypayments', icon: YouTubeIcon }
];

// Office locations for future use
// const offices = [
//   {
//     city: 'San Francisco',
//     address: '548 Market St, Suite 35410',
//     country: 'United States',
//     phone: '+1 (555) 123-4567'
//   },
//   {
//     city: 'London',
//     address: '1 Fore Street Avenue',
//     country: 'United Kingdom',
//     phone: '+44 20 7946 0958'
//   },
//   {
//     city: 'Singapore',
//     address: '1 Marina Bay Financial Centre',
//     country: 'Singapore',
//     phone: '+65 6123 4567'
//   }
// ];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800 dark:border-gray-900">
        <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay updated</h3>
              <p className="text-gray-400 dark:text-gray-500 text-lg">
                Get the latest product updates, industry insights, and company news.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-800 rounded-lg text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                Subscribe
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <span className="text-xl font-bold">Sunny</span>
                <div className="text-sm text-gray-400">Payments</div>
              </div>
            </div>
            
            <p className="text-gray-400 dark:text-gray-500 mb-6 leading-relaxed">
              Global payment processing made simple and secure. Accept payments from 190+ countries with enterprise-grade security.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-gray-800 dark:bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links - Grid Layout */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {Object.entries(footerNavigation).map(([key, section]) => (
                <div key={key}>
                  <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Contact
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Email</p>
                  <a href="mailto:hello@sunnypayments.com" className="text-white hover:text-green-400 transition-colors">
                    hello@sunnypayments.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <PhoneIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Sales</p>
                  <a href="tel:+254-700-123-456" className="text-white hover:text-green-400 transition-colors">
                    +254 700 123 456
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Headquarters</p>
                  <address className="text-white not-italic">
                    Nairobi, Kenya<br />
                    East Africa
                  </address>
                </div>
              </div>
            </div>

            {/* Contact Link */}
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center text-sm text-green-400 hover:text-green-300 transition-colors duration-200"
              >
                Get in touch
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 dark:border-gray-900">
        <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-6">
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                © {currentYear} Sunny Payments. All rights reserved.
              </p>
              
              {/* Compliance Badges */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">PCI</span>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">DSS Level 1</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">SOC</span>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">2 Type II</span>
                </div>
              </div>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6">
              <Link href="/sitemap" className="text-gray-400 dark:text-gray-500 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
              <Link href="/accessibility" className="text-gray-400 dark:text-gray-500 hover:text-white text-sm transition-colors">
                Accessibility
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <Link href="/status" className="text-gray-400 dark:text-gray-500 hover:text-white text-sm transition-colors">
                  All systems operational
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
