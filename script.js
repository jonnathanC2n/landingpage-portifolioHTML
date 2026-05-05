/**
 * script.js — Portfolio Jonnathan Quintela
 * Bootstrap 5.3 + AOS + Vanilla JS (sem jQuery)
 */

/* ========================
   Star Background Animation (Native Scroll)
======================== */
(function () {
  const container = document.getElementById('star-container');
  if (!container) return;

  container.innerHTML = '';

  const count = 80;
  const stars = [];

  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';

    const x = Math.random() * 100;
    const y = Math.random() * 100;

    const isStatic = Math.random() < 0.3;
    const z = isStatic ? 0 : 0.2 + Math.random() * 0.6;
    const size = isStatic ? 1 + Math.random() : 1 + Math.random() * 2;

    s.style.left = x + '%';
    s.style.top = y + '%';
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.setProperty('--duration', (2 + Math.random() * 4) + 's');

    container.appendChild(s);
    stars.push({ el: s, initialY: y, speed: z });
  }

  let lastScrollY = 0;
  let velocity = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    velocity = scrollY - lastScrollY;
    lastScrollY = scrollY;

    const stretch = Math.max(1, Math.min(1 + Math.abs(velocity) * 0.15, 4));

    stars.forEach(star => {
      if (star.speed === 0) {
        star.el.style.transform = 'scaleY(1)';
        return;
      }

      let pos = (star.initialY - (scrollY * star.speed * 0.05)) % 100;
      if (pos < 0) pos += 100;

      star.el.style.top = pos + '%';
      star.el.style.transform = `scaleY(${stretch})`;
    });
  }, { passive: true });
})();

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

/* ========================
   Swiper Portfolio Carousel (Coverflow Effect)
 ======================== */
const portfolioSwiperEl = document.querySelector('.portfolio-swiper');
if (portfolioSwiperEl && typeof Swiper !== 'undefined') {
  const portfolioSwiper = new Swiper('.portfolio-swiper', {
    effect: 'coverflow',
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 8,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      576: {
        slidesPerView: 1.5
      },
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 2.5
      },
      1200: {
        slidesPerView: 3
      }
    }
  });
}

/* ========================
   Copy Email to Clipboard
======================= */
function copyEmail() {
  const email = 'jt.quintela2@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    const btn = document.querySelector('.copy-btn i');
    btn.classList.remove('bi-clipboard');
    btn.classList.add('bi-check2');
    setTimeout(() => {
      btn.classList.remove('bi-check2');
      btn.classList.add('bi-clipboard');
    }, 2000);
  });
}
