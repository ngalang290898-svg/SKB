'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ms'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [translations, setTranslations] = useState<any>({})

  useEffect(() => {
    // Load translations
    import(`../../locales/${language}/home.json`).then(module => {
      setTranslations(module.default)
    })
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ms' : 'en')
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
