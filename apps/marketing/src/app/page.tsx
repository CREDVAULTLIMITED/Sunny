'use client';

/**
 * Main landing page for Sunny Payment Gateway
 * Redesigned with modular components following the website structure documentation
 */

import React from 'react';

// Homepage Components
import HeroSection from '@/components/homepage/HeroSection';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import PaymentMethodsSection from '@/components/homepage/PaymentMethodsSection';
import AIFeaturesSection from '@/components/homepage/AIFeaturesSection';
import DeveloperToolsSection from '@/components/homepage/DeveloperToolsSection';
import DemoSection from '@/components/homepage/DemoSection';
import CustomerStoriesSection from '@/components/homepage/CustomerStoriesSection';
import GettingStartedSection from '@/components/homepage/GettingStartedSection';

// Global Components
import SectionDivider from '@/components/global/SectionDivider';

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <HeroSection />
      
      <SectionDivider variant="gradient" color="green" />
      
      {/* Key Features Section */}
      <FeaturesSection />
      
      <SectionDivider variant="dots" color="blue" />
      
      {/* Payment Methods Showcase */}
      <PaymentMethodsSection />
      
      <SectionDivider variant="wave" color="purple" />
      
      {/* AI & Advanced Features Section */}
      <AIFeaturesSection />
      
      <SectionDivider variant="dots" color="green" />
      
      {/* Developer Tools Showcase */}
      <DeveloperToolsSection />
      
      <SectionDivider variant="gradient" color="blue" />
      
      {/* Interactive Demo Section */}
      <DemoSection />
      
      <SectionDivider variant="dots" color="orange" />
      
      {/* Customer Stories Section */}
      <CustomerStoriesSection />
      
      <SectionDivider variant="gradient" color="pink" />
      
      {/* Getting Started Section */}
      <GettingStartedSection />
    </div>
  );
}