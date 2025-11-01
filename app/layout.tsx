import './globals.css'

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
