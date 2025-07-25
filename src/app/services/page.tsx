'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/Navigation'
import { Palette, Heart, Star, Users, Clock, Shield } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: Palette,
      title: 'Face Painting',
      description: 'Transform into your favorite character with our vibrant, safe face paints',
      features: [
        'Superhero designs',
        'Animal faces',
        'Princess &amp; fairy themes',
        'Custom characters',
        'Quick 5-10 minute designs',
        'Full face masterpieces'
      ],
      price: 'Starting at $150/hour'
    },
    {
      icon: Heart,
      title: 'Henna Art',
      description: 'Beautiful temporary tattoos using traditional and modern henna designs',
      features: [
        'Traditional patterns',
        'Modern geometric designs',
        'Bridal henna',
        'Festival art',
        'Custom motifs',
        'Natural ingredients'
      ],
      price: 'Starting at $200/hour'
    },
    {
      icon: Star,
      title: 'Event Packages',
      description: 'Complete entertainment packages for your special celebrations',
      features: [
        'Birthday parties',
        'School events',
        'Corporate functions',
        'Festivals &amp; fairs',
        'Wedding entertainment',
        'Holiday celebrations'
      ],
      price: 'Custom pricing available'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Safe Materials',
      description: 'FDA-approved, non-toxic paints and natural henna'
    },
    {
      icon: Users,
      title: 'All Ages',
      description: 'Designs suitable for children and adults'
    },
    {
      icon: Clock,
      title: 'Flexible Timing',
      description: 'Available for short sessions or all-day events'
    }
  ]

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
                Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional artistic services to make your event unforgettable
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100 h-full"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="text-white" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What&apos;s Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t border-orange-100 pt-6">
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    {service.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Our Services?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center bg-white rounded-xl p-6 shadow-lg border border-orange-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100 mb-20"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Pricing Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Hourly Rates</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex justify-between">
                    <span>Face Painting (1 artist)</span>
                    <span className="font-semibold">$150/hour</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Henna Art (1 artist)</span>
                    <span className="font-semibold">$200/hour</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Combined Package</span>
                    <span className="font-semibold">$300/hour</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 2-hour minimum booking</li>
                  <li>• Travel fees may apply (30+ miles)</li>
                  <li>• Group discounts available</li>
                  <li>• Setup/cleanup time included</li>
                  <li>• All supplies provided</li>
                  <li>• Liability insurance included</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Book Your Event?</h2>
            <p className="text-xl mb-8 opacity-90">
              Contact us today to discuss your needs and get a custom quote
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                className="inline-block bg-white text-pink-500 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                Get Quote
              </motion.a>
              <motion.a
                href="tel:+1234567890"
                whileHover={{ scale: 1.05 }}
                className="inline-block border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-pink-500 transition-colors duration-200"
              >
                Call Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
