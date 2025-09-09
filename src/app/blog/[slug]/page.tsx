import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/blog/BlogPostContent'
import { getPostBySlug, getPosts } from '@/lib/ghost'

// Revalidate every 3 hours
export const revalidate = 10800 // Revalidate every 3 hours (10800 seconds)

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
      return {
        title: 'Blog Post Not Found | Ahmed Soran',
        description:
          'The requested blog post could not be found. Browse other articles on full-stack development, JavaScript, TypeScript, Node.js, React, Next.js, and Go programming.',
        robots: {
          index: false,
          follow: true,
        },
        alternates: {
          canonical: 'https://ahmedsoran.dev/blog',
        },
      }
    }

    return {
      title: `${post.title} | Ahmed Soran Blog`,
      description:
        post.custom_excerpt ||
        post.excerpt ||
        `Read "${post.title}" - Expert insights on full-stack development, JavaScript, TypeScript, Node.js, React, Next.js, Go programming from Ahmed Soran.`,
      keywords: [
        ...(post.tags?.map((tag) => tag.name) || []),
        'Ahmed Soran',
        'Full-stack development',
        'JavaScript',
        'TypeScript',
        'Node.js',
        'React',
        'Next.js',
        'Go programming',
        'Web development',
        'Software engineering',
        'Programming tutorial',
        'Tech article',
        'Developer insights',
        'Kurdistan developer',
        'Backend development',
        'Frontend development',
        post.title.split(' ').filter((word) => word.length > 3), // Extract meaningful words from title
      ].flat(),
      authors: [
        {
          name: post.primary_author?.name || 'Ahmed Soran',
          url: 'https://ahmedsoran.dev',
        },
      ],
      creator: post.primary_author?.name || 'Ahmed Soran',
      publisher: 'Ahmed Soran',
      category: 'Technology',
      classification: 'Article',
      openGraph: {
        title: post.title,
        description: post.custom_excerpt || post.excerpt || '',
        url: `https://ahmedsoran.dev/blog/${slug}`,
        siteName: 'Ahmed Soran Blog',
        locale: 'en_US',
        type: 'article',
        publishedTime: post.published_at,
        modifiedTime: post.updated_at,
        authors: post.primary_author
          ? [post.primary_author.name]
          : ['Ahmed Soran'],
        tags: post.tags?.map((tag) => tag.name) || [],
        section: 'Technology',
        images: post.feature_image
          ? [
              {
                url: post.feature_image,
                width: 1200,
                height: 630,
                alt: post.feature_image_alt || post.title,
                type: 'image/jpeg',
              },
            ]
          : [
              {
                url: 'https://ahmedsoran.dev/ahmedweb-desktop.png',
                width: 1200,
                height: 630,
                alt: `${post.title} - Ahmed Soran Blog`,
                type: 'image/png',
              },
            ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@ahmedsoran_dev',
        creator: '@ahmedsoran_dev',
        title: post.title,
        description: post.custom_excerpt || post.excerpt || '',
        images: post.feature_image
          ? [
              {
                url: post.feature_image,
                width: 1200,
                height: 630,
                alt: post.feature_image_alt || post.title,
              },
            ]
          : [
              {
                url: 'https://ahmedsoran.dev/ahmedweb-desktop.png',
                width: 1200,
                height: 630,
                alt: `${post.title} - Ahmed Soran Blog`,
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
        canonical: `https://ahmedsoran.dev/blog/${slug}`,
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
        'article:published_time': post.published_at,
        'article:modified_time': post.updated_at,
        'article:author': post.primary_author?.name || 'Ahmed Soran',
        'article:section': 'Technology',
        'article:tag': post.tags?.map((tag) => tag.name).join(', ') || '',
        'revisit-after': '7 days',
        distribution: 'global',
        rating: 'general',
        language: 'en',
        'geo.region': 'IQ-KU',
        'geo.placename': 'Kurdistan Region, Iraq',
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Ahmed Soran Blog - Technical Insights',
      description:
        'Expert insights on full-stack development, JavaScript, TypeScript, Node.js, React, Next.js, Go programming, and modern web development from Ahmed Soran.',
      robots: {
        index: false,
        follow: true,
      },
      alternates: {
        canonical: 'https://ahmedsoran.dev/blog',
      },
    }
  }
}

export async function generateStaticParams() {
  try {
    // Get more posts for better static generation
    const { posts } = await getPosts({ limit: 1000 })

    // Filter published posts and sort by publication date (newest first)
    const publishedPosts = posts
      .filter((post) => post.published_at)
      .sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
      )

    return publishedPosts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
      notFound()
    }

    // Generate JSON-LD structured data for the blog post
    const blogPostStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `https://ahmedsoran.dev/blog/${slug}`,
      headline: post.title,
      description: post.custom_excerpt || post.excerpt || '',
      url: `https://ahmedsoran.dev/blog/${slug}`,
      datePublished: post.published_at,
      dateModified: post.updated_at,
      wordCount: post.reading_time
        ? Math.round(post.reading_time * 200)
        : undefined, // Estimate based on reading time
      timeRequired: post.reading_time ? `PT${post.reading_time}M` : undefined,
      articleBody: post.html?.replace(/<[^>]*>/g, '').substring(0, 500) + '...', // Plain text excerpt
      author: {
        '@type': 'Person',
        '@id': 'https://ahmedsoran.dev#person',
        name: post.primary_author?.name || 'Ahmed Soran',
        url: 'https://ahmedsoran.dev',
        jobTitle: 'Full-Stack Developer',
        image:
          post.primary_author?.profile_image ||
          'https://ahmedsoran.dev/ahmedweb-desktop.png',
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
        logo: {
          '@type': 'ImageObject',
          url: 'https://ahmedsoran.dev/ahmedweb-desktop.png',
          width: 400,
          height: 400,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://ahmedsoran.dev/blog/${slug}`,
      },
      image: post.feature_image
        ? {
            '@type': 'ImageObject',
            url: post.feature_image,
            width: 1200,
            height: 630,
            caption: post.feature_image_caption || post.title,
            author: post.primary_author?.name || 'Ahmed Soran',
          }
        : {
            '@type': 'ImageObject',
            url: 'https://ahmedsoran.dev/ahmedweb-desktop.png',
            width: 1200,
            height: 630,
            caption: post.title,
          },
      keywords: [
        ...(post.tags?.map((tag) => tag.name) || []),
        'JavaScript',
        'TypeScript',
        'Full-stack development',
        'Web development',
        'Programming',
        'Ahmed Soran',
      ],
      about:
        post.tags?.map((tag) => ({
          '@type': 'Thing',
          name: tag.name,
          url: `https://ahmedsoran.dev/blog?tag=${tag.slug}`,
        })) || [],
      isPartOf: {
        '@type': 'Blog',
        '@id': 'https://ahmedsoran.dev/blog',
        name: 'Ahmed Soran Technical Blog',
        url: 'https://ahmedsoran.dev/blog',
      },
      inLanguage: 'en-US',
      isFamilyFriendly: true,
      genre: 'Technology',
      educationalLevel: 'Intermediate',
    }

    // Breadcrumb structured data for the blog post
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
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `https://ahmedsoran.dev/blog/${slug}`,
        },
      ],
    }

    // FAQ structured data if the post contains questions
    const faqStructuredData = post.html?.includes('?')
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: `What is ${post.title} about?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: post.custom_excerpt || post.excerpt || post.title,
              },
            },
          ],
        }
      : null

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type='application/ld+json'
          defer
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogPostStructuredData),
          }}
        />
        <script
          type='application/ld+json'
          defer
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData),
          }}
        />
        {faqStructuredData && (
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqStructuredData),
            }}
          />
        )}

        <BlogPostContent post={post} />
      </>
    )
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }
}
