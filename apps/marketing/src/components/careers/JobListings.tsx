'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CodeBracketIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  GlobeAltIcon,
  MapPinIcon,
  ClockIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

export function JobListings() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const departments = [
    { id: 'All', name: 'All Positions', count: 8 },
    { id: 'Engineering', name: 'Engineering', count: 4 },
    { id: 'Product', name: 'Product', count: 2 },
    { id: 'Operations', name: 'Operations', count: 1 },
    { id: 'Marketing', name: 'Marketing', count: 1 }
  ];

  const jobListings = [
    {
      id: 1,
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Senior',
      description: 'Build scalable payment infrastructure using React, Node.js, and modern cloud technologies. Lead technical decisions and mentor junior developers.',
      requirements: [
        '5+ years full-stack development experience',
        'Expert in React, TypeScript, Node.js',
        'Experience with payment systems or fintech',
        'Cloud platforms (AWS, GCP, Azure)',
        'Microservices architecture experience'
      ],
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL'],
      icon: CodeBracketIcon,
      gradient: 'from-blue-500 to-cyan-600',
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Mid-Senior',
      description: 'Design and maintain our multi-cloud infrastructure, CI/CD pipelines, and monitoring systems for global payment processing.',
      requirements: [
        '4+ years DevOps/Infrastructure experience',
        'Kubernetes, Docker, Terraform expertise',
        'Multi-cloud experience (AWS, GCP, Azure)',
        'Monitoring and observability tools',
        'Security and compliance knowledge'
      ],
      skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'Prometheus'],
      icon: ShieldCheckIcon,
      gradient: 'from-green-500 to-emerald-600',
      posted: '1 week ago'
    },
    {
      id: 3,
      title: 'Product Manager - Payments',
      department: 'Product',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Senior',
      description: 'Lead product strategy for our global payment platform, working closely with engineering and business teams to deliver world-class payment experiences.',
      requirements: [
        '4+ years product management experience',
        'Fintech or payments industry experience',
        'Strong analytical and data-driven mindset',
        'Experience with global/international products',
        'Technical background preferred'
      ],
      skills: ['Product Strategy', 'Analytics', 'Fintech', 'Agile', 'User Research'],
      icon: ChartBarIcon,
      gradient: 'from-purple-500 to-indigo-600',
      posted: '3 days ago'
    },
    {
      id: 4,
      title: 'Rust Backend Engineer',
      department: 'Engineering',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Senior',
      description: 'Build high-performance payment processing engines in Rust. Focus on security, scalability, and reliability for mission-critical financial systems.',
      requirements: [
        '3+ years Rust development experience',
        'Systems programming background',
        'Financial services or payments experience',
        'Performance optimization expertise',
        'Security-first mindset'
      ],
      skills: ['Rust', 'Systems Programming', 'PostgreSQL', 'Redis', 'Microservices'],
      icon: CodeBracketIcon,
      gradient: 'from-orange-500 to-red-600',
      posted: '5 days ago'
    },
    {
      id: 5,
      title: 'Head of Finance & Operations',
      department: 'Operations',
      location: 'Remote/Kenya',
      type: 'Full-time',
      experience: 'Senior',
      description: 'Lead financial planning, compliance, and operational excellence as we scale globally. Work directly with founders on strategic initiatives.',
      requirements: [
        '7+ years finance/operations experience',
        'Fintech or startup experience',
        'Regulatory compliance expertise',
        'International business experience',
        'CPA or equivalent qualification'
      ],
      skills: ['Financial Planning', 'Compliance', 'Operations', 'Strategy', 'Leadership'],
      icon: CurrencyDollarIcon,
      gradient: 'from-yellow-500 to-orange-600',
      posted: '1 week ago'
    },
    {
      id: 6,
      title: 'Frontend Engineer',
      department: 'Engineering',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Mid-Level',
      description: 'Create beautiful, responsive user interfaces for our payment dashboards and developer tools using React, Next.js, and modern design systems.',
      requirements: [
        '3+ years frontend development experience',
        'Expert in React, Next.js, TypeScript',
        'UI/UX design sensibility',
        'Experience with design systems',
        'Performance optimization skills'
      ],
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      icon: CodeBracketIcon,
      gradient: 'from-pink-500 to-rose-600',
      posted: '4 days ago'
    },
    {
      id: 7,
      title: 'UX/UI Designer',
      department: 'Product',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Mid-Senior',
      description: 'Design intuitive payment experiences for businesses and developers. Create design systems that scale across multiple products and markets.',
      requirements: [
        '4+ years UX/UI design experience',
        'Fintech or B2B SaaS experience',
        'Proficiency in Figma, design systems',
        'User research and testing experience',
        'Mobile and web design expertise'
      ],
      skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Mobile Design'],
      icon: UsersIcon,
      gradient: 'from-teal-500 to-cyan-600',
      posted: '6 days ago'
    },
    {
      id: 8,
      title: 'Growth Marketing Manager',
      department: 'Marketing',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Mid-Senior',
      description: 'Drive user acquisition and growth for our payment platform. Develop and execute marketing strategies across multiple channels and markets.',
      requirements: [
        '4+ years growth marketing experience',
        'B2B SaaS or fintech experience',
        'Data-driven approach to marketing',
        'Content marketing and SEO expertise',
        'International marketing experience'
      ],
      skills: ['Growth Marketing', 'SEO', 'Content Marketing', 'Analytics', 'B2B SaaS'],
      icon: ChartBarIcon,
      gradient: 'from-violet-500 to-purple-600',
      posted: '1 week ago'
    }
  ];

  const filteredJobs = selectedDepartment === 'All' 
    ? jobListings 
    : jobListings.filter(job => job.department === selectedDepartment);

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
            Open Positions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join our growing team and help build the next generation of payment infrastructure. 
            We're looking for passionate individuals who want to make a global impact.
          </p>
        </motion.div>

        {/* Department Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedDepartment === dept.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {dept.name} ({dept.count})
            </button>
          ))}
        </motion.div>

        {/* Job Listings */}
        <div className="grid gap-8 max-w-4xl mx-auto">
          {filteredJobs.map((job, index) => {
            const IconComponent = job.icon;
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${job.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-1">
                          <BriefcaseIcon className="w-4 h-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <Badge variant="secondary">{job.experience}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {job.posted}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {job.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Requirements:</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start space-x-2 text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">
                    Apply Now
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No Jobs Message */}
        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No positions available in this department at the moment.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Check back soon or view all positions.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
