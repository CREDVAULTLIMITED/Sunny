import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | Sunny Payments',
  description: 'Get in touch with Sunny Payments. Contact our team for support, partnerships, or general inquiries. We\'re here to help with your payment needs.',
  keywords: ['contact', 'support', 'help', 'customer service', 'partnerships', 'sunny payments contact'],
  openGraph: {
    title: 'Contact Us - Get in Touch | Sunny Payments',
    description: 'Get in touch with Sunny Payments. Contact our team for support, partnerships, or general inquiries.',
    type: 'website',
    url: 'https://sunnypayments.com/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Get in Touch | Sunny Payments',
    description: 'Get in touch with Sunny Payments. Contact our team for support, partnerships, or general inquiries.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
