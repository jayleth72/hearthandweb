'use client';

import { useAuth } from '@/components/WordPressAuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BookingPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/booking');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book an Event
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome back, {user?.displayName}! Book your next event here.
          </p>

          {/* Your booking form would go here */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700">
              This is where your booking form would appear.
            </p>
          </div>

          <div className="mt-6">
            <Link 
              href="/dashboard"
              className="text-pink-600 hover:text-pink-700 font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
