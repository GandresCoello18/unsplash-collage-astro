export type CollageLayout = 'grid' | 'horizontal' | 'vertical'

export interface CollageImage {
  id: string
  src: string
  alt?: string
}

export interface CollageState {
  images: CollageImage[]
  layout: CollageLayout
}

/* ---------- helpers ---------- */

const STORAGE_KEY = 'collage-state'

/* ---------- factory ---------- */

export function createCollage(images: CollageImage[]): CollageState {
  if (images.length === 0 || images.length > 4) {
    throw new Error('Collage must have between 1 and 4 images')
  }

  return {
    images,
    layout: 'grid',
  }
}

/* ---------- persistence ---------- */

export function saveCollage(state: CollageState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function cleanCollage() {
  localStorage.removeItem(STORAGE_KEY)
}

export function loadCollage(): CollageState | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : null
}

/* ---------- mutations ---------- */

export function updateLayout(
  state: CollageState,
  layout: CollageLayout
): CollageState {
  return {
    ...state,
    layout,
  }
}

export function reorderImages(
  state: CollageState,
  fromIndex: number,
  toIndex: number
): CollageState {
  const images = [...state.images]
  const [moved] = images.splice(fromIndex, 1)
  images.splice(toIndex, 0, moved)

  return {
    ...state,
    images,
  }
}
