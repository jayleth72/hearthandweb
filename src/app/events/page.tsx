'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Users, Star, ArrowRight, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/Navigation'
import type { WordPressEvent } from '@/types/wordpress'
import { getEventImages } from '@/lib/wordpress'

type EventType = 'festival' | 'party' | 'corporate' | 'community'

const getEventTypeColor = (type: EventType) => {
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
  const [upcomingEvents, setUpcomingEvents] = useState<WordPressEvent[]>([])
  const [pastEvents, setPastEvents] = useState<WordPressEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        
        // Fetch upcoming events
        const upcomingRes = await fetch('/api/events?filter=upcoming')
        const upcomingData = await upcomingRes.json()
        
        // Fetch past events
        const pastRes = await fetch('/api/events?filter=past')
        const pastData = await pastRes.json()
        
        if (upcomingData.success) {
          setUpcomingEvents(upcomingData.events)
        }
        
        if (pastData.success) {
          setPastEvents(pastData.events)
        }
      } catch (err) {
        console.error('Error fetching events:', err)
        setError('Failed to load events. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const featuredEvents = upcomingEvents.filter(event => event.eventDetails?.isFeatured)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Navigation />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Navigation />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

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
              See the magic Hand & Heart has brought to events across the region. From festivals to corporate gatherings, we make every occasion special.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastEvents.map((event, index) => {
                const eventType = (event.eventDetails?.eventType || 'community') as EventType
                const eventImages = getEventImages(event)
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Image Gallery */}
                    {eventImages.length > 0 && (
                      <div className={`grid gap-1 ${eventImages.length === 1 ? 'grid-cols-1' : eventImages.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                        {eventImages.slice(0, 6).map((image, idx) => (
                          <div key={idx} className="aspect-square relative">
                            <Image
                              src={image.sourceUrl}
                              alt={image.altText || `${event.title} - Image ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Event Details */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(eventType)}`}>
                          {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
                        </span>
                        {event.eventDetails?.attendeeCount && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users size={16} />
                            <span className="text-sm font-medium">{event.eventDetails.attendeeCount}+ attendees</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Calendar size={16} className="text-orange-500" />
                          <span>{event.eventDetails?.eventDate ? formatDate(event.eventDetails.eventDate) : formatDate(event.date)}</span>
                        </div>
                        {event.eventDetails?.locationName && (
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <MapPin size={16} className="text-orange-500" />
                            <span>{event.eventDetails.locationName}</span>
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className="text-gray-600 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: event.excerpt || '' }}
                      />
                    </div>
                  </motion.div>
                )
              })}
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
              {upcomingEvents.map((event, index) => {
                const eventType = (event.eventDetails?.eventType || 'community') as EventType
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className={`bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300 ${
                      event.eventDetails?.isFeatured ? 'border-orange-500 ring-2 ring-orange-200' : 'border-orange-100'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(eventType)}`}>
                          {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
                        </span>
                        {event.eventDetails?.isFeatured && (
                          <Star className="text-orange-500 fill-orange-500" size={20} />
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={16} className="text-orange-500" />
                          <span className="text-sm">{event.eventDetails?.eventDate ? formatDate(event.eventDetails.eventDate) : 'TBA'}</span>
                        </div>
                        {event.eventDetails?.eventTime && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={16} className="text-orange-500" />
                            <span className="text-sm">{event.eventDetails.eventTime}</span>
                          </div>
                        )}
                        {event.eventDetails?.locationName && (
                          <div className="flex items-start gap-2 text-gray-600">
                            <MapPin size={16} className="text-orange-500 mt-0.5" />
                            <div className="text-sm">
                              <div className="font-medium">{event.eventDetails.locationName}</div>
                              {event.eventDetails.address && (
                                <div className="text-gray-500">{event.eventDetails.address}</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className="text-gray-600 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: event.excerpt || '' }}
                      />
                    </div>
                  </motion.div>
                )
              })}
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
                Whether it&apos;s a festival, corporate event, or private party, we bring professional artistry and engaging entertainment to every occasion.
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
