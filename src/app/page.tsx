'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'

export default function Home() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show content after logo animation
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Logo Fade Animation */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: showContent ? 0 : 1,
          scale: showContent ? 0.8 : 1
        }}
        transition={{ duration: 0.8, delay: showContent ? 0 : 1.5 }}
        className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 z-50 ${
          showContent ? 'pointer-events-none' : ''
        }`}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Heart &amp; Hand
          </div>
          <div className="text-xl md:text-2xl text-gray-600 font-light">
            Face Painting &amp; Henna Art
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={showContent ? '' : 'pointer-events-none'}
      >
        <Navigation />
        <Hero />
      </motion.div>
    </div>
  )
}
