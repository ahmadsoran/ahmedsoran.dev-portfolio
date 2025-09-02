import { NextResponse } from 'next/server'
import { getPosts } from '@/lib/ghost'

export async function GET() {
  try {
    const { posts } = await getPosts({ limit: 50 })

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmadmajid.dev'
    const buildDate = new Date().toUTCString()

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ahmad Majid - Blog</title>
    <description>Insights, thoughts, and learnings about technology, development, and life.</description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>60</ttl>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${
        post.custom_excerpt || post.excerpt
      }]]></description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      ${
        post.feature_image
          ? `<enclosure url="${post.feature_image}" type="image/jpeg" />`
          : ''
      }
      ${
        post.primary_author
          ? `<author>${post.primary_author.name}</author>`
          : ''
      }
      ${
        post.tags
          ?.map((tag) => `<category><![CDATA[${tag.name}]]></category>`)
          .join('') || ''
      }
    </item>`
      )
      .join('')}
  </channel>
</rss>`

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
}
