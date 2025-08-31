'use client';

import { useState, useMemo } from 'react';
import { ArticlesHero } from '@/components/articles/ArticlesHero';
import { ArticleGrid } from '@/components/articles/ArticleGrid';
import { Newsletter } from '@/components/news/Newsletter';

// Mock articles data - in a real app, this would come from an API/CMS
const allArticles = [
  {
    id: 1,
    title: 'The Future of Cross-Border Payments: How AI is Revolutionizing Global Commerce',
    excerpt: 'Explore how artificial intelligence and machine learning are transforming international payment processing, reducing costs, and improving security for businesses worldwide.',
    author: {
      name: 'Samuel Mbugua',
      role: 'CTO & Co-Founder',
      avatar: '/images/team/samuel.jpg'
    },
    category: 'Technology',
    publishedAt: '2025-08-15',
    readTime: '8 min read',
    views: '2.4K',
    featured: true,
    image: '/images/blog/ai-payments.jpg',
    tags: ['AI', 'Machine Learning', 'Cross-Border', 'Innovation']
  },
  {
    id: 2,
    title: 'Building Payment Infrastructure for 190+ Countries: Our Technical Approach',
    excerpt: 'A deep dive into the architectural decisions and technologies that enable Sunny Payments to operate globally from day one.',
    author: {
      name: 'Alex Mutonga',
      role: 'Head of Operations',
      avatar: '/images/team/alex.jpg'
    },
    category: 'Engineering',
    publishedAt: '2025-08-10',
    readTime: '12 min read',
    views: '1.8K',
    featured: false,
    image: '/images/blog/global-infrastructure.jpg',
    tags: ['Architecture', 'Global', 'Infrastructure', 'Engineering']
  },
  {
    id: 3,
    title: 'Pre-Launch Insights: What We\'ve Learned Building a Fintech Startup',
    excerpt: 'Lessons learned, challenges faced, and victories celebrated as we prepare for our market debut.',
    author: {
      name: 'Alan',
      role: 'Security Engineer',
      avatar: '/images/team/alan.jpg'
    },
    category: 'Company',
    publishedAt: '2025-08-05',
    readTime: '6 min read',
    views: '3.2K',
    featured: false,
    image: '/images/blog/startup-journey.jpg',
    tags: ['Startup', 'Lessons', 'Journey', 'Pre-Launch']
  },
  {
    id: 4,
    title: 'Security First: How We Protect Your Payment Data',
    excerpt: 'An overview of our comprehensive security measures, compliance standards, and privacy protection protocols.',
    author: {
      name: 'Alan',
      role: 'Security Engineer',
      avatar: '/images/team/alan.jpg'
    },
    category: 'Security',
    publishedAt: '2025-08-01',
    readTime: '10 min read',
    views: '1.5K',
    featured: false,
    image: '/images/blog/security-measures.jpg',
    tags: ['Security', 'Compliance', 'Privacy', 'PCI DSS']
  },
  {
    id: 5,
    title: 'The Kenya Advantage: Why We Started Here',
    excerpt: 'Exploring Kenya\'s vibrant fintech ecosystem and why it\'s the perfect launchpad for global payment innovation.',
    author: {
      name: 'Samuel Mbugua',
      role: 'CTO & Co-Founder',
      avatar: '/images/team/samuel.jpg'
    },
    category: 'Market Insights',
    publishedAt: '2025-07-28',
    readTime: '7 min read',
    views: '2.1K',
    featured: false,
    image: '/images/blog/kenya-fintech.jpg',
    tags: ['Kenya', 'Fintech', 'Market', 'Innovation']
  },
  {
    id: 6,
    title: 'Microservices Architecture: Scaling Payment Systems Globally',
    excerpt: 'How we designed our microservices architecture to handle millions of transactions across different time zones and currencies.',
    author: {
      name: 'Alex Mutonga',
      role: 'Head of Operations',
      avatar: '/images/team/alex.jpg'
    },
    category: 'Engineering',
    publishedAt: '2025-07-25',
    readTime: '15 min read',
    views: '1.3K',
    featured: false,
    image: '/images/blog/microservices.jpg',
    tags: ['Microservices', 'Architecture', 'Scaling', 'Performance']
  },
  {
    id: 7,
    title: 'Regulatory Compliance in 190+ Countries: A Complex Challenge',
    excerpt: 'Understanding the regulatory landscape and how we ensure compliance across diverse global markets.',
    author: {
      name: 'Alex Mutonga',
      role: 'Head of Operations',
      avatar: '/images/team/alex.jpg'
    },
    category: 'Company',
    publishedAt: '2025-07-20',
    readTime: '9 min read',
    views: '1.7K',
    featured: false,
    image: '/images/blog/compliance.jpg',
    tags: ['Compliance', 'Regulation', 'Global', 'Legal']
  },
  {
    id: 8,
    title: 'The Rise of Embedded Finance: Trends and Opportunities',
    excerpt: 'Analyzing the embedded finance trend and how it\'s reshaping the financial services landscape.',
    author: {
      name: 'Samuel Mbugua',
      role: 'CTO & Co-Founder',
      avatar: '/images/team/samuel.jpg'
    },
    category: 'Market Insights',
    publishedAt: '2025-07-15',
    readTime: '11 min read',
    views: '2.8K',
    featured: true,
    image: '/images/blog/embedded-finance.jpg',
    tags: ['Embedded Finance', 'Trends', 'API', 'Integration']
  },
  {
    id: 9,
    title: 'Real-Time Fraud Detection with Machine Learning',
    excerpt: 'How we use advanced ML algorithms to detect and prevent fraudulent transactions in real-time.',
    author: {
      name: 'Alan',
      role: 'Security Engineer',
      avatar: '/images/team/alan.jpg'
    },
    category: 'Security',
    publishedAt: '2025-07-10',
    readTime: '13 min read',
    views: '1.9K',
    featured: false,
    image: '/images/blog/fraud-detection.jpg',
    tags: ['Fraud Detection', 'Machine Learning', 'Security', 'Real-time']
  },
  {
    id: 10,
    title: 'Platform Update: New Dashboard Features and Improvements',
    excerpt: 'Introducing the latest updates to our payment dashboard with enhanced analytics and user experience improvements.',
    author: {
      name: 'Alex Mutonga',
      role: 'Head of Operations',
      avatar: '/images/team/alex.jpg'
    },
    category: 'Product Updates',
    publishedAt: '2025-07-05',
    readTime: '5 min read',
    views: '2.2K',
    featured: false,
    image: '/images/blog/platform-update.jpg',
    tags: ['Product Update', 'Dashboard', 'UX', 'Analytics']
  },
  {
    id: 11,
    title: 'Cryptocurrency Integration: Supporting Digital Assets',
    excerpt: 'Our approach to integrating cryptocurrency payments while maintaining security and regulatory compliance.',
    author: {
      name: 'Samuel Mbugua',
      role: 'CTO & Co-Founder',
      avatar: '/images/team/samuel.jpg'
    },
    category: 'Technology',
    publishedAt: '2025-07-01',
    readTime: '10 min read',
    views: '3.5K',
    featured: true,
    image: '/images/blog/crypto-integration.jpg',
    tags: ['Cryptocurrency', 'Digital Assets', 'Blockchain', 'Integration']
  },
  {
    id: 12,
    title: 'Building a Remote-First Engineering Culture',
    excerpt: 'How we\'ve built a strong engineering culture across different time zones and continents.',
    author: {
      name: 'Alex Mutonga',
      role: 'Head of Operations',
      avatar: '/images/team/alex.jpg'
    },
    category: 'Company',
    publishedAt: '2025-06-28',
    readTime: '8 min read',
    views: '1.6K',
    featured: false,
    image: '/images/blog/remote-culture.jpg',
    tags: ['Remote Work', 'Culture', 'Engineering', 'Team']
  }
];

const ARTICLES_PER_PAGE = 9;

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Generate categories with counts
  const categories = useMemo(() => {
    const categoryCounts = allArticles.reduce((acc, article) => {
      acc[article.category] = (acc[article.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { id: 'All', name: 'All Articles', count: allArticles.length },
      ...Object.entries(categoryCounts).map(([category, count]) => ({
        id: category,
        name: category,
        count
      }))
    ];
  }, []);

  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    return allArticles.filter(article => {
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Paginate articles
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);

  // Reset to page 1 when filters change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      <ArticlesHero
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
        categories={categories}
      />
      <ArticleGrid
        articles={paginatedArticles}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Newsletter />
    </main>
  );
}
