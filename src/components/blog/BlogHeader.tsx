'use client'

import { motion } from 'framer-motion'
import { IconBook, IconRss, IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function BlogHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim())
    } else {
      params.delete('search')
    }

    params.delete('page') // Reset to first page
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 border-b border-border/50'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          className='absolute -top-1/2 -left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl'
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className='absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl'
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className='container mx-auto px-6 py-16 relative z-10'>
        <div className='max-w-4xl mx-auto text-center'>
          {/* Header Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='mb-8'>
            <div className='flex items-center justify-center gap-3 mb-6'>
              <motion.div
                className='p-3 bg-primary/10 rounded-xl border border-primary/20'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <IconBook className='w-8 h-8 text-primary' />
              </motion.div>
            </div>

            <h1 className='text-4xl lg:text-6xl font-bold text-foreground mb-4'>
              <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                Blog
              </span>
            </h1>

            <p className='text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
              Discover insights, thoughts, and learnings about technology,
              development, and life. Stay updated with the latest trends and
              best practices.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='mb-8'>
            <form onSubmit={handleSearch} className='max-w-md mx-auto'>
              <div className='relative'>
                <IconSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                <input
                  type='text'
                  placeholder='Search articles...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200'
                />
              </div>
            </form>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <motion.a
              href='#featured'
              className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors duration-200 font-medium'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <IconBook className='w-4 h-4' />
              Featured Posts
            </motion.a>

            <motion.a
              href='/rss.xml'
              className='inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/90 transition-colors duration-200 font-medium'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <IconRss className='w-4 h-4' />
              RSS Feed
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
