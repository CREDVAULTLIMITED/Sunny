'use client';

import { useParams } from 'next/navigation';
import { JobHeader } from '@/components/jobs/JobHeader';
import { JobDetails } from '@/components/jobs/JobDetails';
import { ApplicationForm } from '@/components/jobs/ApplicationForm';
import { 
  CodeBracketIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';

// Mock jobs data - in a real app, this would come from an API/CMS
const allJobs = [
  {
    id: 1,
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    experience: 'Senior',
    salary: {
      min: 120000,
      max: 180000,
      currency: 'USD'
    },
    posted: '2 days ago',
    description: 'Build scalable payment infrastructure using React, Node.js, and modern cloud technologies. Lead technical decisions and mentor junior developers.',
    icon: CodeBracketIcon,
    gradient: 'from-blue-500 to-cyan-600',
    responsibilities: [
      'Design and develop scalable web applications using React, TypeScript, and Node.js',
      'Build and maintain APIs for our payment processing platform',
      'Collaborate with product managers and designers to implement new features',
      'Mentor junior developers and conduct code reviews',
      'Optimize application performance and ensure high availability',
      'Work with cloud infrastructure (AWS, GCP, Azure) for deployment and scaling',
      'Implement security best practices for financial applications',
      'Participate in architectural decisions and technical planning',
      'Write comprehensive tests and documentation',
      'Stay up-to-date with emerging technologies and industry best practices'
    ],
    requirements: [
      '5+ years of professional software development experience',
      'Expert knowledge of React, TypeScript, and modern JavaScript',
      'Strong backend development skills with Node.js',
      'Experience with payment systems, fintech, or financial services',
      'Proficiency with cloud platforms (AWS, GCP, or Azure)',
      'Experience with microservices architecture',
      'Strong understanding of database design (PostgreSQL, Redis)',
      'Knowledge of security best practices and compliance requirements',
      'Experience with CI/CD pipelines and DevOps practices',
      'Excellent communication and collaboration skills'
    ],
    niceToHave: [
      'Experience with Rust or Go programming languages',
      'Knowledge of blockchain and cryptocurrency technologies',
      'Experience with international payment processing',
      'Familiarity with regulatory compliance (PCI DSS, GDPR)',
      'Experience with high-frequency, low-latency systems',
      'Open source contributions',
      'Experience in a startup environment'
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    benefits: [
      'Competitive salary with equity package',
      'Comprehensive health insurance',
      'Unlimited PTO policy',
      '$2,000 annual learning budget',
      'Remote-first work environment',
      'Home office setup stipend',
      'Annual team retreat',
      'Mental health support',
      'Flexible working hours',
      'Career development opportunities'
    ],
    team: {
      size: '8-person engineering team',
      description: 'Join our growing engineering team that values innovation, collaboration, and technical excellence. We work on cutting-edge payment technology that impacts businesses globally.',
      workingWith: [
        'Frontend Engineers',
        'Backend Engineers',
        'DevOps Engineers',
        'Product Managers',
        'Designers',
        'QA Engineers'
      ]
    },
    growth: {
      opportunities: [
        'Lead major product initiatives',
        'Mentor and manage junior developers',
        'Architect new system components',
        'Represent the company at tech conferences',
        'Drive technical decision-making'
      ],
      mentorship: 'Paired with senior technical lead for guidance and career development',
      training: [
        'Conference attendance budget',
        'Online course subscriptions',
        'Internal tech talks and workshops',
        'Certification support',
        'Cross-functional project exposure'
      ]
    }
  },
  {
    id: 2,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    experience: 'Mid-Senior',
    salary: {
      min: 100000,
      max: 150000,
      currency: 'USD'
    },
    posted: '1 week ago',
    description: 'Design and maintain our multi-cloud infrastructure, CI/CD pipelines, and monitoring systems for global payment processing.',
    icon: ShieldCheckIcon,
    gradient: 'from-green-500 to-emerald-600',
    responsibilities: [
      'Design and maintain multi-cloud infrastructure (AWS, GCP, Azure)',
      'Build and optimize CI/CD pipelines for rapid deployment',
      'Implement monitoring, alerting, and observability solutions',
      'Ensure high availability and disaster recovery capabilities',
      'Manage Kubernetes clusters and container orchestration',
      'Implement security best practices and compliance requirements',
      'Automate infrastructure provisioning using Terraform',
      'Collaborate with engineering teams on deployment strategies',
      'Optimize costs and performance across cloud environments',
      'Maintain documentation and runbooks for operational procedures'
    ],
    requirements: [
      '4+ years of DevOps/Infrastructure engineering experience',
      'Expert knowledge of Kubernetes and Docker containerization',
      'Proficiency with Terraform for infrastructure as code',
      'Experience with multi-cloud environments (AWS, GCP, Azure)',
      'Strong knowledge of monitoring tools (Prometheus, Grafana)',
      'Experience with CI/CD tools (GitHub Actions, Jenkins, GitLab)',
      'Understanding of security and compliance in financial services',
      'Scripting skills in Python, Bash, or Go',
      'Experience with database administration and backup strategies',
      'Strong problem-solving and troubleshooting skills'
    ],
    niceToHave: [
      'Experience with service mesh technologies (Istio, Linkerd)',
      'Knowledge of financial services compliance requirements',
      'Experience with chaos engineering and fault tolerance',
      'Familiarity with blockchain infrastructure',
      'Certification in cloud platforms (AWS, GCP, Azure)',
      'Experience with log aggregation and analysis (ELK stack)',
      'Knowledge of network security and VPN management'
    ],
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'Prometheus', 'Grafana', 'Python', 'Helm'],
    benefits: [
      'Competitive salary with equity package',
      'Comprehensive health insurance',
      'Unlimited PTO policy',
      '$2,000 annual learning budget',
      'Remote-first work environment',
      'Home office setup stipend',
      'Annual team retreat',
      'Mental health support',
      'Flexible working hours',
      'Career development opportunities'
    ],
    team: {
      size: '4-person DevOps team',
      description: 'Work with a dedicated DevOps team focused on building reliable, scalable infrastructure for global payment processing.',
      workingWith: [
        'Platform Engineers',
        'Security Engineers',
        'Backend Engineers',
        'Site Reliability Engineers',
        'Product Teams'
      ]
    },
    growth: {
      opportunities: [
        'Lead infrastructure architecture decisions',
        'Mentor junior DevOps engineers',
        'Drive automation and tooling initiatives',
        'Contribute to open source projects',
        'Speak at DevOps conferences'
      ],
      mentorship: 'Work closely with our Head of Engineering and senior DevOps lead',
      training: [
        'Cloud certification support',
        'DevOps conference attendance',
        'Advanced training courses',
        'Internal knowledge sharing',
        'Cross-team collaboration projects'
      ]
    }
  }
];

export default function JobPage() {
  const params = useParams();
  const jobId = parseInt(params.id as string);

  // Find the job by ID
  const job = allJobs.find(j => j.id === jobId);

  // If job not found, show 404
  if (!job) {
    return (
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Job Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The job you're looking for doesn't exist or may have been filled.
          </p>
          <button
            onClick={() => window.location.href = '/careers'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <main>
      <JobHeader job={job} />
      <JobDetails job={job} />
      <ApplicationForm jobTitle={job.title} jobId={job.id} />
    </main>
  );
}
