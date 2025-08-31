'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
  UserIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export function FeaturedArticles() {
  const featuredArticle = {
    id: 1,
    title: 'The Future of Cross-Border Payments: How AI is Revolutionizing Global Commerce',
    excerpt: 'Explore how artificial intelligence and machine learning are transforming international payment processing, reducing costs, and improving security for businesses worldwide.',
    content: 'As we approach our Q4 2025 launch, we\'re excited to share insights about the cutting-edge AI technologies powering our platform...',
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
  };

  const recentArticles = [
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
      image: '/images/blog/kenya-fintech.jpg',
      tags: ['Kenya', 'Fintech', 'Market', 'Innovation']
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'Engineering': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'Company': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      'Security': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      'Market Insights': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Articles
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            In-depth insights, technical deep dives, and thought leadership 
            from our team of payment experts and industry veterans.
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <Badge className={getCategoryColor(featuredArticle.category)}>
                  {featuredArticle.category}
                </Badge>
                <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {featuredArticle.title}
              </h3>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {featuredArticle.author.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {featuredArticle.author.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {featuredArticle.readTime}
                  </span>
                  <span className="flex items-center">
                    <EyeIcon className="w-4 h-4 mr-1" />
                    {featuredArticle.views}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {featuredArticle.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold">
                Read Full Article
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">AI</span>
                  </div>
                  <p className="text-sm">Featured Article Image</p>
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Recent Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {recentArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-lg font-bold">{article.id}</span>
                  </div>
                  <p className="text-xs">Article Image</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <Badge className={getCategoryColor(article.category)}>
                  {article.category}
                </Badge>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {article.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {article.author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {article.author.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-300">
                  <span className="flex items-center">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center">
                    <EyeIcon className="w-3 h-3 mr-1" />
                    {article.views}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-4">
                {article.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Articles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 px-8 py-4 text-lg font-semibold rounded-xl"
          >
            View All Articles
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
