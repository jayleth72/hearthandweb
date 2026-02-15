'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/WordPressAuthProvider';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { EventForm } from '@/components/EventForm';
import { cleanHtmlContent } from '@/lib/html-utils';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Loader2, 
  MapPin, 
  Clock,
  Star,
  ArrowLeft
} from 'lucide-react';
import type { WordPressEvent } from '@/types/wordpress';
import Link from 'next/link';

export default function EventManagementPage() {
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  
  const [events, setEvents] = useState<WordPressEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<WordPressEvent | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events?filter=${filter}`);
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(`/api/events/manage?id=${eventId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchEvents();
      } else {
        alert('Failed to delete event: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('An error occurred while deleting the event');
    }
  };

  const handleEdit = (event: WordPressEvent) => {
    console.log('handleEdit - Full event object:', event);
    console.log('handleEdit - eventDetails:', event.eventDetails);
    console.log('handleEdit - eventDate:', event.eventDetails?.eventDate);
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleFormSuccess = () => {
    fetchEvents();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'festival': return 'bg-purple-100 text-purple-800';
      case 'party': return 'bg-pink-100 text-pink-800';
      case 'corporate': return 'bg-blue-100 text-blue-800';
      case 'community': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="animate-spin w-12 h-12 text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navigation />

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-orange-600" />
                  Event Management
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Create and manage past and future events
                </p>
              </div>
            </div>
            {isAdmin && (
              <button
                onClick={() => {
                  setEditingEvent(null);
                  setShowForm(true);
                }}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 font-medium shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add New Event
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Permission Notice for Non-Admins */}
        {!isAdmin && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900 mb-1">View-Only Access</h4>
              <p className="text-sm text-blue-700">
                You can view and edit events, but only administrators can create or delete events.
              </p>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 inline-flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-orange-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Events ({events.length})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'upcoming'
                ? 'bg-orange-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'past'
                ? 'bg-orange-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Past
          </button>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin w-12 h-12 text-orange-600" />
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600 mb-6">
              {isAdmin ? 'Get started by creating your first event' : 'No events have been created yet'}
            </p>
            {isAdmin && (
              <button
                onClick={() => {
                  setEditingEvent(null);
                  setShowForm(true);
                }}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Event
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {event.title}
                        </h3>
                        {event.eventDetails?.isFeatured && (
                          <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            <Star className="w-3 h-3 fill-current" />
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">
                        {event.excerpt ? cleanHtmlContent(event.excerpt) : 'No description'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(event)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit event"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete event"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {event.eventDetails?.eventDate && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span className="text-sm">
                          {formatDate(event.eventDetails.eventDate)}
                        </span>
                      </div>
                    )}
                    
                    {event.eventDetails?.eventTime && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span className="text-sm">
                          {event.eventDetails.eventTime}
                        </span>
                      </div>
                    )}
                    
                    {event.eventDetails?.locationName && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-orange-600" />
                        <span className="text-sm">
                          {event.eventDetails.locationName}
                        </span>
                      </div>
                    )}
                    
                    {event.eventDetails?.eventType && (
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(Array.isArray(event.eventDetails.eventType) ? event.eventDetails.eventType[0] : event.eventDetails.eventType)}`}>
                          {(() => {
                            const type = Array.isArray(event.eventDetails.eventType) ? event.eventDetails.eventType[0] : event.eventDetails.eventType;
                            return type ? type.charAt(0).toUpperCase() + type.slice(1) : '';
                          })()}
                        </span>
                      </div>
                    )}
                  </div>

                  {event.eventDetails?.address && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        {event.eventDetails.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Event Form Modal */}
      {showForm && (
        <EventForm
          event={editingEvent}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
