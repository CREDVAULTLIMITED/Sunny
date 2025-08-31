import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers - Join Our Mission | Sunny Payments',
  description: 'Join Sunny Payments and help build the future of global payments. Explore career opportunities in fintech, engineering, operations, and more at our growing startup.',
  keywords: ['careers', 'jobs', 'fintech careers', 'payment technology', 'startup jobs', 'remote work', 'sunny payments jobs'],
  openGraph: {
    title: 'Careers - Join Our Mission | Sunny Payments',
    description: 'Join Sunny Payments and help build the future of global payments. Explore career opportunities in fintech, engineering, operations, and more.',
    type: 'website',
    url: 'https://sunnypayments.com/careers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers - Join Our Mission | Sunny Payments',
    description: 'Join Sunny Payments and help build the future of global payments. Explore career opportunities in fintech, engineering, operations, and more.',
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
