import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | Sunny Payments',
  description: 'Sign in or create your Sunny Payments account',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-green-900/20">
      {children}
    </div>
  );
}
