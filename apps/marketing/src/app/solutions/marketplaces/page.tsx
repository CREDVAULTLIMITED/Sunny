import { MarketplaceHero } from '@/components/solutions/marketplace/MarketplaceHero';
import { MarketplaceFeatures } from '@/components/solutions/marketplace/MarketplaceFeatures';
import { SplitPayments } from '@/components/solutions/marketplace/SplitPayments';
import { MarketplaceCaseStudies } from '@/components/solutions/marketplace/MarketplaceCaseStudies';

export default function MarketplacePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <MarketplaceHero />
      
      {/* Features Overview */}
      <MarketplaceFeatures />
      
      {/* Split Payments Deep Dive */}
      <SplitPayments />
      
      {/* Customer Success Stories */}
      <MarketplaceCaseStudies />
    </main>
  );
}
