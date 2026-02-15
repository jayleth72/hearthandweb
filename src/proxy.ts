import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://your-wordpress-site.com';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('wp_auth_token')?.value;
  const { pathname } = request.nextUrl;

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
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
      // Token is invalid, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const redirectResponse = NextResponse.redirect(loginUrl);
      redirectResponse.cookies.delete('wp_auth_token');
      return redirectResponse;
    }

    // Token is valid, allow access
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware auth error:', error);
    // On error, redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

// Configure which routes require authentication
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/members/:path*',
    // Add more protected routes here:
    // '/events/book/:path*',
    // '/gallery/private/:path*',
  ],
};
