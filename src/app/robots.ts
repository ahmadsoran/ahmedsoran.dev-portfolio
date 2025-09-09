import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmedsoran.dev'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '*.json',
          '*.xml',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/blog', '/blog/', '/blog/*'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: ['/blog', '/blog/', '/blog/*'],
        crawlDelay: 1,
      },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/blog/sitemap.xml`,
      `${siteUrl}/rss.xml`,
    ],
    host: siteUrl,
  }
}
