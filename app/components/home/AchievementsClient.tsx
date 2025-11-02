'use client';

import { useLanguage } from '../../contexts/LanguageContext';
import { useEffect, useRef, useState } from 'react';

interface AchievementStats {
  total_students: number;
  total_awards: number;
  total_activities: number;
  alumni_count: number;
}

export default function AchievementsClient({ stats }: { stats: AchievementStats }) {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-rising relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-white mb-4">
            {t('achievements.title')}
          </h2>
          <p className="text-white/80 text-lg">
            {t('achievements.subtitle', 'Celebrating excellence and growth')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <StatCard number={stats.total_students} labelKey="achievements.students" suffix="+" />
          <StatCard number={stats.total_awards} labelKey="achievements.awards" suffix="+" />
          <StatCard number={stats.total_activities} labelKey="achievements.activities" suffix="+" />
          <StatCard number={stats.alumni_count} labelKey="achievements.alumni" suffix="+" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------- helpers ----------------------- */

function useCountUp(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsInView(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let frame: number;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration, start]);

  return { count, ref };
}

function AnimatedCounter({ number, suffix = '' }: { number: number; suffix?: string }) {
  const { count, ref } = useCountUp(number, 2500, 0);
  return (
    <div ref={ref} className="text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

function StatCard({
  number,
  labelKey,
  suffix = '',
}: {
  number: number;
  labelKey: string;
  suffix?: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="text-center">
      <AnimatedCounter number={number} suffix={suffix} />
      <div className="text-white/80 font-medium text-lg">{t(labelKey)}</div>
    </div>
  );
}
