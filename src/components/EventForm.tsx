'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, Clock, MapPin, Users, Link as LinkIcon, DollarSign, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react'
import type { CreateEventInput } from '@/lib/wordpress'
import type { WordPressEvent } from '@/types/wordpress'
import { useAuth } from '@/components/WordPressAuthProvider'
import { cleanHtmlContent } from '@/lib/html-utils'

interface EventFormProps {
  event?: WordPressEvent | null
  onClose: () => void
  onSuccess: () => void
}

export function EventForm({ event, onClose, onSuccess }: EventFormProps) {
  const { isAdmin } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadingImages, setUploadingImages] = useState<boolean[]>([false, false, false, false, false, false])
  const [imageUrls, setImageUrls] = useState<(string | null)[]>([null, null, null, null, null, null])
  const [imageIds, setImageIds] = useState<(number | null)[]>([null, null, null, null, null, null])
  
  const [formData, setFormData] = useState<Partial<CreateEventInput>>({
    title: '',
    content: '',
    excerpt: '',
    eventDate: '',
    eventTime: '',
    eventEndDate: '',
    locationName: '',
    address: '',
    eventType: 'community',
    isFeatured: false,
    maxAttendees: undefined,
    registrationLink: '',
    price: 'Free',
  })

  useEffect(() => {
    if (event) {
      console.log('Loading event data:', event);
      console.log('Event details:', event.eventDetails);
      console.log('Event date:', event.eventDetails?.eventDate);
      console.log('Event time:', event.eventDetails?.eventTime);
      
      setFormData({
        title: event.title,
        content: event.content ? cleanHtmlContent(event.content) : '',
        excerpt: event.excerpt ? cleanHtmlContent(event.excerpt) : '',
        eventDate: event.eventDetails?.eventDate || '',
        eventTime: event.eventDetails?.eventTime || '',
        eventEndDate: event.eventDetails?.eventEndDate || '',
        locationName: event.eventDetails?.locationName || '',
        address: event.eventDetails?.address || '',
        eventType: event.eventDetails?.eventType || 'community',
        isFeatured: event.eventDetails?.isFeatured || false,
        maxAttendees: event.eventDetails?.maxAttendees || undefined,
        registrationLink: event.eventDetails?.registrationLink || '',
        price: event.eventDetails?.price || 'Free',
      })

      // Load existing images
      const existingImageUrls: (string | null)[] = [null, null, null, null, null, null]
      const existingImageIds: (number | null)[] = [null, null, null, null, null, null]
      
      for (let i = 1; i <= 6; i++) {
        const imageKey = `eventImage${i}` as keyof typeof event.eventDetails
        const imageData = event.eventDetails?.[imageKey] as any
        
        // Handle nested GraphQL node structure
        const imageNode = imageData?.node || imageData
        
        if (imageNode) {
          const url = imageNode.url || imageNode.sourceUrl || null
          const id = imageNode.databaseId || imageNode.id || null
          
          existingImageUrls[i - 1] = url
          existingImageIds[i - 1] = id
        }
      }
      
      setImageUrls(existingImageUrls)
      setImageIds(existingImageIds)
    }
  }, [event])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if user is creating a new event and is not an admin
    if (!event && !isAdmin) {
      setError('Only administrators can create new events')
      return
    }
    
    setLoading(true)
    setError(null)

    try {
      // Prepare payload with image IDs
      const eventPayload: any = { ...formData }
      
      // Add image IDs to the payload
      console.log('Current image IDs:', imageIds)
      for (let i = 0; i < 6; i++) {
        if (imageIds[i]) {
          eventPayload[`event_image_${i + 1}`] = imageIds[i]
          console.log(`Adding image ${i + 1} with ID:`, imageIds[i])
        }
      }

      const payload = event
        ? { action: 'update', id: parseInt(event.id), ...eventPayload }
        : { action: 'create', ...eventPayload }

      console.log('Submitting event with payload:', payload)

      const response = await fetch('/api/events/manage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to save event')
      }

      console.log('Event saved successfully!')
      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (index: number, file: File) => {
    console.log(`Starting upload for image ${index + 1}:`, file.name)
    
    setUploadingImages(prev => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })

    try {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image must be less than 5MB')
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image')
      }

      // Create FormData for image upload
      const formData = new FormData()
      formData.append('file', file)

      console.log('Uploading via Next.js API...')
      
      // Upload via Next.js API route (server-side) to avoid CORS issues
      const response = await fetch('/api/upload-media', {
        method: 'POST',
        body: formData,
      })

      console.log('Upload response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Upload error:', errorData)
        throw new Error(errorData.error || `Upload failed: ${response.status}`)
      }

      const mediaData = await response.json()
      console.log('Upload successful! Media data:', mediaData)

      if (!mediaData.success) {
        throw new Error(mediaData.error || 'Upload failed')
      }

      // Update image URL and ID
      setImageUrls(prev => {
        const newUrls = [...prev]
        newUrls[index] = mediaData.source_url
        return newUrls
      })

      setImageIds(prev => {
        const newIds = [...prev]
        newIds[index] = mediaData.id
        return newIds
      })

      console.log(`Image ${index + 1} uploaded successfully:`, {
        id: mediaData.id,
        url: mediaData.source_url
      })
    } catch (err) {
      console.error('Image upload error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image'
      setError(errorMessage)
      alert(`Upload failed: ${errorMessage}`)
    } finally {
      setUploadingImages(prev => {
        const newState = [...prev]
        newState[index] = false
        return newState
      })
    }
  }

  const handleRemoveImage = (index: number) => {
    setImageUrls(prev => {
      const newUrls = [...prev]
      newUrls[index] = null
      return newUrls
    })

    setImageIds(prev => {
      const newIds = [...prev]
      newIds[index] = null
      return newIds
    })
  }

  const handleChange = (field: keyof CreateEventInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form - Scrollable Content */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Basic Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Summer Festival Face Painting"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="A brief description of the event..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Detailed event information, activities, what to expect..."
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Date & Time
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => handleChange('eventDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Time *
                </label>
                <input
                  type="text"
                  required
                  value={formData.eventTime}
                  onChange={(e) => handleChange('eventTime', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="10:00 AM - 6:00 PM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.eventEndDate}
                  onChange={(e) => handleChange('eventEndDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              Location
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue Name *
              </label>
              <input
                type="text"
                required
                value={formData.locationName}
                onChange={(e) => handleChange('locationName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Central Park Community Center"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="123 Park Avenue, Your City, State ZIP"
              />
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Event Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  required
                  value={formData.eventType}
                  onChange={(e) => handleChange('eventType', e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="festival">Festival</option>
                  <option value="party">Party</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="community">Community Event</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Free or $10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Attendees (Optional)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.maxAttendees || ''}
                  onChange={(e) => handleChange('maxAttendees', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Link (Optional)
                </label>
                <input
                  type="url"
                  value={formData.registrationLink}
                  onChange={(e) => handleChange('registrationLink', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://example.com/register"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => handleChange('isFeatured', e.target.checked)}
                className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                Mark as Featured Event
              </label>
            </div>
          </div>

          {/* Event Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-orange-600" />
              Event Images (Up to 6)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-orange-400 transition-colors">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image {index + 1} {index < 3 && '*'}
                  </label>
                  
                  {imageUrls[index] ? (
                    <div className="relative group">
                      <img
                        src={imageUrls[index]!}
                        alt={`Event image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 bg-gray-50 rounded-lg">
                      {uploadingImages[index] ? (
                        <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
                      ) : (
                        <>
                          <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                          <label className="cursor-pointer text-sm text-orange-600 hover:text-orange-700">
                            <span>Upload Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(index, file)
                              }}
                            />
                          </label>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-500">
              * First 3 images are recommended for best display. Supported formats: JPG, PNG, WebP (max 5MB each)
            </p>
          </div>
          </div>

          {/* Action Buttons - Fixed Footer */}
          <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 flex-shrink-0 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
