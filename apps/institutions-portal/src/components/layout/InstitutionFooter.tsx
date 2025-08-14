'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BuildingOfficeIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function InstitutionFooter() {
  const footerSections = [
    {
      title: 'Institution Solutions',
      links: [
        { name: 'White-label Payments', href: '/solutions/white-label' },
        { name: 'Banking Integration', href: '/solutions/banking' },
        { name: 'Mobile Money', href: '/solutions/mobile-money' },
        { name: 'Corporate Banking', href: '/solutions/corporate' },
        { name: 'SACCO Solutions', href: '/solutions/sacco' },
        { name: 'Microfinance', href: '/solutions/microfinance' }
      ]
    },
    {
      title: 'Compliance & Risk',
      links: [
        { name: 'CBK Compliance', href: '/compliance/cbk' },
        { name: 'KRA Integration', href: '/compliance/kra' },
        { name: 'AML/CFT Tools', href: '/compliance/aml-cft' },
        { name: 'Fraud Detection', href: '/compliance/fraud-detection' },
        { name: 'Risk Management', href: '/compliance/risk-management' },
        { name: 'Regulatory Reporting', href: '/compliance/reporting' }
      ]
    },
    {
      title: 'Developer Resources',
      links: [
        { name: 'API Documentation', href: '/docs/api' },
        { name: 'Integration Guides', href: '/docs/integration' },
        { name: 'SDKs & Libraries', href: '/docs/sdks' },
        { name: 'Webhooks', href: '/docs/webhooks' },
        { name: 'Testing Environment', href: '/docs/testing' },
        { name: 'Support Portal', href: '/support' }
      ]
    },
    {
      title: 'Institution Support',
      links: [
        { name: 'Onboarding', href: '/onboarding' },
        { name: 'Training Programs', href: '/training' },
        { name: 'Account Management', href: '/account-management' },
        { name: 'Technical Support', href: '/support/technical' },
        { name: 'Business Consulting', href: '/consulting' },
        { name: 'System Status', href: '/status' }
      ]
    }
  ];

  const companyInfo = {
    address: 'Westlands, Nairobi, Kenya',
    phone: '+254 700 000 000',
    email: 'institutions@sunnypayments.com',
    supportHours: '24/7 Support Available'
  };

  const certifications = [
    { name: 'PCI DSS Level 1', badge: 'Security' },
    { name: 'ISO 27001', badge: 'Information Security' },
    { name: 'CBK Licensed', badge: 'Central Bank of Kenya' },
    { name: 'SOC 2 Type II', badge: 'Service Organization' }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <BuildingOfficeIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Sunny
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  for Institutions
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Enterprise-grade payment solutions for banks, SACCOs, MFIs, and financial institutions across Africa.
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPinIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>{companyInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <PhoneIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>{companyInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <EnvelopeIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>{companyInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <ClockIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>{companyInfo.supportHours}</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications & Compliance */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Certifications & Compliance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center"
                >
                  <ShieldCheckIcon className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-xs font-semibold text-gray-900 dark:text-white">
                    {cert.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {cert.badge}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Institution-Specific Features */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ready to Transform Your Institution?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Join 500+ financial institutions across Africa using Sunny for seamless payment processing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200">
                  Schedule Demo
                </button>
              </Link>
              <Link href="/onboarding">
                <button className="px-6 py-3 bg-white dark:bg-gray-800 border border-green-600 text-green-600 dark:text-green-400 text-sm font-semibold rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200">
                  Start Onboarding
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Sunny Payments. All rights reserved. Licensed by Central Bank of Kenya.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/institution-agreement" 
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Institution Agreement
              </Link>
              <Link 
                href="/cookies" 
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}