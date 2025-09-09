'use client'

import { motion } from 'framer-motion'
import { Button } from '@heroui/react'
import { IconSparkles, IconSearch, IconRss } from '@tabler/icons-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

interface BlogHeroProps {
  searchParams: {
    page?: string
    tag?: string
    search?: string
  }
}

export default function BlogHero({ searchParams }: BlogHeroProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(searchParams.search || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim())
    }

    router.push(`/blog?${params.toString()}`)
  }

  return (
    <section className='relative min-h-lvh py-5 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-stone-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className='absolute top-20 left-10 w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full'
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className='absolute top-40 right-20 w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full'
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className='absolute bottom-32 left-1/4 w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full'
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          className='absolute bottom-20 right-1/3 w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full'
        />
      </div>

      <motion.div
        className='container mx-auto px-6 text-center relative z-10'
        variants={containerVariants}
        initial='hidden'
        animate='visible'>
        {/* Icon */}
        <motion.div variants={itemVariants} className='mb-6'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg'>
            <IconSparkles className='w-10 h-10 text-gray-700 dark:text-gray-300' />
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
          <span className='bg-gradient-to-r from-gray-700 to-slate-700 dark:from-gray-100 dark:to-slate-300 bg-clip-text text-transparent'>
            Blog & Insights
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className='text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8'>
          Sharing thoughts on technology, development, and the journey of
          building modern web applications. Discover insights, tutorials, and
          lessons learned from real-world projects.
        </motion.p>

        {/* Search Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSearch}
          className='max-w-lg mx-auto mb-8'>
          <div className='relative'>
            <IconSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
            <input
              type='text'
              placeholder='Search articles...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-400 dark:focus:border-gray-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
            />
          </div>
        </motion.form>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <Button
            size='lg'
            className='bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 font-medium px-8'
            startContent={<IconSparkles className='w-4 h-4' />}
            onPress={() =>
              document
                .getElementById('featured')
                ?.scrollIntoView({ behavior: 'smooth' })
            }>
            Explore Featured
          </Button>

          <Button
            size='lg'
            variant='bordered'
            className='border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 font-medium px-8'
            startContent={<IconRss className='w-4 h-4' />}
            as='a'
            href='/rss.xml'
            target='_blank'>
            RSS Feed
          </Button>
        </motion.div>

        {/* Current Filter Display */}
        {(searchParams.tag || searchParams.search) && (
          <motion.div
            variants={itemVariants}
            className='mt-8 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl inline-block'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              {searchParams.search && `Searching for: "${searchParams.search}"`}
              {searchParams.tag && `Filtered by tag: "${searchParams.tag}"`}
            </p>
            <Button
              size='sm'
              variant='light'
              className='text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mt-2'
              onPress={() => router.push('/blog')}>
              Clear filters
            </Button>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
