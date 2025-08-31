'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Layout from '@/components/layout/Layout';

const pricingPlans = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses and startups',
    price: 'Free',
    priceDetail: 'up to $1,000/month',
    features: [
      'Up to $1,000 in monthly volume',
      '2.9% + $0.30 per transaction',
      'Accept major credit cards',
      'Basic dashboard and reporting',
      'Email support',
      'Standard settlement (2-3 days)'
    ],
    cta: 'Get Started Free',
    popular: false
  },
  {
    name: 'Growth',
    description: 'For growing businesses with higher volumes',
    price: '$29',
    priceDetail: 'per month',
    features: [
      'Unlimited monthly volume',
      '2.7% + $0.30 per transaction',
      'All payment methods',
      'Advanced analytics',
      'Priority email support',
      'Next-day settlement',
      'Subscription billing',
      'Basic API access'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Scale',
    description: 'For large businesses and enterprises',
    price: '$99',
    priceDetail: 'per month',
    features: [
      'Unlimited monthly volume',
      '2.5% + $0.30 per transaction',
      'All payment methods + crypto',
      'Real-time analytics',
      'Phone and chat support',
      'Instant settlement',
      'Advanced subscription management',
      'Full API access',
      'Marketplace payments',
      'Dedicated account manager'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function PricingPage() {
  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                Simple, Transparent
                <span className="text-green-600 block">Pricing</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              >
                No setup fees, no monthly minimums, no hidden costs. 
                Pay only for what you use with transparent pricing.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                    plan.popular ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {plan.description}
                      </p>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-gray-600 ml-2">
                          {plan.priceDetail}
                        </span>
                      </div>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                        plan.popular
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {plan.cta}
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our pricing
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  question: "Are there any setup fees?",
                  answer: "No, there are no setup fees, integration fees, or monthly minimums. You only pay for successful transactions."
                },
                {
                  question: "When do I get paid?",
                  answer: "Standard payouts are made within 2-3 business days. Premium plans offer next-day or instant settlement options."
                },
                {
                  question: "What payment methods do you support?",
                  answer: "We support all major credit cards, bank transfers, mobile money, digital wallets, and cryptocurrency payments."
                },
                {
                  question: "Can I change plans anytime?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust Sunny for their payment processing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Create Account
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-green-400 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Contact Sales
              </motion.button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

