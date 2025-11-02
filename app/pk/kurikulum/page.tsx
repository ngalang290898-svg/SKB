import { getPKSections } from '../../../lib/fetchers';

// Prevent static generation timeout on Vercel
export const dynamic = 'force-dynamic';

export default async function KurikulumPage() {
  const sections = await getPKSections();
  const section =
    sections.find((s) => s.slug === 'kurikulum') || {
      name_en: 'Curriculum',
      name_bm: 'Kurikulum',
      description_en: 'Academic excellence and curriculum development',
      description_bm: 'Kecemerlangan akademik dan pembangunan kurikulum',
    };

  return (
    <div className="min-h-screen bg-gradient-deep pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h1 className="text-4xl font-heading font-bold text-white mb-4">
              {section.name_en} / {section.name_bm}
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              {section.description_en}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Dashboard cards */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-2">Academic Performance</h3>
                <p className="text-gray-400 text-sm">Student achievement metrics</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-2">Teacher Allocation</h3>
                <p className="text-gray-400 text-sm">Staff and subject assignments</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-2">Curriculum Calendar</h3>
                <p className="text-gray-400 text-sm">Academic schedule and events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
