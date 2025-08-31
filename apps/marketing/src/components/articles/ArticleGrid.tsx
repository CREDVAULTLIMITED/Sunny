'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  UserIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  publishedAt: string;
  readTime: string;
  views: string;
  featured: boolean;
  image: string;
  tags: string[];
}

interface ArticleGridProps {
  articles: Article[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function ArticleGrid({ articles, currentPage, totalPages, onPageChange, isLoading }: ArticleGridProps) {
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
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 animate-pulse">
                <div className="aspect-[16/10] bg-gray-200 dark:bg-gray-700 rounded-xl mb-6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Articles Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              We couldn't find any articles matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Reset Filters
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {articles.length} Article{articles.length !== 1 ? 's' : ''} Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => window.location.href = `/news/articles/${article.id}`}
            >
              {/* Article Image */}
              <div className="aspect-[16/10] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-lg font-bold">{article.id}</span>
                  </div>
                  <p className="text-xs">Article Image</p>
                </div>
              </div>

              {/* Article Meta */}
              <div className="flex items-center justify-between mb-4">
                <Badge className={getCategoryColor(article.category)}>
                  {article.category}
                </Badge>
                {article.featured && (
                  <Badge variant="outline" className="border-yellow-400 text-yellow-600 dark:border-yellow-500 dark:text-yellow-400">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Article Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {article.title}
              </h3>

              {/* Article Excerpt */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>

              {/* Article Info */}
              <div className="flex items-center justify-between mb-4">
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
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {article.author.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Stats */}
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <CalendarIcon className="w-3 h-3 mr-1" />
                    {formatDate(article.publishedAt)}
                  </span>
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
                {article.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {article.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{article.tags.length - 3}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-2"
          >
            <Button
              variant="outline"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center space-x-2"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center space-x-2">
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                const isCurrentPage = pageNum === currentPage;
                const shouldShow = 
                  pageNum === 1 || 
                  pageNum === totalPages || 
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                if (!shouldShow) {
                  if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={pageNum} className="text-gray-400">...</span>;
                  }
                  return null;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={isCurrentPage ? "default" : "outline"}
                    onClick={() => onPageChange(pageNum)}
                    className={`w-10 h-10 ${isCurrentPage ? 'bg-blue-600 text-white' : ''}`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
