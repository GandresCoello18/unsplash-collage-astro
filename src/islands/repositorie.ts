import {
    getAllCollages,
    deleteCollage,
    type CollageEntity,
  } from '../lib/storage/collages.repository';
  
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
      typeof collage.image === 'object' && collage.image !== null && 'slice' in collage.image
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
        <h2>No collages yet</h2>
        <p>Create your first collage to see it here.</p>
        <a href="/gallery" class="primary-link">
          Explore images
        </a>
      </div>
    `
  }
  
  function renderError() {
    root.innerHTML = `
      <div class="error-card">
        <p>Something went wrong loading your gallery.</p>
      </div>
    `
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
  
        await deleteCollage(id)
        card.remove()
  
        if (!root.querySelector('.gallery-card')) {
          renderEmptyState()
        }
      })
    })
  }
  