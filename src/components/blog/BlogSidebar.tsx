'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  IconTag,
  IconTrendingUp,
  IconCalendar,
  IconClock,
} from '@tabler/icons-react'
import { GhostPost, GhostTag } from '@/lib/ghost'

interface BlogSidebarProps {
  tags: GhostTag[]
  featuredPosts: GhostPost[]
  currentTag?: string
}

export default function BlogSidebar({
  tags,
  featuredPosts,
  currentTag,
}: BlogSidebarProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const popularTags = tags
    .filter((tag) => tag.count && tag.count.posts > 0)
    .sort((a, b) => (b.count?.posts || 0) - (a.count?.posts || 0))
    .slice(0, 10)

  return (
    <div className='space-y-8'>
      {/* Popular Tags */}
      {popularTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='bg-card border border-border/50 rounded-xl p-6'>
          <div className='flex items-center gap-2 mb-4'>
            <IconTag className='w-5 h-5 text-primary' />
            <h3 className='text-lg font-semibold text-foreground'>
              Popular Tags
            </h3>
          </div>

          <div className='flex flex-wrap gap-2'>
            {popularTags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog?tag=${tag.slug}`}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentTag === tag.slug
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:scale-105'
                }`}>
                <span>{tag.name}</span>
                {tag.count && (
                  <span className='text-xs opacity-70'>
                    ({tag.count.posts})
                  </span>
                )}
              </Link>
            ))}
          </div>

          {currentTag && (
            <div className='mt-4 pt-4 border-t border-border/50'>
              <Link
                href='/blog'
                className='text-sm text-primary hover:text-primary/80 transition-colors duration-200'>
                Clear filter →
              </Link>
            </div>
          )}
        </motion.div>
      )}

      {/* Trending Posts */}
      {featuredPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className='bg-card border border-border/50 rounded-xl p-6'>
          <div className='flex items-center gap-2 mb-4'>
            <IconTrendingUp className='w-5 h-5 text-primary' />
            <h3 className='text-lg font-semibold text-foreground'>Trending</h3>
          </div>

          <div className='space-y-4'>
            {featuredPosts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className='group flex items-start gap-3 p-3 -m-3 rounded-lg hover:bg-muted/30 transition-colors duration-200'>
                  {/* Ranking Number */}
                  <div className='flex-shrink-0 w-6 h-6 bg-primary/10 text-primary text-sm font-bold rounded-full flex items-center justify-center mt-0.5'>
                    {index + 1}
                  </div>

                  {/* Image */}
                  <div className='relative w-16 h-12 flex-shrink-0 overflow-hidden rounded-lg'>
                    {post.feature_image ? (
                      <Image
                        src={post.feature_image}
                        alt={post.feature_image_alt || post.title}
                        width={64}
                        height={64}
                        loading='lazy'
                        placeholder='blur'
                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/gnrDQAAAABJRU5ErkJggg=='
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                    ) : (
                      <div className='w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20' />
                    )}
                  </div>

                  {/* Content */}
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 text-sm leading-snug'>
                      {post.title}
                    </h4>

                    <div className='flex items-center gap-2 mt-1 text-xs text-muted-foreground'>
                      <IconCalendar className='w-3 h-3' />
                      <span>{formatDate(post.published_at)}</span>
                      <span>•</span>
                      <IconClock className='w-3 h-3' />
                      <span>{post.reading_time} min</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='bg-gradient-to-br from-primary/5 to-secondary/10 border border-primary/20 rounded-xl p-6'>
        <h3 className='text-lg font-semibold text-foreground mb-2'>
          Stay Updated
        </h3>
        <p className='text-sm text-muted-foreground mb-4'>
          Get notified when I publish new articles and insights.
        </p>

        <form className='space-y-3' onSubmit={(e) => e.preventDefault()}>
          <input
            type='email'
            placeholder='Your email address'
            className='w-full px-3 py-2 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 text-sm'
          />
          <button
            type='submit'
            className='w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm font-medium'>
            Subscribe
          </button>
        </form>

        <p className='text-xs text-muted-foreground mt-3 text-center'>
          No spam, unsubscribe at any time.
        </p>
      </motion.div>

      {/* Archive Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className='bg-card border border-border/50 rounded-xl p-6'>
        <h3 className='text-lg font-semibold text-foreground mb-4'>Archive</h3>

        <div className='space-y-2'>
          {Array.from({ length: 6 }, (_, i) => {
            const date = new Date()
            date.setMonth(date.getMonth() - i)
            const monthYear = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })

            return (
              <Link
                key={monthYear}
                href={`/blog?archive=${date.getFullYear()}-${String(
                  date.getMonth() + 1
                ).padStart(2, '0')}`}
                className='block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200'>
                {monthYear}
              </Link>
            )
          })}
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className='bg-card border border-border/50 rounded-xl p-6'>
        <h3 className='text-lg font-semibold text-foreground mb-4'>Connect</h3>

        <div className='space-y-3'>
          <a
            href='/rss.xml'
            className='flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200'>
            <div className='w-8 h-8 bg-orange-500/10 text-orange-500 rounded-lg flex items-center justify-center'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M3.429 2.571c0-.952.773-1.714 1.714-1.714C6.095.857 6.857 1.62 6.857 2.57c0 .952-.762 1.715-1.714 1.715-.94 0-1.714-.763-1.714-1.715z' />
                <path d='M3.429 7.429v1.714c2.286 0 4.571 1.714 4.571 4.571h1.714c0-3.429-2.857-6.286-6.286-6.286z' />
                <path d='M3.429 10.857v1.714c1.143 0 2.286 1.143 2.286 2.286h1.714c0-2.286-1.714-4-4-4z' />
              </svg>
            </div>
            RSS Feed
          </a>

          <a
            href='https://twitter.com/ahmadmajid'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200'>
            <div className='w-8 h-8 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84' />
              </svg>
            </div>
            Follow on Twitter
          </a>

          <a
            href='https://github.com/ahmadmajid'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200'>
            <div className='w-8 h-8 bg-gray-500/10 text-gray-500 rounded-lg flex items-center justify-center'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            GitHub
          </a>
        </div>
      </motion.div>
    </div>
  )
}
