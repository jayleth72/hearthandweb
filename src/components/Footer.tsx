'use client'

import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'
import { SocialMediaLinks } from './SocialMediaLinks'

export function Footer() {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' }, 
    // { href: '/events', label: 'Events' }, // Hidden for now
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4">
              Hand & Heart Eco Body Art
            </h3>
            <p className="text-gray-300 mb-6">
              Creating magical moments with beautiful, safe, and temporary art for all your special celebrations.
            </p>
            
            {/* Social Media Icons */}
            <SocialMediaLinks variant="footer" />
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:+61449979181"
                className="flex items-center space-x-3 text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Phone size={16} />
                </div>
                <span>044 9979 181</span>
              </a>
              
              <a
                href="mailto:info@handheartecobodyart.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <span>info@handheartecobodyart.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Heart and Hand Eco Body Art. All rights reserved.
          </div>
          
          <div className="text-gray-400 text-sm">
            Website by{' '}
            <a
              href="https://sconesit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-400 transition-colors duration-200"
            >
              Scones & I.T.
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
