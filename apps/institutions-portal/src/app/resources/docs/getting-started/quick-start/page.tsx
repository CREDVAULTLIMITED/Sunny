import React from 'react';
import DocsLayout from '../../../../../components/resources/docs/DocsLayout';
import ProgressTracker from '../../../../../components/resources/docs/getting-started/ProgressTracker';
import {
  RocketLaunchIcon,
  ClockIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  ShieldCheckIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const progressSteps = [
  {
    id: 'account-setup',
    title: 'Account Setup',
    description: 'Create and verify your institution account',
    status: 'completed' as const,
    estimatedTime: '5-10 minutes',
    completedAt: new Date('2025-01-15')
  },
  {
    id: 'institution-config',
    title: 'Institution Configuration',
    description: 'Configure your business settings and compliance',
    status: 'in-progress' as const,
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    description: 'Integrate Sunny APIs into your systems',
    status: 'pending' as const,
    estimatedTime: '15-30 minutes'
  },
  {
    id: 'testing-golive',
    title: 'Testing & Go Live',
    description: 'Test your integration and launch to production',
    status: 'pending' as const,
    estimatedTime: '10-20 minutes'
  }
];

export default function QuickStartPage() {
  return (
    <DocsLayout showSidebar={true} showBreadcrumbs={true}>
      <div className="max-w-5xl">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <RocketLaunchIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Quick Start Guide
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Get up and running with Sunny Payments in under 1 hour
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <ClockIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">~45 mins</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Total setup time</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">4 Steps</div>
                <div className="text-sm text-green-600 dark:text-green-400">Simple process</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <RocketLaunchIcon className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">Live</div>
                <div className="text-sm text-purple-600 dark:text-purple-400">Ready to process</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                What You'll Accomplish
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CogIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Complete Institution Setup
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Configure your institution profile, compliance settings, and payment preferences
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CodeBracketIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      API Integration
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Connect your systems with Sunny APIs using our SDKs and test in sandbox
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShieldCheckIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Security & Compliance
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Ensure your integration meets regulatory requirements and security standards
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RocketLaunchIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Production Deployment
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Go live and start processing real payments for your customers
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Prerequisites */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Before You Start
              </h2>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">!</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-3">
                      Required Prerequisites
                    </h3>
                    <ul className="space-y-2 text-amber-700 dark:text-amber-200 text-sm">
                      <li className="flex items-center">
                        <CheckCircleIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                        Valid financial institution license (Bank, SACCO, MFI, etc.)
                      </li>
                      <li className="flex items-center">
                        <CheckCircleIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                        CBK, SASRA, or relevant regulatory approval
                      </li>
                      <li className="flex items-center">
                        <CheckCircleIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                        Technical team familiar with REST APIs
                      </li>
                      <li className="flex items-center">
                        <CheckCircleIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                        Development and staging environments
                      </li>
                      <li className="flex items-center">
                        <CheckCircleIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                        SSL certificate for webhook endpoints
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Step-by-Step Guide */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Step-by-Step Process
              </h2>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Account Setup & Verification
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Create your Sunny Payments account and complete the verification process.
                      </p>
                      <div className="flex items-center space-x-4">
                        <Link
                          href="/resources/docs/getting-started/registration"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Start Setup
                        </Link>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          5-10 minutes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Institution Configuration
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Configure your business settings, compliance requirements, and payment preferences.
                      </p>
                      <div className="flex items-center space-x-4">
                        <Link
                          href="/resources/docs/getting-started/institution-setup"
                          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Configure Institution
                        </Link>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          10-15 minutes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        API Integration & Testing
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Integrate Sunny APIs, install SDKs, and test your implementation in sandbox.
                      </p>
                      <div className="flex items-center space-x-4">
                        <Link
                          href="/resources/docs/api/quick-start"
                          className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Start Integration
                        </Link>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          15-30 minutes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Go Live & Production
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Complete final testing, security review, and deploy to production.
                      </p>
                      <div className="flex items-center space-x-4">
                        <Link
                          href="/resources/docs/getting-started/go-live"
                          className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Go Live Guide
                        </Link>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          10-20 minutes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Need Help */}
            <section>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  Need Help Getting Started?
                </h3>
                <p className="text-blue-700 dark:text-blue-200 mb-4">
                  Our support team is here to help you through every step of the integration process.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/resources/docs/support/contact"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Contact Support
                  </Link>
                  <Link
                    href="/resources/docs/support/community"
                    className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-lg border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    Join Community
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProgressTracker 
              steps={progressSteps}
              currentStepId="institution-config"
              showCompletion={true}
            />
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
