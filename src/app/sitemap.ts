import { MetadataRoute } from 'next'
import { getPosts, getTags } from '@/lib/ghost'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmedsoran.dev'

  try {
    const [{ posts, meta }, tags] = await Promise.all([
      getPosts({ limit: 1000 }),
      getTags(),
    ])

    // Get the latest post date for blog page lastModified
    const latestPostDate =
      posts.length > 0
        ? new Date(
            Math.max(
              ...posts.map((post) => new Date(post.updated_at).getTime())
            )
          )
        : new Date()

    // Individual blog posts
    const blogPosts = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8, // Higher priority for individual posts
    }))

    // Tag pages (only for tags with posts)
    const tagPages = tags
      .filter((tag) => tag.count?.posts && tag.count.posts > 0)
      .map((tag) => ({
        url: `${siteUrl}/blog?tag=${tag.slug}`,
        lastModified: latestPostDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))

    // Blog pagination pages (if there are multiple pages)
    const paginationPages = []
    if (meta?.pagination?.pages && meta.pagination.pages > 1) {
      for (let page = 2; page <= meta.pagination.pages; page++) {
        paginationPages.push({
          url: `${siteUrl}/blog?page=${page}`,
          lastModified: latestPostDate,
          changeFrequency: 'daily' as const,
          priority: Math.max(0.5 - (page - 2) * 0.1, 0.3), // Decreasing priority for later pages
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
        lastModified: latestPostDate,
        changeFrequency: 'daily',
        priority: 0.9, // High priority for main blog page
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
        priority: 0.9,
      },
    ]
  }
}
