import { InstagramGallery } from '@/components/InstagramGallery'

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent mb-6">
              Our Creative Gallery
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our latest face painting and henna art creations. Each piece showcases the joy, 
              creativity, and artistic excellence that defines Heart & Hand.
            </p>
          </div>

          {/* Instagram Gallery Component */}
          <InstagramGallery />

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-orange-600/10 to-orange-500/10 rounded-2xl border border-orange-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Love what you see?
            </h2>
            <p className="text-gray-300 mb-6">
              Follow us on Instagram for daily inspiration and behind-the-scenes content!
            </p>
            <a
              href="https://instagram.com/handhearthenna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-full hover:from-orange-700 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow @handhearthenna
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Gallery - Heart & Hand Face Painting',
  description: 'Explore our stunning gallery of face painting and henna art creations. See the latest work from Heart & Hand through our Instagram posts.',
}
