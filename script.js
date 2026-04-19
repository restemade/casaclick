document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const faqItems = document.querySelectorAll('.faq-box details');
    const revealItems = document.querySelectorAll('.reveal');
    const anchors = document.querySelectorAll('a[href^="#"]');
    const yearEl = document.getElementById('currentYear');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        obs.unobserve(entry.target);
                    }
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
                if (other !== item) {
                    other.open = false;
                }
            });
        });
    });

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            body.classList.toggle('menu-open', isOpen);
        });
    }

    anchors.forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');

            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            if (navLinks) {
                navLinks.classList.remove('active');
            }

            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }

            body.classList.remove('menu-open');
        });
    });
});

const portfolioTrack = document.getElementById('portfolioTrack');
const prevBtn = document.querySelector('.slider-btn-prev');
const nextBtn = document.querySelector('.slider-btn-next');

if (portfolioTrack && prevBtn && nextBtn) {
    const scrollAmount = 320;

    prevBtn.addEventListener('click', () => {
        portfolioTrack.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth',
        });
    });

    nextBtn.addEventListener('click', () => {
        portfolioTrack.scrollBy({
            left: scrollAmount,
            behavior: 'smooth',
        });
    });
}