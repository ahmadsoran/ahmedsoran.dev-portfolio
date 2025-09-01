import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Provider from '@/components/provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Ahmed Soran - Full-Stack Developer',
  description:
    'Portfolio of Ahmed Soran, a full-stack developer from Kurdistan specializing in JavaScript, Node.js, Go, SQL/NoSQL databases. Building modern web applications with cutting-edge technologies.',
  keywords: [
    'Ahmed Soran',
    'Full-Stack Developer',
    'JavaScript',
    'Node.js',
    'Go',
    'React',
    'Next.js',
    'Kurdistan',
  ],
  authors: [{ name: 'Ahmed Soran' }],
  creator: 'Ahmed Soran',
  openGraph: {
    title: 'Ahmed Soran - Full-Stack Developer',
    description:
      'Portfolio of Ahmed Soran, a full-stack developer from Kurdistan specializing in JavaScript, Node.js, Go, SQL/NoSQL databases.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Soran - Full-Stack Developer',
    description:
      'Portfolio of Ahmed Soran, a full-stack developer from Kurdistan specializing in JavaScript, Node.js, Go, SQL/NoSQL databases.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
