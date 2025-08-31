import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout - Sunny Payments | Complete Your Purchase',
  description: 'Complete your purchase securely with Sunny Payments. Bank-grade security, multiple payment methods, and instant processing.',
  keywords: [
    'secure checkout',
    'payment processing',
    'online payment',
    'secure payment',
    'checkout form',
    'payment gateway',
    'credit card payment',
    'digital wallet',
    'cryptocurrency payment',
    'bank transfer'
  ],
  openGraph: {
    title: 'Secure Checkout - Sunny Payments',
    description: 'Complete your purchase securely with bank-grade security and multiple payment options.',
    type: 'website',
    siteName: 'Sunny Payments',
    images: [
      {
        url: '/images/og/checkout.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunny Payments Secure Checkout'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secure Checkout - Sunny Payments',
    description: 'Complete your purchase securely with bank-grade security.',
    images: ['/images/og/checkout.jpg']
  },
  alternates: {
    canonical: '/checkout'
  },
  robots: {
    index: false, // Don't index checkout pages
    follow: false
  }
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



