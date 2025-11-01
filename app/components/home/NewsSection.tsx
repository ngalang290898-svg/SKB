import { getPosts } from '../../../lib/fetchers'
import { Calendar, Clock } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export default async function NewsSection() {
  const posts = await getPosts()

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-dark mb-4">
            <NewsTitle />
          </h2>
          <p className="text-gray-600 text-lg">
            Stay updated with our latest news and events
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {post.image_url && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title_en}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar size={16} className="mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                    {post.read_time && (
                      <>
                        <Clock size={16} className="ml-3 mr-1" />
                        {post.read_time} min read
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-dark mb-3">
                    <PostTitle post={post} />
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    <PostExcerpt post={post} />
                  </p>
                  <a
                    href={`/news/${post.slug}`}
                    className="inline-flex items-center text-primary font-medium hover:text-secondary transition-colors"
                  >
                    <ReadMoreText />
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            No news or events available at the moment
          </div>
        )}
      </div>
    </section>
  )
}

function NewsTitle() {
  const { t } = useLanguage()
  return <>{t('news.title')}</>
}

function PostTitle({ post }: { post: any }) {
  const { language } = useLanguage()
  return <>{language === 'en' ? post.title_en : post.title_bm}</>
}

function PostExcerpt({ post }: { post: any }) {
  const { language } = useLanguage()
  return <>{language === 'en' ? post.excerpt_en : post.excerpt_bm}</>
}

function ReadMoreText() {
  const { t } = useLanguage()
  return <>{t('news.readMore')}</>
}
