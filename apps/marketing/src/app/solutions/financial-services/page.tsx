import { FinancialServicesHero } from '@/components/solutions/financial-services/FinancialServicesHero';
import { FinancialServicesFeatures } from '@/components/solutions/financial-services/FinancialServicesFeatures';
import { ComplianceSecurity } from '@/components/solutions/financial-services/ComplianceSecurity';
import { FinancialServicesCaseStudies } from '@/components/solutions/financial-services/FinancialServicesCaseStudies';

export default function FinancialServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <FinancialServicesHero />
      
      {/* Features Overview */}
      <FinancialServicesFeatures />
      
      {/* Compliance & Security Deep Dive */}
      <ComplianceSecurity />
      
      {/* Customer Success Stories */}
      <FinancialServicesCaseStudies />
    </main>
  );
}
