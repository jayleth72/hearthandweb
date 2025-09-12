import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface InstagramPost {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  permalink: string
}

export default function GallerySlideshow() {
  const [images, setImages] = useState<InstagramPost[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [fade, setFade] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    async function fetchImages() {
      setLoading(true)
      try {
        const res = await fetch('/api/instagram-posts')
        const data = await res.json()
        if (Array.isArray(data)) {
          // Only use IMAGE type
          setImages(data.filter((post: InstagramPost) => post.media_type === 'IMAGE').slice(0, 12))
        }
      } catch (err) {
        setImages([])
      }
      setLoading(false)
    }
    fetchImages()
  }, [])

  useEffect(() => {
    if (images.length === 0) return
    timeoutRef.current && clearTimeout(timeoutRef.current)
    fadeTimeoutRef.current && clearTimeout(fadeTimeoutRef.current)
    // Fade out before changing image
    fadeTimeoutRef.current = setTimeout(() => {
      setFade(false)
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
        setFade(true)
      }, 500) // fade out duration
    }, 5000)
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current)
      fadeTimeoutRef.current && clearTimeout(fadeTimeoutRef.current)
    }
  }, [current, images])

  const goToPrev = () => {
    setFade(false)
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      setFade(true)
    }, 500)
  }
  const goToNext = () => {
    setFade(false)
    setTimeout(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      setFade(true)
    }, 500)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-orange-500">Loading gallery...</div>
  }
  if (!images.length) {
    return <div className="flex justify-center items-center h-64 text-gray-400">No Instagram images found.</div>
  }

  return (
    <section className="w-full py-12 mb-12 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300">
      <div className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-center h-[500px] sm:h-[600px] md:h-[700px] bg-black">
          <a href={images[current].permalink} target="_blank" rel="noopener noreferrer">
            <Image
              src={images[current].media_url}
              alt={`Instagram image ${current + 1}`}
              fill
              className={`object-contain w-full h-full rounded-2xl transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
              sizes="100vw"
              priority
            />
          </a>
        </div>
        {/* Arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-3 hover:bg-orange-500 transition"
          onClick={goToPrev}
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-3 hover:bg-orange-500 transition"
          onClick={goToNext}
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </section>
  )
}
