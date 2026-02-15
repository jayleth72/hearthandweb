import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://your-wordpress-site.com';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Authenticate with WordPress JWT endpoint
    const response = await fetch(`${WORDPRESS_URL}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Invalid credentials' },
        { status: 401 }
      );
    }

    const data = await response.json();
    
    // Fetch user details including roles from WordPress
    const userResponse = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/users/me`, {
      headers: {
        'Authorization': `Bearer ${data.token}`,
      },
    });

    let userRoles: string[] = [];
    if (userResponse.ok) {
      const userData = await userResponse.json();
      userRoles = userData.roles || [];
      console.log('User roles from WordPress:', userRoles);
    }
    
    // Set HTTP-only cookie with JWT token
    const res = NextResponse.json({
      success: true,
      user: {
        id: data.user_id,
        email: data.user_email,
        displayName: data.user_display_name,
        nicename: data.user_nicename,
        roles: userRoles,
      },
    });

    // Set secure HTTP-only cookie
    // Detect if we're using HTTPS (production or dev with --experimental-https)
    const isHttps = request.url.startsWith('https://') || process.env.NODE_ENV === 'production';
    
    res.cookies.set('wp_auth_token', data.token, {
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { error: 'Authentication failed. Please try again.' },
      { status: 500 }
    );
  }
}
