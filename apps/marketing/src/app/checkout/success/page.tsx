import { Metadata } from 'next';
import CheckoutSuccess from '@/components/checkout/CheckoutSuccess';

export const metadata: Metadata = {
  title: 'Payment Successful - Sunny Payments | Order Confirmation',
  description: 'Your payment has been processed successfully. Thank you for choosing Sunny Payments.',
  robots: {
    index: false, // Don't index success pages
    follow: false
  }
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccess />;
}



