'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Target, Rocket } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export default function VisionMissionSection() {
  const { t } = useLanguage()

  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  return (
    <section className="py-20 bg-gradient-rising relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Vision Card */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">
                {t('vision.title')}
              </h3>
            </div>
            <p className="text-white/90 text-lg leading-relaxed">
              {t('vision.content')}
            </p>
          </div>

          {/* Mission Card */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Rocket className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">
                {t('mission.title')}
              </h3>
            </div>
            <p className="text-white/90 text-lg leading-relaxed">
              {t('mission.content')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
