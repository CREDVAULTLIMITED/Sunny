import React from 'react';
import DocsLayout from '../../../../../components/resources/docs/DocsLayout';
import {
  BuildingOfficeIcon,
  CogIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const configurationSections = [
  {
    id: 'basic-info',
    title: 'Basic Institution Information',
    description: 'Configure your institution\'s core business details',
    estimatedTime: '3-5 minutes',
    icon: BuildingOfficeIcon,
    required: true,
    fields: [
      'Institution name and legal entity',
      'Business registration number',
      'Physical address and contact details',
      'Institution type (Bank, SACCO, MFI, etc.)',
      'Operating regions and branches'
    ]
  },
  {
    id: 'compliance',
    title: 'Regulatory Compliance',
    description: 'Set up compliance settings for your jurisdiction',
    estimatedTime: '5-8 minutes',
    icon: ShieldCheckIcon,
    required: true,
    fields: [
      'Regulatory body (CBK, SASRA, etc.)',
      'License numbers and expiry dates',
      'AML/CFT compliance settings',
      'KYC requirements and procedures',
      'Reporting preferences and schedules'
    ]
  },
  {
    id: 'payment-methods',
    title: 'Payment Methods & Limits',
    description: 'Configure accepted payment methods and transaction limits',
    estimatedTime: '4-6 minutes',
    icon: CurrencyDollarIcon,
    required: true,
    fields: [
      'Mobile money (M-Pesa, Airtel Money, etc.)',
      'Bank transfers and card payments',
      'Transaction limits (daily, monthly)',
      'Currency settings (KES, USD, etc.)',
      'Fee structures and pricing'
    ]
  },
  {
    id: 'security',
    title: 'Security & Authentication',
    description: 'Configure security settings and access controls',
    estimatedTime: '3-4 minutes',
    icon: CogIcon,
    required: true,
    fields: [
      'Multi-factor authentication (MFA)',
      'API key management',
      'Webhook security settings',
      'User roles and permissions',
      'Audit logging preferences'
    ]
  }
];

const institutionTypes = [
  {
    type: 'Commercial Bank',
    description: 'Full-service banking institution',
    requirements: ['CBK banking license', 'Core banking system', 'RTGS connection'],
    compliance: ['CBK reporting', 'Basel III compliance', 'AML/CFT programs'],
    icon: '🏦'
  },
  {
    type: 'SACCO',
    description: 'Savings and Credit Cooperative',
    requirements: ['SASRA registration', 'Member management system', 'Cooperative bylaws'],
    compliance: ['SASRA reporting', 'Cooperative regulations', 'Member protection'],
    icon: '🤝'
  },
  {
    type: 'Microfinance Institution',
    description: 'Micro-lending and financial inclusion',
    requirements: ['CBK/SASRA license', 'Loan management system', 'Agent network'],
    compliance: ['Consumer protection', 'Interest rate caps', 'Digital lending rules'],
    icon: '💰'
  },
  {
    type: 'Fintech Company',
    description: 'Technology-driven financial services',
    requirements: ['CBK fintech license', 'API-first architecture', 'Cloud infrastructure'],
    compliance: ['Data protection', 'API security', 'Digital identity verification'],
    icon: '⚡'
  }
];

export default function InstitutionSetupPage() {
  return (
    <DocsLayout showSidebar={true} showBreadcrumbs={true}>
      <div className="max-w-5xl">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
              <BuildingOfficeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Institution Setup
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Configure your institution profile and compliance settings
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <ClockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <div className="text-lg font-bold text-blue-700 dark:text-blue-300">15-20 mins</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">Setup time</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
              <div>
                <div className="text-lg font-bold text-green-700 dark:text-green-300">4 Sections</div>
                <div className="text-xs text-green-600 dark:text-green-400">To configure</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-3" />
              <div>
                <div className="text-lg font-bold text-yellow-700 dark:text-yellow-300">Required</div>
                <div className="text-xs text-yellow-600 dark:text-yellow-400">All sections</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <DocumentTextIcon className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
              <div>
                <div className="text-lg font-bold text-purple-700 dark:text-purple-300">Documents</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">Upload ready</div>
              </div>
            </div>
          </div>
        </div>

        {/* Institution Type Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Institution Type Requirements
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Different institution types have specific requirements and compliance obligations. 
            Choose your institution type to see tailored setup guidelines.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {institutionTypes.map((institution) => (
              <div key={institution.type} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{institution.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {institution.type}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {institution.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          Requirements:
                        </h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          {institution.requirements.map((req) => (
                            <li key={req} className="flex items-center">
                              <CheckCircleIcon className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          Compliance:
                        </h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          {institution.compliance.map((comp) => (
                            <li key={comp} className="flex items-center">
                              <ShieldCheckIcon className="w-3 h-3 mr-2 text-blue-500 flex-shrink-0" />
                              {comp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Configuration Sections */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Configuration Steps
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Complete each configuration section to set up your institution profile. 
            All sections are required before you can proceed to API integration.
          </p>

          <div className="space-y-6">
            {configurationSections.map((section, index) => (
              <div key={section.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <section.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                      {section.required && (
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full font-medium">
                          Required
                        </span>
                      )}
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {section.estimatedTime}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {section.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Fields to Configure:
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {section.fields.map((field) => (
                          <div key={field} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircleIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                            {field}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                        Configure Section
                      </button>
                      <Link
                        href={`/resources/docs/getting-started/setup-guide/${section.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                      >
                        View detailed guide →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Important Notes */}
        <section className="mb-12">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <InformationCircleIcon className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
                  Important Setup Notes
                </h3>
                <ul className="space-y-2 text-amber-700 dark:text-amber-200 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>All configuration sections must be completed before API integration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Compliance settings vary by institution type and jurisdiction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Changes to critical settings may require re-verification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Keep your license documents and certificates up to date</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
              After Completing Institution Setup
            </h3>
            <p className="text-blue-700 dark:text-blue-200 mb-4">
              Once your institution is configured, you'll be ready to proceed with API integration and testing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/resources/docs/api/quick-start"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Next: API Integration
              </Link>
              <Link
                href="/resources/docs/getting-started/quick-start"
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-lg border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Back to Quick Start
              </Link>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Previous</p>
            <Link href="/resources/docs/getting-started/registration" className="text-blue-600 dark:text-blue-400 hover:underline">
              ← Account Registration
            </Link>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Next</p>
            <Link href="/resources/docs/api/quick-start" className="text-blue-600 dark:text-blue-400 hover:underline">
              API Integration →
            </Link>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
