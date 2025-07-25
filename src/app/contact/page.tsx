'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/Navigation'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    guestCount: '',
    services: [] as string[],
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: '',
        guestCount: '',
        services: [],
        message: ''
      })
    }, 2000)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '044 9979 181',
      action: 'tel:+61449979181'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@handheartecobodyart.com',
      action: 'mailto:info@handheartecobodyart.com'
    },
    {
      icon: MapPin,
      title: 'Service Area',
      details: 'Mary Valley QLD and Surrounding Communities',
      action: null
    },
    {
      icon: Clock,
      title: 'Availability',
      details: 'Weekends and Evenings\nAdvance booking recommended',
      action: null
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
              Get in{' '}
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to add artistic magic to your event? Let&apos;s discuss your vision and create something beautiful together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Book Your Event</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">Thank you! We&apos;ll get back to you within 24 hours.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Event Type
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select event type</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="school">School Event</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="festival">Festival/Fair</option>
                      <option value="wedding">Wedding</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      placeholder="Estimated number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Services Needed
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['Face Painting', 'Henna Art', 'Both Services'].map((service) => (
                      <label key={service} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceChange(service)}
                          className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tell us about your event, theme preferences, or any special requests..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-4 px-8 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send Request
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-start space-x-4 ${info.action ? 'cursor-pointer' : ''}`}
                      onClick={() => info.action && window.open(info.action)}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                        <p className="text-gray-600 whitespace-pre-line">{info.details}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Response Times</h3>
                <div className="space-y-3 text-gray-600">
                  <p>• Email inquiries: Within 24 hours</p>
                  <p>• Phone calls: Same day return</p>
                  <p>• Rush bookings: Available for urgent requests</p>
                  <p>• Consultation: Free quote discussions</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Booking Tips</h3>
                <div className="space-y-3 opacity-90">
                  <p>• Book 2-4 weeks in advance for best availability</p>
                  <p>• Weekend dates fill up quickly</p>
                  <p>• Group discounts available for multiple events</p>
                  <p>• Custom packages can be created for your needs</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
