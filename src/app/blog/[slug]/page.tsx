import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/blog/BlogPostContent'
import { getPostBySlug, getPosts } from '@/lib/ghost'

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
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.',
      }
    }

    return {
      title: post.title,
      description:
        post.custom_excerpt ||
        post.excerpt ||
        `Read ${post.title} on Ahmad Majid's blog`,
      openGraph: {
        title: post.title,
        description: post.custom_excerpt || post.excerpt || '',
        images: post.feature_image ? [post.feature_image] : [],
        type: 'article',
        publishedTime: post.published_at,
        authors: post.primary_author ? [post.primary_author.name] : [],
        tags: post.tags?.map((tag) => tag.name) || [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.custom_excerpt || post.excerpt || '',
        images: post.feature_image ? [post.feature_image] : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog Post',
      description: 'Read the latest blog posts from Ahmad Majid',
    }
  }
}

export async function generateStaticParams() {
  try {
    const { posts } = await getPosts({ limit: 100 })
    return posts.map((post) => ({
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

    return <BlogPostContent post={post} />
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }
}
