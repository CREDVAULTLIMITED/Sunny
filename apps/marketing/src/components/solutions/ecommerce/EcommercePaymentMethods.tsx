'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CreditCardIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

export function EcommercePaymentMethods() {
  const [activeCategory, setActiveCategory] = useState('all');

  const paymentCategories = [
    { id: 'all', label: 'All Methods', count: '20+' },
    { id: 'cards', label: 'Cards', count: '5' },
    { id: 'wallets', label: 'Digital Wallets', count: '4' },
    { id: 'mobile', label: 'Mobile Money', count: '4' },
    { id: 'bank', label: 'Bank Transfers', count: '3' },
    { id: 'crypto', label: 'Cryptocurrency', count: '4' },
  ];

  const paymentMethods = [
    // Card Payments
    {
      category: 'cards',
      name: 'Visa',
      logo: '💳',
      description: 'Global credit and debit cards',
      regions: ['Global'],
      features: ['3D Secure', 'Tokenization', 'Recurring'],
      processingTime: 'Instant',
      fees: '2.9% + $0.30'
    },
    {
      category: 'cards',
      name: 'Mastercard',
      logo: '🔴',
      description: 'Worldwide payment acceptance',
      regions: ['Global'],
      features: ['EMV', 'Contactless', 'Corporate'],
      processingTime: 'Instant',
      fees: '2.9% + $0.30'
    },
    {
      category: 'cards',
      name: 'American Express',
      logo: '🔷',
      description: 'Premium card network',
      regions: ['Global'],
      features: ['Premium', 'Business', 'Rewards'],
      processingTime: 'Instant',
      fees: '3.5% + $0.30'
    },

    // Digital Wallets
    {
      category: 'wallets',
      name: 'Apple Pay',
      logo: '🍎',
      description: 'Secure mobile payments',
      regions: ['Global'],
      features: ['Biometric', 'Touch ID', 'Face ID'],
      processingTime: 'Instant',
      fees: '2.9% + $0.30'
    },
    {
      category: 'wallets',
      name: 'Google Pay',
      logo: '🅖',
      description: 'Android payment solution',
      regions: ['Global'],
      features: ['NFC', 'Fingerprint', 'PIN'],
      processingTime: 'Instant',
      fees: '2.9% + $0.30'
    },
    {
      category: 'wallets',
      name: 'PayPal',
      logo: '🅿️',
      description: 'Digital wallet and credit',
      regions: ['Global'],
      features: ['Buyer Protection', 'Credit', 'BNPL'],
      processingTime: 'Instant',
      fees: '3.49% + $0.49'
    },

    // Mobile Money
    {
      category: 'mobile',
      name: 'M-Pesa',
      logo: '📱',
      description: 'Leading mobile money in Kenya',
      regions: ['Kenya', 'Tanzania', 'Mozambique'],
      features: ['USSD', 'App', 'Agent Network'],
      processingTime: 'Instant',
      fees: '1.5% + KES 10'
    },
    {
      category: 'mobile',
      name: 'MTN Mobile Money',
      logo: '📲',
      description: 'Mobile money across Africa',
      regions: ['Ghana', 'Uganda', 'Rwanda'],
      features: ['Cross-border', 'Merchant Pay', 'Bulk'],
      processingTime: 'Instant',
      fees: '2.0% + local fees'
    },

    // Bank Transfers
    {
      category: 'bank',
      name: 'ACH',
      logo: '🏦',
      description: 'US bank transfers',
      regions: ['United States'],
      features: ['Same-day', 'Next-day', 'Standard'],
      processingTime: '1-3 days',
      fees: '0.8% (max $5)'
    },
    {
      category: 'bank',
      name: 'SEPA',
      logo: '🇪🇺',
      description: 'European bank transfers',
      regions: ['European Union'],
      features: ['Instant', 'Standard', 'Direct Debit'],
      processingTime: 'Instant - 1 day',
      fees: '0.35% (max €0.35)'
    },

    // Cryptocurrency
    {
      category: 'crypto',
      name: 'Bitcoin',
      logo: '₿',
      description: 'Leading cryptocurrency',
      regions: ['Global'],
      features: ['Lightning Network', 'Multi-sig', 'Cold Storage'],
      processingTime: '10-60 minutes',
      fees: 'Network fees apply'
    },
    {
      category: 'crypto',
      name: 'Ethereum',
      logo: '⟠',
      description: 'Smart contract platform',
      regions: ['Global'],
      features: ['ERC-20', 'DeFi', 'Smart Contracts'],
      processingTime: '1-15 minutes',
      fees: 'Gas fees apply'
    },
  ];

  const filteredMethods = activeCategory === 'all' 
    ? paymentMethods 
    : paymentMethods.filter(method => method.category === activeCategory);

  const stats = [
    { label: 'Global Coverage', value: '190+ Countries', icon: GlobeAltIcon },
    { label: 'Currencies', value: '135+ Supported', icon: CurrencyDollarIcon },
    { label: 'Security', value: 'PCI DSS Level 1', icon: ShieldCheckIcon },
    { label: 'Settlement', value: 'Sub-minute', icon: BoltIcon },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              20+ Global Payment Methods
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Accept payments from customers worldwide with our comprehensive suite of payment methods. 
              From traditional cards to emerging cryptocurrencies, we've got you covered.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg mb-3">
                  <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {paymentCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="relative"
            >
              {category.label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMethods.map((method, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{method.logo}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{method.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {method.category}
                  </Badge>
                </div>

                {/* Regions */}
                <div className="flex flex-wrap gap-1">
                  {method.regions.map((region, regionIndex) => (
                    <Badge key={regionIndex} variant="secondary" className="text-xs">
                      {region}
                    </Badge>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Features:</div>
                  <div className="flex flex-wrap gap-1">
                    {method.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Processing & Fees */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Processing Time</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{method.processingTime}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Fees</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{method.fees}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Need a Custom Payment Method?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're constantly adding new payment methods. Contact our team to discuss 
              custom integrations for your specific market or use case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Request Custom Integration
              </Button>
              <Button variant="outline" size="lg">
                View All Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
