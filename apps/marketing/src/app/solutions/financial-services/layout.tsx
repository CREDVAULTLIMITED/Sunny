import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Services Payment Solutions | Sunny - Banking, Lending & Fintech',
  description: 'Enterprise payment infrastructure for financial services. Support banking, lending, insurance, and fintech with regulatory compliance, instant settlements, and advanced security.',
  keywords: [
    'financial services payments',
    'banking payment solutions',
    'fintech payment platform',
    'lending payment processing',
    'insurance payments',
    'regulatory compliance',
    'PCI DSS compliance',
    'financial analytics',
    'instant settlements',
    'KYC automation',
    'AML compliance',
    'open banking',
    'financial APIs',
    'embedded finance'
  ],
  openGraph: {
    title: 'Financial Services Payment Solutions | Sunny',
    description: 'Enterprise payment infrastructure for financial services. Support banking, lending, insurance, and fintech with regulatory compliance and advanced security.',
    type: 'website',
    images: [
      {
        url: '/images/solutions/financial-services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunny Financial Services Payment Solutions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Financial Services Payment Solutions | Sunny',
    description: 'Enterprise payment infrastructure for financial services. Support banking, lending, insurance, and fintech with regulatory compliance and advanced security.',
    images: ['/images/solutions/financial-services-og.jpg']
  }
};

export default function FinancialServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
