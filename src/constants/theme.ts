import { HeroUIPluginConfig } from '@heroui/react'

export const heroUIThemeConfig: HeroUIPluginConfig = {
  defaultTheme: 'dark',
  themes: {
    light: {
      colors: {
        // Primary colors
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          DEFAULT: '#64748b',
        },
        background: '#ffffff',
        foreground: '#0f172a',
        content1: '#ffffff',
        content2: '#f8fafc',
        content3: '#f1f5f9',
        content4: '#e2e8f0',
      },
    },
    dark: {
      colors: {
        // Primary colors
        primary: {
          50: '#0f172a',
          100: '#1e293b',
          200: '#334155',
          300: '#475569',
          400: '#64748b',
          500: '#94a3b8',
          600: '#cbd5e1',
          700: '#e2e8f0',
          800: '#f1f5f9',
          900: '#f8fafc',
          DEFAULT: '#94a3b8',
        },
        background: '#0f172a',
        foreground: '#f8fafc',
        content1: '#1e293b',
        content2: '#334155',
        content3: '#475569',
        content4: '#64748b',
      },
    },
  },
}

// Custom gradient classes
export const gradientClasses = {
  // Section backgrounds
  sectionBackground: {
    light: 'bg-gradient-to-br from-gray-50 via-white to-stone-50',
    dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900',
  },

  // Hero section specific
  heroBackground: {
    light: 'bg-gradient-to-br from-gray-50 via-white to-stone-50',
    dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900',
  },

  // Card gradients
  cardBackground: {
    light: 'bg-white/80 dark:bg-gray-800/80',
    dark: 'bg-gray-800/80',
  },

  cardHover: {
    light: 'group-hover:bg-white dark:group-hover:bg-gray-800',
    dark: 'group-hover:bg-gray-800',
  },

  // Icon backgrounds
  iconBackground: {
    primary: 'bg-gradient-to-r from-gray-600 to-slate-600',
    secondary: 'bg-gradient-to-br from-gray-500 to-slate-500',
    tertiary: 'bg-gradient-to-br from-stone-600 via-gray-600 to-slate-600',
  },

  // Skills category gradients
  skillsCategory: {
    frontend: 'from-gray-600 via-slate-600 to-stone-600',
    backend: 'from-slate-600 via-gray-600 to-zinc-600',
    database: 'from-stone-600 via-gray-600 to-slate-600',
    framework: 'from-zinc-600 via-slate-600 to-gray-600',
    language: 'from-gray-700 via-slate-700 to-stone-700',
    default: 'from-gray-500 via-slate-500 to-stone-500',
  },

  // Courses category gradients
  coursesCategory: {
    fullStack: 'from-gray-600 via-slate-600 to-stone-600',
    javascript: 'from-slate-600 via-gray-600 to-zinc-600',
    default: 'from-gray-500 via-slate-500 to-stone-500',
  },

  // Contact method gradients
  contactMethod: {
    email: 'from-gray-600 to-slate-600',
    phone: 'from-slate-600 to-gray-600',
    linkedin: 'from-stone-600 to-gray-600',
    default: 'from-gray-500 to-slate-500',
  },

  // Text gradients
  textGradient: {
    primary:
      'bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300',
    secondary:
      'bg-gradient-to-r from-gray-900 via-slate-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-slate-200',
    tertiary: 'bg-gradient-to-r from-slate-600 via-gray-600 to-stone-600',
  },

  // Button gradients
  buttonGradient: {
    primary:
      'bg-gradient-to-r from-gray-700 to-slate-700 hover:from-gray-800 hover:to-slate-800',
    secondary:
      'bg-gradient-to-r from-slate-700 to-gray-700 hover:from-slate-800 hover:to-gray-800',
  },

  // Decoration gradients
  decoration: {
    line: 'bg-gradient-to-r from-gray-500 to-slate-500',
    divider: {
      start: 'bg-gradient-to-r from-transparent to-gray-400',
      middle: 'bg-gradient-to-r from-gray-400 to-slate-400',
      end: 'bg-gradient-to-r from-slate-400 to-transparent',
    },
  },

  // Overlay gradients
  overlay: {
    hover: 'bg-gradient-to-br from-gray-300/5 to-slate-400/5',
    background:
      'bg-gradient-to-br from-gray-50/50 to-slate-50/50 dark:from-gray-700/20 dark:to-slate-700/20',
  },

  // Floating elements
  floatingElements: {
    primary: 'bg-gradient-to-br from-gray-300/15 to-slate-400/15',
    secondary: 'bg-gradient-to-tr from-stone-300/15 to-gray-400/15',
  },
}

