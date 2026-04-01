document.addEventListener('DOMContentLoaded', () => {
  // Configurar ano do footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // NAVBAR LOGIC
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link, .navbar__link, .navbar__cta');

  // Adicionar sombreado na barra de navegação no scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Toggle do menu mobile
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Fechar menu quando houver clique nos links
  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      mobileMenu.classList.remove('open');
    });
  });

  // LOGIC DE ANIMAÇÃO DE SCROLL (Intersection Observer)
  const animatableContainers = document.querySelectorAll('.scroll-animate');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Encontra todos os filhos '.animate' dentro deste container
        const animatedElements = entry.target.querySelectorAll('.animate');
        // Se a section/container é o observer, os elementos filhos receberão a classe "in-view"
        animatedElements.forEach(el => el.classList.add('in-view'));
        
        // Desobservar para animar apenas uma vez
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatableContainers.forEach(container => observer.observe(container));
});
