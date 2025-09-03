'use client'

import { motion } from 'framer-motion'
import { Button, Card, CardBody } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import {
  IconCalendar,
  IconClock,
  IconArrowLeft,
  IconShare,
} from '@tabler/icons-react'
import { GhostPost } from '@/lib/ghost'

interface BlogPostContentProps {
  post: GhostPost
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className='bg-white dark:bg-gray-900 pt-10'>
      <motion.article
        className='container mx-auto px-6 py-12 max-w-4xl'
        variants={containerVariants}
        initial='hidden'
        animate='visible'>
        {/* Header */}
        <motion.header variants={itemVariants} className='mb-12'>
          {/* Meta Info */}
          <div className='flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6'>
            <div className='flex items-center gap-1'>
              <IconCalendar className='w-4 h-4' />
              {formatDate(post.published_at)}
            </div>
            <div className='flex items-center gap-1'>
              <IconClock className='w-4 h-4' />
              {post.reading_time} min read
            </div>
            {post.featured && (
              <span className='bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium'>
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className='text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight'>
            {post.title}
          </h1>

          {/* Excerpt */}
          {(post.custom_excerpt || post.excerpt) && (
            <p className='text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8'>
              {post.custom_excerpt || post.excerpt}
            </p>
          )}

          {/* Author & Actions */}
          <div className='flex items-center justify-between'>
            {/* Author */}
            {post.primary_author && (
              <div className='flex items-center gap-4'>
                {post.primary_author.profile_image ? (
                  <Image
                    src={post.primary_author.profile_image}
                    alt={post.primary_author.name}
                    width={48}
                    height={48}
                    className='rounded-full'
                  />
                ) : (
                  <div className='w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center'>
                    <span className='text-gray-600 dark:text-gray-400 text-lg font-medium'>
                      {post.primary_author.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className='font-semibold text-gray-900 dark:text-white'>
                    {post.primary_author.name}
                  </p>
                  {post.primary_author.bio && (
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {post.primary_author.bio}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className='flex items-center gap-2'>
              <Button
                isIconOnly
                variant='bordered'
                size='sm'
                onPress={handleShare}
                className='border-gray-300 dark:border-gray-600'
                title='Share this post'>
                <IconShare className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Feature Image */}
        {post.feature_image && (
          <motion.div variants={itemVariants} className='mb-12'>
            <div className='relative aspect-video overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700'>
              <Image
                src={post.feature_image}
                alt={post.feature_image_alt || post.title}
                width={800}
                height={400}
                loading='lazy'
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/gnrDQAAAABJRU5ErkJggg=='
                className='object-cover w-full h-full'
              />
            </div>
            {post.feature_image_caption && (
              <p className='text-sm text-gray-500 dark:text-gray-400 text-center mt-4 italic'>
                {post.feature_image_caption}
              </p>
            )}
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          variants={itemVariants}
          className='prose prose-lg prose-gray dark:prose-invert max-w-none mb-12'
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div variants={itemVariants} className='mb-12'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Tags
            </h3>
            <div className='flex flex-wrap gap-3'>
              {post.tags.map((tag) => (
                <Button
                  key={tag.id}
                  as={Link}
                  href={`/blog?tag=${tag.slug}`}
                  variant='bordered'
                  size='sm'
                  className='border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'>
                  {tag.name}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Author Bio */}
        {post.primary_author && post.primary_author.bio && (
          <motion.div variants={itemVariants} className='mb-12'>
            <Card className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'>
              <CardBody className='p-6'>
                <div className='flex items-start gap-4'>
                  {post.primary_author.profile_image ? (
                    <Image
                      src={post.primary_author.profile_image}
                      alt={post.primary_author.name}
                      width={64}
                      height={64}
                      className='rounded-full'
                    />
                  ) : (
                    <div className='w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center'>
                      <span className='text-gray-600 dark:text-gray-400 text-xl font-medium'>
                        {post.primary_author.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                      About {post.primary_author.name}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-400 mb-4'>
                      {post.primary_author.bio}
                    </p>

                    {/* Social Links */}
                    <div className='flex items-center gap-4'>
                      {post.primary_author.website && (
                        <Button
                          as='a'
                          href={post.primary_author.website}
                          target='_blank'
                          rel='noopener noreferrer'
                          variant='light'
                          size='sm'
                          className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-0 h-auto min-w-0'>
                          Website
                        </Button>
                      )}
                      {post.primary_author.twitter && (
                        <Button
                          as='a'
                          href={`https://twitter.com/${post.primary_author.twitter.replace(
                            '@',
                            ''
                          )}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          variant='light'
                          size='sm'
                          className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-0 h-auto min-w-0'>
                          Twitter
                        </Button>
                      )}
                      {post.primary_author.facebook && (
                        <Button
                          as='a'
                          href={`https://facebook.com/${post.primary_author.facebook}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          variant='light'
                          size='sm'
                          className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-0 h-auto min-w-0'>
                          Facebook
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div variants={itemVariants} className='text-center'>
          <Button
            as={Link}
            href='/blog'
            color='primary'
            size='lg'
            startContent={<IconArrowLeft className='w-4 h-4' />}
            className='px-8'>
            Back to All Posts
          </Button>
        </motion.div>
      </motion.article>
    </div>
  )
}
