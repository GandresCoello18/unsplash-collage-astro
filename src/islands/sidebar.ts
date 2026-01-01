const toggle = document.getElementById('menu-toggle')
const sidebar = document.querySelector('.sidebar')

toggle?.addEventListener('click', () => {
  sidebar?.classList.toggle('open')
})
