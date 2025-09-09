import { headers } from 'next/headers'

/**
 * SEO Cache Configuration for Blog Pages
 * Optimizes caching strategy for better Google indexing
 */

export const blogCacheConfig = {
  // Static Generation Configuration
  revalidate: 43200, // 12 hours - good balance between freshness and performance

  // Cache headers for different content types
  getCacheHeaders: (contentType: 'blog-list' | 'blog-post' | 'blog-tag') => {
    const baseHeaders = {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'public, max-age=3600',
      'Vercel-CDN-Cache-Control': 'public, max-age=3600',
    }

    switch (contentType) {
      case 'blog-list':
        return {
          ...baseHeaders,
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600', // 30 min cache
        }
      case 'blog-post':
        return {
          ...baseHeaders,
          'Cache-Control':
            'public, s-maxage=86400, stale-while-revalidate=604800', // 24 hour cache
        }
      case 'blog-tag':
        return {
          ...baseHeaders,
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200', // 1 hour cache
        }
      default:
        return baseHeaders
    }
  },

  // SEO-friendly cache busting
  getCacheBustKey: () => {
    const now = new Date()
    // Update cache key every 30 minutes to ensure fresh content for crawlers
    const cacheWindow = Math.floor(now.getTime() / (30 * 60 * 1000))
    return `blog-cache-${cacheWindow}`
  },

  // ISR (Incremental Static Regeneration) tags for targeted revalidation
  getRevalidationTags: (contentType: string, identifier?: string) => {
    const baseTags = ['blog']

    switch (contentType) {
      case 'blog-list':
        return [...baseTags, 'blog-list']
      case 'blog-post':
        return [
          ...baseTags,
          'blog-post',
          identifier ? `post-${identifier}` : '',
        ].filter(Boolean)
      case 'blog-tag':
        return [
          ...baseTags,
          'blog-tag',
          identifier ? `tag-${identifier}` : '',
        ].filter(Boolean)
      default:
        return baseTags
    }
  },
}

// Helper function to check if request is from a search engine crawler
export const isCrawlerRequest = async () => {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')?.toLowerCase() || ''

  const crawlers = [
    'googlebot',
    'bingbot',
    'slurp', // Yahoo
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegrambot',
  ]

  return crawlers.some((crawler) => userAgent.includes(crawler))
}

// Generate ETag for content caching
export const generateETag = (content: string): string => {
  const hash = content
    .split('')
    .reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
  return `"${Math.abs(hash).toString(36)}"`
}
