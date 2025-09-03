'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, CardHeader, Button } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import {
  IconCalendar,
  IconClock,
  IconStar,
  IconTag,
  IconArrowRight,
  IconArrowLeft,
  IconEye,
  IconTrendingUp,
} from '@tabler/icons-react'
import { GhostPost, GhostPagination, GhostTag } from '@/lib/ghost'
import { useRouter, useSearchParams } from 'next/navigation'

interface BlogContentProps {
  posts: GhostPost[]
  featuredPosts: GhostPost[]
  tags: GhostTag[]
  pagination: GhostPagination
  currentTag?: string
  searchQuery?: string
  page: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export default function BlogContent({
  posts,
  featuredPosts,
  tags,
  pagination,
  currentTag,
  searchQuery,
  page,
}: BlogContentProps) {
  const router = useRouter()
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

  const popularTags = tags
    .filter((tag) => tag.count && tag.count.posts > 0)
    .sort((a, b) => (b.count?.posts || 0) - (a.count?.posts || 0))
    .slice(0, 8)

  return (
    <div className='bg-white dark:bg-gray-900 relative'>
      <div className='container mx-auto px-6 py-16'>
        {/* Featured Posts Section */}
        {page === 1 &&
          !currentTag &&
          !searchQuery &&
          featuredPosts.length > 0 && (
            <motion.section
              id='featured'
              className='mb-20'
              variants={containerVariants}
              initial='hidden'
              animate='visible'>
              <motion.div variants={itemVariants} className='text-center mb-12'>
                <div className='inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-4'>
                  <IconStar className='w-4 h-4 text-yellow-500' />
                  <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Featured Posts
                  </span>
                </div>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white'>
                  Must-Read Articles
                </h2>
              </motion.div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {featuredPosts.slice(0, 3).map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <Link href={`/blog/${post.slug}`}>
                      <div className='group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden h-full flex flex-col'>
                        {/* Image Section */}
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
                              // priority={index < 3} // Priority load for first 3 images
                              onError={(e) => {
                                console.warn(
                                  'Failed to load featured image:',
                                  post.feature_image
                                )
                                // Hide the image container on error
                                const target = e.target as HTMLImageElement
                                const container = target.closest('.relative')
                                if (container) {
                                  container.innerHTML = `
                                      <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                        <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                      </div>
                                    `
                                }
                              }}
                            />
                          ) : (
                            <div className='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center'>
                              <IconStar className='w-12 h-12 text-gray-400 dark:text-gray-500' />
                            </div>
                          )}
                          <div className='absolute top-3 left-3'>
                            <span className='bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium'>
                              Featured
                            </span>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className='p-6 flex flex-col flex-grow'>
                          <div className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3'>
                            <div className='flex items-center gap-1'>
                              <IconCalendar className='w-4 h-4' />
                              {formatDate(post.published_at)}
                            </div>
                            <div className='flex items-center gap-1'>
                              <IconClock className='w-4 h-4' />
                              {post.reading_time} min
                            </div>
                          </div>
                          <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors line-clamp-2'>
                            {post.title}
                          </h3>
                          <p className='text-gray-600 dark:text-gray-400 line-clamp-3 mb-4'>
                            {post.custom_excerpt || post.excerpt}
                          </p>
                          {post.primary_tag && (
                            <div className='mb-4'>
                              <span className='inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm'>
                                {post.primary_tag.name}
                              </span>
                            </div>
                          )}
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
                                    onError={(e) => {
                                      // Replace with initials fallback on error
                                      const target =
                                        e.target as HTMLImageElement
                                      const container = target.parentElement
                                      if (container && post.primary_author) {
                                        container.innerHTML = `
                                          <div class="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                            <span class="text-gray-600 dark:text-gray-400 text-xs font-medium">
                                              ${post.primary_author.name.charAt(
                                                0
                                              )}
                                            </span>
                                          </div>
                                        `
                                      }
                                    }}
                                  />
                                ) : (
                                  <div className='w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center'>
                                    <span className='text-gray-600 dark:text-gray-400 text-xs font-medium'>
                                      {post.primary_author.name.charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                  {post.primary_author.name}
                                </span>
                              </div>
                            )}
                            <IconArrowRight className='w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all' />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-12'>
          {/* Main Content */}
          <div className='lg:col-span-3'>
            {/* Results Info */}
            {(searchQuery || currentTag) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-8 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium text-gray-900 dark:text-white'>
                      {searchQuery && `Search results for "${searchQuery}"`}
                      {currentTag && `Posts tagged "${currentTag}"`}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {pagination.total}{' '}
                      {pagination.total === 1 ? 'post' : 'posts'} found
                    </p>
                  </div>
                  <Button
                    variant='light'
                    size='sm'
                    onPress={() => router.push('/blog')}
                    className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'>
                    Clear filters
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Posts Grid */}
            <motion.div
              variants={containerVariants}
              initial='hidden'
              animate='visible'>
              {posts.length === 0 ? (
                <motion.div
                  variants={itemVariants}
                  className='text-center py-16'>
                  <div className='w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6'>
                    <IconEye className='w-8 h-8 text-gray-400 dark:text-gray-500' />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                    No posts found
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 mb-6'>
                    {searchQuery
                      ? `No posts match your search "${searchQuery}"`
                      : currentTag
                      ? `No posts found with tag "${currentTag}"`
                      : 'No posts available at the moment'}
                  </p>
                  {(searchQuery || currentTag) && (
                    <Button
                      color='primary'
                      onPress={() => router.push('/blog')}
                      startContent={<IconArrowRight className='w-4 h-4' />}>
                      View all posts
                    </Button>
                  )}
                </motion.div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
                  {posts.map((post) => (
                    <motion.article key={post.id} variants={itemVariants}>
                      <Link href={`/blog/${post.slug}`}>
                        <div className='group hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden h-full flex flex-col'>
                          {/* Image Section */}
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
                                // priority={index < 2} // Priority for first 2 images
                                onError={(e) => {
                                  console.warn(
                                    'Failed to load post image:',
                                    post.feature_image
                                  )
                                  // Replace with fallback on error
                                  const target = e.target as HTMLImageElement
                                  const container = target.closest('.relative')
                                  if (container) {
                                    container.innerHTML = `
                                      <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                        <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                      </div>
                                    `
                                  }
                                }}
                              />
                            ) : (
                              <div className='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center'>
                                <IconEye className='w-8 h-8 text-gray-400 dark:text-gray-500' />
                              </div>
                            )}
                            {post.featured && (
                              <div className='absolute top-3 left-3'>
                                <span className='bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium'>
                                  Featured
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Content Section */}
                          <div className='p-6 flex flex-col flex-grow'>
                            <div className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3'>
                              <div className='flex items-center gap-1'>
                                <IconCalendar className='w-4 h-4' />
                                {formatDate(post.published_at)}
                              </div>
                              <div className='flex items-center gap-1'>
                                <IconClock className='w-4 h-4' />
                                {post.reading_time} min
                              </div>
                            </div>
                            <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors line-clamp-2'>
                              {post.title}
                            </h2>
                            <p className='text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow'>
                              {post.custom_excerpt || post.excerpt}
                            </p>
                            {post.tags && post.tags.length > 0 && (
                              <div className='flex flex-wrap gap-2 mb-4'>
                                {post.tags.slice(0, 2).map((tag) => (
                                  <span
                                    key={tag.id}
                                    className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm'>
                                    {tag.name}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className='flex items-center justify-between mt-auto'>
                              {post.primary_author && (
                                <div className='flex items-center gap-2'>
                                  {post.primary_author.profile_image ? (
                                    <Image
                                      src={post.primary_author.profile_image}
                                      alt={post.primary_author.name}
                                      width={24}
                                      height={24}
                                      className='rounded-full'
                                      onError={(e) => {
                                        // Replace with initials fallback on error
                                        const target =
                                          e.target as HTMLImageElement
                                        const container = target.parentElement
                                        if (container && post.primary_author) {
                                          container.innerHTML = `
                                            <div class="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                              <span class="text-gray-600 dark:text-gray-400 text-xs font-medium">
                                                ${post.primary_author.name.charAt(
                                                  0
                                                )}
                                              </span>
                                            </div>
                                          `
                                        }
                                      }}
                                    />
                                  ) : (
                                    <div className='w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center'>
                                      <span className='text-gray-600 dark:text-gray-400 text-xs font-medium'>
                                        {post.primary_author.name.charAt(0)}
                                      </span>
                                    </div>
                                  )}
                                  <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    {post.primary_author.name}
                                  </span>
                                </div>
                              )}
                              <IconArrowRight className='w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all' />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className='flex justify-center items-center gap-2'>
                {pagination.prev && (
                  <Button
                    as={Link}
                    href={createPageUrl(pagination.prev)}
                    variant='bordered'
                    startContent={<IconArrowLeft className='w-4 h-4' />}
                    className='border-gray-300 dark:border-gray-600'>
                    Previous
                  </Button>
                )}

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
                    .map((pageNum, index, array) => (
                      <div key={pageNum} className='flex items-center'>
                        {index > 0 && array[index - 1] !== pageNum - 1 && (
                          <span className='px-2 text-gray-400'>...</span>
                        )}
                        <Button
                          as={Link}
                          href={createPageUrl(pageNum)}
                          variant={
                            pageNum === pagination.page ? 'solid' : 'light'
                          }
                          color={
                            pageNum === pagination.page ? 'primary' : 'default'
                          }
                          className='min-w-10'>
                          {pageNum}
                        </Button>
                      </div>
                    ))}
                </div>

                {pagination.next && (
                  <Button
                    as={Link}
                    href={createPageUrl(pagination.next)}
                    variant='bordered'
                    endContent={<IconArrowRight className='w-4 h-4' />}
                    className='border-gray-300 dark:border-gray-600'>
                    Next
                  </Button>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <div className='sticky top-24 space-y-8'>
              {/* Popular Tags */}
              {popularTags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}>
                  <Card className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'>
                    <CardHeader className='pb-3'>
                      <div className='flex items-center gap-2'>
                        <IconTag className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                          Popular Tags
                        </h3>
                      </div>
                    </CardHeader>
                    <CardBody className='pt-0'>
                      <div className='flex flex-wrap gap-2'>
                        {popularTags.map((tag) => (
                          <Button
                            key={tag.id}
                            as={Link}
                            href={`/blog?tag=${tag.slug}`}
                            size='sm'
                            variant={
                              currentTag === tag.slug ? 'solid' : 'bordered'
                            }
                            color={
                              currentTag === tag.slug ? 'primary' : 'default'
                            }
                            className={`text-xs ${
                              currentTag === tag.slug
                                ? ''
                                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                            }`}>
                            {tag.name}
                            {tag.count && (
                              <span className='text-xs opacity-70 ml-1'>
                                ({tag.count.posts})
                              </span>
                            )}
                          </Button>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              )}

              {/* Trending Posts */}
              {featuredPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}>
                  <Card className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'>
                    <CardHeader className='pb-3'>
                      <div className='flex items-center gap-2'>
                        <IconTrendingUp className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                          Trending
                        </h3>
                      </div>
                    </CardHeader>
                    <CardBody className='pt-0 space-y-4'>
                      {featuredPosts.slice(0, 4).map((post, index) => (
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                          <div className='group flex items-start gap-3 p-2 -m-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
                            <div className='flex-shrink-0 w-6 h-6 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm font-bold rounded-full flex items-center justify-center'>
                              {index + 1}
                            </div>
                            <div className='flex-1 min-w-0'>
                              <h4 className='font-medium text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors line-clamp-2 text-sm'>
                                {post.title}
                              </h4>
                              <div className='flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400'>
                                <span>{formatDate(post.published_at)}</span>
                                <span>•</span>
                                <span>{post.reading_time} min</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </CardBody>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
