import { getPKSections } from '../../../lib/fetchers'

export default async function HEMPage() {
  const sections = await getPKSections()
  const section = sections.find(s => s.slug === 'hem') || {
    name_en: 'Student Affairs',
    name_bm: 'Hal Ehwal Murid',
    description_en: 'Student welfare and development programs',
    description_bm: 'Kebajikan dan program pembangunan murid'
  }

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
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-2">Student Welfare</h3>
                <p className="text-gray-400 text-sm">Health and support services</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-2">Discipline Records</h3>
                <p className="text-gray-400 text-sm">Behavior and attendance</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-2">Counseling Services</h3>
                <p className="text-gray-400 text-sm">Guidance and support programs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
