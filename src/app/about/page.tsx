'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Users, Award } from 'lucide-react'

export default function About() {
  const stats = [
    { icon: Users, number: '500+', label: 'Happy Clients' },
    // { icon: Star, number: '1000+', label: 'Events Completed' },
    { icon: Award, number: '30+', label: 'Years Experience' },
    { icon: Heart, number: '100%', label: 'Satisfaction Rate' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
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
              About{' '}
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Heart and Hand Eco Body Art
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate artists dedicated to bringing joy and creativity to your special events
            </p>
          </motion.div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Heart and Hand Eco Body Art was born from a simple belief: that art has the power to transform 
                  ordinary moments into magical memories. What started as a hobby painting faces 
                  at local community events has grown into a thriving business that brings joy 
                  to hundreds of families across the region.
                </p>
                <p>
                  Our team of skilled artists combines traditional techniques with modern creativity 
                  to deliver stunning face painting and henna art. We use only the highest quality, 
                  skin-safe materials and maintain the strictest hygiene standards to ensure every 
                  experience is both beautiful and safe.
                </p>
                <p>
                  Whether it&apos;s a child&apos;s birthday party, a cultural festival, or a corporate event, 
                  we pour our heart into every design and put our hands to work creating art that 
                  brings smiles to faces of all ages.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="order-1 lg:order-2"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex-shrink-0 mt-0.5"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Professional Quality</h4>
                      <p className="text-gray-600">FDA-approved, skin-safe paints and materials</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex-shrink-0 mt-0.5"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Experienced Artists</h4>
                      <p className="text-gray-600">Trained professionals with years of experience</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex-shrink-0 mt-0.5"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Custom Designs</h4>
                      <p className="text-gray-600">Personalized artwork tailored to your event</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex-shrink-0 mt-0.5"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Reliable Service</h4>
                      <p className="text-gray-600">Punctual, professional, and fully insured</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white rounded-xl p-6 shadow-lg border border-orange-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-white" size={32} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Add Magic to Your Event?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let&apos;s create beautiful memories together with our artistic services
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              className="inline-block bg-white text-pink-500 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
