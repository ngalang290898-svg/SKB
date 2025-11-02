'use client';

import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PKPreviewClient({ pkSections }: { pkSections: any[] }) {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-rising text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-heading mb-10">{t('pk.title', 'Administrative Sections')}</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pkSections.map((pk) => (
            <Link
              key={pk.slug}
              href={`/pk/${pk.slug}`}
              className="bg-white/10 rounded-2xl p-6 shadow-glow backdrop-blur-md hover:bg-white/20 transition"
            >
              <h3 className="text-2xl font-semibold mb-2">{pk.name_en}</h3>
              <p className="text-sm opacity-80">{pk.description_en}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
