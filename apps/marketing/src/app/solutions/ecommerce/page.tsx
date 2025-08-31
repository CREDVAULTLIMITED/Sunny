import { Metadata } from 'next';
import { EcommerceHero } from '@/components/solutions/ecommerce/EcommerceHero';
import { EcommercePaymentMethods } from '@/components/solutions/ecommerce/EcommercePaymentMethods';
import { EcommercePlatformIntegrations } from '@/components/solutions/ecommerce/EcommercePlatformIntegrations';
import { EcommerceFeatures } from '@/components/solutions/ecommerce/EcommerceFeatures';
import { EcommerceInteractiveDemo } from '@/components/solutions/ecommerce/EcommerceInteractiveDemo';
import { EcommerceCaseStudies } from '@/components/solutions/ecommerce/EcommerceCaseStudies';
import { EcommercePricingCalculator } from '@/components/solutions/ecommerce/EcommercePricingCalculator';
import { EcommerceGettingStarted } from '@/components/solutions/ecommerce/EcommerceGettingStarted';
import { EcommerceSecurityFeatures } from '@/components/solutions/ecommerce/EcommerceSecurityFeatures';

export const metadata: Metadata = {
  title: 'E-commerce Payment Solutions | Sunny Payment Gateway',
  description: 'Comprehensive e-commerce payment processing with 20+ global payment methods, AI-powered fraud detection, and seamless platform integrations. Boost conversions with optimized checkout flows.',
  keywords: 'e-commerce payments, online store payments, payment gateway, checkout optimization, conversion rate optimization, fraud detection, payment methods',
  openGraph: {
    title: 'E-commerce Payment Solutions | Sunny Payment Gateway',
    description: 'Complete e-commerce payment processing solution with global coverage, advanced security, and conversion optimization.',
    type: 'website',
    url: 'https://sunnypay.com/solutions/ecommerce',
    images: [
      {
        url: 'https://sunnypay.com/og/ecommerce-solutions.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunny E-commerce Payment Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-commerce Payment Solutions | Sunny Payment Gateway',
    description: 'Complete e-commerce payment processing solution with global coverage, advanced security, and conversion optimization.',
    images: ['https://sunnypay.com/og/ecommerce-solutions.jpg'],
  },
};

export default function EcommerceSolutionsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <EcommerceHero />
      
      {/* Payment Methods Showcase */}
      <EcommercePaymentMethods />
      
      {/* Interactive Demo */}
      <EcommerceInteractiveDemo />
      
      {/* Platform Integrations */}
      <EcommercePlatformIntegrations />
      
      {/* Key Features */}
      <EcommerceFeatures />
      
      {/* Security Features */}
      <EcommerceSecurityFeatures />
      
      {/* Case Studies */}
      <EcommerceCaseStudies />
      
      {/* Pricing Calculator */}
      <EcommercePricingCalculator />
      
      {/* Getting Started */}
      <EcommerceGettingStarted />
    </div>
  );
}
