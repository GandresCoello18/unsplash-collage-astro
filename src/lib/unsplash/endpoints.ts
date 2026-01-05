/**
 * Unsplash API endpoints
 * Functions to interact with Unsplash API
 */

import { unsplashFetch } from './client'
import { UNSPLASH_CONFIG } from './config'
import type { UnsplashImage } from './types'

export interface SearchPhotosResponse {
  results: UnsplashImage[]
  total: number
  total_pages: number
}

export function getPhotos(page = UNSPLASH_CONFIG.DEFAULT_PAGE) {
  return unsplashFetch<UnsplashImage[]>('/photos', {
    page: String(page),
    per_page: String(UNSPLASH_CONFIG.PER_PAGE),
  })
}

export function searchPhotos(
  query: string,
  page = UNSPLASH_CONFIG.DEFAULT_PAGE
) {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty')
  }

  return unsplashFetch<SearchPhotosResponse>('/search/photos', {
    query: query.trim(),
    page: String(page),
    per_page: String(UNSPLASH_CONFIG.PER_PAGE),
  })
}
