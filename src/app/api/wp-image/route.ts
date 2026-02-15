import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get('url')

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
    }

    // Only allow images from your WordPress domain
    if (!imageUrl.includes('handheartecobodyart.local')) {
      return NextResponse.json({ error: 'Invalid image domain' }, { status: 403 })
    }

    // Fetch the image from WordPress
    const response = await fetch(imageUrl, {
      // @ts-ignore - Allow fetching from private networks
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: response.status })
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'image/png'

    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, immutable',
      },
    })
  } catch (error) {
    console.error('Error proxying image:', error)
    return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 })
  }
}
