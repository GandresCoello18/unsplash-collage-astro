import { createCollage, saveCollage } from '../lib/collage-state'
import { getPhotos } from '../lib/unsplash/endpoints'

const MAX = 4

const selected = new Set<string>()

const cards = document.querySelectorAll<HTMLElement>('.image-card')
const counter = document.getElementById('selection-count')!
const button = document.getElementById('create-collage') as HTMLButtonElement

/* ---------- helpers ---------- */

function updateUI() {
  counter.textContent = `${selected.size} / ${MAX} selected`
  button.disabled = selected.size === 0

  if (selected.size === MAX) {
    cards.forEach(card => {
      const id = card.dataset.imageId!
      if (!selected.has(id)) {
        card.classList.add('disabled')
      }
    })
  } else {
    cards.forEach(card => card.classList.remove('disabled'))
  }
}

/* ---------- selection logic ---------- */

cards.forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.imageId!

    if (selected.has(id)) {
      selected.delete(id)
      card.classList.remove('selected')
    } else {
      if (selected.size >= MAX) return

      selected.add(id)
      card.classList.add('selected')
    }

    updateUI()
  })
})

/* ---------- create collage ---------- */

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

  const collage = createCollage(images)
  saveCollage(collage)

  window.location.href = '/collage'
})

updateUI()

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

function renderError() {
  grid.innerHTML = `
    <div class="error-card">
      <i data-lucide="alert-triangle"></i>
      <h3>Something went wrong</h3>
      <p>We couldn’t load images. Please try again.</p>
    </div>
  `
}

const grid = document.querySelector('.gallery-grid') as HTMLElement

async function loadImages() {
  renderSkeletons()

  try {
    const images = await getPhotos()

    grid.innerHTML = images
      .map(
        img => `
        <article class="image-card">
          <img src="${img.urls.small}" alt="${img.alt_description ?? ''}" />
        </article>
      `
      )
      .join('')
  } catch (err) {
    console.error(err)
    renderError()
  }
}

loadImages()
