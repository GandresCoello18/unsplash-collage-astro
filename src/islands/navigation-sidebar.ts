/**
 * Sidebar toggle functionality
 * Handles mobile menu toggle with overlay
 */

function initSidebar() {
  const toggle = document.getElementById('menu-toggle')
  const sidebar = document.querySelector('.sidebar')
  const overlay = document.getElementById('sidebar-overlay')

  if (!toggle || !sidebar) {
    console.warn('Sidebar elements not found')
    return
  }

  function toggleSidebar() {
    sidebar.classList.toggle('open')
    if (overlay) {
      overlay.classList.toggle('active')
    }
    // Prevent body scroll when sidebar is open on mobile
    if (window.innerWidth <= 1023) {
      document.body.style.overflow = sidebar.classList.contains('open')
        ? 'hidden'
        : ''
    }
  }

  toggle.addEventListener('click', e => {
    e.stopPropagation()
    toggleSidebar()
  })

  // Close sidebar when clicking overlay
  overlay?.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      toggleSidebar()
    }
  })

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', e => {
    if (window.innerWidth <= 1023) {
      const target = e.target as HTMLElement
      if (
        sidebar.classList.contains('open') &&
        !sidebar.contains(target) &&
        !toggle.contains(target) &&
        !overlay?.contains(target)
      ) {
        toggleSidebar()
      }
    }
  })

  // Close sidebar on window resize if switching to desktop
  let resizeTimer: ReturnType<typeof setTimeout>
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 1023) {
        sidebar.classList.remove('open')
        overlay?.classList.remove('active')
        document.body.style.overflow = ''
      }
    }, 100)
  })

  // Close sidebar when clicking a link (mobile navigation)
  if (window.innerWidth <= 1023) {
    const links = sidebar.querySelectorAll('a')
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) {
          toggleSidebar()
        }
      })
    })
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebar)
} else {
  initSidebar()
}
