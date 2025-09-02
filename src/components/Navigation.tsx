'use client'

import { motion } from 'framer-motion'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/react'
import { useState } from 'react'
import data from '@/constants/data.json'
import { fadeIn } from '@/constants/animations'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.div {...fadeIn} className='fixed top-0 w-full z-50'>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        height={50}
        className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20'
        maxWidth='xl'>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='sm:hidden'
          />
          <NavbarBrand>
            <h1 className='font-bold text-xl bg-gradient-to-r from-gray-700 to-slate-700 bg-clip-text text-transparent'>
              {data.personalInfo.name}
            </h1>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden sm:flex gap-6' justify='center'>
          {data.navigation.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                href={item.href}
                className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200'
                size='sm'>
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify='end'>
          <NavbarItem>
            <Button
              as={Link}
              href='#contact'
              color='primary'
              variant='flat'
              size='sm'
              className='font-medium bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white'>
              Get In Touch
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className='pt-6'>
          {data.navigation.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link
                href={item.href}
                className='w-full text-lg text-gray-700 dark:text-gray-300'
                size='lg'>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </motion.div>
  )
}
