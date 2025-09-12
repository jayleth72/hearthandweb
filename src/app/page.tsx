'use client'

import { Hero } from '@/components/Hero'
import { InstagramGallery } from '../components/InstagramGallery'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      {/* Logo and main text section */}
      <InstagramGallery />
    </div>
  )
}
