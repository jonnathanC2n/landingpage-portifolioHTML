/**
 * script.js — Portfolio Jonnathan Quintela
 * Bootstrap 5 + AOS + Vanilla JS (sem jQuery)
 */

/* ========================
   AOS Init
======================== */
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
});

/* ========================
   Atualiza o ano no footer
======================== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ========================
   Navbar: scroll shadow + active link
======================== */
const navbar = document.getElementById('mainNavbar');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

function onScroll() {
  // Scroll shadow
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  // Active nav link
  let currentId = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) currentId = section.id;
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run on load

/* ========================
   Hero buttons smooth scroll
======================== */
const btnHabilidades = document.getElementById('btn-habilidades');
const btnFormacao    = document.getElementById('btn-formacao');
const scrollHint     = document.getElementById('scrollHint');

function scrollTo(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}

if (btnHabilidades) btnHabilidades.addEventListener('click', () => scrollTo('habilidades'));
if (btnFormacao)    btnFormacao.addEventListener('click',    () => scrollTo('formacao'));
if (scrollHint)     scrollHint.addEventListener('click',     () => scrollTo('sobre'));

/* ========================
   Skill bars: animate on scroll (IntersectionObserver)
======================== */
const skillFills = document.querySelectorAll('.skill-bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const targetWidth = fill.getAttribute('data-width') + '%';
      // Small setTimeout so AOS card fade-in completes first
      setTimeout(() => {
        fill.style.width = targetWidth;
      }, 300);
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => barObserver.observe(fill));

/* ========================
   Close mobile navbar on link click
======================== */
const navbarCollapse = document.getElementById('navbarNav');
const bsCollapse     = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, { toggle: false }) : null;

document.querySelectorAll('#navbarNav .nav-link, #navbarNav .btn-electric').forEach(link => {
  link.addEventListener('click', () => {
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      bsCollapse.hide();
    }
  });
});

/* ========================
   Particles.js Init
======================== */
if (typeof particlesJS !== 'undefined') {
  const particlesConfig = {
    "particles": {
      "number": {
        "value": 60,
        "density": { "enable": true, "value_area": 800 }
      },
      "color": { "value": "#ffffff" },
      "shape": { "type": "circle" },
      "opacity": {
        "value": 0.4,
        "random": true,
        "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": { "enable": false }
      },
      "line_linked": { "enable": false },
      "move": {
        "enable": true,
        "speed": 0.5,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "bubble" },
        "onclick": { "enable": false },
        "resize": true
      },
      "modes": {
        "bubble": { "distance": 200, "size": 3, "duration": 2, "opacity": 1, "speed": 3 }
      }
    },
    "retina_detect": true
  };

  if (document.getElementById('particles-js')) {
    particlesJS("particles-js", particlesConfig);
  }
  if (document.getElementById('particles-js-projetos')) {
    particlesJS("particles-js-projetos", particlesConfig);
  }
}
