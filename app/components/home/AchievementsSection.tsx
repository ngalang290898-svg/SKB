import { getAchievements } from '../../../lib/fetchers';
import AchievementsClient from './AchievementsClient';

export default async function AchievementsSection() {
  const achievements = await getAchievements();

  const stats = {
    total_students:
      achievements.reduce((s, i) => s + (i.student_count || 0), 0) || 850,
    total_awards:
      achievements.reduce((s, i) => s + (i.award_count || 0), 0) || 120,
    total_activities: achievements.length || 45,
    alumni_count: 1250,
  };

  return <AchievementsClient stats={stats} />;
}
