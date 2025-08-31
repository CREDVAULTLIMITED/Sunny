'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  UserIcon,
  ShareIcon,
  BookmarkIcon,
  ArrowLeftIcon,
  HeartIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon
} from '@heroicons/react/24/solid';
import { useState } from 'react';

interface ArticleContentProps {
  article: {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: {
      name: string;
      role: string;
      avatar: string;
      bio: string;
    };
    category: string;
    publishedAt: string;
    readTime: string;
    views: string;
    likes: number;
    comments: number;
    featured: boolean;
    image: string;
    tags: string[];
  };
}

export function ArticleContent({ article }: ArticleContentProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(article.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Article URL copied to clipboard!');
    }
  };

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

  return (
    <article className="py-20 bg-white dark:bg-gray-900">
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
              <span>Back to Articles</span>
            </Button>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Category and Featured Badge */}
            <div className="flex items-center space-x-4 mb-6">
              <Badge className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
              {article.featured && (
                <Badge variant="outline" className="border-yellow-400 text-yellow-600 dark:border-yellow-500 dark:text-yellow-400">
                  Featured Article
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-6">
                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {article.author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {article.author.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {article.author.role}
                    </div>
                  </div>
                </div>

                {/* Article Stats */}
                <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
                  <span className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center">
                    <EyeIcon className="w-4 h-4 mr-2" />
                    {article.views}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${isLiked ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'}`}
                >
                  {isLiked ? (
                    <HeartSolidIcon className="w-5 h-5" />
                  ) : (
                    <HeartIcon className="w-5 h-5" />
                  )}
                  <span>{likes}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center space-x-2 ${isBookmarked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                >
                  {isBookmarked ? (
                    <BookmarkSolidIcon className="w-5 h-5" />
                  ) : (
                    <BookmarkIcon className="w-5 h-5" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
                >
                  <ShareIcon className="w-5 h-5" />
                  <span>Share</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
                >
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                  <span>{article.comments}</span>
                </Button>
              </div>
            </div>
          </motion.header>

          {/* Article Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{article.id}</span>
                </div>
                <p className="text-sm">Article Featured Image</p>
              </div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
          >
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Article Tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="hover:bg-blue-50 dark:hover:bg-blue-950 cursor-pointer">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-12"
          >
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">
                  {article.author.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {article.author.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                  {article.author.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {article.author.bio}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Social Share */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Share this article
            </h3>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex items-center space-x-2"
              >
                <ShareIcon className="w-4 h-4" />
                <span>Share</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleLike}
                className={`flex items-center space-x-2 ${isLiked ? 'text-red-600 dark:text-red-400 border-red-600 dark:border-red-400' : ''}`}
              >
                {isLiked ? (
                  <HeartSolidIcon className="w-4 h-4" />
                ) : (
                  <HeartIcon className="w-4 h-4" />
                )}
                <span>Like ({likes})</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
