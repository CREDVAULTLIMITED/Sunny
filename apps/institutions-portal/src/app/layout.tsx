import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@sunny/ui/globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Sunny Institutions Portal | Financial Infrastructure Platform',
  description: 'Comprehensive payment infrastructure designed specifically for banks, SACCOs, MFIs, and fintech companies. Ensure regulatory compliance while delivering exceptional digital financial services.',
  keywords: 'institutional payments, banking infrastructure, SACCO solutions, microfinance, fintech platform, regulatory compliance, CBK, SASRA',
  authors: [{ name: 'Sunny Payments' }],
  creator: 'Sunny Payments',
  publisher: 'Sunny Payments',
  robots: 'index, follow',
  openGraph: {
    title: 'Sunny Institutions Portal | Financial Infrastructure Platform',
    description: 'Comprehensive payment infrastructure for financial institutions',
    type: 'website',
    url: 'https://institutions.sunnypayments.com',
    siteName: 'Sunny Institutions Portal',
    images: [
      {
        url: '/og-image-institutions.png',
        width: 1200,
        height: 630,
        alt: 'Sunny Institutions Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sunnypayments',
    creator: '@sunnypayments',
    title: 'Sunny Institutions Portal | Financial Infrastructure Platform',
    description: 'Comprehensive payment infrastructure for financial institutions',
    images: ['/og-image-institutions.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#64748b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
