'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  DocumentTextIcon,
  PrinterIcon,
  QrCodeIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { getDemoDate, getDemoTime } from '@/utils/date-utils';

// Static values to prevent hydration mismatches
const DEMO_RECEIPT_ID = 'RCP-2024-001247';
const DEMO_DATE = '12/08/2024';
const DEMO_TIME = '10:30';

interface ReceiptTemplate {
  id: string;
  name: string;
  country: string;
  flag: string;
  currency: string;
  features: string[];
  preview: {
    business: string;
    address: string;
    total: string;
    tax: string;
    taxRate: string;
  };
}

const receiptTemplates: ReceiptTemplate[] = [
  {
    id: 'us-receipt',
    name: 'US Sales Receipt',
    country: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    features: ['Tax breakdown', 'QR code verification', 'Digital signature'],
    preview: {
      business: 'Sunny Payments Demo Store',
      address: '123 Tech Street, San Francisco, CA 94105',
      total: '$1,247.50',
      tax: '$124.75',
      taxRate: '8.25%'
    }
  },
  {
    id: 'uk-receipt',
    name: 'UK VAT Receipt',
    country: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    features: ['VAT number display', 'HMRC compliance', 'Multi-language support'],
    preview: {
      business: 'Sunny Payments UK Ltd',
      address: '45 Financial District, London EC2M 7PP',
      total: '£892.30',
      tax: '£148.72',
      taxRate: '20%'
    }
  },
  {
    id: 'de-receipt',
    name: 'German Rechnung',
    country: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    features: ['German compliance', 'Steuer-ID display', 'DATEV format'],
    preview: {
      business: 'Sunny Payments GmbH',
      address: 'Finanzstraße 12, 60311 Frankfurt am Main',
      total: '€1,098.40',
      tax: '€175.73',
      taxRate: '19%'
    }
  },
  {
    id: 'ke-receipt',
    name: 'Kenya ETR Receipt',
    country: 'Kenya',
    flag: '🇰🇪',
    currency: 'KES',
    features: ['ETR integration', 'KRA compliance', 'PIN display'],
    preview: {
      business: 'Sunny Payments Kenya Ltd',
      address: 'Westlands Road, Nairobi 00100',
      total: 'KSh 125,420',
      tax: 'KSh 17,359',
      taxRate: '16%'
    }
  }
];

export default function ReceiptGenerationShowcase() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('us-receipt');
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');

  const currentTemplate = receiptTemplates.find(t => t.id === selectedTemplate) || receiptTemplates[0];

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 text-sm font-medium mb-4">
            <DocumentTextIcon className="w-4 h-4 mr-2" />
            Receipt Generation
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Automated Receipt Generation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Generate compliant receipts instantly with localized templates, digital signatures, 
            QR codes, and multi-language support for 190+ countries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Template Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Receipt Templates by Country
              </h3>

              <div className="space-y-4">
                {receiptTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedTemplate === template.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{template.flag}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {template.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {template.country} • {template.currency}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.features.map((feature, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Device View Toggle */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Preview Mode</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      deviceView === 'desktop'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <ComputerDesktopIcon className="w-4 h-4 mr-1" />
                    Desktop
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      deviceView === 'mobile'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <DevicePhoneMobileIcon className="w-4 h-4 mr-1" />
                    Mobile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Receipt Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Receipt Display */}
            <div className={`mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${
              deviceView === 'mobile' ? 'max-w-sm' : 'max-w-lg'
            }`}>
              {/* Receipt Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DocumentTextIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">RECEIPT</h3>
                <p className="text-sm opacity-90">Tax Invoice</p>
              </div>

              {/* Receipt Body */}
              <div className="p-6 space-y-4">
                {/* Business Info */}
                <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                    {currentTemplate.preview.business}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentTemplate.preview.address}
                  </p>
                </div>

                {/* Receipt Details */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Receipt #:</span>
                    <span className="font-mono text-gray-900 dark:text-white">{DEMO_RECEIPT_ID}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Date:</span>
                    <span className="text-gray-900 dark:text-white">{DEMO_DATE}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Time:</span>
                    <span className="text-gray-900 dark:text-white">{DEMO_TIME}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-900 dark:text-white">Digital Service</span>
                      <span className="font-mono text-gray-900 dark:text-white">
                        {currentTemplate.preview.total.replace(/[\d,.]/, match => 
                          currentTemplate.preview.total.includes(match) ? 
                          currentTemplate.preview.total.split(match)[0] + '1,098.40' : match
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Tax ({currentTemplate.preview.taxRate}):
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {currentTemplate.preview.tax}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">Total:</span>
                    <span className="text-green-600 dark:text-green-400">
                      {currentTemplate.preview.total}
                    </span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <QrCodeIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Scan for verification
                  </p>
                </div>

                {/* Digital Signature */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <ShieldCheckIcon className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
                    <span className="text-xs font-medium text-green-700 dark:text-green-300">
                      Digitally Signed
                    </span>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    This receipt is cryptographically verified
                  </p>
                </div>
              </div>
            </div>

            {/* Receipt Actions */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <PrinterIcon className="w-4 h-4 mr-2" />
                Print
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                Download PDF
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <ShareIcon className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>

            {/* Receipt Features */}
            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                {currentTemplate.name} Features
              </h4>
              <div className="space-y-3">
                {currentTemplate.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
                <div className="flex items-center text-sm">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Instant generation (&lt;300ms)</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">7+ year audit retention</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Receipt Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: GlobeAltIcon,
              title: 'Global Templates',
              description: 'Localized receipt formats for 190+ countries',
              features: ['Local compliance', 'Multi-currency', 'Native languages']
            },
            {
              icon: QrCodeIcon,
              title: 'Smart Verification',
              description: 'QR codes and digital signatures for authenticity',
              features: ['Blockchain verification', 'Tamper-proof', 'Instant validation']
            },
            {
              icon: DevicePhoneMobileIcon,
              title: 'Multi-Channel',
              description: 'Receipts optimized for all devices and formats',
              features: ['Mobile-first', 'Print-ready', 'Email integration']
            }
          ].map((capability, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <capability.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                {capability.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {capability.description}
              </p>
              <div className="space-y-2">
                {capability.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center justify-center text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

