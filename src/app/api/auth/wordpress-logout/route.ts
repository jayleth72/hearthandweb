import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true, message: 'Logged out successfully' });
  
  // Delete the authentication cookie
  res.cookies.delete('wp_auth_token');
  
  return res;
}
