import { Metadata } from 'next';
import PaymentGatewayHero from '@/components/payment-gateway/PaymentGatewayHero';
import FeatureOverview from '@/components/payment-gateway/FeatureOverview';
import IntegrationMethods from '@/components/payment-gateway/IntegrationMethods';
import PaymentMethods from '@/components/payment-gateway/PaymentMethods';
import SecurityFeatures from '@/components/payment-gateway/SecurityFeatures';
import PricingCalculator from '@/components/payment-gateway/PricingCalculator';
import ImplementationGuide from '@/components/payment-gateway/ImplementationGuide';

export const metadata: Metadata = {
  title: 'Payment Gateway - Sunny Payments | Accept Payments Globally',
  description: 'Accept payments in 190+ countries with 135+ currencies. Secure, fast, and developer-friendly payment processing with competitive rates and instant settlement.',
  keywords: [
    'payment gateway',
    'online payments',
    'payment processing',
    'global payments',
    'payment api',
    'payment integration',
    'secure payments',
    'instant settlement',
    'multi-currency',
    'payment methods'
  ],
  openGraph: {
    title: 'Payment Gateway - Sunny Payments',
    description: 'Accept payments globally with our secure, developer-friendly payment gateway. 190+ countries, 135+ currencies, instant settlement.',
    type: 'website',
    siteName: 'Sunny Payments',
    images: [
      {
        url: '/images/og/payment-gateway.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunny Payment Gateway - Global Payment Processing'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Payment Gateway - Sunny Payments',
    description: 'Accept payments globally with our secure, developer-friendly payment gateway.',
    images: ['/images/og/payment-gateway.jpg']
  },
  alternates: {
    canonical: '/payment-gateway'
  }
};

export default function PaymentGatewayPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <PaymentGatewayHero />
      
      {/* Feature Overview */}
      <FeatureOverview />
      
      {/* Integration Methods */}
      <IntegrationMethods />
      
      {/* Payment Methods */}
      <PaymentMethods />
      
      {/* Security Features */}
      <SecurityFeatures />
      
      {/* Pricing Calculator */}
      <PricingCalculator />
      
      {/* Implementation Guide */}
      <ImplementationGuide />
    </main>
  );
}