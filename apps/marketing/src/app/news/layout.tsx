import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News & Updates - Stay Informed | Sunny Payments',
  description: 'Stay up to date with the latest news, product updates, and insights from Sunny Payments. Read about our journey, industry trends, and payment innovation.',
  keywords: ['news', 'updates', 'blog', 'fintech news', 'payment trends', 'sunny payments news', 'company updates'],
  openGraph: {
    title: 'News & Updates - Stay Informed | Sunny Payments',
    description: 'Stay up to date with the latest news, product updates, and insights from Sunny Payments.',
    type: 'website',
    url: 'https://sunnypayments.com/news',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News & Updates - Stay Informed | Sunny Payments',
    description: 'Stay up to date with the latest news, product updates, and insights from Sunny Payments.',
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
