'use client'
import { useEffect, useState } from 'react'
import { ThemeProvider } from './ThemeProvider'

export default function Provider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return (
    <ThemeProvider defaultTheme='system' storageKey='portfolio-theme'>
      {hydrated && children}
    </ThemeProvider>
  )
}
