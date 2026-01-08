'use client'

import { Facebook, Instagram } from 'lucide-react'

// Centralized social media configuration
export const socialMediaConfig = {
  facebook: {
    url: "https://www.facebook.com/profile.php?id=61571323680912",
    icon: Facebook,
    label: "Facebook"
  },
  instagram: {
    url: "https://www.instagram.com/handhearthenna/",
    icon: Instagram,
    label: "Instagram"
  }
}

interface SocialMediaLinksProps {
  className?: string
  iconSize?: number
  showLabels?: boolean
  variant?: 'default' | 'footer' | 'minimal'
}

export function SocialMediaLinks({ 
  className = '',
  iconSize = 20,
  showLabels = false,
  variant = 'default'
}: SocialMediaLinksProps) {
  const baseClasses = 'flex items-center transition-colors duration-200'
  
  const variantClasses = {
    default: 'w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600',
    footer: 'w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600',
    minimal: 'p-2 hover:text-orange-500'
  }

  const textClasses = {
    default: 'text-gray-300 hover:text-white',
    footer: 'text-gray-300 hover:text-white', 
    minimal: 'text-gray-600 hover:text-orange-500'
  }

  return (
    <div className={`flex space-x-4 ${className}`}>
      {Object.entries(socialMediaConfig).map(([key, social]) => {
        const Icon = social.icon
        
        return (
          <a
            key={key}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseClasses} ${variantClasses[variant]} ${textClasses[variant]}`}
            aria-label={social.label}
            title={social.label}
          >
            <Icon size={iconSize} />
            {showLabels && (
              <span className="ml-2 text-sm">{social.label}</span>
            )}
          </a>
        )
      })}
    </div>
  )
}

// Export individual URLs for cases where you need just the URL
export const socialUrls = {
  facebook: socialMediaConfig.facebook.url,
  instagram: socialMediaConfig.instagram.url
}
