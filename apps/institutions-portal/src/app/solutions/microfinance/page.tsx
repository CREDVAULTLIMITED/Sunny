import React from 'react';
import InstitutionalHeader from '../../../components/layout/InstitutionalHeader';
import InstitutionalFooter from '../../../components/layout/InstitutionalFooter';
import MicrofinanceHero from '../../../components/solutions/microfinance/MicrofinanceHero';
import MicrofinanceFeatures from '../../../components/solutions/microfinance/MicrofinanceFeatures';
import GroupLending from '../../../components/solutions/microfinance/GroupLending';
import ImpactMeasurement from '../../../components/solutions/microfinance/ImpactMeasurement';
import MfiTestimonials from '../../../components/solutions/microfinance/MfiTestimonials';
import MfiPricing from '../../../components/solutions/microfinance/MfiPricing';
import SectionDivider from '../../../components/global/SectionDivider';

export const metadata = {
  title: 'Sunny Institutions Portal | Microfinance Solutions',
  description: 'Comprehensive microfinance platform designed for MFIs, NBFIs, and community finance institutions. Empower financial inclusion with group lending, impact tracking, and regulatory compliance.',
  author: 'Sunny Payments',
  keywords: 'microfinance, MFI solutions, group lending, financial inclusion, impact measurement, community finance, NBFI, microcredit',
  creator: 'Sunny Payments',
  publisher: 'Sunny Payments',
  robots: 'index, follow',
  openGraph: {
    title: 'Sunny Institutions Portal | Microfinance Solutions',
    description: 'Comprehensive microfinance platform for financial inclusion',
    url: 'https://institutions.sunnypayments.com/solutions/microfinance',
    siteName: 'Sunny Institutions Portal',
    images: [
      {
        url: 'http://localhost:3003/og-image-microfinance.png',
        width: 1200,
        height: 630,
        alt: 'Sunny Microfinance Solutions',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sunnypayments',
    creator: '@sunnypayments',
    title: 'Sunny Institutions Portal | Microfinance Solutions',
    description: 'Comprehensive microfinance platform for financial inclusion',
    images: ['http://localhost:3003/og-image-microfinance.png'],
  },
};

export default function MicrofinancePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <InstitutionalHeader />

      {/* Microfinance Hero Section */}
      <MicrofinanceHero />

      <SectionDivider variant="gradient" color="orange" />

      {/* Microfinance Features Section */}
      <MicrofinanceFeatures />

      <SectionDivider variant="dots" color="orange" />

      {/* Group Lending Section */}
      <GroupLending />

      <SectionDivider variant="gradient" color="orange" />

      {/* Impact Measurement Section */}
      <ImpactMeasurement />

      <SectionDivider variant="dots" color="orange" />

      {/* MFI Testimonials Section */}
      <MfiTestimonials />

      <SectionDivider variant="gradient" color="orange" />

      {/* MFI Pricing Section */}
      <MfiPricing />

      <InstitutionalFooter />
    </div>
  );
}
