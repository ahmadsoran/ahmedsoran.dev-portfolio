'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  IconCalendar,
  IconClock,
  IconStar,
  IconArrowRight,
} from '@tabler/icons-react'
import { GhostPost } from '@/lib/ghost'

interface FeaturedPostsProps {
  posts: GhostPost[]
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  const mainPost = posts[0]
  const sidePosts = posts.slice(1, 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <section id='featured' className='mb-16'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <div className='flex items-center gap-3 mb-8'>
          <IconStar className='w-6 h-6 text-yellow-500' />
          <h2 className='text-2xl lg:text-3xl font-bold text-foreground'>
            Featured Posts
          </h2>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Featured Post */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className='lg:col-span-2'>
            <Link href={`/blog/${mainPost.slug}`}>
              <div className='group relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300'>
                {/* Featured Badge */}
                <div className='absolute top-4 left-4 z-10'>
                  <div className='bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium'>
                    Featured
                  </div>
                </div>

                {/* Image */}
                <div className='relative h-64 lg:h-80 overflow-hidden'>
                  {mainPost.feature_image ? (
                    <Image
                      src={mainPost.feature_image}
                      alt={mainPost.feature_image_alt || mainPost.title}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                  ) : (
                    <div className='w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center'>
                      <IconStar className='w-16 h-16 text-primary/50' />
                    </div>
                  )}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
                </div>

                {/* Content */}
                <div className='p-6 lg:p-8'>
                  <div className='flex items-center gap-4 text-sm text-muted-foreground mb-4'>
                    <div className='flex items-center gap-1'>
                      <IconCalendar className='w-4 h-4' />
                      {formatDate(mainPost.published_at)}
                    </div>
                    <div className='flex items-center gap-1'>
                      <IconClock className='w-4 h-4' />
                      {mainPost.reading_time} min read
                    </div>
                  </div>

                  <h3 className='text-xl lg:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-200'>
                    {mainPost.title}
                  </h3>

                  <p className='text-muted-foreground mb-6 line-clamp-3'>
                    {mainPost.custom_excerpt || mainPost.excerpt}
                  </p>

                  {/* Tags */}
                  {mainPost.tags && mainPost.tags.length > 0 && (
                    <div className='flex items-center gap-2 mb-4'>
                      {mainPost.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag.id}
                          className='px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm'>
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className='flex items-center justify-between'>
                    {/* Author */}
                    {mainPost.primary_author && (
                      <div className='flex items-center gap-3'>
                        {mainPost.primary_author.profile_image ? (
                          <Image
                            src={mainPost.primary_author.profile_image}
                            alt={mainPost.primary_author.name}
                            width={32}
                            height={32}
                            className='rounded-full'
                          />
                        ) : (
                          <div className='w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center'>
                            <span className='text-primary text-sm font-medium'>
                              {mainPost.primary_author.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <span className='text-sm font-medium text-foreground'>
                          {mainPost.primary_author.name}
                        </span>
                      </div>
                    )}

                    <IconArrowRight className='w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-200' />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side Featured Posts */}
          <div className='space-y-6'>
            {sidePosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}>
                <Link href={`/blog/${post.slug}`}>
                  <div className='group bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start gap-4'>
                      {/* Image */}
                      <div className='relative w-20 h-16 flex-shrink-0 overflow-hidden rounded-lg'>
                        {post.feature_image ? (
                          <Image
                            src={post.feature_image}
                            alt={post.feature_image_alt || post.title}
                            fill
                            className='object-cover group-hover:scale-105 transition-transform duration-300'
                          />
                        ) : (
                          <div className='w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center'>
                            <IconStar className='w-6 h-6 text-primary/50' />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-2'>
                          {post.title}
                        </h3>

                        <div className='flex items-center gap-3 text-xs text-muted-foreground mb-2'>
                          <span>{formatDate(post.published_at)}</span>
                          <span>•</span>
                          <span>{post.reading_time} min</span>
                        </div>

                        {/* Primary Tag */}
                        {post.primary_tag && (
                          <span className='inline-block px-2 py-1 bg-secondary/50 text-secondary-foreground rounded text-xs'>
                            {post.primary_tag.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
