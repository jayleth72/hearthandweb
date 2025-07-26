'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Instagram, ExternalLink, Camera, Heart, Palette, Loader2 } from 'lucide-react'

// Sample data structure for Instagram posts (replace with real API data)
interface InstagramPost {
  id: string
  media_url: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  caption?: string
  permalink: string
  timestamp: string
}

// Sample Instagram posts (you'll replace this with real API calls)
const sampleInstagramPosts: InstagramPost[] = [
  {
    id: '1',
    media_url: '/placeholder-gallery/face-paint-1.jpg',
    media_type: 'IMAGE',
    caption: 'Beautiful butterfly face painting at today\'s birthday party! 🦋✨ #FacePainting #HeartAndHand',
    permalink: 'https://www.instagram.com/handhearthenna/',
    timestamp: '2025-07-20T10:00:00Z'
  },
  {
    id: '2',
    media_url: '/placeholder-gallery/henna-1.jpg',
    media_type: 'IMAGE',
    caption: 'Intricate henna design for a special celebration 🌸 #HennaArt #TemporaryTattoo',
    permalink: 'https://www.instagram.com/handhearthenna/',
    timestamp: '2025-07-19T15:30:00Z'
  },
  {
    id: '3',
    media_url: '/placeholder-gallery/face-paint-2.jpg',
    media_type: 'IMAGE',
    caption: 'Superhero party was a huge success! Every kid got their favorite hero 🦸‍♂️',
    permalink: 'https://www.instagram.com/handhearthenna/',
    timestamp: '2025-07-18T12:00:00Z'
  },
  {
    id: '4',
    media_url: '/placeholder-gallery/henna-2.jpg',
    media_type: 'IMAGE',
    caption: 'Delicate floral henna patterns ✨ Perfect for summer events!',
    permalink: 'https://www.instagram.com/handhearthenna/',
    timestamp: '2025-07-17T09:15:00Z'
  },
  {
    id: '5',
    media_url: '/placeholder-gallery/face-paint-3.jpg',
    media_type: 'IMAGE',
    caption: 'Rainbow unicorn magic at the school festival! 🌈🦄',
    permalink: 'https://www.instagram.com/handhearthenna/',
    timestamp: '2025-07-16T14:20:00Z'
  },
  {
    id: '6',
    media_url: '/placeholder-gallery/henna-3.jpg',
    media_type: 'IMAGE',
    caption: 'Traditional mandala design with modern touches 🕉️',
    permalink: 'https://www.instagram.com/handhearthenna/',
    timestamp: '2025-07-15T11:45:00Z'
  },
  {
    id: '7',
    media_url: '/placeholder-gallery/face-paint-4.jpg',
    media_type: 'IMAGE',
    caption: 'Spiderman face paint that made this little one\'s day! 🕷️',
    permalink: 'https://www.instagram.com/handhearthenna/',
    timestamp: '2025-07-14T16:30:00Z'
  },
  {
    id: '8',
    media_url: '/placeholder-gallery/henna-4.jpg',
    media_type: 'IMAGE',
    caption: 'Bridal henna preparations - such an honor to be part of special moments 💍',
    permalink: 'https://www.instagram.com/handhearthenna/',
    timestamp: '2025-07-13T13:00:00Z'
  }
]

