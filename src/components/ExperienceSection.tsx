'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardBody, Chip } from '@heroui/react'
import {
  IconBriefcase,
  IconCalendar,
  IconMapPin,
  IconTrendingUp,
  IconUsers,
  IconCode,
  IconStar,
  IconCheck,
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

export default function ExperienceSection() {
  const { current } = data.experience

  return (
    <section
      id='experience'
      className='py-20 px-4 bg-white dark:bg-gray-800 scroll-mt-[50px]'>
      <div className='container mx-auto max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-20'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full mb-6'>
            <IconBriefcase size={32} className='text-white' />
          </div>
          <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6'>
            Professional Experience
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'>
            My journey in building innovative solutions and leading technical
            teams
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='space-y-16'>
          {/* Current Position - Featured */}
          <motion.div variants={itemVariants} className='relative'>
            <div className='absolute -inset-1 bg-gradient-to-r from-gray-300 to-slate-300 rounded-3xl opacity-20 blur-xl'></div>
            <Card className='relative shadow-none outline-none bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-br from-gray-50/50 to-slate-50/50 dark:from-gray-700/20 dark:to-slate-700/20'></div>

              <CardHeader className='relative z-10 pb-6'>
                <div className='w-full space-y-6'>
                  {/* Header with current badge */}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Chip
                        color='success'
                        variant='flat'
                        size='sm'
                        startContent={<IconTrendingUp size={14} />}
                        className='font-semibold'>
                        Current Position
                      </Chip>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                      <IconCalendar size={16} />
                      <span>{current.startDate} - Present</span>
                    </div>
                  </div>

                  {/* Position and Company */}
                  <div className='flex items-start gap-6'>
                    <div className='w-20 h-20 bg-gradient-to-br from-gray-600 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg'>
                      <IconBriefcase size={32} className='text-white' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                        {current.position}
                      </h3>
                      <p className='text-xl text-gray-700 dark:text-gray-300 font-semibold mb-3'>
                        {current.company}
                      </p>
                      <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
                        <IconMapPin size={16} />
                        <span className='font-medium'>{current.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardBody className='relative z-10 space-y-8'>
                {/* Description */}
                <div className='bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6'>
                  <p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                    {current.description}
                  </p>
                </div>

                <div className='grid md:grid-cols-2 gap-8'>
                  {/* Key Responsibilities */}
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='w-10 h-10 bg-gradient-to-br from-gray-500 to-slate-500 rounded-lg flex items-center justify-center'>
                        <IconUsers size={20} className='text-white' />
                      </div>
                      <h4 className='text-xl font-bold text-gray-900 dark:text-white'>
                        Key Responsibilities
                      </h4>
                    </div>
                    <div className='space-y-3'>
                      {current.responsibilities.map((responsibility, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className='flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50'>
                          <div className='w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                            <IconCheck size={12} className='text-white' />
                          </div>
                          <span className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
                            {responsibility}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='w-10 h-10 bg-gradient-to-br from-gray-500 to-slate-500 rounded-lg flex items-center justify-center'>
                        <IconCode size={20} className='text-white' />
                      </div>
                      <h4 className='text-xl font-bold text-gray-900 dark:text-white'>
                        Technologies & Tools
                      </h4>
                    </div>
                    <div className='flex flex-wrap gap-3'>
                      {current.technologies.map((tech, index) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}>
                          <Chip
                            variant='bordered'
                            size='md'
                            className='font-medium border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm'>
                            {tech}
                          </Chip>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Career Timeline */}
          <motion.div variants={itemVariants} className='space-y-8'>
            <div className='text-center'>
              <div className='inline-flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-500 rounded-xl flex items-center justify-center'>
                  <IconStar size={24} className='text-white' />
                </div>
                <h3 className='text-3xl font-bold text-gray-900 dark:text-white'>
                  Career Journey
                </h3>
              </div>
              <div className='w-24 h-1 bg-gradient-to-r from-gray-400 to-slate-400 rounded-full mx-auto'></div>
            </div>

            <div className='relative max-w-4xl mx-auto'>
              {/* Timeline Line */}
              <div className='absolute left-1/2 transform -translate-x-0.5 w-1 bg-gradient-to-b from-gray-300 to-slate-300 dark:from-gray-600 dark:to-slate-600 h-full rounded-full'></div>

              {/* Current Position Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='relative flex items-center mb-12'>
                {/* Timeline Dot */}
                <div className='absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg'>
                  <div className='absolute inset-0 bg-green-400 rounded-full animate-ping opacity-25'></div>
                </div>
                {/* Content Card */}
                <div className='w-full lg:w-5/12 lg:ml-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-600/50'>
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <h4 className='text-lg font-bold text-gray-900 dark:text-white'>
                        {current.position}
                      </h4>
                      <p className='text-gray-600 dark:text-gray-400 font-medium'>
                        {current.company}
                      </p>
                    </div>
                    <Chip
                      color='success'
                      variant='flat'
                      size='sm'
                      className='font-semibold'>
                      Current
                    </Chip>
                  </div>
                  <div className='flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3'>
                    <div className='flex items-center gap-1'>
                      <IconCalendar size={14} />
                      <span>{current.startDate} - Present</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <IconMapPin size={14} />
                      <span>{current.location}</span>
                    </div>
                  </div>
                  <p className='text-gray-700 z-50 dark:text-gray-300 text-sm leading-relaxed'>
                    Leading enterprise application development and mentoring
                    team members in modern technologies.
                  </p>
                </div>
              </motion.div>

              {/* Previous Positions */}
              {data.experience.previous.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className='relative flex items-center mb-12'>
                  {/* Timeline Dot */}
                  <div className='absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-gray-400 to-slate-400 rounded-full border-4 border-white dark:border-gray-800 shadow-lg'></div>

                  {/* Content Card - Alternating sides */}
                  <div
                    className={`w-full lg:w-5/12 ${
                      index % 2 === 0 ? 'lg:mr-auto' : 'lg:ml-auto'
                    } bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-600/50`}>
                    <div className='mb-3'>
                      <h4 className='text-lg font-bold text-gray-900 dark:text-white'>
                        {job.position}
                      </h4>
                      <p className='text-gray-600 dark:text-gray-400 font-medium'>
                        {job.company}
                      </p>
                    </div>
                    <div className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3'>
                      <IconCalendar size={14} />
                      <span>
                        {job.startDate} - {job.endDate}
                      </span>
                    </div>
                    <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
                      {job.description}
                    </p>

                    {/* Technologies if available */}
                    {job.technologies && (
                      <div className='mt-4 flex flex-wrap gap-2'>
                        {job.technologies.slice(0, 3).map((tech) => (
                          <Chip
                            key={tech}
                            variant='bordered'
                            size='sm'
                            className='text-xs border-gray-300 dark:border-gray-600'>
                            {tech}
                          </Chip>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
