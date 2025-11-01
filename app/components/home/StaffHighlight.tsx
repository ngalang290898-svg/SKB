import { getFeaturedStaff } from '../../../lib/fetchers'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

export default async function StaffHighlight() {
  const staff = await getFeaturedStaff()

  return (
    <section className="py-20 bg-gradient-deep">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-white mb-4">
            <StaffTitle />
          </h2>
          <p className="text-gray-300 text-lg">
            Meet our dedicated teaching staff
          </p>
        </div>

        {staff.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {staff.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-glow-secondary transition-all duration-300"
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-rising p-1">
                    <div className="w-full h-full rounded-full bg-dark overflow-hidden">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name_en}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2">
                    {member.name_en}
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    {member.role_en}
                  </p>
                  {member.subject_en && (
                    <p className="text-gray-300 text-sm">
                      {member.subject_en}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            Staff data not available in database
          </div>
        )}
      </div>
    </section>
  )
}

function StaffTitle() {
  const { t } = useLanguage()
  return <>{t('staff.title')}</>
}
