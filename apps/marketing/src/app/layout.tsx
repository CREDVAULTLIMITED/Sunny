import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@sunny/ui/globals.css';
import { ThemeProvider } from '@/lib/contexts/theme-context';
import ConditionalLayout from '@/components/layout/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sunny Payment Gateway | Global Payment Processing',
  description: 'A comprehensive, secure, and global payment processing solution for businesses of all sizes.',
  keywords: 'payment gateway, payment processing, fintech, global payments, secure payments',
  authors: [{ name: 'Sunny Payments' }],
  creator: 'Sunny Payments',
  publisher: 'Sunny Payments',
  robots: 'index, follow',
  openGraph: {
    title: 'Sunny Payment Gateway',
    description: 'Global payment processing solution with instant settlement and advanced security.',
    type: 'website',
    url: 'https://sunnypayments.com',
    siteName: 'Sunny Payments',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sunny Payment Gateway',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sunnypayments',
    creator: '@sunnypayments',
    title: 'Sunny Payment Gateway',
    description: 'Global payment processing solution with instant settlement and advanced security.',
    images: ['/og-image.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#02A669',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full antialiased`}>
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          attribute="class"
          storageKey="sunny-theme"
          disableTransitionOnChange={false}
        >
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}