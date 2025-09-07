import { BlogPostHeaders } from '@/constants/const'
import GhostContentAPI from '@tryghost/content-api'
import { cache } from 'react'

// Cache configuration
const CACHE_DURATION = 12 * 60 * 60 * 1000 // 12 hours in milliseconds
const cacheStore = new Map<string, { data: unknown; timestamp: number }>()

// Custom cache function with time-based expiration
function createCachedFunction<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  getCacheKey: (...args: TArgs) => string
) {
  return cache(async (...args: TArgs) => {
    const cacheKey = getCacheKey(...args)
    const now = Date.now()

    // Check if we have cached data that's still fresh
    const cached = cacheStore.get(cacheKey)
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      return cached.data as TReturn
    }

    // Fetch fresh data
    const result = await fn(...args)

    // Cache the result
    cacheStore.set(cacheKey, { data: result, timestamp: now })

    return result
  })
}

// Initialize the Ghost Content API client
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL || 'https://demo.ghost.io',
  key: process.env.GHOST_CONTENT_API_KEY || '22444f78447824223cefc48062',
  version: 'v6.0',
})

export interface GhostPost {
  id: string
  title: string
  slug: string
  html: string
  excerpt: string
  feature_image: string | null
  feature_image_alt: string | null
  feature_image_caption: string | null
  published_at: string
  created_at: string
  updated_at: string
  reading_time: number
  url: string
  custom_excerpt: string | null
  featured: boolean
  visibility: 'public' | 'members' | 'paid'
  tags?: GhostTag[]
  authors?: GhostAuthor[]
  primary_tag?: GhostTag
  primary_author?: GhostAuthor
  meta_title?: string | null
  meta_description?: string | null
  og_image?: string | null
  og_title?: string | null
  og_description?: string | null
  twitter_image?: string | null
  twitter_title?: string | null
  twitter_description?: string | null
  codeinjection_head?: string | null
  codeinjection_foot?: string | null
  custom_template?: string | null
  canonical_url?: string | null
  dir: 'ltr' | 'rtl'
}

export interface GhostTag {
  id: string
  name: string
  slug: string
  description: string | null
  feature_image: string | null
  visibility: 'public' | 'internal'
  url: string
  count?: {
    posts: number
  }
}

export interface GhostAuthor {
  id: string
  name: string
  slug: string
  profile_image: string | null
  cover_image: string | null
  bio: string | null
  website: string | null
  location: string | null
  facebook: string | null
  twitter: string | null
  url: string
  count?: {
    posts: number
  }
}

export interface GhostPagination {
  page: number
  limit: number
  pages: number
  total: number
  next: number | null
  prev: number | null
}

export interface GhostPostsResponse {
  posts: GhostPost[]
  meta: {
    pagination: GhostPagination
  }
}

// Fetch all posts with caching
export const getPosts = createCachedFunction(
  async function (
    options: {
      limit?: number
      page?: number
      filter?: string
      include?: string
      search?: string
    } = {}
  ): Promise<GhostPostsResponse> {
    try {
      const {
        limit = 15,
        page = 1,
        filter,
        include = 'tags,authors',
        search,
      } = options

      // Build filter string
      let filterString = filter || ''

      // Add search filter for title if search term is provided
      if (search && search.trim()) {
        const searchFilter = `title:~'${search.trim()}'`
        filterString = filterString
          ? `${filterString}+${searchFilter}`
          : searchFilter
      }

      const postsApi = await api.posts.browse({
        limit,
        page,
        filter: filterString || undefined,
        include,
      })
      const posts = postsApi?.map((post) => formatPost(post)) || []

      return {
        posts,
        meta: postsApi?.meta,
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw new Error('Failed to fetch posts')
    }
  },
  (options) => `posts:${JSON.stringify(options)}`
)

// Search posts by title with caching
export const searchPosts = createCachedFunction(
  async function (
    searchTerm: string,
    options: {
      limit?: number
      page?: number
      tag?: string
    } = {}
  ): Promise<GhostPostsResponse> {
    const { limit = 15, page = 1, tag } = options

    return getPosts({
      limit,
      page,
      filter: tag ? `tag:${tag}` : undefined,
      search: searchTerm,
      include: 'tags,authors',
    })
  },
  (
    searchTerm: string,
    options: { limit?: number; page?: number; tag?: string }
  ) => `search:${searchTerm}:${JSON.stringify(options)}`
)

// Fetch a single post by slug with caching
export const getPostBySlug = createCachedFunction(
  async function (slug: string): Promise<GhostPost | null> {
    try {
      const post = await api.posts.read({ slug }, { include: 'tags,authors' })

      return formatPost(post)
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  },
  (slug: string) => `post:${slug}`
)

// Fetch posts by tag
export const getPostsByTag = createCachedFunction(
  async function (
    tagSlug: string,
    options: { limit?: number; page?: number } = {}
  ): Promise<GhostPostsResponse> {
    const { limit = 15, page = 1 } = options

    return getPosts({
      limit,
      page,
      filter: `tag:${tagSlug}`,
      include: 'tags,authors',
    })
  },
  (tagSlug, options) => `postsByTag:${tagSlug}:${JSON.stringify(options)}`
)

// Fetch featured posts
export const getFeaturedPosts = createCachedFunction(
  async function (limit: number = 6): Promise<GhostPost[]> {
    try {
      const response = await getPosts({
        limit,
        filter: 'featured:true',
        include: 'tags,authors',
      })

      return response.posts
    } catch (error) {
      console.error('Error fetching featured posts:', error)
      return []
    }
  },
  (limit) => `featuredPosts:${limit}`
)

// Fetch all tags
export const getTags = createCachedFunction(
  async function (): Promise<GhostTag[]> {
    try {
      const tags = await api.tags.browse({
        limit: 'all',
        include: 'count.posts',
      })

      return tags.filter((tag: GhostTag) => tag.visibility === 'public')
    } catch (error) {
      console.error('Error fetching tags:', error)
      return []
    }
  },
  () => 'tags'
)

// Format post data to ensure consistent types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatPost(post: any): GhostPost {
  const dir =
    post?.codeinjection_head?.split(BlogPostHeaders.ContentDirection)[1] ||
    'ltr'

  return {
    ...post,
    feature_image_alt: post.feature_image_alt || null,
    feature_image_caption: post.feature_image_caption || null,
    custom_excerpt: post.custom_excerpt || null,
    meta_title: post.meta_title || null,
    meta_description: post.meta_description || null,
    og_image: post.og_image || null,
    og_title: post.og_title || null,
    og_description: post.og_description || null,
    twitter_image: post.twitter_image || null,
    twitter_title: post.twitter_title || null,
    twitter_description: post.twitter_description || null,
    dir,
  }
}

// Cache management utilities
export function clearGhostCache() {
  cacheStore.clear()
}

export function getCacheStats() {
  const now = Date.now()
  const stats = {
    totalEntries: cacheStore.size,
    freshEntries: 0,
    staleEntries: 0,
    entries: [] as Array<{ key: string; age: number; isFresh: boolean }>,
  }

  for (const [key, value] of cacheStore.entries()) {
    const age = now - value.timestamp
    const isFresh = age < CACHE_DURATION
    stats.entries.push({ key, age, isFresh })

    if (isFresh) {
      stats.freshEntries++
    } else {
      stats.staleEntries++
    }
  }

  return stats
}

// Auto-cleanup stale cache entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of cacheStore.entries()) {
    if (now - value.timestamp >= CACHE_DURATION) {
      cacheStore.delete(key)
    }
  }
}, 60 * 60 * 1000) // Clean up every hour

export default api
