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

// =====================================================
// REVEAL EN SCROLL + MENÚ ACTIU DINÀMIC (SCROLLSPY CALIBRAT)
// =====================================================
const menuLinks = document.querySelectorAll('.nav nav a');
const sections = document.querySelectorAll('.section');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    // 1. Efecte Reveal original
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
    }

    // 2. Control del Menú Actiu (Versió súper sensible per a seccions curtes)
    if (e.isIntersecting) {
      const currentId = e.target.getAttribute('id');
      
      // Treiem la classe 'active' de tots els enllaços
      menuLinks.forEach(link => link.classList.remove('active'));
      
      // Busquem l'enllaç corresponent i l'activem
      const activeLink = document.querySelector(`.nav nav a[href="#${currentId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, { 
  // Modifiquem el marge: creem una línia virtual de detecció just al centre de la pantalla
  rootMargin: "-45% 0px -45% 0px",
  threshold: 0 // Amb que un sol píxel creu el centre de la pantalla, s'activarà
});

// Activem l'observador a les seccions
sections.forEach(sec => scrollObserver.observe(sec));

// Elements visuals petits
document.querySelectorAll('.hero__text, .hero__photo, .timeline li, .card').forEach(el => {
  el.classList.add('reveal');
  new IntersectionObserver((entries, self) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        self.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 }).observe(el);
});
