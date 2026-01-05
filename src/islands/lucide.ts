/**
 * Initialize Lucide icons
 * This should run after DOM is ready to ensure all icon elements exist
 */

import { createIcons, icons } from 'lucide'

function initLucideIcons() {
  try {
    createIcons({ icons })
  } catch (error) {
    console.warn('Failed to initialize Lucide icons:', error)
  }
}

// Make it available globally for re-initialization
if (typeof window !== 'undefined') {
  window.lucide = { createIcons: () => initLucideIcons() }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLucideIcons)
} else {
  initLucideIcons()
}
