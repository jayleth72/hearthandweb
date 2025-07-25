'use client'

import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <Footer />
    </div>
  )
}
