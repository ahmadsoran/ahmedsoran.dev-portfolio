import { Metadata } from 'next'
import BlogHero from '@/components/blog/BlogHero'
import BlogContent from '@/components/blog/BlogContent'
import { getPosts, getFeaturedPosts, getTags } from '@/lib/ghost'

export const metadata: Metadata = {
  title: 'Blog | Ahmed Soran - Insights & Thoughts',
  description:
    'Discover insights, thoughts, and learnings about technology, development, and life.',
  keywords: 'blog, technology, development, programming, insights, thoughts',
  openGraph: {
    title: 'Blog | Ahmed Soran',
    description:
      'Discover insights, thoughts, and learnings about technology, development, and life.',
    type: 'website',
    images: [
      {
        url: 'https://ahmedsoran.dev/ahmedweb-desktop.png',
        width: 1200,
        height: 630,
        alt: 'Blog | Ahmed Soran',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Ahmed Soran',
    description:
      'Discover insights, thoughts, and learnings about technology, development, and life.',
    images: [
      {
        url: 'https://ahmedsoran.dev/ahmedweb-desktop.png',
        width: 1200,
        height: 630,
        alt: 'Blog | Ahmed Soran',
      },
    ],
  },
}

interface BlogPageProps {
  searchParams: Promise<{
    page?: string
    tag?: string
    search?: string
  }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const searchParamsValue = await searchParams
  const page = parseInt(searchParamsValue.page || '1')
  const tag = searchParamsValue.tag
  const search = searchParamsValue.search

  try {
    // Fetch data with Next.js caching
    const [postsResponse, featuredPosts, tags] = await Promise.all([
      getPosts({
        page,
        limit: 12,
        filter: tag ? `tag:${tag}` : undefined,
      }),
      getFeaturedPosts(6),
      getTags(),
    ])

    const { posts, meta } = postsResponse

    return (
      <div className='pt-[65px]'>
        <BlogHero searchParams={searchParamsValue} />
        <BlogContent
          posts={posts}
          featuredPosts={featuredPosts}
          tags={tags}
          pagination={meta.pagination}
          currentTag={tag}
          searchQuery={search}
          page={page}
        />
      </div>
    )
  } catch (error) {
    console.error('Error loading blog page:', error)

    return (
      <div className='container mx-auto px-6 py-12 text-center'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
          Unable to load blog posts
        </h1>
        <p className='text-gray-600 dark:text-gray-400'>
          Please check your Ghost CMS connection and try again later.
        </p>
      </div>
    )
  }
}

// Enable Next.js ISR (Incremental Static Regeneration)
export const revalidate = 43200 // Revalidate every 12 hours (43200 seconds)
