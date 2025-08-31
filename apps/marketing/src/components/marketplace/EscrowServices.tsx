'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ScaleIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
  DocumentCheckIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  BellIcon,
  ExclamationTriangleIcon,
  HandRaisedIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface EscrowCondition {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'disputed';
  requiredBy: string;
  completedAt?: string;
  icon: any;
}

interface EscrowTransaction {
  id: string;
  name: string;
  amount: number;
  buyer: string;
  seller: string;
  conditions: EscrowCondition[];
  status: 'active' | 'completed' | 'disputed' | 'released';
  createdAt: string;
  timeline: string[];
}

const escrowTransactions: EscrowTransaction[] = [
  {
    id: 'freelance-001',
    name: 'Website Development Project',
    amount: 5000,
    buyer: 'TechCorp Inc.',
    seller: 'WebDev Studio',
    status: 'active',
    createdAt: '2024-01-15',
    timeline: ['Contract signed', 'Milestone 1 completed', 'Milestone 2 in progress'],
    conditions: [
      {
        id: 'delivery',
        name: 'Project Delivery',
        description: 'Complete website delivered and approved',
        status: 'completed',
        requiredBy: 'seller',
        completedAt: '2024-01-20',
        icon: DocumentCheckIcon
      },
      {
        id: 'approval',
        name: 'Buyer Approval',
        description: 'Buyer confirms deliverables meet requirements',
        status: 'pending',
        requiredBy: 'buyer',
        icon: CheckCircleIcon
      },
      {
        id: 'testing',
        name: 'Quality Testing',
        description: 'Pass all quality assurance tests',
        status: 'pending',
        requiredBy: 'both',
        icon: ShieldCheckIcon
      }
    ]
  },
  {
    id: 'product-002',
    name: 'Custom Electronics Order',
    amount: 2500,
    buyer: 'RetailCo Ltd.',
    seller: 'ElectroMaker',
    status: 'completed',
    createdAt: '2024-01-10',
    timeline: ['Order placed', 'Manufacturing started', 'Quality check passed', 'Shipped', 'Delivered', 'Funds released'],
    conditions: [
      {
        id: 'manufacturing',
        name: 'Manufacturing Complete',
        description: 'Product manufactured to specifications',
        status: 'completed',
        requiredBy: 'seller',
        completedAt: '2024-01-18',
        icon: CurrencyDollarIcon
      },
      {
        id: 'shipping',
        name: 'Shipping Confirmation',
        description: 'Product shipped with tracking information',
        status: 'completed',
        requiredBy: 'seller',
        completedAt: '2024-01-20',
        icon: ArrowPathIcon
      },
      {
        id: 'receipt',
        name: 'Delivery Confirmation',
        description: 'Buyer confirms receipt of goods',
        status: 'completed',
        requiredBy: 'buyer',
        completedAt: '2024-01-22',
        icon: CheckCircleIcon
      }
    ]
  }
];

