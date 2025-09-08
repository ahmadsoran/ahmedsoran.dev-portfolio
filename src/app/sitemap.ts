import { MetadataRoute } from 'next'
import { getPosts, getTags } from '@/lib/ghost'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmedsoran.dev'

  try {
    const [{ posts, meta }, tags] = await Promise.all([
      getPosts({ limit: 1000 }),
      getTags(),
    ])

    // Individual blog posts
    const blogPosts = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Tag pages (only for tags with posts)
    const tagPages = tags
      .filter((tag) => tag.count?.posts && tag.count.posts > 0)
      .map((tag) => ({
        url: `${siteUrl}/blog?tag=${tag.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))

    // Blog pagination pages (if there are multiple pages)
    const paginationPages = []
    if (meta?.pagination?.pages && meta.pagination.pages > 1) {
      for (let page = 2; page <= meta.pagination.pages; page++) {
        paginationPages.push({
          url: `${siteUrl}/blog?page=${page}`,
          lastModified: new Date(),
          changeFrequency: 'daily' as const,
          priority: 0.5,
        })
      }
    }

    return [
      {
        url: siteUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${siteUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      ...blogPosts,
      ...tagPages,
      ...paginationPages,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)

    // Return basic sitemap if Ghost fails
    return [
      {
        url: siteUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${siteUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ]
  }
}
