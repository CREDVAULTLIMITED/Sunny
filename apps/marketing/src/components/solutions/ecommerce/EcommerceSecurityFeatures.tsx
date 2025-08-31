'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheckIcon,
  LockClosedIcon,
  EyeIcon,
  DocumentTextIcon,
  BellAlertIcon,
  CpuChipIcon,
  GlobeAltIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export function EcommerceSecurityFeatures() {
  const securityFeatures = [
    {
      icon: ShieldCheckIcon,
      title: 'PCI DSS Level 1 Compliance',
      description: 'Highest level of payment card industry security compliance',
      details: [
        'Annual security audits by certified assessors',
        'Quarterly network vulnerability scans',
        'Regular penetration testing',
        'Continuous compliance monitoring'
      ],
      certification: 'Level 1 Certified',
      impact: '99.9% security assurance'
    },
    {
      icon: CpuChipIcon,
      title: 'AI-Powered Fraud Detection',
      description: 'Machine learning algorithms analyze transactions in real-time',
      details: [
        'Behavioral pattern analysis',
        'Device fingerprinting',
        'Velocity checking',
        'Risk scoring algorithms'
      ],
      certification: 'ML-Based',
      impact: '99.8% fraud detection rate'
    },
    {
      icon: LockClosedIcon,
      title: 'End-to-End Encryption',
      description: 'Military-grade encryption protects sensitive data throughout the entire payment flow',
      details: [
        'AES-256 encryption at rest',
        'TLS 1.3 for data in transit',
        'Hardware security modules (HSM)',
        'Key rotation and management'
      ],
      certification: 'AES-256',
      impact: 'Bank-level security'
    },
    {
      icon: EyeIcon,
      title: '3D Secure Authentication',
      description: 'Additional security layer for card payments with liability shift',
      details: [
        'Strong Customer Authentication (SCA)',
        'Biometric authentication support',
        'Risk-based authentication',
        'Frictionless flow optimization'
      ],
      certification: '3DS 2.0',
      impact: '90% fraud reduction'
    },
    {
      icon: DocumentTextIcon,
      title: 'Comprehensive Audit Trails',
      description: 'Complete transaction logging and audit trail for compliance',
      details: [
        'Immutable transaction logs',
        'Real-time monitoring',
        'Compliance reporting',
        'Data retention policies'
      ],
      certification: 'SOX Compliant',
      impact: '100% transaction visibility'
    },
    {
      icon: BellAlertIcon,
      title: 'Real-Time Monitoring',
      description: 'Continuous monitoring with instant alerts for suspicious activity',
      details: [
        '24/7 security operations center',
        'Automated threat detection',
        'Instant alert notifications',
        'Incident response procedures'
      ],
      certification: '24/7 SOC',
      impact: '<1 minute response time'
    }
  ];

  const complianceStandards = [
    { name: 'PCI DSS', level: 'Level 1', description: 'Payment Card Industry Data Security Standard' },
    { name: 'SOC 2', type: 'Type II', description: 'Service Organization Control 2' },
    { name: 'ISO 27001', status: 'Certified', description: 'Information Security Management' },
    { name: 'GDPR', status: 'Compliant', description: 'General Data Protection Regulation' },
    { name: 'CCPA', status: 'Compliant', description: 'California Consumer Privacy Act' },
    { name: 'SOX', status: 'Compliant', description: 'Sarbanes-Oxley Act' }
  ];

  const securityStats = [
    { metric: '99.9%', label: 'Security Uptime', icon: ShieldCheckIcon },
    { metric: '99.8%', label: 'Fraud Detection Rate', icon: CpuChipIcon },
    { metric: '<1min', label: 'Threat Response Time', icon: BellAlertIcon },
    { metric: '256-bit', label: 'Encryption Strength', icon: LockClosedIcon }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
              <ShieldCheckIcon className="w-4 h-4 mr-1" />
              Enterprise Security
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Bank-Grade Security
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                Built for E-commerce
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Protect your business and customers with military-grade security, AI-powered fraud detection, 
              and comprehensive compliance certifications. Security isn't just a feature—it's our foundation.
            </p>
          </div>

          {/* Security Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {securityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg mb-3">
                  <stat.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.metric}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-lg">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                      <feature.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {feature.certification}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Security Measures:</div>
                  <div className="space-y-1">
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Impact:</span>
                    <Badge variant="outline" className="text-xs font-medium text-green-700 dark:text-green-300">
                      {feature.impact}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Compliance Standards */}
        <Card className="p-8 bg-white dark:bg-gray-800 mb-16">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Compliance & Certifications
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We maintain the highest industry standards and certifications to ensure your business 
                stays compliant across all jurisdictions and regulations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceStandards.map((standard, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{standard.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {standard.level || standard.type || standard.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{standard.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Security Trust Center */}
        <Card className="p-8 bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Security Trust Center</h3>
              <p className="text-red-100 max-w-2xl mx-auto">
                Access our comprehensive security documentation, compliance reports, 
                and real-time security status. Transparency is key to trust.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <DocumentTextIcon className="w-8 h-8 mx-auto text-red-200" />
                <h4 className="font-semibold">Security Reports</h4>
                <p className="text-sm text-red-200">Third-party audit reports and certifications</p>
              </div>
              <div className="text-center space-y-2">
                <BellAlertIcon className="w-8 h-8 mx-auto text-red-200" />
                <h4 className="font-semibold">Incident Response</h4>
                <p className="text-sm text-red-200">24/7 security monitoring and incident handling</p>
              </div>
              <div className="text-center space-y-2">
                <GlobeAltIcon className="w-8 h-8 mx-auto text-red-200" />
                <h4 className="font-semibold">Global Compliance</h4>
                <p className="text-sm text-red-200">Multi-jurisdiction regulatory compliance</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Visit Trust Center
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Download Security Whitepaper
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
