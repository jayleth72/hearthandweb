import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://your-wordpress-site.com';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('wp_auth_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Validate token with WordPress
    const response = await fetch(`${WORDPRESS_URL}/wp-json/jwt-auth/v1/token/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const data = await response.json();
    
    // Fetch user details from WordPress
    const userResponse = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (userResponse.ok) {
      const userData = await userResponse.json();
      return NextResponse.json({ 
        valid: true, 
        user: {
          id: userData.id,
          email: userData.email || '',
          displayName: userData.name,
          nicename: userData.slug,
        }
      });
    }

    return NextResponse.json({ valid: true, data });
  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json({ error: 'Validation failed' }, { status: 500 });
  }
}
