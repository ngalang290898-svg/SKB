'use client';

/**
 * LanguageContext
 * - Provides: language, toggleLanguage, setLanguage, t()
 * - t(key) resolves dot-separated keys inside JSON locale files.
 *
 * Place this file at: app/contexts/LanguageContext.tsx
 * Locale JSON files expected at: /locales/en/home.json and /locales/ms/home.json
 */

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import enHome from '../../locales/en/home.json';
import msHome from '../../locales/ms/home.json';

type Language = 'en' | 'ms';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  /**
   * t - translation helper
   * accepts a dot-separated key string, e.g. "hero.title" or "achievements.title"
   * returns the translated string or the provided fallback or the key itself if missing.
   */
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

function getNested(obj: any, key: string) {
  if (!obj || !key) return undefined;
  const parts = key.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in cur) cur = cur[p];
    else return undefined;
  }
  return cur;
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Restore language from localStorage if exists
    try {
      const saved = localStorage.getItem('skbebuloh_lang') as Language | null;
      if (saved === 'en' || saved === 'ms') setLanguageState(saved);
    } catch (e) {
      // ignore (SSR safety)
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('skbebuloh_lang', language);
    } catch (e) {
      // ignore (SSR safety)
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ms' : 'en'));
  };

  // memoize the current translations object
  const translations = useMemo(() => {
    // default to English if unknown
    if (language === 'ms') return msHome as Record<string, any>;
    return enHome as Record<string, any>;
  }, [language]);

  const t = (key: string, fallback?: string) => {
    // Try to get from translations
    const found = getNested(translations, key);
    if (typeof found === 'string') return found;
    // If not found, try fallback language (English)
    const fallbackObj = getNested(enHome, key);
    if (typeof fallbackObj === 'string') return fallbackObj;
    // else return provided fallback or the key itself
    return fallback ?? key;
  };

  const value: LanguageContextProps = {
    language,
    setLanguage,
    toggleLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
};
