import React from 'react';
import InstitutionalHeader from '../../../components/layout/InstitutionalHeader';
import InstitutionalFooter from '../../../components/layout/InstitutionalFooter';
import RemittanceHero from '../../../components/solutions/remittance/RemittanceHero';
import RemittanceFeatures from '../../../components/solutions/remittance/RemittanceFeatures';
import CrossBorderInfrastructure from '../../../components/solutions/remittance/CrossBorderInfrastructure';
import CorridorManagement from '../../../components/solutions/remittance/CorridorManagement';
import RemittanceTestimonials from '../../../components/solutions/remittance/RemittanceTestimonials';
import RemittancePricing from '../../../components/solutions/remittance/RemittancePricing';
import SectionDivider from '../../../components/global/SectionDivider';

export const metadata = {
  title: 'Sunny Institutions Portal | Remittance Solutions',
  description: 'Comprehensive cross-border payment infrastructure for money transfer operators, remittance service providers, and international payment facilitators. Power global money transfers with enterprise-grade solutions.',
  author: 'Sunny Payments',
  keywords: 'remittance solutions, cross-border payments, money transfer operators, international payments, payment corridors, forex, compliance, AML/CFT, global money transfers',
  creator: 'Sunny Payments',
  publisher: 'Sunny Payments',
  robots: 'index, follow',
  openGraph: {
    title: 'Sunny Institutions Portal | Remittance Solutions',
    description: 'Comprehensive cross-border payment infrastructure for money transfer operators',
    url: 'https://institutions.sunnypayments.com/solutions/remittance',
    siteName: 'Sunny Institutions Portal',
    images: [
      {
        url: 'http://localhost:3003/og-image-remittance.png',
        width: 1200,
        height: 630,
        alt: 'Sunny Remittance Solutions',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sunnypayments',
    creator: '@sunnypayments',
    title: 'Sunny Institutions Portal | Remittance Solutions',
    description: 'Comprehensive cross-border payment infrastructure for money transfer operators',
    images: ['http://localhost:3003/og-image-remittance.png'],
  },
};

export default function RemittancePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <InstitutionalHeader />

      {/* Remittance Hero Section */}
      <RemittanceHero />

      <SectionDivider variant="gradient" color="pink" />

      {/* Remittance Features Section */}
      <RemittanceFeatures />

      <SectionDivider variant="dots" color="pink" />

      {/* Cross-Border Infrastructure Section */}
      <CrossBorderInfrastructure />

      <SectionDivider variant="gradient" color="pink" />

      {/* Corridor Management Section */}
      <CorridorManagement />

      <SectionDivider variant="dots" color="pink" />

      {/* Remittance Testimonials Section */}
      <RemittanceTestimonials />

      <SectionDivider variant="gradient" color="pink" />

      {/* Remittance Pricing Section */}
      <RemittancePricing />

      <InstitutionalFooter />
    </div>
  );
}
