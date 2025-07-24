'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'

export default function Home() {
  const [showContent, setShowContent] = useState(false)

  const skipToContent = () => {
    setShowContent(true)
  }

  useEffect(() => {
    // Show content after logo animation - shorter display
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 5000) // Reduced to 5 seconds for quicker transition

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* Logo Fade Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showContent ? 0 : 1
        }}
        transition={{ 
          duration: 1.6, 
          ease: "easeInOut"
        }}
        className={`fixed inset-0 flex items-center justify-center bg-black z-50 ${
          showContent ? 'pointer-events-none' : ''
        }`}
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            duration: 2.4, 
            delay: 1.0,
            ease: [0.25, 0.1, 0.25, 1.0] // Very smooth cubic-bezier
          }}
          className="text-center"
          style={{
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="mb-10 flex justify-center">
            <div 
              onClick={skipToContent}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <Image
                src="/logo/logo.png"
                alt="Heart and Hand Eco Body Art Logo"
                width={600}
                height={600}
                className="w-96 h-96 md:w-[32rem] md:h-[32rem] lg:w-[36rem] lg:h-[36rem] object-contain filter drop-shadow-2xl"
                priority
                unoptimized
                style={{
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              />
            </div>
          </div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 2, 
              delay: 2.4,
              ease: [0.25, 0.1, 0.25, 1.0] // Matching smooth cubic-bezier
            }}
            className="text-2xl md:text-4xl lg:text-5xl text-gray-300 font-light tracking-wide"
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
          >
            Face Painting &amp; Henna Art
          </motion.div>
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
