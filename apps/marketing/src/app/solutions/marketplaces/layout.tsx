import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketplace Payment Solutions | Sunny - Split Payments & Commission Management',
  description: 'Power your marketplace with Sunny\'s advanced split payment solutions. Handle vendor payouts, commission management, and multi-party transactions with ease. Support for global marketplaces.',
  keywords: [
    'marketplace payments',
    'split payments',
    'commission management',
    'vendor payouts',
    'multi-party transactions',
    'marketplace payment gateway',
    'escrow payments',
    'marketplace analytics',
    'vendor onboarding',
    'payment splitting'
  ],
  openGraph: {
    title: 'Marketplace Payment Solutions | Sunny',
    description: 'Advanced split payment solutions for marketplaces. Handle vendor payouts, commissions, and multi-party transactions seamlessly.',
    type: 'website',
    images: [
      {
        url: '/images/solutions/marketplace-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunny Marketplace Payment Solutions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketplace Payment Solutions | Sunny',
    description: 'Advanced split payment solutions for marketplaces. Handle vendor payouts, commissions, and multi-party transactions seamlessly.',
    images: ['/images/solutions/marketplace-og.jpg']
  }
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}