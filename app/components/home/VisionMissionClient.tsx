'use client';

import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function VisionMissionClient() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-sunset text-white text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6"
      >
        <h2 className="text-4xl font-heading font-bold mb-10">
          {t('vision.title', 'Vision & Mission')}
        </h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-glow">
            <h3 className="text-2xl font-semibold mb-4">{t('vision.title', 'Vision')}</h3>
            <p>{t('vision.text', 'To nurture holistic and excellent individuals.')}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-glow">
            <h3 className="text-2xl font-semibold mb-4">{t('mission.title', 'Mission')}</h3>
            <p>
              {t(
                'mission.text',
                'Committed to delivering quality education and building character for future leaders.'
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
