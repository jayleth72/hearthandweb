import { NextResponse } from 'next/server';

interface InstagramPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  permalink: string;
  timestamp: string;
}

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    
    if (!accessToken) {
      console.error('Instagram access token not found');
      return NextResponse.json({ error: 'Instagram access token not configured' }, { status: 500 });
    }

    const fields = 'id,media_type,media_url,thumbnail_url,caption,permalink,timestamp';
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}&limit=12`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter out videos for now, only show images and carousels
    const posts: InstagramPost[] = data.data.filter((post: InstagramPost) => 
      post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM'
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json({ error: 'Failed to fetch Instagram posts' }, { status: 500 });
  }
}
