'use client'

import { motion } from 'framer-motion'
import { Card, CardBody } from '@heroui/react'
import {
  IconCode,
  IconDatabase,
  IconBrandReact,
  IconBrandJavascript,
  IconBrandNodejs,
  IconBrandGolang,
  IconBrandTypescript,
  IconBrandNextjs,
  IconBrandMongodb,
} from '@tabler/icons-react'
import data from '@/constants/data.json'
import { fadeIn, staggerContainer, scaleIn } from '@/constants/animations'

const getSkillIcon = (skillName: string) => {
  const name = skillName.toLowerCase().replace(/[.\s]/g, '')
  switch (name) {
    case 'javascript':
      return IconBrandJavascript
    case 'nodejs':
      return IconBrandNodejs
    case 'go':
      return IconBrandGolang
    case 'typescript':
      return IconBrandTypescript
    case 'nextjs':
      return IconBrandNextjs
    case 'react':
      return IconBrandReact
    case 'mongodb':
      return IconBrandMongodb
    case 'postgresql':
      return IconDatabase
    default:
      return IconCode
  }
}

const getGradientColors = (category: string) => {
  switch (category) {
    case 'Frontend':
      return 'from-gray-600 via-slate-600 to-stone-600'
    case 'Backend':
      return 'from-slate-600 via-gray-600 to-zinc-600'
    case 'Database':
      return 'from-stone-600 via-gray-600 to-slate-600'
    case 'Framework':
      return 'from-zinc-600 via-slate-600 to-gray-600'
    case 'Language':
      return 'from-gray-700 via-slate-700 to-stone-700'
    default:
      return 'from-gray-500 via-slate-500 to-stone-500'
  }
}

export default function SkillsSection() {
  const groupedSkills = data.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof data.skills>)

  return (
    <section
      id='skills'
      className='py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-stone-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 scroll-mt-[50px]'>
      <div className='container mx-auto max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-20'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full mb-6'>
            <IconCode size={32} className='text-white' />
          </div>
          <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6'>
            Skills & Expertise
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'>
            Technologies and tools I use to craft exceptional digital
            experiences
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
          className='space-y-16'>
          {Object.entries(groupedSkills).map(
            ([category, skills], categoryIndex) => (
              <motion.div key={category} variants={fadeIn} className='relative'>
                {/* Category Header */}
                <div className='text-center mb-12'>
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${getGradientColors(
                      category
                    )} rounded-xl mb-4 shadow-lg`}>
                    <IconCode size={24} className='text-white' />
                  </div>
                  <h3 className='text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2'>
                    {category}
                  </h3>
                  <div className='w-20 h-1 bg-gradient-to-r from-gray-500 to-slate-500 rounded-full mx-auto'></div>
                </div>

                {/* Skills Grid */}
                <div className='flex flex-wrap justify-center gap-8'>
                  {skills.map((skill, index) => {
                    const IconComponent = getSkillIcon(skill.name)

                    return (
                      <motion.div
                        key={skill.id}
                        variants={scaleIn}
                        transition={{
                          delay: categoryIndex * 0.1 + index * 0.05,
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
                        }}
                        className='group w-full max-w-xs sm:w-72'>
                        <Card className='h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-white dark:group-hover:bg-gray-800 overflow-hidden'>
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${getGradientColors(
                              category
                            )} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                          <CardBody className='relative z-10 text-center p-8'>
                            {/* Icon */}
                            <div className='relative mb-6'>
                              <div
                                className={`w-20 h-20 mx-auto bg-gradient-to-br ${getGradientColors(
                                  category
                                )} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
                                <IconComponent
                                  size={36}
                                  className='text-white'
                                />
                              </div>
                              <div
                                className={`absolute -inset-1 bg-gradient-to-br ${getGradientColors(
                                  category
                                )} rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500`}></div>
                            </div>

                            {/* Skill Name */}
                            <h4 className='text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300'>
                              {skill.name}
                            </h4>

                            {/* Skill Level Badge */}
                            <div className='flex justify-center'>
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                  skill.level === 'Expert'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : skill.level === 'Advanced'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                    : skill.level === 'Intermediate'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                                }`}>
                                {skill.level}
                              </span>
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          )}
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className='flex justify-center mt-20'>
          <div className='flex space-x-2'>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 opacity-${
                  100 - i * 20
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
