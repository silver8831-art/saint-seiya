/* ══════════════════════════════════════════════════════
   SAINT SEIYA — CABALLEROS DEL ZODIACO
   main.js — Animaciones, scroll y efectos interactivos
══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. PARALLAX ESTRELLAS con el mouse ─── */
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    const bg = document.querySelector('.cosmos-bg');
    if (bg) {
      bg.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
  });

  /* ─── 2. LORE CARDS — fade-in escalonado al hacer scroll ─── */
  const loreCards = document.querySelectorAll('.lore-card');

  const loreObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = [...loreCards].indexOf(entry.target);
        entry.target.style.transition =
          `opacity 0.6s ${index * 0.1}s ease, transform 0.6s ${index * 0.1}s ease`;
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        loreObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  loreCards.forEach((card) => {
    loreObserver.observe(card);
  });

  /* ─── 3. CHARACTER CARDS — fade-in escalonado + barras de cosmo ─── */
  const charCards = document.querySelectorAll('.char-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = [...charCards].indexOf(entry.target);
        entry.target.style.transition =
          `opacity 0.6s ${index * 0.08}s ease, transform 0.6s ${index * 0.08}s ease`;
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  charCards.forEach((card) => {
    cardObserver.observe(card);
  });

  /* ─── 4. TIMELINE — fade-in con delay por índice ─── */
  const tlItems = document.querySelectorAll('.tl-item');

  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = [...tlItems].indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.08}s`;
        entry.target.classList.add('visible');
        tlObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  tlItems.forEach((item) => {
    tlObserver.observe(item);
  });

  /* ─── 5. NAV — cambia opacidad/fondo al scrollear ─── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.style.background = 'rgba(5,5,16,0.97)';
      nav.style.borderBottomColor = 'rgba(212,175,55,0.25)';
    } else {
      nav.style.background = '';
      nav.style.borderBottomColor = '';
    }
  }, { passive: true });

  /* ─── 6. SMOOTH SCROLL para links del nav ─── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── 7. EFECTO COSMOS en el hero — nodos del anillo zodiacal ─── */
  // Genera 12 puntos de constelación sobre el anillo giratorio
  const ring = document.querySelector('.zodiac-ring');
  if (ring) {
    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('span');
      dot.style.cssText = `
        position: absolute;
        width: 6px; height: 6px;
        background: var(--gold);
        border-radius: 50%;
        top: 50%; left: 50%;
        box-shadow: 0 0 8px var(--gold), 0 0 16px var(--gold);
        transform:
          translate(-50%, -50%)
          rotate(${i * 30}deg)
          translateY(-349px);
      `;
      ring.appendChild(dot);
    }
  }

  /* ─── 8. Título del HERO — efecto de letras con cursor ─── */
  // Pequeño easter egg: el título parpadea brevemente al cargar
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    setTimeout(() => {
      heroTitle.style.filter = 'drop-shadow(0 0 60px rgba(212,175,55,0.7))';
      setTimeout(() => {
        heroTitle.style.filter = '';
        heroTitle.style.transition = 'filter 0.5s ease';
      }, 400);
    }, 1600);
  }

});
