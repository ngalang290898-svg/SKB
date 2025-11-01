import { getHeadmasterMessage } from '../../../lib/fetchers'
import { useLanguage } from '../../contexts/LanguageContext'

export default async function WelcomeSection() {
  const headmaster = await getHeadmasterMessage()

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Headmaster Portrait */}
            <div className="text-center md:text-left">
              <div className="w-64 h-64 mx-auto md:mx-0 rounded-full bg-gradient-rising p-1">
                <div className="w-full h-full rounded-full bg-white p-1">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {headmaster?.image_url ? (
                      <img
                        src={headmaster.image_url}
                        alt={headmaster.name_en}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">
                        Portrait Not Available
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-2xl font-heading font-bold text-dark">
                  {headmaster?.name_en || 'Headmaster Name Not Available'}
                </h3>
                <p className="text-accent font-medium">
                  {headmaster?.role_en || 'Headmaster'}
                </p>
              </div>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <h2 className="text-4xl font-heading font-bold text-dark mb-8">
                <WelcomeTitle />
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {headmaster?.message_en || 'Headmaster message not available in database.'}
                </p>
                {headmaster?.message_bm && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {headmaster.message_bm}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WelcomeTitle() {
  const { t } = useLanguage()
  return <>{t('welcome.title')}</>
}
