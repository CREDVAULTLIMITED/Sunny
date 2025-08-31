'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ShieldCheckIcon,
  DocumentCheckIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  ClockIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  BellAlertIcon,
  UserIcon,
  FingerPrintIcon,
  KeyIcon
} from '@heroicons/react/24/outline';

export function ComplianceSecurity() {
  const [activeCompliance, setActiveCompliance] = useState('pci');

  // Static color mapping to avoid dynamic Tailwind classes
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      purple: 'text-purple-600 dark:text-purple-400',
      indigo: 'text-indigo-600 dark:text-indigo-400',
      orange: 'text-orange-600 dark:text-orange-400',
      emerald: 'text-emerald-600 dark:text-emerald-400',
      red: 'text-red-600 dark:text-red-400',
      amber: 'text-amber-600 dark:text-amber-400'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-blue-600 dark:text-blue-400';
  };

  const getBgClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 dark:bg-blue-900/40',
      green: 'bg-green-100 dark:bg-green-900/40',
      purple: 'bg-purple-100 dark:bg-purple-900/40',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/40',
      orange: 'bg-orange-100 dark:bg-orange-900/40',
      emerald: 'bg-emerald-100 dark:bg-emerald-900/40',
      red: 'bg-red-100 dark:bg-red-900/40',
      amber: 'bg-amber-100 dark:bg-amber-900/40'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-blue-100 dark:bg-blue-900/40';
  };

  const complianceStandards = [
    {
      id: 'pci',
      title: 'PCI DSS Level 1',
      icon: ShieldCheckIcon,
      color: 'green',
      status: 'Certified',
      description: 'Highest level of PCI compliance for handling credit card data'
    },
    {
      id: 'sox',
      title: 'SOX Compliance',
      icon: DocumentCheckIcon,
      color: 'blue',
      status: 'Ready',
      description: 'Sarbanes-Oxley compliance for public companies'
    },
    {
      id: 'gdpr',
      title: 'GDPR Compliant',
      icon: LockClosedIcon,
      color: 'purple',
      status: 'Certified',
      description: 'European data protection regulation compliance'
    },
    {
      id: 'basel',
      title: 'Basel III',
      icon: ExclamationTriangleIcon,
      color: 'amber',
      status: 'Aligned',
      description: 'International banking regulatory framework alignment'
    }
  ];

  const securityFeatures = [
    {
      icon: LockClosedIcon,
      color: 'blue',
      title: 'End-to-End Encryption',
      description: 'AES-256 encryption for all data in transit and at rest',
      features: [
        'AES-256-GCM encryption',
        'Perfect forward secrecy',
        'Hardware security modules',
        'Key rotation automation'
      ]
    },
    {
      icon: FingerPrintIcon,
      color: 'green',
      title: 'Biometric Authentication',
      description: 'Advanced biometric verification for secure access',
      features: [
        'Fingerprint verification',
        'Facial recognition',
        'Voice authentication',
        'Behavioral biometrics'
      ]
    },
    {
      icon: EyeIcon,
      color: 'purple',
      title: 'Real-time Monitoring',
      description: '24/7 monitoring with AI-powered threat detection',
      features: [
        'Real-time transaction monitoring',
        'Anomaly detection',
        'Threat intelligence',
        'Automated incident response'
      ]
    },
    {
      icon: BellAlertIcon,
      color: 'red',
      title: 'Fraud Prevention',
      description: 'Advanced fraud detection with machine learning',
      features: [
        'ML-powered fraud detection',
        'Risk scoring algorithms',
        'Behavioral analysis',
        'Real-time blocking'
      ]
    }
  ];

  const amlKycFeatures = [
    {
      icon: UserIcon,
      color: 'blue',
      title: 'Identity Verification',
      description: 'Comprehensive identity verification and validation',
      capabilities: [
        'Document verification',
        'Biometric matching',
        'Liveness detection',
        'Global database checks'
      ]
    },
    {
      icon: DocumentCheckIcon,
      color: 'green',
      title: 'AML Screening',
      description: 'Automated anti-money laundering compliance',
      capabilities: [
        'Sanctions list screening',
        'PEP identification',
        'Adverse media monitoring',
        'Risk categorization'
      ]
    },
    {
      icon: ExclamationTriangleIcon,
      color: 'amber',
      title: 'Transaction Monitoring',
      description: 'Continuous monitoring for suspicious activities',
      capabilities: [
        'Pattern recognition',
        'Threshold monitoring',
        'Suspicious activity reports',
        'Case management'
      ]
    },
    {
      icon: ArrowPathIcon,
      color: 'purple',
      title: 'Ongoing Monitoring',
      description: 'Continuous customer and transaction monitoring',
      capabilities: [
        'Customer lifecycle monitoring',
        'Periodic reviews',
        'Risk reassessment',
        'Automated alerts'
      ]
    }
  ];

  const complianceDetails = {
    pci: {
      title: 'PCI DSS Level 1 Certification',
      description: 'The highest level of Payment Card Industry compliance, ensuring secure handling of credit card information.',
      requirements: [
        'Secure network architecture',
        'Encrypted cardholder data',
        'Vulnerability management',
        'Strong access controls',
        'Regular monitoring and testing',
        'Information security policy'
      ],
      benefits: [
        'Reduced liability',
        'Enhanced customer trust',
        'Global acceptance',
        'Regulatory compliance'
      ]
    },
    sox: {
      title: 'Sarbanes-Oxley Compliance',
      description: 'Financial reporting compliance for public companies with robust internal controls.',
      requirements: [
        'Internal control documentation',
        'Management assessment',
        'Auditor attestation',
        'Financial reporting accuracy',
        'Change management controls',
        'Segregation of duties'
      ],
      benefits: [
        'Investor confidence',
        'Regulatory compliance',
        'Operational efficiency',
        'Risk mitigation'
      ]
    },
    gdpr: {
      title: 'GDPR Data Protection',
      description: 'European Union data protection regulation compliance for customer privacy.',
      requirements: [
        'Data protection by design',
        'Consent management',
        'Data portability',
        'Right to be forgotten',
        'Privacy impact assessments',
        'Data breach notifications'
      ],
      benefits: [
        'Customer trust',
        'EU market access',
        'Privacy protection',
        'Brand reputation'
      ]
    },
    basel: {
      title: 'Basel III Framework',
      description: 'International banking regulatory framework for capital adequacy and risk management.',
      requirements: [
        'Capital adequacy ratios',
        'Liquidity requirements',
        'Risk management',
        'Leverage ratio limits',
        'Stress testing',
        'Operational risk controls'
      ],
      benefits: [
        'Financial stability',
        'Risk mitigation',
        'Regulatory alignment',
        'International standards'
      ]
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">
              Compliance & Security
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Enterprise-Grade{' '}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Compliance
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Meet the highest standards of financial regulation compliance with built-in 
              security, monitoring, and reporting capabilities.
            </p>
          </div>

          {/* Compliance Standards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {complianceStandards.map((standard) => {
              const StandardIconComponent = standard.icon;
              const isActive = activeCompliance === standard.id;
              
              return (
                <button
                  key={standard.id}
                  onClick={() => setActiveCompliance(standard.id)}
                  className={`p-6 rounded-xl transition-all text-left ${
                    isActive
                      ? 'bg-white dark:bg-gray-900 shadow-lg border-2 border-blue-200 dark:border-blue-700'
                      : 'bg-white dark:bg-gray-900 hover:shadow-md border-2 border-transparent'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${getBgClasses(standard.color)}`}>
                        <StandardIconComponent className={`w-6 h-6 ${getColorClasses(standard.color)}`} />
                      </div>
                      <Badge className={`${getBgClasses(standard.color)} ${getColorClasses(standard.color)} border-0`}>
                        {standard.status}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {standard.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {standard.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Compliance Details */}
          <div className="mb-20">
            {(() => {
              const activeDetails = complianceDetails[activeCompliance as keyof typeof complianceDetails];
              
              return (
                <Card className="p-8 bg-white dark:bg-gray-900">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          {activeDetails.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          {activeDetails.description}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                          Key Requirements
                        </h4>
                        <div className="space-y-2">
                          {activeDetails.requirements.map((requirement, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                          Business Benefits
                        </h4>
                        <div className="space-y-2">
                          {activeDetails.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <CheckCircleIcon className="w-6 h-6 text-green-500" />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Compliance Status: Active
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Your Sunny account is fully compliant with this standard. 
                          All transactions are automatically processed according to regulatory requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })()}
          </div>

          {/* Security Features */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Advanced Security Features
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Multi-layered security approach with enterprise-grade protection
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {securityFeatures.map((feature, index) => {
                const FeatureIconComponent = feature.icon;
                
                return (
                  <Card key={index} className="p-8 bg-white dark:bg-gray-900 hover:shadow-lg transition-all">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${getBgClasses(feature.color)}`}>
                          <FeatureIconComponent className={`w-6 h-6 ${getColorClasses(feature.color)}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {feature.features.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* AML/KYC Features */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                AML/KYC Automation
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Automated compliance with anti-money laundering and know-your-customer regulations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {amlKycFeatures.map((feature, index) => {
                const FeatureIconComponent = feature.icon;
                
                return (
                  <Card key={index} className="p-8 bg-white dark:bg-gray-900 hover:shadow-lg transition-all">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${getBgClasses(feature.color)}`}>
                          <FeatureIconComponent className={`w-6 h-6 ${getColorClasses(feature.color)}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {feature.capabilities.map((capability, capIndex) => (
                          <div key={capIndex} className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Compliance Dashboard Preview */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Real-time Compliance Dashboard
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Monitor compliance status and generate regulatory reports
              </p>
            </div>

            <Card className="p-8 bg-gray-900 text-white">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold">Compliance Overview</h4>
                  <Badge className="bg-green-600 text-white">All Systems Compliant</Badge>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircleIcon className="w-6 h-6 text-green-400" />
                      <span className="font-medium">PCI DSS</span>
                    </div>
                    <div className="text-2xl font-bold text-green-400">100%</div>
                    <div className="text-sm text-gray-400">Compliant</div>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircleIcon className="w-6 h-6 text-blue-400" />
                      <span className="font-medium">AML/KYC</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-400">98.7%</div>
                    <div className="text-sm text-gray-400">Pass Rate</div>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <ClockIcon className="w-6 h-6 text-purple-400" />
                      <span className="font-medium">Response Time</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-400">1.2s</div>
                    <div className="text-sm text-gray-400">Average</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="p-12 bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <div className="space-y-8">
                <div>
                  <ShieldCheckIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Enterprise Compliance Made Simple
                  </h3>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    Get started with enterprise-grade compliance and security. 
                    Our team will help you navigate regulatory requirements.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                    Schedule Compliance Review
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-3">
                    Download Compliance Guide
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
