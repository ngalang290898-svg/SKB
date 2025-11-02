'use client';

/**
 * ClientProviders.tsx
 * A client-side wrapper for LanguageProvider and other future client providers.
 */

import { LanguageProvider } from './contexts/LanguageContext';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
