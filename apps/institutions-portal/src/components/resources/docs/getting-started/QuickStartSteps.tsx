'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../providers/ThemeProvider';
import {
  UserPlusIcon,
  CogIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  DocumentTextIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const quickStartSteps = [
  {
    id: 1,
    title: 'Account Setup',
    description: 'Create your institution account and complete verification',
    estimatedTime: '5-10 minutes',
    icon: UserPlusIcon,
    status: 'pending',
    tasks: [
      'Fill out institution registration form',
      'Upload required documents (license, certificates)',
      'Complete identity verification',
      'Set up security settings and MFA'
    ],
    resources: [
      { name: 'Registration Guide', href: '/resources/docs/getting-started/registration', type: 'guide' },
      { name: 'Required Documents', href: '/resources/docs/getting-started/documents', type: 'checklist' },
    ]
  },
  {
    id: 2,
    title: 'Configure Institution',
    description: 'Set up your institution profile and compliance settings',
    estimatedTime: '10-15 minutes',
    icon: CogIcon,
    status: 'pending',
    tasks: [
      'Configure business information and branding',
      'Set up compliance and regulatory settings',
      'Configure payment methods and limits',
      'Set up fee structures and pricing'
    ],
    resources: [
      { name: 'Institution Setup', href: '/resources/docs/getting-started/institution-setup', type: 'guide' },
      { name: 'Compliance Settings', href: '/resources/docs/getting-started/compliance', type: 'guide' },
    ]
  },
  {
    id: 3,
    title: 'API Integration',
    description: 'Integrate Sunny APIs into your existing systems',
    estimatedTime: '15-30 minutes',
    icon: CodeBracketIcon,
    status: 'pending',
    tasks: [
      'Generate API keys and configure authentication',
      'Install and configure SDK (JavaScript, Python, etc.)',
      'Test API endpoints in sandbox environment',
      'Set up webhook endpoints for notifications'
    ],
    resources: [
      { name: 'API Quick Start', href: '/resources/docs/api/quick-start', type: 'guide' },
      { name: 'SDK Installation', href: '/resources/docs/api/sdks', type: 'code' },
      { name: 'API Reference', href: '/resources/docs/api', type: 'reference' },
    ]
  },
  {
    id: 4,
    title: 'Test & Go Live',
    description: 'Test your integration and launch to production',
    estimatedTime: '10-20 minutes',
    icon: RocketLaunchIcon,
    status: 'pending',
    tasks: [
      'Run test transactions in sandbox',
      'Verify webhook notifications work correctly',
      'Complete security and compliance checklist',
      'Switch to production environment'
    ],
    resources: [
      { name: 'Testing Guide', href: '/resources/docs/getting-started/testing', type: 'guide' },
      { name: 'Go Live Checklist', href: '/resources/docs/getting-started/go-live', type: 'checklist' },
    ]
  }
];

const resourceTypeIcons = {
  guide: DocumentTextIcon,
  checklist: CheckCircleIcon,
  code: CodeBracketIcon,
  reference: DocumentTextIcon,
  video: PlayCircleIcon,
};

interface QuickStartStepsProps {
  currentStep?: number;
  onStepChange?: (step: number) => void;
}

export default function QuickStartSteps({ currentStep = 1, onStepChange }: QuickStartStepsProps) {
  const { actualTheme } = useTheme();
  const [expandedStep, setExpandedStep] = useState<number | null>(currentStep);

  const handleStepClick = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
    onStepChange?.(stepId);
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Start Guide
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Follow these 4 simple steps to get your institution up and running with Sunny Payments.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {quickStartSteps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    getStepStatus(step.id) === 'completed'
                      ? 'bg-green-500 text-white'
                      : getStepStatus(step.id) === 'current'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {getStepStatus(step.id) === 'completed' ? (
                    <CheckCircleIcon className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    getStepStatus(step.id) === 'current'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {step.estimatedTime}
                  </div>
                </div>
              </div>
              
              {index < quickStartSteps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  getStepStatus(step.id) === 'completed'
                    ? 'bg-green-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Cards */}
      <div className="space-y-4">
        {quickStartSteps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: step.id * 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-xl border transition-all duration-200 ${
              getStepStatus(step.id) === 'current'
                ? 'border-blue-300 dark:border-blue-600 shadow-lg'
                : getStepStatus(step.id) === 'completed'
                ? 'border-green-300 dark:border-green-600'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <button
              onClick={() => handleStepClick(step.id)}
              className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    getStepStatus(step.id) === 'completed'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : getStepStatus(step.id) === 'current'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {getStepStatus(step.id) === 'completed' ? (
                      <CheckCircleIcon className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className={`text-lg font-semibold ${
                        getStepStatus(step.id) === 'current'
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        Step {step.id}: {step.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {step.estimatedTime}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                <motion.div
                  animate={{ rotate: expandedStep === step.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </div>
            </button>

            <AnimatePresence>
              {expandedStep === step.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6 pt-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Tasks */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                          Tasks to Complete
                        </h4>
                        <ul className="space-y-3">
                          {step.tasks.map((task, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircleIcon className="w-4 h-4 mt-0.5 mr-3 text-gray-400 flex-shrink-0" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {task}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Resources */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                          Helpful Resources
                        </h4>
                        <div className="space-y-3">
                          {step.resources.map((resource, index) => {
                            const IconComponent = resourceTypeIcons[resource.type] || DocumentTextIcon;
                            return (
                              <Link
                                key={index}
                                href={resource.href}
                                className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                              >
                                <IconComponent className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                  {resource.name}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Next Steps */}
      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
            <RocketLaunchIcon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-blue-700 dark:text-blue-200 mb-4">
              Complete these steps in order to ensure a smooth setup process. Each step builds on the previous one.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/resources/docs/getting-started/registration"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Start Step 1: Account Setup
              </Link>
              <Link
                href="/resources/docs/support"
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-lg border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
