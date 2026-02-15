import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createEvent, updateEvent, deleteEvent, type CreateEventInput, type UpdateEventInput } from '@/lib/wordpress'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// Helper function to verify admin access
async function isUserAdmin(request: Request): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('wp_auth_token')?.value

    console.log('Admin check - Token exists:', !!token);

    if (!token) {
      console.log('Admin check failed: No token found');
      return false
    }

    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || ''
    console.log('Admin check - WordPress URL:', wpUrl);
    
    const userResponse = await fetch(`${wpUrl}/wp-json/wp/v2/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    console.log('Admin check - User response status:', userResponse.status);

    if (userResponse.ok) {
      const userData = await userResponse.json()
      console.log('Admin check - User data:', {
        id: userData.id,
        name: userData.name,
        roles: userData.roles
      });
      const isAdmin = userData.roles?.includes('administrator') || false
      console.log('Admin check - Is admin:', isAdmin);
      return isAdmin
    }

    console.log('Admin check failed: User response not ok');
    return false
  } catch (error) {
    console.error('Admin verification error:', error)
    return false
  }
}

// POST - Create or Update Event
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, ...data } = body

    if (action === 'create') {
      // Verify admin access for creating events
      const isAdmin = await isUserAdmin(request)
      if (!isAdmin) {
        return NextResponse.json(
          { success: false, error: 'Only administrators can create events' },
          { status: 403 }
        )
      }

      // Get JWT token for WordPress authentication
      const cookieStore = await cookies()
      const token = cookieStore.get('wp_auth_token')?.value || ''

      let eventId;
      try {
        eventId = await createEvent(data as CreateEventInput, token)
      } catch (error) {
        console.error('Create event error:', error);
        return NextResponse.json(
          { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to create event' 
          },
          { status: 500 }
        )
      }

      // Wait a moment for WordPress to index the new event in GraphQL
      await new Promise(resolve => setTimeout(resolve, 500))

      // Revalidate the events pages to show new event immediately
      revalidatePath('/events')
      revalidatePath('/api/events')

      return NextResponse.json({
        success: true,
        eventId,
        message: 'Event created successfully'
      })
    }

    if (action === 'update') {
      // Get JWT token for WordPress authentication
      const cookieStore = await cookies()
      const token = cookieStore.get('wp_auth_token')?.value || ''

      try {
        await updateEvent(data as UpdateEventInput, token)
      } catch (error) {
        console.error('Update event error:', error);
        return NextResponse.json(
          { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to update event' 
          },
          { status: 500 }
        )
      }

      // Revalidate the events pages to show updated event immediately
      revalidatePath('/events')
      revalidatePath('/api/events')

      return NextResponse.json({
        success: true,
        message: 'Event updated successfully'
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error managing event:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to manage event'
      },
      { status: 500 }
    )
  }
}

// DELETE - Delete Event
export async function DELETE(request: Request) {
  try {
    // Verify admin access for deleting events
    const isAdmin = await isUserAdmin(request)
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Only administrators can delete events' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      )
    }

    // Get JWT token for WordPress authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('wp_auth_token')?.value || ''

    const success = await deleteEvent(parseInt(id), token)
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete event' },
        { status: 500 }
      )
    }

    // Revalidate the events pages to remove deleted event immediately
    revalidatePath('/events')
    revalidatePath('/api/events')

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete event'
      },
      { status: 500 }
    )
  }
}
