/**
 * Unsplash API configuration
 */

export const UNSPLASH_CONFIG = {
  BASE_URL: 'https://api.unsplash.com',
  PER_PAGE: 12,
  DEFAULT_PAGE: 1,
} as const

export type UnsplashConfig = typeof UNSPLASH_CONFIG
