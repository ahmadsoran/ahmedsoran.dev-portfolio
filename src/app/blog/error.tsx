'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { IconAlertTriangle, IconRefresh, IconHome } from '@tabler/icons-react'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function BlogError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Blog page error:', error)
  }, [error])

  return (
    <div className='container mx-auto px-6 py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-lg mx-auto text-center'>
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className='inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-8'>
          <IconAlertTriangle
            size={40}
            className='text-red-600 dark:text-red-400'
          />
        </motion.div>

        {/* Error Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
          Oops! Something went wrong
        </motion.h1>

        {/* Error Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='text-gray-600 dark:text-gray-400 mb-8 leading-relaxed'>
          We encountered an error while loading the blog posts. This could be
          due to a connection issue with our content management system.
        </motion.p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8 text-left'>
            <h3 className='text-sm font-semibold text-red-800 dark:text-red-400 mb-2'>
              Error Details:
            </h3>
            <code className='text-xs text-red-700 dark:text-red-300 break-all'>
              {error.message}
            </code>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className='flex flex-col sm:flex-row gap-4 justify-center'>
          {/* Try Again Button */}
          <button
            onClick={reset}
            className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200'>
            <IconRefresh size={18} />
            Try Again
          </button>

          {/* Go Home Button */}
          <Link
            href='/'
            className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200'>
            <IconHome size={18} />
            Go Home
          </Link>
        </motion.div>

        {/* Additional Help */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className='text-sm text-gray-500 dark:text-gray-500 mt-8'>
          If this problem persists, please{' '}
          <a
            href='mailto:hello@ahmedsoran.com'
            className='text-blue-600 dark:text-blue-400 hover:underline'>
            contact me
          </a>{' '}
          and I&apos;ll look into it.
        </motion.p>
      </motion.div>
    </div>
  )
}
