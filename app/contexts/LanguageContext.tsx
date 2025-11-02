'use client';

/**
 * SK Bebuloh WP Labuan
 * Global Bilingual Language Context
 * ---------------------------------
 * Handles site-wide language toggle between English (en)
 * and Bahasa Malaysia (ms).
 */

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define accepted language types
type Language = 'en' | 'ms';

// Define the context structure
interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

// ✅ Create the Context
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// ✅ Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Persist language in localStorage (client only)
  useEffect(() => {
    const savedLang = localStorage.getItem('skbebuloh_lang') as Language | null;
    if (savedLang) setLanguage(savedLang);
  }, []);

  // Save to localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('skbebuloh_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ms' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ✅ Hook for consuming the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
