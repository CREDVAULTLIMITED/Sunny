import React from 'react';
import DocsLayout from '../../../components/resources/docs/DocsLayout';
import DocsHero from '../../../components/resources/docs/DocsHero';
import DocsSearch from '../../../components/resources/docs/DocsSearch';
import InstitutionTypeSelector from '../../../components/resources/docs/InstitutionTypeSelector';
import DocumentationCategories from '../../../components/resources/docs/DocumentationCategories';
import FeaturedContent from '../../../components/resources/docs/FeaturedContent';
import DocsStats from '../../../components/resources/docs/DocsStats';
import DocsCallToAction from '../../../components/resources/docs/DocsCallToAction';
import SectionDivider from '../../../components/global/SectionDivider';

export default function DocsHomePage() {
  return (
    <DocsLayout showSidebar={false} showBreadcrumbs={false} maxWidth="full" className="bg-white dark:bg-gray-900">
      {/* Documentation Hero Section */}
      <DocsHero />

      <SectionDivider variant="gradient" color="blue" />

      {/* Global Search Section */}
      <DocsSearch />

      <SectionDivider variant="dots" color="blue" />

      {/* Institution Type Selector */}
      <InstitutionTypeSelector />

      <SectionDivider variant="gradient" color="blue" />

      {/* Documentation Categories */}
      <DocumentationCategories />

      <SectionDivider variant="dots" color="blue" />

      {/* Featured Content */}
      <FeaturedContent />

      <SectionDivider variant="gradient" color="blue" />

      {/* Stats Section */}
      <DocsStats />

      <SectionDivider variant="dots" color="blue" />

      {/* Call to Action */}
      <DocsCallToAction />
    </DocsLayout>
  );
}
