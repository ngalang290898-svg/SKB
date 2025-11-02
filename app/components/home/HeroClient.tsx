'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export default function HeroClient() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden bg-gradient-rising">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-white"
      >
        <h1 className="text-5xl md:text-7xl font-heading font-bold drop-shadow-glow">
          {t('hero.title', 'Welcome to SK Bebuloh WP Labuan')}
        </h1>
        <p className="mt-4 text-lg md:text-2xl opacity-90">
          {t('hero.subtitle', 'Superbia  •  Unitas  •  Triumphus')}
        </p>
      </motion.div>

      {/* Animated gradient wave background */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#013a63]/70 via-transparent"
      />
    </section>
  );
}
