import {
  getAllCollages,
  deleteCollage,
  type CollageEntity,
} from '../lib/storage/collages.repository'

const root = document.getElementById('gallery-root') as HTMLElement
const emptyState = document.getElementById('empty-state') as HTMLElement

init()

/* ---------- init ---------- */

async function init() {
  try {
    const collages = await getAllCollages()

    if (!collages.length) {
      renderEmptyState()
      return
    }

    renderGallery(collages)
  } catch (err) {
    console.error(err)
    renderError()
  }
}

/* ---------- render ---------- */

function renderGallery(collages: CollageEntity[]) {
  emptyState.hidden = true

  root.innerHTML = `
      <div class="gallery-grid">
        ${collages
          .sort((a, b) => b.createdAt - a.createdAt)
          .map(collage => renderCard(collage))
          .join('')}
      </div>
    `

  bindDeleteEvents()
}

function renderCard(collage: CollageEntity) {
  const src =
    typeof collage.image === 'object' &&
    collage.image !== null &&
    'slice' in collage.image
      ? URL.createObjectURL(collage.image as Blob)
      : collage.image

  return `
      <article class="gallery-card" data-id="${collage.id}">
        <img src="${src}" alt="Generated collage" loading="lazy" />
  
        <div class="card-actions">
          <button class="delete-btn" aria-label="Delete collage">
            🗑️
          </button>
        </div>
      </article>
    `
}

function renderEmptyState() {
  emptyState.hidden = false
  root.innerHTML = ''

  emptyState.innerHTML = `
      <div class="empty-card">
        <i data-lucide="image-off"></i>
        <h2>No collages yet</h2>
        <p>Create your first collage to see it here.</p>
        <a href="/" class="cta">
          Explore images
        </a>
      </div>
    `

  // Re-initialize lucide icons
  if (window.lucide) {
    window.lucide.createIcons()
  }
}

function renderError(message = 'Something went wrong loading your gallery.') {
  emptyState.hidden = true
  root.innerHTML = `
      <div class="error-card">
        <i data-lucide="alert-triangle"></i>
        <h3>Error</h3>
        <p>${message}</p>
      </div>
    `

  // Re-initialize lucide icons
  if (window.lucide) {
    window.lucide.createIcons()
  }
}

/* ---------- events ---------- */

function bindDeleteEvents() {
  const buttons = root.querySelectorAll<HTMLButtonElement>('.delete-btn')

  buttons.forEach(btn => {
    btn.addEventListener('click', async e => {
      const card = (e.currentTarget as HTMLElement).closest(
        '.gallery-card'
      ) as HTMLElement

      const id = card.dataset.id
      if (!id) return

      // Confirm deletion
      if (!confirm('Are you sure you want to delete this collage?')) {
        return
      }

      try {
        await deleteCollage(id)
        card.style.opacity = '0'
        card.style.transition = 'opacity 0.3s ease'

        setTimeout(() => {
          card.remove()
          if (!root.querySelector('.gallery-card')) {
            renderEmptyState()
          }
        }, 300)
      } catch (error) {
        console.error('Failed to delete collage:', error)
        alert('Failed to delete collage. Please try again.')
      }
    })
  })
}
