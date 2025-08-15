import React from 'react';
import InstitutionalHeader from '../../../components/layout/InstitutionalHeader';
import InstitutionalFooter from '../../../components/layout/InstitutionalFooter';
import FintechHero from '../../../components/solutions/fintech/FintechHero';
import FintechFeatures from '../../../components/solutions/fintech/FintechFeatures';
import ApiPlatform from '../../../components/solutions/fintech/ApiPlatform';
import ScalingSolutions from '../../../components/solutions/fintech/ScalingSolutions';
import FintechTestimonials from '../../../components/solutions/fintech/FintechTestimonials';
import FintechPricing from '../../../components/solutions/fintech/FintechPricing';
import SectionDivider from '../../../components/global/SectionDivider';

export const metadata = {
  title: 'Sunny Institutions Portal | Fintech Solutions',
  description: 'Complete fintech infrastructure platform for startups, digital banks, and financial technology companies. Scale your fintech with enterprise-grade APIs and financial services.',
  author: 'Sunny Payments',
  keywords: 'fintech solutions, digital banking, API platform, financial technology, payment infrastructure, fintech startup, embedded finance, banking as a service',
  creator: 'Sunny Payments',
  publisher: 'Sunny Payments',
  robots: 'index, follow',
  openGraph: {
    title: 'Sunny Institutions Portal | Fintech Solutions',
    description: 'Complete fintech infrastructure platform for startups and digital banks',
    url: 'https://institutions.sunnypayments.com/solutions/fintech',
    siteName: 'Sunny Institutions Portal',
    images: [
      {
        url: 'http://localhost:3003/og-image-fintech.png',
        width: 1200,
        height: 630,
        alt: 'Sunny Fintech Solutions',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sunnypayments',
    creator: '@sunnypayments',
    title: 'Sunny Institutions Portal | Fintech Solutions',
    description: 'Complete fintech infrastructure platform for startups and digital banks',
    images: ['http://localhost:3003/og-image-fintech.png'],
  },
};

export default function FintechPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <InstitutionalHeader />

      {/* Fintech Hero Section */}
      <FintechHero />

      <SectionDivider variant="gradient" color="purple" />

      {/* Fintech Features Section */}
      <FintechFeatures />

      <SectionDivider variant="dots" color="purple" />

      {/* API Platform Section */}
      <ApiPlatform />

      <SectionDivider variant="gradient" color="purple" />

      {/* Scaling Solutions Section */}
      <ScalingSolutions />

      <SectionDivider variant="dots" color="purple" />

      {/* Fintech Testimonials Section */}
      <FintechTestimonials />

      <SectionDivider variant="gradient" color="purple" />

      {/* Fintech Pricing Section */}
      <FintechPricing />

      <InstitutionalFooter />
    </div>
  );
}
