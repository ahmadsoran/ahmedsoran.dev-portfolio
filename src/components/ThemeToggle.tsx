'use client'

import { Button } from '@heroui/react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <IconSun className='w-4 h-4' />
      case 'dark':
        return <IconMoon className='w-4 h-4' />
      case 'system':
      default:
        return <IconDeviceDesktop className='w-4 h-4' />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light mode'
      case 'dark':
        return 'Dark mode'
      case 'system':
      default:
        return 'System mode'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}>
      <Button
        isIconOnly
        variant='ghost'
        size='sm'
        onPress={toggleTheme}
        aria-label={`Switch to ${
          theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
        } mode`}
        className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
        title={getLabel()}>
        {getIcon()}
      </Button>
    </motion.div>
  )
}
