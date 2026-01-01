import { unsplashFetch } from './client'
import { UNSPLASH_CONFIG } from './config'
import type { UnsplashImage } from './types'

export function getPhotos(page = 1) {
  return unsplashFetch<UnsplashImage[]>('/photos', {
    page,
    per_page: UNSPLASH_CONFIG.PER_PAGE,
  })
}

export function searchPhotos(query: string, page = 1) {
  return unsplashFetch<{ results: UnsplashImage[] }>('/search/photos', {
    query,
    page,
    per_page: UNSPLASH_CONFIG.PER_PAGE,
  })
}
