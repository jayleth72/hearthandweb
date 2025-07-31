'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Camera, Star, Users, Calendar } from 'lucide-react'

const workCategories = [
  {
    id: 'face-painting',
    title: 'Face Painting',
    description: 'Creative and colorful designs that bring joy to children and adults alike.',
    icon: '🎨',
    examples: ['Butterflies', 'Superheroes', 'Animals', 'Fantasy designs']
  },
  {
    id: 'henna',
    title: 'Henna Art',
    description: 'Beautiful traditional and modern henna designs for special occasions.',
    icon: '🌿',
    examples: ['Mandala patterns', 'Floral designs', 'Geometric art', 'Custom requests']
  },
  {
    id: 'events',
    title: 'Event Services',
    description: 'Professional entertainment for birthdays, festivals, and corporate events.',
    icon: '🎉',
    examples: ['Birthday parties', 'School events', 'Corporate gatherings', 'Community festivals']
  }
]

const features = [
  {
    icon: <Star className="text-orange-500" size={24} />,
    title: 'Professional Quality',
    description: 'High-quality, safe, and hypoallergenic materials for all our artistry.'
  },
  {
    icon: <Users className="text-orange-500" size={24} />,
    title: 'All Ages Welcome',
    description: 'Designs and services suitable for children, teens, and adults.'
  },
  {
    icon: <Calendar className="text-orange-500" size={24} />,
    title: 'Event Booking',
    description: 'Available for parties, festivals, corporate events, and special occasions.'
  }
]

export default function GalleryPage() {
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
              Discover the magic of our artistic creations. From vibrant face paintings to intricate henna designs, 
              see how we bring joy and creativity to every event.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Work Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{category.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">{category.title}</h3>
                <p className="text-gray-300 mb-6 text-center">{category.description}</p>
                <div className="space-y-2">
                  <h4 className="text-orange-500 font-semibold">Popular designs:</h4>
                  <ul className="text-gray-300 space-y-1">
                    {category.examples.map((example, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-gray-800 to-gray-700 border border-orange-500/30 rounded-xl p-8"
          >
            <Camera className="text-orange-500 mx-auto mb-4" size={48} />
            <h2 className="text-3xl font-bold text-white mb-4">See Our Latest Work</h2>
            <p className="text-xl text-gray-300 mb-6">
              Follow us on Instagram for daily inspiration, behind-the-scenes content, 
              and our latest artistic creations!
            </p>
            <a
              href="https://instagram.com/heartandhandecobodyart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-full hover:from-orange-700 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
            >
              Follow @heartandhandecobodyart
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Heart & Hand?</h2>
            <p className="text-xl text-gray-300">Professional artistry you can trust</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gray-800 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Now CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Add Magic to Your Event?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Book our professional face painting and henna services for your next celebration!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-full hover:from-orange-700 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
            >
              Book Now
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-gray-900 transition-all duration-200 transform hover:scale-105"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
