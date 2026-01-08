'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from '@/components/Navigation'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
  readTime: string
}

interface BlogClientProps {
  posts: BlogPost[]
  categories: string[]
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

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
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 border border-pink-200'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No posts found in this category.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {filteredPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mb-16"
                >
                  <Link href={`/blog/${filteredPosts[0].slug}`}>
                    <div className="bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="aspect-video lg:aspect-auto relative">
                          <Image
                            src={filteredPosts[0].image}
                            alt={filteredPosts[0].title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                          <div className="text-sm font-semibold text-pink-500 mb-2 uppercase tracking-wide">
                            Featured Post
                          </div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-pink-600 transition-colors duration-200">
                            {filteredPosts[0].title}
                          </h2>
                          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                            {filteredPosts[0].excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <User size={16} className="mr-1" />
                                {filteredPosts[0].author}
                              </div>
                              <div className="flex items-center">
                                <Calendar size={16} className="mr-1" />
                                {new Date(filteredPosts[0].date).toLocaleDateString()}
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
              )}

              {/* Blog Posts Grid */}
              {filteredPosts.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.slice(1).map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                          <div className="aspect-video relative">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                            <div className="text-xs font-semibold text-pink-500 mb-2 uppercase tracking-wide">
                              {post.category}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-pink-600 transition-colors duration-200">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 mb-4 leading-relaxed flex-1">
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
              )}
            </>
          )}

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
