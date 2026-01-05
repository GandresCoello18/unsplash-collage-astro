import * as htmlToImage from 'html-to-image'
import { saveCollage as saveCollageToStorage } from '../lib/storage/collages.repository'
import {
  loadCollage,
  saveCollage,
  cleanCollage,
  updateLayout,
  type CollageLayout,
} from '../lib/collage-state'

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

function waitForImages(container: HTMLElement, timeout = 10000): Promise<void> {
  const images = Array.from(container.querySelectorAll('img'))

  return Promise.all(
    images.map(img => {
      if (img.complete && img.naturalWidth !== 0) {
        return Promise.resolve()
      }

      return new Promise<void>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Image load timeout'))
        }, timeout)

        img.onload = () => {
          clearTimeout(timeoutId)
          resolve()
        }
        img.onerror = () => {
          clearTimeout(timeoutId)
          reject(new Error(`Failed to load image: ${img.src}`))
        }
      })
    })
  ) as Promise<void>
}

downloadBtn.addEventListener('click', async () => {
  const collage = document.querySelector('.collage') as HTMLElement
  if (!collage) {
    console.error('Collage element not found')
    return
  }

  try {
    showOverlay()
    downloadBtn.disabled = true

    await waitForImages(collage)

    const dataUrl = await htmlToImage.toPng(collage, {
      pixelRatio: 2,
      cacheBust: true,
      quality: 1,
    })

    // Download the image
    const link = document.createElement('a')
    link.download = `collage-${Date.now()}.png`
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Save to storage
    try {
      await saveCollageToStorage({
        id: crypto.randomUUID(),
        image: dataUrl,
        createdAt: Date.now(),
      })
    } catch (storageError) {
      console.warn('Failed to save collage to storage:', storageError)
      // Don't fail the download if storage fails
    }
  } catch (err) {
    console.error('Download failed:', err)
    alert('Failed to download collage. Please try again.')
  } finally {
    hideOverlay()
    downloadBtn.disabled = false
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
