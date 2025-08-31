import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Sunny Subscriptions',
    default: 'Subscription Management Platform | Sunny Payment Gateway',
  },
  description: 'Complete subscription billing platform with smart dunning, analytics, and customer self-service.',
};

export default function SubscriptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="subscription-platform">
      {children}
    </div>
  );
}
