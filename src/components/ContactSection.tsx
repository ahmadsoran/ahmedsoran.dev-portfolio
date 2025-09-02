'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, Button } from '@heroui/react'
import {
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMessageCircle,
  IconUser,
  IconMapPin,
  IconSend,
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

export default function ContactSection() {
  const contactMethods = [
    {
      icon: IconMail,
      label: 'Email',
      value: data.social.email,
      href: `mailto:${data.social.email}`,
      color: 'from-gray-600 to-slate-600',
      description: 'Drop me a line anytime',
    },
    {
      icon: IconBrandGithub,
      label: 'GitHub',
      value: `@${data.social.github.username}`,
      href: data.social.github.url,
      color: 'from-gray-700 to-slate-700',
      description: 'Check out my code',
    },
    {
      icon: IconBrandLinkedin,
      label: 'LinkedIn',
      value: `@${data.social.linkedin.username}`,
      href: data.social.linkedin.url,
      color: 'from-gray-600 to-slate-600',
      description: "Let's connect professionally",
    },
  ]

  return (
    <section
      id='contact'
      className='py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-stone-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 scroll-mt-[50px]'>
      <div className='container mx-auto max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-20'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full mb-6'>
            <IconMessageCircle size={32} className='text-white' />
          </div>
          <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6'>
            Let&apos;s Work Together
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'>
            Ready to bring your ideas to life? I&apos;m always excited to
            discuss new opportunities and innovative projects.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='space-y-16'>
          {/* Contact Methods Grid */}
          <div className='grid md:grid-cols-3 gap-8'>
            {contactMethods.map((method) => (
              <motion.div
                key={method.label}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className='group'>
                <Card className='h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-white dark:group-hover:bg-gray-800 overflow-hidden'>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${method.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  <CardBody className='relative z-10 text-center p-8 space-y-6'>
                    {/* Icon */}
                    <div className='relative'>
                      <div
                        className={`w-20 h-20 mx-auto bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
                        <method.icon size={32} className='text-white' />
                      </div>
                      <div
                        className={`absolute -inset-1 bg-gradient-to-br ${method.color} rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500`}></div>
                    </div>

                    {/* Label */}
                    <h3 className='text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300'>
                      {method.label}
                    </h3>

                    {/* Description */}
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {method.description}
                    </p>

                    {/* Value */}
                    <div className='bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4'>
                      <p className='text-gray-700 dark:text-gray-300 font-medium break-all'>
                        {method.value}
                      </p>
                    </div>

                    {/* Action Button */}
                    <Button
                      as='a'
                      href={method.href}
                      target={method.label !== 'Email' ? '_blank' : undefined}
                      rel={
                        method.label !== 'Email'
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      size='lg'
                      className={`w-full font-semibold bg-gradient-to-r ${method.color} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                      startContent={<method.icon size={20} />}>
                      {method.label === 'Email'
                        ? 'Send Email'
                        : method.label === 'GitHub'
                        ? 'View Profile'
                        : 'Connect'}
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className='text-center'>
            <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-gray-200/50 dark:border-gray-700/50 max-w-4xl mx-auto'>
              <div className='space-y-6'>
                {/* Profile Info */}
                <div className='flex items-center justify-center gap-4 mb-8'>
                  <div className='w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-600 rounded-full flex items-center justify-center shadow-lg'>
                    <IconUser size={28} className='text-white' />
                  </div>
                  <div className='text-left'>
                    <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
                      {data.personalInfo.name}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-400 font-medium'>
                      {data.personalInfo.title}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className='flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400'>
                  <IconMapPin size={18} />
                  <span className='font-medium'>
                    {data.personalInfo.location}
                  </span>
                </div>

                {/* Description */}
                <div className='space-y-4'>
                  <h4 className='text-xl font-bold text-gray-900 dark:text-white'>
                    Ready to Start a Project?
                  </h4>
                  <p className='text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto'>
                    I&apos;m passionate about creating innovative solutions and
                    would love to hear about your project. Whether it&apos;s a
                    web application, mobile app, or enterprise solution,
                    let&apos;s discuss how we can bring your vision to reality.
                  </p>
                </div>

                {/* Primary CTA */}
                <div className='pt-6'>
                  <Button
                    as='a'
                    href={`mailto:${data.social.email}`}
                    size='lg'
                    className='font-semibold px-12 py-6 text-lg bg-gradient-to-r from-gray-700 to-slate-700 hover:from-gray-800 hover:to-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-300'
                    startContent={<IconSend size={24} />}>
                    Get In Touch
                  </Button>
                </div>

                {/* Availability Status */}
                <div className='flex items-center justify-center gap-3 pt-4'>
                  <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
                  <span className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                    Available for new opportunities
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className='flex justify-center'>
            <div className='flex space-x-2'>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full bg-gradient-to-r from-gray-400 to-slate-400 opacity-${
                    100 - i * 15
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
