import { NextResponse } from 'next/server'

// Instagram Basic Display API configuration
// You'll need to set these environment variables in your .env.local file
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID

interface InstagramPost {
  id: string
  media_url: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  caption?: string
  permalink: string
  timestamp: string
}

export async function GET() {
  try {
    // Check if environment variables are set
    if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
      console.warn('Instagram API credentials not configured')
      // Return sample data when API is not configured
      return NextResponse.json({
        posts: getSamplePosts(),
        isDemo: true
      })
    }

    // Instagram Basic Display API endpoint
    const instagramApiUrl = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,media_url,media_type,caption,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=12`

    const response = await fetch(instagramApiUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Filter out videos and process posts
    const posts: InstagramPost[] = data.data
      .filter((post: any) => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM')
      .map((post: any) => ({
        id: post.id,
        media_url: post.media_url,
        media_type: post.media_type,
        caption: post.caption || '',
        permalink: post.permalink,
        timestamp: post.timestamp
      }))

    return NextResponse.json({
      posts,
      isDemo: false
    })

  } catch (error) {
    console.error('Error fetching Instagram posts:', error)
    
    // Return sample data on error
    return NextResponse.json({
      posts: getSamplePosts(),
      isDemo: true,
      error: 'Using sample data - Instagram API not available'
    })
  }
}

// Sample data for when Instagram API is not available
function getSamplePosts(): InstagramPost[] {
  return [
    {
      id: '1',
      media_url: '/placeholder-gallery/face-paint-1.jpg',
      media_type: 'IMAGE',
      caption: 'Beautiful butterfly face painting at today\'s birthday party! 🦋✨ #FacePainting #HeartAndHand',
      permalink: 'https://www.instagram.com/handhearthenna/',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
      id: '2',
      media_url: '/placeholder-gallery/henna-1.jpg',
      media_type: 'IMAGE',
      caption: 'Intricate henna design for a special celebration 🌸 #HennaArt #TemporaryTattoo',
      permalink: 'https://www.instagram.com/handhearthenna/',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
      id: '3',
      media_url: '/placeholder-gallery/face-paint-2.jpg',
      media_type: 'IMAGE',
      caption: 'Superhero party was a huge success! Every kid got their favorite hero 🦸‍♂️',
      permalink: 'https://www.instagram.com/handhearthenna/',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      media_url: '/placeholder-gallery/henna-2.jpg',
      media_type: 'IMAGE',
      caption: 'Delicate floral henna patterns ✨ Perfect for summer events!',
      permalink: 'https://www.instagram.com/handhearthenna/',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '5',
      media_url: '/placeholder-gallery/face-paint-3.jpg',
      media_type: 'IMAGE',
      caption: 'Rainbow unicorn magic at the school festival! 🌈🦄',
      permalink: 'https://www.instagram.com/handhearthenna/',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '6',
      media_url: '/placeholder-gallery/henna-3.jpg',
      media_type: 'IMAGE',
      caption: 'Traditional mandala design with modern touches 🕉️',
      permalink: 'https://www.instagram.com/handhearthenna/',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '7',
      media_url: '/placeholder-gallery/face-paint-4.jpg',
      media_type: 'IMAGE',
      caption: 'Spiderman face paint that made this little one\'s day! 🕷️',
      permalink: 'https://www.instagram.com/handhearthenna/',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '8',
      media_url: '/placeholder-gallery/henna-4.jpg',
      media_type: 'IMAGE',
      caption: 'Bridal henna preparations - such an honor to be part of special moments 💍',
      permalink: 'https://www.instagram.com/handhearthenna/',
      timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
}
