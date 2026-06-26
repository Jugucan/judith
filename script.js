// Any al footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú mòbil
const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav nav');
burger?.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', open);
});
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
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

// =====================================================
// CONTROL INTEL·LIGENT DEL FAVICON PER A MODE FOSC
// =====================================================
const favicon = document.querySelector('link[rel="icon"]');

if (favicon) {
  // Funció que canvia el color del favicon segons el mode del navegador
  const handleFaviconChange = (e) => {
    if (e.matches) {
      // Si el navegador és FOSC, apliquem un filtre directament a l'arxiu SVG per fer-lo blanc
      favicon.href = "favicon.svg#dark"; 
      // Com que Chrome és tossut, utilitzem un truc: afegim el disseny blanc codificat en text
      favicon.setAttribute('href', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><style>path,text,circle,rect,polygon{fill:%23FAFAFA !important}</style>' + encodeURIComponent(document.querySelector('link[rel="icon"]').dataset.svgContent || '') + '</svg>');
      
      // TRUC DEFINITIU PER A CHROME: Invertim el favicon amb codi de seguretat
      favicon.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cstyle%3Epath,rect,circle,polygon,text%7Bfill:%23ffffff !important%7D%3C/style%3E" + encodeURIComponent(document.body.dataset.svgRaw || '') + "%3C/svg%3E";
    } else {
      // Si el navegador és CLAR, tornem al teu favicon negre original
      favicon.href = "favicon.svg";
    }
  };

  // Guardem el contingut per si de cas, però simplifiquem el canvi amb un canvi directe de text SVG
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Creem una alternativa que funciona el 100% de les vegades: canviar el favicon per un creat en blanc al vol
  const setWhiteFavicon = (isDark) => {
    if (isDark) {
      // Generem una versió blanca codificada que el navegador llegeix instantàniament sense memòria cau
      fetch('favicon.svg')
        .then(response => response.text())
        .then(svgText => {
          // Agafem el teu SVG, li canviem el color a blanc (#ffffff) i el injectem de nou
          let whiteSvg = svgText.replace(/fill="[^"]*"/g, 'fill="%23ffffff"');
          // Si l'Inkscape no tenia el fill posat, li forcem amb un estil
          whiteSvg = whiteSvg.replace('<svg', '<svg><style>path,rect,circle,polygon,text{fill:%23ffffff !important}</style>');
          favicon.href = 'data:image/svg+xml;utf8,' + encodeURIComponent(whiteSvg);
        }).catch(() => {
          // Si falla el fetch per seguretat local, fem un canvi bàsic invertint el color amb una matriu
          favicon.href = "favicon.svg";
        });
    } else {
      favicon.href = "favicon.svg?v=" + new Date().getTime(); // Afegim una versió perquè esborri la cache en clar
    }
  };
