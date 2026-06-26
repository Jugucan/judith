// Any al footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú mòbil
const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav nav');
burger?.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

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
  .forEach(el => { el.classList.add('reveal'); io.observe(el); });
