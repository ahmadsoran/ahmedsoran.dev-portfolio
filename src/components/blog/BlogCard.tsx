'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  IconCalendar,
  IconClock,
  IconArrowRight,
  IconEye,
} from '@tabler/icons-react'
import { GhostPost } from '@/lib/ghost'

interface BlogCardProps {
  post: GhostPost
  priority?: boolean
}

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <div className='group hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden h-full flex flex-col'>
        {/* Image Section */}
        <div className='relative h-48 overflow-hidden'>
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.feature_image_alt || post.title}
              fill
              className='object-cover group-hover:scale-105 transition-transform duration-300'
              priority={priority}
              onError={(e) => {
                console.warn('Failed to load post image:', post.feature_image)
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
                      const target = e.target as HTMLImageElement
                      const container = target.parentElement
                      if (container && post.primary_author) {
                        container.innerHTML = `
                          <div class="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <span class="text-gray-600 dark:text-gray-400 text-xs font-medium">
                              ${post.primary_author.name.charAt(0)}
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
  )
}
