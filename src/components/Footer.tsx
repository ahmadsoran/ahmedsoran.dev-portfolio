'use client'

import { motion } from 'framer-motion'
import { Divider, Button } from '@heroui/react'
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconArrowUp,
} from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import data from '@/constants/data.json'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const checkScrollTop = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', checkScrollTop)
    return () => window.removeEventListener('scroll', checkScrollTop)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {/* Floating Scroll to Top Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className='fixed bottom-8 right-8 z-50'>
        <Button
          isIconOnly
          size='lg'
          onClick={scrollToTop}
          className='w-14 h-14 bg-gradient-to-r from-gray-700 to-slate-700 hover:from-gray-800 hover:to-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-300'
          aria-label='Scroll to top'>
          <IconArrowUp size={24} />
        </Button>
      </motion.div>

      <footer className='bg-gray-900 text-white py-12 px-4'>
        <div className='container mx-auto max-w-6xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='grid md:grid-cols-3 gap-8 mb-8'>
            {/* Brand */}
            <div>
              <h3 className='text-2xl font-bold mb-4 bg-gradient-to-r from-gray-300 to-slate-300 bg-clip-text text-transparent'>
                {data.personalInfo.name}
              </h3>
              <p className='text-gray-300 leading-relaxed'>
                {data.personalInfo.title} from {data.personalInfo.location}.
                Building modern web applications with cutting-edge technologies.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
              <ul className='space-y-2'>
                {data.navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className='text-gray-300 hover:text-gray-100 transition-colors duration-200'>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className='text-lg font-semibold mb-4'>Connect</h4>
              <div className='flex flex-col space-y-3'>
                <a
                  href={`mailto:${data.social.email}`}
                  className='flex items-center gap-2 text-gray-300 hover:text-gray-100 transition-colors duration-200'>
                  <IconMail size={20} />
                  Email
                </a>
                <a
                  href={data.social.github.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-gray-300 hover:text-gray-100 transition-colors duration-200'>
                  <IconBrandGithub size={20} />
                  GitHub
                </a>
                <a
                  href={data.social.linkedin.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-gray-300 hover:text-gray-100 transition-colors duration-200'>
                  <IconBrandLinkedin size={20} />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          <Divider className='bg-gray-700 mb-6' />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm'>
            <p>
              © {currentYear} {data.personalInfo.name}. All rights reserved.
            </p>
            <p className='mt-2 md:mt-0'>
              Built with Next.js, Hero UI, and Tailwind CSS
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  )
}
