'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  CalculatorIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface PricingTier {
  name: string;
  volume: string;
  cardRate: number;
  bankTransferRate: number;
  mobileMoneyRate: number;
  cryptoRate: number;
  fixedFee: number;
  features: string[];
}

interface CalculationResult {
  monthlyVolume: number;
  cardTransactions: number;
  bankTransfers: number;
  mobileMoney: number;
  crypto: number;
  totalFees: number;
  effectiveRate: number;
  savings: number;
  tier: PricingTier;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    volume: '$0 - $50k',
    cardRate: 2.9,
    bankTransferRate: 1.5,
    mobileMoneyRate: 2.2,
    cryptoRate: 1.8,
    fixedFee: 0.30,
    features: [
      'Basic dashboard',
      'Standard support',
      'API access',
      'Basic fraud protection'
    ]
  },
  {
    name: 'Growth',
    volume: '$50k - $500k',
    cardRate: 2.7,
    bankTransferRate: 1.2,
    mobileMoneyRate: 1.9,
    cryptoRate: 1.5,
    fixedFee: 0.25,
    features: [
      'Advanced dashboard',
      'Priority support',
      'Advanced APIs',
      'Enhanced fraud protection',
      'Custom reporting'
    ]
  },
  {
    name: 'Scale',
    volume: '$500k - $5M',
    cardRate: 2.4,
    bankTransferRate: 0.9,
    mobileMoneyRate: 1.6,
    cryptoRate: 1.2,
    fixedFee: 0.20,
    features: [
      'Premium dashboard',
      'Dedicated support',
      'White-label options',
      'AI fraud protection',
      'Custom integrations',
      'Volume discounts'
    ]
  },
  {
    name: 'Enterprise',
    volume: '$5M+',
    cardRate: 2.1,
    bankTransferRate: 0.6,
    mobileMoneyRate: 1.3,
    cryptoRate: 0.9,
    fixedFee: 0.15,
    features: [
      'Custom dashboard',
      'White-glove support',
      'Full customization',
      'Enterprise fraud suite',
      'Priority processing',
      'Custom pricing'
    ]
  }
];

const paymentMethods = [
  { name: 'Credit/Debit Cards', key: 'card', defaultPercentage: 60 },
  { name: 'Bank Transfers', key: 'bank', defaultPercentage: 25 },
  { name: 'Mobile Money', key: 'mobile', defaultPercentage: 10 },
  { name: 'Cryptocurrency', key: 'crypto', defaultPercentage: 5 }
];

