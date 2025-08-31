'use client';

import { useParams } from 'next/navigation';
import { ArticleContent } from '@/components/articles/ArticleContent';
import { RelatedArticles } from '@/components/articles/RelatedArticles';
import { Newsletter } from '@/components/news/Newsletter';

// Mock articles data - in a real app, this would come from an API/CMS
const allArticles = [
  {
    id: 1,
    title: 'The Future of Cross-Border Payments: How AI is Revolutionizing Global Commerce',
    excerpt: 'Explore how artificial intelligence and machine learning are transforming international payment processing, reducing costs, and improving security for businesses worldwide.',
    content: `As we approach our Q4 2025 launch, we're excited to share insights about the cutting-edge AI technologies powering our platform. The payment industry is undergoing a massive transformation, driven by artificial intelligence and machine learning technologies that are reshaping how money moves across borders.

At Sunny Payments, we've integrated AI into every aspect of our payment processing pipeline. Our machine learning algorithms analyze transaction patterns in real-time, detecting potential fraud before it occurs and optimizing routing paths to ensure the fastest, most cost-effective transfers.

One of the most significant challenges in cross-border payments has been the complexity of navigating different regulatory environments, currencies, and banking systems. Our AI-powered compliance engine automatically adapts to local regulations in each of the 190+ countries we serve, ensuring seamless transactions while maintaining full regulatory compliance.

The results speak for themselves. Our AI-driven approach has reduced transaction processing times by 75% compared to traditional methods, while simultaneously lowering costs by up to 60%. This isn't just about efficiency – it's about democratizing access to global commerce for businesses of all sizes.

Looking ahead, we're exploring even more innovative applications of AI in payments. From predictive analytics that help businesses optimize their cash flow to natural language processing that makes our developer APIs more intuitive, the possibilities are endless.

The future of payments is intelligent, and we're proud to be leading this transformation. As we prepare for our market launch, we're confident that our AI-first approach will set new standards for what businesses can expect from their payment infrastructure.`,
    author: {
      name: 'Samuel Mbugua',
      role: 'CTO & Co-Founder',
      avatar: '/images/team/samuel.jpg',
      bio: 'Samuel is the Chief Technology Officer and Co-Founder of Sunny Payments. With over 10 years of experience in fintech and payment systems, he leads our technical vision and platform development. Samuel is passionate about using technology to democratize global commerce and create opportunities for businesses worldwide.'
    },
    category: 'Technology',
    publishedAt: '2025-08-15',
    readTime: '8 min read',
    views: '2.4K',
    likes: 156,
    comments: 23,
    featured: true,
    image: '/images/blog/ai-payments.jpg',
    tags: ['AI', 'Machine Learning', 'Cross-Border', 'Innovation']
  },
  {
    id: 2,
    title: 'Building Payment Infrastructure for 190+ Countries: Our Technical Approach',
    excerpt: 'A deep dive into the architectural decisions and technologies that enable Sunny Payments to operate globally from day one.',
    content: `Building a payment platform that works seamlessly across 190+ countries is one of the most complex technical challenges we've undertaken at Sunny Payments. From day one, we knew that our architecture had to be designed for global scale, regulatory compliance, and operational excellence.

Our microservices architecture forms the backbone of our global platform. Each service is designed to handle specific aspects of the payment process – from currency conversion and fraud detection to regulatory compliance and settlement. This modular approach allows us to customize our services for different markets while maintaining a consistent core platform.

One of our key innovations is our adaptive compliance engine. Rather than building separate systems for each country's regulations, we've created a flexible framework that can be configured to meet local requirements. This approach has allowed us to achieve compliance in 190+ countries with a single, unified platform.

Our data architecture is equally important. We've implemented a distributed database system that ensures data residency requirements are met while maintaining global consistency. This means that a payment initiated in Kenya can be processed according to local regulations while still benefiting from our global optimization algorithms.

Security is paramount in everything we do. Our zero-trust architecture ensures that every component of our system is continuously verified and validated. We use advanced encryption, multi-factor authentication, and real-time monitoring to protect every transaction.

The result is a platform that can process payments in any currency, comply with any regulation, and scale to handle millions of transactions per day. As we prepare for launch, we're confident that our technical foundation will support our mission to democratize global payments.`,
    author: {
      name: 'Alex Mutonga',
      role: 'Head of Operations',
      avatar: '/images/team/alex.jpg',
      bio: 'Alex serves as Head of Operations and Compliance at Sunny Payments. With extensive experience in systems architecture and regulatory compliance, Alex ensures our platform meets the highest standards of security and regulatory requirements across all markets we serve.'
    },
    category: 'Engineering',
    publishedAt: '2025-08-10',
    readTime: '12 min read',
    views: '1.8K',
    likes: 89,
    comments: 15,
    featured: false,
    image: '/images/blog/global-infrastructure.jpg',
    tags: ['Architecture', 'Global', 'Infrastructure', 'Engineering']
  },
  {
    id: 3,
    title: 'Pre-Launch Insights: What We\'ve Learned Building a Fintech Startup',
    excerpt: 'Lessons learned, challenges faced, and victories celebrated as we prepare for our market debut.',
    content: `As we approach our Q4 2025 launch, it's worth reflecting on the journey that brought us here. Building a fintech startup is never easy, but the lessons we've learned along the way have shaped both our platform and our company culture.

One of our biggest early challenges was understanding the regulatory landscape. With 190+ countries in scope, we quickly realized that compliance isn't just a checkbox – it's a core product feature. This insight led us to build compliance into the foundation of our platform rather than treating it as an afterthought.

Another key learning has been the importance of starting with security. In payments, trust is everything. We made the decision early on to implement bank-level security from day one, even when it slowed down our initial development. This upfront investment in security has paid dividends as we've scaled.

The power of partnerships cannot be overstated. Rather than trying to build everything ourselves, we've focused on creating strategic partnerships with local banks, payment processors, and regulatory experts in key markets. These relationships have been instrumental in our ability to achieve global coverage so quickly.

Perhaps most importantly, we've learned that building a great product is just the beginning. Success in fintech requires deep understanding of your customers' needs, regulatory requirements, and market dynamics. We've spent countless hours talking to potential customers, understanding their pain points, and iterating on our solution.

As we prepare for launch, we're excited about what lies ahead. The lessons we've learned have prepared us well for the challenges and opportunities that await in the global payments market.`,
    author: {
      name: 'Alan',
      role: 'Security Engineer',
      avatar: '/images/team/alan.jpg',
      bio: 'Alan is our Security Engineer, responsible for ensuring the highest levels of security across our payment platform. With expertise in cybersecurity and financial systems, Alan leads our efforts to protect customer data and maintain the integrity of every transaction.'
    },
    category: 'Company',
    publishedAt: '2025-08-05',
    readTime: '6 min read',
    views: '3.2K',
    likes: 203,
    comments: 42,
    featured: false,
    image: '/images/blog/startup-journey.jpg',
    tags: ['Startup', 'Lessons', 'Journey', 'Pre-Launch']
  }
];

export default function ArticlePage() {
  const params = useParams();
  const articleId = parseInt(params.id as string);

  // Find the article by ID
  const article = allArticles.find(a => a.id === articleId);

  // If article not found, show 404
  if (!article) {
    return (
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The article you're looking for doesn't exist or may have been moved.
          </p>
          <button
            onClick={() => window.location.href = '/news/articles'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <main>
      <ArticleContent article={article} />
      <RelatedArticles articles={allArticles} currentArticleId={articleId} />
      <Newsletter />
    </main>
  );
}
