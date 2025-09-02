import GhostContentAPI from '@tryghost/content-api'

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
export async function getPosts(
  options: {
    limit?: number
    page?: number
    filter?: string
    include?: string
  } = {}
): Promise<GhostPostsResponse> {
  try {
    const { limit = 15, page = 1, filter, include = 'tags,authors' } = options

    const posts = await api.posts.browse({
      limit,
      page,
      filter,
      include,
    })

    return {
      posts: posts.map(formatPost),
      meta: posts.meta,
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw new Error('Failed to fetch posts')
  }
}

// Fetch a single post by slug with caching
export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    const post = await api.posts.read({ slug }, { include: 'tags,authors' })

    return formatPost(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Fetch posts by tag
export async function getPostsByTag(
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
}

// Fetch featured posts
export async function getFeaturedPosts(
  limit: number = 6
): Promise<GhostPost[]> {
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
}

// Fetch all tags
export async function getTags(): Promise<GhostTag[]> {
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
}

// Format post data to ensure consistent types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatPost(post: any): GhostPost {
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
  }
}

export default api
