import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/ghost'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmedsoran.dev'

  try {
    const { posts } = await getPosts({ limit: 1000 })

    const blogPosts = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))

    return [
      {
        url: siteUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${siteUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      ...blogPosts,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)

    // Return basic sitemap if Ghost fails
    return [
      {
        url: siteUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
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
