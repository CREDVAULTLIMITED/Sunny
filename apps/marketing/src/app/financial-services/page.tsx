import type { Metadata } from 'next';
import FinancialHero from '@/components/financial/FinancialHero';
import BankingIntegrations from '@/components/financial/BankingIntegrations';
import WhiteLabelSolutions from '@/components/financial/WhiteLabelSolutions';
import AIFraudDetectionSection from '@/components/financial/AIFraudDetectionSection';
import TaxComplianceSection from '@/components/financial/TaxComplianceSection';
import EnterpriseInfrastructureSection from '@/components/financial/EnterpriseInfrastructureSection';

export const metadata: Metadata = {
  title: 'Financial Services Platform | Sunny Payment Gateway',
  description: 'Enterprise financial services infrastructure with AI fraud detection, tax compliance, banking integrations, white-label solutions, and enterprise-grade security. Build the future of finance.',
  keywords: [
    'financial services',
    'ai fraud detection',
    'tax compliance',
    'banking integrations',
    'white-label solutions',
    'fintech platform',
    'enterprise banking',
    'financial infrastructure',
    'banking APIs',
    'financial compliance',
    'enterprise infrastructure',
    'load balancing',
    'caching systems'
  ],
  openGraph: {
    title: 'Financial Services Platform | Sunny Payment Gateway',
    description: 'Enterprise financial services infrastructure with AI fraud detection, tax compliance, banking integrations, white-label solutions, and enterprise-grade security.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Financial Services Platform | Sunny Payment Gateway',
    description: 'Enterprise financial services infrastructure with AI fraud detection, tax compliance, banking integrations, white-label solutions, and enterprise-grade security.',
  },
};

export default function FinancialServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <FinancialHero />
      
      {/* AI Fraud Detection */}
      <AIFraudDetectionSection />
      
      {/* Banking Integrations */}
      <BankingIntegrations />
      
      {/* Tax & Compliance */}
      <TaxComplianceSection />
      
      {/* Enterprise Infrastructure */}
      <EnterpriseInfrastructureSection />
      
      {/* White-Label Solutions */}
      <WhiteLabelSolutions />
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 dark:from-slate-900 dark:via-green-900 dark:to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Financial Services?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Partner with enterprise financial institutions and launch innovative 
            financial products with our comprehensive AI-powered platform. Advanced fraud detection, 
            automated tax compliance, and enterprise infrastructure at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Schedule Consultation
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-lg hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Explore Solutions
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Trusted by leading financial institutions globally
            </p>
            <div className="flex items-center justify-center gap-8 text-gray-400 dark:text-gray-600">
              <div className="text-center">
                <div className="font-semibold text-lg">99.97%</div>
                <div className="text-sm">AI Fraud Accuracy</div>
              </div>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <div className="font-semibold text-lg">190+</div>
                <div className="text-sm">Tax Jurisdictions</div>
              </div>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <div className="font-semibold text-lg">11+</div>
                <div className="text-sm">AI Models</div>
              </div>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <div className="font-semibold text-lg">50ms</div>
                <div className="text-sm">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

