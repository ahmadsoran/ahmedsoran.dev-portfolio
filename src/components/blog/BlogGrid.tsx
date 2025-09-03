'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  IconCalendar,
  IconClock,
  IconEye,
  IconArrowRight,
  IconArrowLeft,
} from '@tabler/icons-react'
import { GhostPost, GhostPagination } from '@/lib/ghost'
import { useSearchParams } from 'next/navigation'

interface BlogGridProps {
  posts: GhostPost[]
  pagination: GhostPagination
  currentTag?: string
  searchQuery?: string
}

export default function BlogGrid({
  posts,
  pagination,
  currentTag,
  searchQuery,
}: BlogGridProps) {
  const searchParams = useSearchParams()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    return `/blog?${params.toString()}`
  }

  if (posts.length === 0) {
    return (
      <div className='text-center py-16'>
        <div className='mb-6'>
          <div className='w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4'>
            <IconEye className='w-8 h-8 text-muted-foreground' />
          </div>
          <h3 className='text-xl font-semibold text-foreground mb-2'>
            No posts found
          </h3>
          <p className='text-muted-foreground'>
            {searchQuery
              ? `No posts match your search "${searchQuery}"`
              : currentTag
              ? `No posts found with tag "${currentTag}"`
              : 'No posts available at the moment'}
          </p>
        </div>

        {(searchQuery || currentTag) && (
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200'>
            View all posts
            <IconArrowRight className='w-4 h-4' />
          </Link>
        )}
      </div>
    )
  }

  return (
    <div>
      {/* Results Info */}
      {(searchQuery || currentTag) && (
        <div className='mb-8 p-4 bg-secondary/10 border border-secondary/20 rounded-xl'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-foreground font-medium'>
                {searchQuery && `Search results for "${searchQuery}"`}
                {currentTag && `Posts tagged "${currentTag}"`}
              </p>
              <p className='text-muted-foreground text-sm'>
                {pagination.total} {pagination.total === 1 ? 'post' : 'posts'}{' '}
                found
              </p>
            </div>
            <Link
              href='/blog'
              className='text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-medium'>
              Clear filters
            </Link>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className='group'>
            <Link href={`/blog/${post.slug}`}>
              <div className='bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300'>
                {/* Image */}
                <div className='relative h-48 overflow-hidden'>
                  {post.feature_image ? (
                    <Image
                      src={post.feature_image}
                      alt={post.feature_image_alt || post.title}
                      width={800}
                      height={400}
                      loading='lazy'
                      placeholder='blur'
                      blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/gnrDQAAAABJRU5ErkJggg=='
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                  ) : (
                    <div className='w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center'>
                      <IconEye className='w-8 h-8 text-primary/50' />
                    </div>
                  )}

                  {/* Featured Badge */}
                  {post.featured && (
                    <div className='absolute top-3 left-3'>
                      <span className='bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium'>
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className='p-6'>
                  {/* Meta */}
                  <div className='flex items-center gap-4 text-sm text-muted-foreground mb-3'>
                    <div className='flex items-center gap-1'>
                      <IconCalendar className='w-4 h-4' />
                      {formatDate(post.published_at)}
                    </div>
                    <div className='flex items-center gap-1'>
                      <IconClock className='w-4 h-4' />
                      {post.reading_time} min read
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className='text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2'>
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className='text-muted-foreground mb-4 line-clamp-3'>
                    {post.custom_excerpt || post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className='flex items-center gap-2 mb-4'>
                      {post.tags.slice(0, 2).map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/blog?tag=${tag.slug}`}
                          className='px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 transition-colors duration-200'
                          onClick={(e) => e.stopPropagation()}>
                          {tag.name}
                        </Link>
                      ))}
                      {post.tags.length > 2 && (
                        <span className='text-muted-foreground text-sm'>
                          +{post.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Author & Read More */}
                  <div className='flex items-center justify-between'>
                    {post.primary_author && (
                      <div className='flex items-center gap-2'>
                        {post.primary_author.profile_image ? (
                          <Image
                            src={post.primary_author.profile_image}
                            alt={post.primary_author.name}
                            width={24}
                            height={24}
                            className='rounded-full'
                          />
                        ) : (
                          <div className='w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center'>
                            <span className='text-primary text-xs font-medium'>
                              {post.primary_author.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <span className='text-sm font-medium text-foreground'>
                          {post.primary_author.name}
                        </span>
                      </div>
                    )}

                    <div className='flex items-center gap-1 text-primary font-medium'>
                      <span className='text-sm'>Read more</span>
                      <IconArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-200' />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='flex justify-center items-center gap-2'>
          {/* Previous Button */}
          {pagination.prev && (
            <Link
              href={createPageUrl(pagination.prev)}
              className='flex items-center gap-2 px-4 py-2 bg-card border border-border/50 rounded-lg hover:bg-muted/50 transition-colors duration-200'>
              <IconArrowLeft className='w-4 h-4' />
              Previous
            </Link>
          )}

          {/* Page Numbers */}
          <div className='flex items-center gap-1'>
            {Array.from({ length: pagination.pages }, (_, i) => i + 1)
              .filter((page) => {
                const current = pagination.page
                return (
                  page === 1 ||
                  page === pagination.pages ||
                  (page >= current - 1 && page <= current + 1)
                )
              })
              .map((page, index, array) => (
                <div key={page} className='flex items-center'>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className='px-2 text-muted-foreground'>...</span>
                  )}
                  <Link
                    href={createPageUrl(page)}
                    className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                      page === pagination.page
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border/50 hover:bg-muted/50'
                    }`}>
                    {page}
                  </Link>
                </div>
              ))}
          </div>

          {/* Next Button */}
          {pagination.next && (
            <Link
              href={createPageUrl(pagination.next)}
              className='flex items-center gap-2 px-4 py-2 bg-card border border-border/50 rounded-lg hover:bg-muted/50 transition-colors duration-200'>
              Next
              <IconArrowRight className='w-4 h-4' />
            </Link>
          )}
        </motion.div>
      )}
    </div>
  )
}
