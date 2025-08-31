'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ShieldCheckIcon,
  CpuChipIcon,
  EyeIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  BoltIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  LockClosedIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

interface FraudMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

interface AIModel {
  id: string;
  name: string;
  type: 'neural_network' | 'machine_learning' | 'behavioral' | 'pattern';
  accuracy: number;
  speed: string;
  status: 'active' | 'training' | 'testing';
  description: string;
  features: string[];
}

interface ThreatType {
  icon: any;
  name: string;
  description: string;
  detectionRate: number;
  commonSources: string[];
  preventionMethods: string[];
}

const fraudMetrics: FraudMetric[] = [
  {
    label: 'Detection Accuracy',
    value: '99.97%',
    change: '+0.03%',
    trend: 'up',
    description: 'ML model accuracy'
  },
  {
    label: 'False Positives',
    value: '0.08%',
    change: '-0.02%',
    trend: 'down',
    description: 'Legitimate flagged'
  },
  {
    label: 'Response Time',
    value: '<50ms',
    change: '-5ms',
    trend: 'down',
    description: 'Real-time analysis'
  },
  {
    label: 'Blocked Attempts',
    value: '2.4M',
    change: '+12%',
    trend: 'up',
    description: 'Monthly prevention'
  }
];

const aiModels: AIModel[] = [
  {
    id: 'neural-fraud',
    name: 'Neural Fraud Detector',
    type: 'neural_network',
    accuracy: 99.97,
    speed: '<20ms',
    status: 'active',
    description: 'Deep learning model for real-time transaction fraud detection',
    features: [
      'Multi-layer neural networks',
      'Pattern recognition',
      'Anomaly detection',
      'Real-time scoring',
      'Adaptive learning'
    ]
  },
  {
    id: 'behavioral-ai',
    name: 'Behavioral Analysis AI',
    type: 'behavioral',
    accuracy: 98.5,
    speed: '<30ms',
    status: 'active',
    description: 'Behavioral biometrics and user pattern analysis',
    features: [
      'Keystroke dynamics',
      'Mouse movements',
      'Session patterns',
      'Device fingerprinting',
      'Geolocation analysis'
    ]
  },
  {
    id: 'pattern-ml',
    name: 'Pattern Recognition ML',
    type: 'machine_learning',
    accuracy: 97.8,
    speed: '<15ms',
    status: 'active',
    description: 'Machine learning for transaction pattern analysis',
    features: [
      'Ensemble methods',
      'Feature engineering',
      'Time series analysis',
      'Risk clustering',
      'Predictive modeling'
    ]
  },
  {
    id: 'risk-engine',
    name: 'Risk Scoring Engine',
    type: 'pattern',
    accuracy: 96.2,
    speed: '<10ms',
    status: 'training',
    description: 'Advanced risk assessment and scoring algorithms',
    features: [
      'Multi-factor scoring',
      'Historical analysis',
      'Network effects',
      'Velocity checks',
      'Rule-based logic'
    ]
  }
];

const threatTypes: ThreatType[] = [
  {
    icon: CpuChipIcon,
    name: 'Automated Attacks',
    description: 'Bot-driven fraud attempts and automated systems',
    detectionRate: 99.8,
    commonSources: ['Botnets', 'Scrapers', 'Automated tools', 'Card testing'],
    preventionMethods: ['CAPTCHA integration', 'Rate limiting', 'Device fingerprinting', 'Behavioral analysis']
  },
  {
    icon: UserIcon,
    name: 'Account Takeover',
    description: 'Unauthorized access to legitimate user accounts',
    detectionRate: 98.5,
    commonSources: ['Credential stuffing', 'Social engineering', 'Data breaches', 'Phishing'],
    preventionMethods: ['Multi-factor auth', 'Login monitoring', 'Device trust', 'Behavioral checks']
  },
  {
    icon: DevicePhoneMobileIcon,
    name: 'Mobile Fraud',
    description: 'Fraud originating from mobile devices and apps',
    detectionRate: 97.2,
    commonSources: ['Malicious apps', 'SIM swapping', 'Mobile malware', 'App cloning'],
    preventionMethods: ['App attestation', 'Device binding', 'Biometric auth', 'Jailbreak detection']
  },
  {
    icon: GlobeAltIcon,
    name: 'Cross-border Fraud',
    description: 'International fraud schemes and money laundering',
    detectionRate: 96.8,
    commonSources: ['Shell companies', 'Proxy services', 'Money mules', 'Crypto laundering'],
    preventionMethods: ['KYC verification', 'Sanctions screening', 'Velocity limits', 'Geographic rules']
  }
];

const riskFactors = [
  { factor: 'Transaction velocity', weight: 25, status: 'high' },
  { factor: 'Device reputation', weight: 20, status: 'medium' },
  { factor: 'Behavioral patterns', weight: 18, status: 'low' },
  { factor: 'Geographic location', weight: 15, status: 'medium' },
  { factor: 'Network analysis', weight: 12, status: 'low' },
  { factor: 'Historical data', weight: 10, status: 'low' }
];

