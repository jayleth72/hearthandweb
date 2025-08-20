'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { SocialMediaLinks } from './SocialMediaLinks'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    // { href: '/events', label: 'Events' }, // Hidden for now
    // { href: '/blog', label: 'Blog' }, // Hidden for now
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
          >
            Heart and Hand Eco Body Art
          </Link>

          {/* Desktop Navigation & Social Media */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-orange-500 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Social Media Icons */}
            <div className="border-l border-gray-700 pl-6">
              <SocialMediaLinks variant="minimal" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-orange-500 hover:bg-gray-800 transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-md transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Social Media */}
            <div className="px-4 py-4 border-t border-gray-700 mt-4">
              <div className="text-sm text-gray-400 mb-3">Follow Us</div>
              <SocialMediaLinks variant="minimal" />
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  )
}
              