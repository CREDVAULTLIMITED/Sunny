'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  PaintBrushIcon,
  SwatchIcon,
  AdjustmentsHorizontalIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  EyeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface ThemeOption {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  description: string;
}

interface LayoutOption {
  id: string;
  name: string;
  description: string;
  layout: 'single-page' | 'multi-step' | 'sidebar' | 'modal';
}

const themeOptions: ThemeOption[] = [
  {
    id: 'default',
    name: 'Sunny Default',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#10B981',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    description: 'Clean and professional default theme'
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    primaryColor: '#6366F1',
    secondaryColor: '#8B5CF6',
    accentColor: '#10B981',
    backgroundColor: '#1F2937',
    textColor: '#F9FAFB',
    description: 'Modern dark theme for premium brands'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    primaryColor: '#000000',
    secondaryColor: '#6B7280',
    accentColor: '#059669',
    backgroundColor: '#F9FAFB',
    textColor: '#111827',
    description: 'Ultra-clean minimal design'
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    primaryColor: '#EC4899',
    secondaryColor: '#F59E0B',
    accentColor: '#EF4444',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    description: 'Bold and energetic color scheme'
  }
];

const layoutOptions: LayoutOption[] = [
  {
    id: 'single-page',
    name: 'Single Page',
    description: 'All checkout fields on one page for quick conversion',
    layout: 'single-page'
  },
  {
    id: 'multi-step',
    name: 'Multi-Step',
    description: 'Guided checkout process with progress indicators',
    layout: 'multi-step'
  },
  {
    id: 'sidebar',
    name: 'Sidebar Layout',
    description: 'Order summary in sidebar, form in main area',
    layout: 'sidebar'
  },
  {
    id: 'modal',
    name: 'Modal Overlay',
    description: 'Popup checkout overlay for seamless UX',
    layout: 'modal'
  }
];

const customizationFeatures = [
  {
    icon: PaintBrushIcon,
    title: 'Brand Colors',
    description: 'Match your exact brand colors with hex, RGB, or HSL values',
    features: ['Primary & secondary colors', 'Accent colors', 'Background gradients', 'Custom CSS support']
  },
  {
    icon: SwatchIcon,
    title: 'Typography',
    description: 'Use your brand fonts and typography hierarchy',
    features: ['Custom font families', 'Font weights & sizes', 'Line height control', 'Letter spacing']
  },
  {
    icon: AdjustmentsHorizontalIcon,
    title: 'Layout Control',
    description: 'Customize spacing, borders, and component arrangement',
    features: ['Padding & margins', 'Border radius', 'Component spacing', 'Grid layouts']
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Responsive Design',
    description: 'Optimized for all devices with mobile-first approach',
    features: ['Mobile optimization', 'Tablet layouts', 'Desktop scaling', 'Touch-friendly buttons']
  }
];

