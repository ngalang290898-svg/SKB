// ✅ Force dynamic rendering at runtime to prevent build timeouts
export const dynamic = 'force-dynamic';

// Import all homepage sections (server components only)
import HeroSection from './components/home/HeroSection';
import WelcomeSection from './components/home/WelcomeSection';
import VisionMissionSection from './components/home/VisionMissionSection';
import StaffHighlight from './components/home/StaffHighlight';
import PKPreviewSection from './components/home/PKPreviewSection';
import AchievementsSection from './components/home/AchievementsSection';
import NewsSection from './components/home/NewsSection';
import ContactSection from './components/home/ContactSection';

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* 🟧 Hero Section */}
      <HeroSection />

      {/* 🟩 Welcome Message (Headmaster) */}
      <WelcomeSection />

      {/* 🟦 Vision & Mission */}
      <VisionMissionSection />

      {/* 🟨 Staff Highlight */}
      <StaffHighlight />

      {/* 🟪 PK Section Preview */}
      <PKPreviewSection />

      {/* 🟥 Achievements Section */}
      <AchievementsSection />

      {/* 🟫 News & Events */}
      <NewsSection />

      {/* 🩵 Contact & Map */}
      <ContactSection />
    </main>
  );
}
