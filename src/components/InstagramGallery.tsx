'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, Instagram, Loader2 } from 'lucide-react'

interface InstagramPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  permalink: string;
  timestamp: string;
}

export function InstagramGallery() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch('/api/instagram-posts')
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram posts')
        }
        const data = await response.json()
        if (Array.isArray(data)) {
          setPosts(data)
        } else {
          setPosts([])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    fetchInstagramPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin w-8 h-8 text-orange-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 max-w-md mx-auto">
          <Instagram className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-300 mb-2">Unable to load Instagram posts</h3>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="text-center pt-10 pb-6 px-4 bg-white rounded-2xl shadow-lg mb-8">
        <h2 className="text-5xl font-extrabold text-orange-600 mb-4 drop-shadow-2xl tracking-tight uppercase" style={{letterSpacing: '0.05em'}}>Our Artistic Gallery</h2>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Face Painting & Henna Highlights</h3>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Explore our artistic journey and discover the beautiful face paintings and henna designs we create for events and celebrations.
        </p>
      </div>
      {posts.length === 0 ? (
        <div className="text-center py-16 sm:py-20">
          <Instagram className="w-12 sm:w-16 h-12 sm:h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">No posts found</h3>
          <p className="text-gray-500">Check back soon for new artwork!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 sm:px-0">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={post.media_url}
                  alt={post.caption || 'Instagram post'}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  unoptimized
                  onError={(e) => {
                    console.error('Failed to load image:', post.media_url)
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full transition-colors duration-200"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              {post.caption && (
                <div className="p-4">
                  <p className="text-gray-700 text-sm overflow-hidden" style={{ 
                    display: '-webkit-box', 
                    WebkitLineClamp: 3, 
                    WebkitBoxOrient: 'vertical' 
                  }}>
                    {post.caption.length > 100 
                      ? `${post.caption.substring(0, 100)}...`
                      : post.caption
                    }
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(post.timestamp).toLocaleDateString()}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
      <div className="text-center pt-8">
        <a
          href="https://instagram.com/handhearthenna"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-pink-700 hover:to-purple-700 transition-all duration-200 font-medium"
        >
          <Instagram className="w-5 h-5" />
          Follow us on Instagram
        </a>
      </div>
    </div>
  )
}
