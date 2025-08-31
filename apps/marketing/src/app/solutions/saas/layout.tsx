import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SaaS Payment Solutions | Sunny Payments',
  description: 'Comprehensive payment solutions for SaaS businesses. Subscription management, billing automation, dunning, and revenue optimization built for recurring revenue models.',
  keywords: 'SaaS payments, subscription billing, recurring payments, dunning management, subscription analytics, MRR, ARR, churn reduction',
  openGraph: {
    title: 'SaaS Payment Solutions | Sunny Payments',
    description: 'Comprehensive payment solutions for SaaS businesses. Subscription management, billing automation, dunning, and revenue optimization.',
    type: 'website',
    images: [
      {
        url: '/images/solutions/saas-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunny SaaS Payment Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Payment Solutions | Sunny Payments',
    description: 'Comprehensive payment solutions for SaaS businesses. Subscription management, billing automation, dunning, and revenue optimization.',
    images: ['/images/solutions/saas-og.jpg'],
  },
};

export default function SaaSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {children}
    </div>
  );
}
