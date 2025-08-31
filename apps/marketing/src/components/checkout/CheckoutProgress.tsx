'use client';

import { motion } from 'framer-motion';
import { 
  ShoppingCartIcon,
  CreditCardIcon,
  CheckCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import {
  ShoppingCartIcon as ShoppingCartSolid,
  CreditCardIcon as CreditCardSolid,
  CheckCircleIcon as CheckCircleSolid,
  UserIcon as UserSolid
} from '@heroicons/react/24/solid';

interface ProgressStep {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconSolid: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const steps: ProgressStep[] = [
  {
    id: 'cart',
    name: 'Cart',
    description: 'Review your items',
    icon: ShoppingCartIcon,
    iconSolid: ShoppingCartSolid
  },
  {
    id: 'information',
    name: 'Information',
    description: 'Shipping & contact',
    icon: UserIcon,
    iconSolid: UserSolid
  },
  {
    id: 'payment',
    name: 'Payment',
    description: 'Payment method',
    icon: CreditCardIcon,
    iconSolid: CreditCardSolid
  },
  {
    id: 'confirmation',
    name: 'Complete',
    description: 'Order confirmation',
    icon: CheckCircleIcon,
    iconSolid: CheckCircleSolid
  }
];

interface Props {
  currentStep: string;
  completedSteps: string[];
  onStepClick?: (stepId: string) => void;
  allowNavigation?: boolean;
}

export default function CheckoutProgress({ 
  currentStep, 
  completedSteps, 
  onStepClick,
  allowNavigation = false 
}: Props) {
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const isStepCompleted = (stepId: string) => {
    return completedSteps.includes(stepId);
  };

  const isStepCurrent = (stepId: string) => {
    return currentStep === stepId;
  };

  const isStepAccessible = (stepIndex: number) => {
    const currentIndex = getCurrentStepIndex();
    const step = steps[stepIndex];
    return stepIndex <= currentIndex || (step && completedSteps.includes(step.id));
  };

  const getStepStatus = (stepId: string, stepIndex: number) => {
    if (isStepCompleted(stepId)) return 'completed';
    if (isStepCurrent(stepId)) return 'current';
    if (isStepAccessible(stepIndex)) return 'accessible';
    return 'upcoming';
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Checkout progress">
          <ol className="flex items-center justify-center space-x-4 lg:space-x-8">
            {steps.map((step, stepIndex) => {
              const status = getStepStatus(step.id, stepIndex);
              const IconComponent = status === 'completed' ? step.iconSolid : step.icon;
              
              return (
                <li key={step.id} className="flex items-center">
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: stepIndex * 0.1 }}
                  >
                    {/* Step Circle */}
                    <motion.button
                      onClick={() => allowNavigation && onStepClick?.(step.id)}
                      disabled={!allowNavigation || !isStepAccessible(stepIndex)}
                      className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                        status === 'completed'
                          ? 'bg-green-500 text-white shadow-lg hover:bg-green-600'
                          : status === 'current'
                          ? 'bg-blue-500 text-white shadow-lg ring-4 ring-blue-200 dark:ring-blue-800'
                          : status === 'accessible'
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                      } ${
                        allowNavigation && isStepAccessible(stepIndex) 
                          ? 'cursor-pointer hover:scale-105' 
                          : 'cursor-default'
                      }`}
                      whileHover={allowNavigation && isStepAccessible(stepIndex) ? { scale: 1.05 } : {}}
                      whileTap={allowNavigation && isStepAccessible(stepIndex) ? { scale: 0.95 } : {}}
                    >
                      <IconComponent className="w-6 h-6" />
                      
                      {/* Pulse animation for current step */}
                      {status === 'current' && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-blue-500"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>

                    {/* Step Label */}
                    <div className="mt-3 text-center">
                      <p className={`text-sm font-medium ${
                        status === 'completed'
                          ? 'text-green-600 dark:text-green-400'
                          : status === 'current'
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {step.name}
                      </p>
                      <p className={`text-xs mt-1 ${
                        status === 'current'
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-500 dark:text-gray-500'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Connector Line */}
                  {stepIndex < steps.length - 1 && (
                    <motion.div
                      className="flex-1 min-w-8 lg:min-w-16 mx-2 lg:mx-4"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: stepIndex * 0.1 + 0.2, duration: 0.5 }}
                    >
                      <div className={`h-0.5 transition-colors duration-500 ${
                        isStepCompleted(step.id)
                          ? 'bg-green-500'
                          : status === 'current'
                          ? 'bg-gradient-to-r from-blue-500 to-gray-300 dark:to-gray-600'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                    </motion.div>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Progress Bar */}
        <motion.div 
          className="mt-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>
              {Math.round(((getCurrentStepIndex() + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((getCurrentStepIndex() + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Current Step Info */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {steps.find(step => step.id === currentStep)?.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {steps.find(step => step.id === currentStep)?.description}
          </p>
        </motion.div>

        {/* Help Text */}
        {allowNavigation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-center"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Click on completed steps to go back and edit your information
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}



