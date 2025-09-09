import Link from 'next/link'
import {
  IconArrowLeft,
  IconSearchOff,
  IconArticle,
  IconHome,
} from '@tabler/icons-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Post Not Found | Ahmed Soran',
  description:
    'The requested blog post could not be found. Browse other articles on full-stack development, JavaScript, TypeScript, Node.js, React, Next.js, and Go programming.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://ahmedsoran.dev/blog',
  },
}

export default function NotFound() {
  return (
    <>
      {/* JSON-LD for 404 page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': 'https://ahmedsoran.dev/blog/404',
            name: 'Blog Post Not Found',
            description: 'The requested blog post could not be found.',
            url: 'https://ahmedsoran.dev/blog',
            isPartOf: {
              '@type': 'WebSite',
              '@id': 'https://ahmedsoran.dev',
              name: 'Ahmed Soran Portfolio',
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://ahmedsoran.dev',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Blog',
                  item: 'https://ahmedsoran.dev/blog',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: '404 Not Found',
                },
              ],
            },
          }),
        }}
      />

      <div className='min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center'>
        <div className='container mx-auto px-6 text-center'>
          <div className='max-w-2xl mx-auto'>
            <div className='mb-8'>
              <div className='w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6'>
                <IconSearchOff className='w-10 h-10 text-muted-foreground' />
              </div>

              <h1 className='text-4xl font-bold text-foreground mb-4'>
                Blog Post Not Found
              </h1>

              <p className='text-lg text-muted-foreground mb-8'>
                The blog post you&apos;re looking for doesn&apos;t exist or has
                been moved. Don&apos;t worry, there&apos;s plenty of great
                content to explore!
              </p>

              <div className='bg-muted/30 rounded-lg p-6 mb-8'>
                <h2 className='text-xl font-semibold mb-4'>What you can do:</h2>
                <ul className='text-left space-y-2 text-muted-foreground'>
                  <li>• Check the URL for typos</li>
                  <li>
                    • Browse our latest articles on full-stack development
                  </li>
                  <li>
                    • Search for content about JavaScript, TypeScript, Node.js,
                    React, Next.js, or Go
                  </li>
                  <li>• Visit our homepage to explore other sections</li>
                </ul>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/blog'
                className='inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors'>
                <IconArticle className='w-4 h-4' />
                Browse All Articles
              </Link>

              <Link
                href='/'
                className='inline-flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-lg font-medium transition-colors'>
                <IconHome className='w-4 h-4' />
                Go to Homepage
              </Link>

              <Link
                href='/blog'
                className='inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground px-6 py-3 rounded-lg font-medium transition-colors'>
                <IconArrowLeft className='w-4 h-4' />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
