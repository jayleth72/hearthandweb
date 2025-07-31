import { Calendar, MapPin, Clock, Users, Star } from 'lucide-react'
import Link from 'next/link'

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  address: string
  description: string
  type: 'festival' | 'party' | 'corporate' | 'community'
  featured?: boolean
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Arts Festival',
    date: '2025-08-15',
    time: '10:00 AM - 6:00 PM',
    location: 'Central Park Community Center',
    address: '123 Park Avenue, Your City',
    description: 'Join us at the annual Summer Arts Festival! We\'ll be offering face painting and henna artistry for all ages. Come find our booth near the main stage area.',
    type: 'festival',
    featured: true
  },
  {
    id: '2',
    title: 'Children&apos;s Birthday Party Showcase',
    date: '2025-08-22',
    time: '2:00 PM - 5:00 PM',
    location: 'Little Sprouts Party Venue',
    address: '456 Celebration Street, Your City',
    description: 'Demonstrating our party services at this special birthday celebration. See our work in action and book your next event!',
    type: 'party'
  },
  {
    id: '3',
    title: 'Corporate Family Fun Day',
    date: '2025-09-05',
    time: '11:00 AM - 4:00 PM',
    location: 'TechCorp Headquarters',
    address: '789 Business Blvd, Your City',
    description: 'Providing face painting entertainment for employees and their families at this annual company picnic.',
    type: 'corporate'
  },
  {
    id: '4',
    title: 'School Fall Festival',
    date: '2025-09-20',
    time: '12:00 PM - 8:00 PM',
    location: 'Sunshine Elementary School',
    address: '321 Learning Lane, Your City',
    description: 'Supporting the local school community with face painting and henna services at their annual fall fundraiser.',
    type: 'community'
  },
  {
    id: '5',
    title: 'Halloween Spooktacular',
    date: '2025-10-31',
    time: '4:00 PM - 9:00 PM',
    location: 'Downtown Square',
    address: 'Main Street Plaza, Your City',
    description: 'Creating spooky and fun Halloween face painting designs for trick-or-treaters and festival goers!',
    type: 'festival',
    featured: true
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-24 pb-12 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Upcoming{' '}
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find us at these exciting events! Come see our face painting and henna artistry in action, 
              or book us for your own special celebration.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Star className="text-orange-500" size={28} />
              <h2 className="text-3xl font-bold text-white">Featured Events</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredEvents.map((event) => (
                <div key={event.id} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-orange-500/30 rounded-xl p-6 shadow-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(event.type)}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                    <Star className="text-orange-500 fill-orange-500" size={20} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{event.title}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="text-orange-500" size={18} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock className="text-orange-500" size={18} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-300">
                      <MapPin className="text-orange-500 mt-0.5" size={18} />
                      <div>
                        <div className="font-medium">{event.location}</div>
                        <div className="text-sm text-gray-400">{event.address}</div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{event.description}</p>
                  
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-full hover:from-orange-700 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
                  >
                    Book Similar Event
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Upcoming Events */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="text-orange-500" size={28} />
            <h2 className="text-3xl font-bold text-white">All Upcoming Events</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(event.type)}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                  {event.featured && <Star className="text-orange-500 fill-orange-500" size={16} />}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Calendar className="text-orange-500" size={16} />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Clock className="text-orange-500" size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-300 text-sm">
                    <MapPin className="text-orange-500 mt-0.5" size={16} />
                    <div>
                      <div className="font-medium">{event.location}</div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{event.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-orange-500/30 rounded-xl p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="text-orange-500" size={32} />
              <h2 className="text-3xl font-bold text-white">Want Us at Your Event?</h2>
            </div>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              We&apos;d love to bring our artistic magic to your special occasion! 
              Contact us to discuss availability and custom packages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-full hover:from-orange-700 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
              >
                Book Your Event
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
    </div>
  )
}