export default function Gallery() {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  // Fetch Instagram posts from API
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setLoading(true)
        
        const response = await fetch('/api/instagram-posts')
        const data = await response.json()
        
        if (data.error) {
          setError(data.error)
        }
        
        setInstagramPosts(data.posts || [])
        setIsDemo(data.isDemo || false)
        
      } catch (err) {
        setError('Failed to load Instagram posts')
        console.error('Error fetching Instagram posts:', err)
        // Fallback to sample data
        setInstagramPosts(sampleInstagramPosts)
        setIsDemo(true)
      } finally {
        setLoading(false)
      }
    }

    fetchInstagramPosts()
  }, [])

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }
  // Sample gallery categories to showcase your work types
  const galleryCategories = [
    {
      title: "Face Painting",
      description: "Creative and colorful designs for all ages",
      icon: Palette,
      examples: [
        "Superhero designs",
        "Animal faces", 
        "Fantasy creatures",
        "Floral patterns"
      ]
    },
    {
      title: "Henna Art",
      description: "Beautiful traditional and modern henna designs",
      icon: Heart,
      examples: [
        "Bridal henna",
        "Festival designs",
        "Geometric patterns",
        "Floral motifs"
      ]
    },
    {
      title: "Event Highlights",
      description: "Memorable moments from our events",
      icon: Camera,
      examples: [
        "Birthday parties",
        "Corporate events",
        "School festivals",
        "Community gatherings"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-24 pb-12 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Our{' '}
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Gallery
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Explore our latest face painting and henna artistry! Follow our Instagram 
              for daily updates, behind-the-scenes content, and inspiration for your next event.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Instagram CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-2 border-orange-500/30 rounded-xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Instagram className="text-orange-500" size={40} />
              <h2 className="text-3xl font-bold text-white">Follow Our Journey</h2>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              See our latest work, get inspired, and stay updated with our artistic adventures! 
              We post new photos regularly showcasing our face painting and henna designs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com/handhearthenna/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-full hover:from-pink-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Instagram className="mr-3" size={24} />
                Follow @handhearthenna
                <ExternalLink className="ml-2" size={20} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-gray-900 transition-all duration-200 transform hover:scale-105"
              >
                Book Your Event
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Gallery Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What You'll See</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-200"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <category.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">{category.title}</h3>
                <p className="text-gray-300 mb-4 text-center">{category.description}</p>
                <ul className="space-y-2">
                  {category.examples.map((example, idx) => (
                    <li key={idx} className="text-gray-400 text-sm flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      {example}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Instagram Feed */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Latest Instagram Posts</h2>
            <p className="text-gray-300">Our recent work and behind-the-scenes moments</p>
            {isDemo && (
              <div className="mt-3 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-lg inline-block">
                <p className="text-orange-300 text-sm">
                  🔄 Demo Mode: Showing sample content. Connect Instagram API for live posts.
                </p>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-orange-500 mr-3" size={32} />
              <span className="text-gray-300 text-lg">Loading latest posts...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">{error}</p>
              <a
                href="https://www.instagram.com/handhearthenna/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-full hover:from-pink-700 hover:to-purple-700 transition-all duration-200"
              >
                <Instagram className="mr-2" size={20} />
                View on Instagram
                <ExternalLink className="ml-2" size={16} />
              </a>
            </div>
          ) : (
            <>
              {/* Instagram Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {instagramPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.8 }}
                    className="group cursor-pointer"
                  >
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-orange-500/50 transition-all duration-200">
                        {/* Placeholder for actual image */}
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                          <div className="text-center">
                            <Camera className="text-gray-500 mx-auto mb-2" size={32} />
                            <p className="text-gray-500 text-sm">Instagram Photo</p>
                            <p className="text-gray-600 text-xs mt-1">{formatDate(post.timestamp)}</p>
                          </div>
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <div className="text-center text-white p-4">
                            <Instagram className="mx-auto mb-2" size={24} />
                            <p className="text-sm font-medium">View on Instagram</p>
                            <ExternalLink className="mx-auto mt-1" size={16} />
                          </div>
                        </div>
                      </div>
                      
                      {/* Caption preview */}
                      {post.caption && (
                        <div className="mt-3 px-2">
                          <p className="text-gray-300 text-sm line-clamp-2">
                            {post.caption.length > 80 
                              ? `${post.caption.substring(0, 80)}...` 
                              : post.caption
                            }
                          </p>
                          <p className="text-gray-500 text-xs mt-1">{formatDate(post.timestamp)}</p>
                        </div>
                      )}
                    </a>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <a
                  href="https://www.instagram.com/handhearthenna/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-800 border border-gray-700 text-gray-300 font-medium rounded-full hover:bg-gray-700 hover:border-orange-500/50 hover:text-white transition-all duration-200"
                >
                  <Instagram className="mr-2" size={20} />
                  View All Posts on Instagram
                  <ExternalLink className="ml-2" size={16} />
                </a>
              </div>
            </>
          )}
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-orange-500/30 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Create Magic?</h2>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Inspired by our work? Let's bring the same artistic magic to your next event! 
              Contact us to discuss your vision and book your celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-full hover:from-orange-700 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
              >
                Book Your Event
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-gray-900 transition-all duration-200 transform hover:scale-105"
              >
                View Services
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
