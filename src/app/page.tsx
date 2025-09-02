import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import ExperienceSection from '@/components/ExperienceSection'
import CoursesSection from '@/components/CoursesSection'
import RecentBlogsSection from '@/components/RecentBlogsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { getPosts, type GhostPost } from '@/lib/ghost'

export default async function Home() {
  // Fetch recent blog posts
  let recentPosts: GhostPost[] = []
  try {
    const response = await getPosts({ limit: 6 })
    recentPosts = response.posts
  } catch (error) {
    console.error('Failed to fetch recent posts:', error)
    // Continue without blog posts if there's an error
  }

  return (
    <main className='min-h-dvh'>
      <Navigation />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CoursesSection />
      <RecentBlogsSection posts={recentPosts} />
      <ContactSection />
      <Footer />
    </main>
  )
}
