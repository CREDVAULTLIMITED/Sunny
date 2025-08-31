'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../providers/ThemeProvider';
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PlayCircleIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'failed';
  estimatedTime?: string;
  completedAt?: Date;
}

interface ProgressTrackerProps {
  steps: ProgressStep[];
  currentStepId?: string;
  showCompletion?: boolean;
  onStepClick?: (stepId: string) => void;
}

export default function ProgressTracker({ 
  steps, 
  currentStepId, 
  showCompletion = true,
  onStepClick 
}: ProgressTrackerProps) {
  const { actualTheme } = useTheme();
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    const completed = steps.filter(step => step.status === 'completed').length;
    setCompletedSteps(completed);
  }, [steps]);

  const getStepIcon = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return CheckCircleIcon;
      case 'in-progress':
        return PlayCircleIcon;
      case 'failed':
        return XCircleIcon;
      default:
        return ClockIcon;
    }
  };

  const getStepColors = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-600 dark:text-green-400',
          border: 'border-green-300 dark:border-green-600'
        };
      case 'in-progress':
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/30',
          text: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-300 dark:border-blue-600'
        };
      case 'failed':
        return {
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-600 dark:text-red-400',
          border: 'border-red-300 dark:border-red-600'
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-700',
          text: 'text-gray-500 dark:text-gray-400',
          border: 'border-gray-300 dark:border-gray-600'
        };
    }
  };

  const progressPercentage = (completedSteps / steps.length) * 100;
  const isAllCompleted = completedSteps === steps.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Setup Progress
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {completedSteps} of {steps.length} steps completed
          </p>
        </div>
        
        {isAllCompleted && showCompletion && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg"
          >
            <TrophyIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Complete!</span>
          </motion.div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-300">Progress</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const colors = getStepColors(step.status);
          const IconComponent = getStepIcon(step.status);
          const isCurrentStep = step.id === currentStepId;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`flex items-center p-4 rounded-lg border transition-all duration-200 ${
                isCurrentStep
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
              } ${onStepClick ? 'cursor-pointer hover:shadow-md' : ''}`}
              onClick={() => onStepClick?.(step.id)}
            >
              {/* Step Icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colors.bg} flex-shrink-0`}>
                <IconComponent className={`w-5 h-5 ${colors.text}`} />
              </div>

              {/* Step Content */}
              <div className="flex-1 ml-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-sm font-medium ${
                    isCurrentStep
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {step.title}
                  </h4>
                  
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    {step.estimatedTime && step.status === 'pending' && (
                      <div className="flex items-center">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {step.estimatedTime}
                      </div>
                    )}
                    
                    {step.completedAt && step.status === 'completed' && (
                      <div className="text-green-600 dark:text-green-400">
                        Completed {step.completedAt.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>

                {/* Status Indicator */}
                {step.status === 'in-progress' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 flex items-center text-xs text-blue-600 dark:text-blue-400"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                    In progress...
                  </motion.div>
                )}

                {step.status === 'failed' && (
                  <div className="mt-2 flex items-center text-xs text-red-600 dark:text-red-400">
                    <XCircleIcon className="w-3 h-3 mr-1" />
                    Failed - Click to retry
                  </div>
                )}
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 mt-12 w-0.5 h-6 bg-gray-200 dark:bg-gray-600" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Completion Message */}
      {isAllCompleted && showCompletion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
              <TrophyIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-green-800 dark:text-green-300">
                🎉 Setup Complete!
              </h4>
              <p className="text-sm text-green-700 dark:text-green-200">
                Congratulations! You've successfully completed the setup process. You're ready to start processing payments.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Next Step Hint */}
      {!isAllCompleted && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
              <PlayCircleIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                Next Step
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                {steps.find(step => step.status === 'in-progress')?.title || 
                 steps.find(step => step.status === 'pending')?.title ||
                 'Continue with the setup process'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
