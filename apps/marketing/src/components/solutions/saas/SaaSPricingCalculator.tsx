'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CalculatorIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  BanknotesIcon,
  CreditCardIcon,
  GlobeAltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface PricingTier {
  name: string;
  monthlyVolume: number;
  percentageFee: number;
  fixedFee: number;
  features: string[];
  popular?: boolean;
}

export function SaaSPricingCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000);
  const [averageTransactionValue, setAverageTransactionValue] = useState(49);
  const [paymentMethods, setPaymentMethods] = useState(['cards', 'bank_transfers']);
  const [region, setRegion] = useState('north_america');
  const [showComparison, setShowComparison] = useState(false);

  const [calculations, setCalculations] = useState({
    transactionCount: 0,
    sunnyFees: 0,
    competitorFees: 0,
    savings: 0,
    annualSavings: 0
  });

  const pricingTiers: PricingTier[] = [
    {
      name: 'Starter',
      monthlyVolume: 10000,
      percentageFee: 2.9,
      fixedFee: 0.30,
      features: [
        'Subscription management',
        'Basic dunning',
        'Standard reporting',
        'Email support'
      ]
    },
    {
      name: 'Growth',
      monthlyVolume: 100000,
      percentageFee: 2.7,
      fixedFee: 0.30,
      popular: true,
      features: [
        'Advanced subscription management',
        'Smart dunning & recovery',
        'Revenue analytics',
        'Priority support',
        'Custom billing cycles',
        'Usage-based billing'
      ]
    },
    {
      name: 'Scale',
      monthlyVolume: 500000,
      percentageFee: 2.5,
      fixedFee: 0.25,
      features: [
        'Enterprise subscription features',
        'AI-powered dunning',
        'Advanced analytics & forecasting',
        'Dedicated account manager',
        'Custom integrations',
        'White-label options'
      ]
    },
    {
      name: 'Enterprise',
      monthlyVolume: 1000000,
      percentageFee: 2.2,
      fixedFee: 0.20,
      features: [
        'Custom pricing & terms',
        'Dedicated infrastructure',
        'Advanced security & compliance',
        'Custom SLAs',
        'Priority implementation',
        'Strategic consulting'
      ]
    }
  ];

  const paymentMethodOptions = [
    { id: 'cards', name: 'Credit/Debit Cards', fee: 2.9 },
    { id: 'bank_transfers', name: 'Bank Transfers', fee: 0.8 },
    { id: 'mobile_money', name: 'Mobile Money', fee: 1.5 },
    { id: 'crypto', name: 'Cryptocurrency', fee: 1.2 }
  ];

  const regions = [
    { id: 'north_america', name: 'North America', adjustment: 0 },
    { id: 'europe', name: 'Europe', adjustment: 0.1 },
    { id: 'asia_pacific', name: 'Asia Pacific', adjustment: -0.2 },
    { id: 'latin_america', name: 'Latin America', adjustment: 0.15 },
    { id: 'africa', name: 'Africa', adjustment: -0.3 }
  ];

  // Calculate pricing based on current inputs
  useEffect(() => {
    const transactionCount = Math.round(monthlyRevenue / averageTransactionValue);
    
    // Determine pricing tier
    let tier = pricingTiers[0];
    for (const t of pricingTiers) {
      if (monthlyRevenue >= t.monthlyVolume) {
        tier = t;
      }
    }

    // Calculate regional adjustment
    const regionAdjustment = regions.find(r => r.id === region)?.adjustment || 0;
    
    // Calculate Sunny fees
    const effectivePercentage = tier.percentageFee + regionAdjustment;
    const sunnyFees = (monthlyRevenue * effectivePercentage / 100) + (transactionCount * tier.fixedFee);
    
    // Calculate typical competitor fees (higher rates)
    const competitorPercentage = effectivePercentage + 0.4; // Competitors typically 0.4% higher
    const competitorFixedFee = tier.fixedFee + 0.10; // Competitors typically $0.10 higher
    const competitorFees = (monthlyRevenue * competitorPercentage / 100) + (transactionCount * competitorFixedFee);
    
    const savings = competitorFees - sunnyFees;
    const annualSavings = savings * 12;

    setCalculations({
      transactionCount,
      sunnyFees,
      competitorFees,
      savings,
      annualSavings
    });
  }, [monthlyRevenue, averageTransactionValue, region]);

  const getCurrentTier = () => {
    for (let i = pricingTiers.length - 1; i >= 0; i--) {
      if (monthlyRevenue >= pricingTiers[i].monthlyVolume) {
        return pricingTiers[i];
      }
    }
    return pricingTiers[0];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(Math.round(num));
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
              <CalculatorIcon className="w-4 h-4 mr-2" />
              SaaS Pricing Calculator
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Calculate Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Payment Savings
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how much you can save with Sunny's transparent pricing and 
              advanced features designed specifically for SaaS businesses.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Inputs */}
          <div className="space-y-8">
            <Card className="p-8 bg-gray-50 dark:bg-gray-800">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Your Business Details
                </h3>

                {/* Monthly Revenue */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Monthly Recurring Revenue
                  </label>
                  <div className="relative">
                    <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="range"
                      min="1000"
                      max="1000000"
                      step="1000"
                      value={monthlyRevenue}
                      onChange={(e) => setMonthlyRevenue(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <span>$1K</span>
                      <span className="font-semibold text-lg text-gray-900 dark:text-white">
                        {formatCurrency(monthlyRevenue)}
                      </span>
                      <span>$1M+</span>
                    </div>
                  </div>
                </div>

                {/* Average Transaction Value */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Average Subscription Value
                  </label>
                  <div className="relative">
                    <BanknotesIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="range"
                      min="5"
                      max="500"
                      step="1"
                      value={averageTransactionValue}
                      onChange={(e) => setAverageTransactionValue(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <span>$5</span>
                      <span className="font-semibold text-lg text-gray-900 dark:text-white">
                        ${averageTransactionValue}
                      </span>
                      <span>$500+</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Payment Methods
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethodOptions.map((method) => (
                      <label key={method.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paymentMethods.includes(method.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPaymentMethods([...paymentMethods, method.id]);
                            } else {
                              setPaymentMethods(paymentMethods.filter(pm => pm !== method.id));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {method.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Region */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Primary Region
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {regions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-8">
            {/* Pricing Summary */}
            <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Your Pricing
                  </h3>
                  <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {getCurrentTier().name} Tier
                  </Badge>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatNumber(calculations.transactionCount)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Monthly Transactions
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {getCurrentTier().percentageFee}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Processing Rate
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Monthly Processing Fees</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(calculations.sunnyFees)}
                    </span>
                  </div>
                  
                  {showComparison && (
                    <>
                      <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Typical Competitor Cost</span>
                        <span className="text-xl font-bold text-red-600 dark:text-red-400">
                          {formatCurrency(calculations.competitorFees)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Monthly Savings</span>
                        <span className="text-xl font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(calculations.savings)}
                        </span>
                      </div>
                      
                      <div className="text-center p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(calculations.annualSavings)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Annual Savings
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <Button
                  onClick={() => setShowComparison(!showComparison)}
                  variant="outline"
                  className="w-full"
                >
                  <ChartBarIcon className="w-4 h-4 mr-2" />
                  {showComparison ? 'Hide' : 'Show'} Competitor Comparison
                </Button>
              </div>
            </Card>

            {/* Current Tier Features */}
            <Card className="p-8 bg-white dark:bg-gray-800">
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  {getCurrentTier().name} Tier Features
                </h4>
                <div className="space-y-3">
                  {getCurrentTier().features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="space-y-4">
              <Button size="lg" className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Schedule Custom Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Value Props */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <ShieldCheckIcon className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Enterprise Security</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">PCI DSS Level 1 compliance and bank-grade security</p>
            </div>
            <div className="text-center">
              <GlobeAltIcon className="w-8 h-8 mx-auto text-green-600 dark:text-green-400 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Global Coverage</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accept payments in 135+ currencies worldwide</p>
            </div>
            <div className="text-center">
              <ArrowTrendingUpIcon className="w-8 h-8 mx-auto text-purple-600 dark:text-purple-400 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Revenue Recovery</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Recover up to 40% of failed payments with smart dunning</p>
            </div>
            <div className="text-center">
              <CreditCardIcon className="w-8 h-8 mx-auto text-indigo-600 dark:text-indigo-400 mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Flexible Billing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Support any billing model from simple to complex</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
