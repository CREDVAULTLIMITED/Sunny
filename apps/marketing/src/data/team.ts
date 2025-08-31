export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  education: string;
  previousRoles: string[];
  achievements: string[];
  expertise: string[];
  // Extended information for detailed page
  fullBio: string;
  personalQuote: string;
  yearsOfExperience: number;
  location: string;
  languages: string[];
  hobbies: string[];
  favoriteTools: string[];
  linkedIn?: string;
  twitter?: string;
  github?: string;
  email?: string;
  keyProjects: {
    title: string;
    description: string;
    impact: string;
    year: string;
  }[];
  philosophy: string;
  funFacts: string[];
  workingStyle: string[];
  contributionToSunny: string;
  visionForCompany: string;
  backgroundStory: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'samuel-mbugua',
    name: 'Samuel Mbugua',
    role: 'Chairperson, CTO & CFO',
    bio: 'Visionary leader serving as Chairperson overseeing strategic decision-making, business development, and investor relations. Also serves as CTO managing technological innovation and CFO handling financial planning.',
    image: '/images/team/samuel-mbugua.jpg',
    education: 'Computer Science & Finance',
    previousRoles: ['Fintech Leadership', 'Technology Innovation', 'Financial Management'],
    achievements: ['Strategic Vision Leadership', 'Multi-role Executive Experience', 'Fintech Expertise'],
    expertise: ['Strategic Leadership', 'Technology Innovation', 'Financial Management', 'Business Development', 'Investor Relations'],
    
    // Extended information
    fullBio: 'Samuel Mbugua is a seasoned technology and finance executive with over 12 years of experience building innovative fintech solutions. As the visionary leader behind Sunny Payments, he combines deep technical expertise with strategic business acumen to drive the company\'s mission of democratizing global payments. His unique ability to serve multiple executive roles stems from his comprehensive understanding of technology, finance, and business strategy.',
    personalQuote: 'The future of payments lies in making complex financial systems simple, secure, and accessible to everyone, everywhere.',
    yearsOfExperience: 12,
    location: 'Nairobi, Kenya',
    languages: ['English', 'Swahili', 'JavaScript', 'Python', 'Solidity'],
    hobbies: ['Blockchain Development', 'Economic Research', 'Mentoring Young Entrepreneurs', 'Chess'],
    favoriteTools: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Terraform'],
    linkedIn: 'https://linkedin.com/in/samuel-mbugua',
    twitter: 'https://twitter.com/samuel_mbugua',
    github: 'https://github.com/samuel-mbugua',
    email: 'samuel@sunnypayments.com',
    
    keyProjects: [
      {
        title: 'Sunny Payment Gateway Architecture',
        description: 'Designed and architected the core payment processing engine capable of handling millions of transactions with 99.99% uptime',
        impact: 'Reduced payment processing time from 5 minutes to under 30 seconds',
        year: '2024'
      },
      {
        title: 'Multi-Currency Settlement System',
        description: 'Built an intelligent system for instant cross-border settlements with optimal currency routing',
        impact: 'Enabled real-time settlements across 135+ currencies',
        year: '2024'
      },
      {
        title: 'Kenya-First Compliance Framework',
        description: 'Developed comprehensive regulatory compliance system for KRA, CBK, and other Kenyan authorities',
        impact: 'Achieved full regulatory compliance 6 months ahead of schedule',
        year: '2024'
      }
    ],
    
    philosophy: 'I believe that technology should be an enabler, not a barrier. Every line of code we write should bring us closer to a world where financial services are truly accessible to all.',
    
    funFacts: [
      'Built his first payment system at age 19',
      'Has traveled to 15+ countries studying payment systems',
      'Can solve a Rubik\'s cube in under 2 minutes',
      'Wrote a book on fintech architecture (unpublished)',
      'Speaks 4 programming languages fluently'
    ],
    
    workingStyle: [
      'Data-driven decision making',
      'Collaborative leadership approach',
      'Rapid prototyping and iteration',
      'Cross-functional team building',
      'Continuous learning mindset'
    ],
    
    contributionToSunny: 'As the founding visionary, Samuel has shaped Sunny\'s technical architecture, business strategy, and company culture. His multi-faceted leadership ensures that technology, finance, and strategy are perfectly aligned to achieve our mission.',
    
    visionForCompany: 'I envision Sunny becoming the global standard for payment processing - where businesses of any size, anywhere in the world, can accept payments as easily as sending a text message.',
    
    backgroundStory: 'Samuel\'s journey into fintech began during university when he witnessed firsthand the challenges small businesses faced with payment processing in Kenya. Determined to solve this problem, he spent years studying global payment systems, working with various fintech companies, and eventually founding Sunny Payments with the mission to democratize financial services.'
  },
  
  {
    id: 'alex-mutonga',
    name: 'Alex Mutonga',
    role: 'Head of Operations & Compliance',
    bio: 'Systems Architectural Engineer and Head of Operations responsible for implementation of internal processes, legal/regulatory compliance, and operational support. Chief Engineer at Tufund Africa and Quick Quick Cash.',
    image: '/images/team/alex.jpg',
    education: 'Computer Science, Business Strategist',
    previousRoles: ['Chief Engineer @ Tufund Africa', 'Chief Engineer @ Quick Quick Cash', 'Systems Architect'],
    achievements: ['Multi-industry Engineering Leadership', 'Compliance Expertise', 'Systems Architecture'],
    expertise: ['Operations Management', 'Regulatory Compliance', 'Systems Architecture', 'Process Implementation', 'Multi-industry Experience'],
    
    // Extended information
    fullBio: 'Alex Mutonga brings a unique combination of technical excellence and operational expertise to Sunny Payments. With extensive experience as Chief Engineer at multiple fintech companies, he has developed a deep understanding of building scalable systems while maintaining strict regulatory compliance. His background in business strategy ensures that all technical decisions align with business objectives.',
    personalQuote: 'Excellence in operations is not about perfect systems, but about systems that can adapt and improve continuously.',
    yearsOfExperience: 10,
    location: 'Nairobi, Kenya',
    languages: ['English', 'Swahili', 'Java', 'Go', 'Kotlin'],
    hobbies: ['System Optimization', 'Regulatory Research', 'Team Building', 'Marathon Running'],
    favoriteTools: ['Spring Boot', 'Kubernetes', 'Docker', 'MongoDB', 'Jenkins', 'Grafana'],
    linkedIn: 'https://linkedin.com/in/alex-mutonga',
    email: 'alex@sunnypayments.com',
    
    keyProjects: [
      {
        title: 'Tufund Africa Core Banking System',
        description: 'Led the development of a comprehensive core banking system serving over 50,000 users',
        impact: 'Increased transaction processing capacity by 300% while maintaining zero downtime',
        year: '2023'
      },
      {
        title: 'Quick Quick Cash Mobile Platform',
        description: 'Architected and built a mobile-first lending platform with real-time credit scoring',
        impact: 'Reduced loan approval time from 24 hours to 5 minutes',
        year: '2022'
      },
      {
        title: 'Sunny Compliance Automation Suite',
        description: 'Designed automated compliance monitoring and reporting system for multiple jurisdictions',
        impact: 'Reduced compliance reporting effort by 80% while improving accuracy',
        year: '2024'
      }
    ],
    
    philosophy: 'The best operations are invisible - when everything runs so smoothly that users never have to think about the complexity behind the scenes.',
    
    funFacts: [
      'Has implemented systems in 3 different African countries',
      'Once debugged a critical system issue during a marathon race',
      'Mentors 10+ junior engineers across different companies',
      'Has never missed a deployment deadline in 5 years',
      'Speaks 3 programming languages and 4 human languages'
    ],
    
    workingStyle: [
      'Process-driven execution',
      'Risk-first thinking',
      'Cross-team collaboration',
      'Continuous process improvement',
      'Proactive problem solving'
    ],
    
    contributionToSunny: 'Alex ensures that Sunny\'s operations run seamlessly while maintaining the highest standards of regulatory compliance. His experience across multiple fintech companies brings invaluable insights for scaling operations efficiently.',
    
    visionForCompany: 'I see Sunny setting the gold standard for operational excellence in fintech, where compliance becomes a competitive advantage rather than a burden.',
    
    backgroundStory: 'Alex\'s passion for systems engineering was sparked during his first job when he had to manually process thousands of transactions. This experience taught him the importance of automation and robust processes, leading him to specialize in building systems that can scale while maintaining reliability and compliance.'
  },
  
  {
    id: 'alan',
    name: 'Alan',
    role: 'Systems Security Engineer',
    bio: 'Systems Security Engineer focused on building robust security infrastructure for the payment platform. Specializes in cybersecurity and secure systems design.',
    image: '/images/team/alan.jpg',
    education: 'Cybersecurity & Systems Engineering',
    previousRoles: ['Security Engineering', 'Systems Security', 'Infrastructure Security'],
    achievements: ['Security Systems Design', 'Infrastructure Protection', 'Security Engineering'],
    expertise: ['Systems Security', 'Cybersecurity', 'Infrastructure Security', 'Secure Systems Design', 'Risk Management'],
    
    // Extended information
    fullBio: 'Alan is a cybersecurity specialist with deep expertise in securing financial systems and protecting sensitive data. His approach to security goes beyond traditional methods, focusing on building security into every layer of the system architecture. With experience in various security domains, he ensures that Sunny\'s platform meets the highest security standards required for global payment processing.',
    personalQuote: 'Security is not a feature you add; it\'s the foundation upon which trust is built.',
    yearsOfExperience: 8,
    location: 'Nairobi, Kenya',
    languages: ['English', 'Swahili', 'C++', 'Rust', 'Python'],
    hobbies: ['Ethical Hacking', 'Cryptography Research', 'Security Conferences', 'Rock Climbing'],
    favoriteTools: ['Wireshark', 'Metasploit', 'OpenSSL', 'Docker Security', 'Vault', 'OWASP ZAP'],
    linkedIn: 'https://linkedin.com/in/alan-security',
    github: 'https://github.com/alan-security',
    email: 'alan@sunnypayments.com',
    
    keyProjects: [
      {
        title: 'Zero-Trust Security Architecture',
        description: 'Implemented comprehensive zero-trust security model for Sunny\'s entire infrastructure',
        impact: 'Achieved 99.9% threat detection rate with zero false positives',
        year: '2024'
      },
      {
        title: 'End-to-End Encryption System',
        description: 'Designed and implemented military-grade encryption for all payment data',
        impact: 'Secured over $10M in transactions with zero security incidents',
        year: '2024'
      },
      {
        title: 'Automated Security Monitoring',
        description: 'Built real-time security monitoring system with AI-powered threat detection',
        impact: 'Reduced security response time from hours to seconds',
        year: '2024'
      }
    ],
    
    philosophy: 'The best security is proactive, not reactive. By thinking like an attacker, we can build systems that are resilient against threats that don\'t even exist yet.',
    
    funFacts: [
      'Has found and reported 15+ security vulnerabilities in major systems',
      'Holds 5 cybersecurity certifications',
      'Once prevented a $2M security breach in under 30 minutes',
      'Practices ethical hacking as a hobby',
      'Has spoken at 8 international security conferences'
    ],
    
    workingStyle: [
      'Threat-first design thinking',
      'Continuous security testing',
      'Collaborative security reviews',
      'Education and awareness focus',
      'Paranoid but practical approach'
    ],
    
    contributionToSunny: 'Alan safeguards every aspect of Sunny\'s platform, ensuring that our security measures exceed industry standards and build the trust necessary for handling global payments.',
    
    visionForCompany: 'I envision Sunny becoming the most trusted payment platform globally, where security is so robust that it becomes transparent to users while being impenetrable to threats.',
    
    backgroundStory: 'Alan\'s interest in cybersecurity began when he helped his university prevent a major cyberattack. This experience showed him the critical importance of proactive security measures, especially in financial systems. He has since dedicated his career to making financial technology more secure and trustworthy.'
  }
];

export const advisors = [
  {
    name: 'Industry Expert',
    role: 'Technical Advisor',
    company: 'Fintech Industry',
    expertise: 'Payment Systems Architecture'
  },
  {
    name: 'Regulatory Expert',
    role: 'Compliance Advisor',
    company: 'Financial Services',
    expertise: 'Global Regulatory Compliance'
  },
  {
    name: 'Business Mentor',
    role: 'Strategic Advisor',
    company: 'Startup Ecosystem',
    expertise: 'Business Development & Growth'
  }
];

// Helper function to get team member by ID
export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find(member => member.id === id);
}

// Helper function to get all team member IDs for static generation
export function getAllTeamMemberIds(): string[] {
  return teamMembers.map(member => member.id);
}
