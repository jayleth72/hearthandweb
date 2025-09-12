import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface InstagramPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
}

export default function InstagramSlideshow() {
  const [images, setImages] = useState<InstagramPost[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [fade, setFade] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    async function fetchImages() {
      setLoading(true)
      try {
        const res = await fetch('/api/instagram-posts')
        const data = await res.json()
        if (Array.isArray(data)) {
          setImages(data.filter((post: InstagramPost) => post.media_type === 'IMAGE').slice(0, 15))
        }
      } catch (err) {
        setImages([])
      }
      setLoading(false)
    }
    fetchImages()
  }, [])

  // Autoplay and fade effect
  useEffect(() => {
    if (images.length === 0) return
    timeoutRef.current && clearTimeout(timeoutRef.current)
    setFade(true)
    timeoutRef.current = setTimeout(() => {
      setFade(false)
      setTimeout(() => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
        setFade(true)
      }, 500)
    }, 5000)
    // Animate progress bar
    if (progressRef.current) {
      progressRef.current.style.transition = 'none'
      progressRef.current.style.width = '0%'
      setTimeout(() => {
        if (progressRef.current) {
          progressRef.current.style.transition = 'width 5s linear'
          progressRef.current.style.width = '100%'
        }
      }, 50)
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [current, images])

  // Swipe/touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (deltaX > 50) goToPrev()
    else if (deltaX < -50) goToNext()
    touchStartX.current = null
  }

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
    <section className="w-full py-8 sm:py-12 mb-8 sm:mb-12 flex flex-col items-center">
      <div className="relative w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl rounded-2xl overflow-hidden shadow-2xl">
        {/* Gradient/blurred background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-orange-500/40 via-amber-200/30 to-black/60 blur-xl" />
        {/* Overlay title */}
        <div className="absolute top-0 left-0 w-full z-10 flex justify-center">
          <div className="bg-black/50 rounded-b-2xl px-6 py-3 mt-0 sm:mt-2">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg tracking-tight">Featured Instagram Gallery</h2>
          </div>
        </div>
        {/* Image with fade effect and touch/swipe */}
        <div className="flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px] bg-black relative z-10"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <a href={images[current].permalink} target="_blank" rel="noopener noreferrer">
            <Image
              src={images[current].media_url}
              alt={`Instagram image ${current + 1}`}
              fill
              className={`object-cover w-full h-full rounded-2xl transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
              sizes="100vw"
              priority
            />
          </a>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-black/30 z-20">
          <div ref={progressRef} className="h-full bg-orange-500 rounded-b-2xl" style={{ width: '0%' }} />
        </div>
        {/* Arrows */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full p-3 sm:p-4 hover:bg-orange-500 transition z-20 shadow-lg"
          onClick={goToPrev}
          aria-label="Previous image"
        >
          <ChevronLeft size={36} />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full p-3 sm:p-4 hover:bg-orange-500 transition z-20 shadow-lg"
          onClick={goToNext}
          aria-label="Next image"
        >
          <ChevronRight size={36} />
        </button>
      </div>
    </section>
  )
}
