'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from '@/components/Navigation'
import { Calendar, User, ArrowLeft, Share2, Heart, MessageCircle } from 'lucide-react'

interface BlogPostClientProps {
  title: string
  content: string
  author: string
  date: string
  category: string
  featuredImage?: string
  tags: string[]
}

export default function BlogPostClient({ 
  title, 
  content, 
  author, 
  date, 
  category, 
  featuredImage,
  tags 
}: BlogPostClientProps) {
  const readTime = `${Math.ceil(content.split(/\s+/).length / 200)} min read`

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="text-sm font-semibold text-pink-500 mb-4 uppercase tracking-wide">
              {category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
              <div className="flex items-center">
                <User size={18} className="mr-2" />
                {author}
              </div>
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                {new Date(date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div>{readTime}</div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Share:</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: title,
                        url: window.location.href
                      })
                    }
                  }}
                  className="p-2 bg-white rounded-lg border border-pink-200 hover:bg-pink-50 transition-colors duration-200"
                >
                  <Share2 size={18} className="text-pink-500" />
                </button>
                <button className="p-2 bg-white rounded-lg border border-pink-200 hover:bg-pink-50 transition-colors duration-200">
                  <Heart size={18} className="text-pink-500" />
                </button>
                <button className="p-2 bg-white rounded-lg border border-pink-200 hover:bg-pink-50 transition-colors duration-200">
                  <MessageCircle size={18} className="text-pink-500" />
                </button>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          {featuredImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <div className="aspect-video relative rounded-2xl overflow-hidden">
                <Image
                  src={featuredImage}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-lg max-w-none mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900 prose-a:text-pink-500 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </motion.article>

          {/* Tags */}
          {tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-12"
            >
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 border border-pink-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 mb-12"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">About {author}</h3>
                <p className="text-gray-600">
                  Professional face painting artist bringing joy to children and families through art. 
                  Specializing in creating magical experiences at birthday parties and special events.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
