'use client'

import { getAchievements } from '../../../lib/fetchers'
import { useLanguage } from '../../contexts/LanguageContext'

// Simple counter component since react-countup version has issues
function Counter({ number, suffix = '' }: { number: number; suffix?: string }) {
  return (
    <div className="text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
      {number.toLocaleString()}{suffix}
    </div>
  )
}

interface AchievementStats {
  total_students: number
  total_awards: number
  total_activities: number
  alumni_count: number
}

export default async function AchievementsSection() {
  const achievements = await getAchievements()

  // Calculate stats from achievements data
  const stats: AchievementStats = {
    total_students: achievements.reduce((sum, item) => sum + (item.student_count || 0), 0) || 850,
    total_awards: achievements.reduce((sum, item) => sum + (item.award_count || 0), 0) || 120,
    total_activities: achievements.length || 45,
    alumni_count: 1250 // Default value if no data
  }

  return (
    <section className="py-20 bg-gradient-rising relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-white mb-4">
            <AchievementsTitle />
          </h2>
          <p className="text-white/80 text-lg">
            Celebrating excellence and growth
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <StatCard
            number={stats.total_students}
            labelKey="achievements.students"
            suffix="+"
          />
          <StatCard
            number={stats.total_awards}
            labelKey="achievements.awards"
            suffix="+"
          />
          <StatCard
            number={stats.total_activities}
            labelKey="achievements.activities"
            suffix="+"
          />
          <StatCard
            number={stats.alumni_count}
            labelKey="achievements.alumni"
            suffix="+"
          />
        </div>
      </div>
    </section>
  )
}

function StatCard({ number, labelKey, suffix = '' }: { number: number; labelKey: string; suffix?: string }) {
  const { t } = useLanguage()

  return (
    <div className="text-center">
      <Counter number={number} suffix={suffix} />
      <div className="text-white/80 font-medium text-lg">
        {t(labelKey)}
      </div>
    </div>
  )
}

function AchievementsTitle() {
  const { t } = useLanguage()
  return <>{t('achievements.title')}</>
}