export default function PricingCalculator() {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(100000);
  const [paymentSplit, setPaymentSplit] = useState({
    card: 60,
    bank: 25,
    mobile: 10,
    crypto: 5
  });
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const calculateFees = () => {
    // Determine tier based on monthly volume
    let tier = pricingTiers[0];
    if (monthlyVolume > 5000000) tier = pricingTiers[3];
    else if (monthlyVolume > 500000) tier = pricingTiers[2];
    else if (monthlyVolume > 50000) tier = pricingTiers[1];

    // Calculate transaction volumes
    const cardVolume = (monthlyVolume * paymentSplit.card) / 100;
    const bankVolume = (monthlyVolume * paymentSplit.bank) / 100;
    const mobileVolume = (monthlyVolume * paymentSplit.mobile) / 100;
    const cryptoVolume = (monthlyVolume * paymentSplit.crypto) / 100;

    // Estimate transaction counts (assuming average transaction sizes)
    const avgCardTransaction = 150;
    const avgBankTransaction = 500;
    const avgMobileTransaction = 50;
    const avgCryptoTransaction = 300;

    const cardTransactions = Math.round(cardVolume / avgCardTransaction);
    const bankTransactions = Math.round(bankVolume / avgBankTransaction);
    const mobileTransactions = Math.round(mobileVolume / avgMobileTransaction);
    const cryptoTransactions = Math.round(cryptoVolume / avgCryptoTransaction);

    // Calculate fees
    const cardFees = (cardVolume * tier.cardRate / 100) + (cardTransactions * tier.fixedFee);
    const bankFees = (bankVolume * tier.bankTransferRate / 100) + (bankTransactions * tier.fixedFee);
    const mobileFees = (mobileVolume * tier.mobileMoneyRate / 100) + (mobileTransactions * tier.fixedFee);
    const cryptoFees = (cryptoVolume * tier.cryptoRate / 100) + (cryptoTransactions * tier.fixedFee);

    const totalFees = cardFees + bankFees + mobileFees + cryptoFees;
    const effectiveRate = (totalFees / monthlyVolume) * 100;

    // Calculate potential savings compared to industry average (3.5%)
    const industryAverage = monthlyVolume * 0.035;
    const savings = Math.max(0, industryAverage - totalFees);

    setCalculation({
      monthlyVolume,
      cardTransactions,
      bankTransfers: bankTransactions,
      mobileMoney: mobileTransactions,
      crypto: cryptoTransactions,
      totalFees,
      effectiveRate,
      savings,
      tier
    });
  };

  useEffect(() => {
    calculateFees();
  }, [monthlyVolume, paymentSplit]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 text-sm font-medium mb-4">
            <CalculatorIcon className="w-4 h-4 mr-2" />
            Pricing Calculator
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Calculate Your Savings
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See exactly how much you'll save with Sunny's transparent, competitive pricing. 
            No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Monthly Volume */}
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Monthly Payment Volume
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Volume (USD)
                  </label>
                  <div className="relative">
                    <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={monthlyVolume}
                      onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="100000"
                    />
                  </div>
                </div>

                {/* Quick Volume Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {[10000, 50000, 100000, 500000, 1000000, 5000000].map((volume) => (
                    <button
                      key={volume}
                      onClick={() => setMonthlyVolume(volume)}
                      className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                        monthlyVolume === volume
                          ? 'bg-blue-500 text-white'
                          : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                      }`}
                    >
                      {formatCurrency(volume)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Method Split */}
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Payment Method Split
                </h3>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  {showAdvanced ? 'Use Defaults' : 'Customize'}
                </button>
              </div>

              {showAdvanced ? (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.key}>
                      <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        <span>{method.name}</span>
                        <span>{paymentSplit[method.key as keyof typeof paymentSplit]}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={paymentSplit[method.key as keyof typeof paymentSplit]}
                        onChange={(e) => {
                          const newValue = Number(e.target.value);
                          setPaymentSplit(prev => ({
                            ...prev,
                            [method.key]: newValue
                          }));
                        }}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                        aria-label={`${method.name} percentage`}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.key} className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">{method.name}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {paymentSplit[method.key as keyof typeof paymentSplit]}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {calculation && (
              <>
                {/* Pricing Tier */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      Your Pricing Tier
                    </h3>
                    <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium">
                      {calculation.tier.name}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Volume: {calculation.tier.volume}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Card Rate</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {calculation.tier.cardRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Fixed Fee</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${calculation.tier.fixedFee}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Monthly Cost Breakdown
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">Processing Volume</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(calculation.monthlyVolume)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">Total Transactions</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatNumber(calculation.cardTransactions + calculation.bankTransfers + calculation.mobileMoney + calculation.crypto)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">Processing Fees</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(calculation.totalFees)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 bg-green-50 dark:bg-green-900/20 rounded-lg px-4">
                      <span className="text-green-700 dark:text-green-300 font-medium">Effective Rate</span>
                      <span className="font-bold text-green-700 dark:text-green-300 text-lg">
                        {calculation.effectiveRate.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Savings */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
                  <div className="flex items-center mb-4">
                    <ArrowTrendingUpIcon className="w-8 h-8 text-green-500 mr-3" />
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      Monthly Savings
                    </h3>
                  </div>
                  
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {formatCurrency(calculation.savings)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    vs. industry average of 3.5%
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-green-200 dark:border-green-800">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Annual Savings: {formatCurrency(calculation.savings * 12)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Based on current payment volume and method distribution
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Saving?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Get started with Sunny today and see the difference transparent pricing makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
