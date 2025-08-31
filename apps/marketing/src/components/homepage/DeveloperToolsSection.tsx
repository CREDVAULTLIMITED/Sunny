'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CommandLineIcon,
  CodeBracketIcon,
  CogIcon,
  ShieldCheckIcon,
  CircleStackIcon,
  PlayIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { languages } from '@/components/icons/LanguageIcons';

interface DeveloperTool {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge?: string;
  features: string[];
  codeExample?: string;
  ctaText: string;
  ctaHref: string;
}

const developerTools: DeveloperTool[] = [
  {
    icon: CommandLineIcon,
    title: 'Sunny CLI',
    description: 'Python-based command-line interface with integrated AI chat assistant for rapid development.',
    badge: 'AI Powered',
    features: [
      'Interactive AI chat assistant',
      'Payment testing utilities',
      'Code generation helpers',
      'Real-time debugging'
    ],
    codeExample: `# Install Sunny CLI
pip install sunny-cli

# Start AI-powered development session
sunny chat --mode=dev

# Test payments interactively
sunny payment test --method=card --amount=100`,
    ctaText: 'Install CLI',
    ctaHref: '/cli'
  },
  {
    icon: CogIcon,
    title: 'Go API Gateway',
    description: 'High-performance, scalable API gateway built in Go for enterprise-grade applications.',
    badge: 'Enterprise',
    features: [
      'Sub-millisecond response times',
      'Auto-scaling capabilities',
      'Built-in rate limiting',
      'Advanced monitoring'
    ],
    codeExample: `// Go API Gateway Configuration
gateway := sunny.NewGateway(&sunny.Config{
    Port: 8080,
    RateLimit: 1000,
    Monitoring: true,
    AutoScale: true,
})

gateway.Start()`,
    ctaText: 'View Documentation',
    ctaHref: '/enterprise/api-gateway'
  },
  {
    icon: PlayIcon,
    title: 'API Playground',
    description: 'Interactive testing environment with real-time API exploration and code generation.',
    badge: 'Interactive',
    features: [
      'Live API testing',
      'Auto-generated code samples',
      'Response visualization',
      'Authentication helpers'
    ],
    codeExample: `// Auto-generated from Playground
const payment = await sunny.payments.create({
  amount: 1000,
  currency: 'USD',
  paymentMethod: 'card',
  customer: {
    name: 'John Doe',
    email: 'john@example.com'
  }
});`,
    ctaText: 'Try Playground',
    ctaHref: '/tools/playground'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Security Monitor',
    description: 'Real-time security monitoring with automated threat detection and compliance checking.',
    badge: 'Security',
    features: [
      'Real-time threat detection',
      'Compliance monitoring',
      'Automated vulnerability scans',
      'Security event logging'
    ],
    codeExample: `// Security monitoring setup
sunny security monitor \\
  --compliance=pci-dss,gdpr \\
  --alerts=real-time \\
  --scan-frequency=hourly`,
    ctaText: 'Security Tools',
    ctaHref: '/tools/security'
  },
  {
    icon: CircleStackIcon,
    title: 'Database Tools',
    description: 'Advanced database management with migration utilities and performance optimization.',
    badge: 'Database',
    features: [
      'Schema migration tools',
      'Connection pool optimization',
      'Performance analytics',
      'Backup automation'
    ],
    codeExample: `// Database migration
sunny db migrate --version=latest
sunny db optimize --connections=pool
sunny db backup --schedule=daily`,
    ctaText: 'Database Tools',
    ctaHref: '/tools/database'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'AI Chat Assistant',
    description: 'Integrated AI assistant for code generation, debugging, and development guidance.',
    badge: 'AI Enhanced',
    features: [
      'Code generation assistance',
      'Smart debugging help',
      'Integration guidance',
      'Best practices recommendations'
    ],
    codeExample: `# Chat with AI assistant
$ sunny chat
🤖 How can I help you today?

👤 Generate a payment form component
🤖 I'll create a React payment form with validation...`,
    ctaText: 'Start Chatting',
    ctaHref: '/cli#ai-chat'
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function DeveloperToolsSection() {
  return (
    <section id="developer-tools" className="py-20 lg:py-32 bg-gradient-to-b from-emerald-50/30 via-green-50/50 to-blue-50/30 dark:bg-gradient-to-b dark:from-gray-900 dark:via-emerald-900/10 dark:to-gray-800">
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <Badge variant="secondary" className="mb-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
            Developer Tools
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Built for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
              Developers
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive developer tools including AI assistants, CLI utilities, and enterprise-grade infrastructure 
            to accelerate your payment integration.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {developerTools.map((tool, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/20 transition-all duration-300 border-gray-200/50 dark:border-gray-700 group hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-white dark:hover:bg-gray-800 hover:-translate-y-1 overflow-hidden">
                
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
                      <tool.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {tool.title}
                        </h3>
                        {tool.badge && (
                          <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400">
                            {tool.badge}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 mb-4">
                    {tool.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Example */}
                {tool.codeExample && (
                  <div className="px-6 pb-4">
                    <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-xs text-green-400 font-mono leading-relaxed">
                        {tool.codeExample}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="p-6 pt-4 mt-auto">
                  <Link 
                    href={tool.ctaHref}
                    className="inline-flex items-center w-full justify-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200 group/link"
                  >
                    {tool.ctaText}
                    <ArrowRightIcon className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* SDK Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 text-center"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-emerald-600 dark:text-emerald-400">{languages.length}+</span> Language SDKs Available
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Choose your preferred programming language and start building with Sunny
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
            {languages.map((language, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`group relative bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 cursor-pointer overflow-hidden ${
                  language.popular ? 'ring-2 ring-emerald-200 dark:ring-emerald-800' : ''
                }`}
              >
                {/* Popular Badge */}
                {language.popular && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                      Popular
                    </Badge>
                  </div>
                )}
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${language.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <language.icon className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                      {language.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {language.description}
                    </div>
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-emerald-100 via-green-100 to-blue-100 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 animate-pulse" />
            </div>
            
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Get Started in Minutes
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Choose your preferred programming language and start integrating with comprehensive 
                documentation, code examples, and interactive tutorials.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{languages.length}+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">5min</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Setup Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">99.9%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">API Uptime</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/docs/quickstart"
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Quick Start Guide
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href="/docs/sdks"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105"
                >
                  Browse All SDKs
                  <CodeBracketIcon className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
