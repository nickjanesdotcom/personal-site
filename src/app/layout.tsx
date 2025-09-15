import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nick Janes - Ops Expert',
  description: 'Nick Janes - Ops Expert',
  keywords: ['business card', 'networking', 'contact', 'digital card', 'notion consultant', 'software developer'],
  authors: [{ name: 'Nick Janes' }],
  icons: {
    icon: '/nick_clay_avatar.png',
    shortcut: '/nick_clay_avatar.png',
    apple: '/nick_clay_avatar.png',
  },
  openGraph: {
    title: 'Nick Janes - Ops Expert',
    description: 'Nick Janes - Ops Expert',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nick Janes - Ops Expert',
    description: 'Nick Janes - Ops Expert',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-white text-black">
          {children}
        </main>
      </body>
    </html>
  )
}