// Typography classes
export const typographyClasses = {
  // Headings
  heading: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-800 dark:text-gray-200',
    tertiary: 'text-gray-700 dark:text-gray-300',
  },

  // Body text
  body: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-600 dark:text-gray-400',
    tertiary: 'text-gray-500 dark:text-gray-500',
    quaternary: 'text-gray-400 dark:text-gray-600',
  },

  // Specialized text
  muted: 'text-gray-500 dark:text-gray-400',
  accent: 'text-gray-700 dark:text-gray-300',
  inverted: 'text-white',

  // Interactive text
  hover: {
    primary: 'group-hover:text-gray-800 dark:group-hover:text-white',
    secondary: 'hover:text-gray-600 dark:hover:text-gray-300',
  },
}

// Border classes
export const borderClasses = {
  primary: 'border-gray-300 dark:border-gray-600',
  secondary: 'border-gray-200 dark:border-gray-700',
  hover: 'hover:border-gray-400 dark:hover:border-gray-500',
  focus: 'focus:border-gray-500 dark:focus:border-gray-400',
  transparent: 'border-gray-200/50 dark:border-gray-700/50',
}

// Shadow classes
export const shadowClasses = {
  card: 'shadow-lg hover:shadow-2xl',
  floating: 'shadow-lg hover:shadow-xl',
  button: 'shadow-lg hover:shadow-xl',
  elevated: 'shadow-2xl',
}

// Animation classes
export const animationClasses = {
  transition: {
    default: 'transition-all duration-300',
    slow: 'transition-all duration-500',
    fast: 'transition-all duration-200',
    colors: 'transition-colors duration-200',
    transform: 'transition-transform duration-300',
    shadow: 'transition-shadow duration-300',
  },

  hover: {
    scale: 'hover:scale-105',
    lift: 'group-hover:scale-110',
    float: 'hover:-translate-y-2',
  },
}

// Backdrop classes
export const backdropClasses = {
  blur: 'backdrop-blur-sm',
  blurMd: 'backdrop-blur-md',
  blurLg: 'backdrop-blur-lg',
}

// Status colors
export const statusClasses = {
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  warning:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
}

// Skill level colors
export const skillLevelClasses = {
  expert: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  advanced: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  intermediate:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  beginner: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
}

// Utility functions to get theme classes
export const getGradientClass = (
  type: keyof typeof gradientClasses,
  variant?: string
) => {
  const gradientType = gradientClasses[type]
  if (typeof gradientType === 'object' && variant && variant in gradientType) {
    return gradientType[variant as keyof typeof gradientType]
  }
  return gradientType
}

export const getTypographyClass = (
  type: keyof typeof typographyClasses,
  variant?: string
) => {
  const typographyType = typographyClasses[type]
  if (
    typeof typographyType === 'object' &&
    variant &&
    variant in typographyType
  ) {
    return typographyType[variant as keyof typeof typographyType]
  }
  return typographyType
}

export const getSkillCategoryGradient = (category: string) => {
  switch (category.toLowerCase()) {
    case 'frontend':
      return gradientClasses.skillsCategory.frontend
    case 'backend':
      return gradientClasses.skillsCategory.backend
    case 'database':
      return gradientClasses.skillsCategory.database
    case 'framework':
      return gradientClasses.skillsCategory.framework
    case 'language':
      return gradientClasses.skillsCategory.language
    default:
      return gradientClasses.skillsCategory.default
  }
}

export const getCoursesCategoryGradient = (category: string) => {
  switch (category.toLowerCase()) {
    case 'full-stack':
      return gradientClasses.coursesCategory.fullStack
    case 'javascript':
      return gradientClasses.coursesCategory.javascript
    default:
      return gradientClasses.coursesCategory.default
  }
}

export const getContactMethodGradient = (method: string) => {
  switch (method.toLowerCase()) {
    case 'email':
      return gradientClasses.contactMethod.email
    case 'phone':
      return gradientClasses.contactMethod.phone
    case 'linkedin':
      return gradientClasses.contactMethod.linkedin
    default:
      return gradientClasses.contactMethod.default
  }
}

export const getSkillLevelClass = (level: string) => {
  switch (level.toLowerCase()) {
    case 'expert':
      return skillLevelClasses.expert
    case 'advanced':
      return skillLevelClasses.advanced
    case 'intermediate':
      return skillLevelClasses.intermediate
    case 'beginner':
      return skillLevelClasses.beginner
    default:
      return skillLevelClasses.beginner
  }
}