export default function AIFraudDetectionSection() {
  const [selectedModel, setSelectedModel] = useState<string>('neural-fraud');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');
  const [simulationActive, setSimulationActive] = useState(false);

  const currentModel = aiModels.find(m => m.id === selectedModel) || aiModels[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'training': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'testing': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getModelTypeIcon = (type: string) => {
    switch (type) {
      case 'neural_network': return CpuChipIcon;
      case 'machine_learning': return ChartBarIcon;
      case 'behavioral': return UserIcon;
      case 'pattern': return EyeIcon;
      default: return ShieldCheckIcon;
    }
  };

  const getRiskColor = (status: string) => {
    switch (status) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
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
          <div className="inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400 text-sm font-medium mb-4">
            <ShieldCheckIcon className="w-4 h-4 mr-2" />
            AI Fraud Detection
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Military-Grade Fraud Protection
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Advanced AI and machine learning models protect your transactions with 99.97% accuracy. 
            Real-time behavioral analysis and neural networks stop fraud before it happens.
          </p>
        </motion.div>

        {/* Fraud Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {fraudMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-center mb-3">
                <div className={`text-3xl font-bold ${
                  metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                  metric.trend === 'down' ? 'text-blue-600 dark:text-blue-400' :
                  'text-gray-900 dark:text-white'
                }`}>
                  {metric.value}
                </div>
                <div className="ml-2">
                  {metric.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                  ) : metric.trend === 'down' ? (
                    <ArrowTrendingDownIcon className="w-4 h-4 text-blue-500" />
                  ) : null}
                </div>
              </div>
              <div className="font-medium text-gray-900 dark:text-white mb-1">
                {metric.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {metric.description}
              </div>
              <div className={`text-xs font-medium ${
                metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                metric.trend === 'down' ? 'text-blue-600 dark:text-blue-400' :
                'text-gray-600 dark:text-gray-400'
              }`}>
                {metric.change}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Models Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 mb-20 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Model Orchestration
            </h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSimulationActive(!simulationActive)}
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  simulationActive 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                <PlayIcon className="w-4 h-4 mr-2" />
                {simulationActive ? 'Stop Simulation' : 'Start Simulation'}
              </button>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${simulationActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {simulationActive ? 'Live Processing' : 'Standby'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Model Selector */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Select AI Model</h4>
              {aiModels.map((model) => {
                const ModelIcon = getModelTypeIcon(model.type);
                return (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedModel === model.id
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <ModelIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                          {model.name}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {model.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className={`px-2 py-1 rounded ${getStatusColor(model.status)}`}>
                            {model.status}
                          </span>
                          <span className="text-red-600 dark:text-red-400 font-medium">
                            {model.accuracy}% accuracy
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Model Details */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentModel.name}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentModel.status)}`}>
                    {currentModel.status}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {currentModel.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Accuracy</h5>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {currentModel.accuracy}%
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                      <motion.div
                        className="h-2 rounded-full bg-red-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${currentModel.accuracy}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Response Time</h5>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {currentModel.speed}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Real-time analysis
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">Core Features</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentModel.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Threat Detection Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Threat Detection
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our AI systems detect and prevent various types of fraud with industry-leading accuracy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {threatTypes.map((threat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <threat.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {threat.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {threat.description}
                    </p>
                    
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Detection Rate</span>
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          {threat.detectionRate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full bg-red-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${threat.detectionRate}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Common Sources</h5>
                    <div className="space-y-1">
                      {threat.commonSources.map((source, sourceIndex) => (
                        <div key={sourceIndex} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                          <ExclamationTriangleIcon className="w-3 h-3 text-red-500 mr-1 flex-shrink-0" />
                          {source}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Prevention Methods</h5>
                    <div className="space-y-1">
                      {threat.preventionMethods.map((method, methodIndex) => (
                        <div key={methodIndex} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                          <CheckCircleIcon className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                          {method}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Risk Assessment Engine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Real-time Risk Assessment
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Multi-factor risk scoring engine analyzes transactions in real-time using weighted risk factors
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Risk Factor Analysis</h4>
              <div className="space-y-4">
                {riskFactors.map((factor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{factor.factor}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {factor.weight}%
                        </span>
                        <div className={`w-3 h-3 rounded-full ${getRiskColor(factor.status)}`} />
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${getRiskColor(factor.status)}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${factor.weight}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Detection Capabilities</h4>
              <div className="space-y-4">
                {[
                  { capability: 'Real-time Analysis', score: '99.97%', icon: BoltIcon },
                  { capability: 'Behavioral Tracking', score: '98.5%', icon: UserIcon },
                  { capability: 'Device Fingerprinting', score: '99.1%', icon: DevicePhoneMobileIcon },
                  { capability: 'Network Analysis', score: '96.8%', icon: GlobeAltIcon },
                  { capability: 'Pattern Recognition', score: '97.9%', icon: EyeIcon },
                  { capability: 'Encryption Security', score: '100%', icon: LockClosedIcon }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-red-500" />
                      <span className="font-medium text-gray-900 dark:text-white">{item.capability}</span>
                    </div>
                    <span className="font-semibold text-red-600 dark:text-red-400">{item.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

