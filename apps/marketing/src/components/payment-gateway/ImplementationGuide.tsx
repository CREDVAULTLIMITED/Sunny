'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  PlayIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  CogIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface Step {
  id: string;
  title: string;
  description: string;
  duration: string;
  complexity: 'Easy' | 'Medium' | 'Advanced';
  tasks: Task[];
  code?: {
    language: string;
    content: string;
  };
}

interface Task {
  title: string;
  description: string;
  completed?: boolean;
}

const implementationSteps: Step[] = [
  {
    id: 'setup',
    title: 'Account Setup & API Keys',
    description: 'Create your Sunny account and generate secure API credentials',
    duration: '5 minutes',
    complexity: 'Easy',
    tasks: [
      {
        title: 'Sign up for Sunny account',
        description: 'Create your account and verify your email address'
      },
      {
        title: 'Complete business verification',
        description: 'Provide business documents and banking information'
      },
      {
        title: 'Generate API keys',
        description: 'Create sandbox and live API keys from your dashboard'
      },
      {
        title: 'Configure webhooks',
        description: 'Set up webhook endpoints for payment notifications'
      }
    ],
    code: {
      language: 'bash',
      content: `# Install Sunny SDK
npm install @sunny/payment-sdk

# Set environment variables
export SUNNY_API_KEY="sk_test_..."
export SUNNY_WEBHOOK_SECRET="whsec_..."`
    }
  },
  {
    id: 'integration',
    title: 'Choose Integration Method',
    description: 'Select the integration approach that best fits your needs',
    duration: '30 minutes',
    complexity: 'Medium',
    tasks: [
      {
        title: 'Review integration options',
        description: 'Choose between Checkout.js, Payment API, or hosted pages'
      },
      {
        title: 'Install SDK or include JavaScript',
        description: 'Add Sunny libraries to your project'
      },
      {
        title: 'Initialize payment client',
        description: 'Set up the payment client with your API keys'
      },
      {
        title: 'Configure payment options',
        description: 'Define accepted payment methods and currencies'
      }
    ],
    code: {
      language: 'javascript',
      content: `import { SunnyPayments } from '@sunny/payment-sdk';

const sunny = new SunnyPayments({
  apiKey: process.env.SUNNY_API_KEY,
  environment: 'sandbox', // or 'live'
});

// Initialize payment
const payment = await sunny.payments.create({
  amount: 2000, // $20.00 in cents
  currency: 'USD',
  description: 'Order #12345',
  metadata: {
    orderId: '12345',
    customerId: 'cust_123'
  }
});`
    }
  },
  {
    id: 'frontend',
    title: 'Frontend Implementation',
    description: 'Integrate payment forms and handle user interactions',
    duration: '2 hours',
    complexity: 'Medium',
    tasks: [
      {
        title: 'Create payment form',
        description: 'Build a secure payment form using Sunny Elements'
      },
      {
        title: 'Handle form submission',
        description: 'Process form data and create payment intent'
      },
      {
        title: 'Implement 3D Secure',
        description: 'Handle strong customer authentication flows'
      },
      {
        title: 'Add loading states',
        description: 'Provide user feedback during payment processing'
      }
    ],
    code: {
      language: 'javascript',
      content: `// Create payment form
const form = sunny.elements.create('payment-form', {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
    }
  }
});

// Handle form submission
form.on('submit', async (event) => {
  event.preventDefault();
  
  const {error, paymentMethod} = await sunny.createPaymentMethod({
    type: 'card',
    card: form.getElement('card'),
    billing_details: {
      name: 'Customer Name',
      email: 'customer@example.com'
    }
  });
  
  if (error) {
    console.error('Payment failed:', error);
  } else {
    console.log('Payment successful:', paymentMethod);
  }
});`
    }
  },
  {
    id: 'backend',
    title: 'Backend Integration',
    description: 'Set up server-side payment processing and webhook handling',
    duration: '3 hours',
    complexity: 'Advanced',
    tasks: [
      {
        title: 'Create payment endpoint',
        description: 'Build API endpoint to create payment intents'
      },
      {
        title: 'Implement webhook handler',
        description: 'Process payment status updates securely'
      },
      {
        title: 'Add error handling',
        description: 'Handle failed payments and edge cases'
      },
      {
        title: 'Set up logging',
        description: 'Implement comprehensive payment logging'
      }
    ],
    code: {
      language: 'javascript',
      content: `// Express.js webhook handler
app.post('/webhooks/sunny', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['sunny-signature'];
  
  try {
    const event = sunny.webhooks.constructEvent(req.body, sig, endpointSecret);
    
    switch (event.type) {
      case 'payment.succeeded':
        console.log('Payment succeeded:', event.data.object);
        // Update order status, send confirmation email
        break;
      case 'payment.failed':
        console.log('Payment failed:', event.data.object);
        // Handle failed payment
        break;
    }
    
    res.json({received: true});
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).send(\`Webhook Error: \${err.message}\`);
  }
});`
    }
  },
  {
    id: 'testing',
    title: 'Testing & Validation',
    description: 'Test your integration thoroughly before going live',
    duration: '1 hour',
    complexity: 'Medium',
    tasks: [
      {
        title: 'Test with sample cards',
        description: 'Use Sunny test cards to verify different scenarios'
      },
      {
        title: 'Validate webhook handling',
        description: 'Ensure webhooks are processed correctly'
      },
      {
        title: 'Test error scenarios',
        description: 'Verify proper handling of declined cards and failures'
      },
      {
        title: 'Check mobile responsiveness',
        description: 'Test payment flow on mobile devices'
      }
    ],
    code: {
      language: 'javascript',
      content: `// Test card numbers for different scenarios
const testCards = {
  success: '4242424242424242',
  declined: '4000000000000002',
  insufficient_funds: '4000000000009995',
  require_3ds: '4000002500003155'
};

// Test payment with success card
const testPayment = await sunny.payments.create({
  amount: 1000,
  currency: 'USD',
  payment_method: {
    type: 'card',
    card: {
      number: testCards.success,
      exp_month: 12,
      exp_year: 2025,
      cvc: '123'
    }
  }
});`
    }
  },
  {
    id: 'launch',
    title: 'Go Live',
    description: 'Deploy your integration and start accepting real payments',
    duration: '30 minutes',
    complexity: 'Easy',
    tasks: [
      {
        title: 'Switch to live API keys',
        description: 'Replace sandbox keys with live production keys'
      },
      {
        title: 'Update webhook URLs',
        description: 'Point webhooks to your production endpoints'
      },
      {
        title: 'Enable live payment methods',
        description: 'Activate the payment methods you want to accept'
      },
      {
        title: 'Monitor initial transactions',
        description: 'Watch your first live payments come through'
      }
    ],
    code: {
      language: 'javascript',
      content: `// Production configuration
const sunny = new SunnyPayments({
  apiKey: process.env.SUNNY_LIVE_API_KEY,
  environment: 'live',
  webhookSecret: process.env.SUNNY_LIVE_WEBHOOK_SECRET
});

// Ready to accept real payments!
console.log('🎉 Your payment system is live!');`
    }
  }
];

