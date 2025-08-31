import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation | Sunny Institutions Portal',
  description: 'Comprehensive documentation for financial institutions using Sunny payment infrastructure. Guides, API references, compliance requirements, and integration tutorials.',
  keywords: [
    'sunny payments',
    'financial institutions',
    'payment gateway',
    'API documentation',
    'banking integration',
    'SACCO management',
    'microfinance',
    'fintech solutions',
    'CBK compliance',
    'M-Pesa integration',
    'payment processing',
    'KRA compliance',
    'AML CFT'
  ],
  authors: [{ name: 'Sunny Payments Team' }],
  creator: 'Sunny Payments',
  publisher: 'Sunny Payments',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://institutions.sunnypayments.com/resources/docs',
    siteName: 'Sunny Institutions Portal',
    title: 'Documentation | Sunny Institutions Portal',
    description: 'Comprehensive documentation for financial institutions using Sunny payment infrastructure.',
    images: [
      {
        url: '/images/og-docs.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunny Institutions Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sunnypayments',
    creator: '@sunnypayments',
    title: 'Documentation | Sunny Institutions Portal',
    description: 'Comprehensive documentation for financial institutions using Sunny payment infrastructure.',
    images: ['/images/twitter-docs.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: 'https://institutions.sunnypayments.com/resources/docs',
    languages: {
      'en-KE': 'https://institutions.sunnypayments.com/resources/docs',
      'sw-KE': 'https://institutions.sunnypayments.com/sw/resources/docs',
    },
  },
  category: 'technology',
  classification: 'Financial Technology Documentation',
};

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="docs-layout">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Sunny Institutions Documentation',
            description: 'Comprehensive documentation for financial institutions using Sunny payment infrastructure',
            url: 'https://institutions.sunnypayments.com/resources/docs',
            publisher: {
              '@type': 'Organization',
              name: 'Sunny Payments',
              logo: {
                '@type': 'ImageObject',
                url: 'https://institutions.sunnypayments.com/images/logo.png',
              },
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://institutions.sunnypayments.com/resources/docs/search?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* Main Content */}
      <main className="docs-main" id="main-content">
        {children}
      </main>

      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 transition-all duration-200"
      >
        Skip to main content
      </a>

      {/* Accessibility Announcements */}
      <div
        id="a11y-announcements"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
    </div>
  );
}
