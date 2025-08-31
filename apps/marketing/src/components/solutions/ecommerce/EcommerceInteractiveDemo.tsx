'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCardIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

export function EcommerceInteractiveDemo() {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [demoStep, setDemoStep] = useState('selection');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit Card',
      icon: CreditCardIcon,
      description: 'Visa, Mastercard, Amex',
      processingTime: 'Instant',
      fees: '2.9% + $0.30'
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: DevicePhoneMobileIcon,
      description: 'Touch ID, Face ID',
      processingTime: 'Instant',
      fees: '2.9% + $0.30'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: ShieldCheckIcon,
      description: 'Digital wallet',
      processingTime: 'Instant',
      fees: '3.49% + $0.49'
    }
  ];

  const demoProduct = {
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: '🎧',
    description: 'High-quality wireless headphones with noise cancellation'
  };

  const handlePaymentDemo = async () => {
    setIsProcessing(true);
    setDemoStep('processing');
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setDemoStep('success');
  };

  const resetDemo = () => {
    setDemoStep('selection');
    setSelectedMethod('card');
    setIsProcessing(false);
  };

  const features = [
    {
      title: 'Conversion Optimized',
      description: 'Checkout flows designed to maximize conversions',
      icon: '📈',
      metric: '+23% conversion rate'
    },
    {
      title: 'Mobile First',
      description: 'Responsive design that works perfectly on mobile',
      icon: '📱',
      metric: '99% mobile compatibility'
    },
    {
      title: 'Lightning Fast',
      description: 'Sub-second loading times for better user experience',
      icon: '⚡',
      metric: '<500ms load time'
    },
    {
      title: 'Fraud Protection',
      description: 'AI-powered fraud detection built-in',
      icon: '🛡️',
      metric: '99.8% fraud detection'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Experience Our Checkout
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Try our interactive demo to see how smooth and secure the payment experience is for your customers. 
              No real transactions - just a taste of what's possible.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Interface */}
          <div className="space-y-6">
            {/* Demo Product */}
            <Card className="p-6 bg-white dark:bg-gray-800 shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-4xl">{demoProduct.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{demoProduct.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{demoProduct.description}</p>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                    ${demoProduct.price}
                  </div>
                </div>
              </div>

              {demoStep === 'selection' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Choose Payment Method</h4>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                          selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <method.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white">{method.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{method.description}</div>
                          </div>
                          <div className="text-right text-sm">
                            <div className="text-gray-900 dark:text-white">{method.processingTime}</div>
                            <div className="text-gray-600 dark:text-gray-400">{method.fees}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <Button 
                    onClick={handlePaymentDemo} 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    size="lg"
                  >
                    Complete Payment - ${demoProduct.price}
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}

              {demoStep === 'processing' && (
                <div className="text-center space-y-6 py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Processing Payment...</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Securing your transaction with AI-powered fraud detection
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-sm text-green-600 dark:text-green-400">
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>Payment method verified</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-green-600 dark:text-green-400">
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>Fraud check passed</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span>Finalizing transaction...</span>
                    </div>
                  </div>
                </div>
              )}

              {demoStep === 'success' && (
                <div className="text-center space-y-6 py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full">
                    <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Payment Successful! 🎉</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your order has been confirmed and you'll receive an email receipt shortly.
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Transaction ID:</span>
                        <span className="font-mono text-gray-900 dark:text-white">TXN_DEMO_12345</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Processing Time:</span>
                        <span className="text-gray-900 dark:text-white">1.8 seconds</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                        <span className="text-green-600 dark:text-green-400 font-medium">Completed</span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={resetDemo} variant="outline" size="lg" className="w-full">
                    Try Another Payment Method
                  </Button>
                </div>
              )}
            </Card>

            {/* Demo Controls */}
            <div className="text-center">
              <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800">
                <PlayIcon className="w-4 h-4 mr-1" />
                Interactive Demo - No Real Transactions
              </Badge>
            </div>
          </div>

          {/* Features Showcase */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Why Customers Love Our Checkout
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our checkout experience is optimized for conversions, security, and user experience. 
                See what makes the difference for your business.
              </p>
            </div>

            <div className="grid gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{feature.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {feature.metric}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <Card className="p-6 bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <div className="space-y-4">
                <h4 className="text-xl font-bold">Ready to Implement?</h4>
                <p className="text-blue-100">
                  Start integrating our checkout solution into your e-commerce store today. 
                  Get started with our comprehensive documentation and code examples.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    View Integration Guide
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
