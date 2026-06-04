import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Playfair_Display, Great_Vibes } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin", "cyrillic"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant'
})

const playfair = Playfair_Display({ 
  subsets: ["latin", "cyrillic"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair'
})

const greatVibes = Great_Vibes({ 
  subsets: ["latin"],
  weight: ['400'],
  variable: '--font-script'
})

export const metadata: Metadata = {
  title: 'Damir & Anelya | Wedding Day 08.08.2026',
  description: 'Мы будем счастливы разделить с вами самый важный день нашей жизни. Приглашаем вас на нашу свадьбу.',
  keywords: 'wedding, свадьба, Damir, Anelya, invitation, приглашение',
  openGraph: {
    title: 'Damir & Anelya | Wedding Day',
    description: 'Приглашение на свадьбу Дамира и Анели',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#5A1E2D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-[#F5F1E8]">
      <body className={`${cormorant.variable} ${playfair.variable} ${greatVibes.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
