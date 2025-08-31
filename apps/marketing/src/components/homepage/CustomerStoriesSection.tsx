'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChatBubbleLeftIcon,
  StarIcon,
  ArrowRightIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  logo: string;
  description: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  isVideo?: boolean;
}

interface CustomerLogo {
  name: string;
  logo: string;
  industry: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'techstore',
    company: 'TechStore Global',
    industry: 'E-commerce',
    logo: '/logos/techstore.svg',
    description: 'Leading electronics retailer serving 50+ countries',
    challenge: 'High cart abandonment rates due to limited payment options and lengthy checkout process in international markets.',
    solution: 'Implemented Sunny\'s comprehensive payment gateway with local payment methods, optimized checkout flow, and real-time currency conversion.',
    results: [
      { metric: 'Conversion Rate', value: '+45%', improvement: 'Increase' },
      { metric: 'Cart Abandonment', value: '-35%', improvement: 'Reduction' },
      { metric: 'Global Revenue', value: '+78%', improvement: 'Growth' },
      { metric: 'Checkout Time', value: '-60%', improvement: 'Faster' }
    ],
    testimonial: {
      quote: "Sunny transformed our global payments. The integration was seamless, and the results exceeded our expectations. Our international sales have nearly doubled.",
      author: "Sarah Chen",
      role: "VP of E-commerce",
      avatar: "/avatars/sarah-chen.jpg"
    }
  },
  {
    id: 'fintech',
    company: 'FinFlow',
    industry: 'Financial Services',
    logo: '/logos/finflow.svg',
    description: 'Digital banking platform for SMEs',
    challenge: 'Needed enterprise-grade payment infrastructure with advanced security and compliance for their banking clients.',
    solution: 'Leveraged Sunny\'s white-label platform with custom branding, advanced fraud detection, and regulatory compliance tools.',
    results: [
      { metric: 'Processing Volume', value: '+200%', improvement: 'Increase' },
      { metric: 'Fraud Rate', value: '-85%', improvement: 'Reduction' },
      { metric: 'Compliance Score', value: '100%', improvement: 'Perfect' },
      { metric: 'Client Satisfaction', value: '98%', improvement: 'Rating' }
    ],
    testimonial: {
      quote: "Sunny's enterprise platform allowed us to offer bank-grade payment services to our SME clients. The security and compliance features are unmatched.",
      author: "Michael Rodriguez",
      role: "CTO",
      avatar: "/avatars/michael-rodriguez.jpg"
    },
    isVideo: true
  },
  {
    id: 'marketplace',
    company: 'ArtisanHub',
    industry: 'Marketplace',
    logo: '/logos/artisanhub.svg',
    description: 'Global marketplace for handmade goods',
    challenge: 'Complex multi-vendor payments with international sellers requiring split payments and currency conversion.',
    solution: 'Deployed Sunny\'s marketplace solution with automated split payments, multi-currency support, and seller onboarding.',
    results: [
      { metric: 'Seller Onboarding', value: '-75%', improvement: 'Time Reduction' },
      { metric: 'Payment Success', value: '+40%', improvement: 'Rate' },
      { metric: 'International Sales', value: '+150%', improvement: 'Growth' },
      { metric: 'Settlement Speed', value: '2min', improvement: 'Average' }
    ],
    testimonial: {
      quote: "Managing payments for thousands of international sellers was a nightmare. Sunny made it effortless with their marketplace tools.",
      author: "Emma Thompson",
      role: "Founder & CEO",
      avatar: "/avatars/emma-thompson.jpg"
    }
  }
];

const customerLogos: CustomerLogo[] = [
  { name: 'TechCorp', logo: '/logos/techcorp.svg', industry: 'Technology' },
  { name: 'RetailMax', logo: '/logos/retailmax.svg', industry: 'Retail' },
  { name: 'HealthPlus', logo: '/logos/healthplus.svg', industry: 'Healthcare' },
  { name: 'EduTech', logo: '/logos/edutech.svg', industry: 'Education' },
  { name: 'FinanceFlow', logo: '/logos/financeflow.svg', industry: 'Finance' },
  { name: 'LogiMove', logo: '/logos/logimove.svg', industry: 'Logistics' },
  { name: 'FoodChain', logo: '/logos/foodchain.svg', industry: 'Food & Beverage' },
  { name: 'TravelWise', logo: '/logos/travelwise.svg', industry: 'Travel' }
];

export default function CustomerStoriesSection() {
  const [activeStory, setActiveStory] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % caseStudies.length);
  };

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const currentStory = caseStudies[activeStory];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900/70 dark:to-gray-800">
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <Badge variant="secondary" className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
            Customer Success
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Trusted by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
              Industry Leaders
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how businesses across industries are transforming their payment 
            experiences and driving growth with Sunny.
          </p>
        </motion.div>

        {/* Customer Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8 uppercase tracking-wide font-medium">
            Trusted by 10,000+ businesses globally
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {customerLogos.map((customer, index) => (
              <motion.div
                key={customer.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/20 dark:hover:shadow-orange-400/30 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                    {customer.name.slice(0, 2)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Case Study Carousel */}
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Success Stories
            </h3>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStory}
                className="w-10 h-10 p-0"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextStory}
                className="w-10 h-10 p-0"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Case Study Details */}
              <Card className="p-8 border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600 dark:text-gray-300">
                      {currentStory.company.slice(0, 2)}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {currentStory.company}
                      </h3>
                      {currentStory.isVideo && (
                        <Badge variant="outline" className="border-red-200 text-red-700 dark:border-red-800 dark:text-red-400">
                          <PlayIcon className="w-3 h-3 mr-1" />
                          Video
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {currentStory.description}
                    </p>
                    <Badge variant="secondary">
                      {currentStory.industry}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Challenge */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Challenge
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {currentStory.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Solution
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {currentStory.solution}
                    </p>
                  </div>

                  {/* Results Grid */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Results
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {currentStory.results.map((result, index) => (
                        <motion.div
                          key={result.metric}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center"
                        >
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                            {result.value}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                            {result.metric}
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-400">
                            {result.improvement}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Testimonial */}
              <Card className="p-8 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <div className="flex items-center gap-4 mb-6">
                  <ChatBubbleLeftIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  "{currentStory.testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {currentStory.testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {currentStory.testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {currentStory.testimonial.role}, {currentStory.company}
                    </div>
                  </div>
                </div>

                {currentStory.isVideo && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      onClick={() => setShowVideo(true)}
                      variant="outline"
                      className="w-full border-gray-300 hover:border-green-500 hover:text-green-600"
                    >
                      <PlayIcon className="w-4 h-4 mr-2" />
                      Watch Full Story
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Story Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStory(index)}
                title={`View story ${index + 1}`}
                aria-label={`Go to story ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeStory
                    ? 'bg-green-600 dark:bg-green-400'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 lg:mt-24"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <ArrowTrendingUpIcon className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Average 45%
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Increase in conversion rates
              </div>
            </div>
            
            <div className="p-6">
              <ClockIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Under 2 weeks
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Average integration time
              </div>
            </div>
            
            <div className="p-6">
              <UserGroupIcon className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                98% NPS
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Customer satisfaction score
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16 lg:mt-24"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join thousands of successful businesses
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              See how Sunny can transform your payment experience and drive growth for your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Schedule a Demo
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-gray-300 hover:border-green-500">
                View All Case Studies
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
