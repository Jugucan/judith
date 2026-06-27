// Any al footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menú mòbil (Corregit amb retard de seguretat per a l'scroll)
const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav nav');

if (burger && menu) {
  const toggleMenu = (e) => {
    e.preventDefault(); 
    const open = menu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  };

  burger.addEventListener('click', toggleMenu);
  burger.addEventListener('touchstart', toggleMenu, { passive: false });

  // Controlar el clic als enllaços per no marejar l'scroll
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
      // Deixem que el navegador comenci a fer l'scroll cap a la secció...
      
      // I esperem 300 mil·lisegons (un sospir) abans de tancar la cortina del menú
      setTimeout(() => {
        menu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }, 300);
    });
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
