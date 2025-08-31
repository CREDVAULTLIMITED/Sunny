import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Sunny Marketplace',
    default: 'Marketplace Payment Solutions | Sunny Payment Gateway',
  },
  description: 'Complete marketplace payment platform with split payments, escrow services, and automated commission management.',
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="marketplace-platform">
      {children}
    </div>
  );
}