const resources = [
  {
    title: 'API Documentation',
    description: 'Complete reference for all Sunny APIs',
    icon: DocumentTextIcon,
    link: '/docs/api',
    type: 'Documentation'
  },
  {
    title: 'Code Examples',
    description: 'Sample implementations in multiple languages',
    icon: CodeBracketIcon,
    link: '/docs/examples',
    type: 'Code'
  },
  {
    title: 'Testing Guide',
    description: 'Test cards and webhook testing tools',
    icon: CogIcon,
    link: '/docs/testing',
    type: 'Testing'
  },
  {
    title: 'Developer Support',
    description: '24/7 support for technical questions',
    icon: UserGroupIcon,
    link: '/support',
    type: 'Support'
  }
];

export default function ImplementationGuide() {
  const [activeStep, setActiveStep] = useState<string>('setup');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const activeStepData = implementationSteps.find(step => step.id === activeStep);

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
            <PlayIcon className="w-4 h-4 mr-2" />
            Implementation Guide
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Follow our step-by-step guide to integrate Sunny payments into your application. 
            From setup to go-live in under 6 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Implementation Steps
              </h3>
              
              <div className="space-y-3">
                {implementationSteps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      activeStep === step.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500'
                        : 'border-2 border-transparent hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-3 ${
                          completedSteps.includes(step.id)
                            ? 'bg-green-500 text-white'
                            : activeStep === step.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {completedSteps.includes(step.id) ? (
                            <CheckCircleIcon className="w-5 h-5" />
                          ) : (
                            index + 1
                          )}
                        </span>
                        <span className={`font-medium ${
                          activeStep === step.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      <ChevronRightIcon className={`w-5 h-5 transition-transform ${
                        activeStep === step.id ? 'rotate-90' : ''
                      } text-gray-400`} />
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {step.duration}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        step.complexity === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        step.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {step.complexity}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{completedSteps.length}/{implementationSteps.length}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    data-progress={`${(completedSteps.length / implementationSteps.length) * 100}%`}
                    style={{ 
                      width: `${(completedSteps.length / implementationSteps.length) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            {activeStepData && (
              <>
                {/* Step Header */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {activeStepData.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {activeStepData.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleStepCompletion(activeStepData.id)}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        completedSteps.includes(activeStepData.id)
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {completedSteps.includes(activeStepData.id) ? 'Completed' : 'Mark Complete'}
                    </button>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      Estimated time: {activeStepData.duration}
                    </div>
                    <span className={`px-3 py-1 rounded-full ${
                      activeStepData.complexity === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      activeStepData.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {activeStepData.complexity}
                    </span>
                  </div>
                </div>

                {/* Tasks */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Tasks to Complete
                  </h4>
                  
                  <div className="space-y-4">
                    {activeStepData.tasks.map((task, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center mt-0.5">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            {task.title}
                          </h5>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {task.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Example */}
                {activeStepData.code && (
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-8">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Code Example
                    </h4>
                    
                    <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm font-medium">
                          {activeStepData.code.language}
                        </span>
                        <button className="text-blue-400 hover:text-blue-300 text-sm">
                          Copy
                        </button>
                      </div>
                      <pre className="text-gray-300 text-sm leading-relaxed">
                        <code>{activeStepData.code.content}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Additional Resources
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <resource.icon className="w-8 h-8 text-blue-500" />
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {resource.type}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {resource.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {resource.description}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
