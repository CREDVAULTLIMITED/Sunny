import React from 'react';
import InstitutionalHeader from '../../../components/layout/InstitutionalHeader';
import InstitutionalFooter from '../../../components/layout/InstitutionalFooter';
import SaccosHero from '../../../components/solutions/saccos/SaccosHero';
import SaccoFeatures from '../../../components/solutions/saccos/SaccoFeatures';
import SaccoMemberServices from '../../../components/solutions/saccos/SaccoMemberServices';
import SasraCompliance from '../../../components/solutions/saccos/SasraCompliance';
import SaccoTestimonials from '../../../components/solutions/saccos/SaccoTestimonials';
import SaccoPricing from '../../../components/solutions/saccos/SaccoPricing';
import SectionDivider from '../../../components/global/SectionDivider';

export default function SaccosPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <InstitutionalHeader />

      {/* SACCO Hero Section */}
      <SaccosHero />

      <SectionDivider variant="gradient" color="green" />

      {/* SACCO Features Section */}
      <SaccoFeatures />

      <SectionDivider variant="dots" color="green" />

      {/* SACCO Member Services Section */}
      <SaccoMemberServices />

      <SectionDivider variant="gradient" color="green" />

      {/* SASRA Compliance Section */}
      <SasraCompliance />

      <SectionDivider variant="dots" color="green" />

      {/* SACCO Testimonials Section */}
      <SaccoTestimonials />

      <SectionDivider variant="gradient" color="green" />

      {/* SACCO Pricing Section */}
      <SaccoPricing />

      <InstitutionalFooter />
    </div>
  );
}
