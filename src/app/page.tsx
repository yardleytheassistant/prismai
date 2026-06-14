"use client"
import { useEffect, useState } from "react"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Stats from "@/components/Stats"
import Process from "@/components/Process"
import Testimonials from "@/components/Testimonials"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import MissionControl from "@/components/MissionControl"

export default function Home() {
  const [mcOpen, setMcOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
        e.preventDefault()
        setMcOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Hero onMissionControl={() => setMcOpen(true)} />
      <Services />
      <Stats />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
      <MissionControl open={mcOpen} onClose={() => setMcOpen(false)} />
    </main>
  )
}
