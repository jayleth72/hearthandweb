import { NextResponse } from 'next/server'
import { getAllEvents, getUpcomingEvents, getPastEvents } from '@/lib/wordpress'

export const dynamic = 'force-dynamic'
export const revalidate = 0 // Disable caching - always fetch fresh data

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') // 'all', 'upcoming', 'past'

    console.log('Events API - Fetching events with filter:', filter)

    let events
    
    switch (filter) {
      case 'upcoming':
        events = await getUpcomingEvents()
        break
      case 'past':
        events = await getPastEvents()
        break
      default:
        events = await getAllEvents()
    }

    console.log('Events API - Returning', events.length, 'events')

    return NextResponse.json({ 
      success: true,
      events,
      count: events.length
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      }
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch events',
        events: []
      },
      { status: 500 }
    )
  }
}
