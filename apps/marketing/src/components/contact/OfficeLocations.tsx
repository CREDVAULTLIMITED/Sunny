'use client';

import { motion } from 'framer-motion';
import { 
  MapPinIcon,
  GlobeAltIcon,
  ClockIcon,
  UsersIcon,
  BuildingOfficeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export function OfficeLocations() {
  const headquarters = {
    city: 'Nairobi',
    country: 'Kenya',
    address: 'Nairobi, Kenya',
    description: 'Our headquarters and primary development center, strategically located in East Africa\'s fintech hub.',
    timezone: 'EAT (UTC+3)',
    team: 'Founding Team',
    established: '2024',
    features: [
      'Founding team headquarters',
      'Primary development center',
      'Strategic partnerships hub',
      'Regulatory compliance center'
    ]
  };

  const globalPresence = [
    {
      region: 'Africa',
      countries: 54,
      description: 'Complete coverage across all African markets with local partnerships',
      highlights: ['Kenya (HQ)', 'Nigeria', 'South Africa', 'Egypt', 'Ghana']
    },
    {
      region: 'Europe',
      countries: 47,
      description: 'Full European market coverage with regulatory compliance',
      highlights: ['United Kingdom', 'Germany', 'France', 'Netherlands', 'Switzerland']
    },
    {
      region: 'Asia-Pacific',
      countries: 45,
      description: 'Comprehensive APAC coverage including major financial centers',
      highlights: ['Singapore', 'Japan', 'Australia', 'India', 'Hong Kong']
    },
    {
      region: 'Americas',
      countries: 44,
      description: 'North and South American markets with full regulatory support',
      highlights: ['United States', 'Canada', 'Brazil', 'Mexico', 'Argentina']
    }
  ];

  const workingHours = [
    { region: 'Kenya (HQ)', time: '8:00 AM - 6:00 PM EAT', availability: 'Primary Support' },
    { region: 'Global Support', time: '24/7 Coverage', availability: 'Live Chat & Email' },
    { region: 'Emergency Support', time: 'Always Available', availability: 'Critical Issues' }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Global Presence, Local Expertise
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            While we're headquartered in Kenya, our platform serves businesses across 190+ countries 
            with local market expertise and regulatory compliance.
          </p>
        </motion.div>

        {/* Headquarters Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <BuildingOfficeIcon className="w-8 h-8" />
                <span className="text-lg font-semibold">Headquarters</span>
              </div>
              
              <h3 className="text-4xl font-bold mb-4">
                {headquarters.city}, {headquarters.country}
              </h3>
              
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                {headquarters.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 opacity-75" />
                  <div>
                    <div className="font-semibold">Timezone</div>
                    <div className="opacity-90">{headquarters.timezone}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <UsersIcon className="w-5 h-5 opacity-75" />
                  <div>
                    <div className="font-semibold">Team</div>
                    <div className="opacity-90">{headquarters.team}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Key Functions</h4>
                <div className="grid grid-cols-2 gap-3">
                  {headquarters.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <span className="text-sm opacity-90">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPinIcon className="w-16 h-16 text-white" />
                  </div>
                  <div className="text-2xl font-bold mb-2">Kenya</div>
                  <div className="opacity-90">East Africa's Fintech Hub</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Global Coverage */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Global Market Coverage
            </h3>
            
            <div className="space-y-6">
              {globalPresence.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {region.region}
                    </h4>
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                      {region.countries} Countries
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {region.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {region.highlights.map((country) => (
                      <span key={country} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg text-sm">
                        {country}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Support Hours
            </h3>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm mb-8">
              <div className="space-y-6">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {schedule.region}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {schedule.availability}
                      </div>
                    </div>
                    <div className="text-blue-600 dark:text-blue-400 font-semibold">
                      {schedule.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Methods */}
            <div className="bg-blue-50 dark:bg-blue-950/50 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-6">
                Get in Touch
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="font-semibold text-blue-900 dark:text-blue-100">Phone</div>
                    <div className="text-blue-700 dark:text-blue-300">+254 700 000 000</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="font-semibold text-blue-900 dark:text-blue-100">Email</div>
                    <div className="text-blue-700 dark:text-blue-300">hello@sunnypayments.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="font-semibold text-blue-900 dark:text-blue-100">Address</div>
                    <div className="text-blue-700 dark:text-blue-300">Nairobi, Kenya</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">190+</div>
              <div className="text-gray-600 dark:text-gray-300">Countries Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">135+</div>
              <div className="text-gray-600 dark:text-gray-300">Currencies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Global Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">3</div>
              <div className="text-gray-600 dark:text-gray-300">Founding Team</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
