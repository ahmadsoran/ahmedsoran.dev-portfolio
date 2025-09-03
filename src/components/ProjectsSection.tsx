'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardBody, Chip } from '@heroui/react'
import {
  IconFolder,
  IconCalendar,
  IconTag,
  IconStar,
  IconTrendingUp,
} from '@tabler/icons-react'
import data from '@/constants/data.json'
import { staggerContainer, scaleIn } from '@/constants/animations'

export default function ProjectsSection() {
  const featuredProjects = data.projects.filter((project) => project.featured)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success'
      case 'In Progress':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Full-Stack':
        return IconTrendingUp
      case 'Enterprise':
        return IconStar
      default:
        return IconFolder
    }
  }

  return (
    <section
      id='projects'
      className='py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-stone-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 scroll-mt-[50px]'>
      <div className='container mx-auto max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-20'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full mb-6'>
            <IconFolder size={32} className='text-white' />
          </div>
          <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6'>
            Featured Projects
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'>
            A showcase of my recent work that demonstrates technical expertise
            and problem-solving capabilities
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
          className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch'>
          {featuredProjects.map((project, index) => {
            const CategoryIcon = getCategoryIcon(project.category)

            return (
              <motion.div
                key={project.id}
                variants={scaleIn}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{
                  y: -8,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className='group'>
                <Card className='h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-white dark:group-hover:bg-gray-800 overflow-hidden p-5'>
                  <div className='absolute inset-0 bg-gradient-to-br from-gray-300/5 to-slate-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                  <CardHeader className='relative z-10 pb-4'>
                    <div className='w-full space-y-4'>
                      {/* Header with Icon and Status */}
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='w-12 h-12 bg-gradient-to-br from-gray-600 to-slate-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110'>
                            <CategoryIcon size={24} className='text-white' />
                          </div>
                          <div>
                            <h3 className='text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300'>
                              {project.title}
                            </h3>
                            <div className='flex items-center gap-2 mt-1'>
                              <IconTag size={14} className='text-gray-500' />
                              <span className='text-sm text-gray-500 dark:text-gray-400'>
                                {project.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Chip
                          color={getStatusColor(project.status)}
                          variant='flat'
                          size='sm'
                          className='font-semibold'>
                          {project.status}
                        </Chip>
                      </div>
                    </div>
                  </CardHeader>

                  <CardBody className='relative z-10 pt-0 space-y-6 flex justify-between'>
                    {/* Description */}
                    <p className='text-gray-600 dark:text-gray-300 leading-relaxed text-base'>
                      {project.description}
                    </p>

                    <div className='space-y-6'>
                      {/* Technologies */}
                      <div className='space-y-3'>
                        <div className='flex items-center gap-2'>
                          <IconCalendar size={16} className='text-gray-500' />
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                            Technologies Used
                          </span>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          {project.technologies.map((tech, techIndex) => (
                            <Chip
                              key={tech}
                              variant='bordered'
                              size='sm'
                              className={`text-xs font-medium border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200 ${
                                techIndex === 0
                                  ? 'bg-gray-100 dark:bg-gray-700'
                                  : ''
                              }`}>
                              {tech}
                            </Chip>
                          ))}
                        </div>
                      </div>

                      {/* Project Metrics or Additional Info */}
                      <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4'>
                        <div className='flex items-center justify-between text-sm'>
                          <div className='flex items-center gap-2'>
                            <IconStar size={16} className='text-yellow-500' />
                            <span className='font-medium text-gray-700 dark:text-gray-300'>
                              Featured Project
                            </span>
                          </div>
                          <span className='text-gray-500 dark:text-gray-400 text-xs'>
                            {project.category} Solution
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA - Removed GitHub link, now just informational */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className='text-center mt-16'>
          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 max-w-2xl mx-auto'>
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
              Interested in My Work?
            </h3>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
              These projects represent my experience in building scalable
              solutions. I&apos;m always excited to discuss new opportunities
              and collaborations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
