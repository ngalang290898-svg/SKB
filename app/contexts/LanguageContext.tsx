'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import enHome from '../../locales/en/home.json';
import msHome from '../../locales/ms/home.json';

type Language = 'en' | 'ms';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | null>(null);

function getNested(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] ? acc[key] : undefined), obj);
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('skbebuloh_lang') as Language | null;
    if (saved === 'en' || saved === 'ms') setLanguageState(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('skbebuloh_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ms' : 'en'));
  };

  const translations = useMemo(() => {
    return language === 'ms' ? (msHome as any) : (enHome as any);
  }, [language]);

  const t = (key: string, fallback?: string) => {
    const value = getNested(translations, key) ?? getNested(enHome, key);
    if (typeof value === 'string') return value;
    return fallback ?? key;
  };

  const setLanguage = (lang: Language) => setLanguageState(lang);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};
