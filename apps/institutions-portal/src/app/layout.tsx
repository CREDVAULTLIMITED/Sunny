import React from 'react';
import type { Metadata } from 'next';
import '@sunny/ui/globals.css';

export const metadata: Metadata = {
  title: 'Sunny Institutions Portal | Banking & Financial Solutions',
  description: 'Comprehensive payment solutions for financial institutions, banks, and payment processors across Africa.',
  keywords: 'banking, payments, financial institutions, Kenya, Africa, compliance, CBK',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
