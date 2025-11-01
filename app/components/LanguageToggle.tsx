'use client'

import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200 hover:shadow-glow transition-all duration-300 font-medium text-dark"
    >
      {language === 'en' ? 'BM' : 'EN'}
    </button>
  )
}
