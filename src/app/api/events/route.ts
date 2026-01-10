import { NextResponse } from 'next/server'
import { getAllEvents, getUpcomingEvents, getPastEvents } from '@/lib/wordpress'

export const dynamic = 'force-dynamic'
export const revalidate = 300 // Revalidate every 5 minutes

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') // 'all', 'upcoming', 'past'

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

    return NextResponse.json({ 
      success: true,
      events,
      count: events.length
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
