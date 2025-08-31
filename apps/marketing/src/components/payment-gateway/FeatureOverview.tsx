'use client';

import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon, 
  BoltIcon,
  ChartBarIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

interface FeatureItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  stats?: string;
  benefits: string[];
}

const features: FeatureItem[] = [
  {
    icon: GlobeAltIcon,
    title: "Global Payment Processing",
    description: "Accept payments from customers in 190+ countries with local payment methods and currencies.",
    stats: "190+ Countries",
    benefits: [
      "135+ currencies supported",
      "Local payment methods",
      "Real-time currency conversion",
      "Regional compliance built-in"
    ]
  },
  {
    icon: BoltIcon,
    title: "Instant Settlement",
    description: "Get paid in minutes, not days. Our instant settlement technology accelerates your cash flow.",
    stats: "< 60 Seconds",
    benefits: [
      "Sub-minute settlement times",
      "24/7 processing availability",
      "Weekend and holiday support",
      "Multi-bank settlement"
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: "Enterprise-Grade Security",
    description: "PCI DSS Level 1 certified with advanced fraud detection and prevention.",
    stats: "99.9% Fraud Prevention",
    benefits: [
      "Machine learning fraud detection",
      "3D Secure authentication",
      "End-to-end encryption",
      "Behavioral biometrics"
    ]
  },
  {
    icon: CurrencyDollarIcon,
    title: "Transparent Pricing",
    description: "Simple, competitive pricing with no hidden fees. Pay only for what you use.",
    stats: "2.9% + $0.30",
    benefits: [
      "No setup or monthly fees",
      "Volume-based discounts",
      "Free currency conversion",
      "Transparent fee structure"
    ]
  },
  {
    icon: CodeBracketIcon,
    title: "Developer-Friendly APIs",
    description: "Well-documented RESTful APIs with comprehensive SDKs for all major platforms.",
    stats: "5-Min Integration",
    benefits: [
      "RESTful and GraphQL APIs",
      "Comprehensive documentation",
      "SDKs for all platforms",
      "Webhook support"
    ]
  },
  {
    icon: ChartBarIcon,
    title: "Advanced Analytics",
    description: "Real-time insights and reporting to help you optimize your payment performance.",
    stats: "Real-Time Data",
    benefits: [
      "Transaction analytics",
      "Revenue optimization",
      "Customer insights",
      "Custom reporting"
    ]
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

export default function FeatureOverview() {
  return (
    <section className="py-24 bg-white">
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
            Core Payment Processing Capabilities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to accept, process, and manage payments globally. 
            Built for businesses of all sizes with enterprise-grade reliability.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-gray-50 rounded-2xl p-8 h-full hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200">
                {/* Icon and Stats */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center group-hover:bg-green-700 transition-colors duration-300">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  {feature.stats && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {feature.stats}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust Sunny for their payment processing needs. 
              Start accepting payments in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Start Free Trial
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-green-600 hover:text-green-600 transition-colors duration-200">
                View Documentation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
