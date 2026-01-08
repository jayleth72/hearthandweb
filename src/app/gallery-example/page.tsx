'use client';

import { useAuth } from '@/components/WordPressAuthProvider';
import Link from 'next/link';

export default function GalleryPage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Photo Gallery</h1>

        {/* Public Gallery - Everyone can see */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Public Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Public images would go here */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Public image 1</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Public image 2</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Public image 3</p>
            </div>
          </div>
        </section>

        {/* Members-Only Gallery */}
        {isAuthenticated ? (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Members-Only Gallery
              </h2>
              <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm">
                Exclusive
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Welcome {user?.displayName}! Here are exclusive photos just for members.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Private images would go here */}
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg shadow-md p-6">
                <p className="text-gray-700">🔒 Member photo 1</p>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg shadow-md p-6">
                <p className="text-gray-700">🔒 Member photo 2</p>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg shadow-md p-6">
                <p className="text-gray-700">🔒 Member photo 3</p>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-3">
              Want to see more?
            </h2>
            <p className="mb-6">
              Members get access to exclusive photos and behind-the-scenes content!
            </p>
            <Link 
              href="/login"
              className="inline-block bg-white text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Log In to See More
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
