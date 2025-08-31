'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPinIcon,
  ClockIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { 
  BookmarkIcon as BookmarkSolidIcon,
  HeartIcon as HeartSolidIcon
} from '@heroicons/react/24/solid';
import { useState } from 'react';

interface JobHeaderProps {
  job: {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    experience: string;
    salary: {
      min: number;
      max: number;
      currency: string;
    };
    posted: string;
    description: string;
    icon: any;
    gradient: string;
  };
}

export function JobHeader({ job }: JobHeaderProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const IconComponent = job.icon;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${job.title} - Sunny Payments`,
          text: job.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Job URL copied to clipboard!');
    }
  };

  const formatSalary = (salary: typeof job.salary) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: salary.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Back to Careers</span>
            </Button>
          </motion.div>

          {/* Job Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div className="flex-1">
                {/* Job Icon and Department */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${job.gradient} rounded-2xl flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 mb-2">
                      {job.department}
                    </Badge>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Posted {job.posted}
                    </div>
                  </div>
                </div>

                {/* Job Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {job.title}
                </h1>

                {/* Job Description */}
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {job.description}
                </p>

                {/* Job Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <MapPinIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Location</div>
                      <div className="text-gray-600 dark:text-gray-300">{job.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <ClockIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Type</div>
                      <div className="text-gray-600 dark:text-gray-300">{job.type}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <BriefcaseIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Experience</div>
                      <div className="text-gray-600 dark:text-gray-300">{job.experience}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Salary</div>
                      <div className="text-gray-600 dark:text-gray-300">{formatSalary(job.salary)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-4 lg:min-w-[200px]">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full justify-center"
                >
                  Apply Now
                </Button>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex-1 ${isBookmarked ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400' : ''}`}
                  >
                    {isBookmarked ? (
                      <BookmarkSolidIcon className="w-4 h-4" />
                    ) : (
                      <BookmarkIcon className="w-4 h-4" />
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex-1 ${isLiked ? 'text-red-600 dark:text-red-400 border-red-600 dark:border-red-400' : ''}`}
                  >
                    {isLiked ? (
                      <HeartSolidIcon className="w-4 h-4" />
                    ) : (
                      <HeartIcon className="w-4 h-4" />
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="flex-1"
                  >
                    <ShareIcon className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Questions about this role?
                  </p>
                  <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
