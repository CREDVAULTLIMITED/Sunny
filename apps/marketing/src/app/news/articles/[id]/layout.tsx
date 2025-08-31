import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Article - Sunny Payments Blog',
  description: 'Read the latest insights and updates from Sunny Payments.',
};

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
