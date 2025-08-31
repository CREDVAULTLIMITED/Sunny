import { Metadata } from 'next';
import { SaaSHero } from '@/components/solutions/saas/SaaSHero';
import { SaaSFeatures } from '@/components/solutions/saas/SaaSFeatures';
import { SubscriptionManagement } from '@/components/solutions/saas/SubscriptionManagement';
import { SaaSCaseStudies } from '@/components/solutions/saas/SaaSCaseStudies';
import { SaaSPricingCalculator } from '@/components/solutions/saas/SaaSPricingCalculator';

export const metadata: Metadata = {
  title: 'SaaS Payment Solutions | Subscription Billing & Revenue Management | Sunny Payments',
  description: 'Complete payment infrastructure for SaaS businesses. Reduce churn by 67%, recover 40% more revenue, and scale globally with intelligent subscription management, dunning, and analytics.',
  keywords: [
    'SaaS payments',
    'subscription billing',
    'recurring payments',
    'dunning management',
    'revenue recovery',
    'subscription analytics',
    'MRR tracking',
    'ARR growth',
    'churn reduction',
    'payment automation',
    'billing automation',
    'usage-based billing',
    'subscription management',
    'SaaS revenue',
    'payment platform'
  ].join(', '),
  openGraph: {
    title: 'SaaS Payment Solutions | Subscription Billing & Revenue Management',
    description: 'Complete payment infrastructure for SaaS businesses. Reduce churn by 67%, recover 40% more revenue, and scale globally.',
    type: 'website',
    images: [
      {
        url: '/images/solutions/saas-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunny SaaS Payment Solutions - Subscription Billing & Revenue Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Payment Solutions | Subscription Billing & Revenue Management',
    description: 'Complete payment infrastructure for SaaS businesses. Reduce churn by 67%, recover 40% more revenue, and scale globally.',
    images: ['/images/solutions/saas-hero.jpg'],
  },
  alternates: {
    canonical: '/solutions/saas',
  },
};

export default function SaaSPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <SaaSHero />
      
      {/* Features Overview */}
      <SaaSFeatures />
      
      {/* Subscription Management Deep Dive */}
      <SubscriptionManagement />
      
      {/* Customer Success Stories */}
      <SaaSCaseStudies />
      
      {/* Pricing Calculator */}
      <SaaSPricingCalculator />
      
      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Sunny SaaS Payment Solutions',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Complete payment infrastructure for SaaS businesses with subscription management, billing automation, and revenue analytics.',
            offers: {
              '@type': 'Offer',
              price: '2.9',
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '2.9',
                priceCurrency: 'USD',
                unitText: 'percent per transaction'
              }
            },
            features: [
              'Subscription Management',
              'Smart Dunning & Revenue Recovery',
              'Revenue Analytics & Forecasting',
              'Global Tax Compliance',
              'Usage-based Billing',
              'Customer Portal',
              'Enterprise Security',
              'Multi-currency Support'
            ],
            provider: {
              '@type': 'Organization',
              name: 'Sunny Payments',
              url: 'https://sunnypayments.com',
              logo: 'https://sunnypayments.com/logo.png'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '1247',
              bestRating: '5'
            }
          })
        }}
      />
    </main>
  );
}
