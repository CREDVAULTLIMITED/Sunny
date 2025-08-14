import React from 'react';
import InstitutionalHeader from '../components/layout/InstitutionalHeader';
import InstitutionalFooter from '../components/layout/InstitutionalFooter';
import AnimatedInstitutionalHero from '../components/sections/AnimatedInstitutionalHero';
import InstitutionalFeatures from '../components/sections/InstitutionalFeatures';
import InstitutionTypes from '../components/sections/InstitutionTypes';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <InstitutionalHeader />
      
      {/* Animated Hero Section */}
      <AnimatedInstitutionalHero />
      
      {/* Institution Types Section */}
      <InstitutionTypes />
      
      {/* Features Section */}
      <InstitutionalFeatures />
      
      <InstitutionalFooter />
    </div>
  );
}
