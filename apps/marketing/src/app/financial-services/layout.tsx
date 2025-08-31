import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Sunny Financial Services',
    default: 'Financial Services Platform | Sunny Payment Gateway',
  },
  description: 'Enterprise financial services infrastructure with banking integrations, white-label solutions, and enterprise-grade security.',
};

export default function FinancialServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="financial-services-platform">
      {children}
    </div>
  );
}

