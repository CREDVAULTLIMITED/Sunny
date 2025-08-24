import React from 'react';
import DocsLayout from '../../../../../components/resources/docs/DocsLayout';
import {
  UserPlusIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CloudArrowUpIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const registrationSteps = [
  {
    id: 'create-account',
    title: 'Create Account',
    description: 'Register your institution with basic information',
    estimatedTime: '2-3 minutes',
    fields: [
      'Institution name and type',
      'Primary contact email',
      'Phone number',
      'Country and operating regions'
    ]
  },
  {
    id: 'upload-documents',
    title: 'Upload Documents',
    description: 'Provide required regulatory and business documents',
    estimatedTime: '3-5 minutes',
    fields: [
      'Business registration certificate',
      'Financial institution license',
      'Tax identification documents',
      'Regulatory approval letters'
    ]
  },
  {
    id: 'identity-verification',
    title: 'Identity Verification',
    description: 'Verify authorized signatory identities',
    estimatedTime: '2-4 minutes',
    fields: [
      'CEO/Managing Director ID',
      'Authorized signatories',
      'Board resolution (if required)',
      'Power of attorney documents'
    ]
  },
  {
    id: 'security-setup',
    title: 'Security Setup',
    description: 'Configure security settings and access controls',
    estimatedTime: '1-2 minutes',
    fields: [
      'Strong password creation',
      'Multi-factor authentication',
      'Security questions',
      'Backup email addresses'
    ]
  }
];

const requiredDocuments = [
  {
    category: 'Business Registration',
    documents: [
      { name: 'Certificate of Incorporation', required: true, format: 'PDF, JPG, PNG' },
      { name: 'Business Registration Certificate', required: true, format: 'PDF, JPG, PNG' },
      { name: 'Tax Identification Certificate', required: true, format: 'PDF, JPG, PNG' },
    ]
  },
  {
    category: 'Financial Institution License',
    documents: [
      { name: 'Banking License (CBK)', required: true, format: 'PDF only', condition: 'Banks only' },
      { name: 'SACCO Registration (SASRA)', required: true, format: 'PDF only', condition: 'SACCOs only' },
      { name: 'Microfinance License', required: true, format: 'PDF only', condition: 'MFIs only' },
    ]
  },
  {
    category: 'Regulatory Approvals',
    documents: [
      { name: 'Operational License', required: true, format: 'PDF, JPG, PNG' },
      { name: 'AML/CFT Compliance Certificate', required: false, format: 'PDF only' },
      { name: 'ISO Certifications', required: false, format: 'PDF, JPG, PNG' },
    ]
  },
  {
    category: 'Identity Documents',
    documents: [
      { name: 'CEO/MD National ID or Passport', required: true, format: 'PDF, JPG, PNG' },
      { name: 'Authorized Signatory IDs', required: true, format: 'PDF, JPG, PNG' },
      { name: 'Board Resolution', required: false, format: 'PDF only', condition: 'If required by bylaws' },
    ]
  }
];

export default function RegistrationPage() {
  return (
    <DocsLayout showSidebar={true} showBreadcrumbs={true}>
      <div className="max-w-5xl">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <UserPlusIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Account Registration
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Create and verify your institution account
              </p>
            </div>
          </div>

          {/* Quick Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <ClockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <div className="text-lg font-bold text-blue-700 dark:text-blue-300">8-14 mins</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">Total time</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <DocumentTextIcon className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
              <div>
                <div className="text-lg font-bold text-green-700 dark:text-green-300">4-8 docs</div>
                <div className="text-xs text-green-600 dark:text-green-400">Required</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <IdentificationIcon className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
              <div>
                <div className="text-lg font-bold text-purple-700 dark:text-purple-300">ID Verify</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">Required</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <ShieldCheckIcon className="w-6 h-6 text-orange-600 dark:text-orange-400 mr-3" />
              <div>
                <div className="text-lg font-bold text-orange-700 dark:text-orange-300">Secure</div>
                <div className="text-xs text-orange-600 dark:text-orange-400">MFA enabled</div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Registration Process
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Follow these 4 steps to create and verify your institution account. 
            The process is designed to be secure while minimizing setup time.
          </p>

          <div className="space-y-6">
            {registrationSteps.map((step, index) => (
              <div key={step.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {step.estimatedTime}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {step.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Information Required:
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {step.fields.map((field) => (
                          <div key={field} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircleIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                            {field}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                      {index === 0 ? 'Start Registration' : `Complete ${step.title}`}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Required Documents */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Required Documents
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Prepare these documents before starting registration to ensure a smooth process. 
            Document requirements may vary based on your institution type.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {requiredDocuments.map((category) => (
              <div key={category.category} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {category.category}
                </h3>
                
                <div className="space-y-3">
                  {category.documents.map((doc) => (
                    <div key={doc.name} className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {doc.name}
                          </h4>
                          {doc.required ? (
                            <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full">
                              Required
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                              Optional
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                          <div>Format: {doc.format}</div>
                          {doc.condition && <div>Condition: {doc.condition}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Document Upload Guidelines */}
        <section className="mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <CloudArrowUpIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
                  Document Upload Guidelines
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-blue-700 dark:text-blue-200 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">File Requirements:</h4>
                    <ul className="space-y-1">
                      <li>• Maximum file size: 10MB per document</li>
                      <li>• Accepted formats: PDF, JPG, PNG</li>
                      <li>• Clear, readable scans or photos</li>
                      <li>• Color documents preferred for IDs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Security & Privacy:</h4>
                    <ul className="space-y-1">
                      <li>• All uploads are encrypted in transit</li>
                      <li>• Documents stored securely with bank-level security</li>
                      <li>• Automatic deletion after verification (optional)</li>
                      <li>• GDPR and Kenya DPA compliant</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="mb-12">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
                  Important Registration Notes
                </h3>
                <ul className="space-y-2 text-amber-700 dark:text-amber-200 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Verification typically takes 1-2 business days</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Ensure all documents are current and not expired</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Contact information must be accurate for verification calls</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Additional documents may be requested during review</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started */}
        <section>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlusIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-2">
              Ready to Register Your Institution?
            </h3>
            <p className="text-blue-700 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
              Have all your documents ready? Start the registration process now and get verified quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg">
                Start Registration
              </button>
              <Link
                href="/resources/docs/support/contact"
                className="px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Previous</p>
            <Link href="/resources/docs/getting-started" className="text-blue-600 dark:text-blue-400 hover:underline">
              ← Getting Started
            </Link>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Next</p>
            <Link href="/resources/docs/getting-started/institution-setup" className="text-blue-600 dark:text-blue-400 hover:underline">
              Institution Setup →
            </Link>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
