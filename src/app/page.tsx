'use client'

import { Hero } from '@/components/Hero'
import { InstagramGallery } from '../components/InstagramGallery'
import { PartyPopper } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      {/* Logo and main text section */}
      <InstagramGallery />
      {/* Event Services Card Section Example */}
      <section className="max-w-2xl mx-auto mt-12">
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
          <div className="flex-shrink-0">
            <PartyPopper className="h-10 w-10 text-orange-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Event Services</h3>
            <p className="text-gray-700">Face painting, henna, and creative entertainment for parties, festivals, and special occasions.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
