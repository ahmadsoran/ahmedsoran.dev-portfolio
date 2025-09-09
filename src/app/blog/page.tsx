import { Metadata } from 'next'
import BlogHero from '@/components/blog/BlogHero'
import BlogContent from '@/components/blog/BlogContent'
import { getPosts, getFeaturedPosts, getTags } from '@/lib/ghost'

interface BlogPageProps {
  searchParams: Promise<{
    page?: string
    tag?: string
    search?: string
  }>
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const searchParamsValue = await searchParams
  const page = parseInt(searchParamsValue.page || '1')
  const tag = searchParamsValue.tag
  const search = searchParamsValue.search

  // Build dynamic title and description based on search params
  let title = 'Technical Blog | Ahmed Soran - Full-Stack Development Insights'
  let description =
    'Explore expert insights on JavaScript, TypeScript, Node.js, React, Next.js, Go programming, and modern web development from Ahmed Soran. Learn about building scalable applications, best practices, and cutting-edge technologies.'
  let canonical = 'https://ahmedsoran.dev/blog'

  if (tag) {
    title = `${
      tag.charAt(0).toUpperCase() + tag.slice(1)
    } Articles | Ahmed Soran Blog`
    description = `Browse all articles tagged with "${tag}" on Ahmed Soran's technical blog. Expert insights on ${tag} and related technologies.`
    canonical = `https://ahmedsoran.dev/blog?tag=${tag}`
  }

  if (search) {
    title = `Search Results: "${search}" | Ahmed Soran Blog`
    description = `Search results for "${search}" on Ahmed Soran's technical blog. Find articles about ${search} and related technologies.`
    canonical = `https://ahmedsoran.dev/blog?search=${encodeURIComponent(
      search
    )}`
  }

  if (page > 1) {
    title = `${title} - Page ${page}`
    description = `${description} - Page ${page}`
    if (tag) {
      canonical = `https://ahmedsoran.dev/blog?tag=${tag}&page=${page}`
    } else if (search) {
      canonical = `https://ahmedsoran.dev/blog?search=${encodeURIComponent(
        search
      )}&page=${page}`
    } else {
      canonical = `https://ahmedsoran.dev/blog?page=${page}`
    }
  }

  return {
    title,
    description,
    keywords: [
      'Ahmed Soran blog',
      'Full-stack development blog',
      'JavaScript tutorials',
      'TypeScript guides',
      'Node.js articles',
      'React development',
      'Next.js tutorials',
      'Go programming',
      'Web development insights',
      'Backend development',
      'Frontend development',
      'Software engineering',
      'Programming tutorials',
      'Tech articles',
      'Developer insights',
      'Kurdistan developer',
      'Middle East tech',
      'Software architecture',
      'Database design',
      'API development',
      'Modern web technologies',
      'Development best practices',
      ...(tag ? [tag, `${tag} tutorials`, `${tag} articles`] : []),
      ...(search ? [search, `${search} tutorials`, `${search} guides`] : []),
    ],
    authors: [{ name: 'Ahmed Soran', url: 'https://ahmedsoran.dev' }],
    creator: 'Ahmed Soran',
    publisher: 'Ahmed Soran',
    category: 'Technology',
    classification: 'Blog',
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: 'Ahmed Soran Portfolio',
      locale: 'en_US',
      images: [
        {
          url: 'https://ahmedsoran.dev/ahmedweb-desktop.png',
          width: 1200,
          height: 630,
          alt: 'Ahmed Soran Blog - Full-Stack Development Insights',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ahmedsoran_dev',
      creator: '@ahmedsoran_dev',
      title,
      description,
      images: [
        {
          url: 'https://ahmedsoran.dev/ahmedweb-desktop.png',
          width: 1200,
          height: 630,
          alt: 'Ahmed Soran Blog - Full-Stack Development Insights',
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      noarchive: false,
      nosnippet: false,
      noimageindex: false,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical,
      types: {
        'application/rss+xml': [
          {
            url: 'https://ahmedsoran.dev/rss.xml',
            title: 'Ahmed Soran Blog RSS Feed',
          },
        ],
      },
    },
    other: {
      'revisit-after': '7 days',
      distribution: 'global',
      rating: 'general',
      language: 'en',
      'geo.region': 'IQ-KU',
      'geo.placename': 'Kurdistan Region, Iraq',
      googlebot: 'index, follow',
      bingbot: 'index, follow',
      slurp: 'index, follow',
    },
  }
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
        search: search,
      }),
      getFeaturedPosts(6),
      getTags(),
    ])

    const { posts, meta } = postsResponse

    // JSON-LD structured data for blog page
    const blogStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': 'https://ahmedsoran.dev/blog',
      name: 'Ahmed Soran Technical Blog',
      description:
        'Expert insights on full-stack development, JavaScript, TypeScript, Node.js, React, Next.js, Go programming, and modern web development.',
      url: 'https://ahmedsoran.dev/blog',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://ahmedsoran.dev/blog',
      },
      author: {
        '@type': 'Person',
        '@id': 'https://ahmedsoran.dev#person',
        name: 'Ahmed Soran',
        url: 'https://ahmedsoran.dev',
        jobTitle: 'Full-Stack Developer',
        worksFor: {
          '@type': 'Organization',
          name: 'Freelance',
        },
        sameAs: [
          'https://linkedin.com/in/ahmad-majid-soran',
          'https://github.com/ahmadsoran',
          'https://twitter.com/ahmedsoran_dev',
        ],
      },
      publisher: {
        '@type': 'Person',
        '@id': 'https://ahmedsoran.dev#person',
        name: 'Ahmed Soran',
        url: 'https://ahmedsoran.dev',
      },
      inLanguage: 'en-US',
      keywords: [
        'JavaScript',
        'TypeScript',
        'Node.js',
        'React',
        'Next.js',
        'Go',
        'Full-stack development',
        'Web development',
        'Software engineering',
        'Backend development',
        'Frontend development',
        'Programming tutorials',
      ],
      about: [
        {
          '@type': 'Thing',
          name: 'Web Development',
          sameAs: 'https://en.wikipedia.org/wiki/Web_development',
        },
        {
          '@type': 'Thing',
          name: 'Software Engineering',
          sameAs: 'https://en.wikipedia.org/wiki/Software_engineering',
        },
        {
          '@type': 'Thing',
          name: 'JavaScript',
          sameAs: 'https://en.wikipedia.org/wiki/JavaScript',
        },
      ],
      blogPost: posts
        .slice(0, 5)
        .map((post) => ({
          '@type': 'BlogPosting',
          '@id': `https://ahmedsoran.dev/blog/${post.slug}`,
          headline: post.title,
          description: post.custom_excerpt || post.excerpt,
          url: `https://ahmedsoran.dev/blog/${post.slug}`,
          datePublished: post.published_at,
          dateModified: post.updated_at,
          author: {
            '@type': 'Person',
            '@id': 'https://ahmedsoran.dev#person',
            name: post.primary_author?.name || 'Ahmed Soran',
          },
          image: post.feature_image
            ? {
                '@type': 'ImageObject',
                url: post.feature_image,
                width: 800,
                height: 600,
              }
            : undefined,
        }))
        .filter(Boolean),
    }

    // Breadcrumb structured data
    const breadcrumbStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://ahmedsoran.dev',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://ahmedsoran.dev/blog',
        },
      ],
    }

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type='application/ld+json'
          defer
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogStructuredData),
          }}
        />
        <script
          type='application/ld+json'
          defer
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData),
          }}
        />

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
      </>
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
export const revalidate = 10800 // Revalidate every 3 hours (10800 seconds)