export default function CustomizableUIShowcase() {
  const [selectedTheme, setSelectedTheme] = useState<string>('default');
  const [selectedLayout, setSelectedLayout] = useState<string>('single-page');
  const [selectedDevice, setSelectedDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const currentTheme = themeOptions.find(theme => theme.id === selectedTheme) || themeOptions[0];
  const currentLayout = layoutOptions.find(layout => layout.id === selectedLayout) || layoutOptions[0];

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
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <PaintBrushIcon className="w-4 h-4 mr-2" />
            Customizable UI
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Your Brand, Your Style
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Completely customize the checkout experience to match your brand. 
            From colors and fonts to layouts and components - make it uniquely yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Customization Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Theme Selection */}
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Color Themes
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {themeOptions.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedTheme === theme.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex gap-1">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: theme.primaryColor }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: theme.secondaryColor }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: theme.accentColor }}
                        />
                      </div>
                      {selectedTheme === theme.id && (
                        <CheckCircleIcon className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm text-left">
                      {theme.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-left">
                      {theme.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Selection */}
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Layout Options
              </h3>
              <div className="space-y-3">
                {layoutOptions.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedLayout(layout.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedLayout === layout.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {layout.name}
                      </h4>
                      {selectedLayout === layout.id && (
                        <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {layout.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Device Preview Toggle */}
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Device Preview
              </h3>
              <div className="flex gap-2">
                {[
                  { id: 'mobile' as const, icon: DevicePhoneMobileIcon, label: 'Mobile' },
                  { id: 'tablet' as const, icon: DeviceTabletIcon, label: 'Tablet' },
                  { id: 'desktop' as const, icon: ComputerDesktopIcon, label: 'Desktop' }
                ].map((device) => (
                  <button
                    key={device.id}
                    onClick={() => setSelectedDevice(device.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedDevice === device.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600'
                    }`}
                  >
                    <device.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{device.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-8"
          >
            <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Live Preview
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <EyeIcon className="w-4 h-4" />
                  <span>{currentLayout.name} • {selectedDevice}</span>
                </div>
              </div>

              {/* Preview Container */}
              <div className={`mx-auto transition-all duration-300 ${
                selectedDevice === 'mobile' ? 'max-w-sm' :
                selectedDevice === 'tablet' ? 'max-w-md' :
                'max-w-full'
              }`}>
                <div 
                  className="rounded-xl shadow-xl border-2 transition-all duration-300"
                  style={{ 
                    backgroundColor: currentTheme.backgroundColor,
                    borderColor: currentTheme.primaryColor + '20'
                  }}
                >
                  {/* Browser Bar (Desktop/Tablet only) */}
                  {selectedDevice !== 'mobile' && (
                    <div className="flex items-center gap-2 p-3 border-b">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                      <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded px-3 py-1 text-xs text-center">
                        yourstore.com/checkout
                      </div>
                    </div>
                  )}

                  {/* Checkout Preview */}
                  <div className="p-6 space-y-4">
                    {/* Brand Header */}
                    <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: currentTheme.primaryColor + '20' }}>
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: currentTheme.primaryColor }}
                      >
                        YB
                      </div>
                      <div>
                        <div className="font-semibold text-sm" style={{ color: currentTheme.textColor }}>
                          Your Brand
                        </div>
                        <div className="text-xs opacity-60" style={{ color: currentTheme.textColor }}>
                          Secure Checkout
                        </div>
                      </div>
                    </div>

                    {/* Form Elements */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium mb-1" style={{ color: currentTheme.textColor }}>
                          Email Address
                        </label>
                        <div 
                          className="w-full h-8 rounded border px-3 flex items-center text-xs"
                          style={{ 
                            borderColor: currentTheme.primaryColor + '40',
                            backgroundColor: currentTheme.backgroundColor
                          }}
                        >
                          <span style={{ color: currentTheme.textColor + '60' }}>
                            customer@example.com
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium mb-1" style={{ color: currentTheme.textColor }}>
                          Payment Method
                        </label>
                        <div 
                          className="w-full p-3 rounded border-2 flex items-center gap-2"
                          style={{ 
                            borderColor: currentTheme.primaryColor,
                            backgroundColor: currentTheme.primaryColor + '10'
                          }}
                        >
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: currentTheme.primaryColor }}
                          />
                          <span className="text-xs font-medium" style={{ color: currentTheme.textColor }}>
                            Credit Card
                          </span>
                        </div>
                      </div>

                      <button
                        className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90"
                        style={{ 
                          background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`
                        }}
                      >
                        Complete Purchase - $99.00
                      </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-2 pt-3 border-t text-xs" style={{ borderColor: currentTheme.primaryColor + '20' }}>
                      <div className="flex items-center gap-1" style={{ color: currentTheme.textColor + '60' }}>
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: currentTheme.accentColor }}
                        />
                        <span>Secure</span>
                      </div>
                      <span style={{ color: currentTheme.textColor + '40' }}>•</span>
                      <span style={{ color: currentTheme.textColor + '60' }}>Encrypted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Customization Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {customizationFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {feature.description}
              </p>
              <ul className="space-y-1">
                {feature.features.map((featureItem, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <CheckCircleIcon className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                    {featureItem}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Customize Your Checkout?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Start with our design templates or build completely custom checkout experiences 
              that match your brand perfectly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                Start Customizing
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                View All Templates
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



