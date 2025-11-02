// app/layout.tsx
import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import ClientProviders from './ClientProviders';   // 👈 import wrapper

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata = {
  title: 'SK Bebuloh WP Labuan - Official Website',
  description: 'Official bilingual website of SK Bebuloh WP Labuan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body">
        {/* 👇 render all client-only providers here */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
