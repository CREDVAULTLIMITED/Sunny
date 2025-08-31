import { AboutHero } from '@/components/about/AboutHero';
import { CompanyStory } from '@/components/about/CompanyStory';
import { LeadershipTeam } from '@/components/about/LeadershipTeam';
import { CompanyValues } from '@/components/about/CompanyValues';
import { CompanyTimeline } from '@/components/about/CompanyTimeline';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <AboutHero />
      
      {/* Company Story */}
      <CompanyStory />
      
      {/* Company Values */}
      <CompanyValues />
      
      {/* Leadership Team */}
      <LeadershipTeam />
      
      {/* Company Timeline */}
      <CompanyTimeline />
      
      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Sunny Payments',
            url: 'https://sunnypayments.com',
            logo: 'https://sunnypayments.com/logo.png',
            description: 'Pre-launch fintech startup building global payment infrastructure to democratize finance through innovative payment solutions across 190+ countries.',
            foundingDate: '2024-12',
            founders: [
              {
                '@type': 'Person',
                name: 'Samuel Mbugua',
                jobTitle: 'Chairperson, CTO & CFO'
              },
              {
                '@type': 'Person',
                name: 'Alex',
                jobTitle: 'Head of Operations & Compliance'
              },
              {
                '@type': 'Person',
                name: 'Alan',
                jobTitle: 'Systems Security Engineer'
              }
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: '123 Market Street',
              addressLocality: 'San Francisco',
              addressRegion: 'CA',
              postalCode: '94105',
              addressCountry: 'US'
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-800-SUNNY-PAY',
              contactType: 'customer service',
              availableLanguage: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese']
            },
            sameAs: [
              'https://twitter.com/sunnypayments',
              'https://linkedin.com/company/sunny-payments',
              'https://github.com/sunny-payments'
            ],
            numberOfEmployees: {
              '@type': 'QuantitativeValue',
              value: 3
            },
            award: [
              'Pre-Launch Fintech Startup 2024',
              'Innovative Payment Platform Design',
              'Security-First Architecture'
            ],
            knowsAbout: [
              'Payment Processing',
              'Global Commerce',
              'Financial Technology',
              'Digital Payments',
              'Cross-border Transactions',
              'Payment Security',
              'Financial Inclusion'
            ],
            memberOf: {
              '@type': 'Organization',
              name: 'FinTech Association'
            }
          })
        }}
      />
    </main>
  );
}
