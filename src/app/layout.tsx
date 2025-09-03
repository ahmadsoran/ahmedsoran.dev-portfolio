import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Provider from '@/components/Providers'
import StructuredData from '@/components/StructuredData'
import Navigation from '@/components/Navigation'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ahmedsoran.dev'),
  title: 'Ahmed Soran - Full-Stack Developer | JavaScript, Node.js, Go Expert',
  description:
    'Portfolio of Ahmed Soran, an experienced full-stack developer from Kurdistan specializing in JavaScript, TypeScript, Node.js, React, Next.js, Go, PostgreSQL, MongoDB. Building scalable web applications, CRM systems, ERP solutions, and enterprise-grade software.',
  keywords: [
    // Primary keywords
    'Ahmed Soran',
    'Full-Stack Developer',
    'Kurdistan Developer',
    'Software Engineer',
    'Web Developer',

    // Technical skills - Languages
    'JavaScript Developer',
    'TypeScript Expert',
    'Node.js Developer',
    'Go Developer',
    'Golang Programming',

    // Frontend Technologies
    'React Developer',
    'Next.js Expert',
    'Frontend Developer',
    'React.js Specialist',
    'Modern Web Development',
    'Responsive Web Design',

    // Backend Technologies
    'Backend Developer',
    'API Development',
    'RESTful Services',
    'Server-side Development',
    'Node.js Backend',
    'Go Backend Development',

    // Database Skills
    'PostgreSQL Developer',
    'MongoDB Expert',
    'Database Design',
    'SQL Developer',
    'NoSQL Database',
    'Database Administration',

    // Frameworks & Tools
    'Express.js',
    'Tailwind CSS',
    'Vue.js',
    'React TypeScript',
    'Next.js TypeScript',

    // Project Types
    'CRM System Development',
    'ERP Solution',
    'Enterprise Software',
    'SaaS Development',
    'Landing Page Builder',
    'Microfrontend Architecture',
    'Module Federation',

    // Professional Services
    'Custom Software Development',
    'Web Application Development',
    'Full Stack Solutions',
    'Technology Consulting',
    'Software Architecture',
    'Database Solutions',

    // Location-based
    'Kurdistan Software Developer',
    'Middle East Developer',
    'Remote Developer',
    'Freelance Developer',

    // Industry Terms
    'Modern Tech Stack',
    'Scalable Applications',
    'Performance Optimization',
    'Clean Code',
    'Agile Development',
  ],
  authors: [{ name: 'Ahmed Soran', url: 'https://ahmedsoran.dev' }],
  creator: 'Ahmed Soran',
  publisher: 'Ahmed Soran',
  category: 'Technology',
  classification: 'Software Development',

  // Enhanced Open Graph
  openGraph: {
    title:
      'Ahmed Soran - Full-Stack Developer | Expert in JavaScript, Node.js, Go',
    description:
      'Experienced full-stack developer from Kurdistan specializing in modern web technologies. Building CRM systems, ERP solutions, and scalable applications with JavaScript, Node.js, React, Next.js, Go, and database technologies.',
    type: 'website',
    locale: 'en_US',
    url: 'https://ahmedsoran.dev',
    siteName: 'Ahmed Soran Portfolio',
    images: [
      {
        url: '/ahmedweb-desktop.png',
        width: 1200,
        height: 630,
        alt: 'Ahmed Soran - Full-Stack Developer Portfolio',
      },
    ],
  },

  // Enhanced Twitter Card
  twitter: {
    card: 'summary_large_image',
    title:
      'Ahmed Soran - Full-Stack Developer | JavaScript, Node.js, Go Expert',
    description:
      'Experienced full-stack developer specializing in JavaScript, Node.js, React, Next.js, Go, and database technologies. Building scalable applications and enterprise solutions.',
    images: ['/ahmedweb-desktop.png'],
    creator: '@ahmadsoran', // Add your Twitter handle if you have one
    site: '@ahmadsoran',
  },

  // Additional meta tags for better SEO
  alternates: {
    canonical: 'https://ahmedsoran.dev',
  },

  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Additional structured data hints
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        {/* Viewport Meta Tag */}
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        {/* Charset */}
        <meta charSet='UTF-8' />

        {/* Additional SEO Meta Tags */}
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />

        {/* Language and Content Type */}
        <meta httpEquiv='Content-Language' content='en' />
        <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8' />

        {/* Security Headers */}
        <meta httpEquiv='X-Content-Type-Options' content='nosniff' />
        <meta httpEquiv='X-XSS-Protection' content='1; mode=block' />

        {/* Preconnect to external domains for performance */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />

        {/* Additional Android Chrome Icons for better PWA support */}
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/android-chrome-192x192.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='512x512'
          href='/android-chrome-512x512.png'
        />

        {/* Structured Data */}
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <Navigation />
          {children}
        </Provider>
      </body>
    </html>
  )
}
