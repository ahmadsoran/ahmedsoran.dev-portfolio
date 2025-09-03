'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { IconArticle, IconArrowRight } from '@tabler/icons-react'
import { GhostPost } from '@/lib/ghost'
import BlogCard from '@/components/blog/BlogCard'

interface RecentBlogsSectionProps {
  posts: GhostPost[]
}

export default function RecentBlogsSection({ posts }: RecentBlogsSectionProps) {
  if (posts.length === 0) {
    return null
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
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id='recent-blogs'
      className='py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-stone-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 scroll-mt-[50px]'>
      <div className='container mx-auto max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-20'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full mb-6'>
            <IconArticle size={32} className='text-white' />
          </div>
          <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6'>
            Recent Blog Posts
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'>
            Latest thoughts, tutorials, and insights from my development journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {posts.slice(0, 6).map((post, index) => (
            <motion.div key={post.id} variants={itemVariants}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='text-center'>
          <Link
            href='/blog'
            className='inline-flex items-center gap-3 bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 group'>
            View All Posts
            <IconArrowRight className='w-5 h-5 transition-transform duration-200 group-hover:translate-x-1' />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
