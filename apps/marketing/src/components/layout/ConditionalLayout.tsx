'use client';

import { usePathname } from 'next/navigation';
import Layout from './Layout';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Define auth routes - any route that should not have header/footer
  const authRoutes = [
    '/sign-in',
    '/sign-up', 
    '/forgot-password',
    '/reset-password',
    '/login',
    '/register',
    '/auth'
  ];
  
  // Check if current pathname matches any auth route
  const isAuthPage = authRoutes.some(route => 
    pathname === route || pathname?.startsWith(`${route}/`) || pathname?.startsWith(`${route}?`)
  );

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('ConditionalLayout - pathname:', pathname, 'isAuthPage:', isAuthPage);
  }

  // If it's an auth page, render children without Layout wrapper
  if (isAuthPage) {
    return <>{children}</>;
  }

  // For all other pages, use the normal Layout with header and footer
  return (
    <Layout>
      {children}
    </Layout>
  );
}
