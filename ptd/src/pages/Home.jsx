import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo'
import Hero from '../sections/Hero'
import Positioning from '../sections/Positioning'
import Highlights from '../sections/Highlights'
import Skills from '../sections/Skills'
import Experience from '../sections/Experience'
import Projects from '../sections/Projects'
import Recommendations from '../sections/Recommendations'
import Credentials from '../sections/Credentials'
import Closing from '../sections/Closing'

export default function Home() {
  const location = useLocation()

  // Handles "nav to a section from another route": Header pushes the target
  // id in router state, we scroll once the home page has actually mounted.
  useEffect(() => {
    const target = location.state?.scrollTo
    if (!target) return
    const id = window.requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => window.cancelAnimationFrame(id)
  }, [location.state])

  return (
    <>
      <Seo />
      <Hero />
      <Positioning />
      <Highlights />
      <Skills />
      <Experience />
      <Projects />
      <Recommendations />
      <Credentials />
      <Closing />
    </>
  )
}
