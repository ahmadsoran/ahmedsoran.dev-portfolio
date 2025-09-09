import { getPosts, getTags } from '@/lib/ghost'

export async function GET(): Promise<Response> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmedsoran.dev'

  try {
    const [{ posts, meta }, tags] = await Promise.all([
      getPosts({ limit: 1000 }),
      getTags(),
    ])

    const latestPostDate =
      posts.length > 0
        ? new Date(
            Math.max(
              ...posts.map((post) => new Date(post.updated_at).getTime())
            )
          )
        : new Date()

    const blogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Main Blog Page -->
  <url>
    <loc>${siteUrl}/blog</loc>
    <lastmod>${latestPostDate.toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  ${posts
    .map(
      (post) => `
  <!-- Blog Post: ${post.title} -->
  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${
      post.feature_image
        ? `
    <image:image>
      <image:loc>${post.feature_image}</image:loc>
      <image:title>${post.title}</image:title>
      <image:caption>${
        post.custom_excerpt || post.excerpt || ''
      }</image:caption>
    </image:image>`
        : ''
    }
  </url>`
    )
    .join('')}

  ${tags
    .filter((tag) => tag.count?.posts && tag.count.posts > 0)
    .map(
      (tag) => `
  <!-- Tag Page: ${tag.name} -->
  <url>
    <loc>${siteUrl}/blog?tag=${tag.slug}</loc>
    <lastmod>${latestPostDate.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}

  ${
    meta?.pagination?.pages && meta.pagination.pages > 1
      ? Array.from({ length: meta.pagination.pages - 1 }, (_, i) => i + 2)
          .map(
            (page) => `
  <!-- Blog Pagination Page ${page} -->
  <url>
    <loc>${siteUrl}/blog?page=${page}</loc>
    <lastmod>${latestPostDate.toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${Math.max(0.5 - (page - 2) * 0.1, 0.3)}</priority>
  </url>`
          )
          .join('')
      : ''
  }

</urlset>`

    return new Response(blogSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating blog sitemap:', error)

    // Return minimal sitemap on error
    const errorSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`

    return new Response(errorSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes on error
      },
    })
  }
}

export const revalidate = 3600 // Revalidate every hour
