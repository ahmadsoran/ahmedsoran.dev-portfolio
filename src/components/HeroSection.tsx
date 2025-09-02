'use client'

import { motion } from 'framer-motion'
import { Button } from '@heroui/react'
import {
  IconArrowDown,
  IconDownload,
  IconMail,
  IconMapPin,
  IconSparkles,
} from '@tabler/icons-react'
import data from '@/constants/data.json'

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

export default function HeroSection() {
  return (
    <section
      id='about'
      className='pt-[65px] pb-5 relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-stone-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className='absolute top-20 left-10 w-2 h-2 bg-gray-400 rounded-full'
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className='absolute top-40 right-20 w-3 h-3 bg-slate-400 rounded-full'
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className='absolute bottom-40 left-20 w-2 h-2 bg-gray-500 rounded-full'
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          className='absolute bottom-20 right-10 w-4 h-4 bg-stone-400 rounded-full'
        />

        {/* Large gradient orbs */}
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-300/15 to-slate-400/15 rounded-full blur-3xl' />
        <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-stone-300/15 to-gray-400/15 rounded-full blur-3xl' />
      </div>{' '}
      <div className='container mx-auto max-w-7xl px-6 lg:px-8 relative z-10'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='text-center space-y-12'>
          {/* Main Content */}
          <div className='space-y-8'>
            {/* Greeting */}
            <motion.div variants={itemVariants} className='space-y-4'>
              <div className='inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg'>
                <IconSparkles size={16} className='text-gray-500' />
                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Hello, I&apos;m
                </span>
              </div>
            </motion.div>

            {/* Name with gradient text */}
            <motion.div variants={itemVariants}>
              <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight'>
                <span className='bg-gradient-to-r from-gray-900 via-slate-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-slate-200 bg-clip-text text-transparent'>
                  {data.personalInfo.name.split(' ')[0]}
                </span>
                <br />
                <span className='bg-gradient-to-r from-slate-600 via-gray-600 to-stone-600 bg-clip-text text-transparent'>
                  {data.personalInfo.name.split(' ')[1]}
                </span>
              </h1>
            </motion.div>

            {/* Title with animated underline */}
            <motion.div variants={itemVariants} className='relative'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-300 mb-4'>
                {data.personalInfo.title}
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className='h-1 bg-gradient-to-r from-gray-500 to-slate-500 rounded-full mx-auto origin-left'
                style={{ width: '200px' }}
              />
            </motion.div>

            {/* Location and tagline */}
            <motion.div variants={itemVariants} className='space-y-4'>
              <div className='flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400'>
                <IconMapPin size={18} />
                <span className='font-medium'>
                  {data.personalInfo.location}
                </span>
              </div>

              <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'>
                {data.personalInfo.tagline}
              </p>

              <p className='text-base sm:text-lg text-gray-500 dark:text-gray-500 max-w-2xl mx-auto'>
                {data.personalInfo.description}
              </p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className='flex flex-wrap justify-center gap-4'>
            <Button
              size='lg'
              as={'a'}
              href='https://drive.google.com/file/d/1-0xSTudTSsyWI1VwWwoTze6yDex7CS5Q/view'
              download
              target='_blank'
              rel='noopener noreferrer'
              color='primary'
              startContent={<IconDownload size={20} />}
              className='font-semibold px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-gray-700 to-slate-700 hover:from-gray-800 hover:to-slate-800'>
              Download Resume
            </Button>

            <Button
              size='lg'
              variant='bordered'
              startContent={<IconMail size={20} />}
              className='font-semibold px-8 py-6 text-base border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300'
              as='a'
              href={`mailto:${data.social.email}`}>
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>
      {/* Floating Scroll Indicator - Moved outside main content */}
      <motion.div
        animate={{ y: [-5, 5, -5], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className='flex flex-col items-center space-y-2 mt-10'>
        <span className='text-sm text-gray-500 dark:text-gray-400 font-medium'>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className='p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50'>
          <IconArrowDown
            size={16}
            className='text-gray-600 dark:text-gray-400'
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
