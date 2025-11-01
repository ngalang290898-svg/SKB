'use client'

import { getAchievements } from '../../../lib/fetchers'
import { useLanguage } from '../../contexts/LanguageContext'
import { useEffect, useState, useRef } from 'react'

interface AchievementStats {
  total_students: number
  total_awards: number
  total_activities: number
  alumni_count: number
}

// Custom count-up hook
function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start)
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const currentCount = Math.floor(progress * (end - start) + start)
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, start, isInView])

  return { count, ref }
}

function AnimatedCounter({ number, suffix = '' }: { number: number; suffix?: string }) {
  const { count, ref } = useCountUp(number, 2500, 0)

  return (
    <div ref={ref} className="text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

export default async function AchievementsSection() {
  const achievements = await getAchievements()

  const stats: AchievementStats = {
    total_students: achievements.reduce((sum, item) => sum + (item.student_count || 0), 0) || 850,
    total_awards: achievements.reduce((sum, item) => sum + (item.award_count || 0), 0) || 120,
    total_activities: achievements.length || 45,
    alumni_count: 1250
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
            animated={true}
          />
          <StatCard
            number={stats.total_awards}
            labelKey="achievements.awards"
            suffix="+"
            animated={true}
          />
          <StatCard
            number={stats.total_activities}
            labelKey="achievements.activities"
            suffix="+"
            animated={true}
          />
          <StatCard
            number={stats.alumni_count}
            labelKey="achievements.alumni"
            suffix="+"
            animated={true}
          />
        </div>
      </div>
    </section>
  )
}

function StatCard({ 
  number, 
  labelKey, 
  suffix = '', 
  animated = false 
}: { 
  number: number
  labelKey: string
  suffix?: string
  animated?: boolean
}) {
  const { t } = useLanguage()

  return (
    <div className="text-center">
      {animated ? (
        <AnimatedCounter number={number} suffix={suffix} />
      ) : (
        <div className="text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
          {number.toLocaleString()}{suffix}
        </div>
      )}
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
