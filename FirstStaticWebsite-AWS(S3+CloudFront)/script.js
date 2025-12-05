// script.js
// Lightweight interactivity & reveal-on-scroll for the static UI
(function () {
  // Mobile nav toggle (simple)
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      // Basic mobile menu behavior: toggle display
      if (nav.style.display === 'flex') {
        nav.style.display = '';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.right = '20px';
        nav.style.top = '64px';
        nav.style.background = 'rgba(255,255,255,0.96)';
        nav.style.padding = '8px';
        nav.style.borderRadius = '10px';
        nav.style.boxShadow = '0 10px 30px rgba(3,105,161,0.08)';
      }
    });
  }

  // Smooth anchor scrolling for in-page links
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href === '#' || href === '') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // close mobile nav if open
    if (nav && window.innerWidth <= 980 && nav.style.display) {
      nav.style.display = '';
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // IntersectionObserver for reveal animations
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('inview');
        // once visible, stop observing for performance
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Small: animated floating effect for hero card
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    let t = 0;
    function float() {
      t += 0.01;
      const y = Math.sin(t) * 4;
      const rot = Math.cos(t * 0.6) * 0.25;
      heroCard.style.transform = `translateY(${y}px) rotate(${rot}deg)`;
      requestAnimationFrame(float);
    }
    requestAnimationFrame(float);
  }

  // keyboard accessible skip: focus first heading when landing
  window.addEventListener('load', () => {
    const h1 = document.querySelector('h1');
    if (h1) h1.setAttribute('tabindex', '-1');
  });

})();
