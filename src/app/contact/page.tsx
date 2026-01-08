'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function Contact() {
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

  const handleContactClick = (action: string | null) => {
    if (action && typeof window !== 'undefined') {
      window.location.href = action
    }
  }

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
              Get in{' '}
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to add artistic magic to your event? Contact us directly to discuss your vision and create something beautiful together.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-start space-x-4 p-4 rounded-lg bg-gray-50 ${info.action ? 'cursor-pointer hover:bg-orange-50' : ''}`}
                      onClick={() => handleContactClick(info.action)}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                  <div className="space-y-3">
                    <p>• Email inquiries: Within 24 hours</p>
                    <p>• Phone calls: Same day return</p>
                  </div>
                  <div className="space-y-3">
                    <p>• Rush bookings: Available for urgent requests</p>
                    <p>• Consultation: Free quote discussions</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Booking Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-90">
                  <div className="space-y-3">
                    <p>• Book 2-4 weeks in advance for best availability</p>
                    <p>• Weekend dates fill up quickly</p>
                  </div>
                  <div className="space-y-3">
                    <p>• Group discounts available for multiple events</p>
                    <p>• Custom packages can be created for your needs</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