const escrowFeatures = [
  {
    icon: ScaleIcon,
    title: 'Conditional Release',
    description: 'Set custom conditions that must be met before funds are released',
    benefits: [
      'Flexible condition framework',
      'Multi-party approval workflows',
      'Automated release triggers',
      'Manual override capabilities'
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Dispute Resolution',
    description: 'Built-in dispute management with mediation and arbitration options',
    benefits: [
      'Automated dispute detection',
      'Mediation services',
      'Evidence collection system',
      'Fair resolution process'
    ]
  },
  {
    icon: ClockIcon,
    title: 'Time-based Controls',
    description: 'Automatic fund release based on time conditions and deadlines',
    benefits: [
      'Configurable timeouts',
      'Milestone deadlines',
      'Automatic notifications',
      'Grace period handling'
    ]
  },
  {
    icon: BellIcon,
    title: 'Real-time Notifications',
    description: 'Keep all parties informed with instant updates and notifications',
    benefits: [
      'SMS and email alerts',
      'In-app notifications',
      'Webhook integrations',
      'Custom notification rules'
    ]
  }
];

const escrowTypes = [
  {
    name: 'Milestone-based',
    description: 'Release funds as project milestones are completed',
    icon: CheckCircleIcon,
    useCase: 'Long-term projects, software development, construction'
  },
  {
    name: 'Delivery Confirmation',
    description: 'Release funds upon confirmed delivery and acceptance',
    icon: ArrowPathIcon,
    useCase: 'E-commerce, product sales, physical goods'
  },
  {
    name: 'Time-locked',
    description: 'Automatic release after specified time period',
    icon: ClockIcon,
    useCase: 'Subscription services, rental agreements'
  },
  {
    name: 'Multi-party Approval',
    description: 'Require approval from multiple stakeholders',
    icon: UserGroupIcon,
    useCase: 'Complex B2B transactions, partnership deals'
  }
];

export default function EscrowServices() {
  const [selectedTransaction, setSelectedTransaction] = useState<string>('freelance-001');
  const [activeTab, setActiveTab] = useState<'overview' | 'conditions' | 'timeline'>('overview');

  const currentTransaction = escrowTransactions.find(t => t.id === selectedTransaction) || escrowTransactions[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'pending': return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
      case 'failed': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'disputed': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getConditionIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircleIcon;
      case 'failed': return XMarkIcon;
      case 'disputed': return ExclamationTriangleIcon;
      default: return ClockIcon;
    }
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
            <ScaleIcon className="w-4 h-4 mr-2" />
            Escrow Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Secure Fund Protection
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Protect transactions with intelligent escrow services. Hold funds securely 
            until all conditions are met, with built-in dispute resolution and automated release.
          </p>
        </motion.div>

        {/* Interactive Escrow Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-20 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Live Escrow Management
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Transaction Selector */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Active Escrows</h4>
              {escrowTransactions.map((transaction) => (
                <button
                  key={transaction.id}
                  onClick={() => setSelectedTransaction(transaction.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedTransaction === transaction.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                      {transaction.name}
                    </h5>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    ${transaction.amount.toLocaleString()}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {transaction.buyer} → {transaction.seller}
                  </div>
                </button>
              ))}
            </div>

            {/* Transaction Details */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 dark:border-gray-600 mb-6">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'conditions', label: 'Conditions' },
                    { id: 'timeline', label: 'Timeline' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                          : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Escrow Amount</h5>
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          ${currentTransaction.amount.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Status</h5>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentTransaction.status)}`}>
                          {currentTransaction.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-3">Parties</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Buyer:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{currentTransaction.buyer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Seller:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{currentTransaction.seller}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Created:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{currentTransaction.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'conditions' && (
                  <div className="space-y-3">
                    {currentTransaction.conditions.map((condition, index) => {
                      const StatusIcon = getConditionIcon(condition.status);
                      return (
                        <motion.div
                          key={condition.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg"
                        >
                          <div className={`p-2 rounded-lg ${getStatusColor(condition.status).split(' ').slice(2).join(' ')}`}>
                            <StatusIcon className={`w-5 h-5 ${getStatusColor(condition.status).split(' ').slice(0, 2).join(' ')}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h6 className="font-medium text-gray-900 dark:text-white">{condition.name}</h6>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(condition.status)}`}>
                                {condition.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {condition.description}
                            </p>
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
                              <span>Required by: {condition.requiredBy}</span>
                              {condition.completedAt && (
                                <span>Completed: {condition.completedAt}</span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div className="space-y-4">
                    {currentTransaction.timeline.map((event, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mt-2" />
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white">{event}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            Step {index + 1} of {currentTransaction.timeline.length}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Escrow Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Escrow Types & Use Cases
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the right escrow model for your marketplace scenario
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {escrowTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {type.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {type.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  <strong>Use cases:</strong> {type.useCase}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {escrowFeatures.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

