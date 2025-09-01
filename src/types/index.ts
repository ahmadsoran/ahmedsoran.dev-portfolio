export interface PersonalInfo {
  name: string
  title: string
  location: string
  tagline: string
  description: string
  email: string
  github: string
  linkedin: string
}

export interface NavigationItem {
  label: string
  href: string
}

export interface Skill {
  id: number
  name: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  icon: string
}

export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  category: string
  status: 'Planned' | 'In Progress' | 'Completed'
  featured: boolean
  githubUrl: string
  liveUrl?: string
}

export interface Experience {
  position: string
  company: string
  location: string
  startDate: string
  endDate?: string
  description: string
  responsibilities?: string[]
  technologies?: string[]
}

export interface Social {
  github: {
    url: string
    username: string
  }
  linkedin: {
    url: string
    username: string
  }
  email: string
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  navigation: NavigationItem[]
  skills: Skill[]
  projects: Project[]
  experience: {
    current: Experience
    previous: Experience[]
  }
  social: Social
}
