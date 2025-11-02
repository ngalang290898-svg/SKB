'use client';

import { useLanguage } from '../../contexts/LanguageContext';

export default function ContactClient({ school }: { school: any }) {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-surface text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-heading text-primary mb-6">
          {t('contact.title', 'Contact Us')}
        </h2>
        <p className="text-gray-700 mb-2">{school.address}</p>
        <p className="text-gray-700">{school.phone} · {school.email}</p>
        <div className="mt-8">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!..."
            width="100%"
            height="400"
            className="rounded-2xl shadow-glow border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
