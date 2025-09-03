'use client'

import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider } from './ThemeProvider'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme='system' storageKey='portfolio-theme'>
      <HeroUIProvider>{children}</HeroUIProvider>
    </ThemeProvider>
  )
}
