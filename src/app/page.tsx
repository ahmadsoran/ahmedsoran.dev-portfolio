import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import ExperienceSection from '@/components/ExperienceSection'
import CoursesSection from '@/components/CoursesSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className='min-h-dvh'>
      <Navigation />

      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CoursesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
