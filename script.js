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
// REVEAL EN SCROLL + MENÚ ACTIU DINÀMIC (SCROLLSPY)
// =====================================================
const menuLinks = document.querySelectorAll('.nav nav a');
const sections = document.querySelectorAll('.section');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    // 1. Efecte Reveal original (fa aparèixer la secció)
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
    }

    // 2. Control del Menú Actiu
    // Fem servir un llindar una mica més estricte per assegurar-nos que la secció ocupa bona part de la pantalla
    if (e.isIntersecting && e.intersectionRatio > 0.3) {
      const currentId = e.target.getAttribute('id');
      
      // Treiem la classe 'active' de tots els enllaços del menú
      menuLinks.forEach(link => link.classList.remove('active'));
      
      // Busquem l'enllaç que apunta a aquesta secció concreta i li col·loquem la classe 'active'
      const activeLink = document.querySelector(`.nav nav a[href="#${currentId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, { 
  // Rango de detecció optimitzat: demanem que es detecti quan estigui a prop del centre de la pantalla
  rootMargin: "-20% 0px -40% 0px",
  threshold: [0.12, 0.4] 
});

// Activem l'observador per a totes les teves seccions principals
sections.forEach(sec => scrollObserver.observe(sec));

// Apliquem el reveal original també als elements petits del hero i les targetes
document.querySelectorAll('.hero__text, .hero__photo, .timeline li, .card').forEach(el => {
  el.classList.add('reveal');
  // Creem un micro-observador només visual per a ells per no barrejar-ho amb el menú
  new IntersectionObserver((entries, self) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        self.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 }).observe(el);
});
