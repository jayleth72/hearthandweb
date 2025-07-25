'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Calendar, User, ArrowRight } from 'lucide-react'

// Mock blog posts - in a real app, this would come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: 'Creating Magical Birthday Memories with Face Painting',
    excerpt: 'Discover how face painting can transform an ordinary birthday party into an extraordinary celebration that kids will remember forever.',
    content: 'Face painting has become one of the most popular birthday party activities...',
    author: 'Sarah Heart',
    date: '2024-01-15',
    category: 'Birthday Parties',
    image: '/api/placeholder/600/400',
    slug: 'magical-birthday-memories'
  },
  {
    id: 2,
    title: 'The Art and History of Henna: From Tradition to Modern Design',
    excerpt: 'Explore the rich cultural heritage of henna art and how traditional techniques blend with contemporary styles in today\'s celebrations.',
    content: 'Henna art has been practiced for thousands of years across various cultures...',
    author: 'Sarah Heart',
    date: '2024-01-10',
    category: 'Henna Art',
    image: '/api/placeholder/600/400',
    slug: 'art-history-henna'
  },
  {
    id: 3,
    title: 'Safety First: What Parents Need to Know About Face Paint',
    excerpt: 'Learn about the importance of using safe, high-quality face paints and what questions to ask your face painting artist.',
    content: 'When planning a face painting activity for your event, safety should always be the top priority...',
    author: 'Sarah Heart',
    date: '2024-01-05',
    category: 'Safety Tips',
    image: '/api/placeholder/600/400',
    slug: 'safety-first-face-paint'
  },
  {
    id: 4,
    title: 'Top 10 Most Requested Face Painting Designs for Kids',
    excerpt: 'From superheroes to butterflies, discover the most popular face painting designs that kids love at parties and events.',
    content: 'After years of face painting at countless events, we\'ve noticed some clear favorites...',
    author: 'Sarah Heart',
    date: '2023-12-28',
    category: 'Design Ideas',
    image: '/api/placeholder/600/400',
    slug: 'top-10-face-painting-designs'
  },
  {
    id: 5,
    title: 'Planning the Perfect Henna Party for Teens',
    excerpt: 'Henna parties are becoming increasingly popular for teenage celebrations. Here\'s how to plan one that will be a hit.',
    content: 'Teenage parties can be challenging to plan, but henna parties offer a unique and engaging activity...',
    author: 'Sarah Heart',
    date: '2023-12-20',
    category: 'Party Planning',
    image: '/api/placeholder/600/400',
    slug: 'perfect-henna-party-teens'
  },
  {
    id: 6,
    title: 'Corporate Event Entertainment: Why Art Activities Work',
    excerpt: 'Discover how face painting and henna art can add a unique touch to corporate events and team building activities.',
    content: 'Corporate events don\'t have to be boring. Adding interactive art activities like face painting...',
    author: 'Sarah Heart',
    date: '2023-12-15',
    category: 'Corporate Events',
    image: '/api/placeholder/600/400',
    slug: 'corporate-event-entertainment'
  }
]

const categories = ['All', 'Birthday Parties', 'Henna Art', 'Safety Tips', 'Design Ideas', 'Party Planning', 'Corporate Events']

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tips, inspiration, and stories from the world of face painting and henna art
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full transition-all duration-200 ${
                  index === 0
                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 border border-pink-200'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <Link href={`/blog/${blogPosts[0].slug}`}>
              <div className="bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto">
                    <div className="w-full h-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center">
                      <span className="text-gray-500">Featured Image</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="text-sm font-semibold text-pink-500 mb-2 uppercase tracking-wide">
                      Featured Post
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-pink-600 transition-colors duration-200">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User size={16} className="mr-1" />
                          {blogPosts[0].author}
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {new Date(blogPosts[0].date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center text-pink-500 font-semibold">
                        Read More <ArrowRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="aspect-video bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center">
                      <span className="text-gray-500">Post Image</span>
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-semibold text-pink-500 mb-2 uppercase tracking-wide">
                        {post.category}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-pink-600 transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-pink-500 font-semibold">
                          Read More <ArrowRight size={14} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 text-center bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to our newsletter for the latest tips, inspiration, and special offers
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-pink-500 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
