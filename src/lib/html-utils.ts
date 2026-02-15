/**
 * Utility functions for handling HTML content from WordPress
 */

/**
 * Decode HTML entities (e.g., &#8217; -> ')
 */
export function decodeHtmlEntities(text: string): string {
  if (typeof window === 'undefined') {
    // Server-side: use a basic entity map
    const entities: Record<string, string> = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#039;': "'",
      '&#8217;': "'",
      '&#8216;': "'",
      '&#8220;': '"',
      '&#8221;': '"',
      '&nbsp;': ' ',
    }
    
    return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity)
  }
  
  // Client-side: use DOM API
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

/**
 * Strip HTML tags from a string
 */
export function stripHtmlTags(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: use regex
    return html.replace(/<[^>]*>/g, '')
  }
  
  // Client-side: use DOM API
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

/**
 * Clean HTML content: decode entities and strip tags
 */
export function cleanHtmlContent(html: string): string {
  const withoutTags = stripHtmlTags(html)
  return decodeHtmlEntities(withoutTags)
}

/**
 * Sanitize HTML for safe display (keeps formatting but removes dangerous tags)
 */
export function sanitizeHtml(html: string): string {
  // Basic sanitization - in production, consider using a library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
}
