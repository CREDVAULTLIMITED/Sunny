'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  CodeBracketIcon, 
  GlobeAltIcon, 
  CommandLineIcon,
  DevicePhoneMobileIcon,
  PuzzlePieceIcon,
  CloudIcon
} from '@heroicons/react/24/outline';

interface IntegrationMethod {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  timeToIntegrate: string;
  features: string[];
  useCases: string[];
  codeExample: {
    language: string;
    code: string;
  };
}

const integrationMethods: IntegrationMethod[] = [
  {
    id: 'checkout-js',
    icon: GlobeAltIcon,
    title: 'Checkout.js',
    description: 'Drop-in payment UI that handles the entire checkout experience. Perfect for quick implementation.',
    difficulty: 'Easy',
    timeToIntegrate: '5 minutes',
    features: [
      'Pre-built UI components',
      'Mobile-optimized design',
      'Built-in validation',
      'Automatic localization',
      'PCI compliant by default'
    ],
    useCases: [
      'E-commerce websites',
      'Quick MVP launches',
      'Non-technical teams',
      'Standard checkout flows'
    ],
    codeExample: {
      language: 'javascript',
      code: `// Initialize Sunny Checkout
const sunny = Sunny({
  apiKey: 'pk_test_your_api_key',
  locale: 'en-US'
});

// Create checkout session
const checkout = sunny.checkout({
  amount: 2999,
  currency: 'USD',
  successUrl: 'https://yoursite.com/success',
  cancelUrl: 'https://yoursite.com/cancel'
});

// Redirect to checkout
checkout.redirectToCheckout();`
    }
  },
  {
    id: 'payment-api',
    icon: CommandLineIcon,
    title: 'Payment API',
    description: 'Direct API integration for custom payment flows with full control over the user experience.',
    difficulty: 'Medium',
    timeToIntegrate: '1-2 days',
    features: [
      'Full API control',
      'Custom UI/UX',
      'Server-side processing',
      'Webhook notifications',
      'Advanced customization'
    ],
    useCases: [
      'Custom payment flows',
      'Enterprise applications',
      'Complex business logic',
      'Multi-step processes'
    ],
    codeExample: {
      language: 'javascript',
      code: `// Create payment with API
const payment = await fetch('/api/payments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_test_your_secret_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 2999,
    currency: 'USD',
    payment_method: {
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2025,
        cvc: '123'
      }
    },
    confirm: true
  })
});`
    }
  },
  {
    id: 'hosted-pages',
    icon: CloudIcon,
    title: 'Hosted Payment Pages',
    description: 'Fully hosted payment pages that you can customize and brand to match your business.',
    difficulty: 'Easy',
    timeToIntegrate: '10 minutes',
    features: [
      'No-code setup',
      'Custom branding',
      'SSL included',
      'Mobile responsive',
      'Multi-language support'
    ],
    useCases: [
      'Invoicing',
      'One-time payments',
      'Donation forms',
      'Service payments'
    ],
    codeExample: {
      language: 'html',
      code: `<!-- Simple payment link -->
<a href="https://pay.sunny.com/p/your_payment_page_id" 
   class="btn btn-primary">
  Pay Now
</a>

<!-- Or embed as iframe -->
<iframe 
  src="https://pay.sunny.com/p/your_payment_page_id"
  width="100%" 
  height="600"
  frameborder="0">
</iframe>`
    }
  },
  {
    id: 'mobile-sdks',
    icon: DevicePhoneMobileIcon,
    title: 'Mobile SDKs',
    description: 'Native iOS and Android SDKs for seamless in-app payment experiences.',
    difficulty: 'Medium',
    timeToIntegrate: '2-3 days',
    features: [
      'Native performance',
      'Apple/Google Pay',
      'Biometric authentication',
      'Offline capabilities',
      'Push notifications'
    ],
    useCases: [
      'Mobile apps',
      'In-app purchases',
      'Subscription apps',
      'Marketplace apps'
    ],
    codeExample: {
      language: 'swift',
      code: `// iOS Swift SDK
import SunnyPayments

let sunny = SunnyClient(apiKey: "pk_test_your_api_key")

let paymentRequest = PaymentRequest(
  amount: 2999,
  currency: "USD",
  paymentMethods: [.card, .applePay]
)

sunny.presentPayment(paymentRequest) { result in
  switch result {
  case .success(let payment):
    print("Payment successful: \\(payment.id)")
  case .failure(let error):
    print("Payment failed: \\(error)")
  }
}`
    }
  },
  {
    id: 'ecommerce-plugins',
    icon: PuzzlePieceIcon,
    title: 'E-commerce Plugins',
    description: 'Ready-made plugins for popular e-commerce platforms like Shopify, WooCommerce, and Magento.',
    difficulty: 'Easy',
    timeToIntegrate: '15 minutes',
    features: [
      'One-click installation',
      'Platform integration',
      'Order management',
      'Automatic tax calculation',
      'Inventory sync'
    ],
    useCases: [
      'Shopify stores',
      'WooCommerce sites',
      'Magento shops',
      'BigCommerce stores'
    ],
    codeExample: {
      language: 'php',
      code: `<?php
// WooCommerce Plugin Example
add_action('woocommerce_payment_gateways', 'add_sunny_gateway');

function add_sunny_gateway($methods) {
  $methods[] = 'WC_Sunny_Gateway';
  return $methods;
}

class WC_Sunny_Gateway extends WC_Payment_Gateway {
  public function __construct() {
    $this->id = 'sunny';
    $this->title = 'Sunny Payments';
    $this->description = 'Pay securely with Sunny';
    
    $this->init_form_fields();
    $this->init_settings();
  }
}`
    }
  },
  {
    id: 'no-code',
    icon: CodeBracketIcon,
    title: 'No-Code Solutions',
    description: 'Visual builders and integrations for no-code platforms like Webflow, Bubble, and Zapier.',
    difficulty: 'Easy',
    timeToIntegrate: '5 minutes',
    features: [
      'Drag-and-drop setup',
      'Visual configuration',
      'Pre-built templates',
      'Workflow automation',
      'Real-time sync'
    ],
    useCases: [
      'Landing pages',
      'Marketing sites',
      'Form payments',
      'Event tickets'
    ],
    codeExample: {
      language: 'json',
      code: `{
  "trigger": "form_submission",
  "actions": [
    {
      "type": "sunny_payment",
      "config": {
        "amount": "{{form.amount}}",
        "currency": "USD",
        "description": "{{form.description}}",
        "customer_email": "{{form.email}}"
      }
    },
    {
      "type": "send_email",
      "template": "payment_confirmation"
    }
  ]
}`
    }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function IntegrationMethods() {
  const [selectedMethod, setSelectedMethod] = useState<string>(integrationMethods[0].id);
  const selectedMethodData = integrationMethods.find(method => method.id === selectedMethod)!;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Integration Methods
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the integration method that best fits your technical requirements and timeline. 
            From no-code solutions to advanced APIs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Method Selection */}
          <motion.div 
            className="lg:col-span-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-3">
              {integrationMethods.map((method) => (
                <motion.button
                  key={method.id}
                  variants={itemVariants}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    selectedMethod === method.id
                      ? 'bg-white shadow-lg border-2 border-green-500'
                      : 'bg-white hover:shadow-md border-2 border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedMethod === method.id ? 'bg-green-600' : 'bg-gray-100'
                    }`}>
                      <method.icon className={`w-5 h-5 ${
                        selectedMethod === method.id ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        selectedMethod === method.id ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {method.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(method.difficulty)}`}>
                          {method.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">
                          {method.timeToIntegrate}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Method Details */}
          <motion.div 
            className="lg:col-span-2"
            key={selectedMethod}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {/* Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <selectedMethodData.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedMethodData.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedMethodData.description}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Difficulty</div>
                  <div className={`inline-block px-2 py-1 rounded text-sm font-medium ${getDifficultyColor(selectedMethodData.difficulty)}`}>
                    {selectedMethodData.difficulty}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Time to Integrate</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {selectedMethodData.timeToIntegrate}
                  </div>
                </div>
              </div>

              {/* Features and Use Cases */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedMethodData.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Best For</h4>
                  <ul className="space-y-2">
                    {selectedMethodData.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Code Example */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Code Example</h4>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300">
                    <code className={`language-${selectedMethodData.codeExample.language}`}>
                      {selectedMethodData.codeExample.code}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
                  Get Started with {selectedMethodData.title}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



