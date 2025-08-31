'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CalculatorIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

export function EcommercePricingCalculator() {
  const [monthlyVolume, setMonthlyVolume] = useState(10000);
  const [averageTransaction, setAverageTransaction] = useState(50);
  const [selectedMethods, setSelectedMethods] = useState(['cards', 'digital-wallets']);
  const [businessType, setBusinessType] = useState('ecommerce');
  const [region, setRegion] = useState('north-america');

  const [calculations, setCalculations] = useState({
    transactions: 0,
    sunnyFees: 0,
    competitorFees: 0,
    savings: 0,
    savingsPercent: 0
  });

  const paymentMethods = [
    { id: 'cards', name: 'Credit/Debit Cards', fee: 2.9, fixedFee: 0.30, popular: true },
    { id: 'digital-wallets', name: 'Digital Wallets', fee: 2.9, fixedFee: 0.30, popular: true },
    { id: 'bank-transfers', name: 'Bank Transfers', fee: 0.8, fixedFee: 0, popular: false },
    { id: 'mobile-money', name: 'Mobile Money', fee: 1.5, fixedFee: 0.10, popular: false },
    { id: 'crypto', name: 'Cryptocurrency', fee: 1.0, fixedFee: 0, popular: false },
    { id: 'bnpl', name: 'Buy Now Pay Later', fee: 3.5, fixedFee: 0.50, popular: false }
  ];

  const businessTypes = [
    { id: 'ecommerce', name: 'E-commerce Store', multiplier: 1.0 },
    { id: 'saas', name: 'SaaS/Subscription', multiplier: 0.9 },
    { id: 'marketplace', name: 'Marketplace', multiplier: 1.1 },
    { id: 'nonprofit', name: 'Non-profit', multiplier: 0.8 }
  ];

  const regions = [
    { id: 'north-america', name: 'North America', multiplier: 1.0 },
    { id: 'europe', name: 'Europe', multiplier: 1.1 },
    { id: 'asia-pacific', name: 'Asia Pacific', multiplier: 0.9 },
    { id: 'africa', name: 'Africa', multiplier: 0.8 }
  ];

  const volumeTiers = [
    { min: 0, max: 1000, discount: 0 },
    { min: 1000, max: 10000, discount: 0.05 },
    { min: 10000, max: 100000, discount: 0.10 },
    { min: 100000, max: 1000000, discount: 0.15 },
    { min: 1000000, max: Infinity, discount: 0.20 }
  ];

  useEffect(() => {
    calculatePricing();
  }, [monthlyVolume, averageTransaction, selectedMethods, businessType, region]);

  const calculatePricing = () => {
    const transactions = Math.floor(monthlyVolume / averageTransaction);
    
    // Get volume discount
    const volumeTier = volumeTiers.find(tier => monthlyVolume >= tier.min && monthlyVolume < tier.max);
    const volumeDiscount = volumeTier?.discount || 0;
    
    // Get business type multiplier
    const businessMultiplier = businessTypes.find(bt => bt.id === businessType)?.multiplier || 1.0;
    
    // Get region multiplier
    const regionMultiplier = regions.find(r => r.id === region)?.multiplier || 1.0;
    
    // Calculate weighted average fees based on selected payment methods
    let weightedFee = 0;
    let weightedFixedFee = 0;
    const selectedMethodsData = paymentMethods.filter(method => selectedMethods.includes(method.id));
    
    if (selectedMethodsData.length > 0) {
      selectedMethodsData.forEach(method => {
        weightedFee += method.fee;
        weightedFixedFee += method.fixedFee;
      });
      weightedFee = weightedFee / selectedMethodsData.length;
      weightedFixedFee = weightedFixedFee / selectedMethodsData.length;
    }
    
    // Apply discounts and multipliers
    const finalFeeRate = (weightedFee * (1 - volumeDiscount) * businessMultiplier * regionMultiplier) / 100;
    const finalFixedFee = weightedFixedFee * regionMultiplier;
    
    // Calculate Sunny fees
    const sunnyFees = (monthlyVolume * finalFeeRate) + (transactions * finalFixedFee);
    
    // Calculate competitor fees (typically 15-20% higher)
    const competitorFees = sunnyFees * 1.18;
    
    // Calculate savings
    const savings = competitorFees - sunnyFees;
    const savingsPercent = (savings / competitorFees) * 100;
    
    setCalculations({
      transactions,
      sunnyFees: Math.round(sunnyFees * 100) / 100,
      competitorFees: Math.round(competitorFees * 100) / 100,
      savings: Math.round(savings * 100) / 100,
      savingsPercent: Math.round(savingsPercent * 10) / 10
    });
  };

  const handleMethodToggle = (methodId: string) => {
    setSelectedMethods(prev => 
      prev.includes(methodId) 
        ? prev.filter(id => id !== methodId)
        : [...prev, methodId]
    );
  };

  const features = [
    'No setup fees or monthly minimums',
    'Transparent pricing with no hidden costs',
    'Volume discounts for growing businesses',
    'Free integration support and documentation',
    'Advanced fraud protection included',
    'Real-time analytics and reporting',
    '24/7 customer support',
    'Same-day payouts available'
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
              <CalculatorIcon className="w-4 h-4 mr-1" />
              Pricing Calculator
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Calculate Your Savings
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See exactly how much you could save with Sunny's transparent, competitive pricing. 
              No hidden fees, no surprises—just honest pricing that scales with your business.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <Card className="p-8 bg-white dark:bg-gray-800">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Customize Your Estimate
              </h3>

              {/* Monthly Volume */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Monthly Transaction Volume
                </label>
                <div className="relative">
                  <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="10,000"
                  />
                </div>
                <div className="flex space-x-2">
                  {[1000, 10000, 50000, 100000].map(amount => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setMonthlyVolume(amount)}
                      className="text-xs"
                    >
                      ${amount.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Average Transaction */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Average Transaction Amount
                </label>
                <div className="relative">
                  <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={averageTransaction}
                    onChange={(e) => setAverageTransaction(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="50"
                  />
                </div>
                <div className="flex space-x-2">
                  {[25, 50, 100, 250].map(amount => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAverageTransaction(amount)}
                      className="text-xs"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Payment Methods You'll Use
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {paymentMethods.map(method => (
                    <label key={method.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMethods.includes(method.id)}
                        onChange={() => handleMethodToggle(method.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-900 dark:text-white">{method.name}</span>
                          {method.popular && (
                            <Badge variant="secondary" className="text-xs">Popular</Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {method.fee}% + ${method.fixedFee}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Business Type */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Business Type
                </label>
                              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                title="Select your business type"
              >
                  {businessTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              {/* Region */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Primary Region
                </label>
                              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                title="Select your primary region"
              >
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-8">
            {/* Pricing Results */}
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                  Your Monthly Estimate
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Transactions</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {calculations.transactions.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Volume</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${monthlyVolume.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Sunny Processing Fees</span>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      ${calculations.sunnyFees.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Competitor Average</span>
                    <span className="text-xl font-bold text-gray-400 line-through">
                      ${calculations.competitorFees.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Savings</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${calculations.savings.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">
                        ({calculations.savingsPercent}% savings)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-green-700 dark:text-green-300 mb-1">Annual Savings</div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      ${(calculations.savings * 12).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* What's Included */}
            <Card className="p-8 bg-white dark:bg-gray-800">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  What's Included
                </h3>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* CTA */}
            <Card className="p-8 bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Ready to Start Saving?</h3>
                  <p className="text-blue-100">
                    Get started with Sunny today and see these savings in your first month. 
                    No setup fees, no long-term contracts.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Start Free Trial
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Schedule Demo
                  </Button>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-blue-100">
                  <InformationCircleIcon className="w-4 h-4" />
                  <span>Estimates based on current market rates and may vary</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
