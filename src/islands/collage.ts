import * as htmlToImage from 'html-to-image';
import { saveCollage as saveCollageToStorage } from '../lib/storage/collages.repository';
import {
  loadCollage,
  saveCollage,
  cleanCollage,
  updateLayout,
  type CollageLayout,
} from '../lib/collage-state';

/* ---------- DOM ---------- */

const root = document.getElementById('collage-root') as HTMLElement
const emptyState = document.getElementById('empty-state') as HTMLElement

const layoutButtons = document.querySelectorAll<HTMLButtonElement>(
  '.layout-selector button[data-layout]'
)

const downloadBtn = document.getElementById(
  'download-collage'
) as HTMLButtonElement

const clearBtn = document.getElementById('clear-selection') as HTMLButtonElement

/* ---------- STATE ---------- */

let state = loadCollage()

/* ---------- INIT ---------- */

updateUI()

/* ---------- UI ---------- */

function updateUI() {
  const hasImages = !!state && state.images.length > 0

  root.hidden = !hasImages
  emptyState.hidden = hasImages

  downloadBtn.disabled = !hasImages
  clearBtn.disabled = !hasImages

  if (!hasImages) {
    renderEmptyState()
    return
  }

  renderCollage()
  updateActiveButton()
}

/* ---------- RENDER COLLAGE ---------- */

function renderCollage() {
  const countClass = `count-${state!.images.length}`
  const layoutClass = `layout-${state!.layout}`

  root.innerHTML = `
    <div class="collage ${countClass} ${layoutClass}">
      ${state!.images
        .map(
          img =>
            `<img src="${img.src}" alt="${img.alt ?? ''}" loading="eager" />`
        )
        .join('')}
    </div>
  `
}

/* ---------- EMPTY STATE ---------- */

function renderEmptyState() {
  emptyState.innerHTML = `
    <div class="empty-card">
      <i data-lucide="image-off"></i>
      <h2>No images selected</h2>
      <p>Select up to 4 images to generate your collage.</p>
      <a href="/" class="cta">Explore images</a>
    </div>
  `
}

/* ---------- LAYOUT SELECTOR ---------- */

layoutButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (!state) return

    const layout = button.dataset.layout as CollageLayout
    state = updateLayout(state, layout)
    saveCollage(state)

    renderCollage()
    updateActiveButton()
  })
})

function updateActiveButton() {
  layoutButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.layout === state!.layout)
  })
}

/* ---------- CLEAR SELECTION ---------- */

clearBtn.addEventListener('click', () => {
  if (!state) return

  const confirmed = confirm('Clear selected images?')
  if (!confirmed) return

  state = null
  cleanCollage()

  updateUI()
})

/* ---------- DOWNLOAD ---------- */

function waitForImages(container: HTMLElement) {
  const images = Array.from(container.querySelectorAll('img'))

  return Promise.all(
    images.map(img => {
      if (img.complete && img.naturalWidth !== 0) {
        return Promise.resolve()
      }

      return new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject()
      })
    })
  )
}

downloadBtn.addEventListener('click', async () => {
  const collage = document.querySelector('.collage') as HTMLElement
  if (!collage) return

  try {
    showOverlay()
    await waitForImages(collage)

    const dataUrl = await htmlToImage.toPng(collage, {
      pixelRatio: 2,
      cacheBust: true,
    })

    const link = document.createElement('a');
    link.download = 'collage' + `${Date.now()}.png`;
    link.href = dataUrl;
    link.click();

    saveCollageToStorage({
      id: crypto.randomUUID(),
      image: dataUrl,
      createdAt: Date.now(),
    })
  } catch (err) {
    console.error('Download failed', err)
  } finally {
    hideOverlay()
  }
})

/* ---------- DOWNLOAD OVERLAY ---------- */

const overlay = document.getElementById('download-overlay') as HTMLElement

function showOverlay() {
  overlay.classList.remove('hidden')
}

function hideOverlay() {
  overlay.classList.add('hidden')
}
