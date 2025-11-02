'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export default function StaffHighlightClient({ staff }: { staff: any[] }) {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-heading text-center mb-12 text-primary">
          {t('staff.title', 'Our Dedicated Team')}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {staff.map((s) => (
            <motion.div
              key={s.id}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-glow"
            >
              <img
                src={s.image_url}
                alt={s.name_en}
                className="mx-auto rounded-full w-28 h-28 object-cover mb-4"
              />
              <h3 className="font-semibold text-deep">{s.name_en}</h3>
              <p className="text-sm text-gray-600">{s.role_en}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
