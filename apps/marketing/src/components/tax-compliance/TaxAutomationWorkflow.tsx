'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  CogIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  BoltIcon,
  CloudIcon
} from '@heroicons/react/24/outline';

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: any;
  duration: string;
  status: 'completed' | 'active' | 'pending';
  details: string[];
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: 'Transaction Initiated',
    description: 'Customer initiates payment or transaction',
    icon: BoltIcon,
    duration: '0ms',
    status: 'completed',
    details: ['Payment details captured', 'Location identified', 'Product categorized']
  },
  {
    id: 2,
    title: 'Tax Calculation',
    description: 'Real-time tax computation based on jurisdiction',
    icon: CogIcon,
    duration: '<500ms',
    status: 'active',
    details: ['Jurisdiction rules applied', 'Tax rates retrieved', 'Multi-layer calculation']
  },
  {
    id: 3,
    title: 'Compliance Check',
    description: 'Automated compliance validation',
    icon: ShieldCheckIcon,
    duration: '<200ms',
    status: 'pending',
    details: ['Regulatory rules verified', 'Exemptions applied', 'Risk assessment']
  },
  {
    id: 4,
    title: 'Receipt Generation',
    description: 'Digital receipt with tax breakdown',
    icon: DocumentTextIcon,
    duration: '<300ms',
    status: 'pending',
    details: ['Localized format', 'Digital signature', 'Audit trail created']
  },
  {
    id: 5,
    title: 'Reporting Queue',
    description: 'Data prepared for regulatory reporting',
    icon: CloudIcon,
    duration: '<100ms',
    status: 'pending',
    details: ['Report formatting', 'Authority routing', 'Submission scheduling']
  }
];

export default function TaxAutomationWorkflow() {
  const [activeStep, setActiveStep] = useState<number>(2);

  const getStepStatus = (step: WorkflowStep) => {
    if (step.id < activeStep) return 'completed';
    if (step.id === activeStep) return 'active';
    return 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'active': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'pending': return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
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
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
            <CogIcon className="w-4 h-4 mr-2" />
            Tax Automation Workflow
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            End-to-End Tax Automation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Watch how our AI-powered tax engine processes transactions from initiation to compliance reporting 
            in under 1 second with 99.8% accuracy.
          </p>
        </motion.div>

        {/* Workflow Visualization */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2 z-0" />
          <motion.div
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 transform -translate-y-1/2 z-10"
            initial={{ width: 0 }}
            whileInView={{ width: `${((activeStep - 1) / (workflowSteps.length - 1)) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Workflow Steps */}
          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 z-20">
            {workflowSteps.map((step, index) => {
              const status = getStepStatus(step);
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Step Circle */}
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      status === 'completed' ? 'bg-green-500 text-white' :
                      status === 'active' ? 'bg-blue-500 text-white animate-pulse' :
                      'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    }`}>
                      {status === 'completed' ? (
                        <CheckCircleIcon className="w-8 h-8" />
                      ) : (
                        <step.icon className="w-8 h-8" />
                      )}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {step.description}
                    </p>
                    
                    {/* Duration Badge */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {step.duration}
                    </div>

                    {/* Step Details (shown for active step) */}
                    {status === 'active' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                      >
                        <div className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center text-xs text-blue-700 dark:text-blue-300">
                              <CheckCircleIcon className="w-3 h-3 mr-2 text-blue-500" />
                              {detail}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Arrow between steps */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                      <ArrowRightIcon className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Workflow Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Interactive Workflow Simulation
            </h3>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {workflowSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeStep === step.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600'
                  }`}
                >
                  Step {step.id}: {step.title}
                </button>
              ))}
            </div>
            
            {/* Current Step Details */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {workflowSteps[activeStep - 1]?.duration}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Processing Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                    99.8%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Automation</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  {workflowSteps[activeStep - 1]?.title} Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {workflowSteps[activeStep - 1]?.details.map((detail, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'Lightning Fast',
              description: 'Complete tax processing in under 1 second',
              metric: '<1s',
              color: 'text-yellow-600 dark:text-yellow-400'
            },
            {
              title: 'Highly Accurate',
              description: '99.8% accuracy across all calculations',
              metric: '99.8%',
              color: 'text-green-600 dark:text-green-400'
            },
            {
              title: 'Fully Automated',
              description: 'Zero manual intervention required',
              metric: '100%',
              color: 'text-blue-600 dark:text-blue-400'
            }
          ].map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className={`text-4xl font-bold mb-2 ${benefit.color}`}>
                {benefit.metric}
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {benefit.title}
              </h4>
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

