(() => {
  const init = () => {
    document.documentElement.classList.add('ui-enhanced');

    // Subtle ripple feedback for interactive controls.
    document.addEventListener('pointerdown', (e) => {
      const el = e.target.closest('button, .primary-btn, .product-btn, .login-btn, .small-btn, .save-btn, .cart-btn, .feature-drawer-link, .category-card, .market-card');
      if (!el || el.disabled || el.classList.contains('no-ripple')) return;
      const r = document.createElement('span');
      r.className = 'ui-ripple';
      // Ripple coordinates are relative to the clicked element, not its ancestor.
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.35;
      r.style.width = r.style.height = size + 'px';
      r.style.left = `${e.clientX - rect.left - size / 2}px`;
      r.style.top = `${e.clientY - rect.top - size / 2}px`;
      r.style.transformOrigin = 'center center';
      el.appendChild(r);
      setTimeout(() => r.remove(), 520);
    }, { passive: true });

    // Gentle card lift/tilt on larger screens.
    if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
      document.querySelectorAll('.market-card, .card, .stat-card, .feature-card, .deal-card').forEach(card => {
        card.addEventListener('pointermove', e => {
          if (window.innerWidth < 900) return;
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - .5;
          const y = (e.clientY - r.top) / r.height - .5;
          card.style.setProperty('--rx', `${(-y * 1.4).toFixed(2)}deg`);
          card.style.setProperty('--ry', `${(x * 1.4).toFixed(2)}deg`);
          card.classList.add('ui-tilting');
        });
        card.addEventListener('pointerleave', () => card.classList.remove('ui-tilting'));
      });
    }

    // Reveal sections as they enter the viewport.
    const reveal = [...document.querySelectorAll('.section, .feature-hero, .feature-grid, .shop-tools, .stats, .cta, .order-summary, .tracking-card')];
    if ('IntersectionObserver' in window && reveal.length) {
      const io = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('ui-visible'); io.unobserve(entry.target); }
      }), { threshold: .08 });
      reveal.forEach(el => { el.classList.add('ui-reveal'); io.observe(el); });
    }

    // Give focused fields a tiny visual cue.
    document.querySelectorAll('input, textarea, select').forEach(input => {
      input.addEventListener('focus', () => input.closest('.input-group, .feature, .form-field')?.classList.add('field-active'));
      input.addEventListener('blur', () => input.closest('.input-group, .feature, .form-field')?.classList.remove('field-active'));
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
