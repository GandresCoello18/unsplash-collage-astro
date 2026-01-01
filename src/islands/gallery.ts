import { createCollage, saveCollage } from '../lib/collage-state'

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
