'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Palette, Heart } from 'lucide-react'

export function Hero() {
  return (
    <div className="pt-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Bringing{' '}
              <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Art
              </span>{' '}
              to Life
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Professional face painting and henna artistry for birthdays, festivals, 
              corporate events, and special celebrations. Creating magical moments 
              with beautiful, safe, and temporary art.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:from-rose-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                View Services
                <ArrowRight className="ml-2" size={20} />
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 border-2 border-pink-300 text-pink-600 font-semibold rounded-full hover:bg-pink-50 transition-all duration-200 transform hover:scale-105"
              >
                Book Now
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-pink-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Palette className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Face Painting</h3>
              <p className="text-gray-600">
                Creative and colorful face painting designs that delight children and adults alike.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-pink-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Henna Art</h3>
              <p className="text-gray-600">
                Beautiful traditional and modern henna designs for special occasions and celebrations.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 sm:col-span-2"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Event Services</h3>
              <p className="text-gray-600">
                Perfect for birthday parties, school events, festivals, corporate gatherings, 
                and any celebration that needs a touch of artistic magic.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
