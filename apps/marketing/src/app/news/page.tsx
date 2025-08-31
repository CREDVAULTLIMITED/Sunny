import { NewsHero } from '@/components/news/NewsHero';
import { FeaturedArticles } from '@/components/news/FeaturedArticles';
import { Newsletter } from '@/components/news/Newsletter';

export default function NewsPage() {
  return (
    <main>
      <NewsHero />
      <FeaturedArticles />
      <Newsletter />
    </main>
  );
}
