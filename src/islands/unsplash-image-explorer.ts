import { createCollage, saveCollage } from '../lib/collage-state'
import { getPhotos, searchPhotos } from '../lib/unsplash/endpoints'
import { debounce } from '../lib/utils/debounce'

/* ---------- Constants ---------- */

const MAX_SELECTION = 4

/* ---------- DOM Elements ---------- */

const grid = document.querySelector('.gallery-grid') as HTMLElement
const searchInput = document.getElementById('search-input') as HTMLInputElement
const counter = document.getElementById('selection-count')!
const button = document.getElementById('create-collage') as HTMLButtonElement

if (!grid || !counter || !button) {
  throw new Error('Required DOM elements not found')
}

/* ---------- State ---------- */

const selected = new Set<string>()

/* ---------- Render Functions ---------- */

function renderSkeletons(count = 12) {
  grid.innerHTML = Array.from({ length: count })
    .map(
      () => `
      <div class="image-card skeleton">
        <div class="skeleton-img"></div>
      </div>
    `
    )
    .join('')
}

function renderError(message = "We couldn't load images. Please try again.") {
  grid.innerHTML = `
    <div class="error-card">
      <i data-lucide="alert-triangle"></i>
      <h3>Something went wrong</h3>
      <p>${message}</p>
    </div>
  `
  // Re-initialize lucide icons
  if (window.lucide) {
    window.lucide.createIcons()
  }
}

function renderImages(
  images: Array<{
    id: string
    urls: { small: string }
    alt_description: string | null
  }>
) {
  grid.innerHTML = images
    .map(
      (img, index) => `
      <article class="image-card" data-image-id="${img.id}" data-image-index="${index}">
        <img
          src="${img.urls.small}"
          alt="${img.alt_description ?? 'Unsplash image'}"
          loading="lazy"
        />
      </article>
    `
    )
    .join('')

  // Re-bind selection handlers after rendering
  bindSelectionHandlers()
  updateUI()
}

/* ---------- Image Loading ---------- */

async function loadDefaultImages() {
  renderSkeletons()

  try {
    const images = await getPhotos()
    renderImages(images)
  } catch (err) {
    console.error('Failed to load images:', err)
    renderError(
      'Failed to load images. Please check your API key and try again.'
    )
  }
}

async function loadSearchImages(query: string) {
  renderSkeletons()

  try {
    const res = await searchPhotos(query)
    const images = res.results

    if (images.length === 0) {
      grid.innerHTML = `
        <div class="error-card">
          <i data-lucide="search"></i>
          <h3>No results found</h3>
          <p>Try searching for something else.</p>
        </div>
      `
      if (window.lucide) {
        window.lucide.createIcons()
      }
      return
    }

    renderImages(images)
  } catch (err) {
    console.error('Search failed:', err)
    renderError('Search failed. Please try again.')
  }
}

/* ---------- Selection Logic ---------- */

function bindSelectionHandlers() {
  const cards = document.querySelectorAll<HTMLElement>(
    '.image-card:not(.skeleton)'
  )

  cards.forEach(card => {
    // Remove existing listeners by cloning
    const newCard = card.cloneNode(true) as HTMLElement
    card.parentNode?.replaceChild(newCard, card)

    newCard.addEventListener('click', () => {
      const id = newCard.dataset.imageId!
      if (!id) return

      if (selected.has(id)) {
        selected.delete(id)
        newCard.classList.remove('selected')
      } else {
        if (selected.size >= MAX_SELECTION) return
        selected.add(id)
        newCard.classList.add('selected')
      }

      updateUI()
    })
  })
}

function updateUI() {
  counter.textContent = `${selected.size} / ${MAX_SELECTION} selected`
  button.disabled = selected.size === 0

  const cards = document.querySelectorAll<HTMLElement>(
    '.image-card:not(.skeleton)'
  )

  if (selected.size === MAX_SELECTION) {
    cards.forEach(card => {
      const id = card.dataset.imageId!
      if (!id) return
      if (!selected.has(id)) {
        card.classList.add('disabled')
      }
    })
  } else {
    cards.forEach(card => card.classList.remove('disabled'))
  }
}

/* ---------- Create Collage ---------- */

button.addEventListener('click', () => {
  if (selected.size === 0) return

  const images = Array.from(selected).map(id => {
    const card = document.querySelector(`[data-image-id="${id}"]`)!
    const img = card.querySelector('img')!

    return {
      id,
      src: img.getAttribute('src')!,
      alt: img.getAttribute('alt') ?? '',
    }
  })

  try {
    const collage = createCollage(images)
    saveCollage(collage)
    window.location.href = '/collage'
  } catch (err) {
    console.error('Failed to create collage:', err)
    alert('Failed to create collage. Please try again.')
  }
})

/* ---------- Search Handler ---------- */

const handleSearch = debounce((value: string) => {
  const query = value.trim()
  selected.clear() // Clear selection when searching
  updateUI()

  if (!query) {
    loadDefaultImages()
    return
  }

  loadSearchImages(query)
}, 500)

searchInput?.addEventListener('input', e => {
  const value = (e.target as HTMLInputElement).value
  handleSearch(value)
})

/* ---------- Initialize ---------- */

loadDefaultImages()
