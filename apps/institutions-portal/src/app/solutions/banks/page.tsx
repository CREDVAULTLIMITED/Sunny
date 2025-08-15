import React from 'react';
import InstitutionalHeader from '../../../components/layout/InstitutionalHeader';
import InstitutionalFooter from '../../../components/layout/InstitutionalFooter';
import BanksHero from '../../../components/solutions/banks/BanksHero';
import BankingFeatures from '../../../components/solutions/banks/BankingFeatures';
import BankingIntegrations from '../../../components/solutions/banks/BankingIntegrations';
import BankingCompliance from '../../../components/solutions/banks/BankingCompliance';
import BankingTestimonials from '../../../components/solutions/banks/BankingTestimonials';
import BankingPricing from '../../../components/solutions/banks/BankingPricing';
import SectionDivider from '../../../components/global/SectionDivider';

export default function BanksPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <InstitutionalHeader />

      {/* Banking Hero Section */}
      <BanksHero />

      <SectionDivider variant="gradient" color="blue" />

      {/* Banking Features Section */}
      <BankingFeatures />

      <SectionDivider variant="dots" color="blue" />

      {/* Banking Integrations Section */}
      <BankingIntegrations />

      <SectionDivider variant="gradient" color="blue" />

      {/* Banking Compliance Section */}
      <BankingCompliance />

      <SectionDivider variant="dots" color="blue" />

      {/* Banking Testimonials Section */}
      <BankingTestimonials />

      <SectionDivider variant="gradient" color="blue" />

      {/* Banking Pricing Section */}
      <BankingPricing />

      <InstitutionalFooter />
    </div>
  );
}
