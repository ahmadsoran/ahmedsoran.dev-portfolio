'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, Chip } from '@heroui/react'
import {
  IconSchool,
  IconCertificate,
  IconCalendar,
  IconClock,
  IconUser,
  IconBuildingSkyscraper,
} from '@tabler/icons-react'
import data from '@/constants/data.json'
import { fadeIn, staggerContainer, scaleIn } from '@/constants/animations'

const getCategoryGradient = (category: string) => {
  switch (category) {
    case 'Full-Stack':
      return 'from-gray-600 via-slate-600 to-stone-600'
    case 'JavaScript':
      return 'from-slate-600 via-gray-600 to-zinc-600'
    default:
      return 'from-gray-500 via-slate-500 to-stone-500'
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Full-Stack':
      return IconBuildingSkyscraper
    case 'JavaScript':
      return IconCertificate
    default:
      return IconSchool
  }
}

export default function CoursesSection() {
  return (
    <section
      id='courses'
      className='py-20 px-4 bg-gradient-to-br from-stone-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-800 dark:to-stone-900 scroll-mt-[50px]'>
      <div className='container mx-auto max-w-6xl'>
        {/* Header */}
        <motion.div
          variants={fadeIn}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='text-center mb-20'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full mb-6'>
            <IconSchool size={32} className='text-white' />
          </div>
          <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6'>
            Courses & Training
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'>
            Continuous learning through structured courses and professional
            training programs to stay current with the latest technologies and
            best practices.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {data.courses.map((course, index) => {
            const IconComponent = getCategoryIcon(course.category)
            const gradientClass = getCategoryGradient(course.category)

            return (
              <motion.div
                key={course.id}
                variants={scaleIn}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{
                  y: -8,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  },
                }}>
                <Card className='h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group'>
                  <CardBody className='p-8'>
                    {/* Category Badge & Icon */}
                    <div className='flex items-center justify-between mb-6'>
                      <Chip
                        size='sm'
                        className={`bg-gradient-to-r ${gradientClass} text-white font-medium px-3 py-1`}>
                        {course.category}
                      </Chip>
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${gradientClass} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent size={24} className='text-white' />
                      </div>
                    </div>

                    {/* Course Title */}
                    <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors'>
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className='text-gray-600 dark:text-gray-400 mb-6 leading-relaxed'>
                      {course.description}
                    </p>

                    {/* Course Details */}
                    <div className='space-y-3'>
                      {/* Provider */}
                      <div className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400'>
                        <IconUser size={16} className='text-gray-500' />
                        <span>{course.provider}</span>
                      </div>

                      {/* Institution (if available) */}
                      {course.institution && (
                        <div className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400'>
                          <IconBuildingSkyscraper
                            size={16}
                            className='text-gray-500'
                          />
                          <span>{course.institution}</span>
                        </div>
                      )}

                      {/* Instructor (if available) */}
                      {course.instructor && (
                        <div className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400'>
                          <IconUser size={16} className='text-gray-500' />
                          <span>by {course.instructor}</span>
                        </div>
                      )}

                      {/* Duration */}
                      <div className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400'>
                        <IconClock size={16} className='text-gray-500' />
                        <span>{course.duration}</span>
                      </div>

                      {/* Completion Date */}
                      <div className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400'>
                        <IconCalendar size={16} className='text-gray-500' />
                        <span>Completed in {course.completedDate}</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeIn}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className='text-center mt-16'>
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 max-w-2xl mx-auto'>
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
              Committed to Continuous Learning
            </h3>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
              I believe in staying current with emerging technologies and best
              practices. These courses have equipped me with the knowledge and
              skills to deliver high-quality solutions in modern development
              environments.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
