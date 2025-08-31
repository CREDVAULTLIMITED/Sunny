import { ReactNode } from 'react';

interface EcommerceSolutionsLayoutProps {
  children: ReactNode;
}

export default function EcommerceSolutionsLayout({ children }: EcommerceSolutionsLayoutProps) {
  return (
    <div className="ecommerce-solutions-layout">
      {children}
    </div>
  );
}
