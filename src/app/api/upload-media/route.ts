import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    console.log('=== MEDIA UPLOAD API START ===')
    
    // Get the form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      console.error('No file provided in request')
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size
    })

    // Get auth token from cookies
    const cookieStore = await cookies()
    const token = cookieStore.get('wp_auth_token')?.value

    if (!token) {
      console.error('No authentication token found')
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    console.log('Token found, uploading to WordPress...')

    // Forward the upload to WordPress
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://handheartecobodyart.local'
    const uploadUrl = `${wpUrl}/wp-json/wp/v2/media`
    
    console.log('Uploading to:', uploadUrl)

    // Create new FormData for WordPress
    const wpFormData = new FormData()
    wpFormData.append('file', file)

    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: wpFormData,
    })

    console.log('WordPress response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('WordPress upload failed:', errorText)
      return NextResponse.json(
        { 
          success: false, 
          error: `Upload failed: ${response.status} ${response.statusText}`,
          details: errorText
        },
        { status: response.status }
      )
    }

    const mediaData = await response.json()
    console.log('Upload successful! Media ID:', mediaData.id)
    console.log('=== MEDIA UPLOAD API END ===')

    return NextResponse.json({
      success: true,
      id: mediaData.id,
      source_url: mediaData.source_url,
      alt_text: mediaData.alt_text || '',
      media_details: mediaData.media_details
    })

  } catch (error) {
    console.error('Media upload API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      },
      { status: 500 }
    )
  }
}
