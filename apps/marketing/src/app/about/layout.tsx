import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Sunny Payments | Our Mission, Team & Vision for Global Finance',
  description: 'Learn about Sunny Payments\' mission to democratize global finance. Meet our leadership team, discover our values, and see how we\'re building the future of payments across 190+ countries.',
  keywords: [
    'about sunny payments',
    'fintech company',
    'payment technology',
    'global payments',
    'company mission',
    'leadership team',
    'fintech innovation',
    'payment solutions',
    'financial inclusion',
    'company values',
    'sunny team',
    'payment gateway company'
  ],
  openGraph: {
    title: 'About Sunny Payments | Our Mission, Team & Vision',
    description: 'Discover Sunny Payments\' mission to democratize global finance. Meet our team and learn how we\'re revolutionizing payments worldwide.',
    type: 'website',
    images: [
      {
        url: '/images/about/sunny-team-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunny Payments Team and Mission'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Sunny Payments | Our Mission, Team & Vision',
    description: 'Discover Sunny Payments\' mission to democratize global finance. Meet our team and learn how we\'re revolutionizing payments worldwide.',
    images: ['/images/about/sunny-team-og.jpg']
  },
  alternates: {
    canonical: '/about'
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
