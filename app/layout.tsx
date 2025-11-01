import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import { LanguageProvider } from './contexts/LanguageContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body'
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading'
})

export const metadata = {
  title: 'SK Bebuloh WP Labuan - Official Website',
  description: 'Official bilingual website of SK Bebuloh WP Labuan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-body">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
