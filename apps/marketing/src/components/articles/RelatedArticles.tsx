'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
  };
  category: string;
  publishedAt: string;
  readTime: string;
  views: string;
  tags: string[];
}

interface RelatedArticlesProps {
  articles: Article[];
  currentArticleId: number;
}

export function RelatedArticles({ articles, currentArticleId }: RelatedArticlesProps) {
  // Filter out current article and limit to 3 related articles
  const relatedArticles = articles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 3);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'Engineering': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'Company': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      'Security': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      'Market Insights': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      'Product Updates': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Related Articles
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Continue exploring our insights and updates
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => window.location.href = `/news/articles/${article.id}`}
              >
                {/* Article Image */}
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-white text-sm font-bold">{article.id}</span>
                    </div>
                    <p className="text-xs">Article Image</p>
                  </div>
                </div>

                {/* Article Meta */}
                <div className="flex items-center justify-between mb-4">
                  <Badge className={getCategoryColor(article.category)}>
                    {article.category}
                  </Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(article.publishedAt)}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Article Excerpt */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Article Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {article.author.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {article.author.name}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
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

                {/* Article Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{article.tags.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Read More Link */}
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  <span>Read Article</span>
                  <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>

          {/* View All Articles Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/news/articles'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition-colors"
            >
              View All Articles
              <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
