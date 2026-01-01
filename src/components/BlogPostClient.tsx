'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Calendar, User, ArrowLeft, Share2, Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import type { BlogPostData } from '@/types/wordpress'

interface BlogPostClientProps {
  post: BlogPostData | null
  source: 'wordpress' | 'local'
}

export default function BlogPostClient({ post, source }: BlogPostClientProps) {
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/blog" className="text-pink-500 font-semibold hover:text-pink-600">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

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
              {post.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
              <div className="flex items-center">
                <User size={18} className="mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              {post.readTime && <div>{post.readTime}</div>}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Share:</span>
              <div className="flex gap-2">
                <button className="p-2 bg-white rounded-lg border border-pink-200 hover:bg-pink-50 transition-colors duration-200">
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
          {post.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <div className="aspect-video relative rounded-2xl overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.imageAlt || post.title}
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
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </motion.article>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 mb-12"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">About {post.author}</h3>
                <p className="text-gray-600">
                  {post.author} is a professional face painting artist bringing joy to children and families through art.
                  {source === 'wordpress' && ' Content powered by WordPress.'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-12"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white border border-pink-200 rounded-full text-sm text-gray-600 hover:bg-pink-50 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Back to Blog */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to All Posts
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
