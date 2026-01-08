'use client';

import { useAuth } from '@/components/WordPressAuthProvider';
import Link from 'next/link';

export default function MembersPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Members Area
          </h1>
          <p className="text-gray-600 mb-4">
            Welcome {user?.displayName}! This is a protected members-only page.
          </p>
          
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Exclusive Member Benefits
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>✨ Early access to event bookings</li>
              <li>🎨 Special member-only designs</li>
              <li>💰 Exclusive discounts on services</li>
              <li>📸 Access to private photo galleries</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <Link 
            href="/dashboard"
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
