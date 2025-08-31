import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Articles - Sunny Payments Blog',
  description: 'Browse all articles, insights, and updates from Sunny Payments. Stay informed about payment technology, fintech trends, and our journey building global payment infrastructure.',
  keywords: ['articles', 'blog posts', 'fintech articles', 'payment technology', 'sunny payments blog', 'fintech insights'],
  openGraph: {
    title: 'All Articles - Sunny Payments Blog',
    description: 'Browse all articles, insights, and updates from Sunny Payments.',
    type: 'website',
    url: 'https://sunnypayments.com/news/articles',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Articles - Sunny Payments Blog',
    description: 'Browse all articles, insights, and updates from Sunny Payments.',
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
