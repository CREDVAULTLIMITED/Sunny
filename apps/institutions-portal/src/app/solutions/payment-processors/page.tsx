import React from 'react';
import InstitutionalHeader from '../../../components/layout/InstitutionalHeader';
import InstitutionalFooter from '../../../components/layout/InstitutionalFooter';
import PaymentProcessorsHero from '../../../components/solutions/payment-processors/PaymentProcessorsHero';
import PaymentProcessorsFeatures from '../../../components/solutions/payment-processors/PaymentProcessorsFeatures';
import ProcessingInfrastructure from '../../../components/solutions/payment-processors/ProcessingInfrastructure';
import MerchantSolutions from '../../../components/solutions/payment-processors/MerchantSolutions';
import PaymentProcessorsTestimonials from '../../../components/solutions/payment-processors/PaymentProcessorsTestimonials';
import PaymentProcessorsPricing from '../../../components/solutions/payment-processors/PaymentProcessorsPricing';
import SectionDivider from '../../../components/global/SectionDivider';

export const metadata = {
  title: 'Sunny Institutions Portal | Payment Processors Solutions',
  description: 'Comprehensive payment processing infrastructure for payment service providers, gateways, and aggregators. Scale payment operations with enterprise-grade processing capabilities.',
  author: 'Sunny Payments',
  keywords: 'payment processors, payment gateways, payment aggregators, PSP solutions, merchant onboarding, payment infrastructure, payment orchestration, transaction processing',
  creator: 'Sunny Payments',
  publisher: 'Sunny Payments',
  robots: 'index, follow',
  openGraph: {
    title: 'Sunny Institutions Portal | Payment Processors Solutions',
    description: 'Comprehensive payment processing infrastructure for payment service providers',
    url: 'https://institutions.sunnypayments.com/solutions/payment-processors',
    siteName: 'Sunny Institutions Portal',
    images: [
      {
        url: 'http://localhost:3003/og-image-payment-processors.png',
        width: 1200,
        height: 630,
        alt: 'Sunny Payment Processors Solutions',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sunnypayments',
    creator: '@sunnypayments',
    title: 'Sunny Institutions Portal | Payment Processors Solutions',
    description: 'Comprehensive payment processing infrastructure for payment service providers',
    images: ['http://localhost:3003/og-image-payment-processors.png'],
  },
};

export default function PaymentProcessorsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <InstitutionalHeader />

      {/* Payment Processors Hero Section */}
      <PaymentProcessorsHero />

      <SectionDivider variant="gradient" color="teal" />

      {/* Payment Processors Features Section */}
      <PaymentProcessorsFeatures />

      <SectionDivider variant="dots" color="teal" />

      {/* Processing Infrastructure Section */}
      <ProcessingInfrastructure />

      <SectionDivider variant="gradient" color="teal" />

      {/* Merchant Solutions Section */}
      <MerchantSolutions />

      <SectionDivider variant="dots" color="teal" />

      {/* Payment Processors Testimonials Section */}
      <PaymentProcessorsTestimonials />

      <SectionDivider variant="gradient" color="teal" />

      {/* Payment Processors Pricing Section */}
      <PaymentProcessorsPricing />

      <InstitutionalFooter />
    </div>
  );
}

