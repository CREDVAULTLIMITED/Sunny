import type { Metadata } from 'next';
import SubscriptionsHero from '@/components/subscriptions/SubscriptionsHero';
import RecurringBillingFeatures from '@/components/subscriptions/RecurringBillingFeatures';
import PlanManagement from '@/components/subscriptions/PlanManagement';
import DunningManagement from '@/components/subscriptions/DunningManagement';
import CustomerPortal from '@/components/subscriptions/CustomerPortal';
import SubscriptionAnalytics from '@/components/subscriptions/SubscriptionAnalytics';

export const metadata: Metadata = {
  title: 'Subscription Management Platform | Sunny Payment Gateway',
  description: 'Complete subscription billing platform with smart dunning, analytics, and customer self-service. Reduce churn and maximize lifetime value with automated recurring revenue management.',
  keywords: [
    'subscription management',
    'recurring billing',
    'subscription analytics',
    'dunning management',
    'customer portal',
    'MRR tracking',
    'churn reduction',
    'subscription platform'
  ],
  openGraph: {
    title: 'Subscription Management Platform | Sunny Payment Gateway',
    description: 'Complete subscription billing platform with smart dunning, analytics, and customer self-service.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subscription Management Platform | Sunny Payment Gateway',
    description: 'Complete subscription billing platform with smart dunning, analytics, and customer self-service.',
  },
};

export default function SubscriptionsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <SubscriptionsHero />
      
      {/* Recurring Billing Features */}
      <RecurringBillingFeatures />
      
      {/* Plan Management */}
      <PlanManagement />
      
      {/* Dunning Management */}
      <DunningManagement />
      
      {/* Customer Portal */}
      <CustomerPortal />
      
      {/* Subscription Analytics */}
      <SubscriptionAnalytics />
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Scale Your Subscription Business?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using Sunny to manage their subscription revenue. 
            Start your free trial today and see the difference intelligent automation makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-lg hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              Schedule Demo
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Trusted by subscription businesses worldwide
            </p>
            <div className="flex items-center justify-center gap-8 text-gray-400 dark:text-gray-600">
              <div className="font-semibold text-lg">1,200+</div>
              <div className="text-sm">Active Businesses</div>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <div className="font-semibold text-lg">$2.4B+</div>
              <div className="text-sm">Revenue Processed</div>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <div className="font-semibold text-lg">94%</div>
              <div className="text-sm">Recovery Rate</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
