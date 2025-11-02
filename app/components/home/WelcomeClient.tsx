'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export default function WelcomeClient() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 bg-surface text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6"
      >
        <img
          src="/images/headmaster.jpg"
          alt="Headmaster"
          className="mx-auto rounded-full w-48 h-48 object-cover mb-6 shadow-glow"
        />
        <h2 className="text-4xl font-heading font-bold text-primary mb-4">
          {t('welcome.title', 'Message from the Headmaster')}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 text-lg leading-relaxed">
          {t(
            'welcome.message',
            'Welcome to SK Bebuloh WP Labuan — where excellence, unity, and triumph guide every student.'
          )}
        </p>
      </motion.div>
    </section>
  );
}
