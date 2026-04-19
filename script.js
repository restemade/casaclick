document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const anchors = document.querySelectorAll('a[href^="#"]');
  const faqItems = document.querySelectorAll('.faq-box details');
  const revealItems = document.querySelectorAll('.reveal');
  const yearEl = document.getElementById('currentYear');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  const closeMenu = () => {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      body.classList.toggle('menu-open', isOpen);
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (!navLinks.classList.contains('active')) return;
      if (target.closest('.nav-links') || target.closest('.menu-toggle')) return;
      closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    navAnchors.forEach((link) => link.addEventListener('click', closeMenu));
  }

  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  const portfolioTrack = document.getElementById('portfolioTrack');
  const prevBtn = document.querySelector('.slider-btn-prev');
  const nextBtn = document.querySelector('.slider-btn-next');

  if (portfolioTrack && prevBtn && nextBtn) {
    const getScrollAmount = () => Math.max(280, Math.min(420, Math.round(portfolioTrack.clientWidth * 0.9)));

    prevBtn.addEventListener('click', () => {
      portfolioTrack.scrollBy({ left: -getScrollAmount(), behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      portfolioTrack.scrollBy({ left: getScrollAmount(), behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }
});
