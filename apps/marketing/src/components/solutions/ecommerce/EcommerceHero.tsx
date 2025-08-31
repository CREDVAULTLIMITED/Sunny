'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  ShoppingCartIcon, 
  CreditCardIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon,
  ChartBarIcon,
  BoltIcon,
  ArrowRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

export function EcommerceHero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    { value: '20+', label: 'Payment Methods' },
    { value: '190+', label: 'Countries' },
    { value: '99.9%', label: 'Uptime' },
    { value: '<1s', label: 'Checkout Load Time' },
  ];

  const trustIndicators = [
    { icon: ShieldCheckIcon, text: 'PCI DSS Level 1' },
    { icon: GlobeAltIcon, text: '190+ Countries' },
    { icon: BoltIcon, text: 'Sub-minute Settlement' },
    { icon: ChartBarIcon, text: 'AI-Powered Analytics' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16 pb-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 transform rotate-12 scale-110"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                <ShoppingCartIcon className="w-4 h-4 mr-1" />
                E-commerce Solutions
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                New: AI Checkout Optimization
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Supercharge Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  E-commerce Sales
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Complete payment processing solution with 20+ global payment methods, 
                AI-powered fraud detection, and conversion-optimized checkout flows. 
                Increase your revenue with enterprise-grade security and instant settlements.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <indicator.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span>{indicator.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                Start Free Integration
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <PlayIcon className="w-5 h-5 mr-2 group-hover:text-blue-600" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main Dashboard Mockup */}
            <Card className="relative overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border-0">
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg"></div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Online Store</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Payment Dashboard</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                    Live
                  </Badge>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">$124,580</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Revenue Today</div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">↗ +18.2%</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-900 dark:text-green-300">2,847</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Transactions</div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">↗ +12.5%</div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Payment Methods</div>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <CreditCardIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                    </div>
                    <div className="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded"></div>
                    </div>
                    <div className="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400">
                      +17
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Transactions</div>
                  <div className="space-y-2">
                    {[
                      { amount: '$89.99', method: 'Visa •••• 4242', status: 'success' },
                      { amount: '$156.50', method: 'PayPal', status: 'success' },
                      { amount: '$42.00', method: 'Apple Pay', status: 'processing' },
                    ].map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            transaction.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}></div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.amount}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.method}</div>
                          </div>
                        </div>
                        <Badge variant={transaction.status === 'success' ? 'default' : 'secondary'} className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </Card>

            {/* Floating Success Notification */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce">
              🎉 Payment Successful!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
