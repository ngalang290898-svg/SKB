'use client';

import { useLanguage } from '../../contexts/LanguageContext';

export default function NewsSectionClient({ posts }: { posts: any[] }) {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-surface">
      <h2 className="text-3xl font-heading text-center mb-10">
        {t('news.title', 'News & Events')}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {posts.slice(0, 3).map((post) => (
          <article key={post.id} className="bg-white shadow-glow rounded-2xl p-4">
            <img
              src={post.image_url}
              alt={post.title_en}
              className="rounded-lg mb-4"
            />
            <h3 className="font-semibold">{post.title_en}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              {post.excerpt_en}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
