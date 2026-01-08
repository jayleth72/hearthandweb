'use client'

import { Calendar, MapPin, Clock, Users, Star, ArrowRight, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/Navigation'

type EventType = 'festival' | 'party' | 'corporate' | 'community'

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  address: string
  description: string
  type: EventType
  featured?: boolean
}

interface PastEvent {
  id: string
  title: string
  date: string
  location: string
  description: string
  images: string[]
  attendees?: number
  type: EventType
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Arts Festival 2026',
    date: '2026-08-15',
    time: '10:00 AM - 6:00 PM',
    location: 'Central Park Community Center',
    address: '123 Park Avenue, Your City',
    description: 'Join us at the annual Summer Arts Festival! We\'ll be offering face painting and henna artistry for all ages. Come find our booth near the main stage area.',
    type: 'festival',
    featured: true
  },
  {
    id: '2',
    title: 'Spring Market Day',
    date: '2026-03-20',
    time: '9:00 AM - 4:00 PM',
    location: 'Downtown Farmers Market',
    address: '456 Market Street, Your City',
    description: 'Visit our booth at the Spring Market! Face painting for kids and beautiful henna designs for all ages.',
    type: 'community'
  },
  {
    id: '3',
    title: 'Corporate Family Fun Day',
    date: '2026-06-12',
    time: '11:00 AM - 4:00 PM',
    location: 'Available for Booking',
    address: 'Your Location',
    description: 'Book us for your corporate event! We provide professional face painting and henna services perfect for company picnics, team building events, and family days.',
    type: 'corporate',
    featured: true
  }
]

const pastEvents: PastEvent[] = [
  {
    id: '1',
    title: 'Winter Wonderland Festival 2025',
    date: '2025-12-15',
    location: 'City Plaza',
    description: 'Amazing winter-themed face painting for over 200 children at the annual Winter Wonderland Festival. Created snowflakes, reindeer, and festive designs.',
    images: ['/placeholder-gallery/placeholder-1.jpg', '/placeholder-gallery/placeholder-2.jpg', '/placeholder-gallery/placeholder-3.jpg'],
    attendees: 200,
    type: 'festival'
  },
  {
    id: '2',
    title: 'Children\'s Hospital Charity Gala',
    date: '2025-11-08',
    location: 'Grand Hotel Ballroom',
    description: 'Provided elegant henna designs for guests at this upscale charity event, helping raise funds for the Children\'s Hospital.',
    images: ['/placeholder-gallery/placeholder-4.jpg', '/placeholder-gallery/placeholder-5.jpg'],
    attendees: 150,
    type: 'corporate'
  },
  {
    id: '3',
    title: 'Halloween Spooktacular 2025',
    date: '2025-10-31',
    location: 'Downtown Square',
    description: 'Created spooky and fun Halloween designs for trick-or-treaters. Zombies, vampires, witches, and more!',
    images: ['/placeholder-gallery/placeholder-6.jpg', '/placeholder-gallery/placeholder-1.jpg', '/placeholder-gallery/placeholder-2.jpg'],
    attendees: 300,
    type: 'festival'
  },
  {
    id: '4',
    title: 'Tech Corp Annual Picnic',
    date: '2025-09-15',
    location: 'Riverside Park',
    description: 'Entertainment for employees and their families at this corporate event. Face painting station was a huge hit with kids of all ages!',
    images: ['/placeholder-gallery/placeholder-3.jpg', '/placeholder-gallery/placeholder-4.jpg'],
    attendees: 180,
    type: 'corporate'
  },
  {
    id: '5',
    title: 'Summer Music Festival 2025',
    date: '2025-07-22',
    location: 'Lakeside Amphitheater',
    description: 'Face painting and henna booth at the annual music festival. Created vibrant festival-style designs all day long!',
    images: ['/placeholder-gallery/placeholder-5.jpg', '/placeholder-gallery/placeholder-6.jpg', '/placeholder-gallery/placeholder-1.jpg'],
    attendees: 250,
    type: 'festival'
  },
  {
    id: '6',
    title: 'Spring Community Fair',
    date: '2025-05-10',
    location: 'Community Center',
    description: 'Supporting our local community with face painting for families. Butterflies, rainbows, and spring-themed designs were favorites!',
    images: ['/placeholder-gallery/placeholder-2.jpg', '/placeholder-gallery/placeholder-3.jpg'],
    attendees: 120,
    type: 'community'
  }
]

const getEventTypeColor = (type: Event['type']) => {
  switch (type) {
    case 'festival': return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    case 'party': return 'bg-pink-500/20 text-pink-300 border-pink-500/30'
    case 'corporate': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    case 'community': return 'bg-green-500/20 text-green-300 border-green-500/30'
    default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function EventsPage() {
  const featuredEvents = upcomingEvents.filter(event => event.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navigation />
      
      {/* Hero Header */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Events &{' '}
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Appearances
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Professional face painting and henna artistry for festivals, corporate events, parties, and community celebrations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-full hover:from-orange-700 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Book Us for Your Event
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-3 border-2 border-orange-500 text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-all duration-200"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>

          {/* Event Promoter Pitch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8 mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Event Promoters Choose Us
              </h2>
              <p className="text-lg text-gray-600">
                Professional, reliable, and experienced entertainment that makes your event memorable
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Quality</h3>
                <p className="text-gray-600">
                  High-quality, safe face paints and professional henna. Fully insured and certified.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Crowd Pleaser</h3>
                <p className="text-gray-600">
                  Engaging entertainment that keeps lines moving and attendees happy. Perfect for all ages.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Reliable Service</h3>
                <p className="text-gray-600">
                  Always on time, professional setup, and consistent service throughout your event.
                </p>
              </div>
            </div>
          </motion.div>
          {/* Past Events Gallery */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <ImageIcon className="text-orange-500" size={32} />
              <h2 className="text-3xl font-bold text-gray-900">Past Events Showcase</h2>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              See the magic we've brought to events across the region. From festivals to corporate gatherings, we make every occasion special.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image Gallery */}
                  <div className="grid grid-cols-3 gap-1">
                    {event.images.map((image, idx) => (
                      <div key={idx} className="aspect-square relative">
                        <Image
                          src={image}
                          alt={`${event.title} - Image ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Event Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                      {event.attendees && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users size={16} />
                          <span className="text-sm font-medium">{event.attendees}+ attendees</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar size={16} className="text-orange-500" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin size={16} className="text-orange-500" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Upcoming Events */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="text-orange-500" size={32} />
              <h2 className="text-3xl font-bold text-gray-900">Where to Find Us Next</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300 ${
                    event.featured ? 'border-orange-500 ring-2 ring-orange-200' : 'border-orange-100'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                      {event.featured && (
                        <Star className="text-orange-500 fill-orange-500" size={20} />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} className="text-orange-500" />
                        <span className="text-sm">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} className="text-orange-500" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-start gap-2 text-gray-600">
                        <MapPin size={16} className="text-orange-500 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium">{event.location}</div>
                          <div className="text-gray-500">{event.address}</div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                    
                    {event.featured && (
                      <Link
                        href="/contact"
                        className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                      >
                        Book Similar Event
                        <ArrowRight size={16} className="ml-1" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Make Your Event Unforgettable?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Whether it's a festival, corporate event, or private party, we bring professional artistry and engaging entertainment to every occasion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Get a Quote
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
