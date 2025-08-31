'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { 
  CreditCardIcon,
  BanknotesIcon,
  DevicePhoneMobileIcon,
  WalletIcon,
  CalendarDaysIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { Bitcoin } from 'lucide-react';

interface PaymentMethodCategory {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  methods: PaymentMethod[];
}

interface PaymentMethod {
  name: string;
  logo?: string;
  description: string;
  processingTime: string;
  fee: string;
  regions: string[];
  features: string[];
}

const paymentCategories: PaymentMethodCategory[] = [
  {
    id: 'cards',
    icon: CreditCardIcon,
    title: 'Credit & Debit Cards',
    description: 'Accept all major credit and debit cards with advanced fraud protection',
    methods: [
      {
        name: 'Visa',
        description: 'Most widely accepted payment card globally',
        processingTime: 'Instant',
        fee: '2.9% + $0.30',
        regions: ['Global', 'All Countries'],
        features: ['3D Secure', 'Tokenization', 'Fraud Protection', 'Chargeback Protection']
      },
      {
        name: 'Mastercard',
        description: 'Secure and reliable payment processing',
        processingTime: 'Instant',
        fee: '2.9% + $0.30',
        regions: ['Global', 'All Countries'],
        features: ['SecureCode', 'Digital Secure', 'Identity Check', 'Zero Liability']
      },
      {
        name: 'American Express',
        description: 'Premium card processing with enhanced security',
        processingTime: 'Instant',
        fee: '3.5% + $0.30',
        regions: ['US', 'Canada', 'Europe', 'Asia'],
        features: ['SafeKey', 'Fraud Protection', 'Dispute Resolution', 'Express Checkout']
      },
      {
        name: 'Discover',
        description: 'Popular US payment card with cashback rewards',
        processingTime: 'Instant',
        fee: '2.9% + $0.30',
        regions: ['US', 'Canada'],
        features: ['Discover ProtectBuy', 'Fraud Monitoring', 'Zero Fraud Liability']
      }
    ]
  },
  {
    id: 'bank-transfers',
    icon: BanknotesIcon,
    title: 'Bank Transfers',
    description: 'Direct bank-to-bank transfers with lower fees and higher limits',
    methods: [
      {
        name: 'ACH (US)',
        description: 'Automated Clearing House for US bank transfers',
        processingTime: '1-3 days',
        fee: '0.8% + $0.25',
        regions: ['United States'],
        features: ['High Limits', 'Low Fees', 'Batch Processing', 'Return Handling']
      },
      {
        name: 'SEPA (Europe)',
        description: 'Single Euro Payments Area for European transfers',
        processingTime: '1-2 days',
        fee: '0.8% + €0.25',
        regions: ['European Union', 'EEA Countries'],
        features: ['Euro Transfers', 'Standard Processing', 'Cost Effective', 'Wide Coverage']
      },
      {
        name: 'Wire Transfer',
        description: 'Same-day international bank transfers',
        processingTime: 'Same day',
        fee: '1.5% + $15',
        regions: ['Global'],
        features: ['Same Day', 'High Value', 'Secure', 'International']
      },
      {
        name: 'Open Banking',
        description: 'Real-time bank transfers via open banking APIs',
        processingTime: 'Instant',
        fee: '0.5% + $0.20',
        regions: ['UK', 'Europe', 'Australia'],
        features: ['Instant', 'Secure', 'Bank Grade', 'No Card Details']
      }
    ]
  },
  {
    id: 'mobile-money',
    icon: DevicePhoneMobileIcon,
    title: 'Mobile Money',
    description: 'Mobile-first payment solutions popular in emerging markets',
    methods: [
      {
        name: 'M-Pesa',
        description: 'Leading mobile money service in Africa',
        processingTime: 'Instant',
        fee: '2.5% + $0.15',
        regions: ['Kenya', 'Tanzania', 'Uganda', 'Ghana'],
        features: ['Mobile First', 'Cash In/Out', 'Bill Payments', 'Cross Border']
      },
      {
        name: 'MTN Mobile Money',
        description: 'Widespread mobile money across Africa',
        processingTime: 'Instant',
        fee: '2.5% + $0.15',
        regions: ['Ghana', 'Uganda', 'Rwanda', 'Cameroon'],
        features: ['Agent Network', 'Merchant Payments', 'International', 'API Access']
      },
      {
        name: 'Airtel Money',
        description: 'Mobile payment service across multiple countries',
        processingTime: 'Instant',
        fee: '2.5% + $0.15',
        regions: ['India', 'Africa', 'Sri Lanka'],
        features: ['Multi-Country', 'Digital Wallet', 'Bill Pay', 'Money Transfer']
      },
      {
        name: 'Orange Money',
        description: 'Mobile financial services in francophone Africa',
        processingTime: 'Instant',
        fee: '2.5% + $0.15',
        regions: ['Ivory Coast', 'Senegal', 'Mali', 'Burkina Faso'],
        features: ['French Speaking', 'Regional Focus', 'Merchant Network', 'Remittances']
      }
    ]
  },
  {
    id: 'digital-wallets',
    icon: WalletIcon,
    title: 'Digital Wallets',
    description: 'Popular digital payment platforms for seamless checkout',
    methods: [
      {
        name: 'Apple Pay',
        description: 'Secure payments using Touch ID or Face ID',
        processingTime: 'Instant',
        fee: '2.9% + $0.30',
        regions: ['Global', '70+ Countries'],
        features: ['Biometric Auth', 'Device Integration', 'Privacy Focused', 'Express Transit']
      },
      {
        name: 'Google Pay',
        description: 'Fast and secure payments across Google services',
        processingTime: 'Instant',
        fee: '2.9% + $0.30',
        regions: ['Global', '40+ Countries'],
        features: ['Android Integration', 'NFC Payments', 'Online & In-Store', 'Rewards Integration']
      },
      {
        name: 'Samsung Pay',
        description: 'Payment service for Samsung device users',
        processingTime: 'Instant',
        fee: '2.9% + $0.30',
        regions: ['US', 'Europe', 'Asia'],
        features: ['MST Technology', 'NFC Support', 'Samsung Rewards', 'Knox Security']
      },
      {
        name: 'PayPal',
        description: 'Widely adopted digital payment platform',
        processingTime: 'Instant',
        fee: '3.5% + $0.30',
        regions: ['Global', '200+ Markets'],
        features: ['Buyer Protection', 'One Touch', 'Express Checkout', 'Global Reach']
      }
    ]
  },
  {
    id: 'regional',
    icon: GlobeAltIcon,
    title: 'Regional Methods',
    description: 'Local payment methods preferred in specific regions',
    methods: [
      {
        name: 'UPI (India)',
        description: 'Unified Payments Interface for instant bank transfers',
        processingTime: 'Instant',
        fee: '1.8% + ₹10',
        regions: ['India'],
        features: ['QR Payments', 'Mobile Numbers', '24/7 Available', 'No Transaction Limit']
      },
      {
        name: 'Alipay',
        description: 'Leading digital payment platform in China',
        processingTime: 'Instant',
        fee: '2.5% + $0.20',
        regions: ['China', 'Global Chinese'],
        features: ['QR Code', 'Mini Programs', 'Ant Credit', 'Cross Border']
      },
      {
        name: 'WeChat Pay',
        description: 'Integrated payment within WeChat ecosystem',
        processingTime: 'Instant',
        fee: '2.5% + $0.20',
        regions: ['China', 'Global Chinese'],
        features: ['Social Integration', 'Mini Programs', 'Red Envelopes', 'Offline Payments']
      },
      {
        name: 'PIX (Brazil)',
        description: 'Instant payment system by Brazilian Central Bank',
        processingTime: 'Instant',
        fee: '1.0% + R$0.50',
        regions: ['Brazil'],
        features: ['Central Bank', '24/7 Available', 'QR Payments', 'Free for Individuals']
      }
    ]
  },
  {
    id: 'crypto',
    icon: Bitcoin,
    title: 'Cryptocurrencies',
    description: 'Accept digital currencies with automatic conversion',
    methods: [
      {
        name: 'Bitcoin (BTC)',
        description: 'Original and most widely accepted cryptocurrency',
        processingTime: '10-60 minutes',
        fee: '1.0% + network fees',
        regions: ['Global'],
        features: ['Decentralized', 'No Chargebacks', 'Global', 'Store of Value']
      },
      {
        name: 'Ethereum (ETH)',
        description: 'Smart contract platform with fast transactions',
        processingTime: '1-5 minutes',
        fee: '1.0% + gas fees',
        regions: ['Global'],
        features: ['Smart Contracts', 'DeFi Integration', 'Fast Finality', 'Programmable Money']
      },
      {
        name: 'USDC',
        description: 'USD-backed stablecoin for stable value',
        processingTime: '1-5 minutes',
        fee: '0.5% + network fees',
        regions: ['Global'],
        features: ['Price Stable', 'USD Backed', 'Regulated', 'Fast Settlement']
      },
      {
        name: 'Lightning Network',
        description: 'Instant Bitcoin payments with minimal fees',
        processingTime: 'Instant',
        fee: '0.1% + minimal fees',
        regions: ['Global'],
        features: ['Instant', 'Micro Payments', 'Low Fees', 'Scalable']
      }
    ]
  },
  {
    id: 'bnpl',
    icon: CalendarDaysIcon,
    title: 'Buy Now Pay Later',
    description: 'Flexible payment options for customer convenience',
    methods: [
      {
        name: 'Klarna',
        description: 'Pay in 4 interest-free installments',
        processingTime: 'Instant approval',
        fee: '3.3% + $0.30',
        regions: ['US', 'Europe', 'Australia'],
        features: ['Pay in 4', 'Pay Later', 'Interest Free', 'Flexible Terms']
      },
      {
        name: 'Afterpay',
        description: 'Split purchases into 4 equal payments',
        processingTime: 'Instant approval',
        fee: '4.0% + $0.30',
        regions: ['US', 'Canada', 'Australia', 'UK'],
        features: ['4 Payments', 'No Interest', 'Automatic Debit', 'Spending Limits']
      },
      {
        name: 'Affirm',
        description: 'Transparent financing with no hidden fees',
        processingTime: 'Instant approval',
        fee: '2.9% - 19.9%',
        regions: ['US', 'Canada'],
        features: ['Transparent Terms', 'No Hidden Fees', 'Flexible Periods', 'Pre-qualification']
      },
      {
        name: 'Sezzle',
        description: 'Interest-free payment plans',
        processingTime: 'Instant approval',
        fee: '6.0% + $0.30',
        regions: ['US', 'Canada'],
        features: ['Interest Free', 'Budget Friendly', 'Quick Approval', 'Credit Building']
      }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function PaymentMethods() {
  const [activeCategory, setActiveCategory] = useState<string>(paymentCategories[0].id);
  const activeCategoryData = paymentCategories.find(cat => cat.id === activeCategory)!;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Payment Methods
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accept payments from customers worldwide with the most comprehensive 
            collection of payment methods, including cards, bank transfers, mobile money, and cryptocurrencies.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {paymentCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Active Category Display */}
        <motion.div
          key={`category-${activeCategory}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <activeCategoryData.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {activeCategoryData.title}
              </h3>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {activeCategoryData.description}
            </p>
          </div>
        </motion.div>

        {/* Payment Methods Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`grid-${activeCategory}`}
        >
          {activeCategoryData.methods.map((method, index) => (
            <motion.div
              key={method.name}
              variants={itemVariants}
              className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200"
            >
              {/* Method Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {method.name}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {method.description}
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Processing Time</div>
                  <div className="font-semibold text-gray-900">{method.processingTime}</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Fee</div>
                  <div className="font-semibold text-green-600">{method.fee}</div>
                </div>
              </div>

              {/* Regions */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-900 mb-2">Available Regions</div>
                <div className="flex flex-wrap gap-1">
                  {method.regions.map((region, regionIndex) => (
                    <span 
                      key={regionIndex}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Key Features</div>
                <div className="grid grid-cols-2 gap-1">
                  {method.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs text-gray-600">
                      <div className="w-1 h-1 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Global Payment Coverage
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">190+</div>
                <div className="text-sm text-gray-600">Countries Supported</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">135+</div>
                <div className="text-sm text-gray-600">Currencies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Payment Methods</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
                <div className="text-sm text-gray-600">Uptime SLA</div>
              </div>
            </div>
            <div className="mt-8">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Start Accepting Payments
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
