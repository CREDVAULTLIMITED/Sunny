'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  UserCircleIcon,
  CreditCardIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  CalendarDaysIcon,
  BellIcon,
  ArrowDownTrayIcon,
  PauseIcon,
  PlayIcon,
  XMarkIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface PortalFeature {
  icon: any;
  title: string;
  description: string;
  capabilities: string[];
}

interface SubscriptionAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  type: 'upgrade' | 'downgrade' | 'pause' | 'cancel' | 'billing';
  color: string;
}

const portalFeatures: PortalFeature[] = [
  {
    icon: CreditCardIcon,
    title: 'Payment Methods',
    description: 'Secure payment method management',
    capabilities: [
      'Add/remove payment methods',
      'Update billing information',
      'Set default payment method',
      'View payment history'
    ]
  },
  {
    icon: DocumentTextIcon,
    title: 'Billing & Invoices',
    description: 'Complete billing transparency',
    capabilities: [
      'Download invoices',
      'View billing history',
      'Update billing address',
      'Tax information'
    ]
  },
  {
    icon: Cog6ToothIcon,
    title: 'Subscription Control',
    description: 'Full subscription management',
    capabilities: [
      'Upgrade/downgrade plans',
      'Pause/resume service',
      'Cancel subscription',
      'Change billing cycle'
    ]
  },
  {
    icon: BellIcon,
    title: 'Notifications',
    description: 'Stay informed with alerts',
    capabilities: [
      'Billing reminders',
      'Service updates',
      'Usage alerts',
      'Custom preferences'
    ]
  }
];

const subscriptionActions: SubscriptionAction[] = [
  {
    id: 'upgrade',
    title: 'Upgrade Plan',
    description: 'Get more features and higher limits',
    icon: ArrowDownTrayIcon,
    type: 'upgrade',
    color: 'green'
  },
  {
    id: 'pause',
    title: 'Pause Subscription',
    description: 'Temporarily pause your subscription',
    icon: PauseIcon,
    type: 'pause',
    color: 'yellow'
  },
  {
    id: 'billing',
    title: 'Change Billing Cycle',
    description: 'Switch between monthly and annual billing',
    icon: CalendarDaysIcon,
    type: 'billing',
    color: 'blue'
  },
  {
    id: 'cancel',
    title: 'Cancel Subscription',
    description: 'End your subscription',
    icon: XMarkIcon,
    type: 'cancel',
    color: 'red'
  }
];

const mockCustomerData = {
  name: 'John Smith',
  email: 'john.smith@company.com',
  plan: 'Professional',
  status: 'Active',
  nextBilling: '2024-02-15',
  amount: '$49.00',
  usage: {
    users: { current: 8, limit: 100 },
    storage: { current: 45, limit: 100 },
    apiCalls: { current: 2500, limit: 10000 }
  }
};

const benefits = [
  {
    icon: CheckCircleIcon,
    title: 'Reduced Support Load',
    description: 'Customers handle 80% of requests themselves',
    stat: '80%'
  },
  {
    icon: ClockIcon,
    title: 'Instant Changes',
    description: 'No waiting for support team responses',
    stat: '24/7'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Higher Retention',
    description: 'Easy self-service reduces churn',
    stat: '+23%'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Secure Access',
    description: 'Bank-grade security for all transactions',
    stat: '100%'
  }
];

export default function CustomerPortal() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedAction, setSelectedAction] = useState<string>('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'billing', label: 'Billing', icon: CreditCardIcon },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
    { id: 'usage', label: 'Usage', icon: ChartBarIcon }
  ];

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
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
            <UserCircleIcon className="w-4 h-4 mr-2" />
            Customer Self-Service Portal
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Empower Your Customers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Give customers complete control over their subscriptions with a beautiful, 
            secure self-service portal that reduces support tickets by 80%.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Portal Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Live Portal Demo
            </h3>

            {/* Portal Interface */}
            <div className="bg-white dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
              {/* Portal Header */}
              <div className="border-b border-gray-200 dark:border-gray-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">JS</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {mockCustomerData.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {mockCustomerData.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {mockCustomerData.plan}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-green-600 dark:text-green-400">{mockCustomerData.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portal Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-600">
                <div className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                          : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Portal Content */}
              <div className="p-4">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    {/* Next Billing */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                            Next Billing
                          </h5>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {mockCustomerData.nextBilling}
                          </p>
                        </div>
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {mockCustomerData.amount}
                        </div>
                      </div>
                    </div>

                    {/* Usage */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                        Current Usage
                      </h5>
                      {Object.entries(mockCustomerData.usage).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400 capitalize">{key}</span>
                            <span className="text-gray-900 dark:text-white">
                              {value.current}{typeof value.limit === 'number' ? `/${value.limit}` : ''}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                            <div 
                              className="bg-purple-500 h-1.5 rounded-full transition-all"
                              style={{ width: `${(value.current / value.limit) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      {subscriptionActions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => setSelectedAction(action.id)}
                          className={`p-3 rounded-lg border text-left transition-all hover:shadow-sm ${
                            action.color === 'green' ? 'border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20' :
                            action.color === 'yellow' ? 'border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50 dark:border-yellow-800 dark:hover:bg-yellow-900/20' :
                            action.color === 'blue' ? 'border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20' :
                            'border-red-200 hover:border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <action.icon className={`w-4 h-4 ${
                              action.color === 'green' ? 'text-green-600' :
                              action.color === 'yellow' ? 'text-yellow-600' :
                              action.color === 'blue' ? 'text-blue-600' : 'text-red-600'
                            }`} />
                            <span className="font-medium text-gray-900 dark:text-white text-xs">
                              {action.title}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {action.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'billing' && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-slate-600 rounded-lg p-3">
                      <h5 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
                        Payment Method
                      </h5>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                          VISA
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          •••• •••• •••• 4242
                        </span>
                      </div>
                    </div>
                    <button className="w-full py-2 px-4 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors">
                      Download Latest Invoice
                    </button>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Email notifications</span>
                      <div className="w-10 h-6 bg-purple-500 rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">SMS alerts</span>
                      <div className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center px-1">
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Portal Features
            </h3>
            
            {portalFeatures.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {feature.description}
                    </p>
                    <ul className="space-y-1">
                      {feature.capabilities.map((capability, capIndex) => (
                        <li key={capIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {benefit.stat}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
