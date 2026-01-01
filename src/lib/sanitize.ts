import DOMPurify from 'dompurify'

/**
 * Sanitize HTML content to prevent XSS attacks
 * This is especially important for content from WordPress or other external sources
 */
export function sanitizeHtml(html: string): string {
  // Only sanitize on the client side where DOMPurify can access the DOM
  if (typeof window === 'undefined') {
    // On the server, return as-is since Next.js will handle it
    // The client-side component will sanitize before rendering
    return html
  }

  // Add hook to ensure external links are safe
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    // Set all elements owning target to target=_blank
    if ('target' in node) {
      node.setAttribute('target', '_blank')
      // Prevent reverse tabnabbing
      node.setAttribute('rel', 'noopener noreferrer')
    }
  })

  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'strong', 'em', 'u', 's', 'b', 'i',
      'ul', 'ol', 'li',
      'blockquote', 'pre', 'code',
      'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel',
      'src', 'alt', 'title', 'width', 'height',
      'class', 'id'
    ],
    ALLOW_DATA_ATTR: false,
    SAFE_FOR_TEMPLATES: true,
  })

  // Remove the hook after use to avoid affecting other sanitization calls
  DOMPurify.removeHook('afterSanitizeAttributes')

  return sanitized
}

/**
 * Sanitize and prepare WordPress content for display
 */
export function sanitizeWordPressContent(content: string): string {
  // Clean up common WordPress artifacts
  const cleaned = content
    .replace(/\[caption[^\]]*\]/gi, '') // Remove caption shortcodes
    .replace(/\[\/caption\]/gi, '')
    .replace(/\[gallery[^\]]*\]/gi, '') // Remove gallery shortcodes
    .trim()

  // Sanitize HTML
  return sanitizeHtml(cleaned)
}
