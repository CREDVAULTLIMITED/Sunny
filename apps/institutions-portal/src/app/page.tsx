import React from 'react';
import InstitutionalHeader from '../components/layout/InstitutionalHeader';
import InstitutionalFooter from '../components/layout/InstitutionalFooter';
import AnimatedInstitutionalHero from '../components/sections/AnimatedInstitutionalHero';
import InstitutionalFeatures from '../components/sections/InstitutionalFeatures';
import InstitutionTypes from '../components/sections/InstitutionTypes';
import SectionDivider from '../components/global/SectionDivider';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <InstitutionalHeader />
      
      {/* Animated Hero Section */}
      <AnimatedInstitutionalHero />
      
      <SectionDivider variant="gradient" color="green" />
      
      {/* Institution Types Section */}
      <InstitutionTypes />
      
      <SectionDivider variant="dots" color="green" />
      
      {/* Features Section */}
      <InstitutionalFeatures />
      
      <InstitutionalFooter />
    </div>
  );
}
