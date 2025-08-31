'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ShieldCheckIcon,
  LockClosedIcon,
  EyeSlashIcon,
  DocumentTextIcon,
  BugAntIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface SecurityFeature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  level: 'Standard' | 'Advanced' | 'Enterprise';
  details: string[];
}

interface ComplianceStandard {
  name: string;
  level: string;
  description: string;
  logo?: string;
}

const securityFeatures: SecurityFeature[] = [
  {
    icon: ShieldCheckIcon,
    title: 'PCI DSS Level 1 Compliance',
    description: 'Highest level of payment security certification, ensuring your data is protected.',
    level: 'Standard',
    details: [
      'Annual security assessments by qualified assessors',
      'Network segmentation and firewall protection',
      'Regular vulnerability scanning and penetration testing',
      'Strict access controls and authentication protocols'
    ]
  },
  {
    icon: LockClosedIcon,
    title: 'End-to-End Encryption',
    description: 'Advanced AES-256 encryption protects sensitive data at every step.',
    level: 'Standard',
    details: [
      'TLS 1.3 for data in transit',
      'AES-256 encryption for data at rest',
      'Hardware Security Module (HSM) key management',
      'Perfect Forward Secrecy implementation'
    ]
  },
  {
    icon: EyeSlashIcon,
    title: 'Data Tokenization',
    description: 'Replace sensitive card data with secure tokens to minimize exposure.',
    level: 'Standard',
    details: [
      'Format-preserving tokenization',
      'Irreversible token generation process',
      'Secure token vault management',
      'Seamless integration with existing systems'
    ]
  },
  {
    icon: BugAntIcon,
    title: 'Advanced Fraud Detection',
    description: 'AI-powered fraud prevention with real-time risk assessment.',
    level: 'Advanced',
    details: [
      'Machine learning algorithms analyze 300+ risk factors',
      'Real-time transaction scoring and blocking',
      'Behavioral biometrics and device fingerprinting',
      'Custom rule engine for business-specific policies'
    ]
  },
  {
    icon: UserGroupIcon,
    title: 'Multi-Factor Authentication',
    description: 'Secure access control with multiple authentication layers.',
    level: 'Standard',
    details: [
      'SMS, email, and authenticator app support',
      'Biometric authentication options',
      'Single Sign-On (SSO) integration',
      'Role-based access controls'
    ]
  },
  {
    icon: CheckBadgeIcon,
    title: '3D Secure 2.0',
    description: 'Enhanced customer authentication for reduced chargebacks.',
    level: 'Standard',
    details: [
      'Frictionless authentication for low-risk transactions',
      'Challenge flow for high-risk transactions',
      'Liability shift protection for merchants',
      'Optimized for mobile experiences'
    ]
  }
];

const complianceStandards: ComplianceStandard[] = [
  {
    name: 'PCI DSS Level 1',
    level: 'Highest',
    description: 'Most stringent level of PCI compliance for processing 6M+ transactions annually'
  },
  {
    name: 'SOC 2 Type II',
    level: 'Certified',
    description: 'Audited controls for security, availability, and confidentiality'
  },
  {
    name: 'ISO 27001',
    level: 'Certified',
    description: 'International standard for information security management systems'
  },
  {
    name: 'GDPR',
    level: 'Compliant',
    description: 'European data protection regulation compliance for customer privacy'
  },
  {
    name: 'CCPA',
    level: 'Compliant',
    description: 'California Consumer Privacy Act compliance for US customers'
  },
  {
    name: 'Open Banking',
    level: 'Certified',
    description: 'PSD2 and Open Banking standards for secure financial data access'
  }
];

export default function SecurityFeatures() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <ShieldCheckIcon className="w-4 h-4 mr-2" />
            Enterprise Security
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Bank-Grade Security
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Protect your business and customers with our comprehensive security infrastructure, 
            built to meet the highest industry standards and regulatory requirements.
          </p>
        </motion.div>

        {/* Security Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                selectedFeature === index ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}
              onClick={() => setSelectedFeature(selectedFeature === index ? null : index)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  feature.level === 'Standard' ? 'bg-green-100 dark:bg-green-900/30' :
                  feature.level === 'Advanced' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  'bg-purple-100 dark:bg-purple-900/30'
                }`}>
                  <feature.icon className={`w-6 h-6 ${
                    feature.level === 'Standard' ? 'text-green-600 dark:text-green-400' :
                    feature.level === 'Advanced' ? 'text-blue-600 dark:text-blue-400' :
                    'text-purple-600 dark:text-purple-400'
                  }`} />
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  feature.level === 'Standard' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  feature.level === 'Advanced' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                }`}>
                  {feature.level}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>

              {selectedFeature === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 dark:border-gray-700 pt-4"
                >
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                        <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Compliance Standards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Compliance & Certifications
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We maintain the highest industry certifications and regulatory compliance 
              to ensure your business meets all requirements across global markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {standard.name}
                  </h4>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium rounded-full">
                    {standard.level}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {standard.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-medium shadow-lg">
            <ShieldCheckIcon className="w-5 h-5 mr-2" />
            99.99% Uptime SLA with $1M+ Liability Protection
          </div>
        </motion.div>
      </div>
    </section>
  );
}



