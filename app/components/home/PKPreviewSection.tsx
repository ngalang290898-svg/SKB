import { getPKSections } from '../../../lib/fetchers'
import { motion } from 'framer-motion'
import { Book, Users, Activity } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const iconMap = {
  kurikulum: Book,
  hem: Users,
  kokurikulum: Activity
}

export default async function PKPreviewSection() {
  const sections = await getPKSections()

  const defaultSections = [
    {
      slug: 'kurikulum',
      name_en: 'Curriculum',
      name_bm: 'Kurikulum',
      description_en: 'Academic excellence and curriculum development',
      description_bm: 'Kecemerlangan akademik dan pembangunan kurikulum',
      icon: 'kurikulum'
    },
    {
      slug: 'hem',
      name_en: 'Student Affairs',
      name_bm: 'Hal Ehwal Murid',
      description_en: 'Student welfare and development programs',
      description_bm: 'Kebajikan dan program pembangunan murid',
      icon: 'hem'
    },
    {
      slug: 'kokurikulum',
      name_en: 'Co-curriculum',
      name_bm: 'Kokurikulum',
      description_en: 'Sports, clubs, and uniformed units',
      description_bm: 'Sukan, kelab, dan unit beruniform',
      icon: 'kokurikulum'
    }
  ]

  const displaySections = sections.length > 0 ? sections : defaultSections

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-dark mb-4">
            <PKTitle />
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our academic departments and their dedicated dashboards
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displaySections.map((section, index) => {
            const IconComponent = iconMap[section.icon as keyof typeof iconMap] || Book
            
            return (
              <motion.div
                key={section.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white text-center h-full transform transition-all duration-300 group-hover:shadow-glow">
                  <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4">
                    <PKSectionName section={section} />
                  </h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    <PKSectionDescription section={section} />
                  </p>
                  <a
                    href={`/pk/${section.slug}`}
                    className="inline-flex items-center justify-center bg-white text-dark px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                  >
                    <PKViewDashboard />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function PKTitle() {
  const { t } = useLanguage()
  return <>{t('pk.title')}</>
}

function PKSectionName({ section }: { section: any }) {
  const { language } = useLanguage()
  return <>{language === 'en' ? section.name_en : section.name_bm}</>
}

function PKSectionDescription({ section }: { section: any }) {
  const { language } = useLanguage()
  return <>{language === 'en' ? section.description_en : section.description_bm}</>
}

function PKViewDashboard() {
  const { t } = useLanguage()
  return <>{t('pk.viewDashboard')}</>
}
