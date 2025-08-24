import React from 'react';
import DocsLayout from '../../../../components/resources/docs/DocsLayout';
import GettingStartedHero from '../../../../components/resources/docs/getting-started/GettingStartedHero';
import QuickStartSteps from '../../../../components/resources/docs/getting-started/QuickStartSteps';

export default function GettingStartedPage() {
  return (
    <DocsLayout showSidebar={true} showBreadcrumbs={true} maxWidth="full">
      <GettingStartedHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <QuickStartSteps currentStep={1} />
      </div>
    </DocsLayout>
  );
}
