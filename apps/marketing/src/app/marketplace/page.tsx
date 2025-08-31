import type { Metadata } from 'next';
import MarketplaceHero from '@/components/marketplace/MarketplaceHero';
import SplitPayments from '@/components/marketplace/SplitPayments';
import EscrowServices from '@/components/marketplace/EscrowServices';
import CommissionManagement from '@/components/marketplace/CommissionManagement';

export const metadata: Metadata = {
  title: 'Marketplace Payment Solutions | Sunny Payment Gateway',
  description: 'Complete marketplace payment platform with split payments, escrow services, and automated commission management. Handle complex multi-vendor scenarios with ease.',
  keywords: [
    'marketplace payments',
    'split payments',
    'escrow services',
    'commission management',
    'multi-vendor platform',
    'marketplace solutions',
    'payment distribution',
    'vendor payments'
  ],
  openGraph: {
    title: 'Marketplace Payment Solutions | Sunny Payment Gateway',
    description: 'Complete marketplace payment platform with split payments, escrow services, and automated commission management.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketplace Payment Solutions | Sunny Payment Gateway',
    description: 'Complete marketplace payment platform with split payments, escrow services, and automated commission management.',
  },
};

export default function MarketplacePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <MarketplaceHero />
      
      {/* Split Payments */}
      <SplitPayments />
      
      {/* Escrow Services */}
      <EscrowServices />
      
      {/* Commission Management */}
      <CommissionManagement />
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-green-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Power Your Marketplace?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join leading marketplaces using Sunny to handle complex multi-vendor payments, 
            escrow services, and commission management. Start building today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Integration
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-lg hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              View Documentation
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Trusted by leading marketplaces worldwide
            </p>
            <div className="flex items-center justify-center gap-8 text-gray-400 dark:text-gray-600">
              <div className="font-semibold text-lg">99.8%</div>
              <div className="text-sm">Success Rate</div>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <div className="font-semibold text-lg">2min</div>
              <div className="text-sm">Avg Settlement</div>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <div className="font-semibold text-lg">50+</div>
              <div className="text-sm">Marketplace Types</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

