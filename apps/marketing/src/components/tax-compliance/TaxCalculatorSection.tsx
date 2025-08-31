'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  CalculatorIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BoltIcon,
  DocumentTextIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline';

interface TaxCalculation {
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: string;
  country: string;
  taxType: string;
  breakdown: {
    federal?: number;
    state?: number;
    local?: number;
    vat?: number;
  };
}

interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  taxTypes: string[];
  rates: {
    [key: string]: number;
  };
}

const countries: Country[] = [
  {
    code: 'KE',
    name: 'Kenya 🏠',
    flag: '🇰🇪',
    currency: 'KES',
    taxTypes: ['VAT', 'Withholding Tax', 'Digital Service Tax'],
    rates: { 'VAT': 16, 'Withholding Tax': 5, 'Digital Service Tax': 1.5 }
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    taxTypes: ['Sales Tax', 'Federal Tax'],
    rates: { 'Sales Tax': 8.25, 'Federal Tax': 21 }
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    taxTypes: ['VAT', 'Corporation Tax'],
    rates: { 'VAT': 20, 'Corporation Tax': 19 }
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    taxTypes: ['VAT', 'Corporate Tax'],
    rates: { 'VAT': 19, 'Corporate Tax': 30 }
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    taxTypes: ['GST/HST', 'Provincial Tax'],
    rates: { 'GST/HST': 13, 'Provincial Tax': 8 }
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    taxTypes: ['GST', 'Corporate Tax'],
    rates: { 'GST': 10, 'Corporate Tax': 30 }
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    taxTypes: ['VAT', 'Corporate Tax'],
    rates: { 'VAT': 20, 'Corporate Tax': 28 }
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    currency: 'JPY',
    taxTypes: ['Consumption Tax', 'Corporate Tax'],
    rates: { 'Consumption Tax': 10, 'Corporate Tax': 23.2 }
  }
];

const productTypes = [
  { name: 'Physical Goods', taxable: true, description: 'Tangible products requiring shipping' },
  { name: 'Digital Services', taxable: true, description: 'Software, subscriptions, digital content' },
  { name: 'Professional Services', taxable: true, description: 'Consulting, legal, accounting services' },
  { name: 'Financial Services', taxable: false, description: 'Banking, insurance, investment services' },
  { name: 'Educational Services', taxable: false, description: 'Training, courses, educational content' },
  { name: 'Healthcare Services', taxable: false, description: 'Medical, dental, health services' }
];

export default function TaxCalculatorSection() {
  const [amount, setAmount] = useState<string>('1000');
  // Default to Kenya as our home market
  const kenyaCountry = countries.find(c => c.code === 'KE') || countries[0];
  const [selectedCountry, setSelectedCountry] = useState<Country>(kenyaCountry);
  const [selectedTaxType, setSelectedTaxType] = useState<string>(kenyaCountry.taxTypes[0]);
  const [selectedProduct, setSelectedProduct] = useState<string>('Physical Goods');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(true);
  const [isRealTime, setIsRealTime] = useState<boolean>(false);

  const calculateTax = (): TaxCalculation => {
    const subtotal = parseFloat(amount) || 0;
    const product = productTypes.find(p => p.name === selectedProduct);
    
    if (!product?.taxable) {
      return {
        subtotal,
        taxRate: 0,
        taxAmount: 0,
        total: subtotal,
        currency: selectedCountry.currency,
        country: selectedCountry.name,
        taxType: 'Tax Exempt',
        breakdown: {}
      };
    }

    const taxRate = selectedCountry.rates[selectedTaxType] || 0;
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    // Simulate breakdown for compound tax systems
    let breakdown = {};
    if (selectedCountry.code === 'US') {
      breakdown = {
        federal: taxAmount * 0.6,
        state: taxAmount * 0.4
      };
    } else if (selectedCountry.code === 'CA') {
      breakdown = {
        federal: taxAmount * 0.5,
        state: taxAmount * 0.5
      };
    } else {
      breakdown = {
        vat: taxAmount
      };
    }

    return {
      subtotal,
      taxRate,
      taxAmount,
      total,
      currency: selectedCountry.currency,
      country: selectedCountry.name,
      taxType: selectedTaxType,
      breakdown
    };
  };

  const calculation = calculateTax();

  const handleCalculate = async () => {
    setIsCalculating(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsCalculating(false);
  };

  const formatCurrency = (value: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(value);
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
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
            <CalculatorIcon className="w-4 h-4 mr-2" />
            Interactive Tax Calculator
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Calculate Taxes in Real-Time
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience our AI-powered tax engine. Calculate taxes for any amount, country, 
            and product type with sub-second accuracy across 190+ jurisdictions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Tax Calculator
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRealTime(!isRealTime)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    isRealTime 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {isRealTime ? <PlayIcon className="w-3 h-3 mr-1" /> : <PauseIcon className="w-3 h-3 mr-1" />}
                  {isRealTime ? 'Real-time' : 'Manual'}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transaction Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg font-medium"
                    placeholder="Enter amount"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                    {selectedCountry.currency}
                  </div>
                </div>
              </div>

              {/* Country Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Country / Jurisdiction
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country);
                        setSelectedTaxType(country.taxTypes[0]);
                      }}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedCountry.code === country.code
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{country.flag}</span>
                        <div>
                          <div className="font-medium text-sm">{country.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{country.currency}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tax Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tax Type
                </label>
                <select
                  value={selectedTaxType}
                  onChange={(e) => setSelectedTaxType(e.target.value)}
                  title="Select tax type for calculation"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {selectedCountry.taxTypes.map((taxType) => (
                    <option key={taxType} value={taxType}>
                      {taxType} ({selectedCountry.rates[taxType]}%)
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product/Service Type
                </label>
                <div className="space-y-2">
                  {productTypes.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => setSelectedProduct(product.name)}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        selectedProduct === product.name
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{product.description}</div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          product.taxable 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        }`}>
                          {product.taxable ? 'Taxable' : 'Exempt'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              {!isRealTime && (
                <button
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Calculating...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <CalculatorIcon className="w-5 h-5 mr-2" />
                      Calculate Tax
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </button>
              )}
            </div>
          </motion.div>

          {/* Results Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Main Result Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Tax Calculation Result
                </h3>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    {isRealTime ? 'Real-time' : 'Calculated'} in &lt;1s
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Subtotal</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatCurrency(calculation.subtotal, calculation.currency)}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tax Amount</div>
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(calculation.taxAmount, calculation.currency)}
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg p-6 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">Total Amount</div>
                      <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                        {formatCurrency(calculation.total, calculation.currency)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Tax Rate</div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {calculation.taxRate}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tax Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Country:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{calculation.country}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax Type:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{calculation.taxType}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Product Type:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedProduct}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Breakdown */}
            {showBreakdown && Object.keys(calculation.breakdown).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Tax Breakdown</h4>
                <div className="space-y-3">
                  {Object.entries(calculation.breakdown).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(value as number, calculation.currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* API Information */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <DocumentTextIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Integrate This Calculator
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                    Use our Tax API to integrate real-time tax calculations into your application.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      REST API
                    </span>
                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      20+ SDKs
                    </span>
                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      Real-time
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

