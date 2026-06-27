// Any al footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menú mòbil (Corregit amb suport tàctil universal)
const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav nav');

if (burger && menu) {
  const toggleMenu = (e) => {
    e.preventDefault(); // Evita que el mòbil dupliqui l'acció de tocar i clicar
    const open = menu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  };

  // Reacciona tant al clic de ratolí com al toc del dit al mòbil instantàniament
  burger.addEventListener('click', toggleMenu);
  burger.addEventListener('touchstart', toggleMenu, { passive: false });

  // Tancar el menú quan es clica o toca un enllaç a dins
  menu.querySelectorAll('a').forEach(a => {
    const closeMenu = () => {
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    };
    a.addEventListener('click', closeMenu);
    a.addEventListener('touchstart', closeMenu, { passive: true });
  });
}

// Reveal en scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .hero__text, .hero__photo, .timeline li, .card')
  .forEach(el => { 
    el.classList.add('reveal'); 
    io.observe(el); 
  });
