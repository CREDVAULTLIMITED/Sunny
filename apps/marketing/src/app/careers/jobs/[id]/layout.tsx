import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Details - Sunny Payments Careers',
  description: 'Learn more about this career opportunity at Sunny Payments and apply to join our mission.',
};

export default function JobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
